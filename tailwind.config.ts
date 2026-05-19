import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F8FAFC',
        cyan: '#0077CC',
        magenta: '#7C10CC',
        'surface-1': '#FFFFFF',
        'surface-2': '#F1F5F9',
        'text-dim': '#1E1B4B',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'glitch-1': 'glitch1 3s infinite',
        'glitch-2': 'glitch2 3s infinite',
        'scanline': 'scanline 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'boot-cursor': 'bootCursor 0.8s step-start infinite',
      },
      keyframes: {
        glitch1: {
          '0%, 90%, 100%': { transform: 'translate(0)', opacity: '1' },
          '92%': { transform: 'translate(-3px, 1px)', opacity: '0.8' },
          '94%': { transform: 'translate(3px, -1px)', opacity: '0.9' },
          '96%': { transform: 'translate(-1px, 2px)', opacity: '0.7' },
          '98%': { transform: 'translate(2px, -2px)', opacity: '1' },
        },
        glitch2: {
          '0%, 90%, 100%': { clipPath: 'inset(0)', transform: 'translate(0)' },
          '91%': { clipPath: 'inset(30% 0 40% 0)', transform: 'translate(4px)' },
          '93%': { clipPath: 'inset(60% 0 10% 0)', transform: 'translate(-4px)' },
          '95%': { clipPath: 'inset(10% 0 70% 0)', transform: 'translate(2px)' },
          '97%': { clipPath: 'inset(50% 0 20% 0)', transform: 'translate(-2px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,240,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,240,255,0.7), 0 0 80px rgba(0,240,255,0.3)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        bootCursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cyber': 'linear-gradient(135deg, #00F0FF, #FF00E5)',
        'grid-pattern': `linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
};

export default config;
