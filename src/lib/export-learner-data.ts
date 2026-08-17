/**
 * Browser-local learner data snapshot export.
 * Reuses store readers / parsers — no parallel storage, no secrets, no course truth dump.
 * Import is explicitly not supported in this package.
 */

import {
  createDefaultLearningMemoryState,
  parseLearningMemoryJson,
  getLearningMemoryStorageSnapshot,
} from "@/lib/learning-memory";
import {
  getMaterialAdmissionStorageSnapshot,
  parseMaterialAdmissionStoreJson,
} from "@/lib/material-admission";
import { getAllQBAttempts, getQBFavorites } from "@/lib/question-bank-store";
import { getMockExamSessions } from "@/lib/mock-exam-store";
import {
  getUserExamStructureStorageKey,
  parseUserExamStructure,
} from "@/lib/user-exam-structure";
import { selectWrongQuestionCenter } from "@/lib/wrong-questions";
import type { CourseDefinition, LearningMemoryState } from "@/types/learning";
import type { MaterialAdmissionStore } from "@/types/material-admission";
import type { MockExamSession } from "@/types/mock-exam";
import type { QBAttemptRecord, QBFavoriteStore } from "@/types/question-bank";
import type { UserExamStructure } from "@/types/learning";

export const learnerDataExportVersion = 1 as const;
export const learnerDataExportKind = "nur-learner-data-snapshot" as const;

export type LearnerDataExportAccount = {
  signedIn: boolean;
  /** Present only when the user is signed in; metadata only. */
  email: string | null;
};

export type LearnerDataExportCounts = {
  confirmedAttempts: number;
  reviewTasks: number;
  fsrsCriteria: number;
  qbQuestionIds: number;
  qbAttemptRows: number;
  qbFavorites: number;
  mockSessions: number;
  materialAdmissionRecords: number;
  userExamStructures: number;
};

export type LearnerWrongQuestionExportSummary = {
  totalWrong: number;
  totalAttempts: number;
  weakKpCount: number;
  structuralWeaknessCount: number;
  fsrsHighRiskCount: number;
  hasFsrsMemory: boolean;
  /** Compact rows — ids/counts only, not full course prompts. */
  weakKnowledgePoints: readonly {
    knowledgePointId: string;
    knowledgePointTitle: string;
    courseId: string;
    wrongCount: number;
    totalAttempts: number;
    lastWrongAt: string | null;
  }[];
};

export type LearnerDataExportBoundary = {
  containsApiKeys: false;
  containsCourseTruth: false;
  containsRawPrivateFiles: false;
  containsServerOnlyState: false;
  importSupported: false;
  isOfficialTranscript: false;
};

export type LearnerDataExport = {
  version: typeof learnerDataExportVersion;
  kind: typeof learnerDataExportKind;
  exportedAt: string;
  source: "browser-local-snapshot";
  disclaimer: string;
  account: LearnerDataExportAccount;
  counts: LearnerDataExportCounts;
  data: {
    learningMemory: LearningMemoryState;
    qbAttempts: Record<string, QBAttemptRecord[]>;
    qbFavorites: QBFavoriteStore;
    mockExamSessions: Record<string, MockExamSession[]>;
    materialAdmissions: MaterialAdmissionStore;
    userExamStructures: Record<string, UserExamStructure>;
    wrongQuestionSummary: LearnerWrongQuestionExportSummary | null;
  };
  exportBoundary: LearnerDataExportBoundary;
  notes: string;
};

export type BuildLearnerDataExportInput = {
  learningMemoryRaw: string | null;
  qbAttempts: Record<string, QBAttemptRecord[]>;
  qbFavorites: QBFavoriteStore;
  mockExamSessions: Record<string, MockExamSession[]>;
  materialAdmissionRaw: string | null;
  userExamStructures: Record<string, UserExamStructure>;
  account: LearnerDataExportAccount;
  /** When provided, builds a compact wrong-question stats block (no course truth dump). */
  courses?: readonly CourseDefinition[];
  exportedAt?: string;
};

