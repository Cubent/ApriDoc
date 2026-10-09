import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { findUserSubscription } from '@/lib/subscription';

// Opens Stripe's hosted billing portal (cancel, update card, invoices) for the signed-in user.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const { userId } = await auth();
  if (!key || !userId) return Response.json({ error: 'Non autorizzato.' }, { status: 401 });

  const stripe = new Stripe(key);
  try {
    const customer = (await findUserSubscription(stripe, userId))?.customer;
    if (!customer) return Response.json({ error: 'Nessun abbonamento trovato.' }, { status: 404 });
    const portal = await stripe.billingPortal.sessions.create({
      customer: typeof customer === 'string' ? customer : customer.id,
      return_url: `${new URL(req.url).origin}/dashboard`,
    });
    return Response.json({ url: portal.url });
  } catch (e) {
    console.error('Stripe portal failed', e);
    return Response.json({ error: e instanceof Error ? e.message : 'Errore Stripe.' }, { status: 502 });
  }
}
