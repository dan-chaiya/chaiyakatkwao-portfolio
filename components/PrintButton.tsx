"use client";

export default function PrintButton() {
  return (
    <button
      className="cv-print-btn font-body"
      onClick={() => window.print()}
      style={{
        fontSize: "9px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "var(--color-grey-500)",
        background: "none",
        border: "1px solid var(--color-border-muted)",
        padding: "8px 16px",
        cursor: "pointer",
        transition: "border-color 200ms ease, color 200ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-grey-500)";
        e.currentTarget.style.color = "var(--color-warm)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-muted)";
        e.currentTarget.style.color = "var(--color-grey-500)";
      }}
    >
      Print / Save PDF
    </button>
  );
}
