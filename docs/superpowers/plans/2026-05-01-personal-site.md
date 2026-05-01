# Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a personal portfolio site for Darren Chow at `darrenchow.me`, deployed to GitHub Pages, with a "living notebook + interactive hero" visual direction and a content model where adding a project = editing one TypeScript object.

**Architecture:** Vite + React + TypeScript single-page app, client-side routing via React Router, Tailwind for styling, content stored as TypeScript data modules under `src/data/`. Built and deployed via GitHub Actions to the `gh-pages` branch of the `dcdj99/dcdj99.github.io` repo, served at the custom domain `darrenchow.me`.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS, React Router, Vitest + React Testing Library, GitHub Pages, GitHub Actions.

**Working directory:** `/home/sutd-samp/Documents/github/profile/` (will push to remote `dcdj99/dcdj99.github.io`; local folder rename is optional and deferred to the end).

**Spec:** `docs/superpowers/specs/2026-05-01-personal-site-design.md`

---

## File Structure

```
.
├── .github/workflows/deploy.yml        # CI/CD
├── public/
│   ├── CNAME                           # darrenchow.me
│   ├── favicon.svg
│   └── resume.pdf                      # placeholder until user provides
├── src/
│   ├── main.tsx                        # entry, mounts <App/>
│   ├── App.tsx                         # router + theme provider
│   ├── index.css                       # Tailwind directives + globals
│   ├── data/
│   │   ├── site.ts                     # name, tagline, socials, email
│   │   ├── projects.ts                 # Project[] + Project type
│   │   ├── about.ts                    # bio + skills (structured)
│   │   └── now.ts                      # currently block
│   ├── lib/
│   │   ├── theme.tsx                   # ThemeProvider + useTheme()
│   │   └── projects.ts                 # filterByTag, getBySlug, featured
│   ├── components/
│   │   ├── Layout.tsx                  # header + main + footer wrapper
│   │   ├── Header.tsx                  # name, nav, theme toggle
│   │   ├── Footer.tsx                  # socials + email
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── TagFilter.tsx
│   │   ├── NowBlock.tsx
│   │   ├── PaperGrain.tsx              # SVG noise overlay
│   │   ├── HandUnderline.tsx           # SVG underline
│   │   ├── CustomCursor.tsx
│   │   └── InteractiveHero/
│   │       ├── index.tsx               # picks prototype, respects reduced-motion
│   │       └── Constellation.tsx       # canvas-based dots/lines
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   └── test/
│       ├── setup.ts                    # vitest globals + jest-dom
│       └── *.test.tsx                  # colocated to feature
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── vitest.config.ts
└── .gitignore
```

YAGNI notes:
- Only **one** interactive hero prototype (Constellation) is built. The spec lists two; building one with a clean interface costs less and the second can be added by mirroring the pattern.
- No MDX, no CMS, no analytics, no e2e tests, no contact form (matches spec "out of scope").

---

## Task 1: Scaffold Vite + React + TypeScript

**Files:**
- Create: `package.json`, `index.html`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `.gitignore`

- [ ] **Step 1: Initialize Vite project in current directory**

Run:
```bash
cd /home/sutd-samp/Documents/github/profile
npm create vite@latest . -- --template react-ts
```

When prompted "Current directory is not empty…", choose **"Ignore files and continue"** (the `docs/` folder must be preserved; Vite will not touch it).

Expected: scaffold creates `package.json`, `vite.config.ts`, `src/`, `index.html`, etc.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install
```

- [ ] **Step 3: Verify dev server runs**

Run:
```bash
npm run dev
```

Expected: server starts at `http://localhost:5173`, default Vite+React page renders. Stop the server (Ctrl+C).

- [ ] **Step 4: Replace placeholder content in `src/App.tsx`**

```tsx
export default function App() {
  return <h1 className="text-2xl">darrenchow.me — coming soon</h1>;
}
```

- [ ] **Step 5: Replace `src/index.css` with empty file (Tailwind directives added in Task 2)**

```css
/* Tailwind directives will be added in Task 2 */
```

- [ ] **Step 6: Update `index.html` title and meta**

Replace the `<title>` line and add a basic description:
```html
<title>Darren Chow</title>
<meta name="description" content="Darren Chow — portfolio and notes." />
```

- [ ] **Step 7: Verify build succeeds**

Run:
```bash
npm run build
```

Expected: `dist/` folder produced, no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + TS project"
```

---

## Task 2: Install and configure Tailwind CSS

**Files:**
- Create: `tailwind.config.ts`, `postcss.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Install Tailwind and peers**

Run:
```bash
npm install -D tailwindcss@latest postcss autoprefixer
npx tailwindcss init -p --ts
```

Expected: creates `tailwind.config.ts` and `postcss.config.js`.

- [ ] **Step 2: Configure Tailwind content paths and theme**

