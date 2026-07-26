# Portfolio UI Implementation Guide

## 1) Component Architecture Map

- `app/layout.tsx`
  - Global shell, fonts, persistent `Navigation`.
- `app/page.tsx`
  - Home route entry, renders `PortfolioHome`.
- `components/Navigation.tsx`
  - Sticky navbar, skip-link, desktop/mobile navigation, primary CTA.
- `components/portfolio/PortfolioHome.tsx`
  - Section composition and interactive logic:
    - Hero
    - About
    - Selected Projects with category chips
    - Skills/Services
    - Testimonials
    - Contact form
  - Reusable local section wrapper (`Section`) for structure consistency.
- `components/Footer.tsx`
  - Footer nav and contact shortcut.
- `app/globals.css`
  - Design tokens, global focus behavior, section shell utilities, reduced-motion behavior.

## 2) Token Map Used in Code

Defined in `app/globals.css`:

- Color
  - `--color-bg`: page background
  - `--color-surface`: section/card surface
  - `--color-surface-elevated`: elevated chip/tag surface
  - `--color-text`: primary text
  - `--color-text-muted`: secondary/meta text
  - `--color-border`: border and separators
  - `--color-accent`: primary CTA/focus accent
  - `--color-accent-strong`: hover/pressed accent
  - `--color-focus-ring`: visible keyboard focus ring
  - `--color-selection-bg`, `--color-selection-text`: text selection colors
- Typography
  - `--font-heading`: display/headings
  - `--font-body`: body and UI text
- Layout helpers
  - `.section-shell`: max-width and horizontal rhythm container
  - `.text-balance`: heading wrap quality

## 3) QA Script

Run:

```bash
bash ./portfolio-qa.sh
```

What it validates:
- Type/lint baseline (`npm run lint`) output snapshot
- Production build (`npm run build`)
- Presence of core section IDs (Navbar anchor targets)
- Focus-visible rule exists in CSS
- Reduced-motion media query exists in CSS

Manual QA checklist is printed at the end of script output.
