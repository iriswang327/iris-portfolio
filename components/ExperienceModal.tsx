"use client";

import { useEffect } from "react";
import Link from "next/link";
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
  /** Standalone case study route for expand ↗ and CTA */
  expandHref: string;
}

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
              className="gradient-ihwn w-full max-w-[920px] mx-auto rounded-[28px] p-[1.5px] pointer-events-auto shadow-[0_48px_100px_-28px_rgba(167,139,250,0.45),0_24px_64px_-20px_rgba(14,14,16,0.14)]"
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 text-[14px] text-neutral-500 shadow-sm backdrop-blur-sm transition-all hover:border-black/[0.12] hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                    aria-label={`Open ${companyName} case study full page`}
                  >
                    <span aria-hidden="true">↗</span>
                  </Link>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 text-[18px] leading-none text-neutral-500 shadow-sm backdrop-blur-sm transition-all hover:border-black/[0.12] hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>

                {/* Company identity */}
                <div className="flex w-full flex-col items-center gap-3">
                  <div
                    className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full shadow-[0_8px_24px_-8px_rgba(167,139,250,0.35)]"
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
                <div className="gradient-ihwn rounded-2xl p-[1.5px] shadow-[0_20px_56px_-16px_rgba(167,139,250,0.4)]">
                  <Link
                    href={expandHref}
                    className="group flex w-full items-center justify-between gap-4 rounded-[14px] border border-white/90 bg-white/[0.82] px-8 py-6 backdrop-blur-xl transition-all hover:bg-white/[0.92] hover:shadow-[0_12px_40px_-12px_rgba(167,139,250,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2"
                  >
                    <span className="text-[15px] font-medium tracking-tight text-[var(--foreground)]">
                      View case study
                    </span>
                    <span
                      className="gradient-ihwn flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] text-white shadow-[0_8px_20px_-6px_rgba(167,139,250,0.55)] transition-transform group-hover:translate-x-0.5"
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
