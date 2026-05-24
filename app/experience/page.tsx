"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ExperienceModal, {
  type ExperienceAccentTheme,
} from "@/components/ExperienceModal";
import ParallaxHeroGradient from "@/components/ParallaxHeroGradient";

const GLASS_FRAME_BASE =
  "w-full h-full aspect-[16/10] rounded-2xl p-6 flex items-center justify-center overflow-hidden transition-all duration-500";

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
  accentTheme: ExperienceAccentTheme;
}

interface ImpactCardDef {
  id: string;
  gradient: string;
  pill: string;
  pillDark?: boolean;
  hoverDescription: string;
  videoUrl?: string;
  imageUrl?: string;
  frameClassName?: string;
  /** Ambient chromatic glow on hover (Gemini / Convergent parity) */
  showChromaticGlow?: boolean;
  glowVariant?: "gold" | "burnt" | "navy";
  modal: ModalConfig;
}

const TOWER_BRIDGE_MODAL: ModalConfig = {
  companyName: "Tower & Bridge",
  companyLogo: "T&B",
  companyLogoImage: "/images/tower-bridge-logo.png",
  timeline: "2025 – Present",
  role: "Analytics Manager",
  orgType: "Brand Strategy & Analytics",
  collaborators: "Trinity CDC · Heartening",
  microDescription:
    "Real clients, real deliverables, real pressure — UT Austin's student-run advertising agency turning brand strategy and analytics into measurable nonprofit and small-business growth for Trinity CDC and Heartening.",
  expandHref: "/experience/tower-and-bridge",
  accentTheme: "gold",
};

const INTEGRATED_DESIGN_MODAL: ModalConfig = {
  companyName: "Giving Back",
  companyLogo: "GB",
  companyLogoImage: "/images/integrated-design-logo.png",
  timeline: "Fall 2025 · One Semester",
  role: "UX Researcher",
  orgType: "Integrated Design Thinking · UT Austin",
  collaborators: "Emily Araiza · Frida Balderas · Manay Divatia",
  microDescription:
    "A semester-long design thinking project exploring how UT students can engage with and support the unhoused community in West Campus — from empathy interviews through two prototype-and-test cycles to a Jumbotron video campaign.",
  expandHref: "/experience/giving-back",
  accentTheme: "burnt",
};

const RISK_RADAR_MODAL: ModalConfig = {
  companyName: "Risk Radar",
  companyLogo: "RR",
  companyLogoImage: "/images/risk-radar-logo.png",
  timeline: "Spring 2026 · One Semester",
  role: "Head of AI",
  orgType: "B2B SaaS · AI Workflows",
  collaborators:
    "Brooke Mikell · Joesh Nayak · Nikhil Sehgal · Hayden King · Varun Vedala",
  microDescription:
    "An AI-powered crisis management platform that predicts brand-reputation threats before they go viral. Built over a semester with McCombs business and Moody advertising students.",
  expandHref: "/experience/risk-radar",
  accentTheme: "navy",
};

const STRATEGIC_IMPACT_CARDS: ImpactCardDef[] = [
  {
    id: "tower-bridge",
    gradient:
      "linear-gradient(148deg, #F7F4EC 0%, #D4E2CC 42%, #E8DFD0 72%, #EDD5C4 100%)",
    pill: "Tower & Bridge · Analytics Manager",
    pillDark: false,
    hoverDescription: "Real clients, real strategy, real stakes.",
    videoUrl: "/videos/tower-thumbnail.mp4",
    frameClassName: `${GLASS_FRAME_BASE} backdrop-blur-md bg-gradient-to-br from-stone-50/85 via-emerald-100/70 to-amber-100/65 border border-emerald-300/35 shadow-[0_15px_40px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_22px_50px_rgba(74,124,89,0.14),0_16px_36px_-12px_rgba(191,87,0,0.12)] ring-1 ring-[#BF5700]/10`,
    showChromaticGlow: true,
    glowVariant: "gold",
    modal: TOWER_BRIDGE_MODAL,
  },
  {
    id: "integrated-design-thinking",
    gradient:
      "linear-gradient(148deg, #FAF0E6 0%, #E8D5C4 42%, #D4B896 100%)",
    pill: "Integrated Design · UX Research",
    pillDark: false,
    hoverDescription: "Full UX research cycle for unhoused community advocacy.",
    videoUrl: "/videos/integrated-design-thumbnail.mp4",
    frameClassName: `${GLASS_FRAME_BASE} backdrop-blur-md bg-gradient-to-br from-orange-100/70 via-[#BF5700]/12 to-stone-300/50 border border-[#BF5700]/20 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_50px_rgba(191,87,0,0.14)]`,
    showChromaticGlow: true,
    glowVariant: "burnt",
    modal: INTEGRATED_DESIGN_MODAL,
  },
  {
    id: "risk-radar",
    gradient: "linear-gradient(148deg, #0D0D14 0%, #1A1A2E 55%, #243B5A 100%)",
    pill: "Risk Radar · AI Product",
    pillDark: true,
    hoverDescription: "AI brand crisis prediction — BERT, RAG, Spring 2026.",
    videoUrl: "/videos/risk-radar-thumbnail.mp4",
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
      "The Fatal Drip: Jenifer's Law and Unresolved Gaps in Texas Medical Spa Regulation",
    href: "https://www.texasulj.org/blog/the-fatal-drip-jenifer-s-law-and-unresolved-gaps-in-texas-medical-spa-regulation",
  },
  {
    title: "Beyond the Credits: Contract Law's Missing Scene",
    href: "https://www.texasulj.org/post/beyond-the-credits-contract-law-s-missing-scene",
  },
] as const;

