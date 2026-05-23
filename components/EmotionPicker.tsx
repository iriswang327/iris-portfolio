"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEmotion, EMOTIONS, type Emotion } from "@/context/EmotionContext";
import IHWNLotus from "@/components/IHWNLotus";

// ─── Constants ────────────────────────────────────────────────────────────────

const SESSION_KEY = "museum-of-iris-picker-shown";

// Sunrise gradient (bottom to top): warm coral → golden yellow → soft pink → dreamy lavender
// Radial overlay softens edges into the white canvas for an organic watercolor feel.
const SUNRISE_BG =
  "radial-gradient(ellipse 95% 80% at 50% 68%, transparent 48%, rgba(250,249,255,0.65) 100%), " +
  "linear-gradient(to top, #F4845F 0%, #F9C784 38%, #FCB4A5 66%, #D4C5F9 100%)";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function revealPage() {
  document.documentElement.removeAttribute("data-picker-active");
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch (_) {}
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
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
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 overflow-hidden"
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

// ─── Pill styles (filled soft pastel + pill shape) ────────────────────────────

function getPillStyle(color: string, isDark: boolean): React.CSSProperties {
  return {
    background: hexToRgba(color, isDark ? 0.85 : 0.78),
    border: `1px solid ${color}`,
    color: isDark ? "#ffffff" : "#1a1625",
    borderRadius: 999,
    padding: "9px 20px",
    fontSize: 13,
    fontWeight: 300,
    letterSpacing: "0.01em",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    fontFamily: "var(--font-geist-sans)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };
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
    revealPage();
  };

  const handleLoadingDone = () => {
    if (selectedEmotion) setEmotion(selectedEmotion);
    setPhase("done");
    setShowPicker(false);
    revealPage();
  };

  const selectedConfig = selectedEmotion
    ? EMOTIONS.find((e) => e.id === selectedEmotion)
    : null;

  return (
    <>
      {/* ─── Picker screen ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === "picker" && showPicker && (
          <motion.div
            key="picker"
            className="fixed inset-0 z-[100] overflow-hidden"
            style={{ background: "#ffffff" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          >
            {/* ── Step 2 (0.5s): Water droplet arcs from upper-left to bottom-center ──
                Small (8px), soft white/translucent, ease-in 0.8s.
                Positioned at landing point; x/y translate it back to upper-left,
                then arc forward via a curved midpoint. */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                bottom: "15%",
                left: "50%",
                marginLeft: -4,
                width: 8,
                height: 10,
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                background:
                  "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.95), rgba(255,255,255,0.45))",
                boxShadow:
                  "0 0 8px rgba(255,255,255,0.5), inset 0 1px 2px rgba(255,255,255,0.9)",
              }}
              animate={{
                // Arc: upper-left → curved midpoint → bottom-center landing
                x: ["-44vw", "-18vw", "0vw", "0vw"],
                y: ["-75vh", "-33vh", "0vh", "0vh"],
                opacity: [0, 0.9, 0.9, 0],
                scale: [0.5, 0.8, 1, 0.15],
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                times: [0, 0.37, 0.66, 1],
                ease: "easeIn",
              }}
              aria-hidden="true"
            />

            {/* ── Step 3 (1.0s): 3 ripple rings expand from landing point ──
                rgba(244,132,95,0.3), expand to 120px radius, staggered 180ms. */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ripple-${i}`}
                className="absolute pointer-events-none rounded-full"
                style={{
                  // Centered on the landing point (bottom: 15%, left: 50%)
                  bottom: "calc(15% - 120px)",
                  left: "calc(50% - 120px)",
                  width: 240,
                  height: 240,
                  border: "1.5px solid rgba(244,132,95,0.3)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1.04],
                  opacity: [0, 0.75, 0],
                }}
                transition={{
                  delay: 1.0 + i * 0.18,
                  duration: 0.62,
                  times: [0, 0.42, 1],
                  ease: "easeOut",
                }}
                aria-hidden="true"
              />
            ))}

            {/* ── Step 4 (1.2s): Warm sunrise fills upward from bottom ──
                clip-path polygon reveals from bottom edge to top over 2.0s.
                Radial gradient overlay keeps edges soft and organic.          */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: SUNRISE_BG }}
              initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
              animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
              transition={{
                delay: 1.2,
                duration: 2.0,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            />

            {/* ── Content layer ── */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5 px-5 text-center">

              {/* Step 5 (3.0s): IHWN lotus fades in above the question, floats gently */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.0, duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 3.6,
                  }}
                  style={{ display: "inline-flex" }}
                >
                  <IHWNLotus size={52} />
                </motion.div>
              </motion.div>

              {/* Step 5 (3.2s): "hi, how are you?" — 26px weight 200 */}
              <motion.h1
                style={{
                  fontSize: 26,
                  fontWeight: 200,
                  color: "#1A1625",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.5,
                  fontFamily: "var(--font-geist-sans)",
                  margin: 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2, duration: 0.5, ease: "easeOut" }}
              >
                hi, how are you?
              </motion.h1>

              {/* Step 6 (3.7s): Emotion pills — each slides up 12px + fades in, 50ms stagger */}
              <div
                className="flex flex-wrap items-center justify-center"
                style={{ gap: 10 }}
                role="group"
                aria-label="Choose your mood"
              >
                {EMOTIONS.map((e, i) => (
                  <motion.button
                    key={e.id}
                    onClick={() => handleSelect(e.id)}
                    style={getPillStyle(e.color, e.isDark)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 3.7 + i * 0.05,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.97 }}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    aria-label={`I'm feeling ${e.label}`}
                  >
                    {e.label}
                  </motion.button>
                ))}
              </div>

              {/* Step 7 (4.2s): caption + SKIP FOR NOW → */}
              <div className="flex flex-col items-center gap-0.5">
                <motion.p
                  style={{
                    fontSize: 11,
                    color: "rgba(26,22,37,0.5)",
                    letterSpacing: "0.03em",
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    margin: 0,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.2, duration: 0.5 }}
                >
                  your choice colors the experience
                </motion.p>

                <motion.button
                  onClick={handleSkip}
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#a0807a",
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
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.2, duration: 0.5 }}
                  whileHover={{ opacity: 0.55 }}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
                  aria-label="Skip emotion selection"
                >
                  SKIP FOR NOW →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Loading screen — z-[200] ─────────────────────────────────────── */}
      <AnimatePresence>
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
    </>
  );
}
