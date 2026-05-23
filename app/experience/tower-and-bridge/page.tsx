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
      accent={{
        heroGradient:
          "linear-gradient(148deg, #F7F4EC 0%, #D4E2CC 42%, #E8DFD0 72%, #EDD5C4 100%)",
        bulletColor: "#7C9A6E",
        heroEyebrow: "Impact at a glance",
        heroMetrics: [
          {
            label: "Engagement",
            num: "+333%",
            sub: "Instagram lift · Trinity CDC",
          },
          {
            label: "Revenue",
            num: "$1.5K+",
            sub: "Secured nonprofit partnership",
          },
          {
            label: "Campaigns",
            num: "2",
            sub: "6-week client engagements",
          },
        ],
        heroImage: {
          src: `${IMAGE_BASE}/case-study-page.png`,
          alt: "Tower & Bridge final case study deliverable",
          placeholderLabel: `${IMAGE_BASE}/case-study-page.png`,
        },
      }}
      overview={{
        body: "Tower & Bridge is UT Austin's student-run advertising agency — real campaigns for Austin nonprofits and small businesses.",
        bullets: [
          "Lead analyst on two 6-week campaigns: Trinity Child Development Center and Heartening.",
          "Turned fragmented client data into weekly analytics, strategy decks, and executive-ready recommendations.",
          "Operated under real client timelines with board approval before every client presentation.",
        ],
      }}
      challenge={{
        heading: "Most small organizations have data but no insight to create strategic direction.",
        bullets: [
          "Trinity and Heartening both had social content going out without a cohesive strategy.",
          "Analytics existed, but no one was translating numbers into decisions.",
          "They needed a team who could find the signal and ship a plan within a week.",
        ],
        frameCards: [
          {
            label: "The Friction",
            title: "Data without direction.",
            bullets: [
              "Posts without a content strategy.",
              "Dashboards no one read.",
              "Brand voice drifting across channels.",
            ],
          },
          {
            label: "The Strategic Goal",
            title: "Insight that turns into action.",
            bullets: [
              "Convert analytics + audience research into clear recommendations.",
              "Give clients something they could implement immediately.",
              "Operate like a real agency — not a class project.",
            ],
          },
        ],
      }}
      pullQuote="Every deliverable is built around a decision the client needs to make."
      clients={[
        {
          sectionLabel: "Client 01",
          title: "Trinity Child Development Center",
          subtitle:
            "Nonprofit preschool serving an underserved community — needed brand presence + nonprofit-revenue strategy.",
          bullets: [
            "Built a communications campaign promoting accessible, high-quality early childcare.",
            "Established cohesive brand presence across Instagram and Facebook.",
            "Executed media relations with local businesses and ran weekly analytics reporting.",
          ],
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
          sectionLabel: "Client 02",
          title: "Heartening",
          subtitle:
            "Small-business retail brand — needed cohesive social strategy and benchmark analytics reporting.",
          bullets: [
            "Built a benchmark analytics framework against historical baselines.",
            "Identified video content as the highest-performing format on social.",
            "Translated findings into a concrete content calendar the team could execute.",
            "Flagged seasonal spikes (Spring Break) for forward planning.",
          ],
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
        },
      ]}
      process={{
        heading: "Five phases from kickoff to case study.",
        steps: [
          {
            num: "01 / Client Kickoff",
            heading: "Mapping the question behind the question.",
            bullets: [
              "Discovery sessions to map business goals and decision-makers.",
              "Surface the stated problem vs. the real problem.",
              "Align the team before any analytics work begins.",
            ],
            image: {
              src: `${IMAGE_BASE}/team-kickoff.png`,
              alt: "Team kickoff photo or whiteboard discovery session",
              placeholderLabel: `${IMAGE_BASE}/team-kickoff.png`,
            },
          },
          {
            num: "02 / Data Audit",
            heading: "Reading the analytics already in the room.",
            bullets: [
              "Assessed what was tracked, ignored, and misread.",
              "Separated signal from noise in existing dashboards.",
              "Identified gaps before building new reporting.",
            ],
            image: {
              src: `${IMAGE_BASE}/analytics-pitch-slide.png`,
              alt: "Analytics dashboard screenshot or audit table",
              placeholderLabel: `${IMAGE_BASE}/analytics-pitch-slide.png`,
            },
          },
          {
            num: "03 / Prototyping",
            heading: "Bridging perception and reality.",
            bullets: [
              "Built a full pitch deck: media, creative, PR, and analytics.",
              "Presented to executive board before the client saw anything.",
              "Pressure-tested strategy internally first.",
            ],
            image: {
              src: `${IMAGE_BASE}/pitch-deck-presentation.png`,
              alt: "Pitch deck presentation",
              placeholderLabel: `${IMAGE_BASE}/pitch-deck-presentation.png`,
            },
          },
          {
            num: "04 / Synthesis",
            heading: "Turning numbers into a story.",
            bullets: [
              "Translated raw data into insights executives would act on.",
              "Every recommendation had to pass the \"so what?\" test.",
              "Framed numbers as decisions — not just observations.",
            ],
            image: {
              src: `${IMAGE_BASE}/process-synthesis.png`,
              alt: "Strategy framework or insight one-pager",
              placeholderLabel: `${IMAGE_BASE}/process-synthesis.png`,
            },
          },
          {
            num: "05 / Case Study",
            heading: "One-pager designed for clarity and conciseness.",
            bullets: [
              "Executive summary where every statistic earned its place.",
              "No filler — just results of the work.",
              "Built to read like a real agency deliverable.",
            ],
            image: {
              src: `${IMAGE_BASE}/case-study-page.png`,
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
            bullets: [
              "Looking at numbers was easy — insights took training.",
              "Learned to ask what problem the client was actually trying to solve.",
              "Better questions led to stronger weekly deliverables.",
            ],
          },
          {
            label: "Professionalism",
            title: "Everyone is busy, time is valuable!",
            bullets: [
              "Clients were sometimes unresponsive or changed direction mid-campaign.",
              "Our team of four kept shipping despite communication gaps.",
              "Professionalism meant delivering our best work regardless.",
            ],
          },
          {
            label: "Learning",
            title: "Numbers can be interesting.",
            bullets: [
              "Weekly reporting felt repetitive at first.",
              "Staying curious about why metrics shifted made insights come faster.",
              "I learned to bring life to the statistics.",
            ],
          },
        ],
      }}
    />
  );
}
