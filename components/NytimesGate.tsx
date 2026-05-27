import PrivateGate from "@/components/PrivateGate";

export default function NytimesGate() {
  return (
    <PrivateGate
      slug="nytimes"
      frameClassName="nytimes-frame"
      gateClassPrefix="nytimes-gate"
      frameTitle="Iris Wang — Private Application"
      hint="For review — Iris Wang · 2026"
    />
  );
}
