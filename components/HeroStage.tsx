"use client";

// components/HeroStage.tsx — the home hero (replaces CreativeProducerHero).
// Fixes B4 (too tall/heavy): ≤78vh, 16:9 landscape stage, lower-third info.
// Fixes B1 (rapid-click crash): 350ms debounced nav guard, shared by clicks + keys + swipe.
// Motion policy: live-commerce slides play REAL video footage (optimized loops). Art slides
// show the ORIGINAL file untouched — object-contain so it is never cropped — with a gentle,
// non-destructive CSS Ken-Burns. prefers-reduced-motion → no autoplay, no Ken-Burns, no drift.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion";
import { workAssets } from "@/data/work-asset-urls";
import { EASE } from "@/lib/motion";

const INTERVAL_S = 6;

type Info = { index: string; title: string; client: string; year: string; href: string; disciplines: string[] };

type Slide =
  | { kind: "video"; sources: { src: string; type: string }[]; poster: string; alt: string; info: Info }
  | { kind: "image"; src: string; alt: string; info: Info };

// Live-commerce slides use the real optimized video loops in /videos/motion.
// Art slides reference the pristine originals via workAssets (never altered).
const SLIDES: Slide[] = [
  {
    kind: "video",
    sources: [
      { src: "/videos/motion/live-fitflop-may.webm", type: "video/webm" },
      { src: "/videos/motion/live-fitflop-may.mp4", type: "video/mp4" },
    ],
    poster: "/videos/motion/live-fitflop-may.poster.jpg",
    alt: "Fitflop live commerce production",
    info: { index: "01", title: "Fitflop Live", client: "Fitflop", year: "2026", href: "/commercial", disciplines: ["Live Commerce", "AV Engineering", "Creative Production"] },
  },
  {
    kind: "image",
    src: workAssets.knack("Knack-75.jpg"),
    alt: "Knack Factory Fashion Show, 2024",
    info: { index: "02", title: "Knack Factory\nFashion Show", client: "Knack Factory", year: "2024", href: "/commercial/knack-factory", disciplines: ["Art Direction", "Production", "Photography"] },
  },
  {
    kind: "video",
    sources: [
      { src: "/videos/motion/live-rojukiss-may.webm", type: "video/webm" },
      { src: "/videos/motion/live-rojukiss-may.mp4", type: "video/mp4" },
    ],
    poster: "/videos/motion/live-rojukiss-may.poster.jpg",
    alt: "Rojukiss live commerce production",
    info: { index: "03", title: "Rojukiss Live", client: "Rojukiss", year: "2026", href: "/commercial", disciplines: ["Live Commerce", "AV Engineering", "Creative Production"] },
  },
  {
    kind: "image",
    src: workAssets.woven("0.jpg"),
    alt: "Woven Memories, 2025",
    info: { index: "04", title: "Woven Memories", client: "Personal Work", year: "2025", href: "/gallery", disciplines: ["Art Direction", "Visual Storytelling", "Creative Production"] },
  },
  {
    kind: "video",
    sources: [
      { src: "/videos/motion/live-nestle.webm", type: "video/webm" },
      { src: "/videos/motion/live-nestle.mp4", type: "video/mp4" },
    ],
    poster: "/videos/motion/live-nestle.poster.jpg",
    alt: "Nestlé live commerce production",
    info: { index: "05", title: "Shop at Nestlé", client: "Nestlé", year: "2026", href: "/commercial", disciplines: ["Live Commerce", "AV Engineering", "Creative Production"] },
  },
  {
    kind: "image",
    src: workAssets.podcast("_MG_8860.JPG"),
    alt: "Podcast Producer at Modal Creative Studio",
    info: { index: "06", title: "Podcast & Studio", client: "Independent", year: "2025–2026", href: "/commercial/podcast-studio", disciplines: ["Sound Design", "Audio Engineering", "Show Hosting"] },
  },
];

