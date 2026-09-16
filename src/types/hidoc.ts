/**
 * Hi doc 数据契约（M1：上传 + 书架 + 当月名额；M2：目录识别 + 手动修正）。
 * 教材与学习数据全部私有挂 userId，不进官方课程目录、不进 /courses。
 */

/** 教材状态；M1 产出 uploaded，M2 目录识别完成后为 toc_ready，其余取值供 M3 萃取使用。 */
export type HiDocTextbookStatus =
  | "uploaded"
  | "toc_ready"
  | "extracting"
  | "ready"
  | "failed";

/** 章节来源（诚实标注识别路径，人工修正后为 manual）。 */
export type HiDocChapterSource = "outline" | "toc-page" | "model" | "manual";

/** 章节萃取状态；M2 只写 pending，M3 才推进。 */
export type HiDocChapterStatus = "pending" | "extracting" | "extracted" | "failed";

/** 章节视图（pageStart/pageEnd 均为 PDF 页序，1 起）。 */
export type HiDocChapterView = {
  id: string;
  order: number;
  title: string;
  pageStart: number;
  pageEnd: number;
  source: HiDocChapterSource;
  status: HiDocChapterStatus;
};

/** 目录识别结果元信息（不重复存章节本身）。 */
export type HiDocTocRecognitionView = {
  strategy: HiDocTocStrategy;
  chapterCount: number;
  notes: string[];
  recognizedAt: string;
};

/** 识别路径：书签 / 印刷目录页 / 模型 / 未识别。 */
export type HiDocTocStrategy = "outline" | "toc-page" | "model" | "none";

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
  chapterCount: number;
  recognition: HiDocTocRecognitionView | null;
  createdAt: string;
};

/** 教材详情：教材 + 章节树。 */
export type HiDocTextbookDetail = {
  textbook: HiDocTextbookView;
  chapters: HiDocChapterView[];
};

/** 目录识别 SSE 事件。 */
export type HiDocTocEvent =
  | { type: "progress"; stage: "read" | "outline" | "toc-page" | "model" | "save"; message: string }
  | { type: "result"; detail: HiDocTextbookDetail }
  | { type: "error"; code: HiDocErrorCode; error: string };

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
  | "no-toc"
  | "not-found"
  | "storage-unavailable"
  | "server-error";

/** API 失败响应（成功响应由各路由按载荷定义）。 */
export type HiDocApiFailure = {
  ok: false;
  code: HiDocErrorCode;
  error: string;
};