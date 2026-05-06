"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PageTransition from "@/components/PageTransition";

type HeroSlide =
  | { type: "video"; src: string }
  | { type: "image"; src: string; alt: string };

const heroSlides: HeroSlide[] = [
  { type: "video", src: "/videos/live-commerce/tokfashion.mp4" },
  { type: "image", src: "/images/woven-memories/01.jpg", alt: "Woven Memories" },
  { type: "video", src: "/videos/live-commerce/her-hyness.mp4" },
  { type: "image", src: "/images/knack-factory/01.jpg", alt: "Knack Factory" },
  { type: "video", src: "/videos/live-commerce/fitflop.mp4" },
  { type: "image", src: "/images/bakao/01.jpg", alt: "BAKAO" },
  { type: "video", src: "/videos/live-commerce/sunnies.mp4" },
  { type: "image", src: "/images/khun-chang-khian/01.jpg", alt: "Khun Chang Khian" },
  { type: "video", src: "/videos/live-commerce/dmd-live.mp4" },
  { type: "image", src: "/images/podcast/01.jpg", alt: "Podcast & Studio" },
  { type: "video", src: "/videos/live-commerce/nestle.mp4" },
];

const HERO_INTERVAL = 6000;

const projects = [
  {
    title: "Woven Memories",
    year: "2025",
    category: "Personal Project",
    href: "/gallery",
    cover: "/images/woven-memories/01.jpg",
  },
  {
    title: "Knack Factory",
    year: "2024",
    category: "Commission",
    href: "/commercial/knack-factory",
    cover: "/images/knack-factory/01.jpg",
  },
  {
    title: "Podcast & Studio",
    year: "2025–2026",
    category: "Commission",
    href: "/commercial/podcast-studio",
    cover: "/images/podcast/01.jpg",
  },
];

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % heroSlides.length);
    }, HERO_INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative h-screen overflow-hidden bg-[#0D0D0D]"
    >
      {heroSlides.map((slide, i) =>
        slide.type === "video" ? (
          <video
            key={slide.src}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={slide.src}
            poster="/images/woven-memories/01.jpg"
            autoPlay={i === 0}
            muted
            loop
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={i <= 2}
            className={`object-cover transition-opacity duration-[1200ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        )
      )}
      <div className="absolute inset-0 bg-[#0D0D0D]/55" />

      <motion.div
        style={{ y }}
        className="relative h-full flex flex-col justify-between px-8 pt-[140px] pb-12"
      >
        <div>
          <p className="font-body text-[9px] tracking-[0.35em] uppercase text-[#9A9087] mb-10">
            Creative Producer — Bangkok
          </p>
          <h1
            className="font-heading text-[#F2F0EB]"
            style={{
              fontSize: "clamp(4rem, 11vw, 10rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
            }}
          >
            Chaiya /
            <br />
            Katkwao.
          </h1>
        </div>

        <div className="flex items-end justify-between">
          <p className="font-body text-[#6B6560] text-[10px] tracking-[0.15em] uppercase leading-loose">
            Art direction. /
            <br />
            Production. Photography.
          </p>
          <span className="font-body text-[9px] tracking-[0.2em] uppercase text-[#9A9087] tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />

      {/* Work section */}
      <section className="px-8 pb-40">
        <div className="flex items-center gap-8 mb-8">
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560]">
            Selected work
          </span>
          <div className="flex-1 h-px bg-[#1E1C1A]" />
        </div>

        {/* Horizontal filmstrip — equal height, each image at cover within its slot */}
        <div className="flex flex-col md:flex-row gap-[3px] md:h-[68vh]">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="relative flex-1 overflow-hidden bg-[#111] h-[65vw] md:h-auto"
            >
              <Link href={project.href} className="group block h-full relative">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-[#0D0D0D]/0 group-hover:bg-[#0D0D0D]/45 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#9A9087] mb-1.5">
                    {project.category}
                  </p>
                  <p
                    className="font-heading text-[#F2F0EB] uppercase"
                    style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em" }}
                  >
                    {project.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Metadata strip below filmstrip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[3px] mt-3">
          {projects.map((project) => (
            <div key={project.title} className="flex items-baseline justify-between">
              <p className="font-body text-[#C8C4BC] text-sm tracking-wide" style={{ fontWeight: 300 }}>
                {project.title}
              </p>
              <span className="font-body text-[9px] tracking-[0.15em] text-[#6B6560]">
                {project.year}
              </span>
            </div>
          ))}
        </div>
      </section>

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
    </PageTransition>
  );
}
