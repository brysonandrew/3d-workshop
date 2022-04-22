import { render } from "@testing-library/react";

import Camera from ".";

describe("Camera", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Camera />);
    expect(baseElement).toBeTruthy();
  });
});
