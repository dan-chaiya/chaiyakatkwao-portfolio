"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Work" },
  { href: "/commercial", label: "Commercial" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
      >
        <Link
          href="/"
          className="font-heading text-sm tracking-[0.15em] uppercase text-[#F2F0EB]"
          style={{ fontWeight: 900 }}
        >
          CK
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-body text-[10px] tracking-[0.2em] uppercase text-[#F2F0EB] transition-opacity duration-300 hover:opacity-60"
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-[#F2F0EB]"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 text-[#F2F0EB]"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className="block h-px bg-current transition-all duration-300 origin-center"
            style={{ width: "20px", transform: open ? "rotate(45deg) translateY(7px)" : "none" }}
          />
          <span
            className="block h-px bg-current transition-all duration-300"
            style={{ width: "20px", opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-px bg-current transition-all duration-300 origin-center"
            style={{ width: "20px", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }}
          />
        </button>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0D0D0D] flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-0">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-heading text-[#F2F0EB] uppercase block py-3 border-b border-[#1E1C1A] hover:text-[#9A9087] transition-colors duration-300"
                    style={{
                      fontSize: "clamp(2.5rem, 10vw, 4.5rem)",
                      lineHeight: 0.92,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="absolute bottom-12 left-8 right-8 flex items-center justify-between">
              <p className="font-body text-[9px] tracking-[0.25em] uppercase text-[#2A2826]">
                Creative Producer — Bangkok
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
