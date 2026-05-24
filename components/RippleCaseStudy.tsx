"use client";

import Link from "next/link";
import Image from "next/image";
import { RIPPLE_AWARD_EMOJI } from "@/lib/ripple-copy";

const METADATA = [
  { label: "Timeline", value: "Fall 2024" },
  { label: "Role", value: "Product Designer" },
  { label: "Focus", value: "User Research & Product Design" },
  { label: "Program", value: "Texas Convergent · Build Team" },
] as const;

const PROBLEM_CARDS = [
  {
    title: "The Core Friction",
    body: "Designers either skip user research due to recruitment overhead, or rely on low-quality convenience samples. Nothing lightweight existed for matching high-intent participants to specific study needs.",
  },
  {
    title: "The Strategic Goal",
    body: "Propose a two-sided concept where designers post research studies and participants self-select based on relevant experience — designing toward recruitment that takes hours, not weeks.",
  },
] as const;

const PROCESS_STEPS = [
  {
    step: "01 / DISCOVERY & MAPPING",
    text: "Interviewed designers and potential participants to map the full recruitment journey — identifying where time was lost and what signals mattered most for study-participant fit.",
    image: "/images/ripple-process-1.png",
    alt: "Ripple discovery and journey mapping artifacts",
    width: 900,
    height: 560,
  },
  {
    step: "02 / USER FLOW DESIGN",
    text: "Defined the dual-track flow: designer-side study creation and participant-side browsing. Focused on reducing the number of steps between intent and enrollment to under three taps.",
    image: "/images/ripple-process-2.png",
    alt: "Ripple dual-track user flow diagrams",
    width: 900,
    height: 560,
  },
  {
    step: "03 / INTERFACE ITERATION",
    text: "Designed and iterated the study card system and profile matching UI with cross-functional feedback from Convergent's product and engineering teams.",
    image: "/images/ripple-process-3.png",
    alt: "Ripple study card and profile matching UI iterations",
    width: 900,
    height: 560,
  },
  {
    step: "04 / PITCH & ITERATION",
    text: "Practiced pitching the concept and core flows with product and engineering leads before presenting to judges, campus peers, and industry guests at Demo Day.",
    image: "/images/ripple-proccess-4.png",
    alt: "Ripple pitch deck and Demo Day presentation",
    width: 900,
    height: 560,
  },
] as const;

const FLOW_SCREENS = [
  {
    src: "/images/ripple-flow-2.png",
    label: "02 / Professional Network Directory",
    width: 700,
    height: 520,
  },
  {
    src: "/images/ripple-flow-3.png",
    label: "03 / Visual Interface Index",
    width: 700,
    height: 520,
  },
  {
    src: "/images/ripple-flow-4.png",
    label: "04 / Matching Loop (Designer Perspective)",
    width: 700,
    height: 520,
  },
  {
    src: "/images/ripple-flow-5.png",
    label: "05 / Matching Loop (Recruiter Perspective)",
    width: 700,
    height: 520,
  },
] as const;

const REFLECTION = [
  {
    title: "What Worked",
    bullets: [
      "Two-sided marketplace framing from the start",
      "Designed for designers and participants at once",
      "Surfaced flow tension a single-sided concept would miss",
    ],
  },
  {
    title: "What I'd Push Further",
    bullets: [
      "Matching stayed manual in the prototype",
      "Algorithmic surfacing by background tags",
      "Less browse-only discovery",
    ],
  },
  {
    title: "What I Learned",
    bullets: [
      "Design needs initiative — taking ownership of your ideas can help an entire team win",
      "Constant iteration is key to growth",
      "Presenting may be scary, but the experience is worth it",
    ],
  },
] as const;

function CaseLabel({ children }: { children: React.ReactNode }) {
  return <p className="case-study-label">{children}</p>;
}

function CaseHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="case-study-heading">{children}</h2>;
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
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`case-study-figure ${className}`.trim()}>
      <div className="case-study-frame">
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

