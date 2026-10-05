---
name: Chaiya Katkwao Portfolio
description: A production-floor portfolio for a Bangkok creative producer, in two themes, Paper (the default) and Ink.
# Paper, the default theme. Ink is `colors-dark` below. Both live in app/globals.css, which is
# the source of truth; components read every colour as var(--color-<key>).
colors:
  bg: "#F0F0F0"
  surface: "#EAEAEA"
  surface-elevated: "#E4E4E4"
  surface-hover: "#DEDEDE"
  text: "#111111"
  warm: "#111111"
  grey-200: "#1C1C1C"
  grey-300: "#3D3A37"
  grey-400: "#57524D"
  text-muted: "#5F5A55"
  grey-500: "#67625C"
  text-dim: "#A8A29B"
  grey-600: "#BDB8B1"
  grey-700: "#D3D0CA"
  border-muted: "#D6D6D6"
  border-faint: "rgba(17, 17, 17, 0.07)"
  border: "rgba(17, 17, 17, 0.09)"
  border-strong: "rgba(17, 17, 17, 0.22)"
  text-inverse: "#F0F0F0"
  accent: "oklch(54% 0.19 35)"
  accent-dim: "oklch(54% 0.19 35 / 0.3)"
  focus-ring: "rgba(17, 17, 17, 0.55)"
colors-dark:
  bg: "#111111"
  surface: "#1C1C1C"
  surface-elevated: "#222222"
  surface-hover: "#2A2A2A"
  text: "#F0F0F0"
  warm: "#F0F0F0"
  grey-200: "#EAEAEA"
  grey-300: "#C8C4BC"
  grey-400: "#9A9087"
  text-muted: "#958F89"
  grey-500: "#8F8983"
  text-dim: "#4A4744"
  grey-600: "#3D3A37"
  grey-700: "#2A2826"
  border-muted: "#2A2A2A"
  border-faint: "rgba(240, 240, 240, 0.07)"
  border: "rgba(240, 240, 240, 0.09)"
  border-strong: "rgba(240, 240, 240, 0.22)"
  text-inverse: "#111111"
  accent: "oklch(72% 0.18 35)"
  accent-dim: "oklch(72% 0.18 35 / 0.3)"
  focus-ring: "rgba(240, 240, 240, 0.55)"
typography:
  display:
    fontFamily: "Archivo Black, Noto Sans Thai, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  display-s:
    fontFamily: "Archivo Black, Noto Sans Thai, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  feature:
    fontFamily: "Archivo Black, Noto Sans Thai, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  roll:
    fontFamily: "Archivo Black, Noto Sans Thai, sans-serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo Black, Noto Sans Thai, sans-serif"
    fontSize: "clamp(1.2rem, 2.5vw, 2rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo Black, Noto Sans Thai, sans-serif"
    fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Archivo, Noto Sans Thai, sans-serif"
    fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Archivo, Noto Sans Thai, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Archivo, Noto Sans Thai, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
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
    letterSpacing: "0.3em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  page: "32px"
  xl: "64px"
  section: "80px"
components:
  nav-link:
    textColor: "{colors.grey-300}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.text}"
  nav-link-active:
    textColor: "{colors.text}"
  nav-link-active-underline:
    backgroundColor: "{colors.accent}"
    height: "1px"
  button-primary:
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "18px 20px"
  button-primary-hover:
    backgroundColor: "{colors.text}"
    textColor: "{colors.text-inverse}"
  button-secondary:
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "18px 20px"
  button-secondary-hover:
    textColor: "{colors.text}"
  control-square:
    textColor: "{colors.grey-200}"
    rounded: "{rounded.none}"
    size: "44px"
  tag:
    textColor: "{colors.grey-400}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  input-chat:
    backgroundColor: "transparent"
    textColor: "{colors.warm}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  theme-toggle:
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    size: "14px"
---

# Design System: Chaiya Katkwao Portfolio

## 1. Overview

**Creative North Star: "The Production Floor"**

