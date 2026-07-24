"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { workAssets } from "@/data/work-asset-urls";

type SlideInfo = { index: string; title: string; client: string; year: string; href: string; disciplines?: string[] };

type HeroSlide = {
  portrait: boolean;
  info?: SlideInfo;
} & (
  | { type: "video"; src: string; poster: string }
  | { type: "image"; src: string; alt: string }
);

const heroSlides: HeroSlide[] = [
  {
    type: "video",
    src: "/videos/live-commerce/fitflop-may.mp4",
    poster: workAssets.knack("Knack-14.jpg"),
    portrait: true,
    info: { index: "01", title: "Fitflop Live", client: "Fitflop", year: "2026", href: "/commercial", disciplines: ["Live Commerce", "AV Engineering", "Creative Production"] },
  },
  {
    type: "image",
    src: workAssets.knack("Knack-75.jpg"),
    alt: "Knack Factory Fashion Show",
    portrait: true,
    info: { index: "02", title: "Knack Factory\nFashion Show", client: "Knack Factory", year: "2024", href: "/commercial/knack-factory", disciplines: ["Art Direction", "Production", "Photography"] },
  },
  {
    type: "video",
    src: "/videos/live-commerce/rojukiss-may.mp4",
    poster: workAssets.woven("1.jpg"),
    portrait: true,
    info: { index: "03", title: "Rojukiss Live", client: "Rojukiss", year: "2026", href: "/commercial", disciplines: ["Live Commerce", "AV Engineering", "Creative Production"] },
  },
  {
    type: "image",
    src: workAssets.woven("0.jpg"),
    alt: "Woven Memories",
    portrait: true,
    info: { index: "04", title: "Woven Memories", client: "Personal Work", year: "2024", href: "/gallery", disciplines: ["Art Direction", "Visual Storytelling", "Creative Production"] },
  },
  {
    type: "video",
    src: "/videos/live-commerce/shop-at-nestle-may.mp4",
    poster: workAssets.podcast("Dan.jpg"),
    portrait: true,
    info: { index: "05", title: "Shop at Nestlé", client: "Nestlé", year: "2026", href: "/commercial", disciplines: ["Live Commerce", "AV Engineering", "Creative Production"] },
  },
  {
    type: "image",
    src: workAssets.podcast("_MG_8860.JPG"),
    alt: "Podcast & Studio",
    portrait: true,
    info: { index: "06", title: "Podcast & Studio", client: "Independent", year: "2025–2026", href: "/commercial/podcast-studio", disciplines: ["Sound Design", "Audio Engineering", "Show Hosting & Production"] },
  },
];

const HERO_INTERVAL_MS = 6000;
const FADE = "opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1)";
const EASE = [0.16, 1, 0.3, 1] as const;

function MediaBlock({
  slide,
  videoRef,
  bgVideoRef,
  priority,
}: {
  slide: HeroSlide;
  videoRef: (el: HTMLVideoElement | null) => void;
  bgVideoRef: (el: HTMLVideoElement | null) => void;
  priority: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Blurred background */}
      {slide.type === "video" ? (
        <video
          ref={bgVideoRef}
          src={slide.src}
          muted loop playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.12)", filter: "blur(22px)" }}
        />
      ) : (
        <Image
          src={slide.src}
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover"
          style={{ transform: "scale(1.12)", filter: "blur(22px)" }}
        />
      )}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} />

      {/* Sharp foreground */}
      {slide.type === "video" ? (
        <video
          ref={videoRef}
          src={slide.src}
          poster={"poster" in slide ? slide.poster : undefined}
          muted loop playsInline
          preload={priority ? "auto" : "metadata"}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ zIndex: 1 }}
        />
      ) : (
        <Image
          src={slide.src}
          alt={"alt" in slide ? slide.alt : ""}
          fill
          sizes="100vw"
          priority={priority}
          className="object-contain"
          style={{ zIndex: 1 }}
        />
      )}
    </div>
  );
}

