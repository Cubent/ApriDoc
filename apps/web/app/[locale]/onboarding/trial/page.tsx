import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { redirect } from 'next/navigation';
import { OnboardingTrialContent } from './components/onboarding-trial-content';

// Landing here having already finished the questionnaire (a UserPreference
// row exists) means there is nothing left to ask. Send them straight to
// their dashboard instead of making them redo an 8-step form. Middleware
// already guarantees a signed-in user here.
const OnboardingTrialPage = async () => {
  const { userId } = await auth();

  const preference = userId
    ? await database.userPreference.findUnique({ where: { clerkUserId: userId } })
    : null;

  if (preference) {
    redirect('/dashboard');
  }

  return <OnboardingTrialContent />;
};

export default OnboardingTrialPage;
