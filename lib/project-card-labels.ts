/** Company · role/project labels for project cards */

export function formatProjectCardLabel(company: string, projectLabel: string): string {
  return `${company} · ${projectLabel}`;
}

export const RIPPLE_CARD_LABELS = {
  company: "Texas Convergent",
  projectLabel: "Ripple",
} as const;

export const GEMINI_CARD_LABELS = {
  company: "Gemini",
  projectLabel: "Speculative Product Design Case Study",
} as const;

export const TOWER_BRIDGE_CARD_LABELS = {
  company: "Tower & Bridge",
  projectLabel: "Analytics Strategy Manager",
} as const;

export const INTEGRATED_DESIGN_CARD_LABELS = {
  company: "UT Austin Integrated Design Thinking",
  projectLabel: "UX Research Project",
} as const;

export const RISK_RADAR_CARD_LABELS = {
  company: "UT Austin McCombs",
  projectLabel: "Risk Radar",
} as const;
