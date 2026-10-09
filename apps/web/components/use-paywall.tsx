'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Kind, Plan } from '@/lib/billing';
import { clearPendingFile, loadPendingFile, savePendingFile, sha256Hex } from '@/lib/pending-file';
import { useAccount } from './account';
import { AccountModal, PaywallModal } from './paywall';

const PURCHASES_KEY = 'apridoc:purchases';
const SESSION_KEY = (h: string) => `apridoc:session:${h}`;
const PREMIUM_KEY = 'apridoc:premium';
const GRACE_MS = 2 * 24 * 3600 * 1000;

/** A yearly subscriber is remembered in this browser, so the paywall never flashes up for them. */
function cachedPremium(): boolean {
  try {
    const { until } = JSON.parse(localStorage.getItem(PREMIUM_KEY) ?? '{}') as { until?: number };
    return typeof until === 'number' && Date.now() < until + GRACE_MS;
  } catch {
    return false;
  }
}

function setCachedPremium(until: number | null) {
  try {
    if (until) localStorage.setItem(PREMIUM_KEY, JSON.stringify({ until }));
    else localStorage.removeItem(PREMIUM_KEY);
  } catch {
    /* storage unavailable */
  }
}

function savedPurchases(): string[] {
  try {
    return JSON.parse(localStorage.getItem(PURCHASES_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
}

function rememberPurchase(id: string) {
  try {
    const all = savedPurchases();
    if (!all.includes(id)) localStorage.setItem(PURCHASES_KEY, JSON.stringify([...all, id]));
  } catch {
    /* storage unavailable */
  }
}

function forgetPurchases(ids: string[]) {
  try {
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(savedPurchases().filter((i) => !ids.includes(i))));
  } catch {
    /* storage unavailable */
  }
}

/**
 * Premium gate shared by the P7M viewer and the PDF tools.
 * - `bytes`: the deliverable; its hash ties a single purchase to that exact file.
 * - `pending`: what to keep in the browser while the user pays or signs up.
 * - `onRestore`: gets that file back after the redirect.
 */
export function usePaywall({
  kind,
  bytes,
  pending,
  onRestore,
}: {
  kind: Kind;
  bytes: Uint8Array | null;
  pending: File | null;
  onRestore: (file: File) => void;
}) {
  const [docHash, setDocHash] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [premium, setPremium] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [payBusy, setPayBusy] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [needsAccount, setNeedsAccount] = useState<Plan | null>(null);
  const [offerAccount, setOfferAccount] = useState(false);
  const [payerEmail, setPayerEmail] = useState<string | undefined>();
  const sessionRef = useRef<string | null>(null);
  const cameFromStripe = useRef(false);
  const restoreRef = useRef(onRestore);
  restoreRef.current = onRestore;
  const account = useAccount();

  // Remembered subscription: unlock straight away, then let the server confirm below.
  useEffect(() => {
    if (cachedPremium()) setPremium(true);
  }, []);

  // Signing out ends the remembered subscription.
  useEffect(() => {
    if (account.loaded && !account.signedIn) {
      setCachedPremium(null);
      setPremium(false);
    }
  }, [account.loaded, account.signedIn]);

  // Back from Stripe or from a sign-up redirect: bring the file back from the browser and carry on.
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const back = q.get('checkout') === 'success' || q.has('resume');
    sessionRef.current = q.get('session_id');
    if (q.has('checkout') || q.has('resume') || q.has('session_id')) history.replaceState(null, '', location.pathname);
    if (!back) {
      void clearPendingFile();
      return;
    }
    cameFromStripe.current = q.get('checkout') === 'success';
    void loadPendingFile().then((f) => f && restoreRef.current(f));
  }, []);

  useEffect(() => {
    if (!bytes) {
      setDocHash(null);
      setUnlocked(false);
      return;
    }
    let cancelled = false;
    void sha256Hex(bytes).then((h) => !cancelled && setDocHash(h));
    return () => {
      cancelled = true;
    };
  }, [bytes]);

  // Ask the server whether this file may be downloaded (yearly account or a paid single export).
  useEffect(() => {
    if (!docHash) return;
    let session = sessionRef.current;
    try {
      session = session ?? localStorage.getItem(SESSION_KEY(docHash));
    } catch {
      /* storage unavailable */
    }
    const params = new URLSearchParams({ doc: docHash, ...(session ? { session_id: session } : {}) });
    void fetch(`/api/entitlement?${params}`)
      .then((r) => (r.ok ? r.json() : { unlocked: false }))
      .then((r: { unlocked: boolean; plan?: Plan; paid?: boolean; needsAccount?: boolean; email?: string; until?: number }) => {
        setUnlocked(r.unlocked);
        if (r.unlocked && r.plan === 'yearly' && r.until) {
          setCachedPremium(r.until);
          setPremium(true);
        } else if (account.signedIn && !r.unlocked && !r.needsAccount) {
          setCachedPremium(null);
          setPremium(false);
        }
        setPayerEmail(r.email);
        setNeedsAccount(r.needsAccount ? (r.plan ?? 'yearly') : null);
        if (r.paid && session) {
          setShowPay(false);
          rememberPurchase(session);
          try {
            localStorage.setItem(SESSION_KEY(docHash), session);
          } catch {
            /* storage unavailable */
          }
        }
        if (r.unlocked) {
          setShowPay(false);
          void clearPendingFile();
          if (r.plan === 'single' && cameFromStripe.current && !account.signedIn) setOfferAccount(true);
        }
      })
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docHash, account.signedIn]);

  // Purchases made as a guest are kept in this browser and attached to the account once it exists.
  useEffect(() => {
    if (!account.signedIn) return;
    const ids = savedPurchases();
    if (!ids.length) return;
    void fetch('/api/claim', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sessionIds: ids }),
    })
      .then((r) => (r.ok ? r.json() : { claimed: [] }))
      .then((r: { claimed: string[] }) => forgetPurchases(r.claimed))
      .catch(() => undefined);
  }, [account.signedIn]);

  const startCheckout = useCallback(
    async (plan: Plan) => {
      if (!pending || !docHash) return;
      setPayBusy(true);
      setPayError(null);
      await savePendingFile(pending);
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ plan, kind, doc: docHash, returnPath: location.pathname }),
        });
        const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
        if (!res.ok || !data.url) throw new Error(data.error ?? 'Impossibile avviare il pagamento.');
        location.href = data.url;
      } catch (e) {
        setPayError(e instanceof Error ? e.message : 'Impossibile avviare il pagamento.');
        setPayBusy(false);
      }
    },
    [pending, docHash, kind],
  );

  const signUp = async () => {
    if (pending) await savePendingFile(pending);
    setOfferAccount(false);
    account.openSignUp(`${location.pathname}?resume=1`, payerEmail);
  };

  const signIn = async () => {
    if (pending) await savePendingFile(pending);
    account.openSignIn(`${location.pathname}?resume=1`);
  };

  const modals: ReactNode = (
    <>
      {showPay && (
        <PaywallModal
          kind={kind}
          busy={payBusy}
          error={payError}
          onClose={() => setShowPay(false)}
          onChoose={(plan) => void startCheckout(plan)}
          onSignIn={() => void signIn()}
        />
      )}
      {(needsAccount || offerAccount) && (
        <AccountModal
          plan={needsAccount ?? 'single'}
          onSignUp={() => void signUp()}
          onSkip={() => setOfferAccount(false)}
        />
      )}
    </>
  );

  return { unlocked: unlocked || premium, openPay: () => setShowPay(true), modals };
}
