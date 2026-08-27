import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Design, strategy, and product. Iris Wang, UT Austin · Advertising · 2027.",
};

export default function AboutPage() {
  return <AboutContent />;
}
