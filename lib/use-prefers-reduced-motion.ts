// lib/use-prefers-reduced-motion.ts — the OS "reduce motion" setting, safe to render on.
// framer-motion's useReducedMotion reads the media query during the browser's first
// render, while the server always renders as if motion were allowed. Under reduced
// motion the two disagree (the hero's pause button exists on one side only), React
// throws the server HTML away (error #418) and re-renders the whole document, which
// also strips <html data-theme>. useSyncExternalStore hydrates with the server's
// answer and switches to the real one straight after, and it follows the setting
// if the visitor changes it while the page is open.

import { useSyncExternalStore } from "react";

// One MediaQueryList for the page, made on first use (there is no window on the server).
let query: MediaQueryList | undefined;
const reducedMotionQuery = () => (query ??= window.matchMedia("(prefers-reduced-motion: reduce)"));

function subscribe(onChange: () => void) {
  const q = reducedMotionQuery();
  q.addEventListener("change", onChange);
  return () => q.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => reducedMotionQuery().matches, () => false);
}
