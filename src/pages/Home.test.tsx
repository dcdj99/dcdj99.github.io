import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

test("Home shows headline and featured work", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /^work$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/spectrea/i).length).toBeGreaterThan(0);
});
