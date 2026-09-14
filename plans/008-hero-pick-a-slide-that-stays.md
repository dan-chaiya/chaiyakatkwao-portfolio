# 008 — Let a picked hero slide stay, and answer the click in 300ms

- **Status**: DONE (applied 2026-09-14 on branch motion-plans-007-010)
- **Commit**: 4726a87
- **Severity**: HIGH
- **Category**: 4. Interruptibility, 2. Easing & duration
- **Estimated scope**: 1 file (`components/HeroStage.tsx`), ~10 lines

## Problem

The Home hero auto-advances every 6 seconds. On screens `sm` and wider there is a row of slide
marks; clicking one is meant to show that slide. Two things break that.

**a. The auto-advance timer ignores the click.** The interval is created once and is not reset when
the slide changes, so a click lands wherever the running 6s cycle happens to be, and the slideshow
moves on as soon as that cycle ends.

```tsx
// components/HeroStage.tsx:73-77 — current
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), HERO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced, paused, count]);
```

Measured on the live site on 2026-09-14: waited for an auto-advance, clicked a different slide mark
5.5s later, and the picked slide was replaced **500ms** after the click — before its own fade had
finished. To the visitor, the control appears not to work.

**b. A click is answered with the slow ambient cross-fade.** Every slide change uses the same
1200ms fade, whether the slideshow advanced by itself or the visitor asked for a slide:

```tsx
// components/HeroStage.tsx:129-136 — current
          <div
            key={i}
            aria-hidden={i !== active}
            className="absolute inset-0 transition-opacity ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              transitionDuration: reduced ? "0ms" : "1200ms",
            }}
          >
```

1200ms is right for the unattended slideshow (ambient, marketing-paced). A response to a click is UI
and belongs under 300ms, or the click feels ignored.

The click handler today:

```tsx
// components/HeroStage.tsx:204-211 — current
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show slide ${i + 1}: ${slide.alt}`}
                aria-current={i === active ? "true" : undefined}
                className="flex h-11 w-4 items-center justify-center"
              >
```

## Target

1. **Every slide change restarts the 6s wait.** A picked slide is shown for the full
   `HERO_INTERVAL_MS` (6000ms) before the slideshow moves on. Pause and reduced motion keep
   stopping the rotation exactly as today.
2. **Two fade speeds.** A slide chosen by a click fades in over **300ms**; a slide reached by
   auto-advance keeps **1200ms**. Both use the existing class `ease-out`, which in this repo is the
   signature curve `cubic-bezier(0.16, 1, 0.3, 1)` (set as `--ease-out` in `app/globals.css:56`).
   Under reduced motion the duration stays `0ms`.
3. A click during a running 1200ms fade retargets from where the fade is: this is a CSS transition,
   so changing `opacity` and `transition-duration` mid-way continues from the current value.
   No keyframes.

## Repo conventions to follow

- Motion constants come from `lib/motion.ts`; `HERO_INTERVAL_MS` is already imported at
  `components/HeroStage.tsx:19`. The fade durations in this file are literal strings in the inline
  style (`"1200ms"`), so the new `"300ms"` follows the same pattern next to it.
- Reduced motion in this component is read with `const reduced = useReducedMotion();`
  (`components/HeroStage.tsx:64`) and branched in place, as the current `transitionDuration` line does.

## Steps

1. Below `const [paused, setPaused] = useState(false);` (`components/HeroStage.tsx:67`) add:

   ```tsx
   // True when the visitor picked the current slide. A pick is answered in 300ms; the
   // unattended slideshow keeps its slow 1200ms cross-fade.
   const [picked, setPicked] = useState(false);
   ```

2. Replace the auto-advance effect (`components/HeroStage.tsx:70-77`, the comment and the effect)
   with:

   ```tsx
   // Continuous auto-loop. WCAG 2.2.2 requires that anything moving for more than
   // five seconds can be stopped, so this honours an explicit pause as well as
   // prefers-reduced-motion. A timeout keyed on `active` restarts the wait on every
   // slide change, so a slide the visitor picks stays for the full interval.
   useEffect(() => {
     if (reduced || paused) return;
     const id = setTimeout(() => {
       setPicked(false);
       setActive((i) => (i + 1) % count);
     }, HERO_INTERVAL_MS);
     return () => clearTimeout(id);
   }, [reduced, paused, count, active]);
   ```

3. In the slide layer's inline style (`components/HeroStage.tsx:135`) replace

   ```tsx
                 transitionDuration: reduced ? "0ms" : "1200ms",
   ```

   with

   ```tsx
                 transitionDuration: reduced ? "0ms" : picked ? "300ms" : "1200ms",
   ```

4. In the slide mark button (`components/HeroStage.tsx:207`) replace

   ```tsx
                   onClick={() => setActive(i)}
   ```

   with

   ```tsx
                   onClick={() => { setPicked(true); setActive(i); }}
   ```

5. Leave the video effect (`components/HeroStage.tsx:79-90`) unchanged. It already keys on
   `active` and restarts the active video.

## Boundaries

- Do NOT touch `HERO_INTERVAL_MS` or anything else in `lib/motion.ts`.
- Do NOT change the pause button, the counter, the slide markup, the classes, or the stacking of the
  slides. Motion and timer logic only.
- Do NOT add a fade for the outgoing slide separately, change z-order, or add a blur. The mid-fade
  look of two slides over black is out of scope (see feel check).
- Clicking the mark of the slide that is already showing changes nothing (`active` is unchanged, so
  the timer is not restarted). That is acceptable; do not add code for it.
- If any quoted code does not match, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` → exit 0. `npm run lint` → exit 0 (no unused variables,
  no exhaustive-deps warning: `active` is now in the dependency array). `npm run build` → compiles.
