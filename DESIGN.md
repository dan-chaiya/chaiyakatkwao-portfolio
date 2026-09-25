---
name: Chaiya Katkwao Portfolio
description: A production-floor portfolio for a Bangkok-based creative producer, in two themes — Light (the default) and Dark.
# The Light theme, the default. Dark is `colors-dark` below; both live in app/globals.css.
colors:
  bg: "#F0F0F0"
  surface: "#EAEAEA"
  surface-elevated: "#E4E4E4"
  surface-hover: "#DEDEDE"
  text: "#111111"
  text-muted: "#5F5A55"
  text-dim: "#A8A29B"
  text-inverse: "#F0F0F0"
  border-faint: "rgba(17, 17, 17, 0.07)"
  border: "rgba(17, 17, 17, 0.09)"
  border-strong: "rgba(17, 17, 17, 0.22)"
  warm: "#111111"
  accent: "oklch(54% 0.19 35)"
  accent-dim: "oklch(54% 0.19 35 / 0.3)"
  focus-ring: "rgba(17, 17, 17, 0.55)"
  selection-bg: "#111111"
  selection-text: "#F0F0F0"
colors-dark:
  bg: "#111111"
  surface: "#1C1C1C"
  surface-elevated: "#222222"
  surface-hover: "#2A2A2A"
  text: "#F0F0F0"
  text-muted: "#958F89"
  text-dim: "#4A4744"
  text-inverse: "#111111"
  border-faint: "rgba(240, 240, 240, 0.07)"
  border: "rgba(240, 240, 240, 0.09)"
  border-strong: "rgba(240, 240, 240, 0.22)"
  warm: "#F0F0F0"
  accent: "oklch(72% 0.18 35)"
  accent-dim: "oklch(72% 0.18 35 / 0.3)"
  focus-ring: "rgba(240, 240, 240, 0.55)"
  selection-bg: "#F0F0F0"
  selection-text: "#111111"
typography:
  display:
    fontFamily: "Archivo Black, Noto Sans Thai, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo Black, Noto Sans Thai, sans-serif"
    fontSize: "clamp(1.2rem, 2.5vw, 2rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Archivo, Noto Sans Thai, sans-serif"
    fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, Noto Sans Thai, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Archivo, Noto Sans Thai, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, Noto Sans Thai, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.18em"
  label-wide:
    fontFamily: "JetBrains Mono, Noto Sans Thai, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.30em"
rounded:
  none: "0px"
  sm: "4px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  nav-link:
    textColor: "{colors.text-muted}"
    typography: "label"
  nav-link-hover:
    textColor: "{colors.text}"
    typography: "label"
  nav-link-active-underline:
    backgroundColor: "{colors.accent}"
    height: "1px"
  card-accent-border:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
---

# Design System: Chaiya Katkwao Portfolio

## 1. Overview

**Creative North Star: "The Production Floor"**

This portfolio does not perform. It works. The visual system is built the way a production is built: structure first, then everything else earns its place. The shell is neutral grey in two themes — paper in Light, the default since 23 September 2026, and near-black in Dark — neutral in the same way a black stage or a white wall is neutral. It holds the work without comment.

The Warm Signal accent (hue 35, amber) appears where action is required. Buttons. Hover states on navigation. Text selection. It is never decorative. Its rarity is its authority — if something glows amber, the user should move there.

Motion is controlled and calibrated. Content is visible at rest: since 8 September 2026 nothing on a page waits for a scroll observer, and the only entrances are the page fade on a route change and the hero's cross-fade between slides. The custom ease `cubic-bezier(0.16, 1, 0.3, 1)` (an exponential ease-out) governs those and every hover. Nothing bounces. Nothing elastic.

This system explicitly rejects: colorful or expressive-color palettes (gradients, vibrant accents, neon), generic photographer portfolio templates (centered hero, soft sans, pastel tones), and over-animated UI that competes with the work.

