/**
 * Hi doc 数据契约（M1：上传 + 书架 + 当月名额；M2：目录识别 + 手动修正；M3：知识点萃取；M4：讲义 + 讲解对话）。
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
  knowledgePointCount: number;
};

/** 知识点视图（M3 模型萃取草稿，含页码溯源）。 */
export type HiDocKnowledgePointView = {
  id: string;
  order: number;
  title: string;
  description: string;
  keyTerms: string[];
  prerequisites: string[];
  sourcePage: number;
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

/** 单章萃取结果（SSE result 载荷）。 */
export type HiDocChapterExtractionResult = {
  chapter: HiDocChapterView;
  knowledgePoints: HiDocKnowledgePointView[];
  notes: string[];
};

/** 知识点萃取 SSE 事件（进度与 Mentrix 风格对齐：精读第 N 章 → 逐知识点写入）。 */
export type HiDocExtractEvent =
  | {
      type: "progress";
      stage: "read" | "extracting" | "save";
      /** 当前章序（1 起）与总章数，供前端显示「第 N/M 章」。 */
      chapterIndex?: number;
      chapterTotal?: number;
      message: string;
    }
  | { type: "kp"; chapterIndex: number; knowledgePoint: HiDocKnowledgePointView }
  | { type: "result"; result: HiDocChapterExtractionResult }
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
  | "extraction-failed"
  | "lesson-failed"
  | "chat-failed"
  | "note-failed"
  | "not-found"
  | "storage-unavailable"
  | "server-error";

/** API 失败响应（成功响应由各路由按载荷定义）。 */
export type HiDocApiFailure = {
  ok: false;
  code: HiDocErrorCode;
  error: string;
};

/* ---------------- M4：讲义 + 讲解对话 ---------------- */

/**
 * 讲解风格（账户级 `User.hiDocLessonStyle`）。
 * M4 只实现 `zh-primary`（中文为主、术语首次出现标注原文）；枚举留好供后续扩展。
 */
export type HiDocLessonStyle = "zh-primary";

/** 讲义生成方式；启发式兜底必须能一眼看出「未接入模型」。 */
export type HiDocLessonGenerator =
  | { kind: "model"; provider: string; model: string }
  | { kind: "heuristic" };

/** 知识点讲义视图（每知识点至多一份，重新生成即覆盖）。 */
export type HiDocLessonView = {
  contentMd: string;
  style: HiDocLessonStyle;
  generator: HiDocLessonGenerator;
  generatedAt: string;
};

/** 讲解对话消息（服务端持久化进 HiDocConversation.messages）。 */
export type HiDocChatRole = "user" | "assistant";

export type HiDocChatMessage = {
  role: HiDocChatRole;
  content: string;
  createdAt: string;
};

/** 讲解对话视图（kpId 为 M6 课题工作坊预留可空）。 */
export type HiDocConversationView = {
  kpId: string;
  messages: HiDocChatMessage[];
};

/** 讲义生成 SSE 事件（进度 → 增量 markdown → 结果）。 */
export type HiDocLessonEvent =
  | { type: "progress"; stage: "read" | "generating" | "save"; message: string }
  | { type: "delta"; text: string }
  | { type: "result"; lesson: HiDocLessonView; notes: string[] }
  | { type: "error"; code: HiDocErrorCode; error: string };

/** 讲解对话 SSE 事件（增量文本 → 结果含落库后的完整消息列表）。 */
export type HiDocChatEvent =
  | { type: "delta"; text: string }
  | { type: "result"; conversation: HiDocConversationView; notes: string[] }
  | { type: "error"; code: HiDocErrorCode; error: string };

/** 学习页左侧知识点列表项：萃取结果 + 讲义状态。 */
export type HiDocKnowledgePointStudySummary = HiDocKnowledgePointView & {
  hasLesson: boolean;
};

/** 学习页章节视图（教材 + 章节 + 知识点列表）。 */
export type HiDocChapterStudyView = {
  textbook: { id: string; title: string; pageCount: number };
  chapter: HiDocChapterView;
  /** 当前章序（1 起）与总章数，供「第 N/M 章」显示。 */
  chapterIndex: number;
  chapterTotal: number;
  knowledgePoints: HiDocKnowledgePointStudySummary[];
  lessonCount: number;
  /** M5: 本章学霸笔记（每用户每章一份）。 */
  note: HiDocNoteView | null;
};

/** 学习页当前选中知识点的完整视图（讲义 + 对话历史 + 我的划重点）。 */
export type HiDocKnowledgePointStudyView = {
  knowledgePoint: HiDocKnowledgePointView;
  chapterTitle: string;
  lesson: HiDocLessonView | null;
  messages: HiDocChatMessage[];
  highlights: HiDocHighlightView[];
};

/* ---------------- M5：划重点/批注 + 学霸笔记 ---------------- */

/** 四色划线（固定枚举；低饱和度，不抢正文）。 */
export type HiDocHighlightColor = "amber" | "cinnabar" | "slate" | "jade";

/** 划重点/批注视图（quote/prefix/suffix 为讲义渲染文本中的选中文字与前后文定位上下文）。 */
export type HiDocHighlightView = {
  id: string;
  kpId: string;
  quote: string;
  prefix: string;
  suffix: string;
  color: HiDocHighlightColor;
  note: string | null;
  /** 创建时的讲义版本（ISO）；与当前讲义 generatedAt 不一致即失配，进入「未定位」。 */
  anchorLessonUpdatedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/** 定位锚点（Json 列，按不可信输入解析）。 */
export type HiDocHighlightAnchor = {
  lessonUpdatedAt: string | null;
};

/** 已定位的划重点渲染项（客户端 DOM 定位用）。 */
export type HiDocHighlightPaintItem = {
  id: string;
  color: HiDocHighlightColor;
  quote: string;
  prefix: string;
  suffix: string;
};

/** 划线选区上下文（quote 去首尾空白，prefix/suffix 为选区前后文，服务端会再限长）。 */
export type HiDocHighlightSelection = {
  quote: string;
  prefix: string;
  suffix: string;
};

/** 章级学霸笔记视图（每用户每章一份，重新生成即覆盖）。 */
export type HiDocNoteView = {
  chapterId: string;
  contentMd: string;
  generator: HiDocLessonGenerator;
  generatedAt: string;
};

/** 学霸笔记生成 SSE 事件（与讲义生成对齐：进度 → 增量 markdown → 结果）。 */
export type HiDocNoteEvent =
  | { type: "progress"; stage: "collect" | "generating" | "save"; message: string }
  | { type: "delta"; text: string }
  | { type: "result"; note: HiDocNoteView; notes: string[] }
  | { type: "error"; code: HiDocErrorCode; error: string };

/* ---------------- M6：课题工作坊 ---------------- */

/** 工作坊材料状态；M6 上传即同步检测，成功即 ready，不合格直接拒绝不落库。 */
export type HiDocWorkshopFileStatus = "uploaded" | "ready" | "failed";

/** 工作坊材料视图（pageCount：PDF 为真实页数，文本按行数折算）。 */
export type HiDocWorkshopFileView = {
  id: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
  hasTextLayer: boolean;
  status: HiDocWorkshopFileStatus;
  /** M6 唯一取值为 "not-attempted"（OCR 后置）。 */
  ocrStatus: string;
  /** status=failed 时的中文原因（如实展示）。 */
  failureReason: string | null;
  createdAt: string;
};

/** 课题工作坊视图（列表项）。 */
export type HiDocWorkshopView = {
  id: string;
  title: string;
  note: string | null;
  fileCount: number;
  createdAt: string;
  updatedAt: string;
};

/** 工作坊限额视图（按档位；工作坊材料不占教材当月名额）。 */
export type HiDocWorkshopLimitsView = {
  workshopUsed: number;
  workshopLimit: number;
  filesPerWorkshopLimit: number;
  maxPagesPerFile: number;
};

/** 工作坊列表快照。 */
export type HiDocWorkshopListView = {
  workshops: HiDocWorkshopView[];
  limits: HiDocWorkshopLimitsView;
};

/** 工作坊详情：工作坊 + 材料清单 + 答疑对话历史。 */
export type HiDocWorkshopDetailView = {
  workshop: HiDocWorkshopView;
  files: HiDocWorkshopFileView[];
  messages: HiDocChatMessage[];
  limits: HiDocWorkshopLimitsView;
};

/** 检索命中的材料片段（答疑回答的引用来源；页码/行号为材料内定位）。 */
export type HiDocWorkshopCitation = {
  fileId: string;
  fileName: string;
  /** 中文定位标签，如「第 3 页」「第 41–80 行」。 */
  locator: string;
  excerpt: string;
};

/** 工作坊答疑对话视图（workshopId 维度）。 */
export type HiDocWorkshopConversationView = {
  workshopId: string;
  messages: HiDocChatMessage[];
};

/** 工作坊答疑 SSE 事件（与 M4/M5 对齐：progress → delta → result/error）。 */
export type HiDocWorkshopChatEvent =
  | { type: "progress"; stage: "search" | "answer" | "save"; message: string }
  | { type: "delta"; text: string }
  | {
      type: "result";
      conversation: HiDocWorkshopConversationView;
      citations: HiDocWorkshopCitation[];
      notes: string[];
    }
  | { type: "error"; code: HiDocErrorCode; error: string };