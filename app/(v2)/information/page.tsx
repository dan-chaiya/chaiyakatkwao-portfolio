import Link from "next/link";
import Header from "@/components/v2/Header";
import Clock from "@/components/v2/Clock";
import Picture from "@/components/v2/Picture";
import { portrait, works } from "@/data/works";
import { INSTAGRAM_URL, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Information",
  description: "Chaiya Katkwao, photographer, artist and producer in Bangkok. Credits, exhibitions and contact.",
  path: "/information",
});

// From _curation.md (brief, Information).
const EXHIBITIONS = [
  { year: "2025", title: "ID", place: "Red Dog Gallery, Chiang Mai" },
  { year: "2023", title: "กิ่ง ก้าน ใบ", place: "Faculty of Fine Arts, CMU" },
  { year: "2021", title: "FUIYOH", place: "CMU Art Center, Chiang Mai" },
];

export default function InformationPage() {
  const credits = works.filter((w) => w.credit);

  return (
    <>
      <Header />
      <main id="main-content" className="v2-info">
        <div className="v2-info__text">
          <h1 className="v2-info__bio">Chaiya Katkwao is a photographer, artist and producer based in Bangkok.</h1>

          <section aria-labelledby="credits">
            <h2 id="credits">Credits</h2>
            <ul className="v2-info__list">
              {credits.map((w) => (
                <li key={w.slug}>
                  <span className="v2-mono">{w.year || "—"}</span>
                  <span>
                    {w.title}, {w.credit}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="exhibitions">
            <h2 id="exhibitions">Exhibitions</h2>
            <ul className="v2-info__list">
              {EXHIBITIONS.map((e) => (
                <li key={e.title}>
                  <span className="v2-mono">{e.year}</span>
                  <span>
                    {e.title}, {e.place}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact">Contact</h2>
            <ul className="v2-info__contact">
              <li>
                <a href="mailto:chaiyakatkwao@gmail.com">chaiyakatkwao@gmail.com</a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} rel="me noopener" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                Bangkok <Clock className="v2-mono" />
              </li>
              <li>
                <Link href="/cv">CV</Link>
              </li>
            </ul>
          </section>
        </div>

        <figure className="v2-info__portrait">
          <Picture frame={portrait} alt="Chaiya Katkwao" sizes="(max-width: 768px) 100vw, 40vw" priority />
        </figure>
      </main>
    </>
  );
}
