export type ChapterQBProgress = {
  chapterId: string;
  lastIndex: number;
  completedIndices: number[];
};

export type QBAttemptRecord = {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  attemptedAt: string;
};

export type QBProgressStore = Record<string, ChapterQBProgress>;

export type QBAttemptStore = Record<string, QBAttemptRecord[]>;

export type QBFavoriteStore = Record<string, true>;

export type QBChapterStats = {
  total: number;
  done: number;
  correct: number;
};
