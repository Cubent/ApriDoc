import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SITE } from '@/lib/tools';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const font = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

const title = 'ApriDoc.com — Apri File P7M e Strumenti PDF Online Gratis';
const description =
  'Apri file .p7m online, unisci, dividi, ruota e converti PDF direttamente nel browser. Gratis, senza registrazione e senza caricare i tuoi documenti su nessun server.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: '%s' },
  description,
  keywords: [
    'aprire file p7m',
    'p7m viewer',
    'unisci pdf',
    'dividere pdf',
    'jpg in pdf',
    'strumenti pdf online',
    'firma digitale',
    'ApriDoc',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'it_IT',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = { themeColor: '#1f087a' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={font.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
