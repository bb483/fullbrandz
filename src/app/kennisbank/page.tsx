import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { getAllArticles, getCategories, formatDate } from '@/content/kennisbank';
import { KbHeader, KbFooter } from '@/components/kennisbank/KbChrome';
import JsonLd from '@/components/kennisbank/JsonLd';

const TITLE = 'Kennisbank — gidsen over websites, platformen, SEO & AI';
const DESCRIPTION =
  'De FULLBRANDZ kennisbank: praktische gidsen over websites, digitale platformen, SEO en AI-automatisering om mensen en bedrijven verder te helpen.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['kennisbank', 'blog', 'websites', 'digitale platformen', 'SEO', 'AI automatisering', 'webdevelopment'],
  alternates: { canonical: '/kennisbank' },
  openGraph: {
    type: 'website',
    url: `${SITE.url}/kennisbank`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function KennisbankPage() {
  const articles = getAllArticles();
  const categories = getCategories();

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FULLBRANDZ Kennisbank',
    description: DESCRIPTION,
    url: `${SITE.url}/kennisbank`,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    hasPart: articles.map((a) => ({
      '@type': 'Article',
      headline: a.title,
      description: a.description,
      url: `${SITE.url}/kennisbank/${a.slug}`,
      datePublished: a.date,
      dateModified: a.updated,
      author: { '@type': 'Organization', name: a.author },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Kennisbank', item: `${SITE.url}/kennisbank` },
    ],
  };

  const [featured, ...rest] = articles;

  return (
    <>
      <JsonLd data={[collectionLd, breadcrumbLd]} />
      <KbHeader />

      <main className="relative min-h-screen" style={{ background: '#F8FAFC' }}>
        <div className="absolute inset-0 grid-overlay opacity-[0.18] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-20 pb-10 sm:pb-12">
          {/* Hero */}
          <div className="max-w-3xl">
            <div className="font-mono text-xs tracking-[0.4em] text-cyan mb-5 opacity-70">
              // KENNISBANK
            </div>
            <h1 className="font-mono font-black text-4xl sm:text-5xl lg:text-6xl text-[#0A0A1A] mb-6 leading-[0.95]">
              Kennis die je <span className="gradient-text">vooruit</span> helpt.
            </h1>
            <p className="font-sans text-[#1E1B4B] text-lg leading-relaxed">
              Praktische gidsen over websites, digitale platformen, SEO en AI-automatisering.
              Geschreven om mensen en bedrijven scherpere keuzes te laten maken — zonder jargon, met concrete inzichten.
            </p>
          </div>

          {/* Categorieën */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <span
                key={cat}
                className="font-mono text-[11px] tracking-widest px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(0,119,204,0.07)', color: '#0077CC', border: '1px solid rgba(0,119,204,0.18)' }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20 sm:pb-24">
          {/* Uitgelicht artikel */}
          {featured && (
            <Link href={`/kennisbank/${featured.slug}`} className="block group mb-12">
              <article className="glass-card overflow-hidden p-6 sm:p-10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span
                    className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded"
                    style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)', color: '#F8FAFC' }}
                  >
                    UITGELICHT
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-cyan">{featured.category}</span>
                  <span className="font-mono text-[11px] tracking-widest text-[#1E1B4B] opacity-50">
                    {formatDate(featured.date)} · {featured.readMinutes} min
                  </span>
                </div>
                <h2 className="font-mono font-black text-2xl sm:text-4xl text-[#0A0A1A] mb-4 leading-tight group-hover:text-cyan transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="font-sans text-[#1E1B4B] text-base sm:text-lg leading-relaxed max-w-3xl">
                  {featured.excerpt}
                </p>
                <span className="inline-block mt-6 font-mono text-xs tracking-widest text-cyan border-b border-cyan/30 group-hover:border-cyan pb-px transition-colors">
                  LEES ARTIKEL →
                </span>
              </article>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article) => (
              <Link key={article.slug} href={`/kennisbank/${article.slug}`} className="block group h-full">
                <article className="glass-card h-full p-6 flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] tracking-widest text-cyan">{article.category}</span>
                    <span className="font-mono text-[10px] tracking-widest text-[#1E1B4B] opacity-50">
                      {article.readMinutes} min
                    </span>
                  </div>
                  <h3 className="font-mono font-bold text-xl text-[#0A0A1A] mb-3 leading-snug group-hover:text-cyan transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="font-sans text-[#1E1B4B] text-sm leading-relaxed mb-5 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-mono text-[11px] tracking-widest text-[#1E1B4B] opacity-50">
                      {formatDate(article.date)}
                    </span>
                    <span className="font-mono text-[11px] tracking-widest text-cyan group-hover:translate-x-1 transition-transform duration-300">
                      LEZEN →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="glass-card mt-16 p-8 sm:p-12 text-center">
            <h2 className="font-mono font-black text-2xl sm:text-3xl text-[#0A0A1A] mb-4">
              Een idee dat je wil bouwen?
            </h2>
            <p className="font-sans text-[#1E1B4B] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Van een snelle website tot een schaalbaar platform met AI-automatisering — FULLBRANDZ helpt je verder. Niets is te moeilijk.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-block font-mono font-bold text-sm tracking-widest px-10 py-4 rounded-xl text-[#F8FAFC]"
              style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)' }}
            >
              START HET GESPREK
            </a>
          </div>
        </div>
      </main>

      <KbFooter />
    </>
  );
}
