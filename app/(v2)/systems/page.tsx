import Header from "@/components/v2/Header";
import { pageMetadata } from "@/lib/seo";

// Text from systems-page-redacted.md (Dan's redacted draft), word for word. Company rule:
// no company name, no room numbers, no real screenshots, no CEO, no exact inventory count.
// The draft's redrawn figures don't exist yet, so only the architecture diagram ships.

export const metadata = pageMetadata({
  title: "Systems",
  description:
    "Three systems for small teams: a studio operations app, an equipment register, and a private two-person archive. Built and maintained hands-on.",
  path: "/systems",
});

type Table = { title: string; head: [string, string, string]; rows: [string, string, string][] };
type Case = {
  id: string;
  title: string;
  lede: string;
  stats: [string, string][];
  sections: [string, string[]][];
  diagram?: boolean;
  tables: Table[];
};

const CASES: Case[] = [
  {
    id: "live-studio-os",
    title: "Studio Operations App",
    lede: "One web app the team opens on whatever is to hand, a phone on the studio floor or a desktop at the office, against one Google Sheet.",
    stats: [
      ["20+", "releases, in daily use"],
      ["1", "author, building with Claude"],
      ["7", "tabs in one sheet, the database"],
      ["0", "servers, hosting or licences to pay for"],
    ],
    sections: [
      ["Role", ["Designed and built by me, with Claude (AI-assisted). An engineering colleague ported the first version to Google Apps Script; I developed it from there through every release since. In-house, multi-room live studio."]],
      ["Problem", ["Studio procedure, equipment records and fault history lived in separate documents that had begun to contradict one another. The answer to “what is in this room, and does it still work” depended on who you asked."]],
      ["What I built", ["One web app the team opens on whatever is to hand, a phone on the studio floor or a desktop at the office. Standard settings and a shutdown checklist, per-room equipment guides, a health check that turns a walkthrough into action items, and a fault log that exports the monthly report. Google Apps Script serves a single page; a Google Sheet is the database, addressed by column name rather than position so staff can reorder and rename it without a migration."]],
      ["Constraints", ["No budget for hosting or licences, no staging environment, and a team with no technical background. It runs on the Google Workspace the company already pays for. Every change deploys straight against the data the team is using that day: the database is a document they have open while the code is writing to it."]],
      [
        "Outcome",
        [
          "In daily use by the studio team, with more than twenty releases shipped. Requests now arrive as feature ideas rather than workarounds. The data layer is round-trip tested (written, read back, compared), so reordering a column no longer breaks anything. The save path has since been rebuilt to write one row at a time, so two people can log at once without overwriting each other. The limits that remain, check results tied to row order and no audit trail, are documented and deliberately unfixed.",
          "I brought the studio floor and the operational discipline, and used Claude for the build. The database rules the system is now held to, and the deploy order that stops old code redeploying over live data, exist because both had already gone wrong once.",
        ],
      ],
    ],
    diagram: true,
    tables: [
      {
        title: "What changed for the team",
        head: ["Aspect", "Before", "After"],
        rows: [
          ["Equipment records", "A sheet per room, edited by hand", "One register, read by the app"],
          ["Fault history", "Told in chat, then lost", "Logged with room, phase and severity"],
          ["Monthly report", "Rebuilt by hand each month", "Exported from the log as PDF or CSV"],
          ["Source of truth", "Two documents disagreeing", "One dashboard, named as authoritative"],
        ],
      },
      {
        title: "Treating a spreadsheet as a data layer",
        head: ["Rule", "Before", "After"],
        rows: [
          ["Column access", "By position", "By header name"],
          ["Reordering columns", "Broke the app silently", "Free, and expected"],
          ["Types", "Coerced by Sheets, unnoticed", "Converted on read, locked on write"],
          ["Verification", "Assumed", "Round-trip tested"],
        ],
      },
    ],
  },
  {
    id: "keepsake",
    title: "Keepsake",
    lede: "A private two-person archive, one page installed to the home screen, that would outlive whatever platform held it.",
    stats: [
      ["2", "users, allow-listed at the edge"],
      ["1", "runtime dependency permitted"],
      ["30", "days of retention on the sweep"],
      ["1", "nightly backup, to a different vendor"],
    ],
    sections: [
      ["Role", ["Sole designer and developer. Private commission, two users."]],
      ["Problem", ["Two people wanted a single shared record of their life together that would outlive whatever platform held it. Consumer apps make that record someone else’s asset, and none of them promise you can get it back intact."]],
      ["What I built", ["A private two-person archive: entries with photographs, tags and colour labels, a timeline, and an on-this-day view. One page, installed to the home screen. Cloudflare Workers with D1 and R2, behind Access allow-listing exactly two addresses."]],
      ["Constraints", ["One of the two users is non-technical and had to manage on his own Android handset without instruction. Exactly one runtime dependency was permitted. The backup was not allowed to sit with the same vendor as the data."]],
      ["Outcome", ["Deployed August 2026 with a nightly backup to a different vendor and a thirty-day retention sweep. The acceptance test was not a passing suite; it was the non-technical user creating a memory unassisted, on his own phone. He did."]],
    ],
    tables: [
      {
        title: "The obvious build, and the one I shipped",
        head: ["Decision", "Before", "After"],
        rows: [
          ["Photo storage", "Object storage on a paid tier", "R2, zero egress at any volume"],
          ["Thumbnails", "An image transform service", "Made on the phone before upload"],
          ["Sign-in", "Password screen and session code", "Edge auth, two addresses allow-listed"],
          ["Backup", "Same vendor as the data", "Nightly export to a different one"],
        ],
      },
    ],
  },
  {
    id: "equipment-register",
    title: "The equipment register",
    lede: "A live register of more than five hundred items, held per room and floor, built on top of the stock admin’s own workbook.",
    stats: [
      ["500+", "items in the live register"],
      ["1", "live register kept in sync with the latest stock data"],
      ["0", "new tools for the admin team to learn"],
    ],
    sections: [
      ["Role", ["Sole author of the live register and its Python scripts, written with Claude (AI-assisted). The starting structure is the stock admin’s; I duplicated and converted it. In-house, multi-room live studio."]],
      ["Problem", ["The stock admin kept equipment in a workbook that worked for stock, but nobody outside the admin team could see what each room held, and formulas needed repairing by script before a total could be trusted."]],
      ["What I built", ["A live register of more than five hundred items, per room and floor, synced with the most current stock data, so the admin team and management can see what each studio room contains. Python scripts rebuild the rollups and repair the formulas from the room sheets."]],
      ["Constraints", ["It had to stay a spreadsheet. The people maintaining it work in Excel and were never going to adopt a tool. Column order had to remain theirs to change."]],
      ["Outcome", ["Admin and management now read from one register that mirrors the stock data, instead of asking the admin who knows what is in a room."]],
    ],
    tables: [
      {
        title: "What changed",
        head: ["Aspect", "Before", "After"],
        rows: [
          ["Who could see room contents", "The stock admin", "Admin and management"],
          ["Rollups", "Retyped by hand", "Rebuilt by script"],
          ["Source of truth", "Admin’s workbook", "Admin’s workbook, mirrored by the live register"],
        ],
      },
    ],
  },
];

