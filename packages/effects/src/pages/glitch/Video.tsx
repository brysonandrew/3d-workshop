import { useAspect } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";
import "index.d";
import src from "./v.mp4";
import { W, H } from "./constants";

export const Video = () => {
  const size = useAspect(W, H);
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src,
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );
  useEffect(() => void video.play(), [video]);
  return (
    <mesh scale={size}>
      <planeBufferGeometry />
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  );
};
