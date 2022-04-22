import {
  motion,
  useAnimationFrame,
  useCycle,
} from "framer-motion";
import styled from "styled-components";
import { Kino } from "./Kino";
import { Blank } from "@3d-workshop/templates";
import { PERSPECTIVE, W, H, X, Y, Z } from "./constants";
import { useRef } from "react";

const Root = styled(motion.div)`
  perspective: ${PERSPECTIVE}px;
  width: ${W}px;
  height: ${H}px;
  cursor: pointer;
`;

export enum EPhase {
  None,
  Closed,
  Hovered,
  Revealed,


}
export const NftCss = () => {
  const [phase, cycle] = useCycle(EPhase.None, EPhase.Closed, EPhase.Hovered, EPhase.Revealed)
  const ref = useRef<HTMLDivElement>();
  useAnimationFrame((t) => {
    if (ref.current) {
      ref.current.style.transform = `rotateY(${t * 0.01}deg) translate3d(${X}px,${Y}px,${-Z}px)`;
      ref.current.style.transformOrigin = `50% 50% ${-Z}px`;
    }
  });

  return (
    <Blank>
      <Root
        onTap={() => cycle()}
      >
        <Kino
          ref={ref}
          variants={EPhase.None}

          // style={{
          //   originX: "50%",
          //   originY: "50%",
          //   originZ: "50%"
          // }}
        />
      </Root>
    </Blank>
  );
};
