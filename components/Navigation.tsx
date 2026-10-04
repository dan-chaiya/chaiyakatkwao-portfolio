"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import ThemeToggle from "@/components/ThemeToggle";

// No "Home": the CK mark at the far left is the way home, as on most portfolios
// (2026-09-27).
const navLinks = [
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
  // it, close on Escape, and keep Tab inside it. The loop runs through the close
  // button too: it sits in the header, outside the overlay, and until 2026-10-04 Tab
  // never reached it, so a keyboard could close the menu only with Escape.
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); return; }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = [
        ...(triggerRef.current ? [triggerRef.current] : []),
        ...menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ];
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

      <header
        className="sticky top-0 left-0 right-0 z-50"
        style={{
          // Opaque, as DESIGN.md always described it: without a ground of its own the
          // sticky header let the page scroll through under the mark, the links and the
          // theme switch (until 2026-09-23).
          backgroundColor: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border-faint)",
          minHeight: "var(--header-h)",
        }}
      >
        {/* Child 1: Logo | Child 2: Nav links — logo far left, links far right */}
        <div className="w-full flex justify-between items-center px-8" style={{ minHeight: "var(--header-h)", paddingBlock: "14px" }}>

          {/* Child 1 — Logo (left). The "/ Page" label that sat beside it was dropped
              on 2026-09-27: the underlined nav link and the page's own label already
              name the page. */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label="Chaiya Katkwao, home"
              className="tap-target"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "1.15rem",
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                textDecoration: "none",
              }}
            >
              CK
            </Link>
          </div>

          {/* Child 2 — Nav links + contact on desktop, the theme switch, and the
              hamburger on mobile (right) */}
          <div className="flex items-center gap-x-4 lg:gap-x-8">
            <div className="hidden lg:flex items-center gap-x-8">
              <nav className="flex items-center gap-x-8" aria-label="Primary">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`tap-target relative pb-px transition-colors duration-[180ms] hover:text-[var(--color-text)] ${
                        active ? "text-[var(--color-text)]" : "text-[var(--color-grey-300)]"
                      }`}
                      style={MONO}
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
                className="tap-target text-[var(--color-grey-300)] transition-colors duration-[180ms] hover:text-[var(--color-text)]"
                style={MONO}
              >
                Contact
              </a>
            </div>

            <ThemeToggle />

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
              <span className="block h-px bg-current transition-[transform,opacity] duration-200 ease-out origin-center"
                style={{ width: "18px", transform: open ? "rotate(45deg) translateY(6px)" : "none" }} />
              <span className="block h-px bg-current transition-[transform,opacity] duration-200 ease-out"
                style={{ width: "18px", opacity: open ? 0 : 1 }} />
              <span className="block h-px bg-current transition-[transform,opacity] duration-200 ease-out origin-center"
                style={{ width: "18px", transform: open ? "rotate(-45deg) translateY(-6px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay. It scrolls itself and centres the links with auto
          margins, which fall back to the top instead of pushing past it: on a phone
          turned sideways (844 x 390) the centred list used to run off both ends of a
          locked page, with Commercial behind the header and Contact below the screen.
          The links size on the smaller of width and height for the same reason, and
          the name line sits in flow under them rather than over them. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain px-8"
            style={{ backgroundColor: "var(--color-bg)", paddingTop: "var(--header-h)" }}
          >
            <nav className="my-auto flex flex-col py-8" aria-label="Menu">
              {[...navLinks, { href: "mailto:chaiyakatkwao@gmail.com", label: "Contact" }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: EASE.out }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="block transition-opacity duration-[180ms] hover:opacity-40"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      color: "var(--color-text)",
                      letterSpacing: "-0.03em",
                      lineHeight: 0.9,
                      fontSize: "clamp(2rem, min(10vw, 9svh), 5rem)",
                      padding: "14px 0",
                      borderBottom: "1px solid var(--color-border-faint)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <p className="shrink-0 pb-10" style={{ ...MONO, color: "var(--color-text-muted)" }}>
              Chaiya Katkwao / Creative Producer
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