This portfolio does not perform; it works. It is built the way a production is built: structure first, and everything else earns its place. The shell is a neutral grey room in two lights, Paper by day and Ink after dark, neutral the way a cyclorama wall or a blackout drape is neutral. It holds the work without comment. PRODUCT.md puts it plainly: "The portfolio doesn't try hard; it simply is."

Everything the visitor reads as information is labelled like gear on a studio floor: a small uppercase mono tag, a number, a hairline. Everything the visitor looks at is the work itself, at full contrast, never dimmed, never cropped behind text. One warm colour, the Cue Light, appears only where something is live: the page you are on, the person who is available. Motion is calibrated rather than decorative: content is visible at rest, and the only entrances are a short page fade and the hero's cross-fade between slides.

The system rejects, by name, the three anti-references in PRODUCT.md: colourful or expressive-colour portfolios (gradients, vibrant accents, neon), generic photographer templates (centred hero, soft sans, pastel tones), and over-animated, "look at me" UI that competes with the work.

**Key Characteristics:**
- Two themes from five brutalist neutrals: Paper (`#F0F0F0`, the default) and Ink (`#111111`), each using the other as its ink.
- One accent, the Cue Light (hue 35), on about 1% of any screen.
- Two families: Archivo Black and Archivo carry what is read, JetBrains Mono labels everything else.
- Flat: depth from tonal steps and 1px hairlines, never shadows.
- Square: no radius anywhere except the two dots (theme switch, Available).
- One left edge: 32px on every page and every section.
- Motion is sparse and exponential-ease only; nothing pulses, bounces or loops for show.

## 2. Colors: The Paper & Ink Palette

Five neutrals and one cue: the palette does not try to be beautiful, it tries to be correct.

### Primary
- **Cue Light** (`oklch(54% 0.19 35)` on Paper, `oklch(72% 0.18 35)` on Ink): the amber of a cue light backstage, lit only when it is your turn. The 1px underline under the current nav link, the Commercial view toggle and the Systems link on About; the year on a hovered Commercial list row; the "Available for projects" line and its still dot on the Home contact strip (a plain mono line, no pill, since 4 October 2026). It is deeper on Paper because that line is 11px text and needs 4.5:1 there (4.87:1).
- **Cue Light, dimmed** (the same hue at 30%): the badge's hairline border, so the frame never competes with its text.

### Neutral

Values are Paper / Ink; the token name is what components read.

