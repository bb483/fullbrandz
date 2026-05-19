'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  onComplete: () => void;
}

interface BootLine {
  text: string;
  delay: number;
  color?: string;
}

export default function BootSequence({ onComplete }: Props) {
  const { t } = useLanguage();
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showReady, setShowReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const lines: BootLine[] = [
    { text: t.boot.line1, delay: 150 },
    { text: '> ████████████████████ 100%', delay: 300 },
    { text: t.boot.line2, delay: 450 },
    { text: t.boot.line3, delay: 600 },
    { text: t.boot.line4, delay: 750 },
    { text: t.boot.line5, delay: 900 },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line.text]);
          setProgress(Math.round(((i + 1) / lines.length) * 100));
        }, line.delay)
      );
    });

    timers.push(
      setTimeout(() => {
        setShowReady(true);
      }, 1100)
    );

    timers.push(
      setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 400);
      }, 1700)
    );

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#F8FAFC',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-cyan opacity-60" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-cyan opacity-60" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-cyan opacity-60" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-cyan opacity-60" />

      {/* Logo */}
      <div className="mb-12 text-center">
        <div
          className="font-mono text-3xl sm:text-4xl font-bold tracking-[0.3em] text-[#0A0A1A] mb-2"
          style={{
            textShadow: '0 0 30px rgba(0,119,204,0.6), 0 0 60px rgba(0,119,204,0.3)',
          }}
        >
          FULLBRANDZ
        </div>
        <div className="font-mono text-xs tracking-[0.5em] text-cyan opacity-70">
          DIGITAL ARCHITECTS
        </div>
      </div>

      {/* Terminal window */}
      <div
        className="w-full max-w-xl mx-4 rounded-lg overflow-hidden"
        style={{
          background: 'rgba(248,250,252,0.97)',
          border: '1px solid rgba(0,119,204,0.2)',
          boxShadow: '0 0 40px rgba(0,119,204,0.1)',
        }}
      >
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-2 font-mono text-xs text-[#1E1B4B] tracking-widest">
            FULLBRANDZ — SYSTEM BOOT
          </span>
        </div>

        {/* Terminal content */}
        <div className="p-6 min-h-[180px]">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className="font-mono text-sm mb-1"
              style={{
                color: line.includes('████') ? '#0077CC' : '#1E1B4B',
                animation: 'fadeInUp 0.3s ease forwards',
              }}
            >
              {line}
            </div>
          ))}

          {/* Blinking cursor on last line */}
          {!showReady && (
            <div className="font-mono text-sm text-cyan boot-cursor" />
          )}

          {/* Ready message */}
          {showReady && (
            <div
              className="font-mono text-lg font-bold mt-4 gradient-text"
              style={{ animation: 'fadeIn 0.4s ease forwards' }}
            >
              {t.boot.ready}
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xl mx-4 mt-4 h-1 bg-gray-50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #0077CC, #7C10CC)',
            transition: 'width 0.3s ease',
            boxShadow: '0 0 10px rgba(0,119,204,0.6)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
