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
  /** Standalone case study route for expand ↗ and CTA */
  expandHref: string;
  /** Matches experience card glass frame — gold / rose / navy */
  accentTheme: ExperienceAccentTheme;
}

const ACCENT_STYLES: Record<
  ExperienceAccentTheme,
  {
    frameGradient: string;
    frameShadow: string;
    ctaShadow: string;
    arrowGradient: string;
    arrowShadow: string;
    badgeBg: string;
    badgeColor: string;
    focusRingClass: string;
    ctaLinkHoverClass: string;
  }
> = {
  gold: {
    frameGradient:
      "linear-gradient(148deg, #F5EDD8 0%, #E8C878 45%, #EDD9A3 100%)",
    frameShadow:
      "0 48px 100px -28px rgba(217, 119, 6, 0.22), 0 24px 64px -20px rgba(14, 14, 16, 0.1)",
    ctaShadow: "0 20px 56px -16px rgba(217, 119, 6, 0.28)",
    ctaHoverShadow: "0 12px 40px -12px rgba(217, 119, 6, 0.25)",
    arrowGradient: "linear-gradient(148deg, #E8C878 0%, #D97706 100%)",
    arrowShadow: "0 8px 20px -6px rgba(217, 119, 6, 0.45)",
    badgeBg: "rgba(232, 200, 120, 0.35)",
    badgeColor: "#92400E",
    focusRingClass: "focus-visible:ring-amber-500",
    ctaLinkHoverClass: "hover:shadow-[0_12px_40px_-12px_rgba(217,119,6,0.25)]",
  },
  rose: {
    frameGradient:
      "linear-gradient(148deg, #FCE8F0 0%, #F4A8C8 50%, #F4C8DC 100%)",
    frameShadow:
      "0 48px 100px -28px rgba(236, 72, 153, 0.2), 0 24px 64px -20px rgba(14, 14, 16, 0.1)",
    ctaShadow: "0 20px 56px -16px rgba(236, 72, 153, 0.25)",
    arrowGradient: "linear-gradient(148deg, #F9A8D4 0%, #EC4899 100%)",
    arrowShadow: "0 8px 20px -6px rgba(236, 72, 153, 0.4)",
    badgeBg: "rgba(244, 168, 200, 0.35)",
    badgeColor: "#9D174D",
    focusRingClass: "focus-visible:ring-pink-500",
    ctaLinkHoverClass: "hover:shadow-[0_12px_40px_-12px_rgba(236,72,153,0.22)]",
  },
  navy: {
    frameGradient:
      "linear-gradient(148deg, #1A1A2E 0%, #3D4F7C 50%, #4B6CB7 100%)",
    frameShadow:
      "0 48px 100px -28px rgba(99, 102, 241, 0.28), 0 24px 64px -20px rgba(14, 14, 16, 0.18)",
    ctaShadow: "0 20px 56px -16px rgba(99, 102, 241, 0.3)",
    arrowGradient: "linear-gradient(148deg, #4B6CB7 0%, #4338CA 100%)",
    arrowShadow: "0 8px 20px -6px rgba(99, 102, 241, 0.45)",
    badgeBg: "rgba(75, 108, 183, 0.25)",
    badgeColor: "#C7D2FE",
    focusRingClass: "focus-visible:ring-indigo-500",
    ctaLinkHoverClass: "hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.28)]",
  },
};

// ─── Animation variants ──────────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 16 },
};

// ─── Component ───────────────────────────────────────────────────────────────

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
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-lg"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.24, ease: "easeOut" }}
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
            {/* Gradient frame — glass sheet */}
            <motion.div
              className="w-full max-w-[920px] mx-auto rounded-[28px] p-[1.5px] pointer-events-auto"
              style={{
                background: accent.frameGradient,
                boxShadow: accent.frameShadow,
              }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.34, ease: [0.34, 1.1, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[90vh] overflow-y-auto rounded-[26px] border border-white/80 bg-white/[0.88] backdrop-blur-2xl p-8 sm:p-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
                {/* Top actions */}
                <div className="flex w-full items-center justify-between mb-10">
                  <Link
                    href={expandHref}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 text-[14px] text-neutral-500 shadow-sm backdrop-blur-sm transition-all hover:border-black/[0.12] hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${accent.focusRingClass}`}
                    aria-label={`Open ${companyName} case study full page`}
                  >
                    <span aria-hidden="true">↗</span>
                  </Link>
                  <button
                    type="button"
                    onClick={onClose}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 text-[18px] leading-none text-neutral-500 shadow-sm backdrop-blur-sm transition-all hover:border-black/[0.12] hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${accent.focusRingClass}`}
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>

                {/* Company identity */}
                <div className="flex w-full flex-col items-center gap-3">
                  <div
                    className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full"
                    style={{
                      background: companyLogoImage ? "transparent" : accent.badgeBg,
                      fontSize: 22,
                      fontWeight: 400,
                      color: accent.badgeColor,
                      letterSpacing: "-0.01em",
                      boxShadow: accent.ctaShadow,
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

                {/* Metadata grid */}
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

                {/* Glass gradient CTA — view case study */}
                <div
                  className="rounded-2xl p-[1.5px]"
                  style={{
                    background: accent.frameGradient,
                    boxShadow: accent.ctaShadow,
                  }}
                >
                  <Link
                    href={expandHref}
                    className={`group flex w-full items-center justify-between gap-4 rounded-[14px] border border-white/90 bg-white/[0.82] px-8 py-6 backdrop-blur-xl transition-all hover:bg-white/[0.92] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${accent.focusRingClass} ${accent.ctaLinkHoverClass}`}
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
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
