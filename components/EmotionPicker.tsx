"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEmotion, EMOTIONS, type Emotion } from "@/context/EmotionContext";
import IHWNLotus from "@/components/IHWNLotus";

// ─── Watercolor ink-drop blobs ────────────────────────────────────────────────
// Three oversized blobs burst from scale 0 (ink drops into water),
// then drift slowly. More saturated than the rest of the site.

interface InkBlobProps {
  color: string;
  size: number;
  posStyle: React.CSSProperties;
  spreadDelay: number;
  drift: { x: number[]; y: number[] };
  driftDuration: number;
}

function InkBlob({
  color,
  size,
  posStyle,
  spreadDelay,
  drift,
  driftDuration,
}: InkBlobProps) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(80px)",
        ...posStyle,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.08, 1],
        opacity: [0, 1, 1],
        x: drift.x,
        y: drift.y,
      }}
      transition={{
        scale: {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: spreadDelay,
        },
        opacity: { duration: 0.8, ease: "easeOut", delay: spreadDelay },
        x: {
          duration: driftDuration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: spreadDelay + 1.2,
        },
        y: {
          duration: driftDuration * 0.83,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: spreadDelay + 1.2,
        },
      }}
      aria-hidden="true"
    />
  );
}

// ─── Loading transition screen ────────────────────────────────────────────────

interface LoadingScreenProps {
  message: string;
  color: string;
  isDark: boolean;
  onDone: () => void;
}

