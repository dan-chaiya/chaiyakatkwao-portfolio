# 003 — Make the signature curve the site's `ease-out` everywhere

- **Status**: DONE (applied 2026-09-12 on branch motion-fixes)
- **Commit**: 96c93e8
- **Severity**: MEDIUM
- **Category**: 7. Cohesion & tokens (also 2. Easing & duration)
- **Estimated scope**: 5 files, ~12 lines

## Problem

The site has one deliberate curve: `lib/motion.ts:8-12` calls `cubic-bezier(0.16, 1, 0.3, 1)` "THE signature curve — exponential ease-out. No bounce, no elastic, ever." and says "never hard-code an ease or duration in a component." In practice two other curves ship alongside it, and no component imports the token:

1. Every Tailwind `ease-out` class (8 uses) resolves to Tailwind's built-in `cubic-bezier(0, 0, 0.2, 1)` (`node_modules/tailwindcss/theme.css:435`), a soft curve that reads as sluggish next to the signature one. Confirmed on the live site: the hero slides compute to `transition-timing-function: cubic-bezier(0, 0, 0.2, 1)`.
2. Tailwind transition utilities with no `ease-*` class fall back to `cubic-bezier(0.4, 0, 0.2, 1)` (`theme.css:493`), an ease-in-out. Two hover zooms in `app/commercial/CommercialClient.tsx:273, 282` use `transition-transform duration-500` with no curve and get this one.
3. The signature numbers are retyped by hand in 12 places instead of imported. This plan covers `components/Lightbox.tsx:112, 220`, `app/not-found.tsx:16, 24` and `components/portfolio/PortfolioHome.tsx:259, 297, 354`. The rest are in files that plans 001, 004 and 006 own.

```css
/* app/globals.css:47-51 — current: the @theme inline block ends with typography, no motion tokens */
  --font-display: var(--font-archivo-black);
  --font-body:    var(--font-archivo);
  --font-mono:    var(--font-jetbrains-mono);
  --font-heading: var(--font-archivo-black);
}
```

```tsx
// app/commercial/CommercialClient.tsx:273 — current (podcast tiles)
className="object-cover transition-transform duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
// app/commercial/CommercialClient.tsx:282 — current (other tiles)
className="img-natural transition-transform duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
```

```tsx
// components/portfolio/PortfolioHome.tsx:259 — current
transition: "color 200ms ease, transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
// components/portfolio/PortfolioHome.tsx:297 — current
transition: "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
// components/portfolio/PortfolioHome.tsx:354 — current
transition: "transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
```

```tsx
// components/Lightbox.tsx:112 — current
transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
// components/Lightbox.tsx:220 — current
transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
```

```tsx
// app/not-found.tsx:16 — current
transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
// app/not-found.tsx:24 — current
transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
```

## Target

Override Tailwind's `--ease-out` token with the signature curve so every existing `ease-out` class becomes the right curve with no per-file edits; add `ease-out` to the two transform utilities that had no curve; and make inline styles and Framer props reference the token instead of retyping it.

