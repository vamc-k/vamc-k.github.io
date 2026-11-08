import React from 'react';
import { Img, staticFile } from 'remotion';
import { pad, clamp } from './lib';
export const Seq: React.FC<{ name: string; idx: number; max: number; style?: React.CSSProperties }> = ({ name, idx, max, style }) => (
  <Img src={staticFile(`seq/${name}/${pad(clamp(Math.round(idx), 0, max))}.jpg`)}
    style={{ position: 'absolute', inset: 0, width: 1080, height: 1920, ...style }} />
);
