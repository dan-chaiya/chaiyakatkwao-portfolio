---
name: Chaiya Katkwao Archive
description: An artist's archive in paper and ink, where the photographs carry all the colour.
# v2, since 2026-10-29, on every page. Source of truth: app/(v2)/v2.css (tokens on .v2);
# app/globals.css only resets and sets the ground. The v1 system (Paper/Ink themes,
# Archivo Black, Cue Light) is retired; its spec is in git history. Grey is ink at reduced
# alpha, never a third colour: the hex values below are what the alphas composite to.
colors:
  paper: "#FBFBFB"
  ink: "#111111"
  ink-soft: "#656565"
  rule: "#D6D6D6"
  blend: "#FFFFFF"
typography:
  name:
    fontFamily: "Archivo, Noto Sans Thai, sans-serif"
    fontSize: "fitted to the stage width (about 9vw)"
    fontWeight: 850
    lineHeight: 0.82
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  display:
    fontFamily: "Archivo, Noto Sans Thai, sans-serif"
    fontSize: "clamp(44px, 8vw, 120px)"
    fontWeight: 850
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  statement:
    fontFamily: "Inter, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.4vw, 34px)"
    fontWeight: 400
    lineHeight: 1.15
  lede:
    fontFamily: "Inter, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.8vw, 24px)"
    fontWeight: 400
    lineHeight: 1.25
  reading:
    fontFamily: "Inter, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Inter, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.02em"
    fontFeature: "tnum"
rounded:
  none: "0px"
spacing:
  gutter: "24px"
  gutter-phone: "16px"
  page-top: "96px"
  page-top-phone: "84px"
  credits: "280px"
components:
  header:
    textColor: "{colors.blend}"
    typography: "{typography.body}"
    padding: "18px 24px"
  link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  index-row-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  filter-button:
    textColor: "{colors.ink-soft}"
    typography: "{typography.body}"
  filter-button-pressed:
    textColor: "{colors.ink}"
  pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "6px 10px"
  info-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "12px 14px"
    width: "420px"
---

# Design System: Chaiya Katkwao Archive

## 1. Overview

**Creative North Star: "The Catalogue Raisonné"**

The site is a numbered catalogue of one person's work, in the manner of an artist's catalogue raisonné: every work has a number (001–026), a title, a discipline, a year, a role and, where it applies, where it was shown. The catalogue is paper and ink. All the colour on screen belongs to the photographs, and the interface around them is set like the typed entries under plates in a book.

Most of the time the chrome stays small: 13px Inter, 12px Plex Mono numbers, hairline rules. The one loud gesture is the name: Archivo condensed to a 62 width at 850 weight, fitted edge to edge, with the work running up through it on Home. Everything else steps back so the frame sizes, which change from one image to the next, read as placement rather than a grid.

The system rejects colour in the interface (gradients, accents, tints), templated portfolio grids of same-sized cards, and motion that performs for its own sake. Motion here either moves the work (the Home column, the frame fade) or does nothing.

**Key Characteristics:**
- Two colours: paper `#FBFBFB` and ink `#111111`. Greys are ink at 64% (text) and 16% (rules).
- Three families with fixed jobs: Archivo condensed for the name and big titles, Inter for everything read, Plex Mono for numbers.
- Square, flat, unboxed: no radius, no shadow, no cards.
- One header everywhere, drawn in difference blend so it reads over paper and photographs alike.
- One gutter: 24px (16px on phones) on every page.

## 2. Colors: Paper and Ink

The palette is correct rather than decorative: two values and the alphas between them.

### Neutral
- **Paper** (`#FBFBFB`, `--paper`): every page ground, the Home bio pill, the Index filter bar and the viewer's Info panel. Also the `body` ground behind v2 pages.
- **Ink** (`#111111`, `--ink`): all primary text, rules under /systems case titles, diagram strokes, and the inverted Index row on hover or focus.
- **Ink, soft** (`rgb(17 17 17 / 0.64)`, `--ink-soft`, composites to `#656565`, 5.6:1 on paper): table text in the Index, credit labels, section heads, captions, the inactive filter buttons.
- **Rule** (`rgb(17 17 17 / 0.16)`, `--rule`, about `#D6D6D6`): 1px table and list rules, the Info panel frame.
- **Blend** (`#FFFFFF`, `--blend`): what the header draws in. Under `mix-blend-mode: difference` it lands as ink (`#040404`) on paper and as the inverse over a photograph.

