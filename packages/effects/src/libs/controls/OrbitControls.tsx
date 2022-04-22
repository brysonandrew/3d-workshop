import { forwardRef, useEffect, useMemo } from "react";
import { EventManager, ReactThreeFiber, useFrame, useThree } from "@react-three/fiber";
import type { Camera } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type OrbitControlsProps = Omit<
  ReactThreeFiber.Overwrite<
    ReactThreeFiber.Object3DNode<OrbitControlsImpl, typeof OrbitControlsImpl>,
    {
      camera?: Camera;
      domElement?: HTMLElement;
      enableDamping?: boolean;
      makeDefault?: boolean;
      onChange?: (e?: Event) => void;
      onEnd?: (e?: Event) => void;
      onStart?: (e?: Event) => void;
      regress?: boolean;
      target?: ReactThreeFiber.Vector3;
    }
  >,
  "ref"
>;

export const OrbitControls = forwardRef<OrbitControlsImpl, OrbitControlsProps>(
  (
    {
      makeDefault,
      camera,
      regress,
      domElement,
      enableDamping = true,
      onChange,
      onStart,
      onEnd,
      ...restProps
    },
    ref
  ) => {
    const invalidate = useThree(({ invalidate }) => invalidate);
    const defaultCamera = useThree(({ camera }) => camera);
    const gl = useThree(({ gl }) => gl);
    const events = useThree(({ events }) => events) as EventManager<HTMLElement>;
    const set = useThree(({ set }) => set);
    const get = useThree(({ get }) => get);
    const performance = useThree(({ performance }) => performance);
    const explCamera = camera || defaultCamera;
    const explDomElement =
      domElement || (typeof events.connected !== "boolean" ? events.connected : gl.domElement);
    const controls: OrbitControlsImpl = useMemo(() => new OrbitControlsImpl(explCamera), [explCamera]);

    useFrame(() => {
      if (controls.enabled) controls.update();
    });

    useEffect(() => {
      const callback = (e: Event):void => {
        invalidate();
        if (regress) performance.regress();
        if (onChange) onChange(e);
      };

      if (explDomElement) {
        controls.connect(explDomElement);
      }

      (controls as OrbitControlsImpl).addEventListener("change", callback as any);

      if (onStart) (controls as OrbitControlsImpl).addEventListener("start", onStart as any);
      if (onEnd) (controls as OrbitControlsImpl).addEventListener("end", onEnd as any);

      return () => {
        (controls as OrbitControlsImpl).removeEventListener("change", callback as any);
        if (onStart) (controls as OrbitControlsImpl).removeEventListener("start", onStart as any);
        if (onEnd) (controls as OrbitControlsImpl).removeEventListener("end", onEnd as any);
        controls.dispose();
      };
    }, [explDomElement, onChange, onStart, onEnd, regress, controls, invalidate, performance]);

    useEffect(() => {
      let old: any = null
      if (makeDefault) {
        old = get().controls;
        set({ controls });
      }
      return () => {
        if (old) {
          set({ controls: old })
        }
      };
    }, [makeDefault, controls]);

    return <primitive ref={ref} object={controls} enableDamping={enableDamping} {...restProps} />;
  }
);
