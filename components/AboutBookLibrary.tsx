"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ABOUT_BOOKS,
  BOOK_FILTERS,
  BOOK_STATUS_SECTIONS,
  openLibraryCoverUrl,
  type BookFilter,
  type BookItem,
  type BookStatus,
} from "@/lib/books-data";

function BookCoverCard({ book }: { book: BookItem }) {
  const [localFailed, setLocalFailed] = useState(false);
  const [remoteFailed, setRemoteFailed] = useState(false);

  const coverSrc =
    book.coverSrc && !localFailed
      ? book.coverSrc
      : book.isbn && !remoteFailed
        ? openLibraryCoverUrl(book.isbn, "M")
        : null;

  const label = `${book.title} · ${book.author}`;

  return (
    <figure className="about-library-card" title={label}>
      <div className="about-library-cover" style={{ background: book.wash }}>
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={`Cover of ${book.title}`}
            width={120}
            height={180}
            className="about-library-cover-image"
            onError={() => {
              if (book.coverSrc && !localFailed) setLocalFailed(true);
              else setRemoteFailed(true);
            }}
            unoptimized={!book.coverSrc}
          />
        ) : (
          <div className="about-library-cover-fallback" style={{ borderColor: book.accent }}>
            <span className="about-library-cover-initial" aria-hidden="true">
              {book.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <figcaption className="about-library-meta">
        <p className="about-library-title">{book.title}</p>
        <p className="about-library-author">{book.author}</p>
      </figcaption>
    </figure>
  );
}

function BookGrid({ books }: { books: BookItem[] }) {
  return (
    <div className="about-library-grid" aria-label={`${books.length} books`}>
      {books.map((book) => (
        <BookCoverCard key={`${book.title}-${book.author}`} book={book} />
      ))}
    </div>
  );
}

export default function AboutBookLibrary() {
  const [activeFilter, setActiveFilter] = useState<BookFilter>("currently-reading");

  const counts = useMemo(() => {
    const tally: Record<BookFilter, number> = {
      all: ABOUT_BOOKS.length,
      "currently-reading": 0,
      "to-be-read": 0,
      "pretty-good": 0,
    };

    for (const book of ABOUT_BOOKS) {
      tally[book.status] += 1;
    }

    return tally;
  }, []);

  const sections = useMemo(() => {
    if (activeFilter !== "all") {
      return [
        {
          id: activeFilter as BookStatus,
          label: BOOK_FILTERS.find(({ id }) => id === activeFilter)?.label ?? "",
          books: ABOUT_BOOKS.filter((book) => book.status === activeFilter),
        },
      ];
    }

    return BOOK_STATUS_SECTIONS.map(({ id, label }) => ({
      id,
      label,
      books: ABOUT_BOOKS.filter((book) => book.status === id),
    })).filter(({ books }) => books.length > 0);
  }, [activeFilter]);

  const showSections = activeFilter === "all";

  return (
    <div className="about-library">
      <div className="about-library-filters" role="tablist" aria-label="Filter books">
        {BOOK_FILTERS.map(({ id, label }) => {
          const isActive = activeFilter === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`about-library-filter${isActive ? " about-library-filter--active" : ""}`}
              onClick={() => setActiveFilter(id)}
            >
              {label}
              <span className="about-library-filter-count">{counts[id]}</span>
            </button>
          );
        })}
      </div>

      <div className="about-library-body">
        {sections.map(({ id, label, books }) => (
          <section
            key={id}
            className="about-library-section"
            aria-label={showSections ? label : undefined}
          >
            {showSections ? (
              <h3 className="about-library-section-label">
                {label}
                <span className="about-library-section-count">{books.length}</span>
              </h3>
            ) : null}
            <BookGrid books={books} />
          </section>
        ))}
      </div>
    </div>
  );
}
