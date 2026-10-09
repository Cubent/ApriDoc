'use client';

import { Crown, Loader2, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { PRICES, singlePrice, type Kind, type Plan } from '@/lib/billing';

export function PaywallModal({
  kind,
  notice,
  busy,
  error,
  onClose,
  onChoose,
  onSignIn,
}: {
  kind: Kind;
  notice?: string | null;
  busy: boolean;
  error: string | null;
  onClose: () => void;
  onChoose: (plan: Plan) => void;
  onSignIn: () => void;
}) {
  return (
    <Shell
      onClose={onClose}
      title={kind === 'pdf' ? 'Scarica il PDF' : 'Download PDF'}
      subtitle={kind === 'pdf' ? 'Il tuo file è pronto' : 'Estrai il documento dalla busta P7M'}
    >
      {notice && <p className="mt-5 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">{notice}</p>}
      <div className="mt-6 space-y-3">
        <button disabled={busy} onClick={() => onChoose('single')} className="flex w-full items-center justify-between rounded-2xl border border-[#e6e8ec] p-4 text-left hover:border-[#1f087a]">
          <span>
            <span className="block text-xs font-bold uppercase tracking-wider text-[#8a91a0]">Singolo</span>
            <span className="block font-semibold">{kind === 'pdf' ? 'Scarica questo file' : 'Esporta questo documento'}</span>
          </span>
          <span className="text-xl font-extrabold">{singlePrice(kind).label}</span>
        </button>
        <button disabled={busy} onClick={() => onChoose('yearly')} className="flex w-full items-center justify-between rounded-2xl border-2 border-[#1f087a] bg-[#f6f4ff] p-4 text-left">
          <span>
            <span className="block text-xs font-bold uppercase tracking-wider text-[#1f087a]">Consigliato</span>
            <span className="block font-semibold">Export illimitati per 12 mesi</span>
          </span>
          <span className="text-xl font-extrabold">
            {PRICES.yearly.label}
            <span className="text-sm font-bold text-[#5b6270]">/anno</span>
          </span>
        </button>
        {busy && (
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-[#1f087a]">
            <Loader2 size={16} className="animate-spin" /> Ti porto al pagamento sicuro…
          </p>
        )}
      </div>
      {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
      <p className="mt-6 text-center text-xs text-[#8a91a0]">Pagamento sicuro. Annulla quando vuoi.</p>
      <p className="mt-2 text-center text-sm">
        <span className="text-[#5b6270]">Hai già acquistato? </span>
        <button onClick={onSignIn} className="font-extrabold text-[#1f087a] hover:underline">
          Accedi
        </button>
      </p>
    </Shell>
  );
}

/** Shown after payment: the yearly plan must be tied to an account, a single export may skip it. */
export function AccountModal({
  plan,
  onSignUp,
  onSkip,
}: {
  plan: Plan;
  onSignUp: () => void;
  onSkip: () => void;
}) {
  return (
    <Shell title="Pagamento riuscito" subtitle="Ultimo passaggio">
      {plan === 'yearly' ? (
        <>
          <h3 className="mt-6 font-extrabold">Crea il tuo account per scaricare</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#5b6270]">
            L’abbonamento annuale è collegato al tuo account: così hai export illimitati da qualsiasi dispositivo e lo
            ritrovi ogni volta che accedi, senza dover ripagare.
          </p>
          <button onClick={onSignUp} className="mt-5 w-full rounded-xl bg-[#1f087a] py-3 font-extrabold text-white hover:bg-[#2a0d9c]">
            Crea account e scarica
          </button>
        </>
      ) : (
        <>
          <h3 className="mt-6 font-extrabold">Vuoi creare un account?</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#5b6270]">
            Con un account potrai passare in seguito agli export illimitati. È facoltativo: il tuo documento è già
            pronto.
          </p>
          <button onClick={onSignUp} className="mt-5 w-full rounded-xl bg-[#1f087a] py-3 font-extrabold text-white hover:bg-[#2a0d9c]">
            Crea account
          </button>
          <button onClick={onSkip} className="mt-3 w-full rounded-xl border border-[#e6e8ec] py-3 font-bold hover:bg-[#f7f8fa]">
            No, voglio solo scaricare
          </button>
        </>
      )}
    </Shell>
  );
}

function Shell({
  children,
  onClose,
  title = 'Download PDF',
  subtitle = 'Estrai il documento dalla busta P7M',
}: {
  children: ReactNode;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
}) {
  // Portal to <body>: the viewer sits in a transformed container, which would otherwise confine `fixed`.
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
        {onClose && (
          <button onClick={onClose} aria-label="Chiudi" className="absolute right-4 top-4 rounded-full p-1.5 text-[#8a91a0] hover:bg-[#f2f3f6]">
            <X size={20} />
          </button>
        )}
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Crown size={22} />
          </span>
          <div>
            <h2 className="text-xl font-extrabold">{title}</h2>
            <p className="text-sm text-[#5b6270]">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
