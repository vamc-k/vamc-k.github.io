import React from 'react';
import { Img, staticFile } from 'remotion';
import { pad, clamp } from './lib';
// Captured page footage. Fractional idx (slow-motion) cross-blends the two neighbouring frames.
export const Seq: React.FC<{ name: string; idx: number; max: number; style?: React.CSSProperties }> = ({ name, idx, max, style }) => {
  const i = clamp(idx, 0, max);
  const a = Math.floor(i), fr = i - a;
  const base: React.CSSProperties = { position: 'absolute', inset: 0, width: 1080, height: 1920, ...style };
  return (
    <>
      <Img src={staticFile(`seq/${name}/${pad(a)}.jpg`)} style={base} />
      {fr > 0.03 && a + 1 <= max ? <Img src={staticFile(`seq/${name}/${pad(a + 1)}.jpg`)} style={{ ...base, opacity: fr }} /> : null}
    </>
  );
};
