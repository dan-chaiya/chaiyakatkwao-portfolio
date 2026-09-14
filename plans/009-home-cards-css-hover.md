# 009 — Home cards: hover in CSS, not on tap, with a wash that actually fades

- **Status**: DONE (applied 2026-09-14 on branch motion-plans-007-010)
- **Commit**: 4726a87
- **Severity**: MEDIUM
- **Category**: 6. Accessibility (ungated hover), 5. Performance, 3. Physicality
- **Estimated scope**: 1 file (`components/portfolio/PortfolioHome.tsx`), three small components rewritten in place, ~60 lines touched

## Problem

Three components at the bottom of `components/portfolio/PortfolioHome.tsx` drive their hover look
from React state set by `onMouseEnter` / `onMouseLeave`:

```tsx
// components/portfolio/PortfolioHome.tsx:3 — current
import { useState } from "react";
```

**a. The hover runs on phones, on tap.** Mobile browsers fire `mouseenter` when a link is tapped.
So on a phone, tapping the featured card or a section card starts the photo zoom at the same moment
the site navigates away, and the zoom is half-played under the route change. CSS `:hover` rules in
this project's Tailwind (v4.2.4) are wrapped in `@media (hover: hover)`, so they never fire on touch.
Every hover also re-renders the card through React state.

```tsx
// components/portfolio/PortfolioHome.tsx:281-301 — current (FeaturedCard, start)
function FeaturedCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/commercial"
      style={{ display: "block", color: "inherit", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", backgroundColor: "var(--color-surface)" }}>
        <Image
          src={workAssets.knack("Knack-14.jpg")}
          alt="Knack Factory Fashion Show 2024 — Creative Producer Portfolio"
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            transition: "transform 1000ms var(--ease-out)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>
```

```tsx
// components/portfolio/PortfolioHome.tsx:325-330 — current (FeaturedCard caption)
        <p
          className="mono-label"
          style={{ transition: "color 200ms ease", color: hovered ? "var(--color-text)" : undefined }}
        >
          Commercial Production →
        </p>
```

**b. The section cards' dark wash snaps instead of fading.** The overlay transitions `background`
between two `linear-gradient`s. Browsers cannot interpolate one gradient into another, so the wash
jumps to its hover state in one frame while the photo beneath zooms smoothly over 800ms.

```tsx
// components/portfolio/PortfolioHome.tsx:338-386 — current (TriptychCard, through the index label)
function TriptychCard({ section: s }: { section: SectionItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={s.href}
      style={{ display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-video sm:aspect-[3/4]" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={s.cover}
          alt={s.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
          style={{
            transition: "transform 800ms var(--ease-out)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Gradient overlay — deepens on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
            transition: "background 500ms ease",
            display: "flex",
            alignItems: "flex-end",
            padding: "24px",
            pointerEvents: "none",
          }}
        >
          <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <p style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: hovered ? "rgba(249,249,249,0.9)" : "rgba(249,249,249,0.5)",
                marginBottom: "6px",
                transition: "color 300ms ease",
              }}>
                {s.index}
              </p>
```

**c. The disciplines rows slide on hover, but they are not links.** Sideways movement on hover says
"clickable"; these rows have `cursor: default` and do nothing.

```tsx
// components/portfolio/PortfolioHome.tsx:236-275 — current (DisciplineRow, whole component)
function DisciplineRow({ label, index: i, total }: { label: string; index: number; total: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: "1px solid var(--color-border)",
        ...(i === total - 1 ? { borderBottom: "1px solid var(--color-border)" } : {}),
        padding: "13px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "default",
        transition: "none",
      }}
    >
      <span style={{
        fontFamily: "var(--font-archivo)",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: hovered ? "var(--color-text)" : "var(--color-grey-300)",
        letterSpacing: "0.005em",
        transform: hovered ? "translateX(6px)" : "translateX(0px)",
        transition: "color 200ms ease, transform 250ms var(--ease-out)",
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "11px",
        color: hovered ? "var(--color-text)" : "var(--color-text-muted)",
        letterSpacing: "0.15em",
        transition: "color 200ms ease",
      }}>
        {String(i + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
```

## Target

- All three components use Tailwind `group` / `group-hover:` / `group-focus-visible:` classes and no
  React state. Hover effects never fire on touch devices (Tailwind v4 wraps `hover` in
  `@media (hover: hover)`); keyboard focus gets the same look as hover, as the Gallery and
  Commercial tiles already do.
