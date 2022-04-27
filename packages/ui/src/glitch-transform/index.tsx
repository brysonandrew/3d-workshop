import { motion, useCycle, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import image0 from "./0.jpg";
import image1 from "./1.jpg";
import image2 from "./2.jpg";
import image3 from "./3.jpg";
const IMAGES = [image0, image1, image2, image3];
const DURATION = 1;
const Container = styled.div`
  position: relative;
`;

const ANIMATE = [
  { filter: ["blur(0px)", "blur(20px)"], opacity: [1, 0.8] },
  { filter: ["blur(20px)", "blur(0px)"], opacity: [0.8, 1] },
];

const Image = styled(motion.img)`
  position: absolute;
  left: 0;
  top: 0;
  /* @keyframes glitch {
    0%,
    100% {
      opacity: 1;
      transform: translate3d(var(--gap-horizontal), 0, 0) scale3d(-1, -1, 1);
      -webkit-clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
      clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    }
    20% {
      -webkit-clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
      clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    }
    30% {
      -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
      clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    }
    40% {
      -webkit-clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
      clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    }
    50% {
      -webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
      clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    }
    55% {
      -webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
      clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    }
    60% {
      -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
      clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    }
    65% {
      -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
      clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    }
    70% {
      -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
      clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }
    80% {
      -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
      clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    }
    85% {
      -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 65%, 0 65%);
      clip-path: polygon(0 60%, 100% 60%, 100% 65%, 0 65%);
    }
    95% {
      -webkit-clip-path: polygon(0 72%, 100% 72%, 100% 78%, 0 78%);
      clip-path: polygon(0 72%, 100% 72%, 100% 78%, 0 78%);
    }
  }
  animation: glitch 1s infinite alternate-reverse; */
`;

export const Component = () => {
  const [count, cycle] = useCycle(-1, 0, 1);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const controls = useAnimation();

  // useEffect(() => {
  //   if (count > -1) {
  //     controls.start({
  //       filter: ["blur(0px)", "blur(20px)", "blur(0px)"],
  //     });
  //     timer.current = setTimeout(() => cycle(), DURATION * 0.5 * 1000);
  //   }
  //   return () => {
  //     if (timer.current) {
  //       clearTimeout(timer.current);
  //     }
  //   };
  // }, [controls, cycle, count]);
  console.log(count);
  return (
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
  );
};

export const GlitchTransform = () => {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Component />
    </motion.div>
  );
};
