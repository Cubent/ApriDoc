import Link from 'next/link';
import { Logo } from './header';

export function Footer() {
  return (
    <footer className="mt-20 bg-[#120a3d] text-white/75">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-md text-sm leading-relaxed">
            ApriDoc.com è una raccolta di strumenti gratuiti per aprire file .p7m e lavorare con i
            PDF. L’elaborazione avviene nel tuo browser: i documenti non vengono caricati su
            nessun server.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Strumenti</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/strumenti/apri-file-p7m" className="hover:text-white">Aprire file P7M</Link></li>
            <li><Link href="/strumenti/unisci-pdf" className="hover:text-white">Unisci PDF</Link></li>
            <li><Link href="/strumenti/dividere-pdf" className="hover:text-white">Dividere PDF</Link></li>
            <li><Link href="/strumenti/jpg-in-pdf" className="hover:text-white">JPG in PDF</Link></li>
            <li><Link href="/strumenti/pdf-in-jpg" className="hover:text-white">PDF in JPG</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Informazioni</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#faq" className="hover:text-white">Domande frequenti</Link></li>
            <li><Link href="/#strumenti" className="hover:text-white">Tutti gli strumenti</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Informativa sulla Privacy</Link></li>
            <li><Link href="/termini-e-condizioni" className="hover:text-white">Termini e Condizioni</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} ApriDoc.com — Strumenti online per documenti e PDF</span>
          <span className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/termini-e-condizioni" className="hover:text-white">Termini e Condizioni</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
