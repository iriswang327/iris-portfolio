"use client";

import Link from "next/link";
import Image from "next/image";

const METADATA = [
  { label: "Timeline", value: "Spring 2026" },
  { label: "Role", value: "Product Design · Self-Directed" },
  { label: "Focus", value: "Product Strategy & UI" },
  { label: "Method", value: "Critique + iteration" },
] as const;

const SYSTEM_STEPS = [
  { title: "News sources", detail: "APIs, wires, editorial CMS" },
  { title: "Clean data", detail: "Tags, timestamps, asset links" },
  { title: "Match context", detail: "Ticker, alerts, relevance" },
  { title: "Show when it matters", detail: "Hidden until user asks" },
] as const;

const PAIN_POINTS = [
  "The blog lives outside the app — you leave Gemini right when you might trade.",
  "Market-moving news looks the same as generic company posts. Nothing signals urgency.",
  "Inconsistent visuals and no clear hierarchy. It reads like a content dump, not a tool.",
] as const;

const CRITIQUE_RESPONSES = [
  {
    area: "Product strategy",
    body: "I stopped treating this like a blog refresh. I wrote out why news belongs on the exchange, how it could affect trading volume, and pointed to Coinbase — they already do in-app news. Gemini's blog sits outside the app.",
  },
  {
    area: "Visual polish",
    body: "I dropped the always-open text block. Instead: a Markets section on the homepage, banners for big alerts, and an expandable card on the asset page. Tags and icons so news doesn't look like a buy/sell button.",
  },
] as const;

function CaseLabel({ children }: { children: React.ReactNode }) {
  return <p className="case-study-label">{children}</p>;
}

function CaseHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="case-study-heading">{children}</h2>;
}

function CaseSubheading({ children }: { children: React.ReactNode }) {
  return <h3 className="case-study-subheading">{children}</h3>;
}

function CaseHairline() {
  return <div className="case-study-hairline" aria-hidden="true" />;
}

