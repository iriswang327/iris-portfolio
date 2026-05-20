import RotatingWords from "@/components/RotatingWords";
import ProjectCard from "@/components/ProjectCard";
import FunCard from "@/components/FunCard";

// ─── Company logo SVGs (ghost watermarks, rendered at low opacity inside cards) ──

/** Apple logo — simplified silhouette */
function AppleLogo() {
  return (
    <svg
      width="52"
      height="62"
      viewBox="0 0 52 62"
      fill="white"
      style={{ opacity: 0.08 }}
      aria-hidden="true"
    >
      <path d="M38.4 15.8c-2.2 2.7-5.8 4.8-9.3 4.5-.4-3.5 1.4-7.2 3.5-9.6 2.4-2.8 6.4-4.8 9.7-4.8.4 3.7-1.2 7.4-3.9 9.9zM41.6 21.5c-5.3-.3-9.9 3-12.4 3s-6.4-2.8-10.7-2.8c-5.4.1-10.4 3.1-13.2 8-5.6 9.6-1.4 23.8 4 31.9 2.6 3.8 5.8 8.1 9.9 7.9 4-.2 5.5-2.5 10.3-2.5 4.8 0 6.2 2.5 10.4 2.4 4.3-.1 7-3.8 9.6-7.6 3-4.4 4.2-8.6 4.3-8.8-.1 0-8.3-3.2-8.3-12.8 0-8 6.4-11.9 6.7-12.1-3.7-5.4-9.4-5.7-10.6-5.6z" />
    </svg>
  );
}

/** Spotify logo — circle with 3 sound-wave arcs */
function SpotifyLogo() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 100 100"
      fill="none"
      style={{ opacity: 0.08 }}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="48" fill="white" />
      <path d="M26 38 Q50 27 74 36" stroke="#1E5537" strokeWidth="7" strokeLinecap="round" />
      <path d="M28 51 Q50 41 72 49" stroke="#1E5537" strokeWidth="7" strokeLinecap="round" />
      <path d="M31 64 Q50 56 69 62" stroke="#1E5537" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

/** Meta logo — simplified infinity ∞ shape */
function MetaLogo() {
  return (
    <svg
      width="64"
      height="36"
      viewBox="0 0 120 68"
      fill="white"
      style={{ opacity: 0.08 }}
      aria-hidden="true"
    >
      <path d="M30,34 C30,20 40,12 50,12 C57,12 62,16 68,24 C74,16 80,10 90,10 C100,10 110,18 110,34 C110,50 100,58 90,58 C80,58 74,52 68,44 C62,52 57,56 50,56 C40,56 30,48 30,34 Z M50,24 C44,24 42,29 42,34 C42,39 44,44 50,44 C55,44 60,40 66,34 C60,28 55,24 50,24 Z M90,22 C84,22 78,28 72,34 C78,40 84,46 90,46 C96,46 98,41 98,34 C98,27 96,22 90,22 Z" />
    </svg>
  );
}

/** Gemini logo — 4-pointed star with IHWN gradient fill */
function GeminiLogo() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 100 100"
      style={{ opacity: 0.15 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gem-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0ABFC" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      {/* 4-pointed star — same shape as the real Gemini mark */}
      <path
        d="M50 4 C50 4 54 30 72 50 C54 70 50 96 50 96 C50 96 46 70 28 50 C46 30 50 4 50 4 Z"
        fill="url(#gem-gradient)"
      />
    </svg>
  );
}

// ─── Card data ─────────────────────────────────────────────────────────────────

const MOCK_PROJECTS = [
  {
    href: "/dreams/apple",
    gradient: "linear-gradient(148deg, #B4B1FD 0%, #909BE6 48%, #748ADB 100%)",
    logo: <AppleLogo />,
    pill: "Apple · Product Design",
    pillDark: false,
    hoverDescription: "Rethinking how Maps connects people to context.",
    videoUrl: undefined,
  },
  {
    href: "/dreams/spotify",
    gradient: "linear-gradient(148deg, #1E5537 0%, #0C2C1B 100%)",
    logo: <SpotifyLogo />,
    pill: "Spotify · Product Design",
    pillDark: false,
    hoverDescription: "Discover what local businesses are listening to.",
    videoUrl: undefined,
  },
  {
    href: "/dreams/meta",
    gradient: "linear-gradient(148deg, #1B2C5B 0%, #090F2E 100%)",
    logo: <MetaLogo />,
    pill: "Meta · Product Design",
    pillDark: false,
    hoverDescription: "A social-first approach to everyday wellness.",
    videoUrl: undefined,
  },
  {
    href: "/dreams/gemini",
    gradient: "linear-gradient(148deg, #1E1030 0%, #0B0718 100%)",
    logo: <GeminiLogo />,
    pill: "Gemini · Product Design",
    pillDark: true,
    hoverDescription: "Contextual crypto news in the trading experience.",
    videoUrl: undefined,
  },
] as const;

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
    // pt-14 offsets the fixed nav (56px / h-14)
    <div className="pt-14">

      {/* ══════════════════════════════════════════
          HERO
          ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: 120, paddingBottom: 0 }}
      >
        {/* Layered watercolor radial blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 18% -5%, var(--blob-lavender) 0%, transparent 60%), " +
              "radial-gradient(ellipse 60% 50% at 85% -8%, var(--blob-blush) 0%, transparent 60%), " +
              "radial-gradient(ellipse 55% 65% at 50% 15%, var(--blob-periwinkle) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="content-wrap relative z-10" style={{ maxWidth: 800, paddingLeft: 64, paddingRight: 64 }}>
          {/* Row 1: Status indicator */}
          <div className="flex items-center gap-2">
            <span
              className="rounded-full pulse-dot flex-shrink-0"
              style={{ width: 6, height: 6, background: "var(--status-green)", display: "inline-block" }}
              aria-hidden="true"
            />
            <span
              className="text-[12px] font-light"
              style={{ color: "#888888" }}
            >
              open to summer 2026 internships · anywhere
            </span>
          </div>

          {/* Row 2: Name with watercolor splash — 16px below status line */}
          <h1
            className="name-splash font-[200] leading-tight"
            style={{ color: "var(--foreground)", marginTop: 16, fontSize: 42, letterSpacing: "-0.02em" }}
          >
            iris wang
          </h1>

          {/* Row 3: Product [role] for [audience] — one line, 6px below name, smaller quieter text */}
          <div
            className="flex items-baseline gap-[8px] font-[300] flex-wrap"
            style={{ color: "var(--foreground)", marginTop: 6, fontSize: 20 }}
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
            style={{ color: "#888888", marginTop: 20, fontSize: 14 }}
          >
            Working at the edges of law, tech, and people.
          </p>

          {/* Row 5: School info */}
          <p
            className="font-[300]"
            style={{ color: "#BBBBBB", marginTop: 6, fontSize: 12 }}
          >
            UT Austin · Advertising + CS · 2027
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MOCK PROJECTS
          ══════════════════════════════════════════ */}
      <section style={{ marginTop: 0, paddingBottom: 16 }}>
        <div className="content-wrap" style={{ maxWidth: 800, paddingLeft: 64, paddingRight: 64 }}>
          <p
            className="section-label"
            style={{ color: "#BBBBBB", marginBottom: 14, marginTop: 80 }}
          >
            MOCK PROJECTS
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: 16 }}
          >
            {MOCK_PROJECTS.map((card) => (
              <ProjectCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOR FUN
          ══════════════════════════════════════════ */}
      <section style={{ paddingBottom: 80 }}>
        <div className="content-wrap" style={{ maxWidth: 800, paddingLeft: 64, paddingRight: 64 }}>
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
