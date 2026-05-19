'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Statement() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-150px' });

  // Parallax scroll for background orbs
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  // Character-by-character text reveal
  const words = [t.statement.line1, t.statement.line2, t.statement.line3];

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep dark background */}
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 grid-overlay opacity-20" />

      {/* Parallax orbs — reduced-motion safe */}
      {!reduced && (
        <>
          <motion.div
            style={{ y: bgY1 }}
            className="absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5 }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,119,204,0.08) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </motion.div>

          <motion.div
            style={{ y: bgY2 }}
            className="absolute -right-40 bottom-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(124,16,204,0.07) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </motion.div>
        </>
      )}

      {/* Top & bottom borders */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,119,204,0.3), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,16,204,0.3), transparent)' }}
      />

      {/* Content */}
      <motion.div
        style={reduced ? {} : { y: textY }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.4em] text-cyan mb-12 opacity-60"
        >
          {t.statement.tag}
        </motion.div>

        {/* Giant statement text */}
        <div className="mb-12">
          {words.map((word, wi) => (
            <div key={wi} className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: reduced ? 0 : wi * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <span
                  className="block font-mono font-black text-[clamp(4rem,15vw,12rem)] leading-[0.9] tracking-tight"
                  style={{
                    background: wi === 2
                      ? 'linear-gradient(135deg, #0077CC, #7C10CC)'
                      : 'none',
                    WebkitBackgroundClip: wi === 2 ? 'text' : undefined,
                    WebkitTextFillColor: wi === 2 ? 'transparent' : undefined,
                    backgroundClip: wi === 2 ? 'text' : undefined,
                    color: wi === 2 ? 'transparent' : '#0A0A1A',
                    filter: wi === 2
                      ? 'drop-shadow(0 0 40px rgba(0,119,204,0.4))'
                      : undefined,
                  }}
                >
                  {word}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.6 }}
          className="font-sans text-[#0A0A1A] text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-12"
        >
          {t.statement.sub}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.8 }}
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative font-mono font-bold text-sm tracking-widest px-10 py-4 rounded-lg overflow-hidden text-[#F8FAFC]"
            data-cursor="hover"
            style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)' }}
          >
            <span className="relative z-10">→ START NOW</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #7C10CC, #0077CC)' }}
            />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
