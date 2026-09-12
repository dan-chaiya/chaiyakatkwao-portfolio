# 002 — Honour prefers-reduced-motion for every Framer Motion element

- **Status**: DONE (applied 2026-09-12 on branch motion-fixes)
- **Commit**: 96c93e8
- **Severity**: MEDIUM
- **Category**: 6. Accessibility
- **Estimated scope**: 2 files (1 new), ~20 lines

## Problem

`app/globals.css:256-272` has a well-judged reduced-motion block: it strips movement from CSS transitions while keeping 120ms colour and opacity feedback. But Framer Motion writes its animations as inline styles frame by frame, and a CSS media query cannot reach those. With the OS "Reduce motion" setting on, every Framer element on the site still travels:

- `components/PageTransition.tsx:8-11` — page slides up 24px (`y: 24 → 0`).
- `components/Navigation.tsx:204-206` — mobile menu links rise 16px (`y: 16 → 0`).
- `components/Lightbox.tsx:168-171` — lightbox image scales `0.94 → 1`.
- `components/Lightbox.tsx:217-220` — swipe hint rises 8px.
- `app/about/AboutClient.tsx:251, 259` — contact buttons lift on hover (`whileHover={{ y: -3 }}`).
- `app/not-found.tsx:14-24` — 404 heading rises 32px.

Two components already handle this correctly by hand with `useReducedMotion()` (`components/HeroStage.tsx:64`, `components/portfolio/PortfolioHome.tsx:47`). The rest do not, and adding a hook to each is the wrong shape: Framer has a single provider that does it for the whole tree.

```tsx
// app/layout.tsx:109-112 — current
      <body>
        <Navigation />
        {children}
      </body>
```

## Target

One `MotionConfig` provider with `reducedMotion="user"` wrapping everything in `<body>`. When the OS asks for reduced motion, Framer then skips transform and layout animation on every `motion.*` element and keeps opacity and colour, which is exactly the split the CSS block already makes.

```tsx
// components/MotionProvider.tsx — new file, target
"use client";

import { MotionConfig } from "framer-motion";

// Framer Motion animates through inline styles, so the prefers-reduced-motion block
// in globals.css never reaches it. reducedMotion="user" makes every motion.* element
// in the tree drop transform and layout animation when the OS asks for less motion,
// while opacity and colour still animate. Components that already branch on
// useReducedMotion() (HeroStage, PortfolioHome) keep working unchanged.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

```tsx
// app/layout.tsx — target (imports)
import Navigation from "@/components/Navigation";
import MotionProvider from "@/components/MotionProvider";
```

```tsx
// app/layout.tsx — target (body)
      <body>
        <MotionProvider>
          <Navigation />
          {children}
        </MotionProvider>
      </body>
```

## Repo conventions to follow

- Client components sit in `components/` with `"use client";` as the first line and a short why-comment beneath the imports (see `components/HeroStage.tsx:1-13`).
- `app/layout.tsx` is a server component. It may render a client component (it already renders `Navigation`); it must not import `MotionConfig` directly. That is why the provider is its own file.
- Imports use the `@/` alias (`import Navigation from "@/components/Navigation";`, `app/layout.tsx:4`).
- `framer-motion` is already a dependency at `^12.38.0`; `MotionConfig` and its `reducedMotion` prop exist in that version (checked in the `node_modules/framer-motion` type definitions).

## Steps

1. Create `components/MotionProvider.tsx` with the target code above, verbatim.
2. `app/layout.tsx`: add `import MotionProvider from "@/components/MotionProvider";` on the line after `import Navigation from "@/components/Navigation";`.
3. `app/layout.tsx`: inside `<body>`, wrap `<Navigation />` and `{children}` in `<MotionProvider>` … `</MotionProvider>` as shown in the target. Nothing else in the file changes.

## Boundaries

- Do NOT remove or change the `useReducedMotion()` calls in `components/HeroStage.tsx` or `components/portfolio/PortfolioHome.tsx`. They control autoplay and the pulse dot, which `MotionConfig` does not cover.
- Do NOT touch `app/globals.css`. Its reduced-motion block is correct and still needed for CSS transitions.
- Do NOT use `reducedMotion="always"`. The value is `"user"`: it follows the OS setting.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since commit 96c93e8), STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - `npx tsc --noEmit` → exits 0.
  - `npm run lint` → exits 0.
  - `grep -n "MotionProvider" app/layout.tsx` → shows the import and the two tags.
- **Feel check**: `npm run dev`, open http://localhost:3000. In DevTools → Rendering, set "Emulate CSS media feature prefers-reduced-motion" to `reduce`, then:
  - Open http://localhost:3000/nothing-here (the 404). The heading fades in without rising.
  - Narrow the window below 1024px and tap the hamburger. The menu fades in; the links appear without rising.
  - Open Gallery and click a photo. The lightbox fades in; the image does not scale up from smaller.
  - Open About and hover the email button. It changes colour but does not lift (if plan 006 has already run, there is no lift to begin with; skip this line).
  - Set the emulation back to "No emulation" and repeat: the travel returns everywhere. That confirms the provider is following the setting, not disabling motion outright.
- **Done when**: with reduced motion emulated, no Framer element on the site moves or scales, and opacity fades still occur; with it off, motion is unchanged from before.
