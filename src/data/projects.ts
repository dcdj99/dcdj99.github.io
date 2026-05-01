import type { ReactNode } from "react";

export type Project = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  cover?: string;
  github?: string;
  demo?: string;
  summary: string;
  body?: ReactNode;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sample-project",
    title: "Sample Project",
    date: "2026-01-15",
    tags: ["typescript", "react"],
    summary: "A placeholder project to show the card and detail layouts. Replace with real work.",
    featured: true,
  },
];
