import { PersonCard } from '@/components/about/person-card';
import { Reveal } from '@/components/about/reveal';
import { partners, reviewers, sampleReviewers, sampleTeam, team } from '@/content/about';
import { findTeamPhoto } from '@/lib/team-photo';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = createMetadata({
  title: 'About Us',
  description:
    'MedPrep Institute is an adaptive question bank for USMLE Step 1, Step 2 CK, Step 3 and the ABIM exam. Meet the people, programs and ideas behind it.',
  path: '/about',
  keywords: ['about MedPrep Institute', 'adaptive USMLE question bank', 'MedPrep Institute team'],
});

const stats = [
  { value: '4', label: 'Exams covered' },
  { value: '27', label: 'Clinical disciplines' },
  { value: '10,400+', label: 'Question topics' },
  { value: '7 days', label: 'Free trial' },
];

const story = [
  {
    label: 'The problem',
    body: 'Most question banks give you a fixed list of questions, mark each one right or wrong, and move on. What you missed is left for you to track, schedule and come back to. That is a lot of memory work to do on top of actually studying.',
  },
  {
    label: 'What we built',
    body: 'A living, adaptive bank that learns how you learn. Each set is built from the one before it, and when you miss a concept it comes back on a spaced schedule, from a new angle, until it sticks.',
  },
  {
    label: 'What we want for you',
    body: 'A busy student or resident should be able to open the app, do a short set, and trust that the engine is deciding what to practice next. Your only job is to understand the material.',
  },
];

const beliefs = [
  {
    title: 'Reviews should arrive on time',
    body: 'Variations on the questions you miss come back just before you would forget them. Spaced repetition is the most powerful way to build long-term memory, so it belongs inside your practice, not beside it.',
  },
  {
    title: 'The most important topics come first',
    body: 'Not everyone finishes a question bank, and that is okay. We front-load the highest-yield concepts so the time you have goes where it counts.',
  },
  {
    title: 'Learning should compound',
    body: 'What you struggled with in one exam is prioritized first in the next. Your progress carries from Step 1 to Step 2 CK to Step 3 instead of starting over.',
  },
];

const journey = [
  { title: 'You practice in short sets', body: 'Five questions at a time, so a small daily habit is enough.' },
  { title: 'The engine finds the gap', body: 'A miss flags the underlying concept, not only the question.' },
  { title: 'Reviews land on your calendar', body: 'Missed concepts return on a spaced schedule, from new angles.' },
  { title: 'A study guide builds itself', body: 'A personalized guide of the objectives you keep missing, from your own answers.' },
];

const exams = [
  { name: 'USMLE Step 1', href: '/usmle-step-1-question-bank', body: 'Foundational science and clinical knowledge.' },
  { name: 'USMLE Step 2 CK', href: '/usmle-step-2-question-bank', body: 'Clinical management and patient-care vignettes.' },
  { name: 'USMLE Step 3', href: '/usmle-step-3-question-bank', body: 'Managing patients from presentation to follow-up.' },
  { name: 'ABIM Internal Medicine', href: '/abim-internal-medicine-question-bank', body: 'Board certification across internal medicine.' },
];

const H2 = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <h2
    className={`font-[family-name:var(--font-display)] text-balance text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl ${
      light ? 'text-white' : 'text-[#151B17]'
    }`}
  >
    {children}
  </h2>
);

