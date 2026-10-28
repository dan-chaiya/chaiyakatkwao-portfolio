import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import PrintButton from "@/components/PrintButton";
import { pageMetadata } from "@/lib/seo";
import { liveStudio as L } from "@/data/live-studio";

// app/cv/page.tsx — the CV, set as a standard one-column resume (2026-10-28).
// Until then it used the site's kit: tracked monospace labels, grey mono dates, an
// Archivo Black masthead and a second column. CK found it hard to read, and it is not
// the shape a recruiter or a resume parser expects. Now one face (Archivo), one column
// in reading order (name, contact, summary, experience, skills, education), section
// heads in plain bold, dates in the body face, and body text in full ink. Screen and
// print share the markup; @media print sets it at document sizes on one A4 sheet and
// hides the site header, footer and the print button. Facts mirror the About page,
// the chat's system prompt and /systems; nothing here that is not stated there.
// Parsers read the printed sheet in DOM order, so contact sits under the name and
// the bullets stay in flow (a positioned marker landed at the end of the PDF).

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
    role: "Freelance Photographer & Art Director",
    company: "Independent",
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
        .cv { max-width: 50rem; padding: 64px 32px 128px; color: var(--color-text); font-family: var(--font-archivo), system-ui, sans-serif; }
        .cv a { color: inherit; text-decoration: none; border-bottom: 1px solid var(--color-border); transition: border-color 180ms ease; }
        @media (hover: hover) { .cv a:hover { border-color: var(--color-border-strong); } }
        .cv-top { display: flex; justify-content: flex-end; margin-bottom: 24px; }
        .cv-name { font-weight: 800; font-size: clamp(2.25rem, 5vw, 3.25rem); line-height: 1; letter-spacing: -0.02em; color: var(--color-warm); }
        .cv-role { margin-top: 10px; font-size: 1.125rem; font-weight: 600; }
        /* A wrapping row: JSX drops the spaces between the spans, so as inline text the
           line had no break point and pushed phones sideways. */
        .cv-contact { margin-top: 8px; display: flex; flex-wrap: wrap; font-size: 0.9375rem; line-height: 1.6; color: var(--color-text-muted); }
        .cv-contact span + span::before { content: "·"; margin: 0 8px; }
        .cv-summary { margin-top: 24px; font-size: 1rem; line-height: 1.6; }
        .cv-h2 { margin-top: 40px; padding-bottom: 6px; border-bottom: 1px solid var(--color-border-strong); font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-warm); }
        .cv-job { margin-top: 18px; }
        .cv-line { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; font-size: 1rem; line-height: 1.5; }
        .cv-line > :last-child { flex-shrink: 0; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .cv-job__title { font-weight: 600; }
        .cv-job__where { font-size: 0.9375rem; color: var(--color-text-muted); }
        .cv-list { list-style: none; margin: 6px 0 0; padding: 0; font-size: 0.9375rem; line-height: 1.55; }
        /* Hanging indent, not position: absolute: an inline-block marker stays in flow,
           so the printed PDF keeps each bullet with its job. */
        .cv-list li { padding-left: 14px; text-indent: -14px; }
        .cv-list li + li { margin-top: 3px; }
        .cv-list li::before { content: "•"; display: inline-block; width: 14px; text-indent: 0; }
        .cv-rows { margin-top: 12px; font-size: 0.9375rem; line-height: 1.55; }
        .cv-rows > * + * { margin-top: 4px; }
        .cv-rows .cv-line { font-size: inherit; }
        .cv-rows b { font-weight: 600; }
        .cv-foot { margin-top: 48px; font-size: 0.8125rem; color: var(--color-text-muted); }

        @page { size: A4 portrait; margin: 13mm 16mm; }
        @media print {
          html, body { background: #fff !important; color: #111 !important; }
          header, footer, .cv-print, body::after { display: none !important; }
          /* The route fade starts at opacity 0; a print started before it lands would
             be a blank sheet. */
          div:has(> .cv) { opacity: 1 !important; transform: none !important; }
          .cv { max-width: none; padding: 0; color: #111; }
          .cv a { border-bottom: 0; }
          .cv-name { font-size: 22pt; color: #111; }
          .cv-role { margin-top: 1.5mm; font-size: 11.5pt; }
          .cv-contact { margin-top: 1mm; font-size: 9.5pt; color: #333; }
          .cv-summary { margin-top: 3.5mm; font-size: 10pt; line-height: 1.45; }
          .cv-h2 { margin-top: 5mm; padding-bottom: 1mm; font-size: 9.5pt; color: #111; border-color: #999; border-bottom-width: 0.6pt; }
          .cv-job { margin-top: 2.6mm; break-inside: avoid; }
          .cv-line { font-size: 10pt; line-height: 1.4; }
          .cv-job__where { font-size: 9.5pt; color: #333; }
          .cv-list { margin-top: 0.8mm; font-size: 9.5pt; line-height: 1.4; }
          .cv-list li { padding-left: 3.6mm; text-indent: -3.6mm; }
          .cv-list li::before { width: 3.6mm; }
          .cv-list li + li { margin-top: 0.4mm; }
          .cv-rows { margin-top: 2mm; font-size: 9.5pt; line-height: 1.4; }
          .cv-rows > * + * { margin-top: 0.8mm; }
          .cv-foot { display: none; }
        }
      `}</style>

      <PageTransition>
        <main id="main-content" className="cv">
          <div className="cv-top cv-print">
            <PrintButton />
          </div>

          <h1 className="cv-name">Chaiya Katkwao</h1>
          <p className="cv-role">Live Production Lead</p>
          <p className="cv-contact">
            <span>Bangkok, Thailand</span>
            <span><a href="tel:+66936096376">+66 93 609 6376</a></span>
            <span><a href="mailto:chaiyakatkwao@gmail.com">chaiyakatkwao@gmail.com</a></span>
            <span><a href="https://chaiyakatkwao.com">chaiyakatkwao.com</a></span>
            <span><a href="https://www.instagram.com/chaiya.a" rel="noopener">@chaiya.a</a></span>
          </p>

          <p className="cv-summary">
            Runs production for a {L.rooms}-room TikTok live commerce studio: 10
            brands, a live department of {L.department} and {L.gear} pieces of gear.
            Trained in photography (BFA, Chiang Mai University); plans the lighting
            and camera look for each brand, and built three internal tools that
            teams use every day (chaiyakatkwao.com/systems).
          </p>

          <h2 className="cv-h2">Experience</h2>
          {experience.map((job) => (
            <div key={job.role + job.company} className="cv-job">
              <p className="cv-line">
                <span className="cv-job__title">{job.role}</span>
                <span>{job.period.replace("–", " – ")}</span>
              </p>
              <p className="cv-job__where">{job.company}, {job.location}</p>
              <ul className="cv-list">
                {job.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </div>
          ))}

          <h2 className="cv-h2">Skills</h2>
          <div className="cv-rows">
            {skills.map((s) => (
              <p key={s.group}><b>{s.group}:</b> {s.items}</p>
            ))}
            <p><b>Live commerce brands:</b> {liveBrands.join(", ")}</p>
            <p><b>Languages:</b> Thai (native), English (upper intermediate)</p>
          </div>

          <h2 className="cv-h2">Education &amp; Exhibitions</h2>
          <div className="cv-rows">
            <p className="cv-line">
              <span><b>BFA Photography</b>, Chiang Mai University</span>
              <span>2020 – 2025</span>
            </p>
            {exhibitions.map((ex) => (
              <p key={ex.title} className="cv-line">
                <span>Exhibition: {ex.title}</span>
                <span>{ex.year}</span>
              </p>
            ))}
          </div>

          <p className="cv-foot">Updated October 2026</p>
        </main>
      </PageTransition>

      <Footer />
    </>
  );
}
