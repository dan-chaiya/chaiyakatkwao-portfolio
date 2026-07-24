"use client";

// components/MotionMedia.tsx — the ONLY way motion assets render across the site.
// Poster paints immediately (LCP-safe); the <video> is mounted lazily via
// IntersectionObserver and paused when off-screen. prefers-reduced-motion and
// Save-Data collapse to the poster/still only. Resolves assets from the media manifest.
//
// Next 16 / React 19. Reads data/media-manifest.ts (see FRONTEND_SPEC §1.6).

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getAsset, hasMotion, type MotionAsset } from "@/data/media-manifest";

type Props = {
  id?: string;                 // manifest id, e.g. "woven-01"
  asset?: MotionAsset;         // or pass the asset directly
  fit?: "cover" | "contain";   // default "cover"
  priority?: boolean;          // hero only → eager poster + preload
  className?: string;
  style?: React.CSSProperties;
};

function useSaveData(): boolean {
  const [save, setSave] = useState(false);
  useEffect(() => {
    const c = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (c?.saveData) setSave(true);
  }, []);
  return save;
}

export default function MotionMedia({ id, asset, fit = "cover", priority = false, className, style }: Props) {
  const resolved = asset ?? (id ? getAsset(id) : undefined);
  const reduced = useReducedMotion();
  const saveData = useSaveData();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mount, setMount] = useState(false);   // has the <video> been created?
  const [ready, setReady] = useState(false);   // has it painted a frame?

  const motionOk = !!resolved && hasMotion(resolved) && !reduced && !saveData;

  // Mount video when the wrapper enters the viewport (200px pre-roll).
  useEffect(() => {
    if (!motionOk || !wrapRef.current) return;
    const el = wrapRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0]?.isIntersecting;
        if (on) setMount(true);
        const v = videoRef.current;
        if (!v) return;
        if (on) void v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionOk]);

  if (!resolved) {
    return <div className={className} style={{ background: "#0A0A0A", ...style }} aria-hidden />;
  }

  const objectFit = fit;
  const poster = resolved.poster ?? resolved.still?.[0]?.src;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", background: "#0A0A0A", ...style }}
    >
      {/* Poster / still — always present, provides the LCP frame and reduced-motion fallback */}
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt={resolved.alt}
          loading={priority ? "eager" : "lazy"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit,
            opacity: ready ? 0 : 1,
            transition: "opacity 400ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      )}

      {motionOk && mount && (
        <video
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "none"}
          aria-label={resolved.alt}
          onCanPlay={() => setReady(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit }}
        >
          {resolved.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </div>
  );
}