const DEFAULT_DISCLAIMER =
  "本文件是当前浏览器中的本机学习数据快照，用于个人备份与迁移参考；不是学校或平台官方成绩单，也不代表服务端完整存档。";

const DEFAULT_NOTES =
  "仅含本机可读的学习记忆、题库练习、模考会话、材料准入结构化记录与个人考试结构。"
  + "不含 API 密钥、课程真相全文、原始私人上传二进制，也不含未同步的服务端独有数据。"
  + "importSupported=false：本版本不提供一键导入。";

const EXPORT_BOUNDARY: LearnerDataExportBoundary = {
  containsApiKeys: false,
  containsCourseTruth: false,
  containsRawPrivateFiles: false,
  containsServerOnlyState: false,
  importSupported: false,
  isOfficialTranscript: false,
};

function countQbRows(qbAttempts: Record<string, QBAttemptRecord[]>): number {
  let n = 0;
  for (const rows of Object.values(qbAttempts)) {
    n += rows.length;
  }
  return n;
}

function countMockSessions(sessions: Record<string, MockExamSession[]>): number {
  let n = 0;
  for (const rows of Object.values(sessions)) {
    n += rows.length;
  }
  return n;
}

function buildWrongSummary(
  courses: readonly CourseDefinition[] | undefined,
  qbAttempts: Record<string, QBAttemptRecord[]>,
  memory: LearningMemoryState,
): LearnerWrongQuestionExportSummary | null {
  if (!courses || courses.length === 0) {
    return null;
  }
  const center = selectWrongQuestionCenter(courses, qbAttempts, memory);
  return {
    totalWrong: center.totalWrong,
    totalAttempts: center.totalAttempts,
    weakKpCount: center.weakKpCount,
    structuralWeaknessCount: center.structuralWeaknesses.length,
    fsrsHighRiskCount: center.fsrsHighRisk.length,
    hasFsrsMemory: center.hasFsrsMemory,
    weakKnowledgePoints: center.weakKnowledgePoints.map((kp) => ({
      knowledgePointId: kp.knowledgePointId,
      knowledgePointTitle: kp.knowledgePointTitle,
      courseId: kp.courseId,
      wrongCount: kp.wrongCount,
      totalAttempts: kp.totalAttempts,
      lastWrongAt: kp.lastWrongAt,
    })),
  };
}

/** Pure builder — unit-testable without DOM. */
export function buildLearnerDataExport(
  input: BuildLearnerDataExportInput,
): LearnerDataExport {
  const learningMemory = parseLearningMemoryJson(input.learningMemoryRaw);
  const materialAdmissions = parseMaterialAdmissionStoreJson(
    input.materialAdmissionRaw,
  );
  const qbAttempts = input.qbAttempts;
  const qbFavorites = input.qbFavorites;
  const mockExamSessions = input.mockExamSessions;
  const userExamStructures = input.userExamStructures;
  const wrongQuestionSummary = buildWrongSummary(
    input.courses,
    qbAttempts,
    learningMemory,
  );

  const fsrsCriteria = learningMemory.fsrsState
    ? Object.keys(learningMemory.fsrsState.criteria).length
    : 0;

  return {
    version: learnerDataExportVersion,
    kind: learnerDataExportKind,
    exportedAt: input.exportedAt ?? new Date().toISOString(),
    source: "browser-local-snapshot",
    disclaimer: DEFAULT_DISCLAIMER,
    account: {
      signedIn: input.account.signedIn,
      email: input.account.signedIn ? input.account.email : null,
    },
    counts: {
      confirmedAttempts: learningMemory.attempts.length,
      reviewTasks: learningMemory.reviewTasks.length,
      fsrsCriteria,
      qbQuestionIds: Object.keys(qbAttempts).length,
      qbAttemptRows: countQbRows(qbAttempts),
      qbFavorites: Object.keys(qbFavorites).filter((k) => qbFavorites[k]).length,
      mockSessions: countMockSessions(mockExamSessions),
      materialAdmissionRecords: materialAdmissions.records.length,
      userExamStructures: Object.keys(userExamStructures).length,
    },
    data: {
      learningMemory,
      qbAttempts,
      qbFavorites,
      mockExamSessions,
      materialAdmissions,
      userExamStructures,
      wrongQuestionSummary,
    },
    exportBoundary: { ...EXPORT_BOUNDARY },
    notes: DEFAULT_NOTES,
  };
}

