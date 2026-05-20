"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEmotion, EMOTIONS, type Emotion } from "@/context/EmotionContext";
import IHWNLotus from "@/components/IHWNLotus";

// ─── Watercolor blobs ────────────────────────────────────────────────────────
// Three slow-drifting radial blobs per guidelines:
// Lavender rgba(196,181,253,0.4) top-left
// Blush   rgba(251,207,232,0.35) top-right
// Periwinkle rgba(165,180,252,0.3) center

interface BlobProps {
  color: string;
  size: number;
  style: React.CSSProperties;
  drift: { x: number[]; y: number[] };
  duration: number;
}

function WatercolorBlob({ color, size, style, drift, duration }: BlobProps) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(90px)",
        ...style,
      }}
      animate={{ x: drift.x, y: drift.y }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}

// ─── Loading screen ───────────────────────────────────────────────────────────

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

// ─── Main component ───────────────────────────────────────────────────────────

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

  if (!showPicker && phase !== "loading") return null;

  return (
    <AnimatePresence mode="wait">
      {phase === "picker" && showPicker && (
        <motion.div
          key="picker"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          // Base: lavender #F0EEFF → blush #FCE8F8 — soft gradient wash, not white
          style={{
            background:
              "linear-gradient(135deg, #f0eeff 0%, #fce8f8 55%, #eef4ff 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {/* ── Watercolor blobs (exact spec colors + positions) ── */}

          {/* Lavender rgba(196,181,253,0.4) — top-left */}
          <WatercolorBlob
            color="rgba(196,181,253,0.4)"
            size={520}
            style={{ top: "-10%", left: "-8%" }}
            drift={{ x: [0, 18, -10, 0], y: [0, 12, -8, 0] }}
            duration={22}
          />

          {/* Blush rgba(251,207,232,0.35) — top-right */}
          <WatercolorBlob
            color="rgba(251,207,232,0.35)"
            size={460}
            style={{ top: "-5%", right: "-10%" }}
            drift={{ x: [0, -14, 10, 0], y: [0, 16, -6, 0] }}
            duration={18}
          />

          {/* Periwinkle rgba(165,180,252,0.3) — center */}
          <WatercolorBlob
            color="rgba(165,180,252,0.3)"
            size={480}
            style={{ top: "30%", left: "50%", transform: "translateX(-50%)" }}
            drift={{ x: [0, 10, -12, 0], y: [0, -10, 14, 0] }}
            duration={25}
          />

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-5 text-center">

            {/* Lotus — draws itself on load, then floats */}
            <IHWNLotus size={64} animated />

            {/* Question — 26px weight 200 */}
            <motion.h1
              style={{
                fontSize: 26,
                fontWeight: 200,
                color: "#1a1625",
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            >
              how are you arriving today?
            </motion.h1>

            {/* Emotion pills */}
            <motion.div
              className="flex flex-wrap items-center justify-center"
              style={{ gap: 20 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.65 } }}
              role="group"
              aria-label="Choose your mood"
            >
              {EMOTIONS.map((e) => (
                <motion.button
                  key={e.id}
                  onClick={() => handleSelect(e.id)}
                  className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  style={{
                    // Transparent bg, 1.5px solid in emotion color, 10px radius
                    padding: "8px 16px",
                    border: `1.5px solid ${e.color}`,
                    borderRadius: 10,
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
                    backgroundColor: `${e.color}26`, // 15% opacity fill on hover
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

            {/* Subtitle — 9px uppercase #BBBBBB letter-spacing 0.1em */}
            <motion.p
              style={{
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#bbbbbb",
                fontWeight: 400,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8 } }}
            >
              your choice colors the experience
            </motion.p>

            {/* Skip — 10px uppercase #BBBBBB */}
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
              animate={{ opacity: 1, transition: { delay: 0.95 } }}
              whileHover={{ opacity: 0.7 }}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
              aria-label="Skip emotion selection"
            >
              SKIP →
            </motion.button>
          </div>
        </motion.div>
      )}

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
