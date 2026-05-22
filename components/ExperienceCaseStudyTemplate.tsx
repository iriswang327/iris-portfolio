"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CaseStudyMetaCell {
  label: string;
  value: string;
}

export interface CaseStudyBreadcrumbItem {
  label: string;
  href?: string;
}

export interface CaseStudyFrameCard {
  label: string;
  title: string;
  body: string;
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
  body: string;
  images: CaseStudyImageSlot[];
  metrics?: CaseStudyMetric[];
  bullets?: string[];
}

export interface CaseStudyProcessStep {
  num: string;
  heading: string;
  body: string;
  image: CaseStudyImageSlot;
}

export interface CaseStudyReflectionCard {
  label: string;
  title: string;
  body: string;
}

export interface ExperienceCaseStudyProps {
  backHref?: string;
  backLabel?: string;
  breadcrumb: CaseStudyBreadcrumbItem[];
  eyebrowTags: string[];
  title: string;
  subtitle: string;
  metadata: CaseStudyMetaCell[];
  overview: {
    body: string;
    bullets: string[];
  };
  challenge: {
    heading: string;
    body: string;
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
}

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

// ─── Main template ───────────────────────────────────────────────────────────

export default function ExperienceCaseStudyTemplate({
  backHref = "/experience",
  backLabel = "← Back to experience",
  breadcrumb,
  eyebrowTags,
  title,
  subtitle,
  metadata,
  overview,
  challenge,
  pullQuote,
  clients,
  process,
  reflection,
}: ExperienceCaseStudyProps) {
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
        <div style={{ marginTop: 24, marginBottom: 32 }}>
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

        {/* Overview */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Overview</SectionLabel>
          <p style={{ ...bodyTextStyle, marginBottom: overview.bullets.length ? 16 : 0 }}>
            {overview.body}
          </p>
          {overview.bullets.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: 640 }}>
              {overview.bullets.map((item) => (
                <li
                  key={item}
                  style={{
                    ...bodyTextStyle,
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#c9a96e",
                      marginTop: 8,
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* Challenge */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>The Challenge</SectionLabel>
          <p
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: "var(--foreground)",
              marginBottom: 10,
              letterSpacing: "-0.01em",
              maxWidth: 640,
            }}
          >
            {challenge.heading}
          </p>
          <p style={{ ...bodyTextStyle, marginBottom: 20 }}>{challenge.body}</p>
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
                  {card.label}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
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
        </section>

        {/* Pull quote */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>The Problem</SectionLabel>
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
            <SectionLabel>{client.sectionLabel}</SectionLabel>
            <p
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "var(--foreground)",
                marginBottom: 4,
                letterSpacing: "-0.01em",
              }}
            >
              {client.title}
            </p>
            <p
              style={{
                fontSize: 11,
                fontWeight: 300,
                color: "#888888",
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              {client.subtitle}
            </p>
            <p style={{ ...bodyTextStyle, marginBottom: 24 }}>{client.body}</p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              style={{ marginBottom: client.metrics?.length || client.bullets?.length ? 24 : 0 }}
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
                  marginBottom: client.bullets?.length ? 20 : 0,
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

            {client.bullets && client.bullets.length > 0 && (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: 640 }}>
                {client.bullets.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 13,
                      fontWeight: 300,
                      color: "#444444",
                      lineHeight: 1.65,
                      marginBottom: 8,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {clientIndex < clients.length - 1 && <Hairline style={{ marginTop: 64 }} />}
          </section>
        ))}

        <Hairline style={{ marginBottom: 64 }} />

        {/* Process */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Process</SectionLabel>
          {process.heading && (
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(26,22,37,0.4)",
                lineHeight: 1.65,
                maxWidth: 640,
                marginBottom: 24,
              }}
            >
              {process.heading}
            </p>
          )}
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
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#BBBBBB",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  {step.num}
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
                  {step.heading}
                </p>
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
          <SectionLabel>Reflection</SectionLabel>
          {reflection.heading && (
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(26,22,37,0.4)",
                lineHeight: 1.65,
                maxWidth: 640,
                marginBottom: 24,
              }}
            >
              {reflection.heading}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reflection.cards.map((card) => (
              <div key={card.title}>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {card.title}
                </p>
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
