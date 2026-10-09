import 'server-only';
import { currentUser } from '@clerk/nextjs/server';
import type Stripe from 'stripe';

const LIVE = ['active', 'trialing', 'past_due'];

/**
 * Finds the signed-in user's yearly subscription in Stripe. Stripe's search index can lag, so it falls
 * back to the verified Clerk email and then tags the subscription with the user id.
 */
export async function findUserSubscription(stripe: Stripe, userId: string): Promise<Stripe.Subscription | null> {
  try {
    const found = await stripe.subscriptions.search({ query: `metadata['clerkUserId']:'${userId}'`, limit: 5 });
    const hit = found.data.find((s) => LIVE.includes(s.status));
    if (hit) return hit;
  } catch (e) {
    console.error('Stripe subscription search failed', e);
  }

  try {
    const user = await currentUser();
    const email = user?.primaryEmailAddress;
    if (!email || email.verification?.status !== 'verified') return null;
    const customers = await stripe.customers.list({ email: email.emailAddress, limit: 10 });
    for (const c of customers.data) {
      const subs = await stripe.subscriptions.list({ customer: c.id, status: 'all', limit: 10 });
      const hit = subs.data.find(
        (s) => LIVE.includes(s.status) && (!s.metadata?.clerkUserId || s.metadata.clerkUserId === userId),
      );
      if (hit) {
        if (!hit.metadata?.clerkUserId) {
          await stripe.subscriptions.update(hit.id, { metadata: { clerkUserId: userId } });
        }
        return hit;
      }
    }
  } catch (e) {
    console.error('Stripe subscription lookup by email failed', e);
  }
  return null;
}
