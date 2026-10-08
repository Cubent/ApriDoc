import Link from 'next/link';
import type { ReactNode } from 'react';
import { LEGAL } from '@/lib/legal';

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-14">
      <nav className="mb-6 text-sm text-[#5b6270]">
        <Link href="/" className="hover:underline">Home</Link> › <span>{title}</span>
      </nav>

      <header className="mb-10 border-b border-[#e6e8ec] pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#5b6270]">{intro}</p>
        <p className="mt-4 text-sm font-semibold text-[#8a91a0]">
          Ultimo aggiornamento: <time dateTime={LEGAL.updatedIso}>{LEGAL.updated}</time>
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#8a91a0]">Indice</p>
          <ol className="space-y-2 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex gap-2 text-[#3d4452] hover:text-[#1f087a]">
                  <span className="w-5 shrink-0 font-bold text-[#8a91a0]">{i + 1}.</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="mb-3 text-2xl font-extrabold">
                {i + 1}. {s.title}
              </h2>
              <div className="space-y-3 text-[17px] leading-relaxed text-[#3d4452] [&_a]:font-semibold [&_a]:text-[#1f087a] [&_a]:underline [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-6 [&_strong]:text-[#1f2430] [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
                {s.body}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
