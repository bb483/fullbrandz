# FULLBRANDZ Website

> "Niets is te moeilijk." — We build what others can't.

Full-stack marketing website for FULLBRANDZ — built with Next.js 14, React Three Fiber, GSAP, Framer Motion, and Lenis.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + custom CSS |
| 3D | React Three Fiber + @react-three/drei |
| Scroll | Lenis (smooth) + Framer Motion (scroll hooks) |
| Animations | Framer Motion + GSAP |
| Fonts | JetBrains Mono + Space Grotesk (Google Fonts) |

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, font imports
│   ├── page.tsx            # Main page — composes all sections
│   └── globals.css         # Design tokens, noise/scanlines, glow utilities
├── components/
│   ├── BootSequence.tsx    # Animated terminal boot screen
│   ├── Cursor.tsx          # Custom cursor (desktop only)
│   ├── Navigation.tsx      # Sticky nav, language toggle
│   ├── sections/
│   │   ├── Hero.tsx        # Full-screen hero with glitch headline + 3D shape
│   │   ├── WhatWeDo.tsx    # 3 service cards with 3D geometry per card
│   │   ├── ScrollJourney.tsx # Pinned 3D scroll scene (400vh)
│   │   ├── Process.tsx     # 4-step horizontal process
│   │   ├── Statement.tsx   # Bold "Niets is te moeilijk" reveal
│   │   └── Contact.tsx     # Magnetic CTA + interactive 3D blob
│   └── three/
│       ├── MorphingShape.tsx   # Hero wireframe icosahedron
│       ├── ServiceCard3D.tsx   # Cube / torus / neural mesh per service
│       ├── JourneyScene.tsx    # Camera journey through data → AI architecture
│       └── BlobContact.tsx     # Mouse-reactive blob in Contact section
├── contexts/
│   └── LanguageContext.tsx # NL/EN translations + toggle
└── hooks/
    ├── useLenis.ts         # Lenis smooth scroll initialisation
    ├── useReducedMotion.ts # prefers-reduced-motion media query
    └── useCursor.ts        # Smooth cursor tracking
```

---

## Features

- **Boot sequence** — Terminal-style loading animation before the site appears
- **Custom cursor** — Glowing dot + ring that reacts to hoverable elements
- **Glitch headline** — CSS-based glitch effect on hero text
- **3D Hero** — Rotating wireframe icosahedron that responds to scroll
- **Service cards** — Three individual Three.js canvases (cube / torus-rings / neural mesh)
- **Scroll Journey** — 400vh pinned section; Three.js camera travels through data points → AI architecture
- **Process steps** — SVG icons + staggered Framer Motion entrance
- **Statement reveal** — Character-by-character text with parallax orbs
- **Contact blob** — Mouse-magnetic Three.js blob + magnetic CTA button
- **Language toggle** — Full NL ↔ EN content switch
- **Reduced motion** — All animations respect `prefers-reduced-motion`
- **Mobile fallbacks** — Static gradients replace Three.js canvases on `< 768px`
- **Noise + scanlines** — Fixed overlays for terminal aesthetics

---

## Performance notes

- All Three.js components are `dynamic` imports with `ssr: false`
- Lazy loaded with `<Suspense>` boundaries
- DPR capped at 1.5× for Three.js canvases
- Mobile viewports skip Three.js entirely (static gradients)
- Lenis scroll is initialised after boot sequence completes

---

## Customisation

### Colors
Edit `tailwind.config.ts` → `theme.extend.colors` and `src/app/globals.css` CSS variables:
- `--cyan: #00F0FF`
- `--magenta: #FF00E5`
- `--bg: #0A0A0F`

### Copy / translations
All text lives in `src/contexts/LanguageContext.tsx` under `translations.nl` and `translations.en`.

### Email
Update `t.contact.email` in `LanguageContext.tsx` to your real address.

---

## Build for production

```bash
npm run build
npm start
```

---

## Requirements

- Node.js >= 18
- npm >= 9
