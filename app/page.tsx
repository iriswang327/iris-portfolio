import EmotionPickerClient from "@/components/EmotionPickerClient";

export default function DreamsPage() {
  return (
    <>
      {/* Emotion picker — client-only via wrapper, first thing at '/' */}
      <EmotionPickerClient />

      <div className="pt-14">
        {/* Dreams page content — coming next */}
      </div>
    </>
  );
}
