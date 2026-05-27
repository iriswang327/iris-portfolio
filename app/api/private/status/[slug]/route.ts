import { NextResponse } from "next/server";
import { hasPrivateAccess, isPrivateSlug } from "@/lib/private-access";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  if (!isPrivateSlug(slug)) {
    return NextResponse.json({ unlocked: false }, { status: 404 });
  }

  const unlocked = await hasPrivateAccess(slug);
  return NextResponse.json({ unlocked });
}
