"use client";

import DesignCaseStudyTemplate from "@/components/DesignCaseStudyTemplate";

export default function GeminiPage() {
  return (
    <DesignCaseStudyTemplate
      breadcrumb="Design → Gemini → News Integration"
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
          text: "Redesigning the blog homepage with a unified tagging system, a consistent rounded-card architecture, and explicit breaking news markers for high-impact headlines." 
        },
        { 
          step: "02 / The Designer Critique", 
          text: "A Gemini Product Designer pushed my strategy further, challenging me to bridge the layout directly to business volume metrics and explore non-persistent banner entry points." 
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
      {/* Media Block Slot: Showcases your light & dark phone layouts side-by-side */}
      <div className="space-y-8 w-full mt-12">

        {/* Final Design Centerpiece Container */}
        <div className="rounded-2xl overflow-hidden border border-black/5 shadow-sm bg-gradient-to-tr from-[#1E1030] to-[#0B0718] p-6 sm:p-12">
          <img
            src="/images/gemini-hero-frame.jpg"
            alt="Gemini Native Mobile Interface Final Light Mode Design"
            className="w-full h-auto object-contain block mx-auto rounded-xl drop-shadow-xl"
          />
        </div>

        {/* Supporting Process & Operational States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0A0A0A] rounded-xl overflow-hidden border border-white/5 p-4">
            <img
              src="/images/gemini-dark-mockup.png"
              alt="Low-Light Responsive Mobile News Feed Component Layout"
              className="w-full h-auto object-contain block mx-auto rounded-xl"
            />
          </div>
          <div className="bg-white rounded-xl overflow-hidden border border-black/5 p-4">
            <img
              src="/images/gemini-web-audit.jpg"
              alt="Gemini Platform Desktop Web Reference Integration"
              className="w-full h-auto object-contain block mx-auto rounded-xl"
            />
          </div>
        </div>

      </div>
    </DesignCaseStudyTemplate>
  );
}