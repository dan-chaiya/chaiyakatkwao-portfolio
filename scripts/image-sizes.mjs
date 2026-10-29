#!/usr/bin/env node
// scripts/image-sizes.mjs — the intrinsic size of every photo under public/images and
// public/work-assets, written to data/image-sizes.json.
//
// Components hand these to next/image as width/height, so the browser reserves each
// photo's box before it loads and the page does not jump (CLS). The photos are shown at
// their natural aspect ratio exactly as before; only the reserved space is new.
// Keys are the decoded public path ("/work-assets/Knack Factory Fashion show, 2024/
// Knack-14.jpg"); lib/image-size.ts looks a src up by decoding it first.
// Sizes are as displayed: an EXIF rotation of 90° or 270° swaps width and height.
// Re-run after adding or replacing a photo: node scripts/image-sizes.mjs
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const dirs = ["images", "work-assets"];
const isPhoto = /\.(jpe?g|png|webp|avif)$/i;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (isPhoto.test(entry.name)) out.push(p);
  }
  return out;
}

const sizes = {};
for (const d of dirs) {
  for (const file of (await walk(path.join(publicDir, d))).sort()) {
    const { width, height, orientation } = await sharp(file).metadata();
    const swap = orientation >= 5 && orientation <= 8;
    const key = "/" + path.relative(publicDir, file).split(path.sep).join("/");
    sizes[key] = swap ? [height, width] : [width, height];
  }
}

// One photo per line, so a re-run diffs cleanly.
const body = Object.entries(sizes).map(([k, [w, h]]) => `  ${JSON.stringify(k)}: [${w}, ${h}]`).join(",\n");
await writeFile(path.join(root, "data/image-sizes.json"), `{\n${body}\n}\n`);
console.log(`${Object.keys(sizes).length} photos → data/image-sizes.json`);
