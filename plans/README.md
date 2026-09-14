# Animation plans — chaiyakatkwao.com

Written by the `improve-animations` audit on 2026-09-12 against commit `96c93e8` (plans 001–006),
and a second audit on 2026-09-14 against `4726a87` (plans 007–010, after 001–006 went live).
Each plan is self-contained: an executor with no other context can run it. Line numbers are as of
the commit stamped in each plan; if the file has moved on, match by the quoted code, and stop if it
does not match.

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
| [007](007-no-smooth-scroll-on-navigation.md) | Stop the new page rolling up to the top on every navigation | HIGH | `app/globals.css` | DONE |
| [008](008-hero-pick-a-slide-that-stays.md) | Let a picked hero slide stay, and answer the click in 300ms | HIGH | `components/HeroStage.tsx` | DONE |
| [009](009-home-cards-css-hover.md) | Home cards: hover in CSS, not on tap, with a wash that actually fades | MEDIUM | `components/portfolio/PortfolioHome.tsx` | DONE |
| [010](010-commercial-view-toggle-fade.md) | Fade the Commercial grid/list view in after a toggle | LOW (additive) | `app/commercial/CommercialClient.tsx` | DONE |

## Recommended order — round 2 (007–010)

1. **007**: the biggest felt problem (measured live: 1.2s+ of the page scrolling itself after a footer link), a 4-line deletion.
2. **008**: the hero slide marks start working (measured live: a picked slide was replaced after 500ms).
3. **009**: Home cards stop reacting to taps on phones; the section wash fades instead of jumping.
4. **010**: additive polish on `/commercial`; do it last.

The four plans touch four different files and share no lines; any order works.

## Recommended order — round 1 (001–006, done)

1. **001** — the biggest change to how the site feels, one small file.
2. **004** — the nav arrives instantly.
3. **005** — the lightbox flips through a set without lag.
4. **006** — the `transition: all` sweep and the two hidden bugs.
5. **003** — the curve token. Run after 004 and 006 so their new `ease-out` classes pick up the signature curve, and so its verification grep is clean.
6. **002** — the reduced-motion provider. Independent; last only because its feel check is easier once the others are in.

## Dependencies and overlaps — round 1

The plans are independent and can run in any order; no two plans edit the same lines. Three files are touched by more than one plan, at different places:

| File | Plans | Overlap |
| --- | --- | --- |
| `components/Lightbox.tsx` | 003 (import, lines 112 and 220), 005 (lines 24, 37-50, 165-178), 006 (lines 135, 154, 202) | Different lines. Line numbers shift after the first edit; match by code. |
| `components/portfolio/PortfolioHome.tsx` | 001 (import, wrap the fragment at lines 50 and 232), 003 (lines 259, 297, 354) | Different lines. |
| `app/commercial/CommercialClient.tsx` | 003 (lines 273, 282), 006 (line 186) | Different lines. |

