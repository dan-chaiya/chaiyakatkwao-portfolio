"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import HeroStage from "@/components/HeroStage";
import PageTransition from "@/components/PageTransition";
import { workAssets } from "@/data/work-asset-urls";
import { photoAlt } from "@/lib/photos";

const sections = [
  {
    index: "01",
    title: "Commercial",
    href: "/commercial",
    cover: workAssets.knack("Knack-75.jpg"),
    coverAlt: photoAlt(workAssets.knack("Knack-75.jpg"), "Knack Factory fashion show"),
  },
  {
    index: "02",
    title: "Gallery",
    href: "/gallery",
    cover: workAssets.woven("1.jpg"),
    coverAlt: photoAlt(workAssets.woven("1.jpg"), "Woven Memories"),
  },
  {
    index: "03",
    title: "About",
    href: "/about",
    cover: workAssets.podcast("Dan.jpg"),
    coverAlt: photoAlt(workAssets.podcast("Dan.jpg"), "Chaiya Katkwao"),
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
                Creative Producer in Bangkok. Art direction on one side;
                lighting, cameras, sound and the studio&apos;s own software on
                the other.
              </p>
              <Link
                href="/about"
                className="tap-target text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text)]"
                style={{
                  display: "inline-block",
                  marginTop: "28px",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
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
                  {/* Still, not pulsing (2026-10-04): the pulsing "available" dot is the
                      most-copied move on portfolios, and stillness is this site's voice. */}
                  <span aria-hidden="true" style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent)",
                    display: "inline-block",
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
              {/* Hover in CSS, not onMouseEnter: a tap on a phone used to leave this
                  button inverted after the mail app opened. */}
              <a
                href="mailto:chaiyakatkwao@gmail.com"
                className="text-[var(--color-text)] transition-[background-color,color] duration-[250ms] hover:bg-[var(--color-text)] hover:text-[var(--color-text-inverse)]"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  border: "1px solid var(--color-border-strong)",
                  padding: "18px 20px",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                }}
              >
                chaiyakatkwao@gmail.com →
              </a>
              <Link
                href="/cv"
                className="border border-[var(--color-border)] text-[var(--color-text-muted)] transition-[border-color,color] duration-[250ms] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "18px 20px",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                }}
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
  // Not a link: hover only brightens the text. No movement, which would read as clickable.
  return (
    <div
      className="group"
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
      <span
        className="text-[var(--color-grey-300)] transition-colors duration-200 group-hover:text-[var(--color-text)]"
        style={{
          fontFamily: "var(--font-archivo)",
          fontSize: "0.875rem",
          fontWeight: 500,
          letterSpacing: "0.005em",
        }}
      >
        {label}
      </span>
      <span
        className="text-[var(--color-text-muted)] transition-colors duration-200 group-hover:text-[var(--color-text)]"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          letterSpacing: "0.15em",
        }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

// The featured project: the photograph at full contrast in a 16:9 frame, then its
// caption below in flow, on the page ground. The dark gradient wash that carried
// white text over the image went on 2026-09-08, the same move as the hero: nothing
// is layered over the work, so legibility never costs the photograph anything.
function FeaturedCard() {
  return (
    <Link
      href="/commercial"
      className="group"
      style={{ display: "block", color: "inherit", textDecoration: "none" }}
    >
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", backgroundColor: "var(--color-surface)" }}>
        <Image
          src={workAssets.knack("Knack-14.jpg")}
          alt={photoAlt(workAssets.knack("Knack-14.jpg"), "Knack Factory Fashion Show, 2024")}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
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
        <p className="mono-label transition-colors duration-200 group-hover:text-[var(--color-text)]! group-focus-visible:text-[var(--color-text)]!">
          Commercial Production →
        </p>
      </div>
    </Link>
  );
}

type SectionItem = { index: string; title: string; href: string; cover: string; coverAlt: string };

function TriptychCard({ section: s }: { section: SectionItem }) {
  return (
    <Link href={s.href} className="group" style={{ display: "block" }}>
      <div className="aspect-video sm:aspect-[3/4]" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={s.cover}
          alt={s.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
        />
        {/* Gradient overlay. Black and white in both themes on purpose: this text sits on
            the photograph, not on the page. A gradient cannot be transitioned into another
            gradient, so the deeper hover wash is a second layer that fades in by opacity.
            Stacked on the rest gradient it equals the old hover gradient: 0.88 at the
            bottom, 0.2 at 55%. */}
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
          <div
            aria-hidden="true"
            className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.57) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
              transition: "opacity 300ms ease",
            }}
          />
          <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <p
                className="text-[rgba(249,249,249,0.78)] transition-colors duration-300 group-hover:text-[#F9F9F9] group-focus-visible:text-[#F9F9F9]"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
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
