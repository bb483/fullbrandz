'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const BlobContact = dynamic(() => import('@/components/three/BlobContact'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function Contact() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setMagnetPos({ x, y });
  };

  const handleBtnMouseLeave = () => {
    setMagnetPos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: '#F8FAFC' }} />
      <div className="absolute inset-0 grid-overlay opacity-25" />

      {/* Cyan glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(0,119,204,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,119,204,0.3), transparent)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text + CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <div className="font-mono text-xs tracking-[0.4em] text-cyan mb-5 opacity-70">
                {t.contact.tag}
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-mono font-black text-5xl sm:text-6xl md:text-7xl text-[#0A0A1A] mb-6 leading-[0.95]"
            >
              {t.contact.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-[#0A0A1A] text-base sm:text-lg leading-relaxed mb-12 max-w-md"
            >
              {t.contact.sub}
            </motion.p>

            {/* Magnetic CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
            >
              <motion.button
                ref={btnRef}
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                animate={{
                  x: magnetPos.x,
                  y: magnetPos.y,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                onClick={() => window.open(`mailto:${t.contact.email}`, '_blank')}
                className="group relative font-mono font-bold text-sm tracking-widest px-10 py-5 rounded-xl overflow-hidden text-[#F8FAFC]"
                data-cursor="hover"
                style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)' }}
              >
                <span className="relative z-10">{t.contact.cta}</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #7C10CC, #0077CC)' }}
                />
                {/* Pulse animation */}
                <div
                  className="absolute inset-0 rounded-xl animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />
              </motion.button>

              <div className="text-center sm:text-left">
                <div className="font-mono text-xs text-[#1E1B4B] tracking-widest mb-1">
                  {t.contact.or}
                </div>
                <a
                  href={`mailto:${t.contact.email}`}
                  className="font-mono text-sm text-cyan hover:text-[#0A0A1A] transition-colors duration-300 border-b border-cyan/30 hover:border-cyan pb-px"
                  data-cursor="hover"
                >
                  {t.contact.email}
                </a>
              </div>
            </motion.div>

            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Response', value: '< 24h' },
                { label: 'Eerste call', value: 'Gratis' },
                { label: 'NDA', value: 'Beschikbaar' },
                { label: 'Budget', value: 'Op maat' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card p-4"
                >
                  <div className="font-mono text-[10px] tracking-widest text-[#1E1B4B] mb-1">
                    {item.label}
                  </div>
                  <div className="font-mono text-sm font-bold text-cyan">
                    {item.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Blob */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[500px] hidden lg:block"
          >
            {!isMobile && !reduced ? (
              <BlobContact className="w-full h-full" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(0,119,204,0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                }}
              />
            )}

            {/* Label overlay */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            >
              <div className="font-mono text-xs tracking-[0.3em] text-[#1E1B4B]">
                {t.contact.label}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
