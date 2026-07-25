"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageTransition from "@/components/PageTransition";
import FadeIn, { fadeUp, stagger } from "@/components/FadeIn";
import Footer from "@/components/Footer";

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

export default function About() {
  return (
    <PageTransition>
      <section className="pt-16 px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Left column */}
          <div className="lg:col-span-7">
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 12 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-8"
            >
              About
            </motion.p>

            <motion.h1
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 32 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[var(--color-warm)] leading-[0.92] mb-16"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Chaiya /
              <br />
              Katkwao.
            </motion.h1>

            <motion.div
              variants={stagger}
              whileInView="show"
              initial="hidden"
              viewport={{ once: true, margin: "-5%" }}
              className="space-y-8 max-w-xl"
            >
              <motion.p
                variants={fadeUp}
                className="font-body text-[15px] leading-relaxed tracking-wide text-[var(--color-grey-300)]"
                style={{ fontWeight: 300 }}
              >
                Chaiya is a Bangkok-based Creative Producer working at the
                intersection of art direction and technical execution.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-[15px] leading-relaxed tracking-wide text-[var(--color-grey-400)]"
                style={{ fontWeight: 300 }}
              >
                Raised between the rhythms of rural Udon Thani and the density
                of Bangkok, he came to image-making through lived experience —
                not theory. He studied Photography at Chiang Mai University,
                where his practice culminated in Woven Memories (2025), a
                photographic project tracing identity, memory, and everyday
                life.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-[15px] leading-relaxed tracking-wide text-[var(--color-grey-400)]"
                style={{ fontWeight: 300 }}
              >
                Now at Ad The Top Agency, he develops multi-camera productions
                and live content systems — translating visual ideas into
                structured workflows that hold up at scale.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-[15px] leading-relaxed tracking-wide text-[var(--color-warm)]"
                style={{ fontWeight: 500 }}
              >
                He is interested in one thing: making creative work that
                functions as well as it looks.
              </motion.p>
            </motion.div>

            <FadeIn delay={0.1} className="mt-16">
              <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-2">
                Education
              </p>
              <p className="font-body text-[var(--color-grey-300)] text-[13px] tracking-wide">
                BFA Photography — Chiang Mai University, 2020–2025
              </p>
            </FadeIn>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 lg:pl-16">
            {/* Portrait */}
            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-dark)] mb-12"
            >
              <Image
                src="/images/portrait/dan.jpg"
                alt="Chaiya Katkwao"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </motion.div>

            {/* Experience timeline */}
            <div>
              <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-6">
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
                    className="border-t border-[var(--color-grey-700)] py-4"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-body text-[var(--color-grey-300)] text-[13px] tracking-wide flex-1 min-w-0 pr-4">
                        {item.role}
                      </p>
                      <span className="font-body text-[11px] text-[var(--color-grey-400)] tracking-[0.05em] shrink-0 whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    <p className="font-body text-[var(--color-grey-400)] text-[12px] tracking-[0.08em]">
                      {item.company} — {item.location}
                    </p>
                  </motion.div>
                ))}
                <div className="border-t border-[var(--color-grey-700)]" />
              </div>
            </div>

            {/* Capabilities */}
            <div className="mt-12">
              <FadeIn>
                <p className="font-body text-[11px] tracking-[0.28em] uppercase text-[var(--color-grey-400)] mb-6">
                  Capabilities
                </p>
              </FadeIn>
              <motion.div
                variants={stagger}
                whileInView="show"
                initial="hidden"
                viewport={{ once: true, margin: "-5%" }}
              >
                {capabilities.map((cap) => (
                  <motion.div
                    key={cap}
                    variants={fadeUp}
                    className="border-t border-[var(--color-grey-700)] py-3"
                  >
                    <p className="font-body text-[var(--color-grey-300)] text-[13px] tracking-wide">{cap}</p>
                  </motion.div>
                ))}
                <div className="border-t border-[var(--color-grey-700)]" />
              </motion.div>
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
                  className="border-t border-[var(--color-grey-700)] py-4 flex items-baseline justify-between last:border-b"
                >
                  <span
                    className="font-heading text-[var(--color-warm)]"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                    }}
                  >
                    {name}
                  </span>
                  <span className="font-body text-[11px] tracking-[0.18em] text-[var(--color-grey-400)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="border-t border-[var(--color-grey-700)] px-8 py-24">
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
            <motion.a
              href="mailto:chaiyakatkwao@gmail.com"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-body inline-block text-xs tracking-[0.05em] sm:tracking-[0.2em] uppercase text-[var(--color-warm)] border border-[var(--color-warm)] px-4 sm:px-8 py-4 hover:bg-[var(--color-warm)] hover:text-[var(--color-surface-chat)] transition-all duration-500"
            >
              chaiyakatkwao@gmail.com
            </motion.a>
            <motion.a
              href="/cv"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-body inline-block text-xs tracking-[0.2em] uppercase text-[var(--color-grey-500)] border border-[var(--color-grey-700)] px-8 py-4 hover:border-[var(--color-warm)] hover:text-[var(--color-warm)] transition-all duration-500"
            >
              View CV →
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </PageTransition>
  );
}