Replace contents of `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f6f1e7",
          dark: "#1a1614",
        },
        ink: {
          DEFAULT: "#1a1614",
          dark: "#e8e2d4",
        },
        accent: {
          DEFAULT: "#b4533a",       // terracotta — tunable live
          dark: "#d97757",
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Iowan Old Style", "Georgia", "serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "720px",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 3: Add Tailwind directives and globals to `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: theme('fontFamily.serif');
  }
  body {
    @apply bg-paper text-ink dark:bg-paper-dark dark:text-ink-dark;
    @apply antialiased;
  }
  code, .font-mono {
    font-family: theme('fontFamily.mono');
  }
}
```

- [ ] **Step 4: Update `App.tsx` to verify Tailwind works**

```tsx
export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-serif">darrenchow.me — coming soon</h1>
    </main>
  );
}
```

- [ ] **Step 5: Run dev server and verify warm cream background renders**

Run:
```bash
npm run dev
```

Expected: warm `#f6f1e7` background visible, serif heading. Stop server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: configure Tailwind with palette and typography"
```

---

## Task 3: Set up Vitest + React Testing Library

**Files:**
- Create: `vitest.config.ts`, `src/test/setup.ts`
- Modify: `package.json` (test scripts), `tsconfig.json` (include vitest types)

- [ ] **Step 1: Install testing dependencies**

Run:
```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
```

- [ ] **Step 3: Create `src/test/setup.ts`**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 4: Add test scripts to `package.json`**

Under `"scripts"`, add:
```json
"test": "vitest run",
"test:watch": "vitest",
"typecheck": "tsc --noEmit"
```

- [ ] **Step 5: Add vitest globals to `tsconfig.json`**

In `tsconfig.json`, ensure `compilerOptions.types` includes `"vitest/globals"` and `"@testing-library/jest-dom"`. If `types` doesn't exist, add:
```json
"types": ["vitest/globals", "@testing-library/jest-dom"]
```

- [ ] **Step 6: Write a smoke test for `App`**

Create `src/App.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("App renders the site title", () => {
  render(<App />);
  expect(screen.getByText(/darrenchow\.me/i)).toBeInTheDocument();
});
```

- [ ] **Step 7: Run tests**

Run:
```bash
npm test
```

Expected: 1 test passes.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add vitest + RTL with smoke test"
```

---

## Task 4: Define content data modules

**Files:**
- Create: `src/data/site.ts`, `src/data/projects.ts`, `src/data/about.ts`, `src/data/now.ts`

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
export const site = {
  name: "Darren Chow",
  shortName: "Darren",
  handle: "dcdj99",
  tagline: "Building things at the intersection of code, design, and people.",
  domain: "darrenchow.me",
  email: "hello@darrenchow.me",         // user can swap for hello@matchwise-sg.com or other
  socials: {
    github: "https://github.com/dcdj99",
    linkedin: "",                        // user fills in
    twitter: "",
  },
  location: "Singapore",
} as const;
```

- [ ] **Step 2: Create `src/data/projects.ts` with the `Project` type and a sample**

```ts
import type { ReactNode } from "react";

export type Project = {
  slug: string;
  title: string;
  date: string;             // ISO YYYY-MM-DD
  tags: string[];
  cover?: string;           // path under /public, e.g. "/projects/foo.png"
  github?: string;
  demo?: string;
  summary: string;          // shown on cards
  body?: ReactNode;         // optional case-study body for /projects/[slug]
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sample-project",
    title: "Sample Project",
    date: "2026-01-15",
    tags: ["typescript", "react"],
    summary: "A placeholder project to show the card and detail layouts. Replace with real work.",
    featured: true,
  },
];
```

- [ ] **Step 3: Create `src/data/about.ts`**

```ts
export const about = {
  intro:
    "I'm Darren — I build software with care for the human on the other side of the screen. I'm drawn to projects where craft, design, and engineering meet.",
  paragraphs: [
    "Add more bio paragraphs here. Anything goes — what you've worked on, what you care about, what you're curious about right now.",
  ],
  skills: [
    { group: "Languages", items: ["TypeScript", "Python", "Go"] },
    { group: "Frontend", items: ["React", "Tailwind", "Vite"] },
    { group: "Backend", items: ["Node.js", "PostgreSQL"] },
    { group: "Tools", items: ["Git", "Linux", "Figma"] },
  ],
};
```

- [ ] **Step 4: Create `src/data/now.ts`**

```ts
export const now = {
  updated: "2026-05-01",
  text: "Setting up this site. Currently exploring how a personal page can feel less like a résumé and more like a workshop window.",
};
```

- [ ] **Step 5: Create `src/lib/projects.ts` with selector helpers**

```ts
import { projects, type Project } from "../data/projects";

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const p of projects) for (const t of p.tags) tags.add(t);
  return Array.from(tags).sort();
}

export function filterByTag(tag: string | null): Project[] {
  if (!tag) return getAllProjects();
  return getAllProjects().filter((p) => p.tags.includes(tag));
}
```

- [ ] **Step 6: Write tests for the selectors**

Create `src/lib/projects.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getAllTags,
  filterByTag,
} from "./projects";

