'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.journey, href: '#journey' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(248,250,252,0.97)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,119,204,0.08)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono font-bold text-xl tracking-[0.2em] text-[#0A0A1A] hover:text-cyan transition-colors duration-300"
            style={{ textShadow: '0 0 20px rgba(0,119,204,0.3)' }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            FULL<span className="gradient-text">BRANDZ</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-mono text-xs tracking-widest text-[#1E1B4B] hover:text-cyan transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
              className="font-mono text-xs tracking-widest border border-gray-300 hover:border-cyan/50 px-3 py-1.5 rounded transition-all duration-300 text-[#1E1B4B] hover:text-cyan"
            >
              {language === 'nl' ? 'EN' : 'NL'}
            </button>

            {/* CTA */}
            <button
              onClick={() => scrollTo('#contact')}
              className="font-mono text-xs tracking-widest px-5 py-2.5 rounded relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #0077CC, #7C10CC)',
                color: '#0A0A0F',
                fontWeight: '700',
              }}
            >
              <span className="relative z-10">{t.nav.cta}</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #7C10CC, #0077CC)' }}
              />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="w-6 h-px bg-cyan transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none' }}
            />
            <span
              className="w-6 h-px bg-cyan transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="w-6 h-px bg-cyan transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 right-0 z-40 md:hidden"
            style={{
              background: 'rgba(248,250,252,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0,119,204,0.1)',
            }}
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="font-mono text-sm tracking-widest text-[#0A0A1A] hover:text-cyan transition-colors text-left"
                >
                  <span className="text-cyan mr-3">{'>'}</span>
                  {link.label}
                </motion.button>
              ))}

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
                  className="font-mono text-xs tracking-widest border border-gray-300 px-3 py-1.5 rounded text-[#1E1B4B]"
                >
                  {language === 'nl' ? 'EN' : 'NL'}
                </button>

                <button
                  onClick={() => scrollTo('#contact')}
                  className="font-mono text-xs tracking-widest px-5 py-2.5 rounded font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #0077CC, #7C10CC)',
                    color: '#0A0A0F',
                  }}
                >
                  {t.nav.cta}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
