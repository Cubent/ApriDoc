'use client';

import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Check,
  Copy,
  Crown,
  Download,
  Lock,
  FileText,
  Info,
  Loader2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { downloadBlob, formatSize, readBytes } from '@/lib/files';
import type { P7mResult, P7mSigner } from '@/lib/p7m';
import { findIssuer, TL_ISSUED } from '@/lib/qtsp';
import { PdfPreview } from './pdf-preview';
import { Dropzone, ErrorBox } from './tool-ui';
import { usePaywall } from './use-paywall';

const fmtDay = (d: Date) => d.toLocaleDateString('it-IT');
const fmtFull = (d: Date) => d.toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' });

const countryName = (code?: string) => {
  if (!code) return '—';
  try {
    return new Intl.DisplayNames(['it'], { type: 'region' }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
};

const KIND_LABEL: Record<P7mResult['kind'], string> = {
  pdf: 'PDF',
  image: 'Immagine',
  xml: 'XML',
  text: 'Testo',
  other: 'Documento',
};

type Check = { tone: 'ok' | 'warn' | 'bad'; title: string; text: string };

function checkSigner(s: P7mSigner, signedAt?: Date): Check[] {
  const ref = signedAt ?? new Date();
  const when = signedAt ? 'alla data di firma' : 'oggi';
  const out: Check[] = [];
  if (ref < s.notBefore) {
    out.push({ tone: 'bad', title: 'Certificato non ancora valido', text: `Il certificato non era ancora valido ${when}: la sua validità inizia il ${fmtDay(s.notBefore)}.` });
  } else if (ref > s.notAfter) {
    out.push({ tone: 'bad', title: 'Certificato scaduto', text: `Il certificato risultava scaduto ${when} (validità fino al ${fmtDay(s.notAfter)}).` });
  } else {
    out.push({ tone: 'ok', title: 'Certificato nei termini di validità', text: `Il certificato era valido ${when}, tra il ${fmtDay(s.notBefore)} e il ${fmtDay(s.notAfter)}.` });
  }
  const valid = out[0].tone === 'ok';
  const m = findIssuer(s.issuerDn);
  const where = m.kind === 'none' ? '' : m.country === 'IT' ? 'italiano' : 'rumeno';
  if (m.kind === 'exact' && m.active) {
    out.push({
      tone: 'ok',
      title: `Emittente qualificato: ${m.provider}`,
      text: `L’emittente è un prestatore di servizi fiduciari qualificato ${where}, presente nell’elenco ufficiale (Trusted List aggiornata al ${TL_ISSUED[m.country as 'IT' | 'RO']}).`,
    });
  } else if (m.kind === 'exact') {
    out.push({ tone: 'warn', title: `Emittente non più qualificato: ${m.provider}`, text: 'L’autorità di certificazione compare nell’elenco ufficiale, ma il suo servizio risulta ritirato o non più qualificato. La firma potrebbe essere stata valida solo in passato.' });
  } else if (m.kind === 'organisation') {
    out.push({ tone: 'warn', title: `Emittente non verificabile: ${m.provider}`, text: 'Il nome dell’organizzazione compare nell’elenco dei prestatori qualificati, ma questa specifica autorità di certificazione non è censita: potrebbe essere un’emittente diversa o non qualificata.' });
  } else {
    out.push({ tone: 'warn', title: 'Emittente non riconosciuto', text: valid ? 'Il certificato è nei termini di validità, ma chi lo ha emesso non compare nell’elenco dei prestatori qualificati italiani o rumeni.' : 'Chi ha emesso il certificato non compare nell’elenco dei prestatori qualificati italiani o rumeni.' });
  }
  return out;
}

const TONES = {
  ok: { bar: 'bg-emerald-500', chip: 'bg-emerald-50 text-emerald-700', Icon: CheckCircle2, label: 'OK' },
  warn: { bar: 'bg-amber-500', chip: 'bg-amber-50 text-amber-700', Icon: AlertTriangle, label: 'Attenzione' },
  bad: { bar: 'bg-red-500', chip: 'bg-red-50 text-red-700', Icon: XCircle, label: 'Problema' },
} as const;

function Verdict({ c }: { c: Check }) {
  const t = TONES[c.tone];
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#e6e8ec] bg-[#f4f5f7] py-4 pl-6 pr-5">
      <span className={`absolute inset-y-0 left-0 w-1.5 ${t.bar}`} />
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-extrabold uppercase ${t.chip}`}>
          <t.Icon size={13} /> {t.label}
        </span>
        <p className="font-extrabold leading-tight">{c.title}</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[#5b6270]">{c.text}</p>
    </div>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || '?';

function Field({ label, value, wide }: { label: string; value: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? 'col-span-2' : undefined}>
      <dt className="text-[11px] font-bold uppercase tracking-wider text-[#8a91a0]">{label}</dt>
      <dd className="mt-0.5 break-words text-sm font-semibold">{value}</dd>
    </div>
  );
}

function SignerBlock({ s, signedAt }: { s: P7mSigner; signedAt?: Date }) {
  return (
    <div className="rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#1f087a] text-lg font-extrabold text-white">
          {initials(s.commonName)}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a91a0]">Firmato da</p>
          <p className="truncate text-xl font-extrabold">{s.commonName}</p>
          {s.organization && s.organization !== s.commonName && (
            <p className="truncate text-sm text-[#5b6270]">{s.organization}</p>
          )}
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#eef0f3] pt-5">
        <Field label="Paese" value={countryName(s.country)} />
        {signedAt && <Field label="Data di firma" value={fmtFull(signedAt)} />}
        <Field label="Emesso da" value={s.issuer} wide />
        <Field label="Valido dal" value={fmtDay(s.notBefore)} />
        <Field label="Scade il" value={fmtDay(s.notAfter)} />
        <Field label="Numero seriale" value={<span className="font-mono text-xs">{s.serialHex}</span>} wide />
      </dl>
    </div>
  );
}

function TextEditor({ name, text }: { name: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const lines = text.split(/\r?\n/);
  if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="flex h-full min-h-[560px] flex-col bg-[#14112e] text-[#e7e4ff]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#0e0b24] px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="size-3 rounded-full bg-[#ff5f57]" />
          <i className="size-3 rounded-full bg-[#febc2e]" />
          <i className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center text-xs font-semibold text-white/70">{name}</span>
        <button onClick={copy} className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold text-white/80 hover:bg-white/10">
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copiato' : 'Copia'}
        </button>
      </div>
      <div className="max-h-[70vh] flex-1 overflow-auto py-4 font-mono text-[13px] leading-6">
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-white/5">
            <span className="w-14 shrink-0 select-none pr-4 text-right text-white/30">{i + 1}</span>
            <span className="min-w-0 flex-1 whitespace-pre-wrap break-words pr-6">{line || ' '}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t border-white/10 bg-[#0e0b24] px-4 py-1.5 text-[11px] font-semibold text-white/50">
        <span>{lines.length} righe</span>
        <span>UTF-8 · sola lettura</span>
      </div>
    </div>
  );
}

export default function P7mViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<P7mResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysing, setAnalysing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [showChecks, setShowChecks] = useState(false);

  // Hide the page title (server-rendered for SEO) once a document is being shown.
  useEffect(() => {
    document.body.toggleAttribute('data-has-result', Boolean(file));
    return () => document.body.removeAttribute('data-has-result');
  }, [file]);

  useEffect(() => {
    if (!result) return;
    if (result.kind === 'image') {
      const url = URL.createObjectURL(new Blob([result.bytes as BlobPart], { type: result.mime }));
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    if (result.kind === 'xml' || result.kind === 'text') {
      setText(new TextDecoder('utf-8').decode(result.bytes.subarray(0, 200_000)));
    }
  }, [result]);

  const open = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setResult(null);
    setPreviewUrl(null);
    setText(null);
    setError(null);
    setAnalysing(true);
    try {
      // The heavy ASN.1/PKI libraries are only loaded once a file is actually analysed.
      const { extractP7m } = await import('@/lib/p7m');
      setResult(extractP7m(await readBytes(f), f.name));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Impossibile leggere il file.');
    } finally {
      setAnalysing(false);
    }
  };

  const { unlocked, openPay, modals } = usePaywall({
    kind: 'p7m',
    bytes: result?.bytes ?? null,
    pending: file,
    onRestore: (f) => void open([f]),
  });

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  if (!file) {
    return <Dropzone accept=".p7m,.p7s,.pem,application/pkcs7-mime" label="Seleziona un file .p7m" onFiles={open} />;
  }

  const signers = result?.signers.filter((s) => s.isSigner) ?? [];
  const shown = signers.length ? signers : (result?.signers.slice(0, 1) ?? []);
  const checks = result ? shown.flatMap((s) => checkSigner(s, result.signingTime)) : [];

  return (
    // Break out of the narrow text column so the result can use two columns.
    <div className="relative left-1/2 w-[min(1200px,calc(100vw-40px))] -translate-x-1/2 space-y-6">
      <ErrorBox message={error} />

      {analysing && (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] py-24 text-lg font-semibold text-[#1f087a]">
          <Loader2 className="animate-spin" /> Analisi di {file.name} in corso…
        </div>
      )}

      {!result && !analysing && (
        <button onClick={reset} className="btn-ghost">
          <RotateCcw size={16} /> Riprova con un altro file
        </button>
      )}

      {result && (
        <>
          {/* Summary banner */}
          <div className="flex flex-col gap-5 rounded-3xl bg-[#1f087a] p-6 text-white md:flex-row md:items-center md:p-8">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
              <CheckCircle2 size={36} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Pronto da scaricare</p>
              <p className="mt-1 truncate text-2xl font-extrabold">{result.fileName}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-full bg-white/15 px-3 py-1">{KIND_LABEL[result.kind]}</span>
                <span className="rounded-full bg-white/15 px-3 py-1">{formatSize(result.bytes.length)}</span>
                {result.digestAlgorithm && (
                  <span className="rounded-full bg-white/15 px-3 py-1">{result.digestAlgorithm}</span>
                )}
                {result.layers > 1 && (
                  <span className="rounded-full bg-white/15 px-3 py-1">{result.layers} firme annidate</span>
                )}
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-extrabold text-[#1f087a] hover:bg-[#f0edff]"
                onClick={() =>
                  unlocked ? downloadBlob(result.bytes as BlobPart, result.fileName, result.mime) : openPay()
                }
              >
                {unlocked ? <Download size={18} /> : <Crown size={18} className="text-amber-500" />} Scarica
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 font-bold hover:bg-white/10"
              >
                <RotateCcw size={16} /> Nuovo file
              </button>
            </div>
          </div>

          {/* Details left, document right */}
          <div className="grid items-start gap-6 lg:grid-cols-[400px_1fr]">
            <div className="space-y-4">
              {shown.map((s, i) => (
                <SignerBlock key={i} s={s} signedAt={result.signingTime} />
              ))}
              <button
                onClick={() => setShowChecks((v) => !v)}
                aria-expanded={showChecks}
                className="flex w-full items-center justify-between rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] px-6 py-4 text-left font-extrabold"
              >
                <span>Controlli sulla firma ({checks.length || 1})</span>
                <ChevronDown size={20} className={`transition ${showChecks ? 'rotate-180' : ''}`} />
              </button>
              {showChecks && (
                <div className="space-y-4">
                  {shown.length === 0 && (
                    <Verdict c={{ tone: 'warn', title: 'Nessun certificato nel file', text: 'La busta non contiene certificati: non è possibile mostrare i dati del firmatario.' }} />
                  )}
                  {checks.map((c) => (
                    <Verdict key={c.title} c={c} />
                  ))}
                </div>
              )}
              <div className="rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
                <h3 className="flex items-center gap-2 font-extrabold">
                  <Info size={17} className="text-[#5b6270]" /> Dimensioni
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-5">
                  <Field label="File P7M" value={formatSize(result.p7mSize)} />
                  <Field label="Documento" value={formatSize(result.bytes.length)} />
                </dl>
              </div>
              <p className="px-1 text-xs leading-relaxed text-[#8a91a0]">
                L’emittente viene confrontato con gli elenchi ufficiali dei prestatori qualificati di Italia (AgID) e
                Romania (ADR), incorporati in ApriDoc.com e non aggiornati in tempo reale. ApriDoc.com non verifica la
                firma crittografica, la revoca né la catena di certificazione: per verifiche con valore legale usa un
                software qualificato.
              </p>
            </div>

            <div className="relative min-h-[560px] overflow-hidden rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7]">
              {!unlocked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/30">
                  <button
                    onClick={openPay}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1f087a] px-6 py-3 font-extrabold text-white shadow-lg hover:bg-[#2a0d9c]"
                  >
                    <Lock size={18} /> Sblocca il documento
                  </button>
                </div>
              )}
              <div className={unlocked ? undefined : 'pointer-events-none select-none blur-md'} aria-hidden={!unlocked}>
              {result.kind === 'pdf' ? (
                <PdfPreview bytes={result.bytes} />
              ) : result.kind === 'image' && previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt={result.fileName} className="mx-auto max-h-[75vh] max-w-full p-4" />
              ) : text ? (
                <TextEditor name={result.fileName} text={unlocked ? text : text.replace(/\S/g, '\u2592')} />
              ) : (
                <div className="flex min-h-[560px] flex-col items-center justify-center px-6 text-center">
                  <FileText size={64} strokeWidth={1.2} className="text-[#9aa1ad]" />
                  <p className="mt-5 text-lg font-bold text-[#5b6270]">Anteprima non disponibile</p>
                  <p className="mt-1 text-[#8a91a0]">Scarica il file per aprirlo con l’applicazione appropriata.</p>
                </div>
              )}
              </div>
            </div>
          </div>
        </>
      )}

      {modals}
    </div>
  );
}
