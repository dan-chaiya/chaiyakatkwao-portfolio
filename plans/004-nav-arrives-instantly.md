# 004 — Let the nav arrive instantly and tidy the hamburger

- **Status**: DONE (applied 2026-09-12 on branch motion-fixes)
- **Commit**: 96c93e8
- **Severity**: HIGH
- **Category**: 1. Purpose & frequency (header), 5. Performance (`transition: all`), 2. Easing & duration (menu links)
- **Estimated scope**: 1 file, ~15 lines

## Problem

Three things in `components/Navigation.tsx`, all in one component, so one plan.

**a. The header fades in over 1.1 seconds on every hard load.** Framer renders `initial={{ opacity: 0 }}` into the server HTML, so the nav is invisible until JavaScript loads and hydrates, then for another 1.1s. The most functional element on the page is the slowest to arrive. There is no purpose here (no state change, no spatial story); it is decoration on the one element people need immediately.

```tsx
// components/Navigation.tsx:78-87 — current
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 left-0 right-0 z-50"
        style={{
          borderBottom: "1px solid rgba(249,249,249,0.07)",
          minHeight: "var(--header-h)",
        }}
      >
```
```tsx
// components/Navigation.tsx:185 — current
      </motion.header>
```

**b. The hamburger bars use `transition: all` for 300ms on Tailwind's default curve.** Confirmed on the live site: computed `transition-property: all`, `transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)`. `all` animates properties nobody meant to animate, and the toggle is used repeatedly on phones.

```tsx
// components/Navigation.tsx:177-182 — current
            <span className="block h-px bg-current transition-all duration-300 origin-center"
              style={{ width: "18px", transform: open ? "rotate(45deg) translateY(6px)" : "none" }} />
            <span className="block h-px bg-current transition-all duration-300"
              style={{ width: "18px", opacity: open ? 0 : 1 }} />
            <span className="block h-px bg-current transition-all duration-300 origin-center"
              style={{ width: "18px", transform: open ? "rotate(-45deg) translateY(-6px)" : "none" }} />
```

**c. The mobile menu links take 450ms each** with the curve retyped by hand. The 50ms stagger is right; the per-link duration is over the 300ms UI budget, so the last of seven links finishes at about 750ms.

```tsx
// components/Navigation.tsx:202-207 — current
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
```

## Target

```tsx
// components/Navigation.tsx — target (a): a plain header, no entrance
      <header
        className="sticky top-0 left-0 right-0 z-50"
        style={{
          borderBottom: "1px solid rgba(249,249,249,0.07)",
          minHeight: "var(--header-h)",
        }}
      >
        …
      </header>
```

```tsx
// components/Navigation.tsx — target (b): only transform and opacity move, 200ms, signature curve
            <span className="block h-px bg-current transition-[transform,opacity] duration-200 ease-out origin-center"
              style={{ width: "18px", transform: open ? "rotate(45deg) translateY(6px)" : "none" }} />
            <span className="block h-px bg-current transition-[transform,opacity] duration-200 ease-out"
              style={{ width: "18px", opacity: open ? 0 : 1 }} />
            <span className="block h-px bg-current transition-[transform,opacity] duration-200 ease-out origin-center"
              style={{ width: "18px", transform: open ? "rotate(-45deg) translateY(-6px)" : "none" }} />
```

```tsx
// components/Navigation.tsx — target (c): 300ms per link, token import
import { EASE } from "@/lib/motion";
…
                  transition={{ delay: i * 0.05, duration: 0.3, ease: EASE.out }}
```

## Repo conventions to follow

- Tokens: `EASE.out` from `lib/motion.ts:10` is `[0.16, 1, 0.3, 1]`; import with `import { EASE } from "@/lib/motion";` (exemplar of the import style: `components/HeroStage.tsx:19`).
- Tailwind v4 arbitrary transition properties are written `transition-[transform,opacity]` (comma, no spaces). `ease-out` becomes the site's signature curve once plan 003 has run; before that it is Tailwind's built-in, which is still better than the default and needs no further change later.
- Keep `motion` and `AnimatePresence` imported: the mobile overlay (`motion.div` at line 190) and its links still use them.

## Steps

1. Add `import { EASE } from "@/lib/motion";` after line 6 (`import { motion, AnimatePresence } from "framer-motion";`).
2. Lines 78-87: change `<motion.header` to `<header` and delete the three lines `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}` and `transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}`. Keep `className` and `style` exactly as they are.
3. Line 185: change `</motion.header>` to `</header>`.
4. Lines 177, 179, 181: in each of the three `<span className="…">`, replace `transition-all duration-300` with `transition-[transform,opacity] duration-200 ease-out`. The `style` props do not change.
5. Line 206: replace `transition={{ delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}` with `transition={{ delay: i * 0.05, duration: 0.3, ease: EASE.out }}`.

## Boundaries

- Do NOT change the overlay's own fade (`transition={{ duration: 0.15 }}` at line 196). 150ms is correct for a full-screen menu.
- Do NOT touch the desktop link hover handlers (`onMouseEnter`/`onMouseLeave` at lines 138-139, 160-161) or the active underline (lines 142-146). Colour-only, no motion issue.
- Do NOT change the focus trap, Escape handling or body scroll lock (lines 42-66).
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since commit 96c93e8), STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - `npx tsc --noEmit` → exits 0.
  - `npm run lint` → exits 0.
  - `grep -n "motion.header\|transition-all\|duration: 1.1\|duration: 0.45" components/Navigation.tsx` → no output.
- **Feel check**: `npm run dev`, open http://localhost:3000.
  - Hard-reload (⌘⇧R) with DevTools → Network throttled to "Slow 4G". The "CK" mark and the nav links are visible as soon as the page paints, before the rest of the page finishes loading. Previously they appeared over a second later.
  - Narrow the window below 1024px. Tap the hamburger repeatedly, fast. The bars rotate into an X and back in about 200ms each time and never jump or restart from a wrong position (CSS transitions retarget from the current state, so spamming is safe).
  - In DevTools, select one of the three bar `<span>`s: Computed `transition-property` reads `transform, opacity`, not `all`.
  - Open the menu once and watch the links: they rise in one after another and the last one has settled in well under a second.
- **Done when**: the header renders with no animation at all, the hamburger bars transition only `transform` and `opacity` over 200ms, and the menu links use `duration: 0.3` with `EASE.out`.
