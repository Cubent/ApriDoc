import { SignInButton, UserProfile } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BILLING_ENABLED } from '@/lib/billing';

export const metadata: Metadata = { title: 'Account — ApriDoc.com', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  if (!BILLING_ENABLED) notFound();
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Accedi per gestire il tuo account</h1>
        <SignInButton mode="modal">
          <button className="btn-primary mt-6">Accedi</button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[1000px] justify-center px-5 py-10">
      <UserProfile path="/account" routing="path" />
    </div>
  );
}
