'use client';

import { useAuth, useClerk } from '@clerk/nextjs';
import { BILLING_ENABLED } from '@/lib/billing';

type Account = {
  signedIn: boolean;
  /** False while Clerk is still working out whether anyone is signed in. */
  loaded: boolean;
  openSignUp: (redirectUrl: string, email?: string) => void;
  openSignIn: (redirectUrl: string) => void;
};

const none: Account = { signedIn: false, loaded: true, openSignUp: () => undefined, openSignIn: () => undefined };

// BILLING_ENABLED is fixed at build time, so the same hooks run on every render.
function useClerkAccount(): Account {
  const { isSignedIn, isLoaded } = useAuth();
  const clerk = useClerk();
  return {
    signedIn: Boolean(isSignedIn),
    loaded: isLoaded,
    openSignUp: (url, email) =>
      clerk.openSignUp({
        forceRedirectUrl: url,
        signInForceRedirectUrl: url,
        ...(email ? { initialValues: { emailAddress: email } } : {}),
      }),
    openSignIn: (url) => clerk.openSignIn({ forceRedirectUrl: url, signUpForceRedirectUrl: url }),
  };
}

export const useAccount: () => Account = BILLING_ENABLED ? useClerkAccount : () => none;
