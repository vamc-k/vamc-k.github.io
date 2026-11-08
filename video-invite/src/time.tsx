import React, { createContext, useContext } from 'react';
// One clock for the whole piece, in "normal-speed" frames (30 fps @ 1.0x).
// Slowing the video = scaling this clock, so every analytic animation stays smooth.
const Ctx = createContext(0);
export const useF = () => useContext(Ctx);
export const Clock: React.FC<{ f: number; children: React.ReactNode }> = ({ f, children }) => <Ctx.Provider value={f}>{children}</Ctx.Provider>;
export const At: React.FC<{ from: number; children: React.ReactNode }> = ({ from, children }) => {
  const g = useF();
  return <Ctx.Provider value={g - from}>{children}</Ctx.Provider>;
};
