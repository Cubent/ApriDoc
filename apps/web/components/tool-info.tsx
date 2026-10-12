import { Check } from 'lucide-react';
import type { Point, ToolInfo } from '@/lib/tool-content';

const ACCENT = 'text-[#e5574a]';

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 text-lg leading-relaxed text-[#3d4452]">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function Checklist({ points }: { points: Point[] }) {
  return (
    <ul className="space-y-4">
      {points.map((p) => (
        <li key={p.title} className="flex gap-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e5574a] text-white">
            <Check size={14} strokeWidth={3} />
          </span>
          <span>
            <strong className="block font-extrabold">{p.title}</strong>
            <span className="text-sm leading-relaxed text-[#5b6270]">{p.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Explanatory SEO section below a PDF tool. Each tool picks one of a few layouts. */
export function ToolInfoSection({ info }: { info: ToolInfo }) {
  const { layout, title, paragraphs, points, steps } = info;
  const h2 = 'text-2xl font-extrabold leading-tight md:text-3xl';

  if (layout === 'cards') {
    return (
      <section className="tool-extra mt-14">
        <h2 className={`${h2} text-center`}>{title}</h2>
        <div className="mx-auto mt-5 max-w-3xl"><Paragraphs items={paragraphs} /></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
              <h3 className={`text-lg font-extrabold ${ACCENT}`}>{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6270]">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (layout === 'grid') {
    return (
      <section className="tool-extra mt-14">
        <h2 className={h2}>{title}</h2>
        <div className="mt-5 max-w-3xl"><Paragraphs items={paragraphs} /></div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {points.map((p, i) => (
            <div key={p.title} className="flex gap-4 rounded-2xl border border-[#e6e8ec] p-5">
              <span className={`text-3xl font-extrabold leading-none ${ACCENT}`}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-extrabold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#5b6270]">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (layout === 'steps') {
    return (
      <section className="tool-extra mt-14">
        <h2 className={`${h2} text-center`}>{title}</h2>
        <div className="mx-auto mt-5 max-w-3xl"><Paragraphs items={paragraphs} /></div>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-[#f4f5f7] p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#e5574a] font-extrabold text-white">{i + 1}</span>
              <h3 className="mt-3 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5b6270]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-2xl border border-[#e6e8ec] p-6">
          <h3 className="mb-4 text-lg font-extrabold">Punti di forza</h3>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p.title}><Checklist points={[p]} /></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'timeline') {
    return (
      <section className="tool-extra mt-14">
        <h2 className={h2}>{title}</h2>
        <div className="mt-5 max-w-3xl"><Paragraphs items={paragraphs} /></div>
        <ol className="mt-8 space-y-6 border-l-2 border-[#e5574a]/30 pl-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="absolute -left-[2.15rem] flex size-7 items-center justify-center rounded-full bg-[#e5574a] text-sm font-extrabold text-white">{i + 1}</span>
              <h3 className="text-lg font-extrabold">{s.title}</h3>
              <p className="text-[#5b6270]">{s.text}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-8 flex flex-wrap gap-3">
          {points.map((p) => (
            <li key={p.title} className="rounded-full border border-[#e6e8ec] bg-[#f4f5f7] px-4 py-2 text-sm">
              <strong>{p.title}:</strong> <span className="text-[#5b6270]">{p.text}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (layout === 'banner') {
    return (
      <section className="tool-extra mt-14">
        <div className="rounded-3xl bg-[#e5574a]/10 p-8 md:p-10">
          <h2 className={h2}>{title}</h2>
          <div className="mt-4 max-w-3xl"><Paragraphs items={paragraphs} /></div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {points.map((p) => (
              <li key={p.title} title={p.text} className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
                <Check size={14} strokeWidth={3} className={ACCENT} /> {p.title}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // split
  return (
    <section className="tool-extra mt-14 grid items-start gap-8 md:grid-cols-2">
      <div className={info.reverse ? 'md:order-2' : undefined}>
        <h2 className={h2}>{title}</h2>
        <div className="mt-4"><Paragraphs items={paragraphs} /></div>
      </div>
      <div className={`rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6 ${info.reverse ? 'md:order-1' : ''}`}>
        <Checklist points={points} />
      </div>
    </section>
  );
}
