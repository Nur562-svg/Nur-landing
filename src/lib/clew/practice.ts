import "server-only";

import { prisma } from "@/lib/prisma";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import { appendUnifiedLearningEvents } from "@/lib/unified-events";
import type { LoopProfileId } from "@/types/loop-profile";
import { isLoopProfileId } from "@/types/loop-profile";
import type {
  ClewErrorCode,
  ClewPracticeAttemptResult,
  ClewPracticeKind,
  ClewPracticeQuestionView,
  ClewPracticeSetView,
} from "@/types/clew";
import type { UnifiedLearningEventInput } from "@/types/unified-learning";
import { completeChatJson } from "./providers/chat-transport";
import {
  coerceClewPracticeIntensity,
  resolveClewPracticeTarget,
  type ClewPracticeIntensity,
} from "./providers/model-config";
import { ClewProviderConfigError } from "./providers/model-config";
import { recordClewPracticeReviewOutcome } from "./reviews";
import { validateClewPracticeQuestions } from "./practice-validation";

/**
 * Clew 自教材练习（ZCODE-M6-A，server-only）：每 KP 一组练习题（A1×4 + 填空×2）。
 * 生成 = 模型按讲义聚合的教材原文出题（无启发式兜底，失败明确报错不生成）；
 * 作答 = A1 服务端确定性判分、fill 学员对照参考答案自评；错答经 practice-wrong 进 FSRS 调度。
 * 思考强度（D8）= 模型路由：standard=qwen 非思考 / deep=deepseek-flash 默认思考；练习默认 deep（M6-0 建议）。
 */

export type ClewPracticeFailure = {
  ok: false;
  status: number;
  code: ClewErrorCode;
  message: string;
};

const PRACTICE_TIMEOUT_MS = 180_000;
// deepseek-flash 思考+正文共用 max_tokens（M6-0 探针实测单次可达 ~5700），上限给足防 JSON 截断
const PRACTICE_MAX_OUTPUT_TOKENS = 8000;
/** 结构不合格的整组重试次数（任务书 §三.2：缺一即整组拒收重试）。 */
const PRACTICE_MAX_ATTEMPTS = 2;
/** 深度档消耗的配额单位数（D9：deep 计 2 次）。 */
const DEEP_QUOTA_UNITS = 2;

export function coercePracticeIntensityOrDefault(value: unknown): ClewPracticeIntensity {
  return coerceClewPracticeIntensity(value) ?? "deep";
}

/* ---------------- 题组读取 ---------------- */

type QuestionRow = {
  id: string;
  order: number;
  kind: string;
  stem: string;
  choices: unknown;
  answer: unknown;
  explanation: string;
  sourcePage: number;
  generator: string;
  createdAt: Date;
};

type AttemptRow = {
  questionId: string;
  response: unknown;
  isCorrect: boolean;
  attemptedAt: Date;
};

function readAnswer(row: QuestionRow): { correctIndex: number | null; answerText: string | null } {
  if (row.kind === "a1") {
    return { correctIndex: typeof row.answer === "number" ? row.answer : null, answerText: null };
  }
  return { correctIndex: null, answerText: typeof row.answer === "string" ? row.answer : null };
}

function readResponse(row: AttemptRow): { selectedIndex: number | null; selfRating: "correct" | "wrong" | null } {
  const response = row.response as { selectedIndex?: unknown; selfRating?: unknown } | null;
  if (response && typeof response === "object") {
    if (typeof response.selectedIndex === "number") {
      return { selectedIndex: response.selectedIndex, selfRating: null };
    }
    if (response.selfRating === "correct" || response.selfRating === "wrong") {
      return { selectedIndex: null, selfRating: response.selfRating };
    }
  }
  return { selectedIndex: null, selfRating: null };
}

