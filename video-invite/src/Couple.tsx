import React from 'react';
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { rand, seg } from './lib';

// spotlight-hero-card, adapted: a roving spotlight locks onto the couple, the camera swings to a
// left-side oblique, the couple lifts off the page (rise -> sin bob -> reseat), a beam runs twice
// around the outline, then it settles; marigold petals fall as it lands.
const PUSH_EASE = Easing.bezier(0.35, 0, 0.2, 1);
const POP_EASE = Easing.bezier(0.2, 1.25, 0.3, 1);
const RESEAT_EASE = Easing.bezier(0.4, 0, 0.3, 1.05);
const FIG = { l: 250, t: 780, w: 581, h: 1010 };
const CX = FIG.l + FIG.w / 2, CY = FIG.t + FIG.h / 2;
const C = (f: number, a: number[], b: number[], ease = Easing.linear) =>
  interpolate(f, a, b, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

export const Couple: React.FC = () => {
  const f = useCurrentFrame();
  const macroIn = C(f, [0, 8], [0, 1], Easing.bezier(0.3, 0, 0.2, 1));
  // camera
  const kf = [0, 32, 48, 148];
  const cam = (a: number, b: number) => C(f, kf, [a, a, b, b], PUSH_EASE);
  const zoom = cam(1, 1.42), cx = cam(540, CX - 36), cy = cam(960, CY - 90);
  const rx = cam(0, 6), ry = cam(0, 26), rz = cam(0, 1.5);
  // spotlight
  const se = Easing.bezier(0.4, 0, 0.3, 1);
  const sx = C(f, [4, 8, 16, 22, 28, 48], [25, 25, 70, 42, 50, 50], se);
  const sy = C(f, [4, 8, 16, 22, 28, 48], [30, 30, 45, 60, 69, 52], se);
  const spotOn = C(f, [2, 10], [0, 1]);
  const pool = C(f, [22, 32, 48], [620, 420, 360], Easing.bezier(0.4, 0, 0.3, 1)) * 0.56;
  const pulse = C(f, [32, 36, 41], [0, 0.06, 0]);
  const vig = C(f, [22, 32, 48], [0.12, 0.24, 0.32]) * (1 - seg(f, 112, 136));
  // couple lift
  const rise = C(f, [48, 58], [0, 1], POP_EASE);
  const reseat = C(f, [112, 130], [0, 1], RESEAT_EASE);
  const lift = rise * (1 - reseat);
  const z = 170 * lift + Math.sin(((f - 58) / 40) * Math.PI * 2) * 7 * lift;
  const press = C(f, [126, 129, 130], [1, 0.997, 1]);
  // beam
  const b1 = C(f, [60, 74], [0, 1]), b1on = f >= 59 && f <= 75;
  const b2 = C(f, [80, 100], [0, 1], Easing.bezier(0.4, 0, 0.4, 1)), b2on = f >= 79 && f <= 101;
  const trail = C(f, [100, 112], [0.35, 0]);
  const bw = FIG.w + 40, bh = FIG.h + 30;
  const AMBER = '#c58a2a', CORE = 'rgba(255,248,226,0.98)';

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#ead49c', opacity: macroIn }}>
      <div style={{ position: 'absolute', inset: 0, perspective: 2400 }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transformStyle: 'preserve-3d', transformOrigin: '0 0',
          transform: `translate(540px,960px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${zoom}) translate(${-cx}px,${-cy}px)`,
        }}>
          <Img src={staticFile('couple/back.png')} style={{ position: 'absolute', inset: 0, width: 1080, height: 1920 }} />
          {/* ground shadow: grows & softens while airborne */}
          <div style={{ position: 'absolute', left: CX - 230, top: FIG.t + FIG.h - 36, width: 460, height: 70, borderRadius: '50%',
            background: 'rgba(70,40,10,0.5)', filter: `blur(${22 + 26 * lift}px)`, opacity: 0.55 - 0.3 * lift, transform: `scale(${1 + 0.25 * lift})` }} />
          <div style={{ position: 'absolute', left: FIG.l, top: FIG.t, width: FIG.w, height: FIG.h, transformStyle: 'preserve-3d',
            transform: `translateZ(${z}px) scale(${press})` }}>
            <Img src={staticFile('couple/fig.png')} style={{ width: '100%', height: '100%', display: 'block',
              filter: `drop-shadow(0 ${34 * lift}px ${34 * lift}px rgba(60,30,5,${0.32 * lift}))` }} />
            {(b1on || b2on) && lift > 0.4 ? (
              <svg width={bw} height={bh} viewBox={`0 0 ${bw} ${bh}`} style={{ position: 'absolute', left: -20, top: -15, overflow: 'visible', opacity: b1on ? 1 : 0.62,
                filter: `drop-shadow(0 0 10px ${AMBER}) drop-shadow(0 0 28px rgba(255,240,210,0.55))` }}>
                <rect x={4} y={4} width={bw - 8} height={bh - 8} rx={46} fill="none" stroke={AMBER} strokeWidth={b1on ? 8 : 5.5} strokeLinecap="round" pathLength={1} strokeDasharray="0.14 1" strokeDashoffset={-(b1on ? b1 : b2)} />
                <rect x={4} y={4} width={bw - 8} height={bh - 8} rx={46} fill="none" stroke={CORE} strokeWidth={b1on ? 4 : 2.8} strokeLinecap="round" pathLength={1} strokeDasharray="0.14 1" strokeDashoffset={-(b1on ? b1 : b2)} />
              </svg>
            ) : null}
            {trail > 0.01 ? <div style={{ position: 'absolute', left: -20, top: -15, width: bw, height: bh, borderRadius: 50, border: `3px solid ${AMBER}`, opacity: trail }} /> : null}
          </div>
        </div>
      </div>
      {/* roving spotlight (screen space) */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: spotOn,
        background: `radial-gradient(ellipse ${pool * (1 + pulse)}px ${pool * 0.8 * (1 + pulse)}px at ${sx}% ${sy}%, rgba(255,240,205,0.16) 0%, rgba(0,0,0,0) 40%, rgba(35,16,4,${vig}) 100%)` }} />
      {/* marigold petals as it lands */}
      {Array.from({ length: 26 }, (_, i) => {
        const t0 = 106 + rand(i + 3) * 18;
        const t = seg(f, t0, t0 + 46);
        if (t <= 0 || t >= 1) return null;
        const x = 80 + rand(i) * 920 + Math.sin(t * 6 + i) * 40;
        const y = -80 + t * 2050;
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: y, width: 26, height: 44, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            background: i % 3 ? 'linear-gradient(#ffb11f,#f0690b)' : 'linear-gradient(#ff8fa3,#e0527a)',
            opacity: 0.95 * Math.min(1, t * 6) * (1 - seg(t, 0.8, 1)), transform: `rotate(${rand(i + 7) * 360 + t * 320}deg)` }} />
        );
      })}
    </div>
  );
};
