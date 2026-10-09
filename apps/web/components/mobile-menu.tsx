'use client';

import { Show, SignInButton } from '@clerk/nextjs';
import { ArrowUpRight, Grip, LayoutDashboard, UserRound, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BILLING_ENABLED } from '@/lib/billing';
import { TOOLS } from '@/lib/tools';
import { ToolIcon } from './tool-icon';

const LEGAL = [
  ['Privacy', '/privacy-policy'],
  ['Termini e condizioni', '/termini-e-condizioni'],
] as const;

function Row({ href, icon, label, onNavigate }: { href: string; icon: React.ReactNode; label: string; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center justify-between border-b border-[#eef0f3] py-3.5 text-[15px] font-semibold last:border-0"
    >
      <span className="flex items-center gap-3">
        <span className="text-[#5b6270]">{icon}</span>
        {label}
      </span>
      <ArrowUpRight size={16} className="text-[#9aa1ad]" />
    </Link>
  );
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const tools = TOOLS.filter((t) => t.ready);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Apri il menu"
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-xl border border-[#e6e8ec] text-[#1f2430] lg:hidden"
      >
        <Grip size={20} />
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="absolute inset-0 bg-black/30" onClick={close} />
            <div className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto rounded-b-3xl bg-white px-5 pb-6 pt-3 shadow-2xl">
              <div className="flex h-12 items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8a91a0]">Strumenti</span>
                <button
                  onClick={close}
                  aria-label="Chiudi il menu"
                  className="flex size-10 items-center justify-center rounded-xl border border-[#e6e8ec]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {tools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/strumenti/${t.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-3"
                  >
                    <ToolIcon name={t.icon} color={t.color} size={36} />
                    <span className="text-[13px] font-semibold leading-tight">{t.short}</span>
                  </Link>
                ))}
              </div>

              <p className="mb-1 mt-7 text-xs font-bold uppercase tracking-widest text-[#8a91a0]">Account</p>
              <div>
                {BILLING_ENABLED ? (
                  <>
                    <Show when="signed-in">
                      <Row href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" onNavigate={close} />
                      <Row href="/account" icon={<UserRound size={18} />} label="Gestisci account" onNavigate={close} />
                    </Show>
                    <Show when="signed-out">
                      <SignInButton mode="modal">
                        <button
                          onClick={close}
                          className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-semibold"
                        >
                          <span className="flex items-center gap-3">
                            <UserRound size={18} className="text-[#5b6270]" /> Accedi
                          </span>
                          <ArrowUpRight size={16} className="text-[#9aa1ad]" />
                        </button>
                      </SignInButton>
                    </Show>
                  </>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-t border-[#eef0f3] pt-4 text-sm text-[#5b6270]">
                {LEGAL.map(([label, href]) => (
                  <Link key={href} href={href} onClick={close} className="hover:underline">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
