"use client";

import { motion } from "framer-motion";

interface IHWNLotusProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const GRADIENT_ID_BASE = "ihwn-lotus-gradient";

/**
 * IHWN Lotus — fineline SVG, IHWN gradient stroke.
 * 5 petals radiating upward/outward from a central base + teardrop stem.
 * viewBox 0 0 40 48 — base point at (20,30), tip of stem at (20,45).
 */
export default function IHWNLotus({
  size = 28,
  animated = false,
  className = "",
}: IHWNLotusProps) {
  // Unique gradient id per size to avoid SVG id collisions on the same page
  const gid = `${GRADIENT_ID_BASE}-${size}`;

  const stroke = {
    stroke: `url(#${gid})`,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  // Draw-on animation variants (pathLength 0→1)
  const draw = (delay: number) =>
    animated
      ? {
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.8, ease: "easeInOut", delay },
          },
        }
      : undefined;

  // All petals radiate from base point (20,30).
  // Stem hangs below as a slim teardrop to (20,45).
  const paths = [
    // 1. Center petal — straight up, slim and pointed
    { d: "M 20,30 C 17,22 17,12 20,5 C 23,12 23,22 20,30 Z", delay: 0 },
    // 2. Left inner petal — ~38° from vertical
    { d: "M 20,30 C 15,24 9,18 7,11 C 12,10 17,21 20,30 Z", delay: 0.25 },
    // 3. Right inner petal — mirror
    { d: "M 20,30 C 25,24 31,18 33,11 C 28,10 23,21 20,30 Z", delay: 0.5 },
    // 4. Left outer petal — ~65°, broader and lower
    { d: "M 20,30 C 13,27 5,25 2,19 C 5,15 13,24 20,30 Z", delay: 0.75 },
    // 5. Right outer petal — mirror
    { d: "M 20,30 C 27,27 35,25 38,19 C 35,15 27,24 20,30 Z", delay: 1.0 },
    // 6. Teardrop stem — tapers from base down to a soft point
    { d: "M 20,30 C 19,35 18,40 20,45 C 22,40 21,35 20,30 Z", delay: 1.25 },
  ];

  const svgEl = (
    <svg
      width={size}
      height={size * (48 / 40)}
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>

      {paths.map(({ d, delay }, i) =>
        animated ? (
          <motion.path
            key={i}
            d={d}
            {...stroke}
            variants={draw(delay)}
            initial="hidden"
            animate="visible"
          />
        ) : (
          <path key={i} d={d} {...stroke} />
        )
      )}
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2.2,
        }}
        style={{ display: "inline-flex" }}
      >
        {svgEl}
      </motion.div>
    );
  }

  return svgEl;
}
