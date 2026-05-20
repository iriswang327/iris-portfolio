"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEmotion, EMOTIONS, type Emotion } from "@/context/EmotionContext";
import IHWNLotus from "@/components/IHWNLotus";

// ─── Design tokens ────────────────────────────────────────────────────────────

const SESSION_KEY = "museum-of-iris-picker-shown";

// Iris's sunset — radial horizon glow, inspired by 6am tennis sunrises and
// 7-10pm practice sunsets in Texas. Warm cream/gold at the center (the horizon),
// bleeding out through coral → rose → violet → deep indigo night at the edges.
// The center stays light so text is always readable.
const SUNSET =
  "radial-gradient(ellipse 110% 90% at 50% 56%, " +
  "#fff8e7 0%, " +
  "#fde68a 16%, " +
  "#fb923c 33%, " +
  "#e11d48 51%, " +
  "#7c3aed 69%, " +
  "#1e1b4b 85%, " +
  "#0f0a1e 100%)";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Reveal page + mark picker as shown for this session. */
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

// ─── Pill styles (Figma exact — filled soft pastel + pill shape) ──────────────

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
    // soft glass layer so pills read clearly against the warm sunset
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
    // revealPage() is called by handleLoadingDone after the 2.5s screen
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
    revealPage(); // CSS fade-in of page syncs with loading screen exit (0.6s)
  };

  const selectedConfig = selectedEmotion
    ? EMOTIONS.find((e) => e.id === selectedEmotion)
    : null;

  return (
    <>
      {/* ─── Picker screen — z-[100] ─────────────────────────────────────── */}
      <AnimatePresence>
        {phase === "picker" && showPicker && (
          <motion.div
            key="picker"
            className="fixed inset-0 z-[100] overflow-hidden"
            // White canvas — sunset floods in on top
            style={{ background: "#ffffff" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          >
            {/* ── Water drop ──
                A small teardrop materializes and falls to center (0–0.55s),
                hits the canvas, then shrinks away as the sunset floods in.    */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
                width: 13,
                height: 17,
                marginTop: -8,
                marginLeft: -6,
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                background:
                  "radial-gradient(circle at 38% 32%, #fb923c, #e11d48 55%, #7c3aed)",
                boxShadow: "0 3px 14px rgba(251,146,60,0.45)",
              }}
              // keyframe: falls → impact → shrinks away
              animate={{
                y: [-72, 0, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.25],
              }}
              transition={{
                duration: 0.82,
                times: [0, 0.58, 1],
                ease: "easeIn",
              }}
              aria-hidden="true"
            />

            {/* ── Impact ripple ──
                Brief ring expands from the impact point and fades.           */}
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                top: "50%",
                left: "50%",
                width: 10,
                height: 10,
                marginTop: -5,
                marginLeft: -5,
                border: "1.5px solid rgba(251,146,60,0.55)",
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 55, opacity: [0, 0.65, 0] }}
              transition={{ duration: 0.85, delay: 0.5, ease: "easeOut" }}
              aria-hidden="true"
            />

            {/* ── Sunset flood ──
                Radial gradient expands from the impact point like watercolor
                bleeding into paper — the horizon glow of a Texas sky.        */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: SUNSET }}
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              transition={{
                duration: 2.1,
                delay: 0.62,
                ease: [0.4, 0, 0.15, 1],
              }}
              aria-hidden="true"
            />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5 px-5 text-center">

              {/* IHWN lotus — draws itself after sunset settles */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 2.3, duration: 0.7, ease: "easeOut" },
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
                  transition: { delay: 2.75, duration: 0.6 },
                }}
              >
                hi, how are you?
              </motion.h1>

              {/* Emotion pills */}
              <motion.div
                className="flex flex-wrap items-center justify-center"
                style={{ gap: 10 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 3.1, duration: 0.6 },
                }}
                role="group"
                aria-label="Choose your mood"
              >
                {EMOTIONS.map((e) => (
                  <motion.button
                    key={e.id}
                    onClick={() => handleSelect(e.id)}
                    style={getPillStyle(e.color, e.isDark)}
                    whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
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
                animate={{
                  opacity: 1,
                  transition: { delay: 3.5, duration: 0.5 },
                }}
                whileHover={{ opacity: 0.55 }}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
                aria-label="Skip emotion selection"
              >
                SKIP FOR NOW →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Loading screen — z-[200], mounts instantly over picker ─────── */}
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
