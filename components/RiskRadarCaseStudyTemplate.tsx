"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

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
  paragraphs?: string[];
  bullets?: string[];
  image: {
    src: string;
    alt: string;
    placeholderLabel: string;
  };
}

export interface RiskRadarMetric {
  label: string;
  num: string;
  sub: string;
}

export interface RiskRadarReflectionCard {
  label: string;
  title: string;
  body?: string;
  bullets?: string[];
}

export interface TeamMember {
  role: string;
  name: string;
  isMe?: boolean;
}

export interface RiskRadarHeroMetric {
  label: string;
  num: string;
  sub: string;
}

export interface RiskRadarCaseStudyAccent {
  heroGradient: string;
  bulletColor?: string;
  heroEyebrow?: string;
  heroMetrics?: RiskRadarHeroMetric[];
  heroImage?: {
    src: string;
    alt: string;
    placeholderLabel: string;
  };
}

export interface RiskRadarCaseStudyProps {
  title: string;
  subtitle: string;
  subtitleHtml?: string;
  tagline: string;
  metadata: RiskRadarMetaCell[];
  accent?: RiskRadarCaseStudyAccent;
  overview: {
    heading: string;
    body?: string;
    bullets?: string[];
    team: TeamMember[];
  };
  problem: {
    heading: string;
    bullets?: string[];
    cards: RiskRadarProblemCard[];
    pullQuote: string;
  };
  solution: {
    heading: string;
    bullets?: string[];
    phases: RiskRadarPhase[];
  };
  contributions: {
    sectionLabel: string;
    heading: string;
    bullets?: string[];
    items: RiskRadarContribution[];
  };
  market?: {
    heading: string;
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

const richTextClassName =
  "[&_strong]:font-medium [&_strong]:text-[var(--foreground)] [&_em]:italic [&_em]:text-[rgba(26,22,37,0.72)] [&_.lead]:text-[15px] [&_.lead]:font-normal [&_.lead]:tracking-[-0.01em] [&_.lead]:text-[var(--foreground)] [&_.muted]:text-[11px] [&_.muted]:text-[rgba(26,22,37,0.42)] [&_.accent]:font-medium [&_.accent]:text-[#1e3a5f] [&_.sm]:text-[11px] [&_.sm]:text-[rgba(26,22,37,0.5)]";

function RichText({
  html,
  className = "",
  style,
}: {
  html: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`${richTextClassName} ${className}`.trim()}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function SectionEyebrow({
  children,
  accentColor = ACCENT,
}: {
  children: React.ReactNode;
  accentColor?: string;
}) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 500,
        color: accentColor,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        marginBottom: 8,
      }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 26,
        fontWeight: 200,
        color: "var(--foreground)",
        letterSpacing: "-0.025em",
        lineHeight: 1.2,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

function SectionHeading({
  eyebrow,
  title,
  accentColor,
}: {
  eyebrow: string;
  title?: string;
  accentColor?: string;
}) {
  return (
    <header style={{ marginBottom: title ? 28 : 20 }}>
      <SectionEyebrow accentColor={accentColor}>{eyebrow}</SectionEyebrow>
      {title && <SectionTitle>{title}</SectionTitle>}
    </header>
  );
}

function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: 17,
        fontWeight: 300,
        color: "var(--foreground)",
        letterSpacing: "-0.02em",
        lineHeight: 1.35,
        margin: 0,
      }}
    >
      {children}
    </h3>
  );
}

function StepEyebrow({
  children,
  accentColor = ACCENT,
}: {
  children: React.ReactNode;
  accentColor?: string;
}) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 500,
        color: accentColor,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        marginBottom: 6,
      }}
    >
      {children}
    </p>
  );
}

function CardEyebrow({
  children,
  accentColor = "rgba(26,22,37,0.38)",
}: {
  children: React.ReactNode;
  accentColor?: string;
}) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 500,
        color: accentColor,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: 6,
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
      style={{ height: "0.5px", background: "rgba(0,0,0,0.06)", ...style }}
    />
  );
}

