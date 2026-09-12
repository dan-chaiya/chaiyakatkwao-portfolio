# Animation plans — chaiyakatkwao.com

Written by the `improve-animations` audit on 2026-09-12 against commit `96c93e8` (branch `main`).
Each plan is self-contained: an executor with no other context can run it. Line numbers are as of
`96c93e8`; if the file has moved on, match by the quoted code, and stop if it does not match.

Plans change **motion only**. None of them changes the look, the copy, the layout or the markup
beyond what a motion fix needs (one `<motion.header>` → `<header>`, two `<motion.a>` → `<a>`, one
provider wrapper).

## Plans

| # | Title | Severity | Files | Status |
| --- | --- | --- | --- | --- |
| [001](001-route-fade-opacity-only.md) | Shorten the route fade to an opacity-only 250ms | HIGH | `components/PageTransition.tsx`, `lib/motion.ts`, `components/portfolio/PortfolioHome.tsx` | DONE |
| [002](002-reduced-motion-for-framer.md) | Honour prefers-reduced-motion for every Framer Motion element | MEDIUM | `components/MotionProvider.tsx` (new), `app/layout.tsx` | DONE |
| [003](003-signature-curve-as-tailwind-ease-out.md) | Make the signature curve the site's `ease-out` everywhere | MEDIUM | `app/globals.css`, `app/commercial/CommercialClient.tsx`, `components/portfolio/PortfolioHome.tsx`, `components/Lightbox.tsx`, `app/not-found.tsx` | DONE |
| [004](004-nav-arrives-instantly.md) | Let the nav arrive instantly and tidy the hamburger | HIGH | `components/Navigation.tsx` | DONE |
| [005](005-lightbox-step-without-animation.md) | Stop animating lightbox prev/next; keep the scale-in for open only | HIGH | `components/Lightbox.tsx` | DONE |
| [006](006-transition-all-sweep.md) | Replace every `transition: all` with named properties, fix the two effects it hid | HIGH | `components/Lightbox.tsx`, `components/CommercialList.tsx`, `app/commercial/CommercialClient.tsx`, `components/YouTubeEmbed.tsx`, `app/about/AboutClient.tsx` | DONE |

## Recommended order

1. **001** — the biggest change to how the site feels, one small file.
2. **004** — the nav arrives instantly.
3. **005** — the lightbox flips through a set without lag.
4. **006** — the `transition: all` sweep and the two hidden bugs.
5. **003** — the curve token. Run after 004 and 006 so their new `ease-out` classes pick up the signature curve, and so its verification grep is clean.
6. **002** — the reduced-motion provider. Independent; last only because its feel check is easier once the others are in.

## Dependencies and overlaps

The plans are independent and can run in any order; no two plans edit the same lines. Three files are touched by more than one plan, at different places:

| File | Plans | Overlap |
| --- | --- | --- |
| `components/Lightbox.tsx` | 003 (import, lines 112 and 220), 005 (lines 24, 37-50, 165-178), 006 (lines 135, 154, 202) | Different lines. Line numbers shift after the first edit; match by code. |
| `components/portfolio/PortfolioHome.tsx` | 001 (import, wrap the fragment at lines 50 and 232), 003 (lines 259, 297, 354) | Different lines. |
| `app/commercial/CommercialClient.tsx` | 003 (lines 273, 282), 006 (line 186) | Different lines. |

