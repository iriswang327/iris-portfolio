"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RiskRadarBreadcrumbItem {
  label: string;
  href?: string;
}

export interface RiskRadarMetaCell {
  label: string;
  value: string;
}

export interface RiskRadarProblemCard {
  label: string;
  title: string;
  body: string;
}

export interface RiskRadarPhase {
  step: string;
  heading: string;
  body: string;
}

export interface RiskRadarContribution {
  step: string;
  heading: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
    placeholderLabel: string;
  };
}

export interface RiskRadarWhyNowCell {
  key: string;
  heading: string;
  desc: string;
}

export interface RiskRadarMetric {
  label: string;
  num: string;
  sub: string;
}

export interface RiskRadarReflectionCard {
  label: string;
  title: string;
  body: string;
}

export interface TeamMember {
  role: string;
  name: string;
  isMe?: boolean;
}

export interface RiskRadarCaseStudyProps {
  breadcrumb: RiskRadarBreadcrumbItem[];
  eyebrowTags: string[];
  title: string;
  subtitle: string;
  tagline: string;
  metadata: RiskRadarMetaCell[];
  overview: {
    heading: string;
    body: string;
    team: TeamMember[];
  };
  problem: {
    heading: string;
    body: string;
    cards: RiskRadarProblemCard[];
    pullQuote: string;
  };
  solution: {
    heading: string;
    body: string;
    phases: RiskRadarPhase[];
  };
  contributions: {
    sectionLabel: string;
    heading: string;
    body: string;
    items: RiskRadarContribution[];
  };
  whyNow: {
    heading: string;
    cells: RiskRadarWhyNowCell[];
  };
  market: {
    heading: string;
    body: string;
    metrics: RiskRadarMetric[];
    bullets: string[];
  };
  reflection: {
    heading: string;
    cards: RiskRadarReflectionCard[];
  };
  cta: {
    label: string;
    heading: string;
    href: string;
    linkText: string;
  };
  backHref?: string;
  backLabel?: string;
  footerCrumb?: string;
}

// ─── Risk Radar accent (navy) ────────────────────────────────────────────────

const ACCENT = "#1e3a5f";
const ACCENT_TINT = "rgba(30,58,95,0.08)";
const ACCENT_TINT_2 = "rgba(30,58,95,0.04)";

// ─── Shared primitives (aligned with DesignCaseStudyTemplate) ────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 400,
        color: "#BBBBBB",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        marginBottom: 20,
      }}
    >
      {children}
    </p>
  );
}

function Hairline({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "0.5px",
        background: "rgba(0,0,0,0.06)",
        ...style,
      }}
    />
  );
}

const bodyTextStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 300,
  color: "#444444",
  lineHeight: 1.75,
  maxWidth: 640,
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  color: "var(--foreground)",
  marginBottom: 10,
  letterSpacing: "-0.01em",
  maxWidth: 640,
  lineHeight: 1.45,
};

// ─── Image slot with placeholder fallback ────────────────────────────────────

function CaseImageSlot({
  src,
  alt,
  placeholderLabel,
}: {
  src: string;
  alt: string;
  placeholderLabel: string;
}) {
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setImageReady(true);
    };
    probe.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (imageReady) {
    return (
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain rounded-xl border border-black/[0.04] shadow-sm bg-white"
      />
    );
  }

  return (
    <div
      style={{
        aspectRatio: "4 / 3",
        borderRadius: 12,
        background: `linear-gradient(135deg, ${ACCENT_TINT}, ${ACCENT_TINT_2})`,
        border: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      aria-label={alt}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 300,
          color: "rgba(30,58,95,0.45)",
          textAlign: "center",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          wordBreak: "break-all",
        }}
      >
        {placeholderLabel}
      </span>
    </div>
  );
}

// ─── Main template ───────────────────────────────────────────────────────────

