import bcrypt from "bcryptjs";

const BCRYPT_ROUNDS = 10;

/** bcrypt 哈希密码（含盐）。 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

/** 校验密码与哈希是否匹配。 */
export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

/** 密码强度规则：至少 8 位。 */
export function validatePasswordStrength(password: string): string | null {
  if (password.length < 8) {
    return "密码至少需要 8 位。";
  }
  return null;
}

/** 邮箱格式校验（宽松但实用的正则）。 */
export function validateEmailFormat(email: string): string | null {
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return "请输入有效的邮箱地址。";
  }
  return null;
}

/** 规范化邮箱（小写、去首尾空格）。 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
