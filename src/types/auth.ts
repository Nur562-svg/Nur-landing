/** 会员层级（付费接入前固定 free；TS 联合类型约束，不使用数据库 enum 以保证 SQLite/Postgres 可移植）。 */
export type MembershipTier = "free" | "pro";

/** 对外暴露的用户视图（绝不包含 passwordHash）。 */
export type AuthUserView = {
  id: string;
  email: string;
  displayName: string;
  membershipTier: MembershipTier;
  createdAt: string;
};

/** 注册/登录表单输入。 */
export type AuthCredentials = {
  email: string;
  password: string;
  displayName?: string;
};

/** API 响应信封。 */
export type AuthApiResponse =
  | { ok: true; user: AuthUserView }
  | { ok: false; error: string; field?: "email" | "password" | "displayName" | "form" };
