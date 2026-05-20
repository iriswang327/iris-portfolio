"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ProjectCardProps {
  href: string;
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
  gradient,
  logo,
  pill,
  pillDark = false,
  hoverDescription,
  videoUrl,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={href} className="block">
        <motion.div
          className="relative overflow-hidden rounded-[20px] cursor-pointer w-full"
          style={{ height: 340 }}
          animate={{ scale: hovered ? 0.97 : 1 }}
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
              className="absolute inset-0 w-full h-full object-cover"
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
      </Link>

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
        {hoverDescription}
      </motion.p>
    </div>
  );
}
