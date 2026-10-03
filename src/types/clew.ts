/**
 * Clew 数据契约（M1：上传 + 书架 + 当月名额；M2：目录识别 + 手动修正；M3：知识点萃取；M4：讲义 + 讲解对话）。
 * 教材与学习数据全部私有挂 userId，不进官方课程目录、不进 /courses。
 */

import type { LoopProfileId } from "./loop-profile";

/** 教材状态；M1 产出 uploaded，M2 目录识别完成后为 toc_ready，其余取值供 M3 萃取使用。 */
export type ClewTextbookStatus =
  | "uploaded"
  | "toc_ready"
  | "extracting"
  | "ready"
  | "failed";

/** 章节来源（诚实标注识别路径，人工修正后为 manual）。 */
export type ClewChapterSource = "outline" | "toc-page" | "model" | "manual" | "docx-heading";

/** 章节萃取状态；M2 只写 pending，M3 才推进。 */
export type ClewChapterStatus = "pending" | "extracting" | "extracted" | "failed";

/** 章节视图（pageStart/pageEnd 均为 PDF 页序，1 起）。 */
export type ClewChapterView = {
  id: string;
  order: number;
  title: string;
  pageStart: number;
  pageEnd: number;
  source: ClewChapterSource;
  status: ClewChapterStatus;
  knowledgePointCount: number;
};

/** 知识点视图（M3 模型萃取草稿，含页码溯源；ZCODE-M2 起携带学习闭环 profile）。 */
export type ClewKnowledgePointView = {
  id: string;
  order: number;
  title: string;
  description: string;
  keyTerms: string[];
  prerequisites: string[];
  sourcePage: number;
  /** 学习闭环 profile（六种预定义之一；萃取时规则引擎建议，用户可改）。 */
  loopProfileId: LoopProfileId;
};

/** 目录识别结果元信息（不重复存章节本身）。 */
export type ClewTocRecognitionView = {
  strategy: ClewTocStrategy;
  chapterCount: number;
  notes: string[];
  recognizedAt: string;
  /** 用户确认章节结构（SpineEditor）的时间；缺省 = 尚未确认，不允许萃取。 */
  spineConfirmedAt?: string | null;
};

/** 识别路径：书签 / 印刷目录页 / 模型 / 未识别。 */
export type ClewTocStrategy = "outline" | "toc-page" | "model" | "none" | "docx-heading";

/** 书架教材视图（不含 storageKey 等服务器内部字段）。 */
export type ClewTextbookView = {
  id: string;
  title: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
  hasTextLayer: boolean;
  status: ClewTextbookStatus;
  /** 激活月 YYYY-MM（Asia/Shanghai）；与当前月不一致即为冻结态。 */
  activeMonth: string;
  isFrozen: boolean;
  chapterCount: number;
  recognition: ClewTocRecognitionView | null;
  /** 章节结构确认时间（SpineEditor）；null/undefined = 未确认，萃取入口应禁用。 */
  spineConfirmedAt?: string | null;
  createdAt: string;
};

/** 教材详情：教材 + 章节树。 */
export type ClewTextbookDetail = {
  textbook: ClewTextbookView;
  chapters: ClewChapterView[];
};

/** 目录识别 SSE 事件。 */
export type ClewTocEvent =
  | { type: "progress"; stage: "read" | "outline" | "toc-page" | "model" | "save"; message: string }
  | { type: "result"; detail: ClewTextbookDetail }
  | { type: "error"; code: ClewErrorCode; error: string };

/** 单章萃取结果（SSE result 载荷）。 */
export type ClewChapterExtractionResult = {
  chapter: ClewChapterView;
  knowledgePoints: ClewKnowledgePointView[];
  notes: string[];
};

/** 知识点萃取 SSE 事件（进度与 Mentrix 风格对齐：精读第 N 章 → 逐知识点写入）。 */
export type ClewExtractEvent =
  | {
      type: "progress";
      stage: "read" | "extracting" | "save";
      /** 当前章序（1 起）与总章数，供前端显示「第 N/M 章」。 */
      chapterIndex?: number;
      chapterTotal?: number;
      message: string;
    }
  | { type: "kp"; chapterIndex: number; knowledgePoint: ClewKnowledgePointView }
  | { type: "result"; result: ClewChapterExtractionResult }
  | { type: "error"; code: ClewErrorCode; error: string };

/** 当月名额视图（名额仅当月有效）。 */
export type ClewQuotaView = {
  month: string;
  used: number;
  limit: number;
  remaining: number;
};

/** 书架快照：教材列表 + 当月名额。 */
export type ClewShelf = {
  textbooks: ClewTextbookView[];
  quota: ClewQuotaView;
};

