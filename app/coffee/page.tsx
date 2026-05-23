import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What's Your Order?",
  description: "Build your coffee and tell Iris what you're having.",
};

export default function CoffeePage() {
  return (
    <div className="pt-14">
      {/* Coffee order builder — content coming next */}
    </div>
  );
}
