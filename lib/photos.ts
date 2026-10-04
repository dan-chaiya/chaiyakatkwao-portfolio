// lib/photos.ts — what the site knows about each photo besides its path.
// photoSize: the intrinsic size from data/image-sizes.json (scripts/image-sizes.mjs),
// handed to next/image as width/height so the browser reserves the photo's box before
// it loads and the page does not jump. Shown at the natural aspect ratio either way.
// photoAlt: the photo's description from data/alt-text.json, which says what is in the
// frame. Until 2026-10-04 every alt was a title plus " - Creative Producer", so a screen
// reader heard the same tag dozens of times and never what a photo showed.
// Both look a src up decoded, so an encoded /work-assets URL finds its entry.

import sizes from "@/data/image-sizes.json";
import alts from "@/data/alt-text.json";

const SIZES: Record<string, number[]> = sizes;
const ALTS = alts as Record<string, string>;

function key(src: string): string {
  try {
    return decodeURIComponent(src);
  } catch {
    return src;
  }
}

export function photoSize(src: string): { width: number; height: number } {
  const size = SIZES[key(src)];
  if (!size) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`No size for ${src}: run node scripts/image-sizes.mjs`);
    }
    return { width: 0, height: 0 };
  }
  return { width: size[0], height: size[1] };
}

export function photoAlt(src: string, fallback: string): string {
  return ALTS[key(src)] ?? fallback;
}
