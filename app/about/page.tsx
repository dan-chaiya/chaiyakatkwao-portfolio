"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageTransition from "@/components/PageTransition";

const experience = [
  {
    role: "Live Producer",
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
  "Multi-camera Production",
  "Live Content Systems",
  "Studio Production",
  "Visual Storytelling",
  "Production Workflows",
  "Photography",
  "Audio-Visual Engineering",
];

const clients = [
  "Dutchmil Delivery",
  "Fitflop",
  "Her Hyness",
  "Nestlé Health Science",
  "Sunnies Studio Thailand",
  "Tokfashion",
  "Knack Factory",
  "BAKAO",
];

export default function About() {
  return (
    <PageTransition>
      <section className="pt-36 px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Left column */}
          <div className="lg:col-span-7">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#6B6560] mb-8">
              About
            </p>

            <h1
              className="font-heading text-[#F2F0EB] leading-[0.92] mb-16"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Dan /
              <br />
              Katkwao.
            </h1>

            <div className="space-y-8 max-w-xl">
              <p
                className="font-body text-sm leading-relaxed tracking-wide text-[#C8C4BC]"
                style={{ fontWeight: 300 }}
              >
                Dan is a Bangkok-based Creative Producer working at the
                intersection of art direction and technical execution.
              </p>

              <p
                className="font-body text-sm leading-relaxed tracking-wide text-[#6B6560]"
                style={{ fontWeight: 300 }}
              >
                Raised between the rhythms of rural Udon Thani and the density
                of Bangkok, he came to image-making through lived experience —
                not theory. He studied Photography at Chiang Mai University,
                where his practice culminated in Woven Memories (2025), a
                photographic project tracing identity, memory, and everyday
                life.
              </p>

              <p
                className="font-body text-sm leading-relaxed tracking-wide text-[#6B6560]"
                style={{ fontWeight: 300 }}
              >
                Now at Ad The Top Agency, he develops multi-camera productions
                and live content systems — translating visual ideas into
                structured workflows that hold up at scale.
              </p>

              <p
                className="font-body text-sm leading-relaxed tracking-wide text-[#C8C4BC]"
                style={{ fontWeight: 400, fontStyle: "italic" }}
              >
                He is interested in one thing: making creative work that
                functions as well as it looks.
              </p>
            </div>

            <div className="mt-16">
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] mb-2">
                Education
              </p>
              <p className="font-body text-[#C8C4BC] text-xs tracking-wide">
                BFA Photography — Chiang Mai University, 2020–2025
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 lg:pl-16">
            {/* Portrait */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#161514] mb-12">
              <Image
                src="/images/portrait/dan.jpg"
                alt="Dan Katkwao"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Experience timeline */}
            <div>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] mb-6">
                Experience
              </p>
              <div className="space-y-px">
                {experience.map((item, i) => (
                  <motion.div
                    key={i}
                    whileInView={{ x: 0 }}
                    initial={{ x: 20 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                    className="border-t border-[#2A2826] py-4"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-body text-[#C8C4BC] text-xs tracking-wide flex-1 min-w-0 pr-4">
                        {item.role}
                      </p>
                      <span className="font-body text-[9px] text-[#6B6560] tracking-[0.05em] shrink-0 whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    <p className="font-body text-[#6B6560] text-[10px] tracking-[0.1em]">
                      {item.company} — {item.location}
                    </p>
                  </motion.div>
                ))}
                <div className="border-t border-[#2A2826]" />
              </div>
            </div>

            {/* Capabilities */}
            <div className="mt-12">
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] mb-6">
                Capabilities
              </p>
              <div>
                {capabilities.map((cap, i) => (
                  <div
                    key={cap}
                    className="border-t border-[#2A2826] py-3 flex items-center justify-between"
                  >
                    <p className="font-body text-[#9A9087] text-xs tracking-wide">{cap}</p>
                    <span className="font-body text-[9px] text-[#2A2826] tracking-[0.1em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#2A2826]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected clients */}
      <section className="border-t border-[#2A2826] px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] mb-2">
              Selected
            </p>
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560]">
              Clients
            </p>
          </div>
          <div className="lg:col-span-9">
            <ul>
              {clients.map((name, i) => (
                <motion.li
                  key={name}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 12 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  className="border-t border-[#2A2826] py-4 flex items-baseline justify-between last:border-b"
                >
                  <span
                    className="font-heading text-[#F2F0EB]"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {name}
                  </span>
                  <span className="font-body text-[9px] tracking-[0.2em] text-[#2A2826]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="border-t border-[#2A2826] px-8 py-24">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="max-w-3xl"
        >
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#6B6560] mb-8">
            Contact
          </p>
          <h2
            className="font-heading text-[#F2F0EB] leading-[0.92] mb-10"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Available for /
            <br />
            new work.
          </h2>
          <a
            href="mailto:chaiyakatkwao@gmail.com"
            className="font-body inline-block text-xs tracking-[0.2em] uppercase text-[#F2F0EB] border border-[#F2F0EB] px-8 py-4 hover:bg-[#F2F0EB] hover:text-[#0D0D0D] transition-all duration-500"
          >
            chaiyakatkwao@gmail.com
          </a>
        </motion.div>
      </section>

      <footer className="border-t border-[#1E1C1A] px-8 py-8 flex items-center justify-between">
        <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560]">
          © 2026 Chaiya Katkwao
        </p>
        <div className="flex items-center gap-10">
          <a
            href="https://www.instagram.com/chaiya.a/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560] hover:text-[#C8C4BC] transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href="mailto:chaiyakatkwao@gmail.com"
            className="font-body text-[9px] tracking-[0.2em] uppercase text-[#6B6560] hover:text-[#C8C4BC] transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </footer>
    </PageTransition>
  );
}
