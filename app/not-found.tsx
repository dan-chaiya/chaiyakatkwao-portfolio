"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

export default function NotFound() {
  // A client 404 cannot export metadata, and the root title would otherwise name the
  // tab as the home page. The streamed metadata writes the root title after this mounts,
  // so hold the 404 title for as long as the page is open (2026-10-04).
  useEffect(() => {
    const TITLE = "Not found · Chaiya Katkwao";
    document.title = TITLE;
    const path = window.location.pathname;
    const keep = new MutationObserver(() => {
      // Only on this URL: a link away must get its own page's title.
      if (window.location.pathname !== path) return keep.disconnect();
      if (document.title !== TITLE) document.title = TITLE;
    });
    keep.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => keep.disconnect();
  }, []);

  return (
    <PageTransition>
      <main id="main-content" className="pt-32 px-8 pb-8 min-h-[80vh] flex flex-col justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE.out }}
            className="font-mono font-medium text-[11px] tracking-[0.35em] uppercase text-[var(--color-text-muted)] mb-5"
          >
            404
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.08, ease: EASE.out }}
            className="font-heading text-[var(--color-warm)] mb-10"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            Nothing here
            <br />
            yet.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            {/* Real ways on, not one small exit (2026-10-04). */}
            <p className="copy-body" style={{ maxWidth: "44ch" }}>
              The page may have moved. The work is still here:
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              {[
                { href: "/commercial", label: "Commercial" },
                { href: "/gallery", label: "Gallery" },
                { href: "/about", label: "About" },
                { href: "/", label: "Home" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center font-heading text-[var(--color-warm)] transition-opacity duration-200 hover:opacity-60"
                    style={{ fontWeight: 800, fontSize: "clamp(1.2rem, 2.5vw, 2rem)", letterSpacing: "-0.02em" }}
                  >
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}
