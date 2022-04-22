import styled from "styled-components";

/* eslint-disable-next-line */
export interface NftProps {}

const StyledNft = styled.div`
  color: pink;
`;

export function Nft(props: NftProps) {
  return (
    <StyledNft>
      <h1>Welcome to Nft!</h1>
    </StyledNft>
  );
}

export default Nft;
