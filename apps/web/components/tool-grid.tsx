'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES, TOOLS, type Category } from '@/lib/tools';
import { ToolIcon } from './tool-icon';

export function ToolGrid() {
  const [cat, setCat] = useState<'tutti' | Category>('tutti');
  const tools = TOOLS.filter((t) => cat === 'tutti' || t.category === cat);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2.5">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`rounded-full border px-5 py-2.5 text-[15px] font-semibold transition ${
              cat === c.id
                ? 'border-[#1f2430] bg-[#1f2430] text-white'
                : 'border-[#e6e8ec] bg-[#f4f5f7] hover:bg-[#fafafa]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {tools.map((t) => {
          const body = (
            <>
              <div className="flex items-start justify-between">
                <ToolIcon name={t.icon} color={t.color} size={52} />
                {!t.ready && (
                  <span className="rounded-full bg-[#eef0f3] px-2.5 py-1 text-[11px] font-bold uppercase text-[#6b7280]">
                    Presto
                  </span>
                )}
                {t.featured && (
                  <span className="rounded-full bg-[#1f087a] px-2.5 py-1 text-[11px] font-bold uppercase text-white">
                    Nuovo
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-[19px] font-bold leading-snug">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6270]">{t.description}</p>
            </>
          );
          const cls =
            'block min-h-[230px] rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6 transition';
          return t.ready ? (
            <Link
              key={t.slug}
              href={`/strumenti/${t.slug}`}
              className={`${cls} hover:-translate-y-0.5`}
            >
              {body}
            </Link>
          ) : (
            <div key={t.slug} className={`${cls} opacity-60`} aria-disabled="true">
              {body}
            </div>
          );
        })}
      </div>
    </div>
  );
}
