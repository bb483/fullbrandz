import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE } from '@/lib/site';
import {
  getArticle,
  getAllSlugs,
  getRelatedArticles,
  formatDate,
  type Block,
} from '@/content/kennisbank';
import { KbHeader, KbFooter } from '@/components/kennisbank/KbChrome';
import ArticleContent from '@/components/kennisbank/ArticleContent';
import JsonLd from '@/components/kennisbank/JsonLd';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug);
  if (!article) {
    return { title: 'Artikel niet gevonden', robots: { index: false } };
  }

  const url = `${SITE.url}/kennisbank/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/kennisbank/${article.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.description,
      siteName: SITE.name,
      locale: SITE.locale,
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

// Haal vraag/antwoord-paren uit de "Veelgestelde vragen"-sectie voor FAQ-schema.
function extractFaqs(blocks: Block[]): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  let inFaq = false;
  let pendingQuestion: string | null = null;

  for (const block of blocks) {
    if (block.type === 'h2') {
      inFaq = block.text.toLowerCase().includes('veelgestelde vragen');
      pendingQuestion = null;
      continue;
    }
    if (!inFaq) continue;
    if (block.type === 'h3') {
      pendingQuestion = block.text;
    } else if (block.type === 'p' && pendingQuestion) {
      faqs.push({ question: pendingQuestion, answer: block.text.replace(/\*\*/g, '') });
      pendingQuestion = null;
    }
  }
  return faqs;
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const url = `${SITE.url}/kennisbank/${article.slug}`;
  const related = getRelatedArticles(article.slug, 3);
  const faqs = extractFaqs(article.content);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated,
    inLanguage: 'nl-BE',
    author: { '@type': 'Organization', name: article.author, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: article.keywords.join(', '),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Kennisbank', item: `${SITE.url}/kennisbank` },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  };

  const faqLd =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={[articleLd, breadcrumbLd, ...(faqLd ? [faqLd] : [])]} />
      <KbHeader />

      <main className="relative" style={{ background: '#F8FAFC' }}>
        <div className="absolute inset-0 grid-overlay opacity-[0.15] pointer-events-none" />

        <article className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-10">
          {/* Breadcrumb */}
          <nav className="font-mono text-[11px] tracking-widest text-[#1E1B4B] opacity-60 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-cyan transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/kennisbank" className="hover:text-cyan transition-colors">KENNISBANK</Link>
          </nav>

          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded"
              style={{ background: 'rgba(0,119,204,0.08)', color: '#0077CC', border: '1px solid rgba(0,119,204,0.18)' }}
            >
              {article.category}
            </span>
            <span className="font-mono text-[11px] tracking-widest text-[#1E1B4B] opacity-50">
              {formatDate(article.date)} · {article.readMinutes} min leestijd
            </span>
          </div>

          <h1 className="font-mono font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A0A1A] mb-6 leading-[1.05]">
            {article.title}
          </h1>
          <p className="font-sans text-[#1E1B4B] text-lg sm:text-xl leading-relaxed mb-4">
            {article.description}
          </p>

          <div className="flex items-center gap-3 py-5 border-y border-gray-200 mb-10">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-[#F8FAFC]"
              style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)' }}
              aria-hidden="true"
            >
              FB
            </div>
            <div className="font-mono text-xs tracking-widest text-[#1E1B4B]">
              DOOR {article.author}
            </div>
          </div>

          {/* Body */}
          <ArticleContent blocks={article.content} />

          {/* CTA */}
          <div className="glass-card mt-14 p-6 sm:p-8 text-center">
            <p className="font-sans text-[#1E1B4B] text-base sm:text-lg leading-relaxed mb-6">
              Vragen over jouw project? FULLBRANDZ bouwt websites, platformen en AI-automatisering op maat.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex max-w-full items-center justify-center gap-2 font-mono font-bold text-xs sm:text-sm tracking-widest px-6 sm:px-9 py-4 rounded-xl text-[#F8FAFC] break-all"
              style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)' }}
            >
              MAIL ONS →
            </a>
            <div className="mt-4 font-mono text-xs text-cyan break-all">{SITE.email}</div>
          </div>
        </article>

        {/* Gerelateerde artikelen */}
        {related.length > 0 && (
          <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 pb-24">
            <div className="font-mono text-xs tracking-[0.4em] text-cyan mb-6 opacity-70">
              // LEES OOK
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/kennisbank/${r.slug}`} className="block group h-full">
                  <article className="glass-card h-full p-5 flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
                    <span className="font-mono text-[10px] tracking-widest text-cyan mb-2">{r.category}</span>
                    <h3 className="font-mono font-bold text-base text-[#0A0A1A] leading-snug group-hover:text-cyan transition-colors duration-300">
                      {r.title}
                    </h3>
                    <span className="font-mono text-[11px] tracking-widest text-cyan mt-auto pt-4 group-hover:translate-x-1 transition-transform duration-300 inline-block">
                      LEZEN →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <KbFooter />
    </>
  );
}
