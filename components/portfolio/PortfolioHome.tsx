"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";
import HeroStage from "@/components/HeroStage";
import { workAssets } from "@/data/work-asset-urls";

const sections = [
  {
    index: "01",
    title: "Commercial",
    href: "/commercial",
    cover: workAssets.knack("Knack-75.jpg"),
    coverAlt: "Knack Factory fashion show - Creative Producer",
  },
  {
    index: "02",
    title: "Gallery",
    href: "/gallery",
    cover: workAssets.woven("1.jpg"),
    coverAlt: "Woven Memories - Creative Producer",
  },
  {
    index: "03",
    title: "About",
    href: "/about",
    cover: workAssets.podcast("Dan.jpg"),
    coverAlt: "Chaiya Katkwao Portrait - Creative Producer",
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
        <HeroStage />

        {/* ── ACT II: FEATURED PROJECT ───────────────────────────── */}
        <section
          aria-label="Featured project"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <Link href="/commercial" style={{ display: "block", position: "relative" }}>
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", backgroundColor: "var(--color-surface)" }}>
                <Image
                  src={workAssets.knack("Knack-14.jpg")}
                  alt="Knack Factory Fashion Show 2024 — Creative Producer Portfolio"
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
                  <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(249,249,249,0.62)" }}>
                    Selected Work
                  </p>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 400,
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
                    <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(249,249,249,0.62)" }}>
                      Commercial Production
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
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "1px" }}>
            {sections.map((s, i) => (
              <motion.div
                key={s.index}
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: i * 0.1 }}
                style={{ backgroundColor: "var(--color-surface)", overflow: "hidden" }}
              >
                <TriptychCard section={s} />
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
              viewport={{ once: true, amount: 0 }}
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
                  fontSize: "11px",
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
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            >
              <FadeLabel>Disciplines</FadeLabel>
              <div style={{ marginTop: "20px" }}>
                {disciplines.map((d, i) => (
                  <DisciplineRow key={d} label={d} index={i} total={disciplines.length} reduced={!!reduced} />
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
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FadeLabel>Contact</FadeLabel>
                <motion.span
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                    border: "1px solid var(--color-accent-dim)",
                    padding: "3px 9px",
                  }}
                >
                  <span style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent)",
                    display: "inline-block",
                    animation: reduced ? "none" : "pulse 2s ease-in-out infinite",
                  }} />
                  Available
                </motion.span>
              </div>
              <motion.h2
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  color: "var(--color-text)",
                  marginTop: "20px",
                }}
              >
                Let&apos;s /
                <br />
                connect.
              </motion.h2>
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
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
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function DisciplineRow({ label, index: i, total, reduced }: { label: string; index: number; total: number; reduced: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.18 + i * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: "1px solid var(--color-border)",
        ...(i === total - 1 ? { borderBottom: "1px solid var(--color-border)" } : {}),
        padding: "13px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "default",
        transition: "none",
      }}
    >
      <span style={{
        fontFamily: "var(--font-jakarta)",
        fontSize: "0.8rem",
        fontWeight: 500,
        color: hovered ? "var(--color-text)" : "var(--color-grey-300)",
        letterSpacing: "0.005em",
        transform: hovered ? "translateX(6px)" : "translateX(0px)",
        transition: "color 200ms ease, transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "11px",
        color: hovered ? "var(--color-text)" : "var(--color-text-muted)",
        letterSpacing: "0.15em",
        transition: "color 200ms ease",
      }}>
        {String(i + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

type SectionItem = { index: string; title: string; href: string; cover: string; coverAlt: string };

function TriptychCard({ section: s }: { section: SectionItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={s.href}
      style={{ display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-video sm:aspect-[3/4]" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={s.cover}
          alt={s.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
          style={{
            transition: "transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Gradient overlay — deepens on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
            transition: "background 500ms ease",
            display: "flex",
            alignItems: "flex-end",
            padding: "24px",
            pointerEvents: "none",
          }}
        >
          <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <p style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: hovered ? "rgba(249,249,249,0.9)" : "rgba(249,249,249,0.5)",
                marginBottom: "6px",
                transition: "color 300ms ease",
              }}>
                {s.index}
              </p>
              <p style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
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
      </div>
    </Link>
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
        fontSize: "11px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--color-text-muted)",
      }}
    >
      {children}
    </motion.p>
  );
}
