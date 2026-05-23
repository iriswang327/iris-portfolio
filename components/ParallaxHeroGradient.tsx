"use client";

import { useScroll, useTransform, motion } from "framer-motion";

/**
 * Three independently animated watercolor blob divs.
 * Lavender drifts left, blush drifts right, periwinkle drifts up as user scrolls.
 * Drop-in replacement for the static CSS background gradient in hero sections.
 */
export default function ParallaxHeroGradient() {
  const { scrollY } = useScroll();

  // Very subtle — 20-28px max shift over first 600px of scroll
  const lavenderX  = useTransform(scrollY, [0, 600], [0, -26]);
  const blushX     = useTransform(scrollY, [0, 600], [0, 22]);
  const periwinkleY = useTransform(scrollY, [0, 600], [0, -18]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Lavender — top-left, drifts left */}
      <motion.div
        style={{
          position: "absolute",
          top: "-5%",
          left: "-8%",
          width: "75%",
          height: "55%",
          background: "radial-gradient(ellipse at center, var(--blob-lavender) 0%, transparent 65%)",
          x: lavenderX,
        }}
      />

      {/* Blush — top-right, drifts right */}
      <motion.div
        style={{
          position: "absolute",
          top: "-8%",
          right: "-8%",
          width: "60%",
          height: "50%",
          background: "radial-gradient(ellipse at center, var(--blob-blush) 0%, transparent 65%)",
          x: blushX,
        }}
      />

      {/* Periwinkle — center, drifts up */}
      <motion.div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: "55%",
          height: "65%",
          background: "radial-gradient(ellipse at center, var(--blob-periwinkle) 0%, transparent 72%)",
          y: periwinkleY,
        }}
      />
    </div>
  );
}
