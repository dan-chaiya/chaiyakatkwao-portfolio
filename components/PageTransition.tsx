"use client";

import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

// The one entrance that runs on every navigation. Opacity only: no travel, so it
// stays on the compositor and never fights hydration for the main thread. There is
// no AnimatePresence around the route, so an exit animation would never run.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DUR.route, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );
}
