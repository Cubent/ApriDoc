export const PRICES = {
  single: { cents: 499, label: '€4,99' },
  singlePdf: { cents: 299, label: '€2,99' },
  yearly: { cents: 1899, label: '€18,99' },
} as const;

export type Plan = 'single' | 'yearly';
/** What is being downloaded: the document inside a P7M, or the result of a PDF tool. */
export type Kind = 'p7m' | 'pdf';

export const singlePrice = (kind: Kind) => (kind === 'pdf' ? PRICES.singlePdf : PRICES.single);

/** Clerk is optional at build time so deployments without keys still work. */
export const BILLING_ENABLED = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
