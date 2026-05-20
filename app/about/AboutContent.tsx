"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import VinylPlayer from "@/components/VinylPlayer";
import ParallaxHeroGradient from "@/components/ParallaxHeroGradient";

// ─── Types ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "hi", label: "Hi!" },
  { id: "work", label: "Work" },
  { id: "community", label: "Community" },
  { id: "philosophy", label: "Philosophy" },
  { id: "entertainment", label: "Entertainment" },
  { id: "funfacts", label: "Fun Facts ✦" },
] as const;

// ─── Work timeline ──────────────────────────────────────────────────────────

const WORK_ITEMS = [
  { initials: "SW", bg: "#FEF9EC", color: "#D97706", name: "SparroWriting", role: "Marketing Operations & Instructor", date: "2022–2025" },
  { initials: "AU", bg: "#EFF6FF", color: "#60A5FA", name: "ASUCI Office of the President", role: "Outreach Intern", date: "2023–2024" },
  { initials: "TB", bg: "#FFFBEB", color: "#FBBF24", name: "Tower & Bridge", role: "Analytics Strategy Manager", date: "2025–Present" },
  { initials: "LR", bg: "#FFF7ED", color: "#FB923C", name: "Longhorn Racing", role: "Operations Team", date: "2024–Present" },
  { initials: "LJ", bg: "#EFF6FF", color: "#60A5FA", name: "Texas Undergraduate Law Journal", role: "Staff Writer", date: "2024–Present" },
  { initials: "LG", bg: "#F0EEFF", color: "#A78BFA", name: "Letters of Gold", role: "Director of Projects", date: "2026–Present" },
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
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", color: "#C9B99A" },
  { title: "East of Eden", author: "John Steinbeck", color: "#B8C4A0" },
  { title: "A Court of Silver Flames", author: "Sarah J. Maas", color: "#E8A5B0" },
];

const BOOKS_TBR = [
  { title: "I Want You to Be Happy", author: "Jem Calber", color: "#C4B5E8" },
  { title: "In Five Years", author: "Rebecca Serle", color: "#B5D4E8" },
  { title: "Babel", author: "R.F. Kuang", color: "#8BA8C8" },
  { title: "The Art of War", author: "Sun Tzu", color: "#C8BEA8" },
  { title: "Madonna in a Fur Coat", author: "Sabahattin Ali", color: "#D4A8B8" },
];

