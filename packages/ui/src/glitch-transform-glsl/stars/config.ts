import { TGlInstanceConfig, TUniforms } from "../../utils/web-gl/gl-instance";
import { uTime, uResolution } from "../../utils/web-gl/uniforms";
import fragment from "./fragment.glsl";

export const uniforms: TUniforms = {
  ...uTime(),
  ...uResolution(),
};

export const STARS_GL_INSTANCE_CONFIG: TGlInstanceConfig = { name: "stars", fragment, uniforms };
