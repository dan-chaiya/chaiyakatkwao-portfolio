import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import PrintButton from "@/components/PrintButton";
import { pageMetadata } from "@/lib/seo";
import { liveStudio as L } from "@/data/live-studio";

// app/cv/page.tsx — the CV, set as a conventional two-column resume (2026-10-28, to a
// reference layout CK picked): name and role on the left with the contact block
// top-right, a full-width summary, then Experience in the wide left column and
// Education, Skills, Brands and Languages in the narrow right one. Section heads are
// large Archivo Black words over a rule; body text is Inter in full ink; black on white, not
// the reference's blue, to stay in the site's palette. It replaced the site-kit CV
// (mono labels, grey dates, Archivo Black masthead), which CK found hard to read.
// Screen and print share the markup; @media print sets it at document sizes on one A4
// sheet and hides the site header, footer and print button. Facts mirror the About
// page, the chat's system prompt and /systems; nothing here that is not stated there.
// Parsers read the printed sheet in DOM order: header, summary, Experience, then the
// right column. Bullets use an inline marker so they stay with their job in the PDF.

export const metadata: Metadata = pageMetadata({
  title: "CV",
  description: "Chaiya Katkwao, Live Production Lead, Bangkok. Curriculum vitae.",
  path: "/cv",
});

// Every number below comes from data/live-studio.ts (counted from the Live Studio OS
// sheet on 4 October 2026) or from /systems, so the CV, Home, Commercial and the chat
// say the same thing. 501 is the register as migrated; 458 is what is tracked today.
// Periods carry months (CK, 2026-10-28): year-only dates on two short roles read as
// shorter than they were. The set-up bullet states what was written, not a time saved:
// there is no before/after measurement to quote.
// Copy checked against the humanizer list (Wikipedia, "Signs of AI writing") and
// worded in the terms Bangkok live-stream job ads use: OBS Studio, camera switching,
// audio routing, multi-camera.
const experience = [
  {
    role: "Live Production & Visual Coordinator",
    company: "Ad The Top Agency",
    location: "Bangkok",
    period: "Jan 2026–Present",
    points: [
      `Runs production across a ${L.rooms}-room live commerce studio on ${L.floors} floors for a live department of ${L.department}: hosts, live coordinators and an ${L.adminCrew}-person admin crew`,
      "Produces TikTok live commerce for 10 brands, including Nestlé, Colgate, Guess, Fitflop and Dutchmil Delivery, with several rooms live at once",
      "Designs the lighting and camera setup for each brand brief, so the crew can rebuild it for the next session without him",
      "Wrote the studio's standard camera and stream settings, the shutdown checklist and an equipment guide for each room",
      `Built Live Studio OS with the CEO: a Google Apps Script web app the team opens every day for equipment checks, fault logs and the monthly report; 20+ releases. Migrated the 501-item register into it; ${L.gear} items tracked today, including ${L.cameras} cameras, ${L.switchers} switchers, ${L.lights} LED lights and ${L.pcs} PCs`,
      `Logged ${L.faultsLogged} equipment faults in ${L.faultWindow} and resolved all ${L.faultsResolved}`,
    ],
  },
  {
    role: "Audio/Visual Engineer",
    company: "Modal Creative Studio",
    location: "Bangkok",
    period: "Jun 2025–Jan 2026",
    points: [
      "Designed and ran the studio's multi-camera podcast set: camera switching, audio routing, lighting and recording",
      "Produced three long-form shows, Built From Scratch, Grapple Asia and The Rise of Intelligence, from guest coordination to final delivery",
      "Wrote the SOPs and troubleshooting guides the team runs recurring shows from",
    ],
  },
  {
    role: "Photographer & Art Director",
    company: "Freelance",
    location: "Thailand",
    period: "Aug 2022–Present",
    points: [
      "Lookbook photography and art direction for BAKAO, a Bangkok clothing label (2024)",
      "Runway photography for Knack Factory #18, the senior fashion show at Suan Sunandha Rajabhat University (2024)",
      "Assistant photographer on Khun Chang Khian, a documentary portrait series in Chiang Mai (2023–2024)",
    ],
  },
];

