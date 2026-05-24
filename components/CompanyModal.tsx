"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ModalProject {
  title: string;
  subtitle?: string;
  route: string;
  /** When true, replaces the "view case study" link with a coming-soon indicator */
  locked?: boolean;
  /** Optional thumbnail image shown in the right accent slot */
  preview?: string;
}

export interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  /** Single letter or short string shown in the 60px badge circle */
  companyLogo: string;
  /** Optional image path — when provided, renders an <img> in the badge instead of text */
  companyLogoImage?: string;
  /** Optional line under the company name — defaults to product designer + case study */
  roleLabel?: string;
  /** Optional one- or two-sentence context below the role line */
  whyCompanyText?: string;
  projects: ModalProject[];
  /** Optional override for the ↗ expand button. Omit to hide the button. */
  expandHref?: string;
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

export default function CompanyModal({
  isOpen,
  onClose,
  companyName,
  companyLogo,
  companyLogoImage,
  roleLabel = "Product Designer · Case Study",
  whyCompanyText,
  projects,
  expandHref,
}: CompanyModalProps) {
  const hasSummary = Boolean(whyCompanyText?.trim());

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
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

          {/* ── Scroll shell — centers the card ──────────────────────────── */}
          <div
            className="fixed inset-0 z-[201] flex items-center justify-center p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={`${companyName} project details`}
            onClick={onClose}
          >
            {/* ── Modal card ───────────────────────────────────────────── */}
            <motion.div
              className="relative bg-white rounded-[20px] w-full pointer-events-auto"
              style={{
                maxWidth: 580,
                padding: 36,
                boxShadow: "0 24px 80px rgba(0,0,0,0.16)",
              }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.34, 1.2, 0.64, 1] }}
              // Stop click from bubbling to the backdrop
              onClick={(e) => e.stopPropagation()}
            >

              {/* ── Top action row ────────────────────────────────────── */}
              <div className="flex items-center justify-between" style={{ marginBottom: 28 }}>

                {/* Expand ↗ — only shown when an expandHref is provided */}
                {expandHref ? (
                  <Link
                    href={expandHref}
                    className="flex items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                    style={{
                      width: 32,
                      height: 32,
                      border: "0.5px solid rgba(0,0,0,0.1)",
                      fontSize: 14,
                      color: "#AAAAAA",
                    }}
                    aria-label={`Expand ${companyName} full page`}
                  >
                    ↗
                  </Link>
                ) : (
                  <div style={{ width: 32 }} aria-hidden="true" />
                )}

                {/* Close × */}
                <button
                  onClick={onClose}
                  className="flex items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                  style={{
                    width: 32,
                    height: 32,
                    border: "0.5px solid rgba(0,0,0,0.1)",
                    fontSize: 18,
                    color: "#AAAAAA",
                    background: "none",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              {/* ── Company identity ───────────────────────────────────── */}
              <div className="company-modal-identity">
                <div
                  className="company-modal-badge"
                  style={{
                    background: companyLogoImage ? "transparent" : "rgba(167,139,250,0.16)",
                  }}
                  aria-hidden="true"
                >
                  {companyLogoImage ? (
                    <img
                      src={companyLogoImage}
                      alt=""
                      className="company-modal-badge-image"
                    />
                  ) : (
                    companyLogo
                  )}
                </div>

                <h2 className="company-modal-name">{companyName}</h2>
                <p className="company-modal-role">{roleLabel}</p>

                {hasSummary ? (
                  <p className="company-modal-summary">{whyCompanyText}</p>
                ) : null}
              </div>

              <div className="company-modal-divider" aria-hidden="true" />

              {/* ── Projects list ─────────────────────────────────────── */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {projects.map((project, idx) => (
                  <div key={project.route}>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>

                      {/* Left: label + title + subtitle + cta */}
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 400,
                            color: "#BBBBBB",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            marginBottom: 7,
                          }}
                        >
                          PROJECT {String(idx + 1).padStart(2, "0")}
                        </p>

                        <p className="company-modal-project-title">{project.title}</p>

                        {project.subtitle ? (
                          <p className="company-modal-project-subtitle">{project.subtitle}</p>
                        ) : null}

                        {project.locked ? (
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 300,
                              color: "#BBBBBB",
                              letterSpacing: "0.04em",
                            }}
                          >
                            currently building 🔒
                          </span>
                        ) : (
                          <Link
                            href={project.route}
                            className="text-gradient-ihwn hover:opacity-70 transition-opacity"
                            style={{ fontSize: 13, fontWeight: 300 }}
                          >
                            view case study →
                          </Link>
                        )}
                      </div>

                      {/* Right: project thumbnail — image if preview provided, else lavender accent */}
                      <div
                        style={{
                          width: 88,
                          height: 68,
                          borderRadius: 10,
                          flexShrink: 0,
                          overflow: "hidden",
                          background: project.preview
                            ? "transparent"
                            : "linear-gradient(135deg, rgba(196,181,253,0.35) 0%, rgba(167,139,250,0.22) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-hidden="true"
                      >
                        {project.preview ? (
                          <img
                            src={project.preview}
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <span
                            style={{
                              fontSize: 22,
                              fontWeight: 200,
                              color: "rgba(167,139,250,0.55)",
                              lineHeight: 1,
                            }}
                          >
                            +
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hairline between projects (not after last) */}
                    {idx < projects.length - 1 && (
                      <div
                        style={{
                          height: "0.5px",
                          background: "rgba(0,0,0,0.05)",
                          margin: "22px 0",
                        }}
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
