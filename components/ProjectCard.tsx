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
  /** When true the card shows a lock emblem overlay on hover and does not navigate. */
  locked?: boolean;
  /** CSS gradient string used when no videoUrl or imageUrl is provided */
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
  /** If provided, a static image fills the card instead of the gradient */
  imageUrl?: string;
  /** If provided, renders the video/image inside a styled backdrop frame instead of full-bleed */
  frameClassName?: string;
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
  imageUrl,
  frameClassName,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const cardInner = (
      <motion.div
      className="relative overflow-hidden rounded-[20px] w-full bg-white border border-black/[0.03] sm:group-hover:border-black/[0.06] transition-colors duration-500 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.12)]"
      style={{ height: 340, cursor: onClick || (!locked && href) ? "pointer" : "default" }}
      animate={{ scale: hovered && !locked ? 0.97 : 1 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      aria-label={pill}
    >
      {/* ── Background: framed, video, image, or gradient ── */}
      {frameClassName ? (
        <div
          className="absolute inset-0"
          style={{
            filter: locked && hovered ? "blur(8px)" : "none",
            transform: locked && hovered ? "scale(1.06)" : "scale(1)",
            transition: "filter 500ms ease, transform 500ms ease",
          }}
          aria-hidden="true"
        >
          <div className={frameClassName}>
            {videoUrl && (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="max-h-[85%] w-auto object-contain rounded-xl shadow-sm border border-black/[0.01]"
                src={videoUrl}
                aria-hidden="true"
              />
            )}
            {!videoUrl && imageUrl && (
              <img
                src={imageUrl}
                alt=""
                className="max-h-[85%] w-auto object-contain rounded-xl shadow-sm border border-black/[0.01]"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      ) : videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 object-contain p-8 w-full h-full bg-white"
          style={{
            filter: locked && hovered ? "blur(8px)" : "none",
            transform: locked && hovered ? "scale(1.06)" : "scale(1)",
            transition: "filter 500ms ease, transform 500ms ease",
          }}
          src={videoUrl}
          aria-hidden="true"
        />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: locked && hovered ? "blur(8px)" : "none",
            transform: locked && hovered ? "scale(1.06)" : "scale(1)",
            transition: "filter 500ms ease, transform 500ms ease",
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: gradient,
            filter: locked && hovered ? "blur(8px)" : "none",
            transition: "filter 500ms ease",
          }}
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

      {/* ── Locked overlay — lock emblem fades in on hover ── */}
      {locked && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ borderRadius: 20, pointerEvents: "none" }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="bg-black/40 backdrop-blur-md text-white p-3 rounded-full border border-white/10 shadow-lg text-xl">
            🔒
          </div>
        </motion.div>
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
  );

  return (
    <div
      className="group"
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
