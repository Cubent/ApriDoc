'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import type { Faq } from '@/lib/tool-content';

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border bg-[#f4f5f7] transition ${
              isOpen ? 'border-[#1f087a]/40' : 'border-[#e6e8ec]'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-6 py-5 text-left"
            >
              <span className="flex-1 text-lg font-bold">{f.q}</span>
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-full transition ${
                  isOpen ? 'rotate-45 bg-[#1f087a] text-white' : 'bg-[#1f087a]/10 text-[#1f087a]'
                }`}
              >
                <Plus size={20} />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-[#5b6270]">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
