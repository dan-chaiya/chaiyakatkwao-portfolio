import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "CV — Chaiya Katkwao",
  description: "Chaiya Katkwao — Creative Producer CV",
};

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: "var(--cv-eyebrow)",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  fontWeight: 400,
  marginBottom: "2.5mm",
};

const rule: React.CSSProperties = {
  height: "1px",
  background: "var(--color-border-muted)",
  border: "none",
  marginBottom: "3.5mm",
};

const bodyLine: React.CSSProperties = {
  fontFamily: "var(--font-archivo)",
  fontSize: "var(--cv-body)",
  lineHeight: 1.5,
  color: "var(--color-grey-300)",
  fontWeight: 400,
};

const roleTitle: React.CSSProperties = {
  fontFamily: "var(--font-archivo)",
  fontSize: "var(--cv-role)",
  letterSpacing: "0",
  color: "var(--color-warm)",
  fontWeight: 700,
};

const yearLabel: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: "var(--cv-year)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  whiteSpace: "nowrap",
  marginLeft: "4mm",
};

const sectionGap: React.CSSProperties = { marginBottom: "var(--cv-section-gap)" };

const clients = [
  "Dutchmil Delivery", "Fitflop", "Guess", "Her Hyness",
  "Nestlé Health Science", "Rojukiss", "Sunnies Studio Thailand",
  "Tokfashion", "Knack Factory", "BAKAO",
];

