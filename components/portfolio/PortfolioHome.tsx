"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";
import HeroStage from "@/components/HeroStage";
import PageTransition from "@/components/PageTransition";
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

export default function PortfolioHome() {
  const reduced = useReducedMotion();

  return (
    <PageTransition>
      <main id="main-content">
        {/* ── ACT I: HERO ────────────────────────────────────────── */}
        <HeroStage />

        {/* ── ACT II: FEATURED PROJECT ───────────────────────────── */}
        <section
          aria-label="Featured project"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <FeaturedCard />
        </section>

        {/* ── ACT III: IMAGE TRIPTYCH ─────────────────────────────── */}
        <section
          aria-label="Work preview"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "1px" }}>
            {sections.map((s) => (
              <div
                key={s.index}
                style={{ backgroundColor: "var(--color-surface)", overflow: "hidden" }}
              >
                <TriptychCard section={s} />
              </div>
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
            <div className="md:col-span-7">
              <Label>About</Label>
              <p className="copy-lead" style={{ maxWidth: "52ch", marginTop: "20px" }}>
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
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Label>Disciplines</Label>
              <div style={{ marginTop: "20px" }}>
                {disciplines.map((d, i) => (
                  <DisciplineRow key={d} label={d} index={i} total={disciplines.length} />
                ))}
              </div>
            </div>
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
                <Label>Contact</Label>
                <span
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
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
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
              </h2>
            </div>

            <div
              className="md:col-span-4 md:col-start-9"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <a
                href="mailto:chaiyakatkwao@gmail.com"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
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
                  fontSize: "11px",
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

function DisciplineRow({ label, index: i, total }: { label: string; index: number; total: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
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
        fontFamily: "var(--font-archivo)",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: hovered ? "var(--color-text)" : "var(--color-grey-300)",
        letterSpacing: "0.005em",
        transform: hovered ? "translateX(6px)" : "translateX(0px)",
        transition: "color 200ms ease, transform 250ms var(--ease-out)",
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
    </div>
  );
}

// The featured project: the photograph at full contrast in a 16:9 frame, then its
// caption below in flow, on black. The dark gradient wash that carried white text
// over the image went on 2026-09-08, the same move as the hero: nothing is layered
// over the work, so legibility never costs the photograph anything.
function FeaturedCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/commercial"
      style={{ display: "block", color: "inherit", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", backgroundColor: "var(--color-surface)" }}>
        <Image
          src={workAssets.knack("Knack-14.jpg")}
          alt="Knack Factory Fashion Show 2024 — Creative Producer Portfolio"
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            transition: "transform 1000ms var(--ease-out)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
        style={{ padding: "24px 32px 32px" }}
      >
        <div>
          <p className="mono-label">Selected Work</p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "var(--color-text)",
              marginTop: "14px",
            }}
          >
            Knack Factory
            <br />
            Fashion Show, 2024
          </h2>
        </div>
        <p
          className="mono-label"
          style={{ transition: "color 200ms ease", color: hovered ? "var(--color-text)" : undefined }}
        >
          Commercial Production →
        </p>
      </div>
    </Link>
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
            transition: "transform 800ms var(--ease-out)",
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
                fontSize: "11px",
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
      </div>
    </Link>
  );
}

function Label({ children }: { children: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "11px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--color-text-muted)",
      }}
    >
      {children}
    </p>
  );
}
