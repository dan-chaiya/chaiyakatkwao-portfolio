"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import HeroStage from "@/components/HeroStage";
import PageTransition from "@/components/PageTransition";
import { workAssets } from "@/data/work-asset-urls";
import { photoAlt } from "@/lib/photos";
import { clients } from "@/data/clients";
import { liveStudio as L } from "@/data/live-studio";

const sections = [
  {
    title: "Commercial",
    href: "/commercial",
    // Not Knack-75: that frame now opens the hero, two screens up.
    cover: "/images/bakao/01.jpg",
    coverAlt: photoAlt("/images/bakao/01.jpg", "BAKAO"),
  },
  {
    title: "Gallery",
    href: "/gallery",
    cover: workAssets.woven("1.jpg"),
    coverAlt: photoAlt(workAssets.woven("1.jpg"), "Woven Memories"),
  },
  {
    title: "About",
    href: "/about",
    cover: workAssets.podcast("Dan.jpg"),
    coverAlt: photoAlt(workAssets.podcast("Dan.jpg"), "Chaiya Katkwao"),
  },
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
                key={s.href}
                style={{ backgroundColor: "var(--color-bg)", overflow: "hidden" }}
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
                Live production lead in Bangkok. I run the technical side of a
                live commerce studio and art-direct what it puts out.
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

              {/* Production proof with a scale, from the studio's own records
                  (data/live-studio.ts). A sentence, not a row of big numbers: the
                  stat-tile block is a banned template (2026-10-04). */}
              <p className="copy-body" style={{ marginTop: "40px", maxWidth: "52ch", color: "var(--color-grey-300)" }}>
                At Ad The Top that means {L.rooms} live rooms on {L.floors} floors, a live
                department of {L.department}, {L.gear} pieces of gear tracked in software I
                built, and {L.faultsResolved} of {L.faultsLogged} logged faults resolved
                between {L.faultWindow.replace("–", " and ")}.
              </p>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              {/* The client roll, not a list of disciplines: the brands are the proof an
                  agency is looking for, and the disciplines already sit in the hero, on
                  About and on the CV (2026-10-04). Unnumbered: the order means nothing. */}
              <Label>Selected clients</Label>
              {/* One run of names, not eleven ruled rows: the rows repeated the hairline
                  list every page uses, and left the bio column empty beside them. */}
              <p className="copy-lead" style={{ marginTop: "20px" }}>
                {clients.join(", ")}.
              </p>
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
              {/* No "Available for projects" status (2026-10-28): it spoke only to
                  freelance clients, and an employer reads it as a side business. The
                  strip now speaks to both, and says nothing the current employer
                  would read as a notice. */}
              <Label>Contact</Label>
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
                Let&apos;s
                <br />
                talk.
              </h2>
              <p className="copy-body" style={{ maxWidth: "44ch", marginTop: "24px" }}>
                Live production, shoots and studio builds. Write to the address
                here and the reply comes from me, not an inbox.
              </p>
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
              {/* One primary action. The CV is a quiet text link under it, not a second
                  box of equal weight (2026-10-04). */}
              <Link
                href="/cv"
                className="tap-target self-center text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text)]"
                style={{
                  marginTop: "14px",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Or read the CV →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}


// The featured project: the live studio, since 2026-10-28. It is the current job and
// the work with a scale, so it is what an employer should meet first (it used to be
// Knack Factory, which still opens the hero). Three stills from the live rooms side by
// side in the 16:9 frame: each is 9:16, so three across lose almost nothing to the
// crop. The caption sits below in flow, on the page ground; nothing is layered over
// the work.
const FEATURED_LIVE = [
  { src: "/images/live-posters/nestle.jpg", alt: "Nestlé Health Science live commerce stream" },
  { src: "/images/live-posters/fitflop-may.jpg", alt: "Fitflop live commerce stream" },
  { src: "/images/live-posters/guess.jpg", alt: "Guess live commerce stream" },
];

function FeaturedCard() {
  return (
    <Link
      href="/commercial#live-commerce"
      className="group"
      style={{ display: "block", color: "inherit", textDecoration: "none" }}
    >
      <div
        className="grid grid-cols-3"
        style={{ aspectRatio: "16/9", gap: "1px", backgroundColor: "var(--color-border)" }}
      >
        {FEATURED_LIVE.map((f) => (
          <div key={f.src} style={{ position: "relative", overflow: "hidden", backgroundColor: "var(--color-surface)" }}>
            <Image src={f.src} alt={f.alt} fill sizes="34vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
        style={{ padding: "24px 32px 32px" }}
      >
        <div>
          <p className="mono-label">Current Work</p>
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
            Live Commerce,
            <br />
            {L.rooms} rooms, 2026
          </h2>
        </div>
        <p className="mono-label transition-colors duration-200 group-hover:text-[var(--color-text)]! group-focus-visible:text-[var(--color-text)]!">
          See the studio →
        </p>
      </div>
    </Link>
  );
}

type SectionItem = { title: string; href: string; cover: string; coverAlt: string };

function TriptychCard({ section: s }: { section: SectionItem }) {
  // The title sits under the photograph, in flow, like every other caption on the site
  // (2026-10-04). It used to be white type on a black gradient over the picture, the
  // one place that broke "nothing is layered over the work".
  return (
    <Link href={s.href} className="group" style={{ display: "block" }}>
      <div className="aspect-video sm:aspect-[3/4]" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={s.cover}
          alt={s.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
        />
      </div>
      <p
        className="font-heading text-[var(--color-warm)] transition-opacity duration-200 group-hover:opacity-60"
        style={{
          fontWeight: 800,
          fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          padding: "18px 24px 22px",
        }}
      >
        {s.title} →
      </p>
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
