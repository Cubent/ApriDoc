import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import type { ReactNode } from 'react';
import { prepareNextSet } from '@/lib/prepare-practice-set';
import { getPaymentIssue, getSubscription } from '@/lib/subscription';
import { DashboardShell } from './components/dashboard-shell';

// Neon's serverless Postgres suspends its compute when idle and takes several
// seconds to wake on the first query after that. The platform default
// function timeout doesn't leave enough headroom for that cold start on top
// of the Lambda's own cold start, so requests can die mid-query with no
// application-level log. Also needs headroom for prepareNextSet running in
// the background below, which can itself take a while — see the timing
// numbers in prepare-practice-set.ts.
export const maxDuration = 60;

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();

  const preference = userId
    ? await database.userPreference.findUnique({ where: { clerkUserId: userId } })
    : null;

  // Someone who has not answered the onboarding questionnaire yet (no
  // UserPreference row) has not picked an exam, so there is nothing to show
  // them here. This also covers returning sign-ins: Clerk's sign-in page
  // always lands on /dashboard, and only a user who never finished
  // onboarding gets bounced from here.
  if (userId && !preference) {
    redirect('/onboarding/trial');
  }

  // Someone who never started a trial/subscription at all has no reason to
  // be in the dashboard yet — send them to start one. Once a subscription
  // exists (even a lapsed/canceled one), they're let through: only
  // question-practice itself is gated after that (see
  // dashboard/practice/page.tsx and the dashboard overview), so they can
  // still reach account/billing to reactivate. Middleware already
  // guarantees a signed-in user here.
  const subscription = userId ? await getSubscription(userId) : null;
  if (userId && subscription === null) {
    redirect('/paywall');
  }

  // Shown as a bar above the header on every dashboard page (see
  // dashboard-shell.tsx) when Stripe could not charge the customer.
  const paymentIssue = subscription ? await getPaymentIssue(subscription) : null;

  // Start filling the next practice set the moment someone lands anywhere in
  // the dashboard, not when they open Practice — prepareNextSet no-ops if a
  // full set already exists, so this is safe to fire on every dashboard
  // page load. Runs after the response via after() so it never slows this
  // page down; by the time they click into Practice, it's usually ready.
  if (userId && preference) {
    after(() => prepareNextSet(userId, preference.exam, preference.focusSystemIds));
  }

  // New users (no answered questions yet) get a one-time welcome popup.
  const hasAnsweredQuestions = userId
    ? Boolean(
        await database.userQuestionAttempt.findFirst({
          where: { clerkUserId: userId },
          select: { id: true },
        })
      )
    : true;

  return (
    <DashboardShell
      currentExam={preference?.exam ?? null}
      examSelectedAt={preference?.examSelectedAt?.toISOString() ?? null}
      showWelcome={!hasAnsweredQuestions}
      paymentIssue={
        paymentIssue
          ? { afterTrial: paymentIssue.afterTrial, accessEndsAt: paymentIssue.accessEndsAt?.toISOString() ?? null }
          : null
      }
    >
      {children}
    </DashboardShell>
  );
};

export default DashboardLayout;
