import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { E, seg, lerp, EVENTS_T } from './lib';

// card-stack: each real event card springs up from below (stagger long enough to read it),
// the pile settles, then one fan-open (origin below the card = held in a hand); Wedding lifts last.
const CARD = { x: 136.33 * 2, y: 342.7 * 2, w: 535.66, h: 968.47 };
const PILE_ROT = [-4.5, 3.5, -3, 2];
const N = 4;
export const Events: React.FC = () => {
  const f = useCurrentFrame();
  const fan = seg(f, EVENTS_T.fan[0], EVENTS_T.fan[1], E.inOutCubic);
  const lift = seg(f, EVENTS_T.lift[0], EVENTS_T.lift[1], E.outCubic);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Img src={staticFile('events/back.png')} style={{ position: 'absolute', inset: 0, width: 1080, height: 1920 }} />
      <div style={{ position: 'absolute', inset: 0, perspective: 2400 }}>
        {Array.from({ length: N }, (_, i) => {
          const a = EVENTS_T.enter[i];
          const inT = seg(f, a, a + EVENTS_T.enterLen);
          const y = lerp(E.spring(inT, 0.3), 1500, 0);
          const k = i - (N - 1) / 2;
          const rot = PILE_ROT[i] * (1 - fan) + k * 6.5 * fan + (1 - Math.min(1, inT * 1.2)) * 7;
          const tx = k * 54 * fan;
          const tz = -20 * Math.abs(k) * fan;
          const isWed = i === 2;
          const L = isWed ? lift : 0;
          return (
            <div key={i} style={{
              position: 'absolute', left: CARD.x, top: CARD.y, width: CARD.w, height: CARD.h,
              transformOrigin: '50% 130%',
              transform: `translate3d(${tx}px, ${y - 70 * L}px, ${tz + 80 * L}px) rotate(${rot}deg) scale(${1 + 0.04 * L})`,
              opacity: Math.min(1, inT * 4),
              zIndex: isWed && lift > 0 ? 50 : fan > 0 ? 20 - Math.abs(k * 2) : i,
              borderRadius: 30, overflow: 'hidden',
              boxShadow: `0 ${24 + 20 * L}px ${60 + 30 * L}px rgba(70,35,10,${0.32 + 0.1 * L}), 0 0 0 3px rgba(200,150,58,${0.55 + 0.4 * L}), 0 0 ${60 * L}px rgba(232,195,106,${0.7 * L})`,
              filter: `brightness(${1 - 0.1 * fan * (1 - L)})`,
            }}>
              <Img src={staticFile(`events/card${i}.png`)} style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