### Named Rules
**The Images-Carry-Colour Rule.** No hue in the interface, ever. If something needs to stand out, use ink at full strength, an underline or an inversion, not a colour.

**The Alpha-Not-Grey Rule.** A new grey is ink at an alpha, named as a token on `.v2`. It must measure 4.5:1 on paper if it sets text; 0.64 is the floor in use.

**The Blend Rule.** Anything inside `.v2-header` (text, focus rings, icons) draws in `--blend`, never `--ink`: an ink ring under difference blend composites to `#EAEAEA`, about 1.1:1 on paper (audit 2026-10-29).

## 3. Typography

**Display Font:** Archivo, variable, `wdth` 62 at weight 850, uppercase (with Noto Sans Thai, then sans-serif)
**Body Font:** Inter 400 and 500 (with Noto Sans Thai, then system-ui)
**Label/Mono Font:** IBM Plex Mono 400, tabular figures

**Character:** a condensed grotesque shouting the name over a quiet book face and typewriter numbers. The contrast is the point: one gesture at full volume, everything else at catalogue-entry size.

### Hierarchy
- **Name** (Archivo 850, wdth 62, uppercase, 0.82 line-height): Home stage only, fitted to the stage width in JS (`HomeStage`, measured at 100px and scaled; refitted on resize and when fonts load).
- **Display** (Archivo 850, wdth 62, uppercase, `clamp(44px, 8vw, 120px)`, 0.9): /systems case titles.
- **Statement** (Inter 400, `clamp(22px, 2.4vw, 34px)`, 1.15, max 22ch): the opening sentence of Information, /systems, the chat and the 404 (`.v2-info__bio`).
- **Lede** (Inter 400, `clamp(18px, 1.8vw, 24px)`, 1.25, max 34ch): the line under each /systems title.
- **Reading** (Inter 400, 14px, 1.5, max 62ch): work statements in the Info panel and /systems body copy (/systems runs it at 13px).
- **Body** (Inter 400, 13px, 1.4): the whole interface: header, Index, credits, lists, captions. Weight 500 for the header and the viewer title.
- **Label** (Plex Mono 400, 12px, 0.02em, tabular): work numbers, years, the clock, frame counters, "Case 1 / 3", /systems figures.

### Named Rules
**The Three-Jobs Rule.** Archivo shouts, Inter reads, Plex counts. A number that identifies (a work number, a year, a time) is Plex Mono; a sentence is Inter; Archivo only ever sets a name or a case title, in capitals.

**The No-Em-Dash Rule.** Copy uses commas, colons, parentheses, and en dashes for ranges (`2023–2024`). An em dash appears only as the null in an empty year cell.

## 4. Elevation

Flat. No shadows anywhere. Layers are told apart by ground alone: the Home bio pill, the Index filter bar and the viewer's Info panel sit on paper over whatever passes under them, and the Info panel adds a 1px `--rule` frame because it is the only element that opens over a photograph.

### Named Rules
**The Paper-Patch Rule.** When chrome has to sit over moving work, give it a paper ground, not a blur, a shadow or a scrim.

## 5. Components

Small, typed, unboxed. Every interactive element is a real `<a>` or `<button>` with the UA chrome stripped (`.v2 button` resets font, colour, border and padding).

### Header
- Fixed, three columns: name at left ("Chaiya Katkwao", home), nav in the centre ("Index, Information", comma-separated), and at right the Bangkok clock (`HH:MM GMT+07:00`, Plex) or, in the viewer, the frame counter (`001 of 012`, `aria-live`). On phones the nav drops to a second row.
- `mix-blend-mode: difference` in `--blend`, 18px × gutter padding, no ground. Focus ring: 1px `--blend` at 3px offset.

