import { useState, useRef, useMemo } from "react";
import {
  useFrame,
  useLoader, MeshProps
} from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { Group } from "three";
import svg from "./triangle.svg";

// import { Blank } from "@3d-workshop/templates";
// import { OrbitControls } from "@3d-workshop/controls";
type TTriangleProps = { color: string; } & MeshProps;
export const Triangle = ({ color, ...props }: TTriangleProps) => {
  const ref = useRef<Group>(null);
  const [r] = useState(() => Math.random() * 10000);
  useFrame((f) => {
    if (ref.current) {
      ref.current.position.y = -1.75 + Math.sin(f.clock.elapsedTime + r) / 10;
    }
  });
  const {
    paths: [path],
  } = useLoader(SVGLoader, svg);
  const geom = useMemo(
    () => path?.userData &&
      SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData["style"]),
    [path?.userData, path?.subPaths]
  );
  return (
    <group ref={ref}>
      <mesh geometry={geom} {...props}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
};
