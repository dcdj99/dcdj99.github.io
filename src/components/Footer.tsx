import { site } from "../data/site";
import { ds } from "../lib/design";

export function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${ds.dim}`,
      padding: "2rem clamp(1.5rem,5vw,3rem)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "wrap" as const,
      gap: "1.5rem",
    }}>
      <div>
        <div style={{
          fontFamily: ds.display,
          fontSize: "clamp(1.5rem,3vw,2rem)",
          fontWeight: 900,
          color: ds.text,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          lineHeight: 0.9,
        }}>
          Let&rsquo;s
        </div>
        <div style={{
          fontFamily: ds.display,
          fontSize: "clamp(1.5rem,3vw,2rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: ds.accent,
          letterSpacing: "-0.03em",
          lineHeight: 0.9,
        }}>
          talk.
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div style={{
          fontFamily: ds.mono,
          fontSize: "0.55rem",
          color: ds.sub,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: "0.5rem",
        }}>
          Get in touch
        </div>
        <a
          href={`mailto:${site.email}`}
          style={{
            fontFamily: ds.mono,
            fontSize: "0.72rem",
            color: ds.text,
            textDecoration: "none",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          {site.email}
        </a>
        <div style={{ display: "flex", gap: "1.25rem", justifyContent: "flex-end" }}>
          {site.socials.github && (
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: ds.mono, fontSize: "0.55rem", color: ds.sub, textDecoration: "none", letterSpacing: "0.06em" }}
            >
              github
            </a>
          )}
          {site.socials.linkedin && (
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: ds.mono, fontSize: "0.55rem", color: ds.sub, textDecoration: "none", letterSpacing: "0.06em" }}
            >
              linkedin
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
