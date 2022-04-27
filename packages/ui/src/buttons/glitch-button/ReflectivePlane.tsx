import { Reflector, useTexture, ReflectorProps, useAspect } from "@react-three/drei";
import sample1 from "./SurfaceImperfections003_1K_var1.jpeg";
import sample2 from "./SurfaceImperfections003_1K_Normal.jpeg";

import { useRef } from "react";
import type { Mesh, PlaneBufferGeometry } from "three";
import { MeshReflectorMaterial } from "@react-three/drei/materials/MeshReflectorMaterial";
const W = 10;
const H = 10;
type TReflectivePlaneProps = ReflectorProps;
export const ReflectivePlane = (props: TReflectivePlaneProps) => {
  const ref = useRef<Mesh<PlaneBufferGeometry, MeshReflectorMaterial>>(null);
  const size = useAspect(W, H);

  const [floor, normal] = useTexture([sample1, sample2]);
  return (
    <>
      {/* {ref.current && (
        <mesh scale={size}>
          <lineSegments>
            <edgesGeometry
              attach="geometry"
              args={[(ref.current as Mesh<PlaneBufferGeometry, MeshReflectorMaterial>).geometry]}
            />
            <lineBasicMaterial color="#2130f0" attach="material" />
          </lineSegments>
        </mesh>
      )} */}
      <Reflector ref={ref} scale={size} resolution={1024} args={[8, 8]} {...props}>
        {(Material, props) => (
          <Material
            color="#f0f0f0"
            metalness={0}
            roughnessMap={floor}
            normalMap={normal}
            normalScale={[2, 2] as any}
            {...props}
          />
        )}
      </Reflector>
    </>
  );
};
