"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { photoSize } from "@/lib/photos";

// The full view goes through the image optimizer at the screen's width, like every
// other photo on the site. Until 2026-10-04 it was a plain <img> of the original file:
// opening Knack Factory and stepping three times fetched 29.6 MB, one photo 11.8 MB.
// The originals on disk are untouched; only what is sent changes.
const FULL_SIZES = "100vw";

// Fetch the photos either side of the open one, so stepping through a set shows the
// next picture at once instead of waiting on the network.
function warm(src: string) {
  const { props } = getImageProps({ src, alt: "", sizes: FULL_SIZES, ...photoSize(src) });
  const img = new window.Image();
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
}

export interface LightboxProps {
  src: string;
  alt: string;
  title?: string;
  series?: string;
  index?: number;
  total?: number;
  hasPrev?: boolean;
  hasNext?: boolean;
  /** The photos either side, fetched ahead so a step shows at once. */
  prevSrc?: string;
  nextSrc?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Lightbox({
  src, alt, title, series, index, total,
  hasPrev, hasNext, prevSrc, nextSrc, onClose, onPrev, onNext,
}: LightboxProps) {
  const hasMultiple = (total ?? 0) > 1;

  // First-open swipe hint (B6): show briefly so users know the set changes. The
  // component mounts fresh each time the lightbox opens, so the hint starts on;
  // the effect only schedules its dismissal.
  const [showHint, setShowHint] = useState(hasMultiple);
  useEffect(() => {
    if (!hasMultiple) return;
    const t = setTimeout(() => setShowHint(false), 2600);
    return () => clearTimeout(t);
  }, [hasMultiple]);

  const handlePrev = useCallback(() => {
    if (!hasPrev) return;
    onPrev?.();
  }, [hasPrev, onPrev]);

  const handleNext = useCallback(() => {
    if (!hasNext) return;
    onNext?.();
  }, [hasNext, onNext]);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nextSrc) warm(nextSrc);
    if (prevSrc) warm(prevSrc);
  }, [prevSrc, nextSrc]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Move focus into the dialog on open and put it back where it came from on
  // close, so keyboard users are not dropped at the top of the document.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  // Trap Tab inside the dialog. Without this, tabbing walks the page behind the
  // overlay — which is inert to the eye but not to the keyboard.
  const handleTab = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) { e.preventDefault(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === dialogRef.current)) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault(); first.focus();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [handleTab]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  }, [onClose, handlePrev, handleNext]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title}${series ? `, ${series}` : ""}` : alt}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE.out }}
      className="fixed inset-0 z-[100] flex flex-col outline-none"
      style={{ backgroundColor: "color-mix(in srgb, var(--color-bg) 97%, transparent)" }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 py-5 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono font-medium text-[11px] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
          {series ?? ""}
        </span>
        <div className="flex items-center gap-6">
          {/* Live, so a step is heard: the arrow keys change the photo while focus
              stays where it is, and until 2026-10-04 a screen reader heard nothing. */}
          {index != null && total != null && (
            <span
              aria-live="polite"
              aria-atomic="true"
              className="font-mono font-medium text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] tabular-nums"
            >
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
              <span className="sr-only">: {alt}</span>
            </span>
          )}
          {/* X close button — 44px hit target (B6) */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-11 h-11 text-[var(--color-grey-200)] hover:text-[var(--color-text)] transition-colors duration-200 cursor-pointer border border-[var(--color-grey-500)] hover:border-[var(--color-grey-300)] hover:bg-[var(--color-text)]/10"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image + prev/next */}
      <div
        className="flex-1 flex items-center justify-center px-16 md:px-20 pb-8 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev — always rendered when multiple images; dims at boundary so users know direction exists */}
        {hasMultiple && (
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            className={`absolute left-2 md:left-6 z-10 flex items-center justify-center w-12 h-12 transition-colors duration-200 border ${
              hasPrev ? "text-[var(--color-grey-200)] hover:text-[var(--color-text)] border-[var(--color-grey-500)] hover:border-[var(--color-grey-300)] hover:bg-[var(--color-text)]/10 cursor-pointer" : "text-[var(--color-text-dim)] border-[var(--color-grey-600)] cursor-default"
            }`}
            aria-label="Previous image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 4L8 12L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Image. Mounted once per open: the scale-in is the arrival, and stepping
            through the set swaps the picture instantly. Prev/next is a key-repeat
            action (arrow keys), and animating each step made the set feel slow to
            flip through. exit still runs on close via the parent AnimatePresence. */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 250 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            // A flick counts as well as a long drag: velocity is px/s.
            if (info.offset.x < -60 || info.velocity.x < -110) handleNext();
            else if (info.offset.x > 60 || info.velocity.x > 110) handlePrev();
          }}
          className="relative flex items-center justify-center w-full select-none"
          style={{ maxHeight: "calc(100dvh - 140px)", cursor: "grab" }}
        >
          {/* dvh, not vh: on a phone 100vh is the height with the browser bars
              hidden, so the bottom of a portrait photo sat under the toolbar. */}
          <Image
            src={src}
            alt={alt}
            {...photoSize(src)}
            sizes={FULL_SIZES}
            loading="eager"
            draggable={false}
            style={{
              objectFit: "contain",
              width: "auto",
              height: "auto",
              maxHeight: "calc(100dvh - 140px)",
              maxWidth: "100%",
              display: "block",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Next — always rendered when multiple images; dims at boundary */}
        {hasMultiple && (
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`absolute right-2 md:right-6 z-10 flex items-center justify-center w-12 h-12 transition-colors duration-200 border ${
              hasNext ? "text-[var(--color-grey-200)] hover:text-[var(--color-text)] border-[var(--color-grey-500)] hover:border-[var(--color-grey-300)] hover:bg-[var(--color-text)]/10 cursor-pointer" : "text-[var(--color-text-dim)] border-[var(--color-grey-600)] cursor-default"
            }`}
            aria-label="Next image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 4L16 12L9 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* First-open swipe hint (B6). The page ground at 85% under the blur: the pill can
            sit on the photograph, and at 40% its text failed on dark photos in Light. */}
        <AnimatePresence>
          {hasMultiple && showHint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: EASE.out }}
              className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 border border-[var(--color-border-strong)] bg-[var(--color-bg)]/85 backdrop-blur-sm"
            >
              <span className="text-[13px] leading-none text-[var(--color-grey-300)]">‹</span>
              <span className="font-mono font-medium text-[11px] tracking-[0.18em] uppercase text-[var(--color-grey-300)]">
                Swipe or use arrows
              </span>
              <span className="text-[13px] leading-none text-[var(--color-grey-300)]">›</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Caption */}
      {title && (
        <div
          className="flex-shrink-0 px-8 pb-6"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="font-mono font-medium text-[11px] tracking-[0.08em] text-[var(--color-text-muted)]">{title}</span>
        </div>
      )}
    </motion.div>
  );
}