describe("project selectors", () => {
  it("returns projects sorted by date desc", () => {
    const all = getAllProjects();
    for (let i = 1; i < all.length; i++) {
      expect(all[i - 1].date >= all[i].date).toBe(true);
    }
  });

  it("only returns featured projects when filtering", () => {
    expect(getFeaturedProjects().every((p) => p.featured)).toBe(true);
  });

  it("looks up a project by slug", () => {
    const all = getAllProjects();
    if (all.length === 0) return;
    const first = all[0];
    expect(getProjectBySlug(first.slug)?.slug).toBe(first.slug);
  });

  it("returns undefined for unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("collects all tags as a unique sorted list", () => {
    const tags = getAllTags();
    expect(tags).toEqual([...new Set(tags)].sort());
  });

  it("filterByTag(null) returns all projects", () => {
    expect(filterByTag(null).length).toBe(getAllProjects().length);
  });

  it("filterByTag(tag) only returns projects with that tag", () => {
    const tags = getAllTags();
    if (tags.length === 0) return;
    const t = tags[0];
    expect(filterByTag(t).every((p) => p.tags.includes(t))).toBe(true);
  });
});
```

- [ ] **Step 7: Run tests**

Run:
```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add content data modules and project selectors"
```

---

## Task 5: Theme provider with dark mode + reduced-motion

**Files:**
- Create: `src/lib/theme.tsx`, `src/lib/theme.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/lib/theme.test.tsx`:
```tsx
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "./theme";

function Probe() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>toggle</button>
    </>
  );
}

test("ThemeProvider toggles between light and dark", async () => {
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );
  const initial = screen.getByTestId("theme").textContent;
  expect(initial === "light" || initial === "dark").toBe(true);
  await userEvent.click(screen.getByRole("button", { name: /toggle/i }));
  expect(screen.getByTestId("theme").textContent).not.toBe(initial);
});

test("ThemeProvider applies the dark class to html", async () => {
  render(
    <ThemeProvider initial="dark">
      <Probe />
    </ThemeProvider>
  );
  expect(document.documentElement.classList.contains("dark")).toBe(true);
});
```

- [ ] **Step 2: Run test, expect failure**

Run:
```bash
npm test -- theme
```

Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/lib/theme.tsx`**

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const ThemeContext = createContext<Ctx | null>(null);

function detectInitial(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children, initial }: { children: ReactNode; initial?: Theme }) {
  const [theme, setTheme] = useState<Theme>(initial ?? detectInitial());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return <ThemeContext.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Ctx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
```

- [ ] **Step 4: Run tests, expect pass**

Run:
```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add ThemeProvider with dark mode and reduced-motion hook"
```

---

## Task 6: Layout, Header, Footer

**Files:**
- Create: `src/components/Layout.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/Header.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/Header.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Install React Router**

Run:
```bash
npm install react-router-dom
```

- [ ] **Step 3: Run test, expect failure**

Run:
```bash
npm test -- Header
```

Expected: FAIL (Header not exported).

- [ ] **Step 4: Implement `src/components/Header.tsx`**

```tsx
import { Link, NavLink } from "react-router-dom";
import { site } from "../data/site";
import { useTheme } from "../lib/theme";

export function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
      <Link to="/" className="font-serif text-lg hover:text-accent dark:hover:text-accent-dark">
        {site.shortName}
      </Link>
      <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "text-accent dark:text-accent-dark" : "")}>
          Home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? "text-accent dark:text-accent-dark" : "")}>
          Projects
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "text-accent dark:text-accent-dark" : "")}>
          About
        </NavLink>
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle theme"
          className="text-base"
          title={`Theme: ${theme}`}
        >
          {theme === "dark" ? "☼" : "☾"}
        </button>
      </nav>
    </header>
  );
}
```

- [ ] **Step 5: Implement `src/components/Footer.tsx`**

```tsx
import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="px-6 py-10 max-w-5xl mx-auto font-mono text-xs flex flex-wrap gap-x-6 gap-y-2 opacity-70">
      <span>© {new Date().getFullYear()} {site.name}</span>
      {site.socials.github && (
        <a href={site.socials.github} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">
          github
        </a>
      )}
      {site.socials.linkedin && (
        <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">
          linkedin
        </a>
      )}
      <a href={`mailto:${site.email}`} className="hover:text-accent dark:hover:text-accent-dark">
        {site.email}
      </a>
    </footer>
  );
}
```

- [ ] **Step 6: Implement `src/components/Layout.tsx`**

```tsx
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 7: Run tests, expect pass**

Run:
```bash
npm test
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Layout, Header, Footer components"
```

---

## Task 7: Set up routing in App.tsx with placeholder pages

**Files:**
- Create: `src/pages/Home.tsx`, `src/pages/Projects.tsx`, `src/pages/ProjectDetail.tsx`, `src/pages/About.tsx`, `src/pages/NotFound.tsx`, `src/App.test.tsx` (replaces existing)
- Modify: `src/App.tsx`, `src/main.tsx`

- [ ] **Step 1: Create placeholder page files**

Create `src/pages/Home.tsx`:
```tsx
export default function Home() {
  return <section className="px-6 max-w-5xl mx-auto py-20"><h1 className="font-serif text-4xl">Home</h1></section>;
}
```

Repeat the same shape for `Projects.tsx`, `ProjectDetail.tsx`, `About.tsx`, `NotFound.tsx` — each export a default function with one `<h1>` matching its filename ("Projects", "Project Detail", "About", "Not Found").

- [ ] **Step 2: Replace `src/App.tsx`**

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./lib/theme";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

- [ ] **Step 3: Replace `src/App.test.tsx`**

```tsx
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
  expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
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
  expect(screen.getByRole("heading", { name: /not found/i })).toBeInTheDocument();
});
```

- [ ] **Step 4: Run tests, expect pass**

Run:
```bash
npm test
```

- [ ] **Step 5: Verify in dev server**

Run `npm run dev`, visit `/`, `/projects`, `/about`, `/garbage`. All four should render. Stop server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add router and placeholder pages"
```

