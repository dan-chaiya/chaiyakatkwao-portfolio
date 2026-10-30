// data/works.ts — typed accessor over works.json. Pages import THIS, never the JSON.
// works.json is written by scripts/import-assets.mjs from New/_curation.md and the
// picks in that script; re-run the script instead of editing the JSON by hand.

import raw from "./works.json";
import frameAlt from "./frame-alt.json";

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

const data = raw as unknown as { hero: ImageFrame; portrait: ImageFrame; works: Omit<Work, "no">[] };

// Display order, agency style (29 Oct 2026): client and professional work first, newest
// first, so an agency meets the work it would hire for; then personal work, then art.
// Index, Home, the Information credits and the numbers all follow it. A work missing
// from this list goes to the end, so a new import still shows up.
const ORDER = [
  // Client and professional work
  "live-commerce",
  "logitech-g",
  "podcast-studio-build",
  "live-studio-os",
  "equipment-loan-system",
  "podcast-studio",
  "bakao",
  "knack-factory",
  "cmdw-2024",
  "commission-2024-silk",
  "khun-chang-khian",
  "the101-writers",
  "sculpture",
  "commission-2022",
  // Personal work
  "keepsake",
  "portraits",
  "afterparty",
  "diarys-human-life",
  "beauty-or-nature",
  "vacation-time",
  "yeeeeee",
  "work-life-balance",
  // Art
  "woven-memories",
  "untitled",
  "self",
  "nowhere",
  "nattachai",
];

const rank = (slug: string) => (ORDER.includes(slug) ? ORDER.indexOf(slug) : ORDER.length);

export const hero = data.hero;
export const portrait = data.portrait;
/** Numbers run 001… in display order with no gaps, so a withdrawn work leaves none. */
export const works: Work[] = [...data.works]
  .sort((a, b) => rank(a.slug) - rank(b.slug))
  .map((w, i) => ({ ...w, no: String(i + 1).padStart(3, "0") }));

/** Text-only rows (no frames yet) have no project page. */
export const hasPage = (w: Work) => w.frames.length > 0;

/** Where an Index row links: its project page, its own href, or nowhere. */
export const linkOf = (w: Work) => (hasPage(w) ? `/work/${w.slug}` : w.href);

export const getWork = (slug: string) => works.find((w) => w.slug === slug);

export const coverOf = (w: Work) => w.frames.find((f): f is ImageFrame => f.type === "image");

/** What is in the frame, written like a museum caption. frame-alt.json is hand-kept (not
 *  written by import-assets), keyed by the frame's src; re-key it if a frame moves. */
export const altOf = (frame: ImageFrame): string | undefined => (frameAlt as Record<string, string>)[frame.src];
