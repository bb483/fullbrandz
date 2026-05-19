'use client';

import { useEffect, useRef, useState } from 'react';

export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    isHovering: false,
    isClicking: false,
  });

  const rawPos = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setCursor((prev) => ({ ...prev, isClicking: true }));
    const onUp = () => setCursor((prev) => ({ ...prev, isClicking: false }));

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        setCursor((prev) => ({ ...prev, isHovering: true }));
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        setCursor((prev) => ({ ...prev, isHovering: false }));
      }
    };

    // Smooth animation loop
    function animLoop() {
      setCursor((prev) => {
        const dx = rawPos.current.x - prev.x;
        const dy = rawPos.current.y - prev.y;
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          return { ...prev, x: prev.x + dx * 0.15, y: prev.y + dy * 0.15 };
        }
        return prev;
      });
      animFrameRef.current = requestAnimationFrame(animLoop);
    }

    animFrameRef.current = requestAnimationFrame(animLoop);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return cursor;
}
