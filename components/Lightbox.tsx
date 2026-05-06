"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LightboxProps {
  src: string;
  alt: string;
  title?: string;
  series?: string;
  onClose: () => void;
}

export default function Lightbox({ src, alt, title, series, onClose }: LightboxProps) {
  // Lock scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

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
        className="flex items-center justify-between px-8 py-6 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#6B6560]">
          {series ?? ""}
        </span>
        <button
          onClick={onClose}
          className="text-[9px] tracking-[0.3em] uppercase text-[#6B6560] hover:text-[#C8C4BC] transition-colors duration-300 cursor-pointer"
        >
          ESC / CLOSE
        </button>
      </div>

      {/* Image container */}
      <div
        className="flex-1 flex items-center justify-center px-8 pb-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 250,
          }}
          className="relative flex items-center justify-center w-full"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            style={{
              objectFit: "contain",
              maxHeight: "calc(100vh - 120px)",
              maxWidth: "100%",
              display: "block",
            }}
          />
        </motion.div>
      </div>

      {/* Caption */}
      {title && (
        <div
          className="flex-shrink-0 px-8 pb-6 flex items-center justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[10px] tracking-[0.08em] text-[#6B6560]">{title}</span>
        </div>
      )}

      {/* Click backdrop to close — handled on the outer div */}
    </motion.div>
  );
}
