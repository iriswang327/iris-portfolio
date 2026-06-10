"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  GEMINI_CRITIQUE_RESPONSES,
  GEMINI_FEEDBACK_QUOTE,
  GEMINI_HERO_LEDE,
  GEMINI_HERO_TAGS,
  GEMINI_HERO_TITLE_LINES,
  GEMINI_IN_APP_INTRO,
  GEMINI_ITERATIONS_PUNCH,
  GEMINI_NAV_SECTIONS,
  GEMINI_NEXT_PUNCH,
  GEMINI_PAIN_POINTS,
  GEMINI_PROBLEM_INTRO,
  GEMINI_PROBLEM_PUNCH,
  GEMINI_SOLUTIONS_PUNCH,
  GEMINI_SOLUTION_SURFACES,
  GEMINI_STRATEGY_QA,
  GEMINI_SYSTEM_STEPS,
  GEMINI_WHAT_I_DID,
  GEMINI_WHAT_PUNCH,
  GEMINI_WHATS_NEXT,
  GEMINI_WHY_INTRO,
  GEMINI_WHY_PUNCH,
} from "@/lib/gemini-case-content";

const METADATA = [
  { label: "Timeline", value: "Spring 2026" },
  { label: "Role", value: "Product design · self-directed" },
  { label: "Focus", value: "Strategy + UI" },
  { label: "Method", value: "Critique, then iterate" },
] as const;

