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
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('it-IT', { dateStyle: 'long', timeZone: 'UTC' });
