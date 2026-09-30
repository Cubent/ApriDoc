import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getSubscription } from '@/lib/subscription';
import { DashboardShell } from './components/dashboard-shell';

// Neon's serverless Postgres suspends its compute when idle and takes several
// seconds to wake on the first query after that. The platform default
// function timeout doesn't leave enough headroom for that cold start on top
// of the Lambda's own cold start, so requests can die mid-query with no
// application-level log. Applies to every route nested under this layout.
export const maxDuration = 30;

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();

  // Someone who never started a trial/subscription at all has no reason to
  // be in the dashboard yet — send them to start one. Once a subscription
  // exists (even a lapsed/canceled one), they're let through: only
  // question-practice itself is gated after that (see
  // dashboard/practice/page.tsx and the dashboard overview), so they can
  // still reach account/billing to reactivate. Middleware already
  // guarantees a signed-in user here.
  if (userId && (await getSubscription(userId)) === null) {
    redirect('/paywall');
  }

  const preference = userId
    ? await database.userPreference.findUnique({ where: { clerkUserId: userId } })
    : null;

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
    >
      {children}
    </DashboardShell>
  );
};

export default DashboardLayout;
