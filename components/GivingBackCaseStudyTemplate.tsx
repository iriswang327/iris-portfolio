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
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
    placeholderLabel: string;
    videoSrc?: string;
  };
}

export interface ReflectionCard {
  label: string;
  title: string;
  body: string;
}

export interface GivingBackCaseStudyProps {
  title: string;
  subtitle: string;
  metadata: GivingBackMetaCell[];
  overview: {
    heading: string;
    body: string;
    team: TeamMember[];
    bullets: string[];
  };
  theQuestion: {
    heading: string;
    body: string;
    hmwLabel: string;
    hmwHtml: string;
  };
  research: {
    heading: string;
    body: string;
    images: ImagePairItem[];
    themes: ThemeCard[];
    pullQuote: string;
    closingBody: string;
  };
  prototypeOne: {
    heading: string;
    body: string;
    images: ImagePairItem[];
    calloutLabel: string;
    calloutText: string;
  };
  testOne: {
    heading: string;
    body: string;
    highlightImage?: ImagePairItem;
    quotes: ParticipantQuote[];
    insights: InsightsSplit;
  };
  redefine: {
    heading: string;
    body: string;
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
    body: string;
    contributions: GivingBackContribution[];
  };
  testTwo: {
    heading: string;
    body: string;
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

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  color: "var(--foreground)",
  marginBottom: 10,
  letterSpacing: "-0.01em",
  maxWidth: 640,
  lineHeight: 1.45,
};

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
        poster={poster}
        controls
        playsInline
        muted
        preload="metadata"
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
}: {
  src: string;
  alt: string;
  placeholderLabel: string;
  wide?: boolean;
  videoSrc?: string;
}) {
  if (videoSrc) {
    return <CaseVideoPlayer src={videoSrc} poster={src} alt={alt} />;
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
}: {
  items: string[];
  accentMuted?: boolean;
}) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: 640 }}>
      {items.map((item) => (
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
              background: accentMuted ? "#BBBBBB" : ACCENT,
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

function InsightsSplitPanel({ insights }: { insights: InsightsSplit }) {
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
        <BulletList items={insights.worked} />
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
        <BulletList items={insights.didnt} accentMuted />
      </div>
    </div>
  );
}

export default function GivingBackCaseStudyTemplate(props: GivingBackCaseStudyProps) {
  const {
    title,
    subtitle,
    metadata,
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
            {subtitle}
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

        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Overview</SectionLabel>
          <p style={sectionHeadingStyle}>{overview.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 20 }}>{overview.body}</p>
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
          <BulletList items={overview.bullets} />
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionLabel>The Question</SectionLabel>
          <p style={sectionHeadingStyle}>{theQuestion.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 24 }}>{theQuestion.body}</p>
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
          <SectionLabel>Research · Empathize</SectionLabel>
          <p style={sectionHeadingStyle}>{research.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{research.body}</p>
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
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {theme.title}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 300,
                    color: "#888888",
                    lineHeight: 1.6,
                    marginBottom: 12,
                  }}
                >
                  {theme.body}
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
          <p
            style={bodyTextStyle}
            dangerouslySetInnerHTML={{ __html: research.closingBody }}
          />
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Prototype 01 · Define &amp; Ideate</SectionLabel>
          <p style={sectionHeadingStyle}>{prototypeOne.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{prototypeOne.body}</p>
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
                fontSize: 18,
                fontWeight: 300,
                color: "var(--foreground)",
                letterSpacing: "-0.01em",
                lineHeight: 1.45,
                margin: 0,
                maxWidth: 640,
                fontStyle: "italic",
              }}
            >
              {prototypeOne.calloutText}
            </p>
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Test · Cycle 01</SectionLabel>
          <p style={sectionHeadingStyle}>{testOne.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{testOne.body}</p>
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
          <InsightsSplitPanel insights={testOne.insights} />
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Redefine</SectionLabel>
          <p style={sectionHeadingStyle}>{redefine.heading}</p>
          <p
            style={{ ...bodyTextStyle, marginBottom: 24 }}
            dangerouslySetInnerHTML={{ __html: redefine.body }}
          />
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
              <BulletList items={redefine.needed} />
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
              <BulletList items={redefine.kept} />
            </div>
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Prototype 02 · Reframe</SectionLabel>
          <p style={sectionHeadingStyle}>{prototypeTwo.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 32 }}>{prototypeTwo.body}</p>
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
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div style={{ direction: "ltr" }}>
                <CaseMediaSlot
                  src={item.image.src}
                  alt={item.image.alt}
                  placeholderLabel={item.image.placeholderLabel}
                  videoSrc={item.image.videoSrc}
                />
              </div>
            </div>
          ))}
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Test · Cycle 02</SectionLabel>
          <p style={sectionHeadingStyle}>{testTwo.heading}</p>
          <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{testTwo.body}</p>
          <ImagePairGrid images={testTwo.images} />
          <QuoteGrid quotes={testTwo.quotes} />
          <InsightsSplitPanel insights={testTwo.insights} />
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Future Work</SectionLabel>
          <p style={sectionHeadingStyle}>{futureWork.heading}</p>
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
            <BulletList items={futureWork.items} />
          </div>
        </section>

        <Hairline style={{ marginBottom: 64 }} />

        <section style={{ marginBottom: 64 }}>
          <SectionLabel>Reflection</SectionLabel>
          <p style={{ ...sectionHeadingStyle, marginBottom: 24 }}>
            {reflection.heading}
          </p>
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
