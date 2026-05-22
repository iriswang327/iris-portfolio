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

        {/* ── Final Result: Asymmetrical split-hero layout ── */}

        {/* Master asymmetrical grid */}
        <div className="w-full max-w-6xl mx-auto my-12 px-4 lg:grid lg:grid-cols-12 lg:gap-12 items-start">

          {/* Left side hero — columns 1–5 */}
          <div className="lg:col-span-5 flex flex-col gap-3 mb-10 lg:mb-0">
            <img
              src="/images/ripple-flow-1.png"
              alt="01 / Core Entry Hub & User Onboarding Canvas"
              className="w-full h-auto object-contain rounded-2xl border border-black/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white"
            />
            <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-[#BBBBBB]">
              01 / Core Entry Hub &amp; User Onboarding Canvas
            </p>
          </div>

          {/* Right side sub-systems — columns 6–12 */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { src: "/images/ripple-flow-2.png", label: "02 / Professional Network Directory" },
                { src: "/images/ripple-flow-3.png", label: "03 / Visual Interface Index" },
                { src: "/images/ripple-flow-4.png", label: "04 / Matching Loop (Designer Perspective)" },
                { src: "/images/ripple-flow-5.png", label: "05 / Matching Loop (Recruiter Perspective)" },
              ].map(({ src, label }) => (
                <div key={src} className="flex flex-col gap-3">
                  <img
                    src={src}
                    alt={label}
                    className="w-full h-auto object-contain rounded-xl border border-black/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white transition-transform duration-300 hover:scale-[1.01]"
                  />
                  <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-[#BBBBBB]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Demo video — constrained player between wireframes and trophy */}
        <div className="w-full max-w-3xl mx-auto my-12 px-4 block">
          <video
            controls
            className="w-full h-auto rounded-xl border border-black/[0.04] bg-neutral-950 shadow-sm"
            aria-label="Ripple product demo walkthrough"
          >
            <source src="/videos/ripple-demo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Trophy victory footer block */}
        <div className="w-full max-w-4xl mx-auto mt-16 border-t border-black/[0.06] pt-12 text-center">
          <img
            src="/images/ripple-victory.png"
            alt="Ripple team victory — Best Presentation award"
            className="max-w-md mx-auto w-full h-auto rounded-xl shadow-sm border border-black/5 block mb-6"
          />
          <p
            className="text-sm font-normal leading-relaxed"
            style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
          >
            🏆 Winner, Best Presentation out of 18 cross-functional engineering teams.
          </p>
        </div>

      </div>
    </DesignCaseStudyTemplate>
  );
}
