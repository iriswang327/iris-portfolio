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
      className={`site-header${scrolled ? " site-header--scrolled" : ""}`}
      style={{
        viewTransitionName: "site-nav",
        transition:
          "background 300ms ease, backdrop-filter 300ms ease, -webkit-backdrop-filter 300ms ease",
      }}
    >
      <div className="site-header-inner">
        <nav className="site-nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`site-nav-link${active ? " site-nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {label}
                {active && (
                  <span className="site-nav-link-indicator" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
