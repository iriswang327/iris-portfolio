"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ExperienceModal from "@/components/ExperienceModal";
import ParallaxHeroGradient from "@/components/ParallaxHeroGradient";

const GLASS_FRAME_BASE =
  "w-full h-full aspect-[16/10] rounded-2xl p-6 flex items-center justify-center overflow-hidden transition-all duration-500";

function TowerBridgeLogo() {
  return (
    <span
      className="text-[32px] font-extralight tracking-tight text-amber-900/20 select-none"
      aria-hidden="true"
    >
      T&amp;B
    </span>
  );
}

function IntegratedDesignLogo() {
  return (
    <span
      className="text-[28px] font-extralight tracking-[0.2em] text-rose-900/20 select-none"
      aria-hidden="true"
    >
      ID
    </span>
  );
}

function RiskRadarLogo() {
  return (
    <span
      className="text-[28px] font-extralight tracking-[0.18em] text-indigo-200/25 select-none"
      aria-hidden="true"
    >
      RR
    </span>
  );
}

// ─── Pillar 1: Strategic Impact Cards ────────────────────────────────────────

interface ModalConfig {
  companyName: string;
  companyLogo: string;
  companyLogoImage?: string;
  timeline: string;
  role: string;
  orgType: string;
  collaborators: string;
  microDescription: string;
  expandHref: string;
}

interface ImpactCardDef {
  id: string;
  gradient: string;
  pill: string;
  pillDark?: boolean;
  hoverDescription: string;
  logo?: ReactNode;
  videoUrl?: string;
  imageUrl?: string;
  frameClassName?: string;
  /** Ambient chromatic glow on hover (Gemini / Convergent parity) */
  showChromaticGlow?: boolean;
  glowVariant?: "gold" | "rose" | "navy";
  modal: ModalConfig;
}

const TOWER_BRIDGE_MODAL: ModalConfig = {
  companyName: "Tower & Bridge",
  companyLogo: "T&B",
  timeline: "2024 – Present",
  role: "Strategy Analyst",
  orgType: "Brand & Analytics",
  collaborators: "Trinity CDC · Heartening",
  microDescription:
    "A strategic growth and data tracking framework for consumer sustainability campaigns, translating raw performance metrics into investor-ready pitch decks for executive board approval.",
  expandHref: "/experience/tower-and-bridge",
};

const INTEGRATED_DESIGN_MODAL: ModalConfig = {
  companyName: "Integrated Design Project",
  companyLogo: "ID",
  timeline: "Fall 2025",
  role: "Lead Prototyper",
  orgType: "Design Thinking · UT Austin",
  collaborators: "Emily Araiza · Frida Balderas · Manay Divatia",
  microDescription:
    "An end-to-end user behavioral research sprint that pivoted from a physical merchandise proof-of-concept to an integrated stadium jumbotron video campaign and live responsive data portal.",
  expandHref: "/experience/giving-back",
};

const RISK_RADAR_MODAL: ModalConfig = {
  companyName: "Risk Radar",
  companyLogo: "RR",
  timeline: "Spring 2026",
  role: "Head of AI",
  orgType: "B2B SaaS · AI Product",
  collaborators: "Brooke Mikell · Joesh Nayak · Nikhil Sehgal",
  microDescription:
    "An enterprise product strategy transforming back-end Large Language Models, BERT classification loops, and vector embeddings into a low-friction predictive crisis dashboard for brand executives.",
  expandHref: "/experience/risk-radar",
};

