"use client";

import { useState, type ReactNode } from "react";
import ProjectCard from "@/components/ProjectCard";
import AppleFanCard from "@/components/AppleFanCard";
import CompanyModal, { type ModalProject } from "@/components/CompanyModal";
import { GEMINI_HOVER, GEMINI_MODAL_SUMMARY } from "@/lib/gemini-copy";
import { GEMINI_CARD_LABELS, RIPPLE_CARD_LABELS } from "@/lib/project-card-labels";
import { RIPPLE_HOVER, RIPPLE_MODAL_ROLE, RIPPLE_MODAL_SUMMARY } from "@/lib/ripple-copy";

// ─── Logo SVGs ────────────────────────────────────────────────────────────────

function GeminiLogo() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 100 100"
      style={{ opacity: 0.15 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gem-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0ABFC" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path
        d="M50 4 C50 4 54 30 72 50 C54 70 50 96 50 96 C50 96 46 70 28 50 C46 30 50 4 50 4 Z"
        fill="url(#gem-gradient)"
      />
    </svg>
  );
}

/** Texas Convergent — concentric ripple rings */
function TCLogo() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 100 100"
      fill="none"
      style={{ opacity: 0.12 }}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="8" fill="white" />
      <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="3" />
      <circle cx="50" cy="50" r="34" stroke="white" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="47" stroke="white" strokeWidth="2" />
    </svg>
  );
}

// ─── Modal configurations ─────────────────────────────────────────────────────
//
// Future modal expand (not built yet — intercepting routes + full pages):
//   expandHref: "/design/ripple/full"
//   expandHref: "/design/gemini/full"

interface ModalConfig {
  companyName: string;
  companyLogo: string;
  companyLogoImage?: string;
  roleLabel?: string;
  whyCompanyText?: string;
  projects: ModalProject[];
}

const GEMINI_MODAL: ModalConfig = {
  companyName: "Gemini",
  companyLogo: "G",
  companyLogoImage: "/images/gemini-logo.png",
  roleLabel: "Speculative Product Design Case Study",
  whyCompanyText: GEMINI_MODAL_SUMMARY,
  projects: [
    {
      title: "News Integration",
      route: "/design/gemini",
      preview: "/images/gemini-modal-preview.png",
    },
  ],
};

const TC_MODAL: ModalConfig = {
  companyName: "Texas Convergent",
  companyLogo: "TC",
  companyLogoImage: "/images/convergent-logo.png",
  roleLabel: RIPPLE_MODAL_ROLE,
  whyCompanyText: RIPPLE_MODAL_SUMMARY,
  projects: [
    {
      title: "Ripple",
      route: "/design/ripple",
      preview: "/images/ripple-modal-preview.png",
    },
  ],
};

// ─── Card definitions ─────────────────────────────────────────────────────────

interface CardDef {
  id: string;
  gradient: string;
  logo?: ReactNode;
  company: string;
  projectLabel: string;
  hoverDescription: string;
  videoUrl?: string;
  imageUrl?: string;
  frameClassName?: string;
  locked?: boolean;
  modal?: ModalConfig;
}

const FEATURED_CARDS: CardDef[] = [
  {
    id: "tc",
    gradient: "linear-gradient(148deg, #0A1628 0%, #0D2E52 55%, #1155A0 100%)",
    logo: <TCLogo />,
    ...RIPPLE_CARD_LABELS,
    hoverDescription: RIPPLE_HOVER,
    videoUrl: "/videos/ripple-thumbnail.mp4",
    frameClassName:
      "project-card-frame bg-gradient-to-tr from-purple-950/20 via-indigo-500/5 to-slate-50 border border-black/[0.03] shadow-[0_15px_40px_rgba(0,0,0,0.03)]",
    modal: TC_MODAL,
  },
  {
    id: "gemini",
    gradient: "linear-gradient(148deg, #1E1030 0%, #0B0718 100%)",
    logo: <GeminiLogo />,
    ...GEMINI_CARD_LABELS,
    hoverDescription: GEMINI_HOVER,
    videoUrl: "/videos/gemini-thumbnail.mp4",
    frameClassName:
      "project-card-frame bg-gradient-to-tr from-sky-100/40 via-blue-50/20 to-slate-50/60 border border-blue-200/20 shadow-[0_15px_40px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(14,165,233,0.05)]",
    modal: GEMINI_MODAL,
  },
];

function ProjectCardSlot({
  card,
  onOpen,
}: {
  card: CardDef;
  onOpen?: () => void;
}) {
  return (
    <div className="group relative overflow-visible">
      {card.id === "gemini" && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 group-hover:from-cyan-500/10 group-hover:to-blue-600/10 transition-all duration-500 -z-10"
          aria-hidden="true"
        />
      )}
      {card.id === "tc" && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-indigo-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 group-hover:from-purple-500/10 group-hover:to-indigo-600/10 transition-all duration-500 -z-10"
          aria-hidden="true"
        />
      )}
      <ProjectCard
        gradient={card.gradient}
        logo={card.logo}
        company={card.company}
        projectLabel={card.projectLabel}
        hoverDescription={card.hoverDescription}
        videoUrl={card.videoUrl}
        imageUrl={card.imageUrl}
        frameClassName={card.frameClassName}
        locked={card.locked}
        onClick={onOpen}
      />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProjectsGridSection() {
  const [activeModal, setActiveModal] = useState<ModalConfig | null>(null);

  return (
    <>
      <div className="relative z-10 projects-grid-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-purple-500/5 via-indigo-400/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="projects-grid">
          {FEATURED_CARDS.map((card) => (
            <ProjectCardSlot
              key={card.id}
              card={card}
              onOpen={() => setActiveModal(card.modal!)}
            />
          ))}
        </div>

        <div className="projects-in-progress">
          <div className="projects-in-progress-header">
            <p className="section-label">IN PROGRESS</p>
            <p className="projects-in-progress-lede">
              Self-directed concept explorations — not affiliated with Apple Inc.
            </p>
          </div>

          <div className="projects-grid projects-grid--fan">
            <AppleFanCard />
          </div>
        </div>
      </div>

      <CompanyModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        companyName={activeModal?.companyName ?? ""}
        companyLogo={activeModal?.companyLogo ?? ""}
        companyLogoImage={activeModal?.companyLogoImage}
        roleLabel={activeModal?.roleLabel}
        whyCompanyText={activeModal?.whyCompanyText}
        projects={activeModal?.projects ?? []}
      />
    </>
  );
}
