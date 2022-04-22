import { Suspense, useState } from "react";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Shapes } from "./Shapes";
import { transition } from "./settings";
import useMeasure from "react-use-measure";
import styled from "styled-components";
import { Blank } from "@3d-workshop/templates";

const Styles = styled.div`
  body,
  html {
    overflow: hidden;
  }

  button {
    --purple: #db07d1;
    --pink: #f2056f;
    --blue: #61dafb;

    appearance: none;
    border: none;
    cursor: pointer;
    background-color: #acc7ed;
    color: #fff;
    border-radius: 60px;
    outline: none;
    margin: 0;
    padding: 12px 25px;
    font-family: "Poppins";
    font-size: 48px;
    font-weight: 600;
    line-height: 48px;
    letter-spacing: -1px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .shapes {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 60px;
    background: linear-gradient(60deg, var(--blue) 0%, #d6cbf6 30%, var(--pink) 70%);
  }

  .blush {
    position: absolute;
    bottom: -15px;
    width: 100px;
    height: 30px;
    filter: blur(20px);
  }

  .blush.pink {
    right: 20px;
    background: var(--purple);
  }

  .blush.blue {
    left: 20px;
    background: var(--blue);
  }

  .shapes .container {
    position: absolute;
    top: -100px;
    bottom: -100px;
    left: -100px;
    right: -100px;
    width: calc(100% + 200px);
    pointer-events: none;
  }

  .shapes canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .label {
    width: 180px;
    padding: 20px 0;
    transform: translateZ(0);
    font-weight: 700;
    z-index: 1;
  }

  .default {
    display: block;
  }

  .number {
    padding: 20px 0;
    width: 88px;
    position: relative;
    transform: translateZ(0);
  }

  .number:before {
    content: "";
    position: absolute;
    left: 0;
    top: 1px;
    bottom: 1px;
    width: 1px;
    background-color: #35373f;
  }

  .current {
    color: #8a8d9b;
    opacity: 1;
    display: block;
  }

  .new {
    color: #fbfaaa;
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    display: block;
  }

  .add {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    opacity: 0;
    transform: translateY(38px);
    pointer-events: none;
    color: #d0d0db;
    display: block;
  }

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  * {
    box-sizing: inherit;
  }

  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    min-height: 100vh;
    display: flex;
    font-family: "Inter", Arial;
    justify-content: center;
    align-items: center;
    background: #f4f5fa;
  }

  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC,
      U+A830-A839, U+A8E0-A8FB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2)
      format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
      U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z11lFd2JQEl8qw.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC,
      U+A830-A839, U+A8E0-A8FB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1JlFd2JQEl8qw.woff2)
      format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
      U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z11lFd2JQEl8qw.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC,
      U+A830-A839, U+A8E0-A8FB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1JlFd2JQEl8qw.woff2)
      format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
      U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

export const PlayButton = () => {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Styles>
      <Blank>
        <MotionConfig transition={transition}>
          <motion.button
            ref={ref}
            initial={false}
            animate={isHover ? "hover" : "rest"}
            whileTap="press"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.5 },
              press: { scale: 1.4 },
            }}
            onHoverStart={() => {
              resetMousePosition();
              setIsHover(true);
            }}
            onHoverEnd={() => {
              resetMousePosition();
              setIsHover(false);
            }}
            onTapStart={() => setIsPress(true)}
            onTap={() => setIsPress(false)}
            onTapCancel={() => setIsPress(false)}
            onPointerMove={(e) => {
              mouseX.set(e.clientX - bounds.x - bounds.width / 2);
              mouseY.set(e.clientY - bounds.y - bounds.height / 2);
            }}
          >
            <motion.div
              className="shapes"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
            >
              <div className="pink blush" />
              <div className="blue blush" />
              <div className="container">
                <Suspense fallback={null}>
                  <Shapes isHover={isHover} isPress={isPress} mouseX={mouseX} mouseY={mouseY} />
                </Suspense>
              </div>
            </motion.div>
            <motion.div
              variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
              className="label"
            >
              play
            </motion.div>
          </motion.button>
        </MotionConfig>
      </Blank>
    </Styles>
  );
};
