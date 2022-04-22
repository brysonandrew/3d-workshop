import { FC } from "react";
import styled from "styled-components";
import { blankPageCss } from "./css";

const Root = styled.div`
  ${blankPageCss}
  background-color: black;
`;

type TProps = {children:JSX.Element}
export const Blank:FC<TProps> = ({ children }) => {
  return <Root>{children}</Root>;
};
