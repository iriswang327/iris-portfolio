"use client";

import DesignCaseStudyTemplate from "@/components/DesignCaseStudyTemplate";

export default function GeminiPage() {
  return (
    <DesignCaseStudyTemplate
      backHref="/"
      backLabel="← Back to Design"
      title="Gemini Crypto Integration"
      subtitle="Turning a siloed content blog into an integrated intelligence layer inside the active trading flow."
      metadata={[
        { label: "Timeline", value: "Spring 2026" },
        { label: "Role", value: "Product Design Candidate" },
        { label: "Focus", value: "Product Strategy & Data Density" },
        { label: "Method", value: "Critique-Driven Iteration" }
      ]}
      overviewText="Crypto markets operate at a volatile velocity, yet high-value regulatory and transactional data streams are siloed on a completely detached blog ecosystem. This case study addresses a core design friction: app users leaving the Gemini ecosystem entirely to parse market context, creating drop-offs during high-intent trading moments."
      competitiveCards={[
        { 
          company: "The Core Friction", 
          details: "Visual inconsistency across elements made high-value regulatory news completely indistinguishable from general company content, hiding high-impact market signals behind a generic blog roll." 
        },
        { 
          company: "The Strategic Goal", 
          details: "Build a strict content hierarchy that signals urgency at a glance, bringing news intelligence natively into the mobile asset flow while keeping desktop web and app patterns unified." 
        }
      ]}
      pullQuoteText="Unfiltered information blocks inside an active exchange do not inform the user—they disrupt execution speed. The goal is indicating the 'why' directly next to the 'what'."
      processSteps={[
        { 
          step: "01 / Structural Audit", 
          text: "Redesigning the blog homepage with a unified tagging system, a consistent rounded-card architecture, and explicit breaking news markers for high-impact headlines.",
          image: "/images/gemini-process-1.png",
        },
        { 
          step: "02 / The Designer Critique", 
          text: "A Gemini Product Designer pushed my strategy further, challenging me to bridge the layout directly to business volume metrics and explore non-persistent banner entry points.",
          image: "/images/gemini-process-2.png",
        }
      ]}
      reflectionColumns={[
        { 
          title: "Product Strategy", 
          body: "Contextual exchange news directly drives trading volume. By embedding macro insights (like Federal Reserve rate cuts) immediately adjacent to the buy/sell module, users can instantly act on information instead of closing the app to research external threads." 
        },
        { 
          title: "Visual Polish & Polish", 
          body: "Based on industry critique, I moved away from a persistently open, heavy text block. Instead, I established a dynamic, expandable card layer. Traders get high-level category anchors with icons, giving them the agency to tap for deep content density only when required." 
        },
        { 
          title: "What I Learned", 
          body: "Every case study is a story. Competitors like Coinbase prove that integrated news keeps users inside the flow; designing it as a cohesive intelligence ecosystem rather than an afterthought is what turns interface layouts into true product assets." 
        }
      ]}
    >
      {/* ── Final Design: Tiered desktop + mobile layout ── */}
      <div className="space-y-12 w-full mt-12">

        {/* Tier 1: Dual desktop wireframe grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 px-4">
          {[
            { src: "/images/gemini-desktop-all.png",     label: "01 / Platform Hub — Core Blog News Layout" },
            { src: "/images/gemini-desktop-markets.png", label: "02 / Platform Hub — Integrated Financial Markets Stream" },
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

        {/* Tier 2: Split flat mobile UI grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto px-4">
          <div className="flex flex-col gap-3">
            <img
              src="/images/gemini-mobile-dark.png"
              alt="03 / Native Mobile Flow (Dark UI Token Ecosystem)"
              className="w-full h-auto object-contain rounded-xl border border-black/[0.04] shadow-[0_15px_40px_rgba(0,0,0,0.04)] bg-white block mx-auto"
            />
            <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-[#BBBBBB]">
              03 / Native Mobile Flow (Dark UI Token Ecosystem)
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <img
              src="/images/gemini-mobile-light.png"
              alt="04 / Native Mobile Flow (Light UI Token Ecosystem)"
              className="w-full h-auto object-contain rounded-xl border border-black/[0.04] shadow-[0_15px_40px_rgba(0,0,0,0.04)] bg-white block mx-auto"
            />
            <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-[#BBBBBB]">
              04 / Native Mobile Flow (Light UI Token Ecosystem)
            </p>
          </div>
        </div>

      </div>
    </DesignCaseStudyTemplate>
  );
}