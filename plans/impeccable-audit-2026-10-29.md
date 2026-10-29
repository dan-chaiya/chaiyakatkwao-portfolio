# Impeccable audit: 2026-10-29 (v2)

Run with the vendored skill (`.agents/skills/impeccable`, `audit`) against `647685a`, the first audit of
v2 (the artist's archive, merged in #32). Report only; nothing in the app was changed.

Method: production build (`next build` + `next start`) in Chromium. axe-core 4 (WCAG 2.0/2.1/2.2 A+AA +
best-practice) on 10 routes at 390 and 1440 (20 runs). On top of that: CLS under real wheel scrolling,
credits/photo collision on every work at three laptop sizes, transfer weight per page, contrast of text
over the hero photo (sampled from the screenshot), keyboard focus in the header, reduced motion.
`npm run lint` and `npx tsc --noEmit`: both clean.

## Score

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 3 | Looping video with no pause; header focus ring ≈1.1:1 under the difference blend |
| 2 | Performance | 2 | Home CLS 0.63 (1440) / 1.00 (390) while scrolling; 2.0 MB of thumbnails on one viewer page |
| 3 | Responsive | 3 | Credits print over the photograph on 1280–1440 laptops; 16px-tall header links on phones |
| 4 | Theming | 3 | Four clean v2 tokens, but literals (`#fff`, `#fbfbfb`) and a second token system on /cv and /chat |
| 5 | Anti-patterns | 3 | Hero-metric stat row on /systems; text over the work in two places |
| | **Total** | **14/20** | **Good: address Performance first** |

v1 closed at 20/20 on 4 October. Most of the drop is v2 re-opening problems v1 had already solved:
neighbour prefetch, 44px tap targets, written alt text, nothing printed over the work.

## Anti-patterns verdict

Pass, with two tells. v2 reads as authored, not generated: the fitted condensed name, the image column
running up through it, the numbered Index. The tells:

1. **Hero-metric template on /systems** (`20+ releases`, `1 author`, `7 tabs`, `0 servers`): big mono
   number, small grey label, four across. An absolute ban in the skill, and DESIGN.md §5 banned it by name.
2. **Text over the work.** The discipline row sits on the hero photo; the viewer credits land on the
   photograph (P1 below). Both break the v1 rule "no text on the photograph".

Judgment call, not a defect: difference-blend header + live clock + numbered index table + a preview that
follows the cursor is the most saturated "artist archive" lane of 2024–26. It's a committed identity now,
so it stays; the risk is that an agency has seen this exact kit before.

## Findings

### P1: fix before the next push to production

**[P1] Credits print over the photograph in the viewer**
- Where: `components/v2/Viewer.tsx:119`, `app/(v2)/v2.css:123` (stage inset) and `:134` (credits)
- Category: Responsive / Anti-pattern
- Measured: of the first 6 frames of every work, credits overlap the media on 19 frames at 1440×900,
  20 at 1280×720 and 7 at 1920×1080 (up to 237×38 px; Woven memories 01 at 1440 is 144×95 px).
- Impact: ink text sits on mid-tone photos (hard to read) and covers the work, on the most common laptop sizes.
- Fix: give the credits their own lane at ≥768px. For example, stage `inset: 56px var(--gutter) 96px calc(340px + 2 * var(--gutter))`,
  or a two-column grid (credits | stage). Phone layout already stacks and is fine.
- Command: `layout`

**[P1] Looping autoplay video with no pause, also under reduced motion**
- Where: `components/v2/Viewer.tsx:33-47` (`/work/live-commerce`)
- Category: Accessibility
- Measured: 6 s clip, `loop`, no controls; with `prefers-reduced-motion: reduce` it still autoplays (`paused: false`).
- WCAG: 2.2.2 Pause, Stop, Hide (A). DESIGN.md's own rule: anything that moves for more than 5 s gets a stop control.
- Fix: a pause/play control (the v1 hero's 44px square), and no autoplay when `usePrefersReducedMotion()` is true (show the poster).
- Command: `harden`

**[P1] Header focus ring nearly invisible**
- Where: `app/(v2)/v2.css:26` and `:40`
- Category: Accessibility
- Measured: header is `mix-blend-mode: difference`; the ring is `var(--ink)` (#111), which renders ≈#EAEAEA on
  #FBFBFB paper, about 1.1:1. Every page; the header holds the only navigation.
- WCAG: 1.4.11 Non-text Contrast, 2.4.7 Focus Visible (AA).
- Fix: `.v2-header :focus-visible { outline-color: #fff; }`. Under difference it becomes ink on paper and
  stays the inverse over photos, the same trick the header text already uses.
- Command: `harden`

**[P1] Home shifts its whole layout while scrolling**
- Where: `components/v2/HomeStage.tsx:36-58` (GSAP `pin: true`)
- Category: Performance
- Measured with real wheel input: CLS 0.625 at 1440, 1.001 at 390, source `.v2-stage`. Scroll is not an
  input that excuses a shift, so field data (Chrome UX report, Search Console) counts it. Good is ≤0.1.
- Impact: the home page fails Core Web Vitals in the field. Visually it may look seamless; the metric still records it.
- Fix: make the stage `position: sticky; top: 0` inside a wrapper as tall as the scroll distance, and keep GSAP
  for the column's `y` scrub only. No pin, no pin-spacer, no shift. Re-measure with the same wheel test.
- Command: `optimize`

### P2: next pass

**[P2] Thumbnails are 800px images shown 44px tall**
- Where: `components/v2/Viewer.tsx:58-62`, assets from `scripts/import-assets.mjs`
- Measured: `/work/untitled` loads 18 thumbnails = 2.0 MB (≈112 KB each); `/work/live-commerce` 12 = 513 KB.
- Fix: write a `-160` variant (≈5 KB) in the import script and point `thumbOf()` at it.
- Command: `optimize`

**[P2] Viewer steps wait on the network**
- Where: `components/v2/Viewer.tsx:113` (`key={i}` remounts the frame; only the current frame exists)
- Impact: next/previous fetches a full-size image on each press. v1's lightbox fetched both neighbours
  ahead (4 Oct audit: 22 ms to ready). The `-800` thumbnails don't help: at 1440 the main image picks the full-size candidate.
- Fix: preload frames i±1 with the same `srcset`/`sizes` (hidden `<link rel="preload" as="image" imagesrcset>` or `new Image()`).
- Command: `optimize`

**[P2] Hero labels fail contrast on the photo**
- Where: `components/v2/HomeStage.tsx:65-69`, `app/(v2)/v2.css:54`
- Measured on the 1440 render: "Art" 3.6:1 and "Production" 3.6:1 against the median pavement behind them,
  2.4:1 against its brightest tenth. "Photography" and "Systems" pass (≈10:1). 13px text needs 4.5:1.
- WCAG: 1.4.3 (AA). It also depends on the crop, so phones differ.
- Fix: move the discipline row off the photo (below the hero, on paper), or let the header's difference blend set it too.
- Command: `layout`

**[P2] Alt text went from descriptions to counters**
- Where: `components/v2/Viewer.tsx:17` (`"Woven memories, 3 of 12"`); Home column uses the title
- Impact: v1 had 79 written descriptions (`data/alt-text.json`, "like a museum caption"); v2 doesn't read them,
  and its asset paths changed. A screen-reader user hears a counter for every frame of an image-led archive.
- WCAG: 1.1.1 (minimal equivalent at best).
- Fix: carry descriptions into `works.json` per frame (`alt`), keep the counter in the live region where it already is.
- Command: `clarify`

**[P2] Hero-metric row on /systems**
- Where: `app/(v2)/systems/page.tsx:196-203`, `app/(v2)/v2.css:194-197`
- Fix: drop the `dl`, or set the four facts as one body sentence under the lede. The numbers are modest
  ("1 author", "0 servers"); at 56px they read as SaaS, not as a working studio.
- Command: `distill`

**[P2] Phone tap targets regressed**
- Measured at 390: header links 16px tall (Index 34×16, Information 71×16); Information contact links
  (CV 18×16); viewer "Info" 23×18. v1 gave every small link 44px through `.tap-target`.
- Fix: bring `.tap-target` (an invisible 44px box, the label keeps its size) into `v2.css`.
- Command: `adapt`

**[P2] /systems diagram can't be scrolled by keyboard on phones**
- Where: `app/(v2)/systems/page.tsx:145`; axe `scrollable-region-focusable` (serious) at 390
- Fix: `tabIndex={0} role="region" aria-label="How the app is put together, scrolls sideways"` on the figure.
- Command: `harden`

**[P2] /cv and /chat are a second site**
- Archivo Black, the theme switch and the old nav. The nav still lists Commercial, Gallery and About, which
  now redirect into v2, so Information → CV → Commercial changes design twice. A saved Ink theme shows only
  there. axe: the CK logo's label "Chaiya Katkwao, home" doesn't contain its visible text (2.5.3, serious).
- Fix: give /cv the v2 header and type (it's linked from Information), and decide whether /chat stays.
- Command: `adapt`

### P3: if time permits

- **[P3] Scroll libraries on every page.** GSAP + ScrollTrigger + Lenis (≈48 KB gz) load through the v2 layout;
  only Home uses ScrollTrigger, and Lenis runs on the viewer, which never scrolls. Scope them to Home (and decide
  whether smooth scroll earns its weight elsewhere). `optimize`
- **[P3] Em dash in the Home title**: "Chaiya Katkwao — Photography, Art, Production, Systems"
  (`app/(v2)/page.tsx:7`). Copy rule: no em dashes. `clarify`
- **[P3] Filter in a `<nav>`** (`components/v2/IndexView.tsx:99`). It filters; it doesn't navigate. `<div role="group" aria-label="Filter by discipline">`.
- **[P3] Literal colours**: header `color: #fff` and `body:has(.v2) { background: #fbfbfb }` duplicate the tokens (`v2.css:21, 40`).
  Name them (`--paper`, plus a `--blend` token) so a later palette change can't miss them.

## Patterns and systemic issues

1. **The spec describes v1.** DESIGN.md and PRODUCT.md don't mention v2 once (#FBFBFB, Archivo condensed,
   Plex Mono, Index, the viewer). Their rules contradict what shipped: Cue Light, Archivo Black heads,
   "no text on the photograph", PRODUCT.md's "no centred hero" and its creative-producer-for-agencies
   positioning. Every impeccable command loads these two files first, so the next `polish` or `critique`
   will pull v2 back toward v1. Fix this before any other command. `teach` (PRODUCT.md), then `document` (DESIGN.md).
2. **v1 fixes didn't carry into v2.** Prefetch, tap targets, alt text, reduced-motion for video, text off the
   work: each was solved in v1 components (Lightbox, `.tap-target`, `lib/photos.ts`, HeroStage) and v2 rebuilt
   the components from scratch without them. When the spec is rewritten, keep these as rules, not as components.
3. **The difference blend needs its own rules.** It carries the header text correctly, but the focus ring
   didn't follow, and axe can't evaluate it (see below). Anything inside `.v2-header` must be specified in
   `#fff`-under-difference terms.

## What works

- 0 horizontal overflow in 20 runs; every route has a phone layout.
- CLS 0.000 on every route except Home, including Information after today's portrait fix.
- `<picture>` with AVIF + WebP, explicit `aspect-ratio`, lazy below the fold, the hero eager with `fetchpriority="high"`.
- Fonts: 3 files, 145 KB; Archivo Black and Noto Sans Thai don't preload on v2.
- Reduced motion turns off the Home pin, Lenis and the viewer fade, through the hydration-safe hook.
- Index: a real table with `scope`, the whole row is the link, `:focus-within` inverts the row, `aria-pressed` filters.
- Viewer: `aria-live` counter, `aria-expanded` Info, labelled prev/next and frame buttons, arrow keys and swipe.
- /systems diagram: SVG with `<title>` and `<desc>`. 404 returns a real 404 with its own title.

## Not a finding

axe flags `color-contrast` ×4 on every paper page (the header name, Index, Information, the clock). axe
can't compute `mix-blend-mode`; white text under difference renders #040404 on #FBFBFB. Leave it.

## Not covered

A real iPhone, a screen reader, 200% zoom, and the YouTube frames (`i.ytimg.com` is blocked from the audit
sandbox, so `/work/podcast-studio`'s console errors are environmental).

## Fixed on this branch (2026-10-29)

The four P1s, plus one bug found while fixing them. Measured on the production build with the same probes.

| Finding | Before | After | Change |
|---|---|---|---|
| Home layout shift while scrolling | CLS 0.625 (1440), 1.001 (390) | 0.000, 0.001 (the clock ticking) | `HomeStage.tsx`: `position: sticky` hold inside a section as tall as the run; GSAP keeps only the column's `y` scrub, no pin |
| Credits over the work | 19–20 of the first 6 frames per work at 1280–1440 | 0 of 161 frames at 390×844, 768×1024, 1024×768, 1280×720, 1440×900, 1920×1080 | `v2.css`: 280px credits lane at ≥1100, credits under the stage below; every frame capped at `--stage-h`; YouTube sized to the stage both ways |
| Video loops with no pause | autoplay, no control, also under reduced motion | Play/Pause button (26×24); under reduced motion it waits on the poster | `Viewer.tsx`: `LoopingVideo`, no `autoPlay` attribute, `play()` from an effect |
| Header focus ring | ink ring, ≈1.1:1 on paper | ink on paper, inverse over the hero | `v2.css`: `--blend` token; `.v2-header :focus-visible { outline-color: var(--blend) }` |
| **New:** YouTube frames unclickable on desktop | a click on `/work/podcast-studio`'s embeds hit "Next frame" | the embed's play button is on top | `v2.css`: the frame fade's fill `both` → `backwards`; a lasting fill kept the frame a stacking context under the z-index 1 hit areas |

axe on 20 runs after the fixes: no new violations; the remaining ones are the P2s above. DESIGN.md is rewritten for
v2 from the code; the v1 spec moved to `legacy/DESIGN-v1.md`, since /cv and /chat still follow it. PRODUCT.md is
rewritten from CK's answers (agencies first, art second; the v2 hero stays; quiet, exact, archival).

## Fixed in the second pass (2026-10-29)

P2s 1–5 from the list above, at CK's go. Same build-and-measure method.

| Finding | Before | After | Change |
|---|---|---|---|
| Viewer thumbnails | 800px files for a 44px strip: Untitled 2.1 MB of images, Live commerce 1.07 MB | 208 KB and 138 KB; 168 thumbnails at about 3 KB each | `scripts/thumbs.mjs` (called by `import-assets.mjs`) writes `-thumb.webp`, 132px tall, for every image frame and video poster |
| Viewer steps waited on the network | each step fetched a full-size frame | 14–64 ms to a loaded frame with every image request slowed by 400 ms | frames i±1 preloaded with React's `preload()`, same `srcset`/`sizes` as the `<picture>` (`srcSetOf` exported from `Picture.tsx`) |
| Hero labels on the photo | "Art" and "Production" 3.6:1 | ink on a paper line under the photo | `HomeStage.tsx`, `v2.css`: the hero is the photo plus one paper row |
| Alt text | "Woven memories, 3 of 12" | a description for each of the 142 frames | `data/frame-alt.json` (hand-kept, keyed by `src`): 50 carried from v1 by image fingerprint, 92 written by looking at each frame; read through `altOf()` in `data/works.ts` |
| Hero-metric row on /systems | 56px numbers over grey labels | a ruled list at reading size, words unchanged | `systems/page.tsx`, `v2.css` |
| Phone tap targets | header links 16px tall, CV 18×16, Info 23×18 | 32px-tall hit boxes, at least 44px wide (filter: word plus most of the gap); none overlap | `v2.css`: `::after` hit boxes; header phone rows and contact lines 14px apart |

Also, at CK's request: **Untitled (James Tattoo) is withdrawn.** It's removed from `works.json` (26 works, renumbered with no gap), its 2.4 MB of images are deleted, `/work/untitled-james-tattoo` redirects to `/works`, and `import-assets.mjs` withdraws curation 07 so a re-import keeps it out.

Still open: the /systems diagram's scroll box on phones (`scrollable-region-focusable`), /cv and /chat (second design system, logo label mismatch), GSAP/Lenis on every page, the em dash in the Home title, the filter in a `<nav>`. The hero name over the photo measures 6.0:1 (1440) and 5.3:1 (390) against the median behind it, dipping to 4.5 and 4.1 over its brightest tenth.

Older working files were removed in the same branch: v1 plans 001–010, the 4 Oct audit, the copy and animation audits, FRONTEND_SPEC.md, PORTFOLIO_UI_IMPLEMENTATION.md, portfolio-qa.sh, the brainstorm state, the v1 design sidecar, unserved v1 pages, dead v1 components and data, and v1 media nothing serves or imports (about 285 MB). Everything is recoverable from git history.

## Recommended order

1. **[P1, process] `teach` then `document`**: rewrite PRODUCT.md and DESIGN.md for v2 so every later command aims at v2.
2. **[P1] `layout`**: credits lane in the viewer; hero labels off the photo.
3. **[P1] `harden`**: video pause + reduced motion, header focus ring, diagram scroll region.
4. **[P1] `optimize`**: sticky stage instead of the GSAP pin; `-160` thumbnails; neighbour preload; scope GSAP/Lenis to Home.
5. **[P2] `adapt`**: 44px tap targets on phones; bring /cv into v2.
6. **[P2] `clarify`**: per-frame alt text; the Home title's em dash.
7. **[P2] `distill`**: the /systems stat row.
8. **`polish`**: final pass, then re-run `audit`.
