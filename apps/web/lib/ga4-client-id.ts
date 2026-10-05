// GA4's gtag.js stores its anonymous per-visitor id in the `_ga` cookie as
// `GA1.1.<id-part-1>.<id-part-2>`. The client_id is the last two dot-separated
// segments joined back together. Reading it here (instead of the async
// `gtag('get', ...)` callback) keeps the checkout click handler synchronous.
export const getGaClientId = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]+)/);
  if (!match) return undefined;
  const parts = match[1].split('.');
  if (parts.length < 4) return undefined;
  return `${parts[2]}.${parts[3]}`;
};
