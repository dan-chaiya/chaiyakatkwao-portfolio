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
    fontSize: "clamp(2.5rem, 10vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2.5rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.16em"
  micro:
    fontFamily: "Archivo, sans-serif"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.25em"
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

**Display Font:** Archivo Black (weight 400 only, single-cut)
**Body Font:** Archivo (weights 300, 400, 500; normal and italic)

**Character:** One family, two cuts. Archivo Black handles all display moments — its weight is structurally load-bearing, not decorative. Archivo's light and medium weights do everything else. The system has no serif, no script, no fallback personality.

### Hierarchy
- **Display** (Archivo Black 400, `clamp(2.5rem, 10vw, 4.5rem)`, line-height 0.92, tracking -0.02em): Hero headlines and the mobile navigation overlay. Compressed line-height because the letters are large enough to be architectural — they don't need air, they need structure.
- **Headline** (Archivo 300, `clamp(1.5rem, 4vw, 2.5rem)`, line-height 1.1, tracking -0.01em): Section titles, project names. Light weight in large size creates the contrast needed without adding visual mass.
- **Title** (Archivo 500, `1.125rem`, line-height 1.3): Subtitles, project categories, secondary section labels.
- **Body** (Archivo 400, `1rem`, line-height 1.6): Running text. Line length capped at 65–75ch. Italic weight available for emphasis; avoid bold in body copy.
- **Label** (Archivo 500, `0.72rem`, tracking 0.16em, uppercase): Navigation links, button text, category chips. The uppercase + wide tracking reads at small sizes without losing legibility.
- **Micro** (Archivo 400, `9px`, tracking 0.25–0.30em, uppercase): Series labels, index counters, footer credits. These read as information infrastructure — they identify, they do not express.

**The Single-Family Rule.** No additional typefaces. If the brief calls for a second personality, solve it through weight contrast and size, not a second family. Archivo has enough range.

**The Scale Rule.** At least a 1.25 ratio between adjacent hierarchy steps. Flat scales read as indecision.

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

### Components that do not exist
No button component, no input, no card, and no chip. This is a portfolio, not an
application; its interactive surface is links, the lightbox, and the mobile menu.
Do not add a button style to this file speculatively — document one when one ships.

## 6. Do's and Don'ts

### Do:
- **Do** use the Warm Signal accent on ≤10% of any screen surface. Its rarity is its authority.
- **Do** vary spacing by context. Section padding, component padding, and inline spacing should all be different.
- **Do** use tonal surface steps (bg → surface → surface-elevated) to express depth. Never shadows.
- **Do** use exponential ease `cubic-bezier(0.16, 1, 0.3, 1)` for all motion. Never bounce, never elastic.
- **Do** respect `prefers-reduced-motion`. FadeIn already implements this — keep it.
- **Do** keep nav links, labels, and captions uppercase with wide tracking (0.15–0.30em). It is part of the system's identity.
- **Do** tint every neutral toward hue 250. A pure grey alongside a hue-tinted grey will look like a mistake.
- **Do** cap body line length at 65–75ch on reading contexts.

### Don't:
- **Don't** use colorful or expressive-color palettes — no gradients, no vibrant accents beyond the single Warm Signal, no neon.
- **Don't** build a generic photographer portfolio layout: no centered hero with soft sans, no pastel tones, no decorative white space as a personality.
- **Don't** over-animate. If the animation is about the UI, it has failed. Motion serves the content, not the other way around.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe on any component. Never intentional. Rewrite with full borders or background tints.
- **Don't** use gradient text (`background-clip: text`). Prohibited. Use Warm Signal solid if emphasis is needed.
- **Don't** apply glassmorphism decoratively. The one backdrop-blur on the nav header is functional and already at its limit. Do not extend it.
- **Don't** use a second typeface. Archivo has enough range. Solve hierarchy through weight and scale.
- **Don't** add shadows. If something needs elevation, use the next surface step.
- **Don't** make the accent compete. If more than 10% of a screen surface carries the Warm Signal, scale it back.
- **Don't** use bounce or elastic easing. Exponential ease-out only.
