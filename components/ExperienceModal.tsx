"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ExperienceAccentTheme = "gold" | "rose" | "navy";

export interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
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

/** Soft glass + tinted glow — aligned with .looking-card / experience-glass-panel */
const ACCENT_STYLES: Record<
  ExperienceAccentTheme,
  {
    panelShadow: string;
    badgeBg: string;
    badgeColor: string;
    ctaShadow: string;
    ctaHoverShadow: string;
    arrowGradient: string;
    arrowShadow: string;
    focusRingClass: string;
  }
> = {
  gold: {
    panelShadow:
      "0 20px 60px -30px rgba(14, 14, 16, 0.15), 0 1px 3px rgba(14, 14, 16, 0.04), 0 40px 90px -32px rgba(217, 119, 6, 0.1)",
    badgeBg: "rgba(245, 237, 216, 0.6)",
    badgeColor: "#92400E",
    ctaShadow:
      "0 16px 48px -20px rgba(14, 14, 16, 0.1), 0 12px 36px -16px rgba(217, 119, 6, 0.12)",
    ctaHoverShadow:
      "0 20px 56px -18px rgba(14, 14, 16, 0.12), 0 16px 44px -14px rgba(217, 119, 6, 0.18)",
    arrowGradient: "linear-gradient(148deg, #F5EDD8 0%, #D97706 100%)",
    arrowShadow: "0 6px 16px -4px rgba(217, 119, 6, 0.3)",
    focusRingClass: "focus-visible:ring-amber-400/50",
  },
  rose: {
    panelShadow:
      "0 20px 60px -30px rgba(14, 14, 16, 0.15), 0 1px 3px rgba(14, 14, 16, 0.04), 0 40px 90px -32px rgba(236, 72, 153, 0.09)",
    badgeBg: "rgba(252, 232, 240, 0.65)",
    badgeColor: "#9D174D",
    ctaShadow:
      "0 16px 48px -20px rgba(14, 14, 16, 0.1), 0 12px 36px -16px rgba(236, 72, 153, 0.1)",
    ctaHoverShadow:
      "0 20px 56px -18px rgba(14, 14, 16, 0.12), 0 16px 44px -14px rgba(236, 72, 153, 0.16)",
    arrowGradient: "linear-gradient(148deg, #FCE8F0 0%, #EC4899 100%)",
    arrowShadow: "0 6px 16px -4px rgba(236, 72, 153, 0.28)",
    focusRingClass: "focus-visible:ring-pink-400/50",
  },
  navy: {
    panelShadow:
      "0 20px 60px -30px rgba(14, 14, 16, 0.15), 0 1px 3px rgba(14, 14, 16, 0.04), 0 40px 90px -32px rgba(99, 102, 241, 0.12)",
    badgeBg: "rgba(226, 232, 240, 0.5)",
    badgeColor: "#4338CA",
    ctaShadow:
      "0 16px 48px -20px rgba(14, 14, 16, 0.1), 0 12px 36px -16px rgba(99, 102, 241, 0.12)",
    ctaHoverShadow:
      "0 20px 56px -18px rgba(14, 14, 16, 0.12), 0 16px 44px -14px rgba(99, 102, 241, 0.18)",
    arrowGradient: "linear-gradient(148deg, #E0E7FF 0%, #4F46E5 100%)",
    arrowShadow: "0 6px 16px -4px rgba(99, 102, 241, 0.32)",
    focusRingClass: "focus-visible:ring-indigo-400/50",
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.97, y: 12 },
};

export default function ExperienceModal({
  isOpen,
  onClose,
  companyName,
  companyLogo,
  companyLogoImage,
  timeline,
  role,
  orgType,
  collaborators,
  microDescription,
  expandHref,
  accentTheme,
}: ExperienceModalProps) {
  const accent = ACCENT_STYLES[accentTheme];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-md"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
          />

          <div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={`${companyName} project details`}
            onClick={onClose}
          >
            <motion.div
              className="w-full max-w-[920px] mx-auto rounded-[20px] pointer-events-auto max-h-[90vh] overflow-y-auto p-8 sm:p-12 backdrop-blur-[20px]"
              style={{
                background: "rgba(255, 255, 255, 0.72)",
                boxShadow: accent.panelShadow,
              }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.34, 1.08, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex w-full items-center justify-between mb-10">
                <Link
                  href={expandHref}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[14px] text-neutral-500 shadow-[0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${accent.focusRingClass}`}
                  aria-label={`Open ${companyName} case study full page`}
                >
                  <span aria-hidden="true">↗</span>
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[18px] leading-none text-neutral-500 shadow-[0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${accent.focusRingClass}`}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <div className="flex w-full flex-col items-center gap-3">
                <div
                  className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]"
                  style={{
                    background: companyLogoImage ? "transparent" : accent.badgeBg,
                    fontSize: 22,
                    fontWeight: 400,
                    color: accent.badgeColor,
                    letterSpacing: "-0.01em",
                  }}
                  aria-hidden={!!companyLogoImage}
                >
                  {companyLogoImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={companyLogoImage}
                      alt=""
                      className="h-[60px] w-[60px] object-contain"
                    />
                  ) : (
                    companyLogo
                  )}
                </div>
                <h2 className="text-[28px] font-extralight tracking-tight text-[var(--foreground)]">
                  {companyName}
                </h2>
              </div>

              <div className="mx-auto mt-8 mb-8 grid w-full max-w-2xl grid-cols-2 gap-6 border-t border-black/[0.04] pt-6 text-left md:grid-cols-4">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                    Timeline
                  </p>
                  <p className="mt-1 text-[13px] font-normal text-neutral-800">
                    {timeline}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                    Role
                  </p>
                  <p className="mt-1 text-[13px] font-normal text-neutral-800">
                    {role}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                    Org / Type
                  </p>
                  <p className="mt-1 text-[13px] font-normal text-neutral-800">
                    {orgType}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                    With
                  </p>
                  <p className="mt-1 text-[13px] font-normal leading-snug text-neutral-800">
                    {collaborators}
                  </p>
                </div>
              </div>

              <p className="mb-10 w-full max-w-3xl text-left text-[15px] font-light leading-relaxed text-neutral-500 select-none">
                {microDescription}
              </p>

              <div
                className="mb-8 h-px w-full bg-black/[0.06]"
                aria-hidden="true"
              />

              <Link
                href={expandHref}
                className={`group flex w-full items-center justify-between gap-4 rounded-2xl bg-white/72 px-8 py-6 backdrop-blur-[20px] transition-[box-shadow,background-color] duration-300 hover:bg-white/[0.85] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${accent.focusRingClass}`}
                style={{ boxShadow: accent.ctaShadow }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = accent.ctaHoverShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = accent.ctaShadow;
                }}
              >
                <span className="text-[15px] font-medium tracking-tight text-[var(--foreground)]">
                  View case study
                </span>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] text-white transition-transform group-hover:translate-x-0.5"
                  style={{
                    background: accent.arrowGradient,
                    boxShadow: accent.arrowShadow,
                  }}
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
