import type { Metadata } from "next";
import AitherGate from "@/components/AitherGate";

export const metadata: Metadata = {
  title: "Iris Wang — AITHER",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AitherPage() {
  return <AitherGate />;
}
