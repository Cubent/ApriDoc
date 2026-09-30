import { database, type ExamType } from '@repo/database';
import { saveGeneratedQuestion } from '@repo/database/ai-practice';
import { getOrCreateActiveSession, markQuestionServed, pickQuestionSet, SET_SIZE } from '@repo/database/qbank';
import { generateQuestionsForTitles } from './ai-question-generation';

/**
 * Fills a user's active session up to SET_SIZE if it isn't already full,
 * generating AI-pool content as needed. Idempotent: if a full set already
 * exists, this is a no-op.
 *
 * Called from three places:
 * - the dashboard, right when someone lands on it, so a set is usually
 *   already sitting ready by the time they open Practice
 * - right after a set is completed, so the next one starts filling
 *   immediately instead of waiting for the next /api/practice/next call
 * - /api/practice/next itself, as the synchronous fallback for whenever
 *   neither of the above got to run in time (e.g. a focus change, or
 *   landing on /dashboard/practice directly via URL)
 *
 * Measured directly against real users, picking alone (before any AI
 * generation) currently takes 20-40+ seconds — the picking logic itself is
 * still slow (sequential, N+1 queries) and hasn't been fixed yet. Prefetching
 * from the dashboard hides that behind normal browsing time; it doesn't fix
 * the underlying cost, so it can still show up on the fallback path above.
 */
export async function prepareNextSet(userId: string, examType: ExamType, focusSystemIds: string[]) {
  const session = await getOrCreateActiveSession(userId, examType);

  const existing = await database.sessionQuestion.count({ where: { sessionId: session.id } });
  const remaining = SET_SIZE - existing;
  if (remaining <= 0) return session;

  const picks = await pickQuestionSet(userId, examType, focusSystemIds, remaining);

  const needsGeneration = picks.filter((p) => !p.question).map((p) => p.objective);
  const generatedByObjectiveId = needsGeneration.length
    ? await generateQuestionsForTitles(
        needsGeneration.map((o) => ({ id: o.id, title: o.title, requiresTable: o.requiresTable }))
      )
    : new Map();

  for (const p of picks) {
    // Re-check right before every write, not just once at the top: this
    // function can run concurrently for the same user (e.g. the dashboard's
    // background prefetch racing a direct /api/practice/next call), and
    // picking + generation above takes long enough that another call can
    // easily finish filling the set while this one was still working.
    // Without this, both calls would each write a full set and the session
    // ends up with double the intended questions.
    const currentCount = await database.sessionQuestion.count({ where: { sessionId: session.id } });
    if (currentCount >= SET_SIZE) break;

    let questionId = p.question?.id;
    if (!questionId) {
      const generated = generatedByObjectiveId.get(p.objective.id);
      if (!generated) continue; // AI failed to produce this one — skip, don't serve broken content
      const saved = await saveGeneratedQuestion(p.objective.id, generated);
      questionId = saved.id;
    }
    await markQuestionServed(session.id, questionId, p.isReview);
  }

  return session;
}