function toQuestionView(
  row: QuestionRow,
  latestAttempt: AttemptRow | undefined,
): ClewPracticeQuestionView {
  const { correctIndex, answerText } = readAnswer(row);
  if (!latestAttempt) {
    return {
      id: row.id,
      order: row.order,
      kind: row.kind as ClewPracticeKind,
      stem: row.stem,
      choices: row.kind === "a1" && Array.isArray(row.choices) ? (row.choices as string[]) : null,
      answerText,
      explanation: row.kind === "fill" ? row.explanation : null,
      sourcePage: row.sourcePage,
      myAttempt: null,
    };
  }
  const { selectedIndex, selfRating } = readResponse(latestAttempt);
  return {
    id: row.id,
    order: row.order,
    kind: row.kind as ClewPracticeKind,
    stem: row.stem,
    choices: row.kind === "a1" && Array.isArray(row.choices) ? (row.choices as string[]) : null,
    answerText,
    explanation: row.kind === "fill" ? row.explanation : null,
    sourcePage: row.sourcePage,
    myAttempt: {
      isCorrect: latestAttempt.isCorrect,
      selectedIndex,
      selfRating,
      correctIndex,
      explanation: row.explanation,
      attemptedAt: latestAttempt.attemptedAt.toISOString(),
    },
  };
}

/** 题组 + 本人作答状态（thin adapter GET 用）。kpId 归属校验在此（跨用户/已删教材 → not-found）。 */
export async function loadClewPracticeSet(
  userId: string,
  kpId: string,
): Promise<{ ok: true; data: ClewPracticeSetView } | ClewPracticeFailure> {
  const kp = await prisma.clewKnowledgePoint.findFirst({
    where: { id: kpId, chapter: { textbook: { userId, deletedAt: null } } },
    select: { id: true },
  });
  if (!kp) {
    return { ok: false, status: 404, code: "not-found", message: "知识点不存在或教材已删除。" };
  }

  const questions = await prisma.clewPracticeQuestion.findMany({
    where: { kpId },
    orderBy: { order: "asc" },
  });
  const questionIds = questions.map((row) => row.id);
  const attempts = questionIds.length
    ? await prisma.clewPracticeAttempt.findMany({
        where: { userId, questionId: { in: questionIds } },
        orderBy: { attemptedAt: "desc" },
      })
    : [];
  const latestByQuestion = new Map<string, AttemptRow>();
  for (const attempt of attempts) {
    if (!latestByQuestion.has(attempt.questionId)) {
      latestByQuestion.set(attempt.questionId, attempt);
    }
  }

  const views = questions.map((row) => toQuestionView(row, latestByQuestion.get(row.id)));
  const answered = views.filter((view) => view.myAttempt !== null);
  return {
    ok: true,
    data: {
      kpId,
      generator: questions[0]?.generator ?? "",
      generatedAt: questions[0]?.createdAt.toISOString() ?? new Date(0).toISOString(),
      questions: views,
      summary: {
        total: views.length,
        answered: answered.length,
        correct: answered.filter((view) => view.myAttempt?.isCorrect).length,
        wrong: answered.filter((view) => view.myAttempt && !view.myAttempt.isCorrect).length,
      },
    },
  };
}

/* ---------------- 生成 ---------------- */

export type ClewPracticeProgressEvent = {
  stage: "read" | "generating" | "save";
  message: string;
};

export type ClewPracticeGenerateRequest = {
  userId: string;
  kpId: string;
  intensity: ClewPracticeIntensity;
  onProgress: (event: ClewPracticeProgressEvent) => void;
};

/**
 * 练习出题的页码模式（ZCODE-M6 补遗）：
 * - paged：原文片段带【PDF 第 N 页】标记（PDF 教材）——模型逐题标注页码，校验页集内；
 * - annotated：DOCX 且学生已人工标注 KP 页码——模型不写页码，服务端盖章为学生标注页（诚实显示「你标注的」，不做文本核验）；
 * - pageless：DOCX 未标注——模型不写页码，服务端记 0（无页码），解析引用写「本章原文」。
 * 三种模式都不编造页码：没有文字层页码时模型完全接触不到页码字段。
 */
