"use client";

// The CV's print control, in the site's secondary button style (the "View CV →"
// button on Home): mono label, hairline border, colour answers the pointer.
// Screen only; the CV's print stylesheet hides .cv-print. The hover is a CSS hover:
// variant, so a tap on a phone does not leave it stuck at full ink.
export default function PrintButton() {
  return (
    <button
      type="button"
      className="cv-print cursor-pointer border border-[var(--color-border)] text-[var(--color-text-muted)] transition-[border-color,color] duration-[250ms] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
      onClick={() => window.print()}
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        background: "none",
        padding: "14px 18px",
      }}
    >
      Print / Save PDF →
    </button>
  );
}
