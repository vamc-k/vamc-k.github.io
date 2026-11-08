import React from 'react';
import { Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { DOORS, EVENTS_T, NAME_DRAW, SHOTS, TOTAL, WIPE } from './lib';

// Declarative pin table. Every `from` is RELATIVE to its shot, so retiming a shot moves its sounds with it.
type Pin = { from: number; src: string; volume: number; dur?: number; note: string };
const ev = SHOTS.events.from, cp = SHOTS.couple.from, fn = NAME_DRAW.to;
export const PINS: Pin[] = [
  { from: SHOTS.hero.from + 4,  src: 'light-aura', volume: 0.30, dur: 70, note: 'title blur-slide resolves' },
  { from: DOORS.from - 2,       src: 'swoosh-slow', volume: 0.32, dur: 46, note: 'barn-door opens' },
  { from: SHOTS.invite.from + 16, src: 'sparkle-touch', volume: 0.22, note: '"Invite" settles' },
  { from: SHOTS.invite.from + 88, src: 'sparkle-touch', volume: 0.28, note: 'names appear' },
  { from: ev - 6,               src: 'transition-soft', volume: 0.30, note: 'invite -> events dissolve' },
  { from: ev + EVENTS_T.enter[0] - 2, src: 'paper-slide', volume: 0.40, note: 'card 1 deals in (Haldi)' },
  { from: ev + EVENTS_T.enter[1] - 2, src: 'paper-move-quick', volume: 0.34, note: 'card 2 (Pellikoduku)' },
  { from: ev + EVENTS_T.enter[2] - 2, src: 'paper-slide', volume: 0.30, note: 'card 3 (Wedding)' },
  { from: ev + EVENTS_T.enter[3] - 2, src: 'paper-move-quick', volume: 0.26, note: 'card 4 (Vratam)' },
  { from: ev + EVENTS_T.fan[0] - 2, src: 'swoosh-quick', volume: 0.40, note: 'fan opens' },
  { from: ev + EVENTS_T.lift[0] + 2, src: 'sparkle-touch', volume: 0.38, note: 'Wedding card lifts' },
  { from: cp + 6,   src: 'light-sweep-magic', volume: 0.34, dur: 60, note: 'spotlight roams' },
  { from: cp + 44,  src: 'whoosh-big', volume: 0.42, dur: 50, note: 'camera swing + couple rises' },
  { from: cp + 60,  src: 'shimmer-sparkle-sweep', volume: 0.36, dur: 52, note: 'beam laps' },
  { from: cp + 106, src: 'stardust-swish', volume: 0.30, dur: 80, note: 'petals fall' },
  { from: cp + 128, src: 'transition-snap', volume: 0.30, note: 'reseat touchdown' },
  { from: WIPE.from - 2, src: 'swoosh-slow', volume: 0.36, dur: 48, note: 'clock-wipe to Join us' },
  { from: fn - 62,  src: 'riser-cine', volume: 0.30, dur: 60, note: 'names write on' },
  { from: fn,       src: 'impact-deep-whoosh', volume: 0.44, dur: 70, note: 'names complete (peak)' },
  { from: fn + 4,   src: 'sparkle', volume: 0.34, dur: 90, note: 'afterglow' },
];

export const Sfx: React.FC<{ bgm: boolean }> = ({ bgm }) => {
  const f = useCurrentFrame();
  return (
    <>
      {bgm && (
        <Audio src={staticFile('audio/bgm-bhoopali.mp3')}
          volume={interpolate(f, [0, 24, TOTAL - 45, TOTAL - 1], [0, 0.5, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      )}
      {PINS.map((p, i) => (
        <Sequence key={i} from={p.from} durationInFrames={p.dur ?? 90}>
          <Audio src={staticFile(`audio/sfx/${p.src}.mp3`)} volume={p.volume} />
        </Sequence>
      ))}
    </>
  );
};
