import type { Metadata } from "next";
import AitherGate from "@/components/AitherGate";

export const metadata: Metadata = {
  title: "Private Review — Iris Wang",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AitherPage() {
  return <AitherGate />;
}
