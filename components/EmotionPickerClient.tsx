"use client";

import dynamic from "next/dynamic";

// ssr:false must live in a Client Component (Next.js 15 rule).
// This thin wrapper lets page.tsx stay a Server Component.
const EmotionPicker = dynamic(
  () => import("@/components/EmotionPicker"),
  { ssr: false }
);

export default function EmotionPickerClient() {
  return <EmotionPicker />;
}
