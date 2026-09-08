import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import PrintButton from "@/components/PrintButton";

// app/cv/page.tsx — the CV, set in the site's own kit.
// On screen it is a page like About: the mono eyebrow, the Archivo Black title in
// Title case, the reading steps (.copy-lead / .copy-body / .copy-small), mono labels
// for every year and index, hairline rows. Until 2026-09-08 it was an A4 facsimile at
// print sizes (8.5pt body) on screen, which read as a different site. Print is the
// exception: @media print compacts the same markup onto one A4 sheet, still black,
// and hides the header, footer and the button. Facts mirror the About page and the
// chat's system prompt; nothing here that is not stated there.

export const metadata: Metadata = {
  title: "CV — Chaiya Katkwao",
  description: "Chaiya Katkwao — Creative Producer, Bangkok. Curriculum vitae.",
};

const experience = [
  {
    role: "Live Producer",
    company: "Ad The Top Agency",
    location: "Bangkok",
    period: "2026 — Present",
    points: [
      "Leads multi-brand live commerce production across TikTok and social platforms",
      "Translates brand briefs into structured visual execution",
      "Designs lighting and camera setups that scale across client brand formats",
      "Manages full-cycle production from brief to live broadcast",
      "Built reusable SOPs that reduced setup time across sessions",
    ],
  },
  {
    role: "Audio/Visual Engineer",
    company: "Modal Creative Studio",
    location: "Bangkok",
    period: "2025 — 2026",
    points: [
      "Designed and operated multi-camera podcast and video systems",
      "Produced Built From Scratch, Grapple Asia and The Rise of Intelligence",
      "Engineered audio, lighting and recording pipelines for long-form formats",
      "Built SOPs and troubleshooting guides for recurring productions",
    ],
  },
  {
    role: "Freelance Creative",
    company: "Independent",
    location: "Thailand",
    period: "2022 — Present",
    points: [
      "Fashion photography and art direction for emerging Thai labels including BAKAO",
      "Documented Knack Factory #18, the senior fashion showcase at Suan Sunandha Rajabhat University",
      "Documentary portrait series across Northern Thailand",
    ],
  },
];

const exhibitions = [
  { title: "Woven Memories, ID Thesis Exhibition, Red Dog Gallery, Chiang Mai", year: "2025" },
  { title: "Assistant Photographer, Khun Chang Khian Thesis Project", year: "2023 — 2024" },
  { title: "Fuiyoh, Art Thesis Exhibition, CMU Art Centre, Chiang Mai", year: "2021" },
];

const skills = [
  {
    group: "Creative",
    items: "Art Direction, Creative Direction, Photography, Video Editing & Color Grading, Styling, Lighting Design, Visual Storytelling",
  },
  {
    group: "Production",
    items: "Live Commerce Production, Live Content Systems, Multi-camera Production, Studio Production, Audio-Visual Engineering",
  },
  {
    group: "AI Systems",
    items: "Claude & Claude Code, agentic assistants with tool use & persistent memory (SQLite), MCP & Vercel AI SDK; creative automation with self-hosted n8n + Obsidian; AI video pipelines (Higgsfield, ElevenLabs)",
  },
  {
    group: "Internal Systems",
    items: "Live Studio OS, Keepsake and the studio register: Google Apps Script and Sheets, built and maintained for teams that use them every day",
  },
];

const clients = [
  "Colgate", "Dutchmil Delivery", "Fitflop", "Guess", "Her Hyness", "Nestlé",
  "Rojukiss", "Sunnies Studio Thailand", "Tokfashion", "Knack Factory", "BAKAO",
];

