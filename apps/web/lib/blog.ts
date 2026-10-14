export type PostMeta = {
  slug: string;
  title: string;
  /** Meta description and card summary. */
  description: string;
  category: string;
  /** ISO dates, used for display and structured data. */
  published: string;
  updated: string;
  readingMinutes: number;
  keywords: string[];
};

export const POSTS: PostMeta[] = [
  {
    slug: 'file-p7m-cosa-sono',
    title: 'File P7M: cosa sono, come funzionano e come si aprono',
    description:
      'Cos’è un file .p7m, cosa contiene la busta di firma digitale CAdES, che differenza c’è con .p7s e PAdES, che valore legale ha e come aprirlo senza software.',
    category: 'Firma digitale',
    published: '2026-10-09',
    updated: '2026-10-09',
    readingMinutes: 9,
    keywords: ['file p7m', 'cos’è un file p7m', 'p7m cosa sono', 'firma digitale cades', 'aprire file p7m', 'differenza p7m p7s'],
  },
  {
    slug: 'come-aprire-file-p7m',
    title: 'Come aprire un file P7M: guida passo passo',
    description:
      'Come aprire un file .p7m in 3 passaggi, senza installare programmi: estrai il documento dalla busta di firma, scaricalo e scopri cosa fare se non si apre.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 6,
    keywords: ['aprire file p7m', 'come aprire file p7m', 'file p7m come aprire', 'aprire p7m online', 'estrarre pdf da p7m', 'p7m non si apre'],
  },
  {
    slug: 'p7m-viewer-online',
    title: 'P7M viewer online: come leggere un file firmato senza software',
    description:
      'Cos’è un P7M viewer, cosa mostra, come scegliere uno strumento affidabile e perché conviene elaborare il file nel browser. Online, senza installare nulla.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 5,
    keywords: ['p7m viewer', 'p7m viewer online', 'leggere file p7m', 'visualizzare p7m', 'aprire p7m senza software', 'lettore p7m'],
  },
  {
    slug: 'aprire-file-p7m-su-mac',
    title: 'Come aprire un file P7M su Mac',
    description:
      'Tre modi per aprire un file .p7m su macOS: dal browser, dal Terminale con openssl o con un software di firma. Passaggi chiari e problemi frequenti.',
    category: 'Guide P7M',
    published: '2026-10-14',
    updated: '2026-10-14',
    readingMinutes: 6,
    keywords: ['p7m mac', 'aprire p7m su mac', 'aprire file p7m mac', 'p7m macos', 'estrarre p7m mac', 'leggere p7m su mac'],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('it-IT', { dateStyle: 'long', timeZone: 'UTC' });
