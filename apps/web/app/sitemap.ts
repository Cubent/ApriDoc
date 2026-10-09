import type { MetadataRoute } from 'next';
import { POSTS } from '@/lib/blog';
import { SITE, TOOLS } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE.url, lastModified, changeFrequency: 'weekly', priority: 1 },
    ...TOOLS.filter((t) => t.ready).map((t) => ({
      url: `${SITE.url}/strumenti/${t.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: t.featured ? 0.9 : 0.7,
    })),
    { url: `${SITE.url}/strumenti/convertire-p7m-in-pdf`, lastModified, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${SITE.url}/blog`, lastModified, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITE.url}/privacy-policy`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE.url}/termini-e-condizioni`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];
}
