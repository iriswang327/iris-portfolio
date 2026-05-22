"use client";

import { useState } from "react";
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
  companyName: "Integrated Design Project",
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
    id: "integrated-design-thinking",
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
    title:
      "The Dune Franchise: Copyright Disputes & Entertainment Ownership Frameworks",
    href: "#",
  },
  {
    title:
      "Medspa Regulations: Algorithmic Policy Analysis within Consumer Healthcare",
    href: "#",
  },
] as const;

const ANALYTICAL_LEDGER = [
  {
    id: "tulj",
    organizationName: "Texas Undergraduate Law Journal",
    roleName: "staff writer",
    timeline: "2025-present",
    icon: "⚖",
    papers: LAW_PAPERS,
  },
  {
    id: "daily-texan",
    organizationName: "The Daily Texan",
    roleName: "opinion illustrator",
    timeline: "2024–2025",
    icon: "✎",
    linkHref: "#",
    linkLabel: "view illustration archive →",
  },
] as const;

const OPERATIONAL_LEDGER = [
  {
    id: "letters-of-gold",
    companyName: "Letters of Gold",
    roleTitle: "Director of Special Projects",
    dateRange: "2025–Present",
    icon: "G",
  },
  {
    id: "longhorn-racing",
    companyName: "Longhorn Racing",
    roleTitle: "Operations Team · Designer",
    dateRange: "2025–Present",
    icon: "L",
  },
  {
    id: "sparro",
    companyName: "SparroWriting Services",
    roleTitle: "Office Manager & Teaching Assistant",
    dateRange: "2022–2025",
    icon: "S",
  },
  {
    id: "asuci",
    companyName: "ASUCI Student Government",
    roleTitle: "Design & Outreach Intern",
    dateRange: "2023–2024",
    icon: "A",
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

// ─── Shared badge ─────────────────────────────────────────────────────────────

function LedgerBadge({ icon }: { icon: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.04] bg-white text-sm font-medium text-neutral-600 shadow-sm">
      {icon}
    </div>
  );
}

// ─── Operational archive row ──────────────────────────────────────────────────

function OperationalArchiveRow({
  icon,
  companyName,
  roleTitle,
  dateRange,
}: {
  icon: string;
  companyName: string;
  roleTitle: string;
  dateRange: string;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-black/[0.04] w-full max-w-6xl mx-auto px-6 group transition-colors duration-300 hover:bg-neutral-50/30 rounded-xl">
      <div className="flex items-center gap-4">
        <LedgerBadge icon={icon} />
        <div className="flex flex-col gap-0.5">
          <p className="text-[14px] font-semibold tracking-normal text-neutral-900">
            {companyName}
          </p>
          <p className="text-[12px] font-light text-neutral-400">{roleTitle}</p>
        </div>
      </div>
      <span className="text-[12px] font-light text-neutral-400/80 tracking-normal tabular-nums text-right select-none">
        {dateRange}
      </span>
    </div>
  );
}

const ANALYTICAL_LINK_CLASS =
  "mt-1 inline-flex items-center gap-1 text-[11px] font-medium lowercase tracking-wide text-indigo-500/90 transition-all duration-300 hover:text-indigo-600 hover:underline";

function AnalyticalColumnHeader({
  icon,
  organizationName,
  roleName,
  timeline,
}: {
  icon: string;
  organizationName: string;
  roleName: string;
  timeline: string;
}) {
  return (
    <div className="flex items-center">
      <LedgerBadge icon={icon} />
      <div className="ml-4 flex flex-col">
        <p className="text-[14px] font-semibold tracking-normal text-neutral-900">
          {organizationName}
        </p>
        <p className="mt-0.5 text-[12px] font-light text-neutral-400">
          {roleName} &middot; {timeline}
        </p>
      </div>
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
        <div className="mb-[72px] mt-9 w-full max-w-6xl">
          <h1 className="mb-4 text-5xl font-light lowercase tracking-tight text-neutral-900">
            experience
          </h1>
          <p className="mt-2 text-[15px] font-normal tracking-normal text-neutral-400">
            Advertising + Business + Design + Law.
          </p>
          <p className="mt-1 text-[15px] font-light tracking-normal text-neutral-400">
            All with the goal of making complex things human.
          </p>
        </div>

        <Hairline />

        {/* ── Pillar 1: Strategic Impact Cases ────────────────────────── */}
        <section style={{ marginTop: 64, marginBottom: 80 }}>
          <SectionLabel>Selected Projects</SectionLabel>

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
          <SectionLabel>Publications &amp; Illustrations</SectionLabel>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 mt-6 w-full items-start">
            {ANALYTICAL_LEDGER.map((entry) => (
              <div key={entry.id}>
                <AnalyticalColumnHeader
                  icon={entry.icon}
                  organizationName={entry.organizationName}
                  roleName={entry.roleName}
                  timeline={entry.timeline}
                />

                {"papers" in entry && (
                  <div className="mt-4 flex flex-col gap-4 pl-[60px]">
                    {entry.papers.map((paper) => (
                      <div key={paper.title}>
                        <p className="text-[13px] font-normal leading-relaxed text-neutral-600">
                          {paper.title}
                        </p>
                        <Link href={paper.href} className={ANALYTICAL_LINK_CLASS}>
                          read research paper →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                {"linkHref" in entry && (
                  <div className="mt-4 flex flex-col gap-4 pl-[60px]">
                    <Link href={entry.linkHref} className={ANALYTICAL_LINK_CLASS}>
                      {entry.linkLabel}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <Hairline />

        {/* ── Pillar 3: Operational Archive ───────────────────────────── */}
        <section style={{ marginTop: 64 }}>
          <SectionLabel>Marketing &amp; Operations</SectionLabel>

          <div className="flex w-full flex-col">
            {OPERATIONAL_LEDGER.map((entry) => (
              <OperationalArchiveRow
                key={entry.id}
                icon={entry.icon}
                companyName={entry.companyName}
                roleTitle={entry.roleTitle}
                dateRange={entry.dateRange}
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
