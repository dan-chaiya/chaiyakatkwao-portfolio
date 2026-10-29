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

// A plain <picture> over the AVIF + WebP pairs scripts/import-assets.mjs writes, at
// two widths each. Not next/image: the files are already sized and encoded, so a
// second optimisation pass would only add work and Vercel image quota.
export default function Picture({ frame, alt, sizes, priority = false, className, style }: Props) {
  const thumbW = Math.round((frame.w * 800) / Math.max(frame.w, frame.h));
  const srcSet = (fmt: string) =>
    thumbW < frame.w ? `${frame.src}-800.${fmt} ${thumbW}w, ${frame.src}.${fmt} ${frame.w}w` : `${frame.src}.${fmt} ${frame.w}w`;

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
        style={style}
      />
    </picture>
  );
}
