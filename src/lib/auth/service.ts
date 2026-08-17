import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  normalizeEmail,
  validateEmailFormat,
  validatePasswordStrength,
  verifyPassword,
} from "@/lib/auth/password";
import type { AuthCredentials, AuthUserView, MembershipTier } from "@/types/auth";

/** 简单内存登录限流：同一标识（邮箱+IP）连续失败 5 次后锁定 15 分钟。单实例有效，部署多实例后需换共享存储。 */
const FAILURE_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const failureTracker = new Map<string, { count: number; lockedUntil: number }>();

function failureKey(email: string, ip: string): string {
  return `${normalizeEmail(email)}::${ip}`;
}

export function isLoginLocked(email: string, ip: string): boolean {
  const entry = failureTracker.get(failureKey(email, ip));
  if (!entry) {
    return false;
  }
  if (entry.lockedUntil > Date.now()) {
    return true;
  }
  failureTracker.delete(failureKey(email, ip));
  return false;
}

export function recordLoginFailure(email: string, ip: string): void {
  const key = failureKey(email, ip);
  const entry = failureTracker.get(key) ?? { count: 0, lockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= MAX_FAILURES) {
    entry.lockedUntil = Date.now() + FAILURE_WINDOW_MS;
    entry.count = 0;
  }
  failureTracker.set(key, entry);
}

export function clearLoginFailures(email: string, ip: string): void {
  failureTracker.delete(failureKey(email, ip));
}

export function toUserView(user: {
  id: string;
  email: string;
  displayName: string;
  membershipTier: string;
  membershipExpiresAt?: Date | null;
  emailVerifiedAt?: Date | null;
  createdAt: Date;
}): AuthUserView {
  const tier: MembershipTier =
    user.membershipTier === "pro" ? "pro" : user.membershipTier === "lite" ? "lite" : "free";
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    membershipTier: tier,
    membershipExpiresAt: user.membershipExpiresAt ? user.membershipExpiresAt.toISOString() : null,
    emailVerified: !!user.emailVerifiedAt,
    createdAt: user.createdAt.toISOString(),
  };
}

/**
 * 注册新用户。返回 { ok: true, user } 或 { ok: false, error, field }。
 * 邮箱唯一性冲突返回 field: "email"。
 */
export async function registerUser(
  input: AuthCredentials,
): Promise<{ ok: true; user: AuthUserView } | { ok: false; error: string; field: "email" | "password" | "displayName" | "form" }> {
  const email = normalizeEmail(input.email);
  const emailError = validateEmailFormat(email);
  if (emailError) {
    return { ok: false, error: emailError, field: "email" };
  }
  const passwordError = validatePasswordStrength(input.password);
  if (passwordError) {
    return { ok: false, error: passwordError, field: "password" };
  }
  const displayName = (input.displayName ?? "").trim();
  if (displayName.length < 1 || displayName.length > 24) {
    return { ok: false, error: "昵称需为 1–24 个字符。", field: "displayName" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "该邮箱已注册，请直接登录。", field: "email" };
  }

  const passwordHash = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: { email, passwordHash, displayName },
  });
  return { ok: true, user: toUserView(user) };
}

/**
 * 登录。密码错误与用户不存在返回同一提示（不泄露账户是否存在）。
 */
export async function loginUser(
  input: Pick<AuthCredentials, "email" | "password">,
  ip: string,
): Promise<{ ok: true; user: AuthUserView } | { ok: false; error: string; field: "email" | "password" | "form" }> {
  const email = normalizeEmail(input.email);
  if (isLoginLocked(email, ip)) {
    return { ok: false, error: "失败次数过多，请 15 分钟后再试。", field: "form" };
  }
  const emailError = validateEmailFormat(email);
  if (emailError) {
    return { ok: false, error: emailError, field: "email" };
  }
  if (input.password.length === 0) {
    return { ok: false, error: "请输入密码。", field: "password" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    recordLoginFailure(email, ip);
    return { ok: false, error: "邮箱或密码不正确。", field: "form" };
  }
  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) {
    recordLoginFailure(email, ip);
    return { ok: false, error: "邮箱或密码不正确。", field: "form" };
  }
  clearLoginFailures(email, ip);
  return { ok: true, user: toUserView(user) };
}
