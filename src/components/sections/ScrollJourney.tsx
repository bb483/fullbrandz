'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const JourneyScene = dynamic(() => import('@/components/three/JourneyScene'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: '#F8FAFC' }}
    >
      <div className="font-mono text-xs text-cyan opacity-40 tracking-widest animate-pulse">
        INITIALIZING 3D SCENE...
      </div>
    </div>
  ),
});

export default function ScrollJourney() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / sectionHeight));
      setProgress(p);
      setActiveStep(Math.min(t.journey.steps.length - 1, Math.floor(p * t.journey.steps.length)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced, t.journey.steps.length]);

  // ─── Mobile layout — clean flow, no absolute positioning ───────────────────
  if (isMobile) {
    return (
      <section id="journey" className="relative section-padding" style={{ background: '#F8FAFC' }}>
        <div className="absolute inset-0 grid-overlay opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div ref={titleRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="font-mono text-xs tracking-[0.4em] mb-3" style={{ color: '#0A0A1A' }}>
                {t.journey.tag}
              </div>
              <h2 className="font-mono font-black text-3xl mb-4" style={{ color: '#0A0A1A' }}>
                {t.journey.title}
              </h2>
              <p className="font-sans text-[#0A0A1A] text-sm leading-relaxed max-w-sm">
                {t.journey.sub}
              </p>
            </motion.div>
          </div>

          {/* Decorative gradient divider */}
          <div
            className="w-full h-px mb-10"
            style={{ background: 'linear-gradient(90deg, #0077CC, #7C10CC, transparent)' }}
          />

          {/* Steps grid */}
          <div className="grid grid-cols-2 gap-6">
            {t.journey.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-5"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mb-3"
                  style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)' }}
                />
                <div className="font-mono text-sm font-bold text-[#0A0A1A] mb-1">{step.label}</div>
                <p className="font-sans text-xs text-[#0A0A1A] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Desktop layout — sticky 3D scroll scene ─────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative"
      style={{ height: '400vh' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: '#F8FAFC' }}
      >
        <div className="absolute inset-0 grid-overlay opacity-30" />

        {/* Header */}
        <div
          ref={titleRef}
          className="absolute top-0 left-0 right-0 z-10 px-8 lg:px-16 pt-16 pb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs tracking-[0.4em] mb-3" style={{ color: '#0A0A1A' }}>
              {t.journey.tag}
            </div>
            <h2 className="font-mono font-black text-4xl md:text-5xl" style={{ color: '#0A0A1A' }}>
              {t.journey.title}
            </h2>
          </motion.div>
        </div>

        {/* 3D Canvas */}
        <JourneyScene
          progress={reduced ? 0.5 : progress}
          className="absolute inset-0 w-full h-full"
        />

        {/* Progress indicator — right side */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
          {t.journey.steps.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{
                width: activeStep === i ? '24px' : '8px',
                height: '2px',
                background: i <= activeStep
                  ? 'linear-gradient(90deg, #0077CC, #7C10CC)'
                  : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        {/* Bottom overlay: step labels */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-8 lg:px-16 pb-12"
          style={{ background: 'linear-gradient(to top, rgba(248,250,252,0.97) 0%, transparent 100%)' }}
        >
          <div className="max-w-4xl">
            <p className="font-sans text-[#0A0A1A] text-sm mb-8 max-w-md">
              {t.journey.sub}
            </p>
            <div className="flex flex-wrap gap-6">
              {t.journey.steps.map((step, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{ opacity: i <= activeStep ? 1 : 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        background: i <= activeStep
                          ? 'linear-gradient(135deg, #0077CC, #7C10CC)'
                          : 'rgba(255,255,255,0.2)',
                        boxShadow: i === activeStep ? '0 0 8px rgba(0,119,204,0.8)' : 'none',
                      }}
                    />
                    <span className="font-mono text-xs tracking-widest text-[#0A0A1A]">
                      {step.label}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#1E1B4B] pl-3.5 max-w-[150px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {!reduced && (
            <div className="mt-8 h-px bg-gray-100 max-w-xs">
              <div
                className="h-full transition-all duration-100"
                style={{
                  width: `${progress * 100}%`,
                  background: 'linear-gradient(90deg, #0077CC, #7C10CC)',
                  boxShadow: '0 0 8px rgba(0,119,204,0.6)',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
