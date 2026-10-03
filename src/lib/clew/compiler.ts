/**
 * Clew 教材编译器（ZCODE-M2 Phase 2）。
 * 编排教材编译流程（DeepTutor 五阶段简化版 + 知纲证据绑定 + LoopProfile 建议）。
 *
 * 本文件是纯编排层：通过注入的 ports 访问章节/萃取/状态服务，
 * 不直接 import Prisma 或模型 provider，可被 node:test 用 stub ports 测试。
 * 服务端真实绑定见 compiler-server.ts。
 */

import type { ClewKnowledgePointDraft } from "./extraction-heuristic";
import { executeWithIsolation } from "./resilience";

/** 编译状态机（uploaded → toc_ready → chapters_ready → extracting → ready / failed）。 */
export type ClewCompileState =
  | "uploaded" // 已上传，待目录识别
  | "toc_ready" // 目录已识别，待章节修正
  | "chapters_ready" // 章节已确认，待萃取
  | "extracting" // 萃取中
  | "ready" // 全部完成
  | "failed"; // 失败

/** 编译进度（SSE 输出）。 */
export type ClewCompileProgress = {
  state: ClewCompileState;
  currentChapter?: number;
  totalChapters?: number;
  /** 当前步骤描述（Mentrix 风格文字流）。 */
  currentStep?: string;
  error?: string;
};

/** 编译器视角的章节输入。 */
export type ClewCompilerChapter = {
  id: string;
  order: number;
  title: string;
};

export type ClewChapterExtractOutcome = {
  chapter: ClewCompilerChapter;
  /** 萃取产物（服务端为已落库的知识点视图；纯编排层按草稿形状消费）。 */
  knowledgePoints: ClewKnowledgePointDraft[];
  /** 章节文字层（供证据绑定；失败时不返回）。 */
  chapterText: string;
  notes: string[];
};

/** 编译器 ports（服务端工厂绑定真实实现）。 */
export type ClewCompilerPorts = {
  /** 读取待萃取章节（含已萃取的重萃取场景由调用方过滤）。 */
  getChapters: () => Promise<ClewCompilerChapter[]>;
  /** 单章萃取（含 SpineEditor 门禁、配额、落库；失败抛错）。 */
  extractChapter: (
    chapter: ClewCompilerChapter,
    hooks: {
      onProgress: (event: { stage: "read" | "extracting" | "save"; message: string }) => void;
      onKnowledgePoint: (knowledgePoint: ClewKnowledgePointDraft) => void;
    },
  ) => Promise<ClewChapterExtractOutcome>;
  /** 单章失败标记（失败隔离：记录后继续下一章）。 */
  markChapterFailed: (chapterId: string, error: string) => Promise<void>;
  /** 证据绑定（萃取成功后为 KP 关联页级原文证据）。 */
  bindEvidence: (outcome: ClewChapterExtractOutcome) => Promise<void>;
};

export type ClewCompileSummary = {
  state: ClewCompileState;
  succeededChapters: ClewCompilerChapter[];
  failedChapters: Array<{ chapter: ClewCompilerChapter; error: string }>;
  knowledgePointCount: number;
  /** 逐章结果（成功含知识点数，失败含原因；SSE chapter 事件的数据源）。 */
  chapterResults: Array<{
    chapter: ClewCompilerChapter;
    ok: boolean;
    knowledgePointCount: number;
    error?: string;
  }>;
};

/** 教材编译器（编排层；无内部可变全局状态，可安全复用）。 */
export class ClewCompiler {
  constructor(
    private readonly textbookId: string,
    private readonly ports: ClewCompilerPorts,
  ) {}