/** 失败类别；API 路由据此映射 HTTP 状态与中文原因。 */
export type ClewErrorCode =
  | "unauthorized"
  | "invalid-request"
  | "invalid-file"
  | "file-too-large"
  | "unsupported-scan"
  | "page-limit"
  | "pdf-unreadable"
  | "quota-exceeded"
  | "no-toc"
  | "extraction-failed"
  | "lesson-failed"
  | "chat-failed"
  | "note-failed"
  | "not-found"
  | "storage-unavailable"
  | "spine-not-confirmed"
  | "server-error";

/** API 失败响应（成功响应由各路由按载荷定义）。 */
export type ClewApiFailure = {
  ok: false;
  code: ClewErrorCode;
  error: string;
};

/* ---------------- M4：讲义 + 讲解对话 ---------------- */

/**
 * 讲解风格（账户级 `User.clewLessonStyle`；生成时可显式选择，最近一次选择即账户默认）。
 * zh-primary 中文为主·术语标原文 / exam-cram 考点速记 / socratic 引导追问 / en-primary 英文为主。
 */
export type ClewLessonStyle = "zh-primary" | "exam-cram" | "socratic" | "en-primary";

/** 讲义生成方式；启发式兜底必须能一眼看出「未接入模型」。 */
export type ClewLessonGenerator =
  | { kind: "model"; provider: string; model: string }
  | { kind: "heuristic" };

/** 知识点讲义视图（每知识点至多一份，重新生成即覆盖）。 */
export type ClewLessonView = {
  contentMd: string;
  style: ClewLessonStyle;
  generator: ClewLessonGenerator;
  generatedAt: string;
};

/** 讲解对话消息（服务端持久化进 ClewConversation.messages）。 */
export type ClewChatRole = "user" | "assistant";

export type ClewChatMessage = {
  role: ClewChatRole;
  content: string;
  createdAt: string;
};

/** 讲解对话视图（kpId 为 M6 课题工作坊预留可空）。 */
export type ClewConversationView = {
  kpId: string;
  messages: ClewChatMessage[];
};

/** 讲义生成 SSE 事件（进度 → 增量 markdown → 结果）。 */
export type ClewLessonEvent =
  | { type: "progress"; stage: "read" | "generating" | "save"; message: string }
  | { type: "delta"; text: string }
  | { type: "result"; lesson: ClewLessonView; notes: string[] }
  | { type: "error"; code: ClewErrorCode; error: string };

/** 讲解对话 SSE 事件（增量文本 → 结果含落库后的完整消息列表）。 */
export type ClewChatEvent =
  | { type: "delta"; text: string }
  | { type: "result"; conversation: ClewConversationView; notes: string[] }
  | { type: "error"; code: ClewErrorCode; error: string };

/** 学习页左侧知识点列表项：萃取结果 + 讲义状态。 */
export type ClewKnowledgePointStudySummary = ClewKnowledgePointView & {
  hasLesson: boolean;
};

/** 学习页章节视图（教材 + 章节 + 知识点列表）。 */
export type ClewChapterStudyView = {
  textbook: { id: string; title: string; pageCount: number; fileName: string };
  chapter: ClewChapterView;
  /** 当前章序（1 起）与总章数，供「第 N/M 章」显示。 */
  chapterIndex: number;
  chapterTotal: number;
  knowledgePoints: ClewKnowledgePointStudySummary[];
  lessonCount: number;
  /** M5: 本章学霸笔记（每用户每章一份）。 */
  note: ClewNoteView | null;
};

/** 学习页当前选中知识点的完整视图（讲义 + 对话历史 + 我的划重点）。 */
export type ClewKnowledgePointStudyView = {
  knowledgePoint: ClewKnowledgePointView;
  chapterTitle: string;
  lesson: ClewLessonView | null;
  messages: ClewChatMessage[];
  highlights: ClewHighlightView[];
};

/* ---------------- M5：划重点/批注 + 学霸笔记 ---------------- */

/** 四色划线（固定枚举；低饱和度，不抢正文）。 */
export type ClewHighlightColor = "amber" | "cinnabar" | "slate" | "jade";

