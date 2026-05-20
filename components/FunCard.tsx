"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FunCardProps {
  href: string;
  title: string;
  description: string;
  /** Tag / CTA text — rendered with IHWN gradient */
  tag: string;
}

/**
 * "For Fun" section card — soft lavender tint, dark-mode aware via .fun-card CSS class.
 */
export default function FunCard({ href, title, description, tag }: FunCardProps) {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        className="fun-card flex flex-col h-full rounded-[14px] p-[18px] cursor-pointer"
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <span
          className="text-[13px] font-normal"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </span>
        <span
          className="text-[11px] font-light mt-1"
          style={{ color: "#BBBBBB" }}
        >
          {description}
        </span>
        <span className="text-gradient-ihwn text-[11px] font-light mt-3">
          {tag}
        </span>
      </motion.div>
    </Link>
  );
}
