---
name: Chaiya Katkwao Portfolio
description: A dark production-floor portfolio for a Bangkok-based creative producer.
colors:
  bg: "oklch(0.18 0.01 250)"
  surface: "oklch(0.23 0.012 250)"
  surface-elevated: "oklch(0.27 0.014 250)"
  text: "oklch(0.95 0.01 250)"
  text-muted: "oklch(0.72 0.01 250)"
  border: "oklch(0.34 0.01 250)"
  accent: "oklch(0.72 0.16 35)"
  accent-strong: "oklch(0.66 0.19 35)"
  focus-ring: "oklch(0.78 0.16 35)"
  selection-text: "oklch(0.20 0.01 250)"
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
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.selection-text}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.selection-text}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  nav-link:
    textColor: "{colors.text-muted}"
    typography: "label"
  nav-link-hover:
    textColor: "{colors.text}"
    typography: "label"
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

One warm signal in a room of cool, dark surfaces. The palette does not try to be beautiful — it tries to be correct.

### Primary
- **Warm Signal** (`oklch(0.72 0.16 35)`): The only saturated color in the system. Used on primary CTA buttons, text-selection backgrounds, and nav hover states. Appears on less than 10% of any given screen. Its scarcity is its power.
- **Warm Signal Strong** (`oklch(0.66 0.19 35)`): The pressed/hover state of the accent — slightly deeper and more saturated. Used only as a response to interaction, never at rest.
- **Focus Ring** (`oklch(0.78 0.16 35)`): Lighter than the accent for keyboard focus rings. Ensures WCAG AA contrast on dark surfaces.

### Neutral
- **Production Dark** (`oklch(0.18 0.01 250)`): The base background. Not black — it holds a blue-grey tint that reads as intentional, not default.
- **Studio Surface** (`oklch(0.23 0.012 250)`): Raised surfaces, cards, and panels. Five lightness points above the base — visible without being loud.
- **Elevated Surface** (`oklch(0.27 0.014 250)`): The highest tonal step. Used for components that need to sit clearly above the studio surface.
- **Structural Line** (`oklch(0.34 0.01 250)`): The sole border color in the system. Header bottom, footer top, mobile menu dividers. Not decorative — it marks where structure begins and ends.
- **Primary Text** (`oklch(0.95 0.01 250)`): Near-white with a blue tint that matches the shell. Not `#fff` — the tint keeps it in the same family.
- **Muted Text** (`oklch(0.72 0.01 250)`): Navigation links at rest, captions, metadata. Active states shift to Primary Text.
- **Selection Text** (`oklch(0.20 0.01 250)`): Text rendered on top of the Warm Signal selection background. Near-black with the same blue cast.

**The One Signal Rule.** The Warm Signal accent appears on ≤10% of any given screen surface. If it feels like it's competing for attention, it's been overused. Reduce.

**The Tint Rule.** Every neutral — background, surface, text — carries OKLCH hue 250 at chroma 0.01–0.014. Nothing in this system is pure grey. The tint is subtle enough to be invisible in isolation and visible the moment something untinted appears beside it.

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

**The No-Glass Rule.** Backdrop-blur appears once: the fixed navigation header (`backdrop-blur-md` over `bg/86%`). This is a functional accommodation for readability over scrolling content. It is not a design motif. Do not apply backdrop-blur to any other element.

## 5. Components

### Navigation Header
Confident and structural. Fixed to the top, 1px structural border below.
- **Shell:** `oklch(0.18 0.01 250)` at 86% opacity, `backdrop-filter: blur(12px)`. The blur is purely functional.
- **Logo:** Archivo Black, 0.875rem, tracking 0.15em, uppercase. Links to root. Never decorated.
- **Desktop links:** Label scale (0.72rem, tracking 0.16em, uppercase). Muted text at rest; Primary Text on hover. Transition: 200ms ease.
- **CTA button:** Warm Signal background, rounded-full (9999px), 8px 16px padding, selection-text color. On hover: Warm Signal Strong. Transition: 200ms ease.
- **Mobile hamburger:** Three 1px lines, 20px wide, animated to ✕ on open. No box, no icon library — inline drawn.

### Mobile Navigation Overlay
A signature component. Full-screen, full-bleed, no modal chrome.
- **Surface:** Production Dark background (`oklch(0.18 0.01 250)`), no backdrop.
- **Links:** Display scale — `clamp(2.5rem, 10vw, 4.5rem)`, Archivo Black, uppercase, line-height 0.92. Each link separated by a Structural Line border-bottom.
- **Hover:** Muted text to Warm Signal — the only full-screen use of the accent.
- **Animation:** Staggered entrance, 0.07s delay between items, exponential ease `cubic-bezier(0.16, 1, 0.3, 1)`, 0.5s duration.

### Primary CTA Button
- **Shape:** Fully rounded (border-radius: 9999px). The only rounded element in the system — everything else is square or edge.
- **At rest:** Warm Signal background, selection-text color, Label typography.
- **Hover:** Warm Signal Strong. Transition: 200ms ease.
- **Focus:** 2px Warm Signal focus ring, 2px offset.

### Lightbox (Signature Component)
The gallery viewer. Dark, focused, keyboard-native.
- **Overlay:** `rgba(10, 10, 10, 0.97)` — nearly opaque, slightly warmer than the system background. Full-screen.
- **Controls:** SVG-drawn arrows and close icon, no icon library. Default state: `oklch(0.55 0.005 35)` (warm mid-grey). Hover: `oklch(0.94 0.005 35)` (near-white warm). Disabled/boundary: near-invisible dark.
- **Image:** Constrained to viewport with `object-fit: contain`. Swipeable via drag (dragElastic: 0.08). Spring animation on image transition (damping 30, stiffness 250).
- **Labels:** Micro scale — 9px, tracking 0.25–0.30em, uppercase. Series name left, index counter right.
- **Caption:** 10px, tracking 0.08em. Information only.

### Footer
- **Structure:** Single border-top at Structural Line color. Padding 32px vertical.
- **Content:** Two-column flex row — copyright left, nav links right.
- **Typography:** Micro scale (0.7rem, tracking 0.16em, uppercase). Muted text at rest; Primary Text on hover.

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
