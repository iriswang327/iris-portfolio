"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import CompanyModal, { type ModalProject } from "@/components/CompanyModal";

// ─── Pillar 1: Strategic Impact Cards ────────────────────────────────────────

interface ModalConfig {
  companyName: string;
  companyLogo: string;
  companyLogoImage?: string;
  whyCompanyText: string;
  projects: ModalProject[];
}

interface ImpactCardDef {
  id: string;
  gradient: string;
  pill: string;
  pillDark?: boolean;
  hoverDescription: string;
  modal: ModalConfig;
}

const TOWER_BRIDGE_MODAL: ModalConfig = {
  companyName: "Tower & Bridge",
  companyLogo: "T&B",
  whyCompanyText:
    "Managed performance data metrics and consumer visibility tracking layouts across multiple accounts (Trinity CDC, Heartening Sustainability). Translated raw engagement data reports directly into pitching slide decks to secure executive project approvals.",
  projects: [
    {
      title: "Analytics Orchestration",
      subtitle:
        "Performance metrics, visibility tracking, and executive pitch decks for real client accounts.",
      route: "/experience/tower-bridge/analytics-orchestration",
    },
  ],
};

const INTEGRATED_DESIGN_MODAL: ModalConfig = {
  companyName: "Integrated Design",
  companyLogo: "ID",
  whyCompanyText:
    "Orchestrated a full-semester user research process across student demographics and local businesses. Utilized rapid prototyping to evaluate friction points, successfully pivoting from retail merchandise systems to an integrated stadium jumbotron video framework coupled with a custom-coded responsive QR data-collection landing page.",
  projects: [
    {
      title: "Unhoused Advocacy Ecosystem",
      subtitle:
        "Full UX research cycle for unhoused community advocacy — from interviews to stadium-scale activation.",
      route: "/experience/integrated-design/unhoused-advocacy",
    },
  ],
};

const RISK_RADAR_MODAL: ModalConfig = {
  companyName: "Risk Radar",
  companyLogo: "RR",
  whyCompanyText:
    "Designed front-end user experience architectures for predictive crisis models. Synthesized complex back-end architectures, mapping LLM tokenization pipelines, BERT classification loops, and vector embedding structures directly into low-friction design frameworks for non-technical enterprise executives.",
  projects: [
    {
      title: "AI Crisis Engine",
      subtitle:
        "AI brand crisis prediction — BERT, RAG, Spring 2026.",
      route: "/experience/risk-radar/ai-crisis-engine",
    },
  ],
};

const STRATEGIC_IMPACT_CARDS: ImpactCardDef[] = [
  {
    id: "tower-bridge",
    gradient: "linear-gradient(148deg, #F5EDD8 0%, #EDD9A3 100%)",
    pill: "Tower & Bridge · Analytics Strategy",
    pillDark: false,
    hoverDescription: "Real clients, real strategy, real stakes.",
    modal: TOWER_BRIDGE_MODAL,
  },
  {
    id: "integrated-design",
    gradient: "linear-gradient(148deg, #FCE8F0 0%, #F4C8DC 100%)",
    pill: "Integrated Design · UX Research",
    pillDark: false,
    hoverDescription: "Full UX research cycle for unhoused community advocacy.",
    modal: INTEGRATED_DESIGN_MODAL,
  },
  {
    id: "risk-radar",
    gradient: "linear-gradient(148deg, #0D0D14 0%, #1A1A2E 100%)",
    pill: "Risk Radar · AI Product",
    pillDark: true,
    hoverDescription: "AI brand crisis prediction — BERT, RAG, Spring 2026.",
    modal: RISK_RADAR_MODAL,
  },
];

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
  const [activeModal, setActiveModal] = useState<ModalConfig | null>(null);

  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "transparent", paddingBottom: 100 }}
    >
      {/* Watercolor gradient orbs */}
      <div className="absolute top-[-8%] left-[-8%] w-[650px] h-[650px] bg-pink-400/20 rounded-full blur-[120px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute top-[15%] right-[-10%] w-[700px] h-[700px] bg-purple-400/20 rounded-full blur-[110px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[100px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-blue-300/15 rounded-full blur-[110px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="w-full max-w-6xl mx-auto px-6 pt-36 pb-12 block">

        {/* ── Hero header ─────────────────────────────────────────────── */}
        <div style={{ marginTop: 36, marginBottom: 72 }}>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mb-16">
            {STRATEGIC_IMPACT_CARDS.map((card) => (
              <ProjectCard
                key={card.id}
                gradient={card.gradient}
                pill={card.pill}
                pillDark={card.pillDark}
                hoverDescription={card.hoverDescription}
                onClick={() => setActiveModal(card.modal)}
              />
            ))}
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

      <CompanyModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        companyName={activeModal?.companyName ?? ""}
        companyLogo={activeModal?.companyLogo ?? ""}
        companyLogoImage={activeModal?.companyLogoImage}
        whyCompanyText={activeModal?.whyCompanyText ?? ""}
        projects={activeModal?.projects ?? []}
      />
    </div>
  );
}
