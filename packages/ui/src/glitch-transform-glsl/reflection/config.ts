import { uTime, uResolution } from "../../utils/web-gl/uniforms";
import { TGlInstanceConfig, TUniforms } from "../../utils/web-gl/gl-instance";
import fragment from "./fragment.glsl";

export const uniforms: TUniforms = {
  ...uTime(),
  ...uResolution(),
};

export const REFLECTION_GL_INSTANCE_CONFIG: TGlInstanceConfig = {
  name: "reflection",
  fragment,
  uniforms,
};
