import { projects, type Project } from "../data/projects";

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const p of projects) for (const t of p.tags) tags.add(t);
  return Array.from(tags).sort();
}

export function filterByTag(tag: string | null): Project[] {
  if (!tag) return getAllProjects();
  return getAllProjects().filter((p) => p.tags.includes(tag));
}
