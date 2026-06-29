import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { getAllArticles } from '@/content/kennisbank';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const routes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE.url}/kennisbank`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE.url}/kennisbank/${a.slug}`,
    lastModified: new Date(a.updated),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...articleRoutes];
}
