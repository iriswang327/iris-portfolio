/** Apple concept explorations — homepage in-progress card */

export const APPLE_PILL = "Apple · Concepts in Progress";

export const APPLE_HOVER_LABEL = "Working on Mock Product Redesigns";

export const APPLE_TAP_HINT = "Tap to explore concepts";

export const APPLE_CONCEPTS = [
  {
    id: "maps",
    title: "Maps",
    notes: [
      "maps redesign",
      "competitive analysis w/ google maps",
      "what's missing vs google?",
      "concepting UI next",
    ],
  },
  {
    id: "watch",
    title: "Watch · Wellness",
    notes: [
      "wellness integration",
      "not just activity rings",
      "daily rhythm + recovery",
      "still framing the problem",
    ],
  },
  {
    id: "find-my",
    title: "Find My",
    notes: [
      "selective location sharing",
      "group sharing",
      "user research → iterate",
      "full design case study",
    ],
  },
  {
    id: "music",
    title: "Apple Music",
    notes: [
      "AI DJ integration",
      "playlist organization",
      "competitive analysis w/ spotify",
      "discovery flows",
    ],
  },
] as const;

export const APPLE_QUESTION_EMAIL = "iriswang32@gmail.com";

export const APPLE_QUESTION_COPY = {
  cardEyebrow: "Open to chat",
  cardTitle: "Questions?",
  cardLede: "Happy to talk through my design process & ideations!",
  cardAction: "Click here!",
  modalTitle: "Questions about these explorations?",
  modalLede:
    "These are in-progress concepts, not Apple work. Happy to talk through my design process & ideations, if interested!",
  placeholder: "What's on your mind?",
  successTitle: "Thanks — one sec.",
  successLede: "Your email app should open with your note ready to send.",
} as const;

/** Compact fan — stacked when fan first opens */
export const APPLE_FAN_LAYOUT_COMPACT = [
  { left: 0, lift: 1 },
  { left: 16, lift: 2 },
  { left: 32, lift: 3 },
  { left: 48, lift: 4 },
] as const;

export const APPLE_FAN_QUESTIONS_LAYOUT_COMPACT = { left: 72, lift: 5 } as const;

/** Flow fan — spreads when a card is focused so siblings stay visible on the sides */
export const APPLE_FAN_LAYOUT_FLOW = [
  { left: 0, lift: 1 },
  { left: 19.25, lift: 2 },
  { left: 38.5, lift: 3 },
  { left: 57.75, lift: 4 },
] as const;

export const APPLE_FAN_QUESTIONS_LAYOUT_FLOW = { left: 77, lift: 5 } as const;

/** @deprecated use COMPACT/FLOW */
export const APPLE_FAN_LAYOUT = APPLE_FAN_LAYOUT_COMPACT;

/** @deprecated use COMPACT/FLOW */
export const APPLE_FAN_QUESTIONS_LAYOUT = APPLE_FAN_QUESTIONS_LAYOUT_COMPACT;

export const APPLE_FAN_LAYOUT_MOBILE = [
  { left: 0, lift: 1 },
  { left: 12, lift: 2 },
  { left: 24, lift: 3 },
  { left: 36, lift: 4 },
] as const;

export const APPLE_FAN_QUESTIONS_LAYOUT_MOBILE = { left: 48, lift: 5 } as const;
