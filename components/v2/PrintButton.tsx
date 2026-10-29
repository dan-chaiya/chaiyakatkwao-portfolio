"use client";

// The CV's print control, set like the viewer's Info toggle: an underlined word.
// Screen only; the print stylesheet in v2.css hides .v2-cv__print.
export default function PrintButton() {
  return (
    <button type="button" className="v2-cv__print" onClick={() => window.print()}>
      Print / Save PDF
    </button>
  );
}