- **Feel check** (`npm run build && npx next start -p 3100`, open `http://localhost:3100/` in a
  window at least 640px wide so the slide marks show):
  - Wait for the slideshow to advance, count about 5 seconds, then click a different slide mark.
    The picked slide arrives in about a third of a second and stays for a full 6 seconds before the
    next one fades in slowly.
  - Click three different marks quickly in a row. Each click takes over from the fade in progress
    without a flash to black or a restart from zero, and the last one picked stays for 6 seconds.
  - Leave the page alone for 20 seconds: auto-advance still cross-fades slowly (1200ms) every 6s.
  - Press pause, click a mark: the slide changes and the slideshow stays paused. Press play: the
    next advance comes 6 seconds later.
  - Console timing check (logs how long a picked slide stays):

    ```js
    (async () => {
      const marks = [...document.querySelectorAll('[aria-label="Slides"] button')];
      const cur = () => marks.findIndex(b => b.getAttribute('aria-current') === 'true');
      await new Promise(r => setTimeout(r, 5000));
      const target = (cur() + 2) % marks.length, t0 = performance.now();
      marks[target].click();
      while (cur() === target && performance.now() - t0 < 8000) await new Promise(r => setTimeout(r, 20));
      console.log('picked slide stayed', Math.round(performance.now() - t0), 'ms');
    })();
    ```

    Expected: about `6000` ms (before this plan it can be as low as a few hundred).
  - In DevTools → Rendering, emulate `prefers-reduced-motion: reduce` and reload: no rotation, no
    pause button, clicking a mark swaps the slide instantly.
  - In DevTools → Animations panel, set playback to 10%, then click a mark and later let one
    auto-advance run. The click's transition is recorded as 300ms, the auto-advance as 1200ms, both
    on `cubic-bezier(0.16, 1, 0.3, 1)`. If the middle of either fade shows a visible dip toward
    black, note it for a later plan; do not fix it here.
- **Done when**: the console check logs about 6000ms, a clicked slide visibly arrives in ~300ms, and
  auto-advance still fades over 1200ms.
