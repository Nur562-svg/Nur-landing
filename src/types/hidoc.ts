/**
 * Hi doc 数据契约（M1：上传 + 书架 + 当月名额）。
 * 教材与学习数据全部私有挂 userId，不进官方课程目录、不进 /courses。
 */

/** 教材状态；M1 只产出 uploaded，其余取值供 M2+ 目录识别/萃取使用。 */
export type HiDocTextbookStatus =
  | "uploaded"
  | "toc_ready"
  | "extracting"
  | "ready"
  | "failed";

/** 书架教材视图（不含 storageKey 等服务器内部字段）。 */
export type HiDocTextbookView = {
  id: string;
  title: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
  hasTextLayer: boolean;
  status: HiDocTextbookStatus;
  /** 激活月 YYYY-MM（Asia/Shanghai）；与当前月不一致即为冻结态。 */
  activeMonth: string;
  isFrozen: boolean;
  createdAt: string;
};

/** 当月名额视图（名额仅当月有效）。 */
export type HiDocQuotaView = {
  month: string;
  used: number;
  limit: number;
  remaining: number;
};

/** 书架快照：教材列表 + 当月名额。 */
export type HiDocShelf = {
  textbooks: HiDocTextbookView[];
  quota: HiDocQuotaView;
};

/** 失败类别；API 路由据此映射 HTTP 状态与中文原因。 */
export type HiDocErrorCode =
  | "unauthorized"
  | "invalid-request"
  | "invalid-file"
  | "file-too-large"
  | "unsupported-scan"
  | "page-limit"
  | "pdf-unreadable"
  | "quota-exceeded"
  | "not-found"
  | "storage-unavailable"
  | "server-error";

/** API 失败响应（成功响应由各路由按载荷定义）。 */
export type HiDocApiFailure = {
  ok: false;
  code: HiDocErrorCode;
  error: string;
};