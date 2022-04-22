import { render } from "@testing-library/react";

import Nft from "./Nft";

describe("Nft", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Nft />);
    expect(baseElement).toBeTruthy();
  });
});
