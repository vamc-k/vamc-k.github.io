import React from 'react';
import { AbsoluteFill } from 'remotion';
import { E, seg } from './lib';
// barn-door-split: old page splits down the middle and slides apart, new page waits underneath.
export const Doors: React.FC<{ f: number; children: React.ReactNode }> = ({ f, children }) => {
  const t = seg(f, 0, 30, E.inOutCubic);
  if (t >= 1) return null;
  const shift = t * 54; // % of each half's width
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <AbsoluteFill style={{ clipPath: 'inset(0 50% 0 0)', transform: `translateX(${-shift}%)` }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ clipPath: 'inset(0 0 0 50%)', transform: `translateX(${shift}%)` }}>{children}</AbsoluteFill>
      {/* seam shadow */}
      <div style={{ position: 'absolute', left: 540 - 40 - shift * 5.4, width: 40, top: 0, bottom: 0, opacity: 0.35 * (1 - t), background: 'linear-gradient(90deg, transparent, rgba(20,30,70,.55))' }} />
      <div style={{ position: 'absolute', left: 540 + shift * 5.4, width: 40, top: 0, bottom: 0, opacity: 0.35 * (1 - t), background: 'linear-gradient(270deg, transparent, rgba(20,30,70,.55))' }} />
    </AbsoluteFill>
  );
};
