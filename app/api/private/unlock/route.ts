import { NextResponse } from "next/server";
import {
  createAccessToken,
  getPrivateCookieName,
  getPrivateCookieOptions,
  getPrivatePassword,
  isPrivateSlug,
  type PrivateSlug,
} from "@/lib/private-access";

type UnlockBody = {
  slug?: string;
  password?: string;
};

export async function POST(request: Request) {
  let body: UnlockBody;

  try {
    body = (await request.json()) as UnlockBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const slug = body.slug;
  const password = body.password?.trim();

  if (!slug || !isPrivateSlug(slug) || !password) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const expectedPassword = getPrivatePassword(slug as PrivateSlug);

  if (!expectedPassword || !process.env.PRIVATE_AUTH_SECRET) {
    return NextResponse.json({ error: "Access is not configured." }, { status: 503 });
  }

  if (password !== expectedPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ unlocked: true });
  response.cookies.set(
    getPrivateCookieName(slug as PrivateSlug),
    createAccessToken(slug as PrivateSlug),
    getPrivateCookieOptions(),
  );

  return response;
}
