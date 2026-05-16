import { render, screen } from "@testing-library/react";
import About from "./About";

test("About page shows intro, skills, and contact", () => {
  render(<About />);
  expect(screen.getByRole("heading", { level: 1, name: /about/i })).toBeInTheDocument();
  expect(screen.getByText(/who/i)).toBeInTheDocument();
  expect(screen.getByText(/stack/i)).toBeInTheDocument();
  expect(screen.getByText(/contact/i)).toBeInTheDocument();
});
