"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Pillar 1: Strategic Impact Cards ────────────────────────────────────────

const IMPACT_CARDS = [
  {
    id: "risk-radar",
    tag: "AI PRODUCT STRATEGY",
    title: "Risk Radar — AI Crisis Engine",
    body: "Designed front-end user experience architectures for predictive crisis models. Synthesized complex back-end architectures, mapping LLM tokenization pipelines, BERT classification loops, and vector embedding structures directly into low-friction design frameworks for non-technical enterprise executives.",
    bg: "linear-gradient(148deg, #0D0D14 0%, #1A1A2E 100%)",
    dark: true,
  },
  {
    id: "integrated-design",
    tag: "BEHAVIORAL UX RESEARCH",
    title: "Unhoused Advocacy Ecosystem",
    body: "Orchestrated a full-semester user research process across student demographics and local businesses. Utilized rapid prototyping to evaluate friction points, successfully pivoting from retail merchandise systems to an integrated stadium jumbotron video framework coupled with a custom-coded responsive QR data-collection landing page.",
    bg: "linear-gradient(148deg, #F5F0E8 0%, #EDE5D4 100%)",
    dark: false,
  },
  {
    id: "tower-bridge",
    tag: "DATA & ANALYTICS STRATEGY",
    title: "Tower & Bridge — Analytics Orchestration",
    body: "Managed performance data metrics and consumer visibility tracking layouts across multiple accounts (Trinity CDC, Heartening Sustainability). Translated raw engagement data reports directly into pitching slide decks to secure executive project approvals.",
    bg: "linear-gradient(148deg, #0A1A0F 0%, #0F2A1A 100%)",
    dark: true,
  },
] as const;

// ─── Pillar 2: Publication Ledger ─────────────────────────────────────────────

const LAW_PAPERS = [
  {
    title: "The Dune Franchise: Copyright Disputes & Entertainment Ownership Frameworks",
    href: "#",
    cta: "Read Legal Analysis Paper",
  },
  {
    title: "Medspa Regulations: Algorithmic Policy Analysis within Consumer Healthcare",
    href: "#",
    cta: "Read Publication",
  },
] as const;

// ─── Pillar 3: Operational Archive ────────────────────────────────────────────

const ARCHIVE = [
  {
    org: "SparroWriting Services",
    role: "Office Manager & Teaching Assistant",
    dates: "2022–2025",
    detail:
      "Designed enterprise web landing interfaces, customer business card structures, and brand flyers. Managed cross-functional operational scheduling spreadsheets detailing 300+ competitive academic scholarship pathways while co-leading student workshops centered on creative problem-solving metrics.",
  },
  {
    org: "ASUCI Student Government",
    role: "Outreach Executive Intern",
    dates: "2023–2024",
    detail:
      "Managed promotional social layouts across food security and campus climate commissions. Spearheaded, designed, and executed a live on-campus matchmaking engagement event hosting over 200+ concurrent students.",
  },
  {
    org: "Service Industry Foundations",
    role: "Operational Workflow Tracker",
    dates: "2021–2023",
    detail:
      "Bella Italia Hostess & TP Tea Barista. Managed inventory log registers, assisted management staff in generating weekly employee scheduling matrix sheets, and structured client seat assignments for optimal room turnover flow during high-volume rush periods.",
  },
] as const;

// ─── Hairline ─────────────────────────────────────────────────────────────────

function Hairline() {
  return (
    <div
      aria-hidden="true"
      style={{ height: "0.5px", background: "rgba(0,0,0,0.06)" }}
    />
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 400,
        color: "#BBBBBB",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        marginBottom: 28,
      }}
    >
      {children}
    </p>
  );
}

// ─── Archive row (accordion) ──────────────────────────────────────────────────