---

## Task 8: ProjectCard, ProjectGrid, and Projects index page

**Files:**
- Create: `src/components/ProjectCard.tsx`, `src/components/ProjectGrid.tsx`, `src/components/TagFilter.tsx`, `src/components/ProjectGrid.test.tsx`
- Modify: `src/pages/Projects.tsx`

- [ ] **Step 1: Implement `src/components/ProjectCard.tsx`**

```tsx
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block border border-ink/10 dark:border-ink-dark/10 p-5 hover:border-accent dark:hover:border-accent-dark transition-colors"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl group-hover:text-accent dark:group-hover:text-accent-dark">
          {project.title}
        </h3>
        <time className="font-mono text-xs opacity-60">{project.date}</time>
      </div>
      <p className="mt-2 text-sm leading-relaxed">{project.summary}</p>
      {project.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider opacity-60">
          {project.tags.map((t) => (
            <li key={t}>#{t}</li>
          ))}
        </ul>
      )}
    </Link>
  );
}
```

- [ ] **Step 2: Implement `src/components/ProjectGrid.tsx`**

```tsx
import type { Project } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="font-mono text-sm opacity-60">No projects yet.</p>;
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => (
        <li key={p.slug}>
          <ProjectCard project={p} />
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 3: Implement `src/components/TagFilter.tsx`**

```tsx
type Props = {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
};

