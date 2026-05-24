import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/", label: "design" },
  { href: "/experience", label: "experience" },
  { href: "/about", label: "about" },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer" style={{ viewTransitionName: "site-footer" }}>
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-col site-footer-col--start">
            <Link
              href="/about"
              className="site-footer-brand"
              aria-label="About Iris Wang"
            >
              <Image
                src="/images/lotus-logo.png"
                alt=""
                width={60}
                height={60}
                className="site-footer-logo"
                aria-hidden
              />
              <span className="site-footer-brand-text">
                <span className="site-footer-name">iris wang</span>
                <span className="site-footer-subline">ATX · NYC · TPE</span>
              </span>
            </Link>
            <p className="site-footer-credits">
              built with next.js &amp;{" "}
              <span className="text-gradient-ihwn">americanos</span> ☕
            </p>
          </div>

          <nav className="site-footer-nav" aria-label="Footer navigation">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="site-footer-nav-link">
                {label}
              </Link>
            ))}
          </nav>

          <div className="site-footer-col site-footer-col--end">
            <div className="site-footer-contact">
              <p className="site-footer-contact-label">feel free to reach out</p>
              <div className="site-footer-contact-links">
                <a
                  href="mailto:iriswang32@gmail.com"
                  className="site-footer-contact-link"
                >
                  iriswang32@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/iriswang32/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-contact-link"
                >
                  linkedin
                </a>
              </div>
            </div>
            <p className="site-footer-stamp">made in may 2026 ✦</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
