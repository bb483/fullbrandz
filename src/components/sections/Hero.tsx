'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MorphingShape = dynamic(() => import('@/components/three/MorphingShape'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function Hero() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-overlay"
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,119,204,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #F8FAFC)',
        }}
      />

      {/* 3D Shape — desktop only */}
      {!isMobile ? (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${scrollProgress * 120}px) scale(${1 + scrollProgress * 0.15})`,
            opacity: 1 - scrollProgress * 1.2,
            transition: reduced ? 'none' : undefined,
          }}
        >
          <MorphingShape
            scrollProgress={scrollProgress}
            className="w-full h-full"
          />
        </div>
      ) : (
        /* Mobile: static gradient orb */
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,119,204,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-xs tracking-[0.4em] text-cyan mb-8 opacity-70"
        >
          {t.hero.tag}
        </motion.div>

        {/* Main headline with glitch effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4"
        >
          <h1
            className="font-mono font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-[#0A0A1A] relative"
            style={{ transform: `translateY(${scrollProgress * -40}px)` }}
          >
            <span
              className="block glitch-text"
              data-text={t.hero.headline1}
            >
              {t.hero.headline1}
            </span>
            <span
              className="block gradient-text"
              style={{
                textShadow: 'none',
                filter: 'drop-shadow(0 0 30px rgba(0,119,204,0.4))',
              }}
            >
              {t.hero.headline2}
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-sans text-base sm:text-lg text-[#0A0A1A] max-w-xl mx-auto mb-12 leading-relaxed"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary CTA */}
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative font-mono text-sm tracking-widest px-8 py-4 rounded-lg overflow-hidden font-bold text-[#F8FAFC] min-w-[200px]"
            data-cursor="hover"
            style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)' }}
          >
            <span className="relative z-10">{t.hero.cta1}</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #7C10CC, #0077CC)' }}
            />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-mono text-sm tracking-widest px-8 py-4 rounded-lg border border-gray-300 hover:border-cyan/50 text-[#0A0A1A] hover:text-[#0A0A1A] transition-all duration-300 min-w-[200px]"
            data-cursor="hover"
          >
            {t.hero.cta2}
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2 cursor-pointer mt-12"
          onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#1E1B4B]">
            {t.hero.scroll}
          </span>
          <div className="relative w-px h-14 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,119,204,0.6))' }}
            />
            <div
              className="absolute w-full"
              style={{
                height: '50%',
                background: 'linear-gradient(to bottom, #0077CC, transparent)',
                animation: 'scrollIndicator 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 border-t border-gray-100 px-8 py-5 hidden lg:flex justify-center gap-16"
      >
        {[
          { value: '50+', label: 'Projecten' },
          { value: '100%', label: 'On-time delivery' },
          { value: '∞', label: 'Complexiteit' },
        ].map((stat) => (
          <div key={stat.value} className="text-center">
            <div className="font-mono text-2xl font-bold gradient-text">{stat.value}</div>
            <div className="font-mono text-xs text-[#1E1B4B] tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <style jsx>{`
        @keyframes scrollIndicator {
          0% { top: -50%; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}