function CaseFigure({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  muted = false,
  draft = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  priority?: boolean;
  muted?: boolean;
  draft?: boolean;
  className?: string;
}) {
  return (
    <figure className={`case-study-figure ${className}`.trim()}>
      <div
        className={[
          "case-study-frame",
          muted ? "case-study-frame--muted" : "",
          draft ? "case-study-frame--draft" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="case-study-image"
          priority={priority}
        />
      </div>
      <figcaption className="case-study-caption">{caption}</figcaption>
    </figure>
  );
}

export default function GeminiCaseStudy() {
  return (
    <article className="case-study case-study--gemini">
      <div className="case-study-shell case-study-shell--editorial">
        <Link href="/" className="case-study-back">
          ← Back to Design
        </Link>

        <header className="case-study-hero case-study-hero--editorial">
          <div className="case-study-hero-copy">
            <h1 className="case-study-title">Gemini · News Integration</h1>
            <p className="case-study-subtitle case-study-subtitle--wide">
              A self-directed concept — what if crypto news lived inside Gemini&apos;s trading app,
              without cluttering the workspace?
            </p>
            <p className="case-study-disclaimer">
              Portfolio case study · not a Gemini commission
            </p>
          </div>
          <div className="case-study-meta case-study-meta--inline">
            {METADATA.map((item) => (
              <div key={item.label} className="case-study-meta-cell">
                <p className="case-study-meta-label">{item.label}</p>
                <p className="case-study-meta-value">{item.value}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="case-study-section case-study-section--visual" aria-label="Design previews">
          <CaseLabel>Interface</CaseLabel>
          <CaseHeading>Explorations before feedback</CaseHeading>
          <p className="case-study-scroll-hint">
            Scroll for design after feedback from an ex-Gemini senior product designer.
          </p>
          <div className="case-study-teaser-grid case-study-teaser-grid--draft">
            <CaseFigure
              className="case-study-figure--wide"
              src="/images/gemini-desktop-markets.png"
              alt="Early Gemini markets page with integrated news stream"
              caption="Markets · news stream"
              width={1200}
              height={750}
              priority
              draft
            />
            <CaseFigure
              src="/images/gemini-mobile-dark.png"
              alt="Early Gemini in-app dark mode news card"
              caption="In-app dark mode"
              width={600}
              height={900}
              priority
              draft
            />
            <CaseFigure
              src="/images/gemini-mobile-light.png"
              alt="Early Gemini in-app light mode news card"
              caption="In-app light mode"
              width={600}
              height={900}
              draft
            />
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section case-study-section--primary">
          <CaseLabel>Context</CaseLabel>
          <CaseHeading>Why this project</CaseHeading>

          <div className="case-study-context-grid case-study-context-grid--editorial">
            <p className="case-study-lede case-study-lede--flush">
              As someone with no crypto background, I wanted to learn more about Gemini. The blog
              made me click out quickly — that&apos;s where this project started.
            </p>

            <div className="case-study-context-panel experience-glass-panel">
              <CaseSubheading>What I identified</CaseSubheading>
              <ul className="case-study-pain-list case-study-pain-list--panel">
                {PAIN_POINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="case-study-strategy-block case-study-strategy-block--editorial">
            <CaseSubheading>Questions I worked through</CaseSubheading>
            <ul className="case-study-strategy-list">
              <li>
                <span className="case-study-strategy-q">Why put news on the exchange?</span>
                <span className="case-study-strategy-a">
                  Leaving the app to read news breaks your flow. Keep people here when they&apos;re
                  already paying attention.
                </span>
              </li>
              <li>
                <span className="case-study-strategy-q">Would it move volume?</span>
                <span className="case-study-strategy-a">
                  If macro news — rate cuts, ETF filings — shows up next to the asset you&apos;re
                  trading, you might act on it instead of opening another tab first.
                </span>
              </li>
              <li>
                <span className="case-study-strategy-q">Has anyone tried this?</span>
                <span className="case-study-strategy-a">
                  Coinbase ships news in-app. Gemini has a blog, but it lives outside trading and
                  reads like generic company content.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section case-study-section--compact">
          <CaseLabel>Systems</CaseLabel>
          <CaseHeading>How data moves</CaseHeading>
          <p className="case-study-body case-study-body--last">
            I made sure to map how news enters the product. Rather than a static feed, I believed
            the UI should hold up when headlines are long or alerts come in fast.
          </p>
          <div
            className="case-study-flow"
            role="img"
            aria-label="News flows from sources through cleaning and matching to the UI"
          >
            {SYSTEM_STEPS.map((step, index) => (
              <div key={step.title} className="case-study-flow-step-wrap">
                <div className="case-study-flow-step">
                  <p className="case-study-flow-title">{step.title}</p>
                  <p className="case-study-flow-detail">{step.detail}</p>
                </div>
                {index < SYSTEM_STEPS.length - 1 && (
                  <span className="case-study-flow-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section">
          <CaseLabel>Feedback</CaseLabel>
          <CaseHeading>From a senior designer at Gemini</CaseHeading>

          <div className="case-study-critique-grid">
            <blockquote className="case-study-feedback case-study-feedback--editorial">
              <p className="case-study-feedback-text">
                &ldquo;Push yourself on product strategy — why news on the exchange, your theory on
                volume, what competitors have proven. And visually — could this be a banner or
                homepage section instead of something always open?&rdquo;
              </p>
              <footer className="case-study-feedback-source">
                — Senior product designer, Gemini
              </footer>
            </blockquote>

            <div className="case-study-critique-cards case-study-critique-cards--stack">
              {CRITIQUE_RESPONSES.map((item) => (
                <article key={item.area} className="case-study-critique-card experience-glass-panel">
                  <p className="case-study-critique-area">{item.area}</p>
                  <p className="case-study-critique-proof">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section case-study-section--visual">
          <CaseLabel>Iteration</CaseLabel>
          <CaseHeading>Before → after</CaseHeading>
          <div className="case-study-compare-grid case-study-compare-grid--wide">
            <CaseFigure
              src="/images/gemini-process-1.png"
              alt="Before feedback — news panel always open on the trading screen"
              caption="Before · always open"
              width={800}
              height={500}
              muted
            />
            <CaseFigure
              src="/images/gemini-process-2.png"
              alt="After feedback — banner and expandable news card"
              caption="After · banner + expandable card"
              width={800}
              height={500}
            />
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section case-study-section--visual">
          <CaseLabel>Final design</CaseLabel>
          <CaseHeading>After feedback</CaseHeading>
          <p className="case-study-body case-study-body--tight">
            I built parts in code to test long headlines and breaking alerts — stuff that&apos;s
            hard to fake in static mocks.
          </p>
          <CaseFigure
            className="case-study-figure--wide"
            src="/images/gemini-desktop-all.png"
            alt="Final Gemini blog homepage with breaking news tags and card hierarchy"
            caption="Blog hub · tags + breaking news"
            width={1200}
            height={750}
          />
        </section>

        <aside className="case-study-gate case-study-gate--editorial experience-glass-panel">
          <p className="case-study-gate-body">
            For more information,{" "}
            <a href="mailto:iriswang32@gmail.com" className="case-study-gate-link text-gradient-ihwn">
              feel free to reach out
            </a>
            !
          </p>
        </aside>

        <footer className="case-study-footer">
          <Link href="/" className="case-study-back">
            ← Back to Design
          </Link>
        </footer>
      </div>
    </article>
  );
}
