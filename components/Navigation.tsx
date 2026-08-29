"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/commercial", label: "Commercial" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/chat", label: "Chat" },
];

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: "0.8rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
};

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on route change, so a tapped link — or a browser back — never leaves
  // the overlay up. Adjusting during render rather than in an effect: this is
  // derived state, and an effect here would cost an extra render pass.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  // While the overlay is up it is the only thing on screen: lock the page behind
  // it, close on Escape, and keep Tab inside it.
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); return; }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    window.addEventListener("keydown", onKeyDown);
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-[var(--color-surface)] focus:px-4 focus:py-2"
        style={{ ...MONO, color: "var(--color-text)" }}
      >
        Skip to content
      </a>

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 left-0 right-0 z-50"
        style={{
          borderBottom: "1px solid rgba(249,249,249,0.07)",
          minHeight: "var(--header-h)",
        }}
      >
        {/* Child 1: Logo | Child 2: Nav links — logo far left, links far right */}
        <div className="w-full flex justify-between items-center px-8" style={{ minHeight: "var(--header-h)", paddingBlock: "14px" }}>

          {/* Child 1 — Logo + optional page label (left) */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
                fontSize: "1.15rem",
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                textDecoration: "none",
              }}
            >
              CK
            </Link>
            {pathname !== "/" && (
              <span
                className="hidden lg:block"
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                }}
              >
                / {navLinks.find((l) => pathname.startsWith(l.href) && l.href !== "/")?.label}
              </span>
            )}
          </div>

          {/* Child 2 — Nav links + contact (right) */}
          <div className="hidden lg:flex items-center gap-x-8">
            <nav className="flex items-center gap-x-8" aria-label="Primary">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      ...MONO,
                      color: active ? "var(--color-text)" : "var(--color-grey-300)",
                      transition: "color 180ms ease",
                      position: "relative",
                      paddingBottom: "1px",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = active ? "var(--color-text)" : "var(--color-grey-300)"; }}
                  >
                    {link.label}
                    {active && (
                      <span style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        height: "1px", backgroundColor: "var(--color-accent)",
                      }} />
                    )}
                  </Link>
                );
              })}
            </nav>

            <a
              href="mailto:chaiyakatkwao@gmail.com"
              style={{
                ...MONO,
                color: "var(--color-grey-300)",
                transition: "color 180ms ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-grey-300)"; }}
            >
              Contact
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            ref={triggerRef}
            onClick={() => setOpen((v) => !v)}
            className="flex lg:hidden h-11 w-11 flex-col items-center justify-center gap-[5px]"
            style={{ color: "var(--color-text)" }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="block h-px bg-current transition-all duration-300 origin-center"
              style={{ width: "18px", transform: open ? "rotate(45deg) translateY(6px)" : "none" }} />
            <span className="block h-px bg-current transition-all duration-300"
              style={{ width: "18px", opacity: open ? 0 : 1 }} />
            <span className="block h-px bg-current transition-all duration-300 origin-center"
              style={{ width: "18px", transform: open ? "rotate(-45deg) translateY(-6px)" : "none" }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            <nav className="flex flex-col">
              {[...navLinks, { href: "mailto:chaiyakatkwao@gmail.com", label: "Contact" }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      color: "var(--color-text)",
                      letterSpacing: "-0.03em",
                      lineHeight: 0.9,
                      fontSize: "clamp(2.5rem, 10vw, 5rem)",
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(249,249,249,0.06)",
                      textDecoration: "none",
                      transition: "opacity 180ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.4"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <p
              className="absolute bottom-10 left-8"
              style={{ ...MONO, color: "var(--color-text-muted)" }}
            >
              Chaiya Katkwao / Creative Producer
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
