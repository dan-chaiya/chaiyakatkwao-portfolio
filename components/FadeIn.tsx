"use client";

import { motion, useReducedMotion } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export default function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: reduced ? 0.15 : 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: reduced ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
