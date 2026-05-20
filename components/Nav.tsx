"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "DREAMS" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/about", label: "ABOUT" },
] as const;

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-end">
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
