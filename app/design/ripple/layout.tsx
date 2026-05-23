import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ripple",
};

export default function RippleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
