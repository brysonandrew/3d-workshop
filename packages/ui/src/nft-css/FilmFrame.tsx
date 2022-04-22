import styled from "styled-components";
import { SW, SH, INNER_BOX_SHADOW } from "./constants";

const B = 20;
const BH = B * 0.5;
const BHQ = BH * 0.5;

const NO = 2;
const NOD = NO * 2;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: ${SW}px;
  height: ${SH}px;
`;

const Notches = styled.div`
  display: flex;
  flex-direction: row;
  height: ${BH}px;
  width: 100%;
  padding: ${NO}px;
  box-sizing: border-box;
`;

const Notch = styled.div`
  height: ${NOD}px;
  width: ${NOD}px;
  margin-right: ${NOD}px;
  box-shadow: ${INNER_BOX_SHADOW};
  background-color: #fff;
`;

const FilmFrameInner = styled.div`
  position: absolute;
  left: ${BHQ}px;
  top: ${BH}px;
  width: ${SW - BH}px;
  height: ${SH - B}px;
  box-shadow: ${INNER_BOX_SHADOW};
  border-radius: ${NOD}px;
  background-color: #fff;
`;

export const FilmFrame = () => {
  return (
    <Root>
      <Notches>
        {[...Array(21)].map((_, i: number) => (
          <Notch key={`notch-${i}`} />
        ))}
      </Notches>
      <FilmFrameInner />
      <Notches>
        {[...Array(21)].map((_, i: number) => (
          <Notch key={`notch-${i}`} />
        ))}
      </Notches>
    </Root>
  );
};
