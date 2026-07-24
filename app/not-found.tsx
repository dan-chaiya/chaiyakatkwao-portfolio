"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="pt-32 px-8 pb-8 min-h-[80vh] flex flex-col justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-[9px] tracking-[0.35em] uppercase text-[var(--color-grey-500)] mb-5"
          >
            404
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[var(--color-warm)] mb-10"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            Nothing here /
            <br />
            yet.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <Link
              href="/"
              className="inline-block font-body text-[9px] tracking-[0.3em] uppercase text-[var(--color-grey-500)] hover:text-[var(--color-warm)] transition-colors duration-300"
            >
              ← Back to home
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