**Key Characteristics:**
- Two themes, Light (default) and Dark, built from five brutalist neutrals, with one warm accent (hue 35)
- Single type family (Archivo + Archivo Black), hierarchy through weight and scale only
- Flat elevation — depth via tonal surface steps, no shadows
- Motion is sparse, purposeful, and exponential-ease only
- Spacing varies by context; monotony is prohibited

## 2. Colors: The Production-Floor Palette

Two themes built from five brutalist neutrals — `#F0F0F0` and `#EAEAEA` paper, `#111111`, `#1C1C1C` and `#222222` ink — and one warm signal. Each theme uses the other's values as its ink. The palette does not try to be beautiful — it tries to be correct.

> **Two themes, 23 Sep 2026.** Until then the site was dark only, on true black
> `#000000`. Light is now the default. Dark moved from `#000000` onto `#111111`, and
> its two lightest text greys were raised to keep 4.5:1 on the lighter surfaces.
> Values below are Light / Dark.

> **Corrected 29 Aug 2026.** Every value in this section was previously described
> as OKLCH hue 250 (a cool blue-grey tint), and a "Tint Rule" asserted that
> nothing in the system was pure grey. That did not match `app/globals.css`, which
> ships pure-neutral surfaces and *warm* text greys. The values below were read
> from the shipped `@theme` block and converted to OKLCH by measurement. Two
> tokens named here before — `accent-strong` and an orange focus ring — do not
> exist in the code at all and have been removed.

### Primary
- **Warm Signal** (`oklch(54% 0.19 35)` / `oklch(72% 0.18 35)`): The only saturated color in the system, used sparingly: the 1px active underlines (navigation, the Commercial view toggle, the Systems link on About), the year on a hovered Commercial list row, and the "Available" badge on the home contact strip. It is deeper in Light because the badge is 11px text and needs 4.5:1 on paper (4.87:1); the `/systems` value, `oklch(58% 0.19 35)`, measures only 4.13:1 on `#F0F0F0`.
- **Warm Signal Dim** (the same hue at 30% alpha): for the hairline border that must not compete with text.
- **Focus Ring** (the text colour at 55%): 1px with a 3px offset. Neutral so it reads as a system affordance rather than as the brand accent.

### Neutral

| Role | Light | Dark |
|---|---|---|
| Ground (`bg`) | `#F0F0F0` | `#111111` |
| Surface, elevated, hover | `#EAEAEA`, `#E4E4E4`, `#DEDEDE` | `#1C1C1C`, `#222222`, `#2A2A2A` |
| Primary text and heading ink (`text`, `warm`) | `#111111` | `#F0F0F0` |
| Reading text (`grey-200`) | `#1C1C1C` | `#EAEAEA` |
| Small text (`grey-300`) | `#3D3A37` | `#C8C4BC` |
| Data and captions (`grey-400`, `text-muted`, `grey-500`) | `#57524D`, `#5F5A55`, `#67625C` | `#9A9087`, `#958F89`, `#8F8983` |
| Hairlines (`grey-700`, `border-muted`) | `#D3D0CA`, `#D6D6D6` | `#2A2826`, `#2A2A2A` |
| Lines (`border-faint`, `border`, `border-strong`) | ink at 7%, 9% and 22% | ink at 7%, 9% and 22% |

`#E4E4E4`, `#DEDEDE` and `#2A2A2A` are derived steps; every other ground and ink value is one of the five neutrals. Every text grey measures 4.5:1 or better on the ground, surface and elevated surface of its own theme. Measured across every page on 23 September 2026, the lowest text contrast is 4.87:1 in Light (the Available badge) and 5.45:1 in Dark.

