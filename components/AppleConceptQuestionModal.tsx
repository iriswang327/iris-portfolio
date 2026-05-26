"use client";

import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APPLE_QUESTION_COPY, APPLE_QUESTION_EMAIL } from "@/lib/apple-copy";

interface AppleConceptQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 8 },
};

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M14.5 1.5L7.25 8.75M14.5 1.5L10 14.5L7.25 8.75M14.5 1.5L1.5 5.5L7.25 8.75"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AppleConceptQuestionModal({ isOpen, onClose }: AppleConceptQuestionModalProps) {
  const titleId = useId();
  const [question, setQuestion] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuestion("");
      setNote("");
      setSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) return;

    const subject = encodeURIComponent("Question — Apple concept explorations");
    const body = encodeURIComponent(
      [`Question: ${question.trim()}`, note.trim() ? `\nContext: ${note.trim()}` : ""]
        .filter(Boolean)
        .join("")
    );

    window.location.href = `mailto:${APPLE_QUESTION_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className="about-library-suggest-backdrop"
            aria-label="Close questions modal"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <div className="about-library-suggest-shell" role="presentation">
            <motion.div
              className="about-library-suggest-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="about-library-suggest-header">
                <button
                  type="button"
                  className="about-library-suggest-close"
                  aria-label="Close"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>

              {submitted ? (
                <div className="about-library-suggest-success">
                  <p className="about-library-suggest-title">{APPLE_QUESTION_COPY.successTitle}</p>
                  <p className="about-library-suggest-lede">{APPLE_QUESTION_COPY.successLede}</p>
                  <button type="button" className="about-library-suggest-done" onClick={onClose}>
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="about-library-suggest-copy">
                    <p className="about-library-suggest-eyebrow">In progress</p>
                    <h2 id={titleId} className="about-library-suggest-title">
                      {APPLE_QUESTION_COPY.modalTitle}
                    </h2>
                    <p className="about-library-suggest-lede">{APPLE_QUESTION_COPY.modalLede}</p>
                  </div>

                  <form className="about-library-suggest-form" onSubmit={handleSubmit}>
                    <label className="about-library-suggest-field">
                      <span className="sr-only">Your question</span>
                      <input
                        type="text"
                        name="question"
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        placeholder={APPLE_QUESTION_COPY.placeholder}
                        className="about-library-suggest-input"
                        autoComplete="off"
                        required
                      />
                    </label>

                    <div className="about-library-suggest-actions">
                      <label className="about-library-suggest-field">
                        <span className="sr-only">Optional context</span>
                        <input
                          type="text"
                          name="note"
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                          placeholder="Which concept? (optional)"
                          className="about-library-suggest-input"
                          autoComplete="off"
                        />
                      </label>

                      <button
                        type="submit"
                        className="about-library-suggest-submit"
                        aria-label="Send question"
                        disabled={!question.trim()}
                      >
                        <SendIcon />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
