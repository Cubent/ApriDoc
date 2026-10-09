'use client';

import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export function BillingButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = async () => {
    setBusy(true);
    setError(null);
    const res = await fetch('/api/billing-portal', { method: 'POST' });
    const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
    if (res.ok && data.url) {
      location.href = data.url;
      return;
    }
    setError(data.error ?? 'Impossibile aprire la gestione abbonamento.');
    setBusy(false);
  };

  return (
    <div>
      <button onClick={open} disabled={busy} className="btn-primary">
        {busy && <Loader2 size={16} className="animate-spin" />} Gestisci abbonamento
      </button>
      {error && <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>}
    </div>
  );
}
