"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import VinylPlayer from "@/components/VinylPlayer";
import ParallaxHeroGradient from "@/components/ParallaxHeroGradient";

// ─── Types ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "hi", label: "Hi!" },
  { id: "currently", label: "Currently" },
  { id: "community", label: "Community" },
  { id: "philosophy", label: "Philosophy" },
  { id: "entertainment", label: "Entertainment" },
  { id: "fun", label: "Fun Facts ✦" },
] as const;

const SECTION_THEMES: Record<(typeof NAV_ITEMS)[number]["id"], string> = {
  hi: "#e9a7c4",
  currently: "#b5a8e8",
  community: "#a8cdb5",
  philosophy: "#9eb2e8",
  entertainment: "#e0c79a",
  fun: "#e9a7c4",
};

// ─── Currently ──────────────────────────────────────────────────────────────

const CURRENTLY_ITEMS = [
  {
    logoSrc: "/images/tower-bridge-logo.png",
    logoAlt: "Tower & Bridge",
    name: "Tower & Bridge",
    role: "Analytics Strategy Manager",
    date: "2025–Present",
  },
  {
    logoSrc: "/images/lhr-logo.png",
    logoAlt: "Longhorn Racing",
    name: "Longhorn Racing",
    role: "Operations Designer",
    date: "2025–Present",
  },
  {
    logoSrc: "/images/tulj-logo.png",
    logoAlt: "Texas Undergraduate Law Journal",
    name: "Texas Undergraduate Law Journal",
    role: "Staff Writer",
    date: "2025–Present",
  },
  {
    logoSrc: "/images/letters-of-gold-logo.png",
    logoAlt: "Letters of Gold",
    name: "Letters of Gold",
    role: "Director of Special Projects",
    date: "2025–Present",
  },
] as const;

// ─── Community cards ────────────────────────────────────────────────────────

const COMMUNITY_ITEMS = [
  {
    name: "Letters of Gold",
    role: "Director of Special Projects",
    desc: "Managing projects focusing on skin protection and DEI in healthcare",
  },
  {
    name: "Humane Society of Dallas",
    role: "Animal Volunteer",
    desc: "Because animals deserve advocates too.",
  },
  {
    name: "Boys & Girls Club",
    role: "Volunteer",
    desc: "Giving back to the next generation",
  },
] as const;

// ─── Books ──────────────────────────────────────────────────────────────────

const BOOKS_CURRENT = [
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    wash: "#F5EBC8",
    accent: "#E8D498",
  },
  {
    title: "East of Eden",
    author: "John Steinbeck",
    wash: "#FFE0C8",
    accent: "#FFBF94",
  },
  {
    title: "A Tree Grows in Brooklyn",
    author: "Betty Smith",
    wash: "#D8E8D4",
    accent: "#98C098",
  },
];

const BOOKS_TBR = [
  {
    title: "Sunburn",
    author: "Laura Lippman",
    wash: "#F8D8C8",
    accent: "#E8A888",
  },
  {
    title: "Yellowface",
    author: "R.F. Kuang",
    wash: "#FFF8DC",
    accent: "#F0E080",
  },
  {
    title: "Madonna in a Fur Coat",
    author: "Sabahattin Ali",
    wash: "#E8E8EA",
    accent: "#B0B0B8",
  },
  {
    title: "I Want You to Be Happy",
    author: "Jem Calber",
    wash: "#F8D8E8",
    accent: "#ECB8D4",
  },
  {
    title: "Babel",
    author: "R.F. Kuang",
    wash: "#E8E8EA",
    accent: "#B8B8BE",
  },
];

const BOOKS_PRETTY_GOOD = [
  {
    title: "The Goldfinch",
    author: "Donna Tartt",
    wash: "#C8E4F0",
    accent: "#90C8E0",
  },
  {
    title: "Recursion",
    author: "Blake Crouch",
    wash: "#F5EAC8",
    accent: "#E8D080",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    wash:
      "linear-gradient(120deg, #FADCE8 0%, #F5ECC8 22%, #D8F0D8 44%, #D8E8F8 66%, #E8D8F8 88%)",
    accent: "linear-gradient(135deg, #F0ABFC, #A78BFA, #7DD3FC)",
  },
  {
    title: "Normal People",
    author: "Sally Rooney",
    wash: "#D8E4D4",
    accent: "#98B898",
  },
];

// ─── Fun facts ──────────────────────────────────────────────────────────────

