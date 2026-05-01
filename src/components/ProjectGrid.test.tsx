import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Projects from "../pages/Projects";

test("Projects page lists at least one project", () => {
  render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByText(/sample project/i)).toBeInTheDocument();
});

test("Tag filter narrows the list", async () => {
  render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );
  const allButton = screen.getByRole("button", { name: /^all$/ });
  expect(allButton).toBeInTheDocument();
  const tagBtn = screen.getByRole("button", { name: /#react/i });
  await userEvent.click(tagBtn);
  expect(screen.getByText(/sample project/i)).toBeInTheDocument();
});
