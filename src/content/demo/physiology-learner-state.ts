import type { LearnerCourseState } from "@/types/learning";

export const physiologyDemoLearnerState = {
  id: "demo-state-physiology",
  courseId: "course-physiology",
  dataMode: "demo",
  demoLabel: "当前为结构演示",
  profile: {
    displayName: "张同学",
    major: "中西医结合临床",
    avatarLabel: "N",
  },
  overallProgress: 0,
  learnedUnits: 0,
  totalUnits: 1,
  currentStage: {
    id: "stage-physiology-introduction",
    label: "绪论 · 内环境与稳态",
    chapterIds: ["chapter-physiology-introduction"],
    assessmentLabel: "待确认",
  },
  currentChapterId: "chapter-physiology-introduction",
  currentKnowledgePointId: "kp-physiology-internal-environment-homeostasis",
  defaultRouteId: "understand",
  chapterProgress: [
    {
      chapterId: "chapter-physiology-introduction",
      progress: 0,
      learnedUnits: 0,
      totalUnits: 1,
      completedKnowledgePointIds: [],
    },
  ],
  sessionDurationMinutes: 40,
  sessionSteps: [
    { id: "session-physiology-understand", order: 1, routeId: "understand", minutes: 12, title: "概念与机制", detail: "划清区室并连接调节链", drawerTitle: "建立内环境与稳态模型" },
    { id: "session-physiology-express", order: 2, routeId: "express", minutes: 16, title: "主观题输出", detail: "完成名词解释与简答", drawerTitle: "完成两道来源题" },
    { id: "session-physiology-apply", order: 3, routeId: "apply", minutes: 12, title: "扰动迁移", detail: "解释变量偏离与恢复", drawerTitle: "完成一次稳态迁移" },
  ],
} satisfies LearnerCourseState;
