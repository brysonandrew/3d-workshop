import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import { toPath } from "./toPath";
import * as Ui from "..";

const List = styled.ul`
  padding: 20px;
`;

const Item = styled.li`
  padding: 10px;
  font-size: 20px;
`;

const uis = Object.values(Ui).map((Component) => ({ path: toPath(Component.name), Component }));

const Home = () => (
  <div>
    <List>
      {uis.map(({ path }) => (
        <Item key={path}>
          <Link to={path}>{path}</Link>
        </Item>
      ))}
    </List>
  </div>
);

export const App = () => {
  return (
    <>
      {uis.map(({ Component, path }) => (
        <Route key={path} path={path} render={() => <Component />} />
      ))}
      <Route
        path="/"
        exact
        render={() => (
          <div>
            <Home />
          </div>
        )}
      />
      <Route render={() => <div>not found</div>} />
    </>
  );
};

export default App;
