import { auth } from '@clerk/nextjs/server';
import { getSubscription, resolveAccess } from '@/lib/subscription';
import { PracticeLocked } from '../components/practice-locked';
import { QuestionPlayer } from './components/question-player';

const PracticePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) => {
  const { preview } = await searchParams;
  // ?preview=locked forces the locked state on so we can see it without
  // waiting on a real trial to end (dev server only, see payment-failed-banner
  // for the same pattern).
  const forceLocked = preview === 'locked' && process.env.NODE_ENV === 'development';

  const { userId } = await auth();
  const subscription = userId ? await getSubscription(userId) : null;
  const allowed = forceLocked ? false : (await resolveAccess(subscription)).allowed;

  if (!allowed) {
    return (
      <div className="mx-auto max-w-2xl">
        <PracticeLocked hadAccessBefore={forceLocked ? true : subscription !== null} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <QuestionPlayer />
    </div>
  );
};

export default PracticePage;
