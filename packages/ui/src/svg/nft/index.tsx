import { Blank } from "@3d-workshop/templates";
import { motion } from "framer-motion";
import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
const CENTER_Z = 0;
const CENTER_X = 0;
const CENTER_Y = 0;

export const SIZE = 400;
export const BLURS = [...Array(4)];
export const BLURS_H = BLURS.slice(~~BLURS.length * 0.5);
export const SIDES: number[][] = [
  [0, 4, 6, 2], // left
  [5, 1, 3, 7],
  [6, 4, 5, 7],
  [6, 2, 3, 7],
  [4, 0, 1, 5], // top
  [2, 3, 1, 0], // front
];
const LINES: number[][] = [
  [3, 7], // right
  [5, 7], // back
  [6, 7], // bottom
];
const N = {
  x: [50, 190, 50, 190, 50, 190, 50, 190],
  y: [50, 50, 190, 190, 50, 50, 190, 190],
  z: [50, 50, 50, 50, 190, 190, 190, 190],
};

const Button = styled(motion.path)`
  fill: #2060dd;
  stroke: #2580ff;
  stroke-width: 1;
  &:hover {
    stroke-width: 3;
  }
`;

type TConfig = {
  xc: number[];
  yc: number[];
  zc: number[];
  f: number;
  cxr: number;
  cyr: number;
  cx: number;
  cy: number;
  zoom: number;
  size: number;
};
const calcPerspective = ({ xc, yc, zc, f, cxr, cyr, cx, cy, zoom, size }: TConfig) => {
  const nextXs = [];
  const nextYs = [];

  for (let i = 0; i < 8; i++) {
    let z = zc[i];
    z = z * size;
    const p = Math.pow(z, f * 0.5);

    let x = xc[i];
    x = x * size;

    let nextX = (x * zoom * f) / p;

    nextX = nextX - (cxr * f * zoom) / z + cx;
    nextXs.push(nextX);

    let y = yc[i];
    y = y * size;

    let nextY = (y * zoom * f) / p;

    nextY = nextY - (cyr * f * zoom) / z + cy;
    nextYs.push(nextY);
  }

  return {
    x: nextXs,
    y: nextYs,
    z: zc,
  };
};

const Root = styled(motion.div)`
  display: flex;
`;

const Side = styled(motion.polygon)``;

const Line = styled(motion.line)``;

export const NftSvg = () => {
  const ref = useRef(null);
  const [xc, setXc] = useState(N.x);
  const [yc, setYc] = useState(N.y);
  const [zc, setZc] = useState(N.z);

  const [size, setSize] = useState(4);
  const [f, setF] = useState(0.5);
  const [zoom, setZoom] = useState(7);

  const [cx, setCx] = useState(-200);
  const [cy, setCy] = useState(-140);

  const [cxr, setCxr] = useState(70);
  const [cyr, setCyr] = useState(120);

  const coords = calcPerspective({
    xc,
    yc,
    zc,
    f,
    cxr,
    cyr,
    cx,
    cy,
    zoom,
    size,
  });

  const COLORS = ["red", "yellow", "green", "blue", "black", "purple"];

  const rotateAboutY = (radians: number) => {
    const tmpXc = [...coords.x];
    const tmpZc = [...coords.z];
    for (let i = 0; i < xc.length; i++) {
      const z = tmpZc[i] - CENTER_Z;
      const x = tmpXc[i] - CENTER_X;
      const d = Math.sqrt(x * x + z * z);
      const theta = Math.atan2(x, z) + radians;
      tmpXc[i] = CENTER_X + d * Math.sin(theta);
      tmpZc[i] = CENTER_Z + d * Math.cos(theta);
    }
    setXc(tmpXc);
    setZc(tmpZc);
  };
  const rotateAboutX = (radians: number) => {
    const tmpYc = [...coords.y];
    const tmpZc = [...coords.z];
    for (let i = 0; i < xc.length; i++) {
      const z = tmpZc[i] - CENTER_Z;
      const y = tmpYc[i] - CENTER_Y;
      const d = Math.sqrt(y * y + z * z);
      const theta = Math.atan2(y, z) + radians;
      tmpYc[i] = CENTER_Y + d * Math.sin(theta);
      tmpZc[i] = CENTER_Z + d * Math.cos(theta);
    }
    setYc(tmpYc);
    setZc(tmpZc);
  };

  return (
    <Blank>
      <Root>
        <svg
          ref={ref}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width={SIZE}
          height={SIZE}
          xmlns="http://www.w3.org/2000/svg"
        >
          {(SIDES as number[][]).map((pointIndicies: number[], index) => (
            <g key={`Side-${index}`} className={pointIndicies + ""}>
              <Side
                // style={{
                //   fill: "#757575",
                // }}
                style={{ fill: COLORS[index] }}
                points={(pointIndicies as number[])
                  .map((pointIndex: number) => `${coords.x[pointIndex]},${coords.y[pointIndex]}`)
                  .join(" ")}
              />
            </g>
          ))}
          {LINES.map(([line1, line2]: number[], index) => (
            <Line
              key={[line1, line2] + ""}
              className={[line1, line2] + ""}
              x1={coords.x[line1]}
              x2={coords.x[line2]}
              y1={coords.y[line1]}
              y2={coords.y[line2]}
              stroke="rgba(255,255,255,1)"
              strokeWidth="1"
              style={{ filter: `url(#blur-${index})` }}
            />
          ))}
        </svg>
      </Root>
      <svg width="100" height="100" viewBox="0 0 280 280">
        <Button
          d="m50.5 250.5 15 -15 0 8 45 0 0 14 -45 0 0 8 z"
          onClick={() => rotateAboutY(0.08)}
        />
        <Button
          d="m190.5 250.5 -15 -15 0 8 -45 0 0 14 45 0 0 8 z"
          onClick={() => rotateAboutY(-0.08)}
        />
        <Button
          d="m255.5 50.5 15 15 -8 0 0 45 -14 0 0 -45 -8 0 z"
          onClick={() => rotateAboutX(0.08)}
        />
        <Button
          d="m255.5 190.5 15 -15 -8 0 0 -45 -14 0 0 45 -8 0 z"
          onClick={() => rotateAboutX(-0.08)}
        />
      </svg>
    </Blank>
  );
};
