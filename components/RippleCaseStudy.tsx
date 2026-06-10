"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RIPPLE_AWARD_EMOJI } from "@/lib/ripple-copy";
import {
  RIPPLE_CONTEXT_BODY,
  RIPPLE_CONTEXT_PUNCH,
  RIPPLE_DESIGN_PUNCH,
  RIPPLE_HERO_LEDE,
  RIPPLE_HERO_TAGS,
  RIPPLE_HERO_TITLE_LINES,
  RIPPLE_IMPACT_STATS,
  RIPPLE_NAV_SECTIONS,
  RIPPLE_OUTCOME_PUNCH,
  RIPPLE_PROBLEM_CARDS,
  RIPPLE_PROBLEM_PUNCH,
  RIPPLE_PROBLEM_QUOTE,
  RIPPLE_PROCESS_PUNCH,
  RIPPLE_REFLECTION_PUNCH,
  RIPPLE_SOLUTIONS,
} from "@/lib/ripple-case-content";

const METADATA = [
  { label: "Timeline", value: "Fall 2024" },
  { label: "Role", value: "Product Designer" },
  { label: "Focus", value: "User Research & Product Design" },
  { label: "Program", value: "Convergent Build Team" },
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

function ConfidoPunch({ html, id }: { html: string; id?: string }) {
  return (
    <h2
      id={id}
      className="case-study-confido-punch"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CaseFigure({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  className = "",
  quality,
  sizes,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  quality?: number;
  sizes?: string;
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
          quality={quality}
          sizes={sizes}
        />
      </div>
      <figcaption className="case-study-caption">{caption}</figcaption>
    </figure>
  );
}

function ConfidoNav({
  activeId,
  onNavigate,
}: {
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav className="case-study-confido-nav" aria-label="Case study sections">
      <Link href="/" className="case-study-confido-nav-back">
        ← Back
      </Link>
      <ol className="case-study-confido-nav-list">
        {RIPPLE_NAV_SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`case-study-confido-nav-link${isActive ? " case-study-confido-nav-link--active" : ""}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(section.id);
                }}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function SkipToOutcome({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="case-study-skip-cta" onClick={onClick}>
      <span className="case-study-skip-cta__icon" aria-hidden="true">
        ↓
      </span>
      <span className="case-study-skip-cta__label">Skip to outcome</span>
    </button>
  );
}

export default function RippleCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>(RIPPLE_NAV_SECTIONS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const elements = RIPPLE_NAV_SECTIONS.map((section) => sectionRefs.current[section.id]).filter(
      Boolean
    ) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  const registerSection =
    (id: string) =>
    (node: HTMLElement | null): void => {
      sectionRefs.current[id] = node;
    };

  return (
    <article className="case-study case-study--ripple">
      <div className="case-study-confido-shell">
        <ConfidoNav activeId={activeSection} onNavigate={scrollToSection} />

        <div className="case-study-confido-main">
          <Link href="/" className="case-study-confido-back case-study-confido-back--mobile">
            ← Back to Design
          </Link>

          <div className="case-study-confido-stage">
            <Image
              src="/images/ripple-hero-mockup.png"
              alt="Ripple product features — laptop mockup showing recruit, match, and collab UI"
              width={2048}
              height={1152}
              quality={95}
              sizes="(min-width: 1100px) min(100vw - 280px, 1200px), 100vw"
              className="case-study-confido-stage__image"
              priority
            />
          </div>

          <div className="case-study-confido-intro">
            <h1 className="case-study-confido-title">
              {RIPPLE_HERO_TITLE_LINES.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>
            <div className="case-study-confido-aside">
              <p className="case-study-confido-lede">{RIPPLE_HERO_LEDE}</p>
              <div className="case-study-confido-tags">
                {RIPPLE_HERO_TAGS.map((tag) => (
                  <span key={tag} className="case-study-confido-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <SkipToOutcome onClick={() => scrollToSection("outcome")} />
            </div>
          </div>

          <dl className="case-study-confido-meta">
            {METADATA.map((item) => (
              <div key={item.label}>
                <dt className="case-study-confido-meta-label">{item.label}</dt>
                <dd className="case-study-confido-meta-value">{item.value}</dd>
              </div>
            ))}
          </dl>

          <section
            id="context"
            ref={registerSection("context")}
            className="case-study-confido-section"
            aria-labelledby="ripple-context-punch"
          >
            <p className="case-study-confido-label">Context</p>
            <ConfidoPunch id="ripple-context-punch" html={RIPPLE_CONTEXT_PUNCH} />
            <p className="case-study-confido-body case-study-confido-body--last">
              {RIPPLE_CONTEXT_BODY}
            </p>
            <CaseFigure
              src="/images/over-left.png"
              alt="Ripple brand overview — logo, tagline, and purple wave identity system"
              caption="Brand · insights that impact, matches that matter"
              width={1896}
              height={1056}
              className="case-study-figure--showcase-brand"
            />
          </section>

          <section
            id="problem"
            ref={registerSection("problem")}
            className="case-study-confido-section"
            aria-labelledby="ripple-problem-punch"
          >
            <p className="case-study-confido-label">Problem</p>
            <ConfidoPunch id="ripple-problem-punch" html={RIPPLE_PROBLEM_PUNCH} />
            <blockquote className="case-study-confido-quote">
              <p>&ldquo;{RIPPLE_PROBLEM_QUOTE}&rdquo;</p>
            </blockquote>
            <div className="case-study-confido-problems">
              {RIPPLE_PROBLEM_CARDS.map((card) => (
                <article key={card.num} className="case-study-confido-problem-card">
                  <p className="case-study-confido-problem-kicker">Problem #{card.num}</p>
                  <h3 className="case-study-confido-problem-claim">{card.claim}</h3>
                  <p className="case-study-confido-problem-body">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="process"
            ref={registerSection("process")}
            className="case-study-confido-section"
            aria-labelledby="ripple-process-punch"
          >
            <p className="case-study-confido-label">Process</p>
            <ConfidoPunch id="ripple-process-punch" html={RIPPLE_PROCESS_PUNCH} />
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

          <section
            id="design"
            ref={registerSection("design")}
            className="case-study-confido-section"
            aria-labelledby="ripple-design-punch"
          >
            <p className="case-study-confido-label">Design</p>
            <ConfidoPunch id="ripple-design-punch" html={RIPPLE_DESIGN_PUNCH} />
            <ol className="case-study-confido-solutions">
              {RIPPLE_SOLUTIONS.map((solution) => (
                <li key={solution.num} className="case-study-confido-solution">
                  <p className="case-study-confido-solution-kicker">
                    Solution #{solution.num} · {solution.kicker}
                  </p>
                  <h3 className="case-study-confido-solution-title">{solution.title}</h3>
                  <p
                    className="case-study-confido-solution-payoff"
                    dangerouslySetInnerHTML={{ __html: solution.payoff }}
                  />
                </li>
              ))}
            </ol>
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

          <section
            id="outcome"
            ref={registerSection("outcome")}
            className="case-study-confido-section"
            aria-labelledby="ripple-outcome-punch"
          >
            <p className="case-study-confido-label">Impact</p>
            <div className="case-study-confido-impact">
              {RIPPLE_IMPACT_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="case-study-confido-impact-value">{stat.value}</p>
                  <p className="case-study-confido-impact-label">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="case-study-confido-label case-study-confido-label--follow">Outcome</p>
            <ConfidoPunch id="ripple-outcome-punch" html={RIPPLE_OUTCOME_PUNCH} />

            <div className="case-study-outcome-media-stack">
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

              <div className="case-study-outcome-stage">
                <CaseFigure
                  src="/images/ripple-victory.png"
                  alt="Ripple team at Demo Day — Best Presentation award"
                  caption="Best Presentation · 18 teams"
                  width={2048}
                  height={1366}
                  quality={90}
                  sizes="(min-width: 1100px) min(100vw - 280px, 1200px), 100vw"
                  className="case-study-figure--outcome"
                />
                <span
                  className="case-study-outcome-trophy"
                  aria-label="Best Presentation at Demo Day"
                >
                  {RIPPLE_AWARD_EMOJI}
                </span>
              </div>
            </div>
          </section>

          <section
            id="reflection"
            ref={registerSection("reflection")}
            className="case-study-confido-section case-study-confido-section--last"
            aria-labelledby="ripple-reflection-punch"
          >
            <p className="case-study-confido-label">Reflection</p>
            <ConfidoPunch id="ripple-reflection-punch" html={RIPPLE_REFLECTION_PUNCH} />
            <div className="case-study-reflection-grid">
              {REFLECTION.map((item) => (
                <article
                  key={item.title}
                  className="case-study-reflection-card experience-glass-panel"
                >
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
            <Link href="/" className="case-study-confido-back case-study-confido-back--footer">
              ← Back to Design
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}
