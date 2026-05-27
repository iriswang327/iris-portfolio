import PrivateGate from "@/components/PrivateGate";

export default function ReviewNGate() {
  return (
    <PrivateGate
      slug="n"
      frameClassName="review-n-frame"
      gateClassPrefix="review-n-gate"
      frameTitle="Iris Wang — Private Application"
      hint="For review — Iris Wang · 2026"
    />
  );
}
