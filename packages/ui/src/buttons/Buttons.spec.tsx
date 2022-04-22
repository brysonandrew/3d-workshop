import { render } from "@testing-library/react";

import Buttons from "./Buttons";

describe("Buttons", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Buttons />);
    expect(baseElement).toBeTruthy();
  });
});
