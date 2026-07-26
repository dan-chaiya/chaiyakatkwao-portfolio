# Chaiya Katkwao — Portfolio v2

## Front-End Technical Specification & Higgsfield MCP Asset Pipeline

> **Purpose.** A single, developer-ready blueprint that (1) audits the existing Next.js portfolio and its raw media, (2) defines a Higgsfield MCP pipeline that turns static stills and raw `.mov` footage into motion assets, (3) specifies a motion-driven front-end architecture, and (4) packages all of it into an execution plan Claude Code can build from with minimal ambiguity.
>
> **How to read this doc.** English is the implementation contract (stacks, tokens, code, MCP commands). Thai `🇹🇭` callouts explain *why* each decision was made and how to run each step. Feed this whole file to Claude Code as `/FRONTEND_SPEC.md` and reference sections by their `§` numbers in your build prompts.

> ⚠️ **Ground truth = the code, not `DESIGN.md`.** The repo's `DESIGN.md` describes an older OKLCH‑250 blue‑grey palette. The **shipping** `app/globals.css` uses **ink black `#000` / gallery white `#F9F9F9` / architectural grey scale + a single warm amber accent `oklch(72% 0.18 35)`**. This spec treats `globals.css` as canonical and consolidates the tokens in §4.2. Update `DESIGN.md` to match, or delete it.

> ⚠️ **Next.js 16 is not the Next.js in your training data.** The repo ships `AGENTS.md` warning that APIs and file conventions changed. Before writing any Next code, Claude Code **must** read the relevant guide under `node_modules/next/dist/docs/`. This is repeated as a hard guardrail in §5.4.

---

## Part 0 — Current-State Audit / สรุปสถานะปัจจุบัน

### 0.1 Stack (verified from `package.json`)

| Layer | Choice | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | `16.2.4` | ⚠️ breaking changes vs. training data — read local docs |
| UI runtime | React / React‑DOM | `19.2.4` | Server Components default; `"use client"` where interactive |
| Styling | Tailwind CSS | `^4` | CSS‑first `@theme inline` in `globals.css`, **no `tailwind.config`** |
| Motion | Framer Motion | `12.38.0` | already the motion engine — keep it, do **not** add GSAP as a hard dependency (see §2.6) |
| AI | `ai` + `@ai-sdk/anthropic` | `3.4.33` / `0.0.48` | powers `/chat` (portfolio Q&A) via `/api/chat` |
| Lang | TypeScript | `^5` | strict, `@/*` path alias to repo root |

### 0.2 Route map (verified from `app/`)

```
/                 PortfolioHome  → CreativeProducerHero (6-slide auto rotator) + 5 "acts"
/commercial       Project index (data/commercial.ts, 4 visible projects)
/commercial/[slug] Project detail (dynamic)
/gallery          Masonry art gallery + Lightbox
/about            Bio
/cv               CV + PrintButton, PDF at /Website/CV — Chaiya Katkwao.pdf
/chat             AI chat (Anthropic, streaming) about Chaiya's work
/api/chat         Edge/route handler for the above
```

### 0.3 Real user feedback — the bug backlog we are designing against

Extracted verbatim from `/Bugs and errors/*.JPG`. **Every one of these has a fix owner in §2.7.** This is the highest-signal input we have — real viewers hitting real friction.

| # | Reported issue | Root cause in code | Fixed in |
|---|---|---|---|
| B1 | "An error from changing picture so fast by clicking" | Lightbox nav re-entrancy | `Lightbox.tsx` already debounces 350ms — **verify + extend to hero** (§2.7) |
| B2 | "Fonts are hard to read for normal people" | 8–9px JetBrains Mono labels + low-contrast greys (`#6B6560` on `#000`) everywhere | Type-legibility pass (§2.7 / §4.3) |
| B3 | "It would be nice to have the lists for Commercial" | `/commercial` lacks a scannable list/index view | Commercial list view (§2.7 / §3.2) |
| B4 | "The vertical hero pictures are too big — they get tired from scrolling" | Hero is `85vh` portrait diptych; feels heavy | Hero re-proportion (§2.7 / §2.3) |
| B5 | "There's no gap between the set" | `.masonry` gap is `3px`; sets visually merge | Gallery rhythm/spacing (§2.7 / §3.2) |
| B6 | "No arrows/sign of changing the set; the ✕ to exit is invisible" | Lightbox affordances too subtle against dark art | Lightbox affordance pass (§2.7) |

> 🇹🇭 **หมายเหตุ:** ฟีดแบ็กจริงจากผู้ใช้ 6 ข้อนี้คือ "โจทย์ตั้งต้น" ของการอัปเกรดครั้งนี้ ไม่ใช่แค่ทำให้สวยขึ้นเฉย ๆ — งานโมชั่นและ UI ทุกอย่างในเอกสารนี้ต้องแก้ปัญหาเหล่านี้ก่อน แล้วค่อยเพิ่มความหรู ถ้าเพิ่มแอนิเมชันแล้วทำให้ข้อ B2/B4 แย่ลง ถือว่าออกแบบผิดทาง

