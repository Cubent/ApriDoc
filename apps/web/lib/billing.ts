export const PRICES = {
  single: { cents: 499, label: '€4,99' },
  yearly: { cents: 1899, label: '€18,99' },
} as const;

export type Plan = keyof typeof PRICES;

/** Clerk is optional at build time so deployments without keys still work. */
export const BILLING_ENABLED = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
