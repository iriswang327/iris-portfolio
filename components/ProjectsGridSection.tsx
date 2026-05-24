"use client";

import { useState, type ReactNode } from "react";
import ProjectCard from "@/components/ProjectCard";
import CompanyModal, { type ModalProject } from "@/components/CompanyModal";
import { GEMINI_HOVER, GEMINI_MODAL_SUMMARY } from "@/lib/gemini-copy";
import { RIPPLE_HOVER, RIPPLE_MODAL_ROLE, RIPPLE_MODAL_SUMMARY } from "@/lib/ripple-copy";

// ─── Logo SVGs ────────────────────────────────────────────────────────────────

function AppleLogo() {
  return (
    <svg
      width="52"
      height="62"
      viewBox="0 0 52 62"
      fill="white"
      style={{ opacity: 0.08 }}
      aria-hidden="true"
    >
      <path d="M38.4 15.8c-2.2 2.7-5.8 4.8-9.3 4.5-.4-3.5 1.4-7.2 3.5-9.6 2.4-2.8 6.4-4.8 9.7-4.8.4 3.7-1.2 7.4-3.9 9.9zM41.6 21.5c-5.3-.3-9.9 3-12.4 3s-6.4-2.8-10.7-2.8c-5.4.1-10.4 3.1-13.2 8-5.6 9.6-1.4 23.8 4 31.9 2.6 3.8 5.8 8.1 9.9 7.9 4-.2 5.5-2.5 10.3-2.5 4.8 0 6.2 2.5 10.4 2.4 4.3-.1 7-3.8 9.6-7.6 3-4.4 4.2-8.6 4.3-8.8-.1 0-8.3-3.2-8.3-12.8 0-8 6.4-11.9 6.7-12.1-3.7-5.4-9.4-5.7-10.6-5.6z" />
    </svg>
  );
}

function SpotifyLogo() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 100 100"
      fill="none"
      style={{ opacity: 0.08 }}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="48" fill="white" />
      <path d="M26 38 Q50 27 74 36" stroke="#1E5537" strokeWidth="7" strokeLinecap="round" />
      <path d="M28 51 Q50 41 72 49" stroke="#1E5537" strokeWidth="7" strokeLinecap="round" />
      <path d="M31 64 Q50 56 69 62" stroke="#1E5537" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}


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

const APPLE_MODAL: ModalConfig = {
  companyName: "Apple",
  companyLogo: "⌘",
  whyCompanyText:
    "Apple sits at the intersection of technology and human experience better than anyone. This upcoming project explores transforming maps from a generic utility into an editorial companion that guides you through context, not just coordinates.",
  projects: [
    {
      title: "PROJECT 01 / Maps Redesign",
      subtitle: "Context-aware spatial navigation systems.",
      route: "#",
      locked: true,
    },
  ],
};

const SPOTIFY_MODAL: ModalConfig = {
  companyName: "Spotify",
  companyLogo: "♪",
  whyCompanyText:
    "Exploring high-density visual storytelling inside audio streaming architectures to bridge the gap between niche audio subcultures and mainstream social curation features.",
  projects: [
    {
      title: "PROJECT 01 / Social Curation Layer",
      subtitle: "Designing collaborative music ecosystems.",
      route: "#",
      locked: true,
    },
  ],
};

// ─── Card definitions ─────────────────────────────────────────────────────────

interface CardDef {
  id: string;
  gradient: string;
  logo?: ReactNode;
  pill: string;
  pillDark?: boolean;
  hoverDescription: string;
  videoUrl?: string;
  imageUrl?: string;
  frameClassName?: string;
  locked?: boolean;
  modal?: ModalConfig;
}

const CARDS: CardDef[] = [
  {
    id: "tc",
    gradient: "linear-gradient(148deg, #0A1628 0%, #0D2E52 55%, #1155A0 100%)",
    logo: <TCLogo />,
    pill: "Texas Convergent · Build Team",
    pillDark: true,
    hoverDescription: RIPPLE_HOVER,
    videoUrl: "/videos/ripple-thumbnail.mp4",
    frameClassName: "project-card-frame bg-gradient-to-tr from-purple-950/20 via-indigo-500/5 to-slate-50 border border-black/[0.03] shadow-[0_15px_40px_rgba(0,0,0,0.03)]",
    modal: TC_MODAL,
  },
  {
    id: "gemini",
    gradient: "linear-gradient(148deg, #1E1030 0%, #0B0718 100%)",
    logo: <GeminiLogo />,
    pill: "Gemini · Product Design",
    pillDark: true,
    hoverDescription: GEMINI_HOVER,
    videoUrl: "/videos/gemini-thumbnail.mp4",
    frameClassName: "project-card-frame bg-gradient-to-tr from-sky-100/40 via-blue-50/20 to-slate-50/60 border border-blue-200/20 shadow-[0_15px_40px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(14,165,233,0.05)]",
    modal: GEMINI_MODAL,
  },
  {
    id: "apple",
    gradient: "linear-gradient(148deg, #B4B1FD 0%, #909BE6 48%, #748ADB 100%)",
    logo: <AppleLogo />,
    pill: "Apple · Product Design",
    hoverDescription: "Rethinking how Maps connects people to context.",
    imageUrl: "/images/apple-thumbnail.png",
    locked: true,
    modal: APPLE_MODAL,
  },
  {
    id: "spotify",
    gradient: "linear-gradient(148deg, #1E5537 0%, #0C2C1B 100%)",
    logo: <SpotifyLogo />,
    pill: "Spotify · Product Design",
    hoverDescription: "Discover what local businesses are listening to.",
    imageUrl: "/images/spotify-thumbnail.png",
    locked: true,
    modal: SPOTIFY_MODAL,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProjectsGridSection() {
  const [activeModal, setActiveModal] = useState<ModalConfig | null>(null);

  return (
    <>
      <div className="relative z-10">
        {/* Ambient gradient hum behind the grid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-purple-500/5 via-indigo-400/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="projects-grid">
          {CARDS.map((card) => (
            <div key={card.id} className="group relative overflow-visible">
              {/* Chromatic ambient glow — Gemini */}
              {card.id === "gemini" && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 group-hover:from-cyan-500/10 group-hover:to-blue-600/10 transition-all duration-500 -z-10" aria-hidden="true" />
              )}
              {/* Chromatic ambient glow — Ripple (TC) */}
              {card.id === "tc" && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-indigo-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 group-hover:from-purple-500/10 group-hover:to-indigo-600/10 transition-all duration-500 -z-10" aria-hidden="true" />
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
                locked={card.locked}
                onClick={card.modal ? () => setActiveModal(card.modal!) : undefined}
              />
            </div>
          ))}
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