const BOOKS_STARS = [
  { title: "The Goldfinch", author: "Donna Tartt", color: "#E8D4A0" },
  { title: "Recursion", author: "Blake Crouch", color: "#A8C4D4" },
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

function BookCover({ title, author, color }: { title: string; author: string; color: string }) {
  return (
    <div
      style={{
        width: 80,
        height: 110,
        borderRadius: 8,
        background: color,
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
      }}
      title={`${title} — ${author}`}
    >
      <div
        style={{
          position: "absolute",
          left: 7,
          top: 0,
          bottom: 0,
          width: 1.5,
          background: "rgba(0,0,0,0.12)",
        }}
      />
      <div style={{ padding: "10px 10px 10px 14px" }}>
        <p style={{ fontSize: 7.5, fontWeight: 600, color: "rgba(0,0,0,0.55)", lineHeight: 1.4 }}>
          {title}
        </p>
        <p style={{ fontSize: 6.5, fontWeight: 400, color: "rgba(0,0,0,0.35)", marginTop: 5 }}>
          {author}
        </p>
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

// ─── Work row ───────────────────────────────────────────────────────────────

function WorkRow({ item, isLast }: { item: (typeof WORK_ITEMS)[number]; isLast: boolean }) {
  return (
    <div>
      <div className="flex items-center" style={{ gap: 16, paddingTop: 14, paddingBottom: 14 }}>
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full"
          style={{ width: 40, height: 40, background: item.bg, fontSize: 10, fontWeight: 500, color: item.color }}
          aria-hidden="true"
        >
          {item.initials}
        </div>
        <div className="flex-1 min-w-0">
          <span style={{ fontSize: 13, fontWeight: 400, color: "var(--foreground)" }}>
            {item.name}
          </span>
          <span style={{ fontSize: 12, fontWeight: 300, color: "#888888", marginLeft: 8 }}>
            {item.role}
          </span>
        </div>
        <span className="flex-shrink-0" style={{ fontSize: 11, fontWeight: 300, color: "#BBBBBB" }}>
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
  const [activeSection, setActiveSection] = useState("hi");
  const [activeTab, setActiveTab] = useState<"books" | "music">("books");

  // Single Intersection Observer — tracks all sections, sets the topmost visible one active
  useEffect(() => {
    const sectionIds = ["hi", "work", "community", "philosophy", "entertainment", "funfacts"];
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });

        // Pick the first section (DOM order = top-to-bottom) that is currently intersecting
        const active = sectionIds.find((id) => intersecting.has(id));
        if (active) setActiveSection(active);
      },
      // Top band: below the fixed nav (80px). Bottom band: cut off lower half so only
      // the section near the top of the viewport counts as "active".
      { rootMargin: "-80px 0px -50% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="flex relative"
      style={{ minHeight: "100vh", alignItems: "flex-start", gap: 48 }}
    >
      {/* Watercolor gradient drifts behind the full page */}
      <div className="absolute pointer-events-none" style={{ inset: 0, height: "70vh", zIndex: 0 }}>
        <ParallaxHeroGradient />
      </div>

      {/* ── Sidebar ─────────────────────────────────────── */}
      {/*
        alignSelf: flex-start is REQUIRED for position:sticky to work inside
        a flex container — without it the aside stretches to full container
        height and sticky never triggers.
      */}
      <aside
        className="hidden md:block flex-shrink-0"
        style={{
          width: 220,
          flexShrink: 0,
          alignSelf: "flex-start",
          position: "sticky",
          top: 80,
          zIndex: 1,
        }}
      >
        <div
          style={{
            paddingTop: 48,
            paddingLeft: 24,
            paddingRight: 16,
            paddingBottom: 24,
          }}
        >
          {/* Logo + name */}
          <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
            <Image
              src="/images/lotus-logo.png"
              alt="Iris Wang logo"
              height={32}
              width={32}
              className="h-8 w-auto flex-shrink-0"
            />
            <span style={{ fontSize: 13, fontWeight: 400, color: "var(--foreground)" }}>
              iris wang
            </span>
          </div>

          <p style={{ fontSize: 11, fontWeight: 300, color: "#AAAAAA", marginBottom: 28, lineHeight: 1.5, maxWidth: 160 }}>
            design, strategy, &amp; everything in between.
          </p>

          {/* Anchor nav */}
          <nav className="flex flex-col" style={{ gap: 14 }} aria-label="About page sections">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left focus:outline-none"
                style={{
                  fontSize: 13,
                  fontWeight: activeSection === id ? 400 : 300,
                  color: activeSection === id ? "transparent" : "#888888",
                  background: activeSection === id
                    ? "linear-gradient(135deg, #f0abfc 0%, #a78bfa 50%, #7dd3fc 100%)"
                    : "transparent",
                  WebkitBackgroundClip: activeSection === id ? "text" : "unset",
                  backgroundClip: activeSection === id ? "text" : "unset",
                  WebkitTextFillColor: activeSection === id ? "transparent" : "unset",
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  transition: "font-weight 200ms ease, opacity 200ms ease",
                  opacity: activeSection === id ? 1 : 0.7,
                }}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Right content ────────────────────────────────── */}
      <div
        className="flex-1 min-w-0"
        style={{ paddingTop: 80, paddingRight: 48, paddingBottom: 100, maxWidth: 700, zIndex: 1 }}
      >

        {/* ── HI SECTION ── */}
        <section id="hi" style={{ marginBottom: 72 }}>
          <div className="flex items-start" style={{ gap: 32 }}>
            {/* Polaroid photo */}
            <div
              className="flex-shrink-0"
              style={{
                transform: "rotate(1.5deg)",
                background: "#ffffff",
                padding: 8,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 240,
                  background: "linear-gradient(135deg, #F0EEFF 0%, #E8F0FF 100%)",
                  borderRadius: 1,
                }}
                aria-label="Photo of Iris"
              />
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#BBBBBB",
                  marginTop: 10,
                  textAlign: "center",
                  lineHeight: 1.4,
                  maxWidth: 200,
                }}
              >
                austin, tx — somewhere between a law brief and a sketchbook
              </p>
            </div>

            {/* Bio text */}
            <div className="flex-1 min-w-0">
              <h2
                className="font-[300] leading-tight"
                style={{ fontSize: 22, color: "var(--foreground)", marginBottom: 14 }}
              >
                Hi, I&apos;m Iris!
              </h2>

              {/* Location tags — two stacked lines */}
              <div className="flex flex-col" style={{ gap: 4, marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 300, color: "#888888" }}>
                  📍 Austin, TX · NYC soon
                </span>
                <span style={{ fontSize: 12, fontWeight: 300, color: "#888888" }}>
                  🎓 UT Austin · Advertising + CS · 2027
                </span>
              </div>

              <p style={{ fontSize: 14, fontWeight: 300, color: "#444444", lineHeight: 1.8, marginBottom: 16 }}>
                With a diverse span of work, I lead with one desire. The ultimate goal to bridge
                complex systems to intuitive understanding.
              </p>

              <p style={{ fontSize: 14, fontWeight: 300, color: "#444444", lineHeight: 1.8, marginBottom: 20 }}>
                I&apos;m an Advertising student at UT Austin with minors in CS, design strategies,
                &amp; entrepreneurship. I spend my time building products, writing about healthcare
                law, photographing race cars, and illustrating for a newspaper. Each tells a story
                that deserves to be heard.
              </p>

              <a
                href="mailto:iriswang32@gmail.com"
                className="text-gradient-ihwn font-[300] hover:opacity-80 transition-opacity"
                style={{ fontSize: 14 }}
              >
                Working on something cool? Let&apos;s talk! →
              </a>
            </div>
          </div>
        </section>

        {/* ── WORK SECTION ── */}
        <section id="work" style={{ marginBottom: 72 }}>
          <p className="section-label" style={{ color: "#BBBBBB", marginBottom: 20 }}>
            WORK
          </p>

          <div>
            {WORK_ITEMS.map((item, i) => (
              <WorkRow key={item.name} item={item} isLast={i === WORK_ITEMS.length - 1} />
            ))}
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
        <section id="community" style={{ marginBottom: 72 }}>
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
        <section id="philosophy" style={{ marginBottom: 72 }}>
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
        <section id="entertainment" style={{ marginBottom: 72 }}>
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
        <section id="funfacts" style={{ marginBottom: 40 }}>
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
  );
}
