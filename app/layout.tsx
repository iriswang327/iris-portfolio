import type { Metadata } from "next";
import { Caveat, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { EmotionProvider } from "@/context/EmotionContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.iriswangportfolio.com"),
  title: {
    default: "iris wang",
    template: "%s",
  },
  description:
    "Creating intentional designs that bring ideas to reality. — Iris Wang, UT Austin · Advertising + CS · 2027",
  icons: {
    icon: [{ url: "/images/lotus-logo.png", type: "image/png" }],
    apple: [{ url: "/images/lotus-logo.png", type: "image/png" }],
  },
  openGraph: {
    title: "iris wang",
    description: "Creating intentional designs that bring ideas to reality.",
    siteName: "iris wang",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "iris wang — product designer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iris wang",
    description: "Creating intentional designs that bring ideas to reality.",
    images: ["/images/og-preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${caveat.variable} font-sans antialiased`}>
        <EmotionProvider>
          <div className="relative min-h-screen bg-[var(--background)]">
            {/* ── Ambient watercolor orbs ── */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-[130px] pointer-events-none z-0" aria-hidden="true" />
            <div className="absolute top-[35%] left-[-10%] w-[700px] h-[700px] bg-pink-400/[0.04] rounded-full blur-[140px] pointer-events-none z-0" aria-hidden="true" />
            <div className="absolute bottom-[10%] right-[-10%] w-[650px] h-[650px] bg-cyan-400/5 rounded-full blur-[120px] pointer-events-none z-0" aria-hidden="true" />

            {/* ── Site chrome ── */}
            <div className="relative z-10">
              <Nav />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </EmotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
