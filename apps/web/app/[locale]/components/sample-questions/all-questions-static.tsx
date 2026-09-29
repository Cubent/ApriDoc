import type { SampleQuestion } from './sample-questions-quiz';

type Props = {
  questions: SampleQuestion[];
  examLabel: string;
};

/**
 * A fully server-rendered, JavaScript-free version of every sample question,
 * correct answer, and per-choice explanation. The interactive quiz above only
 * ever shows one question at a time in the DOM (the rest live in client
 * state), so this section exists purely so the full content is actually
 * present as real, crawlable page text, not just client-side props.
 */
export const AllQuestionsStatic = ({ questions, examLabel }: Props) => (
  <div id="all-questions" className="bg-white px-6 py-16 sm:py-20">
    <div className="mx-auto max-w-3xl">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
        Read them all
      </p>
      <h2 className="font-[family-name:var(--font-display)] mt-3 text-center text-3xl font-bold tracking-tight text-black sm:text-4xl">
        All {questions.length} {examLabel} sample questions and explanations
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-gray-600">
        Prefer to read instead of click through the quiz above? Every question, the correct
        answer, and why each other choice is wrong, in one place.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {questions.map((question, qi) => {
          const correctChoice = question.choices.find((c) => c.isCorrect);
          return (
            <details key={question.id} className="group rounded-2xl border border-gray-200 p-6">
              <summary className="cursor-pointer list-none">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full bg-[#F4F2FB] px-3 py-1 text-xs font-semibold text-[#06005A]">
                      Question {qi + 1} &middot; {question.system}
                    </span>
                    <p className="mt-3 leading-relaxed text-[#06005A]">{question.stem}</p>
                  </div>
                  <svg
                    className="mt-1 size-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </summary>

              <div className="mt-5 border-t border-gray-200 pt-5">
                <ol className="flex flex-col gap-1.5">
                  {question.choices.map((choice, ci) => (
                    <li
                      key={choice.id}
                      className={`text-sm ${choice.isCorrect ? 'font-semibold text-green-700' : 'text-gray-700'}`}
                    >
                      <span className="font-semibold">{String.fromCharCode(65 + ci)}.</span> {choice.text}
                      {choice.isCorrect && <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-green-700">Correct</span>}
                    </li>
                  ))}
                </ol>

                {correctChoice && (
                  <p className="mt-4 leading-relaxed text-gray-700">{correctChoice.explanation}</p>
                )}

                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Why the other choices are wrong
                  </p>
                  {question.choices
                    .filter((c) => !c.isCorrect)
                    .map((c) => (
                      <p key={c.id} className="text-sm leading-relaxed text-gray-600">
                        <span className="font-semibold text-gray-800">
                          ({String.fromCharCode(65 + question.choices.findIndex((x) => x.id === c.id))})
                        </span>{' '}
                        {c.explanation}
                      </p>
                    ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  </div>
);
