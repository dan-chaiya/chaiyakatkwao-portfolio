import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "CV — Chaiya Katkwao",
  description: "Chaiya Katkwao — Creative Producer CV",
};

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: "6.5pt",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "var(--color-grey-500)",
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
  fontFamily: "var(--font-jakarta)",
  fontSize: "8.5pt",
  lineHeight: 1.5,
  color: "var(--color-grey-300)",
  fontWeight: 400,
};

const roleTitle: React.CSSProperties = {
  fontFamily: "var(--font-jakarta)",
  fontSize: "8.5pt",
  letterSpacing: "0",
  color: "var(--color-warm)",
  fontWeight: 700,
};

const yearLabel: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: "6.5pt",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-grey-500)",
  whiteSpace: "nowrap",
  marginLeft: "4mm",
};

const sectionGap: React.CSSProperties = { marginBottom: "5mm" };

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
        @media screen {
          .cv-screen-container { padding-top: 64px; padding-bottom: 48px; }
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
          font-family: var(--font-jakarta);
          font-size: 8.5pt;
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
          color: var(--color-grey-700);
          font-size: 7pt;
        }
      `}</style>

      <div className="cv-screen-container" style={{ backgroundColor: "var(--color-surface-chat)" }}>
        <div style={{ width: "210mm", margin: "0 auto", paddingBottom: "12px", display: "flex", justifyContent: "flex-end" }}>
          <PrintButton />
        </div>
        <div
          className="cv-wrap"
          style={{
            width: "210mm",
            height: "297mm",
            margin: "0 auto",
            backgroundColor: "var(--color-surface-chat)",
            color: "var(--color-warm)",
            padding: "11mm 14mm 10mm",
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
                fontFamily: "var(--font-jakarta)",
                fontWeight: 800,
                fontSize: "13mm",
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
          <div style={{ display: "grid", gridTemplateColumns: "58mm 1fr", gap: "0 10mm" }}>

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
                <p style={{ ...bodyLine, color: "var(--color-grey-500)", marginTop: "1mm" }}>2020 – 2025</p>
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
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "9pt",
                    lineHeight: 1.5,
                    color: "var(--color-grey-400)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  Creative Producer specialising in studio production,
                  systems, and branded content. Translates complex briefs into
                  scalable, broadcast-quality output — from multi-camera
                  podcasts to full live commerce broadcasts.
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
                  <span style={{ color: "var(--color-grey-400)", fontWeight: 600 }}>AI</span>
                  {" — "}Claude, Claude Code, Agentic Workflows,
                  AI-Assisted Creative Production & Research
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
                    <li>Managed full-cycle production from brief to live broadcast</li>
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
            <p style={{ ...eyebrow, marginBottom: 0 }}>Updated — May 2026</p>
          </div>
        </div>
      </div>
    </>
  );
}
