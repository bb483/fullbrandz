'use client';

import { useEffect } from 'react';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Cursor() {
  const { x, y, isHovering, isClicking } = useCursor();
  const reduced = useReducedMotion();

  // Verberg de native cursor enkel zolang deze custom cursor gemonteerd is.
  // Bij navigatie naar een pagina zonder <Cursor /> (bv. de kennisbank) wordt
  // de class opgeruimd en is de gewone muis weer zichtbaar.
  useEffect(() => {
    if (reduced) return;
    document.body.classList.add('custom-cursor-active');
    return () => document.body.classList.remove('custom-cursor-active');
  }, [reduced]);

  // Don't render on touch devices or if reduced motion
  if (reduced || typeof window === 'undefined') return null;

  // Simple check — hide on mobile via CSS
  const dotSize = isClicking ? 6 : 8;
  const ringSize = isHovering ? 50 : 32;
  const ringOpacity = isHovering ? 0.6 : 0.3;

  return (
    <>
      {/* Outer ring */}
      <div
        className="cursor-dot pointer-events-none hidden md:block"
        style={{
          left: x,
          top: y,
          width: ringSize,
          height: ringSize,
          border: `1px solid rgba(0,119,204,${ringOpacity})`,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          boxShadow: isHovering ? '0 0 15px rgba(0,119,204,0.4)' : 'none',
        }}
      />

      {/* Inner dot */}
      <div
        className="cursor-dot pointer-events-none hidden md:block"
        style={{
          left: x,
          top: y,
          width: dotSize,
          height: dotSize,
          backgroundColor: isHovering ? '#7C10CC' : '#0077CC',
          transition: 'width 0.1s ease, height 0.1s ease, background-color 0.2s ease',
          boxShadow: isHovering
            ? '0 0 10px rgba(124,16,204,0.8)'
            : '0 0 10px rgba(0,119,204,0.8)',
        }}
      />
    </>
  );
}
