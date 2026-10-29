"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Picture from "@/components/v2/Picture";
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

  // Pin the stage and run the image column up through the centre. Opacity/translate only.
  useLayoutEffect(() => {
    if (reduced || !stageRef.current || !columnRef.current) return;
    const ctx = gsap.context(() => {
      const col = columnRef.current!;
      gsap.fromTo(
        col,
        { y: () => window.innerHeight },
        {
          y: () => -col.offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: () => `+=${col.offsetHeight + window.innerHeight}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, stageRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <main id="main-content">
      <section className="v2-hero" aria-label="Chaiya Katkwao">
        <Picture frame={hero} alt="Self-portrait: a mirrored figure between the red gates of a temple" sizes="100vw" priority className="v2-hero__img" />
        <h1 className="v2-hero__name">Chaiya Katkwao&nbsp;©</h1>
        <p className="v2-hero__disc">
          {DISCIPLINES.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </p>
      </section>

      <section ref={stageRef} className={`v2-stage${reduced ? " v2-stage--static" : ""}`}>
        <p ref={nameRef} className="v2-stage__name" aria-hidden="true">
          Chaiya Katkwao
        </p>
        <div ref={columnRef} className="v2-stage__column">
          {column.map((item) => (
            <Link key={item.slug} href={`/work/${item.slug}`} className="v2-stage__item">
              <Picture frame={item.frame} alt={item.title} sizes="140px" />
              <span className="v2-mono">{item.no}</span>
            </Link>
          ))}
        </div>
        <p className="v2-stage__bio">
          Photographer, artist and producer.
          <br />
          Bangkok, Thailand.
        </p>
      </section>
    </main>
  );
}
