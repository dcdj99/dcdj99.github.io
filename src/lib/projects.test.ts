import { describe, it, expect } from "vitest";
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getAllTags,
  filterByTag,
} from "./projects";

describe("project selectors", () => {
  it("returns projects sorted by date desc", () => {
    const all = getAllProjects();
    for (let i = 1; i < all.length; i++) {
      expect(all[i - 1].date >= all[i].date).toBe(true);
    }
  });

  it("only returns featured projects when filtering", () => {
    expect(getFeaturedProjects().every((p) => p.featured)).toBe(true);
  });

  it("looks up a project by slug", () => {
    const all = getAllProjects();
    if (all.length === 0) return;
    const first = all[0];
    expect(getProjectBySlug(first.slug)?.slug).toBe(first.slug);
  });

  it("returns undefined for unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("collects all tags as a unique sorted list", () => {
    const tags = getAllTags();
    expect(tags).toEqual([...new Set(tags)].sort());
  });

  it("filterByTag(null) returns all projects", () => {
    expect(filterByTag(null).length).toBe(getAllProjects().length);
  });

  it("filterByTag(tag) only returns projects with that tag", () => {
    const tags = getAllTags();
    if (tags.length === 0) return;
    const t = tags[0];
    expect(filterByTag(t).every((p) => p.tags.includes(t))).toBe(true);
  });
});
