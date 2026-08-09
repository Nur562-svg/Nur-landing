/**
 * M4: Comprehensive learner data export utility.
 * Collects browser-local state for attempts, FSRS, QB, mocks, material admission, etc.
 * Reusable across dashboard, settings, or future account pages.
 * Never includes secrets or raw files.
 */

export type LearnerExport = {
  version: 1;
  exportedAt: string;
  source: "browser-local";
  data: {
    attempts: unknown;
    fsrsStates: unknown;
    qbAttempts: unknown;
    qbFavorites: unknown;
    mockSessions: unknown;
    materialAdmissions: unknown;
    userExamStructure: unknown;
    privateUnits?: unknown; // from sessionStorage if present
    quotasSnapshot?: unknown;
  };
  notes: string;
};

const KEYS = {
  attempts: "nur-learn:attempts:v1",
  fsrs: "nur-learn:fsrs:v1",
  qbAttempts: "nur-learn:qb-attempts:v1",
  qbFavorites: "nur-learn:qb-favorites:v1",
  mockSessions: "nur-learn:mock-exam-sessions:v1",
  materialAdmission: "nur-learn:material-admission:v1",
  userExam: "nur-learn:user-exam-structure:v1",
};

export function collectLearnerExport(quotas?: unknown): LearnerExport {
  if (typeof window === "undefined") {
    throw new Error("Export only available in browser");
  }

  const now = new Date().toISOString();

  const safeGet = (key: string) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return localStorage.getItem(key); // fallback to raw string
    }
  };

  const privateUnits = (() => {
    try {
      const raw = sessionStorage.getItem("nur-learn:private-material-analysis:v1");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  return {
    version: 1,
    exportedAt: now,
    source: "browser-local",
    data: {
      attempts: safeGet(KEYS.attempts),
      fsrsStates: safeGet(KEYS.fsrs),
      qbAttempts: safeGet(KEYS.qbAttempts),
      qbFavorites: safeGet(KEYS.qbFavorites),
      mockSessions: safeGet(KEYS.mockSessions),
      materialAdmissions: safeGet(KEYS.materialAdmission),
      userExamStructure: safeGet(KEYS.userExam),
      privateUnits,
      quotasSnapshot: quotas || null,
    },
    notes: "仅包含浏览器本地学习数据。不会上传。包含的材料准入记录仅为已明确同意的结构化元数据。",
  };
}

export function downloadLearnerExport(exportData: LearnerExport, filename = "nur-learn-learner-state.json") {
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
