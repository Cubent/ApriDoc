import { database, type ExamType, SessionMode } from '@repo/database';
import { saveGeneratedQuestion } from '@repo/database/ai-practice';
import {
  getOrCreateActiveSession,
  markQuestionServed,
  pickQuestionSet,
  SET_SIZE,
} from '@repo/database/qbank';
import { generateQuestionsForTitles } from './ai-question-generation';

/**
 * Picks and generates whatever a session is still missing, up to SET_SIZE,
 * writing each one as it becomes ready. Re-checks the live count before
 * every write (not just once at the start): this whole flow can run
 * concurrently for the same user from more than one trigger, and picking +
 * generation take long enough that a session can already be filled by the
 * time a given write is about to happen. Without that re-check, two
 * concurrent callers would each write a full set and double it.
 */
async function fillSession(
  session: { id: string },
  clerkUserId: string,
  examType: ExamType,
  focusSystemIds: string[]
) {
  const existing = await database.sessionQuestion.count({ where: { sessionId: session.id } });
  const remaining = SET_SIZE - existing;
  if (remaining <= 0) return;

  const picks = await pickQuestionSet(clerkUserId, examType, focusSystemIds, remaining);

  const needsGeneration = picks.filter((p) => !p.question).map((p) => p.objective);
  const generatedByObjectiveId = needsGeneration.length
    ? await generateQuestionsForTitles(
        needsGeneration.map((o) => ({ id: o.id, title: o.title, requiresTable: o.requiresTable }))
      )
    : new Map();

  for (const p of picks) {
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
}

/**
 * Fills a user's active session up to SET_SIZE if it isn't already full.
 * Idempotent: no-ops once a full set already exists.
 *
 * Called from:
 * - the dashboard, right when someone lands on it
 * - /api/practice/next itself, as the synchronous fallback for whenever
 *   nothing was prepared ahead of time (e.g. landing on /dashboard/practice
 *   directly via URL, or a focus change)
 *
 * Measured directly against real users, picking alone (before any AI
 * generation) currently takes 20-40+ seconds — the picking logic itself is
 * still slow (sequential, N+1 queries) and hasn't been fixed yet. Prefetching
 * hides that behind normal browsing time; it doesn't fix the underlying
 * cost, so it can still show up on the fallback path above.
 */
export async function prepareNextSet(userId: string, examType: ExamType, focusSystemIds: string[]) {
  const session = await getOrCreateActiveSession(userId, examType);
  await fillSession(session, userId, examType, focusSystemIds);
  return session;
}

/**
 * Queues and fills the SET AFTER whichever one the user is currently
 * working through, without disturbing their current session. Only ever
 * keeps one set queued ahead at a time: if an upcoming (not-yet-started)
 * session already exists, this no-ops instead of creating another.
 *
 * getOrCreateActiveSession resolves to the OLDEST incomplete session (see
 * its own comment), so creating this newer one here doesn't make the user
 * jump to it early — they keep seeing their current session until it's
 * marked complete, at which point this queued one becomes "active"
 * automatically with no extra step.
 *
 * Called right after someone answers their first question in a set, so the
 * next 5 are usually already sitting ready by the time they finish these 5.
 */
export async function prepareUpcomingSet(
  clerkUserId: string,
  examType: ExamType,
  focusSystemIds: string[],
  currentSessionId: string,
  mode: SessionMode = SessionMode.SEMESTER
) {
  const alreadyQueued = await database.studySession.findFirst({
    where: { clerkUserId, examType, mode, completedAt: null, id: { not: currentSessionId } },
  });
  const upcoming =
    alreadyQueued ?? (await database.studySession.create({ data: { clerkUserId, examType, mode } }));

  await fillSession(upcoming, clerkUserId, examType, focusSystemIds);
  return upcoming;
}
