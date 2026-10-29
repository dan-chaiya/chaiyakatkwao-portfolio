"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Picture from "@/components/v2/Picture";
import SmoothScroll from "@/components/v2/SmoothScroll";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { DISCIPLINES, type ImageFrame } from "@/data/works";

gsap.registerPlugin(ScrollTrigger);

type ColumnItem = { no: string; slug: string; title: string; frame: ImageFrame };

export default function HomeStage({ hero, column }: { hero: ImageFrame; column: ColumnItem[] }) {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);

  // Set the name edge to edge: measure at 100px, scale to the stage width.
  useLayoutEffect(() => {
    const name = nameRef.current;
    if (!name) return;
    const fit = () => {
      name.style.fontSize = "100px";
      name.style.fontSize = `${(100 * (name.parentElement!.clientWidth - 24)) / name.scrollWidth}px`;
    };
    fit();
    document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Hold the stage with CSS sticky and run the image column up through the centre,
  // transform only. Not a GSAP pin: toggling the pin's position counted as a layout
  // shift on every visit (CLS 0.63 at 1440, 1.0 at 390; audit 2026-10-29).
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const col = columnRef.current;
    if (reduced || !stage || !col) return;
    // The section is as tall as the run, so the sticky layer holds for exactly that long.
    const run = () => col.offsetHeight + window.innerHeight;
    const size = () => stage.style.setProperty("--run", `${run()}px`);
    size();
    ScrollTrigger.addEventListener("refreshInit", size);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        col,
        { y: () => window.innerHeight },
        {
          y: () => -col.offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${run()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, stage);
    return () => {
      ScrollTrigger.removeEventListener("refreshInit", size);
      ctx.revert();
      stage.style.removeProperty("--run");
    };
  }, [reduced]);

  return (
    <main id="main-content">
      {/* Lenis and GSAP only here, where the scroll drives the stage; every other page
          scrolls natively and doesn't load them (audit 2026-10-29). */}
      <SmoothScroll />
      <section className="v2-hero" aria-label="Chaiya Katkwao">
        <div className="v2-hero__frame">
          <Picture frame={hero} alt="Self-portrait: a mirrored figure between the red gates of a temple" sizes="100vw" priority className="v2-hero__img" />
          <div className="v2-hero__title">
            <h1 className="v2-hero__name">Chaiya Katkwao&nbsp;©</h1>
            {/* The first screen says what he does; before, only the name was on it. */}
            <p className="v2-hero__role">Photographer, artist and producer, Bangkok</p>
          </div>
        </div>
        {/* On paper, under the photo: on it, "Art" and "Production" fell to 3.6:1 (audit 2026-10-29). */}
        <p className="v2-hero__disc">
          {DISCIPLINES.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </p>
      </section>

      <section ref={stageRef} className={`v2-stage${reduced ? " v2-stage--static" : ""}`}>
        <div className="v2-stage__hold">
          <p ref={nameRef} className="v2-stage__name" aria-hidden="true">
            Chaiya Katkwao
          </p>
          <div ref={columnRef} className="v2-stage__column">
            {column.map((item) => (
              <Link key={item.slug} href={`/work/${item.slug}`} className="v2-stage__item">
                <Picture frame={item.frame} alt={item.title} sizes="(max-width: 767px) 42vw, 20vw" />
                <span className="v2-mono">{item.no}</span>
              </Link>
            ))}
          </div>
          <p className="v2-stage__bio">
            Photographer, artist and producer.
            <br />
            Bangkok, Thailand.
          </p>
        </div>
      </section>
    </main>
  );
}
