import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iris Wang × Partiful",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartifulPage() {
  return (
    <iframe
      src="/api/private/content/partiful"
      className="partiful-frame"
      title="Iris Wang × Partiful"
    />
  );
}
