import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { hasPrivateAccess, isPrivateSlug } from "@/lib/private-access";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  if (!isPrivateSlug(slug)) {
    return new NextResponse("Not found.", { status: 404 });
  }

  const unlocked = await hasPrivateAccess(slug);

  if (!unlocked) {
    return new NextResponse("Unauthorized.", { status: 401 });
  }

  try {
    const filePath = path.join(process.cwd(), "private", "applications", `${slug}.html`);
    const html = await readFile(filePath, "utf8");

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new NextResponse("Content unavailable.", { status: 503 });
  }
}