export function buildLearnerExportFilename(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `nur-learn-data-${y}-${m}-${d}.json`;
}

export type CollectLearnerDataExportOptions = {
  account?: LearnerDataExportAccount;
  courses?: readonly CourseDefinition[];
  courseIdsForStores?: readonly string[];
};

function readUserExamStructures(
  courseIds: readonly string[],
): Record<string, UserExamStructure> {
  if (typeof window === "undefined") {
    return {};
  }
  const out: Record<string, UserExamStructure> = {};
  for (const courseId of courseIds) {
    try {
      const raw = window.localStorage.getItem(getUserExamStructureStorageKey(courseId));
      if (!raw) continue;
      const parsed = parseUserExamStructure(JSON.parse(raw) as unknown, courseId);
      if (parsed) {
        out[courseId] = parsed;
      }
    } catch {
      // skip corrupt row
    }
  }
  return out;
}

function collectMockSessions(
  courseIds: readonly string[],
): Record<string, MockExamSession[]> {
  const out: Record<string, MockExamSession[]> = {};
  for (const courseId of courseIds) {
    const sessions = getMockExamSessions(courseId);
    if (sessions.length > 0) {
      out[courseId] = sessions;
    }
  }
  return out;
}

/**
 * Browser entry: reads existing stores only.
 * Does not invent server state; account email is optional metadata.
 */
export function collectLearnerDataExportFromBrowser(
  options: CollectLearnerDataExportOptions = {},
): LearnerDataExport {
  if (typeof window === "undefined") {
    throw new Error("学习数据导出仅可在浏览器中使用。");
  }

  const courseIds = options.courseIdsForStores
    ?? options.courses?.map((c) => c.id)
    ?? [];

  let learningMemoryRaw: string | null = null;
  try {
    learningMemoryRaw = getLearningMemoryStorageSnapshot();
  } catch {
    learningMemoryRaw = null;
  }

  let materialAdmissionRaw: string | null = null;
  try {
    materialAdmissionRaw = getMaterialAdmissionStorageSnapshot();
  } catch {
    materialAdmissionRaw = null;
  }

  return buildLearnerDataExport({
    learningMemoryRaw,
    qbAttempts: getAllQBAttempts(),
    qbFavorites: getQBFavorites(),
    mockExamSessions: collectMockSessions(courseIds),
    materialAdmissionRaw,
    userExamStructures: readUserExamStructures(courseIds),
    account: options.account ?? { signedIn: false, email: null },
    courses: options.courses,
  });
}

/** @deprecated Prefer collectLearnerDataExportFromBrowser; kept for call-site migration. */
export function collectLearnerExport(quotas?: unknown): LearnerDataExport {
  void quotas;
  return collectLearnerDataExportFromBrowser();
}

export function downloadLearnerExport(
  exportData: LearnerDataExport,
  filename: string = buildLearnerExportFilename(),
): void {
  if (typeof document === "undefined") {
    throw new Error("下载仅可在浏览器中使用。");
  }
  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function emptyLearnerExportForTests(): LearnerDataExport {
  return buildLearnerDataExport({
    learningMemoryRaw: JSON.stringify(createDefaultLearningMemoryState()),
    qbAttempts: {},
    qbFavorites: {},
    mockExamSessions: {},
    materialAdmissionRaw: null,
    userExamStructures: {},
    account: { signedIn: false, email: null },
    exportedAt: "2026-08-17T00:00:00.000Z",
  });
}
