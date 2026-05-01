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
