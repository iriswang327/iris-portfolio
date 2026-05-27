import RotatingWords from "@/components/RotatingWords";
import FunCard from "@/components/FunCard";
import ParallaxHeroGradient from "@/components/ParallaxHeroGradient";
import ProjectsGridSection from "@/components/ProjectsGridSection";

const FUN_CARDS = [
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
  {
    href: "/museum",
    title: "Personal Art Gallery",
    description: "illustrations, oils, watercolors",
    tag: "view gallery ↗",
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
              open to summer 2026 internships · nyc preferred
            </span>
          </div>

          {/* Row 2: Name */}
          <h1 className="name-splash design-hero-name mt-4 mb-3.5 font-[200] text-[var(--foreground)]">
            iris wang
          </h1>

          {/* Row 3: Product [role] for [audience] */}
          <div className="design-hero-line flex flex-wrap items-baseline gap-[7px] font-[300] text-[var(--foreground)]">
            <span>Product</span>
            <RotatingWords
              words={["designer", "thinker", "strategist", "builder"]}
              interval={4000}
            />
            <span>for</span>
            <RotatingWords
              words={["humans", "AI startups", "teams", "founders", "the future"]}
              interval={2500}
            />
          </div>

          {/* Row 4: Tagline */}
          <p className="design-hero-tagline mt-3 font-[300] leading-[1.7] text-[var(--muted)]">
            Creating intentional designs that bring ideas to reality.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESIGN PROJECTS
          ══════════════════════════════════════════ */}
      <section className="pb-4">
        <div className="design-section-label">
          <p className="section-label mb-3.5">DESIGN PROJECTS</p>
        </div>

        <ProjectsGridSection />
      </section>

      {/* ══════════════════════════════════════════
          FOR FUN
          ══════════════════════════════════════════ */}
      <section className="design-section-label mt-[var(--gap-section)] pb-20">
        <p className="section-label mb-3.5">FOR FUN</p>

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
