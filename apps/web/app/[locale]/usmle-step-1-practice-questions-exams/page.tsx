import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { Step1PracticeExamsPageContent } from './components/step1-practice-exams-page-content';

export const metadata: Metadata = createMetadata({
  title: 'USMLE Step 1 Practice Questions & Exams',
  description: 'Practice Step 1 with adaptive practice questions and exams that target your weak spots and bring concepts back with built-in spaced repetition. NBME-style vignettes across every Step 1 subject.',
  path: '/usmle-step-1-practice-questions-exams',
  keywords: [
    'USMLE Step 1 practice questions',
    'USMLE Step 1 practice exams',
    'Step 1 Qbank',
    'USMLE Step 1 practice test',
    'NBME style questions',
    'adaptive Step 1 prep',
  ],
});

const Step1PracticeExamsPage = () => (
  <div className="min-h-screen bg-white">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'USMLE Step 1 Practice Questions & Exams',
          description: 'Adaptive USMLE Step 1 practice questions and exams with NBME-style vignettes, spaced repetition, and weak-spot targeting across every Step 1 subject.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'MedPrep Institute',
            url: 'https://www.medprepinstitute.org',
          },
        }),
      }}
    />
    <SiteHeader />
    <Step1PracticeExamsPageContent />
    <SiteFooter />
  </div>
);

export default Step1PracticeExamsPage;
