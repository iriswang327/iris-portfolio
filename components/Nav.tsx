"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEmotion } from "@/context/EmotionContext";

const NAV_LINKS = [
  { href: "/", label: "DREAMS" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/about", label: "ABOUT" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const { emotionConfig, setShowPicker } = useEmotion();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(var(--nav-blur))",
        WebkitBackdropFilter: "blur(var(--nav-blur))",
        borderBottom: "0.5px solid var(--border-nav)",
      }}
    >
      <div className="content-wrap w-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Museum of Iris — Home"
        >
          <Image
            src="/images/lotus-logo.png"
            alt="Iris Wang logo"
            height={32}
            width={32}
            className="h-8 w-auto"
            priority
          />
          <span
            className="text-sm font-normal tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            iris wang
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center" style={{ gap: "28px" }} aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-[13px] transition-colors duration-200"
              style={{
                fontWeight: isActive(href) ? 400 : 300,
                color: isActive(href) ? "var(--foreground)" : "#888888",
                letterSpacing: "0.02em",
              }}
              aria-current={isActive(href) ? "page" : undefined}
            >
              {label}
              {isActive(href) && (
                <span
                  className="absolute -bottom-px left-0 right-0 h-px"
                  style={{ background: "var(--gradient-ihwn)" }}
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}

          {/* Emotion dot */}
          <button
            onClick={() => setShowPicker(true)}
            className="flex items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            style={{
              width: 8,
              height: 8,
              minWidth: 8,
              background: emotionConfig?.color ?? "rgba(167,139,250,0.4)",
              padding: 0,
            }}
            aria-label="Change your mood"
            title="change your mood"
          />
        </nav>
      </div>
    </header>
  );
}
