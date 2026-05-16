import { about } from "../data/about";
import { site } from "../data/site";
import { ds } from "../lib/design";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="section-row" style={{ paddingTop: "2.5rem", borderTop: `1px solid ${ds.dim}`, marginBottom: "0" }}>
      <span style={{ fontFamily: ds.mono, fontSize: "0.62rem", color: ds.sub, textTransform: "uppercase", letterSpacing: ".1em", paddingTop: "0.1rem" }}>
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}

export default function About() {
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,3rem)", display: "flex", flexDirection: "column", gap: 0, position: "relative", zIndex: 1 }}>

      <h1 style={{ fontFamily: ds.display, fontWeight: 400, fontSize: "clamp(2.5rem,5vw,4rem)", color: ds.text, margin: "0 0 3rem", letterSpacing: "-.025em" }}>
        About
      </h1>

      <Row label="Who">
        <p style={{ fontFamily: ds.body, fontWeight: 300, fontSize: "1rem", color: ds.text, lineHeight: 1.9, margin: "0 0 1rem" }}>
          {about.intro}
        </p>
        {about.paragraphs.map((p, i) => (
          <p key={i} style={{ fontFamily: ds.body, fontWeight: 300, fontSize: "1rem", color: ds.sub, lineHeight: 1.9, margin: "0 0 1rem" }}>
            {p}
          </p>
        ))}
      </Row>

      <Row label="Stack">
        <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1.5rem", margin: 0 }}>
          {about.skills.map(g => (
            <div key={g.group}>
              <dt style={{ fontFamily: ds.mono, fontSize: "0.6rem", color: ds.sub, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "0.4rem" }}>
                {g.group}
              </dt>
              <dd style={{ fontFamily: ds.body, fontWeight: 300, fontSize: "0.88rem", color: ds.text, lineHeight: 1.65, margin: 0 }}>
                {g.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row label="Contact">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <a href={`mailto:${site.email}`} style={{ fontFamily: ds.mono, fontSize: "0.78rem", color: ds.accent, textDecoration: "none", letterSpacing: ".04em" }}>
            {site.email} →
          </a>
          {site.socials.github && (
            <a href={site.socials.github} target="_blank" rel="noreferrer" style={{ fontFamily: ds.mono, fontSize: "0.78rem", color: ds.sub, textDecoration: "none", letterSpacing: ".04em" }}>
              github.com/{site.handle} →
            </a>
          )}
          <a href="/resume.pdf" style={{ fontFamily: ds.mono, fontSize: "0.78rem", color: ds.sub, textDecoration: "none", letterSpacing: ".04em" }}>
            Resume (PDF) →
          </a>
        </div>
      </Row>

    </div>
  );
}
