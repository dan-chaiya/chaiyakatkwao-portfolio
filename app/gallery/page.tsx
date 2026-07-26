"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PageTransition from "@/components/PageTransition";
import Lightbox from "@/components/Lightbox";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

const wovenMemories = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `No. ${String(i + 1).padStart(2, "0")}`,
  series: "Woven Memories",
  year: "2025",
  src: `/images/woven-memories/${String(i + 1).padStart(2, "0")}.jpg`,
}));

function toRoman(num: number): string {
  const map: [number, string][] = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let n = num;
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

// One unified "Selected Work" gallery — anonymous, sequenced Untitled I…N.
const selectedWorkSrcs = [
  ...Array.from({ length: 7 }, (_, i) => `/images/gallery/something-but-${String(i + 1).padStart(2, "0")}.jpg`),
  "/images/gallery/forms-05.jpg",
  "/images/gallery/portrait-01.jpg",
  "/images/gallery/forms-06.jpg",
  "/images/gallery/portrait-03.jpg",
  "/images/gallery/misc-01.jpg",
  "/images/gallery/film-01.jpg",
  "/images/gallery/forms-01.jpg",
  "/images/gallery/misc-02.jpg",
  "/images/gallery/portrait-05.jpg",
  "/images/gallery/portrait-02.jpg",
  "/images/gallery/forms-02.jpg",
  "/images/gallery/portrait-06.jpg",
  "/images/gallery/portrait-04.jpg",
  "/images/gallery/the101-01.jpg",
  "/images/gallery/forms-04.jpg",
  "/images/gallery/misc-03.jpg",
  "/images/gallery/forms-03.jpg",
  "/images/gallery/product-01.jpg",
  "/images/gallery/film-02.jpg",
];

const selectedWork = selectedWorkSrcs.map((src, i) => ({
  id: 200 + i,
  title: `Untitled ${toRoman(i + 1)}`,
  series: "Selected Work",
  year: "2024",
  src,
}));

type LightboxState = {
  items: GalleryItem[];
  index: number;
} | null;

type GalleryItem = {
  id: number;
  title: string;
  series: string;
  year: string;
  src: string;
};

function MasonryGrid({
  items,
  onOpen,
  sizes,
}: {
  items: GalleryItem[];
  onOpen: (item: GalleryItem, index: number) => void;
  sizes: string;
}) {
  return (
    <div className="masonry">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            delay: Math.min(index * 0.05, 0.5),
          }}
          className="masonry-item group cursor-pointer"
          onClick={() => onOpen(item, index)}
        >
          <div className="relative overflow-hidden bg-[var(--color-surface-elevated)]">
            <Image
              src={item.src}
              alt={`${item.title} - ${item.series} - Chaiya Katkwao Creative Producer`}
              width={0}
              height={0}
              sizes={sizes}
              priority={index < 2}
              className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-[var(--color-surface-chat)]/0 group-hover:bg-[var(--color-surface-chat)]/40 transition-colors duration-500" />
          </div>
          <div className="mt-2">
            <p className="font-body text-[11px] tracking-[0.08em] text-[var(--color-grey-300)]">{item.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = useCallback((seriesItems: GalleryItem[]) => (_item: GalleryItem, index: number) => {
    setLightbox({ items: seriesItems, index });
  }, []);

  const activeLbItem = lightbox ? lightbox.items[lightbox.index] : null;

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
            className="font-body text-[11px] tracking-[0.35em] uppercase text-[var(--color-grey-400)] mb-5"
          >
            Gallery
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
            Photographs /
            <br />
            &amp; prints.
          </motion.h1>
        </div>

        {/* Woven Memories series */}
        <div className="mb-28">
          <FadeIn>
            <div className="flex items-center gap-8 mb-12">
              <span className="font-body text-[11px] tracking-[0.3em] uppercase text-[var(--color-grey-400)]">
                Woven Memories
              </span>
              <div className="flex-1 h-px bg-[var(--color-border-muted)]" />
              <span className="font-body text-[11px] tracking-[0.2em] text-[var(--color-grey-500)]">2025</span>
            </div>
          </FadeIn>
          <MasonryGrid
            items={wovenMemories}
            onOpen={openLightbox(wovenMemories)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Selected Work — unified */}
        <div className="mb-28">
          <FadeIn>
            <div className="flex items-center gap-8 mb-12">
              <span className="font-body text-[11px] tracking-[0.3em] uppercase text-[var(--color-grey-400)]">
                Selected Work
              </span>
              <div className="flex-1 h-px bg-[var(--color-border-muted)]" />
              <span className="font-body text-[11px] tracking-[0.2em] text-[var(--color-grey-500)]">2024–2025</span>
            </div>
          </FadeIn>
          <MasonryGrid
            items={selectedWork}
            onOpen={openLightbox(selectedWork)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      <Footer />

      <AnimatePresence>
        {lightbox && activeLbItem && (
          <Lightbox
            src={activeLbItem.src}
            alt={activeLbItem.title}
            title={activeLbItem.title}
            series={activeLbItem.series}
            index={lightbox.index + 1}
            total={lightbox.items.length}
            hasPrev={lightbox.index > 0}
            hasNext={lightbox.index < lightbox.items.length - 1}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox((lb) => lb && { ...lb, index: lb.index - 1 })}
            onNext={() => setLightbox((lb) => lb && { ...lb, index: lb.index + 1 })}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