const FUN_FACTS = [
  { emoji: "🎾", line: "played & coached competitive tennis in high school" },
  { emoji: "🌏", line: "love to travel across Asia and visit my family in Taiwan" },
  { emoji: "🥾", line: "avg 12k steps a day, preferably outdoor walks" },
  { emoji: "🎨", line: "passionate about watercolor, oil painting, and learning physical art (ceramics next)" },
  { emoji: "🐾", line: "squirrel & otter lover" },
  { emoji: "🏊🏼‍♀️", line: "lifeguard & water park safety certified!" },
  { emoji: "☕", line: "approximately 847 americanos w/ cinnamon since freshman year" },
] as const;

// ─── Book ledger (text-first, no covers) ─────────────────────────────────────

type BookEntry = {
  title: string;
  author: string;
  wash: string;
  accent: string;
};

function BookLedgerRow({ book }: { book: BookEntry }) {
  return (
    <div className="about-book-row" style={{ background: book.wash }}>
      <span
        className="about-book-dot"
        style={{ background: book.accent }}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="about-book-title">{book.title}</p>
        <p className="about-book-author">{book.author}</p>
      </div>
    </div>
  );
}

function BookShelf({
  label,
  books,
  columns = 1,
}: {
  label: string;
  books: BookEntry[];
  columns?: 1 | 2;
}) {
  return (
    <div>
      <p className="section-label about-book-shelf-label">{label}</p>
      <div
        className={
          columns === 2
            ? "grid grid-cols-1 gap-1 sm:grid-cols-2"
            : "flex flex-col gap-1"
        }
      >
        {books.map((book) => (
          <BookLedgerRow key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}

// ─── Quote block component ──────────────────────────────────────────────────

function QuoteBlock({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div className="about-quote">
      <div className="about-quote-accent" aria-hidden="true" />
      <p className="about-quote-text">&ldquo;{quote}&rdquo;</p>
      <p className="about-quote-attribution">{attribution}</p>
    </div>
  );
}

// ─── Currently row ────────────────────────────────────────────────────────────

function CurrentlyRow({
  item,
  isLast,
}: {
  item: (typeof CURRENTLY_ITEMS)[number];
  isLast: boolean;
}) {
  return (
    <div>
      <div className="about-currently-row">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-black/[0.04] bg-white shadow-sm">
          <Image
            src={item.logoSrc}
            alt={item.logoAlt}
            fill
            sizes="40px"
            className="object-cover scale-[1.18]"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="about-currently-name">{item.name}</span>
          <span className="about-currently-role">{item.role}</span>
        </div>
        <span className="about-currently-date">{item.date}</span>
      </div>
      {!isLast && <div className="about-currently-divider" aria-hidden="true" />}
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function AboutContent() {
  const [activeSection, setActiveSection] = useState<(typeof NAV_ITEMS)[number]["id"]>("hi");
  const [activeTab, setActiveTab] = useState<"books" | "music">("books");
  const pageRef = useRef<HTMLDivElement>(null);

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

        let best: (typeof NAV_ITEMS)[number]["id"] | null = null;
        let bestRatio = -1;
        visibility.forEach((ratio, name) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = name as (typeof NAV_ITEMS)[number]["id"];
          }
        });

        if (best) {
          setActiveSection(best);
          const accent = SECTION_THEMES[best];
          pageRef.current?.style.setProperty("--accent", accent);
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1.0],
        rootMargin: "-20% 0px -30% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: (typeof NAV_ITEMS)[number]["id"]) => {
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - 40, behavior: "smooth" });
  };

  return (
    <div ref={pageRef} className="about-page" style={{ position: "relative" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70vh",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <ParallaxHeroGradient />
      </div>

      <div className="about-shell">
        <div className="about-rail-column">
          <aside className="about-rail rail">
            <div className="about-brand">
              <Link href="/" className="about-brand-link" aria-label="Iris Wang — design home">
                <Image
                  src="/images/lotus-logo.png"
                  alt=""
                  width={60}
                  height={60}
                  className="about-brand-logo shrink-0 object-contain"
                  aria-hidden
                />
              </Link>
            </div>

            <nav className="toc" id="toc" aria-label="About page sections">
              {NAV_ITEMS.map(({ id, label }) => (
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

        <div className="about-main">
          {/* ── HI SECTION ── */}
          <section id="hi" data-theme="hi" className="about-section">
            {/* Polaroid left, bio right — grouped intro block */}
            <div className="about-bio-row">
              <div className="about-photo-wrap">
                <div className="about-photo-frame">
                  <div className="relative h-[260px] w-full overflow-hidden rounded-[1px]">
                    <Image
                      src="/images/about-iris.png"
                      alt="Iris Wang"
                      fill
                      sizes="210px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <p className="about-photo-caption">nyc · 2026</p>
                </div>
              </div>

              <div className="about-bio-copy">
                <h2 className="about-intro-title">Hi, I&apos;m Iris!</h2>

                <div className="about-meta-row">
                  <span className="about-meta-line">📍 ATX · NYC · TPE</span>
                  <span className="about-meta-line">🎓 UT Austin · 2027</span>
                </div>

                <p className="about-bio-lede">
                  Across what I&apos;m doing currently, I lead with one desire:{" "}
                  <strong className="font-normal">
                    bridging complex systems to intuitive, high-fidelity human experiences
                  </strong>
                  .
                </p>

                <p className="about-bio-body">
                  I love building software interfaces, mapping technical workflows, and designing
                  AI-native products. Advertising has taught me to design with{" "}
                  <em>human behavior and brand voice</em> in mind, while Computer Science gives me
                  the foundation to deploy those designs to reality. Merging these with business
                  strategy allows me to execute as a truly multi-faceted designer.
                </p>

                <p className="about-bio-body">
                  Beyond design, my background spans software tools, regulatory law, race cars, and
                  print illustration — and I&apos;m exploring AI workflows while staying grounded in{" "}
                  <em>human connection and community</em>.
                </p>

                <div className="about-bio-actions">
                  <a
                    href="mailto:iriswang32@gmail.com"
                    className="about-bio-cta text-gradient-ihwn transition-opacity hover:opacity-80"
                  >
                    say hi →
                  </a>
                  <Link href="/" className="about-bio-work-link">
                    see design work →
                  </Link>
                </div>
              </div>
            </div>
          </section>

        {/* ── CURRENTLY SECTION ── */}
        <section id="currently" data-theme="currently" className="about-section">
          <h2 className="about-heading font-[300]">Currently</h2>

          <div className="experience-glass-panel experience-glass-panel--wide experience-glass-panel--compact-y">
            <div className="flex w-full flex-col">
              {CURRENTLY_ITEMS.map((item, i) => (
                <CurrentlyRow
                  key={item.name}
                  item={item}
                  isLast={i === CURRENTLY_ITEMS.length - 1}
                />
              ))}
            </div>
          </div>

          <Link
            href="/experience"
            className="about-link-row text-gradient-ihwn transition-opacity hover:opacity-80"
          >
            See the full experience page →
          </Link>
        </section>

        {/* ── COMMUNITY SECTION ── */}
        <section id="community" data-theme="community" className="about-section">
          <h2 className="about-heading font-[300]">My Communities 🤍</h2>

          <div className="about-community-grid">
            {COMMUNITY_ITEMS.map((item) => (
              <motion.div
                key={item.name}
                className="fun-card about-community-card rounded-[14px]"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <p className="about-community-name">{item.name}</p>
                <p className="about-community-role">{item.role}</p>
                <p className="about-community-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PHILOSOPHY SECTION ── */}
        <section id="philosophy" data-theme="philosophy" className="about-section">
          <h2 className="about-heading about-heading--tight font-[300]">My Philosophy</h2>

          <p className="about-lede">
            Kaizen (改善) — every day is an opportunity to improve. Even if it&apos;s just 1%.
          </p>

          <QuoteBlock
            quote="The most powerful person in the world is the storyteller."
            attribution="— Steve Jobs"
          />

          <QuoteBlock
            quote="Be intentional. Be consistent. Be bored."
            attribution="What I believe in, because without stimulation, boredom sparks creativity"
          />
        </section>

        {/* ── ENTERTAINMENT SECTION ── */}
        <section id="entertainment" data-theme="entertainment" className="about-section">
          <h2 className="about-heading about-heading--loose font-[300]">Entertainment</h2>

          {/* Tabs */}
          <div className="about-tabs">
            {(["books", "music"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`about-tab${activeTab === tab ? " about-tab--active" : ""}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "books" ? (
            <div className="about-book-shelves">
              <div className="about-book-shelves-grid">
                <BookShelf label="Currently Reading" books={BOOKS_CURRENT} />
                <BookShelf label="To Be Read" books={BOOKS_TBR} />
              </div>
              <BookShelf label="Pretty Good Reads" books={BOOKS_PRETTY_GOOD} columns={2} />
            </div>
          ) : (
            <div className="about-entertainment-music">
              <VinylPlayer />
            </div>
          )}
        </section>

        {/* ── FUN FACTS SECTION ── */}
        <section id="fun" data-theme="fun" className="about-section about-section--last">
          <h2 className="about-heading about-heading--tight font-[300]">Fun Facts ✦</h2>
          <p className="about-fun-lede">things that don&apos;t fit anywhere else</p>

          <div className="flex flex-col gap-3.5">
            {FUN_FACTS.map(({ emoji, line }) => (
              <div key={line} className="flex items-start gap-3.5">
                <span className="w-7 shrink-0 text-lg" aria-hidden="true">
                  {emoji}
                </span>
                <span className="about-fun-line">{line}</span>
              </div>
            ))}
          </div>
        </section>

        </div>
      </div>
    </div>
  );
}
