import type { Metadata } from "next";
import ReviewAGate from "@/components/ReviewAGate";

export const metadata: Metadata = {
  title: "Private Review — Iris Wang",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewAPage() {
  return <ReviewAGate />;
}