type PracticePageMode =
  | { kind: "paged"; excerptPages: number[] }
  | { kind: "annotated"; annotatedPage: number }
  | { kind: "pageless" };

function buildPracticePrompt(input: {
  kpTitle: string;
  kpDescription: string;
  keyTerms: string[];
  excerpt: string;
  pageMode: PracticePageMode;
}): { system: string; user: string } {
  const pageRule = input.pageMode.kind === "paged"
    ? `每道题必须标注其依据的页码（sourcePage，取自原文片段中的【PDF 第 N 页】标记）。`
    : input.pageMode.kind === "annotated"
      ? `本教材没有文字层页码；该知识点已由学生人工标注为第 ${input.pageMode.annotatedPage} 页。输出 JSON 的每道题不要包含 sourcePage 字段；解析中的依据表述写「本章原文」，可注明「学生标注的第 ${input.pageMode.annotatedPage} 页」，不得自行编造其他页码。`
      : `本教材没有印刷页码。输出 JSON 的每道题不要包含 sourcePage 字段；解析中的依据表述写「本章原文」，不得写「第 N 页」或任何页码。`;
  const questionShape = input.pageMode.kind === "paged"
    ? '{"questions":[{"kind":"a1","stem":"题干","choices":["A","B","C","D"],"answerIndex":0,"explanation":"解析（须引用原文依据）","sourcePage":1},{"kind":"fill","stem":"题干","answerText":"参考答案","explanation":"解析（须引用原文依据）","sourcePage":1}]}'
    : '{"questions":[{"kind":"a1","stem":"题干","choices":["A","B","C","D"],"answerIndex":0,"explanation":"解析（须引用原文依据）"},{"kind":"fill","stem":"题干","answerText":"参考答案","explanation":"解析（须引用原文依据）"}]}';
  return {
    system: `你是严格的医学教育出题助手。只依据给定的教材原文片段出题，禁止使用片段之外的知识补充事实。
${pageRule}
输出严格 JSON，不要输出任何其他文字。`,
    user: `知识点：${input.kpTitle}
知识点说明：${input.kpDescription}
关键术语：${input.keyTerms.join("、")}

教材原文片段（出题唯一依据）：
${input.excerpt}

请出一组练习题：4 道 A1 单选（每题 4 个选项，恰好 1 个正确）+ 2 道填空题。
输出 JSON：
${questionShape}
要求：题干清晰无歧义；干扰项合理但明确错误；答案必须能从原文片段直接推出；填空答案必须是原文中的确定表述；同一组内题干不得重复。`,
  };
}

