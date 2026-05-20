"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { useEmotion, EMOTIONS, type Emotion } from "@/context/EmotionContext";
import IHWNLotus from "@/components/IHWNLotus";
import { useRef } from "react";

interface BlobConfig {
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  angle: number;
}

function WatercolorBlob({ config }: { config: BlobConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: config.x, y: config.y, angle: config.angle });

  useAnimationFrame(() => {
    posRef.current.angle += config.speed;
    const dx = Math.cos(posRef.current.angle) * 0.3;
    const dy = Math.sin(posRef.current.angle * 0.7) * 0.2;
    posRef.current.x += dx;
    posRef.current.y += dy;

    if (ref.current) {
      ref.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }
  });

  return (
    <div
      ref={ref}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: config.size,
        height: config.size,
        background: config.color,
        filter: "blur(80px)",
        opacity: 0.6,
        left: "50%",
        top: "50%",
        marginLeft: -config.size / 2,
        marginTop: -config.size / 2,
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}

const BLOBS: BlobConfig[] = [
  {
    x: -200,
    y: -150,
    color: "#f0eeff",
    size: 500,
    speed: 0.0008,
    angle: 0,
  },
  {
    x: 180,
    y: -80,
    color: "#fce8f8",
    size: 400,
    speed: 0.0012,
    angle: 2,
  },
  {
    x: -60,
    y: 120,
    color: "#eef4ff",
    size: 450,
    speed: 0.001,
    angle: 4,
  },
];

interface LoadingScreenProps {
  emotion: NonNullable<Emotion>;
  message: string;
  color: string;
  isDark: boolean;
  onDone: () => void;
}

function LoadingScreen({ emotion, message, color, isDark, onDone }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      style={{ background: color }}
    >
      <motion.p
        className="text-[15px] font-light text-center"
        style={{ color: isDark ? "#f5f0e8" : "#1a1625" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
      >
        {message}
      </motion.p>

      {/* Pulsing dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block rounded-full"
            style={{
              width: 5,
              height: 5,
              background: isDark ? "rgba(245,240,232,0.5)" : "rgba(26,22,37,0.3)",
            }}
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
    if (selectedEmotion) {
      setEmotion(selectedEmotion);
    }
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
          style={{ background: "#faf6ff" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {/* Drifting watercolor blobs */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {BLOBS.map((blob, i) => (
              <WatercolorBlob key={i} config={blob} />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-5 text-center">
            {/* Animated lotus */}
            <IHWNLotus size={64} animated />

            {/* Question */}
            <motion.h1
              className="text-[26px] font-extralight tracking-tight"
              style={{
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
                  className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-[10px]"
                  style={{
                    padding: "8px 16px",
                    border: `1.5px solid ${e.color}`,
                    borderRadius: 10,
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                    color: "#1a1625",
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: `${e.color}26`,
                    transition: { duration: 0.15 },
                  }}
                  aria-label={`I'm feeling ${e.label}`}
                >
                  {/* Color swatch */}
                  <span
                    className="block flex-shrink-0"
                    style={{
                      width: 8,
                      height: 8,
                      background: e.color,
                      borderRadius: 2,
                    }}
                    aria-hidden="true"
                  />
                  {e.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-[9px] uppercase tracking-[0.1em]"
              style={{ color: "#bbbbbb" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8 } }}
            >
              your choice colors the experience
            </motion.p>

            {/* Skip */}
            <motion.button
              onClick={handleSkip}
              className="text-[10px] uppercase tracking-[0.08em] transition-opacity duration-150 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
              style={{ color: "#bbbbbb" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.9 } }}
              aria-label="Skip emotion selection"
            >
              skip →
            </motion.button>
          </div>
        </motion.div>
      )}

      {phase === "loading" && selectedConfig && (
        <LoadingScreen
          key="loading"
          emotion={selectedConfig.id}
          message={selectedConfig.loadingMessage}
          color={selectedConfig.color}
          isDark={selectedConfig.isDark}
          onDone={handleLoadingDone}
        />
      )}
    </AnimatePresence>
  );
}