### The two themes
- **Light is the default.** A first visit, a browser that blocks storage and a page without JavaScript all get Light, whatever the OS setting. A visitor's pick is saved in `localStorage` under `theme` and set as `<html data-theme>` by an inline script in `<head>` before the first paint (`lib/theme.ts`), so a saved Dark never flashes Light.
- **Dark is screen-only.** The Dark block sits in `@media screen`, so a page printed or saved as PDF comes out in Light, and the CV's print sheet stays ink on white with white page margins.
- **Name a token, never a colour.** Components read every colour through `var(--color-*)`. A one-off tint of a token is `color-mix(in srgb, var(--color-text) 7%, transparent)`, never an `rgba()` of a hex. The only literals left sit on photographs — the triptych captions and gradients, the YouTube veil and play mark — and they stay black and white in both themes because they belong to the image, not the page.

**The One Signal Rule.** The Warm Signal accent appears on ≤10% of any given screen surface. In the shipped code it is closer to 1%. If it starts competing for attention, it has been overused. Reduce.

**The Pure Surface, Warm Text Rule.** Replaces the old Tint Rule, which described a colour this system has never shipped. Surfaces and primary text are *pure neutral* in both themes — every ground, surface and ink value in the table above measures zero chroma. The warmth lives only in the text greys and hairlines, at hue 62°–89° and chroma 0.006–0.012. Never introduce a cool grey: the sister site at `management-portfolio` follows the same curve inverted onto white, and a blue-grey would read as foreign in either half of the pair.

## 3. Typography

> **Rewritten 30 Aug 2026 against the code.** The previous version documented a
> six-step ramp in `rem` (`0.72rem` labels, `9px` micro, a `1.125rem` title) and a
> "Single-Family Rule" saying the system had no second typeface. Neither matched
> what ships. The real system is **two** families — Archivo for reading, JetBrains
> Mono for every label — and its ramp is expressed in `px`. 112 of the design
> detector's 130 findings were this document disagreeing with the code, not the
> code drifting from the system.

**Display Font:** Archivo Black, a single cut, always set at `font-weight: 800`. The face
has no 800, so the browser synthesizes bold on top of Black; that dense faux-bold is the
heading voice, and it is deliberate. `h1, h2, .font-heading { font-weight: 800 }` in
`globals.css` owns it, and heads styled inline set the same. Every headline, the CK mark,
the hero name line and the mobile navigation overlay.
**Body Font:** Archivo (400, 500, 600, 700, 800). Weight 300 was retired on 8 September 2026: it read as whispering under the display heads.
**Label Font:** JetBrains Mono (400, 500) — every uppercase label, index, counter,
caption and metadata line on the site.
**Thai:** Noto Sans Thai (variable 100–900), added 25 September 2026. It is Archivo's
companion script, not a third voice: it sits second in every stack (`--font-archivo`,
`--font-archivo-black`, `--font-jetbrains-mono` in `globals.css`), so Latin always sets
in Archivo and only Thai characters reach Noto. It was chosen over LINE Seed Sans TH,
Kanit, Prompt, Anuphan and IBM Plex Sans Thai because it matches the 800 heading weight
and stays neutral; Kanit reads as generic Thai advertising and LINE Seed as LINE's brand.
A Thai headline sets in a real Noto 800 beside the synthesized Archivo Black. Labels stay
English: Thai in the mono layer is a fallback, not a style. The file loads only when a
Thai character is on the page (`preload: false`). Mark Thai passages `lang="th"`.

**Character:** Archivo Black is structural, not decorative: it is used at size, tight
(-0.02em to -0.03em), on a 0.88–0.95 line-height, so headlines read as built objects.
Archivo carries running text. JetBrains Mono carries the entire information layer —
this is the "production floor" voice, and it is the reason the site reads as a working
document rather than a brochure.

### The ramp

