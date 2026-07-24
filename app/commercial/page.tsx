"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import CommercialList from "@/components/CommercialList";
import { projects } from "@/data/commercial";
import { selectedEpisodes } from "@/data/youtube";

const liveCommerceVideos = [
  {
    id: "lc-01",
    title: "Dutchmil Delivery Live Showcase",
    brand: "Dutchmil Delivery",
    src: "/videos/live-commerce/dmd-live.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-03",
    title: "Her Hyness Showcase",
    brand: "Her Hyness",
    src: "/videos/live-commerce/her-hyness.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-04",
    title: "Nestlé Health Science Live",
    brand: "Nestlé Health Science",
    src: "/videos/live-commerce/nestle.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-05",
    title: "Sunnies Studio Live",
    brand: "Sunnies Studio Thailand",
    src: "/videos/live-commerce/sunnies.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-06",
    title: "Tokfashion Live",
    brand: "Tokfashion",
    src: "/videos/live-commerce/tokfashion.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-08",
    title: "Guess — April",
    brand: "Guess",
    src: "/videos/live-commerce/guess.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-10",
    title: "Colgate — May",
    brand: "Colgate",
    src: "/videos/live-commerce/colgate-may.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-11",
    title: "Dutchmil Delivery — May",
    brand: "Dutchmil Delivery",
    src: "/videos/live-commerce/dutchmil-may.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-12",
    title: "F&N Dairies — May",
    brand: "F&N Dairies",
    src: "/videos/live-commerce/fn-dairies-may.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-13",
    title: "Fitflop Live",
    brand: "Fitflop",
    src: "/videos/live-commerce/fitflop-may.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-14",
    title: "Rojukiss Live",
    brand: "Rojukiss",
    src: "/videos/live-commerce/rojukiss-may.mp4",
    type: "video/mp4",
  },
  {
    id: "lc-15",
    title: "Shop at Nestlé — May",
    brand: "Shop at Nestlé",
    src: "/videos/live-commerce/shop-at-nestle-may.mp4",
    type: "video/mp4",
  },
];

type LightboxState = {
  images: { src: string; alt: string; title?: string; series?: string }[];
  index: number;
} | null;

