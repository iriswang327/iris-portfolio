"use client";

import DesignCaseStudyTemplate from "@/components/DesignCaseStudyTemplate";

export default function GeminiPage() {
  return (
    <DesignCaseStudyTemplate
      backHref="/"
      backLabel="← Back to Design"
      title="Gemini · News Integration"
      subtitle="A portfolio case study — not a Gemini commission. Exploring whether news inside the exchange can keep traders informed without breaking flow."
      metadata={[
        { label: "Timeline", value: "Spring 2026" },
        { label: "Role", value: "Product Design · Self-Directed" },
        { label: "Focus", value: "Product Strategy & UI" },
        { label: "Method", value: "Critique-Driven Iteration" },
      ]}
      overviewText="Crypto moves fast. Gemini's blog holds high-value regulatory and market context — but it lives outside the app, looks like generic company content, and gives traders no reason to stay in-ecosystem when they're ready to act."
      overviewBullets={[
        "<strong>My bet:</strong> contextual news at the moment of trade reduces drop-off and supports volume — Coinbase already ships this pattern",
        "This is the story of framing that bet, designing against it, and iterating after a senior designer pushed me on <em>why it matters</em> and <em>how it should look</em>",
      ]}
      problemSectionLabel="How Might We"
      pullQuoteText="How might we turn Gemini's blog from a siloed content page into an integrated intelligence layer inside the trading experience?"
      competitiveSectionLabel="Product Strategy"
      competitiveCards={[
        {
          company: "User View",
          details:
            "Traders leave Gemini to parse news elsewhere — right when intent is highest. Regulatory updates look identical to brand fluff. <strong>No urgency signal, no hierarchy.</strong> The blog reads like a CMS dump, not a trading tool.",
        },
        {
          company: "Market View",
          details:
            "<strong>Coinbase integrates news in-app</strong> — users stay in the flow. If context sits next to the buy/sell moment, traders act on macro signals (rate cuts, ETF news) instead of tab-hunting. That pattern is proven in crypto; Gemini's siloed blog doesn't participate in it.",
        },
      ]}
      bulletSections={[
        {
          label: "Pain Points",
          items: [
            "Visual inconsistency across blog elements",
            "High-value regulatory news indistinguishable from general content",
            "App users leave Gemini entirely to access news",
          ],
        },
        {
          label: "Goals",
          items: [
            "Content hierarchy that signals <strong>urgency at a glance</strong>",
            "News intelligence inside the asset trading flow",
            "Seamless web ↔ mobile experience",
          ],
        },
        {
          label: "References",
          items: [
            "<strong>Coinbase</strong> — in-app news + trading flow",
            "Asana, Airbnb, Shopify — tagging & card hierarchy",
          ],
        },
      ]}
      processSectionLabel="Solutions"
      processSteps={[
        {
          step: "01 · Blog Homepage",
          text: "Breaking news markers for high-impact headlines. Unified tagging for category filtering. Consistent rounded-card system across the hub.",
          image: "/images/gemini-process-1.png",
        },
        {
          step: "02 · In-App Integration",
          text: "Bitcoin news model — the <strong>why</strong> next to the <strong>what</strong>. Category tags match the blog system. News sits adjacent to the asset, not on a separate island.",
          image: "/images/gemini-mobile-dark.png",
        },
        {
          step: "03 · Post-Critique",
          text: "A Gemini designer asked: <em>will this actually move volume?</em> and <em>does it need to be a persistent wall of text?</em> I tied the story to trading behavior, then moved to an expandable card — banner entry, deep read on tap, icons + hierarchy instead of an always-open block.",
          image: "/images/gemini-process-2.png",
        },
      ]}
      reflectionSectionLabel="What I'd Tell a Hiring Team"
      reflectionColumns={[
        {
          title: "Product sense",
          body: "News on an exchange isn't decoration — it's <strong>timing</strong>. The feature only works if it shows up when someone's deciding to buy or sell. Coinbase validates the model; my job was to argue why Gemini's gap matters and design toward action, not just readability.",
        },
        {
          title: "Visual polish",
          body: "Text-heavy panels fight execution speed. After critique, I explored <strong>entry points that don't dominate the screen</strong> — banner, expandable card, category anchors with icons. Traders choose depth; the UI doesn't force it.",
        },
        {
          title: "If I had more time",
          body: "Prototype A/B entry patterns (banner vs. card vs. homepage section). Measure time-in-app and clicks-to-trade. Every case study should read as a story with a business hypothesis — not just a prettier blog.",
        },
      ]}
    >
      <div className="space-y-12 w-full mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 px-4">
          {[
            {
              src: "/images/gemini-desktop-all.png",
              label: "01 · Blog Hub — hierarchy, tags, breaking news",
            },
            {
              src: "/images/gemini-desktop-markets.png",
              label: "02 · Markets Stream — integrated financial news",
            },
          ].map(({ src, label }) => (
            <div key={src} className="flex flex-col gap-3">
              <img
                src={src}
                alt={label}
                className="w-full h-auto object-contain rounded-2xl border border-black/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.03)] bg-white"
              />
              <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-[#BBBBBB]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto px-4">
          <div className="flex flex-col gap-3">
            <img
              src="/images/gemini-mobile-dark.png"
              alt="03 · In-app news — dark UI, expandable card layer"
              className="w-full h-auto object-contain rounded-xl border border-black/[0.04] shadow-[0_15px_40px_rgba(0,0,0,0.04)] bg-white block mx-auto"
            />
            <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-[#BBBBBB]">
              03 · In-app news · dark UI
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <img
              src="/images/gemini-mobile-light.png"
              alt="04 · In-app news — light UI token ecosystem"
              className="w-full h-auto object-contain rounded-xl border border-black/[0.04] shadow-[0_15px_40px_rgba(0,0,0,0.04)] bg-white block mx-auto"
            />
            <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-[#BBBBBB]">
              04 · In-app news · light UI
            </p>
          </div>
        </div>
      </div>
    </DesignCaseStudyTemplate>
  );
}
