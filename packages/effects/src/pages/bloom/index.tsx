import * as THREE from "three";
import { useRef, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { OrbitControls } from "../../libs/controls";
import { EffectComposer, Bloom as BloomPass } from "@react-three/postprocessing";
import { Blank } from "@3d-workshop/templates";
import { ReflectivePlane } from "./ReflectivePlane";
import { Video } from "./Video";
import { KernelSize } from "../../libs/utils";
import { W, H } from "./constants";
import { Rig } from "./Rig";

export const Bloom = () => {
  return (
    <Blank>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
        {/* <color attach="background" args={["green"]} /> */}
        <ambientLight />
        <OrbitControls />
        <Suspense fallback={null}>
          <Rig>
            <ReflectivePlane
              mirror={1}
              blur={[500, 100]}
              mixBlur={12}
              mixStrength={1.5}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              position-y={10}
            />
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
            <BloomPass
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
            {/* <BloomPass
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            /> */}
          </EffectComposer>
        </Suspense>
        {/* <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} /> */}
      </Canvas>
    </Blank>
  );
};
