---
name: Chaiya Katkwao Portfolio
description: A dark production-floor portfolio for a Bangkok-based creative producer.
colors:
  bg: "#000000"
  surface: "#0A0A0A"
  surface-elevated: "#111111"
  surface-hover: "#161616"
  text: "#F9F9F9"
  text-muted: "#8B857F"
  text-dim: "#4A4744"
  text-inverse: "#000000"
  border: "rgba(249, 249, 249, 0.09)"
  border-strong: "rgba(249, 249, 249, 0.22)"
  warm: "#F2F0EB"
  accent: "oklch(72% 0.18 35)"
  accent-dim: "oklch(72% 0.18 35 / 0.3)"
  focus-ring: "rgba(249, 249, 249, 0.55)"
  selection-bg: "#F9F9F9"
  selection-text: "#000000"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(1.2rem, 2.5vw, 2rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Archivo, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.18em"
  label-wide:
    fontFamily: "JetBrains Mono, monospace"
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

This portfolio does not perform. It works. The visual system is built the way a production is built: structure first, then everything else earns its place. The dark shell (OKLCH hue 250, near-zero chroma) is not dramatic — it is neutral in the same way a black stage is neutral. It holds the work without comment.

The Warm Signal accent (hue 35, amber) appears where action is required. Buttons. Hover states on navigation. Text selection. It is never decorative. Its rarity is its authority — if something glows amber, the user should move there.

Motion is controlled and calibrated. The custom ease `cubic-bezier(0.16, 1, 0.3, 1)` (an exponential ease-out) governs every entrance. Elements arrive with confidence and stop cleanly. Nothing bounces. Nothing elastic. The portfolio is still until it isn't.

This system explicitly rejects: colorful or expressive-color palettes (gradients, vibrant accents, neon), generic photographer portfolio templates (centered hero, soft sans, pastel tones), and over-animated UI that competes with the work.

**Key Characteristics:**
- Single-hue dark shell (hue 250) with one warm accent (hue 35), maximum contrast distance
- Single type family (Archivo + Archivo Black), hierarchy through weight and scale only
- Flat elevation — depth via tonal surface steps, no shadows
- Motion is sparse, purposeful, and exponential-ease only
- Spacing varies by context; monotony is prohibited

## 2. Colors: The Production-Floor Palette

One warm signal in a room of true-black surfaces. The palette does not try to be beautiful — it tries to be correct.

> **Corrected 29 Aug 2026.** Every value in this section was previously described
> as OKLCH hue 250 (a cool blue-grey tint), and a "Tint Rule" asserted that
> nothing in the system was pure grey. That did not match `app/globals.css`, which
> ships pure-neutral surfaces and *warm* text greys. The values below were read
> from the shipped `@theme` block and converted to OKLCH by measurement. Two
> tokens named here before — `accent-strong` and an orange focus ring — do not
> exist in the code at all and have been removed.

### Primary
- **Warm Signal** (`oklch(72% 0.18 35)`): The only saturated color in the system, and it is used far more sparingly than a CTA palette would suggest. It appears in exactly two places in the shipped code: the 1px active underline in the navigation, and — at 30% alpha — a 1px card border on the portfolio home. Its scarcity is not a guideline, it is the current fact.
- **Warm Signal Dim** (`oklch(72% 0.18 35 / 0.3)`): The same hue at 30% alpha, for the hairline border that must not compete with text.
- **Focus Ring** (`rgba(249, 249, 249, 0.55)`): Translucent white at 55%, not an orange ring. 1px with a 3px offset. Neutral so it reads as a system affordance rather than as the brand accent.

### Neutral
- **Production Black** (`#000000`): The base background. True black, zero chroma.
- **Studio Surface** (`#0A0A0A`) and **Elevated Surface** (`#111111`): The two tonal steps above the base. Pure neutral, no tint.
- **Hover Surface** (`#161616`): The third step, for a surface responding to the pointer.
- **Primary Text** (`#F9F9F9`): Near-white, pure neutral. Measured chroma is zero.
- **Muted Text** (`#8B857F`): Navigation links at rest, captions, metadata. This one *is* warm — `oklch(0.62 0.0115 67.6)`.
- **Dim Text** (`#4A4744`): `oklch(0.40 0.0064 67.6)`. The same warmth, further down. Decorative and structural marks only.
- **Warm Paper** (`#F2F0EB`): `oklch(0.955 0.007 88.6)`. The warmest light value in the system, used for drawn outlines such as the video play control.
- **Structural Line** (`rgba(249, 249, 249, 0.09)`) and **Strong Line** (`rgba(249, 249, 249, 0.22)`): The two border values. Translucent white rather than a solid grey, so a border sits correctly on any of the three surface steps without a per-surface variant.

**The One Signal Rule.** The Warm Signal accent appears on ≤10% of any given screen surface. In the shipped code it is closer to 1%. If it starts competing for attention, it has been overused. Reduce.

**The Pure Surface, Warm Text Rule.** Replaces the old Tint Rule, which described a colour this system has never shipped. Surfaces and primary text are *pure neutral* — `#000000`, `#0A0A0A`, `#111111`, `#161616`, `#F9F9F9` all measure zero chroma. The warmth lives only in the text greys and the paper tone, at hue 62°–89° and chroma 0.006–0.012. Never introduce a cool grey: the sister site at `management-portfolio` follows the same curve inverted onto white, and a blue-grey would read as foreign in either half of the pair.

## 3. Typography

> **Rewritten 30 Aug 2026 against the code.** The previous version documented a
> six-step ramp in `rem` (`0.72rem` labels, `9px` micro, a `1.125rem` title) and a
> "Single-Family Rule" saying the system had no second typeface. Neither matched
> what ships. The real system is **two** families — Archivo for reading, JetBrains
> Mono for every label — and its ramp is expressed in `px`. 112 of the design
> detector's 130 findings were this document disagreeing with the code, not the
> code drifting from the system.

**Display Font:** Archivo Black (weight 400, single cut) — every headline and the
mobile navigation overlay.
**Body Font:** Archivo (300, 400, 500, 600, 700, 800).
**Label Font:** JetBrains Mono (400, 500) — every uppercase label, index, counter,
caption and metadata line on the site.

**Character:** Archivo Black is structural, not decorative: it is used at size, tight
(-0.02em to -0.03em), on a 0.88–0.95 line-height, so headlines read as built objects.
Archivo carries running text. JetBrains Mono carries the entire information layer —
this is the "production floor" voice, and it is the reason the site reads as a working
document rather than a brochure.

### The ramp

| Step | Family | Size | Tracking | Used for |
|---|---|---|---|---|
| Display | Archivo Black 400 | `clamp(2.5rem, 8vw, 7rem)` | -0.02em | Page titles, the hero name |
| Headline | Archivo Black 400 | `clamp(1.2rem, 2.5vw, 2rem)` | -0.02em | Section and project titles |
| Body | Archivo 300–400 | `15px` | normal | Running text, bios, case-study copy |
| Body S | Archivo 400 | `13px` | normal | Descriptions, chat messages, dense metadata |
| Label | JetBrains Mono 500 | `11px` | 0.18em | Nav, footer, tags, years, indices, captions |
| Label wide | JetBrains Mono 500 | `11px` | 0.28–0.35em | Eyebrows, section markers |

The display step is fluid rather than fixed: every headline on the site is a `clamp()`
whose endpoints vary by context (`7rem` on index pages, `6.25rem` on the hero,
`5.5rem` on the contact strip). The table records the dominant pair; a headline that
needs a different ceiling sets one, and that is intentional, not drift.

**The Two-Family Rule.** Archivo and JetBrains Mono. No third family. If something
needs to read as *information* — an index, a year, a role, a counter, a caption — it is
Mono, uppercase, tracked. If it needs to be *read*, it is Archivo. This split is the
system, and it is what `.mono-label` in `globals.css` encodes.

**The 11px Floor.** No text below 11px. The system previously ran labels at 9px and
8px; they were illegible and several failed contrast at the same time. `.mono-label`
is 11px and that is the floor for every label, in print units too — the CV's screen
rendering scales its `pt` values up under 860px for exactly this reason.

**The Scale Rule.** At least a 1.25 ratio between adjacent reading steps. Flat scales
read as indecision.

## 4. Elevation

This system is flat by default. There are no box shadows at rest. Depth is communicated through tonal surface steps (Production Dark → Studio Surface → Elevated Surface, a delta of roughly 5–9 lightness points each) and through the single structural border at `oklch(0.34 0.01 250)`.

The Lightbox uses a near-opaque dark overlay (`rgba(10, 10, 10, 0.97)`) — this is the only intentional use of semi-transparency in the system, and it serves a functional isolation role, not a decorative one.

**The Flat-By-Default Rule.** Surfaces are flat at rest. If a component needs to feel elevated, reach for the next tonal surface step — not a shadow. Shadows are not part of this system.

**The No-Glass Rule.** Backdrop-blur appears exactly once, on the lightbox caption pill (`backdrop-blur-sm` over `bg-black/40`), so a caption stays readable above an arbitrary photograph. It is a functional accommodation, not a motif. Do not apply it to any other element.

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
- **Shell:** the page background with `border-bottom: 1px solid rgba(249,249,249,0.07)`. There is no backdrop-filter and no opacity on the header.
- **Logo:** Archivo Black, 1.15rem, tracking -0.02em. Links to root.
- **Desktop links:** 0.8rem, tracking 0.18em, uppercase. Muted text at rest, Primary Text on hover, 200ms.
- **Active underline:** a 1px bar in Warm Signal. This is one of only two accent appearances in the app.
- **Mobile hamburger:** three 1px lines, inline-drawn, animating to a cross. No icon library.

### Mobile Navigation Overlay
Full-screen, full-bleed, no modal chrome. A signature component.
- **Surface:** the page background, no backdrop.
- **Links:** `clamp(2.5rem, 10vw, 5rem)`, Archivo Black, tracking -0.03em, separated by `1px solid rgba(249,249,249,0.06)`.
- **Animation:** staggered entrance, 0.07s between items, `cubic-bezier(0.16, 1, 0.3, 1)`, 0.5s.

### Lightbox (Signature Component)
The gallery viewer. Dark, focused, keyboard-native.
- **Overlay:** `rgba(10, 10, 10, 0.97)` — nearly opaque, slightly warmer than the background.
- **Controls:** SVG-drawn arrows and close, no icon library. Enabled state uses `--color-grey-200` with a `--color-grey-500` border, moving to white on `--color-grey-300` with a `bg-white/10` wash. Disabled boundary state is `#4A4844` on `#3A3735`.
- **Caption pill:** the system's only backdrop-blur — `backdrop-blur-sm` over `bg-black/40`, inside a `--color-border-strong` hairline.
- **Image:** `object-fit: contain`, swipeable (`dragElastic: 0.08`), spring transition (damping 30, stiffness 250).

### Footer
- **Structure:** `border-top: 1px solid rgba(249,249,249,0.07)`, 24px padding top and bottom, two-column flex that wraps, 16px gap.
- **Typography:** JetBrains Mono, 11px, tracking 0.18em, uppercase — the same label treatment the sister site calls `mono-label`. Muted text at rest, Primary Text on hover, 180ms.
- **Links:** 28px apart. Includes the cross-site link to `/systems`, which is a plain `<a>` rather than `next/link` because the destination is a static file in `public/`, not a route.

### Hero Controls
Bottom-right of the hero, beside the slide counter.
- **Pause/play:** 44x44, 1px border at `rgba(242,240,235,0.28)`, inline-drawn SVG glyph. Hidden entirely under `prefers-reduced-motion`, where nothing is rotating.
- **Slide marks:** one 1px bar per slide in a 44px-tall hit area; active is `--color-warm`, rest `rgba(242,240,235,0.34)`.
- **Counter:** `mono-label`, tabular numerals, `--color-warm`.

### Legibility Bands
The hero's flat `rgba(0,0,0,0.5)` scrim is not enough over a bright frame. Two gradient bands — 160px from the top, 256px from the bottom, each `rgba(0,0,0,0.5)` to transparent — darken only the zones that carry text, leaving the middle of the frame, where the work is, untouched. Same gradient language as the featured card.

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
- **Do** respect `prefers-reduced-motion` by removing *travel and looping*, not feedback. The global rule keeps colour and opacity transitions at 120ms; components drop transforms via `useReducedMotion`. Never clamp all durations to 0.01ms — that flashes infinite animations rather than stopping them.
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
- **Don't** add a third typeface. Archivo reads, JetBrains Mono labels; that split is the system. Solve anything else through weight and scale.
- **Don't** add shadows. If something needs elevation, use the next surface step.
- **Don't** make the accent compete. If more than 10% of a screen surface carries the Warm Signal, scale it back.
- **Don't** use bounce or elastic easing. Exponential ease-out only.
