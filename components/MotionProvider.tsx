"use client";

import { MotionConfig } from "framer-motion";

// Framer Motion animates through inline styles, so the prefers-reduced-motion block
// in globals.css never reaches it. reducedMotion="user" makes every motion.* element
// in the tree drop transform and layout animation when the OS asks for less motion,
// while opacity and colour still animate. HeroStage and PortfolioHome branch on the
// setting in their own logic through usePrefersReducedMotion() (lib/), not framer's
// useReducedMotion(), which renders differently on the server and breaks hydration.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
