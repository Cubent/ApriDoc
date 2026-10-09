import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';

// Attaches purchases a guest made on this browser to the account they created afterwards.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const { userId } = await auth();
  if (!key || !userId) return Response.json({ claimed: [] }, { status: 401 });

  const { sessionIds } = (await req.json().catch(() => ({}))) as { sessionIds?: string[] };
  const stripe = new Stripe(key);
  const claimed: string[] = [];

  for (const id of (sessionIds ?? []).filter((s) => s.startsWith('cs_')).slice(0, 20)) {
    try {
      const s = await stripe.checkout.sessions.retrieve(id, { expand: ['subscription'] });
      if (s.payment_status !== 'paid') continue;
      if (s.mode === 'payment' && typeof s.customer === 'string') {
        const customer = await stripe.customers.retrieve(s.customer);
        if (!customer.deleted && !customer.metadata?.clerkUserId) {
          await stripe.customers.update(s.customer, { metadata: { clerkUserId: userId } });
        } else if (!customer.deleted && customer.metadata?.clerkUserId !== userId) {
          continue;
        }
      } else if (s.mode === 'subscription' && typeof s.subscription === 'object' && s.subscription) {
        const owner = s.subscription.metadata?.clerkUserId;
        if (!owner) await stripe.subscriptions.update(s.subscription.id, { metadata: { clerkUserId: userId } });
        else if (owner !== userId) continue;
      }
      claimed.push(id);
    } catch {
      /* unknown or foreign session: ignore */
    }
  }
  return Response.json({ claimed });
}
