type TRigProps = { children: JSX.Element[]; };
export const Rig = ({ children }: TRigProps) => {
  // const ref = useRef<Group>(null);
  // const vec = new THREE.Vector3();
  // const { camera, mouse } = useThree();
  // useFrame(() => {
  //   camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05);
  //   if (ref.current) {
  //     ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
  //     ref.current.rotation.y = THREE.MathUtils.lerp(
  //       ref.current.rotation.y,
  //       (-mouse.x * Math.PI) / 20,
  //       0.1
  //     );
  //   }
  // });
  return (
    <group
    >
      {children}
    </group>
  );
};
