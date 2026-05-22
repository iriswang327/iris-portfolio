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
    title: "What's Your Order?",
    description: "build your coffee · submit the order",
    tag: "place an order ↗",
  },
  {
    href: "/museum",
    title: "Museum of Art",
    description: "illustrations, oils, watercolors",
    tag: "view gallery ↗",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DreamsPage() {
  return (
    <div className="bg-[#F9F9FB]">

      {/* ══════════════════════════════════════════
          HERO
          ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: 180, paddingBottom: 0 }}
      >
        <ParallaxHeroGradient />

        {/* Left-aligned, max 680px, hugs left edge */}
        <div className="relative z-10" style={{ maxWidth: 680, paddingLeft: 24, paddingRight: 24 }}>
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
              open to summer 2026 internships · anywhere
            </span>
          </div>

          {/* Row 2: Name with watercolor splash */}
          <h1
            className="name-splash font-[200] leading-tight"
            style={{ color: "var(--foreground)", marginTop: 16, fontSize: 36, letterSpacing: "-0.02em" }}
          >
            iris wang
          </h1>

          {/* Row 3: Product [role] for [audience] — 4px below name */}
          <div
            className="flex items-baseline gap-[7px] font-[300] flex-wrap"
            style={{ color: "var(--foreground)", marginTop: 4, fontSize: 18 }}
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
            style={{ color: "#888888", marginTop: 12, fontSize: 15, lineHeight: 1.6 }}
          >
            Working at the edges of law, tech, and people.
          </p>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESIGN PROJECTS
          ══════════════════════════════════════════ */}
      <section style={{ paddingBottom: 16 }}>
        <div className="w-full max-w-6xl mx-auto px-6 my-16">
          <p
            className="section-label"
            style={{ color: "#BBBBBB", marginBottom: 14 }}
          >
            DESIGN PROJECTS
          </p>

          <ProjectsGridSection />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOR FUN
          ══════════════════════════════════════════ */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ paddingLeft: 24, paddingRight: 24 }}>
          <p
            className="section-label"
            style={{ color: "#BBBBBB", marginBottom: 14, marginTop: 48 }}
          >
            FOR FUN
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: 10 }}
          >
            {FUN_CARDS.map((card) => (
              <FunCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
