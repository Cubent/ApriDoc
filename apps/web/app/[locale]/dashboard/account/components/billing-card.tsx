'use client';

import { AlertTriangle, CreditCard, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type BillingCardProps = {
  subscription: {
    status: string;
    planLabel: string | null;
    trialEnd: string | null;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  } | null;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const describe = (subscription: NonNullable<BillingCardProps['subscription']>) => {
  const { status, trialEnd, currentPeriodEnd, cancelAtPeriodEnd } = subscription;

  if (status === 'trialing' && trialEnd) {
    return cancelAtPeriodEnd
      ? { badge: 'Free trial', text: `Your trial ends on ${formatDate(trialEnd)} and won't renew.` }
      : {
          badge: 'Free trial',
          text: `Your free trial ends on ${formatDate(trialEnd)}. Your plan starts then unless you cancel.`,
        };
  }
  if (status === 'past_due') {
    return {
      badge: 'Payment failed',
      text: 'We could not process your last payment. Update your payment method to keep access.',
    };
  }
  if (cancelAtPeriodEnd) {
    return { badge: 'Canceling', text: `Your access ends on ${formatDate(currentPeriodEnd)}.` };
  }
  return { badge: 'Active', text: `Your plan renews on ${formatDate(currentPeriodEnd)}.` };
};

/** Shown before sending a trialing user to the Stripe portal, since canceling
 * from there is easy to click through without registering what it costs. */
const CancelTrialWarning = ({
  onUnderstood,
  onDismiss,
  isLoading,
}: {
  onUnderstood: () => void;
  onDismiss: () => void;
  isLoading: boolean;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 dark:bg-[#120A2E] sm:p-8">
      <span className="flex size-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
        <AlertTriangle className="size-5" />
      </span>
      <h2 className="mt-4 text-lg font-bold text-[#06005A] dark:text-white">Before you go to billing</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        If you cancel your free trial, you&apos;ll lose access to question practice within 24
        hours. Everything else, including your account, stays available.
      </p>
      <div className="mt-6 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onUnderstood}
          disabled={isLoading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#06005A] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading && <Loader2 className="size-3.5 animate-spin" />}
          {isLoading ? 'Opening…' : 'Understood, continue to billing'}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          disabled={isLoading}
          className="inline-flex h-11 items-center justify-center rounded-full text-sm font-medium text-gray-500 hover:text-black disabled:cursor-not-allowed dark:text-gray-400 dark:hover:text-white"
        >
          Never mind
        </button>
      </div>
    </div>
  </div>
);

export const BillingCard = ({ subscription }: BillingCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCancelWarning, setShowCancelWarning] = useState(false);

  const openPortal = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/billing/portal', { method: 'POST' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) {
        setError(data.error ?? 'Could not open the billing portal. Please try again.');
        setIsLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Could not open the billing portal. Check your connection and try again.');
      setIsLoading(false);
    }
  };

  const handleManageBilling = () => {
    if (subscription?.status === 'trialing') {
      setShowCancelWarning(true);
      return;
    }
    openPortal();
  };

  const details = subscription ? describe(subscription) : null;

  return (
    <div className="rounded-2xl border border-gray-200 p-6 dark:border-white/10 sm:p-8">
      {showCancelWarning && (
        <CancelTrialWarning
          isLoading={isLoading}
          onUnderstood={openPortal}
          onDismiss={() => setShowCancelWarning(false)}
        />
      )}

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C46B10]/10 text-[#C46B10]">
            <CreditCard className="size-5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-[#06005A] dark:text-white">Billing</h2>
              {details && (
                <span className="rounded-full bg-[#C46B10]/15 px-2.5 py-0.5 text-xs font-semibold text-[#C46B10]">
                  {details.badge}
                </span>
              )}
            </div>
            {subscription ? (
              <>
                {subscription.planLabel && (
                  <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {subscription.planLabel} plan
                  </p>
                )}
                <p className="mt-1 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {details?.text}
                </p>
              </>
            ) : (
              <p className="mt-1 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                You don&apos;t have an active plan yet.
              </p>
            )}
          </div>
        </div>

        {subscription ? (
          <button
            type="button"
            onClick={handleManageBilling}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-full bg-[#06005A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && <Loader2 className="size-3.5 animate-spin" />}
            {isLoading ? 'Opening…' : 'Manage billing'}
          </button>
        ) : (
          <Link
            href="/paywall"
            className="inline-flex items-center rounded-full bg-[#C46B10] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a95a0d]"
          >
            Start free trial
          </Link>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
};