const TextLink = ({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) => (
  <Link
    href={href}
    className={`group inline-flex items-center gap-2 border-b pb-0.5 text-base font-medium ${
      light ? 'border-white/60 text-white' : 'border-[#06005A] text-[#06005A]'
    }`}
  >
    {children}
    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
      &rarr;
    </span>
  </Link>
);

const isDev = process.env.NODE_ENV === 'development';

const AboutPage = () => {
  // Sample cards only preview the design while no real people have been added.
  const nobodyYet = team.length === 0 && reviewers.length === 0;
  const withPhoto = (list: typeof team) =>
    list.map((person) => ({ ...person, photo: person.photo ?? findTeamPhoto(person.name) }));
  const teamList = team.length > 0 ? withPhoto(team) : isDev && nobodyYet ? sampleTeam : [];
  const reviewerList =
    reviewers.length > 0 ? withPhoto(reviewers) : isDev && nobodyYet ? sampleReviewers : [];
  const isPreview = isDev && nobodyYet && (teamList.length > 0 || reviewerList.length > 0);
  const gridColumns = (count: number) =>
    count % 4 === 0 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About MedPrep Institute',
            url: 'https://www.medprepinstitute.org/about',
            mainEntity: {
              '@type': 'EducationalOrganization',
              name: 'MedPrep Institute',
              url: 'https://www.medprepinstitute.org',
              logo: 'https://www.medprepinstitute.org/favicon.png',
              email: 'support@medprepinstitute.org',
              ...(team.length > 0 && {
                member: teamList.map((person) => {
                  const prefix = person.name.match(/^(Dr|Prof)\.?(?=\s)/i)?.[0];
                  return {
                    '@type': 'Person',
                    name: person.name.replace(/^(Dr|Prof)\.?\s+/i, ''),
                    ...(prefix && { honorificPrefix: prefix }),
                    jobTitle: person.role,
                    worksFor: { '@type': 'EducationalOrganization', name: 'MedPrep Institute' },
                    ...(person.photo && { image: `https://www.medprepinstitute.org${person.photo}` }),
                    ...(person.url && { sameAs: person.url }),
                  };
                }),
              }),
            },
          }),
        }}
      />

      <SiteHeader />

      {/* Hero */}
      <section
        className="bg-cover bg-center px-6 py-24 sm:py-36"
        style={{ backgroundColor: '#06005A', backgroundImage: "url('/MedPrep (2).png')" }}
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-base font-medium text-white/75">About MedPrep Institute</p>
          <h1 className="font-[family-name:var(--font-display)] mt-5 max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-7xl">
            We made a question bank that remembers what you miss.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            MedPrep Institute is the adaptive practice platform we built for USMLE Step 1, Step 2
            CK, Step 3 and the ABIM exam, so every question brings you closer to test day.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Link
              href="/sign-up"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-[#C46B10] px-8 text-base font-medium text-white transition-colors hover:bg-[#a95a0d]"
            >
              Start practicing free
            </Link>
            <TextLink href="#story" light>
              Our story
            </TextLink>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 bg-white px-6 py-12 sm:py-16">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-gray-200">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col lg:px-8 lg:first:pl-0">
              <dt className="order-2 text-base text-gray-600">{stat.label}</dt>
              <dd className="font-[family-name:var(--font-display)] mb-1 text-4xl font-normal tracking-tight text-[#06005A] sm:text-6xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Team and physician reviewers: hidden until real entries are added in content/about.ts */}
      {(teamList.length > 0 || reviewerList.length > 0) && (
        <section id="team" className="bg-[#F3F3F3] px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            {isPreview && (
              <p className="mb-8 border border-dashed border-[#C46B10] bg-white px-4 py-3 text-sm text-[#7a4208]">
                Development preview: these are sample cards. Add real people in
                content/about.ts. This notice and the samples never appear in production.
              </p>
            )}
            {teamList.length > 0 && (
              <>
                <Reveal>
                  <H2>The people behind MedPrep Institute</H2>
                </Reveal>
                <div className={`mt-12 grid gap-x-6 gap-y-12 ${gridColumns(teamList.length)}`}>
                  {teamList.map((person, index) => (
                    <Reveal key={`${person.name}-${index}`} delay={index * 0.06}>
                      <PersonCard person={person} />
                    </Reveal>
                  ))}
                </div>
              </>
            )}
            {reviewerList.length > 0 && (
              <div className={teamList.length > 0 ? 'mt-20' : ''}>
                <Reveal>
                  <H2>Physician reviewers</H2>
                </Reveal>
                <div className={`mt-12 grid gap-x-6 gap-y-12 ${gridColumns(reviewerList.length)}`}>
                  {reviewerList.map((person, index) => (
                    <Reveal key={`${person.name}-${index}`} delay={index * 0.06}>
                      <PersonCard person={person} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Our story */}
      <section id="story" className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-base font-medium text-gray-500">Our story</p>
            <div className="mt-4">
              <H2>We made a question bank because these exams are too important to leave to chance.</H2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-gray-200 border-y border-gray-200">
              {story.map((item) => (
                <div key={item.label} className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
                  <dt className="text-base font-medium text-[#151B17]">{item.label}</dt>
                  <dd className="text-lg leading-relaxed text-gray-700">{item.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-[#F3F3F3] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-base font-medium text-gray-500">What we believe</p>
            <div className="mt-4 max-w-3xl">
              <H2>Three ideas the whole product is built on</H2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-gray-300">
            {beliefs.map((belief, index) => (
              <Reveal key={belief.title} delay={index * 0.08} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <p className="text-sm text-gray-500">0{index + 1}</p>
                <h3 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-medium leading-snug text-[#151B17]">
                  {belief.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray-700">{belief.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#06005A] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-base font-medium text-white/70">How it works</p>
            <div className="mt-4 max-w-3xl">
              <H2 light>From your first set to a study guide made of your own answers</H2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {journey.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <div className="border-t border-white/30 pt-5">
                  <p className="text-sm text-white/60">Step {index + 1}</p>
                  <h3 className="font-[family-name:var(--font-display)] mt-3 text-xl font-medium leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-white/75">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Exams */}
      <section className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-base font-medium text-gray-500">Exams we cover</p>
            <div className="mt-4 max-w-3xl">
              <H2>One platform from Step 1 to board certification</H2>
            </div>
          </Reveal>
          <ul className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
            {exams.map((exam) => (
              <li key={exam.name}>
                <Link
                  href={exam.href}
                  className="group grid items-center gap-2 py-6 md:grid-cols-[1fr_1.4fr_auto] md:gap-8"
                >
                  <span className="font-[family-name:var(--font-display)] text-2xl font-medium text-[#151B17] group-hover:underline group-hover:underline-offset-4">
                    {exam.name}
                  </span>
                  <span className="text-base text-gray-600">{exam.body}</span>
                  <span
                    aria-hidden="true"
                    className="hidden text-2xl text-[#06005A] transition-transform duration-200 group-hover:translate-x-1 md:block"
                  >
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Schools and programs */}
      {partners.length > 0 && (
        <section className="bg-[#F3F3F3] px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="text-base font-medium text-gray-500">Schools and programs</p>
              <div className="mt-4">
                <H2>Built with the people who train physicians</H2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="divide-y divide-gray-300 border-y border-gray-300">
                {partners.map((partner) => (
                  <div key={partner.name} className="py-6">
                    <p className="text-base text-gray-600">{partner.relationship}</p>
                    <p className="font-[family-name:var(--font-display)] mt-2 text-3xl font-medium leading-tight text-[#151B17]">
                      {partner.name}
                    </p>
                    {partner.detail && (
                      <p className="mt-2 text-lg leading-relaxed text-gray-700">{partner.detail}</p>
                    )}
                    {partner.url && (
                      <div className="mt-4">
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-b border-[#06005A] pb-0.5 text-base font-medium text-[#06005A]"
                        >
                          Visit website
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Contact + CTA */}
      <section className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <H2>Try the adaptive question bank free for 7 days</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-gray-700">
              Questions or feedback? Write to{' '}
              <a href="mailto:support@medprepinstitute.org" className="text-[#06005A] underline underline-offset-4">
                support@medprepinstitute.org
              </a>
              .
            </p>
            <div className="mt-8">
              <Link
                href="/sign-up"
                className="inline-flex h-12 items-center justify-center rounded-sm bg-[#C46B10] px-8 text-base font-medium text-white transition-colors hover:bg-[#a95a0d]"
              >
                Start your first set
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default AboutPage;