| Step | Family | Size | Tracking | Used for |
|---|---|---|---|---|
| Display | Archivo Black 800 (synthesized) | `clamp(2.5rem, 8vw, 7rem)` | -0.02em | Page titles, the featured and contact titles |
| Headline | Archivo Black 800 (synthesized) | `clamp(1.2rem, 2.5vw, 2rem)` | -0.02em | Section and project titles |
| Name line | Archivo Black 800 (synthesized) | `clamp(1.25rem, 1.6vw, 1.5rem)` | -0.02em | The hero's `Chaiya Katkwao.`, one line |
| Lead | Archivo 400 | `clamp(1.25rem, 1.6vw, 1.5rem)` / 1.4 | normal | Bios, positioning lines, project descriptions (`.copy-lead`) |
| Body | Archivo 400 | `17px` / 1.55 | normal | Everything that is read: briefs, section descriptions (`.copy-body`) |
| Small | Archivo 400 | `14px` / 1.5 | normal | Captions, list cells, roles and years in prose (`.copy-small`) |
| Label | JetBrains Mono 500 | `11px` | 0.18em | Nav, footer, tags, years, indices, captions |
| Label wide | JetBrains Mono 500 | `11px` | 0.28–0.35em | Eyebrows, section markers |

Reading text is grey-200 (Lead, Body) or grey-300 (Small); grey 400 and 500 are for
data and captions only. The three reading steps are the `.copy-lead`, `.copy-body` and
`.copy-small` classes in `globals.css`, and `body` itself is set to the Body step.

The display step is fluid rather than fixed: every headline on the site is a `clamp()`
whose endpoints vary by context (`7rem` on index pages, `5.5rem` on the contact strip,
`3.5rem` on the featured card). The table records the dominant pair; a headline that
needs a different ceiling sets one, and that is intentional, not drift.

**The Two-Family Rule.** Archivo and JetBrains Mono. No third family; Noto Sans Thai
is Archivo's Thai script, not a family choice, and never sets Latin. If something
needs to read as *information* — an index, a year, a role, a counter, a caption — it is
Mono, uppercase, tracked. If it needs to be *read*, it is Archivo. This split is the
system, and it is what `.mono-label` in `globals.css` encodes.

**The 11px Floor.** No text below 11px. The system previously ran labels at 9px and
8px; they were illegible and several failed contrast at the same time. `.mono-label`
is 11px and that is the floor for every label, in print units too: the CV prints at
8.5pt labels and nothing smaller. On screen the CV is set in the site's reading steps
like every other page (since 8 September 2026; before that it was an A4 facsimile at
print sizes), and only `@media print` compacts it onto one sheet.

**The Scale Rule.** At least a 1.25 ratio between adjacent reading steps. Flat scales
read as indecision.

## 4. Elevation

This system is flat by default. There are no box shadows at rest. Depth is communicated through tonal surface steps (ground → surface → elevated surface, `#F0F0F0 → #EAEAEA → #E4E4E4` in Light and `#111111 → #1C1C1C → #222222` in Dark: in both themes each step moves toward the middle grey) and through the hairline borders.

The Lightbox uses a near-opaque overlay (the page ground at 97%) — this is the only intentional use of semi-transparency in the system, and it serves a functional isolation role, not a decorative one.

**The Flat-By-Default Rule.** Surfaces are flat at rest. If a component needs to feel elevated, reach for the next tonal surface step — not a shadow. Shadows are not part of this system.

**The No-Glass Rule.** Backdrop-blur appears exactly once, on the lightbox caption pill (`backdrop-blur-sm` over the page ground at 85%), so a caption stays readable above an arbitrary photograph. It is a functional accommodation, not a motif. Do not apply it to any other element.

*Corrected 29 Aug 2026: this rule previously located the blur on the navigation header. The header has no backdrop-filter and no translucent background — it is `sticky top-0` over the page background with a 1px bottom border.*

## 5. Components

> **Rewritten 29 Aug 2026 against the code.** The previous version of this section
> documented a "Primary CTA Button" with a Warm Signal background and a fully
> rounded shape. No such component exists: `borderRadius` and `rounded-full` appear
> nowhere in `Navigation.tsx`, and the accent is used in exactly two places in the
> whole app. Type scales, paddings and border values below were read from the
> components rather than carried over.

