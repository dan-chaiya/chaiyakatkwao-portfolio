# 001 — Shorten the route fade to an opacity-only 250ms

- **Status**: DONE (applied 2026-09-12 on branch motion-fixes)
- **Commit**: 96c93e8
- **Severity**: HIGH
- **Category**: 1. Purpose & frequency (also 2. Easing & duration, 5. Performance)
- **Estimated scope**: 3 files, ~15 lines

## Problem

Every client-side navigation on chaiyakatkwao.com (Commercial, Gallery, About, CV, case studies, 404) is wrapped in `PageTransition`, which fades the whole page in while sliding it up 24px over 700ms.

- Navigation is a tens-of-times-per-visit action. A 700ms entrance with vertical travel makes every page feel slow to arrive.
- `y: 24` is a Framer Motion shorthand. It animates on the main thread with requestAnimationFrame, and it fires at the exact moment the page is busiest (hydration, image decode), so it is the most likely animation on the site to drop frames.
- The `exit` prop never runs: there is no `AnimatePresence` around the route in `app/layout.tsx`, so Next.js unmounts the old page instantly.
- The home page (`components/portfolio/PortfolioHome.tsx`) does not use the wrapper at all, so Home → Commercial fades but Commercial → Home does not.
- The CV page has to override the wrapper with `!important` so that printing does not produce a blank sheet (`app/cv/page.tsx:139-142`). That override stays; it is not part of this plan.

```tsx
// components/PageTransition.tsx:1-16 — current
"use client";

import { motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

```ts
// lib/motion.ts:14-20 — current
/** Durations in seconds. */
export const DUR = {
  micro: 0.2,  // hover, focus, button
  base: 0.6,   // labels, small text
  enter: 0.9,  // section entrances
  media: 1.2,  // full-bleed image / video reveals
};
```

## Target

An opacity-only fade of 250ms on the site's signature curve, no vertical travel, no `exit`, applied to every route including the home page.

```ts
// lib/motion.ts — target
export const DUR = {
  micro: 0.2,  // hover, focus, button
  route: 0.25, // the page fade in PageTransition: runs on every navigation, so it stays short
  base: 0.6,   // labels, small text
  enter: 0.9,  // section entrances
  media: 1.2,  // full-bleed image / video reveals
};
```

```tsx
// components/PageTransition.tsx — target
"use client";

import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

// The one entrance that runs on every navigation. Opacity only: no travel, so it
// stays on the compositor and never fights hydration for the main thread. There is
// no AnimatePresence around the route, so an exit animation would never run.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.route, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );
}
```

## Repo conventions to follow

- Motion tokens live in `lib/motion.ts`. Its header comment says: "Import these everywhere; never hard-code an ease or duration in a component." `EASE.out` is `[0.16, 1, 0.3, 1]` (`lib/motion.ts:10`). Use the tokens; do not retype the numbers.
- Exemplar of importing from the token file: `components/HeroStage.tsx:19` — `import { HERO_INTERVAL_MS } from "@/lib/motion";`
- Comments in this codebase explain *why*, in full sentences, above the code they describe (see `components/HeroStage.tsx:70-72`). Match that voice.

## Steps

1. `lib/motion.ts`: inside `export const DUR = { ... }`, add the line `route: 0.25, // the page fade in PageTransition: runs on every navigation, so it stays short` directly after the `micro` line. Leave every other key unchanged.
2. `components/PageTransition.tsx`: replace the whole file with the target code above. The changes are: import `DUR` and `EASE` from `@/lib/motion`; drop `y` from `initial` and `animate`; delete the `exit` prop; set `transition={{ duration: DUR.route, ease: EASE.out }}`; add the explanatory comment.
3. `components/portfolio/PortfolioHome.tsx`: give the home page the same fade so every route behaves the same.
   - Add `import PageTransition from "@/components/PageTransition";` next to the other component imports (after line 8, `import HeroStage from "@/components/HeroStage";`).
   - In `PortfolioHome()`, the return currently starts with `<>` (line 50) and ends with `</>` (line 232). Replace that outer fragment with `<PageTransition>` … `</PageTransition>`. Nothing inside moves.

## Boundaries

- Do NOT touch `app/cv/page.tsx`. Its print override (`div:has(> .cv-shell) { opacity: 1 !important; transform: none !important; }`) is still needed because the wrapper still starts at opacity 0.
- Do NOT add `AnimatePresence` to `app/layout.tsx` to make exits work. The decision here is that pages leave instantly.
- Do NOT change anything inside the pages themselves (Commercial, Gallery, About, 404). Only the three files above.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since commit 96c93e8), STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - `npx tsc --noEmit` → exits 0.
  - `npm run lint` → exits 0.
  - `grep -n "y: 24\|y: -24\|exit=" components/PageTransition.tsx` → no output.
- **Feel check**: `npm run dev`, open http://localhost:3000.
  - Click Home → Commercial → Gallery → About → Home in the nav. Each page fades in and is fully visible within about a quarter of a second. Nothing slides vertically.
  - Home now fades in too (it did not before).
  - DevTools → More tools → Animations, set playback to 10%: navigate once and confirm the only animated property on the page wrapper is `opacity`.
  - DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce": the fade still plays (opacity is allowed under reduced motion; travel is what must go, and there is none now).
  - Open http://localhost:3000/cv and press ⌘P. The print preview shows the CV, not a blank sheet.
- **Done when**: all mechanical checks pass, every route (including Home) fades in with no vertical movement, and the CV still prints.
