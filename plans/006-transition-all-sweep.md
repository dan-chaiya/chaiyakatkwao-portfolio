# 006 — Replace every `transition: all` with named properties, and fix the two effects it was hiding

- **Status**: DONE (applied 2026-09-12 on branch motion-fixes)
- **Commit**: 96c93e8
- **Severity**: HIGH
- **Category**: 5. Performance (also 7. Cohesion: the About buttons)
- **Estimated scope**: 5 files, ~12 lines

## Problem

`transition-all` appears 11 times in the source. `transition: all` animates every property that happens to change, including layout properties that run off the GPU, and it hides which property the author actually meant to move. Three of the eleven live in `components/Navigation.tsx` and are handled by plan 004. The other eight are below, and two of them are masking a bug:

- **`components/CommercialList.tsx:71-72`** — the hover thumbnail's inline `transform: "translateY(-50%) scale(0.96)"` never changes on hover (nothing sets a hover transform), so the intended scale-up never happens: the thumbnail just fades in slightly small and stays small. The inline `transform` also overrides the `-translate-y-1/2` class, which is therefore dead.
- **`app/about/AboutClient.tsx:249-264`** — two `motion.a` buttons have `whileHover={{ y: -3 }}` (Framer, 250ms) **and** `transition-all duration-500` (CSS) on the same element. Framer writes `transform` inline every frame; `transition: all` tells CSS to smooth each of those writes over 500ms. The 250ms lift becomes a laggy drift. No other button on the site lifts, so the lift is also off-voice for this site.

