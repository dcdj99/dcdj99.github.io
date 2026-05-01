import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

test("Home shows hero, now block, and featured section", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByText(/^now ·/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /featured/i })).toBeInTheDocument();
});
