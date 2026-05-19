import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

export const metadata: Metadata = {
  title: 'FULLBRANDZ — We build what others can\'t.',
  description: 'Digitale platformen, intelligente systemen en AI automatisering. Niets is te moeilijk.',
  keywords: ['fullbrandz', 'digital platforms', 'AI automation', 'web development', 'systems'],
  openGraph: {
    title: 'FULLBRANDZ',
    description: 'Niets is te moeilijk.',
    type: 'website',
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
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
