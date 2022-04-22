export const W = 160;
export const H = 90;

export const WH = W * 0.5;
export const HH = H * 0.5;

export const WQ = WH * 0.5;
export const HQ = HH * 0.5;

export const PERSPECTIVE = 600;

export const X = 0;
export const Y = -10;
export const Z = -400;

export const CO = 4;

export const IO = -0.5;
export const IOD = IO * 2;

export const WHO = WH - IO;
export const HHO = HH - IO;

export const SW = W - IOD;
export const SH = H - IOD;
export const SD = H * 0.1 - IOD;

export const SWH = SW * 0.5;
export const SHH = SH * 0.5;
export const SDH = SD * 0.5;

export const SWQ = SWH * 0.5;
export const SHQ = SWH * 0.5;
export const SDQ = SDH * 0.5;

export const SWE = SWQ * 0.5;
export const SHE = SHQ * 0.5;
export const SDE = SDQ * 0.5;

export const SCO = 10;

const makeBoxShadow = (color: string[], n: number) =>
  [...Array(n)].map((_, i) => `0 0 ${++i}px ${color[~~(i * ((color.length - 1) / n))]}`).join(", ");

const RED = "#F44336";
const WHITE = "#FFF";
const WHITE_A = "rgba(255,255,255,02)";
const BLACK = "000";
export const TOP_BOX_SHADOW = makeBoxShadow([WHITE_A, RED, RED, RED], 4);

export const INNER_BOX_SHADOW = makeBoxShadow([WHITE_A, BLACK], 2);

export const FLARE = makeBoxShadow([WHITE, WHITE_A], 20);
