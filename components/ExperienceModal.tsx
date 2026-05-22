"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ExperienceClient {
  label: string;
  title: string;
  description: string;
  route: string;
  locked?: boolean;
}

export interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgName: string;
  orgInitial: string;
  orgSubtitle: string;
  description: string;
  timeline: string;
  role: string;
  type: string;
  with: string;
  clients: ExperienceClient[];
}

// ─── Animation variants ──────────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.94, y: 10 },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ExperienceModal({
  isOpen,
  onClose,
  orgName,
  orgInitial,
  orgSubtitle,
  description,
  timeline,
  role,
  type,
  with: withLabel,
  clients,
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

  const metadata = [
    { label: "timeline", value: timeline },
    { label: "role", value: role },
    { label: "type", value: type },
    { label: "with", value: withLabel },
  ] as const;

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
            className="fixed inset-0 z-[201] flex items-center justify-center p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={`${orgName} experience details`}
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-[24px] border border-black/[0.03] shadow-[0_30px_70px_rgba(0,0,0,0.1)] p-8 max-w-[540px] w-full mx-auto relative z-50 text-center flex flex-col items-center pointer-events-auto"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.34, 1.2, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Close ──────────────────────────────────────────────── */}
              <div className="flex w-full justify-end mb-7">
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[18px] leading-none text-[#AAAAAA] transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                  aria-label="close modal"
                >
                  ×
                </button>
              </div>

              {/* ── Org identity ─────────────────────────────────────── */}
              <div className="flex w-full flex-col items-center gap-2.5">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(167,139,250,0.16)] text-base font-normal tracking-tight text-[#A78BFA]"
                  aria-hidden="true"
                >
                  {orgInitial}
                </div>

                <h2 className="text-[26px] font-extralight tracking-tight text-[var(--foreground)]">
                  {orgName}
                </h2>

                <p className="text-[13px] font-light text-neutral-500">
                  {orgSubtitle}
                </p>
              </div>

              <div className="mt-4 mb-6 w-full max-w-[440px] mx-auto text-center">
                <p className="text-[13px] font-light leading-relaxed text-neutral-500 tracking-normal text-center select-none">
                  {description}
                </p>
              </div>

              {/* ── Metadata row ─────────────────────────────────────── */}
              <div className="mb-7 grid w-full grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
                {metadata.map(({ label, value }) => (
                  <div key={label} className="text-center sm:text-left">
                    <p className="mb-1.5 text-[10px] font-normal uppercase tracking-[0.14em] text-[#BBBBBB]">
                      {label}
                    </p>
                    <p className="text-[13px] font-normal leading-snug text-[#1A1A1A]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="mb-7 h-px w-full bg-black/[0.06]"
                aria-hidden="true"
              />

              {/* ── Clients ──────────────────────────────────────────── */}
              <div className="flex w-full flex-col text-left">
                {clients.map((client, idx) => (
                  <div key={`${client.label}-${client.route}`}>
                    <div className="flex items-start gap-5">
                      <div className="min-w-0 flex-1">
                        <p className="mb-1.5 text-[10px] font-normal uppercase tracking-[0.14em] text-[#BBBBBB]">
                          {client.label}
                        </p>

                        <p className="mb-1.5 text-[18px] font-light leading-snug text-[var(--foreground)]">
                          {client.title}
                        </p>

                        <p className="mb-3.5 text-[13px] font-light leading-relaxed text-neutral-500">
                          {client.description}
                        </p>

                        {client.locked ? (
                          <span className="text-xs font-light tracking-wide text-[#BBBBBB]">
                            coming soon 🔒
                          </span>
                        ) : (
                          <Link
                            href={client.route}
                            className="text-gradient-ihwn text-[13px] font-light transition-opacity hover:opacity-70"
                          >
                            view case study →
                          </Link>
                        )}
                      </div>

                      <div
                        className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[10px] bg-[#F5F0E8]"
                        aria-hidden="true"
                      >
                        <span className="text-lg font-extralight text-[rgba(167,139,250,0.55)]">
                          ✦
                        </span>
                      </div>
                    </div>

                    {idx < clients.length - 1 && (
                      <div
                        className="my-[22px] h-px bg-black/[0.05]"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
