import Phenomenon from "phenomenon";
import { useEffect, useState, RefCallback } from "react";
import { Vector2, Vector4 } from "three";
import Renderer from "../../glitch-transform-glsl/phenomenon-types";
import vertex from "./vertex.glsl";

const DEFAULT_SETTINGS = {
  position: { x: 0, y: 0, z: 3 },
  clip: [0.001, 100],
  debug: true,
};

export type TUniform = {
  type: "float" | "vec2" | "vec4";
  //GLenum<'FLOAT_VEC2'>
  value: number | Vector2 | Vector4;
};
export type TUniforms = Record<string, TUniform>;

export type TGlInstanceConfig = {
  name: string;
  fragment: string;
  uniforms: TUniforms;
  settings?: Pick<Renderer, "position" | "clip">;
};

export const useGlInstance = ({
  name,
  fragment,
  uniforms,
  settings,
}: TGlInstanceConfig): RefCallback<HTMLCanvasElement | null> => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const ref = (instance: HTMLCanvasElement) => {
    if (!canvas && instance) {
      setCanvas(instance);
    }
  };

  useEffect(() => {
    if (canvas) {
      const far = (settings?.clip ? settings : DEFAULT_SETTINGS).clip[1];
      console.log(canvas);
      const glInstance = new Phenomenon({
        canvas,
        context: {
          Alpha: true,
        },
        contextType: "webgl2",
        settings: {
          // onSetup:(gl: WebGL2RenderingContext) => {
          //   gl.ALPHA = true
          // },
          devicePixelRatio,
          ...DEFAULT_SETTINGS,
          ...(settings ? { settings } : {}),
        },
      });

      glInstance.add(name, {
        vertex,
        fragment,
        mode: 4,
        uniforms,
        onRender: (r: Renderer) => {
          const { uTime } = r.uniforms;
          if (uTime.value < 1) {
            console.log(uniforms);
          }
          if (uTime) {
            uTime.value += 0.1;
          }
        },
        geometry: {
          vertices: [
            { x: -far, y: far, z: 0.0 },
            { x: -far, y: -far, z: 0.0 },
            { x: far, y: far, z: 0.0 },
            { x: far, y: -far, z: 0.0 },
            { x: -far, y: -far, z: 0.0 },
            { x: far, y: far, z: 0.0 },
          ],
        },
      });
    }
  }, [canvas, fragment, name, uniforms, settings]);

  return ref;
};
