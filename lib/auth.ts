import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = "habit_tracker_session";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export async function createAuthToken(userId: string) {
  return new SignJWT({
    userId,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function getAuthenticatedUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, getJwtSecret());

    if (typeof payload.userId !== "string") {
      return null;
    }

    return payload.userId;
  } catch {
    return null;
  }
}

export function getAuthCookieName() {
  return AUTH_COOKIE_NAME;
}
