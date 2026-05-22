"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/", label: "DESIGN" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/about", label: "ABOUT" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="fixed top-8 left-0 right-0 z-[100] h-14 flex items-center justify-end"
      style={{
        background: scrolled ? "rgba(250,249,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 300ms ease, backdrop-filter 300ms ease, -webkit-backdrop-filter 300ms ease",
      }}
    >
      <nav
        className="flex items-center"
        style={{ gap: "28px", paddingRight: 24 }}
        aria-label="Main navigation"
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="relative text-[13px] transition-colors duration-200"
            style={{
              fontWeight: 300,
              color: "var(--foreground)",
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
      </nav>
    </header>
  );
}
