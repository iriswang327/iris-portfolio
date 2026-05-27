import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Design, strategy, & everything in between. Iris Wang — UT Austin · 2027.",
};

export default function AboutPage() {
  return <AboutContent />;
}
