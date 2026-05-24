"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type ExperienceAccentTheme = "gold" | "burnt" | "navy";
export type ExperienceLogoBadgeTone = "light" | "dark";

export interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  companyLogo: string;
  companyLogoImage?: string;
  logoBadgeTone?: ExperienceLogoBadgeTone;
  timeline: string;
  role: string;
  orgType: string;
  summary: string;
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
  logoBadgeTone = "light",
  timeline,
  role,
  orgType,
  summary,
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
  const badgeClassName = companyLogoImage
    ? `experience-modal-badge experience-modal-badge--image experience-modal-badge--${logoBadgeTone}`
    : "experience-modal-badge";

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
            aria-label={`${companyName} experience details`}
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
                  <div className={badgeClassName} aria-hidden={!!companyLogoImage}>
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
                  <p className="experience-modal-role">{roleLine}</p>
                  <p className="experience-modal-when">{timeline}</p>
                  <p className="experience-modal-summary">{summary}</p>
                </div>

                <div className="company-modal-divider experience-modal-divider" aria-hidden="true" />

                <div className="experience-modal-action">
                  <Link href={expandHref} className="experience-modal-study-link">
                    view case study →
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
