"use client";

import { motion } from "framer-motion";

interface IHWNLotusProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const GRADIENT_ID_BASE = "ihwn-lotus-gradient";

/**
 * IHWN Lotus — fineline SVG, IHWN gradient stroke (#F0ABFC → #A78BFA → #7DD3FC).
 *
 * Shape: 5 upward-fanning petals (1 center, 2 inner, 2 outer) all rooted at a
 * shared base point, plus a slim teardrop stem going down. NOT a heart.
 *
 * When animated=true:
 *  – Each path draws itself (pathLength 0→1, staggered).
 *  – After drawing completes the whole mark gently floats (translateY loop).
 */
export default function IHWNLotus({
  size = 28,
  animated = false,
  className = "",
}: IHWNLotusProps) {
  const gid = `${GRADIENT_ID_BASE}-${size}`;

  const stroke = {
    stroke: `url(#${gid})`,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  // viewBox 0 0 40 50
  // All petals radiate from a shared base at (20, 32).
  // Each petal is a closed bezier that fans upward/outward.
  const petals = [
    // 1 — center: straight up, slim pointed
    { d: "M 20,32 C 17,23 17,12 20,5 C 23,12 23,23 20,32 Z", delay: 0.0 },
    // 2 — left inner: ~38° left of vertical
    { d: "M 20,32 C 15,25 9,17 7,10 C 12,9 17,22 20,32 Z",   delay: 0.2 },
    // 3 — right inner: mirror
    { d: "M 20,32 C 25,25 31,17 33,10 C 28,9 23,22 20,32 Z",  delay: 0.4 },
    // 4 — left outer: ~65°, wider and lower tip
    { d: "M 20,32 C 13,28 5,26 2,20 C 5,16 13,25 20,32 Z",    delay: 0.6 },
    // 5 — right outer: mirror
    { d: "M 20,32 C 27,28 35,26 38,20 C 35,16 27,25 20,32 Z", delay: 0.8 },
    // 6 — teardrop stem
    { d: "M 20,32 C 19,37 18,41 20,46 C 22,41 21,37 20,32 Z", delay: 1.0 },
  ];

  const svgEl = (
    <svg
      width={size}
      height={size * 1.25}   // 40:50 aspect ratio
      viewBox="0 0 40 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#f0abfc" />
          <stop offset="50%"  stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>

      {petals.map(({ d, delay }, i) =>
        animated ? (
          <motion.path
            key={i}
            d={d}
            {...stroke}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1.6, ease: "easeInOut", delay },
            }}
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
        // Float starts after the draw animation finishes (~2.7s)
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2.8,
        }}
        style={{ display: "inline-flex" }}
      >
        {svgEl}
      </motion.div>
    );
  }

  return svgEl;
}
