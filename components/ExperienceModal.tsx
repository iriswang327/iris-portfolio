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
    { label: "Timeline", value: timeline },
    { label: "Role", value: role },
    { label: "Type", value: type },
    { label: "With", value: withLabel },
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
              className="relative bg-white rounded-[20px] w-full pointer-events-auto"
              style={{
                maxWidth: 580,
                padding: 36,
                boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16)",
              }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.34, 1.2, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Close ──────────────────────────────────────────────── */}
              <div className="flex justify-end" style={{ marginBottom: 28 }}>
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

              {/* ── Org identity ─────────────────────────────────────── */}
              <div className="flex flex-col items-center" style={{ gap: 10, marginBottom: 24 }}>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(167,139,250,0.16)",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#A78BFA",
                    letterSpacing: "-0.01em",
                  }}
                  aria-hidden="true"
                >
                  {orgInitial}
                </div>

                <h2
                  style={{
                    fontSize: 26,
                    fontWeight: 200,
                    color: "var(--foreground)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                  }}
                >
                  {orgName}
                </h2>

                <p style={{ fontSize: 13, fontWeight: 300, color: "#888888" }}>
                  {orgSubtitle}
                </p>
              </div>

              {/* ── Metadata row ─────────────────────────────────────── */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5"
                style={{ marginBottom: 28 }}
              >
                {metadata.map(({ label, value }) => (
                  <div key={label}>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 400,
                        color: "#BBBBBB",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        color: "#1A1A1A",
                        lineHeight: 1.4,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{ height: "0.5px", background: "rgba(0,0,0,0.06)", marginBottom: 28 }}
                aria-hidden="true"
              />

              {/* ── Clients ──────────────────────────────────────────── */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {clients.map((client, idx) => (
                  <div key={`${client.label}-${client.route}`}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
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
                          {client.label}
                        </p>

                        <p
                          style={{
                            fontSize: 18,
                            fontWeight: 300,
                            color: "var(--foreground)",
                            lineHeight: 1.35,
                            marginBottom: 6,
                          }}
                        >
                          {client.title}
                        </p>

                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 300,
                            color: "#888888",
                            lineHeight: 1.6,
                            marginBottom: 14,
                          }}
                        >
                          {client.description}
                        </p>

                        {client.locked ? (
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 300,
                              color: "#BBBBBB",
                              letterSpacing: "0.04em",
                            }}
                          >
                            coming soon 🔒
                          </span>
                        ) : (
                          <Link
                            href={client.route}
                            className="text-gradient-ihwn hover:opacity-70 transition-opacity"
                            style={{ fontSize: 13, fontWeight: 300 }}
                          >
                            view case study →
                          </Link>
                        )}
                      </div>

                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 10,
                          flexShrink: 0,
                          background: "#F5F0E8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-hidden="true"
                      >
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 200,
                            color: "rgba(167,139,250,0.55)",
                            lineHeight: 1,
                          }}
                        >
                          ✦
                        </span>
                      </div>
                    </div>

                    {idx < clients.length - 1 && (
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
