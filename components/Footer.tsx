"use client";

import Link from "next/link";

const links = [
  { href: "/commercial", label: "Commercial" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  // external: true renders a plain <a>, which is required here and not a style
  // choice. /systems is a static HTML file served out of public/, not a Next
  // route, so next/link's client-side navigation would fail to find it.
  { href: "/systems", label: "Systems", external: true },
  { href: "mailto:chaiyakatkwao@gmail.com", label: "Email", external: true },
];

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  transition: "color 180ms ease",
};

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(249,249,249,0.07)", paddingTop: "24px", paddingBottom: "24px" }}>
      <div
        className="section-shell"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}
      >
        <p style={{ ...MONO, color: "var(--color-text-muted)" }}>
          © 2026 Chaiya Katkwao — Bangkok
        </p>

        <nav aria-label="Footer navigation" style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
          {links.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                style={{ ...MONO, color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                style={{ ...MONO, color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  );
}
