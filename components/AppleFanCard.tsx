"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AppleConceptQuestionModal from "@/components/AppleConceptQuestionModal";
import {
  APPLE_CONCEPTS,
  APPLE_FAN_LAYOUT_COMPACT,
  APPLE_FAN_LAYOUT_FLOW,
  APPLE_FAN_LAYOUT_MOBILE,
  APPLE_FAN_QUESTIONS_LAYOUT_COMPACT,
  APPLE_FAN_QUESTIONS_LAYOUT_FLOW,
  APPLE_FAN_QUESTIONS_LAYOUT_MOBILE,
  APPLE_HOVER_LABEL,
  APPLE_PILL,
  APPLE_QUESTION_COPY,
  APPLE_TAP_HINT,
} from "@/lib/apple-copy";

function AppleLogo() {
  return (
    <svg
      width="52"
      height="62"
      viewBox="0 0 52 62"
      fill="white"
      style={{ opacity: 0.08 }}
      aria-hidden="true"
    >
      <path d="M38.4 15.8c-2.2 2.7-5.8 4.8-9.3 4.5-.4-3.5 1.4-7.2 3.5-9.6 2.4-2.8 6.4-4.8 9.7-4.8.4 3.7-1.2 7.4-3.9 9.9zM41.6 21.5c-5.3-.3-9.9 3-12.4 3s-6.4-2.8-10.7-2.8c-5.4.1-10.4 3.1-13.2 8-5.6 9.6-1.4 23.8 4 31.9 2.6 3.8 5.8 8.1 9.9 7.9 4-.2 5.5-2.5 10.3-2.5 4.8 0 6.2 2.5 10.4 2.4 4.3-.1 7-3.8 9.6-7.6 3-4.4 4.2-8.6 4.3-8.8-.1 0-8.3-3.2-8.3-12.8 0-8 6.4-11.9 6.7-12.1-3.7-5.4-9.4-5.7-10.6-5.6z" />
    </svg>
  );
}

const FAN_SPRING = { type: "spring" as const, stiffness: 340, damping: 28 };

