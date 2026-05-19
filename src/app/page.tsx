'use client';

import dynamic from 'next/dynamic';
import { useLenis } from '@/hooks/useLenis';

import Navigation from '@/components/Navigation';

// Sections – lazily loaded so Three.js doesn't block initial paint
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
const WhatWeDo = dynamic(() => import('@/components/sections/WhatWeDo'), { ssr: false });
const ScrollJourney = dynamic(() => import('@/components/sections/ScrollJourney'), { ssr: false });
const Process = dynamic(() => import('@/components/sections/Process'), { ssr: false });
const Statement = dynamic(() => import('@/components/sections/Statement'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });

// Custom cursor (desktop only)
const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false });

export default function HomePage() {
  useLenis();

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines-overlay" aria-hidden="true" />
      <Cursor />

      <div>
        <Navigation />

        <main>
          <Hero />
          <WhatWeDo />
          <ScrollJourney />
          <Process />
          <Statement />
          <Contact />
        </main>

        <footer className="border-t border-gray-100 py-8 px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#1E1B4B] tracking-widest">
              © 2024 FULLBRANDZ — ALL RIGHTS RESERVED
            </span>
            <span className="font-mono text-xs text-[#1E1B4B] tracking-widest">
              NIETS IS TE MOEILIJK.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
