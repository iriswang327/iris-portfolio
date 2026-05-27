import PrivateGate from "@/components/PrivateGate";

export default function NytimesGate() {
  return (
    <PrivateGate
      slug="nytimes"
      frameClassName="nytimes-frame"
      gateClassPrefix="nytimes-gate"
      frameTitle="Iris Wang — New York Times Advertising"
      hint="For NYT Advertising review — Iris Wang · 2026"
    />
  );
}
