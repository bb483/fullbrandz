import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SITE } from '@/lib/site';
import JsonLd from '@/components/kennisbank/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'FULLBRANDZ — We build what others can\'t.',
    template: '%s | FULLBRANDZ',
  },
  description: 'Digitale platformen, intelligente systemen en AI automatisering. Niets is te moeilijk.',
  keywords: ['fullbrandz', 'digitale platformen', 'AI automatisering', 'webontwikkeling', 'maatwerk website', 'systemen'],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    title: 'FULLBRANDZ — We build what others can\'t.',
    description: 'Digitale platformen, intelligente systemen en AI automatisering. Niets is te moeilijk.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FULLBRANDZ — We build what others can\'t.',
    description: 'Digitale platformen, intelligente systemen en AI automatisering. Niets is te moeilijk.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="scroll-smooth">
      <body className="bg-bg text-[#0A0A1A] antialiased">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.url,
            email: SITE.email,
            description: SITE.description,
            slogan: SITE.tagline,
          }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