/** 生成练习题组（覆盖语义：替换该 KP 现有整组，旧作答随级联删除——D4 定案）。 */
export async function generateClewPractice(
  input: ClewPracticeGenerateRequest,
): Promise<{ ok: true; data: ClewPracticeSetView; notes: string[] } | ClewPracticeFailure> {
  const context = await prisma.clewKnowledgePoint.findFirst({
    where: { id: input.kpId, chapter: { textbook: { userId: input.userId, deletedAt: null } } },
    select: {
      id: true,
      title: true,
      description: true,
      keyTerms: true,
      sourcePage: true,
      sourcePageAnnotated: true,
      loopProfileId: true,
      chapter: { select: { order: true, textbookId: true } },
    },
  });
  if (!context) {
    return { ok: false, status: 404, code: "not-found", message: "知识点不存在或教材已删除。" };
  }

  const lesson = await prisma.clewLesson.findUnique({
    where: { kpId: input.kpId },
    select: { sourceExcerpt: true },
  });
  if (!lesson || lesson.sourceExcerpt.trim().length === 0) {
    return {
      ok: false,
      status: 503,
      code: "practice-failed",
      message: "该知识点还没有讲义——练习题依据讲义聚合的教材原文出题，请先生成讲义。",
    };
  }
  const excerpt = lesson.sourceExcerpt;
  const excerptPages = [...excerpt.matchAll(/【PDF 第 (\d+) 页】/g)].map((m) => Number(m[1]));
  // ZCODE-M6 补遗：DOCX（或无标记片段）不再硬性 503——按页码模式降级（pageless / annotated）
  const pageMode: PracticePageMode = excerptPages.length > 0
    ? { kind: "paged", excerptPages }
    : context.sourcePageAnnotated
      ? { kind: "annotated", annotatedPage: context.sourcePage }
      : { kind: "pageless" };

  const notes: string[] = [];
  input.onProgress({
    stage: "read",
    message: pageMode.kind === "paged"
      ? "已取得教材原文片段（页码溯源就绪）…"
      : pageMode.kind === "annotated"
        ? "已取得教材原文片段（使用你标注的页码）…"
        : "已取得教材原文片段（本教材无页码，引用将写「本章原文」）…",
  });

  // 配额：深度档计 2 单位（D9）；不足明确 503，不静默降档
  const quotas = await computeUserQuotas(input.userId);
  const quotaItem = quotas.quotas.clewPracticeSets;
  const units = input.intensity === "deep" ? DEEP_QUOTA_UNITS : 1;
  const quotaOk =
    quotaItem.limit === "unlimited"
      ? true
      : quotaItem.used + units <= quotaItem.limit;
  if (!canUseResource(quotaItem) || !quotaOk) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: `${getQuotaLabel("clewPracticeSets")} 额度不足（已用 ${quotaItem.used}/${quotaItem.limit === "unlimited" ? "∞" : quotaItem.limit}${input.intensity === "deep" ? "，深度档计 2 次" : ""}），本次生成已停止。可升级会员档位，或改用标准档。`,
    };
  }

  let target;
  try {
    target = resolveClewPracticeTarget(input.intensity);
  } catch (error) {
    if (error instanceof ClewProviderConfigError) {
      return { ok: false, status: 503, code: "practice-failed", message: error.message };
    }
    throw error;
  }

  const prompt = buildPracticePrompt({
    kpTitle: context.title,
    kpDescription: context.description,
    keyTerms: Array.isArray(context.keyTerms) ? (context.keyTerms as string[]) : [],
    excerpt,
    pageMode,
  });

  let modelOutcome: "success" | "failed" = "success";
  let questionCount = 0;
  try {
    input.onProgress({
      stage: "generating",
      message: `调用模型出题（${target.model}${input.intensity === "deep" ? " · 深度思考" : ""}）…`,
    });
    let invalidReason: string | null = null;
    let validated: import("./practice-validation").ValidatedPracticeQuestion[] | null = null;
    for (let attemptNo = 1; attemptNo <= PRACTICE_MAX_ATTEMPTS; attemptNo += 1) {
      const raw = await completeChatJson({
        config: target,
        messages: [
          { role: "system", content: prompt.system },
          {
            role: "user",
            content:
              attemptNo === 1
                ? prompt.user
                : `${prompt.user}\n\n注意：上一次输出未通过结构校验（${invalidReason}）。请严格按本条消息规定的 JSON 结构重新输出完整题组。`,
          },
        ],
        temperature: 0.3,
        maxOutputTokens: PRACTICE_MAX_OUTPUT_TOKENS,
        timeoutMs: PRACTICE_TIMEOUT_MS,
        responseFormat: { type: "json_object" },
      });

      let parsed: unknown = null;
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = null;
      }
      const validation = validateClewPracticeQuestions(parsed, pageMode.kind === "paged" ? pageMode.excerptPages : null);
      if (validation.ok) {
        validated = validation.questions.map((question) => ({
          ...question,
          // 无页码/人工标注模式：模型接触不到页码字段，由服务端盖章（0 = 无页码；N = 学生标注页）
          sourcePage: pageMode.kind === "annotated" ? pageMode.annotatedPage : question.sourcePage,
        }));
        break;
      }
      invalidReason = validation.reason;
      if (attemptNo < PRACTICE_MAX_ATTEMPTS) {
        input.onProgress({
          stage: "generating",
          message: `第 ${attemptNo} 次输出结构不合格（${validation.reason}），正在重试…`,
        });
      }
    }
    if (!validated) {
      modelOutcome = "failed";
      return {
        ok: false,
        status: 422,
        code: "practice-failed",
        message: `模型返回的练习题结构不合格（${invalidReason}），已重试仍失败，本次生成已停止，未覆盖旧题组；可稍后再试。`,
      };
    }
    questionCount = validated.length;

    input.onProgress({ stage: "save", message: "保存练习题组…" });
    const generator = `model:${target.provider}:${target.model}`;
    const previous = await prisma.clewPracticeQuestion.count({ where: { kpId: input.kpId } });
    await prisma.$transaction(async (tx) => {
      await tx.clewPracticeQuestion.deleteMany({ where: { kpId: input.kpId } });
      await tx.clewPracticeQuestion.createMany({
        data: validated.map((question, index) => ({
          kpId: input.kpId,
          order: index + 1,
          kind: question.kind,
          stem: question.stem,
          choices: question.choices === null ? undefined : question.choices,
          answer: question.answer,
          explanation: question.explanation,
          sourcePage: question.sourcePage,
          generator,
        })),
      });
    });
    if (previous > 0) {
      notes.push("本次生成覆盖了此前题组（重新生成将清空旧题与旧作答记录）。");
    }
    const provenanceNote = pageMode.kind === "paged"
      ? `来源：模型生成 · ${target.model}，结构校验通过（${questionCount} 题，页码溯源）。`
      : pageMode.kind === "annotated"
        ? `来源：模型生成 · ${target.model}，结构校验通过（${questionCount} 题，依据你标注的第 ${pageMode.annotatedPage} 页——人工标注不做文本核验，请对照原文）。`
        : `来源：模型生成 · ${target.model}，结构校验通过（${questionCount} 题；本教材无页码，解析引用「本章原文」）。`;
    notes.push(provenanceNote);
    if (input.intensity === "deep") {
      notes.push("深度模式：调用 deepseek-flash 默认深度思考，本次消耗 2 次练习生成额度。");
    }
  } catch (error) {
    modelOutcome = "failed";
    const message = error instanceof Error ? error.message : "未知错误";
    console.error("[clew] 练习生成模型调用失败", error);
    return {
      ok: false,
      status: 503,
      code: "practice-failed",
      message: `练习题生成失败：${message}。旧题组未被覆盖，可稍后重试。`,
    };
  } finally {
    // token 已消耗：无论成败都记账（深度档计 2）
    try {
      await recordServerUsage(input.userId, "clewPracticeSets", units);
      await prisma.eventLog.create({
        data: {
          event: "clew_kp_practice",
          userId: input.userId,
          props: {
            kpId: input.kpId,
            chapterOrder: context.chapter.order,
            provider: target.provider,
            model: target.model,
            intensity: input.intensity,
            outcome: modelOutcome,
            questionCount,
          },
        },
      });
    } catch (error) {
      console.error("[clew] 练习生成用量记录失败", error);
    }
  }

  const view = await loadClewPracticeSet(input.userId, input.kpId);
  if (!view.ok) {
    return view;
  }
  return { ok: true, data: view.data, notes };
}

