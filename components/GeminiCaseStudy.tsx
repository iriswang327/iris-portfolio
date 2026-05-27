"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  GEMINI_CASE_SECTIONS,
  GEMINI_CRITIQUE_RESPONSES,
  GEMINI_FEEDBACK_QUOTE,
  GEMINI_IN_APP_INTRO,
  GEMINI_PAIN_POINTS,
  GEMINI_PROBLEM_INTRO,
  GEMINI_SOLUTION_SURFACES,
  GEMINI_STRATEGY_QA,
  GEMINI_SYSTEM_STEPS,
  GEMINI_WHAT_I_DID,
  GEMINI_WHATS_NEXT,
  GEMINI_WHY_INTRO,
} from "@/lib/gemini-case-content";

const METADATA = [
  { label: "Timeline", value: "Spring 2026" },
  { label: "Role", value: "Product design · self-directed" },
  { label: "Focus", value: "Strategy + UI" },
  { label: "Method", value: "Critique, then iterate" },
] as const;

function SectionHead({
  num,
  label,
  title,
  titleId,
}: {
  num: string;
  label: string;
  title: string;
  titleId?: string;
}) {
  return (
    <header className="case-study-section-head">
      <p className="case-study-section-eyebrow">
        <span className="case-study-section-num">{num}</span>
        {label}
      </p>
      <h2 id={titleId} className="case-study-heading">
        {title}
      </h2>
    </header>
  );
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

function GeminiToc({
  activeId,
  onNavigate,
}: {
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav className="case-study-toc" aria-label="Case study contents">
      <p className="case-study-toc-label">contents</p>
      <ol className="case-study-toc-list">
        {GEMINI_CASE_SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`case-study-toc-link${isActive ? " case-study-toc-link--active" : ""}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(section.id);
                }}
              >
                <span className="case-study-toc-num">{section.num}</span>
                <span className="case-study-toc-title">{section.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function GeminiCaseStudy() {
  const [activeSection, setActiveSection] = useState<string>(GEMINI_CASE_SECTIONS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const elements = GEMINI_CASE_SECTIONS.map((section) => sectionRefs.current[section.id]).filter(
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
        rootMargin: "-20% 0px -55% 0px",
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

      <div className="case-study-shell case-study-shell--editorial">
        <Link href="/" className="case-study-back">
          ← Back to Design
        </Link>

        <header className="case-study-hero case-study-hero--gemini">
          <h1 className="case-study-title">
            <span className="case-study-title-accent">Gemini</span> · News Integration
          </h1>
          <p className="case-study-disclaimer">
            Self-directed case study · Gemini crypto exchange · not affiliated
          </p>
        </header>

        <div className="case-study-meta case-study-meta--gemini">
          {METADATA.map((item) => (
            <div key={item.label} className="case-study-meta-cell">
              <p className="case-study-meta-label">{item.label}</p>
              <p className="case-study-meta-value">{item.value}</p>
            </div>
          ))}
        </div>

        <CaseHairline />

        <div className="case-study-body-layout">
          <GeminiToc activeId={activeSection} onNavigate={scrollToSection} />

          <div className="case-study-reading">
            <section
              id="problem"
              ref={registerSection("problem")}
              className="case-study-section"
              aria-labelledby="gemini-problem-heading"
            >
              <SectionHead
                num="01"
                label="The Problem"
                title="What broke my flow."
                titleId="gemini-problem-heading"
              />
              <p className="case-study-body case-study-body--intro">{GEMINI_PROBLEM_INTRO}</p>

              <p className="case-study-inline-label">what stood out</p>
              <ol className="case-study-indexed-list">
                {GEMINI_PAIN_POINTS.map((point, index) => (
                  <li key={point.title}>
                    <span className="case-study-indexed-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="case-study-indexed-copy">
                      <p className="case-study-indexed-title">{point.title}</p>
                      <p className="case-study-indexed-body">{point.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <CaseHairline />

            <section
              id="what"
              ref={registerSection("what")}
              className="case-study-section"
              aria-labelledby="gemini-what-heading"
            >
              <SectionHead
                num="02"
                label="What I Did"
                title="Reorganized the blog."
                titleId="gemini-what-heading"
              />

              <ul className="case-study-bullet-list case-study-bullet-list--gemini">
                {GEMINI_WHAT_I_DID.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="case-study-inline-label">before → after</p>
              <div className="case-study-compare-grid case-study-compare-grid--wide">
                <CaseFigure
                  src="/images/gemini-blog-before.png"
                  alt="The Gemini Blog before redesign — flat grid of posts with mixed corner radii on filters and cards"
                  caption="Before · The Gemini Blog"
                  width={1200}
                  height={750}
                  priority
                  muted
                />
                <CaseFigure
                  src="/images/gemini-markets-blog.png"
                  alt="Gemini Markets page after redesign — breaking news, featured stories, category pills on cards"
                  caption="After · Markets page"
                  width={1200}
                  height={750}
                  priority
                />
              </div>
            </section>

            <CaseHairline />

            <section
              id="why"
              ref={registerSection("why")}
              className="case-study-section"
              aria-labelledby="gemini-why-heading"
            >
              <SectionHead
                num="03"
                label="Why I Did It"
                title="Bringing Strategy to Design."
                titleId="gemini-why-heading"
              />
              <p className="case-study-body case-study-body--last">{GEMINI_WHY_INTRO}</p>

              <div className="case-study-qa-stack">
                {GEMINI_STRATEGY_QA.map((item) => (
                  <article key={item.q} className="case-study-qa-item">
                    <h3 className="case-study-qa-q">{item.q}</h3>
                    <p className="case-study-qa-a">{item.a}</p>
                  </article>
                ))}
              </div>
            </section>

            <CaseHairline />

            <section
              id="solutions"
              ref={registerSection("solutions")}
              className="case-study-section case-study-section--visual"
              aria-labelledby="gemini-solutions-heading"
            >
              <SectionHead
                num="04"
                label="Solutions"
                title="Three surfaces — banner, card, tags."
                titleId="gemini-solutions-heading"
              />

              <ol className="case-study-indexed-list case-study-indexed-list--solutions">
                {GEMINI_SOLUTION_SURFACES.map((surface) => (
                  <li key={surface.kicker}>
                    <div className="case-study-indexed-copy">
                      <p className="case-study-indexed-title case-study-indexed-title--solution">
                        <span className="case-study-indexed-kicker">{surface.kicker} — </span>
                        {surface.title}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="case-study-inline-label">before → after</p>
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
                  caption="After · banner + card"
                  width={800}
                  height={500}
                />
              </div>

              <div className="case-study-subsection">
                <p className="case-study-inline-label case-study-inline-label--flush">
                  going further · in-app integration
                </p>
                <p className="case-study-body case-study-body--last">{GEMINI_IN_APP_INTRO}</p>

                <div className="case-study-teaser-grid case-study-teaser-grid--gemini-in-app">
                  <CaseFigure
                    className="case-study-figure--in-app-mock"
                    src="/images/gemini-mobile-dark.png"
                    alt="Gemini in-app dark mode news card on Bitcoin asset page"
                    caption="In-app · dark mode"
                    width={720}
                    height={1080}
                  />
                  <CaseFigure
                    className="case-study-figure--in-app-mock"
                    src="/images/gemini-mobile-light.png"
                    alt="Gemini in-app light mode news card on Bitcoin asset page"
                    caption="In-app · light mode"
                    width={720}
                    height={1080}
                  />
                </div>

                <p className="case-study-inline-label case-study-inline-label--flush">how data moves</p>
                <p className="case-study-body case-study-body--last">
                  Before polishing screens, I mapped how a headline gets tagged, tied to a ticker,
                  and shown only when it&apos;s relevant.
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
              </div>
            </section>

            <CaseHairline />

            <section
              id="iterations"
              ref={registerSection("iterations")}
              className="case-study-section"
              aria-labelledby="gemini-iterations-heading"
            >
              <SectionHead
                num="05"
                label="Iterations"
                title="Feedback from an ex–senior product designer at Gemini"
                titleId="gemini-iterations-heading"
              />

              <div className="case-study-critique-grid">
                <blockquote className="case-study-feedback case-study-feedback--editorial">
                  <p className="case-study-feedback-text">&ldquo;{GEMINI_FEEDBACK_QUOTE}&rdquo;</p>
                  <footer className="case-study-feedback-source">
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

              <p className="case-study-inline-label">final design</p>
              <p className="case-study-body case-study-body--tight">
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
              />
            </section>

            <CaseHairline />

            <section
              id="next"
              ref={registerSection("next")}
              className="case-study-section case-study-section--last"
              aria-labelledby="gemini-next-heading"
            >
              <SectionHead
                num="06"
                label="What's Next"
                title="Two tests before I'd call this real."
                titleId="gemini-next-heading"
              />
              <p className="case-study-body case-study-body--last">
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
              <Link href="/" className="case-study-back">
                ← Back to Design
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
