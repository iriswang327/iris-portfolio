"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CaseStudyMetaCell {
  label: string;
  value: string;
}

export interface CaseStudyFrameCard {
  label: string;
  title: string;
  body?: string;
  bullets?: string[];
}

export interface CaseStudyImageSlot {
  src: string;
  alt: string;
  placeholderLabel: string;
  caption?: string;
  tall?: boolean;
}

export interface CaseStudyMetric {
  label: string;
  num: string;
  sub: string;
}

export interface CaseStudyClientBlock {
  sectionLabel: string;
  title: string;
  subtitle: string;
  body?: string;
  bullets?: string[];
  images: CaseStudyImageSlot[];
  metrics?: CaseStudyMetric[];
}

export interface CaseStudyProcessStep {
  num: string;
  heading: string;
  body?: string;
  bullets?: string[];
  image: CaseStudyImageSlot;
}

export interface CaseStudyReflectionCard {
  label: string;
  title: string;
  body?: string;
  bullets?: string[];
}

export interface ExperienceCaseStudyAccent {
  heroGradient: string;
  bulletColor: string;
  heroImage?: CaseStudyImageSlot;
  heroMetrics?: CaseStudyMetric[];
  heroEyebrow?: string;
}

export interface ExperienceCaseStudyProps {
  backHref?: string;
  backLabel?: string;
  title: string;
  subtitle: string;
  metadata: CaseStudyMetaCell[];
  overview: {
    body: string;
    bullets: string[];
  };
  challenge: {
    heading: string;
    body?: string;
    bullets?: string[];
    frameCards: CaseStudyFrameCard[];
  };
  pullQuote: string;
  clients: CaseStudyClientBlock[];
  process: {
    heading: string;
    steps: CaseStudyProcessStep[];
  };
  reflection: {
    heading: string;
    cards: CaseStudyReflectionCard[];
  };
  accent?: ExperienceCaseStudyAccent;
}

// ─── Shared primitives (aligned with DesignCaseStudyTemplate) ────────────────

// ─── Typography scale ────────────────────────────────────────────────────────

