"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import CompanyModal, { type ModalProject } from "@/components/CompanyModal";
import ParallaxHeroGradient from "@/components/ParallaxHeroGradient";

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

const TOOLKIT = [
  "Figma",
  "Cursor",
  "Claude",
  "AI workflows",
  "HTML / CSS",
] as const;

const INTERNSHIP_TAGS = [
  "product design",
  "0-1",
  "AI",
  "research",
  "writing",
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

function ToolkitPill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-neutral-100 px-3.5 py-1.5 text-[12px] font-normal text-neutral-700">
      {label}
    </span>
  );
}

function InternshipTag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-neutral-200/70 px-2.5 py-1 text-[11px] font-light text-neutral-600">
      {label}
    </span>
  );
}

function ExperienceHero() {
  return (
    <section className="relative overflow-hidden">
      <ParallaxHeroGradient />

      <div className="experience-hero relative z-10">
        <div className="hero-left">
          <h1
            className="name-splash font-[200]"
            style={{
              color: "var(--foreground)",
              marginBottom: 14,
              fontSize: 48,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            experience
          </h1>

          <p className="subtitle font-[300] text-[18px] leading-snug">
            <span className="text-[var(--foreground)]">Advertising</span>
            <span className="text-[#A78BFA]/55"> + </span>
            <span className="text-[var(--foreground)]">Business</span>
            <span className="text-[#A78BFA]/55"> + </span>
            <span className="text-gradient-ihwn">Design</span>
            <span className="text-[#A78BFA]/55"> + </span>
            <span className="text-[var(--foreground)]">Law.</span>
          </p>

          <p
            className="lede font-[300]"
            style={{ color: "#888888", marginTop: 12, fontSize: 14, lineHeight: 1.7 }}
          >
            All with the goal of making complex things human.
          </p>

          <div className="toolkit mt-10">
            <p className="section-label text-[#BBBBBB]">Toolkit</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TOOLKIT.map((tool) => (
                <ToolkitPill key={tool} label={tool} />
              ))}
            </div>
          </div>
        </div>

        <aside className="looking-card">
          <div className="flex items-center gap-2">
            <span
              className="rounded-full flex-shrink-0"
              style={{
                width: 6,
                height: 6,
                background: "var(--status-green)",
                display: "inline-block",
              }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-normal uppercase tracking-[0.14em] text-[#BBBBBB]">
              looking for next
            </span>
          </div>

          <h2 className="mt-4 text-[15px] font-medium leading-snug text-[var(--foreground)]">
            Product design internship · Summer 2026
          </h2>

          <p className="mt-3 text-[12px] font-light leading-relaxed text-neutral-500">
            Teams prioritizing real product experiences, cross-functional
            collaborations, and growth in fast-paced environments.
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {INTERNSHIP_TAGS.map((tag) => (
              <InternshipTag key={tag} label={tag} />
            ))}
          </div>

          <div
            className="mt-5 h-px w-full bg-black/[0.06]"
            aria-hidden="true"
          />

          <Link
            href="mailto:iriswang32@gmail.com"
            className="mt-4 flex items-center justify-between text-[13px] font-medium text-[var(--foreground)] transition-opacity hover:opacity-70"
          >
            <span>Get in touch</span>
            <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </section>
  );
}

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
    <div className="relative" style={{ paddingBottom: 100 }}>
      <ExperienceHero />

      <div className="w-full max-w-6xl mx-auto px-6 block">
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
