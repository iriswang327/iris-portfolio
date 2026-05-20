"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingWordsProps {
  words: string[];
  interval?: number;
  gradient?: boolean;
  className?: string;
}

/**
 * Cycles through a list of words with a vertical slide-fade transition.
 * Used in the homepage hero for "Product [designer/thinker/…]" rows.
 */
export default function RotatingWords({
  words,
  interval = 2500,
  gradient = true,
  className = "",
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    // min-w prevents layout shift when words differ in length
    <span className="relative inline-block" style={{ minWidth: "4ch" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={`inline-block ${gradient ? "text-gradient-ihwn" : ""} ${className}`}
          style={{ whiteSpace: "nowrap" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
