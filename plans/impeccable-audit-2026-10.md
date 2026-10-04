# Impeccable audit: 2026-10-04

Run with the vendored skill (`.agents/skills/impeccable`, `audit`) against `6a4f87b`, fixed on
branch `claude/inspiring-mayer-598xeg`, then audited again on the fixed build. The method is the
same both times: production build (`next build` + `next start`) in Chromium, and axe-core 4
(WCAG 2.0/2.1/2.2 A+AA + best-practice) on 9 routes, 2 themes and 2 widths (390, 1440), which
makes 36 runs. On top of that: probes for layout shift, the menu, the lightbox and alignment.

## Score

| # | Dimension | Before | After | What moved it |
|---|---|---|---|---|
| 1 | Accessibility | 3 | 4 | Case-study photos are buttons; `aria-current`; lightbox steps are announced; the menu's focus loop reaches the close button; slide marks are 24px; alt text describes the frame |
| 2 | Performance | 2 | 4 | The lightbox goes through the optimizer and fetches the photos either side ahead; every photo declares its size |
| 3 | Responsive | 3 | 4 | The landscape menu scrolls and fits; the chat field is 16px; the lightbox is capped on `dvh`; one 32px edge |
| 4 | Theming | 4 | 4 | Unchanged: tokens throughout, 0 contrast failures in either theme |
| 5 | Anti-patterns | 3 | 4 | Slash headline on 2 pages, not 8; no pulse; no grain; no em dashes in copy; labels back in JetBrains Mono |
| | **Total** | **15/20** | **20/20** | |

## Measured, before → after

| Check | Before | After |
|---|---|---|
| axe violations (36 runs) | `target-size` × 6 nodes, at 1440 in both themes | 0 |
| Case-study photos reachable by keyboard | 0 of 7 (divs with `onClick`) | 7 of 7; Enter opens, Escape closes and focus goes back to the photo |
| Lightbox, Knack Factory: open + 3 steps | 29.6 MB, largest 11.8 MB | 0.68 MB at 1440 and 0.31 MB on a 3x phone, largest 0.31 MB (the first two photos come from the page's cache) |
| Gallery lightbox step on a phone | waited on the network | photo ready in 22 ms (fetched ahead) |
| CLS `/commercial`, 1440 | 0.113 | 0.000 (and 0.000 on every other route checked) |
| Menu at 844 × 390 | Commercial at y −108, Contact at y 498, unreachable; label printed over CHAT | all 6 reachable; overlay scrolls; label in flow |
| Hero slide targets | 16 × 44 | 24 × 44 |
| Chat input | 14px (iOS zooms on focus) | 16px |
| Left edge at 390 / 1440 | 32 vs 24 / 32 vs 80 | 32 everywhere |
| Lightbox announcements | 0 live regions | counter `aria-live`, reads "04 / 07: Runway model with …" |

## What changed

- `lib/photos.ts`, `data/image-sizes.json`, `data/alt-text.json`, `scripts/image-sizes.mjs`: each photo's
  intrinsic size and a description of what is in the frame (79 descriptions, written by looking at every
  photo). Re-run `node scripts/image-sizes.mjs` after adding a photo.
- `components/Lightbox.tsx`: `next/image` instead of a raw `<img>`; neighbours fetched ahead; live counter; `dvh`.
- `app/commercial/[slug]/CaseStudyClient.tsx`: cover and photos are `<button class="gallery-tile">`.
- `components/Navigation.tsx`: `aria-current`; CSS hover; an overlay that scrolls, sized on `min(10vw, 9svh)`; Tab loops through the close button.
- `components/HeroStage.tsx`: 24px slide targets.
- `app/chat/ChatInterface.tsx`: 16px field; `aria-busy` while a reply streams; CSS hover on the suggestions.
- Every `onMouseEnter` colour swap moved to CSS `hover:` (10 places), so a tap never sticks.
- 49 labels moved from Archivo to JetBrains Mono.
- `globals.css`: `.section-shell` is full width at 32px; the 1px scrollbar became thin but holdable; the grain overlay and the unused `kenburns` and `pulse` keyframes are gone.
- `next/image` `priority` (deprecated in Next 16) replaced by `preload` and `loading="eager"`.
- Copy: no em dashes in visible text; ranges use en dashes. YouTube episode titles keep their own punctuation.
- `DESIGN.md` synced: lightbox, menu, slide marks, `lib/photos.ts`, one left edge, mono labels, no pulse, slash headline limits.

## Not covered

A real iPhone (the zoom and `dvh` fixes follow Safari's documented rules), a screen-reader pass, and
`prefers-reduced-motion` in a browser. `/systems` is a separate static site; axe was clean on it.
The YouTube thumbnails (`i.ytimg.com`) could not load from the audit sandbox's network, so their
console errors are environmental.