- **Photo zooms keep their current look exactly:** featured `scale(1.04)` over 1000ms, section cards
  `scale(1.05)` over 800ms, both on `ease-out`, which in this repo is the signature curve
  `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out`, `app/globals.css:56`). These long, slow photo
  drifts are the site's established image language (Gallery 700ms, Commercial 700ms) and are kept
  on purpose; do not shorten them.
- **Section card wash:** the rest gradient stays on the overlay. A second layer inside it carries the
  extra darkness and fades in by `opacity` over `300ms ease`. Its gradient is chosen so the two
  stacked layers equal today's hover gradient at every stop (bottom: 1 − (1 − 0.72)(1 − 0.57) = 0.88;
  at 55%: 0.2; top: 0):
  `linear-gradient(to top, rgba(0,0,0,0.57) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)`.
- **Disciplines rows:** no movement. The colour change on hover stays (label `--color-grey-300` →
  `--color-text`, number `--color-text-muted` → `--color-text`), 200ms.
- `useState` is no longer imported.

## Repo conventions to follow

- Exemplar for a touch-safe, keyboard-aware photo zoom:
  `app/gallery/GalleryClient.tsx:102` —
  `className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"`
  on an image inside an element with `className="... group ..."`.
- Exemplar for a colour hover: `app/about/AboutClient.tsx:117` —
  `transition-colors duration-200 hover:text-[var(--color-warm)]`.
- `.mono-label` is defined **outside** any `@layer` in `app/globals.css:192-200` and sets
  `color: var(--color-text-muted)`. Unlayered CSS beats Tailwind utilities regardless of specificity
  (see the comment at `app/globals.css:59-63`). So a colour utility on a `.mono-label` element needs
  Tailwind v4's important modifier, a trailing `!`: `group-hover:text-[var(--color-text)]!`.

## Steps

1. Delete line 3 of `components/portfolio/PortfolioHome.tsx`:

   ```tsx
   import { useState } from "react";
   ```

2. Replace the whole `DisciplineRow` function (quoted in full in Problem c) with:

   ```tsx
   function DisciplineRow({ label, index: i, total }: { label: string; index: number; total: number }) {
     // Not a link: hover only brightens the text. No movement, which would read as clickable.
     return (
       <div
         className="group"
         style={{
           borderTop: "1px solid var(--color-border)",
           ...(i === total - 1 ? { borderBottom: "1px solid var(--color-border)" } : {}),
           padding: "13px 0",
           display: "flex",
           alignItems: "center",
           justifyContent: "space-between",
           cursor: "default",
           transition: "none",
         }}
       >
         <span
           className="text-[var(--color-grey-300)] transition-colors duration-200 group-hover:text-[var(--color-text)]"
           style={{
             fontFamily: "var(--font-archivo)",
             fontSize: "0.875rem",
             fontWeight: 500,
             letterSpacing: "0.005em",
           }}
         >
           {label}
         </span>
         <span
           className="text-[var(--color-text-muted)] transition-colors duration-200 group-hover:text-[var(--color-text)]"
           style={{
             fontFamily: "var(--font-jetbrains-mono)",
             fontSize: "11px",
             letterSpacing: "0.15em",
           }}
         >
           {String(i + 1).padStart(2, "0")}
         </span>
       </div>
     );
   }
   ```

3. In `FeaturedCard`:
   - Delete the line `  const [hovered, setHovered] = useState(false);`.
   - Replace the opening `<Link ...>` (quoted in Problem a) with:

     ```tsx
       <Link
         href="/commercial"
         className="group"
         style={{ display: "block", color: "inherit", textDecoration: "none" }}
       >
     ```

   - Replace the `<Image ... />` element with:

     ```tsx
           <Image
             src={workAssets.knack("Knack-14.jpg")}
             alt="Knack Factory Fashion Show 2024 — Creative Producer Portfolio"
             fill
             sizes="100vw"
             className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
           />
     ```

   - Replace the caption `<p ...>` (quoted in Problem a, lines 325-330) with:

     ```tsx
           <p className="mono-label transition-colors duration-200 group-hover:text-[var(--color-text)]! group-focus-visible:text-[var(--color-text)]!">
             Commercial Production →
           </p>
     ```

   - Leave the comment above the function, the `<div>` wrappers and the `<h2>` exactly as they are.

