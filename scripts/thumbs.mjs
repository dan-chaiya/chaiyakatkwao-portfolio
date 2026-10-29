// scripts/thumbs.mjs — strip thumbnails for the project viewer.
//
//   node scripts/thumbs.mjs
//
// The viewer strip shows each frame 44px tall (36px on phones). It used the -800
// files, about 110 KB each: 2.0 MB for the 18 frames of Untitled (audit 2026-10-29).
// This writes a -thumb.webp beside every image and video frame in data/works.json,
// 132px tall (44px at 3x), from files already in public/, so it runs without New/.
// import-assets.mjs calls it at the end; skips files already newer than their source.

import sharp from "sharp";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const HEIGHT = 132;

const { works } = JSON.parse(await readFile(path.join(ROOT, "data/works.json"), "utf8"));
let written = 0;
let bytes = 0;

// Image frames start from their -800 WebP; video frames from their poster JPEG
// (70–110 KB each), whose thumbnail sits beside it as <poster>-thumb.webp.
const thumbOf = (frame) =>
  frame.type === "image" ? `${frame.src}-thumb.webp` : frame.poster.replace(/\.jpg$/, "-thumb.webp");

for (const frame of works.flatMap((w) => w.frames)) {
  if (frame.type === "youtube") continue;
  const src = path.join(PUBLIC, frame.type === "image" ? `${frame.src}-800.webp` : frame.poster);
  const out = path.join(PUBLIC, thumbOf(frame));
  if (existsSync(out) && (await stat(out)).mtimeMs > (await stat(src)).mtimeMs) continue;
  const info = await sharp(src)
    .resize({ height: HEIGHT, width: HEIGHT * 4, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(out);
  written++;
  bytes += info.size;
}

console.log(`${written} thumbnails written${written ? `, ${Math.round(bytes / 1024)} KB in all` : ""}`);
