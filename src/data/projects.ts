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
    slug: "spectrea",
    title: "Spectrea (formerly Matchwise)",
    date: "2024-09-01",
    tags: ["startups", "knowledge graphs", "AI", "co-founder"],
    summary: "Composable knowledge platform for business teams. Unifies documents, data, and context into one knowledge graph that humans and AI can reason over.",
    featured: true,
  },
  {
    slug: "silver-online-service",
    title: "Silver Online Service",
    date: "2022-01-01",
    tags: ["startups", "product", "co-founder"],
    summary: "Co-founded a startup making technology for Singapore's seniors. Three years as product manager — built the team, shipped the product.",
    featured: true,
  },
  {
    slug: "ai-computer-vision",
    title: "Computer Vision Projects",
    date: "2023-09-01",
    tags: ["AI", "computer vision", "python"],
    summary: "Trained computer vision models for object detection and classification. Applied across robotics and product work at SUTD.",
    featured: true,
  },
  {
    slug: "flutter-apps",
    title: "Flutter App Development",
    date: "2023-06-01",
    tags: ["Flutter", "Dart", "mobile"],
    summary: "Cross-platform mobile applications built with Flutter. From prototype to deployed app.",
    featured: true,
  },
  {
    slug: "robotics",
    title: "Robotics Projects",
    date: "2023-03-01",
    tags: ["robotics", "hardware", "python"],
    summary: "Designed and programmed robotic systems through SUTD coursework and personal projects. Software meets physical.",
    featured: true,
  },
  {
    slug: "3d-printing",
    title: "3D Printing & Fabrication",
    date: "2022-09-01",
    tags: ["hardware", "design", "3D printing"],
    summary: "3D printing as a core part of product development — rapid prototyping to functional end-use parts.",
  },
  {
    slug: "space-tech",
    title: "Space Technologies",
    date: "2022-06-01",
    tags: ["space", "hardware", "engineering"],
    summary: "Exploring propulsion, satellite systems, and where space engineering meets product development.",
  },
  {
    slug: "knowledge-graphs",
    title: "Knowledge Graphs & AI",
    date: "2025-10-01",
    tags: ["AI", "Neo4j", "knowledge graphs"],
    summary: "Neo4j certified — fundamentals, GenAI integration, and vector indexes for unstructured data.",
  },
];