const ANALYTICAL_LEDGER = [
  {
    id: "tulj",
    organizationName: "Texas Undergraduate Law Journal",
    roleName: "staff writer",
    timeline: "2025-present",
    logoSrc: "/images/tulj-logo.png",
    logoAlt: "Texas Undergraduate Law Journal",
    papers: LAW_PAPERS,
  },
  {
    id: "daily-texan",
    organizationName: "The Daily Texan",
    roleName: "opinion illustrator",
    timeline: "2024–2025",
    logoSrc: "/images/the-daily-texan-logo.png",
    logoAlt: "The Daily Texan",
    linkTitle: "Opinion illustration portfolio",
    linkHref: "https://thedailytexan.com/staff_name/iris-wang/",
    linkLabel: "view archive →",
  },
] as const;

const OPERATIONAL_LEDGER = [
  {
    id: "letters-of-gold",
    companyName: "Letters of Gold",
    roleTitle: "Director of Special Projects",
    dateRange: "2025–Present",
    logoSrc: "/images/letters-of-gold-logo.png",
    logoAlt: "Letters of Gold",
  },
  {
    id: "longhorn-racing",
    companyName: "Longhorn Racing",
    roleTitle: "Operations Team · Designer",
    dateRange: "2025–Present",
    logoSrc: "/images/lhr-logo.png",
    logoAlt: "Longhorn Racing",
  },
  {
    id: "sparro",
    companyName: "SparroWriting Services",
    roleTitle: "Office Manager & Teaching Assistant",
    dateRange: "2022–2025",
    logoSrc: "/images/sparrowriting-logo.png",
    logoAlt: "SparroWriting Services",
  },
  {
    id: "asuci",
    companyName: "ASUCI Student Government",
    roleTitle: "Design & Outreach Intern",
    dateRange: "2023–2024",
    logoSrc: "/images/asuci-logo.png",
    logoAlt: "ASUCI Student Government",
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
  return <p className="section-label mb-7 text-[var(--text-faint)]">{children}</p>;
}

// ─── Shared badge ─────────────────────────────────────────────────────────────

function LedgerBadge({
  icon,
  logoSrc,
  logoAlt = "",
}: {
  icon?: string;
  logoSrc?: string;
  logoAlt?: string;
}) {
  return (
    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-black/[0.04] bg-white shadow-sm">
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          sizes="44px"
          className="object-cover scale-[1.18]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-sm font-normal text-[var(--text-subtle)]">{icon}</span>
        </div>
      )}
    </div>
  );
}

// ─── Operational archive row ──────────────────────────────────────────────────

function OperationalArchiveRow({
  icon,
  logoSrc,
  logoAlt,
  companyName,
  roleTitle,
  dateRange,
}: {
  icon?: string;
  logoSrc?: string;
  logoAlt?: string;
  companyName: string;
  roleTitle: string;
  dateRange: string;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-black/[0.04] w-full group transition-colors duration-300 hover:bg-white/40 rounded-xl last:border-b-0">
      <div className="flex items-center gap-4">
        <LedgerBadge icon={icon} logoSrc={logoSrc} logoAlt={logoAlt} />
        <div className="flex flex-col gap-0.5">
          <p className="text-[14px] font-normal tracking-normal text-[var(--foreground)]">
            {companyName}
          </p>
          <p className="text-[12px] font-light experience-muted">{roleTitle}</p>
        </div>
      </div>
      <span className="text-[12px] font-light experience-muted tracking-normal tabular-nums text-right select-none">
        {dateRange}
      </span>
    </div>
  );
}

