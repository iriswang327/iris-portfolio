"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type ExperienceAccentTheme = "gold" | "burnt" | "navy";

export interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  companyLogo: string;
  companyLogoImage?: string;
  /** Short hook under the title — like design modals */
  tagline?: string;
  timeline: string;
  role: string;
  orgType: string;
  collaborators: string;
  microDescription: string;
  expandHref: string;
  accentTheme: ExperienceAccentTheme;
}

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

export default function ExperienceModal({
  isOpen,
  onClose,
  companyName,
  companyLogo,
  companyLogoImage,
  tagline,
  timeline,
  role,
  orgType,
  collaborators,
  microDescription,
  expandHref,
  accentTheme,
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

  const roleLine = `${role} · ${orgType}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="experience-modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
          />

          <div
            className="experience-modal-shell"
            role="dialog"
            aria-modal="true"
            aria-label={`${companyName} project details`}
            onClick={onClose}
          >
            <motion.div
              className="experience-modal"
              data-accent={accentTheme}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.34, 1.2, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="experience-modal-header">
                <div className="experience-modal-header-spacer" aria-hidden="true" />
                <button
                  type="button"
                  onClick={onClose}
                  className="experience-modal-icon-btn"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <div className="experience-modal-body">
                <div className="experience-modal-identity">
                  <div
                    className="experience-modal-badge"
                    style={{
                      background: companyLogoImage ? "#ffffff" : undefined,
                    }}
                    aria-hidden={!!companyLogoImage}
                  >
                    {companyLogoImage ? (
                      <Image
                        src={companyLogoImage}
                        alt=""
                        width={60}
                        height={60}
                        className="experience-modal-badge-image"
                      />
                    ) : (
                      companyLogo
                    )}
                  </div>

                  <h2 className="experience-modal-name">{companyName}</h2>

                  {tagline ? (
                    <p className="experience-modal-tagline">{tagline}</p>
                  ) : null}

                  <p className="experience-modal-role">{roleLine}</p>
                </div>

                <div className="experience-modal-meta">
                  <div className="experience-modal-meta-cell">
                    <p className="experience-modal-meta-label">Timeline</p>
                    <p className="experience-modal-meta-value">{timeline}</p>
                  </div>
                  <div className="experience-modal-meta-cell">
                    <p className="experience-modal-meta-label">Role</p>
                    <p className="experience-modal-meta-value">{role}</p>
                  </div>
                  <div className="experience-modal-meta-cell">
                    <p className="experience-modal-meta-label">Org / Type</p>
                    <p className="experience-modal-meta-value">{orgType}</p>
                  </div>
                  <div className="experience-modal-meta-cell">
                    <p className="experience-modal-meta-label">With</p>
                    <p className="experience-modal-meta-value">{collaborators}</p>
                  </div>
                </div>

                <div className="experience-modal-context">
                  <p className="experience-modal-context-label">Context</p>
                  <p className="experience-modal-summary">{microDescription}</p>
                </div>
              </div>

              <div className="experience-modal-footer">
                <Link href={expandHref} className="experience-modal-cta">
                  <span className="experience-modal-cta-label">View case study</span>
                  <span className="experience-modal-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
