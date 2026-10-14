import type { ReactNode } from 'react';

export const Callout = ({ children }: { children: ReactNode }) => (
  <aside className="my-8 rounded-2xl border border-[#d9d3f2] bg-[#f6f4ff] p-5 text-[15px] leading-7 text-[#3d4452]">
    {children}
  </aside>
);
