# 005 — Stop animating lightbox prev/next; keep the scale-in for open only

- **Status**: DONE (applied 2026-09-12 on branch motion-fixes)
- **Commit**: 96c93e8
- **Severity**: HIGH
- **Category**: 1. Purpose & frequency (also 4. Interruptibility)
- **Estimated scope**: 1 file, ~25 lines

## Problem

Opening the lightbox is correct: the backdrop fades in, the image scales from `0.94` to `1`, never from nothing. The problem is that the same entrance replays on **every** step through a set.

`components/Lightbox.tsx:167` gives the image wrapper `key={src}`, so each prev/next unmounts it and mounts a fresh one, which re-runs the scale-in spring. Prev/next is driven by ArrowLeft/ArrowRight (`Lightbox.tsx:91-95`), by the arrow buttons, and by swipe. Stepping through a 12-photo set is a keyboard-repeat action; animating each step makes the set feel slow to flip through. The code even had to add a 350ms lock to survive it: the comment at line 37 says "Debounce prevents page crash from rapid clicking", which is a symptom of remounting an animating element on every key press.

A second, smaller issue in the same block: the swipe (`Lightbox.tsx:175-178`) only checks how far the finger moved (60px). A quick flick that covers less distance is ignored, although a flick is the most natural way to say "next".

```tsx
// components/Lightbox.tsx:24 — current
  const navigating = useRef(false);
```

```tsx
// components/Lightbox.tsx:37-50 — current
  // Debounce prevents page crash from rapid clicking
  const handlePrev = useCallback(() => {
    if (navigating.current || !hasPrev) return;
    navigating.current = true;
    onPrev?.();
    setTimeout(() => { navigating.current = false; }, 350);
  }, [hasPrev, onPrev]);

  const handleNext = useCallback(() => {
    if (navigating.current || !hasNext) return;
    navigating.current = true;
    onNext?.();
    setTimeout(() => { navigating.current = false; }, 350);
  }, [hasNext, onNext]);
```

```tsx
// components/Lightbox.tsx:165-181 — current
        {/* Image */}
        <motion.div
          key={src}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 250 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) handleNext();
            if (info.offset.x > 60) handlePrev();
          }}
          className="relative flex items-center justify-center w-full select-none"
          style={{ maxHeight: "calc(100vh - 140px)", cursor: "grab" }}
        >
```

## Target

- The image wrapper mounts once per lightbox open and stays mounted while `src` changes. The scale-in plays on open; prev/next swaps the picture instantly.
- The `exit` stays: when the lightbox closes, the parent `AnimatePresence` (in the page components) propagates exit to this element, so the image shrinks slightly as the backdrop fades. That is the close animation and it is correct.
- The debounce and its ref go away. With no remount per step there is nothing to protect, and a lock on a key-repeat action is itself a source of "my key press was ignored".
- Swipe also accepts a flick: velocity above 110 px/s in either direction counts, regardless of distance.

```tsx
// components/Lightbox.tsx — target: the two handlers, no lock
  const handlePrev = useCallback(() => {
    if (!hasPrev) return;
    onPrev?.();
  }, [hasPrev, onPrev]);

  const handleNext = useCallback(() => {
    if (!hasNext) return;
    onNext?.();
  }, [hasNext, onNext]);
```

```tsx
// components/Lightbox.tsx — target: the image wrapper
        {/* Image. Mounted once per open: the scale-in is the arrival, and stepping
            through the set swaps the picture instantly. Prev/next is a key-repeat
            action (arrow keys), and animating each step made the set feel slow to
            flip through. exit still runs on close via the parent AnimatePresence. */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 250 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            // A flick counts as well as a long drag: velocity is px/s.
            if (info.offset.x < -60 || info.velocity.x < -110) handleNext();
            else if (info.offset.x > 60 || info.velocity.x > 110) handlePrev();
          }}
          className="relative flex items-center justify-center w-full select-none"
          style={{ maxHeight: "calc(100vh - 140px)", cursor: "grab" }}
        >
```

## Repo conventions to follow

- Comments explain the reason in full sentences above the code (see `Lightbox.tsx:27-29`, `60-61`, `68-69`). Replace the old "Debounce prevents page crash" comment rather than leaving a stale one.
- `useCallback` with explicit dependency arrays is the pattern for handlers in this file; keep it.
- The spring config `{ type: "spring", damping: 30, stiffness: 250 }` is a settled choice for the open animation; do not change it.

## Steps

1. Line 24: delete `const navigating = useRef(false);`. The `useRef` import at the top of the file stays: `dialogRef` (line 52) still uses it.
2. Lines 37-50: replace the comment and both handlers with the target handlers above (no `navigating` checks, no `setTimeout`).
3. Lines 165-167: replace the `{/* Image */}` comment with the target comment, and delete the line `key={src}` from the `<motion.div`.
4. Lines 175-178: replace the `onDragEnd` body with the target version (velocity added, `else if` so one gesture cannot fire both).
5. Leave everything else in the file exactly as it is: dialog fade (lines 109-112), focus trap, keyboard handler, buttons, swipe hint, caption.

## Boundaries

- Do NOT remove `exit` from the image wrapper. It is the close animation.
- Do NOT add a crossfade between images. The decision is an instant swap for a keyboard-driven step.
- Do NOT change the dialog's own `initial`/`animate`/`exit`/`transition` (lines 109-112) or the swipe hint (lines 214-230).
- Do NOT edit the three parent components that render `<Lightbox>` (`app/gallery/GalleryClient.tsx`, `app/commercial/CommercialClient.tsx`, `app/commercial/[slug]/CaseStudyClient.tsx`).
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since commit 96c93e8), STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - `npx tsc --noEmit` → exits 0.
  - `npm run lint` → exits 0 (in particular no "unused variable" warning for `navigating`).
  - `grep -n "navigating\|key={src}\|350" components/Lightbox.tsx` → no output.
- **Feel check**: `npm run dev`, open http://localhost:3000/gallery.
  - Click the first Woven Memories photo. The lightbox fades in and the image scales up gently from slightly smaller. This should look exactly as before.
  - Press → repeatedly, fast, then hold → for three seconds. The pictures change instantly with every press; nothing scales or fades between them; the counter keeps up; the browser console shows no errors.
  - Press ← at the first image and → at the last: nothing happens (the boundary guards still work).
  - Press Escape. The image shrinks slightly as the backdrop fades out (the close animation still runs).
  - Real device or DevTools touch emulation: a short quick flick left advances; a slow drag under 60px that stops does not.
  - In DevTools → Animations at 10% playback, open the lightbox once and confirm the scale-in runs once, then step with → and confirm no new animation appears in the panel.
- **Done when**: the scale-in runs on open and close only, stepping is instant with no lock, and a flick advances the set.
