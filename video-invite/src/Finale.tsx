import React from 'react';
import { interpolate, } from 'remotion';
import { useF } from './time';
import { cin, out, pin } from './fonts';
import { Seq } from './Seq';
import { NAME_DRAW, SHOTS } from './lib';

// letterspace-materialize: every letter shares ONE progress -> same start frame, same finish frame,
// continuous stroke growth (pathLength 1 -> 0 dashoffset), easeInOut, big letter-spacing, then a held lockup.
const G: Record<string, string> = {
  V: 'M 7 5 L 39 59 L 71 5',
  A: 'M 7 59 L 39 5 L 71 59 M 17 41 L 61 41',
  M: 'M 8 59 L 8 6 L 39 38 L 70 6 L 70 59',
  S: 'M 62 13 C 51 4, 18 3, 15 15 C 12 26, 29 29, 39 31 C 50 33, 66 37, 63 48 C 60 59, 21 61, 11 50',
  I: 'M 39 5 L 39 59 M 25 5 L 53 5 M 25 59 L 53 59',
  K: 'M 12 5 L 12 59 M 66 5 L 12 34 M 28 24 L 66 59',
  R: 'M 12 59 L 12 5 L 44 5 C 64 5, 64 31, 44 31 L 12 31 M 42 31 L 64 59',
  H: 'M 12 5 L 12 59 M 66 5 L 66 59 M 12 31 L 66 31',
  N: 'M 12 59 L 12 5 L 66 59 L 66 5',
  O: 'M 39 5 C 62 5, 70 18, 70 32 C 70 46, 62 59, 39 59 C 16 59, 8 46, 8 32 C 8 18, 16 5, 39 5',
  U: 'M 12 5 L 12 40 C 12 59, 66 59, 66 40 L 66 5',
};
const S_ = 0.78, GAP = 16, PITCH = 78 * S_ + GAP, WORDGAP = 34;
const LINES = [{ txt: ['VAMSI', 'KRISHNA'], y: 250 }, { txt: ['MOUNIKA'], y: 520 }];
const INK = '#8f1a2b';

export const Finale: React.FC = () => {
  const f = useF() + SHOTS.finale.from;
  const START = NAME_DRAW.from, DUR = NAME_DRAW.to - NAME_DRAW.from;
  const p = interpolate(f, [START, START + DUR], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const doneGlow = interpolate(f, [NAME_DRAW.to, NAME_DRAW.to + 8], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glow = p >= 1 ? doneGlow : p > 0.7 ? (p - 0.7) / 0.3 : 0;
  const amp = interpolate(f, [NAME_DRAW.to - 14, NAME_DRAW.to + 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const date = interpolate(f, [NAME_DRAW.to + 6, NAME_DRAW.to + 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Seq name="finale" idx={f - 770} max={134} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 110, height: 740, background: 'linear-gradient(180deg, rgba(253,246,226,0) 0%, rgba(253,246,226,0.92) 14%, rgba(253,246,226,0.92) 84%, rgba(253,246,226,0) 100%)', opacity: Math.min(1, p * 4) }} />
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        {LINES.map((ln, li) => {
          const words = ln.txt;
          const total = words.reduce((a, w) => a + w.length * PITCH - GAP, 0) + (words.length - 1) * WORDGAP;
          let x = (1080 - total) / 2;
          return words.map((w, wi) => {
            const startX = x; x += w.length * PITCH - GAP + WORDGAP;
            return w.split('').map((ch, ci) => p > 0 && (
              <g key={`${li}${wi}${ci}`} transform={`translate(${startX + ci * PITCH} ${ln.y}) scale(${S_})`}>
                <path d={G[ch]} fill="none" stroke={INK} strokeWidth={7.5} strokeLinecap="round" strokeLinejoin="round"
                  pathLength={1} strokeDasharray={1} strokeDashoffset={1 - e}
                  style={{ filter: `drop-shadow(0 0 ${5 + glow * 9}px rgba(255,222,140,${0.35 + glow * 0.45}))` }} />
              </g>
            ));
          });
        })}
      </svg>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center', fontFamily: pin, fontSize: 120, color: '#8f1a2b', opacity: amp, transform: `scale(${0.9 + 0.1 * amp})`, textShadow: '0 2px 10px rgba(255,244,205,.7)' }}>&amp;</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 650, textAlign: 'center', opacity: date, transform: `translateY(${(1 - date) * 14}px)` }}>
        <div style={{ fontFamily: cin, fontSize: 46, letterSpacing: '0.22em', color: '#7d1526', textShadow: '0 1px 8px rgba(255,244,205,.8)' }}>21 NOVEMBER 2026</div>
        <div style={{ fontFamily: out, fontSize: 26, letterSpacing: '0.28em', color: '#6b4a1e', marginTop: 20, textShadow: '0 1px 6px rgba(255,244,205,.8)' }}>WITH LOVE &amp; BLESSINGS</div>
      </div>
    </div>
  );
};