### 0.4 Media inventory (verified from `/Assets` and `/public`)

| Set | Raw source (`/Assets`) | Processed (`/public`) | Type | Motion candidate? |
|---|---|---|---|---|
| Woven Memories, 2025 | `0–11.jpg` | `images/woven-memories/01–12.jpg` | Fashion/art stills | ✅ Cinemagraph + parallax |
| Knack Factory, 2024 | `1–8.jpg` | `images/knack-factory/01–08.jpg`, `work-assets/Knack-*.jpg` | Runway stills | ✅ Cinemagraph (fabric/light) |
| Khun Chang Khian, 2024 | `A00*.jpg` (4) | `images/khun-chang-khian/01–04.jpg` | Documentary | ✅ Slow push-in |
| BAKAO, 2024 | `1–5.jpg` | `images/bakao/01–06.jpg` | Lookbook | ➖ Optional |
| Podcast / Modal Studio | `Dan.jpg` | `images/podcast/*`, `work-assets/.../*.JPG` | Studio + screens | ➖ |
| Live Commerce (Ad The Top) | **13× `.mov`** (Colgate, Fitflop, Rojukiss, Nestlé, Guess, Sunnies, …) + 5 SOP PDFs | `videos/live-commerce/*.mp4` (already transcoded) | Vertical live video | ✅ Already video → loop/hero backdrops |
| Art Gallery | `Photography / Print / Self Portrait` (empty in export) | `images/gallery/*` | Mixed | — |
| CV | `CV — Chaiya Katkwao.pdf` | `/Website/CV — ….pdf` | Doc | — |

**Key facts for the pipeline:** raw stills are JPEG (uncontrolled resolution), the 13 live-commerce clips already exist as `.mp4` but the *source* `.mov` are higher quality, and there is **no motion layer** on any of the still sets yet. That gap is what Higgsfield fills.

---

## Part 1 — Asset Audit & Higgsfield MCP Pipeline / คลังสื่อ & ไปป์ไลน์ Higgsfield

The pipeline is a **five-stage, idempotent, manifest-driven** flow. Each stage reads a directory, writes to the next, and appends to `data/media-manifest.json` (schema in §1.6) so the front-end never hard-codes a path and re-runs are cheap.

```
┌─────────┐   ┌──────────┐   ┌───────────────┐   ┌──────────────┐   ┌──────────┐
│ 1 INGEST│ → │ 2 CLASSIFY│ → │ 3 TRANSFORM   │ → │ 4 OPTIMIZE   │ → │ 5 EMIT   │
│ scan dir│   │ tag+plan  │   │ Higgsfield MCP│   │ ffmpeg/webp  │   │ manifest │
└─────────┘   └──────────┘   └───────────────┘   └──────────────┘   └──────────┘
```

> 🇹🇭 **ภาพรวม:** ไปป์ไลน์นี้ "อ่านโฟลเดอร์ → จัดหมวด → แปลงเป็นโมชั่นด้วย Higgsfield → บีบอัด → บันทึกลง manifest" ทุกสเตจเขียนผลลัพธ์ให้สเตจถัดไป และเขียนบันทึกลงไฟล์ manifest ไฟล์เดียว ทำให้รันซ้ำได้โดยไม่พัง และหน้าเว็บดึงพาธจาก manifest ไม่ต้องฮาร์ดโค้ด

> ⚠️ **On MCP command signatures.** The tool *names/args* below are **representative** — match them to whatever your installed Higgsfield MCP server actually exposes (`list_tools` first). The **valuable, portable part is the prompt bodies and parameters**, which follow the Seedance 2.0 authoring rules. Treat `higgsfield.*` calls as pseudo-code to adapt.

### 1.1 Stage 1 — INGEST (read the local directory)

```jsonc
// Discover everything the MCP server can see under the project
higgsfield.assets.scan({
  root: "./Assets",
  include: ["**/*.jpg", "**/*.JPG", "**/*.png", "**/*.mov", "**/*.mp4"],
  ignore: ["**/.DS_Store", "**/CV/**", "**/*.pdf"],
  emit: "reports/asset-scan.json"   // path, bytes, dims, duration, codec
})
```

Output: a flat list with real dimensions/duration so Stage 2 can plan without guessing. Do **not** copy binaries yet.

### 1.2 Stage 2 — CLASSIFY (assign a motion treatment)

Each asset is tagged with exactly one **treatment** from this fixed vocabulary. This is the contract between "what we have" and "what Higgsfield does to it."

