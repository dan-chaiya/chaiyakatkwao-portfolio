// lib/motion.ts — canonical motion tokens for Chaiya Katkwao Portfolio v2.
// Import these everywhere; never hard-code an ease or duration in a component.
// Values match the shipping FadeIn.tsx / CreativeProducerHero.tsx signature curve.

import type { Variants, Transition } from "framer-motion";

/** THE signature curve — exponential ease-out. No bounce, no elastic, ever. */
export const EASE = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

/** Durations in seconds. */
export const DUR = {
  micro: 0.2,  // hover, focus, button
  base: 0.6,   // labels, small text
  enter: 0.9,  // section entrances (matches FadeIn)
  media: 1.2,  // full-bleed image / video reveals
};

export const STAGGER = { tight: 0.06, base: 0.09, loose: 0.14 };

/** Trigger reveals just before the element is fully in view. */
export const REVEAL_MARGIN = "-8% 0px";
export const VIEWPORT = { once: true, margin: REVEAL_MARGIN } as const;

export const HERO_INTERVAL_MS = 6000;

/** Reusable variant presets. Reduced-motion callers should skip the transform axis. */
export const variants = {
  fadeUp: (y = 24): Variants => ({
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: DUR.enter, ease: EASE.out } },
  }),
  slideLeft: (x = 80): Variants => ({
    hidden: { opacity: 0, x: -x },
    show: { opacity: 1, x: 0, transition: { duration: DUR.enter, ease: EASE.out } },
  }),
  slideRight: (x = 80): Variants => ({
    hidden: { opacity: 0, x },
    show: { opacity: 1, x: 0, transition: { duration: DUR.enter, ease: EASE.out } },
  }),
  scaleUp: (): Variants => ({
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: DUR.media, ease: EASE.out } },
  }),
  clipReveal: (): Variants => ({
    hidden: { opacity: 0, clipPath: "inset(12% 0 0 0)" },
    show: { opacity: 1, clipPath: "inset(0 0 0 0)", transition: { duration: DUR.media, ease: EASE.out } },
  }),
  stagger: (amount: number = STAGGER.base): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: amount } },
  }),
};

/** Standard hover lift for interactive tiles/cards. */
export const hoverLift: Transition = { duration: DUR.micro, ease: EASE.out };
