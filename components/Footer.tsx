import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/", label: "Design" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
] as const;

export default function Footer() {
  return (
    <footer
      className="mt-24"
      style={{ borderTop: "0.5px solid var(--border)", viewTransitionName: "site-footer" }}
    >
      <div
        className="content-wrap py-9"
        style={{ padding: "36px var(--pad-desktop)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left — Brand */}
          <div className="flex flex-col gap-2">
            <Link
              href="/about"
              className="flex w-fit items-center gap-2.5 transition-opacity duration-150 hover:opacity-80"
              aria-label="About Iris Wang"
            >
              <Image
                src="/images/lotus-logo.png"
                alt=""
                height={32}
                width={32}
                className="h-8 w-8 object-contain"
                aria-hidden
              />
              <span
                className="text-sm font-normal"
                style={{ color: "var(--foreground)" }}
              >
                iris wang
              </span>
            </Link>
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
            <a
              href="https://www.linkedin.com/in/iriswang32/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-[12px] font-light transition-opacity duration-150 hover:opacity-70"
              style={{ color: "#999999" }}
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <p
          className="mt-8 text-[10px] font-light tracking-wide"
          style={{ color: "#dddddd" }}
        >
          made in May 2026
        </p>
      </div>
    </footer>
  );
}
