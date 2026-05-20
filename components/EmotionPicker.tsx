"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEmotion, EMOTIONS, type Emotion } from "@/context/EmotionContext";
import IHWNLotus from "@/components/IHWNLotus";

// ─── Watercolor ink-drop blobs ────────────────────────────────────────────────
// Three blobs spread in from scale 0 like ink dropping into water,
// then drift slowly. Colors exactly per spec.

interface InkBlobProps {
  color: string;
  size: number;
  posStyle: React.CSSProperties;
  spreadDelay: number; // when this blob starts spreading
  drift: { x: number[]; y: number[] };
  driftDuration: number;
}

function InkBlob({ color, size, posStyle, spreadDelay, drift, driftDuration }: InkBlobProps) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(88px)",
        ...posStyle,
      }}
      // Ink-drop: expand from 0 → 1, then gently drift
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.05, 1],
        opacity: [0, 1, 1],
        x: drift.x,
        y: drift.y,
      }}
      transition={{
        scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: spreadDelay },
        opacity: { duration: 0.9, ease: "easeOut", delay: spreadDelay },
        x: { duration: driftDuration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: spreadDelay + 1.4 },
        y: { duration: driftDuration * 0.85, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: spreadDelay + 1.4 },
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

function LoadingScreen({ message, color, isDark, onDone }: LoadingScreenProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  const textColor = isDark ? "#f5f0e8" : "#1a1625";
  const dotColor = isDark ? "rgba(245,240,232,0.5)" : "rgba(26,22,37,0.3)";

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
        style={{ color: textColor }}
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

// ─── Emotion Picker ───────────────────────────────────────────────────────────

export default function EmotionPicker() {
  const { showPicker, setShowPicker, setEmotion } = useEmotion();
  const [selectedEmotion, setSelectedEmotion] = useState<NonNullable<Emotion> | null>(null);
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

  // Always render the AnimatePresence wrapper so exit animations fire correctly
  return (
    <AnimatePresence mode="wait">
      {/* ── Picker screen ── */}
      {phase === "picker" && showPicker && (
        <motion.div
          key="picker"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            // Soft base: lavender-white → blush-white gradient
            background: "linear-gradient(135deg, #f0eeff 0%, #fce8f8 55%, #eef4ff 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          {/* ── Ink-drop blobs — spread in staggered, then drift ── */}

          {/* Lavender blob — top-left */}
          <InkBlob
            color="rgba(196,181,253,0.4)"
            size={520}
            posStyle={{ top: "-8%", left: "-6%" }}
            spreadDelay={0}
            drift={{ x: [0, 22, -10, 0], y: [0, 14, -8, 0] }}
            driftDuration={22}
          />
          {/* Blush blob — top-right */}
          <InkBlob
            color="rgba(251,207,232,0.35)"
            size={460}
            posStyle={{ top: "-4%", right: "-8%" }}
            spreadDelay={0.18}
            drift={{ x: [0, -16, 12, 0], y: [0, 18, -6, 0] }}
            driftDuration={19}
          />
          {/* Periwinkle blob — center */}
          <InkBlob
            color="rgba(165,180,252,0.3)"
            size={500}
            posStyle={{ top: "28%", left: "50%", transform: "translateX(-50%)" }}
            spreadDelay={0.35}
            drift={{ x: [0, 12, -14, 0], y: [0, -12, 16, 0] }}
            driftDuration={26}
          />

          {/* ── Content — staggered fade-up after ink settles ── */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-5 text-center">

            {/* Lotus draws itself after ink drop (delay 1.1s) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 1.1, duration: 0.5, ease: "easeOut" } }}
            >
              <IHWNLotus size={64} animated />
            </motion.div>

            {/* Question — 26px weight 200 */}
            <motion.h1
              style={{
                fontSize: 26,
                fontWeight: 200,
                color: "#1a1625",
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.5 } }}
            >
              hi, how are you today?
            </motion.h1>

            {/* Emotion pills */}
            <motion.div
              className="flex flex-wrap items-center justify-center"
              style={{ gap: 20 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1.65, duration: 0.5 } }}
              role="group"
              aria-label="Choose your mood"
            >
              {EMOTIONS.map((e) => (
                <motion.button
                  key={e.id}
                  onClick={() => handleSelect(e.id)}
                  className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  style={{
                    // Transparent bg, 1.5px solid border in emotion color
                    padding: "8px 16px",
                    border: `1.5px solid ${e.color}`,
                    borderRadius: 10,       // rectangular — not pill
                    background: "transparent",
                    cursor: "pointer",
                    // Geist Sans 12px weight 300 lowercase
                    fontSize: 12,
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                    color: "#1a1625",
                    textTransform: "lowercase",
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: `${e.color}26`, // 15% opacity on hover
                    transition: { duration: 0.15 },
                  }}
                  aria-label={`I'm feeling ${e.label}`}
                >
                  {/* 8px square color swatch — LEFT of text */}
                  <span
                    aria-hidden="true"
                    style={{
                      display: "block",
                      flexShrink: 0,
                      width: 8,
                      height: 8,
                      background: e.color,
                      borderRadius: 1,
                    }}
                  />
                  {e.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Subtitle — 9px uppercase #BBBBBB tracking 0.1em */}
            <motion.p
              style={{
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#bbbbbb",
                fontWeight: 400,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.85, duration: 0.4 } }}
            >
              your choice colors the experience
            </motion.p>

            {/* SKIP → — 10px uppercase #BBBBBB */}
            <motion.button
              onClick={handleSkip}
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#bbbbbb",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px",
                minHeight: 44,
                display: "flex",
                alignItems: "center",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 2.0, duration: 0.4 } }}
              whileHover={{ opacity: 0.6 }}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
              aria-label="Skip emotion selection"
            >
              SKIP →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ── Loading screen (2.5s) → homepage ── */}
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
