"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────

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
  /** Standalone case study route for expand ↗ and media slot */
  expandHref: string;
  mediaSrc?: string;
  mediaAlt?: string;
  /** When set, renders a looping video in the media slot instead of an image */
  mediaVideo?: boolean;
}

// ─── Animation variants ──────────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 12 },
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
  mediaSrc,
  mediaAlt,
  mediaVideo = false,
}: ExperienceModalProps) {
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
            className="fixed inset-0 z-[200] bg-black/35 backdrop-blur-md"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
          />

          <div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={`${companyName} project preview`}
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-[24px] border border-black/[0.02] p-8 sm:p-12 max-w-[920px] w-full mx-auto relative z-50 overflow-y-auto max-h-[90vh] shadow-[0_40px_90px_rgba(0,0,0,0.08)] pointer-events-auto"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.34, 1.12, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top actions — expand ↗ (full case study) + close */}
              <div className="flex w-full items-center justify-between mb-10">
                <Link
                  href={expandHref}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[14px] text-[#AAAAAA] transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                  aria-label={`Open ${companyName} case study full page`}
                >
                  <span aria-hidden="true">↗</span>
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[18px] leading-none text-[#AAAAAA] transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              {/* Company identity — centered badge + title */}
              <div className="flex w-full flex-col items-center gap-3">
                <div
                  className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full"
                  style={{
                    background: companyLogoImage
                      ? "transparent"
                      : "rgba(167,139,250,0.16)",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "#A78BFA",
                    letterSpacing: "-0.01em",
                  }}
                  aria-hidden={!!companyLogoImage}
                >
                  {companyLogoImage ? (
                    <Image
                      src={companyLogoImage}
                      alt=""
                      width={60}
                      height={60}
                      className="h-[60px] w-[60px] object-contain"
                    />
                  ) : (
                    companyLogo
                  )}
                </div>
                <h2 className="text-[26px] font-extralight tracking-tight text-[var(--foreground)]">
                  {companyName}
                </h2>
              </div>

              {/* Metadata column row matrix */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl text-left mt-8 mb-8 border-t border-black/[0.04] pt-6 mx-auto">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                    Timeline
                  </p>
                  <p className="text-[13px] font-normal text-neutral-800 mt-1">
                    {timeline}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                    Role
                  </p>
                  <p className="text-[13px] font-normal text-neutral-800 mt-1">
                    {role}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                    Org / Type
                  </p>
                  <p className="text-[13px] font-normal text-neutral-800 mt-1">
                    {orgType}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                    With
                  </p>
                  <p className="text-[13px] font-normal text-neutral-800 mt-1 leading-snug">
                    {collaborators}
                  </p>
                </div>
              </div>

              {/* Case study micro-description */}
              <p className="text-[15px] font-light leading-relaxed text-neutral-500 text-left max-w-3xl w-full mb-12 select-none">
                {microDescription}
              </p>

              {/* Hairline + media entry slot */}
              <div
                className="h-px w-full bg-black/[0.06] mb-8"
                aria-hidden="true"
              />

              <Link
                href={expandHref}
                className="group block w-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2"
                aria-label={`View ${companyName} case study`}
              >
                <div className="w-full rounded-xl bg-neutral-50 aspect-video overflow-hidden border border-black/[0.03] relative transition-shadow group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                  {mediaSrc && mediaVideo ? (
                    <video
                      src={mediaSrc}
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={mediaAlt ?? `${companyName} preview`}
                    />
                  ) : mediaSrc ? (
                    <Image
                      src={mediaSrc}
                      alt={mediaAlt ?? `${companyName} case study preview`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 920px) 100vw, 920px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[rgba(196,181,253,0.12)] to-[rgba(125,211,252,0.08)]">
                      <span className="text-[11px] font-light tracking-[0.12em] uppercase text-neutral-400">
                        Case study preview
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
                    <span className="text-[12px] font-medium text-white tracking-wide">
                      View case study →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
