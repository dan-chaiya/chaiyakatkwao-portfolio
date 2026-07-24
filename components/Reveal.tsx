"use client";

// components/Reveal.tsx — standardizes every scroll entrance in the portfolio.
// Wrap any block; pick a variant. Parallax uses scroll scrub; the rest use whileInView.
// prefers-reduced-motion collapses to a plain 0.15s opacity fade (no transform).
//
// Usage:
//   <Reveal variant="fade-up"><h2>…</h2></Reveal>
//   <Reveal variant="parallax" distance={60}><MotionMedia id="knack-14" /></Reveal>
//   <Reveal variant="stagger">{items.map(… <Reveal.Item/> )}</Reveal>

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";
import { EASE, DUR, STAGGER, VIEWPORT } from "@/lib/motion";

type Variant =
  | "fade-up" | "slide-left" | "slide-right"
  | "scale-up" | "clip-reveal" | "parallax";

type Props = {
  variant?: Variant;
  delay?: number;
  distance?: number;          // px for fade-up/slide/parallax
  className?: string;
  as?: keyof typeof motion;   // motion.div (default), motion.section, …
  children: React.ReactNode;
};

export default function Reveal({
  variant = "fade-up",
  delay = 0,
  distance = 24,
  className,
  as = "div",
  children,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const M = (motion[as] ?? motion.div) as typeof motion.div;

  // ── Parallax: scrub y with scroll ─────────────────────────────
  if (variant === "parallax") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const d = reduced ? 0 : distance || 60;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y = useTransform(scrollYProgress, [0, 1], [d, -d]);
    return (
      <M ref={ref} className={className} style={{ y }}>
        {children}
      </M>
    );
  }

  // ── Reduced motion: opacity only ──────────────────────────────
  if (reduced) {
    return (
      <M
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.15, delay }}
      >
        {children}
      </M>
    );
  }

  // ── Standard entrances ────────────────────────────────────────
  const map: Record<Exclude<Variant, "parallax">, { hidden: TargetAndTransition; dur: number }> = {
    "fade-up":     { hidden: { opacity: 0, y: distance },        dur: DUR.enter },
    "slide-left":  { hidden: { opacity: 0, x: -(distance * 3) }, dur: DUR.enter },
    "slide-right": { hidden: { opacity: 0, x: distance * 3 },    dur: DUR.enter },
    "scale-up":    { hidden: { opacity: 0, scale: 0.94 },        dur: DUR.media },
    "clip-reveal": { hidden: { opacity: 0, clipPath: "inset(12% 0 0 0)" }, dur: DUR.media },
  };
  const cfg = map[variant];

  return (
    <M
      ref={ref}
      className={className}
      initial={cfg.hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, clipPath: "inset(0 0 0 0)" }}
      viewport={VIEWPORT}
      transition={{ duration: cfg.dur, ease: EASE.out, delay }}
    >
      {children}
    </M>
  );
}

/** Child for staggered lists — wrap a parent in a stagger container yourself:
 *  <motion.div variants={variants.stagger()} initial="hidden" whileInView="show" viewport={VIEWPORT}>
 *    {items.map(i => <Reveal.Item key={i}>…</Reveal.Item>)}
 *  </motion.div>
 */
Reveal.Item = function Item({ className, children }: { className?: string; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.15 : DUR.enter, ease: EASE.out } },
      }}
    >
      {children}
    </motion.div>
  );
};

export { STAGGER };
