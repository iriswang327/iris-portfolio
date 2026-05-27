import type { Metadata } from "next";
import ReviewNGate from "@/components/ReviewNGate";

export const metadata: Metadata = {
  title: "Private Review — Iris Wang",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewNPage() {
  return <ReviewNGate />;
}
