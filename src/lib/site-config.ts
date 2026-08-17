/**
 * 站点级配置（单一真相源）。
 * 域名、URL、备案号等部署相关常量统一从此文件导出，
 * sitemap / robots / metadata / 页面脚注等均引用此处，避免散落占位符。
 */

/** 生产域名（部署后替换为真实备案域名）。 */
export const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "nur-learn.example.com";

/** 完整站点 URL（含协议）。 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_DOMAIN}`;

/** 站点名称。 */
export const SITE_NAME = "NUR LEARN";

/** 站点描述。 */
export const SITE_DESCRIPTION =
  "面向中西医结合临床医学生的持续学习、辨证推理与考试训练平台。证据先行，保留教师权威边界。";

/** ICP 备案号（备案通过后填入，空字符串表示未备案）。 */
export const ICP_RECORD_NUMBER = process.env.NEXT_PUBLIC_ICP_RECORD_NUMBER ?? "";

/** 公安联网备案号（办理后填入）。 */
export const PUBLIC_SECURITY_RECORD_NUMBER =
  process.env.NEXT_PUBLIC_PUBLIC_SECURITY_RECORD_NUMBER ?? "";

/** 联系邮箱。 */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@nur-learn.example.com";