function LoadingScreen({
  message,
  color,
  isDark,
  onDone,
}: LoadingScreenProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  const textColor = isDark ? "#f5f0e8" : "#1a1625";
  const dotColor = isDark
    ? "rgba(245,240,232,0.5)"
    : "rgba(26,22,37,0.3)";

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4"
      style={{ background: color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <motion.p
        className="text-[15px] font-light text-center px-6"
        style={{ color: textColor, fontFamily: "var(--font-geist-sans)" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
      >
        {message}
      </motion.p>

      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block rounded-full"
            style={{ width: 5, height: 5, background: dotColor }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Emotion pill styles (Figma exact) ───────────────────────────────────────
// Filled soft pastel background (80% opacity) + matching border + pill shape.
// "ready for bed" is dark-filled with white text.

function getPillStyle(color: string, isDark: boolean) {
  const bg = isDark
    ? "rgba(26,26,26,0.85)"
    : color
        .replace("rgb(", "rgba(")
        .replace(")", ", 0.8)")
        // color values come in as hex — convert inline:
        .replace(/^#/, "");

  return {
    background: hexToRgba(color, isDark ? 0.85 : 0.8),
    border: `1px solid ${color}`,
    color: isDark ? "#ffffff" : "#1a1a1a",
    borderRadius: 999,
    padding: "9px 20px",
    fontSize: 13,
    fontWeight: 300,
    letterSpacing: "0.01em",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    fontFamily: "var(--font-geist-sans)",
  };
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Emotion Picker ───────────────────────────────────────────────────────────

export default function EmotionPicker() {
  const { showPicker, setShowPicker, setEmotion } = useEmotion();
  const [selectedEmotion, setSelectedEmotion] =
    useState<NonNullable<Emotion> | null>(null);
  const [phase, setPhase] = useState<"picker" | "loading" | "done">("picker");

  const handleSelect = (id: NonNullable<Emotion>) => {
    setSelectedEmotion(id);
    setPhase("loading");
  };

  const handleSkip = () => {
    setEmotion(null);
    setShowPicker(false);
  };

  const handleLoadingDone = () => {
    if (selectedEmotion) setEmotion(selectedEmotion);
    setPhase("done");
    setShowPicker(false);
  };

  const selectedConfig = selectedEmotion
    ? EMOTIONS.find((e) => e.id === selectedEmotion)
    : null;

  return (
    <AnimatePresence mode="wait">
      {/* ── Picker screen ── */}
      {phase === "picker" && showPicker && (
        <motion.div
          key="picker"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            // Rich, saturated watercolor wash — more vibrant than the site bg
            background:
              "linear-gradient(145deg, #e8d5ff 0%, #f5c8f0 30%, #ffd6e0 55%, #c8e8ff 80%, #d4f0ff 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.35 } }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          {/* ── Ink-drop blobs — burst in staggered, then drift slowly ── */}

          {/* Lavender — top-left */}
          <InkBlob
            color="rgba(196,150,255,0.55)"
            size={560}
            posStyle={{ top: "-12%", left: "-8%" }}
            spreadDelay={0}
            drift={{ x: [0, 24, -12, 0], y: [0, 16, -10, 0] }}
            driftDuration={24}
          />
          {/* Blush — top-right */}
          <InkBlob
            color="rgba(255,180,210,0.5)"
            size={500}
            posStyle={{ top: "-6%", right: "-10%" }}
            spreadDelay={0.15}
            drift={{ x: [0, -18, 14, 0], y: [0, 20, -8, 0] }}
            driftDuration={20}
          />
          {/* Sky-blue — bottom-left */}
          <InkBlob
            color="rgba(140,200,255,0.45)"
            size={480}
            posStyle={{ bottom: "-10%", left: "10%" }}
            spreadDelay={0.3}
            drift={{ x: [0, 16, -20, 0], y: [0, -14, 10, 0] }}
            driftDuration={28}
          />
          {/* Peach — bottom-right */}
          <InkBlob
            color="rgba(255,200,160,0.4)"
            size={420}
            posStyle={{ bottom: "-8%", right: "5%" }}
            spreadDelay={0.45}
            drift={{ x: [0, -10, 18, 0], y: [0, -18, 12, 0] }}
            driftDuration={22}
          />

          {/* ── Content — staggered fade-up ── */}
          <div className="relative z-10 flex flex-col items-center gap-5 px-5 text-center">

            {/* Lotus — draws itself, then floats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.6, duration: 0.6, ease: "easeOut" },
              }}
            >
              <IHWNLotus size={64} animated />
            </motion.div>

            {/* "hi, how are you?" — 28px weight 200 */}
            <motion.h1
              style={{
                fontSize: 28,
                fontWeight: 200,
                color: "#1a1625",
                letterSpacing: "-0.02em",
                lineHeight: 1.5,
                fontFamily: "var(--font-geist-sans)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1.0, duration: 0.5 },
              }}
            >
              hi, how are you?
            </motion.h1>

            {/* Emotion pills — filled pastel, pill shape */}
            <motion.div
              className="flex flex-wrap items-center justify-center"
              style={{ gap: 10 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1.3, duration: 0.5 },
              }}
              role="group"
              aria-label="Choose your mood"
            >
              {EMOTIONS.map((e) => (
                <motion.button
                  key={e.id}
                  onClick={() => handleSelect(e.id)}
                  style={getPillStyle(e.color, e.isDark)}
                  whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.15 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  aria-label={`I'm feeling ${e.label}`}
                >
                  {e.label}
                </motion.button>
              ))}
            </motion.div>

            {/* SKIP FOR NOW → */}
            <motion.button
              onClick={handleSkip}
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#bbbbbb",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 8px",
                minHeight: 44,
                display: "flex",
                alignItems: "center",
                fontFamily: "var(--font-geist-sans)",
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 1.6, duration: 0.4 },
              }}
              whileHover={{ opacity: 0.6 }}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
              aria-label="Skip emotion selection"
            >
              SKIP FOR NOW →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ── Loading screen (2.5s) → site ── */}
      {phase === "loading" && selectedConfig && (
        <LoadingScreen
          key="loading"
          message={selectedConfig.loadingMessage}
          color={selectedConfig.color}
          isDark={selectedConfig.isDark}
          onDone={handleLoadingDone}
        />
      )}
    </AnimatePresence>
  );
}