export function TagFilter({ tags, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 font-mono text-xs">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`px-2 py-1 border ${active === null ? "border-accent text-accent dark:border-accent-dark dark:text-accent-dark" : "border-ink/20 dark:border-ink-dark/20"}`}
      >
        all
      </button>
      {tags.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={`px-2 py-1 border ${active === t ? "border-accent text-accent dark:border-accent-dark dark:text-accent-dark" : "border-ink/20 dark:border-ink-dark/20"}`}
        >
          #{t}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Replace `src/pages/Projects.tsx`**

```tsx
import { useState } from "react";
import { ProjectGrid } from "../components/ProjectGrid";
import { TagFilter } from "../components/TagFilter";
import { filterByTag, getAllTags } from "../lib/projects";

export default function Projects() {
  const [active, setActive] = useState<string | null>(null);
  const tags = getAllTags();
  const visible = filterByTag(active);

  return (
    <section className="px-6 max-w-5xl mx-auto py-16">
      <header className="mb-10">
        <h1 className="font-serif text-4xl">Projects</h1>
        <p className="mt-3 font-mono text-sm opacity-70">A working list. Filterable, occasionally surprising.</p>
      </header>
      <TagFilter tags={tags} active={active} onChange={setActive} />
      <div className="mt-8">
        <ProjectGrid projects={visible} />
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Write integration test for Projects page**

Create `src/components/ProjectGrid.test.tsx`:
```tsx
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
  // Click a known tag from the sample project
  const tagBtn = screen.getByRole("button", { name: /#react/i });
  await userEvent.click(tagBtn);
  expect(screen.getByText(/sample project/i)).toBeInTheDocument();
});
```

- [ ] **Step 6: Run tests**

Run:
```bash
npm test
```

Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: implement Projects page with tag filter"
```

---

## Task 9: Project detail page

**Files:**
- Create: `src/pages/ProjectDetail.test.tsx`
- Modify: `src/pages/ProjectDetail.tsx`

- [ ] **Step 1: Replace `src/pages/ProjectDetail.tsx`**

```tsx
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../lib/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <section className="px-6 max-w-prose mx-auto py-20">
        <h1 className="font-serif text-3xl">Project not found</h1>
        <p className="mt-4 font-mono text-sm opacity-70">
          The project you're looking for doesn't exist.{" "}
          <Link to="/projects" className="underline decoration-accent dark:decoration-accent-dark">
            Back to projects
          </Link>
        </p>
      </section>
    );
  }

  return (
    <article className="px-6 max-w-prose mx-auto py-16">
      <header className="mb-10">
        <Link to="/projects" className="font-mono text-xs opacity-60 hover:opacity-100">← projects</Link>
        <h1 className="font-serif text-4xl mt-4">{project.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs opacity-70">
          <time>{project.date}</time>
          {project.tags.map((t) => <span key={t}>#{t}</span>)}
        </div>
        <p className="mt-6 text-lg leading-relaxed">{project.summary}</p>
        <div className="mt-4 flex gap-4 font-mono text-xs">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="underline decoration-accent dark:decoration-accent-dark">
              github →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="underline decoration-accent dark:decoration-accent-dark">
              demo →
            </a>
          )}
        </div>
      </header>
      {project.body && <div className="prose-content space-y-4 leading-relaxed">{project.body}</div>}
    </article>
  );
}
```

- [ ] **Step 2: Write tests**

Create `src/pages/ProjectDetail.test.tsx`:
```tsx
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
```

- [ ] **Step 3: Run tests, expect pass**

Run:
```bash
npm test
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement project detail page"
```

---

## Task 10: NowBlock and Home page

**Files:**
- Create: `src/components/NowBlock.tsx`, `src/components/NowBlock.test.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Implement `src/components/NowBlock.tsx`**

```tsx
import { now } from "../data/now";

export function NowBlock() {
  return (
    <aside className="border-l-2 border-accent dark:border-accent-dark pl-5 py-2">
      <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
        Now · updated {now.updated}
      </p>
      <p className="mt-2 leading-relaxed">{now.text}</p>
    </aside>
  );
}
```

- [ ] **Step 2: Replace `src/pages/Home.tsx`**

```tsx
import { Link } from "react-router-dom";
import { site } from "../data/site";
import { NowBlock } from "../components/NowBlock";
import { ProjectGrid } from "../components/ProjectGrid";
import { getFeaturedProjects } from "../lib/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <div className="px-6 max-w-5xl mx-auto">
      <section className="py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-widest opacity-60">Hello,</p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl leading-[1.05]">
          I'm {site.name}.
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed">{site.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
          <Link to="/projects" className="underline decoration-accent dark:decoration-accent-dark">see projects →</Link>
          <Link to="/about" className="underline decoration-accent dark:decoration-accent-dark">about →</Link>
        </div>
      </section>

      <section className="py-12">
        <NowBlock />
      </section>

      <section className="py-12">
        <header className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl">Featured</h2>
          <Link to="/projects" className="font-mono text-xs opacity-60 hover:opacity-100">all projects →</Link>
        </header>
        <ProjectGrid projects={featured} />
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Write smoke test**

Create `src/components/NowBlock.test.tsx`:
```tsx
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
```

- [ ] **Step 4: Run tests, expect pass**

Run:
```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: implement Home page with hero, now block, and featured projects"
```

---

## Task 11: About page and 404 page polish

**Files:**
- Modify: `src/pages/About.tsx`, `src/pages/NotFound.tsx`
- Create: `src/pages/About.test.tsx`

- [ ] **Step 1: Replace `src/pages/About.tsx`**

```tsx
import { about } from "../data/about";
import { site } from "../data/site";

export default function About() {
  return (
    <div className="px-6 max-w-prose mx-auto py-16">
      <header>
        <h1 className="font-serif text-4xl">About</h1>
      </header>

      <section className="mt-8 space-y-4 text-lg leading-relaxed">
        <p>{about.intro}</p>
        {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Skills</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {about.skills.map((g) => (
            <div key={g.group}>
              <dt className="font-mono text-[10px] uppercase tracking-widest opacity-60">{g.group}</dt>
              <dd className="mt-1">{g.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Résumé</h2>
        <p className="mt-4">
          <a
            href="/resume.pdf"
            className="underline decoration-accent dark:decoration-accent-dark font-mono text-sm"
          >
            Download résumé (PDF) →
          </a>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Contact</h2>
        <ul className="mt-4 font-mono text-sm space-y-1">
          <li>
            <a href={`mailto:${site.email}`} className="underline decoration-accent dark:decoration-accent-dark">
              {site.email}
            </a>
          </li>
          {site.socials.github && (
            <li>
              <a href={site.socials.github} target="_blank" rel="noreferrer" className="underline decoration-accent dark:decoration-accent-dark">
                github · {site.handle}
              </a>
            </li>
          )}
          {site.socials.linkedin && (
            <li>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="underline decoration-accent dark:decoration-accent-dark">
                linkedin
              </a>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/pages/NotFound.tsx`**

```tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="px-6 max-w-prose mx-auto py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest opacity-60">404</p>
      <h1 className="mt-4 font-serif text-4xl">Page not found</h1>
      <p className="mt-4 leading-relaxed">
        That page doesn't exist — or it used to and got composted into something else.
      </p>
      <p className="mt-8 font-mono text-sm">
        <Link to="/" className="underline decoration-accent dark:decoration-accent-dark">go home →</Link>
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Write About smoke test**

Create `src/pages/About.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import About from "./About";

test("About page shows intro, skills, résumé, and contact", () => {
  render(<About />);
  expect(screen.getByRole("heading", { level: 1, name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /skills/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /résumé/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /contact/i })).toBeInTheDocument();
});
```

- [ ] **Step 4: Run tests, expect pass**

Run:
```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: implement About page and 404 page"
```

---

## Task 12: Visual polish — paper grain, hand underline, custom cursor

**Files:**
- Create: `src/components/PaperGrain.tsx`, `src/components/HandUnderline.tsx`, `src/components/CustomCursor.tsx`
- Modify: `src/components/Layout.tsx`, `src/index.css`

- [ ] **Step 1: Implement `src/components/PaperGrain.tsx`**

```tsx
export function PaperGrain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.06] dark:opacity-[0.08] mix-blend-multiply dark:mix-blend-screen"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
```

- [ ] **Step 2: Implement `src/components/HandUnderline.tsx`**

```tsx
import type { ReactNode } from "react";

export function HandUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 8"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 -bottom-1 w-full h-2 text-accent dark:text-accent-dark"
      >
        <path
          d="M2,5 Q50,1 100,4 T198,3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
```

- [ ] **Step 3: Implement `src/components/CustomCursor.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/theme";

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button']"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent dark:border-accent-dark transition-[width,height,opacity] duration-150 ease-out hidden md:block ${
        hovering ? "w-8 h-8 opacity-80" : "w-3 h-3 opacity-50"
      }`}
    />
  );
}
```

- [ ] **Step 4: Wrap Layout with overlays**

Replace `src/components/Layout.tsx`:
```tsx
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PaperGrain } from "./PaperGrain";
import { CustomCursor } from "./CustomCursor";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <PaperGrain />
      <CustomCursor />
      <Header />
      <main className="flex-1 relative z-[2]">{children}</main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 5: Add fonts to `index.html`**

In the `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- [ ] **Step 6: Verify in dev server**

Run `npm run dev` and check: warm grain visible, custom cursor follows mouse on desktop, fonts loaded (serif body, mono for chips/dates), cursor disabled if you toggle "reduce motion" in DevTools.

- [ ] **Step 7: Run tests, expect still pass**

Run:
```bash
npm test
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add paper grain overlay, custom cursor, and Google Fonts"
```

---

## Task 13: Interactive hero — Constellation prototype

**Files:**
- Create: `src/components/InteractiveHero/index.tsx`, `src/components/InteractiveHero/Constellation.tsx`, `src/components/InteractiveHero/InteractiveHero.test.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Implement `src/components/InteractiveHero/Constellation.tsx`**

```tsx
import { useEffect, useRef } from "react";
import { useTheme } from "../../lib/theme";

type Dot = { x: number; y: number; vx: number; vy: number };

const DOTS = 60;
const LINK_DIST = 110;
const POINTER_DIST = 160;

export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let pointer = { x: -1000, y: -1000 };
    const dots: Dot[] = [];
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    }

    function init() {
      dots.length = 0;
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      for (let i = 0; i < DOTS; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
        });
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { pointer = { x: -1000, y: -1000 }; };

    function tick() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      const inkColor = theme === "dark" ? "rgba(232,226,212," : "rgba(26,22,20,";
      const accent = theme === "dark" ? "rgba(217,119,87," : "rgba(180,83,58,";

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.25;
            ctx!.strokeStyle = `${inkColor}${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const d of dots) {
        const dx = d.x - pointer.x, dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < POINTER_DIST) {
          const alpha = 1 - dist / POINTER_DIST;
          ctx!.strokeStyle = `${accent}${alpha})`;
          ctx!.lineWidth = 0.8;
          ctx!.beginPath();
          ctx!.moveTo(d.x, d.y);
          ctx!.lineTo(pointer.x, pointer.y);
          ctx!.stroke();
        }
        ctx!.fillStyle = `${inkColor}0.6)`;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    init();
    tick();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
```