export default function RippleCaseStudy() {
  return (
    <article className="case-study case-study--ripple">
      <div className="case-study-shell case-study-shell--editorial">
        <Link href="/" className="case-study-back">
          ← Back to Design
        </Link>

        <header className="case-study-hero">
          <h1 className="case-study-title">Ripple</h1>
          <p className="case-study-subtitle">
            Bridging the gap between UX designers and high-intent research participants.
          </p>
          <p className="case-study-disclaimer">
            Build Team concept · pitched at Demo Day, not a shipped product
          </p>
        </header>

        <div className="case-study-meta">
          {METADATA.map((item) => (
            <div key={item.label} className="case-study-meta-cell">
              <p className="case-study-meta-label">{item.label}</p>
              <p className="case-study-meta-value">{item.value}</p>
            </div>
          ))}
        </div>

        <section
          className="case-study-section case-study-section--visual case-study-section--ripple-showcase"
          aria-label="Ripple product preview"
        >
          <CaseLabel>Product</CaseLabel>
          <CaseHeading>At a glance</CaseHeading>
          <p className="case-study-scroll-hint">
            Pitch deck overview — brand, product pillars, and hi-fi UI below.
          </p>

          <p className="case-study-ripple-outcome-line">
            <span aria-hidden="true">{RIPPLE_AWARD_EMOJI}</span>
            <span>Best Presentation · 18 Build Teams · Demo Day</span>
          </p>

          <div className="case-study-ripple-showcase-grid">
            <CaseFigure
              src="/images/over-left.png"
              alt="Ripple brand overview — logo, tagline, and purple wave identity system"
              caption="Brand · insights that impact, matches that matter"
              width={1896}
              height={1056}
              priority
              className="case-study-figure--showcase-brand"
            />
            <CaseFigure
              src="/images/overview.png"
              alt="Ripple product features — recruit, match, and collab with explore UI mockups"
              caption="Solution · recruit, match, collab"
              width={960}
              height={540}
              priority
              className="case-study-figure--showcase-features"
            />
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section case-study-section--primary">
          <CaseLabel>Context</CaseLabel>
          <CaseHeading>Why we proposed it</CaseHeading>
          <p className="case-study-lede case-study-lede--flush">
            UX designers consistently struggle to recruit the right participants for meaningful
            research. Ripple is a two-sided recruitment concept we designed over one Texas Convergent
            Build Team semester — discovery, flows, hi-fi UI, and a Demo Day pitch — aimed at
            connecting designers to domain-relevant users without the cold-outreach grind that
            keeps research from happening.
          </p>
        </section>

        <CaseHairline />

        <section className="case-study-section">
          <CaseLabel>Problem</CaseLabel>
          <blockquote className="case-study-feedback case-study-feedback--thesis">
            <p className="case-study-feedback-text">
              &ldquo;Research that never happens is the most expensive kind. This concept is built
              to close the gap between the question and the person who can answer it.&rdquo;
            </p>
          </blockquote>
        </section>

        <CaseHairline />

        <section className="case-study-section">
          <CaseLabel>Problem space</CaseLabel>
          <CaseHeading>Friction vs. goal</CaseHeading>
          <div className="case-study-tension-grid">
            {PROBLEM_CARDS.map((card) => (
              <article key={card.title} className="case-study-tension-card experience-glass-panel">
                <h3 className="case-study-tension-title">{card.title}</h3>
                <p className="case-study-tension-body">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section case-study-section--visual">
          <CaseLabel>Process</CaseLabel>
          <CaseHeading>From discovery to Demo Day</CaseHeading>
          <ol className="case-study-timeline">
            {PROCESS_STEPS.map((item) => (
              <li key={item.step} className="case-study-timeline-item">
                <p className="case-study-timeline-step">{item.step}</p>
                <div className="case-study-timeline-content">
                  <p className="case-study-timeline-text">{item.text}</p>
                  <CaseFigure
                    src={item.image}
                    alt={item.alt}
                    caption={item.step}
                    width={item.width}
                    height={item.height}
                    className="case-study-figure--timeline"
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <CaseHairline />

        <section className="case-study-section case-study-section--visual">
          <CaseLabel>Design</CaseLabel>
          <CaseHeading>Hi-fi screens</CaseHeading>
          <div className="case-study-ripple-mosaic">
            <CaseFigure
              className="case-study-figure--ripple-hero"
              src="/images/ripple-flow-1.png"
              alt="Ripple core entry hub and user onboarding canvas"
              caption="01 / Core Entry Hub & User Onboarding Canvas"
              width={900}
              height={620}
            />
            <div className="case-study-ripple-mosaic-grid">
              {FLOW_SCREENS.map((screen) => (
                <CaseFigure
                  key={screen.src}
                  src={screen.src}
                  alt={screen.label}
                  caption={screen.label}
                  width={screen.width}
                  height={screen.height}
                />
              ))}
            </div>
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section case-study-section--visual">
          <CaseLabel>Demo</CaseLabel>
          <CaseHeading>Concept walkthrough</CaseHeading>
          <div className="case-study-video-stage">
            <div className="case-study-video-wrap">
              <video
                controls
                className="case-study-video"
                aria-label="Ripple concept walkthrough video"
              >
                <source src="/videos/ripple-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section case-study-section--visual">
          <CaseLabel>Outcome</CaseLabel>
          <CaseHeading>Demo Day</CaseHeading>
          <div className="case-study-outcome-stage">
            <CaseFigure
              src="/images/ripple-victory.png"
              alt="Ripple team at Demo Day — Best Presentation award"
              caption="Best Presentation · 18 teams"
              width={640}
              height={480}
              className="case-study-figure--outcome"
            />
            <span
              className="case-study-outcome-trophy"
              aria-label="Best Presentation at Demo Day"
            >
              {RIPPLE_AWARD_EMOJI}
            </span>
          </div>
        </section>

        <CaseHairline />

        <section className="case-study-section">
          <CaseLabel>Reflection</CaseLabel>
          <CaseHeading>What stuck</CaseHeading>
          <div className="case-study-reflection-grid">
            {REFLECTION.map((item) => (
              <article key={item.title} className="case-study-reflection-card experience-glass-panel">
                <h3 className="case-study-reflection-title">{item.title}</h3>
                <ul className="case-study-reflection-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <footer className="case-study-footer">
          <Link href="/" className="case-study-back">
            ← Back to Design
          </Link>
        </footer>
      </div>
    </article>
  );
}
