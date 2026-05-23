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
  { id: "fun", label: "Fun Facts", star: true },
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
    role: "Operations Team",
    date: "2024–Present",
  },
  {
    logoSrc: "/images/tulj-logo.png",
    logoAlt: "Texas Undergraduate Law Journal",
    name: "Texas Undergraduate Law Journal",
    role: "Staff Writer",
    date: "2024–Present",
  },
  {
    logoSrc: "/images/letters-of-gold-logo.png",
    logoAlt: "Letters of Gold",
    name: "Letters of Gold",
    role: "Director of Projects",
    date: "2026–Present",
  },
] as const;

// ─── Community cards ────────────────────────────────────────────────────────

const COMMUNITY_ITEMS = [
  {
    name: "Letters of Gold",
    role: "Director of Projects (incoming)",
    desc: "Building a children's book on skin protection and diversity",
  },
  {
    name: "Humane Society of Dallas",
    role: "Animal Volunteer",
    desc: "Because animals deserve advocates too 🐾",
  },
  {
    name: "Boys & Girls Club",
    role: "Volunteer",
    desc: "Giving back to the next generation",
  },
] as const;

// ─── Books ──────────────────────────────────────────────────────────────────

const BOOKS_CURRENT = [
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", color: "#C9B99A", isbn: "0451524934" },
  { title: "East of Eden", author: "John Steinbeck", color: "#B8C4A0", isbn: "0142000665" },
  { title: "A Court of Silver Flames", author: "Sarah J. Maas", color: "#E8A5B0", isbn: "1681196288" },
];

const BOOKS_TBR = [
  { title: "I Want You to Be Happy", author: "Jem Calber", color: "#C4B5E8" },
  { title: "In Five Years", author: "Rebecca Serle", color: "#B5D4E8", isbn: "1982105386" },
  { title: "Babel", author: "R.F. Kuang", color: "#8BA8C8", isbn: "0063021420" },
  { title: "The Art of War", author: "Sun Tzu", color: "#C8BEA8", isbn: "1599869038" },
  { title: "Madonna in a Fur Coat", author: "Sabahattin Ali", color: "#D4A8B8", isbn: "0143106385" },
];

const BOOKS_STARS = [
  { title: "The Goldfinch", author: "Donna Tartt", color: "#E8D4A0", isbn: "0316055443" },
  { title: "Recursion", author: "Blake Crouch", color: "#A8C4D4", isbn: "0525564239" },
];

// ─── Fun facts ──────────────────────────────────────────────────────────────

const FUN_FACTS = [
  { emoji: "🎾", line: "played & coached competitive tennis in high school" },
  { emoji: "📸", line: "aspiring vlogger (CapCut is my best friend!)" },
  { emoji: "⚖️", line: "avg 12k steps a day, preferably outdoor walks" },
  { emoji: "🎨", line: "illustrated something 50,000 people saw without knowing it was me" },
  { emoji: "🐾", line: "squirrel & otter lover" },
  { emoji: "🏊🏼‍♀️", line: "lifeguard & water park safety certified!" },
  { emoji: "☕", line: "approximately 847 americanos w/ cinnamon since freshman year" },
] as const;

// ─── Book cover component ───────────────────────────────────────────────────

type BookEntry = {
  title: string;
  author: string;
  color: string;
  isbn?: string;
};