- [ ] **Step 2: Implement `src/components/InteractiveHero/index.tsx` (handles reduced-motion fallback)**

```tsx
import { lazy, Suspense } from "react";
import { usePrefersReducedMotion } from "../../lib/theme";

const Constellation = lazy(() =>
  import("./Constellation").then((m) => ({ default: m.Constellation }))
);

export function InteractiveHero() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="aspect-[4/3] sm:aspect-[16/9] w-full border border-ink/10 dark:border-ink-dark/10 overflow-hidden">
      {reduced ? (
        <StaticFallback />
      ) : (
        <Suspense fallback={<StaticFallback />}>
          <Constellation />
        </Suspense>
      )}
    </div>
  );
}

function StaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="font-mono text-xs opacity-50">— a quiet field —</div>
    </div>
  );
}
```

- [ ] **Step 3: Mount in Home page**

Modify `src/pages/Home.tsx` — add hero element after the intro section. Replace the file:
```tsx
import { Link } from "react-router-dom";
import { site } from "../data/site";
import { NowBlock } from "../components/NowBlock";
import { ProjectGrid } from "../components/ProjectGrid";
import { getFeaturedProjects } from "../lib/projects";
import { InteractiveHero } from "../components/InteractiveHero";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <div className="px-6 max-w-5xl mx-auto">
      <section className="py-20 sm:py-24 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60">Hello,</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl leading-[1.05]">
            I'm {site.name}.
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
            <Link to="/projects" className="underline decoration-accent dark:decoration-accent-dark">see projects →</Link>
            <Link to="/about" className="underline decoration-accent dark:decoration-accent-dark">about →</Link>
          </div>
        </div>
        <InteractiveHero />
      </section>

      <section className="py-12">
        <NowBlock />
      </section>

      <section className="py-12">
        <header className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl">Featured</h2>
          <Link to="/projects" className="font-mono text-xs opacity-60 hover:opacity-100">all projects →</Link>
        </header>
        <ProjectGrid projects={featured} />
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Smoke test the hero falls back gracefully**

Create `src/components/InteractiveHero/InteractiveHero.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { InteractiveHero } from ".";

