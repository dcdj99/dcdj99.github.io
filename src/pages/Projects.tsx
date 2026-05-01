import { useState } from "react";
import { ProjectGrid } from "../components/ProjectGrid";
import { TagFilter } from "../components/TagFilter";
import { filterByTag, getAllTags } from "../lib/projects";

export default function Projects() {
  const [active, setActive] = useState<string | null>(null);
  const tags = getAllTags();
  const visible = filterByTag(active);

  return (
    <section className="px-6 max-w-5xl mx-auto py-16">
      <header className="mb-10">
        <h1 className="font-serif text-4xl">Projects</h1>
        <p className="mt-3 font-mono text-sm opacity-70">A working list. Filterable, occasionally surprising.</p>
      </header>
      <TagFilter tags={tags} active={active} onChange={setActive} />
      <div className="mt-8">
        <ProjectGrid projects={visible} />
      </div>
    </section>
  );
}
