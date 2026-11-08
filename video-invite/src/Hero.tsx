import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { Seq } from './Seq';
import { E, seg, lerp } from './lib';

// blur-slide: y 40->0 + blur 10->0 + opacity on one outCubic per line, staggered; subtitle follows early.
const PARTS = [
  { k: 'h1a', x: 14.78, y: 321.72, w: 510.44, h: 70.88, at: 6 },
  { k: 'weds', x: 250.8, y: 396.9, w: 38.4, h: 11, at: 16 },
  { k: 'h1b', x: 109.75, y: 412.22, w: 320.5, h: 70.88, at: 20 },
  { k: 'sub', x: 153.23, y: 526.28, w: 233.5, h: 18, at: 34 },
];
export const Hero: React.FC = () => {
  const f = useCurrentFrame();
  const out = seg(f, 80, 106, E.inOutCubic);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Seq name="hero" idx={f} max={149} />
      {PARTS.map((p) => {
        const t = seg(f, p.at, p.at + 26, E.outCubic);
        return (
          <Img key={p.k} src={staticFile(`title/${p.k}.png`)} style={{
            position: 'absolute', left: p.x * 2, top: p.y * 2, width: p.w * 2, height: p.h * 2,
            opacity: t * (1 - out), filter: `blur(${(1 - t) * 10}px)`,
            transform: `translateY(${lerp(t, 40, 0) - out * 300}px)`,
          }} />
        );
      })}
    </div>
  );
};