### Navigation Header
`sticky top-0`, full width, z-50. Not fixed, not translucent, and not blurred.
- **Shell:** the page ground, opaque, with a 1px `--color-border-faint` bottom border. There is no backdrop-filter and no opacity on the header. (Until 23 September 2026 the code set no background at all, so the page scrolled through under the mark and the links.)
- **Theme switch:** the header's last item on every breakpoint (beside the hamburger on mobile), after Contact on desktop. Two mono labels, `Light` and `Dark`, 11px, tracking 0.18em, in one `--color-border-strong` hairline box; the theme in use is a solid block of ink with paper text, the other is `--color-grey-400`. 30px tall to the eye, 44px to the finger. No accent: amber stays the active page's underline. Which option is solid is decided in CSS from `<html data-theme>`, so it is right from the first frame; the buttons carry `aria-pressed` in a group labelled "Theme". Switching is a hard cut: transitions are suspended for the frame of the swap so nothing ripples.
- **Logo:** Archivo Black 800, 1.15rem, tracking -0.02em. Links to root.
- **Desktop links:** 0.8rem, tracking 0.18em, uppercase. Muted text at rest, Primary Text on hover, 200ms.
- **Active underline:** a 1px bar in Warm Signal. This is one of only two accent appearances in the app.
- **Mobile hamburger:** three 1px lines, inline-drawn, animating to a cross. No icon library.

### Mobile Navigation Overlay
Full-screen, full-bleed, no modal chrome. A signature component.
- **Surface:** the page background, no backdrop.
- **Links:** `clamp(2.5rem, 10vw, 5rem)`, Archivo Black 800, tracking -0.03em, separated by 1px `--color-border-faint` lines.
- **Animation:** staggered entrance, 0.07s between items, `cubic-bezier(0.16, 1, 0.3, 1)`, 0.5s.

### Lightbox (Signature Component)
The gallery viewer. Focused, keyboard-native, and in the page's theme: paper in Light, near-black in Dark.
- **Overlay:** the page ground at 97% — nearly opaque.
- **Controls:** SVG-drawn arrows and close, no icon library. Enabled state uses `--color-grey-200` with a `--color-grey-500` border, moving to `--color-text` on `--color-grey-300` with a wash of the text colour at 10%. Disabled boundary state is `--color-text-dim` on `--color-grey-600`.
- **Caption pill:** the system's only backdrop-blur — `backdrop-blur-sm` over the page ground at 85% (40% until 23 September 2026, when its text failed on dark photos in Light), inside a `--color-border-strong` hairline.
- **Image:** `object-fit: contain`, swipeable (`dragElastic: 0.08`), spring transition (damping 30, stiffness 250).

### Footer
- **Structure:** a 1px `--color-border-faint` top border, 24px padding top and bottom, two-column flex that wraps, 16px gap.
- **Typography:** JetBrains Mono, 11px, tracking 0.18em, uppercase — the same label treatment the sister site calls `mono-label`. Muted text at rest, Primary Text on hover, 180ms.
- **Links:** 28px apart. Includes the cross-site link to `/systems`, which is a plain `<a>` rather than `next/link` because the destination is a static file in `public/`, not a route.

### Hero Controls
Bottom-right of the hero, beside the slide counter.
- **Pause/play:** 44x44, 1px border of `--color-warm` at 28%, glyph at 86%, inline-drawn SVG. Hidden entirely under `prefers-reduced-motion`, where nothing is rotating.
- **Slide marks:** one 1px bar per slide in a 44px-tall hit area; active is `--color-warm`, rest `--color-warm` at 34%.
- **Counter:** `mono-label`, tabular numerals, `--color-warm`.

### Hero Stage
Three rows inside the fold (`100svh` minus the header): the header line, the stage, and the disciplines row with the controls. The header line is the name, `Chaiya Katkwao.`, as one small line of Archivo Black (`clamp(1.25rem, 1.6vw, 1.5rem)`) with the positioning label beside it; since 8 September 2026 the name no longer takes a display step in the hero, and the height it held went to the stage, which takes everything the two text rows do not. The stage shows each slide `object-contain` on the page ground (paper in Light, `#111111` in Dark) at full contrast: no scrim, no gradient bands, no blurred fill. All three were removed on 8 September 2026, together with the 96px backdrop derivatives and their build script. Nothing is layered over the work; the text rows are in flow, so legibility never costs the photograph anything. Slides cross-fade in 1200ms, a hard cut under reduced motion, and the hero does not fade or drift as the page scrolls.

