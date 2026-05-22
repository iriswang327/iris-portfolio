import type { Metadata } from "next";
import ExperienceCaseStudyTemplate from "@/components/ExperienceCaseStudyTemplate";

export const metadata: Metadata = {
  title: "Tower & Bridge — Museum of Iris",
  description:
    "Brand strategy and analytics case study — student-run consultancy serving Austin-area nonprofits and small businesses.",
};

const IMAGE_BASE = "/images/tower-bridge";

export default function TowerAndBridgeCaseStudyPage() {
  return (
    <ExperienceCaseStudyTemplate
      breadcrumb={[
        { label: "Experience", href: "/experience" },
        { label: "Tower & Bridge", href: "/experience" },
        { label: "Client Strategy" },
      ]}
      eyebrowTags={[
        "2024 – Present",
        "Strategy Analyst",
        "Brand & Analytics",
        "Agency-Style Client Work",
      ]}
      title="Tower & Bridge"
      subtitle="Real clients, real deliverables, real pressure — turning brand strategy and analytics into measurable nonprofit and small-business growth at UT Austin's student-run consultancy."
      metadata={[
        { label: "Timeline", value: "2024 – Present" },
        { label: "Role", value: "Strategy Analyst" },
        { label: "Focus", value: "Brand Strategy & Analytics" },
        { label: "Method", value: "Agency-Style Client Work" },
      ]}
      overview={{
        body: "Tower & Bridge is UT Austin's student-run strategy consultancy. We run real engagements for Austin-area nonprofits and small businesses — full-funnel brand strategy, analytics audits, social campaigns, and executive-ready deliverables. My work has centered on turning fragmented client data and content into cohesive strategy that drives measurable outcomes.",
        bullets: [
          "Lead strategist on two multi-month client engagements: Trinity Child Development Center (nonprofit preschool) and Heartening (small-business retail).",
          "Built media-relations strategy and analytics reporting that drove +333% engagement and $1,500+ in direct revenue.",
          "Operated under real client timelines — executive-ready, not student-project-ready.",
        ],
      }}
      challenge={{
        heading: "Most small organizations have data but no insight.",
        body: "Trinity and Heartening came to us with the same underlying friction: lots of social posts, lots of vague analytics, no clear story about what was working and why. They needed a strategist who could read the numbers, find the signal, and translate it into a plan their team could execute next week — not next quarter.",
        frameCards: [
          {
            label: "The Friction",
            title: "Data without direction.",
            body: "Posts going up without a content strategy. Analytics dashboards no one read. Brand voice that drifted across channels. The information existed — the synthesis didn't.",
          },
          {
            label: "The Strategic Goal",
            title: "Insight that turns into action.",
            body: "Convert raw analytics + audience research into clear, executive-ready recommendations the client could actually implement — with enough specificity to move next week, not next quarter.",
          },
        ],
      }}
      pullQuote="Strategy at Tower & Bridge is applied, not academic. Every deliverable is built around a decision the client needs to make."
      clients={[
        {
          sectionLabel: "Client 01 · Trinity Child Development Center",
          title: "Trinity Child Development Center",
          subtitle:
            "A nonprofit preschool serving an underserved community — needed brand presence + nonprofit-revenue strategy.",
          body: "Built a communications campaign promoting Trinity CDC's mission of accessible, high-quality early childcare. Established a cohesive brand image across Instagram and Facebook, executed media relations with local businesses, and ran weekly analytics reporting to measure what was working.",
          images: [
            {
              src: `${IMAGE_BASE}/trinity-analytics-report.png`,
              alt: "Weekly analytics report — engagement breakdown, top posts, follower growth",
              placeholderLabel: `${IMAGE_BASE}/trinity-analytics-report.png`,
              caption: "Analytics Report · Week 1 example",
            },
            {
              src: `${IMAGE_BASE}/trinity-final-case-study.png`,
              alt: "Final case study deck cover — task, tactics, results",
              placeholderLabel: `${IMAGE_BASE}/trinity-final-case-study.png`,
              caption: "Final Case Study Deck",
              tall: true,
            },
          ],
          metrics: [
            {
              label: "Instagram Engagement",
              num: "+333%",
              sub: "Increase over baseline",
            },
            {
              label: "Follower Growth",
              num: "+275%",
              sub: "Across Instagram & Facebook",
            },
            {
              label: "Direct Revenue",
              num: "$1.5K+",
              sub: "From secured nonprofit partnership",
            },
          ],
        },
        {
          sectionLabel: "Client 02 · Heartening",
          title: "Heartening",
          subtitle:
            "Small-business retail brand — needed cohesive social strategy and benchmark analytics reporting.",
          body: "Built a benchmark analytics framework comparing weekly performance against historical baselines. Identified that video content drove higher engagement and that posting cadence on TikTok needed to increase. Translated those findings into a concrete content calendar the team could execute.",
          images: [
            {
              src: `${IMAGE_BASE}/heartening-deck-cover.png`,
              alt: "Heartening Spring 2026 Strategy Deck cover",
              placeholderLabel: `${IMAGE_BASE}/heartening-deck-cover.png`,
              caption: "Strategy Deck Cover",
            },
            {
              src: `${IMAGE_BASE}/heartening-analytics-report.png`,
              alt: "Analytics report — Instagram, TikTok performance + insights",
              placeholderLabel: `${IMAGE_BASE}/heartening-analytics-report.png`,
              caption: "Benchmark Analytics Report",
            },
          ],
          bullets: [
            "Identified video content drove highest engagement (+44% lift over static).",
            "Recommended increased TikTok posting frequency based on engagement velocity data.",
            "Spring Break post significantly outperformed baseline — flagged seasonal pattern for forward planning.",
          ],
        },
      ]}
      process={{
        heading: "Five phases from kickoff to recommendation.",
        steps: [
          {
            num: "01 / Client Kickoff",
            heading: "Mapping the question behind the question.",
            body: "Discovery sessions with the client to map business goals, existing infrastructure, and decision-makers. Most kickoffs surface a stated problem and a real problem — the work starts with identifying the gap.",
            image: {
              src: `${IMAGE_BASE}/process-kickoff.png`,
              alt: "Team kickoff photo or whiteboard discovery session",
              placeholderLabel: `${IMAGE_BASE}/process-kickoff.png`,
            },
          },
          {
            num: "02 / Data Audit",
            heading: "Reading the analytics already in the room.",
            body: "Assessed what was being tracked, what was being ignored, and what was being misread. Most clients have more data than they realize — the audit surfaces what's signal vs. what's noise.",
            image: {
              src: `${IMAGE_BASE}/process-audit.png`,
              alt: "Analytics dashboard screenshot or audit table",
              placeholderLabel: `${IMAGE_BASE}/process-audit.png`,
            },
          },
          {
            num: "03 / Research",
            heading: "Bridging perception and reality.",
            body: "Primary interviews with target audience members combined with secondary competitive-landscape research. Always looking for the gap between how the client sees themselves and how their audience actually does.",
            image: {
              src: `${IMAGE_BASE}/process-research.png`,
              alt: "Research synthesis board or affinity map",
              placeholderLabel: `${IMAGE_BASE}/process-research.png`,
            },
          },
          {
            num: "04 / Synthesis",
            heading: "Turning numbers into a story.",
            body: "The hardest part. Translating raw data into a strategic insight that an executive will actually act on — not just nod at. Every recommendation has to pass the \"so what?\" test before it makes the deck.",
            image: {
              src: `${IMAGE_BASE}/process-synthesis.png`,
              alt: "Strategy framework or insight one-pager",
              placeholderLabel: `${IMAGE_BASE}/process-synthesis.png`,
            },
          },
          {
            num: "05 / Presentation",
            heading: "Decks designed for clarity under pressure.",
            body: "Executive decks where every slide earns its place. No filler, no qualifications, no \"this is just a student project.\" The finding and the recommendation — that's it.",
            image: {
              src: `${IMAGE_BASE}/process-presentation.png`,
              alt: "Final client presentation slide or team photo presenting",
              placeholderLabel: `${IMAGE_BASE}/process-presentation.png`,
            },
          },
        ],
      }}
      reflection={{
        heading: "What I'd tell next-semester me.",
        cards: [
          {
            label: "Strategy",
            title: "Curiosity beats expertise.",
            body: "Coming in with genuine curiosity — not asking what the client wanted, but what problem they were actually trying to solve — changed the quality of every deliverable I produced.",
          },
          {
            label: "Craft",
            title: "Push back on the \"so what\" earlier.",
            body: "Early on I was producing strong analysis with a weak recommendation. The analysis is only valuable if it tells someone exactly what to do next.",
          },
          {
            label: "Learning",
            title: "Strategy is messier than case studies suggest.",
            body: "Real-world strategy is more political than any case study suggests. The right answer and the implementable answer are often different — my job is to close that gap, not pick one.",
          },
        ],
      }}
    />
  );
}
