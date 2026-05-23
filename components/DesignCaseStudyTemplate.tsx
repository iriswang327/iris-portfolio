"use client";

import React from "react";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface CaseStudyMetadata {
  label: string;
  value: string;
}

export interface CompetitiveCard {
  company: string;
  details: string;
}

export interface ProcessStep {
  step: string;
  text: string;
  /** Optional image rendered inside the coloured placeholder area */
  image?: string;
}

export interface ReflectionColumn {
  title: string;
  body: string;
}

export interface DesignCaseStudyProps {
  /** Back link href — e.g. "/design" */
  backHref?: string;
  /** Back link label — e.g. "← Back to Apple" */
  backLabel?: string;
  /** Main hero title */
  title: string;
  /** One-liner subtitle below the title */
  subtitle: string;
  /** 4 horizontal metadata tags (Timeline, Role, Type, With) */
  metadata: CaseStudyMetadata[];
  /** Overview paragraph */
  overviewText?: string;
  /** Optional scannable bullets below overview */
  overviewBullets?: string[];
  /** Strategic / competitive framing cards */
  competitiveCards?: CompetitiveCard[];
  /** Override competitive section label */
  competitiveSectionLabel?: string;
  /** Pull-quote / HMW / problem statement */
  pullQuoteText: string;
  /** Override pull-quote section label */
  problemSectionLabel?: string;
  /** Optional labeled bullet groups — e.g. Pain Points, Goals */
  bulletSections?: Array<{ label: string; items: string[] }>;
  /** Horizontal process step track */
  processSteps?: ProcessStep[];
  /** Override process section label */
  processSectionLabel?: string;
  /** Final design mockups, videos, any media — injected as children */
  children?: React.ReactNode;
  /** Override the "Final Design" section label — e.g. "Final Result" */
  finalSectionLabel?: string;
  /** Reflection footer columns (what worked / what to change / takeaway) */
  reflectionColumns?: ReflectionColumn[];
  /** Override reflection section label */
  reflectionSectionLabel?: string;
}

// ─── Process step palette — cycles through 4 tints ──────────────────────────

const STEP_COLORS = ["#F0EEFF", "#E8F4FF", "#FFF0F5", "#F0FFF4"];

// ─── Section label ───────────────────────────────────────────────────────────

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

// ─── Hairline ────────────────────────────────────────────────────────────────

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

const richTextClassName =
  "[&_strong]:font-medium [&_strong]:text-[var(--foreground)] [&_em]:italic [&_em]:text-[rgba(26,22,37,0.72)]";

function RichText({ html }: { html: string }) {
  return (
    <span
      className={richTextClassName}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function BulletList({
  items,
  compact = false,
  leadIndex,
}: {
  items: string[];
  compact?: boolean;
  leadIndex?: number;
}) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: 640 }}>
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
              color: isLead ? "var(--foreground)" : "rgba(26,22,37,0.62)",
              lineHeight: 1.6,
              marginBottom: isLead ? 10 : 7,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#A78BFA",
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

// ─── Main component ──────────────────────────────────────────────────────────

