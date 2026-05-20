import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Experience — Museum of Iris",
  description:
    "Advertising. Business. Design. Law. One through-line: making complex things human.",
};

// ─── Experience card data ───────────────────────────────────────────────────

const EXPERIENCE_CARDS = [
  {
    href: "/experience/tower-bridge",
    gradient: "linear-gradient(148deg, #FDF6E8 0%, #F5E6C8 100%)",
    pill: "Tower & Bridge · Analytics Strategy",
    pillDark: false,
    hoverDescription: "Student agency — real clients · 2025–Present",
  },
  {
    href: "/experience/texas-convergent",
    gradient: "linear-gradient(148deg, #EEEAFF 0%, #DDD8FF 100%)",
    pill: "Texas Convergent · Product Design",
    pillDark: false,
    hoverDescription: "Built Ripple solo — Best Presentation · Fall 2024",
  },
  {
    href: "/experience/integrated-design",
    gradient: "linear-gradient(148deg, #FCE8F0 0%, #F8E0EC 100%)",
    pill: "Integrated Design · UX Research",
    pillDark: false,
    hoverDescription: "Full UX research for unhoused community · Fall 2025",
  },
  {
    href: "/experience/risk-radar",
    gradient: "linear-gradient(148deg, #0A0A0A 0%, #1A1A2E 100%)",
    pill: "Risk Radar · AI Product",
    pillDark: true,
    hoverDescription: "AI brand crisis prediction — BERT, RAG · Spring 2026",
  },
  {
    href: "/experience/law-journal",
    gradient: "linear-gradient(148deg, #0F1729 0%, #1A2A4A 100%)",
    pill: "Law Journal · Legal Writing",
    pillDark: true,
    hoverDescription: "Published pieces on entertainment + healthcare law",
  },
  {
    href: "/experience/ol-pejeta",
    gradient: "linear-gradient(148deg, #2A1A0A 0%, #6A5040 100%)",
    pill: "Ol Pejeta · Brand Strategy",
    pillDark: true,
    hoverDescription: "Still Here campaign · Spring 2026",
  },
  {
    href: "/experience/asuci",
    gradient: "linear-gradient(148deg, #E8EEF8 0%, #D4E0F0 100%)",
    pill: "ASUCI · Outreach Intern",
    pillDark: false,
    hoverDescription: "Student government outreach · 2023–2024",
  },
] as const;

// ─── Currently data ─────────────────────────────────────────────────────────

const CURRENTLY = [
  {
    initials: "LG",
    bg: "#F0EEFF",
    color: "#A78BFA",
    name: "Letters of Gold",
    role: "Director of Projects",
    date: "2026–Present",
  },
  {
    initials: "DT",
    bg: "#FEF3F3",
    color: "#F87171",
    name: "The Daily Texan",
    role: "Editorial Illustrator",
    date: "2024–Present",
  },
  {
    initials: "LR",
    bg: "#FFF7ED",
    color: "#FB923C",
    name: "Longhorn Racing",
    role: "PR Photography",
    date: "2024–Present",
  },
  {
    initials: "LJ",
    bg: "#EFF6FF",
    color: "#60A5FA",
    name: "Texas Undergraduate Law Journal",
    role: "Staff Writer",
    date: "2024–Present",
  },
  {
    initials: "TB",
    bg: "#FFFBEB",
    color: "#FBBF24",
    name: "Tower & Bridge",
    role: "Analytics Strategy",
    date: "2025–Present",
  },
] as const;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ExperiencePage() {
  return (
    <div>
      {/* ══════════════════════════════════════════
          HERO
          ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: 140, paddingBottom: 0 }}
      >
        {/* Watercolor blobs — same palette as homepage */}
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

        <div className="relative z-10" style={{ maxWidth: 680, paddingLeft: 24, paddingRight: 24 }}>
          {/* Section label */}
          <p
            className="section-label"
            style={{ color: "#BBBBBB", marginBottom: 12 }}
          >
            REAL PROJECTS, REAL TEAM, REAL IMPACT
          </p>

          {/* Page title */}
          <h1
            className="font-[200] leading-tight"
            style={{ fontSize: 36, letterSpacing: "-0.02em", color: "var(--foreground)" }}
          >
            experience
          </h1>

          {/* Subtitle */}
          <p
            className="font-[300]"
            style={{ fontSize: 14, color: "#888888", marginTop: 10, lineHeight: 1.6 }}
          >
            Advertising. Business. Design. Law.
            <br />
            All with the goal of making complex things human.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPERIENCE CARDS
          ══════════════════════════════════════════ */}
      <section style={{ paddingBottom: 16 }}>
        <div style={{ paddingLeft: 24, paddingRight: 24 }}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: 12, marginTop: 48 }}
          >
            {EXPERIENCE_CARDS.map((card) => (
              <ProjectCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CURRENTLY
          ══════════════════════════════════════════ */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ paddingLeft: 24, paddingRight: 24 }}>
          <p
            className="section-label"
            style={{ color: "#BBBBBB", marginBottom: 0, marginTop: 64 }}
          >
            CURRENTLY
          </p>

          <div style={{ marginTop: 20 }}>
            {CURRENTLY.map((item, i) => (
              <div key={item.name}>
                <div
                  className="flex items-center"
                  style={{ gap: 16, paddingTop: 16, paddingBottom: 16 }}
                >
                  {/* Logo circle */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: 40,
                      height: 40,
                      background: item.bg,
                      fontSize: 11,
                      fontWeight: 500,
                      color: item.color,
                      letterSpacing: "0.02em",
                    }}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>

                  {/* Name + role */}
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-normal"
                      style={{ fontSize: 13, color: "var(--foreground)" }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="font-[300]"
                      style={{ fontSize: 12, color: "#888888", marginLeft: 8 }}
                    >
                      {item.role}
                    </span>
                  </div>

                  {/* Date */}
                  <span
                    className="flex-shrink-0 font-[300]"
                    style={{ fontSize: 11, color: "#BBBBBB" }}
                  >
                    {item.date}
                  </span>
                </div>

                {/* Hairline divider — skip after last item */}
                {i < CURRENTLY.length - 1 && (
                  <div
                    style={{ height: "0.5px", background: "var(--border)" }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
