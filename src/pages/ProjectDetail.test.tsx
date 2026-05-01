import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectDetail from "./ProjectDetail";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

test("renders the project when slug matches", () => {
  renderAt("/projects/sample-project");
  expect(screen.getByRole("heading", { name: /sample project/i })).toBeInTheDocument();
});

test("renders not-found state when slug does not match", () => {
  renderAt("/projects/nope");
  expect(screen.getByRole("heading", { name: /project not found/i })).toBeInTheDocument();
});