4. In `TriptychCard`:
   - Delete the line `  const [hovered, setHovered] = useState(false);`.
   - Replace the opening `<Link ...>` with:

     ```tsx
       <Link href={s.href} className="group" style={{ display: "block" }}>
     ```

   - Replace the `<Image ... />` element with:

     ```tsx
           <Image
             src={s.cover}
             alt={s.coverAlt}
             fill
             sizes="(max-width: 768px) 100vw, 33vw"
             className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
           />
     ```

   - Replace the overlay comment, the overlay `<div style={{...}}>` opening, and the inner text
     wrapper `<div style={{ width: "100%", ... }}>` opening (from `{/* Gradient overlay — deepens on
     hover */}` through `<div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>`)
     with:

     ```tsx
           {/* Gradient overlay. A gradient cannot be transitioned into another gradient, so the
               deeper hover wash is a second layer that fades in by opacity. Stacked on the rest
               gradient it equals the old hover gradient: 0.88 at the bottom, 0.2 at 55%. */}
           <div
             style={{
               position: "absolute",
               inset: 0,
               background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
               display: "flex",
               alignItems: "flex-end",
               padding: "24px",
               pointerEvents: "none",
             }}
           >
             <div
               aria-hidden="true"
               className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
               style={{
                 position: "absolute",
                 inset: 0,
                 background: "linear-gradient(to top, rgba(0,0,0,0.57) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
                 transition: "opacity 300ms ease",
               }}
             />
             <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
     ```

     `position: "relative"` on the text wrapper is required: without it the new absolutely positioned
     wash layer paints on top of the text.

   - Replace the index label `<p style={{...}}>` opening (quoted at the end of Problem b) with:

     ```tsx
                 <p
                   className="text-[rgba(249,249,249,0.5)] transition-colors duration-300 group-hover:text-[rgba(249,249,249,0.9)] group-focus-visible:text-[rgba(249,249,249,0.9)]"
                   style={{
                     fontFamily: "var(--font-jetbrains-mono)",
                     fontSize: "11px",
                     letterSpacing: "0.2em",
                     textTransform: "uppercase",
                     marginBottom: "6px",
                   }}
                 >
     ```

   - Leave `{s.index}`, the closing tags, and the title `<p>` (`color: "#F9F9F9"`) exactly as they are.

5. Run `grep -n "hovered\|setHovered\|useState" components/portfolio/PortfolioHome.tsx`. Expected: no output.

## Boundaries

- Only `components/portfolio/PortfolioHome.tsx`. Do NOT touch `HeroStage.tsx`, `globals.css`,
  `lib/motion.ts` or any other file.
- Do NOT touch the other `onMouseEnter` handlers in this file (the nav-style link at ~line 109, the
  email and CV buttons at ~lines 201 and 221). They change colour only and are out of scope.
- Do NOT touch the "Available" pulse dot (`animation: reduced ? "none" : "pulse 2s ease-in-out infinite"`).
- Do NOT change zoom amounts or zoom durations, gradients' end looks, copy, layout, or sizes.
- Do NOT add dependencies.
- If any quoted code does not match, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` → exit 0. `npm run lint` → exit 0 (no unused imports).
  `npm run build` → compiles all routes.
- **Feel check** (`npm run build && npx next start -p 3100`, open `http://localhost:3100/`):
  - Desktop, mouse: hover the featured Knack Factory photo. It drifts in slowly as before and the
    "Commercial Production →" caption turns bright. Move off: both return.
  - Hover each of the three section cards. The photo drifts in and the dark wash now **fades** darker
    over ~300ms instead of jumping. At full hover the card looks the same as before this change
    (bottom nearly black, text fully legible). The small index number brightens.
  - Hover a disciplines row: text brightens; nothing moves sideways.
  - Press Tab until a section card has focus: it shows the same zoom and wash as hover.
  - DevTools → Animations panel at 10%: hover a section card and confirm the wash layer's `opacity`
    transition (300ms) and the image's transform transition (800ms, `cubic-bezier(0.16, 1, 0.3, 1)`).
  - DevTools device toolbar, choose a phone (this emulates `hover: none`), reload, then tap a section
    card: no zoom or wash starts before the page changes.
  - DevTools → Rendering → `prefers-reduced-motion: reduce`: hovering changes colour and the wash
    fades (120ms, from the global rule in `app/globals.css`); the photo's scale changes without
    animating, the same as the Gallery tiles already behave. That is expected; do not change it here.
  - On a real phone if available: tap the featured card and a section card; the photo does not start
    zooming as the page leaves.
- **Done when**: the grep in step 5 is empty, the section wash visibly fades on hover, and no hover
  effect fires on tap in phone emulation.