function SectionEyebrow({
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

function SectionIntro({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 13,
        fontWeight: 300,
        color: "rgba(26,22,37,0.45)",
        lineHeight: 1.65,
        maxWidth: 640,
        marginTop: 10,
        marginBottom: 0,
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  accentColor,
}: {
  eyebrow: string;
  title?: string;
  intro?: string;
  accentColor?: string;
}) {
  return (
    <header style={{ marginBottom: title || intro ? 28 : 20 }}>
      <SectionEyebrow accentColor={accentColor}>{eyebrow}</SectionEyebrow>
      {title && <SectionTitle>{title}</SectionTitle>}
      {intro && <SectionIntro>{intro}</SectionIntro>}
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

// ─── Image slot with placeholder fallback ────────────────────────────────────

function CaseImageSlot({
  src,
  alt,
  placeholderLabel,
  tall,
}: CaseStudyImageSlot) {
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
        aspectRatio: tall ? "3 / 4" : "4 / 3",
        borderRadius: 12,
        background: "#F5F0E6",
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
          color: "rgba(26,22,37,0.3)",
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

function ImageCaption({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-[#BBBBBB]">
      {children}
    </p>
  );
}

function BulletList({
  items,
  dotColor = "#c9a96e",
  compact = false,
}: {
  items: string[];
  dotColor?: string;
  compact?: boolean;
}) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            ...bodyTextStyle,
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            marginBottom: compact ? 6 : 8,
            fontSize: compact ? 11 : 13,
            maxWidth: compact ? 320 : 640,
            color: compact ? "rgba(26,22,37,0.55)" : "#444444",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: dotColor,
              marginTop: 8,
              flexShrink: 0,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function HeroImpactBand({
  accent,
}: {
  accent: ExperienceCaseStudyAccent;
}) {
  return (
    <section
      className="relative mb-12 overflow-hidden rounded-2xl border border-emerald-300/25"
      style={{
        background: accent.heroGradient,
        boxShadow:
          "0 20px 50px -24px rgba(74,124,89,0.18), 0 12px 32px -20px rgba(191,87,0,0.1)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#BF5700]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl"
      />
      <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-10">
        <div>
          {accent.heroEyebrow && (
            <p
              style={{
                fontSize: 10,
                fontWeight: 400,
                color: "rgba(26,22,37,0.45)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {accent.heroEyebrow}
            </p>
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
                      fontWeight: 400,
                      color: "rgba(26,22,37,0.5)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {metric.label}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
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
          )}
        </div>
        {accent.heroImage && (
          <div className="overflow-hidden rounded-xl border border-white/60 bg-white/50 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            <CaseImageSlot {...accent.heroImage} />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main template ───────────────────────────────────────────────────────────

export default function ExperienceCaseStudyTemplate({
  backHref = "/experience",
  backLabel = "← Back to experience",
  title,
  subtitle,
  metadata,
  overview,
  challenge,
  pullQuote,
  clients,
  process,
  reflection,
  accent,
}: ExperienceCaseStudyProps) {
  const bulletColor = accent?.bulletColor ?? "#c9a96e";
  const eyebrowColor = accent?.bulletColor ?? "rgba(26,22,37,0.38)";
  return (
    <div className="w-full" style={{ backgroundColor: "var(--background)", paddingTop: 56 }}>
      <div className="mx-auto w-full" style={{ maxWidth: 960, padding: "0 32px" }}>
        {/* Hero */}
        <div style={{ marginTop: 40, marginBottom: 32 }}>
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
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Metadata grid */}
        {metadata.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(metadata.length, 4)}, 1fr)`,
              borderTop: "0.5px solid rgba(0,0,0,0.06)",
              borderLeft: "0.5px solid rgba(0,0,0,0.06)",
              marginBottom: 48,
            }}
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

        {/* Overview */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeading eyebrow="Overview" accentColor={eyebrowColor} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
            {overview.body ? (
              <p style={{ ...bodyTextStyle, marginBottom: 0, maxWidth: "none" }}>
                {overview.body}
              </p>
            ) : (
              <div />
            )}
            {overview.bullets.length > 0 && (
              <BulletList items={overview.bullets} dotColor={bulletColor} />
            )}
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* Challenge */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="The Challenge"
            title={challenge.heading}
            accentColor={eyebrowColor}
          />
          {challenge.body && (
            <p style={{ ...bodyTextStyle, marginBottom: 20 }}>{challenge.body}</p>
          )}
          {challenge.bullets && challenge.bullets.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <BulletList items={challenge.bullets} dotColor={bulletColor} />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {challenge.frameCards.map((card) => (
              <div
                key={card.title}
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
                        lineHeight: 1.6,
                      }}
                    >
                      {card.body}
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

        {/* Pull quote */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeading eyebrow="The Problem" accentColor={eyebrowColor} />
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
              &ldquo;{pullQuote}&rdquo;
            </p>
          </blockquote>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* Client blocks */}
        {clients.map((client, clientIndex) => (
          <section key={client.title} style={{ marginBottom: 64 }}>
            <SectionHeading
              eyebrow={client.sectionLabel}
              title={client.title}
              intro={client.subtitle}
              accentColor={eyebrowColor}
            />
            {client.body && (
              <p style={{ ...bodyTextStyle, marginBottom: 24 }}>{client.body}</p>
            )}
            {client.bullets && client.bullets.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <BulletList items={client.bullets} dotColor={bulletColor} />
              </div>
            )}

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              style={{ marginBottom: client.metrics?.length ? 24 : 0 }}
            >
              {client.images.map((image) => (
                <div key={image.src} className="flex flex-col gap-3">
                  <CaseImageSlot {...image} />
                  {image.caption && <ImageCaption>{image.caption}</ImageCaption>}
                </div>
              ))}
            </div>

            {client.metrics && client.metrics.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(client.metrics.length, 3)}, 1fr)`,
                  borderTop: "0.5px solid rgba(0,0,0,0.06)",
                  borderLeft: "0.5px solid rgba(0,0,0,0.06)",
                }}
                className="max-sm:grid-cols-1"
              >
                {client.metrics.map((metric) => (
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
            )}

            {clientIndex < clients.length - 1 && <Hairline style={{ marginTop: 64 }} />}
          </section>
        ))}

        <Hairline style={{ marginBottom: 64 }} />

        {/* Process */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Process"
            title={process.heading}
            accentColor={eyebrowColor}
          />
          {process.steps.map((step, index) => (
            <div
              key={step.num}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
              style={{
                marginBottom: index < process.steps.length - 1 ? 32 : 0,
                direction: index % 2 === 1 ? "rtl" : "ltr",
              }}
            >
              <div style={{ direction: "ltr" }}>
                <StepEyebrow accentColor={eyebrowColor}>{step.num}</StepEyebrow>
                <SubsectionTitle>{step.heading}</SubsectionTitle>
                <div style={{ marginTop: 10 }}>
                  {step.body && (
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 300,
                        color: "rgba(26,22,37,0.4)",
                        lineHeight: 1.6,
                        maxWidth: 320,
                      }}
                    >
                      {step.body}
                    </p>
                  )}
                  {step.bullets && step.bullets.length > 0 && (
                    <BulletList items={step.bullets} dotColor={bulletColor} compact />
                  )}
                </div>
              </div>
              <div style={{ direction: "ltr" }}>
                <CaseImageSlot {...step.image} />
              </div>
            </div>
          ))}
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* Reflection */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Reflection"
            title={reflection.heading}
            accentColor={eyebrowColor}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reflection.cards.map((card) => (
              <div key={card.title}>
                <CardEyebrow accentColor={eyebrowColor}>{card.label}</CardEyebrow>
                <SubsectionTitle>{card.title}</SubsectionTitle>
                <div style={{ marginTop: 10 }}>
                  {card.body && (
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 300,
                        color: "#888888",
                        lineHeight: 1.7,
                      }}
                    >
                      {card.body}
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

        {/* Back link */}
        <div style={{ paddingBottom: 80 }}>
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
        </div>
      </div>
    </div>
  );
}
