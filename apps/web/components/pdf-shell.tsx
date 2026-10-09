'use client';

import { Check, Crown, Download } from 'lucide-react';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { PRICES, singlePrice } from '@/lib/billing';
import { downloadBlob, formatSize } from '@/lib/files';
import { usePaywall } from './use-paywall';

type Result = { blob: Blob; name: string; type: string };

type Shell = {
  /** Called by a tool when its output is ready. Nothing is downloaded until the user asks. */
  deliver: (data: BlobPart, name: string, type: string) => void;
  /** Called when a tool starts working, clearing the previous output. */
  begin: () => void;
  setMessage: (message: string | null) => void;
};

const ShellContext = createContext<Shell | null>(null);

export const usePdfShell = () => useContext(ShellContext);

/** Wraps a PDF tool: shows its result, and gates the download behind the premium paywall. */
export function PdfShell({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<Result | null>(null);
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const show = useCallback(async (blob: Blob, name: string, type: string) => {
    setResult({ blob, name, type });
    setBytes(new Uint8Array(await blob.arrayBuffer()));
  }, []);

  const shell = useMemo<Shell>(
    () => ({
      deliver: (data, name, type) => void show(data instanceof Blob ? data : new Blob([data], { type }), name, type),
      begin: () => {
        setResult(null);
        setBytes(null);
        setMessage(null);
      },
      setMessage,
    }),
    [show],
  );

  const pending = useMemo(
    () => (result ? new File([result.blob], result.name, { type: result.type }) : null),
    [result],
  );

  const { unlocked, openPay, modals } = usePaywall({
    kind: 'pdf',
    bytes,
    pending,
    onRestore: (f) => {
      void show(f, f.name, f.type);
      setMessage('Il tuo file è pronto.');
    },
  });

  return (
    <ShellContext.Provider value={shell}>
      {children}

      {result && (
        <div role="status" className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check size={22} strokeWidth={3} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-extrabold leading-tight">Il tuo file è pronto</p>
            <p className="truncate text-sm text-[#5b6270]">
              {message ? `${message} ` : ''}
              {result.name} · {formatSize(result.blob.size)}
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => (unlocked ? downloadBlob(result.blob, result.name, result.type) : openPay())}
          >
            {unlocked ? <Download size={18} /> : <Crown size={18} />} Scarica
          </button>
          {!unlocked && (
            <p className="w-full text-xs text-[#5b6270]">
              Download premium: {singlePrice('pdf').label} per questo file, oppure {PRICES.yearly.label}/anno per
              download illimitati.
            </p>
          )}
        </div>
      )}

      {modals}
    </ShellContext.Provider>
  );
}
