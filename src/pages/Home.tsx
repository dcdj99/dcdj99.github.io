import { Link } from "react-router-dom";
import { site } from "../data/site";
import { NowBlock } from "../components/NowBlock";
import { ProjectGrid } from "../components/ProjectGrid";
import { getFeaturedProjects } from "../lib/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <div className="px-6 max-w-5xl mx-auto">
      <section className="py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-widest opacity-60">Hello,</p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl leading-[1.05]">
          I'm {site.name}.
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed">{site.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
          <Link to="/projects" className="underline decoration-accent dark:decoration-accent-dark">see projects →</Link>
          <Link to="/about" className="underline decoration-accent dark:decoration-accent-dark">about →</Link>
        </div>
      </section>

      <section className="py-12">
        <NowBlock />
      </section>

      <section className="py-12">
        <header className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl">Featured</h2>
          <Link to="/projects" className="font-mono text-xs opacity-60 hover:opacity-100">all projects →</Link>
        </header>
        <ProjectGrid projects={featured} />
      </section>
    </div>
  );
}
