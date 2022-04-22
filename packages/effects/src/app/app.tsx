import styled from "styled-components";
import { Route } from "react-router-dom";
import { Bloom } from "../pages/bloom";

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Route path="/" exact render={() => <Bloom />} />
      <Route path="/bloom" exact render={() => <Bloom />} />
    </StyledApp>
  );
}

export default App;
