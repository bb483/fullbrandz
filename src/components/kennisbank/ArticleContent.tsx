// Server component die de gestructureerde artikel-blokken rendert.
// Ondersteunt eenvoudige inline **vet**-opmaak zonder externe dependency.
import { Fragment } from 'react';
import type { Block } from '@/content/kennisbank';

function renderInline(text: string) {
  // Split op **vet** en render <strong> voor de oneven segmenten.
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[#0A0A1A]">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function ArticleContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="kb-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                className="font-mono font-black text-2xl sm:text-3xl text-[#0A0A1A] mt-14 mb-5 leading-tight scroll-mt-28"
              >
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={i}
                className="font-mono font-bold text-lg sm:text-xl text-[#1E1B4B] mt-9 mb-3"
              >
                {block.text}
              </h3>
            );
          case 'p':
            return (
              <p
                key={i}
                className="font-sans text-[#1E1B4B] text-base sm:text-lg leading-relaxed mb-5"
              >
                {renderInline(block.text)}
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="mb-6 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 font-sans text-[#1E1B4B] text-base sm:text-lg leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="mb-6 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 font-sans text-[#1E1B4B] text-base sm:text-lg leading-relaxed">
                    <span
                      className="shrink-0 font-mono text-sm font-bold text-cyan w-7 h-7 rounded-md flex items-center justify-center"
                      style={{ background: 'rgba(0,119,204,0.08)', border: '1px solid rgba(0,119,204,0.18)' }}
                      aria-hidden="true"
                    >
                      {j + 1}
                    </span>
                    <span className="pt-0.5">{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="my-9 pl-6 border-l-2 border-cyan font-sans italic text-xl sm:text-2xl text-[#0A0A1A] leading-snug"
              >
                {block.text}
              </blockquote>
            );
          case 'callout':
            return (
              <div key={i} className="glass-card my-8 p-6">
                <div className="font-mono text-xs tracking-[0.2em] text-cyan mb-2 uppercase">
                  {block.title}
                </div>
                <p className="font-sans text-[#1E1B4B] text-base leading-relaxed">
                  {renderInline(block.text)}
                </p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
