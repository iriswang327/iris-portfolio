"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FunCardProps {
  href: string;
  title: string;
  description: string;
  /** Tag / CTA text — rendered with IHWN gradient */
  tag: string;
  comingSoon?: boolean;
  /** Static blurred preview — no hover or navigation */
  preview?: boolean;
}

/**
 * "For Fun" section card — soft lavender tint, dark-mode aware via .fun-card CSS class.
 */
export default function FunCard({
  href,
  title,
  description,
  tag,
  comingSoon = false,
  preview = false,
}: FunCardProps) {
  const [hovered, setHovered] = useState(false);

  const cardContent = (
    <>
      <span className="text-[13px] font-normal text-[var(--foreground)]">{title}</span>
      <span className="mt-1 text-[11px] font-light text-[#BBBBBB]">{description}</span>
      <span className="text-gradient-ihwn mt-3 text-[11px] font-light">{tag}</span>
    </>
  );

  if (preview) {
    return (
      <div className="fun-card flex h-full min-h-[108px] flex-col rounded-[14px] p-[18px]" aria-hidden="true">
        {cardContent}
      </div>
    );
  }

  const cardInner = (
    <motion.div
      className="fun-card relative flex flex-col h-full min-h-[108px] rounded-[14px] p-[18px] overflow-hidden"
      animate={{ scale: hovered && !comingSoon ? 0.98 : 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ cursor: comingSoon ? "default" : "pointer" }}
    >
      <div
        className="flex h-full flex-col"
        style={{
          filter: comingSoon && hovered ? "blur(8px)" : "none",
          transform: comingSoon && hovered ? "scale(1.06)" : "scale(1)",
          transition: "filter 500ms ease, transform 500ms ease",
        }}
      >
        {cardContent}
      </div>

      {comingSoon && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ borderRadius: 14, pointerEvents: "none" }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[12px] font-normal text-white shadow-lg backdrop-blur-md">
            Coming soon!
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  if (comingSoon) {
    return (
      <div
        className="block h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-disabled
      >
        {cardInner}
      </div>
    );
  }

  return (
    <Link href={href} className="block h-full">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {cardInner}
      </div>
    </Link>
  );
}