### Featured Project
The photograph in a 16:9 frame at full contrast, then its caption below in flow, on the page ground: the `Selected Work` label, the title at `clamp(1.75rem, 4vw, 3.5rem)`, and the category label right. The dark gradient wash that carried white text over the image was removed on 8 September 2026, the same move as the hero: nothing is layered over the work. Hover scales the image 1.04 over 1000ms.

### Components that do not exist
No card and no chip. This is a portfolio, not an application; its interactive surface
is links, image tiles, the lightbox, the mobile menu, and the hero controls. There is
one input (the chat field) and no general button style — buttons here are either a
44px bordered square (lightbox, hero) or an unstyled tile wrapper (`.gallery-tile`).
Do not add a button style to this file speculatively — document one when one ships.

**Image tiles are buttons.** Anything that opens the lightbox is a real `<button>`
carrying `.gallery-tile`, which strips the UA chrome. It must never go back to a
`div` with an `onClick`: that made all 38 gallery images unreachable by keyboard
until 29 Aug 2026.

## 6. Do's and Don'ts

### Do:
- **Do** use the Warm Signal accent on ≤10% of any screen surface. Its rarity is its authority.
- **Do** vary spacing by context. Section padding, component padding, and inline spacing should all be different.
- **Do** use tonal surface steps (bg → surface → surface-elevated) to express depth. Never shadows.
- **Do** use exponential ease `cubic-bezier(0.16, 1, 0.3, 1)` for all motion. Never bounce, never elastic.
- **Do** respect `prefers-reduced-motion` by removing *travel and looping*, not feedback. The global rule keeps colour and opacity transitions at 120ms; components branch on `usePrefersReducedMotion()` (`lib/use-prefers-reduced-motion.ts`), never framer-motion's `useReducedMotion()`, which renders differently on the server and made React throw away the home page's HTML under reduced motion until 23 September 2026. Never clamp all durations to 0.01ms — that flashes infinite animations rather than stopping them.
- **Do** keep every text colour at 4.5:1 or better. `text-dim` is for structural marks only and is not a text colour.
- **Do** give anything that moves for more than five seconds a stop control (WCAG 2.2.2). The hero carousel has one.
- **Do** keep nav links, labels, and captions uppercase with wide tracking (0.15–0.30em). It is part of the system's identity.
- **Do** keep surfaces pure neutral and let the warmth live in the text greys (hue 62-89, chroma 0.006-0.012). Never introduce a cool grey.
- **Do** cap body line length at 65–75ch on reading contexts.

### Don't:
- **Don't** use colorful or expressive-color palettes — no gradients, no vibrant accents beyond the single Warm Signal, no neon.
- **Don't** build a generic photographer portfolio layout: no centered hero with soft sans, no pastel tones, no decorative white space as a personality.
- **Don't** over-animate. If the animation is about the UI, it has failed. Motion serves the content, not the other way around.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe on any component. Never intentional. Rewrite with full borders or background tints.
- **Don't** use gradient text (`background-clip: text`). Prohibited. Use Warm Signal solid if emphasis is needed.
- **Don't** apply glassmorphism decoratively. The one backdrop-blur is on the lightbox caption pill, is functional, and is already at its limit. Do not extend it.
- **Don't** add a third typeface. Archivo reads, JetBrains Mono labels; that split is the system. Solve anything else through weight and scale. Noto Sans Thai is the one exception, and it is a script, not a typeface choice: never use it to set Latin.
- **Don't** add shadows. If something needs elevation, use the next surface step.
- **Don't** make the accent compete. If more than 10% of a screen surface carries the Warm Signal, scale it back.
- **Don't** use bounce or elastic easing. Exponential ease-out only.
