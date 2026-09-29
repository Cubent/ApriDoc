import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { abimSampleQuestions } from '../../../components/sample-questions/abim-questions';
import { SampleQuestionsQuiz } from '../../../components/sample-questions/sample-questions-quiz';
import { SiteFooter } from '../../../components/site-footer';
import { SiteHeader } from '../../../components/site-header';

export const metadata: Metadata = createMetadata({
  title: 'Free ABIM Sample Questions',
  description:
    'Try 5 free ABIM Internal Medicine board exam sample questions with full explanations for every answer choice. No account required.',
  path: '/abim/features/sample-questions',
  keywords: [
    'ABIM sample questions',
    'free ABIM practice questions',
    'ABIM exam free trial',
    'internal medicine board exam questions',
    'ABIM question bank sample',
  ],
});

const AbimSampleQuestionsPage = () => (
  <div className="min-h-screen bg-white">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Quiz',
          about: { '@type': 'Thing', name: 'ABIM Internal Medicine Certification Exam' },
          educationalAlignment: {
            '@type': 'AlignmentObject',
            alignmentType: 'educationalSubject',
            targetName: 'ABIM Internal Medicine Certification Exam',
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
          Try 5 free ABIM sample questions
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
          Real board-style internal medicine vignettes across hematology, rheumatology,
          nephrology, gastroenterology and infectious disease, with full explanations for every
          answer choice. No account, no email, no time limit.
        </p>
      </div>
    </div>

    <SampleQuestionsQuiz questions={abimSampleQuestions} examLabel="ABIM" campaign="abim-sample-questions" />

    {/* Context / cross-link section */}
    <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-black sm:text-3xl">
          This is a small taste of the full ABIM Qbank
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-600">
          The full{' '}
          <Link href="/abim-internal-medicine-question-bank" className="font-medium text-[#06005A] hover:underline">
            ABIM question bank
          </Link>{' '}
          covers every internal medicine discipline on the blueprint, with an adaptive engine
          that targets your weak spots and fits into short gaps in a busy clinical schedule. If
          you're earlier in training, our{' '}
          <Link href="/blog/abim-study-guide" className="font-medium text-[#06005A] hover:underline">
            ABIM study guide
          </Link>{' '}
          covers when to start and how to build a study plan around your final residency year.
          Studying for a different exam? Try our free{' '}
          <Link href="/usmle/features/sample-questions" className="font-medium text-[#06005A] hover:underline">
            Step 1
          </Link>
          ,{' '}
          <Link href="/usmle/features/sample-questions/step-2" className="font-medium text-[#06005A] hover:underline">
            Step 2 CK
          </Link>{' '}
          or{' '}
          <Link href="/usmle/features/sample-questions/step-3" className="font-medium text-[#06005A] hover:underline">
            Step 3
          </Link>{' '}
          sample questions.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/sign-up?utm_source=marketing&utm_medium=context-cta&utm_campaign=abim-sample-questions"
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

export default AbimSampleQuestionsPage;
