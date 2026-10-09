'use client';

import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import { CreditCard, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { BILLING_ENABLED } from '@/lib/billing';

const Start = () => (
  <Link href="/#strumenti" className="btn-primary !rounded-lg !px-5 !py-2 text-sm">
    Inizia ora
  </Link>
);

export function HeaderAccount() {
  if (!BILLING_ENABLED) return <div className="hidden lg:block"><Start /></div>;
  return (
    <>
      <Show when="signed-out">
        {/* On phones both live in the menu instead */}
        <div className="hidden items-center gap-4 lg:flex">
          <SignInButton mode="modal">
            <button className="text-sm font-bold hover:text-[#1f087a]">Accedi</button>
          </SignInButton>
          <Start />
        </div>
      </Show>
      <Show when="signed-in">
        <UserButton userProfileUrl="/account" userProfileMode="navigation">
          <UserButton.MenuItems>
            <UserButton.Link label="Dashboard" labelIcon={<LayoutDashboard size={16} />} href="/dashboard" />
            <UserButton.Link label="Fatturazione" labelIcon={<CreditCard size={16} />} href="/dashboard#abbonamento" />
          </UserButton.MenuItems>
        </UserButton>
      </Show>
    </>
  );
}
