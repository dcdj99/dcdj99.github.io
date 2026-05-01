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
