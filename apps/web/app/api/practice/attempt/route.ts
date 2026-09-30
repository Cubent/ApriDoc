import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { recordAttempt } from '@repo/database/qbank';
import { prepareNextSet, prepareUpcomingSet } from '@/lib/prepare-practice-set';
import { after, NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const questionId = body?.questionId as string | undefined;
  const chosenAnswerId = body?.chosenAnswerId as string | undefined;
  const sessionId = body?.sessionId as string | undefined;
  const isReview = Boolean(body?.isReview);

  if (!questionId || !chosenAnswerId || !sessionId) {
    return NextResponse.json(
      { error: 'Missing questionId, chosenAnswerId, or sessionId' },
      { status: 400 }
    );
  }

  const result = await recordAttempt({
    clerkUserId: userId,
    questionId,
    chosenAnswerId,
    sessionId,
    isReview,
    errorType: body?.errorType,
  });

  // Stay one set ahead: the moment someone answers their FIRST question in a
  // set, start queueing and filling the next 5 in the background, so it's
  // usually already ready by the time they finish these 5. Capped at exactly
  // one set ahead — prepareUpcomingSet no-ops if one is already queued.
  if (result.answeredInSession === 1) {
    const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
    if (preference) {
      after(() =>
        prepareUpcomingSet(userId, preference.exam, preference.focusSystemIds, sessionId)
      );
    }
  }

  // Safety net for whenever the above didn't get a chance to finish (e.g. a
  // very fast set, or the queued set's generation failed): make sure the
  // next set is filled once this one is actually done, even if nothing was
  // queued ahead of time.
  if (result.isSetComplete) {
    const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
    if (preference) {
      after(() => prepareNextSet(userId, preference.exam, preference.focusSystemIds));
    }
  }

  return NextResponse.json(result);
}