function BookCover({ title, author, color, isbn }: BookEntry) {
  const [coverFailed, setCoverFailed] = useState(false);
  const coverSrc = isbn
    ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
    : null;

  if (coverSrc && !coverFailed) {
    return (
      <div
        className="relative h-[110px] w-20 flex-shrink-0 overflow-hidden rounded-lg shadow-[2px_4px_12px_rgba(0,0,0,0.1)]"
        title={`${title} — ${author}`}
      >
        <Image
          src={coverSrc}
          alt={`${title} by ${author}`}
          fill
          sizes="80px"
          className="object-cover"
          onError={() => setCoverFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="relative h-[110px] w-20 flex-shrink-0 overflow-hidden rounded-lg shadow-[2px_4px_12px_rgba(0,0,0,0.1)]"
      style={{ background: color }}
      title={`${title} — ${author}`}
    >
      <div
        className="absolute bottom-0 left-[7px] top-0 w-px bg-black/10"
        aria-hidden="true"
      />
      <div className="px-2.5 py-2.5 pl-3.5">
        <p className="text-[7.5px] font-semibold leading-snug text-black/55">{title}</p>
        <p className="mt-1 text-[6.5px] font-normal text-black/35">{author}</p>
      </div>
    </div>
  );
}

// ─── Quote block component ──────────────────────────────────────────────────

function QuoteBlock({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div style={{ position: "relative", paddingLeft: 20, marginBottom: 28 }}>
      {/* Gradient left border */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(180deg, #f0abfc 0%, #a78bfa 50%, #7dd3fc 100%)",
        }}
        aria-hidden="true"
      />
      <p style={{ fontSize: 20, fontWeight: 200, fontStyle: "italic", color: "var(--foreground)", lineHeight: 1.5 }}>
        &ldquo;{quote}&rdquo;
      </p>
      <p style={{ fontSize: 11, fontWeight: 300, color: "#BBBBBB", marginTop: 8 }}>
        {attribution}
      </p>
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
      <div className="flex items-center" style={{ gap: 16, paddingTop: 10, paddingBottom: 10 }}>
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
          <span style={{ fontSize: 13, fontWeight: 400, color: "var(--foreground)" }}>
            {item.name}
          </span>
          <span style={{ fontSize: 12, fontWeight: 300, color: "#888888", marginLeft: 8 }}>
            {item.role}
          </span>
        </div>
        <span className="shrink-0" style={{ fontSize: 11, fontWeight: 300, color: "#BBBBBB" }}>
          {item.date}
        </span>
      </div>
      {!isLast && (
        <div style={{ height: "0.5px", background: "var(--border)" }} aria-hidden="true" />
      )}
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
              <Image
                src="/images/lotus-logo.png"
                alt="Iris Wang logo"
                width={26}
                height={26}
                className="h-[26px] w-[26px] shrink-0 object-contain"
              />
              <span className="about-name">iris wang</span>
            </div>

            <p className="about-tagline">design, strategy, &amp; everything in between.</p>

            <nav className="toc" id="toc" aria-label="About page sections">
              {NAV_ITEMS.map(({ id, label, star }) => (
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
                  {star ? <span style={{ opacity: 0.7 }}> ✦</span> : null}
                </a>
              ))}
            </nav>
          </aside>
        </div>

        <div className="about-main">
          {/* ── HI SECTION ── */}
          <section id="hi" data-theme="hi" style={{ marginBottom: 72 }}>
            {/* Photo + bio row */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 32,
                alignItems: "flex-start",
              }}
            >
              <div
                className="w-[180px] shrink-0"
                style={{
                  transform: "rotate(1.5deg)",
                  background: "#ffffff",
                  padding: 8,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  borderRadius: 2,
                }}
              >
                <div className="relative h-[220px] w-full overflow-hidden rounded-[1px]">
                  <Image
                    src="/images/about-iris.png"
                    alt="Iris Wang"
                    fill
                    sizes="180px"
                    className="object-cover"
                    priority
                  />
                </div>
                <p
                  className="mt-2.5 text-center text-[10px] font-light italic leading-snug text-[#BBBBBB]"
                >
                  nyc whenever i can visit :)
                </p>
              </div>

              {/* Bio text */}
              <div style={{ flex: 1 }}>
                <h2
                  style={{ fontSize: 22, fontWeight: 300, color: "var(--foreground)", marginBottom: 14, lineHeight: 1.3 }}
                >
                  Hi, I&apos;m Iris!
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 300, color: "#888888" }}>
                    📍 Austin, TX · NYC soon
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 300, color: "#888888" }}>
                    🎓 UT Austin · Advertising + CS · 2027
                  </span>
                </div>

                <p style={{ fontSize: 14, fontWeight: 300, color: "#444444", lineHeight: 1.8, marginBottom: 16 }}>
                  Across what I&apos;m doing currently, I lead with one desire: bridging complex
                  systems to intuitive understanding.
                </p>

                <p style={{ fontSize: 14, fontWeight: 300, color: "#444444", lineHeight: 1.8, marginBottom: 20 }}>
                  I&apos;m an Advertising student at UT Austin with minors in CS, design strategies,
                  &amp; entrepreneurship. I spend my time building products, writing about healthcare
                  law, photographing race cars, and illustrating for a newspaper. Each tells a story
                  that deserves to be heard.
                </p>

                <a
                  href="mailto:iriswang32@gmail.com"
                  className="text-gradient-ihwn hover:opacity-80 transition-opacity"
                  style={{ fontSize: 14, fontWeight: 300 }}
                >
                  Working on something cool? Let&apos;s talk! →
                </a>
              </div>
            </div>
          </section>

        {/* ── CURRENTLY SECTION ── */}
        <section id="currently" data-theme="currently" style={{ marginBottom: 72 }}>
          <p className="section-label" style={{ color: "#BBBBBB", marginBottom: 20 }}>
            CURRENTLY
          </p>

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
            className="text-gradient-ihwn font-[300] hover:opacity-80 transition-opacity"
            style={{ fontSize: 13, display: "inline-block", marginTop: 20 }}
          >
            See the full experience page →
          </Link>
        </section>

        {/* ── COMMUNITY SECTION ── */}
        <section id="community" data-theme="community" style={{ marginBottom: 72 }}>
          <h2
            className="font-[300]"
            style={{ fontSize: 22, color: "var(--foreground)", marginBottom: 20 }}
          >
            My Communities 🤍
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
            {COMMUNITY_ITEMS.map((item) => (
              <motion.div
                key={item.name}
                className="fun-card rounded-[14px]"
                style={{ padding: 18 }}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <p style={{ fontSize: 14, fontWeight: 400, color: "var(--foreground)", marginBottom: 4 }}>
                  {item.name}
                </p>
                <p style={{ fontSize: 12, fontWeight: 300, color: "#A78BFA", marginBottom: 8 }}>
                  {item.role}
                </p>
                <p style={{ fontSize: 12, fontWeight: 300, color: "#888888", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PHILOSOPHY SECTION ── */}
        <section id="philosophy" data-theme="philosophy" style={{ marginBottom: 72 }}>
          <h2
            className="font-[300]"
            style={{ fontSize: 22, color: "var(--foreground)", marginBottom: 8 }}
          >
            My Philosophy
          </h2>

          <p style={{ fontSize: 13, fontWeight: 300, color: "#888888", marginBottom: 28, lineHeight: 1.6 }}>
            Kaizen (改善) — every day is an opportunity to improve. Even if it&apos;s just 1%.
          </p>

          <QuoteBlock
            quote="The most powerful person in the world is the storyteller."
            attribution="— Steve Jobs"
          />

          <QuoteBlock
            quote="Be intentional. Be consistent. Be bored."
            attribution="What I believe in, because without stimulation, boredom sparks creativity :)"
          />
        </section>

        {/* ── ENTERTAINMENT SECTION ── */}
        <section id="entertainment" data-theme="entertainment" style={{ marginBottom: 72 }}>
          <h2
            className="font-[300]"
            style={{ fontSize: 22, color: "var(--foreground)", marginBottom: 24 }}
          >
            Entertainment
          </h2>

          {/* Tabs */}
          <div className="flex items-center" style={{ gap: 24, marginBottom: 32, borderBottom: "0.5px solid var(--border)" }}>
            {(["books", "music"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="pb-3 transition-colors duration-200 focus:outline-none capitalize"
                style={{
                  fontSize: 14,
                  fontWeight: activeTab === tab ? 400 : 300,
                  color: activeTab === tab ? "var(--foreground)" : "#888888",
                  borderBottom: activeTab === tab ? "1.5px solid var(--foreground)" : "1.5px solid transparent",
                  marginBottom: -1,
                  background: "none",
                  border: "none",
                  borderBottomWidth: "1.5px",
                  borderBottomStyle: "solid",
                  borderBottomColor: activeTab === tab ? "var(--foreground)" : "transparent",
                  cursor: "pointer",
                  padding: "0 0 12px 0",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "books" ? (
            <div className="flex flex-col" style={{ gap: 32 }}>
              {/* Currently Reading */}
              <div>
                <p className="section-label" style={{ color: "#BBBBBB", marginBottom: 16 }}>
                  CURRENTLY READING
                </p>
                <div className="flex flex-wrap" style={{ gap: 12 }}>
                  {BOOKS_CURRENT.map((b) => (
                    <BookCover key={b.title} {...b} />
                  ))}
                </div>
              </div>

              {/* To Be Read */}
              <div>
                <p className="section-label" style={{ color: "#BBBBBB", marginBottom: 16 }}>
                  TO BE READ
                </p>
                <div className="flex flex-wrap" style={{ gap: 12 }}>
                  {BOOKS_TBR.map((b) => (
                    <BookCover key={b.title} {...b} />
                  ))}
                </div>
              </div>

              {/* Almost ✦ Stars */}
              <div>
                <p className="section-label" style={{ color: "#BBBBBB", marginBottom: 6 }}>
                  ALMOST ✦ STARS
                </p>
                <p style={{ fontSize: 11, fontWeight: 300, fontStyle: "italic", color: "#888888", marginBottom: 16 }}>
                  because art is not perfection
                </p>
                <div className="flex flex-wrap" style={{ gap: 12 }}>
                  {BOOKS_STARS.map((b) => (
                    <BookCover key={b.title} {...b} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center" style={{ paddingTop: 16, paddingBottom: 16 }}>
              <VinylPlayer />
            </div>
          )}
        </section>

        {/* ── FUN FACTS SECTION ── */}
        <section id="fun" data-theme="fun" style={{ marginBottom: 40 }}>
          <h2
            className="font-[300]"
            style={{ fontSize: 22, color: "var(--foreground)", marginBottom: 6 }}
          >
            Fun Facts ✦
          </h2>
          <p style={{ fontSize: 13, fontWeight: 300, color: "#888888", marginBottom: 24 }}>
            things that don&apos;t fit anywhere else
          </p>

          <div className="flex flex-col" style={{ gap: 14 }}>
            {FUN_FACTS.map(({ emoji, line }) => (
              <div key={line} className="flex items-start" style={{ gap: 14 }}>
                <span style={{ fontSize: 18, flexShrink: 0, width: 28 }} aria-hidden="true">
                  {emoji}
                </span>
                <span style={{ fontSize: 14, fontWeight: 300, color: "var(--foreground)", lineHeight: 1.6 }}>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </section>

        </div>
      </div>
    </div>
  );
}
