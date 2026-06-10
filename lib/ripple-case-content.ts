/** Ripple case study — Confido-style IA */

export const RIPPLE_NAV_SECTIONS = [
  { id: "context", title: "Context" },
  { id: "problem", title: "Problem" },
  { id: "process", title: "Process" },
  { id: "design", title: "Design" },
  { id: "outcome", title: "Outcome" },
  { id: "reflection", title: "Reflection" },
] as const;

export const RIPPLE_HERO_TITLE_LINES = [
  "Ripple",
  "UX Research",
  "Participant Matching",
] as const;

/** @deprecated use RIPPLE_HERO_TITLE_LINES */
export const RIPPLE_HERO_TITLE = RIPPLE_HERO_TITLE_LINES.join(" · ");

export const RIPPLE_HERO_LEDE =
  "Bridging the gap between UX designers and high-intent research participants — a two-sided marketplace concept pitched at Demo Day.";

export const RIPPLE_HERO_TAGS = [
  "UX Research",
  "Two-sided Marketplace",
  "Build Team",
] as const;

export const RIPPLE_IMPACT_STATS = [
  { value: "1 / 18", label: "Best Presentation at Demo Day" },
  { value: "4", label: "Phases from discovery to pitch" },
  { value: "5", label: "Hi-fi flows in the prototype" },
] as const;

export const RIPPLE_CONTEXT_PUNCH =
  "Research recruitment was taking weeks — or <em>not happening at all</em>.";

export const RIPPLE_CONTEXT_BODY =
  "Ripple is a two-sided recruitment concept we designed over one Texas Convergent Build Team semester — discovery, flows, hi-fi UI, and a Demo Day pitch — aimed at connecting designers to domain-relevant users without the cold-outreach grind.";

export const RIPPLE_PROBLEM_PUNCH =
  "The most expensive research is the study that <em>never gets run</em>.";

export const RIPPLE_PROBLEM_QUOTE =
  "Research that never happens is the most expensive kind. This concept is built to close the gap between the question and the person who can answer it.";

export const RIPPLE_PROBLEM_CARDS = [
  {
    num: "01",
    claim: "Recruitment overhead keeps research from happening.",
    body: "Designers either skip user research due to recruitment overhead, or rely on low-quality convenience samples.",
  },
  {
    num: "02",
    claim: "Cold outreach doesn't surface the right participant.",
    body: "Nothing lightweight existed for matching high-intent participants to study needs — we designed toward recruitment in hours, not weeks.",
  },
] as const;

export const RIPPLE_PROCESS_PUNCH =
  "One semester from <em>first interviews</em> to Demo Day pitch.";

export const RIPPLE_DESIGN_PUNCH =
  "Three surfaces — <em>recruit, match, collab</em> — in one marketplace loop.";

export const RIPPLE_SOLUTIONS = [
  {
    num: "01",
    kicker: "Recruit",
    title: "Study cards designers can post in minutes.",
    payoff: "Posting flow designed toward enrollment in <strong>under three taps</strong>.",
  },
  {
    num: "02",
    kicker: "Match",
    title: "Participants self-select by relevant experience.",
    payoff: "Dual-track flows for designer and participant sides — <strong>five hi-fi screens</strong> total.",
  },
  {
    num: "03",
    kicker: "Collab",
    title: "Directory and matching in one product surface.",
    payoff: "Full marketplace loop from onboarding through match confirmation.",
  },
] as const;

export const RIPPLE_OUTCOME_PUNCH =
  "Best Presentation — <em>1 of 18</em> Build Teams at Demo Day.";

export const RIPPLE_REFLECTION_PUNCH =
  "Two-sided thinking changed how I <em>frame every product problem</em>.";
