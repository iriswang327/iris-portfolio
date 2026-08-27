import Link from "next/link";
import RotatingWords from "@/components/RotatingWords";
import FunCard from "@/components/FunCard";
import ParallaxHeroGradient from "@/components/ParallaxHeroGradient";
import ProjectsGridSection from "@/components/ProjectsGridSection";

const FUN_CARDS = [
  {
    href: "/museum",
    title: "Personal Art Gallery",
    description: "illustrations, oils, watercolors — visual craft across mediums",
    tag: "view gallery ↗",
  },
  {
    href: "/booth",
    title: "The Booth",
    description: "vintage film photobooth — drop a photo, get a strip",
    tag: "try it out ↗",
  },
  {
    href: "/coffee",
    title: "Coffee Builder",
    description: "build your coffee · submit the order",
    tag: "place an order ↗",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════
          HERO
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <ParallaxHeroGradient />

        <div className="design-hero relative z-10">
          {/* Row 1: Status indicator */}
          <div className="flex items-center gap-2">
            <span
              className="rounded-full pulse-dot flex-shrink-0"
              style={{ width: 6, height: 6, background: "var(--status-green)", display: "inline-block" }}
              aria-hidden="true"
            />
            <span className="design-hero-status font-[300] text-[var(--muted)]">
              open to graphic design or marketing · summer 2026 · downtown austin
            </span>
          </div>

          {/* Row 2: Name */}
          <h1 className="name-splash design-hero-name mt-4 mb-3.5 type-hero-display">
            iris wang
          </h1>

          {/* Row 3: Graphic [role] for [audience] */}
          <div className="design-hero-line type-hero-subline flex flex-wrap items-baseline gap-[7px] font-[300]">
            <span>Graphic</span>
            <RotatingWords
              words={["designer", "brand builder", "marketer", "visual storyteller"]}
              interval={4000}
            />
            <span>for</span>
            <RotatingWords
              words={["brands", "campaigns", "teams", "hospitality", "the future"]}
              interval={2500}
            />
          </div>

          {/* Row 4: Tagline */}
          <p className="design-hero-tagline mt-4 font-[300]">
            Branding, social, print, and digital — design with aesthetics and impact in mind.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESIGN PROJECTS
          ══════════════════════════════════════════ */}
      <section className="pb-4">
        <div className="design-section-label">
          <p className="section-label mb-4">BRAND &amp; DESIGN</p>
        </div>

        <ProjectsGridSection />

        <p className="design-section-label mt-6 text-[15px] font-[300] leading-relaxed text-[var(--muted)]">
          Campaign work, social strategy, and client deliverables — see{" "}
          <Link href="/experience" className="text-gradient-ihwn transition-opacity hover:opacity-80">
            experience
          </Link>
          .
        </p>
      </section>

      {/* ══════════════════════════════════════════
          FOR FUN
          ══════════════════════════════════════════ */}
      <section className="design-section-label mt-[var(--gap-section)] pb-20">
        <p className="section-label mb-4">FOR FUN</p>

        <div className="fun-cards-preview-wrap">
          <div className="fun-cards-preview grid grid-cols-1 gap-6 md:grid-cols-3">
            {FUN_CARDS.map((card) => (
              <FunCard key={card.href} {...card} preview />
            ))}
          </div>
          <p className="fun-cards-preview-label">
            side projects in the works: coffee builder, personal art gallery, and more
          </p>
        </div>
      </section>
    </>
  );
}
