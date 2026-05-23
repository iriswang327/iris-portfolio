import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gemini",
};

export default function GeminiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
