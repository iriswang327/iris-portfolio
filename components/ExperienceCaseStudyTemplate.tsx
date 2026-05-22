"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CaseStudyMetaCell {
  label: string;
  value: string;
}

export interface CaseStudyTocItem {
  id: string;
  label: string;
}

export interface CaseStudyProcessRow {
  num: string;
  phase: string;
  desc: string;
}

export interface CaseStudySolutionTile {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  placeholderLabel: string;
  placeholderGradient: string;
}

export interface CaseStudyStat {
  num: string;
  label: string;
}

export interface CaseStudyReflectionCard {
  eyebrow: string;
  title: string;
  body: string;
}

export interface ExperienceCaseStudyProps {
  /** Page-scoped accent color — e.g. sand for Tower & Bridge */
  accent: string;
  accent2: string;
  accentTint: string;
  /** Atmospheric gradient orbs */
  atmosphere?: string;
  backHref?: string;
  backLabel?: string;
  avatar: string;
  title: string;
  subline: string;
  metadata: CaseStudyMetaCell[];
  toc: CaseStudyTocItem[];
  context: {
    heading: string;
    body: string;
    constraints: string[];
  };
  problem: {
    quote: string;
  };
  process: {
    heading: string;
    rows: CaseStudyProcessRow[];
  };
  solution: {
    heading: string;
    body: string;
    tiles: CaseStudySolutionTile[];
  };
  impact: {
    heading: string;
    callout: string;
    stats: CaseStudyStat[];
  };
  reflection: {
    heading: string;
    cards: CaseStudyReflectionCard[];
  };
  footerBreadcrumb: string;
}

// ─── Solution tile with image fallback ───────────────────────────────────────

function SolutionTile({
  image,
  imageAlt,
  title,
  description,
  placeholderLabel,
  placeholderGradient,
}: CaseStudySolutionTile) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="case-solution-tile">
      <div
        className="case-solution-tile-img"
        style={
          imageFailed
            ? { background: placeholderGradient }
            : undefined
        }
      >
        {!imageFailed && (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImageFailed(true)}
          />
        )}
        {imageFailed && (
          <span className="case-solution-placeholder-label">{placeholderLabel}</span>
        )}
      </div>
      <div className="case-solution-caption">
        <p className="case-solution-caption-title">{title}</p>
        <p className="case-solution-caption-desc">{description}</p>
      </div>
    </div>
  );
}

// ─── Main template ───────────────────────────────────────────────────────────

export default function ExperienceCaseStudyTemplate({
  accent,
  accent2,
  accentTint,
  atmosphere,
  backHref = "/experience",
  backLabel = "← Back to experience",
  avatar,
  title,
  subline,
  metadata,
  toc,
  context,
  problem,
  process,
  solution,
  impact,
  reflection,
  footerBreadcrumb,
}: ExperienceCaseStudyProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    pageRef.current?.style.setProperty("--case-accent", accent);
    pageRef.current?.style.setProperty("--case-accent-2", accent2);
    pageRef.current?.style.setProperty("--case-accent-tint", accentTint);
    pageRef.current?.style.setProperty("--accent", accent);
    if (atmosphere) {
      pageRef.current?.style.setProperty("--case-atmosphere", atmosphere);
    }
  }, [accent, accent2, accentTint, atmosphere]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[data-theme]");
    const visibility = new Map<string, number>();
    sections.forEach((section) => visibility.set(section.dataset.theme ?? "", 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const theme = (entry.target as HTMLElement).dataset.theme;
          if (theme) visibility.set(theme, entry.intersectionRatio);
        });

        let best: string | null = null;
        let bestRatio = -1;
        visibility.forEach((ratio, name) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = name;
          }
        });

        if (best) setActiveSection(best);
      },
      {
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1.0],
        rootMargin: "-20% 0px -30% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - 40, behavior: "smooth" });
  };

  return (
    <div ref={pageRef} className="case-study-page">
      <div className="case-study-atmosphere" aria-hidden="true" />

      <div className="case-study-shell">
        <div className="case-study-rail-column">
          <aside className="case-study-rail rail">
            <Link href={backHref} className="case-back-link">
              {backLabel}
            </Link>

            <nav className="toc" id="toc" aria-label="Case study sections">
              {toc.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  data-target={id}
                  className={activeSection === id ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(id);
                  }}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>
        </div>

        <main className="case-study-main">
          <header className="case-header">
            <div className="case-header-top">
              <div className="case-avatar" aria-hidden="true">
                {avatar}
              </div>
              <h1 className="case-title">{title}</h1>
            </div>
            <p className="case-subline">{subline}</p>

            <div className="case-meta-grid">
              {metadata.map((cell) => (
                <div key={cell.label} className="case-meta-cell">
                  <p className="case-meta-key">{cell.label}</p>
                  <p className="case-meta-value">{cell.value}</p>
                </div>
              ))}
            </div>
          </header>

          <section id="context" data-theme="context">
            <p className="case-section-label">01 / Context</p>
            <h2 className="case-section-h">{context.heading}</h2>
            <p className="case-body-text">{context.body}</p>
            <ul className="case-constraints">
              {context.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="problem" data-theme="problem">
            <p className="case-section-label">02 / The Problem</p>
            <blockquote className="case-pull-quote">
              <p>{problem.quote}</p>
            </blockquote>
          </section>

          <section id="process" data-theme="process">
            <p className="case-section-label">03 / Process</p>
            <h2 className="case-section-h">{process.heading}</h2>
            <div className="case-process">
              {process.rows.map((row) => (
                <div key={row.num} className="case-process-row">
                  <p className="case-process-num">{row.num}</p>
                  <p className="case-process-phase">{row.phase}</p>
                  <p className="case-process-desc">{row.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="solution" data-theme="solution">
            <p className="case-section-label">04 / Solution</p>
            <h2 className="case-section-h">{solution.heading}</h2>
            <p className="case-body-text">{solution.body}</p>
            <div className="case-solution-grid">
              {solution.tiles.map((tile) => (
                <SolutionTile key={tile.title} {...tile} />
              ))}
            </div>
          </section>

          <section id="impact" data-theme="impact">
            <p className="case-section-label">05 / Impact</p>
            <h2 className="case-section-h">{impact.heading}</h2>
            <div className="case-impact-callout">
              <span className="case-impact-ico" aria-hidden="true">
                📊
              </span>
              <span className="case-impact-msg">{impact.callout}</span>
            </div>
            <div className="case-stats-grid">
              {impact.stats.map((stat) => (
                <div key={stat.label} className="case-stat">
                  <p className="case-stat-num">{stat.num}</p>
                  <p className="case-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="reflection" data-theme="reflection">
            <p className="case-section-label">06 / Reflection</p>
            <h2 className="case-section-h">{reflection.heading}</h2>
            <div className="case-reflection-grid">
              {reflection.cards.map((card) => (
                <article key={card.title} className="case-reflection-card">
                  <p className="case-reflection-eyebrow">{card.eyebrow}</p>
                  <h3 className="case-reflection-title">{card.title}</h3>
                  <p className="case-reflection-body">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <footer className="case-footer">
            <Link href={backHref} className="case-footer-link">
              {backLabel}
            </Link>
            <span className="case-footer-breadcrumb">{footerBreadcrumb}</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
