import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const PRIVATE_SLUGS = ["a", "n"] as const;

export type PrivateSlug = (typeof PRIVATE_SLUGS)[number];

const COOKIE_PREFIX = "private_access_";

function getAuthSecret(): string {
  const secret = process.env.PRIVATE_AUTH_SECRET;
  if (!secret) {
    throw new Error("PRIVATE_AUTH_SECRET is not configured.");
  }
  return secret;
}

export function isPrivateSlug(value: string): value is PrivateSlug {
  return PRIVATE_SLUGS.includes(value as PrivateSlug);
}

export function getPrivatePassword(slug: PrivateSlug): string | undefined {
  if (slug === "a") {
    return process.env.REVIEW_A_PASSWORD;
  }

  return process.env.REVIEW_N_PASSWORD;
}

export function createAccessToken(slug: PrivateSlug): string {
  return createHmac("sha256", getAuthSecret()).update(slug).digest("hex");
}

export function verifyAccessToken(slug: PrivateSlug, token: string): boolean {
  const expected = Buffer.from(createAccessToken(slug));
  const received = Buffer.from(token);

  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(expected, received);
}

export function getPrivateCookieName(slug: PrivateSlug): string {
  return `${COOKIE_PREFIX}${slug}`;
}

export async function hasPrivateAccess(slug: PrivateSlug): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getPrivateCookieName(slug))?.value;
  return Boolean(token && verifyAccessToken(slug, token));
}

export function getPrivateCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}
