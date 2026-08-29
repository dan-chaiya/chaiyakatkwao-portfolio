"use client";

// components/CommercialList.tsx — scannable list view for /commercial (fixes B3).
// Rows load instantly (scannability > entrance); a cover thumbnail reveals on hover/focus.
// Every row is a real <Link>, so the list is fully keyboard-navigable. Motion is presentation
// only — the original cover images are shown untouched.

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/commercial";

export default function CommercialList({ projects }: { projects: Project[] }) {
  return (
    <div style={{ borderTop: "1px solid var(--color-border)" }}>
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/commercial/${project.slug}`}
          className="group relative grid grid-cols-12 items-center gap-4 px-1 py-6 md:py-7"
          style={{ borderBottom: "1px solid var(--color-border)", textDecoration: "none" }}
        >
          {/* Index */}
          <span className="col-span-2 md:col-span-1 mono-label" style={{ color: "var(--color-text-muted)" }}>
            {project.id}
          </span>

          {/* Title — nudges right on hover/focus */}
          <span
            className="col-span-10 md:col-span-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontSize: "clamp(1.15rem, 2.4vw, 1.9rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--color-warm)",
            }}
          >
            {project.title}
          </span>

          {/* Role */}
          <span className="col-span-6 md:col-span-3 mono-label" style={{ color: "var(--color-text-muted)" }}>
            {project.role}
          </span>

          {/* Tags */}
          <span className="col-span-4 md:col-span-3 hidden md:flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="mono-label"
                style={{ color: "var(--color-text-muted)", border: "1px solid var(--color-border-muted)", padding: "3px 7px" }}
              >
                {tag}
              </span>
            ))}
          </span>

          {/* Year — turns amber on hover */}
          <span
            className="col-span-6 md:col-span-1 md:text-right mono-label tabular-nums transition-colors duration-300 group-hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {project.year}
          </span>

          {/* Hover thumbnail (desktop) — the cover, revealed, never altered */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-24 top-1/2 z-10 hidden -translate-y-1/2 overflow-hidden opacity-0 transition-all duration-300 ease-out lg:block group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ width: "92px", height: "120px", transform: "translateY(-50%) scale(0.96)" }}
          >
            <Image src={project.cover} alt={`${project.title} - Creative Producer Portfolio`} fill sizes="92px" className="object-cover" />
          </span>
        </Link>
      ))}
    </div>
  );
}
