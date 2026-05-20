"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRACKS = [
  { artist: "Sade", track: "No Ordinary Love", color: "#C4A882" },
  { artist: "Rüfüs Du Sol", track: "New York", color: "#4A6B8A" },
  { artist: "Noah Kahan", track: "Call Your Mom", color: "#8B7355" },
  { artist: "Olivia Dean", track: "Baby Steps", color: "#D4A5A5" },
  { artist: "Frank Sinatra", track: "New York, New York", color: "#2C4A6E" },
  { artist: "Michael Jackson", track: "Human Nature", color: "#6B8E6B" },
] as const;

export default function VinylPlayer() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TRACKS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const track = TRACKS[index];

  return (
    <div className="flex flex-col items-center" style={{ gap: 20 }}>
      {/* Spinning label */}
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 12, fontWeight: 300, color: "#BBBBBB", letterSpacing: "0.02em" }}>
          currently spinning
        </span>
        <span
          className="rounded-full"
          style={{
            width: 6,
            height: 6,
            background: "var(--gradient-ihwn)",
            display: "inline-block",
            animation: "pulse-dot 2s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Record + tonearm */}
      <div className="relative" style={{ width: 200, height: 200 }}>
        {/* Vinyl disc — spins */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, #2a2a2a 0%, #1a1a1a 60%, #111111 100%)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            animation: "spin-vinyl 8s linear infinite",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Groove rings */}
          {[160, 130, 100].map((d) => (
            <div
              key={d}
              style={{
                position: "absolute",
                width: d,
                height: d,
                borderRadius: "50%",
                border: "0.5px solid rgba(255,255,255,0.04)",
              }}
            />
          ))}

          {/* Album art circle */}
          <AnimatePresence mode="wait">
            <motion.div
              key={track.color}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: track.color,
                zIndex: 2,
                boxShadow: "0 0 0 3px rgba(255,255,255,0.08)",
              }}
            />
          </AnimatePresence>

          {/* Center spindle dot */}
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#444",
              zIndex: 3,
            }}
          />
        </div>

        {/* Tonearm SVG — static, overlaid */}
        <svg
          style={{ position: "absolute", top: -12, right: -24, width: 80, height: 120 }}
          viewBox="0 0 80 120"
          fill="none"
          aria-hidden="true"
        >
          {/* Pivot circle */}
          <circle cx="64" cy="12" r="5" fill="#CCCCCC" />
          {/* Arm */}
          <line
            x1="64" y1="12"
            x2="28" y2="90"
            stroke="#BBBBBB"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Head */}
          <rect x="22" y="88" width="10" height="5" rx="1" fill="#BBBBBB" />
        </svg>
      </div>

      {/* Track info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={track.artist + track.track}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-center"
          style={{ gap: 4 }}
        >
          <p style={{ fontSize: 14, fontWeight: 400, color: "var(--foreground)" }}>
            {track.artist}
          </p>
          <p style={{ fontSize: 12, fontWeight: 300, color: "#888888", marginTop: 3 }}>
            {track.track}
          </p>
        </motion.div>
      </AnimatePresence>

      <style>{`
        @keyframes spin-vinyl {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
