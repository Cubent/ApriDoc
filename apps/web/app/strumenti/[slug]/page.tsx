import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaqList } from '@/components/faq-list';
import { ToolIcon } from '@/components/tool-icon';
import { ToolRunner } from '@/components/tool-runner';
import { getContent } from '@/lib/tool-content';
import { AGGREGATE_RATING, SITE, TOOLS, getTool } from '@/lib/tools';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.filter((t) => t.ready).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  const url = `/strumenti/${tool.slug}`;
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url,
      siteName: SITE.name,
      locale: 'it_IT',
      type: 'website',
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const tool = getTool((await params).slug);
  if (!tool || !tool.ready) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.seoTitle.replace(/ \| ApriDoc.com$/, ''),
    description: tool.seoDescription,
    url: `${SITE.url}/strumenti/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    inLanguage: 'it-IT',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    // Real Google Business rating: shown on the P7M page only.
    ...(tool.featured ? { aggregateRating: AGGREGATE_RATING } : {}),
  };

  const content = getContent(tool.slug, tool.description);
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const related = TOOLS.filter((t) => t.ready && t.slug !== tool.slug).slice(0, 6);

  return (
    <div className="mx-auto max-w-[900px] px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="tool-title mb-8 text-center">
        <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{tool.name}</h1>
        {tool.slug !== 'apri-file-p7m' && (
          <p className="mx-auto mt-3 max-w-xl text-lg text-[#5b6270]">{tool.description}</p>
        )}
      </header>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className={tool.slug === 'apri-file-p7m' ? undefined : 'theme-pdf'}>
        <ToolRunner slug={tool.slug} />
      </div>

      {content.cards && (
        <section className="tool-extra mt-10 grid gap-4 md:grid-cols-3">
          {content.cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
              <h2 className="text-lg font-extrabold text-[#1f087a]">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6270]">{c.text}</p>
            </div>
          ))}
        </section>
      )}

      <section className="tool-extra mt-10 space-y-4 text-lg leading-relaxed text-[#3d4452]">
        {content.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section className="tool-extra mt-14">
        <h2 className="mb-2 text-center text-3xl font-extrabold">Domande frequenti</h2>
        <p className="mb-8 text-center text-[#5b6270]">Tutto quello che c’è da sapere su {tool.short.toLowerCase()}.</p>
        <FaqList items={content.faq} />
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-xl font-extrabold">Altri strumenti</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {related.map((t) => (
            <Link
              key={t.slug}
              href={`/strumenti/${t.slug}`}
              className="flex items-center gap-3 rounded-xl border border-[#e6e8ec] bg-[#f4f5f7] p-4 font-semibold"
            >
              <ToolIcon name={t.icon} color={t.color} size={40} />
              {t.short}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
