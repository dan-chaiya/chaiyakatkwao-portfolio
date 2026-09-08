"use client";

// The CV's print control, in the site's secondary button style (the "View CV →"
// button on Home): mono label, hairline border, colour answers the pointer.
// Screen only; the CV's print stylesheet hides .cv-print.
export default function PrintButton() {
  return (
    <button
      type="button"
      className="cv-print"
      onClick={() => window.print()}
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-text-muted)",
        background: "none",
        border: "1px solid var(--color-border)",
        padding: "14px 18px",
        cursor: "pointer",
        transition: "border-color 250ms ease, color 250ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-strong)";
        e.currentTarget.style.color = "var(--color-text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.color = "var(--color-text-muted)";
      }}
    >
      Print / Save PDF →
    </button>
  );
}
