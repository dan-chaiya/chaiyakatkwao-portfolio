"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";
import CreativeProducerHero from "@/components/portfolio/CreativeProducerHero";
import { workAssets } from "@/data/work-asset-urls";

const sections = [
  {
    index: "01",
    title: "Commercial",
    href: "/commercial",
    cover: workAssets.knack("Knack-75.jpg"),
    coverAlt: "Knack Factory fashion show",
  },
  {
    index: "02",
    title: "Gallery",
    href: "/gallery",
    cover: workAssets.woven("3.jpg"),
    coverAlt: "Woven Memories",
  },
  {
    index: "03",
    title: "About",
    href: "/about",
    cover: workAssets.podcast("Dan.jpg"),
    coverAlt: "Portrait",
  },
];

const disciplines = [
  "Art Direction",
  "Creative Direction",
  "Photography",
  "Video Editing & Color Grading",
  "Styling",
  "Multi-camera Production",
  "Lighting Design",
  "Live Commerce Production",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PortfolioHome() {
  const reduced = useReducedMotion();

  return (
    <>
      <main id="main-content">
        {/* ── ACT I: HERO ────────────────────────────────────────── */}
        <CreativeProducerHero />

        {/* ── ACT II: FEATURED PROJECT ───────────────────────────── */}
        <section
          aria-label="Featured project"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <Link href="/commercial" style={{ display: "block", position: "relative" }}>
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", backgroundColor: "var(--color-surface)" }}>
                <Image
                  src={workAssets.knack("Knack-14.jpg")}
                  alt="Knack Factory Fashion Show 2024 — commercial production"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  style={{
                    transition: "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: "scale(1.0)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.0)"; }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "clamp(20px, 4vw, 48px)",
                    pointerEvents: "none",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,249,249,0.32)" }}>
                    Selected Work — 01
                  </p>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-jakarta)",
                        fontWeight: 800,
                        fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
                        letterSpacing: "-0.03em",
                        lineHeight: 0.9,
                        color: "#F9F9F9",
                        marginBottom: "14px",
                      }}
                    >
                      Knack Factory
                      <br />
                      Fashion Show, 2024
                    </h2>
                    <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(249,249,249,0.4)" }}>
                      Commercial Production — View Work →
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>

        {/* ── ACT III: IMAGE TRIPTYCH ─────────────────────────────── */}
        <section
          aria-label="Work preview"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
            }}
          >
            {sections.map((s, i) => (
              <motion.div
                key={s.index}
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 1.2, ease: EASE, delay: i * 0.1 }}
                style={{ backgroundColor: "var(--color-surface)", overflow: "hidden" }}
              >
                <Link href={s.href} className="group" style={{ display: "block" }}>
                  <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                    <Image
                      src={s.cover}
                      alt={s.coverAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center"
                      style={{
                        transition: "transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: "scale(1)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                    {/* Gallery label overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "24px",
                        pointerEvents: "none",
                      }}
                    >
                      <div>
                        <p style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: "9px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(249,249,249,0.5)",
                          marginBottom: "6px",
                        }}>
                          {s.index}
                        </p>
                        <p style={{
                          fontFamily: "var(--font-jakarta)",
                          fontWeight: 800,
                          fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                          letterSpacing: "-0.02em",
                          color: "#F9F9F9",
                          lineHeight: 1,
                        }}>
                          {s.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── ACT IV: BIO + DISCIPLINES ───────────────────────────── */}
        <section
          aria-label="About Chaiya"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div
            className="section-shell grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6"
            style={{ paddingTop: "80px", paddingBottom: "80px" }}
          >
            <motion.div
              className="md:col-span-7"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <FadeLabel>About</FadeLabel>
              <p
                style={{
                  fontFamily: "var(--font-jakarta)",
                  fontWeight: 300,
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  lineHeight: 1.7,
                  color: "var(--color-grey-300)",
                  maxWidth: "52ch",
                  marginTop: "20px",
                }}
              >
                Bangkok-based Creative Producer working at the intersection of
                art direction and technical execution.
              </p>
              <Link
                href="/about"
                style={{
                  display: "inline-block",
                  marginTop: "28px",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text-muted)"; }}
              >
                Full Profile →
              </Link>
            </motion.div>

            <motion.div
              className="md:col-span-4 md:col-start-9"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            >
              <FadeLabel>Disciplines</FadeLabel>
              <div style={{ marginTop: "20px" }}>
                {disciplines.map((d, i) => (
                  <motion.div
                    key={d}
                    initial={reduced ? false : { opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.18 + i * 0.07 }}
                    style={{
                      borderTop: "1px solid var(--color-border)",
                      ...(i === disciplines.length - 1 ? { borderBottom: "1px solid var(--color-border)" } : {}),
                      padding: "13px 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", fontWeight: 500, color: "var(--color-grey-300)", letterSpacing: "0.005em" }}>
                      {d}
                    </span>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", color: "var(--color-text-dim)", letterSpacing: "0.15em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── ACT V: CONTACT STRIP ────────────────────────────────── */}
        <section
          id="contact"
          aria-label="Contact"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div
            className="section-shell grid grid-cols-1 md:grid-cols-12 items-end gap-10 md:gap-6"
            style={{ paddingTop: "80px", paddingBottom: "80px" }}
          >
            <div className="md:col-span-7">
              <FadeLabel>Contact</FadeLabel>
              <motion.h2
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
                style={{
                  fontFamily: "var(--font-jakarta)",
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  color: "var(--color-text)",
                  marginTop: "20px",
                }}
              >
                Available for /
                <br />
                new work.
              </motion.h2>
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="md:col-span-4 md:col-start-9"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <a
                href="mailto:chaiyakatkwao@gmail.com"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border-strong)",
                  padding: "18px 20px",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                  transition: "background 250ms ease, color 250ms ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-text)"; e.currentTarget.style.color = "var(--color-text-inverse)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-text)"; }}
              >
                chaiyakatkwao@gmail.com →
              </a>
              <Link
                href="/cv"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border)",
                  padding: "18px 20px",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                  transition: "border-color 250ms ease, color 250ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border-strong)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text-muted)"; }}
              >
                View CV →
              </Link>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "4px" }}>
                <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-dim)" }}>Bangkok, TH</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-dim)" }}>Open globally</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function FadeLabel({ children }: { children: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.p
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "9px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "var(--color-text-muted)",
      }}
    >
      {children}
    </motion.p>
  );
}
