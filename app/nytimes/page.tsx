import type { Metadata } from "next";
import NytimesGate from "@/components/NytimesGate";

export const metadata: Metadata = {
  title: "Private Review — Iris Wang",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NytimesPage() {
  return <NytimesGate />;
}
