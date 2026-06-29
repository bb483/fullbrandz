'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'nl' | 'en';

interface Translations {
  nav: {
    services: string;
    journey: string;
    process: string;
    portfolio: string;
    kennisbank: string;
    contact: string;
    cta: string;
  };
  boot: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    ready: string;
  };
  hero: {
    tag: string;
    headline1: string;
    headline2: string;
    sub: string;
    cta1: string;
    cta2: string;
    scroll: string;
  };
  services: {
    tag: string;
    title: string;
    sub: string;
    items: Array<{
      number: string;
      title: string;
      desc: string;
      tags: string[];
    }>;
  };
  journey: {
    tag: string;
    title: string;
    sub: string;
    steps: Array<{ label: string; desc: string }>;
  };
  process: {
    tag: string;
    title: string;
    steps: Array<{ number: string; title: string; desc: string }>;
  };
  statement: {
    tag: string;
    line1: string;
    line2: string;
    line3: string;
    sub: string;
  };
  portfolio: {
    tag: string;
    title: string;
    sub: string;
    visitLabel: string;
  };
  contact: {
    tag: string;
    title: string;
    sub: string;
    cta: string;
    email: string;
    or: string;
    label: string;
  };
}

const translations: Record<Language, Translations> = {
  nl: {
    nav: {
      services: 'Diensten',
      journey: 'Journey',
      process: 'Proces',
      portfolio: 'Portfolio',
      kennisbank: 'Kennisbank',
      contact: 'Contact',
      cta: 'Start Project',
    },
    boot: {
      line1: '> FULLBRANDZ SYSTEEM INITIALISATIE...',
      line2: '> Modules laden: [PLATFORM] [SYSTEMEN] [AI]',
      line3: '> Verbinding tot stand gebracht.',
      line4: '> Beveiligingsprotocol actief.',
      line5: '> Interface gereed.',
      ready: 'KLAAR OM TE BOUWEN.',
    },
    hero: {
      tag: '// EST. 2024 — DIGITALE ARCHITECTEN',
      headline1: 'WE BOUWEN',
      headline2: 'ALLES.',
      sub: 'Digitale platformen. Intelligente systemen. AI automatisering. Wij maken het werkelijkheid — hoe complex ook.',
      cta1: 'Start je project',
      cta2: 'Bekijk ons werk',
      scroll: 'SCROLL OM TE ONTDEKKEN',
    },
    services: {
      tag: '// WAT WE DOEN',
      title: 'Drie pijlers. Één visie.',
      sub: 'We ontwerpen en bouwen de digitale infrastructuur van morgen. Van concept tot deployment — wij zijn uw technologische partner.',
      items: [
        {
          number: '01',
          title: 'Platformen',
          desc: 'Schaalbare web- en mobiele platformen die groeien met uw bedrijf. Van MVP tot enterprise-grade architectuur — wij bouwen voor de toekomst.',
          tags: ['Next.js', 'React', 'Node.js', 'Cloud'],
        },
        {
          number: '02',
          title: 'Systemen',
          desc: 'Complexe backend-systemen, API-integraties en data-infrastructuur. Wij verbinden alles naadloos — van database tot dashboard.',
          tags: ['APIs', 'Microservices', 'DevOps', 'Database'],
        },
        {
          number: '03',
          title: 'AI Automatisering',
          desc: 'Intelligente workflows, LLM-integraties en machine learning pipelines. Laat AI het zware werk doen — wij programmeren de intelligentie.',
          tags: ['LLM', 'Automation', 'ML', 'Agents'],
        },
      ],
    },
    journey: {
      tag: '// DE REIS',
      title: 'Van data naar intelligentie.',
      sub: 'Elke grote oplossing begint als ruwe data. Wij bouwen de weg van punt A naar het onmogelijke.',
      steps: [
        { label: 'Ruwe data', desc: 'Ongestructureerde informatie, verspreide systemen' },
        { label: 'Verbinding', desc: 'Architectuur die alles samensmelt' },
        { label: 'Intelligentie', desc: 'AI die leert, optimaliseert, voorspelt' },
        { label: 'Schaal', desc: 'Systemen die meegroeien met uw ambitie' },
      ],
    },
    process: {
      tag: '// HOE WE WERKEN',
      title: 'Ons proces.',
      steps: [
        {
          number: '01',
          title: 'Discover',
          desc: 'We duiken diep in uw domein. Doelen, beperkingen, kansen. Niets ontgaat ons.',
        },
        {
          number: '02',
          title: 'Design',
          desc: 'Architectuur en UX die samenwerken. Elke beslissing is doordacht en onderbouwd.',
        },
        {
          number: '03',
          title: 'Build',
          desc: 'Code schrijven met chirurgische precisie. Geen shortcuts, geen technische schuld.',
        },
        {
          number: '04',
          title: 'Scale',
          desc: 'Lanceren, meten, verbeteren. Uw systeem groeit mee met uw succes.',
        },
      ],
    },
    statement: {
      tag: '// ONZE BELOFTE',
      line1: 'NIETS',
      line2: 'IS TE',
      line3: 'MOEILIJK.',
      sub: 'Wij nemen de projecten aan die anderen weigeren. Complexiteit is ons speelterrein.',
    },
    portfolio: {
      tag: '// ONS WERK',
      title: 'Projecten die spreken.',
      sub: 'Elk project is een bewijs dat niets te moeilijk is.',
      visitLabel: 'Bezoek website',
    },
    contact: {
      tag: '// KLAAR OM TE BOUWEN?',
      title: 'Laat ons praten.',
      sub: 'Vertel ons over uw project. Hoe complexer, hoe enthousiaster wij worden.',
      cta: 'Start het gesprek',
      email: 'info@fullbrandz.com',
      or: 'of mail ons direct',
      label: 'FULLBRANDZ — Niets is te moeilijk.',
    },
  },
  en: {
    nav: {
      services: 'Services',
      journey: 'Journey',
      process: 'Process',
      portfolio: 'Portfolio',
      kennisbank: 'Knowledge base',
      contact: 'Contact',
      cta: 'Start Project',
    },
    boot: {
      line1: '> FULLBRANDZ SYSTEM INITIALIZATION...',
      line2: '> Loading modules: [PLATFORMS] [SYSTEMS] [AI]',
      line3: '> Connection established.',
      line4: '> Security protocol active.',
      line5: '> Interface ready.',
      ready: 'READY TO BUILD.',
    },
    hero: {
      tag: '// EST. 2024 — DIGITAL ARCHITECTS',
      headline1: 'WE BUILD',
      headline2: 'EVERYTHING.',
      sub: 'Digital platforms. Intelligent systems. AI automation. We make it real — no matter how complex.',
      cta1: 'Start your project',
      cta2: 'See our work',
      scroll: 'SCROLL TO DISCOVER',
    },
    services: {
      tag: '// WHAT WE DO',
      title: 'Three pillars. One vision.',
      sub: 'We design and build the digital infrastructure of tomorrow. From concept to deployment — we are your technology partner.',
      items: [
        {
          number: '01',
          title: 'Platforms',
          desc: 'Scalable web and mobile platforms that grow with your business. From MVP to enterprise-grade architecture — we build for the future.',
          tags: ['Next.js', 'React', 'Node.js', 'Cloud'],
        },
        {
          number: '02',
          title: 'Systems',
          desc: 'Complex backend systems, API integrations and data infrastructure. We connect everything seamlessly — from database to dashboard.',
          tags: ['APIs', 'Microservices', 'DevOps', 'Database'],
        },
        {
          number: '03',
          title: 'AI Automation',
          desc: 'Intelligent workflows, LLM integrations and machine learning pipelines. Let AI do the heavy lifting — we program the intelligence.',
          tags: ['LLM', 'Automation', 'ML', 'Agents'],
        },
      ],
    },
    journey: {
      tag: '// THE JOURNEY',
      title: 'From data to intelligence.',
      sub: 'Every great solution starts as raw data. We build the path from point A to the impossible.',
      steps: [
        { label: 'Raw data', desc: 'Unstructured information, scattered systems' },
        { label: 'Connection', desc: 'Architecture that merges everything' },
        { label: 'Intelligence', desc: 'AI that learns, optimizes, predicts' },
        { label: 'Scale', desc: 'Systems that grow with your ambition' },
      ],
    },
    process: {
      tag: '// HOW WE WORK',
      title: 'Our process.',
      steps: [
        {
          number: '01',
          title: 'Discover',
          desc: 'We dive deep into your domain. Goals, constraints, opportunities. Nothing escapes us.',
        },
        {
          number: '02',
          title: 'Design',
          desc: 'Architecture and UX working in harmony. Every decision is deliberate and justified.',
        },
        {
          number: '03',
          title: 'Build',
          desc: 'Writing code with surgical precision. No shortcuts, no technical debt.',
        },
        {
          number: '04',
          title: 'Scale',
          desc: 'Launch, measure, improve. Your system grows with your success.',
        },
      ],
    },
    statement: {
      tag: '// OUR PROMISE',
      line1: 'NOTHING',
      line2: 'IS TOO',
      line3: 'HARD.',
      sub: 'We take on the projects others refuse. Complexity is our playground.',
    },
    portfolio: {
      tag: '// OUR WORK',
      title: 'Projects that speak.',
      sub: 'Every project is proof that nothing is too hard.',
      visitLabel: 'Visit website',
    },
    contact: {
      tag: '// READY TO BUILD?',
      title: "Let's talk.",
      sub: 'Tell us about your project. The more complex, the more excited we get.',
      cta: 'Start the conversation',
      email: 'info@fullbrandz.com',
      or: 'or email us directly',
      label: 'FULLBRANDZ — Nothing is too hard.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('nl');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
