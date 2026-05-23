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
      title="Tower & Bridge"
      subtitle="Real clients, real deliverables, real pressure — turning brand strategy and analytics into measurable nonprofit and small-business growth at UT Austin's student-run agency."
      metadata={[
        { label: "Timeline", value: "2025 – Present" },
        { label: "Role", value: "Analytics Manager" },
        { label: "Focus", value: "Brand Strategy & Analytics" },
        { label: "Method", value: "Agency-Style Client Work" },
      ]}
      overview={{
        body: "Tower & Bridge is UT Austin's student-run advertising agency. We run real campaigns for Austin-area nonprofits and small businesses — full-funnel brand strategy, analytics audits, social campaigns, and executive-ready deliverables. My work has centered on turning fragmented client data and content into cohesive strategy that drives measurable outcomes.",
        bullets: [
          "Lead analyst on two 6-week campaigns: Trinity Child Development Center (nonprofit preschool) and Heartening (zero-waste thrift store).",
          "Built media-relations strategy and analytics reporting that drove +333% engagement and $1,500+ in direct revenue for Trinity CDC.",
          "Operated under real client timelines demonstrating real client work.",
        ],
      }}
      challenge={{
        heading: "Most small organizations have data but no insight to create strategic direction.",
        body: "Trinity and Heartening came to us with the same underlying friction: lots of social posts, lots of vague analytics, no clear story about what was working and why. They needed a team who could read the numbers, find the signal, and translate it into a plan their team could execute within a week.",
        frameCards: [
          {
            label: "The Friction",
            title: "Data without direction.",
            body: "Posts going up without a content strategy. Analytics dashboards no one read. Brand voice that drifted across channels. Information without insights.",
          },
          {
            label: "The Strategic Goal",
            title: "Insight that turns into action.",
            body: "Convert raw analytics + audience research into clear recommendations the client could actually implement, acting as a real agency.",
          },
        ],
      }}
      pullQuote="Every deliverable is built around a decision the client needs to make."
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
        heading: "Five phases from kickoff to case study.",
        steps: [
          {
            num: "01 / Client Kickoff",
            heading: "Mapping the question behind the question.",
            body: "Discovery sessions with the client to map business goals, existing infrastructure, and decision-makers. Most kickoffs surface a stated problem and a real problem — the work starts with identifying the gap.",
            image: {
              src: `${IMAGE_BASE}/process-kickoff.png`,
              alt: "Team kickoff photo or whiteboard discovery session",
              placeholderLabel: `${IMAGE_BASE}/team-kickoff.png`,
            },
          },
          {
            num: "02 / Data Audit",
            heading: "Reading the analytics already in the room.",
            body: "Assessed what was being tracked, what was being ignored, and what was being misread. Most clients have more data than they realize — the audit surfaces what's signal vs. what's noise.",
            image: {
              src: `${IMAGE_BASE}/process-audit.png`,
              alt: "Analytics dashboard screenshot or audit table",
              placeholderLabel: `${IMAGE_BASE}/analytics-pitch-slide.png`,
            },
          },
          {
            num: "03 / Prototyping",
            heading: "Bridging perception and reality.",
            body: "Created and presented a full-fledged pitch deck with media, creative, PR, and analytics strategies to executive board before presenting to the client.",
            image: {
              src: `${IMAGE_BASE}/process-research.png`,
              alt: "Pitch deck presentation",
              placeholderLabel: `${IMAGE_BASE}/pitch-deck-presentation.png`,
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
            num: "05 / Case Study",
            heading: "One-pager designed for clarity and conciseness.",
            body: "Executive page where every statistic earns its place. No fillers & no \"this is just a student project.\" Just the results of our work.",
            image: {
              src: `${IMAGE_BASE}/process-presentation.png`,
              alt: "Final client presentation slide",
              placeholderLabel: `${IMAGE_BASE}/case-study-page.png`,
            },
          },
        ],
      }}
      reflection={{
        heading: "What I Learned.",
        cards: [
          {
            label: "Strategy",
            title: "Take initiative and be proactive!",
            body: "As analytics manager, our work can be boring. Simply looking at numbers was easy, but coming up with insights took training. I learned to not simply ask what the client wanted, but also what problem they were actually trying to solve - giving me better deliverables each and every week.",
          },
          {
            label: "Professionalism",
            title: "Everyone is busy, time is valuable!",
            body: "There were times our clients were unresponsive, didn't provide feedback, and didn't like things that were previously approved. Our team of 4 students learned to continue with our work and provide our best deliverables, despite lack of communication.",
          },
          {
            label: "Learning",
            title: "Numbers can be interesting.",
            body: "At one point, it felt like I was looking at the same thing week-by-week. Although repetitive, I learned to be curious and ask why certain percentages were lower or higher. I brought life to the statistics and insights came easier.",
          },
        ],
      }}
    />
  );
}