### Links and focus
- Links inherit ink, no underline at rest, underline at 3px offset on hover. Contact links on Information and the toggles stay underlined at rest because they are the only actions there.
- **Hit boxes:** header links, contact links, the Info and Play toggles and the Index filter carry an invisible `::after` box, 32px tall and at least 44px wide (the filter's is its word plus the gap), centred on the label, which keeps its size. Rows of them sit 32px apart or more so boxes never overlap: the header's two phone rows are 14px apart, the contact list's lines 14px.
- Focus: 1px ink outline at 3px offset everywhere except the header (see The Blend Rule).

### Home
- **Hero:** one photograph, `object-fit: cover`, filling 100svh less one paper line, the name (14px Inter 500, in paper) centred on it. The four disciplines sit on that paper line in ink, spread edge to edge. The name is the only text that sits on a photograph anywhere: 6.0:1 against the median of the photo behind it at 1440 and 5.3:1 at 390, dipping to 4.5:1 and 4.1:1 over its brightest tenth (2026-10-29). Recheck if the hero photo changes. The disciplines moved off the photo on 2026-10-29, where "Art" and "Production" measured 3.6:1.
- **Stage:** the fitted name, held by `position: sticky` for the length of the run (`--run`, set from the column height), while the column of one cover per work (140px wide, 96px on phones, its number under each) rises through the centre on a GSAP scrub. Transform only. The bio pill ("Photographer, artist and producer. Bangkok, Thailand.") sits on paper at the bottom. Under reduced motion the column is a plain list under the name.

### Index
- **Order, agency style:** client and professional work first, newest first; then personal work; art last. The list is `ORDER` in `data/works.ts`, and the numbers follow it, so 001 is always the first row. Home's column and the Information credits use the same order.
- A real `<table>` (No., Title, Discipline, Year) in `--ink-soft`, rules in `--rule`, in a sticky left column (44%). A linked row inverts to ink on hover or focus, and the whole row is the link.
- Right of it (56%), the image field: one cover per line at widths and offsets cycled from a fixed list, so it reads as placed, not gridded. Hidden on phones.
- A 220px preview follows the pointer over linked rows (transform only, 120ms opacity).
- The filter (All and the four disciplines) is a paper bar fixed at the bottom centre; the current one is ink and underlined (`aria-pressed`).

### Project viewer
- One frame at a time, `object-fit: contain`, its height cycled from 54–80svh so frame sizes change step to step, and never taller than the stage (`--stage-h`).
- **Credits lane:** at 1100px and up the credits (number, title, Role, Exhibited, Year, Info) keep a 280px lane at the left and the stage starts after it; below 1100 they sit under the stage. They never print over the work.
- **Navigation:** invisible half-stage buttons (w-resize / e-resize cursors) on desktop, swipe on phones, arrow keys, one frame per wheel gesture, and a thumbnail strip at the bottom (32% opacity, full when current or hovered). The strip loads `-thumb.webp` files, 132px tall and about 3 KB each, written by `scripts/thumbs.mjs`; the frames either side of the current one are preloaded with the same `srcset` and `sizes`, so a step shows at once.
- **Video:** muted loops start only without reduced motion, and always carry a Play/Pause text button under the frame (WCAG 2.2.2).
- **Info:** the work statement in a paper panel with a 1px `--rule` frame, bottom right, toggled by an underlined "Info"/"Close" button (`aria-expanded`).
- Frames fade in over 260ms with `animation-fill-mode: backwards`, never `both`: a lasting fill keeps the frame a stacking context and traps video and YouTube under the hit areas.

### Information
- Statement, then Credits, Exhibitions and Contact as ruled two-column lists (year in Plex, 6.5em; entry in Inter). The portrait sits sticky in the right column at 0.8fr; on phones it comes first.

### CV
- The same content as before, set in v2: the name in the Display step over the role (Lede step) and an underlined "Print / Save PDF", the contact lines right-aligned, then a 1px ink rule. Summary at reading size, then two columns: Experience (company in 500, role, period in Plex, bullets with an inline `•` so each stays with its job in a parsed PDF) and a side column of ruled lists for Education, Exhibitions, Skills, Brands and Languages.
- Prints on one A4 sheet (`@page` in the page, print rules in v2.css) at about 10pt for body text, 28pt for the name, no header, no print control, ink on white. Chrome lays a printed page out at its own width (about 700px), so the tablet and phone rules are `@media screen` only, or the printed CV would take the phone layout. After any copy change run `node scripts/check-cv-print.mjs` against a running build: one page, with about 10mm to spare (Safari sets the same text a little longer).

### Chat
- `/chat`: an AI assistant answering in Chaiya's voice, and saying so. Left, a 280px column: the statement "An AI assistant that answers in Chaiya's voice.", the note that answers can be wrong with the email for briefs, and "Start over". Right, the transcript as ruled entries ("You" / "Assistant" in `--ink-soft`, the text at reading size with its line breaks), the suggestions as underlined questions, and the field: 16px Inter (iOS zooms anything smaller) in a 1px `--ink-soft` frame (3:1 for a control's edge; `--rule` is not enough), "Send" as an underlined word. One screen high (`100dvh`, so the field stays above a phone's keyboard). Errors keep the question: "Try again" or the email.

### Systems
- Per case: "Case n / 3" in Plex, the Display title, the lede, its figures as a ruled list at reading size (number in Plex, words in Inter, like the credits on Information), then Role, Problem, What I built, Constraints and Outcome in two columns, an ink-line diagram (1.5px strokes, SVG with `<title>` and `<desc>`) and before/after tables with a `<caption>`. Cases are separated by a 1px ink rule.

### Photos
- `components/v2/Picture.tsx`: a plain `<picture>` over AVIF and WebP at two widths (800 and full), written by `scripts/import-assets.mjs`. Not `next/image`: the files are already sized. Every picture declares `width`, `height` and an explicit `aspect-ratio`, so nothing moves when it loads; only the first frame or the hero loads eager with `fetchpriority="high"`.
- **Alt text** says what is in the frame, like a museum caption: no SEO words, no photographer's name. Viewer frames take theirs from `data/frame-alt.json` (hand-kept, keyed by the frame's `src`, so a re-import doesn't wipe it); Home and the Index field use the work's title or nothing, because there the image is a link to the work. A new frame gets its description when it is added.

## 6. Do's and Don'ts

### Do:
- **Do** keep the interface in paper and ink; let the photographs carry every colour.
- **Do** keep one gutter (24px, 16px on phones) on every page.
- **Do** draw anything in the header in `--blend`.
- **Do** give every photo its size and aspect ratio before it loads; CLS is 0.000 on every route and should stay there.
- **Do** hold things with `position: sticky` and move them with transforms. A GSAP `pin` counted as a layout shift on every visit (CLS 0.63–1.0 until 2026-10-29).
- **Do** give anything that moves for more than five seconds a stop control, and start nothing that loops under reduced motion.
- **Do** branch on `usePrefersReducedMotion()` (hydration-safe) for anything that moves.
- **Do** keep Lenis and GSAP on Home only, where the scroll drives the stage; every other page scrolls natively.
- **Do** cap any frame at the stage (`--stage-h`) as well as at its own svh height.
- **Do** keep reading lines at 62ch or less.

### Don't:
- **Don't** add colour to the interface: no accent, no gradient, no tinted grey.
- **Don't** print text over the work. The one exception is the name on the Home photograph, which must hold 4.5:1 against what is behind it.
- **Don't** add radius, shadows, blur or cards.
- **Don't** use a fourth family, or set a sentence in Archivo or Plex.
- **Don't** set figures as a big number over a small label (the hero-metric template). Figures are a ruled list at reading size.
- **Don't** use `animation-fill-mode: both` (or `forwards`) on anything that holds clickable layers.
- **Don't** use bounce or elastic easing; scrubbed motion is linear to the scroll, fades are linear and under 300ms.
- **Don't** use em dashes in copy.
