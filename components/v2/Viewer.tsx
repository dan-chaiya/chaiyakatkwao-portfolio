"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import Header from "@/components/v2/Header";
import Picture, { srcSetOf } from "@/components/v2/Picture";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { altOf, type Frame, type ImageFrame, type VideoFrame, type Work } from "@/data/works";

const pad = (n: number) => String(n).padStart(3, "0");

// Heights cycle so the frame size changes from one image to the next.
const HEIGHTS = [74, 58, 68, 80, 54, 64];

const sizesOf = (frame: ImageFrame, index: number) =>
  `(max-width: 768px) 100vw, ${Math.round((HEIGHTS[index % HEIGHTS.length] * frame.w) / frame.h)}vh`;

function FrameView({ frame, work, index }: { frame: Frame; work: Work; index: number }) {
  // Never taller than the stage (--stage-h, v2.css), or a tall frame runs into the
  // credits and the strip on tablets and short laptops.
  const maxH = `min(${HEIGHTS[index % HEIGHTS.length]}svh, var(--stage-h))`;
  const maxW = `min(88vw, ${work.maxEdge}px)`;

  if (frame.type === "image") {
    return (
      <Picture
        frame={frame}
        // The counter in the header already says which frame this is; the alt says what is in it.
        alt={altOf(frame) ?? `${work.title}, ${index + 1} of ${work.frames.length}`}
        sizes={sizesOf(frame, index)}
        priority={index === 0}
        className="v2-viewer__media"
        style={{ maxHeight: maxH, maxWidth: maxW }}
      />
    );
  }
  if (frame.type === "video") {
    // 28px under the video is the Play/Pause line.
    const videoH = `min(${HEIGHTS[index % HEIGHTS.length]}svh, var(--stage-h) - 28px)`;
    return <LoopingVideo key={frame.poster} frame={frame} style={{ maxHeight: videoH, maxWidth: maxW, aspectRatio: `${frame.w} / ${frame.h}` }} />;
  }
  return (
    <div className="v2-viewer__youtube">
      <YouTubeEmbed id={frame.id} title={frame.title} />
      <p className="v2-viewer__caption">{frame.title}</p>
    </div>
  );
}

// A loop runs past five seconds, so it gets a stop control (WCAG 2.2.2), and under
// reduced motion it waits on its poster until asked. No autoPlay attribute: it would
// start before the effect could check the setting.
function LoopingVideo({ frame, style }: { frame: VideoFrame; style: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ref.current?.play().catch(() => {});
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div className="v2-viewer__video">
      <video
        ref={ref}
        className="v2-viewer__media"
        style={style}
        poster={frame.poster}
        muted
        loop
        playsInline
        aria-label={frame.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {frame.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      <button type="button" className="v2-viewer__play" onClick={toggle}>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}

// 132px-tall thumbnails from scripts/thumbs.mjs (about 3 KB each; the -800 files were ~110 KB).
function thumbOf(frame: Frame) {
  if (frame.type === "image") return `${frame.src}-thumb.webp`;
  if (frame.type === "video") return frame.poster.replace(/\.jpg$/, "-thumb.webp");
  return `https://i.ytimg.com/vi/${frame.id}/default.jpg`;
}

export default function Viewer({ work }: { work: Work }) {
  const [i, setI] = useState(0);
  const [info, setInfo] = useState(false);
  const total = work.frames.length;
  const lock = useRef(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback((d: number) => setI((n) => Math.min(total - 1, Math.max(0, n + d))), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    // One frame per wheel gesture: a short lock stops a trackpad fling skipping ahead.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 12 || Date.now() < lock.current) return;
      if ((e.target as Element).closest(".v2-viewer__info")) return;
      lock.current = Date.now() + 650;
      go(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [go]);

  // Fetch the frames either side ahead, with the srcset and sizes the <picture> will use,
  // so a step shows at once instead of waiting on the network. AVIF only: the <picture>
  // serves AVIF wherever it decodes, and a browser that can't skips a preload typed
  // image/avif instead of fetching it, so it only loses the head start.
  useEffect(() => {
    for (const n of [i + 1, i - 1]) {
      const f = work.frames[n];
      if (f?.type !== "image") continue;
      preload(`${f.src}.avif`, { as: "image", type: "image/avif", imageSrcSet: srcSetOf(f, "avif"), imageSizes: sizesOf(f, n) });
    }
  }, [i, work]);

  const frame = work.frames[i];

  return (
    <>
      <Header right={<span aria-live="polite">{`${pad(i + 1)} of ${pad(total)}`}</span>} />
      <main
        id="main-content"
        className="v2-viewer"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <h1 className="v2-visually-hidden">{work.title}</h1>

        <div className="v2-viewer__stage">
          <button type="button" className="v2-viewer__hit v2-viewer__hit--prev" aria-label="Previous frame" onClick={() => go(-1)} disabled={i === 0} />
          <div key={i} className="v2-viewer__frame">
            <FrameView frame={frame} work={work} index={i} />
          </div>
          <button type="button" className="v2-viewer__hit v2-viewer__hit--next" aria-label="Next frame" onClick={() => go(1)} disabled={i === total - 1} />
        </div>

        <aside className="v2-viewer__credits">
          <p className="v2-viewer__title">
            <span className="v2-mono">{work.no}</span> {work.title}
          </p>
          <dl>
            {work.credit && (
              <>
                <dt>Role</dt>
                <dd>{work.credit}</dd>
              </>
            )}
            {work.exhibited && (
              <>
                <dt>Exhibited</dt>
                <dd>{work.exhibited}</dd>
              </>
            )}
            {work.year && (
              <>
                <dt>Year</dt>
                <dd className="v2-mono">{work.year}</dd>
              </>
            )}
          </dl>
          {work.statement && (
            <button type="button" className="v2-viewer__toggle" aria-expanded={info} aria-controls="work-info" onClick={() => setInfo((v) => !v)}>
              {info ? "Close" : "Info"}
            </button>
          )}
        </aside>

        {work.statement && (
          <div id="work-info" className="v2-viewer__info" hidden={!info}>
            <p>{work.statement}</p>
          </div>
        )}

        <nav className="v2-viewer__strip" aria-label="Frames">
          {work.frames.map((f, n) => (
            <button key={n} type="button" aria-label={`Frame ${n + 1}`} aria-current={n === i} onClick={() => setI(n)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbOf(f)} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </nav>
      </main>
    </>
  );
}