function BulletList({
  items,
  compact,
  dotColor = ACCENT,
  leadIndex,
}: {
  items: string[];
  compact?: boolean;
  dotColor?: string;
  leadIndex?: number;
}) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: compact ? 320 : 640 }}>
      {items.map((item, index) => {
        const isLead = leadIndex === index;
        return (
          <li
            key={`${item.slice(0, 48)}-${index}`}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              fontSize: isLead ? 14 : compact ? 11 : 12,
              fontWeight: isLead ? 400 : 300,
              color: isLead
                ? "var(--foreground)"
                : compact
                  ? "rgba(26,22,37,0.55)"
                  : "rgba(26,22,37,0.62)",
              lineHeight: isLead ? 1.55 : 1.6,
              marginBottom: isLead ? 10 : 7,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: isLead ? 5 : 4,
                height: isLead ? 5 : 4,
                borderRadius: "50%",
                background: dotColor,
                marginTop: isLead ? 9 : 7,
                flexShrink: 0,
              }}
            />
            <RichText html={item} />
          </li>
        );
      })}
    </ul>
  );
}

function HeroImpactBand({ accent }: { accent: RiskRadarCaseStudyAccent }) {
  return (
    <section
      className="relative mb-12 overflow-hidden rounded-2xl border border-[#1e3a5f]/25"
      style={{
        background: accent.heroGradient,
        boxShadow:
          "0 20px 50px -24px rgba(30,58,95,0.22), 0 12px 32px -20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-slate-400/15 blur-3xl"
      />
      <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-10">
        <div>
          {accent.heroEyebrow && (
            <SectionEyebrow accentColor="#7dd3fc">{accent.heroEyebrow}</SectionEyebrow>
          )}
          {accent.heroMetrics && accent.heroMetrics.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {accent.heroMetrics.map((metric) => (
                <div key={metric.label}>
                  <p
                    style={{
                      fontSize: 28,
                      fontWeight: 200,
                      color: "var(--foreground)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {metric.num}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "rgba(26,22,37,0.55)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {metric.label}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 300,
                      color: "rgba(26,22,37,0.42)",
                      lineHeight: 1.4,
                    }}
                  >
                    {metric.sub}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {accent.heroImage && (
          <CaseImageSlot
            src={accent.heroImage.src}
            alt={accent.heroImage.alt}
            placeholderLabel={accent.heroImage.placeholderLabel}
          />
        )}
      </div>
    </section>
  );
}

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

export default function RiskRadarCaseStudyTemplate({
  title,
  subtitle,
  subtitleHtml,
  tagline,
  metadata,
  accent,
  overview,
  problem,
  solution,
  contributions,
  market,
  reflection,
  cta,
  backHref = "/experience",
  backLabel = "← Back to experience",
  footerCrumb,
}: RiskRadarCaseStudyProps) {
  const eyebrowColor = accent?.bulletColor ?? ACCENT;
  const bulletColor = accent?.bulletColor ?? ACCENT;

  return (
    <div className="w-full" style={{ backgroundColor: "var(--background)", paddingTop: 56 }}>
      <div className="mx-auto w-full" style={{ maxWidth: 960, padding: "0 32px" }}>
        <div style={{ marginTop: 40, marginBottom: 16 }}>
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
            {subtitleHtml ? <RichText html={subtitleHtml} /> : subtitle}
          </p>
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

        {accent && (accent.heroMetrics?.length || accent.heroImage) && (
          <HeroImpactBand accent={accent} />
        )}

        <section style={{ marginBottom: 64 }}>
          <SectionHeading eyebrow="Overview" title={overview.heading} accentColor={eyebrowColor} />
          {overview.bullets && overview.bullets.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <BulletList items={overview.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
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

        <section style={{ marginBottom: 64 }}>
          <SectionHeading eyebrow="The Problem" title={problem.heading} accentColor={eyebrowColor} />
          {problem.bullets && problem.bullets.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <BulletList items={problem.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" style={{ marginBottom: 28 }}>
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
                <CardEyebrow accentColor={eyebrowColor}>{card.label}</CardEyebrow>
                <SubsectionTitle>{card.title}</SubsectionTitle>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: "rgba(26,22,37,0.55)",
                    lineHeight: 1.55,
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  <RichText html={card.body} />
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
              padding: "24px 28px",
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
                fontSize: 18,
                fontWeight: 200,
                fontStyle: "italic",
                color: "var(--foreground)",
                lineHeight: 1.5,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              &ldquo;
              <RichText html={problem.pullQuote} />
              &rdquo;
            </p>
          </blockquote>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading eyebrow="The Solution" title={solution.heading} accentColor={eyebrowColor} />
          {solution.bullets && solution.bullets.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <BulletList items={solution.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
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
                <StepEyebrow accentColor={eyebrowColor}>{phase.step}</StepEyebrow>
                <SubsectionTitle>{phase.heading}</SubsectionTitle>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: "rgba(26,22,37,0.55)",
                    lineHeight: 1.55,
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  <RichText html={phase.body} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow={contributions.sectionLabel}
            title={contributions.heading}
            accentColor={eyebrowColor}
          />
          {contributions.bullets && contributions.bullets.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <BulletList items={contributions.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
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
                <StepEyebrow accentColor={eyebrowColor}>{item.step}</StepEyebrow>
                <SubsectionTitle>{item.heading}</SubsectionTitle>
                <div style={{ marginTop: 10 }}>
                  {item.bullets && item.bullets.length > 0 && (
                    <BulletList items={item.bullets} dotColor={bulletColor} compact />
                  )}
                  {item.paragraphs?.map((para) => (
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
                    >
                      <RichText html={para} />
                    </p>
                  ))}
                </div>
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

        {market && (
          <>
            <Hairline style={{ marginBottom: 64 }} />
            <section style={{ marginBottom: 64 }}>
              <SectionHeading
                eyebrow="Market Snapshot"
                title={market.heading}
                accentColor={eyebrowColor}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(market.metrics.length, 3)}, 1fr)`,
                  borderTop: "0.5px solid rgba(0,0,0,0.06)",
                  borderLeft: "0.5px solid rgba(0,0,0,0.06)",
                  marginBottom: 20,
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
                        fontSize: 10,
                        fontWeight: 300,
                        color: "rgba(26,22,37,0.45)",
                        lineHeight: 1.45,
                      }}
                    >
                      {metric.sub}
                    </p>
                  </div>
                ))}
              </div>
              <BulletList items={market.bullets} dotColor={bulletColor} />
            </section>
          </>
        )}

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading eyebrow="Reflection" title={reflection.heading} accentColor={eyebrowColor} />
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
                <CardEyebrow accentColor={eyebrowColor}>{card.label}</CardEyebrow>
                <SubsectionTitle>{card.title}</SubsectionTitle>
                <div style={{ marginTop: 10 }}>
                  {card.body && (
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 300,
                        color: "#888888",
                        lineHeight: 1.65,
                      }}
                    >
                      <RichText html={card.body} />
                    </p>
                  )}
                  {card.bullets && card.bullets.length > 0 && (
                    <BulletList items={card.bullets} dotColor={bulletColor} compact />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48, marginTop: 8 }}>
          <div
            className="gradient-ihwn"
            style={{
              padding: 1.5,
              borderRadius: 20,
              boxShadow:
                "0 28px 72px -24px rgba(167, 139, 250, 0.45), 0 12px 40px -16px rgba(26, 22, 37, 0.14)",
            }}
          >
            <div
              style={{
                borderRadius: 18,
                padding: "40px 44px",
                background: "rgba(255, 255, 255, 0.82)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow:
                  "inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 4px 24px -8px rgba(14, 14, 16, 0.06)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div style={{ flex: "1 1 280px", maxWidth: 560 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
                  <span
                    aria-hidden="true"
                    className="gradient-ihwn flex-shrink-0"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  />
                  <p
                    className="text-gradient-ihwn"
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    {cta.label}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 300,
                    color: "var(--foreground)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.35,
                    margin: 0,
                  }}
                >
                  {cta.heading}
                </p>
              </div>
              <Link
                href={cta.href}
                className="gradient-ihwn flex-shrink-0 transition-opacity hover:opacity-90"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 100,
                  boxShadow: "0 8px 24px -6px rgba(167, 139, 250, 0.55)",
                  letterSpacing: "0.01em",
                }}
              >
                {cta.linkText}
              </Link>
            </div>
          </div>
        </section>

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
