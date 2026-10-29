import type { ImageFrame } from "@/data/works";

type Props = {
  frame: ImageFrame;
  alt: string;
  /** The rendered width, for the browser's srcset pick, e.g. "(max-width: 768px) 100vw, 50vw". */
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/** The srcset Picture uses for one format; also what a preload must name to hit the same file. */
export function srcSetOf(frame: ImageFrame, fmt: "avif" | "webp") {
  const thumbW = Math.round((frame.w * 800) / Math.max(frame.w, frame.h));
  return thumbW < frame.w ? `${frame.src}-800.${fmt} ${thumbW}w, ${frame.src}.${fmt} ${frame.w}w` : `${frame.src}.${fmt} ${frame.w}w`;
}

// A plain <picture> over the AVIF + WebP pairs scripts/import-assets.mjs writes, at
// two widths each. Not next/image: the files are already sized and encoded, so a
// second optimisation pass would only add work and Vercel image quota.
export default function Picture({ frame, alt, sizes, priority = false, className, style }: Props) {
  const srcSet = (fmt: "avif" | "webp") => srcSetOf(frame, fmt);

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <img
        src={`${frame.src}.webp`}
        srcSet={srcSet("webp")}
        sizes={sizes}
        width={frame.w}
        height={frame.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
        // Explicit ratio: the width/height attributes alone didn't reserve the box inside
        // <picture> (Lighthouse measured a 0.46 layout shift on Information, 2026-10-29).
        style={{ aspectRatio: `${frame.w} / ${frame.h}`, ...style }}
      />
    </picture>
  );
}