export default function DesignCaseStudyTemplate({
  backHref = "/design",
  backLabel = "← Back to Design",
  title,
  subtitle,
  metadata,
  overviewText,
  overviewBullets,
  competitiveCards = [],
  competitiveSectionLabel = "Competitive Analysis",
  pullQuoteText,
  problemSectionLabel = "The Problem",
  bulletSections,
  processSteps = [],
  processSectionLabel = "Design Process",
  children,
  finalSectionLabel = "Final Design",
  reflectionColumns = [],
  reflectionSectionLabel = "Reflection",
}: DesignCaseStudyProps) {
  return (
    <div
      className="w-full"
      style={{ backgroundColor: "var(--background)", paddingTop: 56 }}
    >
      {/* ── Centred content container ─────────────────────── */}
      <div
        className="mx-auto w-full"
        style={{ maxWidth: 960, padding: "0 32px" }}
      >

        {/* ── Hero block ─────────────────────────────────── */}
        <div style={{ marginTop: 40, marginBottom: 32 }}>
          {/* Title */}
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

          {/* Subtitle */}
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

        {/* ── Metadata 4-column grid ─────────────────────── */}
        {metadata.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(metadata.length, 4)}, 1fr)`,
              borderTop: "0.5px solid rgba(0,0,0,0.06)",
              borderLeft: "0.5px solid rgba(0,0,0,0.06)",
              borderRadius: 0,
              marginBottom: 48,
            }}
          >
            {metadata.map((m) => (
              <div
                key={m.label}
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
                  {m.label}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    lineHeight: 1.4,
                  }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Overview ───────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Overview</SectionLabel>
          {overviewText && (
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                color: "#444444",
                lineHeight: 1.75,
                maxWidth: 640,
                marginBottom: overviewBullets?.length ? 16 : 0,
              }}
            >
              {overviewText}
            </p>
          )}
          {overviewBullets && overviewBullets.length > 0 && (
            <BulletList items={overviewBullets} leadIndex={0} />
          )}
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* ── HMW / Problem framing ──────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel>{problemSectionLabel}</SectionLabel>
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
                margin: 0,
              }}
            >
              &ldquo;{pullQuoteText}&rdquo;
            </p>
          </blockquote>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        {/* ── Strategic / competitive framing ────────────── */}
        {competitiveCards.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <SectionLabel>{competitiveSectionLabel}</SectionLabel>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {competitiveCards.map((card) => (
                <div
                  key={card.company}
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: 12,
                    padding: "20px 20px 18px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--foreground)",
                      marginBottom: 10,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {card.company}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 300,
                      color: "rgba(26,22,37,0.55)",
                      lineHeight: 1.6,
                    }}
                  >
                    <RichText html={card.details} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {bulletSections && bulletSections.length > 0 && (
          <>
            <section style={{ marginBottom: 64 }}>
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {bulletSections.map((section) => (
                  <div key={section.label}>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: "#BBBBBB",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        marginBottom: 14,
                      }}
                    >
                      {section.label}
                    </p>
                    <BulletList items={section.items} compact />
                  </div>
                ))}
              </div>
            </section>
            <Hairline style={{ marginBottom: 64 }} />
          </>
        )}

        {!bulletSections?.length && competitiveCards.length > 0 && (
          <Hairline style={{ marginBottom: 64 }} />
        )}

        {/* ── Design Process ─────────────────────────────── */}
        {processSteps.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <SectionLabel>{processSectionLabel}</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processSteps.map((ps, idx) => (
                <div key={ps.step}>
                  {/* Process image / coloured placeholder */}
                  {ps.image ? (
                    <img
                      src={ps.image}
                      alt={ps.step}
                      className="w-full h-auto object-cover rounded-xl border border-black/[0.03] shadow-sm"
                      style={{ marginBottom: 12 }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 160,
                        borderRadius: 12,
                        background: STEP_COLORS[idx % STEP_COLORS.length],
                        border: "1px solid rgba(0,0,0,0.06)",
                        overflow: "hidden",
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label={ps.step}
                    >
                      <span style={{ fontSize: 12, fontWeight: 300, color: "rgba(26,22,37,0.3)" }}>
                        [ image ]
                      </span>
                    </div>
                  )}

                  {/* Step label */}
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
                    {ps.step}
                  </p>

                  {/* Step description */}
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 300,
                      color: "rgba(26,22,37,0.55)",
                      lineHeight: 1.6,
                    }}
                  >
                    <RichText html={ps.text} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Final Design — dynamic children slot ───────── */}
        {children && (
          <section style={{ marginBottom: 64 }}>
            <SectionLabel>{finalSectionLabel}</SectionLabel>
            {/* Outer frame echoing the Figma gradient hero placeholder */}
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {children}
            </div>
          </section>
        )}

        <Hairline style={{ marginBottom: 64 }} />

        {/* ── Reflection ─────────────────────────────────── */}
        {reflectionColumns.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <SectionLabel>{reflectionSectionLabel}</SectionLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(reflectionColumns.length, 3)}, 1fr)`,
                gap: 32,
              }}
            >
              {reflectionColumns.map((col) => (
                <div key={col.title}>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "var(--foreground)",
                      marginBottom: 10,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {col.title}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 300,
                      color: "rgba(26,22,37,0.55)",
                      lineHeight: 1.65,
                    }}
                  >
                    <RichText html={col.body} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Back link ──────────────────────────────────── */}
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
