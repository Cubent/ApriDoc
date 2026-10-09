// Small in-memory limiter for the API routes (fixed window per IP and route).
// Serverless instances each keep their own counters, so this blunts abuse rather than guaranteeing a hard cap.
const LIMITS: Record<string, { max: number; windowMs: number }> = {
  '/api/checkout': { max: 10, windowMs: 60_000 },
  '/api/claim': { max: 10, windowMs: 60_000 },
  '/api/billing-portal': { max: 10, windowMs: 60_000 },
  '/api/entitlement': { max: 60, windowMs: 60_000 },
};

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(pathname: string, ip: string): { ok: boolean; retryAfter: number } {
  const rule = LIMITS[pathname];
  if (!rule) return { ok: true, retryAfter: 0 };

  const now = Date.now();
  const key = `${pathname}:${ip}`;
  const hit = hits.get(key);

  if (!hit || hit.resetAt <= now) {
    if (hits.size > 5_000) for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    hits.set(key, { count: 1, resetAt: now + rule.windowMs });
    return { ok: true, retryAfter: 0 };
  }

  hit.count += 1;
  return hit.count <= rule.max
    ? { ok: true, retryAfter: 0 }
    : { ok: false, retryAfter: Math.ceil((hit.resetAt - now) / 1000) };
}
