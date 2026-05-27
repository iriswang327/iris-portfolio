import PrivateGate from "@/components/PrivateGate";

export default function ReviewAGate() {
  return (
    <PrivateGate
      slug="a"
      frameClassName="review-a-frame"
      gateClassPrefix="review-a-gate"
      frameTitle="Iris Wang — Private Application"
      hint="For review — Iris Wang · 2026"
    />
  );
}