  /**
   * 全书萃取（失败隔离：单章失败记录并继续下一章）。
   * 进度事件对齐「精读第 N/M 章」心智模型；结束态：
   * 全部成功 → ready；部分成功 → ready（失败清单如实返回）；全部失败 → failed。
   * options.chapters：由调用层（路由）按 scope 过滤后的章节清单；
   * 缺省时走 ports.getChapters()（全部章节）。
   */
  async extractAllChapters(
    onProgress: (progress: ClewCompileProgress) => void,
    options?: {
      onKnowledgePoint?: (chapterIndex: number, kp: ClewKnowledgePointDraft) => void;
      chapters?: readonly ClewCompilerChapter[];
    },
  ): Promise<ClewCompileSummary> {
    const chapters = options?.chapters ?? (await this.ports.getChapters());
    const totalChapters = chapters.length;
    if (totalChapters === 0) {
      onProgress({ state: "failed", error: "没有可萃取的章节，请先识别并确认目录。" });
      return {
        state: "failed",
        succeededChapters: [],
        failedChapters: [],
        knowledgePointCount: 0,
        chapterResults: [],
      };
    }

    onProgress({
      state: "extracting",
      totalChapters,
      currentStep: `开始精读全书（共 ${totalChapters} 章）…`,
    });

    let knowledgePointCount = 0;
    const chapterResults: ClewCompileSummary["chapterResults"] = [];
    const { succeeded, failed } = await executeWithIsolation(
      chapters,
      async (chapter) => {
        const index = chapters.findIndex((row) => row.id === chapter.id) + 1;
        onProgress({
          state: "extracting",
          currentChapter: index,
          totalChapters,
          currentStep: `精读第 ${index}/${totalChapters} 章：${chapter.title}`,
        });

        const outcome = await this.ports.extractChapter(chapter, {
          onProgress: (event) =>
            onProgress({
              state: "extracting",
              currentChapter: index,
              totalChapters,
              currentStep: event.message,
            }),
          onKnowledgePoint: (kp) => options?.onKnowledgePoint?.(index, kp),
        });
        knowledgePointCount += outcome.knowledgePoints.length;
        chapterResults.push({
          chapter,
          ok: true,
          knowledgePointCount: outcome.knowledgePoints.length,
        });
        await this.ports.bindEvidence(outcome);
      },
      async (chapter, error) => {
        chapterResults.push({
          chapter,
          ok: false,
          knowledgePointCount: 0,
          error: error.message,
        });
        await this.ports.markChapterFailed(chapter.id, error.message);
      },
    );

    const failedChapters = failed.map((entry) => ({
      chapter: entry.item,
      error: entry.error.message,
    }));
    const state: ClewCompileState =
      succeeded.length > 0 ? "ready" : "failed";

    onProgress({
      state,
      currentChapter: succeeded.length,
      totalChapters,
      currentStep:
        state === "ready"
          ? `编译完成：${succeeded.length}/${totalChapters} 章成功，共 ${knowledgePointCount} 个知识点${
              failedChapters.length > 0 ? `；${failedChapters.length} 章失败已隔离，可单独重试` : ""
            }。`
          : `编译失败：${failedChapters.length}/${totalChapters} 章均未成功，教材状态未推进。`,
    });

    return {
      state,
      succeededChapters: succeeded,
      failedChapters,
      knowledgePointCount,
      chapterResults: chapterResults.sort((a, b) => a.chapter.order - b.chapter.order),
    };
  }

  /**
   * 单章萃取（走同一 ports 路径 + 证据绑定）；供既有单章萃取 API 复用 Harness。
   * 返回 ports 的原始 outcome，失败直接抛出（单章场景无失败隔离需求）。
   */
  async extractChapter(
    chapter: ClewCompilerChapter,
    hooks: {
      onProgress: (event: { stage: "read" | "extracting" | "save"; message: string }) => void;
      onKnowledgePoint: (knowledgePoint: ClewKnowledgePointDraft) => void;
    },
  ): Promise<ClewChapterExtractOutcome> {
    const outcome = await this.ports.extractChapter(chapter, hooks);
    await this.ports.bindEvidence(outcome);
    return outcome;
  }
}