```css
/* app/globals.css — target: append inside @theme inline, after the typography tokens */
  /* === MOTION === */
  /* The signature curve from lib/motion.ts (EASE.out), as the Tailwind token, so every
     `ease-out` utility and every `var(--ease-out)` in an inline style is the same curve.
     Tailwind's own --ease-out is a soft (0, 0, 0.2, 1); this replaces it. */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

```tsx
// app/commercial/CommercialClient.tsx:273 — target
className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
// app/commercial/CommercialClient.tsx:282 — target
className="img-natural transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
```

```tsx
// components/portfolio/PortfolioHome.tsx — target
transition: "color 200ms ease, transform 250ms var(--ease-out)",   // line 259
transition: "transform 1000ms var(--ease-out)",                     // line 297
transition: "transform 800ms var(--ease-out)",                      // line 354
```

```tsx
// components/Lightbox.tsx — target (add the import, then:)
import { EASE } from "@/lib/motion";
transition={{ duration: 0.3, ease: EASE.out }}   // line 112
transition={{ duration: 0.4, ease: EASE.out }}   // line 220
```

```tsx
// app/not-found.tsx — target (add the import, then:)
import { EASE } from "@/lib/motion";
transition={{ duration: 0.7, ease: EASE.out }}              // line 16
transition={{ duration: 1.1, delay: 0.08, ease: EASE.out }} // line 24
```

## Repo conventions to follow

- Design tokens live in the `@theme inline { ... }` block at the top of `app/globals.css`, grouped under `/* === SECTION === */` banner comments with a reason in a comment where the value is not obvious (see the `--color-grey-500` comment at `app/globals.css:22-25`). Add the motion token as a new `=== MOTION ===` group at the end of that block.
- Inline styles already read theme tokens with `var(--…)` (e.g. `color: "var(--color-warm)"` throughout `components/HeroStage.tsx`). `var(--ease-out)` follows the same pattern.
- Framer components import tokens from `@/lib/motion`; exemplar: `components/HeroStage.tsx:19`. `EASE.out` is already typed as a 4-tuple, so the `as [number, number, number, number]` cast at `Lightbox.tsx:112` goes away.
- Tailwind v4 is in use (`@import "tailwindcss";` at `app/globals.css:1`). Overriding `--ease-out` inside `@theme` is the supported way to change what the `ease-out` utility emits.

## Steps

1. `app/globals.css`: inside the `@theme inline { … }` block, after the line `--font-heading: var(--font-archivo-black);` and before the closing `}`, add the `/* === MOTION === */` group from the target above, verbatim.
2. `app/commercial/CommercialClient.tsx`: at line 273 and line 282, insert `ease-out` after `duration-500` in the `className` string, as shown in the target. Nothing else on those lines changes.
3. `components/portfolio/PortfolioHome.tsx`: on lines 259, 297 and 354, replace the literal `cubic-bezier(0.16, 1, 0.3, 1)` with `var(--ease-out)`. Durations stay as they are.
4. `components/Lightbox.tsx`: add `import { EASE } from "@/lib/motion";` after the existing `import { AnimatePresence, motion } from "framer-motion";` line. Replace the two `ease: [0.16, 1, 0.3, 1]…` values (lines 112 and 220) with `ease: EASE.out`, removing the `as [number, number, number, number]` cast on line 112.
5. `app/not-found.tsx`: add `import { EASE } from "@/lib/motion";` after `import { motion } from "framer-motion";`. Replace `ease: [0.16, 1, 0.3, 1]` with `ease: EASE.out` on lines 16 and 24.

## Boundaries

- Do NOT edit `components/PageTransition.tsx`, `components/Navigation.tsx` or `app/about/AboutClient.tsx` here. Plans 001, 004 and 006 own those files and already replace or delete their hard-coded curves.
- Do NOT override `--default-transition-timing-function`. Colour-only transitions (the many `transition-colors` utilities) are fine on Tailwind's default; the signature curve is for movement.
- Do NOT change any duration in this plan.
- Do NOT change `.kenburns` in `app/globals.css` (it is unused and is listed separately in `plans/README.md`).
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since commit 96c93e8), STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - `npx tsc --noEmit` → exits 0.
  - `npm run lint` → exits 0.
  - `grep -rn "0.16, 1, 0.3, 1" app components` → only: the new token line and `.kenburns` in `app/globals.css`, plus lines in files owned by other plans (`PageTransition.tsx`, `Navigation.tsx`, `AboutClient.tsx`) if those plans have not run yet.
- **Feel check**: `npm run dev`, open http://localhost:3000.
  - In DevTools, select one of the hero slide `<div>`s (children of the stage under `section[aria-label="Selected work"]`) and read Computed → `transition-timing-function`. It must be `cubic-bezier(0.16, 1, 0.3, 1)`, not `cubic-bezier(0, 0, 0.2, 1)`.
  - Select the featured Knack Factory `<img>` on Home (under `section[aria-label="Featured project"]`). Computed `transition-timing-function` must also read `cubic-bezier(0.16, 1, 0.3, 1)`. This proves the `--ease-out` variable is emitted to `:root` for inline `var(--ease-out)` use. If it reads `ease` or the transition is missing, the token is not being emitted: STOP and report.
  - Open http://localhost:3000/commercial, hover a supporting-image tile under a project. Computed `transition-timing-function` on the `<img>` is `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Hover the featured photo on Home and a cover on Commercial. Both zooms start quickly and settle gently, and they feel like the same movement.
- **Done when**: every `ease-out` class and every hover zoom on the site computes to `cubic-bezier(0.16, 1, 0.3, 1)`, and the only remaining hand-typed copies of that curve are the token itself, `.kenburns`, and files another plan owns.
