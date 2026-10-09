import { ArrowRight, Clock, FileCheck2 } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ComponentType } from 'react';
import { FaqList } from '@/components/faq-list';
import { formatDate, getPost, POSTS } from '@/lib/blog';
import type { Faq } from '@/lib/tool-content';
import { SITE } from '@/lib/tools';
import * as fileP7m from '@/content/posts/file-p7m-cosa-sono';

type PostModule = {
  Content: ComponentType;
  toc: { id: string; title: string }[];
  summary: string[];
  faq: Faq[];
};

const MODULES: Record<string, PostModule> = {
  'file-p7m-cosa-sono': fileP7m,
};

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: SITE.name }],
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.description,
      url: path,
      siteName: SITE.name,
      locale: 'it_IT',
      type: 'article',
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [SITE.name],
      section: post.category,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

// Typography for the article body: the content files only use plain HTML elements.
const PROSE = [
  'break-words text-[17px] leading-8 text-[#2e3441]',
  '[&_h2]:mt-14 [&_h2]:scroll-mt-24 [&_h2]:text-[28px] [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:text-[#1f2430]',
  '[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:text-[#1f2430]',
  '[&_p]:mt-5',
  '[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2.5 [&_ol]:pl-6',
  '[&_li::marker]:text-[#1f087a]',
  '[&_a]:font-semibold [&_a]:text-[#1f087a] [&_a]:underline [&_a]:decoration-[#1f087a]/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-[#1f087a]',
  '[&_strong]:font-bold [&_strong]:text-[#1f2430]',
  '[&_code]:rounded-md [&_code]:bg-[#f1f2f6] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.88em] [&_code]:text-[#1f087a]',
].join(' ');

export default async function BlogPostPage({ params }: Props) {
  const slug = (await params).slug;
  const post = getPost(slug);
  const mod = MODULES[slug];
  if (!post || !mod) notFound();

  const { Content, toc, summary, faq } = mod;
  const url = `${SITE.url}/blog/${post.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      inLanguage: 'it-IT',
      datePublished: post.published,
      dateModified: post.updated,
      articleSection: post.category,
      keywords: post.keywords.join(', '),
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      image: [`${url}/opengraph-image`],
      author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
        logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png` },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12">
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <nav aria-label="Briciole di pane" className="mb-8 text-sm text-[#5b6270]">
        <Link href="/" className="hover:underline">Home</Link> ›{' '}
        <Link href="/blog" className="hover:underline">Blog</Link> › <span>{post.category}</span>
      </nav>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,720px)_1fr]">
        <article className="min-w-0">
          <header>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1f087a]">{post.category}</p>
            <h1 className="mt-3 break-words text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-[46px]">{post.title}</h1>
            <p className="mt-5 text-lg leading-8 text-[#5b6270]">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-[#e6e8ec] py-3 text-sm text-[#5b6270]">
              <span className="font-semibold text-[#1f2430]">Redazione {SITE.name}</span>
              <span>Pubblicato il <time dateTime={post.published}>{formatDate(post.published)}</time></span>
              {post.updated !== post.published && (
                <span>Aggiornato il <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
              )}
              <span className="inline-flex items-center gap-1"><Clock size={14} /> {post.readingMinutes} min di lettura</span>
            </div>
          </header>

          <section aria-label="In breve" className="mt-8 rounded-2xl border border-[#e6e8ec] bg-[#f4f5f7] p-6">
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#8a91a0]">In breve</h2>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-[#2e3441]">
              {summary.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#1f087a]" />
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {/* Table of contents on small screens; the sticky one is in the sidebar */}
          <nav aria-label="Indice" className="mt-8 rounded-2xl border border-[#e6e8ec] p-6 lg:hidden">
            <p className="text-sm font-extrabold uppercase tracking-widest text-[#8a91a0]">Indice</p>
            <ol className="mt-3 space-y-2 text-[15px]">
              {toc.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="hover:text-[#1f087a]">{t.title}</a></li>
              ))}
            </ol>
          </nav>

          <div className={PROSE}>
            <Content />
          </div>

          <aside className="mt-14 rounded-3xl bg-[#1f087a] p-8 text-white">
            <h2 className="text-2xl font-extrabold">Hai un file .p7m da aprire?</h2>
            <p className="mt-2 max-w-xl text-white/80">
              Trascinalo nello strumento: vedi il documento e chi lo ha firmato, direttamente nel browser, senza
              caricare nulla.
            </p>
            <Link
              href="/strumenti/apri-file-p7m"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-extrabold text-[#1f087a] hover:bg-[#f0edff]"
            >
              Apri un file P7M <ArrowRight size={18} />
            </Link>
          </aside>

          <section id="domande" className="mt-16 scroll-mt-24">
            <h2 className="mb-6 text-[28px] font-extrabold tracking-tight">Domande frequenti</h2>
            <FaqList items={faq} />
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <nav aria-label="Indice">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#8a91a0]">In questa guida</p>
              <ol className="mt-4 space-y-3 border-l border-[#e6e8ec] text-sm">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ml-px block border-l-2 border-transparent pl-4 text-[#5b6270] hover:border-[#1f087a] hover:text-[#1f087a]">
                      {t.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <Link
              href="/strumenti/apri-file-p7m"
              className="group mt-8 block rounded-2xl bg-[#1f087a] p-5 text-white transition hover:bg-[#2a0d9c]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-white">
                <FileCheck2 size={22} />
              </span>
              <p className="mt-4 font-extrabold leading-snug">Apri file P7M</p>
              <p className="mt-1 text-sm leading-6 text-white/75">
                Trascina il tuo .p7m e vedi documento e firmatario, direttamente nel browser.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white">
                Apri il file <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
