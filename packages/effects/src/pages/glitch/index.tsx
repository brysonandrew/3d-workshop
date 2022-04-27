import * as THREE from "three";
import { useRef, Suspense, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { OrbitControls } from "../../libs/controls";
import { EffectComposer, Bloom as BloomPass } from "@react-three/postprocessing";
import { Blank } from "@3d-workshop/templates";
import { ReflectivePlane } from "./ReflectivePlane";
import { Video } from "./Video";
import { KernelSize } from "../../libs/utils";
import { W, H } from "./constants";
import { Rig } from "./Rig";
import { Glitch as GlitchPass } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { GodRaysPass } from "../godrays";
import { Sparkles } from "@react-three/drei";

export const Glitch = () => {
  const [sunRef, setSunRef] = useState<Mesh>();
  return (
    <Blank>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
        {/* <color attach="background" args={["green"]} /> */}
        <ambientLight />
        <OrbitControls />
        <Suspense fallback={null}>
          <Rig>
            <mesh
              ref={(instance) => {
                if (instance && !sunRef) {
                  setSunRef(instance);
                }
              }}
            >
              <boxGeometry />
              <lineBasicMaterial />
            </mesh>
            <ReflectivePlane
              mirror={1}
              blur={[500, 100]}
              mixBlur={12}
              mixStrength={1.5}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              position-y={10}
            />
    <Sparkles count={100} scale={10 * 2} size={6} speed={0.4} />
            <Video />
            <ReflectivePlane
              mirror={1}
              blur={[500, 100]}
              mixBlur={12}
              mixStrength={1.5}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              position-y={-10}
            />
          </Rig>
          <EffectComposer multisampling={8}>
            <GlitchPass
              delay={[1.5, 3.5] as any} // min and max glitch delay
              duration={[0.6, 1.0] as any} // min and max glitch duration
              strength={[0.3, 1.0] as any} // min and max glitch strength
              mode={GlitchMode.SPORADIC} // glitch mode
              active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
              ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
            />
            <BloomPass
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
               <GodRaysPass sunRef={sunRef as Mesh} />

          </EffectComposer>
        </Suspense>
        {/* <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} /> */}
      </Canvas>
    </Blank>
  );
};