function ArchiveRow({
  org,
  role,
  dates,
  detail,
  isLast,
}: {
  org: string;
  role: string;
  dates: string;
  detail: string;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-sm"
        aria-expanded={open}
      >
        <div className="flex items-center justify-between py-4 gap-4">
          <div className="flex-1 min-w-0">
            <span
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "var(--foreground)",
                letterSpacing: "-0.01em",
              }}
            >
              {org}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "#888888",
                marginLeft: 10,
              }}
            >
              {role}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              style={{
                fontSize: 11,
                fontWeight: 300,
                color: "#BBBBBB",
                letterSpacing: "0.02em",
              }}
            >
              {dates}
            </span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                fontSize: 11,
                color: "#BBBBBB",
                display: "block",
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              ↓
            </motion.span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "#888888",
                lineHeight: 1.75,
                paddingBottom: 16,
                paddingLeft: 0,
                maxWidth: 600,
              }}
            >
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLast && <Hairline />}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExperiencePage() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "transparent", paddingBottom: 100 }}
    >
      {/* Watercolor gradient orbs */}
      <div className="absolute top-[-8%] left-[-8%] w-[650px] h-[650px] bg-pink-400/10 rounded-full blur-[120px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute top-[15%] right-[-10%] w-[700px] h-[700px] bg-purple-400/12 rounded-full blur-[110px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[100px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-blue-300/[0.05] rounded-full blur-[110px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="w-full max-w-6xl mx-auto px-6 pt-36 pb-12 block">

        {/* ── Hero header ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: 72 }}>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 200,
              color: "var(--foreground)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            experience
          </h1>
          <p
            style={{
              fontSize: 14,
              fontWeight: 300,
              color: "#888888",
              lineHeight: 1.7,
              maxWidth: 580,
            }}
          >
            Synthesizing AI systems architecture, user behavioral research, and analytics data to build high-utility product ecosystems.
          </p>
        </div>

        <Hairline />

        {/* ── Pillar 1: Strategic Impact Cases ────────────────────────── */}
        <section style={{ marginTop: 64, marginBottom: 80 }}>
          <SectionLabel>Strategic Impact Cases</SectionLabel>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {IMPACT_CARDS.map((card) => {
              const fg = card.dark ? "rgba(255,255,255,0.85)" : "var(--foreground)";
              const tagColor = card.dark ? "rgba(255,255,255,0.35)" : "#BBBBBB";
              const bodyColor = card.dark ? "rgba(255,255,255,0.5)" : "#888888";
              const borderColor = card.dark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.06)";

              return (
                <Link
                  key={card.id}
                  href={`#${card.id}`}
                  className="block transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-2xl"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      background: card.bg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 16,
                      padding: "28px 24px 24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      height: "100%",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 9,
                        fontWeight: 400,
                        color: tagColor,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      {card.tag}
                    </p>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 300,
                        color: fg,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.35,
                      }}
                    >
                      {card.title}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 300,
                        color: bodyColor,
                        lineHeight: 1.75,
                      }}
                    >
                      {card.body}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <Hairline />

        {/* ── Pillar 2: Analytical & Publication Ledger ────────────────── */}
        <section style={{ marginTop: 64, marginBottom: 80 }}>
          <SectionLabel>Analytical Ledger &amp; Public Media</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Left: Law Journal */}
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "var(--foreground)",
                  letterSpacing: "-0.01em",
                  marginBottom: 20,
                }}
              >
                Texas Undergraduate Law Journal — Staff Writer
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {LAW_PAPERS.map((paper, i) => (
                  <div key={paper.cta}>
                    <div style={{ paddingTop: 14, paddingBottom: 14 }}>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 300,
                          color: "#444444",
                          lineHeight: 1.6,
                          marginBottom: 8,
                        }}
                      >
                        {paper.title}
                      </p>
                      <Link
                        href={paper.href}
                        style={{
                          fontSize: 11,
                          fontWeight: 300,
                          color: "#A78BFA",
                          letterSpacing: "0.01em",
                        }}
                        className="hover:opacity-70 transition-opacity"
                      >
                        [{paper.cta}]
                      </Link>
                    </div>
                    {i < LAW_PAPERS.length - 1 && <Hairline />}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Daily Texan */}
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "var(--foreground)",
                  letterSpacing: "-0.01em",
                  marginBottom: 20,
                }}
              >
                The Daily Texan — Editorial Illustrator
              </p>

              <div
                style={{
                  background: "#FAFAFA",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  padding: "20px 20px 18px",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#BBBBBB",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Editorial Visual Communications (2024–Present)
                </p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 300,
                    color: "#888888",
                    lineHeight: 1.75,
                  }}
                >
                  Produced 15+ custom hand-drawn editorial illustrations translating dense political, campus climate, and systemic news narratives into concise visual art layouts.
                </p>
              </div>
            </div>

          </div>
        </section>

        <Hairline />

        {/* ── Pillar 3: Operational Archive ───────────────────────────── */}
        <section style={{ marginTop: 64 }}>
          <SectionLabel>Operational Archive</SectionLabel>

          <div>
            {ARCHIVE.map((item, i) => (
              <ArchiveRow
                key={item.org}
                org={item.org}
                role={item.role}
                dates={item.dates}
                detail={item.detail}
                isLast={i === ARCHIVE.length - 1}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
