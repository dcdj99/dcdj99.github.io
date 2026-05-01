import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../lib/theme";
import { Header } from "./Header";

function renderHeader() {
  return render(
    <MemoryRouter>
      <ThemeProvider initial="light">
        <Header />
      </ThemeProvider>
    </MemoryRouter>
  );
}

test("Header shows name and primary nav links", () => {
  renderHeader();
  expect(screen.getByRole("link", { name: /darren/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^home$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^projects$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^about$/i })).toBeInTheDocument();
});

test("Header has a theme toggle button", () => {
  renderHeader();
  expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
});