test("InteractiveHero renders without crashing", () => {
  render(<InteractiveHero />);
  // The lazy canvas may not have mounted yet; the wrapper should at least be present.
  // Fallback text "a quiet field" appears under reduced-motion or while suspense pending.
  // We just assert nothing throws and an element rendered.
  expect(document.querySelector("canvas, div")).toBeTruthy();
  // Avoid asserting on async lazy boundary in this smoke test.
  void screen;
});
```

- [ ] **Step 5: Run tests + dev server**

Run:
```bash
npm test
npm run dev
```

Open `/`, verify constellation animates and reacts to cursor. Toggle reduced motion in DevTools → verify fallback shows. Stop server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Constellation interactive hero with reduced-motion fallback"
```

---

## Task 14: SEO meta, favicon, public assets

**Files:**
- Create: `public/CNAME`, `public/favicon.svg`, `public/resume.pdf` (placeholder)
- Modify: `index.html`

- [ ] **Step 1: Create `public/CNAME` containing the custom domain**

File contents (single line, no trailing whitespace):
```
darrenchow.me
```

- [ ] **Step 2: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#1a1614"/>
  <text x="16" y="22" font-family="Georgia, serif" font-size="20" font-weight="600" fill="#f6f1e7" text-anchor="middle">d</text>
</svg>
```

- [ ] **Step 3: Create placeholder `public/resume.pdf`**

Run:
```bash
printf '%%PDF-1.1\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 0/Kids[]>>endobj trailer<</Root 1 0 R>>\n%%EOF\n' > public/resume.pdf
```

(User will replace with their real PDF later.)

- [ ] **Step 4: Update `index.html` head with full meta**

Replace the `<head>` contents with:
```html
<meta charset="UTF-8" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Darren Chow</title>
<meta name="description" content="Darren Chow — portfolio and notes." />
<meta property="og:title" content="Darren Chow" />
<meta property="og:description" content="Portfolio and notes." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://darrenchow.me" />
<meta name="twitter:card" content="summary" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- [ ] **Step 5: Verify build still works**

Run:
```bash
npm run build
```

Expected: `dist/CNAME`, `dist/favicon.svg`, `dist/resume.pdf` all present in build output.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add SEO meta, favicon, CNAME, and placeholder resume"
```

---

## Task 15: SPA routing fallback for GitHub Pages (404.html)

**Why:** GitHub Pages doesn't know about client-side routes. Without this, deep-linking to `/projects/foo` returns a real 404. The trick: ship a `404.html` that mirrors `index.html` so any unknown URL still loads the SPA, which then resolves the route client-side.

**Files:**
- Create: `scripts/copy-404.mjs`
- Modify: `package.json` (postbuild step), `index.html` (no changes needed if using simple copy)

- [ ] **Step 1: Create `scripts/copy-404.mjs`**

```js
import { copyFile } from "node:fs/promises";
await copyFile("dist/index.html", "dist/404.html");
console.log("copied dist/index.html → dist/404.html for SPA fallback");
```

- [ ] **Step 2: Add postbuild script in `package.json`**

In `"scripts"`, modify `build` and add `postbuild`:
```json
"build": "tsc -b && vite build",
"postbuild": "node scripts/copy-404.mjs"
```

(Keep the existing `tsc -b && vite build` value; only add `postbuild`.)

- [ ] **Step 3: Run build and verify**

Run:
```bash
npm run build
ls dist/404.html dist/index.html
```

Expected: both files exist and are identical.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add 404.html SPA fallback for GitHub Pages"
```

---

