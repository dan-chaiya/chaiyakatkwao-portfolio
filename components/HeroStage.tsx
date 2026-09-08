"use client";

// components/HeroStage.tsx — the home hero.
// Brutalist + Swiss grid: an auto-looping showcase of the work. Three rows inside the
// fold: the header line (the name as one small line of the heading voice, with the
// positioning label beside it), the stage, and the disciplines row with the slideshow
// controls. The stage takes everything the two text rows do not: since 2026-09-08 the
// name no longer sits at display size under the work, so the work is the hero.
// The stage shows the ORIGINAL uncropped work (object-contain) on the black ground —
// no scrim, no gradient bands, no blurred fill. The text rows are in flow, on black,
// so nothing has to be dimmed for legibility and the work is shown at full contrast.
// Live-commerce slides play the real optimized loops the same way. prefers-reduced-motion
// → no autoplay, no cross-fade.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { workAssets } from "@/data/work-asset-urls";
import { HERO_INTERVAL_MS } from "@/lib/motion";

type Slide =
  | { kind: "video"; sources: { src: string; type: string }[]; poster: string; alt: string }
  | { kind: "image"; src: string; alt: string };

// Verified assets: art originals via workAssets (never altered) + the optimized live loops.
const SLIDES: Slide[] = [
  { kind: "image", src: workAssets.woven("0.jpg"), alt: "Woven Memories, 2025 - Creative Producer" },
  {
    kind: "video",
    sources: [
      { src: "/videos/motion/live-fitflop-may.webm", type: "video/webm" },
      { src: "/videos/motion/live-fitflop-may.mp4", type: "video/mp4" },
    ],
    poster: "/videos/motion/live-fitflop-may.poster.jpg",
    alt: "Fitflop live commerce production - Creative Producer",
  },
  { kind: "image", src: workAssets.knack("Knack-75.jpg"), alt: "Knack Factory Fashion Show, 2024 - Creative Producer" },
  {
    kind: "video",
    sources: [
      { src: "/videos/motion/live-rojukiss-may.webm", type: "video/webm" },
      { src: "/videos/motion/live-rojukiss-may.mp4", type: "video/mp4" },
    ],
    poster: "/videos/motion/live-rojukiss-may.poster.jpg",
    alt: "Rojukiss live commerce production - Creative Producer",
  },
  { kind: "image", src: workAssets.podcast("_MG_8860.JPG"), alt: "Podcast Producer at Modal Creative Studio - Creative Producer" },
  {
    kind: "video",
    sources: [
      { src: "/videos/motion/live-nestle.webm", type: "video/webm" },
      { src: "/videos/motion/live-nestle.mp4", type: "video/mp4" },
    ],
    poster: "/videos/motion/live-nestle.poster.jpg",
    alt: "Nestlé live commerce production - Creative Producer",
  },
];

// Same side padding as the pages (px-8), so the label, the name and the page
// titles below share one left edge.
const PAD_X = "32px";

export default function HeroStage() {
  const reduced = useReducedMotion();
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  // Continuous auto-loop. WCAG 2.2.2 requires that anything moving for more than
  // five seconds can be stopped, so this honours an explicit pause as well as
  // prefers-reduced-motion.
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), HERO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced, paused, count]);

  // Only the active video plays; others pause to respect device resources.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !reduced && !paused) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, reduced, paused]);

  return (
    <section
      aria-label="Selected work"
      className="relative flex flex-col overflow-hidden"
      style={{
        height: "calc(100svh - var(--header-h))",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Row 1: the header line. The name is one small line, in flow, with the
          positioning label beside it; on phones the two stack. */}
      <div
        className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        style={{ padding: `20px ${PAD_X} 16px` }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "var(--color-warm)",
            whiteSpace: "nowrap",
          }}
        >
          Chaiya Katkwao.
        </h1>
        <p className="mono-label" style={{ color: "var(--color-warm)" }}>
          Creative Producer — Bangkok
        </p>
      </div>

      {/* Row 2: the stage. Each slide is the work, contained, on the black ground.
          Portrait work stands in the middle; landscape work fills the height. */}
      <div className="relative min-h-0 flex-1">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== active}
            className="absolute inset-0 transition-opacity ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              transitionDuration: reduced ? "0ms" : "1200ms",
            }}
          >
            {slide.kind === "video" ? (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                poster={slide.poster}
                muted
                loop
                playsInline
                autoPlay={i === 0 && !reduced}
                preload={i === 0 ? "auto" : "metadata"}
                aria-label={slide.alt}
                className="absolute inset-0 h-full w-full object-contain"
              >
                {slide.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
              </video>
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
        ))}
      </div>

      {/* Row 3: disciplines left; slideshow controls right. One line on desktop. */}
      <div
        className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        style={{ padding: `16px ${PAD_X} 24px` }}
      >
        <p className="mono-label" style={{ color: "var(--color-warm)" }}>
          Art Direction · Production · Photography
        </p>
        {/* The counter implied controls that did not exist. Now it is one: pause
            stops the rotation, and the slide marks step it. Hidden entirely under
            reduced motion, where nothing is rotating to begin with. */}
        <div className="flex shrink-0 items-center gap-4" style={{ whiteSpace: "nowrap" }}>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="flex h-11 w-11 items-center justify-center border transition-colors duration-200"
              style={{
                borderColor: "rgba(242,240,235,0.28)",
                color: "rgba(242,240,235,0.86)",
              }}
            >
              {paused ? (
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
                  <path d="M1 1L10 6.5L1 12V1Z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                  <rect x="0" y="0" width="3" height="12" fill="currentColor" />
                  <rect x="7" y="0" width="3" height="12" fill="currentColor" />
                </svg>
              )}
            </button>
          )}

          <div className="hidden sm:flex items-center gap-[6px]" role="group" aria-label="Slides">
            {SLIDES.map((slide, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show slide ${i + 1}: ${slide.alt}`}
                aria-current={i === active ? "true" : undefined}
                className="flex h-11 w-4 items-center justify-center"
              >
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    height: "1px",
                    backgroundColor: i === active ? "var(--color-warm)" : "rgba(242,240,235,0.34)",
                    transition: "background-color 220ms ease",
                  }}
                />
              </button>
            ))}
          </div>

          <span className="mono-label tabular-nums" style={{ color: "var(--color-warm)" }}>
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
