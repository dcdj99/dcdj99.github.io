import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { about } from "../data/about";
import { site } from "../data/site";
import { ds } from "../lib/design";

function QrModal({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="QR code"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(5,9,16,0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "clamp(1rem, 3vw, 1.5rem)",
            borderRadius: "12px",
            lineHeight: 0,
          }}
        >
          <QRCodeSVG
            value={url}
            size={Math.min(360, Math.floor(window.innerWidth * 0.7))}
            level="M"
            bgColor="#ffffff"
            fgColor="#050910"
          />
        </div>
        <div
          style={{
            fontFamily: ds.mono,
            fontSize: "0.78rem",
            color: ds.sub,
            letterSpacing: ".06em",
          }}
        >
          {url}
        </div>
        <button
          onClick={onClose}
          style={{
            fontFamily: ds.mono,
            fontSize: "0.7rem",
            color: ds.sub,
            textTransform: "uppercase",
            letterSpacing: ".2em",
            background: "transparent",
            border: `1px solid ${ds.dim}`,
            borderRadius: "6px",
            padding: "0.55rem 1.1rem",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function BusinessCard() {
  const links = [
    { label: site.email, href: `mailto:${site.email}` },
    { label: `github.com/${site.handle}`, href: site.socials.github },
    { label: "linkedin.com/in/darrenchowdejian", href: site.socials.linkedin },
  ];

  const aboutUrl = `https://${site.domain}/about`;
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <div style={{ maxWidth: 560, margin: "0 auto 4rem" }}>
      <article
        className="business-card-face"
        aria-label="Business card"
        style={{
          position: "relative",
          border: `1px solid ${ds.dim}`,
          borderRadius: "12px",
          padding: "clamp(1.75rem, 4vw, 2.5rem)",
          background: `
            radial-gradient(120% 100% at 100% 0%, rgba(111,162,255,0.06), transparent 55%),
            linear-gradient(180deg, ${ds.surface} 0%, #060c17 100%)
          `,
          boxShadow:
            "0 30px 60px -32px rgba(0,0,0,0.75), 0 1px 0 rgba(255,255,255,0.04) inset",
          overflow: "hidden",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "1.5rem",
            right: "1.5rem",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${ds.accent}66, transparent)`,
          }}
        />

        <div
          className="card-identity"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "clamp(1.25rem, 3vw, 1.75rem)",
            alignItems: "center",
          }}
        >
          <img
            src="/darren.jpg"
            alt="Darren Chow"
            loading="lazy"
            style={{
              width: "clamp(84px, 11vw, 104px)",
              height: "clamp(84px, 11vw, 104px)",
              borderRadius: "50%",
              objectFit: "cover",
              border: `1px solid ${ds.dim}`,
              flexShrink: 0,
              display: "block",
            }}
          />

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: ds.display,
                fontWeight: 500,
                fontSize: "clamp(1.6rem, 3.4vw, 2.1rem)",
                color: ds.text,
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              {about.card.name}
            </div>
            <div
              style={{
                fontFamily: ds.body,
                fontWeight: 400,
                fontSize: "1rem",
                color: ds.text,
                opacity: 0.88,
                marginBottom: "0.3rem",
              }}
            >
              {about.card.roles.join(" · ")}
            </div>
            <div
              style={{
                fontFamily: ds.body,
                fontWeight: 400,
                fontSize: "0.9rem",
                color: ds.sub,
              }}
            >
              {about.card.location}
            </div>
          </div>
        </div>

        <hr
          style={{
            border: 0,
            borderTop: `1px solid ${ds.dim}`,
            margin: "1.75rem 0 1.5rem",
          }}
        />

        <ul
          className="card-contact"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
          }}
        >
          {links.map(l => (
            <li key={l.label} style={{ minWidth: 0 }}>
              <a
                href={l.href}
                target={l.href?.startsWith("http") ? "_blank" : undefined}
                rel={l.href?.startsWith("http") ? "noreferrer" : undefined}
                style={{
                  fontFamily: ds.body,
                  fontSize: "0.95rem",
                  color: ds.text,
                  textDecoration: "none",
                  display: "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </article>

      <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          className="qr-button"
          style={{
            fontFamily: ds.mono,
            fontSize: "0.68rem",
            color: ds.sub,
            textTransform: "uppercase",
            letterSpacing: ".2em",
            background: "transparent",
            border: `1px solid ${ds.dim}`,
            borderRadius: "6px",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
          }}
        >
          Show QR
        </button>
      </div>

      {qrOpen && <QrModal url={aboutUrl} onClose={() => setQrOpen(false)} />}
    </div>
  );
}

function QuickInfo() {
  return (
    <section style={{ marginBottom: "4rem" }}>
      <div
        style={{
          fontFamily: ds.mono,
          fontSize: "0.62rem",
          color: ds.sub,
          textTransform: "uppercase",
          letterSpacing: ".18em",
          marginBottom: "1.5rem",
        }}
      >
        Quick info
      </div>

      <dl style={{ margin: 0, padding: 0 }}>
        {about.quick.map(row => (
          <div
            key={row.label}
            className="quick-row"
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "1.5rem",
              padding: "1rem 0",
              borderTop: `1px solid ${ds.dim}`,
            }}
          >
            <dt
              style={{
                fontFamily: ds.mono,
                fontSize: "0.66rem",
                color: ds.sub,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                paddingTop: "0.15rem",
              }}
            >
              {row.label}
            </dt>
            <dd
              style={{
                fontFamily: ds.body,
                fontWeight: 300,
                fontSize: "0.95rem",
                color: ds.text,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {row.value}
            </dd>
          </div>
        ))}

        <div
          className="quick-row"
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr",
            gap: "1.5rem",
            padding: "1rem 0",
            borderTop: `1px solid ${ds.dim}`,
            borderBottom: `1px solid ${ds.dim}`,
          }}
        >
          <dt
            style={{
              fontFamily: ds.mono,
              fontSize: "0.66rem",
              color: ds.sub,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              paddingTop: "0.15rem",
            }}
          >
            Stack
          </dt>
          <dd style={{ margin: 0 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {about.skills.map(g => (
                <div key={g.group}>
                  <div
                    style={{
                      fontFamily: ds.mono,
                      fontSize: "0.58rem",
                      color: ds.sub,
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {g.group}
                  </div>
                  <div
                    style={{
                      fontFamily: ds.body,
                      fontWeight: 300,
                      fontSize: "0.85rem",
                      color: ds.text,
                      lineHeight: 1.6,
                    }}
                  >
                    {g.items.join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </dd>
        </div>
      </dl>
    </section>
  );
}

function Intro() {
  return (
    <section>
      <div
        style={{
          fontFamily: ds.mono,
          fontSize: "0.62rem",
          color: ds.sub,
          textTransform: "uppercase",
          letterSpacing: ".18em",
          marginBottom: "1.5rem",
        }}
      >
        Intro
      </div>
      <p
        style={{
          fontFamily: ds.body,
          fontWeight: 300,
          fontSize: "1.05rem",
          color: ds.text,
          lineHeight: 1.85,
          margin: "0 0 1.25rem",
        }}
      >
        {about.intro}
      </p>
      {about.paragraphs.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: ds.body,
            fontWeight: 300,
            fontSize: "1rem",
            color: ds.sub,
            lineHeight: 1.85,
            margin: "0 0 1.25rem",
          }}
        >
          {p}
        </p>
      ))}
    </section>
  );
}

export default function About() {
  return (
    <div
      style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,3rem)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h1
        style={{
          fontFamily: ds.display,
          fontWeight: 400,
          fontSize: "clamp(2.5rem,5vw,4rem)",
          color: ds.text,
          margin: "0 0 2rem",
          letterSpacing: "-.025em",
        }}
      >
        About
      </h1>

      <BusinessCard />
      <QuickInfo />
      <Intro />
    </div>
  );
}