| Treatment | Input | Higgsfield op | Output | Used by |
|---|---|---|---|---|
| `upscale` | any still < 2000px on long edge | image upscale/restore | 4K still | detail pages, lightbox |
| `cinemagraph` | fashion/runway still | image→video, **micro-motion**, 4–6s loop | seamless `.mp4` loop | hero, project covers |
| `push-in` | documentary/portrait still | image→video, slow dolly, 6s | `.mp4` | Ken-Burns section reveals |
| `hero-loop` | existing live `.mp4` | trim + stabilize + loop-point + mute | 6–8s muted loop `.mp4` | hero background, contact strip |
| `seedance-scene` | brand needs a *new* shot | text/image→video (Seedance 2.0) | cinematic `.mp4` | showreel, `/commercial` bumpers |
| `poster` | any video | first-good-frame extract | `.jpg`/`.webp` poster | `<video poster>` / LCP |

```jsonc
higgsfield.assets.plan({
  scan: "reports/asset-scan.json",
  rules: [
    { match: "Woven memories/**",    treatment: ["upscale","cinemagraph"] },
    { match: "Knack Factory/**",     treatment: ["upscale","cinemagraph"] },
    { match: "Khun Chang Khian/**",  treatment: ["upscale","push-in"] },
    { match: "**/live-commerce/*.mp4", treatment: ["hero-loop","poster"] },
    { match: "BAKAO/**",             treatment: ["upscale"] }
  ],
  emit: "reports/asset-plan.json"
})
```

> 🇹🇭 **ทำไมต้องมี "vocabulary" ของ treatment:** เพื่อไม่ให้ทุกภาพถูกทำเป็นวิดีโอมั่ว ๆ ภาพแฟชั่น/รันเวย์เหมาะกับ cinemagraph (ขยับนิด ๆ เช่น ผ้าไหว แสงวูบ) ภาพสารคดีเหมาะกับ push-in ช้า ๆ ส่วนคลิป live ที่มีอยู่แล้วแค่ตัด/ทำ loop ให้เนียน การจำกัดชนิดไว้ = โทนทั้งเว็บนิ่งและคุมได้ (ตรงกับหลัก "stillness signals quality")

### 1.3 Stage 3 — TRANSFORM (the Higgsfield calls that matter)

**A. Upscale / restore** every still that feeds a full-bleed surface:

```jsonc
higgsfield.image.upscale({
  input: "Assets/Woven memories, 2025/1.jpg",
  scale: 4, face_enhance: false, denoise: "low",
  output: "build/woven/01@4k.jpg"
})
```

**B. Cinemagraph** — a still becomes a 5s seamless loop. The prompt is written to the **Seedance 2.0 “write the visible”** rule: micro-motion only, no camera cut, first frame == the still.

```jsonc
higgsfield.video.image_to_video({
  image: "build/woven/01@4k.jpg", tag: "@image1",
  duration_s: 5, loop: true, fps: 24, resolution: "1080x1920",
  prompt: `
SCENE CONTEXT
A single held fashion frame comes subtly alive as a seamless loop. Nothing enters or leaves.

ACTIVE REFERENCES
@image1: the woven-textile fashion still, 100% matches the reference. Garment texture, fold positions, and skin tone stay identical.

FIRST FRAME / BLOCKING
Identical to @image1 — same crop, same subject position, same gaze. The loop returns to this exact frame.

FORMAT MODE
One continuous shot, the camera does not cut on its own.

OPTICS
MCU, 29° FOV, portrait compression, no drift.

CAMERA
Locked off, tripod-still, no push, no pan.

ACTION
Only micro-motion: woven fabric threads lift ~2mm in a slow breath, a single strand of hair drifts, catch-light in the eye shifts once. Motion completes and returns to frame one for a seamless loop.

PHYSICS
Cloth moves with real weight and inertia; no rubbery warping.

LIGHTING
Existing soft key from frame left holds constant, 4000K, exposure unchanged.

STYLE
Photoreal, fine grain, no stylization, matches the source photograph exactly.

POSITIVE LOCKS
Loop is seamless; first and last frame identical; identity and wardrobe unchanged; camera stays locked; only fabric, hair, and catch-light move.`,
  output: "build/woven/01.loop.mp4"
})
```

**C. Push-in** (documentary) — same call, different prompt body:

```
ACTION
Slow dolly-in at 1 km/h from MS to MCU over 6 seconds; subject and horizon hold. No cut.
CAMERA
18° FOV, eye-level, smooth motorized push, operator anchored dead-center.
LIGHTING
Northern overcast daylight, 5600K, unchanged across the move.
POSITIVE LOCKS
Straight push only, no pan or roll; grain and color match the source frame.
```

**D. Hero-loop** from existing live clips — clean up, not regenerate:

```jsonc
higgsfield.video.process({
  input: "public/videos/live-commerce/fitflop-may.mp4",
  ops: ["stabilize", { trim: { start: 4.0, end: 10.0 } },
        { loop_point: "auto" }, "mute", { fade: 0.4 }],
  resolution: "1080x1920", output: "build/hero/fitflop.loop.mp4"
})
```

**E. Seedance-scene** (only when a brand-new cinematic bumper is needed, e.g. a showreel intro). Author the full Seedance 2.0 prompt per the block structure — SCENE CONTEXT → LOCKS. Keep to **one** brand look; this is where "futuristic" earns its place without touching the calm gallery pages.

