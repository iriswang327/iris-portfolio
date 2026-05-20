import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { EmotionProvider } from "@/context/EmotionContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EmotionPickerClient from "@/components/EmotionPickerClient";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Museum of Iris",
  description:
    "Working at the edges of law, tech, and people. — Iris Wang, UT Austin · Advertising + CS · 2027",
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
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <EmotionProvider>
          {/* Emotion picker — global fixed overlay, client-only */}
          <EmotionPickerClient />
          <Nav />
          <main>{children}</main>
          <Footer />
        </EmotionProvider>
      </body>
    </html>
  );
}
