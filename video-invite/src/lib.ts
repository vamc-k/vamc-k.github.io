// Motion primitives (from the shotcraft demo fixtures: E / seg / lerp / rand)
export const E = {
  linear: (t: number) => t,
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  outBack: (t: number, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
  spring: (t: number, bounce = 0.25) => {
    const w = 8 + 8 * (1 - bounce);
    return 1 - Math.exp(-6 * t) * Math.cos(w * t * bounce * 2.2);
  },
};
export const lerp = (t: number, a: number, b: number) => a + (b - a) * t;
export const seg = (f: number, f0: number, f1: number, ease: (x: number) => number = E.linear) =>
  ease(Math.min(1, Math.max(0, (f - f0) / (f1 - f0))));
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
export const pad = (n: number) => String(n).padStart(4, '0');
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

// ---- global timeline (30 fps, 900 f = 30 s). Single source of truth. ----
export const SHOTS = {
  hero:   { from: 0,   dur: 150 },
  invite: { from: 120, dur: 149 },   // barn-door opens 120-150
  events: { from: 255, dur: 250 },
  couple: { from: 491, dur: 149 },
  temple: { from: 626, dur: 122 },   // clock-wipe 706-748
  rsvp:   { from: 706, dur: 86 },
  finale: { from: 778, dur: 122 },
};
export const TOTAL = 900;
export const WIPE = { from: 706, to: 748 };
export const DOORS = { from: 120, to: 150 };
export const NAME_DRAW = { from: 794, to: 846 };
export const EVENTS_T = { enter: [8, 60, 112, 164], enterLen: 30, fan: [198, 228], lift: [224, 240] };

// ---- standalone scene clips (normal-speed frames on the master clock). Ranges overlap in the master
// because the master crossfades between them; as separate clips each one fades in/out on its own.
export const SCENES = [
  { id: '01-opening',    title: 'Opening: temple frame + names', start: 0,   end: 140 },
  { id: '02-invite',     title: 'Invite: "We cordially invite you"', start: 120, end: 262 },
  { id: '03-events',     title: 'Events: four ceremonies (card stack)', start: 255, end: 502 },
  { id: '04-couple',     title: 'Couple: spotlight + petals', start: 491, end: 640 },
  { id: '05-venue-join', title: 'Venue to Join us (clock-wipe)', start: 626, end: 790 },
  { id: '06-finale',     title: 'Finale: names + date', start: 778, end: 900 },
] as const;
