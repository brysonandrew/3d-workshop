import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import { useRef, useLayoutEffect } from "react";
import { transition } from "./settings";
import { Camera as TPerspectiveCamera, Canvas, extend, useThree } from "@react-three/fiber";
import { useSmoothTransform } from "./use-smooth-transition";
import {
  ConeGeometry,
  SphereGeometry,
  IcosahedronGeometry,
  TorusGeometry,
  MeshPhongMaterial,
  Mesh,
} from "three";
import {
  ChromaticAberration,
  EffectComposer,
  GodRays,
  Noise,
  ShockWave,
  Vignette,
} from "@react-three/postprocessing";
import { Glitch, Bloom, Pixelation, Scanline } from "@react-three/postprocessing";
import { GlitchMode, KernelSize, BlendFunction, Resolution } from "postprocessing";
import { ReflectivePlane } from "./ReflectivePlane";
const S = ShockWave as any;

extend({ ConeGeometry, SphereGeometry, IcosahedronGeometry, TorusGeometry, MeshPhongMaterial });
const Group = motion.group as any;
export const Shapes: ({
  isHover,
  isPress,
  mouseX,
  mouseY,
}: {
  isHover: any;
  isPress: any;
  mouseX: any;
  mouseY: any;
}) => JSX.Element = ({ isHover, isPress, mouseX, mouseY }): JSX.Element => {
  const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);
  const ref = useRef<Mesh>(null);
  return (
    <Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
      <Camera mouseX={mouseX} mouseY={mouseY} />
      <MotionConfig transition={transition}>
        <Group center={[0, 0, 0]} rotation={[lightRotateX, lightRotateY, 0]}>
          <Lights />
        </Group>
        <Group
          initial={false}
          animate={isHover ? "hover" : "rest"}
          dispose={null}
          variants={{
            hover: { z: isPress ? -0.9 : 0 },
          }}
        >
          <Sphere sphereRef={ref} />
          <Cone />
          <Torus />
          <Icosahedron />
          <EffectComposer multisampling={12}>
            {/* <Scanline
              blendFunction={BlendFunction.OVERLAY} // blend mode
              density={1.25}
            />
            <S
              blendFunction={BlendFunction.NORMAL} // blend mode
              opacity={0.5}
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL} // blend mode
              offset={[0.02, 0.002] as any} // color offset
            /> */}
            {/* {ref.current ? (
              <GodRays
                sun={ref.current}
                blendFunction={BlendFunction.SCREEN} // The blend function of this effect.
                samples={60} // The number of samples per pixel.
                density={0.96} // The density of the light rays.
                decay={0.9} // An illumination decay factor.
                weight={0.4} // A light ray weight factor.
                exposure={0.6} // A constant attenuation coefficient.
                clampMax={1} // An upper bound for the saturation of the overall effect.
                width={Resolution.AUTO_SIZE} // Render width.
                height={Resolution.AUTO_SIZE} // Render height.
                kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
                blur={1} // Whether the god rays should be blurred to reduce artifacts.
              />
            ) : (
            )} */}
              <Pixelation granularity={8} />

            <Vignette
              offset={0.5} // vignette offset
              darkness={0.5} // vignette darkness
              eskil={false} // Eskil's vignette technique
              blendFunction={BlendFunction.NORMAL} // blend mode
            />
            <Glitch
              delay={[1.5, 3.5] as any} // min and max glitch delay
              duration={[0.6, 1.0] as any} // min and max glitch duration
              strength={[0.3, 1.0] as any} // min and max glitch strength
              mode={GlitchMode.CONSTANT_MILD} // glitch mode
              active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
              ratio={0.5} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
            />
            <Noise
              premultiply // enables or disables noise premultiplication
              blendFunction={BlendFunction.ADD} // blend mode
            />
            <Bloom
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
            {/* <GodRaysPass sunRef={sunRef as Mesh} /> */}
          </EffectComposer>
          {/* <ReflectivePlane
            mirror={1}
            blur={[100, 100]}
            mixBlur={12}
            mixStrength={1.5}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            position-y={-40}
            position-x={0}
            position-z={-20}
          /> */}
        </Group>
      </MotionConfig>
    </Canvas>
  );
};

