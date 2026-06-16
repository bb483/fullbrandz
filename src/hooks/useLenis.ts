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

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      (window as unknown as Record<string, unknown>).__lenis = lenis;

      // Store cancel fn for cleanup
      (lenisRef as unknown as Record<string, unknown>).__cancelRaf = () => cancelAnimationFrame(rafId);
    }

    init();

    return () => {
      const cancel = (lenisRef as unknown as Record<string, unknown>).__cancelRaf;
      if (typeof cancel === 'function') cancel();
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
