# 010 — Fade the Commercial grid/list view in after a toggle

- **Status**: DONE (applied 2026-09-14 on branch motion-plans-007-010)
- **Commit**: 4726a87
- **Severity**: LOW (additive: missed opportunity)
- **Category**: 8. Missed opportunities
- **Estimated scope**: 1 file (`app/commercial/CommercialClient.tsx`), ~8 lines

## Problem

`/commercial` has a grid / list toggle. The two views swap in a single frame, and they are very
different shapes: a tall grid of full-width covers with image strips, and a dense text list.
Measured on the live site on 2026-09-14 (Chrome, 1200px wide): the document is **16,426px** tall in
grid view and **9,216px** in list view. Everything below the toggle is replaced instantly, which
reads as a jump cut, not as the same projects shown another way.

The toggle is used once or twice per visit, so a short transition costs nothing in speed.

```tsx
// app/commercial/CommercialClient.tsx:122 — current
  const [view, setView] = useState<"grid" | "list">("grid");
```

```tsx
// app/commercial/CommercialClient.tsx:148-161 — current (toggle buttons)
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className="mono-label flex h-11 items-center px-3 transition-colors duration-200"
              style={{
                color: view === v ? "var(--color-text)" : "var(--color-text-muted)",
                borderBottom: view === v ? "1px solid var(--color-accent)" : "1px solid transparent",
              }}
            >
              {v}
            </button>
          ))}
```

```tsx
// app/commercial/CommercialClient.tsx:164-168 — current (view switch, start)
        {/* Photo / production projects */}
        {view === "list" ? (
          <CommercialList projects={projects} />
        ) : (
        <div className="space-y-32">
```

```tsx
// app/commercial/CommercialClient.tsx:292-293 — current (view switch, end)
        </div>
        )}
```

## Target

- After the visitor presses a toggle, the view that appears fades in from `opacity: 0` to `1` over
  **200ms** on `ease-out`. In this repo `ease-out` is the signature curve
  `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out`, `app/globals.css:56`). 200ms matches `DUR.micro`
  in `lib/motion.ts`.
- **Opacity only.** No slide, no scale: the page height already changes by thousands of pixels, and
  any travel would fight that.
- **Entry only.** The outgoing view is removed at once, so the toggle still answers instantly.
- **Not on page load.** Until the first toggle, the grid gets no fade class; the page already fades
  in through `PageTransition` (250ms) and a second fade would stack on it.
- Done with CSS `@starting-style` through Tailwind v4's `starting:` variant (Tailwind 4.2.4 in this
  repo): the style an element starts from when it is first rendered. No JavaScript animation, no
  Framer Motion. Browsers without `@starting-style` (Safari < 17.5, Chrome < 117, Firefox < 129)
  show today's instant swap.
- Reduced motion needs no extra code: the global block in `app/globals.css:262-278` keeps opacity
  transitions at 120ms and there is no movement to remove.

## Repo conventions to follow

- Tailwind classes for motion on this page, with the signature curve via `ease-out`, e.g.
  `app/commercial/CommercialClient.tsx:186`:
  `transition-[opacity,transform] duration-200 ease-out`.
- State lives in `useState` at the top of `CommercialClient` (`useState` is already imported at
  line 3).

## Steps

1. Below `const [view, setView] = useState<"grid" | "list">("grid");` (line 122) add:

   ```tsx
   // True after the first toggle. The view that mounts after a toggle fades in (opacity
   // only: the page height already jumps by thousands of pixels). Before any toggle the grid
   // is the first paint and must not fade on top of the route fade in PageTransition.
   const [toggled, setToggled] = useState(false);
   const viewEnter = toggled ? "transition-opacity duration-200 ease-out starting:opacity-0" : "";
   ```

2. In the toggle button (line 151) replace

   ```tsx
                 onClick={() => setView(v)}
   ```

   with

   ```tsx
                 onClick={() => { setView(v); setToggled(true); }}
   ```

3. Replace the start of the view switch (lines 165-168):

   ```tsx
           {view === "list" ? (
             <CommercialList projects={projects} />
           ) : (
           <div className="space-y-32">
   ```

   with

   ```tsx
           {view === "list" ? (
             <div key="list" className={viewEnter}>
               <CommercialList projects={projects} />
             </div>
           ) : (
           <div key="grid" className={`space-y-32 ${viewEnter}`}>
   ```

   The two different `key`s are required. Both branches are now a `<div>` in the same position;
   without keys React would reuse the same DOM element, and `@starting-style` only applies to an
   element that is newly inserted, so nothing would fade.

4. Do not change the end of the switch (`</div>` then `)}` at lines 292-293).

## Boundaries

- Only `app/commercial/CommercialClient.tsx`. Do NOT touch `components/CommercialList.tsx`,
  `app/globals.css`, `lib/motion.ts` or `components/PageTransition.tsx`.
- Do NOT animate the outgoing view, and do NOT add `AnimatePresence` or any Framer Motion here.
- Do NOT add a transform, blur or stagger.
- Do NOT change the toggle buttons' look, the grid markup inside the `<div>`, the lightbox, or the
  "Selected Episodes" section below.
- If any quoted code does not match, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` → exit 0. `npm run lint` → exit 0. `npm run build` → compiles
  all routes. Then `grep -n "starting:opacity-0" app/commercial/CommercialClient.tsx` → one match.
- **Feel check** (`npm run build && npx next start -p 3100`, open `http://localhost:3100/commercial`):
  - Load the page: the grid arrives with the normal page fade only, not a second fade.
  - Press **list**: the list fades in quickly (a fifth of a second) where the grid was. The button
    highlight changes instantly. Press **grid**: the grid fades in the same way.
  - Press list / grid rapidly six times: every press responds at once, nothing lags or queues, and the
    page never ends up blank or half-transparent once you stop.
  - Press the already-selected button: nothing fades.
  - Console check (paste on `/commercial`, logs the new view's opacity for 300ms after pressing list):

    ```js
    (async () => {
      const group = document.querySelector('[aria-label="View mode"]');
      const btn = v => [...group.querySelectorAll('button')].find(b => b.textContent.trim() === v);
      console.log('before toggle, fade class on grid:', group.nextElementSibling.className.includes('starting'));
      btn('list').click();
      const t0 = performance.now(), s = [];
      await new Promise(res => { const f = () => { s.push([Math.round(performance.now() - t0), getComputedStyle(group.nextElementSibling).opacity]);
        performance.now() - t0 < 300 ? requestAnimationFrame(f) : res(); }; requestAnimationFrame(f); });
      console.table(s);
    })();
    ```

    Expected: first line logs `false`; the table shows opacity rising from near `0` to `1` within
    about 200ms.
  - DevTools → Animations panel at 10%: press list and confirm one `opacity` transition, 200ms,
    `cubic-bezier(0.16, 1, 0.3, 1)`, and no transform.
  - DevTools → Rendering → `prefers-reduced-motion: reduce`: the swap is a very short fade (120ms),
    no movement.
- **Done when**: the console check shows `false` before the toggle and an opacity ramp to `1` within
  ~200ms after it, and rapid toggling never leaves the view transparent.
