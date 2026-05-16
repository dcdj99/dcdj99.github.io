import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { site } from "../data/site";
import { ds } from "../lib/design";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_TOTAL = 5800;

type StarDatum = {
  x: number;
  y: number;
  size: number;
  opacity: number;
};

type Destination = {
  id: string;
  number: string;
  label: string;
  title: string;
  body: string;
  current?: string;
  details: string[];
  href: string;
  cta: string;
  color: string;
  dark: string;
  x: number;
  top: number;
  size: number;
  side: "left" | "right";
  copyStart: number;
  copyEnd: number;
};

const DESTINATIONS: Destination[] = [
  {
    id: "education",
    number: "01",
    label: "Education",
    title: "Engineering Product Development",
    body: "Bachelor of Engineering at SUTD, 2020–2024. Minors in Computer Science and Design, Technology & Society. Exchanges at UCLA and Aalto.",
    details: ["SUTD 2020–2024", "BEng (EPD)", "Computer Science minor", "DTS minor", "UCLA exchange", "Aalto exchange"],
    href: "/about",
    cta: "More about me →",
    color: "#67a3ff",
    dark: "#071733",
    x: 10,
    top: -70,
    size: 230,
    side: "left",
    copyStart: 900,
    copyEnd: 2000,
  },
  {
    id: "experience",
    number: "02",
    label: "Experience",
    title: "Building Spectrea",
    body: "Co-founding Spectrea — a composable knowledge platform for business teams. With prior startup experience.",
    details: ["Spectrea (Matchwise)", "Co-founder", "Knowledge platform", "Prior startup experience"],
    href: "/about",
    cta: "See more →",
    color: "#9b7cff",
    dark: "#130833",
    x: -9,
    top: -235,
    size: 250,
    side: "right",
    copyStart: 2350,
    copyEnd: 3450,
  },
  {
    id: "projects",
    number: "03",
    label: "Projects",
    title: "From the workshop",
    body: "Shipped products. Half-finished experiments. A few things I built just because.",
    details: ["Startup", "AI · Computer vision", "Mobile apps", "Robotics", "Space tech"],
    href: "/projects",
    cta: "Open the gallery →",
    color: "#ff7a4d",
    dark: "#2a0b05",
    x: 9,
    top: -400,
    size: 240,
    side: "left",
    copyStart: 3800,
    copyEnd: 4900,
  },
];

function makeStars(count: number, depth: 0 | 1 | 2): StarDatum[] {
  const minS = [0.25, 0.45, 0.8][depth];
  const maxS = [0.75, 1.35, 2.6][depth];

  return Array.from({ length: count }, (_, i) => {
    const t = i * (depth * 4.17 + 8.131);
    return {
      x: Math.sin(t) * 0.5 + 0.5,
      y: Math.cos(t * 1.29) * 0.5 + 0.5,
      size: minS + Math.abs(Math.sin(t * 2.43)) * (maxS - minS),
      opacity: 0.2 + Math.abs(Math.cos(t * 1.81)) * 0.7,
    };
  });
}

const STAR_DATA: [StarDatum[], StarDatum[], StarDatum[]] = [
  makeStars(190, 0),
  makeStars(140, 1),
  makeStars(80, 2),
];

