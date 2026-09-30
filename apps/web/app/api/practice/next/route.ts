import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { AI_SYSTEM_NAME } from '@repo/database/ai-practice';
import { getNote, getPendingSessionQuestion, getSessionProgress, isBookmarked, SET_SIZE } from '@repo/database/qbank';
import { prepareNextSet } from '@/lib/prepare-practice-set';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const preference = await database.userPreference.findUnique({
    where: { clerkUserId: userId },
  });

  if (!preference) {
    return NextResponse.json(
      { error: 'Select an exam in onboarding before practicing.' },
      { status: 400 }
    );
  }

  const session = await prepareNextSet(userId, preference.exam, preference.focusSystemIds);

  // Usually a no-op: the dashboard, and set completion, already kick off
  // prepareNextSet in the background, so a set is normally sitting ready by
  // the time this runs. The call above is only real work when neither of
  // those got a chance to finish first.
  const picked = await getPendingSessionQuestion(session.id);

  const answeredInSet = await database.sessionQuestion.count({
    where: { sessionId: session.id, answeredAt: { not: null } },
  });

  if (!picked) {
    return NextResponse.json({ question: null, setSize: SET_SIZE, answeredInSet, answeredResults: [] });
  }

  const [bookmarked, note, answeredResults] = await Promise.all([
    isBookmarked(userId, picked.question.id),
    getNote(userId, picked.question.learningObjectiveId),
    getSessionProgress(session.id),
  ]);

  // Never send isCorrect/explanation to the client before they answer.
  const { choices, learningObjective, explanation, ...rest } = picked.question;
  const isAiGenerated = learningObjective.system.name === AI_SYSTEM_NAME;
  return NextResponse.json({
    sessionId: session.id,
    isReview: picked.isReview,
    isBookmarked: bookmarked,
    isAiGenerated,
    note: note?.content ?? '',
    setSize: SET_SIZE,
    answeredInSet,
    answeredResults,
    question: {
      ...rest,
      system: isAiGenerated ? learningObjective.discipline : learningObjective.system.name,
      objectiveTitle: learningObjective.title,
      learningObjectiveId: learningObjective.id,
      choices: choices.map((c) => ({ id: c.id, text: c.text, sortOrder: c.sortOrder })),
    },
  });
}
