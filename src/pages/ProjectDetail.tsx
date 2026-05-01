import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../lib/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <section className="px-6 max-w-prose mx-auto py-20">
        <h1 className="font-serif text-3xl">Project not found</h1>
        <p className="mt-4 font-mono text-sm opacity-70">
          The project you're looking for doesn't exist.{" "}
          <Link to="/projects" className="underline decoration-accent dark:decoration-accent-dark">
            Back to projects
          </Link>
        </p>
      </section>
    );
  }

  return (
    <article className="px-6 max-w-prose mx-auto py-16">
      <header className="mb-10">
        <Link to="/projects" className="font-mono text-xs opacity-60 hover:opacity-100">← projects</Link>
        <h1 className="font-serif text-4xl mt-4">{project.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs opacity-70">
          <time>{project.date}</time>
          {project.tags.map((t) => <span key={t}>#{t}</span>)}
        </div>
        <p className="mt-6 text-lg leading-relaxed">{project.summary}</p>
        <div className="mt-4 flex gap-4 font-mono text-xs">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="underline decoration-accent dark:decoration-accent-dark">
              github →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="underline decoration-accent dark:decoration-accent-dark">
              demo →
            </a>
          )}
        </div>
      </header>
      {project.body && <div className="prose-content space-y-4 leading-relaxed">{project.body}</div>}
    </article>
  );
}
