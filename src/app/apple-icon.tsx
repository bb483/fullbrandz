import { ImageResponse } from 'next/og';

// Apple touch-icon in de brandstijl (FULLBRANDZ).
export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0077CC, #7C10CC)',
          color: '#FFFFFF',
          fontSize: 120,
          fontWeight: 800,
          fontFamily: 'monospace',
          letterSpacing: -4,
        }}
      >
        F
      </div>
    ),
    { ...size }
  );
}
