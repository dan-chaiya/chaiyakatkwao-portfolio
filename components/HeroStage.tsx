"use client";

// components/HeroStage.tsx — the home hero.
// Brutalist + Swiss grid: a full-viewport, auto-looping showcase of the work with the
// person's name as the title (not per-slide metadata). Minimal text, honest structure.
// Motion policy: art shows the ORIGINAL uncropped (object-contain) over a same-frame
// blurred backdrop — no letterbox, no crop — for both vertical and horizontal work.
// Live-commerce slides play the real optimized loops the same way. prefers-reduced-motion
// → no autoplay, no cross-fade drift, no parallax.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { workAssets } from "@/data/work-asset-urls";
import { HERO_INTERVAL_MS } from "@/lib/motion";

type Slide = { backdrop: string } & (
  | { kind: "video"; sources: { src: string; type: string }[]; poster: string; alt: string }
  | { kind: "image"; src: string; alt: string }
);

// The blurred fill behind each slide is a CSS background-image, which bypasses
// next/image and fetches whatever it is pointed at at full size. Pointed at the
// originals it pulled ~21 MB on first paint. These are 96px-wide derivatives —
// the frame is blurred 30px and scaled 1.15 before anyone sees it, so the source
// resolution is invisible. Regenerate with scripts/build-hero-backdrops.sh.
const BACKDROP = (file: string) => `/images/hero-backdrops/${file}`;

// Verified assets: art originals via workAssets (never altered) + the optimized live loops.
const SLIDES: Slide[] = [
  { kind: "image", src: workAssets.woven("0.jpg"), alt: "Woven Memories, 2025 - Creative Producer", backdrop: BACKDROP("woven-0.jpg") },
  {
    kind: "video",
    sources: [
      { src: "/videos/motion/live-fitflop-may.webm", type: "video/webm" },
      { src: "/videos/motion/live-fitflop-may.mp4", type: "video/mp4" },
    ],
    poster: "/videos/motion/live-fitflop-may.poster.jpg",
    alt: "Fitflop live commerce production - Creative Producer",
    backdrop: BACKDROP("live-fitflop-may.jpg"),
  },
  { kind: "image", src: workAssets.knack("Knack-75.jpg"), alt: "Knack Factory Fashion Show, 2024 - Creative Producer", backdrop: BACKDROP("knack-75.jpg") },
  {
    kind: "video",
    sources: [
      { src: "/videos/motion/live-rojukiss-may.webm", type: "video/webm" },
      { src: "/videos/motion/live-rojukiss-may.mp4", type: "video/mp4" },
    ],
    poster: "/videos/motion/live-rojukiss-may.poster.jpg",
    alt: "Rojukiss live commerce production - Creative Producer",
    backdrop: BACKDROP("live-rojukiss-may.jpg"),
  },
  { kind: "image", src: workAssets.podcast("_MG_8860.JPG"), alt: "Podcast Producer at Modal Creative Studio - Creative Producer", backdrop: BACKDROP("podcast-8860.jpg") },
  {
    kind: "video",
    sources: [
      { src: "/videos/motion/live-nestle.webm", type: "video/webm" },
      { src: "/videos/motion/live-nestle.mp4", type: "video/mp4" },
    ],
    poster: "/videos/motion/live-nestle.poster.jpg",
    alt: "Nestlé live commerce production - Creative Producer",
    backdrop: BACKDROP("live-nestle.jpg"),
  },
];

export default function HeroStage() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  // Fade + settle the hero as it scrolls away (skipped under reduced-motion).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacityMV = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yMV = useTransform(scrollYProgress, [0, 1], [0, 80]);

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
    <motion.section
      ref={ref}
      aria-label="Selected work"
      style={{ height: "calc(100svh - var(--header-h))", ...(reduced ? {} : { opacity: opacityMV }) }}
      className="relative overflow-hidden"
    >
      {/* Media stack — every slide holds a same-frame blurred backdrop + the work, contained. */}
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
          {/* Blurred fill from the same frame — fills the viewport without cropping
              the work. Painted for the active slide only: a full-viewport blur is an
              expensive compositor surface and six of them stack for one visible result. */}
          {i === active && (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${slide.backdrop})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "scale(1.15)",
                filter: "blur(30px) brightness(0.45)",
              }}
            />
          )}
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

      {/* Legibility scrim. The flat 0.5 layer is unchanged; the gradient bands are
          new. Over a bright frame the flat scrim alone left the bottom label at
          3.6:1 — the bands take the two zones that actually carry text to >7:1
          while leaving the middle of the frame, where the work is, as it was.
          Same top/bottom gradient language as the featured card. */}
      <div aria-hidden className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-64"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)" }}
      />

      {/* Swiss-grid text: small label up top; name + disciplines anchored bottom-left. */}
      <motion.div
        style={{
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingLeft: "32px",
          paddingRight: "32px",
          ...(reduced ? {} : { y: yMV }),
        }}
        className="relative h-full flex flex-col justify-between"
      >
        <p className="mono-label" style={{ color: "var(--color-warm)" }}>
          Creative Producer — Bangkok
        </p>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
                fontSize: "clamp(2.75rem, 7vw, 6.25rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                color: "var(--color-warm)",
              }}
            >
              Chaiya /<br />Katkwao.
            </h1>
            <p className="mono-label" style={{ marginTop: "18px", color: "var(--color-warm)" }}>
              Art Direction · Production · Photography
            </p>
          </div>
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
      </motion.div>
    </motion.section>
  );
}
