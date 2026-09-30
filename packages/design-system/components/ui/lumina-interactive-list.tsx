'use client';

// Brand assets updated: header/footer logo, step images, hero social proof banner
import { Award, ChevronDown, ClipboardCheck, Flag, Microscope, RotateCcw, Stethoscope, Target } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type LuminaInteractiveListProps = {
  /** Renders in place of the default header "Sign in" link, e.g. real auth controls. */
  authSlot?: React.ReactNode;
  /** Overrides the hero headline, e.g. for ad landing page variants. */
  heroTitle?: string;
};

const USMLE_STEPS = [
  { href: '/usmle-step-1-question-bank', label: 'USMLE Step 1', description: 'Foundational science and clinical knowledge.' },
  { href: '/usmle-step-2-question-bank', label: 'USMLE Step 2 CK', description: 'Clinical knowledge for clerkship-level decisions.' },
  { href: '/usmle-step-3-question-bank', label: 'USMLE Step 3', description: 'Independent practice: diagnosis, management, follow-up.' },
];

// Kept in sync with the identical dropdown in apps/web/app/[locale]/components/site-header.tsx.
const UsmleDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 hover:text-[#06005A] transition-colors"
      >
        USMLE
        <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Always in the DOM (not conditionally mounted): visibility is CSS-only, so the
          three exam links are present in the static HTML and crawlable even though the
          panel is visually collapsed until a visitor opens it. */}
      <div
        role="menu"
        className={`absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-2 text-left shadow-xl transition-all duration-150 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        {USMLE_STEPS.map(({ href, label, description }) => (
          <a
            key={href}
            href={href}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50"
          >
            <span className="block text-sm font-semibold text-black">{label}</span>
            <span className="block text-xs leading-relaxed text-gray-500">{description}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

const methodFaqs = [
  {
    q: 'What makes MedPrep Institute different from other question banks?',
    a: "Most question banks deal you disconnected questions with no memory of what you missed. Whether you're working through the Step 1 Qbank or the Step 2 Qbank, MedPrep Institute builds each set from the one before it, so your practice has continuity and concepts get a chance to connect.",
  },
  {
    q: 'What happens when I get a question wrong?',
    a: 'The learning path adapts. You will be presented variations on the objective through spaced repetition over the next few days.',
  },
  {
    q: 'Does the spaced repetition show me the same question over and over again?',
    a: "Not exactly. Across the Step 1 Qbank and the Step 2 Qbank, we have pre-written variations on each question that hit the same learning objective from a different angle.",
  },
  {
    q: 'Can I focus on a single system?',
    a: "Yes. Whether you're in the Step 1 Qbank or the Step 2 Qbank, if you're in your cardiology block, restrict your questions to cardiology and the same adaptive engine works within it. Widen back out whenever you're ready.",
  },
  {
    q: 'Can I study for my SHELF exam with MedPrep Institute?',
    a: 'Yes. You can focus your learning path to the relevant SHELF exam topics.',
  },
  {
    q: "I need to study a little bit of everything. Isn't random questions better?",
    a: "Random sampling does help you touch on a lot of material. But MedPrep Institute prioritizes high yield material first. Then when new concepts are introduced, it automatically works out how to cover the entire exam in as little time as possible.",
  },
  {
    q: 'Does MedPrep Institute use clinical images?',
    a: 'Yes, our questions have rich clinical images to help you understand the material, just like the real exam.',
  },
  {
    q: 'Do we cover Biostats?',
    a: 'Yes, this is covered.',
  },
  {
    q: 'Which exams does MedPrep Institute cover?',
    a: 'MedPrep Institute is built for the USMLE Step 1 Qbank, the Step 2 CK Qbank, the Step 3 question bank, and the ABIM Exam.',
  },
  {
    q: "What's the difference between the Step 1 Qbank and the Step 2 Qbank?",
    a: 'The Step 1 Qbank focuses on foundational science — biochemistry, physiology, pharmacology, and pathology — while the Step 2 Qbank shifts to clinical management and patient-care vignettes. Progress carries over between them, so concepts you struggled with in the Step 1 question bank are prioritized first when you move into the Step 2 question bank.',
  },
  {
    q: 'Is STEP 2 CS Covered?',
    a: 'No, we cover STEP 2 CK, not CS. For CS we recommend pairing us with a dedicated case-based practice resource.',
  },
  {
    q: 'Can I try it for free?',
    a: 'Yes, you can try it for free for 7 days.',
  },
];

export function LuminaInteractiveList({
  authSlot,
  heroTitle = 'A Smarter Way to Prepare for the USMLE',
}: LuminaInteractiveListProps = {}) {
  const [openMethodFaq, setOpenMethodFaq] = useState<number | null>(0);

  const toggleMethodFaq = (index: number) => {
    setOpenMethodFaq(openMethodFaq === index ? null : index);
  };

  return (
    <>
      {/* Header: kept in sync with the shared SiteHeader (apps/web/app/[locale]/components/site-header.tsx) */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/animateos-logo (1).png"
              alt="MedPrep Institute Logo"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div className="text-xl font-medium text-[#06005A]">
              MedPrep Institute
            </div>
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-sm font-medium text-gray-600 lg:flex">
            <UsmleDropdown />
            <a href="/abim-internal-medicine-question-bank" className="hover:text-[#06005A] transition-colors">
              ABIM
            </a>
            <a href="#how-it-works" className="hover:text-[#06005A] transition-colors">
              Method
            </a>
            <a href="/about" className="hover:text-[#06005A] transition-colors">
              About
            </a>
            <a href="/blog" className="hover:text-[#06005A] transition-colors">
              Blog
            </a>
            <a href="/contact" className="hover:text-[#06005A] transition-colors">
              Contact
            </a>
          </nav>

          {authSlot ?? (
            <a
              href="/sign-in"
              className="bg-[#06005A] text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#0a0080] transition-colors"
            >
              Sign in
            </a>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative overflow-hidden px-6 pt-6 pb-40 sm:pt-12 sm:pb-48 lg:pt-14 lg:pb-0"
        style={{ backgroundColor: '#06005A' }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          {/* Left: Text content */}
          <div className="flex max-w-xl flex-col items-center text-center pb-64 sm:pb-72 lg:pb-40 lg:items-start lg:text-left">
            {/* Exam Timeline */}
            <p className="mt-3 mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 lg:mt-0 lg:justify-start">
              <span>STEP 1</span>
              <span aria-hidden="true" className="size-1 rotate-45 bg-[#C46B10]" />
              <span>STEP 2</span>
              <span aria-hidden="true" className="size-1 rotate-45 bg-[#C46B10]" />
              <span>STEP 3</span>
              <span aria-hidden="true" className="size-1 rotate-45 bg-[#C46B10]" />
              <span>ABIM</span>
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight font-[family-name:var(--font-display)]">
              <span className="text-white">{heroTitle}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-200 mb-6">
              MedPrep Institute is a living, adaptive question bank that learns how you learn, so every question brings you closer to acing the USMLE.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 bg-[#C46B10] text-white px-8 py-2.5 rounded-full font-semibold text-base hover:bg-[#a95a0d] transition-colors"
              >
                Start practicing free
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#06005A] px-8 py-2.5 rounded-full font-semibold text-base hover:bg-white/90 transition-colors"
              >
                See the method
              </a>
            </div>

            {/* Collaboration Credit - temporarily hidden
            <div className="mt-12 w-full rounded-3xl overflow-hidden relative px-6 py-8 sm:px-10 sm:py-10 bg-white/10 backdrop-blur-md border border-white/20 text-center lg:text-left">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                Built in collaboration with
              </p>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-white leading-tight">
                New York Medical College's
              </p>
              <p className="mt-1.5 text-sm sm:text-base text-gray-200 leading-snug">
                St. Clare's & St. Mary's
                <span className="block">Internal Medicine Residency Program</span>
              </p>
            </div>
            */}
          </div>

          {/* Right: Doctor image with decorative rings — pinned to the very bottom of the hero on
              mobile (out of normal flow, growing up from the edge); back in the flex row as a
              normal right column from lg up. */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center lg:static lg:w-full lg:max-w-xl lg:shrink-0 lg:justify-center lg:self-end">
            <div className="relative flex w-full max-w-lg items-end justify-center lg:max-w-xl">
              <svg
                viewBox="0 0 420 420"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <circle cx="350" cy="70" r="55" fill="none" stroke="#C46B10" strokeWidth="3" strokeDasharray="6 9" opacity="0.85" />
                <circle cx="45" cy="150" r="38" fill="none" stroke="#C46B10" strokeWidth="3" strokeDasharray="5 8" opacity="0.6" />
                <circle cx="365" cy="300" r="46" fill="none" stroke="#C46B10" strokeWidth="3" strokeDasharray="5 8" opacity="0.7" />
                <circle cx="50" cy="360" r="30" fill="none" stroke="#C46B10" strokeWidth="3" strokeDasharray="4 7" opacity="0.5" />
              </svg>
              <img
                src="/MedPrep institute (3).png"
                alt="MedPrep Institute"
                className="relative z-10 w-full max-w-sm object-contain sm:max-w-md lg:max-w-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              <div className="border-l-2 border-gray-200 pl-5">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">
                  2M+
                </p>
                <p className="mt-1 text-sm text-gray-600">USMLE Questions Answered</p>
              </div>
              <div className="border-l-2 border-gray-200 pl-5">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">
                  94%
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Improved Retention &amp; Recall
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-5">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">
                  180+
                </p>
                <p className="mt-1 text-sm text-gray-600">Med Schools Represented</p>
              </div>
              <div className="border-l-2 border-gray-200 pl-5">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">
                  60K+
                </p>
                <p className="mt-1 text-sm text-gray-600">USMLE Students Trained</p>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-[#06005A] sm:text-5xl">
                The #1 Rated USMLE Prep Platform
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Ranked highest in adaptive learning and exam readiness among USMLE prep providers in a 2025 student survey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* App Store Reviews Section */}
      <div className="bg-[#F4F2FB] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5" style={{ backgroundColor: '#06005A' }}>
              <div className="flex items-center gap-0.5 text-[#C46B10]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="size-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="h-4 w-px bg-white/20" aria-hidden="true" />
              <p className="text-sm text-white/90">
                <span className="font-bold text-white">5.0 rating</span>{' '}
                <span className="hidden text-white sm:inline">&middot; MedPrep Institute students</span>
              </p>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="border-t-2 border-[#06005A]/15 pt-6">
              <span className="font-[family-name:var(--font-display)] text-4xl leading-none text-[#06005A]/25">
                "
              </span>
              <p className="mt-1 text-[1.05rem] leading-relaxed text-gray-800">
                not gonna lie i was skeptical of another qbank but this one actually notices what i keep missing and just... brings it back
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=72&h=72&fit=crop&crop=faces&auto=format"
                  alt="Maya R."
                  className="size-9 shrink-0 rounded-full object-cover"
                />
                <div className="text-sm">
                  <span className="font-semibold text-black">Maya R.</span>{' '}
                  <span className="text-gray-500">MS-3</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#06005A]/15 pt-6">
              <span className="font-[family-name:var(--font-display)] text-4xl leading-none text-[#06005A]/25">
                "
              </span>
              <p className="mt-1 text-[1.05rem] leading-relaxed text-gray-800">
                barely make flashcards anymore. the stuff i missed just shows back up right when i'm about to forget it, kind of annoyingly perfect timing
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=72&h=72&fit=crop&crop=faces&auto=format"
                  alt="Devon K."
                  className="size-9 shrink-0 rounded-full object-cover"
                />
                <div className="text-sm">
                  <span className="font-semibold text-black">Devon K.</span>{' '}
                  <span className="text-gray-500">MS-2</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#06005A]/15 pt-6">
              <span className="font-[family-name:var(--font-display)] text-4xl leading-none text-[#06005A]/25">
                "
              </span>
              <p className="mt-1 text-[1.05rem] leading-relaxed text-gray-800">
                cardio was wrecking me for weeks. it kept throwing the same concepts back at me in different forms until it finally clicked. passed Step 2 with room to spare
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?w=72&h=72&fit=crop&crop=faces&auto=format"
                  alt="Priya S."
                  className="size-9 shrink-0 rounded-full object-cover"
                />
                <div className="text-sm">
                  <span className="font-semibold text-black">Priya S.</span>{' '}
                  <span className="text-gray-500">MS-4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adaptive Engine Section */}
      <div className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Adaptive Engine
              </p>
              <h2 className="font-[family-name:var(--font-display)] mt-3 text-balance text-3xl font-bold tracking-tight text-[#06005A] sm:text-4xl">
                MedPrep Institute remembers your USMLE mistakes and trains you from first principles.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Miss a question in the Qbank, and the USMLE concept behind it gets flagged, not
                just that one question. It comes back on a spaced schedule, from a new angle each
                time, so the things you get wrong become the things you know best.
              </p>
              <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
                {[
                  { icon: Flag, text: 'Every miss is tracked by USMLE concept, not just by question.' },
                  { icon: RotateCcw, text: 'Reviews come back on a spaced schedule, automatically.' },
                  { icon: Target, text: 'Your weakest Qbank topics move to the front of your next set.' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 py-3.5 text-base text-gray-700">
                    <Icon className="mt-0.5 size-4 shrink-0 text-[#C46B10]" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <img
              src="/MedPrep institute (2).jpg"
              alt="A missed question flagged by MedPrep Institute, with its review scheduled for a few days later."
              className="order-first w-full rounded-2xl lg:order-none"
            />
          </div>
        </div>
      </div>

      {/* Jump Between Exams Section */}
      <div className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <img
              src="/MedPrep institute (16).png"
              alt="A student moving from USMLE Step 1 to Step 2 to Step 3."
              className="w-full rounded-2xl"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Across every USMLE exam
              </p>
              <h2 className="font-[family-name:var(--font-display)] mt-4 text-balance text-3xl font-bold tracking-tight text-[#06005A] sm:text-4xl">
                Jump from exam to exam like it&rsquo;s effortless.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                The more you understand, the less the USMLE Qbank needs to ask you about it.
                Concepts you have not mastered in the Step 1 Qbank carry forward into Step 2 CK,
                then Step 3, so each new Qbank starts by teaching you exactly what the last one
                showed you still needed to learn.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why It Works Section */}
      <div className="px-6 py-16 sm:py-20" style={{ backgroundColor: '#06005A' }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Why it works
              </p>
              <h2 className="font-[family-name:var(--font-display)] mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Three reasons this USMLE method sticks
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
                None of this is a gimmick. Across the Step 1 Qbank and Step 2
                Qbank, it is spaced repetition, progressive difficulty, and
                high-yield prioritization &mdash; done automatically instead of
                left for you to manage on your own.
              </p>
              <a
                href="/sign-up"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-white/30 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Start practicing free
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <div
                className="px-8 py-7 sm:px-10 sm:py-8"
                style={{ background: 'linear-gradient(90deg, #4c6fff 0%, #2b3fb0 22%, #1c2a86 100%)' }}
              >
                <span className="font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">01</span>
                <p className="mt-2 text-lg font-bold text-white">Reviews come back right on time</p>
                <p className="mt-1 max-w-md text-[0.95rem] leading-relaxed text-white/75">
                  Variations on questions you got wrong are presented to you just before you would forget them. Spaced repetition is the most powerful way to consolidate long term memories, and should not be a separate activity.
                </p>
              </div>

              <div
                className="px-8 py-7 sm:px-10 sm:py-8"
                style={{ background: 'linear-gradient(90deg, #4c6fff 0%, #2b3fb0 22%, #1c2a86 100%)' }}
              >
                <span className="font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">02</span>
                <p className="mt-2 text-lg font-bold text-white">Learn to spot trick answers</p>
                <p className="mt-1 max-w-md text-[0.95rem] leading-relaxed text-white/75">
                  By progressively expanding on topics, you get to see the ways test writers try and trick you. This is very difficult to learn when questions are presented randomly.
                </p>
              </div>

              <div
                className="px-8 py-7 sm:px-10 sm:py-8"
                style={{ background: 'linear-gradient(90deg, #4c6fff 0%, #2b3fb0 22%, #1c2a86 100%)' }}
              >
                <span className="font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">03</span>
                <p className="mt-2 text-lg font-bold text-white">The most important topics come first</p>
                <p className="mt-1 max-w-md text-[0.95rem] leading-relaxed text-white/75">
                  Not everyone finishes their question bank, and thats okay. We front-load with the most high yield concepts first to maximize your score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exams we cover Section */}
      <div className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            Exams we cover
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight text-[#06005A] sm:text-4xl">
            One platform from Step 1 to board certification.
          </h2>
          <ul className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
            {[
              { name: 'USMLE Step 1', href: '/usmle-step-1-question-bank', body: 'Foundational science and clinical knowledge.', icon: Microscope },
              { name: 'USMLE Step 2 CK', href: '/usmle-step-2-question-bank', body: 'Clinical management and patient-care vignettes.', icon: Stethoscope },
              { name: 'USMLE Step 3', href: '/usmle-step-3-question-bank', body: 'Managing patients from presentation to follow-up.', icon: ClipboardCheck },
              { name: 'ABIM Internal Medicine', href: '/abim-internal-medicine-question-bank', body: 'Board certification across internal medicine.', icon: Award },
            ].map((exam) => (
              <li key={exam.name}>
                <a
                  href={exam.href}
                  className="group grid items-center gap-2 py-6 md:grid-cols-[1fr_1.4fr_auto] md:gap-8"
                >
                  <span className="flex items-center gap-3">
                    <exam.icon className="size-5 shrink-0 text-[#06005A]" />
                    <span className="font-[family-name:var(--font-display)] text-2xl font-medium text-black group-hover:underline group-hover:underline-offset-4">
                      {exam.name}
                    </span>
                  </span>
                  <span className="text-base text-gray-600">{exam.body}</span>
                  <span
                    aria-hidden="true"
                    className="hidden text-2xl text-[#06005A] transition-transform duration-200 group-hover:translate-x-1 md:block"
                  >
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Method FAQ Section */}
      <div id="faq" className="border-t border-gray-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: methodFaqs.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: a,
                },
              })),
            }),
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">FAQ</p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Frequently Asked Questions.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Anything else?{' '}
              <a href="mailto:support@medprepinstitute.org" className="underline underline-offset-4">
                Write to us
              </a>{' '}
              and a member of the team will get back to you.
            </p>
          </div>

          <div className="flex w-full flex-col">
            {methodFaqs.map((item, index) => (
              <div key={item.q} className="border-b border-gray-200 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggleMethodFaq(index)}
                  aria-expanded={openMethodFaq === index}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left text-lg font-medium text-black hover:underline"
                >
                  <span>{item.q}</span>
                  <svg
                    className={`mt-1 size-4 shrink-0 text-gray-500 transition-transform ${openMethodFaq === index ? 'rotate-180' : ''}`}
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
                {openMethodFaq === index && (
                  <p className="pb-5 text-base leading-relaxed text-gray-600">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
        <div className="rounded-3xl px-8 py-16 text-center sm:py-20" style={{ backgroundColor: '#06005A' }}>
          <h2 className="font-[family-name:var(--font-display)] mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stop grinding through random USMLE questions.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-lg text-white/70">
            Start practicing with a plan. Try it free for 7 days.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/sign-up"
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#C46B10] px-8 text-base font-semibold text-white hover:bg-[#a95a0d] transition-colors sm:w-auto"
            >
              Start your first set
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 pb-10 pt-16" style={{ backgroundColor: '#06005A' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <img
                  src="/animateos-logo (1).png"
                  alt="MedPrep Institute Logo"
                  className="h-7 w-7 rounded-md object-cover"
                />
                <span className="text-base font-medium text-white">MedPrep Institute</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                An adaptive question bank for USMLE Step 1, Step 2 CK, Step 3, and the ABIM Exam that remembers what you miss.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Product</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li><a href="/usmle-step-1-question-bank" className="text-white/70 hover:text-white">Step 1 Qbank</a></li>
                <li><a href="/usmle-step-2-question-bank" className="text-white/70 hover:text-white">Step 2 CK Qbank</a></li>
                <li><a href="/usmle-step-3-question-bank" className="text-white/70 hover:text-white">Step 3 Qbank</a></li>
                <li><a href="/abim-internal-medicine-question-bank" className="text-white/70 hover:text-white">ABIM Qbank</a></li>
                <li><a href="/#how-it-works" className="text-white/70 hover:text-white">The Method</a></li>
                <li><a href="/sign-up" className="text-white/70 hover:text-white">Start practicing</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Resources</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li><a href="/blog" className="text-white/70 hover:text-white">Blog</a></li>
                <li><a href="/usmle/features/sample-questions" className="text-white/70 hover:text-white">Step 1 Questions</a></li>
                <li><a href="/usmle/features/sample-questions/step-2" className="text-white/70 hover:text-white">Step 2 CK Questions</a></li>
                <li><a href="/usmle/features/sample-questions/step-3" className="text-white/70 hover:text-white">Step 3 Questions</a></li>
                <li><a href="/abim/features/sample-questions" className="text-white/70 hover:text-white">ABIM Questions</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Company</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li><a href="/about" className="text-white/70 hover:text-white">About</a></li>
                <li><a href="/contact" className="text-white/70 hover:text-white">Contact</a></li>
                <li><a href="/#faq" className="text-white/70 hover:text-white">FAQ</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Legal</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li><a href="/privacy-policy" className="text-white/70 hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-white/70 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-6 text-sm text-white/40">
            © 2026 MedPrep Institute. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
