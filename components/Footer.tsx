import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/", label: "Design" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer" style={{ viewTransitionName: "site-footer" }}>
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <Link
            href="/about"
            className="site-footer-brand group"
            aria-label="About Iris Wang"
          >
            <span className="site-footer-logo-wrap" aria-hidden="true">
              <Image
                src="/images/lotus-logo.png"
                alt=""
                width={48}
                height={48}
                className="site-footer-logo"
              />
            </span>
            <span className="site-footer-brand-text">
              <span className="site-footer-name">iris wang</span>
              <span className="site-footer-subline">ATX · NYC · TPE</span>
            </span>
          </Link>

          <div className="site-footer-contact">
            <p className="site-footer-contact-label">Feel free to reach out</p>
            <a
              href="mailto:iriswang32@gmail.com"
              className="site-footer-email group/email"
            >
              iriswang32@gmail.com
              <span className="site-footer-email-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/iriswang32/"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-social"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="site-footer-bottom">
          <nav className="site-footer-nav" aria-label="Footer navigation">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="site-footer-nav-link">
                {label}
              </Link>
            ))}
          </nav>

          <div className="site-footer-meta">
            <p className="site-footer-credits">
              Built with Next.js &amp;{" "}
              <span className="text-gradient-ihwn">americanos</span> ☕
            </p>
            <p className="site-footer-stamp">made in may 2026 ✦</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
