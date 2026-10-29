"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Picture from "@/components/v2/Picture";
import { DISCIPLINES, coverOf, hasPage, linkOf, type Discipline, type Work } from "@/data/works";

type Filter = "All" | Discipline;

// Widths and offsets for the image field, cycled so the field reads as placed, not gridded.
const FIELD = [
  { w: 46, ml: 0 },
  { w: 28, ml: 14 },
  { w: 34, ml: 52 },
  { w: 24, ml: 8 },
  { w: 40, ml: 30 },
  { w: 30, ml: 62 },
];

export default function IndexView({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [hover, setHover] = useState<Work | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const shown = works.filter((w) => filter === "All" || w.discipline === filter);
  const hoverCover = hover && coverOf(hover);

  // The preview follows the pointer; transform only, no layout.
  const move = (e: React.PointerEvent) => {
    previewRef.current?.style.setProperty("transform", `translate(${e.clientX + 24}px, ${e.clientY - 60}px)`);
  };

  return (
    <main id="main-content" className="v2-index">
      <div className="v2-index__table" onPointerMove={move} onPointerLeave={() => setHover(null)}>
        <h1 className="v2-visually-hidden">Index</h1>
        <table>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Title</th>
              <th scope="col" className="v2-index__disc">Discipline</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((w) => {
              const href = linkOf(w);
              const linked = Boolean(href);
              return (
                <tr
                  key={w.slug}
                  className={linked ? "is-linked" : undefined}
                  onPointerEnter={() => setHover(hasPage(w) ? w : null)}
                >
                  <td className="v2-mono">{w.no}</td>
                  <td>
                    {href ? (
                      <Link href={href} onFocus={() => setHover(hasPage(w) ? w : null)} onBlur={() => setHover(null)}>
                        {w.title}
                      </Link>
                    ) : (
                      w.title
                    )}
                  </td>
                  <td className="v2-index__disc">{w.discipline}</td>
                  <td className="v2-mono">{w.year || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="v2-index__field" aria-hidden="true">
        {shown.filter(hasPage).map((w, i) => {
          const cover = coverOf(w);
          if (!cover) return null;
          const { w: width, ml } = FIELD[i % FIELD.length];
          return (
            <Link
              key={w.slug}
              href={`/work/${w.slug}`}
              tabIndex={-1}
              className="v2-index__figure"
              style={{ width: `${width}%`, marginLeft: `${ml}%` }}
            >
              <Picture frame={cover} alt="" sizes={`${Math.round(width * 0.56)}vw`} />
              <span className="v2-mono">{w.no}</span>
            </Link>
          );
        })}
      </div>

      <div ref={previewRef} className={`v2-index__preview${hoverCover ? " is-on" : ""}`} aria-hidden="true">
        {hoverCover && <Picture frame={hoverCover} alt="" sizes="220px" />}
      </div>

      <div role="group" className="v2-filter" aria-label="Filter by discipline">
        {(["All", ...DISCIPLINES] as Filter[]).map((d) => (
          <button key={d} type="button" aria-pressed={filter === d} onClick={() => setFilter(d)}>
            {d}
          </button>
        ))}
      </div>
    </main>
  );
}
