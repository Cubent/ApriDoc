'use client';

import { useState } from 'react';
import {
  FlaskConical,
  HeartPulse,
  Pill,
  Microscope,
  Bug,
  ShieldCheck,
  Bone,
  Brain,
  BarChart3,
  Dna,
  Flag,
  RotateCcw,
  Target,
} from 'lucide-react';

const adaptiveEnginePoints = [
  { icon: Flag, text: 'Every miss is tracked by Step 1 concept, not just by question.' },
  { icon: RotateCcw, text: 'Reviews come back on a spaced schedule, automatically.' },
  { icon: Target, text: 'Your weakest Step 1 topics move to the front of your next set.' },
];

const subjects = [
  { name: 'Biochemistry', icon: FlaskConical },
  { name: 'Physiology', icon: HeartPulse },
  { name: 'Pharmacology', icon: Pill },
  { name: 'Pathology', icon: Microscope },
  { name: 'Microbiology', icon: Bug },
  { name: 'Immunology', icon: ShieldCheck },
  { name: 'Anatomy', icon: Bone },
  { name: 'Behavioral Science', icon: Brain },
  { name: 'Biostatistics', icon: BarChart3 },
  { name: 'Genetics', icon: Dna },
];

const steps = [
  {
    title: 'Real vignettes, not flashcards',
    description: 'Rich clinical images and full patient presentations across every Step 1 subject. Study one topic at a time, or mix them the way the real exam does.',
  },
  {
    title: 'Every miss gets flagged',
    description: 'Get a question wrong, and MedPrep Institute pinpoints the exact concept behind it, not just that one question.',
  },
  {
    title: 'It comes back right on time',
    description: 'Spaced repetition resurfaces that concept from a new angle just before you would forget it, so it actually sticks.',
  },
  {
    title: 'High-yield comes first',
    description: 'The most heavily tested material gets prioritized automatically, so your limited study time still covers the whole exam.',
  },
];

const faqs = [
  {
    q: 'How many Step 1 questions are in the bank?',
    a: '7,500+ Step 1 question topics, each producing a full clinical vignette when you reach it, across all major subjects and organ systems. MedPrep Institute continuously expands the bank, with new NBME-style vignettes and clinical images added regularly.',
  },
  {
    q: 'Is this bank aligned with the current Step 1 blueprint?',
    a: 'Yes. Questions are organized by the same subjects and systems tested on Step 1, including biochemistry, physiology, pharmacology, pathology, microbiology, immunology, and behavioral science.',
  },
  {
    q: 'Can I focus on one subject or system at a time?',
    a: 'Yes. Restrict your practice to a single subject or organ system while you are in that block, then widen back out to mixed, exam-style sets whenever you are ready.',
  },
  {
    q: 'What happens when I get a Step 1 question wrong?',
    a: 'The adaptive engine flags the underlying concept and brings you variations on it through spaced repetition over the following days, instead of just moving on.',
  },
  {
    q: 'Can I try the Step 1 Qbank for free?',
    a: 'Yes, you can try MedPrep Institute free for 7 days, including full access to the Step 1 question bank.',
  },
];

