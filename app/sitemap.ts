import type { MetadataRoute } from "next";
import { coverOf, hasPage, works } from "@/data/works";
import { absoluteUrl } from "@/lib/seo";

// Generated sitemap, served at /sitemap.xml. Add a route here when it gets a page;
// project pages come from data/works.ts, so a new work appears without touching this file.

type Frequency = "weekly" | "monthly";

const staticPages: Array<{ path: string; changeFrequency: Frequency; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/works", changeFrequency: "weekly", priority: 0.9 },
  { path: "/information", changeFrequency: "monthly", priority: 0.8 },
  { path: "/cv", changeFrequency: "monthly", priority: 0.6 },
  { path: "/systems", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const workPages: MetadataRoute.Sitemap = works.filter(hasPage).map((work) => {
    const cover = coverOf(work);
    return {
      url: absoluteUrl(`/work/${work.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
      images: cover ? [absoluteUrl(`${cover.src}.webp`)] : undefined,
    };
  });

  return [...pages, ...workPages];
}
