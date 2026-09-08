import type { MetadataRoute } from "next";
import { visibleProjects } from "@/data/commercial";
import { absoluteUrl } from "@/lib/seo";

// Generated sitemap, served at /sitemap.xml. Replaced the hand-written
// public/sitemap.xml on 2026-09-08, which listed six pages and no case
// studies. Add a route here when it gets a page; projects come from
// data/commercial.ts, so a new project appears without touching this file.

type Frequency = "weekly" | "monthly";

const staticPages: Array<{ path: string; changeFrequency: Frequency; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/commercial", changeFrequency: "weekly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/cv", changeFrequency: "monthly", priority: 0.6 },
  { path: "/chat", changeFrequency: "monthly", priority: 0.6 },
  { path: "/systems", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const caseStudies: MetadataRoute.Sitemap = visibleProjects.map((project) => ({
    url: absoluteUrl(`/commercial/${project.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteUrl(project.cover)],
  }));

  return [...pages, ...caseStudies];
}
