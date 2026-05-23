import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ company: string; project: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company, project } = await params;
  const title = decodeURIComponent(project).replace(/-/g, " ");
  return {
    title,
    description: `${decodeURIComponent(company)} case study.`,
  };
}

export default async function DreamsCaseStudyPage({ params }: Props) {
  const { company } = await params;

  return (
    <div className="pt-14">
      <div className="content-wrap py-12">
        <Link
          href="/"
          className="text-[11px] font-light transition-opacity hover:opacity-70 mb-8 block"
          style={{ color: "#bbbbbb" }}
        >
          ← Back to Dreams
        </Link>
        {/* Case study template — content coming next */}
        <p className="text-[13px]" style={{ color: "var(--muted)" }}>
          {decodeURIComponent(company)} case study
        </p>
      </div>
    </div>
  );
}
