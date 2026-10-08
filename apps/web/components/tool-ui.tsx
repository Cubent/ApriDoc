'use client';

import { Download, Loader2, UploadCloud, X } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import { formatSize } from '@/lib/files';

export function Dropzone({
  accept,
  multiple = false,
  label,
  onFiles,
}: {
  accept: string;
  multiple?: boolean;
  label: string;
  onFiles: (files: File[]) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      onClick={() => input.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length) onFiles(multiple ? files : files.slice(0, 1));
      }}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed min-h-[320px] px-6 py-20 text-center transition ${
        over ? 'border-[#1f087a] bg-[#1f087a]/5' : 'border-[#c9ced6] bg-white hover:border-[#1f087a]'
      }`}
    >
      <UploadCloud size={56} className="text-[#1f087a]" />
      <p className="mt-4 text-xl font-bold">{label}</p>
      <p className="mt-1 text-sm text-[#5b6270]">oppure trascinalo qui — il file non lascia il tuo browser</p>
      <span className="btn-primary mt-6 !px-8 !py-3.5 text-lg">Seleziona file</span>
      <input
        ref={input}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = '';
        }}
      />
    </div>
  );
}

export function FileRow({
  file,
  onRemove,
  children,
}: {
  file: File;
  onRemove?: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#e6e8ec] bg-white px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{file.name}</p>
        <p className="text-xs text-[#5b6270]">{formatSize(file.size)}</p>
      </div>
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Rimuovi" className="rounded-lg p-1.5 hover:bg-[#f1f2f4]">
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return <div className="space-y-5 rounded-3xl border border-[#e6e8ec] bg-white p-6 md:p-8">{children}</div>;
}

export function Label({ text, children }: { text: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold">{text}</span>
      {children}
    </label>
  );
}

export function ActionButton({
  busy,
  disabled,
  onClick,
  children,
}: {
  busy: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button className="btn-primary w-full !py-4 text-lg" disabled={busy || disabled} onClick={onClick}>
      {busy ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
      {children}
    </button>
  );
}

export function ErrorBox({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

/** Runs an async job, tracking busy / error state. */
export function useJob() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const run = async (fn: () => Promise<string | void>) => {
    setBusy(true);
    setError(null);
    setDone(null);
    try {
      const msg = await fn();
      if (msg) setDone(msg);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Operazione non riuscita.');
    } finally {
      setBusy(false);
    }
  };
  return { busy, error, done, run, setError };
}

export function DoneBox({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
      ✓ {message}
    </p>
  );
}
