import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../lib/projects";
import { ds } from "../lib/design";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,3rem)", position: "relative", zIndex: 1 }}>
        <h1 style={{ fontFamily: ds.display, fontWeight: 400, fontSize: "2rem", color: ds.text, letterSpacing: "-.02em" }}>
          Project not found
        </h1>
        <p style={{ fontFamily: ds.mono, fontSize: "0.75rem", color: ds.sub, marginTop: "1rem" }}>
          <Link to="/projects" style={{ color: ds.accent, textDecoration: "none" }}>← Back to projects</Link>
        </p>
      </section>
    );
  }

  return (
    <article style={{ maxWidth: "720px", margin: "0 auto", padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,3rem)", position: "relative", zIndex: 1 }}>
      <Link to="/projects" style={{ fontFamily: ds.mono, fontSize: "0.65rem", color: ds.sub, textDecoration: "none", letterSpacing: ".08em", textTransform: "uppercase" }}>
        ← Projects
      </Link>

      <h1 style={{ fontFamily: ds.display, fontWeight: 400, fontSize: "clamp(2rem,4vw,3rem)", color: ds.text, margin: "1.5rem 0 0.75rem", letterSpacing: "-.025em" }}>
        {project.title}
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.75rem", marginBottom: "2rem" }}>
        <time style={{ fontFamily: ds.mono, fontSize: "0.62rem", color: ds.sub }}>{project.date}</time>
        {project.tags.map(t => (
          <span key={t} style={{ fontFamily: ds.mono, fontSize: "0.62rem", color: ds.sub }}>#{t}</span>
        ))}
      </div>

      <p style={{ fontFamily: ds.body, fontWeight: 300, fontSize: "1.05rem", color: ds.sub, lineHeight: 1.9, marginBottom: "2.5rem" }}>
        {project.summary}
      </p>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" style={{ fontFamily: ds.mono, fontSize: "0.72rem", color: ds.accent, textDecoration: "none", letterSpacing: ".04em" }}>
            GitHub →
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" style={{ fontFamily: ds.mono, fontSize: "0.72rem", color: ds.accent, textDecoration: "none", letterSpacing: ".04em" }}>
            Demo →
          </a>
        )}
      </div>

      {project.body && (
        <div style={{ marginTop: "3rem", fontFamily: ds.body, fontWeight: 300, lineHeight: 1.9, color: ds.sub }}>
          {project.body}
        </div>
      )}
    </article>
  );
}
