import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ org: string; project: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { org, project } = await params;
  const title = `${decodeURIComponent(project).replace(/-/g, " ")} — Museum of Iris`;
  return {
    title,
    description: `${decodeURIComponent(org)} project.`,
  };
}

export default async function ExperienceCaseStudyPage({ params }: Props) {
  const { org } = await params;

  return (
    <div className="pt-14">
      <div className="content-wrap py-12">
        <Link
          href="/experience"
          className="text-[11px] font-light transition-opacity hover:opacity-70 mb-8 block"
          style={{ color: "#bbbbbb" }}
        >
          ← Back to Experience
        </Link>
        {/* Experience case study template — content coming next */}
        <p className="text-[13px]" style={{ color: "var(--muted)" }}>
          {decodeURIComponent(org)} project
        </p>
      </div>
    </div>
  );
}
