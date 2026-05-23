import type { Metadata } from "next";
import RiskRadarCaseStudyTemplate from "@/components/RiskRadarCaseStudyTemplate";

export const metadata: Metadata = {
  title: "Risk Radar",
  description:
    "AI-powered crisis management platform — predictive brand reputation scoring, white-box architecture, and B2B SaaS product strategy. Spring 2026.",
};

const IMAGE_BASE = "/images/risk-radar";

export default function RiskRadarCaseStudyPage() {
  return (
    <RiskRadarCaseStudyTemplate
      title="Risk Radar"
      subtitle="Semester mock startup — AI crisis prediction for brands that react too slow."
      subtitleHtml='Semester <em>mock startup</em> — <strong>AI crisis prediction</strong> for brands that move too slow. McCombs × Moody pitch.'
      tagline="Predict · Prepare · Protect"
      metadata={[
        { label: "Timeline", value: "Spring 2026 · One Semester" },
        { label: "Role", value: "Head of AI" },
        { label: "Focus", value: "AI Architecture & Product Strategy" },
        { label: "Course", value: "Entrepreneurship in Advertising · UT Austin" },
      ]}
      accent={{
        heroGradient:
          "linear-gradient(148deg, #E8EEF5 0%, #C5D4E8 42%, #9BB0CC 100%)",
        bulletColor: "#1e3a5f",
        heroEyebrow: "Impact at a glance",
        heroMetrics: [
          { label: "Phases", num: "3", sub: "Ingest → predict → respond" },
          { label: "Score", num: "0–100", sub: "Risk probability" },
          { label: "Format", num: "Pitch", sub: "Class mock · not shipped" },
        ],
        heroImage: {
          alt: "Risk Radar product demo — ingest, predict, respond walkthrough",
          placeholderLabel: "/videos/demo.mp4",
          videoSrc: "/videos/demo.mp4",
        },
      }}
      overview={{
        heading: "PR still runs on yesterday's playbook.",
        bullets: [
          "<strong>Head of AI</strong> — architecture story, demo narrative, dashboard UX",
          "<em>Class project</em>, founder-team energy — we pitched it like a real startup",
          "Six-person team · McCombs business × Moody advertising",
        ],
        team: [
          { role: "CEO", name: "Brooke Mikell" },
          { role: "CTO", name: "Joesh Nayak" },
          { role: "Head of AI", name: "Iris Wang", isMe: true },
          { role: "CPO", name: "Nikhil Sehgal" },
          { role: "COO", name: "Hayden King" },
          { role: "CMO", name: "Varun Vedala" },
        ],
      }}
      problem={{
        heading: "Reputation moves in minutes. Responses still take hours.",
        bullets: [
          "Crises hit TikTok and X <strong>before</strong> PR can draft a line",
          "No predictive layer — teams react after the fire's already lit",
        ],
        cards: [
          {
            label: "Speed",
            title: "Algorithms outrun humans.",
            body: "Controversy spreads in <strong>minutes</strong> — not news cycles.",
          },
          {
            label: "Time",
            title: "Always behind.",
            body: "Every hour of delay <em>multiplies</em> recovery cost.",
          },
          {
            label: "Tools",
            title: "No forecast layer.",
            body: "Stacks monitor mentions — they don't <strong>score what's coming</strong>.",
          },
        ],
        pullQuote:
          'What if brands saw reputation threats <em>before</em> they went viral?',
      }}
      solution={{
        heading: "Monitor → score → respond. Before it breaks.",
        bullets: [
          "B2B SaaS concept — real-time ingest, <strong>0–100 risk score</strong>, brand-aligned responses",
          "Three phases, one pitch story",
        ],
        phases: [
          {
            step: "01 · Ingest",
            heading: "Scrape & filter.",
            body: "X, Reddit, TikTok, news APIs — NLP cuts <em>noise from signal</em>.",
          },
          {
            step: "02 · Predict",
            heading: "Score the threat.",
            body: "Match trends to crisis history → <strong>0–100 probability</strong>.",
          },
          {
            step: "03 · Respond",
            heading: "Draft in brand voice.",
            body: "Three response tiers, RAG-grounded — <em>ready to ship</em>.",
          },
        ],
      }}
      contributions={{
        sectionLabel: "My Work · Head of AI",
        heading: "Three deliverables. One legible story.",
        bullets: [
          "Turned AI strategy into something <strong>investors and professors</strong> could actually follow",
          "White-box by design — PR buyers don't trust black boxes",
        ],
        items: [
          {
            step: "01 · Product Demo",
            heading: "90-second ingest → predict → respond.",
            bullets: [
              "Owned the slide narrative — each phase = input, AI task, human output",
              "Demo became the pitch anchor; everything else pointed back to it",
            ],
            image: {
              src: `${IMAGE_BASE}/product-demo.png`,
              alt: "Product Demo slide — 3-phase walkthrough (Ingest, Analyze, Respond)",
              placeholderLabel: `${IMAGE_BASE}/product-demo.png`,
            },
          },
          {
            step: "02 · AI Architecture",
            heading: 'White-box, not black-box.',
            bullets: [
              "BERT embeddings + RAG on <strong>500+ historical crises</strong> + human-in-the-loop validation",
              "Showing <em>how</em> predictions get made was the trust unlock",
            ],
            image: {
              src: `${IMAGE_BASE}/ai-architecture.png`,
              alt: "AI architecture diagram — multimodal ingestion, RAG engine, validation loop",
              placeholderLabel: `${IMAGE_BASE}/ai-architecture.png`,
            },
          },
          {
            step: "03 · Dashboard",
            heading: "What the PR director sees at 9 AM.",
            bullets: [
              "Sorted risk feed — score, trajectory, sources, <strong>three response options</strong>",
              "Bridge between \"cool model\" and \"saves you four hours every morning\"",
            ],
            image: {
              src: `${IMAGE_BASE}/dashboard.png`,
              alt: "Risk Radar Dashboard mockup — risk feed, scores, response templates",
              placeholderLabel: `${IMAGE_BASE}/dashboard.png`,
            },
          },
        ],
      }}
      market={{
        heading: "Big market. Obvious pain.",
        metrics: [
          { label: "TAM", num: "$6.3B", sub: "Media monitoring · 2025" },
          { label: "SAM", num: "$6.7B", sub: "AI crisis tools · 19% CAGR" },
          { label: "SOM", num: "$1–2B", sub: "U.S. PR firms & mid brands" },
        ],
        bullets: [
          "<strong>28%</strong> of brand crises go global in under 60 minutes",
          "<strong>65%</strong> of PR firms want AI tools to pre-draft responses",
        ],
      }}
      reflection={{
        heading: "What a mock startup taught me.",
        cards: [
          {
            label: "Learned",
            title: "Explainability is the moat.",
            bullets: [
              "In B2B AI, <strong>trust</strong> beats the model",
              "White-box architecture was as much sales as engineering",
            ],
          },
          {
            label: "Surprised",
            title: "The pitch is the product.",
            bullets: [
              "One diagram did more than the stack underneath",
              "Making AI <em>legible</em> was the hard part",
            ],
          },
          {
            label: "Next",
            title: "Ship at a real startup.",
            bullets: [
              "Want fast B2B SaaS — technical-adjacent, customer-facing",
              "Building the thing, not just studying it",
            ],
          },
        ],
      }}
      cta={{
        label: "Open to Summer 2026 internships",
        heading: "Looking for a B2B SaaS team shipping AI workflows.",
        href: "mailto:iriswang32@gmail.com",
        linkText: "Get in touch →",
      }}
      backHref="/experience"
      backLabel="← Back to experience"
      footerCrumb="Experience · Risk Radar · AI Product Strategy"
    />
  );
}