function StarCanvas({ depth }: { depth: 0 | 1 | 2 }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const cls = ["stars-deep", "stars-mid", "stars-near"][depth];

  useLayoutEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const draw = () => {
      if (/jsdom/i.test(window.navigator.userAgent)) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = window.innerWidth;
      const H = Math.round(window.innerHeight * 2.2);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      if (depth === 0) {
        const nebula = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, W * 0.75);
        nebula.addColorStop(0, "rgba(67, 112, 255, 0.12)");
        nebula.addColorStop(0.45, "rgba(88, 43, 180, 0.055)");
        nebula.addColorStop(1, "rgba(2, 6, 16, 0)");
        ctx.fillStyle = nebula;
        ctx.fillRect(0, 0, W, H);
      }

      STAR_DATA[depth].forEach((s) => {
        const x = s.x * W;
        const y = s.y * H;
        const r = s.size;

        if (depth > 0 && r > 1.05) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
          glow.addColorStop(0, `rgba(205, 226, 255, ${s.opacity * 0.48})`);
          glow.addColorStop(1, "rgba(205, 226, 255, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, r * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [depth]);

  return <canvas ref={ref} className={cls} aria-hidden style={{ position: "absolute", top: "-42%", left: 0 }} />;
}

function Rocket() {
  return (
    <div className="rocket" aria-hidden>
      <div className="rocket-shell">
        <svg width="52" height="128" viewBox="0 0 52 128" fill="none">
          <defs>
            <linearGradient id="rocket-body" x1="4" x2="48" y1="0" y2="0">
              <stop offset="0%" stopColor="#8fa7c1" />
              <stop offset="46%" stopColor="#f3f8ff" />
              <stop offset="100%" stopColor="#748daa" />
            </linearGradient>
            <radialGradient id="rocket-window" cx="36%" cy="30%" r="68%">
              <stop offset="0%" stopColor="#dbfcff" />
              <stop offset="100%" stopColor="#1f6ed8" />
            </radialGradient>
            <linearGradient id="rocket-flame" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="28%" stopColor="#ffe28a" />
              <stop offset="62%" stopColor="#ff8a2a" />
              <stop offset="100%" stopColor="#ff3d00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M26 2C34.5 15 38 34 38 68H14C14 34 17.5 15 26 2Z" fill="url(#rocket-body)" stroke="#b7cee4" strokeWidth="0.7" />
          <rect x="15" y="64" width="22" height="32" rx="4" fill="url(#rocket-body)" stroke="#8fa9c4" strokeWidth="0.7" />
          <circle cx="26" cy="42" r="9.5" fill="url(#rocket-window)" stroke="#82c7ff" strokeWidth="1" />
          <circle cx="26" cy="44" r="4" fill="#f2bd8a" />
          <circle cx="24.2" cy="43.25" r="0.5" fill="#4a2e19" />
          <circle cx="27.8" cy="43.25" r="0.5" fill="#4a2e19" />
          <path d="M13.8 71L4 99L17 91Z" fill="#7898b8" stroke="#6e8daa" strokeWidth="0.7" />
          <path d="M38.2 71L48 99L35 91Z" fill="#7898b8" stroke="#6e8daa" strokeWidth="0.7" />
          <rect x="19" y="95" width="14" height="11" rx="3" fill="#35465e" />
          <path className="flame" d="M20.5 104Q26 132 23.8 162Q26 144 28.2 162Q26 132 31.5 104Z" fill="url(#rocket-flame)" />
        </svg>
      </div>
    </div>
  );
}

function Planet({ destination }: { destination: Destination }) {
  return (
    <div
      className={`planet planet-${destination.id}`}
      style={{
        "--x": destination.x,
        "--top": destination.top,
        "--size": `${destination.size}px`,
        "--color": destination.color,
        "--dark": destination.dark,
      } as CSSProperties}
    >
      <div className="planet-glow" />
      <div className="planet-ring planet-ring-back" />
      <div className="planet-body">
        <div className="planet-specular" />
        <div className="planet-shade" />
        <div className="planet-surface planet-surface-a" />
        <div className="planet-surface planet-surface-b" />
        <div className="planet-detail planet-detail-a" />
        <div className="planet-detail planet-detail-b" />
      </div>
      <div className="planet-ring planet-ring-front" />
      <div className="planet-moon planet-moon-a" />
      <div className="planet-moon planet-moon-b" />
    </div>
  );
}

function ChapterCopy({ destination }: { destination: Destination }) {
  return (
    <article className={`copy copy-${destination.id} copy-${destination.side}`}>
      <div className="copy-kicker">{destination.number} / {destination.label}</div>
      <h2>{destination.title}</h2>
      <p>{destination.body}</p>
      {destination.current && <p className="copy-current">{destination.current}</p>}
      <div className="copy-details">
        {destination.details.map((detail) => (
          <span key={detail}>{detail}</span>
        ))}
      </div>
      <Link className="copy-link" to={destination.href}>{destination.cta}</Link>
    </article>
  );
}

function StaticHome() {
  return (
    <div className="static-home">
      <nav className="static-nav" aria-label="Primary">
        <Link to="/" className="static-brand">Darren Chow</Link>
        <div>
          <Link to="/projects">work</Link>
          <Link to="/about">about</Link>
          <a href={`mailto:${site.email}`}>contact</a>
        </div>
      </nav>

      <main className="static-main">
        <header className="static-hero">
          <div className="kicker">Singapore · builder · co-founder</div>
          <h1>Hi, I&apos;m <span>Darren.</span></h1>
          <p>Builder. Co-founder. Currently building knowledge-graph AI.</p>
        </header>

        {DESTINATIONS.map((d) => (
          <section key={d.id} className="static-chapter" aria-labelledby={`static-${d.id}`}>
            <div className="kicker">{d.number} / {d.label}</div>
            <h2 id={`static-${d.id}`}>{d.title}</h2>
            <p>{d.body}</p>
            {d.current && <p className="static-current">{d.current}</p>}
            <div className="static-details">
              {d.details.map((x) => <span key={x}>{x}</span>)}
            </div>
            <Link className="static-cta" to={d.href}>{d.cta}</Link>
          </section>
        ))}

        <section className="static-contact" aria-label="Contact Darren">
          <div className="kicker">Final destination · {site.location}</div>
          <h2>Let&apos;s <span>connect.</span></h2>
          <p>Building something? Hiring? Want to trade notes?</p>
          <div className="static-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.socials.github && <a href={site.socials.github} target="_blank" rel="noreferrer">github</a>}
            {site.socials.linkedin && <a href={site.socials.linkedin} target="_blank" rel="noreferrer">linkedin</a>}
          </div>
        </section>
      </main>

      <style>{`
        .static-home {
          min-height: 100vh;
          background: linear-gradient(180deg, #02040a 0%, #050914 48%, #02040a 100%);
          color: ${ds.text};
        }

        .static-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          padding: 0 clamp(1.25rem, 5vw, 3rem);
          background: rgba(2, 4, 10, 0.82);
          backdrop-filter: blur(8px);
        }

        .static-nav a {
          font-family: ${ds.mono};
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #91a8ce;
          text-decoration: none;
          padding: 0.6rem 0.2rem;
        }

        .static-nav .static-brand {
          color: #f4f8ff;
        }

        .static-nav div {
          display: flex;
          gap: clamp(1rem, 3vw, 2rem);
        }

        .static-main {
          max-width: 720px;
          margin: 0 auto;
          padding: clamp(2.5rem, 8vw, 4.5rem) clamp(1.25rem, 5vw, 3rem) 4rem;
          display: flex;
          flex-direction: column;
          gap: clamp(3rem, 8vw, 5rem);
        }

        .static-hero h1 {
          margin: 0.75rem 0 1rem;
          font-family: ${ds.display};
          font-size: clamp(3rem, 10vw, 5.5rem);
          line-height: 0.9;
          color: #f4f8ff;
        }

        .static-hero h1 span {
          display: block;
          color: #78a8ff;
          font-weight: 300;
          font-style: italic;
        }

        .static-chapter h2,
        .static-contact h2 {
          margin: 0.75rem 0 1rem;
          font-family: ${ds.display};
          font-size: clamp(2rem, 5.6vw, 3rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          font-weight: 600;
          color: #f7faff;
        }

        .static-contact h2 span {
          display: block;
          color: #78a8ff;
          font-weight: 300;
          font-style: italic;
          text-transform: none;
        }

        .static-home p {
          font-family: ${ds.body};
          font-size: clamp(0.96rem, 1.5vw, 1.08rem);
          line-height: 1.75;
          color: #bdcbe4;
          margin: 0;
        }

        .static-current {
          margin-top: 0.6rem !important;
          color: #d5e0f3 !important;
        }

        .static-home .kicker {
          font-family: ${ds.mono};
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #7f96bd;
        }

        .static-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 1.1rem;
        }

        .static-details span {
          font-family: ${ds.mono};
          font-size: 0.72rem;
          letter-spacing: 0.02em;
          color: #b3c6e6;
          border-top: 1px solid rgba(120, 168, 255, 0.22);
          padding-top: 0.5rem;
        }

        .static-cta {
          display: inline-flex;
          margin-top: 1.35rem;
          padding: 0.5rem 0;
          font-family: ${ds.mono};
          font-size: 0.84rem;
          letter-spacing: 0.01em;
          color: #dbe8ff;
          text-decoration: none;
          border-bottom: 1px solid rgba(120, 168, 255, 0.5);
        }

        .static-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem 1.4rem;
          margin-top: 1.25rem;
        }

        .static-links a {
          font-family: ${ds.mono};
          font-size: 0.84rem;
          letter-spacing: 0.01em;
          color: #dbe8ff;
          text-decoration: none;
          padding: 0.55rem 0;
          border-bottom: 1px solid rgba(120, 168, 255, 0.4);
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const outerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const [reduceMotion] = useState(() =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const outer = outerRef.current;
    const scene = sceneRef.current;
    if (!outer || !scene || typeof ResizeObserver === "undefined") return;

    const isTouch =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;

    const lenis = isTouch ? null : new Lenis({ lerp: 0.09, wheelMultiplier: 0.85 });
    let tick: ((time: number) => void) | null = null;
    if (lenis) {
      tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const trigger = (extra: ScrollTrigger.Vars) => ({ trigger: outer, start: "top top", ...extra });

    const ctx = gsap.context(() => {
      gsap.set(".copy", { autoAlpha: 0, yPercent: -50, y: 18 });
      gsap.set(".final-copy", { autoAlpha: 0, xPercent: -50, yPercent: -50, y: 18 });
      gsap.set(".flame", { transformOrigin: "50% 0%", scaleY: 0, autoAlpha: 0 });
      gsap.set(".lower-layer", { y: 0, autoAlpha: 1 });
      gsap.set(".rocket", { xPercent: -50, x: 0, y: 0, scale: 1.7, rotate: 0, transformOrigin: "50% 82%" });
      gsap.set(".rocket-shell", { x: 0, y: 0, rotate: 0, transformOrigin: "50% 62%" });

      gsap.to(".space-track", {
        y: "570vh",
        ease: "none",
        scrollTrigger: trigger({ end: `+=${SCROLL_TOTAL}`, scrub: true }),
      });

      if (!isTouch) {
        ScrollTrigger.create({
          ...trigger({ end: `+=${SCROLL_TOTAL}` }),
          snap: {
            snapTo: (value) => {
              const points = [0, 0.25, 0.5, 0.75, 1.0];
              const restRadius = 0.045;
              for (const p of points) {
                if (Math.abs(value - p) <= restRadius) return value;
              }
              return points.reduce((a, b) =>
                Math.abs(b - value) < Math.abs(a - value) ? b : a
              );
            },
            duration: { min: 0.3, max: 0.6 },
            ease: "power2.inOut",
            delay: 0.1,
          },
        });
      }

      gsap.fromTo(".lower-layer", {
        y: 0,
        autoAlpha: 1,
      }, {
        y: "160vh",
        autoAlpha: 1,
        ease: "power1.in",
        scrollTrigger: trigger({ start: "top top", end: "+=1400", scrub: 1.1 }),
      });

      gsap.to(".intro", {
        autoAlpha: 0,
        y: -50,
        ease: "none",
        scrollTrigger: trigger({ end: "+=720", scrub: 1 }),
      });

      gsap.to(".stars-deep", { y: "18vh", ease: "none", scrollTrigger: trigger({ end: `+=${SCROLL_TOTAL}`, scrub: true }) });
      gsap.to(".stars-mid", { y: "44vh", ease: "none", scrollTrigger: trigger({ end: `+=${SCROLL_TOTAL}`, scrub: true }) });
      gsap.to(".stars-near", { y: "82vh", ease: "none", scrollTrigger: trigger({ end: `+=${SCROLL_TOTAL}`, scrub: true }) });

      const rocketPath = gsap.timeline({
        scrollTrigger: trigger({ end: `+=${SCROLL_TOTAL}`, scrub: 1.4 }),
      });
      const t = (value: number) => value / SCROLL_TOTAL;
      rocketPath
        .to(".rocket", { xPercent: -50, x: "0.8vw", y: "-24vh", rotate: 1.2, scale: 1.18, duration: t(850), ease: "power2.out" }, t(160))
        .to(".rocket", { xPercent: -50, x: "4vw", y: "-34vh", rotate: 4.2, scale: 0.72, duration: t(1200), ease: "sine.inOut" }, t(1050))
        .to(".rocket", { xPercent: -50, x: "-4vw", y: "-25vh", rotate: -4, scale: 0.62, duration: t(1450), ease: "sine.inOut" }, t(2300))
        .to(".rocket", { xPercent: -50, x: "4vw", y: "-31vh", rotate: 3.7, scale: 0.64, duration: t(1400), ease: "sine.inOut" }, t(3850))
        .to(".rocket", { xPercent: -50, x: "0vw", y: "-9vh", rotate: 0, scale: 1.45, duration: t(950), ease: "power2.inOut" }, t(5100));

      const rocketDrift = gsap.to(".rocket-shell", {
        x: 1.2,
        y: -7,
        rotate: 0.55,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        paused: true,
      });

      ScrollTrigger.create({
        ...trigger({ start: "+=720", end: "+=1100" }),
        onEnter: () => rocketDrift.play(),
        onLeaveBack: () => rocketDrift.pause(0),
      });

      gsap.fromTo(".flame", {
        scaleY: 0,
        autoAlpha: 0,
      }, {
        scaleY: 1,
        autoAlpha: 1,
        ease: "power1.inOut",
        scrollTrigger: trigger({ start: "+=180", end: "+=820", scrub: 1 }),
      });

      DESTINATIONS.forEach((destination) => {
        gsap.fromTo(`.planet-${destination.id}`, {
          scale: 0.62,
          opacity: 0.34,
          filter: "blur(2px)",
        }, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "sine.inOut",
          immediateRender: false,
          scrollTrigger: trigger({
            start: `+=${destination.copyStart - 650}`,
            end: "+=800",
            scrub: 1,
            invalidateOnRefresh: true,
          }),
        });

        gsap.fromTo(`.planet-${destination.id}`, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        }, {
          scale: 0.72,
          opacity: 0.2,
          filter: "blur(2px)",
          ease: "sine.inOut",
          immediateRender: false,
          scrollTrigger: trigger({
            start: `+=${destination.copyEnd - 100}`,
            end: "+=750",
            scrub: 1,
            invalidateOnRefresh: true,
          }),
        });

        const copyTimeline = gsap.timeline({
          scrollTrigger: trigger({
            start: `+=${destination.copyStart}`,
            end: `+=${destination.copyEnd - destination.copyStart + 200}`,
            scrub: 0.9,
          }),
        });

        copyTimeline
          .fromTo(`.copy-${destination.id}`, {
            autoAlpha: 0,
            yPercent: -50,
            y: 18,
          }, {
            autoAlpha: 1,
            yPercent: -50,
            y: 0,
            duration: 0.22,
            ease: "power2.out",
          })
          .to(`.copy-${destination.id}`, {
            autoAlpha: 1,
            yPercent: -50,
            y: 0,
            duration: 0.56,
            ease: "none",
          })
          .to(`.copy-${destination.id}`, {
            autoAlpha: 0,
            yPercent: -50,
            y: -10,
            duration: 0.22,
            ease: "power1.inOut",
          });
      });

      gsap.fromTo(".final-copy", {
        autoAlpha: 0,
        xPercent: -50,
        yPercent: -50,
        y: 18,
      }, {
        autoAlpha: 1,
        xPercent: -50,
        yPercent: -50,
        y: 0,
        ease: "power2.out",
        scrollTrigger: trigger({ start: "+=5200", end: "+=500", scrub: 0.8 }),
      });
    }, scene);

    return () => {
      ctx.revert();
      if (lenis) {
        lenis.destroy();
        if (tick) gsap.ticker.remove(tick);
      }
    };
  }, [reduceMotion]);

  if (reduceMotion) return <StaticHome />;

  return (
    <div ref={outerRef} className="journey">
      <main ref={sceneRef} className="scene">
        <div className="stars" aria-hidden>
          <StarCanvas depth={0} />
          <StarCanvas depth={1} />
          <StarCanvas depth={2} />
        </div>

        <div className="lower-layer" aria-hidden>
          <div className="atmosphere" />
          <div className="launch-pad">
            <div className="pad" />
            <div className="earth" />
          </div>
        </div>

        <nav className="nav" aria-label="Primary">
          <Link to="/">Darren Chow</Link>
          <div>
            <Link to="/projects">work</Link>
            <Link to="/about">about</Link>
            <a href={`mailto:${site.email}`}>contact</a>
          </div>
        </nav>

        <section className="intro" aria-labelledby="home-title">
          <div className="kicker">Singapore · engineer · co-founder</div>
          <h1 id="home-title">
            Hi, I&apos;m
            <span>Darren.</span>
          </h1>
          <p>
            Engineer and co-founder. Software, AI, and the hardware in between.
          </p>
          <div className="scroll-hint">Scroll to launch ↓</div>
        </section>

        <div className="space-track" aria-hidden>
          {DESTINATIONS.map((destination) => (
            <Planet key={destination.id} destination={destination} />
          ))}
          <div className="dock" />
        </div>

        {DESTINATIONS.map((destination) => (
          <ChapterCopy key={destination.id} destination={destination} />
        ))}

        <section className="final-copy" aria-label="Contact Darren">
          <div className="kicker">Final destination · {site.location}</div>
          <h2>
            Let&apos;s
            <span>connect.</span>
          </h2>
          <p>Building something? Hiring? Want to trade notes?</p>
          <div className="final-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.socials.github && <a href={site.socials.github} target="_blank" rel="noreferrer">github</a>}
            {site.socials.linkedin && <a href={site.socials.linkedin} target="_blank" rel="noreferrer">linkedin</a>}
          </div>
        </section>

        <Rocket />

      </main>

      <style>{`
        .journey {
          height: calc(100vh + ${SCROLL_TOTAL}px);
          background: #02040a;
        }

        .scene {
          position: fixed;
          inset: 0;
          overflow: hidden;
          color: ${ds.text};
          background:
            radial-gradient(circle at 50% 42%, rgba(44, 75, 145, 0.15), transparent 46%),
            linear-gradient(180deg, #02040a 0%, #050914 48%, #02040a 100%);
        }

        .scene::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.7);
        }

        .stars,
        .space-track,
        .lower-layer,
        .atmosphere,
        .launch-pad {
          position: absolute;
          inset: 0;
        }

        .stars {
          z-index: 1;
          overflow: hidden;
        }

        .lower-layer {
          z-index: 4;
          will-change: transform;
        }

        .atmosphere {
          background:
            radial-gradient(ellipse at 50% 88%, rgba(132, 202, 255, 0.28), transparent 42%),
            linear-gradient(180deg, transparent 54%, rgba(16, 68, 122, 0.36) 76%, rgba(5, 15, 30, 0.88));
        }

        .nav {
          position: absolute;
          inset: 0 0 auto;
          z-index: 70;
          height: 72px;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(180deg, rgba(2, 4, 10, 0.78), rgba(2, 4, 10, 0));
        }

        .nav a {
          font-family: ${ds.mono};
          font-size: 0.74rem;
          color: #dbe8ff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
        }

        .nav div {
          display: flex;
          gap: clamp(1rem, 2.4vw, 2rem);
        }

        .nav div a {
          color: #91a8ce;
        }

        .intro,
        .copy,
        .final-copy {
          position: absolute;
          z-index: 25;
        }

        .intro,
        .copy {
          pointer-events: none;
        }

        .intro {
          left: clamp(1.5rem, 8vw, 6rem);
          top: 45%;
          width: min(560px, 82vw);
          transform: translateY(-50%);
        }

        .kicker,
        .copy-kicker,
        .scroll-hint {
          font-family: ${ds.mono};
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #7f96bd;
          font-size: 0.7rem;
        }

        .intro h1,
        .final-copy h2 {
          margin: 0.85rem 0 0;
          font-family: ${ds.display};
          font-size: clamp(3.1rem, 8vw, 7rem);
          line-height: 0.84;
          letter-spacing: 0;
          color: #f4f8ff;
        }

        .final-copy h2 {
          letter-spacing: -0.01em;
        }

        .intro h1 span,
        .final-copy h2 span {
          display: block;
          color: #78a8ff;
          font-weight: 300;
          font-style: italic;
        }

        .intro p,
        .copy p,
        .final-copy p {
          max-width: 480px;
          margin: 1.2rem 0 0;
          font-family: ${ds.body};
          font-size: clamp(0.96rem, 1.3vw, 1.08rem);
          line-height: 1.75;
          color: #bdcbe4;
        }

        .copy-current {
          color: #d5e0f3 !important;
        }

        .scroll-hint {
          margin-top: 1.35rem;
          color: #5f769f;
        }

        .space-track {
          z-index: 12;
          will-change: transform;
        }

        .planet {
          position: absolute;
          left: calc(50% + (var(--x) * 1vw));
          top: calc(var(--top) * 1vh);
          width: clamp(140px, 30vmin, 440px);
          height: clamp(140px, 30vmin, 440px);
          transform: translate(-50%, -50%);
          opacity: 0.34;
          will-change: transform, opacity, filter;
          isolation: isolate;
        }

        .planet-glow,
        .planet-body,
        .planet-ring,
        .planet-moon {
          position: absolute;
        }

        .planet-glow {
          inset: -35%;
          background: radial-gradient(circle, color-mix(in srgb, var(--color), transparent 60%), transparent 68%);
          filter: blur(8px);
          z-index: 1;
        }

        .planet-body {
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 35% 28%, color-mix(in srgb, var(--color), #bcd8ff 26%), var(--dark) 58%, #02040a 100%);
          box-shadow:
            0 0 80px color-mix(in srgb, var(--color), transparent 55%),
            inset -42px -34px 76px rgba(0, 0, 18, 0.9);
          z-index: 3;
        }

        .planet-specular,
        .planet-shade,
        .planet-surface,
        .planet-detail {
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }

        .planet-specular {
          background: radial-gradient(circle at 31% 24%, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0) 22%);
          z-index: 2;
        }

        .planet-shade {
          background: radial-gradient(ellipse at 74% 78%, rgba(2, 5, 16, 0.75), rgba(2, 5, 16, 0) 45%);
          z-index: 5;
        }

        .planet-surface {
          z-index: 3;
          mix-blend-mode: screen;
          opacity: 0.45;
        }

        .planet-detail {
          z-index: 4;
          opacity: 0.65;
        }

        .planet-ring {
          left: 50%;
          top: 50%;
          width: 145%;
          height: 33%;
          border-radius: 50%;
          transform: translate(-50%, -50%) rotate(-14deg);
          border: 1px solid rgba(202, 228, 255, 0.36);
          box-shadow: 0 0 20px rgba(150, 190, 255, 0.25);
          display: none;
          pointer-events: none;
        }

        .planet-ring-back {
          z-index: 2;
          opacity: 0.45;
        }

        .planet-ring-front {
          z-index: 6;
          opacity: 0.72;
          clip-path: polygon(0 56%, 100% 56%, 100% 100%, 0 100%);
        }

        .planet-moon {
          width: 13%;
          height: 13%;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.68), rgba(128, 161, 215, 0.92));
          box-shadow: 0 0 18px rgba(140, 170, 255, 0.4);
          display: none;
          z-index: 7;
        }

        .planet-moon-a {
          right: -11%;
          top: 21%;
        }

        .planet-moon-b {
          left: -9%;
          bottom: 20%;
        }

        .planet-education .planet-ring {
          display: block;
        }

        .planet-education .planet-surface-a {
          background:
            radial-gradient(ellipse at 38% 36%, rgba(151, 218, 194, 0.72) 0 18%, rgba(151, 218, 194, 0) 32%),
            radial-gradient(ellipse at 62% 59%, rgba(85, 164, 131, 0.58) 0 15%, rgba(85, 164, 131, 0) 28%),
            radial-gradient(ellipse at 47% 72%, rgba(112, 194, 158, 0.52) 0 12%, rgba(112, 194, 158, 0) 24%);
          animation: terrainDrift 34s linear infinite;
        }

        .planet-education .planet-surface-b {
          inset: -8% -16%;
          border-radius: 45%;
          background: repeating-linear-gradient(
            14deg,
            rgba(219, 246, 255, 0.14) 0 7px,
            rgba(219, 246, 255, 0) 7px 16px
          );
          opacity: 0.5;
          animation: cloudDrift 28s linear infinite;
        }

        .planet-education .planet-moon-a {
          display: block;
        }

        .planet-experience .planet-surface-a {
          inset: -8% -16%;
          border-radius: 46%;
          background: repeating-linear-gradient(
            88deg,
            rgba(188, 164, 240, 0.22) 0 6px,
            rgba(122, 96, 196, 0.18) 6px 14px,
            rgba(70, 50, 138, 0.16) 14px 22px,
            rgba(150, 122, 218, 0.20) 22px 32px,
            rgba(96, 70, 168, 0.16) 32px 42px
          );
          opacity: 0.55;
          mix-blend-mode: screen;
          animation: bandShift 42s linear infinite;
        }

        .planet-experience .planet-surface-b {
          background:
            radial-gradient(ellipse 22% 10% at 34% 60%, rgba(220, 158, 240, 0.55) 0 45%, rgba(220, 158, 240, 0) 100%),
            radial-gradient(ellipse 11% 6% at 68% 42%, rgba(190, 152, 232, 0.45) 0 50%, rgba(190, 152, 232, 0) 100%);
          opacity: 0.7;
        }

        .planet-experience .planet-detail-a {
          display: none;
        }

        .planet-projects .planet-ring {
          display: block;
          transform: translate(-50%, -50%) rotate(-21deg);
          border-color: rgba(255, 198, 156, 0.36);
          box-shadow: 0 0 20px rgba(255, 162, 90, 0.2);
        }

        .planet-projects .planet-surface-a {
          background:
            radial-gradient(circle at 33% 42%, rgba(255, 167, 96, 0.42), rgba(255, 167, 96, 0) 16%),
            radial-gradient(circle at 63% 31%, rgba(255, 124, 87, 0.34), rgba(255, 124, 87, 0) 12%),
            radial-gradient(circle at 54% 69%, rgba(183, 94, 67, 0.46), rgba(183, 94, 67, 0) 18%);
          animation: terrainDrift 30s linear infinite reverse;
        }

        .planet-projects .planet-surface-b {
          background:
            radial-gradient(circle at 40% 58%, rgba(48, 15, 9, 0.52) 0 5%, rgba(48, 15, 9, 0) 7%),
            radial-gradient(circle at 68% 47%, rgba(48, 15, 9, 0.45) 0 4%, rgba(48, 15, 9, 0) 7%),
            radial-gradient(circle at 58% 72%, rgba(48, 15, 9, 0.4) 0 3.5%, rgba(48, 15, 9, 0) 6%);
          opacity: 0.6;
        }

        .planet-projects .planet-moon-b {
          display: block;
          background: radial-gradient(circle at 35% 30%, rgba(255, 211, 179, 0.7), rgba(187, 104, 69, 0.9));
          box-shadow: 0 0 16px rgba(255, 153, 94, 0.35);
        }

        @keyframes terrainDrift {
          from { transform: translateX(-5%) rotate(0deg); }
          to { transform: translateX(5%) rotate(360deg); }
        }

        @keyframes cloudDrift {
          from { transform: translateX(-4%) rotate(0deg); }
          to { transform: translateX(4%) rotate(360deg); }
        }

        @keyframes bandShift {
          from { transform: translateX(-8%); }
          to { transform: translateX(8%); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.7; }
        }

        .dock {
          position: absolute;
          left: 50%;
          top: -540vh;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(120, 168, 255, 0.32);
          box-shadow: 0 0 80px rgba(120, 168, 255, 0.2), inset 0 0 35px rgba(120, 168, 255, 0.08);
        }

        .copy {
          top: 46%;
          width: min(440px, 36vw);
        }

        .copy-left {
          left: clamp(1.5rem, 7vw, 6rem);
        }

        .copy-right {
          right: clamp(1.5rem, 7vw, 6rem);
        }

        .copy-kicker {
          color: #8ea4c9;
          margin-bottom: 0.75rem;
        }

        .copy h2 {
          margin: 0;
          font-family: ${ds.display};
          font-size: clamp(1.9rem, 3.9vw, 3.4rem);
          line-height: 1.02;
          letter-spacing: -0.01em;
          font-weight: 600;
          color: #f7faff;
        }

        .copy-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 1.1rem;
        }

        .copy-details span {
          font-family: ${ds.mono};
          font-size: 0.7rem;
          letter-spacing: 0.02em;
          color: #b3c6e6;
          border-top: 1px solid rgba(120, 168, 255, 0.22);
          padding-top: 0.5rem;
        }

        .copy-link {
          display: inline-flex;
          margin-top: 1.35rem;
          font-family: ${ds.mono};
          font-size: 0.82rem;
          letter-spacing: 0.01em;
          color: #dbe8ff;
          text-decoration: none;
          pointer-events: auto;
          border-bottom: 1px solid rgba(120, 168, 255, 0.4);
          padding-bottom: 0.25rem;
        }

        .rocket {
          position: absolute;
          left: 50%;
          bottom: 37px;
          z-index: 30;
          transform-origin: 50% 50%;
          filter: drop-shadow(0 0 24px rgba(111, 162, 255, 0.28));
          will-change: transform;
        }

        .rocket-shell,
        .rocket svg {
          display: block;
        }

        .rocket-shell {
          will-change: transform;
        }

        .rocket svg {
          overflow: visible;
          width: clamp(40px, 7vmin, 96px);
          height: auto;
        }

        @media (max-width: 860px) {
          .rocket svg {
            width: clamp(36px, 11vmin, 72px);
          }
        }

        .launch-pad {
          pointer-events: none;
        }

        .pad {
          position: absolute;
          left: 50%;
          bottom: 48px;
          width: clamp(64px, 12vmin, 140px);
          height: 10px;
          transform: translateX(-50%);
          background: #0d2138;
          border-top: 1px solid rgba(151, 190, 255, 0.36);
        }

        .earth {
          position: absolute;
          left: -10vw;
          right: -10vw;
          bottom: -68px;
          height: 120px;
          border-radius: 50% 50% 0 0;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(67, 149, 255, 0.25), transparent 55%),
            linear-gradient(180deg, #071528, #02040a);
          border-top: 1px solid rgba(125, 178, 255, 0.24);
        }

        .final-copy {
          left: 50%;
          top: 38%;
          width: min(680px, 82vw);
          text-align: center;
          pointer-events: auto;
        }

        .final-copy p {
          margin-left: auto;
          margin-right: auto;
        }

        .final-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem 1.4rem;
          margin-top: 1.4rem;
        }

        .final-links a {
          font-family: ${ds.mono};
          font-size: 0.82rem;
          color: #dbe8ff;
          letter-spacing: 0.01em;
          text-decoration: none;
          padding: 0.4rem 0;
          border-bottom: 1px solid rgba(120, 168, 255, 0.4);
        }

        .nav a:focus-visible,
        .copy-link:focus-visible,
        .final-links a:focus-visible {
          outline: 1px solid #78a8ff;
          outline-offset: 4px;
          border-radius: 2px;
        }

        @media (max-width: 860px) {
          .nav {
            height: 60px;
          }

          .nav a {
            padding: 0.55rem 0.2rem;
          }

          .nav div {
            gap: 0.5rem;
          }

          .intro {
            left: 1.25rem;
            right: 1.25rem;
            width: auto;
            top: 38%;
          }

          .intro p {
            font-size: 0.96rem;
            line-height: 1.6;
            margin-top: 1rem;
          }

          .planet {
            left: 50%;
            width: clamp(120px, 38vmin, 240px);
            height: clamp(120px, 38vmin, 240px);
          }

          .copy {
            left: 1.25rem !important;
            right: 1.25rem !important;
            top: auto;
            bottom: 16vh;
            width: auto;
          }

          .copy h2 {
            font-size: clamp(1.9rem, 9vw, 3rem);
          }

          .copy p {
            font-size: 0.94rem;
            line-height: 1.6;
            margin-top: 0.9rem;
          }

          .copy-details {
            gap: 0.45rem;
            margin-top: 0.9rem;
          }

          .copy-link {
            padding: 0.55rem 0;
            margin-top: 1rem;
          }

          .final-copy {
            width: min(560px, 88vw);
            top: 36%;
          }

          .final-links a {
            padding: 0.55rem 0;
          }
        }

        @media (max-width: 560px) {
          .nav a {
            font-size: 0.7rem;
          }

          .intro h1,
          .final-copy h2 {
            font-size: clamp(2.6rem, 14vw, 3.8rem);
          }

          .copy-details span {
            font-size: 0.62rem;
            letter-spacing: 0.01em;
          }

          .copy-link,
          .final-links a {
            font-size: 0.78rem;
          }
        }

        @media (max-height: 680px) and (max-width: 860px) {
          .intro {
            top: 32%;
          }

          .copy {
            bottom: 12vh;
          }
        }
      `}</style>
    </div>
  );
}
