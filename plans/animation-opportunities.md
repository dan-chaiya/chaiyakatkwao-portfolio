# Animation opportunities — chaiyakatkwao.com

Second motion pass, 14 Sep 2026, against commit `4726a87` (branch `main`, after the six
`motion-fixes` plans merged in #11). Read [`plans/README.md`](README.md) first: it is the
2026-09-12 audit and it already vetted 12 findings it left unplanned. This pass does two
things — re-verifies those 12 against the shipped code, then reports what that audit missed.

No code changed. Every line reference below was read at `4726a87`.

**Verdict.** The corrective work is done: `transition-all` is gone from `app`, `components`
and `public/systems`; every curve resolves to the signature `cubic-bezier(0.16, 1, 0.3, 1)`;
`MotionConfig reducedMotion="user"` covers Framer. What is left is not over-animation — it is
three places where the site does not answer the user at all, and one where a keyboard user
gets a flatter site than a mouse user. The gallery and the chat are the two surfaces with
real gaps. The home page's remaining items are polish.

---

## 1. Carried over from 2026-09-12 — all 12 still open

Verified at `4726a87`. Line numbers are current, not the ones in `README.md`. Fix summaries
are that audit's; I agree with all twelve and am not restating its reasoning.

| # | Severity | Location | Finding |
|---|---|---|---|
| C1 | MEDIUM | `components/portfolio/PortfolioHome.tsx:367` | `transition: background 500ms ease` on a `linear-gradient`. The overlay snaps while the photo zooms 800ms beneath it. |
| C2 | MEDIUM | `components/HeroStage.tsx:135` | Auto-advance and a slide-mark click share one 1200ms cross-fade. A click answered in 1.2s reads as broken. |
| C3 | MEDIUM | `components/portfolio/PortfolioHome.tsx:282, 339` | Hover via `useState` + `onMouseEnter`. Fires on tap on phones; re-renders the card per hover. |
| C4 | LOW | `components/portfolio/PortfolioHome.tsx:259` | `DisciplineRow` slides 6px on hover but is not a link (`cursor: default`). Motion signals "clickable". |
| C5 | LOW | `app/commercial/[slug]/CaseStudyClient.tsx:128, 174` | `group-hover:scale-[1.01]` over 700ms — invisible, and promotes every full-width photo to its own layer. |
| C6 | LOW | `app/not-found.tsx:15-40` | Three children fade 0.7s / 1.1s / 0.8s inside a `PageTransition` that also fades. Nested fades read muddy. |
| C7 | LOW | `app/globals.css:247-256, 277` | `.kenburns` unused since the hero rebuild — confirmed zero references outside its own definition. |
| C8 | LOW | `public/systems/styles.css:534` | Reduced-motion clamps *every* transition to 1ms, killing hover colour feedback. `app/globals.css:262-277` already does this correctly; mirror it. |
| C9 | LOW | `app/globals.css:73` | `scroll-behavior: smooth` on `html` animates the keyboard skip-link jump. |
| M1 | — | `app/commercial/CommercialClient.tsx:165-167` | Grid ↔ list swaps instantly across a large layout jump. 150ms container opacity crossfade. |
| M2 | — | `components/HeroStage.tsx:179-199`, `components/Lightbox.tsx:127-135, 146-157, 197-208` | Controls have no press feedback. |
| M3 | — | `app/chat/ChatInterface.tsx:132-140` | New chat bubbles pop in from nothing. |

M2 is the one I would raise from "missed opportunity" to P1. See N-list below: `active:` /
`whileTap` appears **zero** times in the entire codebase. On touch — where there is no hover
at all — nothing on this site acknowledges a press.

---

## 2. New this pass

### P1 — the site does not answer

**N1. The lightbox shows nothing while the full-size photograph loads.**
`components/Lightbox.tsx:181-192`. A raw `<img src>` with no load state, inside a
`rgba(10,10,10,0.97)` overlay that has already finished fading in. Tap a tile on a hotel
wifi and you get a near-black rectangle, the arrows, the counter, and no indication anything
is coming. The gallery *is* the product — 38 images across two sets, and the lightbox is the
only way to see any of them at size.
*Fix:* keep the already-decoded grid thumbnail as an instant backdrop (`object-fit: contain`,
blurred or not), cross-fade the full image over it on `onLoad` at 200ms opacity.
*Cost:* one `useState` for `loaded`, one extra `<img>` layer per open. The thumbnail is in
cache, so the backdrop costs no request.

**N2. A keyboard user gets a visibly flatter site than a mouse user.**
14 `group-hover:` declarations have no `group-focus-visible:` partner, and 13 `onMouseEnter`
handlers write hover styles in JS with no focus equivalent. Full list:

| File | Lines |
|---|---|
| `app/commercial/[slug]/CaseStudyClient.tsx` | 128, 131, 133, 174, 176, 225 |
| `app/commercial/CommercialClient.tsx` | 182, 185, 186, 206 |
| `components/YouTubeEmbed.tsx` | 37, 39, 41 |
| `components/CommercialList.tsx` | 62 |
| JS-only hover | `Navigation.tsx:136, 158, 223` · `Footer.tsx:44, 54` · `PortfolioHome.tsx:109, 201, 221, 240, 287, 344` · `ChatInterface.tsx:159` · `PrintButton.tsx:25` |

This is not a WCAG 2.4.7 failure — `*:focus-visible` at `app/globals.css:117` puts a ring on
everything. It is that the *designed* state is mouse-only: tab through `/commercial` and the
photo never zooms, the "View case study →" badge never appears, the title never dims. The
codebase already proves the pattern in two places — `components/CommercialList.tsx:29, 73` and
`app/gallery/GalleryClient.tsx:102, 104` pair every hover with `group-focus-visible`.
*Fix:* add the `group-focus-visible:` twin to each of the 14 class lists; convert the 13 JS
handlers to CSS `:hover`/`:focus-visible`. Tailwind v4 gates `hover:` behind
`@media (hover: hover)`, which also closes C3's tap-fires-hover problem for free.
*Cost:* mechanical, no new motion, and it deletes state — `PortfolioHome`'s three `hovered`
booleans go away with it. Do it in the same pass as C3.

**N3. The chat's thinking state is a literal `...` string.**
`app/chat/ChatInterface.tsx:135-137` renders `<span>...</span>` when a message has no content
yet. It never moves. Between pressing ↵ and the first streamed token there is nothing to say
the request is alive, and the send button keeps showing `↵` throughout (`:193`).
*Fix:* the `pulse` keyframe at `app/globals.css:240-243` already exists and is used nowhere —
apply it to three dots at 0 / 150 / 300ms offsets, 1.4s loop. Zero new CSS.
*Cost:* one looping animation. WCAG 2.2.2 does not apply (it stops on arrival), and the
reduced-motion block at `:262` already halts it.

### P2 — state changes that read as glitches

**N4. The view-toggle indicator teleports.** `app/commercial/CommercialClient.tsx:147-162`.
The 1px amber underline is `borderBottom` on whichever button is pressed, so it vanishes from
one and appears on the other with no travel. `README.md`'s M1 covers the *content* crossfade
but not the indicator. Same gap in the nav, `components/Navigation.tsx:140-145`, where the
active underline is rendered per-link — though there a route change is already a page fade, so
the nav is the weaker case.
*Fix:* one `layoutId` underline shared by the two buttons, or a single absolutely-positioned
bar translated on `view`. 200ms, signature ease.
*Cost:* the toggle is the only place on the site where two states sit side by side and
motion can carry the eye between them. A `layoutId` is a transform animation, so it composites.

**N5. The suggestion chips vanish mid-conversation.** `app/chat/ChatInterface.tsx:141-166`.
`!hasUserMessages` flips false the instant the first message is sent, so three chips are
removed from the flex column in the same frame the user's bubble is added — the log reflows
under a `scrollIntoView({behavior:"smooth"})` that is already running (`:39-41`).
*Fix:* wrap in `AnimatePresence`, exit `opacity: 0` over 120ms. Pair with M3 so the bubble
arrives as the chips leave.
*Cost:* `AnimatePresence` is already imported in three other files; nothing new enters the bundle.

**N6. The error appears with no transition.** `app/chat/ChatInterface.tsx:167-171`. A
`role="alert"` box materialises at full opacity. It is the only failure state in the app and
it is the one message with no arrival. 150ms fade.

**N7. Play → iframe is a hard swap.** `components/YouTubeEmbed.tsx:16-23`. Clicking replaces
the thumbnail button with the iframe immediately; the player paints black for its first
several hundred ms, so the frame goes thumbnail → black → video.
*Fix:* keep the thumbnail mounted beneath the iframe and fade it out on the iframe's `onLoad`.
*Cost:* one boolean, one extra layer for a few hundred ms.

**N8. The hero rotates on a 6s timer with nothing to say so.**
`components/HeroStage.tsx:202-227`. Six slides, `HERO_INTERVAL_MS = 6000`, and the slide marks
are static 1px bars that only change colour. The counter reads `01 / 06` but nothing conveys
that a change is coming or how soon — so an advance the user did not ask for arrives unannounced.
*Fix:* fill the active mark left-to-right over the interval — a `transform: scaleX()` on a
child of the existing 1px span, reset on `active` change, paused with `paused`.
*Cost:* one animation running continuously while the hero is on screen, which is the strongest
argument against it — it is a transform on a 16px-wide 1px-tall element, so it is cheap, but it
is *always* moving, and "stillness signals quality" is design principle 4. If that reads as too
much, the smaller version is honest instead of decorative: drop it, and accept that the pause
control (`:179`) is the only affordance. Recommend shipping it; it converts an unexplained
change into an announced one, which is the definition of motion conveying state.

**N9. A swipe barely follows the finger.** `components/Lightbox.tsx:169-176`.
`dragConstraints={{left: 0, right: 0}}` with `dragElastic={0.08}` means the image moves ~8% of
the drag distance in either direction, then snaps back and the next picture cuts in. The gesture
works — `onDragEnd` reads offset and velocity correctly — but it does not look like it is working.
*Fix:* raise `dragElastic` to ~0.2 for follow, and at a set boundary (`!hasNext` / `!hasPrev`)
drop it to ~0.05 so the end of the set feels like a wall.
*Cost:* a real drag offset means the image can sit off-centre mid-gesture. Contained: the
parent is `overflow-hidden` (`:141`).

### P3 — drift traps in the motion system

**N10. `lib/motion.ts` is 5/8 dead, and the dead part is the deleted system.**
`variants` (`:32-57`), `VIEWPORT` (`:27`), `REVEAL_MARGIN` (`:26`), `STAGGER` (`:23`) and
`hoverLift` (`:60`) have **zero** references in `app/` or `components/`. They are the
scroll-observer reveal system removed on 8 Sep 2026 — `fadeUp`, `clipReveal`, `stagger`,
plus a `VIEWPORT` whose `once: true, margin: "-8% 0px"` is precisely the observer config the
file's own header says the site no longer uses. The next agent asked to "add motion" will
import `variants.fadeUp` and `VIEWPORT`, because they are sitting there typed and ready, and
re-add exactly what was deliberately deleted.
*Fix:* delete all five. Keep `EASE`, `DUR`, `HERO_INTERVAL_MS` (10, 2 and 2 uses).
*Cost:* none. If scroll reveals are ever wanted back, they are a `git show` away — and the
header comment plus `plans/README.md` are the record of why they went.

**N11. 67 hard-coded durations against the file that forbids them.**
`lib/motion.ts:2` reads "Import these everywhere; never hard-code an ease or duration in a
component." Five files import from it; `duration-*` / `NNNms` / `duration:` literals appear 67
times across `app/` and `components/`. The curve is centralised (plan 003 made `ease-out` the
signature token) but the *timing* is not, so `200ms` hover, `300ms` hover, `500ms` hover and
`700ms` hover all coexist for the same gesture.
*Fix:* either extend `DUR` into Tailwind theme values so `duration-micro` is a class, or drop
the instruction from the header. Do not leave a rule in place that the codebase breaks 67 times.
*Cost:* the Tailwind route is the honest one and it is a `@theme` block plus a sweep. The
cheap route is deleting the comment, which loses the intent.

**N12. The lightbox spring is the only spring in the system.**
`components/Lightbox.tsx:168`: `{ type: "spring", damping: 30, stiffness: 250 }`. DESIGN.md §6
states exponential ease-out only, and `lib/motion.ts` defines no spring token. At damping 30 /
stiffness 250 it is very near critically damped, so there is no visible overshoot and nothing
looks wrong — but it is an untokenised curve, and `README.md`'s own execution log records its
consequence: closing the lightbox takes ~500ms because the exit spring settles after the 300ms
backdrop fade.
*Fix:* the log already wrote it — `exit={{ scale: 0.96, opacity: 0, transition: { duration: 0.3, ease: EASE.out } }}`,
and the same for `animate`. Backdrop and image then land together.
*Cost:* the open loses a small amount of physicality. Worth it: the close currently lags by 200ms
and the system gets back to one curve.

---

## 3. What I would ship, in order

1. **N2 + C3 together.** One sweep, converts JS hover to CSS, adds the focus twins, deletes
   three `useState` booleans. Biggest change in perceived quality per line touched, and it is
   the only item on this list that changes who the site works for.
2. **N1.** The gallery is the product and it currently goes silent on tap.
3. **N3 + M3 + N5 + N6.** The whole chat surface in one pass — thinking state, bubble arrival,
   chip exit, error fade. Four small fixes, one file.
4. **M2 + N4.** `active:scale-[0.97]` on the six controls, and the toggle indicator. Controls
   only — not text links. The site's voice is flat; press feedback belongs on things that
   behave like hardware.
5. **N10 + N11.** Housekeeping, but N10 is the one that protects everything above from being
   undone by the next pass.
6. **C1, C2, N7, N8, N9, N12.** Per-surface polish.
7. **C4–C9.** Deletions and one-liners. Free.

## 4. Deliberately not proposed

So the next pass does not have to re-litigate these:

- **Scroll-triggered reveals, anywhere.** Removed 8 Sep 2026. Content is visible at rest.
  N10 exists to stop them coming back by accident.
- **Page-load choreography.** The route fade is opacity-only at 250ms (plan 001) because it runs
  on every navigation. Staggering the home page's five acts would undo it.
- **Parallax on the hero or the featured photo.** DESIGN.md: nothing is layered over the work,
  and the hero does not drift on scroll. Both were removed on purpose.
- **Hover motion on `DisciplineRow`.** C4 removes the 6px slide rather than extending it: the
  rows are not links.
- **A shared-element transition from gallery tile to lightbox.** Tempting, and it is the textbook
  case for `layoutId`. Skipped because the masonry uses CSS `columns` (`app/globals.css:149-160`)
  — a `layoutId` measured inside a fragmented column box mismeasures, and making it reliable
  means replacing the masonry. Not a motion change at that point. N1 solves the actual
  complaint, which is silence, not the absence of a flight path.