> 🇹🇭 **หลักสำคัญของ prompt:** Seedance ตอบสนองต่อ "สิ่งที่มองเห็นและวัดได้" ไม่ใช่คำอารมณ์ — สั่งความเร็วเป็น km/h สั่งแสงเป็นทิศทาง/เคลวิน และ **ล็อกเฟรมแรก = ภาพต้นฉบับ** เพื่อให้ cinemagraph เนียนและไม่เพี้ยนหน้า/เสื้อผ้า สำหรับคลิป live ที่มีอยู่แล้ว "อย่า" เจนใหม่ — แค่ stabilize/ตัด/ทำ loop/ปิดเสียง พอ

### 1.4 Stage 4 — OPTIMIZE (ship-weight, not lab-weight)

Higgsfield outputs are masters. The web needs light, dual-format, poster-backed derivatives. This stage is plain `ffmpeg` (no MCP) and is deterministic:

```bash
# H.264 (universal) + WebM/VP9 (smaller) for every loop
ffmpeg -i build/woven/01.loop.mp4 -an -movflags +faststart \
  -vf "scale=1080:-2" -c:v libx264 -crf 23 -preset slow \
  public/videos/motion/woven-01.mp4
ffmpeg -i build/woven/01.loop.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 34 \
  public/videos/motion/woven-01.webm
# Poster frame (LCP-safe, never a blank first frame)
ffmpeg -i build/woven/01.loop.mp4 -vf "select=eq(n\,0)" -frames:v 1 \
  public/videos/motion/woven-01.poster.jpg
# Stills → responsive AVIF/WebP set
for w in 640 1080 1920; do
  ffmpeg -i build/woven/01@4k.jpg -vf "scale=${w}:-2" -q:v 3 \
    public/images/woven-memories/01-${w}.webp
done
```

**Budgets (hard caps):** hero loop ≤ **2.5 MB**, section loop ≤ **1.5 MB**, poster ≤ **120 KB**, still (1080w WebP) ≤ **180 KB**. If a file busts the cap, lower CRF/resolution before shipping.

> 🇹🇭 **ทำไมต้องมี budget:** วิดีโอโมชั่นสวยแต่หนักจะทำให้ B4 ("เลื่อนแล้วเหนื่อย/ช้า") กลับมาอีก กำหนดเพดานขนาดไฟล์ตายตัว + ทำ poster ทุกคลิป (กันจอว่างตอนโหลด) + โหลดเฉพาะตอนเข้าจอ (§2.5)

### 1.5 Stage 5 — EMIT (write the manifest)

The final step writes/updates `data/media-manifest.json`. **The front-end imports this, never raw paths.** This decouples the pipeline from the UI: re-run Higgsfield, manifest updates, components pick up new motion automatically.

### 1.6 `media-manifest.json` schema

```ts
// data/media-manifest.ts  (typed wrapper around the JSON)
export type MotionAsset = {
  id: string;                 // "woven-01"
  set: string;                // "woven-memories"
  kind: "still" | "loop" | "push-in" | "hero-loop";
  poster: string;             // "/videos/motion/woven-01.poster.jpg"
  sources: { src: string; type: "video/mp4" | "video/webm" }[];
  still?: { src: string; w: number; h: number }[]; // responsive set
  alt: string;
  aspect: number;             // 0.5625 for 9:16, 1.7778 for 16:9
  durationS?: number;
  treatment: string[];        // provenance from Stage 2
};
export type MediaManifest = { version: string; generatedAt: string; assets: MotionAsset[] };
```

```jsonc
// example entry
{
  "id": "woven-01", "set": "woven-memories", "kind": "loop",
  "poster": "/videos/motion/woven-01.poster.jpg",
  "sources": [
    { "src": "/videos/motion/woven-01.webm", "type": "video/webm" },
    { "src": "/videos/motion/woven-01.mp4",  "type": "video/mp4" }
  ],
  "still": [
    { "src": "/images/woven-memories/01-1080.webp", "w": 1080, "h": 1920 }
  ],
  "alt": "Woven Memories — woven textile fashion frame",
  "aspect": 0.5625, "durationS": 5, "treatment": ["upscale","cinemagraph"]
}
```

---

## Part 2 — Motion & Interactive UI/UX Design Language / ภาษาการเคลื่อนไหว

The site already has a strong, restrained motion identity. **We extend it, we do not replace it.** The north star from `PRODUCT.md` — *"stillness signals quality," "the UI steps back," "let the work lead"* — governs every motion decision. Motion serves the media; it never performs for itself.

### 2.1 Motion tokens (canonical — lift into code)

