"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import Lightbox from "@/components/Lightbox";
import YouTubeEmbed from "@/components/YouTubeEmbed";
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
    id: "lc-02",
    title: "Fitflop Live",
    brand: "Fitflop",
    src: "/videos/live-commerce/fitflop.mp4",
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
];

type LightboxState = {
  src: string;
  alt: string;
  title?: string;
  series?: string;
} | null;

export default function Commercial() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  return (
    <PageTransition>
      <div className="pt-32 px-8 pb-8">
        {/* Header */}
        <div className="mb-20">
          <p className="font-body text-[9px] tracking-[0.35em] uppercase text-[#6B6560] mb-5">
            Commercial
          </p>
          <h1
            className="font-heading text-[#F2F0EB]"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            Selected /
            <br />
            commissions.
          </h1>
        </div>

        {/* Photo / production projects */}
        <div className="space-y-32">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: 0.05,
              }}
            >
              {/* Cover — natural aspect ratio, links to case study */}
              <Link
                href={`/commercial/${project.slug}`}
                className="relative w-full overflow-hidden bg-[#111] mb-6 group block"
              >
                <Image
                  src={project.cover}
                  alt={project.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-[#0D0D0D]/0 group-hover:bg-[#0D0D0D]/30 transition-colors duration-500" />
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                  <span className="font-body text-[9px] tracking-[0.25em] uppercase text-[#F2F0EB] border border-[#F2F0EB] px-3 py-2">
                    View case study →
                  </span>
                </div>
              </Link>

              {/* Metadata row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                <div className="md:col-span-1">
                  <span className="font-body text-[9px] tracking-[0.2em] text-[#2A2826]">
                    {project.id}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <Link
                    href={`/commercial/${project.slug}`}
                    className="inline-block group"
                  >
                    <h2
                      className="font-heading text-[#F2F0EB] mb-1 transition-opacity duration-300 group-hover:opacity-70"
                      style={{
                        fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {project.title}
                    </h2>
                  </Link>
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560]">
                    {project.role}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="font-body text-[#6B6560] text-xs leading-relaxed tracking-wide mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[9px] tracking-[0.15em] uppercase text-[#6B6560] border border-[#1E1C1A] px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <span className="font-body text-[9px] tracking-[0.15em] text-[#6B6560]">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Supporting images — natural ratio masonry */}
              <div className="columns-2 md:columns-4 gap-2">
                {project.images.map((src, j) => (
                  <div
                    key={j}
                    className="break-inside-avoid mb-2 relative overflow-hidden bg-[#111] cursor-pointer group"
                    onClick={() =>
                      setLightbox({
                        src,
                        alt: `${project.title} — ${j + 2}`,
                        title: project.title,
                        series: project.subtitle,
                      })
                    }
                  >
                    <Image
                      src={src}
                      alt={`${project.title} ${j + 2}`}
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Selected Episodes — long-form video & podcast work */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-32 pt-16 border-t border-[#1E1C1A]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
            <div className="md:col-span-1">
              <span className="font-body text-[9px] tracking-[0.2em] text-[#2A2826]">05</span>
            </div>
            <div className="md:col-span-4">
              <h2
                className="font-heading text-[#F2F0EB] mb-1"
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                }}
              >
                Selected Episodes
              </h2>
              <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560]">
                Producer / Studio
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="font-body text-[#6B6560] text-xs leading-relaxed tracking-wide mb-4">
                Long-form podcasts and interviews produced and recorded across an ongoing slate of shows.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Podcast", "Long-form", "Studio Production"].map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[9px] tracking-[0.15em] uppercase text-[#6B6560] border border-[#1E1C1A] px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 md:text-right">
              <span className="font-body text-[9px] tracking-[0.15em] text-[#6B6560]">2025–2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {selectedEpisodes.map((video) => (
              <div key={video.id}>
                <YouTubeEmbed id={video.id} title={video.title} />
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <p className="font-body text-[10px] tracking-[0.08em] text-[#9A9087] line-clamp-2">
                    {video.title}
                  </p>
                  <span className="font-body text-[9px] tracking-[0.15em] uppercase text-[#2A2826] shrink-0">
                    {video.show}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Live Commerce section */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-32 pt-16 border-t border-[#1E1C1A]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
            <div className="md:col-span-1">
              <span className="font-body text-[9px] tracking-[0.2em] text-[#2A2826]">06</span>
            </div>
            <div className="md:col-span-4">
              <h2
                className="font-heading text-[#F2F0EB] mb-1"
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                }}
              >
                Live Commerce
              </h2>
              <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560]">
                Live Producer / AV Engineer
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="font-body text-[#6B6560] text-xs leading-relaxed tracking-wide mb-4">
                Live commerce productions for fashion and lifestyle brands at Ad The Top Agency.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Live Production", "Art Direction", "AV Engineering"].map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[9px] tracking-[0.15em] uppercase text-[#6B6560] border border-[#1E1C1A] px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 md:text-right">
              <span className="font-body text-[9px] tracking-[0.15em] text-[#6B6560]">2026</span>
            </div>
          </div>

          <div className="columns-1 md:columns-2 gap-4 md:gap-6">
            {liveCommerceVideos.map((video) => (
              <div key={video.id} className="break-inside-avoid mb-4 md:mb-6">
                <div className="relative overflow-hidden bg-[#111]">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-auto block"
                  >
                    <source src={video.src} type={video.type} />
                  </video>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="font-body text-[10px] tracking-[0.08em] text-[#9A9087]">
                    {video.title}
                  </p>
                  <span className="font-body text-[9px] tracking-[0.1em] text-[#2A2826]">
                    {video.brand}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <footer className="border-t border-[#1E1C1A] px-8 py-8 mt-32 flex items-center justify-between">
        <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560]">
          © 2026 Chaiya Katkwao
        </p>
        <div className="flex items-center gap-10">
          <a
            href="https://www.instagram.com/chaiya.a/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560] hover:text-[#C8C4BC] transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href="mailto:chaiyakatkwao@gmail.com"
            className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560] hover:text-[#C8C4BC] transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </footer>

      <AnimatePresence>
        {lightbox && (
          <Lightbox {...lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
