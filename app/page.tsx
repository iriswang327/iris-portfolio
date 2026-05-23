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
    comingSoon: true,
  },
  {
    href: "/coffee",
    title: "What's Your Order?",
    description: "build your coffee · submit the order",
    tag: "place an order ↗",
    comingSoon: true,
  },
  {
    href: "/museum",
    title: "Museum of Art",
    description: "illustrations, oils, watercolors",
    tag: "view gallery ↗",
    comingSoon: true,
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DreamsPage() {
  return (
    <div className="bg-[#F9F9FB]">

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
            <span
              className="font-[300]"
              style={{ fontSize: 12, color: "#888888" }}
            >
              open to summer 2026 internships · nyc preferred
            </span>
          </div>

          {/* Row 2: Name */}
          <h1
            className="name-splash font-[200]"
            style={{
              color: "var(--foreground)",
              marginTop: 16,
              marginBottom: 14,
              fontSize: 40,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            iris wang
          </h1>

          {/* Row 3: Product [role] for [audience] */}
          <div
            className="flex items-baseline gap-[7px] font-[300] flex-wrap"
            style={{ color: "var(--foreground)", fontSize: 18 }}
          >
            <span>Product</span>
            <RotatingWords
              words={["designer", "thinker", "innovator", "lover"]}
              interval={4000}
            />
            <span>for</span>
            <RotatingWords
              words={["humans", "AI startups", "dog lovers", "friends", "the future"]}
              interval={2500}
            />
          </div>

          {/* Row 4: Tagline */}
          <p
            className="font-[300]"
            style={{ color: "#888888", marginTop: 12, fontSize: 14, lineHeight: 1.7 }}
          >
            Working at the edges of law, tech, and people.
          </p>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESIGN PROJECTS
          ══════════════════════════════════════════ */}
      <section style={{ paddingBottom: 16 }}>
        <div className="design-section-label">
          <p
            className="section-label"
            style={{ color: "#BBBBBB", marginBottom: 14 }}
          >
            DESIGN PROJECTS
          </p>
        </div>

        <ProjectsGridSection />
      </section>

      {/* ══════════════════════════════════════════
          FOR FUN
          ══════════════════════════════════════════ */}
      <section style={{ paddingBottom: 80 }}>
        <div className="design-section-label" style={{ marginTop: 64 }}>
          <p
            className="section-label"
            style={{ color: "#BBBBBB", marginBottom: 14 }}
          >
            FOR FUN
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FUN_CARDS.map((card) => (
              <FunCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
