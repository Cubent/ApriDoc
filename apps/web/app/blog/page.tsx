import { ArrowUpRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDate, POSTS } from '@/lib/blog';
import { SITE } from '@/lib/tools';

const TITLE = 'Blog su firma digitale, file P7M e PDF';
const DESCRIPTION =
  'Guide pratiche su firma digitale, file .p7m, fatture elettroniche e PDF: cosa sono, come si aprono e come usarli, spiegate in modo chiaro.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/blog', siteName: SITE.name, locale: 'it_IT', type: 'website' },
};

export default function BlogIndexPage() {
  const url = `${SITE.url}/blog`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `Blog ${SITE.name}`,
      description: DESCRIPTION,
      url,
      inLanguage: 'it-IT',
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      blogPost: POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${url}/${p.slug}`,
        datePublished: p.published,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: url },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-[900px] px-5 py-12">
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <nav aria-label="Briciole di pane" className="mb-8 text-sm text-[#5b6270]">
        <Link href="/" className="hover:underline">Home</Link> › <span>Blog</span>
      </nav>

      <header className="border-b border-[#e6e8ec] pb-8">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">Blog</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5b6270]">
          Guide pratiche su firma digitale, file P7M, fatture elettroniche e PDF, scritte per chi ha bisogno di capire e
          andare avanti.
        </p>
      </header>

      <ul className="divide-y divide-[#e6e8ec]">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group block py-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1f087a]">{p.category}</p>
              <h2 className="mt-2 flex items-start justify-between gap-4 text-2xl font-extrabold leading-snug tracking-tight group-hover:text-[#1f087a]">
                {p.title}
                <ArrowUpRight size={22} className="mt-1 shrink-0 text-[#9aa1ad] transition group-hover:text-[#1f087a]" />
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#5b6270]">{p.description}</p>
              <p className="mt-4 flex items-center gap-4 text-sm text-[#8a91a0]">
                <time dateTime={p.published}>{formatDate(p.published)}</time>
                <span className="inline-flex items-center gap-1"><Clock size={14} /> {p.readingMinutes} min di lettura</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