/** 划重点/批注视图（quote/prefix/suffix 为讲义渲染文本中的选中文字与前后文定位上下文）。 */
export type ClewHighlightView = {
  id: string;
  kpId: string;
  quote: string;
  prefix: string;
  suffix: string;
  color: ClewHighlightColor;
  note: string | null;
  /** 创建时的讲义版本（ISO）；与当前讲义 generatedAt 不一致即失配，进入「未定位」。 */
  anchorLessonUpdatedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/** 定位锚点（Json 列，按不可信输入解析）。 */
export type ClewHighlightAnchor = {
  lessonUpdatedAt: string | null;
};

/** 已定位的划重点渲染项（客户端 DOM 定位用）。 */
export type ClewHighlightPaintItem = {
  id: string;
  color: ClewHighlightColor;
  quote: string;
  prefix: string;
  suffix: string;
};

/** 划线选区上下文（quote 去首尾空白，prefix/suffix 为选区前后文，服务端会再限长）。 */
export type ClewHighlightSelection = {
  quote: string;
  prefix: string;
  suffix: string;
};

/** 章级学霸笔记视图（每用户每章一份，重新生成即覆盖）。 */
export type ClewNoteView = {
  chapterId: string;
  contentMd: string;
  generator: ClewLessonGenerator;
  generatedAt: string;
};

/** 学霸笔记生成 SSE 事件（与讲义生成对齐：进度 → 增量 markdown → 结果）。 */
export type ClewNoteEvent =
  | { type: "progress"; stage: "collect" | "generating" | "save"; message: string }
  | { type: "delta"; text: string }
  | { type: "result"; note: ClewNoteView; notes: string[] }
  | { type: "error"; code: ClewErrorCode; error: string };

/* ---------------- M6：课题工作坊 ---------------- */

/** 工作坊材料状态；M6 上传即同步检测，成功即 ready，不合格直接拒绝不落库。 */
export type ClewWorkshopFileStatus = "uploaded" | "ready" | "failed";

/** 工作坊材料视图（pageCount：PDF 为真实页数，文本按行数折算）。 */
export type ClewWorkshopFileView = {
  id: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
  hasTextLayer: boolean;
  status: ClewWorkshopFileStatus;
  /** M6 唯一取值为 "not-attempted"（OCR 后置）。 */
  ocrStatus: string;
  /** status=failed 时的中文原因（如实展示）。 */
  failureReason: string | null;
  createdAt: string;
};

/** 课题工作坊视图（列表项）。 */
export type ClewWorkshopView = {
  id: string;
  title: string;
  note: string | null;
  fileCount: number;
  createdAt: string;
  updatedAt: string;
};

/** 工作坊限额视图（按档位；工作坊材料不占教材当月名额）。 */
export type ClewWorkshopLimitsView = {
  workshopUsed: number;
  workshopLimit: number;
  filesPerWorkshopLimit: number;
  maxPagesPerFile: number;
};

/** 工作坊列表快照。 */
export type ClewWorkshopListView = {
  workshops: ClewWorkshopView[];
  limits: ClewWorkshopLimitsView;
};

/** 工作坊详情：工作坊 + 材料清单 + 答疑对话历史。 */
export type ClewWorkshopDetailView = {
  workshop: ClewWorkshopView;
  files: ClewWorkshopFileView[];
  messages: ClewChatMessage[];
  limits: ClewWorkshopLimitsView;
};

/** 检索命中的材料片段（答疑回答的引用来源；页码/行号为材料内定位）。 */
export type ClewWorkshopCitation = {
  fileId: string;
  fileName: string;
  /** 中文定位标签，如「第 3 页」「第 41–80 行」。 */
  locator: string;
  excerpt: string;
};

/** 工作坊答疑对话视图（workshopId 维度）。 */
export type ClewWorkshopConversationView = {
  workshopId: string;
  messages: ClewChatMessage[];
};

/** 工作坊答疑 SSE 事件（与 M4/M5 对齐：progress → delta → result/error）。 */
export type ClewWorkshopChatEvent =
  | { type: "progress"; stage: "search" | "answer" | "save"; message: string }
  | { type: "delta"; text: string }
  | {
      type: "result";
      conversation: ClewWorkshopConversationView;
      citations: ClewWorkshopCitation[];
      notes: string[];
    }
  | { type: "error"; code: ClewErrorCode; error: string };

/* ---------------- ZCODE-M2：Harness 教材编译管线 ---------------- */

/** 教材编译状态机（compiler.ts 单一真相源的服务端视图）。 */
export type ClewCompileState =
  | "uploaded"
  | "toc_ready"
  | "chapters_ready"
  | "extracting"
  | "ready"
  | "failed";

/** 编译进度（Mentrix 风格文字流）。 */
export type ClewCompileProgressView = {
  state: ClewCompileState;
  currentChapter?: number;
  totalChapters?: number;
  currentStep?: string;
  error?: string;
};

/** 单章编译结果（失败隔离后逐章回放）。 */
export type ClewCompileChapterOutcome = {
  chapterOrder: number;
  chapterTitle: string;
  ok: boolean;
  knowledgePointCount: number;
  error?: string;
};

/** 教材编译 SSE 事件（全书萃取走 Harness：进度 → 逐章结果 → 汇总）。 */
export type ClewCompileEvent =
  | { type: "progress"; progress: ClewCompileProgressView }
  | { type: "chapter"; outcome: ClewCompileChapterOutcome }
  | {
      type: "done";
      state: ClewCompileState;
      succeededChapters: number;
      failedChapters: number;
      knowledgePointCount: number;
      notes: string[];
    }
  | { type: "error"; code: ClewErrorCode; error: string };