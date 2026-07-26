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

const backdropOf = (s: Slide) => (s.kind === "video" ? s.poster : s.src);

export default function HeroStage() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);
  const count = SLIDES.length;

  // Fade + settle the hero as it scrolls away (skipped under reduced-motion).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacityMV = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yMV = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Continuous auto-loop.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), HERO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced, count]);

  // Only the active video plays; others pause to respect device resources.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !reduced) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, reduced]);

  return (
    <motion.section
      ref={ref}
      aria-label="Selected work"
      style={reduced ? undefined : { opacity: opacityMV }}
      className="relative h-screen overflow-hidden"
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
          {/* Blurred fill from the same frame — fills the viewport without cropping the work. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${backdropOf(slide)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1.15)",
              filter: "blur(30px) brightness(0.45)",
            }}
          />
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

      {/* Legibility scrim */}
      <div aria-hidden className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />

      {/* Swiss-grid text: small label up top; name + disciplines anchored bottom-left. */}
      <motion.div
        style={{
          paddingTop: "104px",
          paddingBottom: "40px",
          paddingLeft: "32px",
          paddingRight: "32px",
          ...(reduced ? {} : { y: yMV }),
        }}
        className="relative h-full flex flex-col justify-between"
      >
        <p className="mono-label" style={{ color: "rgba(242,240,235,0.72)" }}>
          Creative Producer — Bangkok
        </p>

        <div className="flex items-end justify-between gap-6">
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
            <p className="mono-label" style={{ marginTop: "18px", color: "rgba(242,240,235,0.5)" }}>
              Art Direction · Production · Photography
            </p>
          </div>
          <span
            className="mono-label tabular-nums"
            style={{ color: "rgba(242,240,235,0.72)", whiteSpace: "nowrap" }}
          >
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