function InfoPanel({ info }: { info: SlideInfo }) {
  return (
    <div className="flex flex-col justify-between h-full px-7 py-7 md:px-10 md:py-10 lg:px-14 lg:py-12" style={{ position: "relative", zIndex: 2 }}>
      <div>
        <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#7A7470" }}>
          Selected Work — {info.index}
        </p>
        <div style={{ width: "100%", height: "1px", backgroundColor: "#2A2826", marginTop: "14px" }} />
      </div>

      <div>
        <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "8px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#6B6560", marginBottom: "10px" }}>
          Project Title
        </p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(1.3rem, 2.4vw, 2.2rem)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#F2F0EB", whiteSpace: "pre-line" }}>
          {info.title}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ height: "1px", backgroundColor: "#2A2826" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6560", marginBottom: "5px" }}>Client</p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.78rem", fontWeight: 500, color: "#C8C4BF" }}>{info.client}</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6560", marginBottom: "5px" }}>Year</p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.78rem", fontWeight: 500, color: "#C8C4BF" }}>{info.year}</p>
          </div>
        </div>
        <div style={{ height: "1px", backgroundColor: "#2A2826" }} />
        <div>
          <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6560", marginBottom: "5px" }}>Role</p>
          <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A9087" }}>Creative Producer</p>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6560", marginBottom: "7px" }}>Disciplines</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {(info.disciplines ?? ["Art Direction", "Production", "Photography"]).map((d) => (
              <span key={d} style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9A9087", border: "1px solid #3A3835", padding: "3px 7px" }}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div style={{ height: "1px", backgroundColor: "#2A2826", marginBottom: "14px" }} />
        <Link
          href={info.href}
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#F2F0EB",
            textDecoration: "none",
            display: "inline-block",
            border: "1px solid rgba(242,240,235,0.4)",
            padding: "8px 14px",
            transition: "background 200ms ease, color 200ms ease, border-color 200ms ease",
          }}
          onMouseEnter={(e) => {
            const a = e.currentTarget as HTMLAnchorElement;
            a.style.background = "#F2F0EB";
            a.style.color = "#0C0A08";
            a.style.borderColor = "#F2F0EB";
          }}
          onMouseLeave={(e) => {
            const a = e.currentTarget as HTMLAnchorElement;
            a.style.background = "transparent";
            a.style.color = "#F2F0EB";
            a.style.borderColor = "rgba(242,240,235,0.4)";
          }}
        >
          View Project →
        </Link>
      </div>
    </div>
  );
}

