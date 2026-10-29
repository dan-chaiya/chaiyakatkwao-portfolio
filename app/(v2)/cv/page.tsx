import type { Metadata } from "next";
import Header from "@/components/v2/Header";
import PrintButton from "@/components/v2/PrintButton";
import { pageMetadata } from "@/lib/seo";
import { liveStudio as L } from "@/data/live-studio";

// The CV in the v2 system (2026-10-29): the shared header, the name in the condensed
// Display step, and the rest as the ruled lists Information uses, in paper and ink.
// Screen and print share the markup; the print rules in v2.css set it on one A4 sheet
// and hide the header and the print control. Facts mirror Information, the chat's
// system prompt and /systems; nothing here that is not stated there. Parsers read the
// printed sheet in DOM order: header, summary, Experience, then the side column.

export const metadata: Metadata = pageMetadata({
  title: "CV",
  description: "Chaiya Katkwao, Live Production Lead, Bangkok. Curriculum vitae.",
  path: "/cv",
});

// Every number below comes from data/live-studio.ts (counted from the Live Studio OS
// sheet on 4 October 2026) or from /systems, so the CV, Home and the chat say the same
// thing. 501 is the register as migrated; 458 is what is tracked today.
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
      {/* One A4 sheet when printed; scoped to this page by living in it. */}
      <style>{`@page { size: A4 portrait; margin: 11mm 13mm; }`}</style>
      <Header />
      <main id="main-content" className="v2-cv">
        <header className="v2-cv__head">
          <div>
            <h1 className="v2-cv__name">Chaiya Katkwao</h1>
            <p className="v2-cv__role">Live Production Lead</p>
            <p className="v2-cv__tools">
              <PrintButton />
            </p>
          </div>
          <ul className="v2-cv__contact">
            <li>Bangkok, Thailand</li>
            <li><a href="tel:+66936096376">+66 93 609 6376</a></li>
            <li><a href="mailto:chaiyakatkwao@gmail.com">chaiyakatkwao@gmail.com</a></li>
            <li><a href="https://chaiyakatkwao.com">chaiyakatkwao.com</a></li>
            <li><a href="https://www.instagram.com/chaiya.a" rel="noopener">instagram.com/chaiya.a</a></li>
          </ul>
        </header>

        <section aria-labelledby="cv-summary">
          <h2 id="cv-summary">Summary</h2>
          <p className="v2-cv__summary">
            Runs production for a {L.rooms}-room TikTok live commerce studio: 10
            brands, a live department of {L.department} and {L.gear} pieces of gear.
            Trained in photography (BFA, Chiang Mai University); plans the lighting
            and camera look for each brand, and built three internal tools that
            teams use every day (chaiyakatkwao.com/systems).
          </p>
        </section>

        <div className="v2-cv__cols">
          <section aria-labelledby="cv-experience">
            <h2 id="cv-experience">Experience</h2>
            {experience.map((job) => (
              <article key={job.role + job.company} className="v2-cv__job">
                <p className="v2-cv__org">{job.company}</p>
                <p>{job.role}</p>
                <p className="v2-cv__meta">
                  <span className="v2-mono">{job.period}</span> · {job.location}
                </p>
                <ul className="v2-cv__points">
                  {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </article>
            ))}
          </section>

          <div className="v2-cv__side">
            <section aria-labelledby="cv-education">
              <h2 id="cv-education">Education</h2>
              <ul className="v2-info__list">
                <li>
                  <span className="v2-mono">2020–2025</span>
                  <span>Chiang Mai University, BFA Photography</span>
                </li>
              </ul>
            </section>

            <section aria-labelledby="cv-exhibitions">
              <h2 id="cv-exhibitions">Exhibitions</h2>
              <ul className="v2-info__list">
                {exhibitions.map((ex) => (
                  <li key={ex.title}>
                    <span className="v2-mono">{ex.year}</span>
                    <span>{ex.title}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="cv-skills">
              <h2 id="cv-skills">Skills</h2>
              <dl className="v2-cv__skills">
                {skills.map((s) => (
                  <div key={s.group}>
                    <dt>{s.group}</dt>
                    <dd>{s.items}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="cv-brands">
              <h2 id="cv-brands">Brands</h2>
              <p className="v2-cv__text">Live commerce for {liveBrands.join(", ")}</p>
            </section>

            <section aria-labelledby="cv-languages">
              <h2 id="cv-languages">Languages</h2>
              <ul className="v2-info__list v2-cv__langs">
                <li>Thai (Native)</li>
                <li>English (Upper intermediate)</li>
              </ul>
            </section>
          </div>
        </div>

        <p className="v2-cv__foot">Updated October 2026</p>
      </main>
    </>
  );
}
