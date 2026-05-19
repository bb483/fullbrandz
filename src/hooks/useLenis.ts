'use client';

import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let lenis: Lenis;

    async function init() {
      const LenisModule = await import('lenis');
      const LenisClass = LenisModule.default;

      lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Expose lenis globally for GSAP ScrollTrigger integration
      (window as unknown as Record<string, unknown>).__lenis = lenis;
    }

    init();

    return () => {
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
