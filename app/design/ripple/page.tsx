"use client";

import DesignCaseStudyTemplate from "@/components/DesignCaseStudyTemplate";

export default function RipplePage() {
  return (
    <DesignCaseStudyTemplate
      breadcrumb="Design → Texas Convergent → Ripple"
      finalSectionLabel="Final Result"
      title="Ripple"
      subtitle="Bridging the gap between UX designers and high-intent research participants."
      metadata={[
        { label: "Timeline", value: "Fall 2024" },
        { label: "Role", value: "Product Designer" },
        { label: "Focus", value: "User Research & Product Design" },
        { label: "Team", value: "Texas Convergent" },
      ]}
      overviewText="UX designers consistently struggle to recruit the right participants for meaningful research. Ripple is a research recruitment platform built inside Texas Convergent that connects designers directly to domain-relevant users — eliminating the cold-outreach friction that causes most research to get skipped entirely in fast-moving product cycles."
      competitiveCards={[
        {
          company: "The Core Friction",
          details:
            "Designers either skip user research due to recruitment overhead, or rely on low-quality convenience samples. There was no lightweight, purpose-built tool for matching high-intent participants to specific study needs.",
        },
        {
          company: "The Strategic Goal",
          details:
            "Design a two-sided platform that lets designers post research studies and connects them with participants who self-select based on relevant experience — reducing recruitment time from weeks to hours.",
        },
      ]}
      pullQuoteText="Research that never happens is the most expensive kind. Ripple removes the friction between the question and the person who can answer it."
      processSteps={[
        {
          step: "01 / Discovery & Mapping",
          text: "Interviewed designers and potential participants to map the full recruitment journey — identifying where time was lost and what signals mattered most for study-participant fit.",
        },
        {
          step: "02 / User Flow Design",
          text: "Defined the dual-track flow: designer-side study creation and participant-side browsing. Focused on reducing the number of steps between intent and enrollment to under three taps.",
        },
        {
          step: "03 / Interface Iteration",
          text: "Built and tested multiple iterations of the study card system and profile matching UI with cross-functional feedback from Convergent's product and engineering teams.",
        },
        {
          step: "04 / PITCH & ITERATION",
          text: "Practiced pitching structural features directly to our product engineering leads before presenting live to tech executives, cross-functional judges, and convergent teams on campus Demo Day.",
        },
      ]}
      reflectionColumns={[
        {
          title: "What Worked",
          body: "Framing Ripple as a two-sided marketplace early forced us to design for both user types simultaneously — which surfaced real tension points in the flow that a single-sided design would have missed entirely.",
        },
        {
          title: "What I'd Push Further",
          body: "The matching logic was manual in v1. With more time I'd explore lightweight algorithmic matching — surfacing studies to participants based on their background tags rather than requiring active browsing.",
        },
        {
          title: "What I Learned",
          body: "Speed of recruitment is a proxy for the health of a product team's research culture. By making recruitment feel as easy as posting a tweet, Ripple changed how the team thought about when research was 'worth it'.",
        },
      ]}
    >
      {/* ── Media blocks ── */}
      <div className="space-y-4 w-full mt-12">

        {/* Hero frame — wide transparent device layout */}
        <div className="rounded-2xl overflow-hidden border border-black/5 shadow-sm bg-gradient-to-tr from-[#0A1628] to-[#1155A0] p-6 sm:p-12">
          <img
            src="/images/ripple-hero-frame.png"
            alt="Ripple platform hero interface"
            className="w-full h-auto object-contain max-w-4xl mx-auto block drop-shadow-2xl"
          />
        </div>

        {/* Process grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#F7F8FA] rounded-xl overflow-hidden border border-black/5 p-4">
            <img
              src="/images/ripple-user-flow.png"
              alt="Ripple user flow diagram"
              className="w-full h-auto object-contain block mx-auto"
            />
          </div>
          <div className="bg-white rounded-xl overflow-hidden border border-black/5 p-4">
            <img
              src="/images/ripple-old-v1.png"
              alt="Ripple v1 early explorations"
              className="w-full h-auto object-contain block mx-auto"
            />
          </div>
        </div>

        {/* Interface screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl overflow-hidden border border-black/5 p-4">
            <img
              src="/images/ripple-interface-designers.png"
              alt="Ripple designer-side interface"
              className="w-full h-auto object-contain block mx-auto"
            />
          </div>
          <div className="bg-white rounded-xl overflow-hidden border border-black/5 p-4">
            <img
              src="/images/ripple-interface-projects.png"
              alt="Ripple projects browse interface"
              className="w-full h-auto object-contain block mx-auto"
            />
          </div>
        </div>

        {/* Demo video — browser controls for recruiter playback */}
        <div className="rounded-2xl overflow-hidden border border-black/5 bg-[#0A1628]">
          <video
            controls
            className="w-full h-auto"
            aria-label="Ripple product demo walkthrough"
          >
            <source src="/videos/ripple-demo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── Final Result: Demo Day win ── */}
        <div className="rounded-2xl overflow-hidden border border-black/5 bg-white p-6 sm:p-10 space-y-6">

          {/* Victory photo */}
          <img
            src="/images/ripple-victory.png"
            alt="Ripple team on Demo Day — Best Presentation award"
            className="w-full h-auto object-contain block mx-auto rounded-xl"
          />

          {/* Trophy flag */}
          <div
            className="flex items-center gap-4 rounded-2xl px-6 py-5"
            style={{
              background: "linear-gradient(135deg, #F0EEFF 0%, #E8F4FF 100%)",
              border: "1px solid rgba(167,139,250,0.2)",
            }}
          >
            <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">🏆</span>
            <p
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: "var(--foreground)",
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
              }}
            >
              Winner, Best Presentation out of 18 cross-functional engineering teams.
            </p>
          </div>

        </div>

      </div>
    </DesignCaseStudyTemplate>
  );
}
