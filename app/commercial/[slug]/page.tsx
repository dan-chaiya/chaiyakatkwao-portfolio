"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import Lightbox from "@/components/Lightbox";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import Footer from "@/components/Footer";
import { getProject, projects } from "@/data/commercial";
import { selectedEpisodes } from "@/data/youtube";

type LbImage = { src: string; alt: string; title?: string; series?: string };
type LightboxState = { images: LbImage[]; index: number } | null;

export default function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = getProject(slug);

  if (!project) notFound();

  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const activeLbImg = lightbox ? lightbox.images[lightbox.index] : null;

  const uniqueImages = project.images.filter(
    (src, index, self) => self.indexOf(src) === index
  );
  const galleryImages = uniqueImages.filter((src) => src !== project.cover);

  const allImages: LbImage[] = [
    { src: project.cover, alt: project.title, title: project.title, series: project.subtitle },
    ...galleryImages.map((src, i) => ({
      src,
      alt: `${project.title} — ${i + 2}`,
      title: project.title,
      series: project.subtitle,
    })),
  ];

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <PageTransition>
      <div className="pt-16 px-8 pb-8">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/commercial"
            className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] hover:text-[#F2F0EB] transition-colors duration-300"
          >
            ← Commercial
          </Link>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16">
          <div className="md:col-span-1">
            <span className="font-body text-[9px] tracking-[0.2em] text-[#2A2826]">
              {project.id}
            </span>
          </div>
          <div className="md:col-span-7">
            <p className="font-body text-[9px] tracking-[0.35em] uppercase text-[#6B6560] mb-5">
              {project.subtitle}
            </p>
            <h1
              className="font-heading text-[#F2F0EB] mb-8"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}.
            </h1>
            <p className="font-body text-[#C8C4BC] text-sm leading-relaxed tracking-wide max-w-xl">
              {project.description}
            </p>
          </div>
          <div className="md:col-span-4 md:pl-8 flex flex-col gap-6 md:gap-8 mt-4 md:mt-0">
            <div>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] mb-2">
                Role
              </p>
              <p className="font-body text-[#C8C4BC] text-xs tracking-wide">
                {project.role}
              </p>
            </div>
            <div>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] mb-2">
                Year
              </p>
              <p className="font-body text-[#C8C4BC] text-xs tracking-wide">
                {project.year}
              </p>
            </div>
            <div>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] mb-2">
                Discipline
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
          </div>
        </div>

        {/* Hero image — capped at 80vh so portrait images don't dominate the scroll */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="relative w-full overflow-hidden bg-[#111] mb-4 cursor-pointer group"
          style={{ maxHeight: "80vh" }}
          onClick={() => setLightbox({ images: allImages, index: 0 })}
        >
          <Image
            src={project.cover}
            alt={project.title}
            width={0}
            height={0}
            sizes="100vw"
            className="img-natural transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            priority
          />
          <div className="absolute inset-0 bg-[#0D0D0D]/0 group-hover:bg-[#0D0D0D]/20 transition-colors duration-500" />
          {/* Hint that clicking opens the full image */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-body text-[9px] tracking-[0.2em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/50 px-3 py-2">
              View full ↗
            </span>
          </div>
        </motion.div>

        {/* Brief — long-form context */}
        {project.brief && (
          <motion.section
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="py-24 md:py-32"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560]">
                  The Brief
                </p>
              </div>
              <div className="md:col-span-8 md:col-start-5 space-y-6 max-w-2xl">
                {project.brief.map((para, i) => (
                  <p
                    key={i}
                    className="font-body leading-relaxed tracking-wide text-[#C8C4BC]"
                    style={{
                      fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                      fontWeight: 300,
                      lineHeight: 1.55,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Supporting images — natural aspect ratios, no cropping */}
        <div className="space-y-2">
          {galleryImages.map((src, i) => (
            <motion.div
              key={src}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 16 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 1,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="relative w-full overflow-hidden bg-[#111] cursor-pointer group"
              onClick={() => setLightbox({ images: allImages, index: i + 1 })}
            >
              <Image
                src={src}
                alt={`${project.title} ${i + 2}`}
                width={0}
                height={0}
                sizes="100vw"
                className="img-natural transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-[#0D0D0D]/0 group-hover:bg-[#0D0D0D]/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Selected episodes (only when project links to YouTube videos) */}
        {project.youtubeIds && project.youtubeIds.length > 0 && (
          <motion.section
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="mt-32 pt-16 border-t border-[#1E1C1A]"
          >
            <div className="flex items-center gap-8 mb-12">
              <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560]">
                Selected Episodes
              </span>
              <div className="flex-1 h-px bg-[#1E1C1A]" />
              <span className="font-body text-[9px] tracking-[0.2em] text-[#2A2826]">
                {String(project.youtubeIds.length).padStart(2, "0")}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {project.youtubeIds.map((id) => {
                const meta = selectedEpisodes.find((e) => e.id === id);
                if (!meta) return null;
                return (
                  <div key={id}>
                    <YouTubeEmbed id={id} title={meta.title} />
                    <div className="mt-3 flex items-baseline justify-between gap-4">
                      <p className="font-body text-[10px] tracking-[0.08em] text-[#9A9087] line-clamp-2">
                        {meta.title}
                      </p>
                      <span className="font-body text-[9px] tracking-[0.15em] uppercase text-[#2A2826] shrink-0">
                        {meta.show}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Next project */}
        <section className="mt-32 pt-16 border-t border-[#1E1C1A]">
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] mb-6">
            Next
          </p>
          <Link
            href={`/commercial/${next.slug}`}
            className="group block"
          >
            <h2
              className="font-heading text-[#F2F0EB] transition-opacity duration-300 group-hover:opacity-60"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
              }}
            >
              {next.title} →
            </h2>
            <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560] mt-3">
              {next.subtitle} — {next.year}
            </p>
          </Link>
        </section>
      </div>

      <div className="mt-32">
        <Footer />
      </div>

      <AnimatePresence>
        {lightbox && activeLbImg && (
          <Lightbox
            src={activeLbImg.src}
            alt={activeLbImg.alt}
            title={activeLbImg.title}
            series={activeLbImg.series}
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