export const Step1PageContent = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <div
        className="relative overflow-hidden bg-cover bg-center px-6 pt-16 pb-20 sm:pt-20 sm:pb-28"
        style={{
          backgroundColor: '#06005A',
          backgroundImage: "url('/usmle.png')",
        }}
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            <span>USMLE STEP 1 QUESTION BANK</span>
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white sm:text-6xl">
            Pass Step 1 on the first try.{' '}
            <span className="text-white">Guaranteed with our Qbank.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white sm:text-xl">
            Get the only Qbank built for the updated Step 1, with NBME-style vignettes,
            an adaptive engine that targets your weak spots, built-in spaced repetition, and more.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <div className="flex items-center gap-0.5 text-[#C46B10]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="size-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="h-4 w-px bg-white/20" aria-hidden="true" />
              <p className="text-sm text-white/90">
                <span className="font-bold text-white">4.9</span> &middot; 843 reviews
              </p>
            </div>
          </div>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/sign-up"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#C46B10] px-8 text-base font-semibold text-white transition-colors hover:bg-[#a95a0d] sm:w-auto"
            >
              Start practicing free
            </a>
            <a
              href="#the-method"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-[#06005A] transition-colors hover:bg-white/90 sm:w-auto"
            >
              See the method
            </a>
          </div>
        </div>
      </div>

      {/* Adaptive Engine */}
      <div className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Adaptive Engine
              </p>
              <h2 className="font-[family-name:var(--font-display)] mt-3 text-balance text-3xl font-bold tracking-tight text-[#06005A] sm:text-4xl">
                MedPrep Institute remembers your Step 1 mistakes and trains you from first principles.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Miss a question in the Qbank, and the Step 1 concept behind it gets flagged, not
                just that one question. It comes back on a spaced schedule, from a new angle each
                time, so the things you get wrong become the things you know best.
              </p>
              <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
                {adaptiveEnginePoints.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 py-3.5 text-base text-gray-700">
                    <Icon className="mt-0.5 size-4 shrink-0 text-[#C46B10]" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <img
              src="/MedPrep institute (2).jpg"
              alt="A missed Step 1 question flagged by MedPrep Institute, with its review scheduled for a few days later."
              className="order-first w-full rounded-2xl lg:order-none"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white px-6 py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          <div className="border-l-2 border-gray-200 pl-5">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">2M+</p>
            <p className="mt-1 text-sm text-gray-600">Questions Answered</p>
          </div>
          <div className="border-l-2 border-gray-200 pl-5">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">94%</p>
            <p className="mt-1 text-sm text-gray-600">Improved Retention &amp; Recall</p>
          </div>
          <div className="border-l-2 border-gray-200 pl-5">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">10</p>
            <p className="mt-1 text-sm text-gray-600">Step 1 Subjects Covered</p>
          </div>
          <div className="border-l-2 border-gray-200 pl-5">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">96%</p>
            <p className="mt-1 text-sm text-gray-600">Student Pass Rate</p>
          </div>
        </div>
      </div>

      {/* Subjects covered */}
      <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              Coverage
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Every subject on the Step 1 blueprint
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {subjects.map(({ name, icon: Icon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
              >
                <Icon className="size-4 text-[#06005A]" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The Method */}
      <div id="the-method" className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              The Method
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              How MedPrep Institute preps you for Step 1
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="px-8 py-7 sm:px-10 sm:py-8"
                style={{ background: 'linear-gradient(90deg, #4c6fff 0%, #2b3fb0 22%, #1c2a86 100%)' }}
              >
                <span className="font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-lg font-bold text-white">{step.title}</p>
                <p className="mt-1 max-w-md text-[0.95rem] leading-relaxed text-white/75">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-black sm:text-3xl">
              &quot;Cardio was wrecking me for weeks going into Step 1. It kept
              throwing the same concepts back at me in different forms until it
              finally clicked.&quot;
            </h2>
            <p className="mt-5 leading-relaxed text-gray-600">
              I restricted my practice to cardiology while I was in that block, and
              the same adaptive engine kept surfacing the concepts I kept missing
              from a slightly different angle. By the time I sat for Step 1, it
              didn&apos;t feel like a topic I was still shaky on.
            </p>

            <p className="mt-6 font-semibold text-black">Priya S.</p>
            <p className="text-sm text-gray-500">MS-2, passed USMLE Step 1</p>
          </div>

          <div className="order-first overflow-hidden rounded-2xl border border-gray-200 bg-white lg:order-none">
            <img
              src="/MedPrep institute (9).png"
              alt="Priya S., MS-2, passed USMLE Step 1"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            FAQ
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-center text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Step 1 Qbank questions
          </h2>

          <div className="mt-10 flex w-full flex-col">
            {faqs.map((item, index) => (
              <div key={item.q} className="border-b border-gray-200 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left text-lg font-medium text-black hover:underline"
                >
                  <span>{item.q}</span>
                  <svg
                    className={`mt-1 size-4 shrink-0 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {openFaq === index && (
                  <p className="pb-5 text-base leading-relaxed text-gray-600">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
        <div className="rounded-3xl px-8 py-16 text-center sm:py-20" style={{ backgroundColor: '#06005A' }}>
          <h2 className="font-[family-name:var(--font-display)] mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stop doing random Step 1 questions.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-lg text-white/70">
            Start practicing right now. Try it free for 7 days.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/sign-up"
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#C46B10] px-8 text-base font-semibold text-white transition-colors hover:bg-[#a95a0d] sm:w-auto"
            >
              Start your first set
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
