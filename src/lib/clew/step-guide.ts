/**
 * Clew eight-step guide. Pure data: screens render this and do not invent
 * a second copy of the path. Clew output is not given official-course
 * evidence grades (可关联 / 帮助理解 / 不可直接等同).
 */

export const CLEW_STEPS = [
  { id: "upload", name: "上传" },
  { id: "toc", name: "目录识别" },
  { id: "revise", name: "章节修正" },
  { id: "extract", name: "知识点萃取" },
  { id: "lesson", name: "讲义生成 + 追问" },
  { id: "marks", name: "划重点/批注" },
  { id: "note", name: "学霸笔记" },
  { id: "workshop", name: "课题工作坊" },
] as const;

export type ClewStepId = (typeof CLEW_STEPS)[number]["id"];

export type ClewGuideContext = {
  textbookId?: string;
  chapterOrder?: number;
  workshopId?: string;
  /** 未登录时「下一步」去登录，而不是书架上还不存在的锚点。 */
  signedIn?: boolean;
};

export type ClewGuide = {
  steps: readonly string[];
  currentId: ClewStepId;
  currentName: string;
  progressLabel: string;
  progressValue: number;
  progressMax: number;
  statusHint: string;
  nextAction: string;
  nextHref: string;
  nextControl: "下一步";
};

const STEP_COUNT = CLEW_STEPS.length;

const NEXT_ACTION: Record<ClewStepId, string> = {
  upload: "选择带文字层的 PDF 或 DOCX 上传。扫描件和图片会被拒绝。",
  toc: "识别目录。DOCX 没有印刷页码，位置保持待确认。",
  revise: "核对章节标题，删掉多余项，然后保存。",
  extract: "按章萃取知识点。出处缺失时保持待确认。",
  lesson: "为当前知识点生成讲义，再在右侧追问。",
  marks: "在讲义里划出关键句，或补一句批注。",
  note: "把本章讲义、追问和批注收成一份学霸笔记。",
  workshop: "用不超过 100 页的短材料提问。问完可回到书架。",
};

const STATUS_HINT: Record<ClewStepId, string> = {
  upload: "当前：上传教材",
  toc: "当前：目录识别",
  revise: "当前：章节修正",
  extract: "当前：知识点萃取",
  lesson: "当前：讲义生成与追问",
  marks: "当前：划重点与批注",
  note: "当前：学霸笔记",
  workshop: "当前：课题工作坊",
};

function bookHref(context: ClewGuideContext): string {
  return context.textbookId ? `/learn/clew/t/${context.textbookId}` : "/learn/clew";
}

function studyHref(context: ClewGuideContext): string {
  const chapter = context.chapterOrder ?? 1;
  return context.textbookId ? `/learn/clew/t/${context.textbookId}/c/${chapter}` : "/learn/clew";
}

function hrefFor(step: ClewStepId, context: ClewGuideContext): string {
  const book = bookHref(context);
  const study = studyHref(context);
  switch (step) {
    case "upload":
      return "/learn/clew#upload";
    case "toc":
      if (context.signedIn === false) {
        return "/login?next=/learn/clew";
      }
      if (!context.textbookId) {
        return "/learn/clew#upload";
      }
      return `${book}#recognize`;
    case "revise":
      return `${book}#chapters`;
    case "extract":
      return `${book}#extract`;
    case "lesson":
      return study;
    case "marks":
      return `${study}#highlights`;
    case "note":
      return `${study}#note`;
    case "workshop":
      return context.workshopId ? `/learn/clew/w/${context.workshopId}#ask` : "/learn/clew/w#ask";
  }
}

export function guideForStep(step: ClewStepId, context: ClewGuideContext = {}): ClewGuide {
  const index = CLEW_STEPS.findIndex((item) => item.id === step);
  const current = CLEW_STEPS[index] ?? CLEW_STEPS[0];
  const next = CLEW_STEPS[index + 1] ?? current;
  return {
    steps: CLEW_STEPS.map((item) => item.name),
    currentId: current.id,
    currentName: current.name,
    progressLabel: `${index + 1} / ${STEP_COUNT}`,
    progressValue: index + 1,
    progressMax: STEP_COUNT,
    statusHint: STATUS_HINT[current.id],
    nextAction: NEXT_ACTION[current.id],
    nextHref: hrefFor(next.id, context),
    nextControl: "下一步",
  };
}

export type ClewSurfaceState =
  | { surface: "shelf"; textbookId?: string; signedIn?: boolean }
  | {
      surface: "textbook";
      textbookId: string;
      chapterCount: number;
      extractedCount: number;
      editing: boolean;
      chapterOrder?: number;
    }
  | {
      surface: "study";
      textbookId: string;
      chapterOrder: number;
      hasLesson: boolean;
      hasNote: boolean;
    }
  | { surface: "workshop"; workshopId?: string };

export function resolveClewGuide(state: ClewSurfaceState): ClewGuide {
  switch (state.surface) {
    case "shelf":
      return guideForStep("upload", {
        textbookId: state.textbookId,
        signedIn: state.signedIn,
      });
    case "textbook": {
      const context = { textbookId: state.textbookId, chapterOrder: state.chapterOrder ?? 1 };
      if (state.chapterCount === 0) {
        return guideForStep("toc", context);
      }
      if (state.editing || state.extractedCount === 0) {
        return guideForStep("revise", context);
      }
      if (state.extractedCount < state.chapterCount) {
        return guideForStep("extract", context);
      }
      return guideForStep("lesson", context);
    }
    case "study": {
      const context = { textbookId: state.textbookId, chapterOrder: state.chapterOrder };
      if (!state.hasLesson) {
        return guideForStep("lesson", context);
      }
      if (!state.hasNote) {
        return guideForStep("marks", context);
      }
      return guideForStep("note", context);
    }
    case "workshop":
      return guideForStep("workshop", { workshopId: state.workshopId });
  }
}
