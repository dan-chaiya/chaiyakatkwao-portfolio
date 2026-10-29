// scripts/import-assets.mjs — builds the v2 image set and data/works.json.
//
//   node scripts/import-assets.mjs
//
// Reads the originals in New/ (never committed) and the web images already in
// public/, writes AVIF + WebP into public/v2/<slug>/ at two sizes (full and 800 px),
// and writes data/works.json, which data/works.ts types for the pages.
// Catalogue text (titles, credits, statements) comes from New/_curation.md word for
// word; which frames to show comes from PICKS below. Re-run after changing either.
//
// Colour: sharp converts every file through its embedded profile to sRGB (CMDW is
// ProPhoto, several sets are Adobe RGB) and strips EXIF/GPS; output carries no metadata.

import sharp from "sharp";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const NEW = path.join(ROOT, "New");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(PUBLIC, "v2");

const FULL = 2400;
const SMALL_SERIES = new Set(["02", "03", "04"]); // 1800 px originals, never upscaled or shown wider
const THUMB = 800;
const MAX_BYTES = 600 * 1024;

// Frames shown per work, in display order. Missing key = every frame in the folder.
// Cuts and reasons: v2-review/00-first-look.md §2.
const PICKS = {
  "02": ["01", "02", "03", "05", "06"],
  "03": ["01", "02", "03", "05", "06", "07", "08", "10"],
  "06": ["01", "02", "03", "04", "07", "09"],
  "07": ["01", "03", "04", "06", "07", "09", "10", "11"],
  "10": ["01", "02", "03", "04", "06"],
  "11": ["01", "02", "04", "06"],
  "13": ["01", "03", "04", "07", "08", "13", "14"],
  "14": ["01", "03", "05", "06", "07", "08", "09", "10", "11", "12", "13"],
  "15": ["01", "02", "04", "05", "06", "07", "09", "10", "11"],
  "16": ["01", "02", "03", "04", "05", "07", "09", "10", "11", "12"],
  "17": ["01"],
  "19": ["03", "01", "05"],
};

const PODCAST_EPISODES = [
  { id: "XbYJ8nF8X8M", title: "The Art of Music and Business — Dr. Paye" },
  { id: "jv4YtosznsQ", title: "Navigating Global Jiu-Jitsu — Kieran Kichuk" },
  { id: "eL6XtPuvpJs", title: "ChatGPT: จาก AI Chatbot สู่ AI Platform ของโลก" },
  { id: "Nv1eOGsYhGk", title: "Préparation du meilleur bodybuilder français — Yann Letranchant" },
  { id: "swJAnw13zR4", title: "Banking in Thailand for Foreigners" },
];

const pub = (...p) => p.map((x) => path.join(PUBLIC, x));
const gallery = (names) => names.map((n) => path.join(PUBLIC, "images/gallery", `${n}.jpg`));

// Rows that come from the live site or the end of _curation.md, after 01–19.
// Company rule: no company name, no room numbers, no internal screenshots.
const EXTRA_ROWS = [
  {
    slug: "the101-writers", title: "10/10 Influential Writers of CMU", discipline: "Photography", year: "2023",
    credit: "Commissioned Photographer, the101.World Magazine, 2023",
    sources: ["09", "10", "11", "12"].map((n) => path.join(NEW, "13-portraits", `${n}.jpg`)),
  },
  // KOL Casting Lookbook: taken off the site 2026-10-05 (main 123165c), stays off in v2.
  {
    slug: "live-commerce", title: "Live commerce studio", discipline: "Production", year: "2026",
    credit: "Live Production & Visual Coordinator, Bangkok",
    statement: "Live commerce broadcasts for Nestlé, Guess, Fitflop, Sunnies, Rojukiss, Dutchie Milk and others.",
    videos: "live-commerce",
    sources: pub(...["nestle", "guess", "fitflop", "sunnies", "rojukiss", "dutchmil", "colgate-may", "shop-at-nestle-may",
      "fn-dairies-may", "dmd-live", "her-hyness", "tokfashion"].map((n) => `images/live-posters/${n}.jpg`)),
  },
  {
    slug: "knack-factory", title: "Knack Factory", discipline: "Photography", year: "2024",
    credit: "Photographer",
    statement: "Documenting the senior thesis runway of Suan Sunandha Rajabhat University's graduating fashion class.",
    sources: pub(...["14", "75", "79", "94", "120", "131", "143"].map((n) => `work-assets/Knack Factory Fashion show, 2024/Knack-${n}.jpg`)),
  },
  {
    slug: "bakao", title: "BAKAO", discipline: "Photography", year: "2024",
    credit: "Photographer and art direction",
    statement: "Fashion photography and art direction for an emerging Thai clothing label.",
    sources: pub(...["01", "02", "03", "04", "05", "06"].map((n) => `images/bakao/${n}.jpg`)),
  },
  {
    // The live /gallery "Selected Work", minus frames already shown under 13 and 17.
    slug: "untitled", title: "Untitled", discipline: "Art", year: "2024",
    sources: gallery([
      "something-but-01", "something-but-02", "something-but-03", "something-but-04", "something-but-05",
      "something-but-06", "something-but-07", "forms-05", "forms-06", "misc-01", "film-01", "forms-01",
      "misc-02", "forms-02", "forms-04", "misc-03", "forms-03", "film-02",
    ]),
  },
  // Systems rows link to their case on /systems (written from systems-page-redacted.md).
  { slug: "live-studio-os", title: "Live Studio OS", discipline: "Systems", year: "2026", credit: "Studio operations web app", href: "/systems#live-studio-os" },
  { slug: "keepsake", title: "Keepsake", discipline: "Systems", year: "2026", credit: "Private two-person archive", href: "/systems#keepsake" },
  { slug: "equipment-loan-system", title: "Equipment inventory and loan system", discipline: "Systems", year: "", href: "/systems#equipment-register" },
  { slug: "podcast-studio-build", title: "Podcast studio build", discipline: "Production", year: "2026", credit: "Freelance" },
];