- **Paper / Ink ground** (#F0F0F0 / #111111): `bg`, the page ground in each theme.
- **Surface steps** (#EAEAEA, #E4E4E4, #DEDEDE / #1C1C1C, #222222, #2A2A2A): `surface`, `surface-elevated`, `surface-hover`, each a step toward the middle grey.
- **Ink** (#111111 / #F0F0F0): `text` and `warm`, primary text and heading ink.
- **Reading grey** (#1C1C1C / #EAEAEA): `grey-200`, lead and body copy.
- **Small-text grey** (#3D3A37 / #C8C4BC): `grey-300`, small copy and nav links at rest.
- **Data greys** (#57524D, #5F5A55, #67625C / #9A9087, #958F89, #8F8983): `grey-400`, `text-muted`, `grey-500`, for labels, captions, years and indices.
- **Structural marks** (#A8A29B, #BDB8B1 / #4A4744, #3D3A37): `text-dim`, `grey-600`, for disabled controls; never text.
- **Hairlines** (#D3D0CA, #D6D6D6 / #2A2826, #2A2A2A): `grey-700`, `border-muted`, for the chat field and tag frames.
- **Lines** (rgba(17, 17, 17, 0.07 / 0.09 / 0.22) on Paper, the same in #F0F0F0 on Ink): `border-faint`, `border`, `border-strong`, for header, section and button rules.
- **Focus ring** (rgba(17, 17, 17, 0.55) / rgba(240, 240, 240, 0.55)): `focus-ring`, a 1px outline at 3px offset.

Every text grey measures 4.5:1 or better on the ground, surface and elevated surface of its own theme; the lowest on the site is 4.87:1 on Paper (the Available badge) and 5.45:1 on Ink. axe found no contrast failure in either theme on 4 October 2026.

**Paper is the default.** A first visit, a browser that blocks storage and a page without JavaScript all get Paper. A visitor's pick is saved in `localStorage` under `theme` and set as `<html data-theme>` by an inline script in `<head>` before the first paint (`lib/theme.ts`), so a saved Ink never flashes Paper. **Ink is screen-only**: its block sits in `@media screen`, so a printed or saved page always comes out ink on paper. A theme change fades the colour tokens themselves over 450ms (they are registered with `@property`), so the whole page shifts as one; photographs and video are never touched.

**The One Cue Rule.** The Cue Light covers 10% of a screen at most, and in practice about 1%. If something glows amber, it is live or it is you. If it starts competing, it has been overused.

**The Pure Ground, Warm Ink Rule.** Grounds, surfaces and the primary ink are pure neutral (zero chroma) in both themes. The warmth lives only in the text greys and hairlines, at hue 62°–89° and chroma 0.006–0.012. Never introduce a cool grey; the sister site at `/systems` follows the same curve.

**The Name-a-Token Rule.** Components read every colour as `var(--color-*)`, never a hex, so both themes follow automatically. A one-off tint is `color-mix(in srgb, var(--color-text) 7%, transparent)`. The only literals are the black and white that sit on photographs (the YouTube veil and play mark), because they belong to the image, not the page. A new token must also join the `@property` list in `globals.css`, or it will cut instead of fading.

## 3. Typography

**Display Font:** Archivo Black (with Noto Sans Thai, then sans-serif)
**Body Font:** Archivo 400–800 (with Noto Sans Thai, then system-ui)
**Label/Mono Font:** JetBrains Mono 400–500 (with Noto Sans Thai, then monospace)

**Character:** Archivo Black is structural, set tight (-0.02em to -0.03em) on a 0.88–0.95 line-height, so a headline reads as a built object. It ships as one cut and every head asks for 800, so the browser synthesizes bold on top of Black: that dense faux-bold is the heading voice, and it is deliberate. JetBrains Mono carries the whole information layer, and it is why the site reads as a working document rather than a brochure.

### Hierarchy
- **Display** (Archivo Black, 800, 0.9 line-height, -0.02em): `clamp(2.5rem, 8vw, 7rem)`. Page titles (Commercial, Gallery, About, CV, 404).
- **Display S** (Archivo Black, 800, 0.9 line-height, -0.02em to -0.03em): `clamp(2.5rem, 6vw, 5.5rem)`. Case-study titles, the contact strips, the "Next" project.
- **Feature** (Archivo Black, 800, 0.9 line-height, -0.03em): `clamp(1.75rem, 4vw, 3.5rem)`. The featured project caption and the chat name.
- **Roll** (Archivo Black, 800, 1.05 line-height, -0.02em): `clamp(1.5rem, 3.5vw, 2.75rem)`. The About client and service rolls.
- **Headline** (Archivo Black, 800, 0.95 line-height, -0.02em): `clamp(1.2rem, 2.5vw, 2rem)`. Section and project titles, Commercial list rows.
- **Title** (Archivo Black, 800, 1 line-height, -0.02em): `clamp(1.25rem, 1.6vw, 1.5rem)`. The hero's one-line name, `Chaiya Katkwao.`
- **Lead** (Archivo, 400, 1.4 line-height, grey-200): `clamp(1.25rem, 1.6vw, 1.5rem)`. Bios, positioning lines, project descriptions (`.copy-lead`).
- **Body** (Archivo, 400, 17px, 1.55 line-height, grey-200): everything that is read (`.copy-body`, and `body` itself), capped at 52–75ch.
- **Small** (Archivo, 400, 14px, 1.5 line-height, grey-300): captions and list cells (`.copy-small`).
- **Label** (JetBrains Mono, 500, 11px, 0.18em, uppercase, text-muted): nav, footer, tags, years, indices, counters (`.mono-label`).
- **Label wide** (JetBrains Mono, 500, 11px, 0.28–0.35em, uppercase): eyebrows and section markers.

**Thai.** Noto Sans Thai sits second in every stack (`--font-archivo`, `--font-archivo-black`, `--font-jetbrains-mono`), so Latin always sets in Archivo and only Thai characters reach Noto. It loads only when a Thai character renders. Mark Thai passages `lang="th"`. Labels stay English.

**The Two-Family Rule.** Archivo reads, JetBrains Mono labels. If something is information (an index, a year, a role, a counter, a caption), it is mono, uppercase and tracked; if it is read, it is Archivo. No third family: Noto Sans Thai is Archivo's Thai script, never a choice for Latin.

**The 11px Floor Rule.** No text below 11px on screen, and nothing below 8.5pt in print.

**The Scale Rule.** At least 1.25 between adjacent reading steps. Flat scales read as indecision.

**The Six Heads Rule.** Every Archivo Black head uses one of the six clamps above (plus the mobile menu's own `clamp(2rem, min(10vw, 9svh), 5rem)`). A new page picks a step; it never invents a seventh size. Until 4 October 2026 there were thirteen.

## 4. Elevation

Flat. There are no box shadows anywhere. Depth comes from tonal steps that move toward the middle grey (ground → surface → elevated: `#F0F0F0 → #EAEAEA → #E4E4E4` on Paper, `#111111 → #1C1C1C → #222222` on Ink) and from 1px hairlines in the `border-*` tokens. The lightbox isolates the work with the page ground at 97%, the only intentional semi-transparency.

**The Flat-By-Default Rule.** If something needs to feel raised, use the next surface step, never a shadow.

**The One-Blur Rule.** `backdrop-blur-sm` appears once, on the lightbox's "Swipe or use arrows" pill (over the ground at 85%), so its text stays readable over any photograph. It is a functional accommodation, not a motif.

## 5. Components

Labelled like gear: flat, square, named in mono, and answering instantly. No decoration, no radius, no shadow. Every hover is a CSS `hover:` variant (Tailwind applies it only where a pointer can hover), never `onMouseEnter`, so a tap on a phone never leaves anything stuck.

### Buttons
- **Shape:** square (`0px`), 1px border, label typography (11px mono, uppercase, 0.14em).
- **Primary** (the email CTA): ink text in a `border-strong` frame, `18px 20px`. Hover inverts to ink ground and `text-inverse` text over 250ms.
- **Secondary** ("Print / Save PDF →"): `text-muted` in a `border` frame. Hover lifts the text to ink and the frame to `border-strong`.
- **One primary per decision.** The Home contact strip has one box, the email; the CV under it is a quiet text link ("Or read the CV →"), not a second box of equal weight.
- **Control square** (lightbox close, prev and next; hero pause): 44 × 44 (48 for the lightbox arrows), inline SVG glyph, no icon library. In the lightbox the glyph is `grey-200` in a `grey-500` frame; hover takes the glyph to ink, the frame to `grey-300` and adds a 10% ink wash; disabled is `text-dim` on `grey-600`. The hero's pause square is ink at 86% in an ink frame at 28%.
- **Image tiles are buttons.** Anything that opens the lightbox is a real `<button class="gallery-tile">` (UA chrome stripped). Never a `div` with an `onClick`: that kept the gallery from the keyboard until 29 August and the case studies until 4 October 2026.

### Chips
- **Tags:** mono label in `grey-400`, 1px `border-muted` frame, `4px 8px`, square. Information, not actions: they do not respond to the pointer.
- **Chat suggestions:** 11px mono at 0.08em in `grey-300`, 1px `border-muted` frame, `8px 14px`; hover takes the text to ink and the frame to `grey-500`. One row that swipes sideways on phones.

### Cards / Containers
- There are no cards. Work sits directly on the ground; sections are separated by `border` hairlines and 80px of vertical space.
- The home triptych is three image links in a 1px-gap grid, each photograph clean and its title under it in flow (Title step, "Gallery →"), never over it. No index numbers: the order means nothing.
- Under the Home bio, the **Selected clients** roll (`data/clients.ts`, shared with About) is the producer proof an agency scans for; it replaced a list of disciplines that repeated About and the CV.
- Production scale comes from `data/live-studio.ts` (counted from the Live Studio OS sheet; aggregates only, never names, phones or prices): a sentence under the Home bio, the Team / Studio / Gear / System credits on the /commercial Live Commerce section, and the live slides' captions. Never as a row of big numbers with small labels: that is the banned hero-metric template.
- The Home client roll is one run of names in the Lead step, not ruled rows.
- A case study's meta column leads with **Client**, then Role, Year, Discipline; it ends on the next project's title beside its cover.

### Inputs / Fields
- **Chat field:** transparent, 16px Archivo in ink, inside a 1px `grey-700` frame, square. 16px is a floor: iOS zooms into anything smaller.
- **Focus:** the frame carries the ring (`:focus-within`, 1px `focus-ring`, 2px offset), because the input suppresses its own outline.
- **Placeholder:** `text-muted` at full opacity (5.67:1), never the browser's half-strength default.

### Navigation
- **Header:** `sticky top-0`, opaque on the page ground, 1px `border-faint` below, 58px tall (72px under 1024px). The CK mark at left (Archivo Black 800 at 1.15rem, its own size, not a ramp step) is the only way home (accessible name "Chaiya Katkwao, home").
- **Links:** 0.8rem mono (the nav's own label size, one step above the 11px label), uppercase, 0.18em, `grey-300` at rest, ink on hover (180ms). The current page carries `aria-current="page"` and a 1px Cue Light underline.
- **Small links get 44px to the finger** through `.tap-target`, an invisible centred box; the label keeps its own size.
- **Mobile menu:** a full-screen overlay on the page ground with no modal chrome. Links are Archivo Black 800 at `clamp(2rem, min(10vw, 9svh), 5rem)`, uppercase, separated by `border-faint` hairlines, staggered in at 0.05s over 0.3s. The overlay scrolls itself and centres with auto margins, so a phone turned sideways still reaches every link. Escape closes; Tab loops through the links and the close button.

### Theme Switch (Signature Component)
One 14px dot in a 1.5px ink ring, half ink and half clear. The ink half sits left on Paper and turns right on Ink (420ms, the signature curve); it grows 18% on hover. 44px to the finger, no words, no accent. Its side is decided in CSS from `<html data-theme>`, so it is right from the first frame; its label names the action ("Switch to dark theme").

### Hero Stage (Signature Component)
Three rows inside `100svh` minus the header: the name line with "Creative Producer, Bangkok" beside it, the stage, and the caption row with the controls. The strongest editorial work comes first: Knack Factory as a three-frame set (portrait frames side by side on screens 640px and wider, the first frame alone on phones), then Fitflop, Modal Creative Studio and Nestlé, the art series last. The caption names the client and role of the slide on screen ("Knack Factory · Photographer, 2024"). A live-commerce sale stream led for one deploy on 4 October 2026 and read as retail operations rather than "stylish"; it stays in the rotation, not at the front. The KOL Casting Lookbook was taken off the site on 5 October 2026: it did not hold up beside the rest of the work. Each slide is the original work, `object-contain` on the page ground, at full contrast: no scrim, no gradient, no blur. Slides cross-fade over 1200ms, 300ms when the visitor picks one, a hard cut under reduced motion. Controls: a 44px pause square (WCAG 2.2.2) and one 16px bar per slide inside a 24 × 44 button (WCAG 2.5.8), active in ink and the rest at 34%; on phones a `01 / 05` counter replaces the bars.

### Lightbox (Signature Component)
The gallery viewer, keyboard-native and in the page's theme. The photo is `next/image` at `sizes="100vw"`, `object-fit: contain`, capped at `100dvh` minus the chrome, swipeable, with a spring arrival (damping 30, stiffness 250); the photos either side are fetched ahead so a step shows at once. Never a plain `<img>` of the original: opening Knack Factory and stepping three times once fetched 29.6 MB, and now fetches under 1 MB. The counter is `aria-live` and reads the photo's description. Focus moves in on open, is trapped inside, and returns to the tile on close.

### Footer
A 1px `border-faint` rule, 24px above and below, inside `.section-shell` (full width, 32px sides). Mono labels in `text-muted`, ink on hover, links 28px apart. `/systems` is a plain `<a>` because it is a static file, not a route.

### Photos
Every photo has a size and a description. `photoSize(src)` and `photoAlt(src)` in `lib/photos.ts` read `data/image-sizes.json` (written by `node scripts/image-sizes.mjs`; re-run after adding a photo) and `data/alt-text.json`. The size goes to `next/image` as `width`/`height`, so the page reserves the box and never jumps; never `width={0} height={0}`. The alt says what is in the frame, like a museum caption: no SEO tag, no photographer's name.

## 6. Do's and Don'ts

### Do:
- **Do** keep the Cue Light at 10% of a screen at most; about 1% is normal.
- **Do** name a token, never a colour: `var(--color-*)`, and `color-mix()` for a tint.
- **Do** keep every text colour at 4.5:1 or better; `text-dim` and `grey-600` are structural marks, not text.
- **Do** set every small uppercase label in JetBrains Mono (`.mono-label`, or `font-mono font-medium text-[11px]`).
- **Do** keep one left edge: 32px on every page and every section (`px-8`, `.section-shell`).
- **Do** use tonal surface steps for depth, never shadows.
- **Do** use the signature curve `cubic-bezier(0.16, 1, 0.3, 1)` (`var(--ease-out)`) for motion; the page fade is 250ms, hovers 180–250ms.
- **Do** respect `prefers-reduced-motion` by removing travel and looping, not feedback: colour and opacity transitions stay at 120ms. Branch on `usePrefersReducedMotion()`, never framer-motion's `useReducedMotion()`, which breaks hydration.
- **Do** give anything that moves for more than five seconds a stop control (WCAG 2.2.2).
- **Do** give every target at least 24 × 24, and small text links 44px through `.tap-target`.
- **Do** cap reading lines at 65–75ch.
- **Do** keep the scrollbar thin but holdable (8px in Safari, `scrollbar-width: thin` elsewhere) with a text-grey thumb.

### Don't:
- **Don't** build a colourful or expressive-colour portfolio: no gradients, no vibrant accents beyond the single Cue Light, no neon.
- **Don't** build a generic photographer portfolio template: no centred hero, no soft sans, no pastel tones.
- **Don't** build over-animated, "look at me" UI that competes with the work. If an animation is about the UI, it has failed.
- **Don't** layer anything over the work in the hero or the featured project: no scrim, no gradient band, no text on the photograph.
- **Don't** use `border-left` or `border-right` greater than 1px as a coloured stripe.
- **Don't** use gradient text (`background-clip: text`).
- **Don't** add glassmorphism; the one backdrop-blur is the lightbox pill and it is at its limit.
- **Don't** add shadows, radii (beyond the two dots) or a third typeface.
- **Don't** pulse anything: the Available dot is still, and there is no grain overlay.
- **Don't** let the chat pass for Chaiya. It answers in his voice, and says on screen and in its first line that it is an AI assistant built from his CV, with email as the route for anything that matters.
- **Don't** spread the slash headline (`Chaiya / Katkwao.`): it is a signature on one page, the CV name. The Home contact strip says "Send the brief." since 4 October 2026.
- **Don't** use em dashes in copy: commas, colons, parentheses, and en dashes for ranges (`2022–Present`). Quoted titles keep their own punctuation.
- **Don't** use bounce or elastic easing.
- **Don't** hover with `onMouseEnter`; use CSS `hover:`.
- **Don't** zoom images on hover. Zooming crops the work; a tile answers with a wash or a colour change instead.
- **Don't** number things whose order means nothing (tiles, client rolls, service lists).
