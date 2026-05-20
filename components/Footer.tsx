import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/", label: "Dreams" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
] as const;

const CHANGELOG_DATE = "May 2026";

export default function Footer() {
  return (
    <footer
      className="mt-24"
      style={{ borderTop: "0.5px solid var(--border)" }}
    >
      <div
        className="content-wrap py-9"
        style={{ padding: "36px var(--pad-desktop)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left — Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/images/lotus-logo.png"
                alt="Iris Wang logo"
                height={20}
                width={20}
                className="h-5 w-auto"
              />
              <span
                className="text-sm font-normal"
                style={{ color: "var(--foreground)" }}
              >
                iris wang
              </span>
            </div>
            <p
              className="text-[11px] font-light"
              style={{ color: "#bbbbbb" }}
            >
              🕐 Austin, TX
            </p>
            <p
              className="text-[10px] font-light"
              style={{ color: "#cccccc" }}
            >
              Built with Next.js &amp;{" "}
              <span className="text-gradient-ihwn">americanos</span> ☕
            </p>
          </div>

          {/* Center — Navigation */}
          <nav
            className="flex flex-col md:flex-row md:items-center gap-3 md:justify-center"
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] font-light transition-colors duration-150 hover:opacity-80"
                style={{ color: "#999999" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right — Contact */}
          <div className="flex flex-col gap-2 md:items-end">
            <p
              className="text-[12px]"
              style={{ color: "#bbbbbb" }}
            >
              Let&apos;s talk!
            </p>
            <a
              href="mailto:iriswang32@gmail.com"
              className="text-[13px] font-normal transition-opacity duration-150 hover:opacity-70"
              style={{ color: "var(--foreground)" }}
            >
              iriswang32@gmail.com
            </a>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-light transition-opacity duration-150 hover:opacity-70"
                style={{ color: "#999999" }}
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-light transition-opacity duration-150 hover:opacity-70"
                style={{ color: "#999999" }}
                aria-label="LinkedIn"
              >
                li
              </a>
              <span
                className="text-[12px] font-light"
                style={{ color: "#999999" }}
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          </div>
        </div>

        {/* Changelog */}
        <p
          className="mt-8 text-[10px] uppercase tracking-widest"
          style={{ color: "#dddddd", letterSpacing: "0.1em" }}
        >
          CHANGELOG: {CHANGELOG_DATE}
        </p>
      </div>
    </footer>
  );
}
