import type { Metadata } from "next";
import NytimesGate from "@/components/NytimesGate";

export const metadata: Metadata = {
  title: "Iris Wang — New York Times Advertising",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NytimesPage() {
  return <NytimesGate />;
}
