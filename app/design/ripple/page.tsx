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
          step: "01 / DISCOVERY & MAPPING",
          text: "Interviewed designers and potential participants to map the full recruitment journey — identifying where time was lost and what signals mattered most for study-participant fit.",
          image: "/images/ripple-process-1.png",
        },
        {
          step: "02 / USER FLOW DESIGN",
          text: "Defined the dual-track flow: designer-side study creation and participant-side browsing. Focused on reducing the number of steps between intent and enrollment to under three taps.",
          image: "/images/ripple-process-2.png",
        },
        {
          step: "03 / INTERFACE ITERATION",
          text: "Built and tested multiple iterations of the study card system and profile matching UI with cross-functional feedback from Convergent's product and engineering teams.",
          image: "/images/ripple-process-3.png",
        },
        {
          step: "04 / PITCH & ITERATION",
          text: "Practiced pitching structural features directly to our product engineering leads before presenting live to tech executives, cross-functional judges, and convergent teams on campus Demo Day.",
          image: "/images/ripple-proccess-4.png",
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

        {/* ── Final Result: 5-screen user journey map + trophy ── */}
        <div className="rounded-2xl overflow-hidden border border-black/5 bg-white p-6 sm:p-10 space-y-8">

          {/* 5-screen wireframe grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 w-full">
            {[
              { src: "/images/ripple-flow-1.png", label: "01 / Brand Discovery Hub (Landing Page Ecosystem)" },
              { src: "/images/ripple-flow-2.png", label: "02 / Professional Network Directory (Social Layer)" },
              { src: "/images/ripple-flow-3.png", label: "03 / High-Density Visual Index (Project Finding)" },
              { src: "/images/ripple-flow-4.png", label: "04 / Interactive Matching Engine (Designer View Flow)" },
              { src: "/images/ripple-flow-5.png", label: "05 / Interactive Matching Engine (Project Recruiter Flow)" },
            ].map(({ src, label }) => (
              <div key={src} className="flex flex-col gap-3">
                <img
                  src={src}
                  alt={label}
                  className="w-full h-auto object-contain rounded-xl border border-black/[0.04] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05),0_0_1px_rgba(0,0,0,0.1)] bg-white transition-transform duration-300 hover:scale-[1.01]"
                />
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#BBBBBB",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Trophy flag — pinned below all screens */}
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
