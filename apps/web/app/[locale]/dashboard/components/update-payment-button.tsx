'use client';

import { Loader2 } from 'lucide-react';
import { useState } from 'react';

// Opens Stripe's billing portal, where the customer can replace their card.
export const UpdatePaymentButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openPortal = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/billing/portal', { method: 'POST' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) {
        setError(data.error ?? 'Could not open billing. Please try again.');
        setIsLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Could not open billing. Check your connection and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <button
        type="button"
        onClick={openPortal}
        disabled={isLoading}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#06005A] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading && <Loader2 className="size-3 animate-spin" />}
        {isLoading ? 'Opening…' : 'Update payment'}
      </button>
      {error && <p className="text-xs text-rose-200">{error}</p>}
    </div>
  );
};
