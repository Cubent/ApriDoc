import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { findUserSubscription } from '@/lib/subscription';

const periodEnd = (sub: Stripe.Subscription) => (sub.items.data[0]?.current_period_end ?? 0) * 1000;

// Stateless: Stripe is the only source of truth, no database involved.
// Payment comes first; a yearly subscription is then claimed by the account created afterwards.
export async function GET(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return Response.json({ unlocked: false });
  const stripe = new Stripe(key);
  const url = new URL(req.url);
  const doc = url.searchParams.get('doc');
  const sessionId = url.searchParams.get('session_id');
  const { userId } = await auth();

  if (userId) {
    const sub = await findUserSubscription(stripe, userId);
    if (sub) return Response.json({ unlocked: true, plan: 'yearly', until: periodEnd(sub) });
  }

  if (sessionId?.startsWith('cs_')) {
    const s = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['subscription'] }).catch(() => null);
    if (s?.payment_status === 'paid') {
      if (s.mode === 'payment' && doc && s.metadata?.doc === doc) {
        return Response.json({ unlocked: true, plan: 'single', paid: true, email: s.customer_details?.email ?? undefined });
      }
      const sub = s.mode === 'subscription' && typeof s.subscription === 'object' ? s.subscription : null;
      if (sub && ['active', 'trialing'].includes(sub.status)) {
        const owner = sub.metadata?.clerkUserId;
        if (userId && !owner) {
          await stripe.subscriptions.update(sub.id, { metadata: { clerkUserId: userId } });
          return Response.json({ unlocked: true, plan: 'yearly', paid: true, until: periodEnd(sub) });
        }
        if (userId && owner === userId) {
          return Response.json({ unlocked: true, plan: 'yearly', paid: true, until: periodEnd(sub) });
        }
        if (!userId) return Response.json({ unlocked: false, plan: 'yearly', paid: true, needsAccount: true, email: s.customer_details?.email ?? undefined });
      }
    }
  }

  return Response.json({ unlocked: false });
}
