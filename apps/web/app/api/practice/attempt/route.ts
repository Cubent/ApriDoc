import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { recordAttempt } from '@repo/database/qbank';
import { prepareNextSet } from '@/lib/prepare-practice-set';
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

  // The set they just finished is done — start filling the next one now,
  // in the background, instead of waiting for them to click through the set
  // summary and ask for it. getOrCreateActiveSession inside prepareNextSet
  // creates that next session on demand.
  if (result.isSetComplete) {
    const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
    if (preference) {
      after(() => prepareNextSet(userId, preference.exam, preference.focusSystemIds));
    }
  }

  return NextResponse.json(result);
}
