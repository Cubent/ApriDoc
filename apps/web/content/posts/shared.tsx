import type { ReactNode } from 'react';

export const Callout = ({ children }: { children: ReactNode }) => (
  <aside className="my-8 rounded-2xl border border-[#d9d3f2] bg-[#f6f4ff] p-5 text-[15px] leading-7 text-[#3d4452]">
    {children}
  </aside>
);

export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-[#e6e8ec]">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-[#f4f5f7] text-xs font-bold uppercase tracking-wider text-[#8a91a0]">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef0f3] text-[#3d4452]">
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-semibold' : ''}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
