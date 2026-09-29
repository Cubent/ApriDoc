'use client';

import { useState } from 'react';

export type SampleChoice = { id: string; text: string; explanation: string; isCorrect: boolean };
export type SampleQuestion = { id: string; system: string; stem: string; choices: SampleChoice[] };

type Props = {
  questions: SampleQuestion[];
  examLabel: string;
  campaign: string;
};

const signupHref = (campaign: string, medium: string) =>
  `/sign-up?utm_source=marketing&utm_medium=${medium}&utm_campaign=${campaign}`;

export const SampleQuestionsQuiz = ({ questions, examLabel, campaign }: Props) => {
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const correctChoice = question.choices.find((c) => c.isCorrect);
  const selectedChoice = question.choices.find((c) => c.id === selectedId);
  const isCorrect = submitted && selectedChoice?.isCorrect === true;
  const correctCount = results.filter(Boolean).length;

  const submit = () => {
    if (!selectedId || !correctChoice) return;
    setSubmitted(true);
    setResults((prev) => [...prev, selectedId === correctChoice.id]);
  };

  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelectedId(null);
    setSubmitted(false);
  };

  const restart = () => {
    setIndex(0);
    setSelectedId(null);
    setSubmitted(false);
    setResults([]);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            Free sample complete
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            You got {correctCount} of {questions.length} correct
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance leading-relaxed text-gray-600">
            That&apos;s a small taste of what the full {examLabel} question bank covers. Thousands
            more NBME-style vignettes are waiting across every subject and system, with an
            adaptive engine that targets whatever you keep missing.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={signupHref(campaign, 'results-cta')}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#C46B10] px-8 text-base font-semibold text-white transition-colors hover:bg-[#a95a0d] sm:w-auto"
            >
              Unlock all questions free for 7 days
            </a>
          </div>
          <button
            type="button"
            onClick={restart}
            className="mt-5 text-sm font-medium text-[#06005A] hover:underline"
          >
            Retake these {questions.length} questions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      {/* Progress dots */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {questions.map((q, i) => (
          <span
            key={q.id}
            className={`size-2.5 rounded-full ${
              i < results.length
                ? results[i]
                  ? 'bg-green-500'
                  : 'bg-red-400'
                : i === index
                  ? 'bg-[#06005A]'
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
        Free sample question {index + 1} of {questions.length}
      </p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <span className="inline-block rounded-full bg-[#F4F2FB] px-3 py-1 text-xs font-semibold text-[#06005A]">
          {question.system}
        </span>
        <p className="mt-4 leading-relaxed text-[#06005A]">{question.stem}</p>

        <div className="mt-6 flex flex-col gap-2">
          {question.choices.map((choice, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = selectedId === choice.id;
            const isRevealedCorrect = submitted && choice.isCorrect;
            const isRevealedWrong = submitted && isSelected && !choice.isCorrect;

            return (
              <button
                key={choice.id}
                type="button"
                disabled={submitted}
                onClick={() => setSelectedId(choice.id)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                  isRevealedCorrect
                    ? 'border-green-400 bg-green-50 text-green-900'
                    : isRevealedWrong
                      ? 'border-red-300 bg-red-50 text-red-900'
                      : isSelected
                        ? 'border-[#06005A] bg-[#06005A]/5 text-[#06005A]'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="w-4 font-semibold">{letter}.</span>
                <span>{choice.text}</span>
              </button>
            );
          })}
        </div>

        {submitted && correctChoice && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className={`text-sm font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct.' : 'Incorrect.'} Correct answer:{' '}
              {String.fromCharCode(65 + question.choices.findIndex((c) => c.id === correctChoice.id))}{' '}
              &mdash; {correctChoice.text}
            </p>
            <p className="mt-3 leading-relaxed text-gray-700">{correctChoice.explanation}</p>

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
        )}

        <div className="mt-6 flex justify-end">
          {submitted ? (
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-[#C46B10] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a95a0d]"
            >
              {index === questions.length - 1 ? 'See my results' : 'Next question'}
            </button>
          ) : (
            <button
              type="button"
              disabled={!selectedId}
              onClick={submit}
              className="rounded-full bg-[#06005A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit answer
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        No account needed for these {questions.length} questions.{' '}
        <a href={signupHref(campaign, 'inline-link')} className="font-medium text-[#06005A] hover:underline">
          Sign up
        </a>{' '}
        when you&apos;re ready to unlock the full question bank.
      </p>
    </div>
  );
};
