'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HeaderAuth } from '../(home)/components/header-auth';

const USMLE_STEPS = [
  { href: '/usmle-step-1-question-bank', label: 'USMLE Step 1', description: 'Foundational science and clinical knowledge.' },
  { href: '/usmle-step-2-question-bank', label: 'USMLE Step 2 CK', description: 'Clinical knowledge for clerkship-level decisions.' },
  { href: '/usmle-step-3-question-bank', label: 'USMLE Step 3', description: 'Independent practice: diagnosis, management, follow-up.' },
];

const UsmleDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 hover:text-[#06005A] transition-colors"
      >
        USMLE
        <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Always in the DOM (not conditionally mounted): visibility is CSS-only, so the
          three exam links are present in the static HTML and crawlable even though the
          panel is visually collapsed until a visitor opens it. */}
      <div
        role="menu"
        className={`absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-2 text-left shadow-xl transition-all duration-150 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        {USMLE_STEPS.map(({ href, label, description }) => (
          <Link
            key={href}
            href={href}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50"
          >
            <span className="block text-sm font-semibold text-black">{label}</span>
            <span className="block text-xs leading-relaxed text-gray-500">{description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const SiteHeader = () => (
  <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
    <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-3">
        <img
          src="/animateos-logo (1).png"
          alt="MedPrep Institute Logo"
          className="h-8 w-8 rounded-lg object-cover"
        />
        <span className="text-xl font-medium text-[#06005A]">MedPrep Institute</span>
      </Link>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-sm font-medium text-gray-600 lg:flex">
        <UsmleDropdown />
        <Link href="/abim-internal-medicine-question-bank" className="hover:text-[#06005A] transition-colors">
          ABIM
        </Link>
        <Link href="/#how-it-works" className="hover:text-[#06005A] transition-colors">
          Method
        </Link>
        <Link href="/about" className="hover:text-[#06005A] transition-colors">
          About
        </Link>
        <Link href="/blog" className="hover:text-[#06005A] transition-colors">
          Blog
        </Link>
        <Link href="/contact" className="hover:text-[#06005A] transition-colors">
          Contact
        </Link>
      </nav>

      <HeaderAuth />
    </div>
  </header>
);
