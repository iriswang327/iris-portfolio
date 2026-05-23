"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  /** Stagger delay in seconds. Use multiples of 0.1 for sibling groups. */
  delay?: number;
  /** Initial offset direction before fading in. Defaults to "up". */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Tailwind / className passthrough */
  className?: string;
  /** px offset from viewport edge before triggering. Default -60px. */
  margin?: string;
}

const directionOffset: Record<NonNullable<FadeInProps["direction"]>, object> = {
  up:    { y: 24 },
  down:  { y: -24 },
  left:  { x: 24 },
  right: { x: -24 },
  none:  {},
};

/**
 * Wraps any element in a scroll-triggered fade-in.
 * Triggers once when the element enters the viewport.
 *
 * Example:
 *   <FadeIn delay={0.1}>
 *     <ProjectCard ... />
 *   </FadeIn>
 *
 * For a staggered grid, increment delay by 0.08–0.12 per item:
 *   {cards.map((card, i) => (
 *     <FadeIn key={card.id} delay={i * 0.1}>
 *       <ProjectCard {...card} />
 *     </FadeIn>
 *   ))}
 */
export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
  margin = "-60px",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...directionOffset[direction] }
      }
      transition={{
        duration: 0.55,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