```ts
// lib/motion.ts
export const EASE = {
  out:   [0.16, 1, 0.3, 1],    // exponential ease-out — THE signature curve (already in use)
  inOut: [0.65, 0, 0.35, 1],   // symmetric, for reversible scroll-scrub
} as const;

export const DUR = {          // seconds
  micro: 0.2,   // hover, button, focus
  base:  0.6,   // label/text reveals
  enter: 0.9,   // section entrances (matches FadeIn)
  media: 1.2,   // full-bleed image/video reveals
} as const;

export const STAGGER = { tight: 0.06, base: 0.09, loose: 0.14 } as const;
export const REVEAL_MARGIN = "-8% 0px";   // trigger just before in-view
```

Rules, non-negotiable: **exponential ease-out only** (no bounce, no elastic), one page-load orchestration per view, and `prefers-reduced-motion` collapses all of the above to a 0.15s opacity fade (the existing `FadeIn` already does this — keep the pattern).

> 🇹🇭 **โทเคนโมชั่น:** ดึงค่า ease/duration/stagger มาไว้ที่เดียว (`lib/motion.ts`) ทั้งเว็บใช้เส้นโค้งเดียวกัน = `cubic-bezier(0.16,1,0.3,1)` ที่โปรเจกต์ใช้อยู่แล้ว ห้ามเด้ง ห้ามยืด และต้องเคารพ `prefers-reduced-motion` เสมอ

### 2.2 Animation catalogue (the 6 patterns, used with intent)

Mirrors the video-to-website discipline of *variety without repetition* — never the same entrance twice in a row.

| Pattern | Trigger | Motion | Where |
|---|---|---|---|
| `fade-up` | in-view | y:24→0, opacity, `DUR.enter` | body copy, bio, labels |
| `media-reveal` | in-view | `clip-path: inset(12% 0 → 0)` + scale 1.04→1 | full-bleed covers, featured project |
| `parallax` | scroll scrub | y offset ±60px on media vs. text | project detail heroes |
| `push-in-video` | in-view | poster→autoplay loop, opacity fade-in | motion sections from §1.3 |
| `marquee` | scroll scrub | oversized wordmark translateX (≥10vw type) | one interstitial only |
| `counter` | in-view once | count-up on stats (years, shows, clients) | About / CV |

### 2.3 Hero re-proportion (fixes B4)

Current hero: `h-[85vh]` portrait diptych that auto-rotates 6 slides — visually heavy, "tiring." New spec:

