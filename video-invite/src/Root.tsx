import React from 'react';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { At, Clock, useF } from './time';
import { Hero } from './Hero';
import { Doors } from './Doors';
import { Events } from './Events';
import { Couple } from './Couple';
import { Finale } from './Finale';
import { Seq } from './Seq';
import { Sfx } from './Sfx';
import { DOORS, E, SCENES, SHOTS, TOTAL, WIPE, seg } from './lib';

const CX = 540, CY = 960, R = 2300, SEGS = 96;
const polar = (deg: number, r: number): [number, number] => { const a = (deg * Math.PI) / 180; return [CX + r * Math.sin(a), CY - r * Math.cos(a)]; };
const fanClip = (theta: number) => {
  const pts = [`${CX}px ${CY}px`];
  for (let i = 0; i <= SEGS; i++) { const [x, y] = polar((theta * i) / SEGS, R); pts.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`); }
  return `polygon(${pts.join(', ')})`;
};
const dissolve = (f: number, a: number, b: number) => seg(f, a, b, E.inOutCubic);

type Props = { bgm: boolean; speed: number };
const Scene: React.FC<{ only?: string }> = ({ only }) => {
  const f = useF();
  const solo = !!only;
  const show = (id: string) => !only || only === id;
  const S = SHOTS;
  // clock-wipe: venue -> "Join us". Linear sweep (radar feel); mask is removed once complete.
  const theta = seg(f, WIPE.from, WIPE.to) * 360;
  const wiping = f >= WIPE.from && f < WIPE.to;
  const wipeDone = f >= WIPE.to;
  const [lx, ly] = polar(theta, R);
  const inviteOp = solo ? 1 : 1 - dissolve(f, 255, 269);
  const eventsOp = solo ? 1 : dissolve(f, 255, 269) * (1 - dissolve(f, 491, 505));
  const coupleOp = solo ? 1 : dissolve(f, 491, 505) * (1 - dissolve(f, 626, 640));
  const finaleOp = solo ? 1 : dissolve(f, 778, 792);
  const sc = SCENES.find((x) => x.id === only);
  const clipFade = sc ? Math.min(seg(f, sc.start, sc.start + 8), 1 - seg(f, sc.end - 8, sc.end)) : 1;
  return (
    <AbsoluteFill style={{ background: '#fbf2d6', overflow: 'hidden' }}>
      {/* 1-2: hero -> invite (barn-door) */}
      {show('02-invite') && f < 270 && (
        <AbsoluteFill style={{ opacity: inviteOp }}>
          <At from={S.invite.from}>
            <Seq name="invite" idx={(f - S.invite.from) * 1.15} max={149} style={{ transform: `scale(${1 + (solo ? 0 : 0.035 * seg(f, 255, 269))})` }} />
          </At>
        </AbsoluteFill>
      )}
      {show('01-opening') && (solo || f < 120) && <Hero />}
      {!solo && f >= 120 && f < 150 && <Doors f={f - DOORS.from}><Hero /></Doors>}
      {/* 3 events */}
      {show('03-events') && f >= 255 && f < 506 && <AbsoluteFill style={{ opacity: eventsOp }}><At from={S.events.from}><Events /></At></AbsoluteFill>}
      {/* 4 couple */}
      {show('04-couple') && f >= 491 && f < 641 && <AbsoluteFill style={{ opacity: coupleOp }}><At from={S.couple.from}><Couple /></At></AbsoluteFill>}
      {/* 5 temple -> join us */}
      {show('05-venue-join') && f >= 626 && f < 800 && (
        <AbsoluteFill style={{ opacity: solo ? 1 : f < 640 ? dissolve(f, 626, 640) : 1 - dissolve(f, 778, 792) }}>
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
      {show('06-finale') && f >= 778 && <AbsoluteFill style={{ opacity: finaleOp }}><At from={S.finale.from}><Finale /></At></AbsoluteFill>}
      {solo && <AbsoluteFill style={{ background: '#fbf2d6', opacity: 1 - clipFade, pointerEvents: 'none' }} />}
    </AbsoluteFill>
  );
};

const Invitation: React.FC<Props> = ({ bgm, speed }) => {
  const real = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Clock f={real * speed}><Scene /></Clock>
      <Sfx bgm={bgm} speed={speed} />
    </AbsoluteFill>
  );
};

const SceneClip: React.FC<{ id: string; speed: number }> = ({ id, speed }) => {
  const real = useCurrentFrame();
  const sc = SCENES.find((x) => x.id === id)!;
  return (
    <AbsoluteFill>
      <Clock f={sc.start + real * speed}><Scene only={id} /></Clock>
      <Sfx bgm={false} speed={speed} win={[sc.start, sc.end]} />
    </AbsoluteFill>
  );
};

const CLIPS = Object.fromEntries(SCENES.map((sc) => [sc.id, (p: { speed: number }) => <SceneClip id={sc.id} speed={p.speed} />]));

export const Root: React.FC = () => (
  <>
  <Composition id="Invitation" component={Invitation} durationInFrames={TOTAL} fps={30} width={1080} height={1920}
    defaultProps={{ bgm: true, speed: 0.66 }}
    calculateMetadata={({ props }) => ({ durationInFrames: Math.round(TOTAL / props.speed) })} />
  {SCENES.map((sc) => (
    <Composition key={sc.id} id={`Scene-${sc.id}`} component={CLIPS[sc.id]} durationInFrames={sc.end - sc.start} fps={30} width={1080} height={1920}
      defaultProps={{ speed: 0.66 }}
      calculateMetadata={({ props }: any) => ({ durationInFrames: Math.round((sc.end - sc.start) / props.speed) })} />
  ))}
  </>
);
