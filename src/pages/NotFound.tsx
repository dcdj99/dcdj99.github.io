import { Link } from "react-router-dom";
import { ds } from "../lib/design";

export default function NotFound() {
  return (
    <section style={{ maxWidth: "640px", margin: "0 auto", padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,3rem)", textAlign: "center" }}>
      <p style={{ fontFamily: ds.mono, fontSize: "0.65rem", color: ds.sub, textTransform: "uppercase", letterSpacing: "0.16em", margin: 0 }}>404</p>
      <h1 style={{ fontFamily: ds.display, fontWeight: 800, fontSize: "clamp(2.4rem,5vw,4rem)", color: ds.text, letterSpacing: "-0.02em", margin: "1rem 0 0" }}>Page not found</h1>
      <p style={{ fontFamily: ds.body, color: ds.sub, lineHeight: 1.8, margin: "1rem auto 0", maxWidth: 420 }}>
        That route is outside the current flight path.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <Link to="/" style={{ fontFamily: ds.mono, fontSize: "0.75rem", color: ds.accent, textDecoration: "none", letterSpacing: "0.04em" }}>go home →</Link>
      </p>
    </section>
  );
}
