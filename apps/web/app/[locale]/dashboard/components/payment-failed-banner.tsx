const DAY_MS = 86_400_000;

/** Shared by the layout's data fetch and the top bar in dashboard-shell.tsx. */
export const deadlineText = (accessEndsAt: Date | null, now: number) => {
  if (!accessEndsAt) return 'You may lose access soon unless you update your payment method.';
  const msLeft = accessEndsAt.getTime() - now;
  const days = Math.ceil(msLeft / DAY_MS);
  if (days <= 1) return 'You will lose access within 24 hours unless you update your payment method.';
  return `You will lose access in ${days} days unless you update your payment method.`;
};