const STRATEGIC_IMPACT_CARDS: ImpactCardDef[] = [
  {
    id: "tower-bridge",
    gradient: "linear-gradient(148deg, #F5EDD8 0%, #EDD9A3 100%)",
    logo: <TowerBridgeLogo />,
    pill: "Tower & Bridge · Analytics Strategy",
    pillDark: false,
    hoverDescription: "Real clients, real strategy, real stakes.",
    videoUrl: "/videos/tower-thumbnail.mp4",
    frameClassName: `${GLASS_FRAME_BASE} bg-gradient-to-tr from-amber-50/70 via-orange-50/40 to-stone-50/60 border border-amber-200/30 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_50px_rgba(217,119,6,0.1)]`,
    showChromaticGlow: true,
    glowVariant: "gold",
    modal: TOWER_BRIDGE_MODAL,
  },
  {
    id: "integrated-design-thinking",
    gradient: "linear-gradient(148deg, #FCE8F0 0%, #F4C8DC 100%)",
    logo: <IntegratedDesignLogo />,
    pill: "Integrated Design · UX Research",
    pillDark: false,
    hoverDescription: "Full UX research cycle for unhoused community advocacy.",
    frameClassName: `${GLASS_FRAME_BASE} bg-gradient-to-tr from-rose-50/70 via-pink-50/45 to-fuchsia-50/40 border border-pink-200/25 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_50px_rgba(236,72,153,0.1)]`,
    showChromaticGlow: true,
    glowVariant: "rose",
    modal: INTEGRATED_DESIGN_MODAL,
  },
  {
    id: "risk-radar",
    gradient: "linear-gradient(148deg, #0D0D14 0%, #1A1A2E 55%, #243B5A 100%)",
    logo: <RiskRadarLogo />,
    pill: "Risk Radar · AI Product",
    pillDark: true,
    hoverDescription: "AI brand crisis prediction — BERT, RAG, Spring 2026.",
    frameClassName: `${GLASS_FRAME_BASE} bg-gradient-to-tr from-slate-900/50 via-indigo-950/35 to-slate-800/30 border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_22px_50px_rgba(99,102,241,0.15)]`,
    showChromaticGlow: true,
    glowVariant: "navy",
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
    <div className="flex items-center justify-between py-4 border-b border-black/[0.04] w-full group transition-colors duration-300 hover:bg-white/40 rounded-xl last:border-b-0">
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

      <div className="experience-content">
        <Hairline />

        {/* ── Pillar 1: Strategic Impact Cases ────────────────────────── */}
        <section style={{ marginTop: 64, marginBottom: 80 }}>
          <SectionLabel>Selected Projects</SectionLabel>

          <div className="relative mb-16">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-500/[0.06] via-indigo-400/[0.04] to-transparent blur-[100px]"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {STRATEGIC_IMPACT_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="group relative overflow-visible"
                >
                  {card.showChromaticGlow && card.glowVariant === "gold" && (
                    <div
                      className="absolute inset-0 -z-10 rounded-[20px] bg-gradient-to-r from-amber-500/0 to-orange-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50 group-hover:from-amber-500/15 group-hover:to-orange-500/10"
                      aria-hidden="true"
                    />
                  )}
                  {card.showChromaticGlow && card.glowVariant === "rose" && (
                    <div
                      className="absolute inset-0 -z-10 rounded-[20px] bg-gradient-to-r from-pink-500/0 to-rose-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50 group-hover:from-pink-500/15 group-hover:to-rose-500/10"
                      aria-hidden="true"
                    />
                  )}
                  {card.showChromaticGlow && card.glowVariant === "navy" && (
                    <div
                      className="absolute inset-0 -z-10 rounded-[20px] bg-gradient-to-r from-indigo-500/0 to-cyan-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50 group-hover:from-indigo-500/20 group-hover:to-cyan-500/10"
                      aria-hidden="true"
                    />
                  )}
                  <ProjectCard
                    gradient={card.gradient}
                    logo={card.logo}
                    pill={card.pill}
                    pillDark={card.pillDark}
                    hoverDescription={card.hoverDescription}
                    videoUrl={card.videoUrl}
                    imageUrl={card.imageUrl}
                    frameClassName={card.frameClassName}
                    onClick={() => setActiveModal(card.modal)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Hairline />

        {/* ── Pillar 2: Analytical & Publication Ledger ────────────────── */}
        <section style={{ marginTop: 64, marginBottom: 80 }}>
          <SectionLabel>Publications &amp; Illustrations</SectionLabel>

          <div className="experience-glass-panel experience-glass-panel--wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">
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
          </div>
        </section>

        <Hairline />

        {/* ── Pillar 3: Operational Archive ───────────────────────────── */}
        <section style={{ marginTop: 64 }}>
          <SectionLabel>Marketing &amp; Operations</SectionLabel>

          <div className="experience-glass-panel experience-glass-panel--wide">
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
          </div>
        </section>

      </div>

      <ExperienceModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        companyName={activeModal?.companyName ?? ""}
        companyLogo={activeModal?.companyLogo ?? ""}
        companyLogoImage={activeModal?.companyLogoImage}
        timeline={activeModal?.timeline ?? ""}
        role={activeModal?.role ?? ""}
        orgType={activeModal?.orgType ?? ""}
        collaborators={activeModal?.collaborators ?? ""}
        microDescription={activeModal?.microDescription ?? ""}
        expandHref={activeModal?.expandHref ?? "/experience"}
      />
    </div>
  );
}