export default function CreativeProducerHero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const bgVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const navigationRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 60]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleNavigation((active - 1 + heroSlides.length) % heroSlides.length);
      if (e.key === "ArrowRight") handleNavigation((active + 1) % heroSlides.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleNavigation = (newIndex: number) => {
    if (navigationRef.current) return;
    navigationRef.current = true;
    setActive(newIndex);
    // Reset the auto-advance timer so manual selection isn't immediately overridden
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => setActive((i) => (i + 1) % heroSlides.length), HERO_INTERVAL_MS);
    setTimeout(() => { navigationRef.current = false; }, 500);
  };

  useEffect(() => {
    if (reducedMotion) return;
    intervalRef.current = window.setInterval(() => setActive((i) => (i + 1) % heroSlides.length), HERO_INTERVAL_MS);
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [reducedMotion]);

  useEffect(() => {
    [videoRefs, bgVideoRefs].forEach((refs) => {
      refs.current.forEach((v, i) => {
        if (!v) return;
        if (i === active) { v.currentTime = 0; void v.play().catch(() => {}); }
        else { v.pause(); }
      });
    });
  }, [active]);

  return (
    <motion.section
      ref={ref}
      id="hero"
      aria-label="Hero slideshow"
      style={{ opacity: reducedMotion ? 1 : opacity }}
      className="relative h-[85vh] min-h-[560px] overflow-hidden bg-black"
    >
      {/* ── z-10: Slides ── */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0"
          style={{ opacity: i === active ? 1 : 0, transition: FADE, zIndex: 10, pointerEvents: i === active ? "auto" : "none" }}
        >
          {slide.portrait ? (
            /* Portrait — full-width blurred bg spanning both columns */
            <div className="relative h-full w-full overflow-hidden">
              {/* Blurred bg covers entire slide (both columns) */}
              <div className="absolute inset-0 overflow-hidden" aria-hidden>
                {slide.type === "video" ? (
                  <video
                    ref={(el) => { bgVideoRefs.current[i] = el; }}
                    src={slide.src}
                    muted loop playsInline preload="none"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: "scale(1.12)", filter: "blur(24px)" }}
                  />
                ) : (
                  <Image
                    src={slide.src}
                    alt=""
                    fill sizes="100vw"
                    className="object-cover"
                    style={{ transform: "scale(1.12)", filter: "blur(24px)" }}
                  />
                )}
                <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.48)" }} />
              </div>

              {/* Diptych flex layout on top */}
              <div className="relative flex flex-col md:flex-row h-full w-full" style={{ zIndex: 1 }}>
                {/* Media column: sharp foreground only */}
                <div className="relative overflow-hidden flex-shrink-0 h-[60%] w-full md:h-full md:w-[60%]">
                  {slide.type === "video" ? (
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={slide.src}
                      poster={"poster" in slide ? slide.poster : undefined}
                      muted loop playsInline
                      preload={i <= 1 ? "auto" : "metadata"}
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{ zIndex: 1 }}
                    />
                  ) : (
                    <Image
                      src={slide.src}
                      alt={"alt" in slide ? slide.alt : ""}
                      fill sizes="60vw"
                      priority={i <= 1}
                      className="object-contain"
                      style={{ zIndex: 1 }}
                    />
                  )}
                </div>
                {/* Info column: semi-transparent dark overlay over blurred bg */}
                <div
                  className="flex-1 overflow-hidden border-t md:border-t-0 md:border-l"
                  style={{ backgroundColor: "rgba(12,10,8,0.88)", borderColor: "rgba(30,28,26,0.5)" }}
                >
                  {slide.info && <InfoPanel info={slide.info} />}
                </div>
              </div>
            </div>
          ) : (
            /* Landscape — full blurred bg */
            <MediaBlock
              slide={slide}
              videoRef={(el) => { videoRefs.current[i] = el; }}
              bgVideoRef={(el) => { bgVideoRefs.current[i] = el; }}
              priority={i <= 1}
            />
          )}
        </div>
      ))}

      {/* ── z-15: Bottom vignette for landscape slides ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 15, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)" }}
      />

      {/* ── z-20: Role label (top-left) ── */}
      <motion.p
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
        className="absolute pointer-events-none"
        style={{
          zIndex: 20,
          top: "clamp(100px, 14vh, 120px)",
          left: "clamp(2rem, 6vw, 3rem)",
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "9px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#9A9087",
        }}
      >
        Creative Producer — Bangkok, TH
      </motion.p>

      {/* ── z-20: Navigation (bottom-left, within media column — never overlaps info panel) ── */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.85 }}
        className="absolute flex flex-col items-start gap-3"
        style={{ zIndex: 20, bottom: "clamp(1.5rem, 4vh, 2.5rem)", left: "clamp(2rem, 6vw, 3rem)" }}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavigation((active - 1 + heroSlides.length) % heroSlides.length)}
            aria-label="Previous slide"
            className="flex items-center justify-center w-11 h-11 border border-[var(--color-text)] hover:bg-[var(--color-text)] transition-all duration-200 text-[14px]"
            style={{ color: "var(--color-text)", backgroundColor: "rgba(0,0,0,0.25)" }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => handleNavigation((active + 1) % heroSlides.length)}
            aria-label="Next slide"
            className="flex items-center justify-center w-11 h-11 border border-[var(--color-text)] hover:bg-[var(--color-text)] transition-all duration-200 text-[14px]"
            style={{ color: "var(--color-text)", backgroundColor: "rgba(0,0,0,0.25)" }}
          >
            ›
          </button>
        </div>

        <div className="flex items-center gap-[5px]" role="tablist" aria-label="Hero slides">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1} of ${heroSlides.length}`}
              onClick={() => handleNavigation(i)}
              style={{
                display: "flex",
                alignItems: "center",
                width: "20px",
                height: "8px",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: i === active ? "default" : "pointer",
              }}
            >
              <span style={{
                display: "block",
                width: "100%",
                height: "1px",
                backgroundColor: i === active ? "var(--color-text)" : "var(--color-grey-700)",
                transformOrigin: "left",
                transform: i === active ? "scaleX(1)" : "scaleX(0.3)",
                transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms ease",
              }} />
            </button>
          ))}
        </div>

        <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6560" }}>
          {String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
        </span>
      </motion.div>
    </motion.section>
  );
}
