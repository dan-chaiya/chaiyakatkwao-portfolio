# 007 — Stop the new page rolling up to the top on every navigation

- **Status**: DONE (applied 2026-09-14 on branch motion-plans-007-010)
- **Commit**: 4726a87
- **Severity**: HIGH
- **Category**: 1. Purpose & frequency
- **Estimated scope**: 1 file, delete 4 lines

## Problem

`app/globals.css` turns on smooth scrolling for the whole document:

```css
/* app/globals.css:72-74 — current */
html {
  scroll-behavior: smooth;
}
```

The site runs **Next.js 16.2.4**. Up to Next 15, Next switched `scroll-behavior` to `auto` for the
moment of a route change, so a navigation always jumped to the top instantly. Next 16 stopped doing
that by default (see `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`,
section "Scroll Behavior Override"). So now the scroll to the top of a new page is animated by the
browser.

Measured on the live site on 2026-09-14 (Chrome, 1200×626): scrolled to the bottom of Home
(`scrollY` 2367), clicked the footer link "Commercial". The new page rendered at the old scroll
position, then rolled upward: 2366 at 172ms, 1417 at 430ms, 306 at 766ms, 59 at 1263ms and still
moving. That is more than 1.2 seconds of the page scrolling by itself on the site's core navigation
(header, footer and every "next project" link), from anywhere below the fold.

Nothing on the site needs CSS smooth scrolling:

- The only in-page anchor is the skip link `href="#main-content"` (`components/Navigation.tsx:72`).
  A skip link should jump, not glide.
- The chat scrolls itself with an explicit behaviour, which does not depend on the CSS property:
  `bottomRef.current?.scrollIntoView({ behavior: "smooth" })` (`app/chat/ChatInterface.tsx:40`)
  and `{ behavior: "auto" }` (`app/chat/ChatInterface.tsx:45`).

The reduced-motion block also carries a line that only exists to undo the rule above:

```css
/* app/globals.css:262-263 — current */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
```

## Target

No `scroll-behavior` declaration anywhere in `app/globals.css`. The browser default (`auto`)
applies: navigations land at the top of the new page instantly, in the same frame the new page
paints, and the 250ms opacity route fade (`components/PageTransition.tsx`) is the only motion on
navigation.

Rejected alternative, so the executor does not reach for it: adding `data-scroll-behavior="smooth"`
to `<html>` in `app/layout.tsx` restores Next 15's override. It works, but keeps smooth scrolling
for the skip link (wrong) and makes Next toggle a style on the root element at the start of every
navigation, which the Next 16 docs call out as expensive. Deleting the rule is simpler and correct.

## Repo conventions to follow

- Global CSS lives in `app/globals.css`. Rules outside `@layer` are intentional there; do not move
  anything into or out of a layer.
- The reduced-motion block (`app/globals.css:258-278`) keeps colour and opacity feedback and drops
  movement. It stays exactly as it is apart from the one line this plan removes.

## Steps

1. In `app/globals.css`, delete these three lines and the blank line after them (lines 72-75):

   ```css
   html {
     scroll-behavior: smooth;
   }

   ```

   Match by the exact text. The comment that follows (`/* The sticky header takes real space in
   flow, ...`) must remain and now directly follows the closing `}` of the `@layer base { ... }`
   block and its blank line.

2. In the same file, inside `@media (prefers-reduced-motion: reduce) { ... }` (around line 262),
   delete this one line:

   ```css
     html { scroll-behavior: auto; }
   ```

   and the blank line directly after it. The block must then begin with the comment
   `/* Looping and decorative animation stops outright. */`.

3. Run `grep -n "scroll-behavior" app/globals.css`. Expected: no output.

## Boundaries

- Do NOT touch `app/layout.tsx`. Do NOT add `data-scroll-behavior`.
- Do NOT touch `app/chat/ChatInterface.tsx`; its `scrollIntoView` calls are correct as they are.
- Do NOT touch `public/systems/styles.css`; /systems is a separate static page.
- Do NOT change any other rule in `app/globals.css`.
- If the quoted code is not found exactly, STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - `grep -rn "scroll-behavior" app components` → no output.
  - `npx tsc --noEmit` → exit 0. `npm run lint` → exit 0. `npm run build` → compiles all routes.
- **Feel check** (run `npm run build && npx next start -p 3100`, open `http://localhost:3100/`):
  - Scroll to the very bottom of Home and click **Commercial** in the footer. The Commercial page
    appears already at the top. There is no upward scrolling at all; the only motion is the short
    fade-in of the page.
  - Repeat from the bottom of `/commercial/<any-slug>` using the big "Next" project link.
  - Paste this in the DevTools console on Home to measure it (it scrolls to the bottom, clicks the
    footer link and logs the scroll position for 600ms):

    ```js
    (async () => {
      scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 300));
      const link = [...document.querySelectorAll('footer a')].find(a => a.getAttribute('href') === '/commercial');
      const t0 = performance.now(), s = []; link.click();
      await new Promise(res => { const f = () => { s.push([Math.round(performance.now() - t0), Math.round(scrollY)]);
        performance.now() - t0 < 600 ? requestAnimationFrame(f) : res(); }; requestAnimationFrame(f); });
      console.table(s.filter((x, i) => i === 0 || x[1] !== s[i - 1][1]));
    })();
    ```

    Expected: `scrollY` changes once, from the old value straight to its final value at or near the
    top (`0`, or a small number if Next scrolls the page segment under the header into view), with
    no in-between values. Before this plan the same check logs a long run of decreasing values.
  - Press Tab once on any page and Enter on "Skip to content": focus and view jump to the main
    content instantly.
  - Open `/chat`: the chat still scrolls smoothly to a new message (it sets its own behaviour).
- **Done when**: `grep -rn "scroll-behavior" app components` is empty and the console check shows
  a single jump (no intermediate values) after clicking a footer link from the bottom of Home.
