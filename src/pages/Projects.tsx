import { useState } from "react";
import { Link } from "react-router-dom";
import { TagFilter } from "../components/TagFilter";
import { ds } from "../lib/design";
import { filterByTag, getAllTags } from "../lib/projects";
import type { Project } from "../data/projects";

function ProjectRow({ project }: { project: Project }) {
  const [h, setH] = useState(false);
  return (
    <Link
      to={`/projects/${project.slug}`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", gap: "1.25rem",
        padding: "1rem 0.75rem", margin: "0 -0.75rem",
        borderBottom: `1px solid ${ds.dim}`,
        background: h ? `${ds.accent}12` : "transparent",
        textDecoration: "none", cursor: "pointer",
        transition: "background 0.18s ease",
      }}
    >
      <span style={{ fontFamily: ds.mono, fontSize: "0.6rem", color: h ? ds.accent : ds.dim, width: "2.5rem", flexShrink: 0, transition: "color 0.18s" }}>
        {project.date.slice(0, 4)}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: ds.display, fontWeight: 400, fontSize: "1rem", color: ds.text }}>{project.title}</div>
        <div style={{ fontFamily: ds.mono, fontSize: "0.6rem", color: ds.sub, marginTop: "3px" }}>{project.tags.join(" · ")}</div>
      </div>
      <span className="project-summary" style={{ fontFamily: ds.body, fontSize: "0.82rem", color: ds.sub, maxWidth: 320, lineHeight: 1.5, flexShrink: 1 }}>
        {project.summary}
      </span>
      <span style={{ color: ds.accent, fontSize: "0.85rem", transform: h ? "translateX(5px)" : "none", opacity: h ? 1 : 0.25, transition: "transform 0.18s ease, opacity 0.18s ease", flexShrink: 0 }}>→</span>
    </Link>
  );
}

export default function Projects() {
  const [active, setActive] = useState<string | null>(null);
  const tags = getAllTags();
  const visible = filterByTag(active);

  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,3rem)", position: "relative", zIndex: 1 }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: ds.display, fontWeight: 400, fontSize: "clamp(2rem,4vw,3rem)", color: ds.text, letterSpacing: "-.02em", margin: "0 0 1.5rem" }}>
          Projects
        </h1>
        <TagFilter tags={tags} active={active} onChange={setActive} />
      </header>
      <div style={{ borderTop: `1px solid ${ds.dim}` }}>
        {visible.map(p => <ProjectRow key={p.slug} project={p} />)}
        {visible.length === 0 && (
          <p style={{ fontFamily: ds.mono, fontSize: "0.8rem", color: ds.sub, padding: "2rem 0" }}>No projects found.</p>
        )}
      </div>
    </section>
  );
}
