import { GEMINI_CARD_LABELS, RIPPLE_CARD_LABELS } from "@/lib/project-card-labels";

/** Shared card preview config — matches homepage project grid */
export const RIPPLE_CARD_PREVIEW = {
  ...RIPPLE_CARD_LABELS,
  gradient: "linear-gradient(148deg, #0A1628 0%, #0D2E52 55%, #1155A0 100%)",
  videoUrl: "/videos/ripple-thumbnail.mp4",
  frameClassName:
    "project-card-frame bg-gradient-to-tr from-purple-950/20 via-indigo-500/5 to-slate-50 border border-black/[0.03] shadow-[0_15px_40px_rgba(0,0,0,0.03)]",
  theme: "ripple" as const,
};

export const GEMINI_CARD_PREVIEW = {
  ...GEMINI_CARD_LABELS,
  gradient: "linear-gradient(148deg, #1E1030 0%, #0B0718 100%)",
  videoUrl: "/videos/gemini-thumbnail.mp4",
  frameClassName:
    "project-card-frame bg-gradient-to-tr from-sky-100/40 via-blue-50/20 to-slate-50/60 border border-blue-200/20 shadow-[0_15px_40px_rgba(0,0,0,0.02)]",
  theme: "gemini" as const,
};