const exhibitions = [
  { title: "Woven Memories, Red Dog Gallery, Chiang\u00a0Mai", year: "2025" },
  { title: "Fuiyoh, CMU Art Centre, Chiang\u00a0Mai", year: "2021" },
];

// Grouped the way a live-production job ad is written, so the tools it searches for
// (ATEM, OBS, multi-camera) are on the page in its words.
const skills = [
  {
    group: "Live production",
    items: "ATEM switchers, OBS Studio, multi-camera switching, TikTok live commerce, lighting design, audio routing",
  },
  {
    group: "Creative",
    items: "Art direction, photography, styling, DaVinci Resolve (edit and colour), Canva",
  },
  {
    group: "Systems",
    items: "Google Apps Script, Google Sheets and Workspace, SOP writing, Claude Code",
  },
];

const liveBrands = [
  "Colgate", "Dutchmil Delivery", "F&N Dairies", "Fitflop", "Guess",
  "Her Hyness", "Nestlé", "Rojukiss", "Sunnies Studio", "Tokfashion",
];

export default function CVPage() {
  return (
    <>
      <style>{`
        .cv { max-width: 60rem; padding: 64px 32px 128px; color: var(--color-text); font-family: var(--font-archivo), system-ui, sans-serif; }
        .cv a { color: inherit; text-decoration: none; }
        @media (hover: hover) { .cv a:hover { text-decoration: underline; text-underline-offset: 3px; } }
        .cv-tools { display: flex; justify-content: flex-end; margin-bottom: 24px; }

        .cv-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px 32px; }
        /* Name and section heads in Archivo Black, the headline face on every other page;
           everything read is Inter. */
        .cv-name { font-family: var(--font-heading); font-weight: 400; font-size: clamp(2.25rem, 5vw, 3rem); line-height: 1; letter-spacing: -0.02em; color: var(--color-warm); }
        .cv-role { margin-top: 8px; font-size: 1rem; }
        .cv-contact { font-size: 0.9375rem; line-height: 1.65; }
        @media (min-width: 640px) { .cv-contact { text-align: right; } }

        .cv-h2 { margin-top: 36px; padding-bottom: 6px; border-bottom: 2px solid var(--color-warm); font-family: var(--font-heading); font-size: 1.5rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.2; color: var(--color-warm); }
        .cv-summary { margin-top: 12px; font-size: 1rem; line-height: 1.6; }

        .cv-cols { display: grid; grid-template-columns: 1fr; column-gap: 40px; }
        @media (min-width: 900px) { .cv-cols { grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); } }

        .cv-entry { margin-top: 16px; font-size: 0.9375rem; line-height: 1.5; }
        .cv-entry__org { font-weight: 700; font-size: 1rem; }
        .cv-entry__meta { color: var(--color-text-muted); }
        .cv-list { list-style: none; margin: 6px 0 0; padding: 0; }
        .cv-list li { padding-left: 14px; text-indent: -14px; }
        .cv-list li + li { margin-top: 3px; }
        .cv-list li::before { content: "•"; display: inline-block; width: 14px; text-indent: 0; }
        .cv-plain { list-style: none; margin: 12px 0 0; padding: 0; font-size: 0.9375rem; line-height: 1.5; }
        .cv-plain li + li { margin-top: 4px; }
        .cv-skill { margin-top: 12px; font-size: 0.9375rem; line-height: 1.5; }
        .cv-skill b { display: block; font-weight: 700; }
        .cv-foot { margin-top: 48px; font-size: 0.8125rem; color: var(--color-text-muted); }

        @page { size: A4 portrait; margin: 11mm 13mm; }
        @media print {
          html, body { background: #fff !important; color: #111 !important; }
          header, footer, .cv-print, body::after { display: none !important; }
          /* The route fade starts at opacity 0; a print started before it lands would
             be a blank sheet. */
          div:has(> .cv) { opacity: 1 !important; transform: none !important; }
          .cv { max-width: none; padding: 0; color: #111; }
          .cv-name { font-size: 24pt; color: #111; }
          .cv-role { margin-top: 1.5mm; font-size: 10.5pt; }
          .cv-contact { text-align: right; font-size: 9.5pt; line-height: 1.45; }
          .cv-h2 { margin-top: 5mm; padding-bottom: 1mm; font-size: 15pt; color: #111; border-bottom: 1.2pt solid #111; }
          .cv-summary { margin-top: 2.2mm; font-size: 10pt; line-height: 1.45; }
          .cv-cols { grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr); column-gap: 8mm; }
          .cv-entry { margin-top: 3mm; font-size: 9.5pt; line-height: 1.4; break-inside: avoid; }
          .cv-entry__org { font-size: 10pt; }
          .cv-entry__meta { color: #444; }
          .cv-list { margin-top: 1mm; }
          .cv-list li { padding-left: 3.4mm; text-indent: -3.4mm; }
          .cv-list li::before { width: 3.4mm; }
          .cv-list li + li { margin-top: 0.5mm; }
          .cv-plain { margin-top: 2.2mm; font-size: 9.5pt; line-height: 1.4; }
          .cv-plain li + li { margin-top: 0.8mm; }
          .cv-skill { margin-top: 2.2mm; font-size: 9.5pt; line-height: 1.4; }
          .cv-foot { display: none; }
        }
      `}</style>

      <PageTransition>
        <main id="main-content" className="cv">
          <div className="cv-tools cv-print">
            <PrintButton />
          </div>

          <div className="cv-head">
            <div>
              <h1 className="cv-name">Chaiya Katkwao</h1>
              <p className="cv-role">Live Production Lead</p>
            </div>
            <div className="cv-contact">
              <p>Bangkok, Thailand</p>
              <p><a href="tel:+66936096376">+66 93 609 6376</a></p>
              <p><a href="mailto:chaiyakatkwao@gmail.com">chaiyakatkwao@gmail.com</a></p>
              <p><a href="https://chaiyakatkwao.com">chaiyakatkwao.com</a></p>
              <p><a href="https://www.instagram.com/chaiya.a" rel="noopener">instagram.com/chaiya.a</a></p>
            </div>
          </div>

          <h2 className="cv-h2">Summary</h2>
          <p className="cv-summary">
            Runs production for a {L.rooms}-room TikTok live commerce studio: 10
            brands, a live department of {L.department} and {L.gear} pieces of gear.
            Trained in photography (BFA, Chiang Mai University); plans the lighting
            and camera look for each brand, and built three internal tools that
            teams use every day (chaiyakatkwao.com/systems).
          </p>

          <div className="cv-cols">
            <section aria-label="Experience">
              <h2 className="cv-h2">Experience</h2>
              {experience.map((job) => (
                <div key={job.role + job.company} className="cv-entry">
                  <p className="cv-entry__org">{job.company}</p>
                  <p>{job.role}</p>
                  <p className="cv-entry__meta">{job.period.replace("–", " – ")} · {job.location}</p>
                  <ul className="cv-list">
                    {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>
              ))}
            </section>

            <section aria-label="Education, skills and languages">
              <h2 className="cv-h2">Education</h2>
              <div className="cv-entry">
                <p className="cv-entry__org">Chiang Mai University</p>
                <p>BFA Photography</p>
                <p className="cv-entry__meta">2020 – 2025</p>
              </div>

              <h2 className="cv-h2">Exhibitions</h2>
              <ul className="cv-plain">
                {exhibitions.map((ex) => <li key={ex.title}>{ex.title}, {ex.year}</li>)}
              </ul>

              <h2 className="cv-h2">Skills</h2>
              {skills.map((s) => (
                <p key={s.group} className="cv-skill"><b>{s.group}</b>{s.items}</p>
              ))}

              <h2 className="cv-h2">Brands</h2>
              <p className="cv-skill">Live commerce for {liveBrands.join(", ")}</p>

              <h2 className="cv-h2">Languages</h2>
              <ul className="cv-plain">
                <li>Thai (Native)</li>
                <li>English (Upper intermediate)</li>
              </ul>
            </section>
          </div>

          <p className="cv-foot">Updated October 2026</p>
        </main>
      </PageTransition>

      <Footer />
    </>
  );
}