export default function CVPage() {
  return (
    <>
      <style>{`
        @page { size: A4 portrait; margin: 0; }

        /* The A4 sheet. These are the print measurements and the wide-screen
           measurements both — the page is a facsimile of the printed CV. */
        .cv-sheet {
          --cv-eyebrow: 6.5pt;
          --cv-body: 8.5pt;
          --cv-role: 8.5pt;
          --cv-year: 6.5pt;
          --cv-summary: 9pt;
          --cv-name: 13mm;
          --cv-section-gap: 5mm;
          --cv-rail: 58mm;
          --cv-col-gap: 10mm;
        }
        .cv-row { width: 210mm; margin: 0 auto; }
        .cv-wrap {
          width: 210mm;
          height: 297mm;
          padding: 11mm 14mm 10mm;
        }
        .cv-body-grid {
          display: grid;
          grid-template-columns: var(--cv-rail) 1fr;
          gap: 0 var(--cv-col-gap);
        }

        @media screen {
          .cv-screen-container { padding-top: 64px; padding-bottom: 48px; }
        }

        /* Below the width of an A4 sheet (794px) the facsimile stops being
           readable and starts being clipped — body has overflow-x: hidden, so
           the overflowing half is unreachable rather than scrollable. Under
           that width the sheet becomes a single reflowing column. Print is
           untouched: every rule here is screen-only. */
        @media screen and (max-width: 860px) {
          .cv-sheet {
            --cv-eyebrow: 10px;
            --cv-body: 15px;
            --cv-role: 16px;
            --cv-year: 11px;
            --cv-summary: 16px;
            --cv-name: clamp(2.75rem, 13vw, 4.5rem);
            --cv-section-gap: 30px;
          }
          .cv-row { width: 100%; padding: 0 24px; }
          .cv-wrap {
            width: 100%;
            height: auto;
            padding: 32px 24px 40px;
          }
          .cv-body-grid { grid-template-columns: 1fr; gap: 0; }
          /* The left rail becomes a first block, not a column beside the work. */
          .cv-body-grid > div:first-child { margin-bottom: var(--cv-section-gap); }
        }

        @media print {
          html, body { background: #0D0D0D !important; margin: 0 !important; }
          header { display: none !important; }
          .cv-screen-container { padding: 0; }
          .cv-wrap { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .cv-print-btn { display: none !important; }
        }

        .cv-list { list-style: none; padding: 0; margin: 0; }
        .cv-list li {
          font-family: var(--font-archivo);
          font-size: var(--cv-body);
          line-height: 1.5;
          color: var(--color-grey-300);
          font-weight: 400;
          padding-left: 10pt;
          position: relative;
        }
        .cv-list li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--color-grey-500);
          font-size: 7pt;
        }
      `}</style>

      <main id="main-content" className="cv-screen-container cv-sheet" style={{ backgroundColor: "var(--color-surface-chat)" }}>
        <div className="cv-row" style={{ paddingBottom: "12px", display: "flex", justifyContent: "flex-end" }}>
          <PrintButton />
        </div>
        <div
          className="cv-wrap"
          style={{
            margin: "0 auto",
            backgroundColor: "var(--color-surface-chat)",
            color: "var(--color-warm)",
            boxSizing: "border-box",
          }}
        >
          {/* HEADER */}
          <div style={{ marginBottom: "6mm", paddingBottom: "6mm", borderBottom: "1px solid var(--color-border-muted)" }}>
            <p style={{ ...eyebrow, marginBottom: "4mm" }}>
              Creative Producer — Bangkok, Thailand
            </p>
            <h1
              style={{
                fontFamily: "var(--font-archivo)",
                fontWeight: 800,
                fontSize: "var(--cv-name)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                color: "var(--color-warm)",
                textTransform: "uppercase",
              }}
            >
              Chaiya /<br />Katkwao.
            </h1>
          </div>

          {/* BODY */}
          <div className="cv-body-grid">

            {/* ── LEFT RAIL ── */}
            <div>
              <section style={sectionGap}>
                <p style={eyebrow}>Contact</p>
                <hr style={rule} />
                <p style={bodyLine}>+66 93 609 6376</p>
                <p style={bodyLine}>chaiyakatkwao@gmail.com</p>
                <p style={bodyLine}>Bangkok, Thailand</p>
                <p style={{ ...bodyLine, marginTop: "2mm" }}>@chaiya.a</p>
              </section>

              <section style={sectionGap}>
                <p style={eyebrow}>Education</p>
                <hr style={rule} />
                <p style={bodyLine}>B.F.A. in Fine Art</p>
                <p style={bodyLine}>Chiang Mai University</p>
                <p style={{ ...bodyLine, color: "var(--color-text-muted)", marginTop: "1mm" }}>2020 – 2025</p>
              </section>

              <section style={sectionGap}>
                <p style={eyebrow}>Language</p>
                <hr style={rule} />
                <p style={bodyLine}>Thai — Native</p>
                <p style={bodyLine}>English — Upper Intermediate</p>
              </section>

              <section style={sectionGap}>
                <p style={eyebrow}>Selected Clients</p>
                <hr style={rule} />
                {clients.map((c) => (
                  <p key={c} style={bodyLine}>{c}</p>
                ))}
              </section>

              <section>
                <p style={eyebrow}>Portfolio</p>
                <hr style={rule} />
                <p style={bodyLine}>chaiyakatkwao.com</p>
              </section>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div>
              <section style={{ marginBottom: "5mm" }}>
                <p
                  style={{
                    fontFamily: "var(--font-archivo)",
                    fontSize: "var(--cv-summary)",
                    lineHeight: 1.5,
                    color: "var(--color-grey-400)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  Creative Producer and AI-native systems builder. Turns complex
                  briefs into scalable, broadcast-quality output — from multi-camera
                  podcasts to full live commerce — and designs the AI agents,
                  knowledge systems, and automation pipelines that run the studio.
                </p>
              </section>

              <section style={sectionGap}>
                <p style={eyebrow}>Skills</p>
                <hr style={rule} />
                <p style={{ ...bodyLine, marginBottom: "2mm" }}>
                  <span style={{ color: "var(--color-grey-400)", fontWeight: 600 }}>Creative</span>
                  {" — "}Art Direction, Creative Direction, Photography,
                  Video Editing & Color Grading, Styling, Lighting Design,
                  Storyboarding, Visual Identity, Creative Execution
                </p>
                <p style={{ ...bodyLine, marginBottom: "2mm" }}>
                  <span style={{ color: "var(--color-grey-400)", fontWeight: 600 }}>Technical</span>
                  {" — "}Technical Direction, Full-Scale Media Production,
                  Multi-Camera System Design, Advanced Streaming Architecture,
                  Visual & Audio Engineering
                </p>
                <p style={bodyLine}>
                  <span style={{ color: "var(--color-grey-400)", fontWeight: 600 }}>AI Systems</span>
                  {" — "}Claude & Claude Code, agentic assistants with tool use
                  & persistent memory (SQLite), MCP & Vercel AI SDK; creative
                  automation with self-hosted n8n + Obsidian; AI video pipelines
                  (Higgsfield, ElevenLabs)
                </p>
              </section>

              <section style={sectionGap}>
                <p style={eyebrow}>Experience</p>
                <hr style={rule} />

                <div style={{ marginBottom: "4mm" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5mm" }}>
                    <p style={roleTitle}>Live Production Lead — Ad The Top</p>
                    <p style={yearLabel}>2026 – Present</p>
                  </div>
                  <ul className="cv-list">
                    <li>Led multi-brand live commerce production across TikTok and social platforms</li>
                    <li>Translated brand briefs into structured visual execution</li>
                    <li>Designed lighting and camera setups scalable across client brand formats</li>
                    <li>Built reusable SOPs that reduced setup time across sessions</li>
                  </ul>
                </div>

                <div style={{ marginBottom: "4mm" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5mm" }}>
                    <p style={roleTitle}>A/V Engineer — Modal Creative Studio</p>
                    <p style={yearLabel}>2025 – 2026</p>
                  </div>
                  <ul className="cv-list">
                    <li>Designed and operated multi-camera podcast and video systems</li>
                    <li>Produced Built From Scratch, Grapple Asia, The Rise of Intelligence</li>
                    <li>Engineered audio, lighting, and recording pipelines for long-form formats</li>
                    <li>Built SOPs and troubleshooting guides for recurring productions</li>
                  </ul>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5mm" }}>
                    <p style={roleTitle}>Creative Practice</p>
                    <p style={yearLabel}>2022 – 2025</p>
                  </div>
                  <ul className="cv-list">
                    <li>Fashion photography and art direction for emerging Thai labels including BAKAO</li>
                    <li>Documented Knack Factory #18 — senior fashion showcase, Suan Sunandha University</li>
                    <li>Shot documentary portrait series across Northern Thailand</li>
                  </ul>
                </div>
              </section>

              <section>
                <p style={eyebrow}>Art & Exhibition</p>
                <hr style={rule} />
                <ul className="cv-list">
                  <li>Woven Memories, ID Thesis Exhibition, Red Dog Gallery, Chiang Mai — 2025</li>
                  <li>Assistant Photographer, Khun Chang Khian Thesis Project — 2023 – 2024</li>
                  <li>Fuiyoh, Art Thesis Exhibition, CMU Art Centre, Chiang Mai — 2021</li>
                </ul>
              </section>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ marginTop: "5mm", borderTop: "1px solid var(--color-border-muted)", paddingTop: "3mm", display: "flex", justifyContent: "space-between" }}>
            <p style={{ ...eyebrow, marginBottom: 0 }}>© 2026 Chaiya Katkwao</p>
            <p style={{ ...eyebrow, marginBottom: 0 }}>Updated — July 2026</p>
          </div>
        </div>
      </main>
    </>
  );
}
