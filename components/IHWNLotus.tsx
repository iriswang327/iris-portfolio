"use client";

import { motion } from "framer-motion";

interface IHWNLotusProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const GRADIENT_ID_BASE = "ihwn-lotus-gradient";

/**
 * IHWN Lotus — fineline SVG with IHWN gradient stroke.
 * Layered petals, pointed inner, wide outer, teardrop stem.
 * Optional draw animation on mount.
 */
export default function IHWNLotus({
  size = 28,
  animated = false,
  className = "",
}: IHWNLotusProps) {
  const gradientId = `${GRADIENT_ID_BASE}-${size}`;

  const strokeProps = {
    stroke: `url(#${gradientId})`,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  const pathVariants = animated
    ? {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 2, ease: "easeInOut" },
        },
      }
    : undefined;

  const floatVariants = animated
    ? {
        float: {
          y: [0, -4, 0],
          transition: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 2.1,
          },
        },
      }
    : undefined;

  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>

      {/* Center inner petal */}
      {animated ? (
        <motion.path
          d="M16 24 C14 19 12 14 16 8 C20 14 18 19 16 24Z"
          {...strokeProps}
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      ) : (
        <path d="M16 24 C14 19 12 14 16 8 C20 14 18 19 16 24Z" {...strokeProps} />
      )}

      {/* Left inner petal */}
      {animated ? (
        <motion.path
          d="M16 24 C12 20 7 17 7 11 C11 11 15 16 16 24Z"
          {...strokeProps}
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
        />
      ) : (
        <path d="M16 24 C12 20 7 17 7 11 C11 11 15 16 16 24Z" {...strokeProps} />
      )}

      {/* Right inner petal */}
      {animated ? (
        <motion.path
          d="M16 24 C20 20 25 17 25 11 C21 11 17 16 16 24Z"
          {...strokeProps}
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
        />
      ) : (
        <path d="M16 24 C20 20 25 17 25 11 C21 11 17 16 16 24Z" {...strokeProps} />
      )}

      {/* Far left outer petal */}
      {animated ? (
        <motion.path
          d="M16 26 C10 22 3 21 2 14 C6 12 13 18 16 26Z"
          {...strokeProps}
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
        />
      ) : (
        <path d="M16 26 C10 22 3 21 2 14 C6 12 13 18 16 26Z" {...strokeProps} />
      )}

      {/* Far right outer petal */}
      {animated ? (
        <motion.path
          d="M16 26 C22 22 29 21 30 14 C26 12 19 18 16 26Z"
          {...strokeProps}
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
        />
      ) : (
        <path d="M16 26 C22 22 29 21 30 14 C26 12 19 18 16 26Z" {...strokeProps} />
      )}

      {/* Teardrop stem */}
      {animated ? (
        <motion.path
          d="M16 26 C15 29 14 31 16 34 C18 31 17 29 16 26Z"
          {...strokeProps}
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2, ease: "easeInOut", delay: 1.0 }}
        />
      ) : (
        <path d="M16 26 C15 29 14 31 16 34 C18 31 17 29 16 26Z" {...strokeProps} />
      )}
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        variants={floatVariants}
        animate="float"
        style={{ display: "inline-flex" }}
      >
        {svgContent}
      </motion.div>
    );
  }

  return svgContent;
}