export default function CVPage() {
  return (
    <>
      <style>{`
        /* Screen: the About page's shell and rhythm (pt-16 px-8 pb-32, 12 columns from
           1024px, 7 + 5 with the rail indented). Own class names so the print sheet can
           re-set the same boxes without fighting Tailwind's breakpoints. */
        .cv-shell { padding: 64px 32px 128px; }
        .cv-grid { display: grid; grid-template-columns: 1fr; gap: 48px 0; }
        .cv-rail { padding-left: 0; }
        @media (min-width: 1024px) {
          .cv-grid { grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 0; }
          .cv-main { grid-column: span 7; }
          .cv-rail { grid-column: span 5; padding-left: 64px; }
        }
        .cv-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 32px; }
        .cv-eyebrow { letter-spacing: 0.28em; }
        .cv-h1 { font-size: clamp(3rem, 8vw, 7rem); line-height: 0.92; letter-spacing: -0.02em; color: var(--color-warm); margin-bottom: 64px; }
        .cv-summary { max-width: 36rem; }
        .cv-summary > * + * { margin-top: 20px; }
        .cv-section { margin-top: 64px; }
        .cv-section--tight { margin-top: 48px; }
        .cv-section > .mono-label { margin-bottom: 24px; }
        .cv-rows::after { content: ""; display: block; border-top: 1px solid var(--color-grey-700); }
        .cv-row { border-top: 1px solid var(--color-grey-700); padding: 16px 0; }
        .cv-row--role { padding: 24px 0; }
        .cv-row__head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
        .cv-row__head .mono-label { white-space: nowrap; flex-shrink: 0; }
        .cv-role { color: var(--color-warm); font-weight: 500; }
        .cv-where { margin-top: 4px; color: var(--color-grey-400); }
        .cv-list { list-style: none; margin: 12px 0 0; padding: 0; }
        .cv-list li { position: relative; padding-left: 16px; }
        .cv-list li + li { margin-top: 4px; }
        .cv-list li::before { content: "—"; position: absolute; left: 0; color: var(--color-grey-500); }
        .cv-lines > * + * { margin-top: 6px; }
        .cv-lines a { color: inherit; text-decoration: none; border-bottom: 1px solid var(--color-border); transition: border-color 180ms ease, color 180ms ease; }
        .cv-lines a:hover { color: var(--color-warm); border-color: var(--color-border-strong); }
        .cv-skill + .cv-skill { margin-top: 14px; }
        .cv-skill b { color: var(--color-warm); font-weight: 500; }
        .cv-foot { margin-top: 96px; border-top: 1px solid var(--color-grey-700); padding-top: 16px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 16px; }

        /* Print: one A4 sheet, still black, the same markup compacted. The header,
           footer, grain and button go; the reading steps step down to print sizes
           (8.5pt is the site's 11px floor in print units); the two columns hold. */
        @page { size: A4 portrait; margin: 12mm 14mm; }
        @media print {
          html, body { background: #000 !important; }
          header, footer, .cv-print, body::after { display: none !important; }
          /* The route fade wraps <main> in a motion div that starts at opacity 0; a
             print started before it lands (or from a print-to-PDF tool) would be a
             blank sheet. In print the wrapper is simply visible. */
          div:has(> .cv-shell) { opacity: 1 !important; transform: none !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .cv-shell { padding: 0; }
          .cv-grid { grid-template-columns: 7fr 5fr; gap: 0; }
          .cv-main, .cv-rail { grid-column: auto; }
          .cv-rail { padding-left: 10mm; }
          .cv-top { margin-bottom: 3mm; }
          .cv-h1 { font-size: 28pt; margin-bottom: 6mm; }
          .cv-shell .copy-lead { font-size: 10.5pt; line-height: 1.35; }
          .cv-shell .copy-body { font-size: 9pt; line-height: 1.4; }
          .cv-shell .copy-small { font-size: 8.5pt; line-height: 1.4; }
          .cv-shell .mono-label { font-size: 8.5pt; }
          .cv-summary > * + * { margin-top: 3mm; }
          .cv-section { margin-top: 6mm; }
          .cv-section--tight { margin-top: 4mm; }
          .cv-shell .cv-eyebrow { margin-bottom: 2.5mm !important; }
          .cv-top .cv-eyebrow { margin-bottom: 0 !important; }
          .cv-row { padding: 1.8mm 0; }
          .cv-row--role { padding: 3mm 0; }
          .cv-lines > * + * { margin-top: 1mm; }
          .cv-row--role, .cv-skill { break-inside: avoid; }
          .cv-list { margin-top: 1.5mm; }
          .cv-list li + li { margin-top: 0.5mm; }
          .cv-skill + .cv-skill { margin-top: 2.5mm; }
          .cv-foot { margin-top: 5mm; padding-top: 2.5mm; }
        }
      `}</style>

      <PageTransition>
        <main id="main-content" className="cv-shell">
          <div className="cv-grid">
            {/* Left: the masthead, the summary, the work. */}
            <div className="cv-main">
              <div className="cv-top">
                <p className="mono-label cv-eyebrow">Curriculum Vitae</p>
              </div>

              <h1 className="font-heading cv-h1">
                Chaiya /
                <br />
                Katkwao.
              </h1>

              <div className="cv-summary">
                <p className="copy-lead">
                  Creative Producer working at the intersection of art direction
                  and technical execution.
                </p>
                <p className="copy-body">
                  Turns briefs into broadcast-quality output, from multi-camera
                  podcasts to multi-brand live commerce, and builds the systems the
                  studio runs on: three internal tools in daily use, documented at
                  chaiyakatkwao.com/systems.
                </p>
              </div>

              <section className="cv-section" aria-label="Experience">
                <p className="mono-label cv-eyebrow">Experience</p>
                <div className="cv-rows">
                  {experience.map((job) => (
                    <div key={job.role + job.company} className="cv-row cv-row--role">
                      <div className="cv-row__head">
                        <p className="copy-body cv-role">{job.role}</p>
                        <span className="mono-label">{job.period}</span>
                      </div>
                      <p className="copy-small cv-where">{job.company} — {job.location}</p>
                      <ul className="cv-list copy-small">
                        {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="cv-section cv-section--tight" aria-label="Art and exhibition">
                <p className="mono-label cv-eyebrow">Art &amp; Exhibition</p>
                <div className="cv-rows">
                  {exhibitions.map((ex) => (
                    <div key={ex.title} className="cv-row cv-row__head">
                      <p className="copy-small">{ex.title}</p>
                      <span className="mono-label">{ex.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right rail: the facts. */}
            <div className="cv-rail">
              <div className="cv-top cv-print" style={{ justifyContent: "flex-end" }}>
                <PrintButton />
              </div>

              <section aria-label="Contact">
                <p className="mono-label cv-eyebrow" style={{ marginBottom: "16px" }}>Contact</p>
                <div className="cv-lines copy-small">
                  <p><a href="tel:+66936096376">+66 93 609 6376</a></p>
                  <p><a href="mailto:chaiyakatkwao@gmail.com">chaiyakatkwao@gmail.com</a></p>
                  <p>Bangkok, Thailand</p>
                  <p><a href="https://www.instagram.com/chaiya.a" rel="noopener">@chaiya.a</a></p>
                  <p><a href="https://chaiyakatkwao.com">chaiyakatkwao.com</a></p>
                </div>
              </section>

              <section className="cv-section cv-section--tight" aria-label="Education">
                <p className="mono-label cv-eyebrow" style={{ marginBottom: "16px" }}>Education</p>
                <div className="cv-row__head">
                  <p className="copy-small">BFA Photography — Chiang Mai University</p>
                  <span className="mono-label">2020 — 2025</span>
                </div>
              </section>

              <section className="cv-section cv-section--tight" aria-label="Languages">
                <p className="mono-label cv-eyebrow" style={{ marginBottom: "16px" }}>Languages</p>
                <div className="cv-lines copy-small">
                  <p>Thai — Native</p>
                  <p>English — Upper Intermediate</p>
                </div>
              </section>

              <section className="cv-section cv-section--tight" aria-label="Skills">
                <p className="mono-label cv-eyebrow" style={{ marginBottom: "16px" }}>Skills</p>
                {skills.map((s) => (
                  <p key={s.group} className="copy-small cv-skill">
                    <b>{s.group}</b> — {s.items}
                  </p>
                ))}
              </section>

              <section className="cv-section cv-section--tight" aria-label="Selected clients">
                <p className="mono-label cv-eyebrow">Selected Clients</p>
                <div className="cv-rows">
                  {clients.map((name, i) => (
                    <div key={name} className="cv-row cv-row__head">
                      <p className="copy-small">{name}</p>
                      <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="cv-foot">
            <p className="mono-label">© 2026 Chaiya Katkwao</p>
            <p className="mono-label">Updated — September 2026</p>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </>
  );
}
