import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SampleQuestionsQuiz } from '../../../../components/sample-questions/sample-questions-quiz';
import { step2SampleQuestions } from '../../../../components/sample-questions/step2-questions';
import { SiteFooter } from '../../../../components/site-footer';
import { SiteHeader } from '../../../../components/site-header';

export const metadata: Metadata = createMetadata({
  title: 'Free USMLE Step 2 CK Sample Questions',
  description:
    'Try 5 free USMLE Step 2 CK sample questions with full explanations for every answer choice. No account required.',
  path: '/usmle/features/sample-questions/step-2',
  keywords: [
    'USMLE Step 2 CK sample questions',
    'free Step 2 CK practice questions',
    'USMLE Step 2 CK free trial',
    'NBME style clinical vignettes',
    'Step 2 CK question bank sample',
  ],
});

const Step2SampleQuestionsPage = () => (
  <div className="min-h-screen bg-white">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Quiz',
          about: { '@type': 'Thing', name: 'USMLE Step 2 CK' },
          educationalAlignment: {
            '@type': 'AlignmentObject',
            alignmentType: 'educationalSubject',
            targetName: 'USMLE Step 2 CK',
          },
          provider: {
            '@type': 'EducationalOrganization',
            name: 'MedPrep Institute',
            url: 'https://www.medprepinstitute.org',
          },
        }),
      }}
    />
    <SiteHeader />

    {/* Hero */}
    <div
      className="relative overflow-hidden bg-cover bg-center px-6 pt-16 pb-14 sm:pt-20 sm:pb-16"
      style={{ backgroundColor: '#06005A', backgroundImage: "url('/MedPrep.png')" }}
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
          <span>FREE SAMPLE QUESTIONS</span>
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white sm:text-5xl">
          Try 5 free USMLE Step 2 CK questions
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
          Real NBME-style clinical management vignettes with full explanations for every answer
          choice, right here. No account, no email, no time limit. Answer them below to see what
          the full question bank looks like.
        </p>
      </div>
    </div>

    <SampleQuestionsQuiz questions={step2SampleQuestions} examLabel="Step 2 CK" campaign="step2-ck-sample-questions" />

    {/* Context / cross-link section */}
    <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-black sm:text-3xl">
          This is a small taste of the full Step 2 CK Qbank
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-600">
          The full{' '}
          <Link href="/usmle-step-2-question-bank" className="font-medium text-[#06005A] hover:underline">
            USMLE Step 2 CK question bank
          </Link>{' '}
          covers every clerkship specialty on the blueprint, with an adaptive engine that targets
          your weak spots and brings concepts back with spaced repetition. If your exam date is
          already set, our{' '}
          <Link href="/blog/usmle-step-2-ck-exam-dates-2026" className="font-medium text-[#06005A] hover:underline">
            Step 2 CK exam dates guide
          </Link>{' '}
          covers registration, scheduling and the 2026 format change. Studying for a different
          exam? Try our free{' '}
          <Link href="/usmle/features/sample-questions" className="font-medium text-[#06005A] hover:underline">
            Step 1
          </Link>
          ,{' '}
          <Link href="/usmle/features/sample-questions/step-3" className="font-medium text-[#06005A] hover:underline">
            Step 3
          </Link>{' '}
          or{' '}
          <Link href="/abim/features/sample-questions" className="font-medium text-[#06005A] hover:underline">
            ABIM
          </Link>{' '}
          sample questions.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/sign-up?utm_source=marketing&utm_medium=context-cta&utm_campaign=step2-ck-sample-questions"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#C46B10] px-8 text-base font-semibold text-white transition-colors hover:bg-[#a95a0d] sm:w-auto"
          >
            Start your free trial
          </a>
        </div>
      </div>
    </div>

    <SiteFooter />
  </div>
);

export default Step2SampleQuestionsPage;
