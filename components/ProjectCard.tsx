"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ProjectCardProps {
  /** Navigation target. Omit when using onClick instead. */
  href?: string;
  /** When provided the card renders as a button and fires this callback on click. */
  onClick?: () => void;
  /** When true the card shows a "currently building 🔒" overlay on hover and does not navigate. */
  locked?: boolean;
  /** CSS gradient string used when no videoUrl is provided */
  gradient: string;
  /** Optional center logo / icon — ReactNode for flexibility */
  logo?: ReactNode;
  /** Frosted pill label */
  pill: string;
  /** True → dark pill variant (rgba(0,0,0,0.55)), default false → light frosted */
  pillDark?: boolean;
  /** Text that fades in BELOW the card on hover (not overlaid) */
  hoverDescription: string;
  /** If provided, a looping muted autoplay video fills the card instead of the gradient */
  videoUrl?: string;
}

export default function ProjectCard({
  href,
  onClick,
  locked = false,
  gradient,
  logo,
  pill,
  pillDark = false,
  hoverDescription,
  videoUrl,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const cardInner = (
    <motion.div
      className="relative overflow-hidden rounded-[20px] w-full border border-black/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
      style={{ height: 340, cursor: locked ? "default" : "pointer" }}
      animate={{ scale: hovered && !locked ? 0.97 : 1 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      aria-label={pill}
    >
      {/* ── Background: video or gradient ── */}
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 object-contain p-8 w-full h-full bg-white transition-transform duration-500 hover:scale-[1.02]"
          src={videoUrl}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: gradient }}
          aria-hidden="true"
        />
      )}

      {/* ── Center logo (ghost watermark) ── */}
      {logo && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {logo}
        </div>
      )}

      {/* ── Locked overlay — fades in on hover ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: "rgba(0,0,0,0.52)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderRadius: 20,
          pointerEvents: "none",
        }}
        initial={false}
        animate={{ opacity: locked && hovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.03em",
          }}
        >
          currently building 🔒
        </span>
      </motion.div>

      {/* ── Pill — bottom-left ── */}
      <div
        className="absolute bottom-3 left-3"
        style={{
          background: pillDark ? "rgba(0,0,0,0.72)" : "rgba(255,255,255,0.9)",
          borderRadius: 999,
          padding: "6px 14px",
          fontSize: 11,
          fontWeight: 400,
          color: pillDark ? "#ffffff" : "#1A1625",
          whiteSpace: "nowrap",
          lineHeight: 1,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {pill}
      </div>
    </motion.div>
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Render Link, button, or plain div depending on interaction mode */}
      {onClick ? (
        <button
          onClick={onClick}
          className="block w-full text-left bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-[20px]"
          aria-label={pill}
        >
          {cardInner}
        </button>
      ) : href ? (
        <Link href={href} className="block">
          {cardInner}
        </Link>
      ) : (
        <div>{cardInner}</div>
      )}

      {/* ── Hover description — outside the card, below it ── */}
      <motion.p
        className="mt-2 px-1"
        style={{
          fontSize: 11,
          fontWeight: 300,
          color: "#888888",
          fontStyle: "italic",
          minHeight: "1.5em",
          pointerEvents: "none",
        }}
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        aria-hidden={!hovered}
      >
        {locked ? "currently building 🔒" : hoverDescription}
      </motion.p>
    </div>
  );
}
