import { Link, NavLink } from "react-router-dom";
import { site } from "../data/site";
import { ds } from "../lib/design";

const NAV = [
  { to: "/projects", label: "work" },
  { to: "/about",    label: "about" },
];

export function Header() {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(5, 9, 16, 0.88)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      borderBottom: `1px solid ${ds.dim}`,
      padding: "0 clamp(1.5rem,5vw,3rem)",
      height: "52px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <Link
        to="/"
        style={{
          fontFamily: ds.display,
          fontSize: "0.78rem",
          fontWeight: 800,
          color: ds.text,
          textDecoration: "none",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {site.shortName} C.
      </Link>
      <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            style={({ isActive }) => ({
              fontFamily: ds.mono,
              fontSize: "0.6rem",
              letterSpacing: "0.04em",
              color: isActive ? ds.text : ds.sub,
              textDecoration: "none",
              transition: "color 0.15s",
            })}
          >
            {l.label}
          </NavLink>
        ))}
        <a
          href={`mailto:${site.email}`}
          style={{
            fontFamily: ds.mono,
            fontSize: "0.6rem",
            letterSpacing: "0.04em",
            color: ds.sub,
            textDecoration: "none",
          }}
        >
          contact
        </a>
      </nav>
    </header>
  );
}
