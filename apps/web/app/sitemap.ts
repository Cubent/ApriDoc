import type { MetadataRoute } from 'next';
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
    { url: `${SITE.url}/privacy-policy`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE.url}/termini-e-condizioni`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];
}
