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

const somethingBut = Array.from({ length: 7 }, (_, i) => ({
  id: 200 + i,
  title: `Something But ${String(i + 1).padStart(2, "0")}`,
  series: "Something But",
  year: "2024",
  src: `/images/gallery/something-but-${String(i + 1).padStart(2, "0")}.jpg`,
}));

const artGallery = [
  { id: 116, title: "Form V",        series: "Forms",      year: "2024", src: "/images/gallery/forms-05.jpg" },   // P 3:4
  { id: 101, title: "Portrait I",    series: "Portraits",  year: "2024", src: "/images/gallery/portrait-01.jpg" }, // L 3:2
  { id: 117, title: "Form VI",       series: "Forms",      year: "2024", src: "/images/gallery/forms-06.jpg" },   // P 3:4
  { id: 103, title: "Portrait III",  series: "Portraits",  year: "2024", src: "/images/gallery/portrait-03.jpg" }, // S 1:1
  { id: 105, title: "Rust",          series: "Studies",    year: "2024", src: "/images/gallery/misc-01.jpg" },     // L 3:2
  { id: 110, title: "Film I",        series: "Film",       year: "2024", src: "/images/gallery/film-01.jpg" },     // P 2:3
  { id: 112, title: "Form I",        series: "Forms",      year: "2024", src: "/images/gallery/forms-01.jpg" },   // S 1:1
  { id: 106, title: "Study II",      series: "Studies",    year: "2024", src: "/images/gallery/misc-02.jpg" },     // L 3:2
  { id: 118, title: "Portrait V",    series: "Portraits",  year: "2024", src: "/images/gallery/portrait-05.jpg" }, // P 4:5
  { id: 102, title: "Portrait II",   series: "Portraits",  year: "2024", src: "/images/gallery/portrait-02.jpg" }, // L 3:2
  { id: 113, title: "Form II",       series: "Forms",      year: "2024", src: "/images/gallery/forms-02.jpg" },   // S 1:1
  { id: 119, title: "Portrait VI",   series: "Portraits",  year: "2024", src: "/images/gallery/portrait-06.jpg" }, // P 2:3
  { id: 104, title: "Portrait IV",   series: "Portraits",  year: "2024", src: "/images/gallery/portrait-04.jpg" }, // S 1:1
  { id: 109, title: "The 101",       series: "Film",       year: "2024", src: "/images/gallery/the101-01.jpg" },   // L 3:2
  { id: 115, title: "Form IV",       series: "Forms",      year: "2024", src: "/images/gallery/forms-04.jpg" },   // P 3:4
  { id: 107, title: "Study III",     series: "Studies",    year: "2024", src: "/images/gallery/misc-03.jpg" },     // L 3:2
  { id: 114, title: "Form III",      series: "Forms",      year: "2024", src: "/images/gallery/forms-03.jpg" },   // S 1:1
  { id: 108, title: "Still Life",    series: "Still Life", year: "2024", src: "/images/gallery/product-01.jpg" }, // P 3:4
  { id: 111, title: "Film II",       series: "Film",       year: "2024", src: "/images/gallery/film-02.jpg" },     // L 3:2
];

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
              alt={item.title}
              width={0}
              height={0}
              sizes={sizes}
              priority={index < 2}
              className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-[var(--color-surface-chat)]/0 group-hover:bg-[var(--color-surface-chat)]/50 transition-colors duration-500 flex items-end p-5">
              <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <p className="font-body text-[9px] tracking-[0.25em] uppercase text-[var(--color-grey-400)] mb-1">
                  {item.series}
                </p>
                <p
                  className="font-heading text-[var(--color-warm)] uppercase"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-body text-[10px] tracking-[0.08em] text-[var(--color-grey-400)]">{item.title}</p>
            <span className="font-body text-[9px] tracking-[0.1em] text-[var(--color-grey-700)]">{item.year}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = useCallback((seriesItems: GalleryItem[]) => (item: GalleryItem, index: number) => {
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
            className="font-body text-[9px] tracking-[0.35em] uppercase text-[var(--color-grey-500)] mb-5"
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
              <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[var(--color-grey-500)]">
                Woven Memories
              </span>
              <div className="flex-1 h-px bg-[var(--color-border-muted)]" />
              <span className="font-body text-[9px] tracking-[0.2em] text-[var(--color-grey-700)]">2025</span>
            </div>
          </FadeIn>
          <MasonryGrid
            items={wovenMemories}
            onOpen={openLightbox(wovenMemories)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Something But series */}
        <div className="mb-28">
          <FadeIn>
            <div className="flex items-center gap-8 mb-12">
              <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[var(--color-grey-500)]">
                Something But
              </span>
              <div className="flex-1 h-px bg-[var(--color-border-muted)]" />
              <span className="font-body text-[9px] tracking-[0.2em] text-[var(--color-grey-700)]">2024</span>
            </div>
          </FadeIn>
          <MasonryGrid
            items={somethingBut}
            onOpen={openLightbox(somethingBut)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Selected Works series */}
        <div className="mb-28">
          <FadeIn>
            <div className="flex items-center gap-8 mb-12">
              <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[var(--color-grey-500)]">
                Selected Works
              </span>
              <div className="flex-1 h-px bg-[var(--color-border-muted)]" />
              <span className="font-body text-[9px] tracking-[0.2em] text-[var(--color-grey-700)]">2024</span>
            </div>
          </FadeIn>
          <MasonryGrid
            items={artGallery}
            onOpen={openLightbox(artGallery)}
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