/* ---------------- 作答 ---------------- */

export type ClewPracticeAttemptRequest = {
  userId: string;
  questionId: string;
  selectedIndex?: unknown;
  selfRating?: unknown;
};

/** 作答提交：A1 确定性判分 / fill 自评；事件 + FSRS 回流（practice-wrong）。 */
export async function submitClewPracticeAttempt(
  input: ClewPracticeAttemptRequest,
): Promise<{ ok: true; data: ClewPracticeAttemptResult } | ClewPracticeFailure> {
  const question = await prisma.clewPracticeQuestion.findFirst({
    where: {
      id: input.questionId,
      kp: { chapter: { textbook: { deletedAt: null } } },
    },
    select: {
      id: true,
      kind: true,
      answer: true,
      explanation: true,
      kpId: true,
      kp: {
        select: {
          loopProfileId: true,
          chapter: { select: { textbookId: true } },
        },
      },
    },
  });
  if (!question) {
    return { ok: false, status: 404, code: "not-found", message: "练习题不存在或教材已删除。" };
  }

  // 本人校验：只有题组归属者可作答（kp 挂在用户教材树上下文之外的题无法经正常入口到达；
  // 显式再校验一次 textbook 属主，防止跨用户猜测 questionId）
  const ownership = await prisma.clewTextbook.findFirst({
    where: {
      id: question.kp.chapter.textbookId,
      userId: input.userId,
      deletedAt: null,
    },
    select: { id: true },
  });
  if (!ownership) {
    return { ok: false, status: 404, code: "not-found", message: "练习题不存在或教材已删除。" };
  }

  const kind = question.kind as ClewPracticeKind;
  const now = new Date();
  let isCorrect: boolean;
  let response: Record<string, unknown>;

  if (kind === "a1") {
    if (
      typeof input.selectedIndex !== "number"
      || !Number.isInteger(input.selectedIndex)
      || input.selectedIndex < 0
      || input.selectedIndex > 3
    ) {
      return { ok: false, status: 400, code: "invalid-request", message: "A1 作答需要 0–3 的选项序号。" };
    }
    const correctIndex = typeof question.answer === "number" ? question.answer : null;
    if (correctIndex === null) {
      return { ok: false, status: 500, code: "server-error", message: "该题答案数据异常，请重新生成题组。" };
    }
    isCorrect = input.selectedIndex === correctIndex;
    response = { selectedIndex: input.selectedIndex };
  } else {
    if (input.selfRating !== "correct" && input.selfRating !== "wrong") {
      return { ok: false, status: 400, code: "invalid-request", message: "填空自评只能是 correct 或 wrong。" };
    }
    isCorrect = input.selfRating === "correct";
    response = { selfRating: input.selfRating };
  }

  const attempt = await prisma.clewPracticeAttempt.create({
    data: {
      userId: input.userId,
      questionId: question.id,
      response: response as { selectedIndex: number } | { selfRating: string },
      isCorrect,
      attemptedAt: now,
    },
  });

  const profileId: LoopProfileId = isLoopProfileId(question.kp.loopProfileId)
    ? question.kp.loopProfileId
    : "full-loop";
  const events: UnifiedLearningEventInput[] = [
    {
      contentType: "clew-kp",
      contentId: question.kpId,
      profileId,
      stage: "practice",
      eventType: "attempt-confirmed",
      payload: {
        kind: "practice-attempt",
        questionId: question.id,
        practiceKind: kind,
        isCorrect,
        attemptedAt: now.toISOString(),
      },
      sourceKey: `clew-practice-attempt:${attempt.id}`,
      timestamp: now.toISOString(),
    },
  ];

  const review = await recordClewPracticeReviewOutcome({
    userId: input.userId,
    kpId: question.kpId,
    textbookId: question.kp.chapter.textbookId,
    profileId,
    isCorrect,
    now,
  });
  if (review.scheduledEvent) {
    events.push(review.scheduledEvent);
  }
  if (review.completedEvent) {
    events.push(review.completedEvent);
  }
  await appendUnifiedLearningEvents(input.userId, events);

  // 揭示字段：直接取本题答案与解析（readAnswer 的其余视图字段此处不需要）
  const correctIndex = kind === "a1" && typeof question.answer === "number" ? question.answer : null;
  const answerText = kind === "fill" && typeof question.answer === "string" ? question.answer : null;

  return {
    ok: true,
    data: {
      questionId: question.id,
      kind,
      isCorrect,
      correctIndex,
      answerText,
      explanation: question.explanation,
      review: review.status,
    },
  };
}
