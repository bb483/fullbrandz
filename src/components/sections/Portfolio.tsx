'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const projects = [
  {
    name: 'Vrooem',
    url: 'https://vrooem.com',
    displayUrl: 'vrooem.com',
    description: 'Een wereldwijd autoverhuurplatform — gebouwd voor snelheid, schaal en een naadloze gebruikerservaring wereldwijd.',
    tags: ['Platform', 'Next.js', 'AI', 'Marketplace'],
    year: '2024',
    color: '#0077CC',
  },
  {
    name: 'GaragePoint',
    url: 'https://www.garagepoint.be',
    displayUrl: 'garagepoint.be',
    description: 'Een digitaal platform dat automobilisten verbindt met erkende garages in de buurt. Slim, snel en betrouwbaar.',
    tags: ['Platform', 'Automotive', 'Marketplace', 'België'],
    year: '2024',
    color: '#7C10CC',
  },
];

function ProjectCard({ project, index, isInView, visitLabel }: {
  project: typeof projects[0];
  index: number;
  isInView: boolean;
  visitLabel: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group glass-card overflow-hidden"
    >
      {/* Browser mockup preview */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '280px', background: '#0A0A1A' }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10" style={{ height: '42px' }}>
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <div
            className="ml-3 flex-1 max-w-[200px] rounded px-3 py-1 font-mono text-xs"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
          >
            {project.displayUrl}
          </div>
        </div>

        {/* Skeleton shimmer — shown until image loads */}
        {!loaded && (
          <div
            className="absolute left-0 right-0 bottom-0"
            style={{ top: '42px', background: 'linear-gradient(110deg, #1a1a2e 30%, #2a2a4e 50%, #1a1a2e 70%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }}
          >
            <div className="p-4 flex flex-col gap-3 mt-4">
              <div className="h-3 rounded" style={{ background: 'rgba(255,255,255,0.06)', width: '60%' }} />
              <div className="h-3 rounded" style={{ background: 'rgba(255,255,255,0.04)', width: '80%' }} />
              <div className="h-3 rounded" style={{ background: 'rgba(255,255,255,0.04)', width: '45%' }} />
            </div>
          </div>
        )}

        {/* Screenshot */}
        <img
          src={`https://api.microlink.io?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=light`}
          alt={project.name}
          onLoad={() => setLoaded(true)}
          style={{
            position: 'absolute',
            top: '42px',
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: 'calc(100% - 42px)',
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ top: '42px', background: 'linear-gradient(to bottom, transparent 60%, rgba(10,10,26,0.5) 100%)' }}
        />

        {/* Year badge */}
        <div
          className="absolute top-14 right-4 font-mono text-xs px-2 py-1 rounded"
          style={{ background: 'rgba(0,119,204,0.3)', color: '#0077CC', border: '1px solid rgba(0,119,204,0.3)' }}
        >
          {project.year}
        </div>
      </div>

      {/* Project info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-mono font-black text-2xl text-[#0A0A1A]">
            {project.name}
          </h3>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest px-4 py-2 rounded transition-all duration-300 flex items-center gap-2 shrink-0"
            style={{ background: 'linear-gradient(135deg, #0077CC, #7C10CC)', color: '#F8FAFC' }}
          >
            {visitLabel} →
          </a>
        </div>

        <p className="font-sans text-[#1E1B4B] text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, j) => (
            <span
              key={j}
              className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded"
              style={{ background: 'rgba(0,119,204,0.08)', color: '#0077CC', border: '1px solid rgba(0,119,204,0.15)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative section-padding"
      style={{ background: '#F8FAFC' }}
    >
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs tracking-[0.4em] text-cyan mb-4 opacity-70">
            {t.portfolio.tag}
          </div>
          <h2 className="font-mono font-black text-4xl sm:text-5xl lg:text-6xl text-[#0A0A1A] mb-4">
            {t.portfolio.title}
          </h2>
          <p className="font-sans text-[#1E1B4B] text-base max-w-md">
            {t.portfolio.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              isInView={isInView}
              visitLabel={t.portfolio.visitLabel}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