const MEDIA_SIZES = "(min-width: 1100px) min(100vw - 280px, 1200px), 100vw";

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
  muted = false,
  draft = false,
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
  muted?: boolean;
  draft?: boolean;
  className?: string;
  quality?: number;
  sizes?: string;
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
        {GEMINI_NAV_SECTIONS.map((section) => {
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

function SkipToSolutions({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="case-study-skip-cta" onClick={onClick}>
      <span className="case-study-skip-cta__icon" aria-hidden="true">
        ↓
      </span>
      <span className="case-study-skip-cta__label">Skip to solutions</span>
    </button>
  );
}

export default function GeminiCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>(GEMINI_NAV_SECTIONS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const elements = GEMINI_NAV_SECTIONS.map((section) => sectionRefs.current[section.id]).filter(
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
    <article className="case-study case-study--gemini">
      <div className="case-study-gemini-glow" aria-hidden="true" />

      <div className="case-study-confido-shell">
        <ConfidoNav activeId={activeSection} onNavigate={scrollToSection} />

        <div className="case-study-confido-main">
          <Link href="/" className="case-study-confido-back case-study-confido-back--mobile">
            ← Back to Design
          </Link>

          <div className="case-study-confido-stage case-study-confido-stage--gemini">
            <Image
              src="/images/gemini-hero-mockup.png"
              alt="The Gemini Blog — laptop mockup showing redesigned blog with breaking news and featured stories"
              width={2048}
              height={1152}
              quality={95}
              sizes={MEDIA_SIZES}
              className="case-study-confido-stage__image"
              priority
            />
          </div>

          <div className="case-study-confido-intro">
            <h1 className="case-study-confido-title">
              {GEMINI_HERO_TITLE_LINES.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>
            <div className="case-study-confido-aside">
              <p className="case-study-confido-lede">{GEMINI_HERO_LEDE}</p>
              <div className="case-study-confido-tags">
                {GEMINI_HERO_TAGS.map((tag) => (
                  <span key={tag} className="case-study-confido-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <SkipToSolutions onClick={() => scrollToSection("solutions")} />
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
            id="problem"
            ref={registerSection("problem")}
            className="case-study-confido-section"
            aria-labelledby="gemini-problem-punch"
          >
            <p className="case-study-confido-label">Problem</p>
            <ConfidoPunch id="gemini-problem-punch" html={GEMINI_PROBLEM_PUNCH} />
            <p className="case-study-confido-body case-study-confido-body--last">
              {GEMINI_PROBLEM_INTRO}
            </p>
            <div className="case-study-confido-problems">
              {GEMINI_PAIN_POINTS.map((card) => (
                <article key={card.num} className="case-study-confido-problem-card">
                  <p className="case-study-confido-problem-kicker">Problem #{card.num}</p>
                  <h3 className="case-study-confido-problem-claim">{card.claim}</h3>
                  <p className="case-study-confido-problem-body">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="what"
            ref={registerSection("what")}
            className="case-study-confido-section"
            aria-labelledby="gemini-what-punch"
          >
            <p className="case-study-confido-label">What I Did</p>
            <ConfidoPunch id="gemini-what-punch" html={GEMINI_WHAT_PUNCH} />
            <ul className="case-study-confido-bullets">
              {GEMINI_WHAT_I_DID.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="case-study-compare-grid case-study-compare-grid--wide">
              <CaseFigure
                src="/images/gemini-blog-before.png"
                alt="The Gemini Blog before redesign — flat grid of posts with mixed corner radii on filters and cards"
                caption="Before · The Gemini Blog"
                width={1200}
                height={750}
                priority
                muted
                sizes={MEDIA_SIZES}
              />
              <CaseFigure
                src="/images/gemini-markets-blog.png"
                alt="Gemini Markets page after redesign — breaking news, featured stories, category pills on cards"
                caption="After · Markets page"
                width={1200}
                height={750}
                priority
                sizes={MEDIA_SIZES}
              />
            </div>
          </section>

          <section
            id="why"
            ref={registerSection("why")}
            className="case-study-confido-section"
            aria-labelledby="gemini-why-punch"
          >
            <p className="case-study-confido-label">Why</p>
            <ConfidoPunch id="gemini-why-punch" html={GEMINI_WHY_PUNCH} />
            <p className="case-study-confido-body">{GEMINI_WHY_INTRO}</p>
            <div className="case-study-confido-qa">
              {GEMINI_STRATEGY_QA.map((item) => (
                <article key={item.q} className="case-study-confido-qa-item">
                  <h3 className="case-study-confido-qa-q">{item.q}</h3>
                  <p className="case-study-confido-qa-a">{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="solutions"
            ref={registerSection("solutions")}
            className="case-study-confido-section"
            aria-labelledby="gemini-solutions-punch"
          >
            <p className="case-study-confido-label">Solutions</p>
            <ConfidoPunch id="gemini-solutions-punch" html={GEMINI_SOLUTIONS_PUNCH} />
            <ol className="case-study-confido-solutions">
              {GEMINI_SOLUTION_SURFACES.map((solution) => (
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
            <div className="case-study-compare-grid case-study-compare-grid--wide">
              <CaseFigure
                src="/images/gemini-process-1.png"
                alt="Before feedback — news panel always open on the trading screen"
                caption="Before · always open"
                width={800}
                height={500}
                muted
                sizes={MEDIA_SIZES}
              />
              <CaseFigure
                src="/images/gemini-process-2.png"
                alt="After feedback — banner and expandable news card"
                caption="After · banner + card"
                width={800}
                height={500}
                sizes={MEDIA_SIZES}
              />
            </div>

            <p className="case-study-confido-label case-study-confido-label--follow">
              In-app integration
            </p>
            <p className="case-study-confido-body">{GEMINI_IN_APP_INTRO}</p>
            <div className="case-study-teaser-grid case-study-teaser-grid--gemini-in-app">
              <CaseFigure
                className="case-study-figure--in-app-mock"
                src="/images/gemini-mobile-dark.png"
                alt="Gemini in-app dark mode news card on Bitcoin asset page"
                caption="In-app · dark mode"
                width={720}
                height={1080}
                sizes={MEDIA_SIZES}
              />
              <CaseFigure
                className="case-study-figure--in-app-mock"
                src="/images/gemini-mobile-light.png"
                alt="Gemini in-app light mode news card on Bitcoin asset page"
                caption="In-app · light mode"
                width={720}
                height={1080}
                sizes={MEDIA_SIZES}
              />
            </div>

            <p className="case-study-confido-label case-study-confido-label--follow">
              How data moves
            </p>
            <p className="case-study-confido-body case-study-confido-body--last">
              Before polishing screens, I mapped how a headline gets tagged, tied to a ticker, and
              shown only when it&apos;s relevant.
            </p>
            <div
              className="case-study-flow case-study-flow--indexed"
              role="img"
              aria-label="News flows from sources through cleaning and matching to the UI"
            >
              {GEMINI_SYSTEM_STEPS.map((step, index) => (
                <div key={step.slug} className="case-study-flow-step-wrap">
                  <div className="case-study-flow-step">
                    <p className="case-study-flow-kicker">
                      {step.num} · {step.slug}
                    </p>
                    <p className="case-study-flow-title">{step.title}</p>
                    <p className="case-study-flow-detail">{step.detail}</p>
                  </div>
                  {index < GEMINI_SYSTEM_STEPS.length - 1 && (
                    <span className="case-study-flow-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section
            id="iterations"
            ref={registerSection("iterations")}
            className="case-study-confido-section"
            aria-labelledby="gemini-iterations-punch"
          >
            <p className="case-study-confido-label">Iterations</p>
            <ConfidoPunch id="gemini-iterations-punch" html={GEMINI_ITERATIONS_PUNCH} />
            <div className="case-study-critique-grid">
              <blockquote className="case-study-confido-quote">
                <p>&ldquo;{GEMINI_FEEDBACK_QUOTE}&rdquo;</p>
                <footer className="case-study-confido-quote-source">
                  — Ex–senior product designer, Gemini
                </footer>
              </blockquote>
              <div className="case-study-critique-cards case-study-critique-cards--stack">
                {GEMINI_CRITIQUE_RESPONSES.map((item) => (
                  <article
                    key={item.area}
                    className="case-study-critique-card experience-glass-panel"
                  >
                    <p className="case-study-critique-area">{item.area}</p>
                    <p className="case-study-critique-proof">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
            <p className="case-study-confido-label case-study-confido-label--follow">
              Final design
            </p>
            <p className="case-study-confido-body">
              I built parts in code to stress-test long headlines and breaking alerts — things
              static mocks hide.
            </p>
            <CaseFigure
              className="case-study-figure--wide"
              src="/images/gemini-desktop-all.png"
              alt="Final Gemini news hub with breaking tags, category filters, and card hierarchy"
              caption="News hub · tags + breaking"
              width={1200}
              height={750}
              quality={90}
              sizes={MEDIA_SIZES}
            />
          </section>

          <section
            id="next"
            ref={registerSection("next")}
            className="case-study-confido-section case-study-confido-section--last"
            aria-labelledby="gemini-next-punch"
          >
            <p className="case-study-confido-label">What&apos;s Next</p>
            <ConfidoPunch id="gemini-next-punch" html={GEMINI_NEXT_PUNCH} />
            <p className="case-study-confido-body case-study-confido-body--last">
              Still a concept until relevance and behavior actually move.
            </p>
            <div className="case-study-next-grid">
              {GEMINI_WHATS_NEXT.map((item) => (
                <article key={item.title} className="case-study-next-card experience-glass-panel">
                  <h3 className="case-study-next-title">{item.title}</h3>
                  <p className="case-study-next-body">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="case-study-gate case-study-gate--editorial experience-glass-panel">
            <p className="case-study-gate-body">
              Questions?{" "}
              <a
                href="mailto:iriswang32@gmail.com"
                className="case-study-gate-link case-study-gate-link--gemini"
              >
                Reach out here!
              </a>
            </p>
          </aside>

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
