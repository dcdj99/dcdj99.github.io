import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

test("Header shows site name and primary nav links", () => {
  renderHeader();
  expect(screen.getByRole("link", { name: /darren/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^work$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^about$/i })).toBeInTheDocument();
});
