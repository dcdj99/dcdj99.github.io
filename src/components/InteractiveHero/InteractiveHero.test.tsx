import { render } from "@testing-library/react";
import { InteractiveHero } from ".";

test("InteractiveHero renders without crashing", () => {
  render(<InteractiveHero />);
  expect(document.querySelector("canvas, div")).toBeTruthy();
});
