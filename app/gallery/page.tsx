"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PageTransition from "@/components/PageTransition";
import Lightbox from "@/components/Lightbox";

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
  { id: 101, title: "Portrait I",    series: "Portraits",  year: "2024", src: "/images/gallery/portrait-01.jpg" },
  { id: 102, title: "Portrait II",   series: "Portraits",  year: "2024", src: "/images/gallery/portrait-02.jpg" },
  { id: 112, title: "Form I",        series: "Forms",      year: "2024", src: "/images/gallery/forms-01.jpg" },
  { id: 103, title: "Portrait III",  series: "Portraits",  year: "2024", src: "/images/gallery/portrait-03.jpg" },
  { id: 105, title: "Rust",          series: "Studies",    year: "2024", src: "/images/gallery/misc-01.jpg" },
  { id: 113, title: "Form II",       series: "Forms",      year: "2024", src: "/images/gallery/forms-02.jpg" },
  { id: 104, title: "Portrait IV",   series: "Portraits",  year: "2024", src: "/images/gallery/portrait-04.jpg" },
  { id: 115, title: "Portrait V",    series: "Portraits",  year: "2024", src: "/images/gallery/portrait-05.jpg" },
  { id: 106, title: "Study II",      series: "Studies",    year: "2024", src: "/images/gallery/misc-02.jpg" },
  { id: 116, title: "Portrait VI",   series: "Portraits",  year: "2024", src: "/images/gallery/portrait-06.jpg" },
  { id: 114, title: "Form III",      series: "Forms",      year: "2024", src: "/images/gallery/forms-03.jpg" },
  { id: 117, title: "Portrait VII",  series: "Portraits",  year: "2024", src: "/images/gallery/portrait-07.jpg" },
  { id: 108, title: "Still Life",    series: "Still Life", year: "2024", src: "/images/gallery/product-01.jpg" },
  { id: 118, title: "Portrait VIII", series: "Portraits",  year: "2024", src: "/images/gallery/portrait-08.jpg" },
  { id: 107, title: "Study III",     series: "Studies",    year: "2024", src: "/images/gallery/misc-03.jpg" },
  { id: 119, title: "Portrait IX",   series: "Portraits",  year: "2024", src: "/images/gallery/portrait-09.jpg" },
  { id: 109, title: "The 101",       series: "Film",       year: "2024", src: "/images/gallery/the101-01.jpg" },
  { id: 110, title: "Film I",        series: "Film",       year: "2024", src: "/images/gallery/film-01.jpg" },
  { id: 111, title: "Film II",       series: "Film",       year: "2024", src: "/images/gallery/film-02.jpg" },
];

type LightboxState = {
  src: string;
  alt: string;
  title?: string;
  series?: string;
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
  onOpen: (item: GalleryItem) => void;
  sizes: string;
}) {
  return (
    <div className="columns-1 md:columns-2 gap-4 md:gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 16 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            delay: (index % 2) * 0.1,
          }}
          className="break-inside-avoid mb-4 md:mb-6 group cursor-pointer"
          onClick={() => onOpen(item)}
        >
          <div className="relative overflow-hidden bg-[#111]">
            <Image
              src={item.src}
              alt={item.title}
              width={0}
              height={0}
              sizes={sizes}
              className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-[#0D0D0D]/0 group-hover:bg-[#0D0D0D]/50 transition-colors duration-500 flex items-end p-5">
              <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <p className="font-body text-[9px] tracking-[0.25em] uppercase text-[#9A9087] mb-1">
                  {item.series}
                </p>
                <p
                  className="font-heading text-[#F2F0EB] uppercase"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-body text-[10px] tracking-[0.08em] text-[#9A9087]">{item.title}</p>
            <span className="font-body text-[9px] tracking-[0.1em] text-[#2A2826]">{item.year}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = (item: GalleryItem) => {
    setLightbox({
      src: item.src,
      alt: item.title,
      title: item.title,
      series: item.series,
    });
  };

  return (
    <PageTransition>
      <div className="pt-32 px-8 pb-8">
        {/* Header */}
        <div className="mb-20">
          <p className="font-body text-[9px] tracking-[0.35em] uppercase text-[#6B6560] mb-5">
            Gallery
          </p>
          <h1
            className="font-heading text-[#F2F0EB]"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            Photographs /
            <br />
            &amp; prints.
          </h1>
        </div>

        {/* Woven Memories series */}
        <div className="mb-28">
          <div className="flex items-center gap-8 mb-12">
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560]">
              Woven Memories
            </span>
            <div className="flex-1 h-px bg-[#1E1C1A]" />
            <span className="font-body text-[9px] tracking-[0.2em] text-[#2A2826]">2025</span>
          </div>
          <MasonryGrid
            items={wovenMemories}
            onOpen={openLightbox}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Something But series */}
        <div className="mb-28">
          <div className="flex items-center gap-8 mb-12">
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560]">
              Something But
            </span>
            <div className="flex-1 h-px bg-[#1E1C1A]" />
            <span className="font-body text-[9px] tracking-[0.2em] text-[#2A2826]">2024</span>
          </div>
          <MasonryGrid
            items={somethingBut}
            onOpen={openLightbox}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Art Gallery series */}
        <div className="mb-28">
          <div className="flex items-center gap-8 mb-12">
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560]">
              Art Gallery
            </span>
            <div className="flex-1 h-px bg-[#1E1C1A]" />
            <span className="font-body text-[9px] tracking-[0.2em] text-[#2A2826]">2024</span>
          </div>
          <MasonryGrid
            items={artGallery}
            onOpen={openLightbox}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <footer className="border-t border-[#1E1C1A] px-8 py-8 flex items-center justify-between">
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
