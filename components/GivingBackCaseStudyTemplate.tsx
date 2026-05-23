"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GivingBackMetaCell {
  label: string;
  value: string;
}

export interface TeamMember {
  name: string;
  role?: string;
  isMe?: boolean;
}

export interface ThemeCard {
  num: string;
  title: string;
  body: string;
  quote: string;
  source: string;
}

export interface ParticipantQuote {
  text: string;
  source: string;
}

export interface ImagePairItem {
  src: string;
  alt: string;
  placeholderLabel: string;
  caption: string;
}

export interface InsightsSplit {
  worked: string[];
  didnt: string[];
}

export interface GivingBackContribution {
  step: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  image: {
    src?: string;
    alt: string;
    placeholderLabel: string;
    videoSrc?: string;
    posterSrc?: string;
  };
}

export interface ReflectionCard {
  label: string;
  title: string;
  body?: string;
  bullets?: string[];
}

export interface GivingBackHeroMetric {
  label: string;
  num: string;
  sub: string;
}

export interface GivingBackCaseStudyAccent {
  heroGradient: string;
  bulletColor?: string;
  heroEyebrow?: string;
  heroMetrics?: GivingBackHeroMetric[];
  heroImage?: {
    src: string;
    alt: string;
    placeholderLabel: string;
  };
}

export interface GivingBackCaseStudyProps {
  title: string;
  subtitle: string;
  subtitleHtml?: string;
  metadata: GivingBackMetaCell[];
  accent?: GivingBackCaseStudyAccent;
  overview: {
    heading: string;
    body?: string;
    team: TeamMember[];
    bullets: string[];
  };
  theQuestion: {
    heading: string;
    body?: string;
    bullets?: string[];
    hmwLabel: string;
    hmwHtml: string;
  };
  research: {
    heading: string;
    body?: string;
    bullets?: string[];
    images: ImagePairItem[];
    themes: ThemeCard[];
    pullQuote: string;
    closingBody?: string;
    closingBullets?: string[];
  };
  prototypeOne: {
    heading: string;
    body?: string;
    bullets?: string[];
    images: ImagePairItem[];
    calloutLabel: string;
    calloutText: string;
  };
  testOne: {
    heading: string;
    body?: string;
    bullets?: string[];
    highlightImage?: ImagePairItem;
    quotes: ParticipantQuote[];
    insights: InsightsSplit;
  };
  redefine: {
    heading: string;
    body?: string;
    bullets?: string[];
    hmwImage?: {
      src: string;
      alt: string;
      placeholderLabel: string;
      caption?: string;
    };
    originalHmw?: string;
    refinedHmw?: string;
    needed: string[];
    kept: string[];
  };
  prototypeTwo: {
    heading: string;
    body?: string;
    bullets?: string[];
    contributions: GivingBackContribution[];
  };
  testTwo: {
    heading: string;
    body?: string;
    bullets?: string[];
    images: ImagePairItem[];
    quotes: ParticipantQuote[];
    insights: InsightsSplit;
  };
  futureWork: {
    heading: string;
    label: string;
    items: string[];
  };
  reflection: {
    heading: string;
    cards: ReflectionCard[];
  };
  backHref?: string;
  backLabel?: string;
  footerCrumb?: string;
}

// ─── UT burnt-orange accent ────────────────────────────────────────────────────

const ACCENT = "#BF5700";
const ACCENT_TINT = "rgba(191,87,0,0.10)";
const ACCENT_TINT_2 = "rgba(191,87,0,0.04)";

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

