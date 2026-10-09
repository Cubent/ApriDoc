import Link from 'next/link';
import { HeaderAccount } from './header-account';
import { MobileMenu } from './mobile-menu';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="ApriDoc.com — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png?v=4" alt="" width={40} height={40} className="size-10" />
      <span className={`text-2xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-[#1f2430]'}`}>
        Apri<span className={light ? 'text-[#b9a8ff]' : 'text-[#1f087a]'}>Doc</span>
      </span>
    </Link>
  );
}

const NAV = [
  ['Apri P7M', '/strumenti/apri-file-p7m'],
  ['Unisci PDF', '/strumenti/unisci-pdf'],
  ['Dividere PDF', '/strumenti/dividere-pdf'],
  ['JPG in PDF', '/strumenti/jpg-in-pdf'],
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e6e8ec] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-6 px-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-[13px] font-bold uppercase tracking-wide lg:flex">
          {NAV.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-[#1f087a]">
              {label}
            </Link>
          ))}
          <Link href="/#strumenti" className="hover:text-[#1f087a]">
            Tutti gli strumenti
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <HeaderAccount />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
