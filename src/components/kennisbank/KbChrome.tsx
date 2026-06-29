// Lichte, server-gerenderde header en footer voor de kennisbankpagina's.
// Bewust losgekoppeld van de client-side homepage-navigatie (die op
// scroll-anchors werkt) zodat deze pagina's volledig SSR/SSG blijven.
import Link from 'next/link';
import { SITE } from '@/lib/site';

export function KbHeader() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(248,250,252,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,119,204,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono font-bold text-xl tracking-[0.2em] text-[#0A0A1A] hover:text-cyan transition-colors duration-300"
        >
          FULL<span className="gradient-text">BRANDZ</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/kennisbank"
            className="font-mono text-xs tracking-widest text-[#1E1B4B] hover:text-cyan transition-colors duration-300"
          >
            KENNISBANK
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-xs tracking-widest px-5 py-2.5 rounded relative overflow-hidden font-bold text-[#F8FAFC]"
            style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)' }}
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function KbFooter() {
  return (
    <footer className="border-t border-gray-100 py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-[#1E1B4B] tracking-widest">
          © 2026 {SITE.name} — ALLE RECHTEN VOORBEHOUDEN
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/kennisbank"
            className="font-mono text-xs text-[#1E1B4B] tracking-widest hover:text-cyan transition-colors"
          >
            KENNISBANK
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="font-mono text-xs text-cyan tracking-widest hover:text-[#0A0A1A] transition-colors"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