## Task 16: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "ci: add GitHub Pages deploy workflow"
```

---

## Task 17: Push to GitHub and configure Pages + custom domain

**Note:** This task includes user-facing manual steps for repo creation and DNS. The agent should run the `gh` and `git` commands; the DNS step is a clearly-flagged human action.

**Files:** none (only remote configuration)

- [ ] **Step 1: Verify gh auth**

Run:
```bash
gh auth status
```

Expected: logged in as `dcdj99`.

- [ ] **Step 2: Create the remote repo**

Run:
```bash
gh repo create dcdj99/dcdj99.github.io --public --description "Personal site — darrenchow.me" --source=. --remote=origin
```

If the repo already exists, instead run:
```bash
git remote add origin https://github.com/dcdj99/dcdj99.github.io.git
```

- [ ] **Step 3: Push main**

Run:
```bash
git push -u origin main
```

- [ ] **Step 4: Configure Pages source = GitHub Actions**

Run:
```bash
gh api -X POST repos/dcdj99/dcdj99.github.io/pages -f build_type=workflow || \
  gh api -X PUT repos/dcdj99/dcdj99.github.io/pages -f build_type=workflow
```

Expected: 201 or 204 — Pages enabled with Actions as source.

- [ ] **Step 5: Wait for the first deploy to complete**

Run:
```bash
gh run watch
```

Expected: deploy run finishes successfully. Site lands at `https://dcdj99.github.io` (and will move to `https://darrenchow.me` after DNS).

- [ ] **Step 6: Set the custom domain in Pages**

Run:
```bash
gh api -X PUT repos/dcdj99/dcdj99.github.io/pages -f cname=darrenchow.me
```

- [ ] **Step 7: USER ACTION — configure DNS at the domain registrar**

Stop and present these instructions to the user. The agent cannot do this for them.

> At your DNS provider for `darrenchow.me`, add these records:
>
> **Apex `darrenchow.me`** — four A records:
> ```
> 185.199.108.153
> 185.199.109.153
> 185.199.110.153
> 185.199.111.153
> ```
>
> **`www.darrenchow.me`** — one CNAME record:
> ```
> dcdj99.github.io
> ```
>
> Once propagated (usually 5–30 minutes), GitHub Pages will detect the domain and issue a TLS cert. Verify with:
> ```
> dig +short darrenchow.me
> ```

- [ ] **Step 8: After DNS propagates, enforce HTTPS**

Run:
```bash
gh api -X PUT repos/dcdj99/dcdj99.github.io/pages -f https_enforced=true
```

If this returns "HTTPS not yet provisioned", wait ~10 minutes and retry.

- [ ] **Step 9: Verify the live site**

Open `https://darrenchow.me` in the browser and confirm:
- Home page loads
- Navigating to `/projects`, `/about`, `/projects/sample-project` works
- Refreshing on `/projects` doesn't 404 (the 404.html fallback handles it)
- Theme toggle persists across reloads
- Constellation hero animates

- [ ] **Step 10: Commit (if any local changes from this task)**

If `git status` shows nothing, skip. Otherwise:
```bash
git add -A
git commit -m "chore: live deployment notes"
```

---

## Task 18: Optional follow-ups (do later, not part of v1)

These are intentionally not steps in this plan — they're noted for the user's awareness:

1. **Add real projects** — edit `src/data/projects.ts`.
2. **Replace `public/resume.pdf`** with the real résumé.
3. **Tune visual direction live** — accent color, serif font, hero density. Edit `tailwind.config.ts` and `src/index.css`.
4. **Add the second hero prototype (ink bleed)** — mirror the `Constellation.tsx` pattern, lazy-load it, and either swap or A/B with a state toggle in `InteractiveHero/index.tsx`.
5. **Decide media handling** — when project covers/videos start to bloat the repo, pick GitHub Releases or Cloudinary.
6. **Rename local folder** (optional cosmetic):
   ```bash
   mv /home/sutd-samp/Documents/github/profile /home/sutd-samp/Documents/github/dcdj99.github.io
   ```

---

## Self-review summary

- **Spec coverage:** every requirement in the spec maps to a task. Stack (T1-2, T16), routes (T7-11), visual direction base (T2, T12), interactive hero (T13), content model (T4), deployment (T15-17), accessibility (T5, T13), tests (T3-T11), performance (T13 lazy hero, T2 fonts).
- **Placeholder scan:** open-question items from the spec (final color, final font, exact email, social URLs) are seeded with sane defaults the user can edit; no "TBD" remains in the plan body.
- **Type consistency:** `Project` type defined once in T4, used by selectors (T4), `ProjectCard`/`Grid` (T8), `ProjectDetail` (T9), `Home` (T10). `Theme` type defined once in T5, consumed in `Header` (T6), `Constellation` (T13), `CustomCursor` (T12). Names stable across tasks.
- **Reasonable simplification beyond the spec:** only ONE interactive hero prototype (Constellation) is built per YAGNI; building the second is a flagged follow-up.