export default function HeroStage() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const navGuard = useRef(false);
  const progress = useMotionValue(0); // 0→1 across INTERVAL_S; drives the progress bar

  const count = SLIDES.length;

  // Debounced navigation (B1): one move per 350ms, whatever the input source.
  const go = useCallback((next: number) => {
    if (navGuard.current) return;
    navGuard.current = true;
    setActive(((next % count) + count) % count);
    progress.set(0);
    setTimeout(() => { navGuard.current = false; }, 350);
  }, [count, progress]);

  const next = useCallback(() => go(active + 1), [go, active]);
  const prev = useCallback(() => go(active - 1), [go, active]);

  // Progress + auto-advance in one loop → true pause/resume, no per-frame React renders.
  useAnimationFrame((_, delta) => {
    if (reduced || paused) return;
    const p = progress.get() + delta / (INTERVAL_S * 1000);
    if (p >= 1) {
      progress.set(0);
      setActive((prev) => (prev + 1) % count);
    } else {
      progress.set(p);
    }
  });

  // Reset the bar whenever the slide changes (covers auto-advance too).
  useEffect(() => { progress.set(0); }, [active, progress]);

  // Keyboard arrows when the hero has focus.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  const slide = SLIDES[active];

  return (
    <section
      aria-label="Featured work"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden h-[62vh] md:h-[78vh] md:max-h-[760px]"
      style={{ backgroundColor: "var(--color-bg)", borderBottom: "1px solid var(--color-border)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* Media — one slide mounted at a time (≤2 videos rule; here always ≤1). */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 1.1, ease: EASE.out }}
          drag={reduced ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.06}
          onDragEnd={(_, i) => { if (i.offset.x < -60) next(); else if (i.offset.x > 60) prev(); }}
        >
          {/* Blurred fill backdrop from the same frame — keeps the 16:9 stage full without cropping the art */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.kind === "video" ? slide.poster : slide.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1.15)",
              filter: "blur(28px) brightness(0.5)",
            }}
          />
          {slide.kind === "video" ? (
            // Real footage — cover-fills the stage (it is video, not artwork).
            <video
              key={slide.sources[0].src}
              poster={slide.poster}
              muted
              loop
              playsInline
              autoPlay={!reduced}
              preload="auto"
              aria-label={slide.alt}
              className="absolute inset-0 h-full w-full object-cover"
            >
              {slide.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
            </video>
          ) : (
            // Original artwork — object-contain so it is NEVER cropped; gentle Ken-Burns is presentation only.
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={reduced ? "relative h-full w-full" : "relative h-full w-full kenburns"} style={{ transformOrigin: "center" }}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={active === 0}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Legibility scrim toward the lower-third */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 42%, rgba(0,0,0,0.28) 100%)" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Lower-third info overlay (B4 — no full-height column) */}
      <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
        <div className="section-shell pb-10 md:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0.15 : 0.6, ease: EASE.out }}
              className="pointer-events-auto max-w-[46rem]"
            >
              <span className="mono-label" style={{ color: "var(--color-accent)" }}>
                {slide.info.index} — {slide.info.client} · {slide.info.year}
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(2rem, 6vw, 4.25rem)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text)",
                  marginTop: "14px",
                  whiteSpace: "pre-line",
                }}
              >
                {slide.info.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                {slide.info.disciplines.map((d) => (
                  <span key={d} className="mono-label">{d}</span>
                ))}
              </div>
              <Link
                href={slide.info.href}
                className="mono-label"
                style={{ display: "inline-block", marginTop: "18px", color: "var(--color-text)", textDecoration: "none" }}
              >
                View work →
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls + determinate progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        {/* Tablist + prev/next */}
        <div className="section-shell flex items-center justify-between pb-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
            {SLIDES.map((s, i) => (
              <button
                key={s.info.index}
                role="tab"
                aria-selected={i === active}
                aria-label={`${s.info.title.replace("\n", " ")} (${i + 1} of ${count})`}
                onClick={() => go(i)}
                className="flex h-11 w-6 items-center justify-center"
              >
                <span
                  className="block h-[2px] w-full transition-colors duration-300"
                  style={{ backgroundColor: i === active ? "var(--color-text)" : "var(--color-border-strong)" }}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="mono-label tabular-nums" style={{ color: "var(--color-text-muted)" }}>
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center border transition-colors duration-200"
              style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 4L8 12L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center border transition-colors duration-200"
              style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 4L16 12L9 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        {/* Determinate progress bar — shows the slide will change (partial B6) */}
        <div className="h-[2px] w-full" style={{ backgroundColor: "var(--color-border)" }}>
          <motion.div
            className="h-full origin-left"
            style={{ scaleX: progress, backgroundColor: "var(--color-accent)" }}
          />
        </div>
      </div>
    </section>
  );
}
