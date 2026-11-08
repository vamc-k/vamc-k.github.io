import React from 'react';
import { Seq } from './Seq';
import { useF } from './time';
import { cin, out, pin } from './fonts';
import { E, seg, lerp } from './lib';

// Opening: the page's own temple screen (maroon edges, gold-framed couple photo, towers rising),
// names set in the page's gold Cinzel under the photo with the blur-slide reveal.
const gold: React.CSSProperties = {
  background: 'linear-gradient(180deg,#d9a940 0%,#a8741e 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
};
const LINES: { at: number; y: number; node: React.ReactNode }[] = [
  { at: 50, y: 815, node: <div style={{ ...gold, fontFamily: cin, fontSize: 88, letterSpacing: '0.05em', lineHeight: 1 }}>VAMSI KRISHNA</div> },
  { at: 60, y: 912, node: <div style={{ fontFamily: pin, fontSize: 70, color: '#8f1a2b', lineHeight: 1 }}>weds</div> },
  { at: 66, y: 1010, node: <div style={{ ...gold, fontFamily: cin, fontSize: 88, letterSpacing: '0.05em', lineHeight: 1 }}>MOUNIKA</div> },
  { at: 84, y: 1150, node: <div style={{ fontFamily: out, fontSize: 27, letterSpacing: '0.36em', color: '#7d1526', lineHeight: 1, paddingLeft: '0.36em' }}>ARE GETTING MARRIED</div> },
];
export const Hero: React.FC = () => {
  const f = useF();
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Seq name="opening" idx={f * 1.4} max={99} />
      {LINES.map((l, i) => {
        const t = seg(f, l.at, l.at + 26, E.outCubic);
        return (
          <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: l.y, display: 'flex', justifyContent: 'center',
            opacity: t, filter: `blur(${(1 - t) * 10}px)`, transform: `translateY(${lerp(t, 40, 0)}px)` }}>{l.node}</div>
        );
      })}
    </div>
  );
};
