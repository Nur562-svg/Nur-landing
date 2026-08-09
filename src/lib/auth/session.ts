import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { AuthUserView, MembershipTier } from "@/types/auth";

const SESSION_COOKIE = "nur_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 天
const ALGORITHM = "HS256";

export type SessionPayload = {
  sub: string;
  email: string;
  displayName: string;
  membershipTier: MembershipTier;
};

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

/** 签发会话 JWT。 */
export async function createSessionToken(user: AuthUserView): Promise<string> {
  return new SignJWT({
    email: user.email,
    displayName: user.displayName,
    membershipTier: user.membershipTier,
  })
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

/** 校验并解析会话 JWT；无效或过期返回 null。 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALGORITHM] });
    if (!payload.sub || typeof payload.email !== "string") {
      return null;
    }
    const tier: MembershipTier =
      payload.membershipTier === "pro" ? "pro" : "free";
    return {
      sub: payload.sub,
      email: payload.email,
      displayName: typeof payload.displayName === "string" ? payload.displayName : payload.email,
      membershipTier: tier,
    };
  } catch {
    return null;
  }
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

/** 写入会话 cookie。 */
export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, cookieOptions());
}

/** 清除会话 cookie。 */
export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** 读取当前请求的会话；未登录返回 null。 */
export async function getCurrentSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return verifySessionToken(token);
}