export default function RiskRadarCaseStudyTemplate({
  breadcrumb,
  eyebrowTags,
  title,
  subtitle,
  tagline,
  metadata,
  overview,
  problem,
  solution,
  contributions,
  whyNow,
  market,
  reflection,
  cta,
  backHref = "/experience",
  backLabel = "← Back to experience",
  footerCrumb,
}: RiskRadarCaseStudyProps) {
  return (
    <div className="w-full" style={{ backgroundColor: "var(--background)", paddingTop: 56 }}>
      <div className="mx-auto w-full" style={{ maxWidth: 960, padding: "0 32px" }}>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            fontSize: 11,
            fontWeight: 300,
            color: "#BBBBBB",
            marginTop: 40,
            marginBottom: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {breadcrumb.map((item, index) => (
            <span key={`${item.label}-${index}`}>
              {index > 0 && <span style={{ margin: "0 6px" }}>→</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--foreground)]"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Hero */}
        <div style={{ marginTop: 24, marginBottom: 16 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: "#BBBBBB",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {eyebrowTags.join(" · ")}
          </p>

          <h1
            style={{
              fontSize: 40,
              fontWeight: 200,
              color: "var(--foreground)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: 13,
              fontWeight: 300,
              color: "rgba(26,22,37,0.4)",
              lineHeight: 1.65,
              maxWidth: 680,
              marginBottom: 16,
            }}
          >
            {subtitle}
          </p>

          {/* Tagline strip */}
          <div className="flex items-center gap-3" style={{ marginTop: 4 }}>
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: ACCENT,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              {tagline}
            </span>
          </div>
        </div>

        {/* Metadata grid */}
        {metadata.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(metadata.length, 4)}, 1fr)`,
              borderTop: "0.5px solid rgba(0,0,0,0.06)",
              borderLeft: "0.5px solid rgba(0,0,0,0.06)",
              marginTop: 32,
              marginBottom: 48,
            }}
            className="max-sm:grid-cols-1"
          >
            {metadata.map((cell) => (
              <div
                key={cell.label}
                style={{
                  padding: "16px 20px",
                  borderRight: "0.5px solid rgba(0,0,0,0.06)",
                  borderBottom: "0.5px solid rgba(0,0,0,0.06)",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#BBBBBB",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {cell.label}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    lineHeight: 1.4,
                  }}
                >
                  {cell.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Overview */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Overview</SectionLabel>
          <p style={sectionHeadingStyle}>{overview.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 24 }}>{overview.body}</p>
          <div className="flex flex-wrap gap-2">
            {overview.team.map((member) => (
              <span
                key={`${member.role}-${member.name}`}
                style={{
                  padding: "8px 14px",
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: member.isMe ? 500 : 400,
                  color: member.isMe ? "#fff" : "#444444",
                  background: member.isMe ? ACCENT : "#ffffff",
                  border: `1px solid ${member.isMe ? ACCENT : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <span
                  style={{
                    color: member.isMe ? "rgba(255,255,255,0.7)" : "#BBBBBB",
                    fontWeight: 300,
                    marginRight: 6,
                  }}
                >
                  {member.role}
                </span>
                {member.name}
              </span>
            ))}
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* The Problem */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>The Problem</SectionLabel>
          <p style={sectionHeadingStyle}>{problem.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 20 }}>{problem.body}</p>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
            style={{ marginBottom: 32 }}
          >
            {problem.cards.map((card) => (
              <div
                key={card.label}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  padding: "20px 20px 18px",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: ACCENT,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: "#888888",
                    lineHeight: 1.6,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
          <blockquote
            style={{
              position: "relative",
              margin: 0,
              background: "rgba(167,139,250,0.04)",
              border: "1px solid rgba(167,139,250,0.12)",
              borderRadius: 12,
              padding: "28px 32px",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 2,
                borderRadius: "12px 0 0 12px",
                background:
                  "linear-gradient(180deg, #F0ABFC 0%, #A78BFA 50%, #7DD3FC 100%)",
              }}
            />
            <p
              style={{
                fontSize: 20,
                fontWeight: 200,
                fontStyle: "italic",
                color: "var(--foreground)",
                lineHeight: 1.55,
                letterSpacing: "-0.015em",
              }}
            >
              &ldquo;
              <span dangerouslySetInnerHTML={{ __html: problem.pullQuote }} />
              &rdquo;
            </p>
          </blockquote>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* The Solution */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>The Solution</SectionLabel>
          <p style={sectionHeadingStyle}>{solution.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 24 }}>{solution.body}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {solution.phases.map((phase) => (
              <div
                key={phase.step}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  padding: "20px 20px 18px",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: ACCENT,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {phase.step}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {phase.heading}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: "#888888",
                    lineHeight: 1.6,
                  }}
                >
                  {phase.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* My Contributions */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>{contributions.sectionLabel}</SectionLabel>
          <p style={sectionHeadingStyle}>{contributions.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 32 }}>{contributions.body}</p>
          {contributions.items.map((item, index) => (
            <div
              key={item.step}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
              style={{
                marginBottom: index < contributions.items.length - 1 ? 32 : 0,
                direction: index % 2 === 1 ? "rtl" : "ltr",
              }}
            >
              <div style={{ direction: "ltr" }}>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: ACCENT,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  {item.step}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.heading}
                </p>
                {item.paragraphs.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    style={{
                      fontSize: 11,
                      fontWeight: 300,
                      color: "rgba(26,22,37,0.4)",
                      lineHeight: 1.6,
                      maxWidth: 320,
                      marginBottom: 8,
                    }}
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>
              <div style={{ direction: "ltr" }}>
                <CaseImageSlot
                  src={item.image.src}
                  alt={item.image.alt}
                  placeholderLabel={item.image.placeholderLabel}
                />
              </div>
            </div>
          ))}
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* Why Now */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Why Now</SectionLabel>
          <p style={sectionHeadingStyle}>{whyNow.heading}</p>
          <div
            style={{
              marginTop: 24,
              padding: "24px 28px",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 16,
              background: "#ffffff",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyNow.cells.map((cell) => (
                <div key={cell.key}>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: ACCENT,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    {cell.key}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: "var(--foreground)",
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {cell.heading}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 300,
                      color: "#888888",
                      lineHeight: 1.55,
                    }}
                  >
                    {cell.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* Market Opportunity */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Market Opportunity</SectionLabel>
          <p style={sectionHeadingStyle}>{market.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 24 }}>{market.body}</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(market.metrics.length, 3)}, 1fr)`,
              borderTop: "0.5px solid rgba(0,0,0,0.06)",
              borderLeft: "0.5px solid rgba(0,0,0,0.06)",
              marginBottom: 24,
            }}
            className="max-sm:grid-cols-1"
          >
            {market.metrics.map((metric) => (
              <div
                key={metric.label}
                style={{
                  padding: "16px 20px",
                  borderRight: "0.5px solid rgba(0,0,0,0.06)",
                  borderBottom: "0.5px solid rgba(0,0,0,0.06)",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#BBBBBB",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {metric.label}
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 200,
                    color: "var(--foreground)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: 4,
                  }}
                >
                  {metric.num}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: "#888888",
                    lineHeight: 1.5,
                  }}
                >
                  {metric.sub}
                </p>
              </div>
            ))}
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: 640 }}>
            {market.bullets.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  fontSize: 13,
                  fontWeight: 300,
                  color: "#444444",
                  lineHeight: 1.65,
                  marginBottom: 8,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: ACCENT,
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* Reflection */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Reflection</SectionLabel>
          <p style={{ ...sectionHeadingStyle, marginBottom: 24 }}>{reflection.heading}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {reflection.cards.map((card) => (
              <div
                key={card.label}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  padding: "20px 20px 18px",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#BBBBBB",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: "#888888",
                    lineHeight: 1.65,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section
          style={{
            marginBottom: 48,
            padding: "32px 36px",
            background: ACCENT,
            color: "#fff",
            borderRadius: 16,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 12,
              }}
            >
              {cta.label}
            </p>
            <p
              style={{
                fontSize: 20,
                fontWeight: 200,
                letterSpacing: "-0.015em",
                lineHeight: 1.35,
                maxWidth: 520,
              }}
            >
              {cta.heading}
            </p>
          </div>
          <Link
            href={cta.href}
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 100,
              transition: "background 200ms ease",
            }}
            className="hover:bg-white/10"
          >
            {cta.linkText}
          </Link>
        </section>

        {/* Footer row */}
        <div
          style={{
            paddingBottom: 80,
            paddingTop: 24,
            borderTop: "0.5px solid rgba(0,0,0,0.06)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Link
            href={backHref}
            style={{
              fontSize: 12,
              fontWeight: 300,
              color: "#BBBBBB",
              letterSpacing: "-0.01em",
              transition: "color 200ms ease",
            }}
            className="hover:text-[var(--foreground)] transition-colors"
          >
            {backLabel}
          </Link>
          {footerCrumb && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 300,
                color: "#BBBBBB",
                letterSpacing: "0.06em",
              }}
            >
              {footerCrumb}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
