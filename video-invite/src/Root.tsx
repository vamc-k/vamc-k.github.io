import React from 'react';
import { AbsoluteFill, Composition, Sequence, useCurrentFrame } from 'remotion';
import { Hero } from './Hero';
import { Doors } from './Doors';
import { Events } from './Events';
import { Couple } from './Couple';
import { Finale } from './Finale';
import { Seq } from './Seq';
import { Sfx } from './Sfx';
import { DOORS, E, SHOTS, TOTAL, WIPE, seg } from './lib';

const CX = 540, CY = 960, R = 2300, SEGS = 96;
const polar = (deg: number, r: number): [number, number] => { const a = (deg * Math.PI) / 180; return [CX + r * Math.sin(a), CY - r * Math.cos(a)]; };
const fanClip = (theta: number) => {
  const pts = [`${CX}px ${CY}px`];
  for (let i = 0; i <= SEGS; i++) { const [x, y] = polar((theta * i) / SEGS, R); pts.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`); }
  return `polygon(${pts.join(', ')})`;
};
const dissolve = (f: number, a: number, b: number) => seg(f, a, b, E.inOutCubic);

const Invitation: React.FC<{ bgm?: boolean }> = ({ bgm = true }) => {
  const f = useCurrentFrame();
  const S = SHOTS;
  // clock-wipe: venue -> "Join us". Linear sweep (radar feel); mask is removed once complete.
  const theta = seg(f, WIPE.from, WIPE.to) * 360;
  const wiping = f >= WIPE.from && f < WIPE.to;
  const wipeDone = f >= WIPE.to;
  const [lx, ly] = polar(theta, R);
  const inviteOp = 1 - dissolve(f, 255, 269);
  const eventsOp = dissolve(f, 255, 269) * (1 - dissolve(f, 491, 505));
  const coupleOp = dissolve(f, 491, 505) * (1 - dissolve(f, 626, 640));
  const finaleOp = dissolve(f, 778, 792);
  return (
    <AbsoluteFill style={{ background: '#fbf2d6', overflow: 'hidden' }}>
      {/* 1-2: hero -> invite (barn-door) */}
      {f < 270 && (
        <AbsoluteFill style={{ opacity: inviteOp }}>
          <Sequence from={S.invite.from} durationInFrames={S.invite.dur} layout="none">
            <Seq name="invite" idx={(f - S.invite.from) * 1.15} max={149} style={{ transform: `scale(${1 + 0.035 * seg(f, 255, 269)})` }} />
          </Sequence>
        </AbsoluteFill>
      )}
      {f < 120 && <Hero />}
      {f >= 120 && f < 150 && <Doors f={f - DOORS.from}><Hero /></Doors>}
      {/* 3 events */}
      {f >= 255 && f < 506 && <AbsoluteFill style={{ opacity: eventsOp }}><Sequence from={S.events.from} layout="none"><Events /></Sequence></AbsoluteFill>}
      {/* 4 couple */}
      {f >= 491 && f < 641 && <AbsoluteFill style={{ opacity: coupleOp }}><Sequence from={S.couple.from} layout="none"><Couple /></Sequence></AbsoluteFill>}
      {/* 5 temple -> join us */}
      {f >= 626 && f < 800 && (
        <AbsoluteFill style={{ opacity: f < 640 ? dissolve(f, 626, 640) : 1 - dissolve(f, 778, 792) }}>
          <Seq name="temple" idx={f - 626} max={79} />
          {f >= WIPE.from && (
            <AbsoluteFill style={wipeDone ? undefined : { clipPath: fanClip(theta) }}>
              <Seq name="rsvp" idx={f - WIPE.from} max={119} />
            </AbsoluteFill>
          )}
          {wiping && (
            <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <line x1={CX} y1={CY} x2={lx} y2={ly} stroke="rgba(255,225,150,0.40)" strokeWidth={34} strokeLinecap="round" />
              <line x1={CX} y1={CY} x2={lx} y2={ly} stroke="rgba(255,235,170,0.7)" strokeWidth={16} strokeLinecap="round" />
              <line x1={CX} y1={CY} x2={lx} y2={ly} stroke="rgba(120,60,10,0.45)" strokeWidth={10} strokeLinecap="round" />
              <line x1={CX} y1={CY} x2={lx} y2={ly} stroke="rgba(255,252,236,0.98)" strokeWidth={5} strokeLinecap="round" />
            </svg>
          )}
        </AbsoluteFill>
      )}
      {/* 6 finale */}
      {f >= 778 && <AbsoluteFill style={{ opacity: finaleOp }}><Sequence from={S.finale.from} layout="none"><Finale /></Sequence></AbsoluteFill>}
      <Sfx bgm={bgm} />
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <Composition id="Invitation" component={Invitation} durationInFrames={TOTAL} fps={30} width={1080} height={1920} defaultProps={{ bgm: true }} />
);
