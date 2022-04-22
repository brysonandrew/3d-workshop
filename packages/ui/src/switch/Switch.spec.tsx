import { render } from "@testing-library/react";

import Switch from ".";

describe("Switch", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Switch />);
    expect(baseElement).toBeTruthy();
  });
});