Ownership rules written into the plans: 003 does **not** touch `PageTransition.tsx`, `Navigation.tsx` or `AboutClient.tsx` (001, 004 and 006 delete or replace those files' hard-coded curves themselves). 006 does **not** touch `Navigation.tsx` (004 owns its three `transition-all` bars).

After all six: `grep -rn "transition-all" app components` returns nothing, and `grep -rn "0.16, 1, 0.3, 1" app components` returns only the token line and `.kenburns` in `app/globals.css`.

## Findings not yet planned

Re-vetted against `4726a87` on 2026-09-14. Ask for a plan for any of them. Findings from the first
audit that are now planned were moved out of this table: the triptych gradient snap, React-state
hovers and DisciplineRow slide (→ 009), the hero click fade (→ 008, which also fixes the timer not
resetting on a click), and `scroll-behavior: smooth` (→ 007, raised to HIGH: under Next 16 it
animates every navigation, not only the skip link).

| Severity | Location | Finding | Fix summary |
| --- | --- | --- | --- |
| MEDIUM | `components/Lightbox.tsx:169-176` | On a phone swipe the photo moves only 8% of the finger's travel (`dragElastic={0.08}` with zero constraints), so it feels locked. Cannot be judged from code. | **Swipe on a real phone first.** If it feels stuck: let the photo follow the finger, and on a committed swipe slide it out and the next one in from the opposite side (~250ms). Arrow keys and buttons stay instant (plan 005). May conclude "leave it". |
| LOW | `components/Lightbox.tsx:164-168` | On close, the backdrop fades out in 300ms but the image's exit spring (`damping: 30, stiffness: 250`) keeps the invisible dialog mounted until ~500ms, swallowing a quick click on the page. | `exit={{ scale: 0.96, opacity: 0, transition: { duration: 0.3, ease: EASE.out } }}` on the image so both finish together. |
| LOW | `app/commercial/[slug]/CaseStudyClient.tsx:128, 174` | `group-hover:scale-[1.01]` over 700ms: invisible, but promotes every full-width photo to its own compositor layer. | Delete `transition-transform duration-700 ease-out group-hover:scale-[1.01]` from both `className`s. |
| LOW | `app/not-found.tsx:13-39` | Children fade 0.7s / 1.1s / 0.8s inside a `PageTransition` that also fades. Nested fades read as muddy. 404 is rare, so delight is allowed; this is about clarity. | Drop `opacity` from the three children's `initial`/`animate` (keep the `y` rise), h1 duration 1.1 → 0.6. |
| LOW | `app/globals.css:245-256, 277` | `.kenburns` is unused since the hero rebuild (no reference outside `globals.css`). | Delete the comment and `@keyframes kenburns` at 245-250, `.kenburns` at 251-253, its reduced-motion rule at 254-256, and the line `.kenburns { animation: none !important; }` at 277. |
| LOW | `public/systems/styles.css:532-536` | Reduced-motion block clamps every transition to 1ms, which also kills hover colour feedback. | Mirror `app/globals.css:262-278`: keep `color, background-color, border-color, opacity, outline-color` at 120ms, stop everything else. |

## Missed opportunities

Additive, not corrective. Re-swept on 2026-09-14 with `find-animation-opportunities`.

1. **Commercial grid ↔ list toggle**: planned as **010**.
2. **New chat bubbles pop in** (`app/chat/ChatInterface.tsx:132-140`). Each message appears from nothing. A `.chat-bubble` class in `app/globals.css`: `transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out)` with `@starting-style { opacity: 0; transform: translateY(4px); }`. Skip the opening message (`m.id !== "opening"`) so nothing moves on page load; apply the same class to the error bubble. The streamed text inside a bubble does not animate.
3. **The chat's `...` placeholder is static** (`app/chat/ChatInterface.tsx:135-137`) while waiting for the first word. Reuse the existing `@keyframes pulse` (`app/globals.css:240-243`, opacity 1 → 0.3 → 1), as the Home "Available" dot does (`components/portfolio/PortfolioHome.tsx:160`): `animation: pulse 2s ease-in-out infinite`. The global reduced-motion block already stops it. Only worth doing if replies take longer than ~300ms to start; check by hand.
4. **/systems phone menu appears in one frame** (`public/systems/styles.css:315-324`) while the main site's menu fades in over 150ms. `.menu__panel { transition: opacity 150ms var(--ease); }` with `@starting-style { .menu[open] .menu__panel { opacity: 0; } }`. It lives in a `<details>` element, so some browsers may not run it; the fallback is today's instant open.

**Rejected on 2026-09-14 (do not build without asking CK):** press feedback (`active:scale-[0.97]`) on the hero controls and lightbox buttons, proposed in the first audit. Every one of those presses already produces an instant visible result (the slide or image changes, the play/pause icon flips, the lightbox closes), the lightbox arrows are pressed tens of times per set, and the site's voice is flat. Also rejected in the same sweep: a sliding underline between nav links (core navigation), staggered grid entrances and fade-in on image load (both hold back the work; `lib/motion.ts` records that content is visible at rest), and a fade on the YouTube thumbnail → player swap (the gap is the player loading, which a fade cannot fix).

## Execution log

- **2026-09-14** — plans 007–010 applied by an executor agent in a worktree on branch `motion-plans-007-010` (from `main` at `4726a87`). Every quoted block matched once; no deviations. `npx tsc --noEmit` 0, `npm run lint` 0, `npm run build` 0 (all routes). (A first attempt using the Agent tool's own worktree was based on the repo's configured default branch `motion-upgrade`, `5dc57cd`, and correctly stopped before editing; the worktree was then created from `main` by hand.) Browser checks on the production build:
  - 007: bottom of Home → footer "Commercial": `scrollY` 2367 → 0 in one jump (before: a 1.2s+ decreasing run).
  - 008: a picked slide stayed current 6028ms; slide layers `transition-duration` 0.3s after a click, 1.2s after the next auto-advance.
  - 009: real mouse hover on the Gallery section card: wash opacity 0 → 0.35 (50ms) → 0.67 (100ms) → 0.95 (200ms) → 1 (300ms); image `scale` reaches 1.05 by ~900ms; index colour 0.5 → 0.9 alpha. Built CSS puts every new `group-hover` rule inside `@media (hover: hover)`; the caption's `group-hover:text-[var(--color-text)]!` compiles with `!important`, so it beats the unlayered `.mono-label` colour. With phone emulation (390px, mobile, touch) `(hover: hover)` is false. The only remaining `onMouseEnter` on the cards is next/link's own prefetch handler, identical to the footer links.
  - 010: no fade class before the first toggle; list and grid each ramp opacity 0 → 1 in ~200ms; 7 presses 40ms apart each answered in the next frame and ended fully opaque on the right view.
  - Not checked: `prefers-reduced-motion` in a browser (the DevTools tool here cannot emulate it; the global CSS block that governs it is unchanged), and a real phone.
- **2026-09-12** — all six plans applied on branch `motion-fixes` (from `96c93e8`), by exact-match replacement; every step matched the quoted code once. `npx tsc --noEmit` 0, `npm run lint` 0, `npm run build` compiled all 16 routes. Browser checks on the production build (`next start -p 3100`):
  - Home: page wrapper is opacity-only; hero slides, featured photo and triptych photos all compute to `cubic-bezier(0.16, 1, 0.3, 1)`; `<header>` has no inline opacity; hamburger bars transition `transform, opacity` over 200ms on the signature curve.
  - Commercial: badge and play ring transition named properties over 200ms; list thumbnail computes to `matrix(0.96, 0, 0, 0.96, 0, -60)` at rest with an `opacity, transform` transition, so the hover scale-up now fires.
  - Gallery lightbox: 10 rapid arrow presses stepped 01 → 11 on the same `<img>` node (no remount), no console errors; 16 presses at 30ms spacing stop at 12/12 and 16 back stop at 01/12; Escape closes.
  - Not checked in the browser: `prefers-reduced-motion` behaviour of `MotionConfig` (the browser tool here cannot emulate the media query). Verified by code and the framer-motion API; do the DevTools Rendering-panel check from plan 002 by hand.
- **Observation, plan 005** — a burst of synthetic key events dispatched with no gap inside one script tick can step past the last image (the `hasNext` guard reads a closure that has not re-rendered yet). Real key repeat, clicks and swipes each get their own React flush and cannot do this; confirmed with 30ms spacing. If it is ever wanted, the hardening is a clamp in the three parents' `onNext`/`onPrev` updaters, e.g. `index: Math.min(lb.index + 1, lb.images.length - 1)`. Out of plan 005's scope; left as is.
- **Observation, plan 005** — closing the lightbox takes ~500ms to unmount: the image's exit spring (`damping: 30, stiffness: 250`) settles after the 300ms backdrop fade. Pre-existing; the two could be brought together with `exit={{ scale: 0.96, opacity: 0, transition: { duration: 0.3, ease: EASE.out } }}` if the close should feel snappier.
