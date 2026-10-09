import { auth, currentUser } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { PRICES, singlePrice, type Kind, type Plan } from '@/lib/billing';

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return Response.json({ error: 'Pagamenti non configurati.' }, { status: 503 });

  const { plan, kind = 'p7m', doc, returnPath } = (await req.json().catch(() => ({}))) as {
    plan?: Plan;
    kind?: Kind;
    doc?: string;
    returnPath?: string;
  };
  if ((plan !== 'single' && plan !== 'yearly') || !returnPath?.startsWith('/strumenti/')) {
    return Response.json({ error: 'Richiesta non valida.' }, { status: 400 });
  }

  const { userId } = await auth();
  if (!doc) return Response.json({ error: 'Documento mancante.' }, { status: 400 });

  const stripe = new Stripe(key);
  const origin = new URL(req.url).origin;
  const user = userId ? await currentUser() : null;
  const email = user?.primaryEmailAddress?.emailAddress;
  const metadata: Record<string, string> = { plan, kind, ...(userId ? { clerkUserId: userId } : {}), ...(doc ? { doc } : {}) };

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create({
    mode: plan === 'yearly' ? 'subscription' : 'payment',
    locale: 'it',
    customer_email: email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: plan === 'yearly' ? PRICES.yearly.cents : singlePrice(kind).cents,
          product_data: {
            name: plan === 'yearly'
                ? 'ApriDoc Annuale — Download illimitati'
                : kind === 'pdf'
                  ? 'ApriDoc — Download singolo PDF'
                  : 'ApriDoc — Export singolo documento',
            description:
              plan === 'yearly'
                ? 'Scarica documenti dai file P7M e i risultati degli strumenti PDF senza limiti per 12 mesi. Si rinnova ogni anno, annulla quando vuoi.'
                : kind === 'pdf'
                  ? 'Scarica il PDF elaborato con ApriDoc. Pagamento una tantum.'
                  : 'Estrai e scarica il documento contenuto in questo file P7M. Pagamento una tantum.',
          },
          ...(plan === 'yearly' ? { recurring: { interval: 'year' as const } } : {}),
        },
      },
    ],
    metadata,
    ...(plan === 'yearly'
      ? { subscription_data: { metadata } }
      : { customer_creation: 'always' as const, invoice_creation: { enabled: true, invoice_data: { metadata } } }),
    success_url: `${origin}${returnPath}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${returnPath}?checkout=cancel`,
    });
  } catch (e) {
    console.error('Stripe checkout failed', e);
    const msg = e instanceof Stripe.errors.StripeError ? e.message : 'Errore durante la creazione del pagamento.';
    return Response.json({ error: msg }, { status: 502 });
  }

  return Response.json({ url: session.url });
}