- **Height** `min(78vh, 760px)` desktop, `62vh` mobile — reclaim breathing room at the fold.
- Replace the blurred-bg-behind-portrait pattern with a **single motion loop** (`hero-loop` treatment) filling a **16:9 landscape** stage on desktop; the info panel becomes a **lower-third overlay**, not a full column.
- Auto-advance stays at 6s but pauses on hover/focus and on `prefers-reduced-motion` (already implemented — preserve).
- Slide indicator gets a **thin determinate progress bar** (0→100% over the 6s) so users *see* the set will change (partial fix for B6's "no sign of changing").

> 🇹🇭 **ฮีโร่:** ปัญหาคือรูปแนวตั้งเต็มจอทำให้ "เลื่อนแล้วเหนื่อย" แก้โดยลดความสูง ใช้คลิปโมชั่น 16:9 หนึ่งตัวเป็นพื้น แล้ววางข้อมูลเป็นแถบล่าง (lower-third) พร้อมแถบ progress บาง ๆ ให้รู้ว่าสไลด์กำลังจะเปลี่ยน

### 2.4 Scroll choreography (Framer Motion, no extra lib)

```tsx
// Section reveal — the workhorse. Reuses FadeIn's contract.
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y      = useTransform(scrollYProgress, [0, 1], [60, -60]);   // parallax
const clip   = useTransform(scrollYProgress, [0, 0.35], ["inset(12% 0 0 0)", "inset(0 0 0 0)"]);
// respect reduced motion: if useReducedMotion() → y = 0, clip = "inset(0 0 0 0)"
```

Full-bleed media uses `whileInView` + `viewport={{ once: true, margin: REVEAL_MARGIN }}`. Parallax uses `useScroll`/`useTransform` scrub. **Both already exist in `CreativeProducerHero.tsx`** — we are standardizing, not inventing.

### 2.5 Video-background implementation (performance-first)

```tsx
// components/MotionMedia.tsx — the single component every motion asset renders through
// - poster shown immediately (LCP), <video> mounts only when IntersectionObserver fires
// - autoplay muted playsInline loop; pauses when off-screen; swaps to poster on reduced-motion
<video poster={asset.poster} muted loop playsInline preload="none"
       ref={mountWhenVisible} aria-label={asset.alt}>
  {asset.sources.map(s => <source key={s.src} src={s.src} type={s.type} />)}
</video>
```

Rules: never more than **2** videos playing at once; off-screen videos `.pause()`; the hero video is the only `preload="auto"`; everything else `preload="none"` + IO-mounted. Data-saver / reduced-motion → poster still only.

### 2.6 Framer Motion vs. GSAP — the decision

**Stay on Framer Motion.** The project already depends on it, it covers 100% of §2.2, and adding GSAP+ScrollTrigger duplicates the scroll engine and inflates the bundle. Only introduce GSAP if a future ask needs *canvas frame-by-frame scroll video* (the video-to-website skill's technique) — and if so, isolate it to that one route, do not globalize it.

> 🇹🇭 **Framer Motion หรือ GSAP:** เลือก Framer Motion เพราะโปรเจกต์ใช้อยู่แล้วและครอบคลุมทุกแพตเทิร์นที่ต้องการ เพิ่ม GSAP = โหลดสคริปต์ซ้ำซ้อน จะใช้ GSAP ก็ต่อเมื่อทำ "เลื่อนแล้วเล่นวิดีโอทีละเฟรมบน canvas" เท่านั้น และให้แยกไว้เฉพาะหน้านั้น

### 2.7 Bug backlog → concrete fixes

| Bug | Fix | Acceptance test |
|---|---|---|
| **B1** rapid-click crash | Keep Lightbox 350ms debounce; add the same `navigating` ref guard to hero `handleNavigation` (already present — verify it can't be bypassed by keyboard-repeat). | Hold `→` 3s in hero + lightbox: no error, no skipped frames |
| **B2** unreadable type | Raise mono-label floor to **11px**, tracking `0.18em`; body min **16px**; muted text `#6B6560`→**`#8B857F`** (passes WCAG AA on `#000`); keep display font. | Lighthouse a11y ≥ 95; contrast ≥ 4.5:1 on all body/label text |
| **B3** no Commercial list | Add a **list view toggle** (grid ⇄ list) on `/commercial`: list rows = index · title · year · role · tags, hover reveals a thumbnail. | `/commercial` shows a scannable table-like list; keyboard navigable |
| **B4** heavy hero | Re-proportion per §2.3. | Hero ≤ 78vh desktop; first meaningful paint shows work, not a wall of portrait |
| **B5** no gallery gap | Masonry `column-gap`/`margin-bottom` `3px`→**`16px`** (`--space-md`); add set headers with breathing room. | Visible separation between images and between sets |
| **B6** invisible controls | Lightbox: solid **44×44px** hit areas, always-visible chevrons with a subtle scrim, ✕ inside a bordered chip top-right, swipe hint on first open; hero progress bar (§2.3). | All controls visible on the darkest artwork; hit targets ≥ 44px |

> 🇹🇭 **สรุปการแก้บั๊ก:** ทุกข้อผูกกับไฟล์จริงและมี "เกณฑ์ผ่าน" ชัด โดยเฉพาะ B2 (ตัวอักษรอ่านยาก) และ B6 (ปุ่มมองไม่เห็น) เป็นเรื่อง accessibility ที่ต้องผ่าน WCAG AA และ hit target ≥ 44px

---

## Part 3 — Full Front-End Architecture / สถาปัตยกรรมฟรอนต์เอนด์

### 3.1 Target file tree (additions marked `+`)

```
app/
  layout.tsx                 # fonts, Navigation, editorial spine (keep)
  page.tsx                   # → PortfolioHome
  globals.css                # canonical tokens (§4.2)
  commercial/
    page.tsx                 # + grid⇄list toggle (B3)
    [slug]/page.tsx          # + parallax hero, MotionMedia galleries
  gallery/page.tsx           # + 16px masonry rhythm (B5)
  about/page.tsx             # + counter stats
  cv/page.tsx                # PrintButton (keep)
  chat/…                     # AI chat (keep)
  api/chat/route.ts          # keep
components/
  Navigation.tsx  Footer.tsx  FadeIn.tsx  Lightbox.tsx  PageTransition.tsx
  PrintButton.tsx  YouTubeEmbed.tsx
+ MotionMedia.tsx            # §2.5 — the ONLY way motion assets render
+ HeroStage.tsx              # §2.3 — refactor of CreativeProducerHero
+ Reveal.tsx                 # thin wrapper standardizing §2.4 scroll reveals
+ CommercialList.tsx         # §B3 list view
+ Counter.tsx                # §2.2 count-up
  portfolio/PortfolioHome.tsx
data/
  commercial.ts  youtube.ts  work-asset-urls.ts
+ media-manifest.json        # §1.6 — pipeline output
+ media-manifest.ts          # typed accessor
lib/
  system-prompt.ts
+ motion.ts                  # §2.1 tokens
public/
  images/…  videos/…  work-assets/…
+ videos/motion/…            # §1.4 optimized loops + posters
```

### 3.2 Key component specs

**`MotionMedia`** (§2.5) — props `{ id: string }` (looks up manifest) `| { asset: MotionAsset }`; renders poster→video with IO mount; `fit: "cover" | "contain"`; emits nothing if reduced-motion (poster only). Every hero/cover/section loop goes through this.

**`HeroStage`** (refactor of `CreativeProducerHero`) — 16:9 landscape motion stage, lower-third info overlay, determinate 6s progress bar, prev/next + tablist (keep a11y roles), debounced nav (B1), pause on hover/focus/reduced-motion. Data comes from `media-manifest` entries flagged `kind:"hero-loop"`.

**`CommercialList`** (B3) — toggled from `/commercial`; `role="table"`-like semantics; each row `index · title · year · role · tags`; hover/focus reveals a `MotionMedia` thumbnail; deep-links to `/commercial/[slug]`.

**`Lightbox`** (upgrade existing, B6) — keep the 350ms debounce and spring; enlarge controls to 44px, always-visible chevrons over a 0→transparent scrim, bordered ✕ chip, first-open swipe hint, index counter `01 / 08`. Keyboard-native (Esc/←/→) stays.

**`Reveal`** (standardize §2.4) — wraps children with `fade-up` | `media-reveal` | `parallax` via a `variant` prop, reading `lib/motion.ts`. Replaces ad-hoc `motion.div` blocks over time.

### 3.3 Data flow

```
media-manifest.json ──▶ media-manifest.ts (typed) ──▶ MotionMedia / HeroStage
data/commercial.ts  ──▶ /commercial (+CommercialList) ──▶ /commercial/[slug]
data/youtube.ts     ──▶ YouTubeEmbed (podcast project)
lib/system-prompt.ts + data/commercial.ts ──▶ /api/chat ──▶ /chat
```

Projects stay authored by hand in `commercial.ts` (curatorial control); **only media/motion is manifest-driven.** The AI chat's system prompt should be extended to know about the new motion sets so it can answer "show me the fashion work."

---

## Part 4 — Design Tokens / โทเคนดีไซน์ (canonical)

### 4.1 Principles (from `PRODUCT.md`, enforce in review)

1. Let the work lead — chrome steps back. 2. Confident restraint. 3. Brutalist clarity — grid/type/space honest. 4. Stillness signals quality. 5. Function is credibility (WCAG AA, reduced-motion).

### 4.2 Tokens (mirror of shipping `globals.css` — the contract)

```css
@theme inline {
  /* SURFACES — ink black → elevated */
  --color-bg:#000; --color-surface:#0A0A0A; --color-surface-elevated:#111; --color-surface-hover:#161616;
  /* TEXT — B2 fix: muted raised for AA */
  --color-text:#F9F9F9; --color-text-muted:#8B857F; /* was #6B6560 */ --color-text-dim:#4A4744;
  --color-text-inverse:#000;
  /* LINES */
  --color-border:rgba(249,249,249,0.09); --color-border-strong:rgba(249,249,249,0.22);
  /* ACCENT — the ONE warm signal, ≤10% of any screen */
  --color-accent:oklch(72% 0.18 35); --color-accent-dim:oklch(72% 0.18 35 / 0.3);
  /* SELECTION / FOCUS */
  --color-selection-bg:#F9F9F9; --color-selection-text:#000; --color-focus-ring:rgba(249,249,249,0.55);
  /* TYPE */
  --font-display:var(--font-archivo-black); --font-body:var(--font-jakarta); --font-mono:var(--font-jetbrains-mono);
}
```

### 4.3 Type scale (B2-corrected floors)

| Role | Font | Size | Notes |
|---|---|---|---|
| Display | Archivo Black 400 | `clamp(2.5rem,10vw,5.5rem)` | hero, mobile nav, contact |
| Headline | Archivo Black 400 | `clamp(1.5rem,4vw,3.5rem)` | project titles, section H2 |
| Body | Jakarta 400 | **min 16px** / `clamp(1rem,1.8vw,1.15rem)` | line-length 60–72ch |
| Label | JetBrains Mono 500 | **min 11px** (was 9px), tracking 0.18em, uppercase | nav, chips, meta |
| Micro | JetBrains Mono 400 | **11px** floor, tracking 0.25em | index counters, credits |

> 🇹🇭 **B2 คือหัวใจ:** ยกพื้นขนาดตัวอักษร label จาก 9px → 11px, body ขั้นต่ำ 16px และเพิ่มคอนทราสต์ของสีเทา เพื่อให้ "คนทั่วไปอ่านออก" โดยยังรักษาบุคลิก mono-label ของแบรนด์ไว้

### 4.4 Spacing / radius / motion

`--space-xs 4 · sm 8 · md 16 · lg 32 · xl 64` (all ×8 grid). Radius: `0` default, `9999px` only on the primary CTA. Motion tokens per §2.1. Grain overlay `opacity 0.038` (keep). Masonry gap → **16px** (B5).

---

## Part 5 — Claude Code Execution Blueprint / แผนสั่งงาน Claude Code

### 5.1 Build order (dependency-ordered task graph)

```
T0  Read AGENTS.md + node_modules/next/dist/docs (Next 16 guardrail)     [BLOCKER]
T1  lib/motion.ts + data/media-manifest.ts (types)                       ← foundation
T2  Run Higgsfield pipeline §1 → populate public/videos/motion + manifest ← can run in parallel with T1
T3  MotionMedia.tsx (§2.5) + Reveal.tsx (§2.4)                            ← depends T1
T4  HeroStage.tsx (§2.3, fixes B1/B4)                                     ← depends T2,T3
T5  Lightbox upgrade (B6) + gallery rhythm (B5)                          ← depends T3
T6  CommercialList.tsx (B3) + /commercial toggle                         ← depends T1
T7  Counter.tsx + About/CV stats                                         ← depends T3
T8  Type-legibility pass (B2) across globals.css + all pages             ← cross-cutting
T9  Extend /api/chat system prompt with motion sets                      ← depends T2
T10 QA: portfolio-qa.sh + Lighthouse + reduced-motion + 44px audit       ← final gate
```

### 5.2 Per-task prompt template (paste into Claude Code)

```
TASK: <e.g. T4 — Build HeroStage>
CONTEXT: Read /FRONTEND_SPEC.md §2.3, §3.2, §2.1. Ground truth = app/globals.css tokens.
CONSTRAINTS:
  - Next.js 16: read node_modules/next/dist/docs before writing (AGENTS.md).
  - Framer Motion only (no GSAP). Exponential ease-out only. Respect prefers-reduced-motion.
  - Render ALL motion assets through <MotionMedia/>. No hard-coded media paths — use data/media-manifest.
  - Accent ≤10% of screen. Label ≥11px, body ≥16px (B2).
INPUT DATA: data/media-manifest.json entries where kind === "hero-loop".
DELIVERABLE: components/HeroStage.tsx + wire into portfolio/PortfolioHome.tsx.
ACCEPTANCE: §2.7 tests for B1 + B4; hero ≤78vh desktop; progress bar advances over 6s; no console errors.
```

### 5.3 Acceptance gates (T10 — must all pass)

- **Perf:** LCP < 2.5s on 4G; hero loop ≤ 2.5MB; ≤2 videos playing; no CLS from late media.
- **A11y (WCAG AA):** contrast ≥ 4.5:1 all text; hit targets ≥ 44px; keyboard-complete lightbox + hero; visible focus rings; `prefers-reduced-motion` → posters + 0.15s fades.
- **Bugs:** B1–B6 each pass their §2.7 test.
- **Fidelity:** ink-black palette, single amber accent ≤10%, Archivo/Jakarta/JetBrains only, grain intact.
- **Build:** `npm run build` clean; `npm run lint` clean; `./portfolio-qa.sh` green.

### 5.4 Hard guardrails (repeat to the agent every task)

1. **Next 16 ≠ your memory** — read local docs first (`AGENTS.md`). 2. **No new heavy deps** — Framer Motion is the motion engine. 3. **Manifest, not paths** — media resolves through `data/media-manifest`. 4. **Motion serves media** — if an animation draws attention to itself, remove it. 5. **Never regress B1–B6.** 6. **`prefers-reduced-motion` is not optional.**

> 🇹🇭 **แผนสั่งงาน:** ทำตามลำดับ T0→T10 โดย T0 (อ่าน docs Next 16) เป็นตัวบล็อกทุกอย่าง แต่ละงานมีเทมเพลต prompt พร้อม "เกณฑ์ผ่าน" ให้ Claude Code ทำแล้วตรวจได้เอง เป้าหมายสุดท้ายคือผ่าน gate ทั้งหมดใน T10 (perf / a11y / บั๊ก / ความเที่ยงตรงของดีไซน์ / build)

---

## Appendix A — Higgsfield run sheet (copy/paste order)

```
1. higgsfield.list_tools()                         # confirm actual tool names, adapt §1 calls
2. higgsfield.assets.scan(...)          → reports/asset-scan.json
3. higgsfield.assets.plan(...)          → reports/asset-plan.json   # review before spending credits
4. for each plan item:
     higgsfield.image.upscale(...)      → build/**@4k.jpg
     higgsfield.video.image_to_video(...) OR .video.process(...)  → build/**.mp4
5. ffmpeg optimize (§1.4)               → public/videos/motion, public/images
6. write data/media-manifest.json (§1.6)
7. git add public/videos/motion data/media-manifest.json
```

## Appendix B — Definition of Done

A viewer lands, sees calm motion that showcases the work (not the UI), can read every label, finds and operates every control, scans Commercial as a list, browses the gallery with clear spacing, and leaves able to make a hire decision — on any device, with reduced-motion respected. All six reported bugs are gone. Claude Code can rebuild the whole thing from this file plus the repo.

> 🇹🇭 **นิยาม "เสร็จ":** ผู้ชมเข้ามาเห็นโมชั่นที่ "โชว์งาน ไม่ใช่โชว์ UI", อ่านตัวอักษรออกทุกจุด, เห็นและกดปุ่มได้ทุกปุ่ม, ดู Commercial เป็นลิสต์ได้, แกลเลอรีมีระยะห่างชัด, และตัดสินใจจ้างได้ — บนทุกอุปกรณ์ และเคารพ reduced-motion บั๊กทั้ง 6 ข้อหายหมด