// ---------------------------------------------------------------- catalogue

function parseCuration(md) {
  const works = [];
  for (const block of md.split(/^## /m).slice(1)) {
    const head = block.match(/^(\d\d) — (.+)$/m);
    const folder = block.match(/^- Folder: (\S+?)\/ \(\d+\) · (?:Discipline: )?(\w+) · (?:Year: )?(.+)$/m);
    if (!head || !folder) continue; // 00 Hero and the closing sections
    const field = (name) => block.match(new RegExp(`^- ${name}: (.+)$`, "m"))?.[1].trim() ?? "";
    works.push({
      no: head[1],
      folder: folder[1],
      title: head[2].trim(),
      discipline: folder[2],
      year: folder[3].trim(),
      credit: field("Credit"),
      exhibited: field("Exhibited"),
      statement: field("Statement"),
      confirm: field("CONFIRM"),
    });
  }
  return works;
}

// CONFIRM lines render without the unconfirmed detail (brief, Content rules).
function cleanCredit(w) {
  if (w.no === "13") return ""; // that credit belongs to the the101 row, split out below
  // "(full-time role, ended)" is a note to the builder, not a public credit.
  return w.credit.replace(/ \(source folder "[^"]+"\)$/, "").replace(/ \(full-time role, ended\)$/, "");
}

// ---------------------------------------------------------------- images

async function encode(src, dir, name, maxEdge) {
  const fullEdge = Math.min(FULL, maxEdge);
  const meta = await sharp(src).rotate().metadata();
  const flip = (meta.orientation ?? 1) >= 5;
  const w0 = flip ? meta.height : meta.width;
  const h0 = flip ? meta.width : meta.height;
  const scale = Math.min(1, fullEdge / Math.max(w0, h0));
  const w = Math.round(w0 * scale);
  const h = Math.round(h0 * scale);

  await mkdir(dir, { recursive: true });
  for (const [suffix, edge] of [["", fullEdge], [`-${THUMB}`, THUMB]]) {
    // WebP first: it is the larger format, so if it can't fit, the whole frame shrinks
    // before any AVIF is written at the old size.
    for (const fmt of ["webp", "avif"]) {
      const file = path.join(dir, `${name}${suffix}.${fmt}`);
      if (existsSync(file) && (await stat(file)).mtimeMs > (await stat(src)).mtimeMs) continue;
      // WebP at 78 (the brief's 75–80). AVIF's scale runs lower: 55 looks the same as
      // WebP 78 and lands smaller, where AVIF 78 came out ~1.7x the WebP. Step down
      // only if a file would break the 600 KB ceiling.
      for (let q = fmt === "avif" ? 55 : 78; ; q -= 6) {
        const buf = await sharp(src)
          .rotate()
          .resize({ width: edge, height: edge, fit: "inside", withoutEnlargement: true })
          .toColourspace("srgb")
          [fmt]({ quality: q, ...(fmt === "avif" ? { effort: 4 } : {}) })
          .toBuffer();
        // Grainy frames that break the ceiling even at q 40: shrink the long edge 15% and retry.
        if (buf.length > MAX_BYTES && q <= 40 && suffix === "") return encode(src, dir, name, Math.round(fullEdge * 0.85));
        if (buf.length <= MAX_BYTES || q <= 40) {
          await writeFile(file, buf);
          break;
        }
      }
    }
  }
  return { type: "image", src: `/${path.relative(PUBLIC, dir)}/${name}`, w, h };
}

async function encodeAll(slug, sources, maxEdge = FULL) {
  const dir = path.join(OUT, slug);
  const frames = [];
  for (const [i, src] of sources.entries()) {
    if (!existsSync(src)) throw new Error(`missing source: ${src}`);
    frames.push(await encode(src, dir, String(i + 1).padStart(2, "0"), maxEdge));
  }
  return frames;
}

async function loops(set) {
  const manifest = JSON.parse(await readFile(path.join(ROOT, "data/media-manifest.json"), "utf8"));
  return manifest.assets
    .filter((a) => a.set === set)
    .map((a) => ({
      type: "video",
      poster: a.poster,
      sources: a.sources,
      w: Math.round(1080 * a.aspect),
      h: 1080,
      alt: a.alt,
    }));
}

// ---------------------------------------------------------------- main

const curation = parseCuration(await readFile(path.join(NEW, "_curation.md"), "utf8"));
if (curation.length !== 19) throw new Error(`expected 19 works in _curation.md, parsed ${curation.length}`);

const works = [];
// Works Dan withdrew after seeing them on the site (curation number). 16 cream set: 29 Oct 2026.
const WITHDRAWN = new Set(["16"]);

for (const w of curation) {
  if (WITHDRAWN.has(w.no)) continue;
  const dir = path.join(NEW, w.folder);
  const picks = PICKS[w.no];
  const names = picks
    ? picks.map((n) => `${n}.jpg`)
    : (await import("node:fs")).readdirSync(dir).filter((f) => /^\d\d\.(jpe?g|png)$/i.test(f)).sort();
  // 14-cmdw has one PNG (12.png); a pick names the number, so resolve the real extension.
  const sources = names.map((n) => {
    const jpg = path.join(dir, n);
    return existsSync(jpg) ? jpg : jpg.replace(/\.jpg$/, ".png");
  });
  const maxEdge = SMALL_SERIES.has(w.no) ? 1800 : FULL;
  const frames = await encodeAll(w.folder.slice(3), sources, maxEdge);
  if (w.no === "19") for (const ep of PODCAST_EPISODES) frames.push({ type: "youtube", ...ep });

  works.push({
    no: "", // numbered after the list is complete, below
    slug: w.folder.slice(3),
    title: w.title,
    discipline: w.discipline,
    year: w.year,
    credit: cleanCredit(w),
    exhibited: w.exhibited,
    statement: w.statement,
    maxEdge,
    frames,
  });
}

for (const row of EXTRA_ROWS) {
  const frames = [
    ...(row.videos ? await loops(row.videos) : []),
    ...(row.sources ? await encodeAll(row.slug, row.sources) : []),
  ];
  works.push({
    no: "",
    slug: row.slug,
    title: row.title,
    discipline: row.discipline,
    year: row.year,
    credit: row.credit ?? "",
    exhibited: "",
    statement: row.statement ?? "",
    maxEdge: FULL,
    frames,
    ...(row.href ? { href: row.href } : {}),
  });
}

// Index numbers run 001… in display order with no gaps, so a withdrawn work leaves none.
works.forEach((w, i) => (w.no = String(i + 1).padStart(3, "0")));

// Home hero and the Information portrait.
const hero = await encode(path.join(NEW, "00-hero/01.jpg"), path.join(OUT, "home"), "hero", FULL);
// Dan's portrait from the live About page. (_curation.md calls 19/07 a portrait of Dan; it isn't.)
const portrait = await encode(path.join(PUBLIC, "images/portrait/dan.jpg"), path.join(OUT, "information"), "portrait", FULL);

await writeFile(
  path.join(ROOT, "data/works.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), hero, portrait, works }, null, 2) + "\n",
);

// Self-check: the brief's done-when numbers.
const fs = await import("node:fs");
const shipped = fs.readdirSync(OUT, { recursive: true }).filter((f) => /\.(avif|webp)$/.test(f));
const over = shipped.filter((f) => fs.statSync(path.join(OUT, f)).size > MAX_BYTES);
const imageCount = (w) => w.frames.filter((f) => f.type === "image").length;
console.log(works.map((w) => `${w.no} ${w.slug.padEnd(24)} ${w.discipline.padEnd(11)} ${w.year.padEnd(9)} ${imageCount(w)} img ${w.frames.length - imageCount(w)} other`).join("\n"));
console.log(`\n${shipped.length} files in public/v2, ${over.length} over 600 KB${over.length ? ": " + over.join(", ") : ""}`);
if (over.length) process.exitCode = 1;
