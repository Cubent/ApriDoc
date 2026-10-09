import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const handler = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? clerkMiddleware() : () => NextResponse.next();

export default handler;

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/(api)(.*)'],
};