export default function Commercial() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const activeLbItem = lightbox ? lightbox.images[lightbox.index] : null;
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <PageTransition>
      <div className="pt-16 px-8 pb-8">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 12 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-[11px] tracking-[0.3em] uppercase text-[var(--color-grey-400)] mb-5"
          >
            Commercial
          </motion.p>
          <motion.h1
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[var(--color-warm)]"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            Selected /
            <br />
            commissions.
          </motion.h1>
        </div>

        {/* View toggle (B3) */}
        <div className="mb-12 flex items-center gap-1" role="group" aria-label="View mode">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className="mono-label flex h-11 items-center px-3 transition-colors duration-200"
              style={{
                color: view === v ? "var(--color-text)" : "var(--color-text-muted)",
                borderBottom: view === v ? "1px solid var(--color-accent)" : "1px solid transparent",
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Photo / production projects */}
        {view === "list" ? (
          <CommercialList projects={projects} />
        ) : (
        <div className="space-y-32">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              whileInView={{ y: 0 }}
              initial={{ y: 20 }}
              viewport={{ once: true, amount: 0 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: 0.05,
              }}
            >
              {/* Cover — natural aspect ratio, no cropping */}
              <Link
                href={`/commercial/${project.slug}`}
                className="relative w-full overflow-hidden bg-[var(--color-surface-elevated)] mb-6 group block"
              >
                <Image
                  src={project.cover}
                  alt={project.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="img-natural transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-[var(--color-surface-chat)]/0 group-hover:bg-[var(--color-surface-chat)]/30 transition-colors duration-500" />
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                  <span className="font-body text-[9px] tracking-[0.25em] uppercase text-[var(--color-warm)] border border-[var(--color-warm)] px-3 py-2">
                    View case study →
                  </span>
                </div>
              </Link>

              {/* Metadata row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                <div className="md:col-span-1">
                  <span className="font-body text-[9px] tracking-[0.2em] text-[var(--color-grey-700)]">
                    {project.id}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <Link
                    href={`/commercial/${project.slug}`}
                    className="inline-block group"
                  >
                    <h2
                      className="font-heading text-[var(--color-warm)] mb-1 transition-opacity duration-300 group-hover:opacity-70"
                      style={{
                        fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {project.title}
                    </h2>
                  </Link>
                  <p className="font-body text-[11px] tracking-[0.18em] uppercase text-[var(--color-grey-400)]">
                    {project.role}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="font-body text-[var(--color-grey-400)] text-[13px] leading-relaxed tracking-wide mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[11px] tracking-[0.12em] uppercase text-[var(--color-grey-400)] border border-[var(--color-border-muted)] px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <span className="font-body text-[11px] tracking-[0.12em] text-[var(--color-grey-400)]">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Supporting images */}
              {(() => {
                const displayImages = (project.listingImages ?? project.images)
                  .filter((img) => !img.includes("Dan.jpg") && !img.includes("Knack-143.jpg") && !img.includes("Knack-79.jpg"))
                  .filter((src, index, self) => self.findIndex((t) => t === src) === index);
                const isPodcast = project.slug === "podcast-studio";
                return (
                  <div className="flex flex-nowrap gap-[1px] overflow-hidden">
                    {displayImages.map((src, j) => (
                      <div
                        key={j}
                        className={`flex-1 min-w-0 overflow-hidden bg-[var(--color-surface-elevated)] cursor-pointer group${isPodcast ? " relative h-[280px]" : ""}`}
                        onClick={() =>
                          setLightbox({
                            images: project.images.map((s, k) => ({
                              src: s,
                              alt: `${project.title} — ${k + 2}`,
                              title: project.title,
                              series: project.subtitle,
                            })),
                            index: project.images.indexOf(src),
                          })
                        }
                      >
                        {isPodcast ? (
                          <Image
                            src={src}
                            alt={`${project.title} ${j + 2}`}
                            fill
                            sizes="(max-width: 768px) 33vw, 20vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <Image
                            src={src}
                            alt={`${project.title} ${j + 2}`}
                            width={0}
                            height={0}
                            sizes="(max-width: 768px) 33vw, 20vw"
                            className="img-natural transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </motion.article>
          ))}
        </div>
        )}

        {/* Selected Episodes — long-form video & podcast work */}
        <motion.section
          whileInView={{ y: 0 }}
          initial={{ y: 16 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-32 pt-16 border-t border-[var(--color-border-muted)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
            <div className="md:col-span-1">
              <span className="font-body text-[9px] tracking-[0.2em] text-[var(--color-grey-700)]">05</span>
            </div>
            <div className="md:col-span-4">
              <h2
                className="font-heading text-[var(--color-warm)] mb-1"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
              >
                Selected Episodes
              </h2>
              <p className="font-body text-[11px] tracking-[0.18em] uppercase text-[var(--color-grey-400)]">
                Producer / Studio
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="font-body text-[var(--color-grey-400)] text-[13px] leading-relaxed tracking-wide mb-4">
                Long-form podcasts and interviews produced and recorded across an ongoing slate of shows.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Podcast", "Long-form", "Studio Production"].map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[11px] tracking-[0.12em] uppercase text-[var(--color-grey-400)] border border-[var(--color-border-muted)] px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 md:text-right">
              <span className="font-body text-[11px] tracking-[0.12em] text-[var(--color-grey-400)]">2025–2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {selectedEpisodes.map((video) => (
              <div key={video.id}>
                <YouTubeEmbed id={video.id} title={video.title} />
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <p className="font-body text-[12px] tracking-[0.06em] text-[var(--color-grey-300)] line-clamp-2">
                    {video.title}
                  </p>
                  <span className="font-body text-[9px] tracking-[0.15em] uppercase text-[var(--color-grey-700)] shrink-0">
                    {video.show}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Live Commerce section */}
        <motion.section
          whileInView={{ y: 0 }}
          initial={{ y: 16 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-24"
        >
          <div style={{ borderTop: "1px solid rgba(249,249,249,0.18)", paddingTop: "20px", marginBottom: "48px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[var(--color-grey-500)]">Live Commerce</p>
            <p className="font-body text-[9px] tracking-[0.2em] text-[var(--color-grey-700)]">2026</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
            <div className="md:col-span-1">
              <span className="font-body text-[9px] tracking-[0.2em] text-[var(--color-grey-700)]">06</span>
            </div>
            <div className="md:col-span-4">
              <h2
                className="font-heading text-[var(--color-warm)] mb-1"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
              >
                Live Commerce
              </h2>
              <p className="font-body text-[11px] tracking-[0.18em] uppercase text-[var(--color-grey-400)]">
                Live Producer / AV Engineer
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="font-body text-[var(--color-grey-400)] text-[13px] leading-relaxed tracking-wide mb-4">
                Live commerce productions for fashion and lifestyle brands at Ad The Top Agency.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Live Production", "Art Direction", "AV Engineering"].map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[11px] tracking-[0.12em] uppercase text-[var(--color-grey-400)] border border-[var(--color-border-muted)] px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 md:text-right">
              <span className="font-body text-[11px] tracking-[0.12em] text-[var(--color-grey-400)]">2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1px" }}>
            {liveCommerceVideos.map((video) => (
              <div key={video.id} style={{ backgroundColor: "var(--color-bg)" }}>
                <video
                  controls
                  playsInline
                  preload="none"
                  className="w-full h-auto block"
                >
                  <source src={video.src} type={video.type} />
                </video>
                <div style={{
                  padding: "14px 20px",
                  borderTop: "1px solid var(--color-border)",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "16px",
                }}>
                  <span className="font-heading" style={{ fontSize: "0.85rem", letterSpacing: "-0.01em", color: "var(--color-warm)" }}>
                    {video.brand}
                  </span>
                  <span className="font-body" style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-grey-500)", whiteSpace: "nowrap" }}>
                    Live Commerce
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="mt-32">
        <Footer />
      </div>

      <AnimatePresence>
        {lightbox && activeLbItem && (
          <Lightbox
            src={activeLbItem.src}
            alt={activeLbItem.alt}
            title={activeLbItem.title}
            series={activeLbItem.series}
            index={lightbox.index + 1}
            total={lightbox.images.length}
            hasPrev={lightbox.index > 0}
            hasNext={lightbox.index < lightbox.images.length - 1}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox((lb) => lb && { ...lb, index: lb.index - 1 })}
            onNext={() => setLightbox((lb) => lb && { ...lb, index: lb.index + 1 })}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
