import { Vector2, Vector4 } from "three";
import { TUniforms } from "./gl-instance";

export const uTime = (): TUniforms => ({
  uTime: {
    type: "float",
    value: 0.0,
  },
});

export const uResolution = (): TUniforms => ({
  uResolution: {
    type: "vec2",
    value: new Vector2(window.innerWidth, window.innerHeight),
  },
});

type TUMouseConfig = {
  x: number;
  y: number;
};
export const uMouse = ({ x, y }: TUMouseConfig): TUniforms => ({
  uResolution: {
    type: "vec4",
    value: new Vector4(x, y, x, y),
  },
});
