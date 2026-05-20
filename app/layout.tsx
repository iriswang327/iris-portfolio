import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { EmotionProvider } from "@/context/EmotionContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Museum of Iris",
  description: "Working at the edges of law, tech, and people. — Iris Wang, UT Austin · Advertising + CS · 2027",
  openGraph: {
    title: "Museum of Iris",
    description: "Working at the edges of law, tech, and people.",
    siteName: "Museum of Iris",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Museum of Iris",
    description: "Working at the edges of law, tech, and people.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.variable}>
        <EmotionProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </EmotionProvider>
      </body>
    </html>
  );
}
