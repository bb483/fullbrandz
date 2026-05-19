'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const stepIcons = [
  // Discover: magnifying glass
  <svg key="discover" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    <path d="M8 11h6M11 8v6" strokeLinecap="round" />
  </svg>,
  // Design: pen tool
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>,
  // Build: code brackets
  <svg key="build" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="19" y1="2" x2="5" y2="22" strokeLinecap="round" />
  </svg>,
  // Scale: trending up
  <svg key="scale" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16 7 22 7 22 13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function Process() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(124,16,204,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="font-mono text-xs tracking-[0.4em] text-cyan mb-4 opacity-70">
            {t.process.tag}
          </div>
          <h2 className="font-mono font-black text-4xl sm:text-5xl md:text-6xl text-[#0A0A1A]">
            {t.process.title}
          </h2>
        </motion.div>

        {/* Steps — horizontal scroll on mobile, grid on desktop */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="absolute top-[52px] left-0 right-0 h-px hidden md:block"
            style={{
              background: 'linear-gradient(90deg, transparent 5%, rgba(0,119,204,0.15) 20%, rgba(124,16,204,0.15) 80%, transparent 95%)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: reduced ? 0 : i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative group"
              >
                {/* Step number + icon cluster */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Big number behind */}
                  <div
                    className="relative w-[104px] h-[104px] flex-shrink-0"
                  >
                    {/* Faded large number */}
                    <span
                      className="absolute inset-0 flex items-center justify-center font-mono font-black text-7xl leading-none select-none pointer-events-none"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(0,119,204,0.12)',
                      }}
                    >
                      {step.number}
                    </span>

                    {/* Icon circle */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        background: 'rgba(0,119,204,0.06)',
                        border: '1px solid rgba(0,119,204,0.2)',
                        color: '#0077CC',
                        boxShadow: 'none',
                      }}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {stepIcons[i]}
                      </div>
                    </div>

                    {/* Active glow on hover */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        boxShadow: '0 0 25px rgba(0,119,204,0.5)',
                      }}
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="pl-1">
                  <h3 className="font-mono font-bold text-2xl text-[#0A0A1A] mb-3 group-hover:text-cyan transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[#0A0A1A] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow connector — desktop only, not on last step */}
                {i < t.process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-[52px] -right-3 z-10">
                    <svg className="w-6 h-6 text-cyan opacity-30" fill="none" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
