import type { Metadata } from "next";
import RiskRadarCaseStudyTemplate from "@/components/RiskRadarCaseStudyTemplate";

export const metadata: Metadata = {
  title: "Risk Radar — Museum of Iris",
  description:
    "AI-powered crisis management platform — predictive brand reputation scoring, white-box architecture, and B2B SaaS product strategy. Spring 2026.",
};

const IMAGE_BASE = "/images/risk-radar";

export default function RiskRadarCaseStudyPage() {
  return (
    <RiskRadarCaseStudyTemplate
      breadcrumb={[
        { label: "Experience", href: "/experience" },
        { label: "Risk Radar", href: "/experience" },
        { label: "AI Product Strategy" },
      ]}
      eyebrowTags={[
        "Spring 2026",
        "Head of AI",
        "B2B SaaS · AI Workflows",
        "Cross-Disciplinary Build",
      ]}
      title="Risk Radar"
      subtitle="An AI-powered crisis management platform that predicts brand-reputation threats before they go viral. Built over a semester with McCombs business and Moody advertising students."
      tagline="Predict · Prepare · Protect"
      metadata={[
        { label: "Timeline", value: "Spring 2026 · One Semester" },
        { label: "Role", value: "Head of AI" },
        { label: "Focus", value: "AI Architecture & Product Strategy" },
        { label: "Course", value: "Entrepreneurship in Advertising · UT Austin" },
      ]}
      overview={{
        heading:
          "Brands are reacting to crises hours too late. We built the AI that sees them coming.",
        body: "Risk Radar is a B2B SaaS platform that monitors social media, news, and online discourse in real time — flagging emerging reputation threats, scoring their likelihood of escalation, and generating brand-aligned response templates before the crisis breaks. As Head of AI, I led the model architecture, product demo, and the user-facing dashboard story for our pitch.",
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
        heading:
          "Brand reputation can transform in minutes — but PR still runs on yesterday's playbook.",
        body: "Traditional crisis monitoring is reactive. By the time a PR specialist drafts a response, a scandal has already gained algorithmic momentum on TikTok, Instagram, and X. There are three failure modes — speed, time, and tools — and they compound.",
        cards: [
          {
            label: "Speed",
            title: "Information moves faster than ever.",
            body: "Rumors and controversy spread through algorithmic engagement on TikTok, Instagram, and X within minutes — not days.",
          },
          {
            label: "Time",
            title: "Brands react after the fire's lit.",
            body: "Responses arrive after controversy has already risen. Every hour of delay multiplies the cost of recovery.",
          },
          {
            label: "Tools",
            title: "No predictive layer in the stack.",
            body: "Companies lack tools designed to foreshadow backlash or distinguish which problems deserve immediate attention vs. which will fade.",
          },
        ],
        pullQuote:
          "What if brands could uncover potential reputation threats <em>before</em> they become a major problem?",
      }}
      solution={{
        heading:
          "An AI-powered crisis management platform — real-time monitoring, predictive scoring, brand-aligned response.",
        body: "Risk Radar continuously ingests data from social platforms and news APIs, scores emerging conflicts against a 10-year historical crisis database, and surfaces a 0–100 Risk Probability before the crisis breaks. The product is structured around three phases.",
        phases: [
          {
            step: "01 / Ingest & Filter",
            heading: "Real-time data scraping.",
            body: "Continuous polling of X, Reddit, TikTok, and global news APIs. NLP-driven noise reduction isolates genuine human sentiment from bots and spam.",
          },
          {
            step: "02 / Analyze & Predict",
            heading: "Pattern matching + risk scoring.",
            body: "Current trends matched against a 10-year historical crisis database. A 0–100 Risk Probability score is calculated based on velocity, reach, and pattern similarity.",
          },
          {
            step: "03 / Respond",
            heading: "Brand-aligned response generation.",
            body: "3 tiers of pre-drafted, brand-voice-compliant response templates surface for immediate use — backed by RAG-grounded brand guidelines.",
          },
        ],
      }}
      contributions={{
        sectionLabel: "My Contributions · Head of AI",
        heading:
          "Three deliverables: the product demo, the AI architecture, and what the user sees.",
        body: "My role centered on turning the AI strategy into something explainable to a non-technical audience — investors, professors, and prospective B2B buyers. I owned the product demo narrative, the AI architecture diagram (positioned as \"white-box,\" not black-box), and the user-facing dashboard storytelling.",
        items: [
          {
            step: "01 / Product Demo",
            heading: "Mapping ingest → predict → respond into a 90-second story.",
            paragraphs: [
              "Owned the slide narrative that walks the audience through Risk Radar's three core phases. Designed each phase as a discrete capability with its own data input, AI task, and human-facing output — so investors could see exactly where the value compounds.",
              "The demo became the pitch's anchor. Everything else (market, pricing, GTM) referenced back to these three steps.",
            ],
            image: {
              src: `${IMAGE_BASE}/product-demo.png`,
              alt: "Product Demo slide — 3-phase walkthrough (Ingest, Analyze, Respond)",
              placeholderLabel: `${IMAGE_BASE}/product-demo.png`,
            },
          },
          {
            step: "02 / How the AI Works",
            heading: 'A "white-box" architecture — anti-black-box by design.',
            paragraphs: [
              "Built the AI architecture diagram explaining the stack: BERT-based fine-tuned LLM for text-to-vector embeddings, RAG knowledge base grounded in 500+ historical crises and brand voice guidelines, and a validation/back-testing loop with human-in-the-loop approval.",
              'The "white-box" framing was a strategic choice — buyers in PR are skeptical of opaque AI. Showing them exactly how predictions get made was the trust unlock.',
            ],
            image: {
              src: `${IMAGE_BASE}/ai-architecture.png`,
              alt: "AI architecture diagram — multimodal ingestion, RAG engine, validation loop",
              placeholderLabel: `${IMAGE_BASE}/ai-architecture.png`,
            },
          },
          {
            step: "03 / What Users See",
            heading: "The Risk Radar dashboard — turning a model into a decision tool.",
            paragraphs: [
              "Designed the UX story for what a PR director sees when they open Risk Radar at 9 AM: a sorted feed of emerging risks, each with its 0–100 score, trajectory, sample sources, and three response options ready to ship.",
              'The dashboard mockup was the bridge between "we have a cool model" and "this saves you four hours every morning." Showing what users actually <em>do</em> with the AI is what closes B2B deals.',
            ],
            image: {
              src: `${IMAGE_BASE}/dashboard.png`,
              alt: "Risk Radar Dashboard mockup — risk feed, scores, response templates",
              placeholderLabel: `${IMAGE_BASE}/dashboard.png`,
            },
          },
        ],
      }}
      whyNow={{
        heading: "Three forces converging — and we're underwriting all three.",
        cells: [
          {
            key: "Social Explosion",
            heading: "5.66B global users.",
            desc: "~70% of the world population is now on social media in 2026. The attack surface for brand reputation has never been larger.",
          },
          {
            key: "AI Maturity",
            heading: "LLMs make prediction practical.",
            desc: "GPT-4 / Claude 3 / agentic AI maturity finally make real-time prediction + tailored response generation reliable enough to ship as B2B SaaS.",
          },
          {
            key: "Recent Crises",
            heading: "The pain is fresh and obvious.",
            desc: 'McDonald\'s CEO Taste Test, Kenvue Tylenol claims, American Eagle\'s "Great Jeans" — recent high-profile crises make the buyer\'s case for us.',
          },
        ],
      }}
      market={{
        heading: "A $6B+ serviceable market — growing 19% CAGR.",
        body: "The AI-powered media monitoring subset alone is projected to reach $38B by 2035. Our near-term focus is U.S. PR firms and mid-sized brands vulnerable to social backlash — a $1–2B obtainable market that gives us room to grow without competing head-on with Sprinklr or Meltwater on day one.",
        metrics: [
          {
            label: "TAM · 2025",
            num: "$6.3B",
            sub: "All media monitoring needs · growing to $18.6B by 2034",
          },
          {
            label: "SAM · 2025",
            num: "$6.7B",
            sub: "AI-powered crisis & social tools · 19% CAGR",
          },
          {
            label: "SOM · Near-term",
            num: "$1–2B",
            sub: "U.S. PR firms & mid-sized brands · 2026–2028",
          },
        ],
        bullets: [
          "<strong>28% of brand crises</strong> now go global in under 60 minutes (Freshfields).",
          "<strong>65% of PR firms</strong> are actively seeking AI tools to pre-draft responses (Muck Rack).",
          "Narrative Intelligence Market grew <strong>35% YoY</strong> on the back of deepfakes and coordinated rage-bait campaigns.",
        ],
      }}
      reflection={{
        heading: "What Risk Radar taught me about AI startups.",
        cards: [
          {
            label: "What I Learned",
            title: "Explainability is the moat.",
            body: "In B2B AI, the model isn't the product — the trust is. Buyers in regulated, reputation-sensitive industries don't buy black boxes. Designing the \"white-box\" architecture was as much a sales asset as a technical one.",
          },
          {
            label: "What Surprised Me",
            title: "The pitch is the product.",
            body: "I came in thinking the AI architecture was the hard part. The hard part was making it legible. The slide where I distilled the whole stack to one diagram did more for the pitch than the underlying model would have.",
          },
          {
            label: "What's Next",
            title: "I want to ship this at a real startup.",
            body: "Risk Radar made me certain: I want to be at a fast-paced B2B SaaS company shipping AI systems and workflows. Cross-functional, technical-adjacent, customer-facing. Building the thing, not just studying it.",
          },
        ],
      }}
      cta={{
        label: "Open to Summer 2026 internships",
        heading:
          "Looking for a fast-paced B2B SaaS team deploying AI workflows. Let's talk.",
        href: "mailto:iriswang32@gmail.com",
        linkText: "Get in touch →",
      }}
      backHref="/experience"
      backLabel="← Back to experience"
      footerCrumb="Experience · Risk Radar · AI Product Strategy"
    />
  );
}