Ownership rules written into the plans: 003 does **not** touch `PageTransition.tsx`, `Navigation.tsx` or `AboutClient.tsx` (001, 004 and 006 delete or replace those files' hard-coded curves themselves). 006 does **not** touch `Navigation.tsx` (004 owns its three `transition-all` bars).

After all six: `grep -rn "transition-all" app components` returns nothing, and `grep -rn "0.16, 1, 0.3, 1" app components` returns only the token line and `.kenburns` in `app/globals.css`.

## Findings not yet planned

Vetted in the same audit, left for a later pass or for a one-line edit. Ask for a plan for any of them.

| Severity | Location | Finding | Fix summary |
| --- | --- | --- | --- |
| MEDIUM | `components/portfolio/PortfolioHome.tsx:363-366` | `transition: background 500ms ease` on a `linear-gradient`. Gradients do not interpolate, so the overlay snaps while the photo zooms over 800ms beneath it. | Two stacked overlay `<div>`s (rest gradient, hover gradient); transition `opacity` on the hover layer over 300ms. |
| MEDIUM | `components/HeroStage.tsx:132-135` | Auto-advance and a click on a slide mark share one 1200ms cross-fade; a click that takes 1.2s to answer feels broken. Both slides at 50% over black also dip visibly mid-fade. | Keep 1200ms for auto-advance; ~450ms when `active` was set by a click. Fade only the incoming slide on top and hide the outgoing after. Curve: `ease-out` (signature, after plan 003). |
| MEDIUM | `components/portfolio/PortfolioHome.tsx:281-288, 338-345` | Hover state via React `useState` + `onMouseEnter`. `onMouseEnter` fires on tap on phones, so the zoom plays as the page navigates away; each hover re-renders the card. | Move the zoom to CSS `group-hover:scale-[1.04]` / `[1.05]` classes on the `<Image>` and drop the state. Tailwind v4 gates `hover:` behind `@media (hover: hover)` for free. |
| LOW | `components/portfolio/PortfolioHome.tsx:258-259` | DisciplineRow slides `translateX(6px)` on hover, but the rows are not links (`cursor: default`). Motion on hover signals "clickable". | Remove the `transform` and its transition; keep the colour change. |
| LOW | `app/commercial/[slug]/CaseStudyClient.tsx:128, 174` | `group-hover:scale-[1.01]` over 700ms: invisible, but promotes every full-width photo to its own compositor layer. | Delete `transition-transform duration-700 ease-out group-hover:scale-[1.01]` from both `className`s. |
| LOW | `app/not-found.tsx:13-39` | Children fade 0.7s / 1.1s / 0.8s inside a `PageTransition` that also fades. Nested fades read as muddy. 404 is rare, so delight is allowed; this is about clarity. | Drop `opacity` from the three children's `initial`/`animate` (keep the `y` rise), h1 duration 1.1 → 0.6. |
| LOW | `app/globals.css:239-250, 271` | `.kenburns` is unused since the hero rebuild. | Delete the `@keyframes kenburns`, `.kenburns`, its reduced-motion rule at 248-250, and the line `.kenburns { animation: none !important; }` at 271. |
| LOW | `public/systems/styles.css:532-536` | Reduced-motion block clamps every transition to 1ms, which also kills hover colour feedback. | Mirror `app/globals.css:256-272`: keep `color, background-color, border-color, opacity, outline-color` at 120ms, stop everything else. |
| LOW | `app/globals.css:66-68` | `scroll-behavior: smooth` on `html` animates the keyboard skip-link jump. Reduced motion already sets it to `auto`. | Remove it, or scope it away from `:focus` targets. Minor. |

## Missed opportunities

Additive, not corrective. Grounded in seams seen on the live site; none is planned yet.

1. **Commercial grid ↔ list toggle** (`app/commercial/CommercialClient.tsx:165-167`). The two views swap instantly with a large layout jump (a tall `space-y-32` grid vs a dense list). A 150ms opacity crossfade of the container on toggle would stop the teleport without slowing the toggle.
2. **Hero controls and lightbox buttons have no press feedback.** The pause button, the slide marks, the ✕ and the arrows (`components/HeroStage.tsx:179-199`, `components/Lightbox.tsx:132-140, 151-162, 199-210`). `active:scale-[0.97]` with `transition-transform duration-150 ease-out` on these few buttons only would give a physical answer to a press. Keep it off text links; the site's voice is flat, and this belongs only on the controls that behave like hardware.
3. **New chat bubbles pop in** (`app/chat/ChatInterface.tsx:132-140`). Each message appears from nothing. A CSS `@starting-style` entrance of `opacity: 0; transform: translateY(4px)` over 150ms would settle each bubble without any JS and without slowing a conversation.

## Execution log

- **2026-09-12** — all six plans applied on branch `motion-fixes` (from `96c93e8`), by exact-match replacement; every step matched the quoted code once. `npx tsc --noEmit` 0, `npm run lint` 0, `npm run build` compiled all 16 routes. Browser checks on the production build (`next start -p 3100`):
  - Home: page wrapper is opacity-only; hero slides, featured photo and triptych photos all compute to `cubic-bezier(0.16, 1, 0.3, 1)`; `<header>` has no inline opacity; hamburger bars transition `transform, opacity` over 200ms on the signature curve.
  - Commercial: badge and play ring transition named properties over 200ms; list thumbnail computes to `matrix(0.96, 0, 0, 0.96, 0, -60)` at rest with an `opacity, transform` transition, so the hover scale-up now fires.
  - Gallery lightbox: 10 rapid arrow presses stepped 01 → 11 on the same `<img>` node (no remount), no console errors; 16 presses at 30ms spacing stop at 12/12 and 16 back stop at 01/12; Escape closes.
  - Not checked in the browser: `prefers-reduced-motion` behaviour of `MotionConfig` (the browser tool here cannot emulate the media query). Verified by code and the framer-motion API; do the DevTools Rendering-panel check from plan 002 by hand.
- **Observation, plan 005** — a burst of synthetic key events dispatched with no gap inside one script tick can step past the last image (the `hasNext` guard reads a closure that has not re-rendered yet). Real key repeat, clicks and swipes each get their own React flush and cannot do this; confirmed with 30ms spacing. If it is ever wanted, the hardening is a clamp in the three parents' `onNext`/`onPrev` updaters, e.g. `index: Math.min(lb.index + 1, lb.images.length - 1)`. Out of plan 005's scope; left as is.
- **Observation, plan 005** — closing the lightbox takes ~500ms to unmount: the image's exit spring (`damping: 30, stiffness: 250`) settles after the 300ms backdrop fade. Pre-existing; the two could be brought together with `exit={{ scale: 0.96, opacity: 0, transition: { duration: 0.3, ease: EASE.out } }}` if the close should feel snappier.
