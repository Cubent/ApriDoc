import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { AI_SYSTEM_NAME, saveGeneratedQuestion } from '@repo/database/ai-practice';
import {
  getNote,
  getOrCreateActiveSession,
  getPendingSessionQuestion,
  getSessionProgress,
  isBookmarked,
  markQuestionServed,
  pickQuestionSet,
  type QuestionPick,
  SET_SIZE,
} from '@repo/database/qbank';
import { generateQuestionsForTitles } from '@/lib/ai-question-generation';
import { after, NextResponse } from 'next/server';

/**
 * Generates content for a batch of AI-pool picks and marks each one served
 * as soon as it's ready. Used both for the batch we wait on before
 * responding, and for the rest of the set, which runs after the response
 * via `after()` so it isn't sitting behind this request.
 */
async function generateAndServe(sessionId: string, picks: QuestionPick[]) {
  if (!picks.length) return;
  const generatedByObjectiveId = await generateQuestionsForTitles(
    picks.map((p) => ({ id: p.objective.id, title: p.objective.title, requiresTable: p.objective.requiresTable }))
  );
  for (const p of picks) {
    const generated = generatedByObjectiveId.get(p.objective.id);
    if (!generated) continue; // AI failed to produce this one — skip, don't serve broken content
    const saved = await saveGeneratedQuestion(p.objective.id, generated);
    await markQuestionServed(sessionId, saved.id, p.isReview);
  }
}

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

  const session = await getOrCreateActiveSession(userId, preference.exam);

  // Resume the question already in progress in this session, if any, instead
  // of picking a new one — so leaving and returning to /dashboard/practice
  // lands you back on the same question at the same step.
  let picked = await getPendingSessionQuestion(session.id);

  const answeredInSet = await database.sessionQuestion.count({
    where: { sessionId: session.id, answeredAt: { not: null } },
  });

  if (!picked) {
    // No question queued and waiting — pick the rest of this set upfront
    // (all remaining slots at once) rather than picking one question at a
    // time as the user answers through it. This also re-fills the set after
    // a mid-set focus change, which clears only the unanswered questions.
    // Serving each slot still happens in waves below, so a slow AI
    // generation for a later slot never blocks this response.
    const remaining = SET_SIZE - answeredInSet;
    if (remaining > 0) {
      const picks = await pickQuestionSet(userId, preference.exam, preference.focusSystemIds, remaining);

      // Already-authored picks need no generation — serve them right away.
      for (const p of picks) {
        if (p.question) await markQuestionServed(session.id, p.question.id, p.isReview);
      }

      // AI-pool picks with no content yet (`question: null`) are the slow
      // part. Generate just the first couple synchronously, enough to
      // unblock this response, and kick the rest off in the background via
      // `after()` instead of making the user wait on all of them — by the
      // time they reach the later slots in the set, those are usually
      // already there.
      const needsGeneration = picks.filter((p) => !p.question);
      const splitPoint = Math.min(2, needsGeneration.length);
      const firstBatch = needsGeneration.slice(0, splitPoint);
      const restBatch = needsGeneration.slice(splitPoint);

      await generateAndServe(session.id, firstBatch);
      if (restBatch.length) after(() => generateAndServe(session.id, restBatch));

      picked = await getPendingSessionQuestion(session.id);
    }
  }

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
