import { SignInButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';
import { BILLING_ENABLED, PRICES } from '@/lib/billing';
import { findUserSubscription } from '@/lib/subscription';
import { BillingButton } from './billing-button';

export const metadata: Metadata = { title: 'Dashboard — ApriDoc.com', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function findSubscription(userId: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  return key ? findUserSubscription(new Stripe(key), userId) : null;
}

async function findInvoices(userId: string, email: string | undefined, sub: Stripe.Subscription | null) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return [];
  const stripe = new Stripe(key);
  try {
    const customers = new Set<string>();
    if (sub) customers.add(typeof sub.customer === 'string' ? sub.customer : sub.customer.id);
    const owned = await stripe.customers
      .search({ query: `metadata['clerkUserId']:'${userId}'`, limit: 10 })
      .catch(() => ({ data: [] as Stripe.Customer[] }));
    for (const c of owned.data) customers.add(c.id);
    if (email) {
      const found = await stripe.customers.list({ email, limit: 10 });
      for (const c of found.data) customers.add(c.id);
    }
    const lists = await Promise.all(
      [...customers].map((customer) => stripe.invoices.list({ customer, status: 'paid', limit: 20 })),
    );
    return lists.flatMap((l) => l.data).sort((a, b) => b.created - a.created);
  } catch {
    return [];
  }
}

const money = (cents: number, currency: string) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100);

const day = (unix: number) => new Date(unix * 1000).toLocaleDateString('it-IT', { dateStyle: 'long' });

export default async function DashboardPage() {
  if (!BILLING_ENABLED) notFound();
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Accedi a ApriDoc</h1>
        <p className="mt-3 text-[#5b6270]">Accedi per vedere il tuo abbonamento e gestire il tuo account.</p>
        <SignInButton mode="modal">
          <button className="btn-primary mt-6">Accedi</button>
        </SignInButton>
      </div>
    );
  }

  const [user, sub] = await Promise.all([currentUser(), findSubscription(userId)]);
  const verified = user?.primaryEmailAddress?.verification?.status === 'verified';
  const invoices = await findInvoices(userId, verified ? user?.primaryEmailAddress?.emailAddress : undefined, sub);
  const periodEnd = sub?.items.data[0]?.current_period_end;

  return (
    <div className="mx-auto max-w-[900px] px-5 py-14">
      <h1 className="text-3xl font-extrabold tracking-tight">Ciao{user?.firstName ? `, ${user.firstName}` : ''}</h1>
      <p className="mt-1 text-[#5b6270]">{user?.primaryEmailAddress?.emailAddress}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section id="abbonamento" className="rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8a91a0]">Abbonamento</p>
          {sub ? (
            <>
              <p className="mt-2 text-xl font-extrabold">Annuale — export illimitati</p>
              <p className="mt-1 text-sm text-[#5b6270]">
                {PRICES.yearly.label}/anno ·{' '}
                {sub.status === 'past_due'
                  ? 'pagamento in sospeso'
                  : sub.cancel_at_period_end
                    ? `termina il ${periodEnd ? day(periodEnd) : '—'}`
                    : `si rinnova il ${periodEnd ? day(periodEnd) : '—'}`}
              </p>
              <div className="mt-5">
                <BillingButton />
              </div>
            </>
          ) : (
            <>
              <p className="mt-2 text-xl font-extrabold">Nessun abbonamento attivo</p>
              <p className="mt-1 text-sm text-[#5b6270]">
                Con il piano annuale ({PRICES.yearly.label}) scarichi documenti P7M e risultati degli strumenti PDF senza limiti per 12 mesi.
              </p>
              <Link href="/strumenti/apri-file-p7m" className="btn-primary mt-5 inline-flex">
                Apri un file P7M
              </Link>
            </>
          )}
        </section>

        <section className="rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8a91a0]">Account</p>
          <p className="mt-2 text-xl font-extrabold">Profilo e sicurezza</p>
          <p className="mt-1 text-sm text-[#5b6270]">Modifica nome, email, password e dispositivi collegati.</p>
          <Link href="/account" className="btn-ghost mt-5 inline-flex">
            Gestisci account
          </Link>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[#8a91a0]">Acquisti</p>
        {invoices.length === 0 ? (
          <p className="mt-3 text-sm text-[#5b6270]">Non hai ancora effettuato acquisti con questo account.</p>
        ) : (
          <ul className="mt-3 divide-y divide-[#eef0f3]">
            {invoices.map((inv) => (
              <li key={inv.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-bold">{inv.lines.data[0]?.description ?? 'Acquisto ApriDoc'}</p>
                  <p className="text-sm text-[#5b6270]">
                    {day(inv.created)}
                    {inv.number ? ` · ${inv.number}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-extrabold">{money(inv.amount_paid, inv.currency)}</span>
                  {inv.invoice_pdf && (
                    <a href={inv.invoice_pdf} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#1f087a] hover:underline">
                      Fattura PDF
                    </a>
                  )}
                  {inv.hosted_invoice_url && (
                    <a href={inv.hosted_invoice_url} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#1f087a] hover:underline">
                      Ricevuta
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[#8a91a0]">Strumenti</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/strumenti/apri-file-p7m" className="btn-ghost">Apri file P7M</Link>
          <Link href="/strumenti/unisci-pdf" className="btn-ghost">Unisci PDF</Link>
          <Link href="/strumenti/dividere-pdf" className="btn-ghost">Dividere PDF</Link>
          <Link href="/#strumenti" className="btn-ghost">Tutti gli strumenti</Link>
        </div>
      </section>
    </div>
  );
}
