import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Projects from "./Projects";

test("Projects page lists at least one project", () => {
  render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByText(/silver online service/i)).toBeInTheDocument();
});

test("Tag filter narrows the list", async () => {
  render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );
  const allButton = screen.getByRole("button", { name: /^all$/ });
  expect(allButton).toBeInTheDocument();
  const tagBtn = screen.getByRole("button", { name: /#AI/i });
  await userEvent.click(tagBtn);
  expect(screen.getByText(/computer vision projects/i)).toBeInTheDocument();
});
