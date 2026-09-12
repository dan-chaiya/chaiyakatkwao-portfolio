"use client";

import Image from "next/image";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const experience = [
  {
    role: "Live Production Lead",
    company: "Ad The Top Agency",
    period: "2026 — Present",
    location: "Bangkok",
  },
  {
    role: "Audio/Visual Engineer",
    company: "Modal Creative Studio",
    period: "2025 — 2026",
    location: "Bangkok",
  },
  {
    role: "Freelance Creative",
    company: "Independent",
    period: "2022 — Present",
    location: "Thailand",
  },
];

const capabilities = [
  "Art Direction",
  "Creative Direction",
  "Photography",
  "Video Editing & Color Grading",
  "Styling",
  "Multi-camera Production",
  "Lighting Design",
  "Live Commerce Production",
  "Live Content Systems",
  "Studio Production",
  "Visual Storytelling",
  "Audio-Visual Engineering",
];

const clients = [
  "Colgate",
  "Dutchmil Delivery",
  "Fitflop",
  "Guess",
  "Her Hyness",
  "Nestlé",
  "Rojukiss",
  "Sunnies Studio Thailand",
  "Tokfashion",
  "Knack Factory",
  "BAKAO",
];

export default function AboutClient() {
  return (
    <PageTransition>
      <main id="main-content">
      <section className="pt-16 px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Left column */}
          <div className="lg:col-span-7">
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-8">
              About
            </p>

            <h1
              className="font-heading text-[var(--color-warm)] leading-[0.92] mb-16"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Chaiya /
              <br />
              Katkwao.
            </h1>

            <div className="space-y-8 max-w-xl">
              <p className="copy-lead">
                Chaiya is a Bangkok-based Creative Producer working at the
                intersection of art direction and technical execution.
              </p>

              <p className="copy-body">
                Raised between the rhythms of rural Udon Thani and the density
                of Bangkok, he came to image-making through lived experience —
                not theory. He studied Photography at Chiang Mai University,
                where his practice culminated in Woven Memories (2025), a
                photographic project tracing identity, memory, and everyday
                life.
              </p>

              <p className="copy-body">
                Now at Ad The Top Agency, he develops multi-camera productions
                and live content systems — translating visual ideas into
                structured workflows that hold up at scale.
              </p>

              <p className="copy-body" style={{ color: "var(--color-warm)", fontWeight: 500 }}>
                He is interested in one thing: making creative work that
                functions as well as it looks.
              </p>

              {/* Cross-link to the management portfolio. Plain <a>, not
                  next/link: /systems is a static file in public/, not a route.
                  Placed after the closing line rather than in the nav, because
                  it is a claim about the work and not a sixth category of it. */}
              <p className="copy-body">
                Some of that work is software he builds and maintains himself.
                Three internal systems, still in daily use by the teams they
                were made for, are documented in{" "}
                <a
                  href="/systems"
                  className="text-[var(--color-text)] border-b border-[var(--color-accent)] pb-px transition-colors duration-200 hover:text-[var(--color-warm)]"
                >
                  Systems
                </a>
                .
              </p>
            </div>

            <div className="mt-16">
              <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-2">
                Education
              </p>
              <p className="copy-small">
                BFA Photography — Chiang Mai University, 2020–2025
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 lg:pl-16">
            {/* Portrait */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-dark)] mb-12">
              <Image
                src="/images/portrait/dan.jpg"
                alt="Chaiya Katkwao | Creative Producer in Bangkok"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Experience timeline */}
            <div>
              <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-6">
                Experience
              </p>
              <div className="space-y-px">
                {experience.map((item, i) => (
                  <div key={i} className="border-t border-[var(--color-grey-700)] py-4">
                    <div className="flex items-start justify-between mb-1">
                      <p className="copy-small flex-1 min-w-0 pr-4">
                        {item.role}
                      </p>
                      <span className="font-body text-[11px] text-[var(--color-grey-400)] tracking-[0.05em] shrink-0 whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    <p className="font-body text-[13px] tracking-[0.04em] text-[var(--color-grey-400)]">
                      {item.company} — {item.location}
                    </p>
                  </div>
                ))}
                <div className="border-t border-[var(--color-grey-700)]" />
              </div>
            </div>

            {/* Capabilities */}
            <div className="mt-12">
              <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-6">
                Capabilities
              </p>
              <div>
                {capabilities.map((cap) => (
                  <div key={cap} className="border-t border-[var(--color-grey-700)] py-3">
                    <p className="copy-small">{cap}</p>
                  </div>
                ))}
                <div className="border-t border-[var(--color-grey-700)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected clients */}
      <section className="border-t border-[var(--color-grey-700)] px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-2">
              Selected
            </p>
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)]">
              Clients
            </p>
          </div>
          <div className="lg:col-span-9">
            <ul>
              {clients.map((name, i) => (
                <li
                  key={name}
                  className="border-t border-[var(--color-grey-700)] py-4 flex items-baseline justify-between last:border-b"
                >
                  <span
                    className="font-heading text-[var(--color-warm)]"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {name}
                  </span>
                  <span className="font-body text-[11px] tracking-[0.18em] text-[var(--color-grey-400)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="border-t border-[var(--color-grey-700)] px-8 py-24">
        <div className="max-w-3xl">
          <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-8">
            Contact
          </p>
          <h2
            className="font-heading text-[var(--color-warm)] leading-[0.92] mb-10"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s /
            <br />
            connect.
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:chaiyakatkwao@gmail.com"
              className="font-body inline-block text-xs tracking-[0.05em] sm:tracking-[0.2em] uppercase text-[var(--color-warm)] border border-[var(--color-warm)] px-4 sm:px-8 py-4 hover:bg-[var(--color-warm)] hover:text-[var(--color-surface-chat)] transition-colors duration-200"
            >
              chaiyakatkwao@gmail.com
            </a>
            <a
              href="/cv"
              className="font-body inline-block text-xs tracking-[0.2em] uppercase text-[var(--color-grey-500)] border border-[var(--color-grey-700)] px-8 py-4 hover:border-[var(--color-warm)] hover:text-[var(--color-warm)] transition-colors duration-200"
            >
              View CV →
            </a>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </PageTransition>
  );
}