```tsx
// components/Lightbox.tsx:135 — current (close button)
className="flex items-center justify-center w-11 h-11 text-[var(--color-grey-200)] hover:text-white transition-all duration-200 cursor-pointer border border-[var(--color-grey-500)] hover:border-[var(--color-grey-300)] hover:bg-white/10"
```
```tsx
// components/Lightbox.tsx:154 — current (prev button; the className is a template string)
className={`absolute left-2 md:left-6 z-10 flex items-center justify-center w-12 h-12 transition-all duration-200 border ${
```
```tsx
// components/Lightbox.tsx:202 — current (next button)
className={`absolute right-2 md:right-6 z-10 flex items-center justify-center w-12 h-12 transition-all duration-200 border ${
```
```tsx
// components/CommercialList.tsx:68-75 — current
          {/* Hover thumbnail (desktop) — the cover, revealed, never altered */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-24 top-1/2 z-10 hidden -translate-y-1/2 overflow-hidden opacity-0 transition-all duration-300 ease-out lg:block group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ width: "92px", height: "120px", transform: "translateY(-50%) scale(0.96)" }}
          >
```
```tsx
// app/commercial/CommercialClient.tsx:186 — current ("View case study →" badge)
<div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
```
```tsx
// components/YouTubeEmbed.tsx:41 — current (play button ring)
<div className="w-16 h-16 md:w-20 md:h-20 border border-[#F2F0EB] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#F2F0EB]/10 group-hover:scale-105">
```
```tsx
// app/about/AboutClient.tsx:3 — current
import { motion } from "framer-motion";
```
```tsx
// app/about/AboutClient.tsx:249-264 — current
            <motion.a
              href="mailto:chaiyakatkwao@gmail.com"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-body inline-block text-xs tracking-[0.05em] sm:tracking-[0.2em] uppercase text-[var(--color-warm)] border border-[var(--color-warm)] px-4 sm:px-8 py-4 hover:bg-[var(--color-warm)] hover:text-[var(--color-surface-chat)] transition-all duration-500"
            >
              chaiyakatkwao@gmail.com
            </motion.a>
            <motion.a
              href="/cv"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-body inline-block text-xs tracking-[0.2em] uppercase text-[var(--color-grey-500)] border border-[var(--color-grey-700)] px-8 py-4 hover:border-[var(--color-warm)] hover:text-[var(--color-warm)] transition-all duration-500"
            >
              View CV →
            </motion.a>
```

## Target

Each `transition-all` names exactly the properties that change on hover. Where only colours change, `transition-colors` (Tailwind's colour set: `color`, `background-color`, `border-color`, and friends). Where opacity or transform change, an explicit list. Durations come down to the 200ms budget for small UI; `ease-out` is added wherever a transform moves.

```tsx
// components/Lightbox.tsx:135 — target
className="flex items-center justify-center w-11 h-11 text-[var(--color-grey-200)] hover:text-white transition-colors duration-200 cursor-pointer border border-[var(--color-grey-500)] hover:border-[var(--color-grey-300)] hover:bg-white/10"
// components/Lightbox.tsx:154 — target
className={`absolute left-2 md:left-6 z-10 flex items-center justify-center w-12 h-12 transition-colors duration-200 border ${
// components/Lightbox.tsx:202 — target
className={`absolute right-2 md:right-6 z-10 flex items-center justify-center w-12 h-12 transition-colors duration-200 border ${
```
```tsx
// components/CommercialList.tsx:68-75 — target: the scale-up now actually happens
          {/* Hover thumbnail (desktop) — the cover, revealed, never altered. The rest
              transform is in the class list, not the style prop, so the hover variant
              can change it. */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-24 top-1/2 z-10 hidden overflow-hidden opacity-0 [transform:translateY(-50%)_scale(0.96)] transition-[opacity,transform] duration-200 ease-out lg:block group-hover:opacity-100 group-hover:[transform:translateY(-50%)_scale(1)] group-focus-visible:opacity-100 group-focus-visible:[transform:translateY(-50%)_scale(1)]"
            style={{ width: "92px", height: "120px" }}
          >
```
```tsx
// app/commercial/CommercialClient.tsx:186 — target
<div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-[opacity,transform] duration-200 ease-out">
```
```tsx
// components/YouTubeEmbed.tsx:41 — target
<div className="w-16 h-16 md:w-20 md:h-20 border border-[#F2F0EB] rounded-full flex items-center justify-center transition-[transform,background-color] duration-200 ease-out group-hover:bg-[#F2F0EB]/10 group-hover:scale-105">
```
```tsx
// app/about/AboutClient.tsx — target: plain anchors, colour transition only, no lift
            <a
              href="mailto:chaiyakatkwao@gmail.com"
              className="font-body inline-block text-xs tracking-[0.05em] sm:tracking-[0.2em] uppercase text-[var(--color-warm)] border border-[var(--color-warm)] px-4 sm:px-8 py-4 hover:bg-[var(--color-warm)] hover:text-[var(--color-surface-chat)] transition-colors duration-200"
            >
              chaiyakatkwao@gmail.com
            </a>
            <a
              href="/cv"
              className="font-body inline-block text-xs tracking-[0.2em] uppercase text-[var(--color-grey-500)] border border-[var(--color-grey-700)] px-8 py-4 hover:border-[var(--color-warm)] hover:text-[var(--color-warm)] transition-colors duration-200"
            >
              View CV →
            </a>
```
The `import { motion } from "framer-motion";` line in `AboutClient.tsx` is then unused and is removed.

## Repo conventions to follow

- Tailwind v4 utilities. Arbitrary transition properties: `transition-[opacity,transform]` (comma, no spaces). Arbitrary CSS properties: `[transform:translateY(-50%)_scale(0.96)]` (underscore stands for a space). Variant prefixes stack in front: `group-hover:[transform:…]`. `group-focus-visible:` is already used in this codebase (`components/CommercialList.tsx:29`).
- Colour-only hovers elsewhere in the codebase already use `transition-colors` (exemplar: `components/HeroStage.tsx:183`, `app/commercial/CommercialClient.tsx:153`).
- Every other button on the site answers hover with colour only: `components/PrintButton.tsx:23-32`, the contact buttons in `components/portfolio/PortfolioHome.tsx:185-224`. The About buttons should match them.
- `ease-out` is the site's signature curve once plan 003 has run. Adding the class now is correct either way.

## Steps

1. `components/Lightbox.tsx`: on lines 135, 154 and 202, replace `transition-all duration-200` with `transition-colors duration-200`. Nothing else on those lines changes.
2. `components/CommercialList.tsx`, lines 68-75: replace the comment, the `className` and the `style` of the thumbnail `<span>` with the target block above. Specifically: remove `-translate-y-1/2` from the class list; add `[transform:translateY(-50%)_scale(0.96)]`; replace `transition-all duration-300 ease-out` with `transition-[opacity,transform] duration-200 ease-out`; add `group-hover:[transform:translateY(-50%)_scale(1)]` and `group-focus-visible:[transform:translateY(-50%)_scale(1)]`; delete `transform: "translateY(-50%) scale(0.96)"` from the `style` object so it reads `style={{ width: "92px", height: "120px" }}`. The `<Image>` inside does not change.
3. `app/commercial/CommercialClient.tsx`, line 186: replace `transition-all duration-500` with `transition-[opacity,transform] duration-200 ease-out`.
4. `components/YouTubeEmbed.tsx`, line 41: replace `transition-all duration-300` with `transition-[transform,background-color] duration-200 ease-out`.
5. `app/about/AboutClient.tsx`, lines 249-264: replace both `<motion.a … </motion.a>` blocks with the target `<a>` blocks above. In each: `motion.a` → `a`; delete the `whileHover` line; delete the `transition={{ … }}` line; in `className`, replace `transition-all duration-500` with `transition-colors duration-200`. Children (`chaiyakatkwao@gmail.com`, `View CV →`) and every other class stay.
6. `app/about/AboutClient.tsx`, line 3: delete `import { motion } from "framer-motion";` (nothing else in the file uses `motion` after step 5).

## Boundaries

- Do NOT touch `components/Navigation.tsx`. Its three `transition-all` bars belong to plan 004.
- Do NOT change any hover colour, border or background value; only the transition classes, the About elements' type, and the CommercialList transform placement.
- Do NOT change the CommercialList thumbnail's size, position (`right-24 top-1/2`) or the image inside it.
- Do NOT reintroduce a lift or scale on the About buttons.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since commit 96c93e8), STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - `npx tsc --noEmit` → exits 0.
  - `npm run lint` → exits 0 (no unused `motion` import).
  - `grep -rn "transition-all" app components` → only `components/Navigation.tsx` (or nothing, if plan 004 has run).
  - `grep -n "whileHover\|motion\." app/about/AboutClient.tsx` → no output.
- **Feel check**: `npm run dev`.
  - http://localhost:3000/commercial → click "list". Hover a row at desktop width (≥1024px). The cover thumbnail fades in **and** grows from 96% to 100% over 200ms, centred on the row. Before this change it stayed slightly small. Tab through the rows: focus produces the same reveal.
  - Same page, "grid" view: hover a project cover. The "View case study →" badge fades and rises in 200ms, crisp, not the previous half-second drift.
  - Scroll to Selected Episodes, hover a video. The round play button grows and fills over 200ms.
  - http://localhost:3000/about → hover both contact buttons. Colours change over 200ms; the buttons do not move. Move the mouse in and out quickly: no lag, no drift.
  - http://localhost:3000/gallery → open a photo. Hover the ✕ and the arrow buttons: colours change over 200ms; nothing else animates.
  - DevTools: select any of the edited elements, Computed → `transition-property` never reads `all`.
- **Done when**: no `transition-all` remains outside `Navigation.tsx`, the list thumbnail visibly scales up on hover, and the About buttons answer hover with colour only.
