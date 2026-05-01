import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./lib/theme";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function renderAt(path: string) {
  return render(
    <ThemeProvider initial="light">
      <MemoryRouter initialEntries={[path]}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </MemoryRouter>
    </ThemeProvider>
  );
}

test("/ renders Home", () => {
  renderAt("/");
  expect(screen.getByRole("heading", { level: 1, name: /darren/i })).toBeInTheDocument();
});

test("/projects renders Projects", () => {
  renderAt("/projects");
  expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
});

test("/about renders About", () => {
  renderAt("/about");
  expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
});

test("unknown path renders NotFound", () => {
  renderAt("/this-does-not-exist");
  expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
});
