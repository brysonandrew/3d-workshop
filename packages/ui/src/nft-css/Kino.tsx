import { motion } from "framer-motion";
import { forwardRef, Fragment, HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import {
  INNER_BOX_SHADOW,
  W,
  H,
  WH,
  HH,
  TOP_BOX_SHADOW,
  HQ,
  CO,
  SH,
  SW,
  SD,
  SDH,
  SDQ,
  SWH,
  SHQ,
  IO,
  SCO,
  SHH,
  SWE,
  SWQ,
  SDE,
} from "./constants";
import metal from "./metal.jpeg";
import filmFrame from "./film-frame.jpeg";
import { FilmFrame } from "./FilmFrame";

const sideCss = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const shapeCss = css`
  position: absolute;
  transform-style: preserve-3d;
`;

const Root = styled.div`
  ${shapeCss}
  width: ${W}px;
  height: ${H}px;
  pointer-events: none;
  & aside.kino {
    ${sideCss}
    &:nth-child(1) {
      /* width: ${H}px; */
      transform: rotateY(0deg) translateZ(${WH - HQ - CO}px);
    }
    &:nth-child(2) {
      width: ${H}px;
      transform: rotateY(90deg) translateZ(${W - HQ}px);
    }
    &:nth-child(3) {
      /* width: ${H}px; */
      transform: rotateY(180deg) translateZ(${WH - HQ - CO}px);
    }
    &:nth-child(4) {
      width: ${H}px;
      transform: rotateY(-90deg) translateZ(${WH - HQ - CO}px);
    }
    &:nth-child(5) {
      box-shadow: ${TOP_BOX_SHADOW};
      /* width: ${H}px; */
      transform: rotateX(90deg) translateZ(${WH - HQ - CO}px);
    }
    &:nth-child(6) {
      box-shadow: ${TOP_BOX_SHADOW};
      /* width: ${H}px; */
      transform: rotateX(-90deg) translateZ(${WH - HQ - CO}px);
    }
    &:nth-child(7) {
      /* width: ${H}px; */
      transform: rotateY(180deg) translateZ(${WH - HH}px);
    }
  }
`;

const Screen = styled(motion.div)`
  ${shapeCss}
  width: ${SW}px;
  height: ${SH}px;
  transform: translate3d(${IO}px, ${IO}px, 0px);
  pointer-events: auto;
  & aside.screen {
    ${sideCss}
    background-image: linear-gradient(#000, #212121, #000);
    box-shadow: ${INNER_BOX_SHADOW};
    &:nth-child(1) {
      background-size: cover;
      transform: rotateY(0deg) translateZ(${SDH - SCO}px);
    }
    &:nth-child(2) {
      width: ${SD}px;
      transform: rotateY(90deg) translateZ(${SW - SDQ - 2}px);
    }
    &:nth-child(3) {
      background-size: cover;
      transform: rotateY(180deg) translateZ(${SDH - SCO}px);
    }
    &:nth-child(4) {
      width: ${SD}px;
      transform: rotateY(-90deg) translateZ(${SDH}px);
    }
    &:nth-child(5) {
      // top
      height: ${SDH}px;
      transform: rotateX(90deg) translateZ(${SHH - SHQ - SDQ}px);
    }
    &:nth-child(6) {
      //base
      height: ${SDH}px;
      transform: rotateX(-90deg) translateZ(${SH - SDQ}px);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  filter: invert(100%);
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

const createSides = (
  props: HTMLAttributes<HTMLDivElement>,
  children?: (i: number) => JSX.Element | null
) =>
  [...Array(6)].map((_, i) => (
    <aside {...props} key={i}>
      {children && children(i)}
    </aside>
  ));

export const Kino = forwardRef<any, any>(({ video, ...config }, ref) => {
  return (
    <Root ref={ref} {...config}>
      {createSides({ className: "kino" })}
      {/* <motion.aside>
        <Video src="./1.mp4" autoPlay />
      </motion.aside> */}
      <Screen whileHover="hover">
        {createSides({ className: "screen" }, (i) => (i === 0 || i === 2 ? <FilmFrame /> : null))}
      </Screen>
    </Root>
  );
});
