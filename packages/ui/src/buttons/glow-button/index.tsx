import { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { Blank } from "@3d-workshop/templates";
import { Vector2, Vector4 } from "three";
import useMeasure from "react-use-measure";
import { useGlInstance } from "../../utils/web-gl/gl-instance";
import { instanceConfig } from "./glow/config";

const ButtonContainer = styled.div`
  padding: 24px;
  background-color: #000; ;
`;

const ButtonSurface = styled(motion.button)`
  position: relative;
  padding: 24px;
  border-radius: 4px;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
`;

const ButtonStyle = styled.div`
  position: relative;
  width: 180px;
  height: 40px;
  line-height: 24px;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
`;

const Canvas = styled.canvas`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

export const GlowButton = () => {
  const [ref, bounds] = useMeasure({ scroll: false });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const canvasRef = useGlInstance(
    instanceConfig({ uniforms: { mouse: { x: mouseX.get(), y: mouseY.get() } } })
  );

  return (
    <Blank>
      <ButtonContainer>
        <ButtonSurface
          ref={ref}
          onHoverStart={() => {
            resetMousePosition();
          }}
          onHoverEnd={() => {
            resetMousePosition();
          }}
          onPointerMove={(e) => {
            mouseX.set(e.clientX - bounds.x - bounds.width / 2);
            mouseY.set(e.clientY - bounds.y - bounds.height / 2);
          }}
        >
          <Canvas ref={canvasRef} />
          <ButtonStyle>clickety</ButtonStyle>
        </ButtonSurface>
      </ButtonContainer>
    </Blank>
  );
};