export function Lights() {
  return (
    <>
      <spotLight color="#61dafb" position={[-10, -10, -10]} intensity={0.2} />
      <spotLight color="#61dafb" position={[-10, 0, 15]} intensity={0.8} />
      <spotLight color="#61dafb" position={[-5, 20, 2]} intensity={0.5} />
      <spotLight color="#f2056f" position={[15, 10, -2]} intensity={2} />
      <spotLight color="#f2056f" position={[15, 10, 5]} intensity={1} />
      <spotLight color="#b107db" position={[5, -10, 5]} intensity={0.8} />
    </>
  );
}

export function Sphere(ref: any) {
  return (
    <motion.mesh ref={ref} position={[-0.5, -0.5, 0]} variants={{ hover: { z: 2 } }}>
      <sphereGeometry args={[0.4]} />
      <Material />
    </motion.mesh>
  );
}

export function Cone() {
  return (
    <motion.mesh
      position={[-0.8, 0.4, 0]}
      rotation={[-0.5, 0, -0.3]}
      variants={{
        hover: {
          z: 1.1,
          x: -1.5,
          rotateX: -0.2,
          rotateZ: 0.4,
        },
      }}
    >
      <coneGeometry args={[0.3, 0.6, 20]} />
      <Material />
    </motion.mesh>
  );
}

export function Torus() {
  return (
    <motion.mesh
      position={[0.1, 0.4, 0]}
      rotation={[-0.5, 0.5, 0]}
      variants={{
        hover: {
          y: 0.5,
          z: 2,
          rotateY: -0.2,
        },
      }}
    >
      <torusGeometry args={[0.2, 0.1, 10, 50]} />
      <Material />
    </motion.mesh>
  );
}

export function Icosahedron() {
  return (
    <motion.mesh
      position={[1.1, 0, 0]}
      rotation-z={0.5}
      variants={{
        hover: {
          x: 1.8,
          z: 0.6,
          y: 0.6,
          rotateZ: -0.5,
        },
      }}
    >
      <icosahedronGeometry args={[0.7, 0]} />
      <Material />
    </motion.mesh>
  );
}

export function Material() {
  return <meshPhongMaterial color="#fff" specular="#61dafb" shininess={10} />;
}

// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
const Camera: ({
  mouseX,
  mouseY,
  ...props
}: {
  [x: string]: any;
  mouseX: any;
  mouseY: any;
}) => JSX.Element = ({ mouseX, mouseY, ...props }): JSX.Element => {
  const cameraX = useSmoothTransform(mouseX, spring, (x: any) => x / 350);
  const cameraY = useSmoothTransform(mouseY, spring, (y: any) => (-1 * y) / 350);

  const set = useThree(({ set }) => set);
  const camera = useThree(({ camera }) => camera);
  const size = useThree(({ size }) => size);
  const scene = useThree(({ scene }) => scene);
  const cameraRef = useRef<TPerspectiveCamera>(null) as any;

  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  }, [size, props]);

  useLayoutEffect(() => {
    const oldCam = camera;
    if (cameraRef.current) {
      set(() => ({ camera: (cameraRef.current ? cameraRef.current : null) as any }));
    }
    return () => set(() => ({ camera: oldCam }));
  }, [camera, cameraRef, set]);

  useLayoutEffect(() => {
    return cameraX.onChange(() => camera.lookAt(scene.position));
  }, [cameraX, scene.position]);

  return <motion.perspectiveCamera ref={cameraRef} fov={90} position={[cameraX, cameraY, 3.8]} />;
};

const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v: number) => (-1 * v) / 140;