// Redrawn in ink from the old /systems page; labels unchanged.
function Diagram() {
  const node = (x: number, y: number, i: string, label: string, sub: string) => (
    <g key={i}>
      <text className="v2-dg__index" x={x + 16} y={y + 26}>{i}</text>
      <rect className="v2-dg__node" x={x} y={y} width="220" height="96" />
      <text className="v2-dg__label" x={x + 110} y={y + 42} textAnchor="middle">{label}</text>
      <text className="v2-dg__small" x={x + 110} y={y + 66} textAnchor="middle">{sub}</text>
    </g>
  );
  return (
    // On phones the diagram scrolls sideways inside the figure, so the figure takes focus
    // (arrow keys scroll it) and says what it is (axe scrollable-region-focusable).
    <figure className="v2-sys__figure" tabIndex={0} aria-label="Diagram: how the app is put together; scrolls sideways on small screens">
      <svg className="v2-dg" viewBox="-1 -1 1282 422" role="img" aria-labelledby="dg-title dg-desc">
        <title id="dg-title">How the app is put together</title>
        <desc id="dg-desc">A staff device opens the web app by URL. The app writes rows to a Google Sheet and reads that sheet back for history and statistics. The sheet feeds a report centre, which sends a monthly PDF or CSV to management.</desc>
        <defs>
          <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="14" markerHeight="14" markerUnits="userSpaceOnUse" orient="auto">
            <path className="v2-dg__head" d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        {node(0, 40, "A", "Staff device", "phone, tablet or desktop")}
        {node(330, 40, "B", "Apps Script web app", "one page, no build step")}
        {node(330, 280, "C", "Google Sheet", "seven tabs, one source")}
        {node(700, 280, "D", "Report centre", "PDF or CSV, by month")}
        {node(1030, 280, "E", "Recipient", "management")}
        <line className="v2-dg__edge" x1="220" y1="88" x2="316" y2="88" markerEnd="url(#dg-arrow)" />
        <text className="v2-dg__small" x="268" y="76" textAnchor="middle">open URL</text>
        <line className="v2-dg__edge" x1="396" y1="136" x2="396" y2="266" markerEnd="url(#dg-arrow)" />
        <text className="v2-dg__small" x="386" y="205" textAnchor="end">write row</text>
        <line className="v2-dg__edge" x1="484" y1="280" x2="484" y2="150" markerEnd="url(#dg-arrow)" />
        <text className="v2-dg__small" x="494" y="196">read for history</text>
        <text className="v2-dg__small" x="494" y="212">and statistics</text>
        <line className="v2-dg__edge" x1="550" y1="328" x2="686" y2="328" markerEnd="url(#dg-arrow)" />
        <text className="v2-dg__small" x="618" y="316" textAnchor="middle">build report</text>
        <line className="v2-dg__edge" x1="920" y1="328" x2="1016" y2="328" markerEnd="url(#dg-arrow)" />
        <text className="v2-dg__small" x="968" y="316" textAnchor="middle">send</text>
      </svg>
      <figcaption>How the app is put together</figcaption>
    </figure>
  );
}

