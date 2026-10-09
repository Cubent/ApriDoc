import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

function limited(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { ok, retryAfter } = rateLimit(req.nextUrl.pathname, ip);
  if (ok) return null;
  return NextResponse.json(
    { error: 'Troppe richieste: riprova tra qualche istante.' },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } },
  );
}

const clerk = clerkMiddleware((_auth, req) => limited(req) ?? undefined);
const plain = (req: NextRequest) => limited(req) ?? NextResponse.next();

export default process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? clerk : plain;

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/(api)(.*)'],
};
