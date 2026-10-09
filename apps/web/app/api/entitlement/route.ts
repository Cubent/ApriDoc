import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { findUserSubscription } from '@/lib/subscription';

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
    if (await findUserSubscription(stripe, userId)) return Response.json({ unlocked: true, plan: 'yearly' });
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
          return Response.json({ unlocked: true, plan: 'yearly', paid: true });
        }
        if (userId && owner === userId) return Response.json({ unlocked: true, plan: 'yearly', paid: true });
        if (!userId) return Response.json({ unlocked: false, plan: 'yearly', paid: true, needsAccount: true, email: s.customer_details?.email ?? undefined });
      }
    }
  }

  return Response.json({ unlocked: false });
}
