import styled from "styled-components";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { Blank } from "@3d-workshop/templates";
import image0 from "./0.jpg";
import image1 from "./1.jpg";
import image2 from "./2.jpg";
import image3 from "./3.jpg";
import "../../../../index.d";
import { STARS_GL_INSTANCE_CONFIG } from "./stars/config";

import { useGlInstance } from "../utils/web-gl/gl-instance";

const IMAGES = [image0, image1, image2, image3];
const DURATION = 1;
const Container = styled.div`
  position: relative;
`;
const ANIMATE = [
  { filter: ["blur(0px)", "blur(20px)"], opacity: [1, 0.8] },
  { filter: ["blur(20px)", "blur(0px)"], opacity: [0.8, 1] },
];

const Canvas = styled(motion.canvas)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Image = styled(motion.img)`
  position: absolute;
  left: 0;
  top: 0;
`;

export const GlitchTransformGlsl = () => {
  const [count, cycle] = useCycle(-1, 0, 1);
  const canvasRef = useGlInstance(STARS_GL_INSTANCE_CONFIG);

  return (
    <Blank>
      <Canvas ref={canvasRef} />
      <AnimatePresence>
        <Container
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            top: 200,
          }}
        >
          <Image
            transition={{
              duration: DURATION,
            }}
            initial={false}
            animate={ANIMATE[count]}
            style={{
              position: "absolute",
              left: 0,
              width: 280,
              height: 280,
              top: 0,
            }}
            onTap={() => {
              cycle();
            }}
            onAnimationComplete={() => {
              if (count < 1) {
                cycle();
              }
            }}
            src={IMAGES[count]}
            layoutId="box"
            id={`shape-${count}`}
            key={`shape-${count}`}
          />
        </Container>
      </AnimatePresence>
    </Blank>
  );
};
