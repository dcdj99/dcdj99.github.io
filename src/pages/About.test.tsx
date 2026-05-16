import { render, screen } from "@testing-library/react";
import About from "./About";

test("About page shows business card, quick info, and intro", () => {
  render(<About />);
  expect(screen.getByRole("heading", { level: 1, name: /about/i })).toBeInTheDocument();
  expect(screen.getByText(/darren chow/i)).toBeInTheDocument();
  expect(screen.getByText(/quick info/i)).toBeInTheDocument();
  expect(screen.getByText(/^stack$/i)).toBeInTheDocument();
  expect(screen.getByText(/^intro$/i)).toBeInTheDocument();
});
