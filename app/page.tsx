import dynamic from "next/dynamic";

// Client-only: prevents SSR of EmotionPicker so Framer Motion's
// initial={opacity:0} never causes a hydration mismatch or blank flash.
const EmotionPicker = dynamic(
  () => import("@/components/EmotionPicker"),
  { ssr: false }
);

export default function DreamsPage() {
  return (
    <>
      {/* Emotion picker — rendered client-side only, first thing at '/' */}
      <EmotionPicker />

      {/* Homepage content mounts beneath the fixed-position picker overlay */}
      <div className="pt-14">
        {/* Dreams page content — coming next */}
      </div>
    </>
  );
}
