import { render, screen } from "@testing-library/react";
import About from "./About";

test("About page shows intro, skills, résumé, and contact", () => {
  render(<About />);
  expect(screen.getByRole("heading", { level: 1, name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /skills/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /résumé/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /contact/i })).toBeInTheDocument();
});
