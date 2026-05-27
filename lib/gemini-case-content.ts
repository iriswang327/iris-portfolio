/** Gemini case study — section copy (human tone, fact-checked) */

export const GEMINI_CASE_SECTIONS = [
  { id: "problem", num: "01", title: "The Problem" },
  { id: "what", num: "02", title: "What I Did" },
  { id: "why", num: "03", title: "Why I Did It" },
  { id: "solutions", num: "04", title: "Solutions" },
  { id: "iterations", num: "05", title: "Iterations" },
  { id: "next", num: "06", title: "What's Next" },
] as const;

export const GEMINI_PROBLEM_INTRO =
  "I wanted to understand Gemini more without a finance background. However, the marketing blog created a friction as a user that led me to leave the page as fast as I clicked on it.";

export const GEMINI_PAIN_POINTS = [
  {
    title: "Nothing reads urgent.",
    body: "As a writer and illustrator for UT Austin's Law Journal and school paper, I couldn't tell what mattered today from the blog.",
  },
  {
    title: "The layout is missing organization.",
    body: "It felt like a pile of posts, I saw an opportunity to organize.",
  },
  {
    title: "Inconsistent shaping across pills.",
    body: "Some boxes had rounder corners, some did not.",
  },
] as const;

export const GEMINI_WHAT_I_DID = [
  "Reshaped featured stories.",
  "Added filter categories and attached them to blog cards, plus filtering at the top.",
  "Filter components in matching pills.",
  "Made design consistent across pill colors and shapes, plus icon border shape.",
] as const;

export const GEMINI_IN_APP_INTRO =
  "The blog was step one. I pushed the same hierarchy — breaking news, category tags, urgency — into trading surfaces where people are already watching price.";

export const GEMINI_WHY_INTRO = "Questions brought up during user pain points.";

export const GEMINI_STRATEGY_QA = [
  {
    q: "Why separate featured stories and categories?",
    a: "High-value regulatory news was indistinguishable from general content.",
  },
  {
    q: "Would it move trading volume?",
    a: "Rather than breaking momentum for app users to leave the Gemini ecosystem to access news, combining it is worth testing, not simply assuming.",
  },
  {
    q: "Competitors?",
    a: "Analyzing competitors such as Coinbase, Robinhood, and Kraken provided important design insight.",
  },
] as const;

export const GEMINI_SYSTEM_STEPS = [
  { num: "01", slug: "ingest", title: "News sources", detail: "APIs, wires, editorial CMS" },
  { num: "02", slug: "normalize", title: "Clean data", detail: "Tags, timestamps, asset links" },
  { num: "03", slug: "route", title: "Match context", detail: "Ticker, alerts, relevance" },
  { num: "04", slug: "surface", title: "Show when it matters", detail: "Hidden until the user asks" },
] as const;

export const GEMINI_SOLUTION_SURFACES = [
  {
    kicker: "01 · alert",
    title: "Homepage banner for breaking news.",
  },
  {
    kicker: "02 · context",
    title: "Expandable card on the asset page.",
  },
  {
    kicker: "03 · hierarchy",
    title: "Tags and icons separate news from action.",
  },
] as const;

export const GEMINI_CRITIQUE_RESPONSES = [
  {
    area: "Product strategy",
    body: "I wrote out why news belongs on the exchange, stated my volume bet clearly, and pointed to Coinbase as proof the pattern exists.",
  },
  {
    area: "Visual polish",
    body: "Breaking news gets a banner. Everything else lives in a collapsible card. Tags and icons so news doesn't look like a trade CTA.",
  },
] as const;

export const GEMINI_WHATS_NEXT = [
  {
    title: "Holdings-aware feed",
    body: "Own BTC? Show ETF and macro headlines first — not generic company posts.",
  },
  {
    title: "A/B on asset pages",
    body: "News card on vs. off. Measure time-to-trade and session length. Prove the bet or cut it.",
  },
] as const;

export const GEMINI_FEEDBACK_QUOTE =
  "Push yourself on product strategy — why news on the exchange, your theory on volume, what competitors have proven. And visually — could this be a banner or homepage section instead of something always open?";
