import { BadgeCheck, CheckCircle2, FileText } from 'lucide-react';
import Link from 'next/link';

const POINTS = [
  'Estrai il PDF da qualsiasi file .p7m, anche con più firme annidate',
  'Controlla firmatario, validità del certificato ed emittente qualificato',
  'Lavora nel browser: nessun upload, nessuna registrazione, anche da smartphone',
];

function Illustration() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[460px]" aria-hidden="true">
      {/* background shapes */}
      <div className="absolute right-4 top-0 h-44 w-[75%] rounded-[2rem] border-[3px] border-[#b9a8ff]" />
      <div className="absolute bottom-0 right-4 h-[78%] w-[78%] rounded-[2rem] bg-[#1f087a]" />

      {/* document */}
      <div className="absolute left-[14%] top-6 w-[66%] rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-5">
        <div className="h-1.5 w-12 rounded bg-[#1f087a]" />
        <p className="mt-3 text-sm font-extrabold leading-tight">
          Contratto di servizio
          <br />
          firmato digitalmente
        </p>
        <div className="mt-4 space-y-1.5">
          {[100, 92, 96, 70, 88].map((w, i) => (
            <div key={i} className="h-1.5 rounded bg-[#e9ebf0]" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-5 rounded-xl bg-[#f3f1ff] p-3">
          <svg viewBox="0 0 160 50" className="h-10 w-full" fill="none">
            <path
              d="M6 38c10-26 18-30 22-22 4 9-8 22-4 24 6 3 14-18 24-20 8-1 4 14 12 14 7 0 10-12 16-12 5 0 5 10 12 10 8 0 20-8 40-8"
              stroke="#1f087a"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* P7M badge */}
      <div className="absolute -left-1 bottom-24 flex items-center gap-2 rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] px-4 py-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#1f087a]/10 text-[#1f087a]">
          <FileText size={18} />
        </span>
        <div className="text-left leading-tight">
          <p className="text-sm font-extrabold">contratto.pdf.p7m</p>
          <p className="text-[11px] font-semibold text-[#8a91a0]">Busta firmata CAdES</p>
        </div>
      </div>

      {/* result chip */}
      <div className="absolute bottom-6 right-0 flex items-center gap-2 rounded-2xl bg-white px-4 py-3">
        <BadgeCheck size={22} className="text-emerald-600" />
        <p className="text-sm font-extrabold">Pronto da scaricare</p>
      </div>
    </div>
  );
}

export function PromoSection() {
  return (
    <section className="mx-auto mt-16 max-w-[1400px] px-5">
      <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-[#ece8ff] px-8 py-12 md:px-14 lg:grid-cols-[1.1fr_1fr] lg:py-14">
        <div>
          <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            Dal file firmato al documento, in un clic
          </h2>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-lg leading-snug text-[#3d4452]">
                <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-[#1f087a]" />
                {p}
              </li>
            ))}
          </ul>
          <Link href="/strumenti/apri-file-p7m" className="btn-primary mt-10 !px-8 !py-4 text-lg">
            Apri un file P7M
          </Link>
        </div>
        <Illustration />
      </div>
    </section>
  );
}
