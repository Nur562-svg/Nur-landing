import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import type { AuthUserView } from "@/types/auth";

/** 返回当前会话用户（未登录返回 { user: null }）。 */
export async function GET(): Promise<Response> {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }
  const user: AuthUserView = {
    id: session.sub,
    email: session.email,
    displayName: session.displayName,
    membershipTier: session.membershipTier,
    createdAt: "",
  };
  return NextResponse.json({ user });
}
