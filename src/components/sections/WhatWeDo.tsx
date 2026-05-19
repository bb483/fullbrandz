'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ServiceCard3D = dynamic(() => import('@/components/three/ServiceCard3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface-1" />,
});

const cardTypes = ['platform', 'system', 'ai'] as const;

export default function WhatWeDo() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative section-padding"
      style={{
        background: 'linear-gradient(to bottom, #F8FAFC 0%, #EEF3FC 50%, #F8FAFC 100%)',
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />

      {/* Side accent lines */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,119,204,0.3), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,16,204,0.2), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="font-mono text-xs tracking-[0.4em] text-cyan mb-4 opacity-70">
            {t.services.tag}
          </div>
          <h2 className="font-mono font-black text-4xl sm:text-5xl md:text-6xl text-[#0A0A1A] mb-6">
            {t.services.title}
          </h2>
          <p className="font-sans text-[#0A0A1A] max-w-lg text-base sm:text-lg leading-relaxed">
            {t.services.sub}
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {t.services.items.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="glass-card relative overflow-hidden group cursor-pointer"
              style={{
                borderColor: hoveredCard === i
                  ? 'rgba(0,119,204,0.4)'
                  : 'rgba(0,119,204,0.1)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                boxShadow: hoveredCard === i
                  ? '0 0 40px rgba(0,119,204,0.08), inset 0 0 40px rgba(0,119,204,0.02)'
                  : 'none',
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              data-cursor="hover"
            >
              {/* 3D canvas area */}
              <div className="relative h-52 overflow-hidden">
                {!isMobile ? (
                  <ServiceCard3D
                    type={cardTypes[i]}
                    className="w-full h-full"
                  />
                ) : (
                  /* Mobile static placeholder */
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `radial-gradient(ellipse at center, ${
                        i === 0 ? 'rgba(0,119,204,0.12)' :
                        i === 1 ? 'rgba(124,16,204,0.12)' :
                        'rgba(0,119,204,0.08)'
                      } 0%, transparent 70%)`,
                    }}
                  >
                    <div className="font-mono text-5xl font-black gradient-text opacity-30">
                      {item.number}
                    </div>
                  </div>
                )}

                {/* Gradient overlay at bottom of canvas */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8))',
                  }}
                />
              </div>

              {/* Text content */}
              <div className="p-7">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs tracking-widest text-cyan opacity-50">
                    {item.number}
                  </span>
                  {/* Animated arrow */}
                  <svg
                    className="w-5 h-5 text-[#1E1B4B] group-hover:text-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </div>

                <h3 className="font-mono font-bold text-2xl text-[#0A0A1A] mb-3 group-hover:text-cyan transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="font-sans text-[#0A0A1A] text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-sm"
                      style={{
                        background: 'rgba(0,119,204,0.06)',
                        border: '1px solid rgba(0,119,204,0.15)',
                        color: 'rgba(0,119,204,0.7)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow corner */}
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(0,119,204,0.15), transparent 70%)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