export default function AppleFanCard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hoveredDeck, setHoveredDeck] = useState(false);
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [frontId, setFrontId] = useState<string | null>(null);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMobile || !expanded) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setExpanded(false);
        setFrontId(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMobile, expanded]);

  const isOpen = isMobile ? expanded : hoveredDeck || focused;

  const useFlowLayout = !isMobile && isOpen && frontId !== null;

  const fanLayout = isMobile
    ? APPLE_FAN_LAYOUT_MOBILE
    : useFlowLayout
      ? APPLE_FAN_LAYOUT_FLOW
      : APPLE_FAN_LAYOUT_COMPACT;

  const questionsLayout = isMobile
    ? APPLE_FAN_QUESTIONS_LAYOUT_MOBILE
    : useFlowLayout
      ? APPLE_FAN_QUESTIONS_LAYOUT_FLOW
      : APPLE_FAN_QUESTIONS_LAYOUT_COMPACT;

  const conceptLabels = APPLE_CONCEPTS.map((concept) => concept.title).join(", ");

  const handleMainActivate = () => {
    if (!isMobile) return;
    if (expanded) setFrontId(null);
    setExpanded((open) => !open);
  };

  const handleMiniFocus = (id: string) => {
    setFrontId(id);
  };

  const handleDeckEnter = () => {
    if (!isMobile) setHoveredDeck(true);
  };

  const handleDeckLeave = () => {
    if (!isMobile) {
      setHoveredDeck(false);
      setFrontId(null);
    }
  };

  const mainInner = (
    <div className={`apple-fan-main-inner${isOpen && !isMobile ? " apple-fan-main-inner--hover" : ""}`}>
      <div className="apple-fan-main-media">
        <div className="project-card-frame apple-fan-main-frame">
          <img
            src="/images/apple-thumbnail.png"
            alt=""
            className="h-full w-full object-contain rounded-lg shadow-sm border border-black/[0.01]"
          />
        </div>

        <div className="apple-fan-main-logo" aria-hidden="true">
          <AppleLogo />
        </div>
      </div>

      {!isMobile ? (
        <motion.div
          className="apple-fan-main-overlay"
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          aria-hidden={!isOpen}
        >
          <span className="apple-fan-main-lock" aria-hidden="true">
            🔒
          </span>
          <span className="apple-fan-main-overlay-text">{APPLE_HOVER_LABEL}</span>
          <span className="apple-fan-main-arrow" aria-hidden="true">
            →
          </span>
        </motion.div>
      ) : null}

      <div className="apple-fan-pill project-card-pill">{APPLE_PILL}</div>

      {isMobile && !expanded ? (
        <span className="apple-fan-tap-hint project-card-pill">
          {APPLE_TAP_HINT}
          <span aria-hidden="true"> →</span>
        </span>
      ) : null}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`apple-fan-root${isMobile ? " apple-fan-root--mobile" : ""}${expanded ? " apple-fan-root--expanded" : ""}`}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
    >
      <div
        className="apple-fan-deck"
        role="group"
        aria-label={`${APPLE_PILL}. ${isMobile ? APPLE_TAP_HINT : APPLE_HOVER_LABEL}. Concepts: ${conceptLabels}`}
        tabIndex={0}
        onMouseEnter={handleDeckEnter}
        onMouseLeave={handleDeckLeave}
      >
        <motion.div
          className="apple-fan-main"
          initial={false}
          animate={{
            scale: isOpen && !reduceMotion && !isMobile ? 0.96 : 1,
            x: isOpen && !reduceMotion && !isMobile ? -4 : 0,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          {isMobile ? (
            <button
              type="button"
              className="apple-fan-main-trigger apple-fan-main-trigger--interactive"
              aria-expanded={expanded}
              aria-label={`${APPLE_PILL}. ${APPLE_TAP_HINT}`}
              onClick={handleMainActivate}
            >
              {mainInner}
            </button>
          ) : (
            <div className="apple-fan-main-trigger">{mainInner}</div>
          )}
        </motion.div>

        {isMobile && isOpen ? (
          <p className="apple-fan-swipe-hint">Swipe to browse concepts</p>
        ) : null}

        <div
          className={`apple-fan-stack${isOpen ? " apple-fan-stack--open" : ""}${useFlowLayout ? " apple-fan-stack--flow" : ""}`}
          aria-hidden={!isOpen}
        >
          {APPLE_CONCEPTS.map((concept, index) => {
            const layout = fanLayout[index];
            const stagger = reduceMotion ? 0 : index * 0.04;
            const isFront = frontId === concept.id;

            return (
              <motion.div
                key={concept.id}
                className={`apple-fan-slot${isFront ? " apple-fan-slot--front" : ""}`}
                style={{ zIndex: isFront ? 10 : layout.lift }}
                initial={false}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  ...(isMobile ? {} : { left: isOpen ? `${layout.left}%` : "-4%" }),
                }}
                transition={{ ...FAN_SPRING, delay: isOpen ? stagger : 0 }}
                onMouseEnter={() => handleMiniFocus(concept.id)}
                onClick={() => isMobile && handleMiniFocus(concept.id)}
              >
                <article className="apple-fan-note-card">
                  <header className="apple-fan-note-head">
                    <p className="apple-fan-note-eyebrow">
                      Concept {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="apple-fan-note-title">{concept.title}</h3>
                  </header>

                  <ul className="apple-fan-note-list">
                    {concept.notes.map((line) => (
                      <li key={line} className="apple-fan-note-line">
                        {line}
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.div>
            );
          })}

          <motion.div
            className={`apple-fan-slot apple-fan-slot--questions${
              frontId === "questions" ? " apple-fan-slot--front" : ""
            }`}
            style={{
              zIndex: frontId === "questions" ? 10 : questionsLayout.lift,
            }}
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              ...(isMobile ? {} : { left: isOpen ? `${questionsLayout.left}%` : "-4%" }),
            }}
            transition={{ ...FAN_SPRING, delay: isOpen ? (reduceMotion ? 0 : 0.18) : 0 }}
            onMouseEnter={() => handleMiniFocus("questions")}
            onClick={() => isMobile && handleMiniFocus("questions")}
          >
            <button
              type="button"
              className="apple-fan-questions-card"
              aria-label="Ask a question about these concept explorations"
              onClick={() => setQuestionOpen(true)}
            >
              <span className="apple-fan-questions-eyebrow">{APPLE_QUESTION_COPY.cardEyebrow}</span>
              <span className="apple-fan-questions-emoji" aria-hidden="true">
                💬
              </span>
              <span className="apple-fan-questions-title">{APPLE_QUESTION_COPY.cardTitle}</span>
              <span className="apple-fan-questions-lede">{APPLE_QUESTION_COPY.cardLede}</span>
              <span className="apple-fan-questions-action">{APPLE_QUESTION_COPY.cardAction}</span>
            </button>
          </motion.div>
        </div>
      </div>

      <AppleConceptQuestionModal isOpen={questionOpen} onClose={() => setQuestionOpen(false)} />
    </div>
  );
}
