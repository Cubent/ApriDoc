import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../components/site-footer';
import { SiteHeader } from '../../../components/site-header';
import { AllQuestionsStatic } from './components/all-questions-static';
import { SampleQuestionsQuiz } from './components/sample-questions-quiz';
import { step1SampleQuestions } from './components/step1-questions';

export const metadata: Metadata = createMetadata({
  title: 'Free USMLE Step 1 Sample Questions',
  description:
    'Try 5 free USMLE Step 1 sample questions with full explanations for every answer choice. No account required.',
  path: '/usmle/features/sample-questions',
  keywords: [
    'USMLE Step 1 sample questions',
    'free Step 1 practice questions',
    'USMLE Step 1 free trial',
    'NBME style questions',
    'Step 1 question bank sample',
  ],
});

const SampleQuestionsPage = () => (
  <div className="min-h-screen bg-white">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Quiz',
          about: { '@type': 'Thing', name: 'USMLE Step 1' },
          educationalAlignment: {
            '@type': 'AlignmentObject',
            alignmentType: 'educationalSubject',
            targetName: 'USMLE Step 1',
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
          Try 5 free USMLE Step 1 questions
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
          Real NBME-style vignettes with full explanations for every answer choice, right here. No
          account, no email, no time limit. Answer them below to see what the full question bank
          looks like.
        </p>
      </div>
    </div>

    <SampleQuestionsQuiz questions={step1SampleQuestions} examLabel="Step 1" campaign="step1-sample-questions" />

    <AllQuestionsStatic questions={step1SampleQuestions} examLabel="Step 1" />

    {/* Context / cross-link section */}
    <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-black sm:text-3xl">
          This is a small taste of the full Step 1 Qbank
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-600">
          The full{' '}
          <Link href="/usmle-step-1-question-bank" className="font-medium text-[#06005A] hover:underline">
            USMLE Step 1 question bank
          </Link>{' '}
          covers every subject and system on the blueprint, with an adaptive engine that targets
          your weak spots and brings concepts back with spaced repetition. If your exam date is
          already set, our{' '}
          <Link href="/blog/usmle-step-1-exam-dates-2026" className="font-medium text-[#06005A] hover:underline">
            Step 1 exam dates guide
          </Link>{' '}
          covers registration, scheduling and the 2026 format change. Studying for Step 2 CK
          instead? Try our{' '}
          <Link href="/usmle/features/sample-questions/step-2" className="font-medium text-[#06005A] hover:underline">
            free Step 2 CK sample questions
          </Link>
          .
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/sign-up?utm_source=marketing&utm_medium=context-cta&utm_campaign=step1-sample-questions"
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

export default SampleQuestionsPage;