function ToolkitPill({ label }: { label: string }) {
  return <span className="experience-toolkit-pill">{label}</span>;
}

function InternshipTag({ label }: { label: string }) {
  return <span className="experience-internship-tag">{label}</span>;
}

function ExperienceHero() {
  return (
    <section className="relative overflow-hidden">
      <ParallaxHeroGradient />

      <div className="experience-hero relative z-10">
        <div className="hero-left">
          <h1 className="name-splash experience-hero-title font-[200]">
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

          <p className="experience-hero-lede font-[300]">
            All with the goal of making complex things human.
          </p>

          <div className="toolkit mt-10">
            <p className="section-label text-[var(--text-faint)]">Toolkit</p>
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
            <span className="looking-card-eyebrow">looking for next</span>
          </div>

          <h2 className="looking-card-title">Product Design internship · Summer 2026</h2>

          <p className="looking-card-body">
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

          <Link href="mailto:iriswang32@gmail.com" className="looking-card-cta">
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
  logoSrc,
  logoAlt,
  organizationName,
  roleName,
  timeline,
}: {
  icon?: string;
  logoSrc?: string;
  logoAlt?: string;
  organizationName: string;
  roleName: string;
  timeline: string;
}) {
  return (
    <div className="flex items-center">
      <LedgerBadge icon={icon} logoSrc={logoSrc} logoAlt={logoAlt} />
      <div className="ml-4 flex flex-col">
        <p className="text-[14px] font-normal tracking-normal text-[var(--foreground)]">
          {organizationName}
        </p>
        <p className="mt-0.5 text-[12px] font-light experience-muted">
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
        <section className="experience-section experience-section--lead">
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
                      className="absolute inset-0 -z-10 rounded-[20px] bg-gradient-to-r from-emerald-400/0 via-[#BF5700]/0 to-amber-300/0 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-55 group-hover:from-emerald-400/18 group-hover:via-[#BF5700]/12 group-hover:to-amber-200/14"
                      aria-hidden="true"
                    />
                  )}
                  {card.showChromaticGlow && card.glowVariant === "burnt" && (
                    <div
                      className="absolute inset-0 -z-10 rounded-[20px] bg-gradient-to-r from-[#BF5700]/0 to-stone-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50 group-hover:from-[#BF5700]/18 group-hover:to-stone-500/12"
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
        <section className="experience-section experience-section--follow">
          <SectionLabel>Publications &amp; Illustrations</SectionLabel>

          <div className="experience-glass-panel experience-glass-panel--wide">
            <div className="relative grid w-full grid-cols-1 items-stretch lg:grid-cols-2">
              <div
                className="pointer-events-none absolute bottom-3 left-1/2 top-3 hidden w-px -translate-x-1/2 bg-black/[0.05] lg:block"
                aria-hidden="true"
              />
              {ANALYTICAL_LEDGER.map((entry, index) => (
                <div
                  key={entry.id}
                  className={
                    index === 0
                      ? "border-b border-black/[0.05] pb-10 lg:border-b-0 lg:pb-0 lg:pr-12"
                      : "pt-10 lg:pt-0 lg:pl-12"
                  }
                >
                  <AnalyticalColumnHeader
                    logoSrc={entry.logoSrc}
                    logoAlt={entry.logoAlt}
                    organizationName={entry.organizationName}
                    roleName={entry.roleName}
                    timeline={entry.timeline}
                  />

                  {"papers" in entry && (
                    <div className="publication-list">
                      {entry.papers.map((paper) => (
                        <div key={paper.title} className="publication-item">
                          <p className="publication-title">{paper.title}</p>
                          <Link
                            href={paper.href}
                            className="publication-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            read paper →
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  {"linkHref" in entry && (
                    <div className="publication-list">
                      <div className="publication-item">
                        {"linkTitle" in entry && entry.linkTitle && (
                          <p className="publication-title">{entry.linkTitle}</p>
                        )}
                        <Link
                          href={entry.linkHref}
                          className="publication-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {entry.linkLabel}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Hairline />

        {/* ── Pillar 3: Operational Archive ───────────────────────────── */}
        <section className="experience-section experience-section--follow !mb-0">
          <SectionLabel>Marketing &amp; Operations</SectionLabel>

          <div className="experience-glass-panel experience-glass-panel--wide">
            <div className="flex w-full flex-col">
              {OPERATIONAL_LEDGER.map((entry) => (
                <OperationalArchiveRow
                  key={entry.id}
                  logoSrc={entry.logoSrc}
                  logoAlt={entry.logoAlt}
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
        accentTheme={activeModal?.accentTheme ?? "gold"}
      />
    </div>
  );
}
