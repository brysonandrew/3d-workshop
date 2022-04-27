import { GodRays } from "@react-three/postprocessing";
import { KernelSize } from "../../libs/utils";
import { Resolution, BlendFunction } from "postprocessing";
import type { Mesh } from "three";

type TProps = { sunRef: Mesh | null };
export const GodRaysPass: (props: TProps) => JSX.Element | null = ({ sunRef }) =>
  sunRef ? (
    <GodRays
      sun={sunRef}
      blendFunction={BlendFunction.SCREEN} // The blend function of this effect.
      samples={60} // The number of samples per pixel.
      density={0.96} // The density of the light rays.
      decay={0.9} // An illumination decay factor.
      weight={0.4} // A light ray weight factor.
      exposure={0.6} // A constant attenuation coefficient.
      clampMax={1} // An upper bound for the saturation of the overall effect.
      width={Resolution["AUTO_SIZE"]} // Render width.
      height={Resolution["AUTO_SIZE"]} // Render height.
      kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
      blur={1} // Whether the god rays should be blurred to reduce artifacts.
    />
  ) : null;
