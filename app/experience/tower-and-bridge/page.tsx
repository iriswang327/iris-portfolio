import type { Metadata } from "next";
import ExperienceCaseStudyTemplate from "@/components/ExperienceCaseStudyTemplate";

export const metadata: Metadata = {
  title: "Tower & Bridge — Museum of Iris",
  description:
    "Analytics strategy case study — student-run consultancy serving Austin-area businesses.",
};

const SOLUTION_TILES = [
  {
    image: "/images/tower-bridge-audience.png",
    imageAlt: "Audience Segmentation Framework",
    title: "Audience Segmentation Framework",
    description:
      "Primary + secondary persona maps built from behavioral data + interviews.",
    placeholderLabel: "/images/tower-bridge-audience.png",
    placeholderGradient: "linear-gradient(135deg, #f5e9c8, #e8d4a3)",
  },
  {
    image: "/images/tower-bridge-positioning.png",
    imageAlt: "Competitive Positioning Matrix",
    title: "Competitive Positioning Matrix",
    description: "Where the client sits today vs. where the white space is.",
    placeholderLabel: "/images/tower-bridge-positioning.png",
    placeholderGradient: "linear-gradient(135deg, #e8e2d0, #c9b88a)",
  },
  {
    image: "/images/tower-bridge-dashboard.png",
    imageAlt: "Analytics Dashboard",
    title: "Analytics Dashboard",
    description:
      "Cleaned-up event tracking — what the numbers mean, not just what they are.",
    placeholderLabel: "/images/tower-bridge-dashboard.png",
    placeholderGradient: "linear-gradient(135deg, #e6dcc4, #d4bd83)",
  },
  {
    image: "/images/tower-bridge-deck.png",
    imageAlt: "Executive Recommendation Deck",
    title: "Executive Recommendation Deck",
    description:
      "Closing call: where the client should focus, why, and how to measure if it's working.",
    placeholderLabel: "/images/tower-bridge-deck.png",
    placeholderGradient: "linear-gradient(135deg, #efe3c2, #d8c08b)",
  },
] as const;

export default function TowerAndBridgeCaseStudyPage() {
  return (
    <ExperienceCaseStudyTemplate
      accent="#c9a96e"
      accent2="#e0c79a"
      accentTint="rgba(224,199,154,0.18)"
      atmosphere="radial-gradient(50% 50% at 12% 10%, rgba(224,199,154,0.18) 0%, transparent 60%), radial-gradient(40% 40% at 85% 92%, rgba(201,169,110,0.10) 0%, transparent 60%)"
      avatar="T"
      title="Tower & Bridge"
      subline="Analytics Strategy · Student Agency"
      metadata={[
        { label: "Timeline", value: "2024 – Present" },
        { label: "Role", value: "Strategy Analyst" },
        { label: "Type", value: "Client Work" },
        { label: "With", value: "Account Team" },
      ]}
      toc={[
        { id: "context", label: "Context" },
        { id: "problem", label: "Problem" },
        { id: "process", label: "Process" },
        { id: "solution", label: "Solution" },
        { id: "impact", label: "Impact" },
        { id: "reflection", label: "Reflection" },
      ]}
      context={{
        heading:
          "A student-run analytics & strategy consultancy serving Austin-area businesses.",
        body: "Tower & Bridge is UT Austin's student-run analytics and strategy consultancy. Real clients, real deliverables, real pressure. I joined as a strategist working on brand positioning, audience research, and analytics reporting for Austin-area businesses.",
        constraints: [
          "Client timelines don't flex for exam week.",
          "Deliverables must be executive-ready, not student-project-ready.",
          "Working across teams with different methodologies and tools.",
          "Balancing depth of analysis with speed of delivery.",
        ],
      }}
      problem={{
        quote:
          "Most small businesses have data but no insight. They can tell you how many people visited their site. They can't tell you why those people left, what they almost bought, or who their real audience actually is.",
      }}
      process={{
        heading: "Five phases from kickoff to recommendation.",
        rows: [
          {
            num: "01",
            phase: "Client Kickoff",
            desc: "Discovery sessions to map business goals, existing data infrastructure, and key decision-makers. Identified the real question behind the stated question.",
          },
          {
            num: "02",
            phase: "Data Audit",
            desc: "Assessed what analytics existed, what was being tracked, what was being ignored, and what was being misread.",
          },
          {
            num: "03",
            phase: "Research",
            desc: "Primary interviews with target customers + secondary competitive-landscape research. Always looking for the gap between perception and reality.",
          },
          {
            num: "04",
            phase: "Synthesis",
            desc: "Translating raw data into strategic insight. The hardest part — making numbers tell a story an executive will act on.",
          },
          {
            num: "05",
            phase: "Presentation",
            desc: "Executive decks designed for clarity under pressure. Every slide earns its place — no filler, no qualifications, just the finding and the recommendation.",
          },
        ],
      }}
      solution={{
        heading: "Insight that turns into action — not reports that sit in inboxes.",
        body: "Strategy at Tower & Bridge is applied, not academic. Every deliverable is built around a decision the client needs to make. My work centered on converting raw analytics and market data into clear positioning recommendations and audience maps — with enough specificity that the client could act on them the next day.",
        tiles: [...SOLUTION_TILES],
      }}
      impact={{
        heading: "Ongoing engagement — real client outcomes, not classroom exercises.",
        callout:
          "Multiple client relationships · executive-ready deliverables · 2024–Present",
        stats: [
          { num: "3+", label: "Client Engagements" },
          { num: "Real", label: "Client Outcomes" },
          { num: "4", label: "Deliverable Types" },
          { num: "2024", label: "Started" },
        ],
      }}
      reflection={{
        heading: "What I'd tell next-semester me.",
        cards: [
          {
            eyebrow: "What Worked",
            title: "Leading with curiosity.",
            body: "Coming in with genuine curiosity — not just asking what the client wanted, but what problem they were actually trying to solve. That distinction changed the quality of every deliverable I produced.",
          },
          {
            eyebrow: "What I'd Change",
            title: "Pushing back earlier.",
            body: "No pushback on the \"so what\" earlier in each project. I got better at it over time but early on I was producing excellent analysis with a weak recommendation. The analysis is only valuable if it tells someone what to do next.",
          },
          {
            eyebrow: "What I Learned",
            title: "Strategy is messier than case studies suggest.",
            body: "Real-world strategy is messier and more political than any case study suggests. The right answer and the implementable answer are often different. My job is to close that gap — not pick one and ignore the other.",
          },
        ],
      }}
      footerBreadcrumb="Experience · Tower & Bridge · Client Strategy"
    />
  );
}
