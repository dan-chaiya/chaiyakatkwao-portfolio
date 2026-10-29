// data/works.ts — typed accessor over works.json. Pages import THIS, never the JSON.
// works.json is written by scripts/import-assets.mjs from New/_curation.md and the
// picks in that script; re-run the script instead of editing the JSON by hand.

import raw from "./works.json";

export const DISCIPLINES = ["Photography", "Art", "Production", "Systems"] as const;
export type Discipline = (typeof DISCIPLINES)[number];

/** src has no extension: Picture adds .avif / .webp and the -800 variant. */
export type ImageFrame = { type: "image"; src: string; w: number; h: number };
export type VideoFrame = {
  type: "video";
  poster: string;
  sources: { src: string; type: string }[];
  w: number;
  h: number;
  alt: string;
};
export type YouTubeFrame = { type: "youtube"; id: string; title: string };
export type Frame = ImageFrame | VideoFrame | YouTubeFrame;

export type Work = {
  no: string;
  slug: string;
  title: string;
  discipline: Discipline;
  year: string;
  credit: string;
  exhibited: string;
  statement: string;
  /** Longest edge the work may be shown at, in CSS px (1800 for the small series). */
  maxEdge: number;
  frames: Frame[];
  /** Text-only rows that live elsewhere on the site (Systems → /systems#case). */
  href?: string;
};

const data = raw as unknown as { hero: ImageFrame; portrait: ImageFrame; works: Work[] };

export const hero = data.hero;
export const portrait = data.portrait;
export const works = data.works;

/** Text-only rows (no frames yet) have no project page. */
export const hasPage = (w: Work) => w.frames.length > 0;

/** Where an Index row links: its project page, its own href, or nowhere. */
export const linkOf = (w: Work) => (hasPage(w) ? `/work/${w.slug}` : w.href);

export const getWork = (slug: string) => works.find((w) => w.slug === slug);

export const coverOf = (w: Work) => w.frames.find((f): f is ImageFrame => f.type === "image");
