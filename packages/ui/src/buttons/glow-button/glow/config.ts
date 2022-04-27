import { uMouse, uResolution, uTime } from "../../../utils/web-gl/uniforms";
import { TGlInstanceConfig, TUniforms } from "../../../utils/web-gl/gl-instance";
import fragment from "./fragment.glsl";

export type TUniformsConfigInput = {
  mouse?: {
    y: number;
    x: number;
  };
} | null;
export const uniformsConfig = (config: TUniformsConfigInput): { uniforms: TUniforms } => ({
  uniforms: {
    ...uTime(),
    ...uResolution(),
    ...(config?.mouse ? uMouse(config.mouse) : {}),
  },
});

export type TInstanceConfigInput = {
  uniforms?: TUniformsConfigInput;
};
export const instanceConfig = ({ uniforms }: TInstanceConfigInput): TGlInstanceConfig => ({
  name: "stars",
  fragment,
  ...uniformsConfig(uniforms || null),
});
