"use client";

import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BOOK_SUGGESTION_COPY,
  BOOK_SUGGESTION_EMAIL,
  BOOK_STATUS_SECTIONS,
  type BookStatus,
} from "@/lib/books-data";

interface BookSuggestionModalProps {
  isOpen: boolean;
  shelf: BookStatus | null;
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
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="about-library-suggest-send-icon"
    >
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

export default function BookSuggestionModal({ isOpen, shelf, onClose }: BookSuggestionModalProps) {
  const titleId = useId();
  const [bookTitle, setBookTitle] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const shelfLabel = BOOK_STATUS_SECTIONS.find(({ id }) => id === shelf)?.label ?? "Library";
  const copy = shelf ? BOOK_SUGGESTION_COPY[shelf] : null;

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
      setBookTitle("");
      setNote("");
      setSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!bookTitle.trim() || !shelf) return;

    const subject = encodeURIComponent(`Book suggestion — ${shelfLabel}`);
    const body = encodeURIComponent(
      [`Title: ${bookTitle.trim()}`, note.trim() ? `\nNote: ${note.trim()}` : ""]
        .filter(Boolean)
        .join("")
    );

    window.location.href = `mailto:${BOOK_SUGGESTION_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && shelf && copy ? (
        <>
          <motion.button
            type="button"
            className="about-library-suggest-backdrop"
            aria-label="Close book suggestion"
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
                  <p className="about-library-suggest-title">On my list — thank you.</p>
                  <p className="about-library-suggest-lede">
                    Your email app should open with the suggestion ready to send.
                  </p>
                  <button type="button" className="about-library-suggest-done" onClick={onClose}>
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="about-library-suggest-copy">
                    <p className="about-library-suggest-eyebrow">{shelfLabel}</p>
                    <h2 id={titleId} className="about-library-suggest-title">
                      {copy.title}
                    </h2>
                    <p className="about-library-suggest-lede">{copy.lede}</p>
                  </div>

                  <form className="about-library-suggest-form" onSubmit={handleSubmit}>
                    <label className="about-library-suggest-field">
                      <span className="sr-only">Book title</span>
                      <input
                        type="text"
                        name="bookTitle"
                        value={bookTitle}
                        onChange={(event) => setBookTitle(event.target.value)}
                        placeholder={copy.placeholder}
                        className="about-library-suggest-input"
                        autoComplete="off"
                        required
                      />
                    </label>

                    <div className="about-library-suggest-actions">
                      <label className="about-library-suggest-field">
                        <span className="sr-only">Optional note</span>
                        <input
                          type="text"
                          name="note"
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                          placeholder="Why this one? (optional)"
                          className="about-library-suggest-input"
                          autoComplete="off"
                        />
                      </label>

                      <button
                        type="submit"
                        className="about-library-suggest-submit"
                        aria-label="Send book suggestion"
                        disabled={!bookTitle.trim()}
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