export default function SystemsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="v2-sys">
        <header className="v2-sys__intro">
          <h1 className="v2-info__bio">Internal systems.</h1>
          <p>Built and maintained by Chaiya Katkwao. Google Apps Script, Sheets, and a team that uses them every day.</p>
        </header>

        {CASES.map((c, n) => (
          <article key={c.id} id={c.id} className="v2-sys__case" aria-labelledby={`${c.id}-title`}>
            <p className="v2-mono v2-sys__count">
              Case {n + 1} / {CASES.length}
            </p>
            <h2 id={`${c.id}-title`} className="v2-sys__title">
              {c.title}
            </h2>
            <p className="v2-sys__lede">{c.lede}</p>

            {/* A ruled list at reading size, like the credits on Information. Not big numbers
                over small labels: that is the hero-metric template (audit 2026-10-29). */}
            <ul className="v2-info__list v2-sys__facts">
              {c.stats.map(([num, label]) => (
                <li key={label}>
                  <span className="v2-mono">{num}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <div className="v2-sys__body">
              {c.sections.map(([head, paras]) => (
                <section key={head}>
                  <h3>{head}</h3>
                  {paras.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </section>
              ))}
            </div>

            {c.diagram && <Diagram />}

            {c.tables.map((t) => (
              <table key={t.title} className="v2-sys__table">
                <caption>{t.title}</caption>
                <thead>
                  <tr>
                    {t.head.map((h) => (
                      <th key={h} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map(([a, b, after]) => (
                    <tr key={a}>
                      <th scope="row">{a}</th>
                      <td>{b}</td>
                      <td>{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </article>
        ))}
      </main>
    </>
  );
}
