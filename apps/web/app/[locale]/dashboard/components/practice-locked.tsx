import { Lock } from 'lucide-react';
import Link from 'next/link';

type PracticeLockedProps = {
  /** True once a trial/subscription existed but lapsed; false when there never was one. */
  hadAccessBefore: boolean;
};

export const PracticeLocked = ({ hadAccessBefore }: PracticeLockedProps) => (
  <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#120A2E] sm:p-10">
    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#C46B10]/10 text-[#C46B10]">
      <Lock className="size-5" />
    </span>
    <h1 className="font-[family-name:var(--font-display)] mt-4 text-2xl font-bold text-[#06005A] dark:text-white">
      {hadAccessBefore ? 'Your access has ended' : 'Choose a plan to start practicing'}
    </h1>
    <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
      {hadAccessBefore
        ? 'Your trial or subscription is no longer active, so question practice is paused. Everything else, including your account and billing, is still right here.'
        : "You'll need an active plan to start practicing questions. Everything else in the dashboard is still open."}
    </p>
    <div className="mt-6 flex flex-col items-center gap-3">
      <Link
        href="/paywall?trial=0"
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#C46B10] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#a95a0d] sm:w-auto"
      >
        Choose a plan
      </Link>
      <Link
        href="/dashboard/account"
        className="text-sm font-medium text-[#06005A] hover:underline dark:text-[#C46B10]"
      >
        Go to billing
      </Link>
    </div>
  </div>
);