function SectionIntro({ children, html }: { children?: React.ReactNode; html?: string }) {
  if (html) {
    return (
      <p
        className={richTextClassName}
        style={{
          fontSize: 13,
          fontWeight: 300,
          color: "rgba(26,22,37,0.45)",
          lineHeight: 1.65,
          maxWidth: 640,
          marginTop: 10,
          marginBottom: 0,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

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
  introHtml,
  accentColor,
}: {
  eyebrow: string;
  title?: string;
  intro?: string;
  introHtml?: string;
  accentColor?: string;
}) {
  return (
    <header style={{ marginBottom: title || intro || introHtml ? 28 : 20 }}>
      <SectionEyebrow accentColor={accentColor}>{eyebrow}</SectionEyebrow>
      {title && <SectionTitle>{title}</SectionTitle>}
      {introHtml && <SectionIntro html={introHtml} />}
      {!introHtml && intro && <SectionIntro>{intro}</SectionIntro>}
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

const bodyTextStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 300,
  color: "#444444",
  lineHeight: 1.75,
  maxWidth: 640,
};

const richTextClassName =
  "[&_strong]:font-medium [&_strong]:text-[var(--foreground)] [&_em]:italic [&_em]:text-[rgba(26,22,37,0.72)] [&_.lead]:text-[15px] [&_.lead]:font-normal [&_.lead]:tracking-[-0.01em] [&_.lead]:text-[var(--foreground)] [&_.muted]:text-[11px] [&_.muted]:text-[rgba(26,22,37,0.42)] [&_.accent]:font-medium [&_.accent]:text-[#BF5700] [&_.sm]:text-[11px] [&_.sm]:text-[rgba(26,22,37,0.5)]";

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

function HeroImpactBand({
  accent,
}: {
  accent: GivingBackCaseStudyAccent;
}) {
  return (
    <section
      className="relative mb-12 overflow-hidden rounded-2xl border border-[#BF5700]/20"
      style={{
        background: accent.heroGradient,
        boxShadow: "0 20px 50px -24px rgba(191,87,0,0.18), 0 12px 32px -20px rgba(0,0,0,0.08)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#BF5700]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-orange-200/30 blur-3xl"
      />
      <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-10">
        <div>
          {accent.heroEyebrow && (
            <SectionEyebrow accentColor={ACCENT}>{accent.heroEyebrow}</SectionEyebrow>
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
            <CaseImageSlot
              src={accent.heroImage.src}
              alt={accent.heroImage.alt}
              placeholderLabel={accent.heroImage.placeholderLabel}
              wide
            />
          </div>
        )}
      </div>
    </section>
  );
}

function CaseImageSlot({
  src,
  alt,
  placeholderLabel,
  wide,
}: {
  src: string;
  alt: string;
  placeholderLabel: string;
  wide?: boolean;
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
        aspectRatio: wide ? "16 / 9" : "4 / 3",
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
          color: "rgba(191,87,0,0.5)",
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
    <p
      style={{
        fontSize: 10,
        fontWeight: 400,
        color: "#BBBBBB",
        letterSpacing: "0.08em",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function CaseVideoPlayer({
  src,
  poster,
  alt,
}: {
  src: string;
  poster?: string;
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    void video.play();
    setHasStarted(true);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-black/[0.04] bg-neutral-950 shadow-sm">
      <video
        ref={videoRef}
        src={src}
        {...(poster ? { poster } : {})}
        controls
        playsInline
        muted
        preload={poster ? "metadata" : "auto"}
        className="block w-full h-auto"
        aria-label={alt}
        onPlay={() => setHasStarted(true)}
      />
      {!hasStarted && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex min-h-[44px] items-center justify-center bg-black/25 transition-colors hover:bg-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600/50 focus-visible:ring-offset-2"
          aria-label={`Play ${alt}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/92 text-[18px] text-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
            ▶
          </span>
        </button>
      )}
      {!hasStarted && (
        <p className="pointer-events-none absolute bottom-3 left-3 right-3 text-center text-[10px] font-normal tracking-[0.08em] uppercase text-white/70">
          Tap to play · Unmute for sound
        </p>
      )}
    </div>
  );
}

function CaseMediaSlot({
  src,
  alt,
  placeholderLabel,
  wide,
  videoSrc,
  posterSrc,
}: {
  src?: string;
  alt: string;
  placeholderLabel: string;
  wide?: boolean;
  videoSrc?: string;
  posterSrc?: string;
}) {
  if (videoSrc) {
    return (
      <CaseVideoPlayer
        src={videoSrc}
        poster={posterSrc}
        alt={alt}
      />
    );
  }

  if (!src) {
    return null;
  }

  return (
    <CaseImageSlot
      src={src}
      alt={alt}
      placeholderLabel={placeholderLabel}
      wide={wide}
    />
  );
}

function BulletList({
  items,
  accentMuted,
  compact,
  dotColor = ACCENT,
  leadIndex,
}: {
  items: string[];
  accentMuted?: boolean;
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
                background: accentMuted ? "#BBBBBB" : dotColor,
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

function ImagePairGrid({ images }: { images: ImagePairItem[] }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      style={{ marginTop: 24, marginBottom: 0 }}
    >
      {images.map((img) => (
        <div key={img.src} className="flex flex-col gap-2">
          <CaseImageSlot
            src={img.src}
            alt={img.alt}
            placeholderLabel={img.placeholderLabel}
          />
          <ImageCaption>{img.caption}</ImageCaption>
        </div>
      ))}
    </div>
  );
}

function QuoteGrid({ quotes }: { quotes: ParticipantQuote[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      style={{ marginTop: 24 }}
    >
      {quotes.map((q) => (
        <div
          key={`${q.source}-${q.text.slice(0, 24)}`}
          style={{
            padding: "20px 20px 18px",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 12,
            background: "#ffffff",
            position: "relative",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              fontSize: 32,
              fontWeight: 200,
              color: ACCENT_TINT,
              lineHeight: 1,
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              fontSize: 11,
              fontWeight: 300,
              fontStyle: "italic",
              color: "#444444",
              lineHeight: 1.55,
              margin: "0 0 12px",
              paddingRight: 20,
            }}
          >
            {q.text}
          </p>
          <p
            style={{
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#BBBBBB",
            }}
          >
            {q.source}
          </p>
        </div>
      ))}
    </div>
  );
}

function InsightsSplitPanel({
  insights,
  dotColor = ACCENT,
}: {
  insights: InsightsSplit;
  dotColor?: string;
}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
      style={{ marginTop: 24 }}
    >
      <div
        style={{
          padding: "20px 20px 18px",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 12,
          background: "#ffffff",
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: ACCENT,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          What Worked
        </p>
        <BulletList items={insights.worked} dotColor={dotColor} />
      </div>
      <div
        style={{
          padding: "20px 20px 18px",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 12,
          background: "#ffffff",
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: "#BBBBBB",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          What Didn&apos;t
        </p>
        <BulletList items={insights.didnt} accentMuted dotColor={dotColor} />
      </div>
    </div>
  );
}

export default function GivingBackCaseStudyTemplate(props: GivingBackCaseStudyProps) {
  const {
    title,
    subtitle,
    subtitleHtml,
    metadata,
    accent,
    overview,
    theQuestion,
    research,
    prototypeOne,
    testOne,
    redefine,
    prototypeTwo,
    testTwo,
    futureWork,
    reflection,
    backHref = "/experience",
    backLabel = "← Back to experience",
    footerCrumb,
  } = props;

  const eyebrowColor = accent?.bulletColor ?? ACCENT;
  const bulletColor = accent?.bulletColor ?? ACCENT;

  return (
    <div className="w-full" style={{ backgroundColor: "var(--background)", paddingTop: 56 }}>
      <div className="mx-auto w-full" style={{ maxWidth: 960, padding: "0 32px" }}>
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
            {subtitleHtml ? <RichText html={subtitleHtml} /> : subtitle}
          </p>
        </div>

        {metadata.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(metadata.length, 4)}, 1fr)`,
              borderTop: "0.5px solid rgba(0,0,0,0.06)",
              borderLeft: "0.5px solid rgba(0,0,0,0.06)",
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
          <SectionHeading
            eyebrow="Overview"
            title={overview.heading}
            accentColor={eyebrowColor}
          />
          {overview.body && (
            <p style={{ ...bodyTextStyle, marginBottom: 20 }}>{overview.body}</p>
          )}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 20 }}>
            {overview.team.map((member) => (
              <span
                key={member.name}
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
                {member.role && (
                  <span
                    style={{
                      color: member.isMe ? "rgba(255,255,255,0.7)" : "#BBBBBB",
                      fontWeight: 300,
                      marginRight: 6,
                    }}
                  >
                    {member.role}
                  </span>
                )}
                {member.name}
              </span>
            ))}
          </div>
          <BulletList items={overview.bullets} dotColor={bulletColor} leadIndex={0} />
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="The Question"
            title={theQuestion.heading}
            accentColor={eyebrowColor}
          />
          {theQuestion.body && (
            <p style={{ ...bodyTextStyle, marginBottom: 20 }}>{theQuestion.body}</p>
          )}
          {theQuestion.bullets && theQuestion.bullets.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <BulletList items={theQuestion.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
          <div
            style={{
              padding: "28px 32px",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 16,
              background: "#ffffff",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: ACCENT,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {theQuestion.hmwLabel}
            </p>
            <p
              style={{
                fontSize: 18,
                fontWeight: 300,
                color: "var(--foreground)",
                letterSpacing: "-0.015em",
                lineHeight: 1.4,
                margin: 0,
                maxWidth: 640,
              }}
              dangerouslySetInnerHTML={{ __html: theQuestion.hmwHtml }}
            />
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Research · Empathize"
            title={research.heading}
            accentColor={eyebrowColor}
          />
          {research.body && (
            <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{research.body}</p>
          )}
          {research.bullets && research.bullets.length > 0 && (
            <div style={{ marginTop: research.body ? 16 : 0, marginBottom: 0 }}>
              <BulletList items={research.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
          <ImagePairGrid images={research.images} />
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            style={{ marginTop: 32 }}
          >
            {research.themes.map((theme) => (
              <div
                key={theme.num}
                style={{
                  padding: "20px 20px 18px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  background: "#ffffff",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: ACCENT,
                    letterSpacing: "0.08em",
                    marginBottom: 10,
                  }}
                >
                  {theme.num}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--foreground)",
                    marginBottom: 8,
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {theme.title}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: "rgba(26,22,37,0.55)",
                    lineHeight: 1.55,
                    marginBottom: 12,
                  }}
                >
                  <RichText html={theme.body} />
                </p>
                <div
                  style={{
                    paddingLeft: 12,
                    borderLeft: `2px solid ${ACCENT_TINT}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "#888888",
                      lineHeight: 1.5,
                      margin: "0 0 6px",
                    }}
                  >
                    {theme.quote}
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 400,
                      letterSpacing: "0.06em",
                      color: "#BBBBBB",
                    }}
                  >
                    {theme.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <blockquote
            style={{
              position: "relative",
              margin: "32px 0 24px",
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
              &ldquo;{research.pullQuote}&rdquo;
            </p>
          </blockquote>
          {research.closingBody && (
            <p
              style={bodyTextStyle}
              dangerouslySetInnerHTML={{ __html: research.closingBody }}
            />
          )}
          {research.closingBullets && research.closingBullets.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <BulletList items={research.closingBullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Prototype 01 · Define & Ideate"
            title={prototypeOne.heading}
            accentColor={eyebrowColor}
          />
          {prototypeOne.body && (
            <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{prototypeOne.body}</p>
          )}
          {prototypeOne.bullets && prototypeOne.bullets.length > 0 && (
            <div style={{ marginTop: prototypeOne.body ? 16 : 0 }}>
              <BulletList items={prototypeOne.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
          <ImagePairGrid images={prototypeOne.images} />
          <div
            style={{
              marginTop: 24,
              padding: "24px 28px",
              background: ACCENT_TINT,
              borderRadius: 16,
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: ACCENT,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {prototypeOne.calloutLabel}
            </p>
            <p
              style={{
                fontSize: 17,
                fontWeight: 300,
                color: "var(--foreground)",
                letterSpacing: "-0.01em",
                lineHeight: 1.45,
                margin: 0,
                maxWidth: 640,
              }}
            >
              <RichText html={prototypeOne.calloutText} />
            </p>
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Test · Cycle 01"
            title={testOne.heading}
            accentColor={eyebrowColor}
          />
          {testOne.body && (
            <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{testOne.body}</p>
          )}
          {testOne.bullets && testOne.bullets.length > 0 && (
            <div style={{ marginTop: testOne.body ? 16 : 0 }}>
              <BulletList items={testOne.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
          {testOne.highlightImage && (
            <div className="mt-6 mb-2 flex flex-col gap-2">
              <CaseImageSlot
                src={testOne.highlightImage.src}
                alt={testOne.highlightImage.alt}
                placeholderLabel={testOne.highlightImage.placeholderLabel}
                wide
              />
              <ImageCaption>{testOne.highlightImage.caption}</ImageCaption>
            </div>
          )}
          {testOne.quotes.length > 0 && <QuoteGrid quotes={testOne.quotes} />}
          <InsightsSplitPanel insights={testOne.insights} dotColor={bulletColor} />
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Redefine"
            title={redefine.heading}
            accentColor={eyebrowColor}
          />
          {redefine.body && (
            <p
              style={{ ...bodyTextStyle, marginBottom: 20 }}
              dangerouslySetInnerHTML={{ __html: redefine.body }}
            />
          )}
          {redefine.bullets && redefine.bullets.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <BulletList items={redefine.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
          {redefine.hmwImage ? (
            <div className="mb-6 flex flex-col gap-2">
              <CaseImageSlot
                src={redefine.hmwImage.src}
                alt={redefine.hmwImage.alt}
                placeholderLabel={redefine.hmwImage.placeholderLabel}
                wide
              />
              {redefine.hmwImage.caption && (
                <ImageCaption>{redefine.hmwImage.caption}</ImageCaption>
              )}
            </div>
          ) : (
            redefine.originalHmw &&
            redefine.refinedHmw && (
              <div
                style={{
                  padding: "28px 32px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 16,
                  background: "#ffffff",
                  marginBottom: 24,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                  <div
                    style={{
                      padding: "16px 20px",
                      borderRadius: 12,
                      background: ACCENT_TINT_2,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: "#BBBBBB",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}
                    >
                      Original
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "var(--foreground)",
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      {redefine.originalHmw}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: 20,
                      color: ACCENT,
                      fontWeight: 300,
                      textAlign: "center",
                    }}
                    className="hidden md:block"
                  >
                    →
                  </span>
                  <div
                    style={{
                      padding: "16px 20px",
                      borderRadius: 12,
                      background: ACCENT_TINT,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: ACCENT,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}
                    >
                      Refined
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "var(--foreground)",
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      {redefine.refinedHmw}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              style={{
                padding: "20px 20px 18px",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: 12,
                background: "#ffffff",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: ACCENT,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                What We Needed
              </p>
              <BulletList items={redefine.needed} dotColor={bulletColor} />
            </div>
            <div
              style={{
                padding: "20px 20px 18px",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: 12,
                background: "#ffffff",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: ACCENT,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                What We Kept
              </p>
              <BulletList items={redefine.kept} dotColor={bulletColor} />
            </div>
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Prototype 02 · Reframe"
            title={prototypeTwo.heading}
            accentColor={eyebrowColor}
          />
          {prototypeTwo.body && (
            <p style={{ ...bodyTextStyle, marginBottom: 20 }}>{prototypeTwo.body}</p>
          )}
          {prototypeTwo.bullets && prototypeTwo.bullets.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <BulletList items={prototypeTwo.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
          {prototypeTwo.contributions.map((item, index) => (
            <div
              key={item.step}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
              style={{
                marginBottom:
                  index < prototypeTwo.contributions.length - 1 ? 32 : 0,
                direction: index % 2 === 1 ? "rtl" : "ltr",
              }}
            >
              <div style={{ direction: "ltr" }}>
                <StepEyebrow accentColor={eyebrowColor}>{item.step}</StepEyebrow>
                <SubsectionTitle>{item.heading}</SubsectionTitle>
                <div style={{ marginTop: 10 }}>
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
                      {para}
                    </p>
                  ))}
                  {item.bullets && item.bullets.length > 0 && (
                    <BulletList items={item.bullets} dotColor={bulletColor} compact />
                  )}
                </div>
              </div>
              <div style={{ direction: "ltr" }}>
                <CaseMediaSlot
                  src={item.image.src}
                  alt={item.image.alt}
                  placeholderLabel={item.image.placeholderLabel}
                  videoSrc={item.image.videoSrc}
                  posterSrc={item.image.posterSrc}
                />
              </div>
            </div>
          ))}
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Test · Cycle 02"
            title={testTwo.heading}
            accentColor={eyebrowColor}
          />
          {testTwo.body && (
            <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{testTwo.body}</p>
          )}
          {testTwo.bullets && testTwo.bullets.length > 0 && (
            <div style={{ marginTop: testTwo.body ? 16 : 0 }}>
              <BulletList items={testTwo.bullets} dotColor={bulletColor} leadIndex={0} />
            </div>
          )}
          <ImagePairGrid images={testTwo.images} />
          {testTwo.quotes.length > 0 && <QuoteGrid quotes={testTwo.quotes} />}
          <InsightsSplitPanel insights={testTwo.insights} dotColor={bulletColor} />
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Future Work"
            title={futureWork.heading}
            accentColor={eyebrowColor}
          />
          <div
            style={{
              marginTop: 24,
              padding: "24px 28px",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 16,
              background: "#ffffff",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: ACCENT,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {futureWork.label}
            </p>
            <BulletList items={futureWork.items} dotColor={bulletColor} />
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionHeading
            eyebrow="Reflection"
            title={reflection.heading}
            accentColor={eyebrowColor}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {reflection.cards.map((card) => (
              <div
                key={card.label}
                style={{
                  padding: "20px 20px 18px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  background: "#ffffff",
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
