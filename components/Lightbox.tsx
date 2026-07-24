"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface LightboxProps {
  src: string;
  alt: string;
  title?: string;
  series?: string;
  index?: number;
  total?: number;
  hasPrev?: boolean;
  hasNext?: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Lightbox({
  src, alt, title, series, index, total,
  hasPrev, hasNext, onClose, onPrev, onNext,
}: LightboxProps) {
  const navigating = useRef(false);
  const hasMultiple = (total ?? 0) > 1;

  // First-open swipe hint (B6): show briefly so users know the set changes.
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    if (!hasMultiple) return;
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 2600);
    return () => clearTimeout(t);
  }, [hasMultiple]);

  // Debounce prevents page crash from rapid clicking
  const handlePrev = useCallback(() => {
    if (navigating.current || !hasPrev) return;
    navigating.current = true;
    onPrev?.();
    setTimeout(() => { navigating.current = false; }, 350);
  }, [hasPrev, onPrev]);

  const handleNext = useCallback(() => {
    if (navigating.current || !hasNext) return;
    navigating.current = true;
    onNext?.();
    setTimeout(() => { navigating.current = false; }, 350);
  }, [hasNext, onNext]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.97)" }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 py-5 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
          {series ?? ""}
        </span>
        <div className="flex items-center gap-6">
          {index != null && total != null && (
            <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] tabular-nums">
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          )}
          {/* X close button — 44px hit target (B6) */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-11 h-11 text-[var(--color-grey-200)] hover:text-white transition-all duration-200 cursor-pointer border border-[var(--color-grey-500)] hover:border-[var(--color-grey-300)] hover:bg-white/10"
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
            className={`absolute left-2 md:left-6 z-10 flex items-center justify-center w-12 h-12 transition-all duration-200 border ${
              hasPrev ? "text-[var(--color-grey-200)] hover:text-white border-[var(--color-grey-500)] hover:border-[var(--color-grey-300)] hover:bg-white/10 cursor-pointer" : "text-[#4A4844] border-[#3A3735] cursor-default"
            }`}
            aria-label="Previous image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 4L8 12L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Image */}
        <motion.div
          key={src}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 250 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) handleNext();
            if (info.offset.x > 60) handlePrev();
          }}
          className="relative flex items-center justify-center w-full select-none"
          style={{ maxHeight: "calc(100vh - 140px)", cursor: "grab" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{
              objectFit: "contain",
              maxHeight: "calc(100vh - 140px)",
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
            className={`absolute right-2 md:right-6 z-10 flex items-center justify-center w-12 h-12 transition-all duration-200 border ${
              hasNext ? "text-[var(--color-grey-200)] hover:text-white border-[var(--color-grey-500)] hover:border-[var(--color-grey-300)] hover:bg-white/10 cursor-pointer" : "text-[#4A4844] border-[#3A3735] cursor-default"
            }`}
            aria-label="Next image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 4L16 12L9 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* First-open swipe hint (B6) */}
        <AnimatePresence>
          {hasMultiple && showHint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 border border-[var(--color-border-strong)] bg-black/40 backdrop-blur-sm"
            >
              <span className="text-[13px] leading-none text-[var(--color-grey-300)]">‹</span>
              <span className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-grey-300)]">
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
          <span className="text-[11px] tracking-[0.08em] text-[var(--color-text-muted)]">{title}</span>
        </div>
      )}
    </motion.div>
  );
}
