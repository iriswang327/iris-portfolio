"use client";

import dynamic from "next/dynamic";

// ssr: false — emotion picker is client-only.
// Prevents hydration mismatch from localStorage/Framer Motion initial states.
const EmotionPicker = dynamic(() => import("@/components/EmotionPicker"), {
  ssr: false,
});

export default function DreamsPage() {
  return (
    <>
      {/* Emotion picker is the first thing users see at '/'.
          Renders client-side only — no SSR flash or hydration mismatch. */}
      <EmotionPicker />

      {/* Homepage content — rendered beneath the picker overlay */}
      <div className="pt-14">
        {/* Dreams page content coming next */}
      </div>
    </>
  );
}
