# ZCODE-M2: Clew Harness + Loop Profile + 教材编译管线

日期：2026-10-01。执行者：Zcode。验收：Nur。
真相源：`docs/CLEW_ARCHITECTURE_CONFIRMATION.md`、`docs/CLEW_RESOURCES_RESEARCH.md`、`docs/RESTRUCTURE_PLAN.md`、`docs/loop-profile-contract-draft.md`

---

## 任务总览

本任务书实现 Clew 的 **Agent Harness 骨架** 和 **可配置学习闭环（Loop Profile）**，包含四个阶段：

1. **Harness 基础**：基于 Vercel AI SDK ToolLoopAgent 的 Clew Agent 循环
2. **教材编译管线**：预编译 + 证据绑定 + 两层知识结构 + 失败隔离
3. **Loop Profile 集成**：类型契约 + AI 建议 + 学习页按 profile 渲染
4. **会话管理**：Prisma 持久化 + 跨页面状态连续

**前置条件**：ZCODE-M1 已完成（品牌迁移 + 代码清理 + 前端基础），验收时发现「悬浮 Agent 仍叫 NUR AGENT」需一并修复。

---

## Phase 0: M1 遗留修复（先执行）

### 0.1 NUR AGENT 品牌统一

**问题**：悬浮 Agent 组件仍显示「NUR AGENT」，未迁移为 Ariadne/Clew 品牌。

**修复**：
- 全局搜索 `NUR AGENT`、`NurAgent`、`nur-agent` 相关文案
- 替换为「Ariadne Agent」或「Clew Agent」（根据上下文）
- 保留 `nur-agent` 作为内部代码标识（文件路径、变量名），只改用户可见文案

**涉及文件**：
- `src/components/nur-agent-dock.tsx` / `nur-agent-dock-host.tsx` / `nur-agent-pilot.tsx` / `nur-agent-chat.tsx`
- 任何显示「NUR AGENT」的 UI 文案

**验收**：grep 无用户可见的「NUR AGENT」残留。

---

## Phase 1: Harness 基础（Clew Agent 循环）

### 1.1 安装依赖（如需要）

```bash
# Vercel AI SDK 已安装，确认版本
npm ls ai @ai-sdk/openai

# 如需更新
npm install ai@latest @ai-sdk/openai@latest
```

### 1.2 创建 Clew Agent 循环

**文件**：`src/lib/clew/agent-loop.ts`

**职责**：
- 封装 Vercel AI SDK `ToolLoopAgent`
- 管理 Clew 特有的工具集（萃取/生成/答疑/笔记）
- 集成配额检查（每次模型调用前）
- 流式事件输出（SSE 兼容）

**核心类型**：

```typescript
import { ToolLoopAgent, tool } from "ai";
import { z } from "zod";

// Clew 工具上下文（每次调用注入）
export type ClewToolContext = {
  userId: string;
  textbookId?: string;
  chapterId?: string;
  kpId?: string;
  quotaRemaining: number;  // 剩余配额
};

// Clew 工具定义
export const clewTools = {
  extractKnowledgePoints: tool({
    description: "从教材章节萃取知识点",
    inputSchema: z.object({
      chapterId: z.string(),
      chapterText: z.string(),  // 本章文字层内容
    }),
    execute: async ({ chapterId, chapterText }, { context }) => {
      // 调用萃取逻辑，返回 KP 列表
    },
  }),
  
  generateLesson: tool({
    description: "为知识点生成讲义",
    inputSchema: z.object({
      kpId: z.string(),
      kpTitle: z.string(),
      kpDescription: z.string(),
      sourceText: z.string(),  // 相关原文
    }),
    execute: async ({ kpId, kpTitle, kpDescription, sourceText }, { context }) => {
      // 调用讲义生成逻辑
    },
  }),
  
  answerQuestion: tool({
    description: "回答学生关于知识点的问题",
    inputSchema: z.object({
      kpId: z.string(),
      question: z.string(),
      lessonContent: z.string().optional(),  // 已有讲义内容
    }),
    execute: async ({ kpId, question, lessonContent }, { context }) => {
      // 调用答疑逻辑
    },
  }),
  
  generateNote: tool({
    description: "生成章节学霸笔记",
    inputSchema: z.object({
      chapterId: z.string(),
      lessons: z.array(z.object({
        kpTitle: z.string(),
        content: z.string(),
      })),
      highlights: z.array(z.object({
        quote: z.string(),
        note: z.string().optional(),
      })),
    }),
    execute: async ({ chapterId, lessons, highlights }, { context }) => {
      // 调用笔记生成逻辑
    },
  }),
  
  suggestLoopProfile: tool({
    description: "为知识点建议学习闭环类型",
    inputSchema: z.object({
      kpTitle: z.string(),
      kpDescription: z.string(),
      hasPractice: z.boolean(),
      hasCase: z.boolean(),
      questionKinds: z.array(z.string()),
      estimatedMinutes: z.number(),
    }),
    execute: async (input, { context }) => {
      // 调用 LoopProfile 建议逻辑
    },
  }),
};

// Clew Agent 循环
export function createClewAgent(context: ClewToolContext) {
  return new ToolLoopAgent({
    model: getClewModel(),  // 获取配置的模型（DashScope qwen3.7-plus）
    instructions: buildClewSystemPrompt(context),
    tools: clewTools,
    stopWhen: isStepCount(10),  // 限制步数，控制成本
    experimental_toolCallers: {
      // 工具调用前检查配额
      extractKnowledgePoints: async () => {
        if (context.quotaRemaining <= 0) {
          throw new Error("配额不足，无法继续萃取");
        }
      },
      // ... 其他工具同理
    },
  });
}

// 流式事件类型（SSE 输出）
export type ClewAgentEvent =
  | { type: "text-delta"; text: string }
  | { type: "tool-call"; toolName: string; input: unknown }
  | { type: "tool-result"; toolName: string; result: unknown }
  | { type: "step-complete"; stepNumber: number }
  | { type: "done"; totalTokens: number }
  | { type: "error"; error: string };
```

### 1.3 模型配置

**文件**：`src/lib/clew/providers/dashscope.ts`

**职责**：
- 封装 DashScope qwen3.7-plus 调用
- 复用现有 `src/lib/course-builder/providers/dashscope.ts` 模式
- 预留多模型接口（本次只实现 DashScope）

```typescript
import { createOpenAI } from "@ai-sdk/openai";

// 预留多模型配置接口
export type ClewModelConfig = {
  provider: "dashscope" | "deepseek" | "kimi" | "openai-compatible";
  model: string;
  apiKey: string;
  baseURL?: string;
  maxTokens: number;
  temperature: number;
};

// 默认配置（本次硬编码，后续从环境变量/数据库读取）
const defaultConfig: ClewModelConfig = {
  provider: "dashscope",
  model: "qwen3.7-plus",
  apiKey: process.env.DASHSCOPE_API_KEY ?? "",
  baseURL: process.env.DASHSCOPE_BASE_URL,
  maxTokens: 4096,
  temperature: 0.3,
};

export function getClewModel(config: ClewModelConfig = defaultConfig) {
  const openai = createOpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
  });
  
  return openai(config.model);
}

// 按任务类型获取模型（预留，本次全部用默认）
export function getModelForTask(task: "extraction" | "lesson" | "chat" | "note" | "profile") {
  return getClewModel();
}
```

### 1.4 系统 Prompt

**文件**：`src/lib/clew/prompts.ts`

```typescript
export function buildClewSystemPrompt(context: ClewToolContext): string {
  return `你是 Ariadne Clew 的医学学习助手，专门帮助学生深入理解教材内容。

## 你的角色
- 你是「知径」（Ariadne）的线团（Clew），在知识的迷宫中引导学生找到出路
- 你基于学生上传的教材内容回答问题，不编造教材中没有的信息
- 你帮助学生萃取知识点、生成讲义、解答疑问、整理笔记

## 当前上下文
- 用户 ID: ${context.userId}
- 教材: ${context.textbookId ?? "未指定"}
- 章节: ${context.chapterId ?? "未指定"}
- 知识点: ${context.kpId ?? "未指定"}

## 行为准则
1. 始终基于教材原文回答，不确定时明确说「教材中没有相关内容」
2. 医学内容保持严谨，不给出诊断建议，只做学习辅助
3. 回答简洁精准，引用教材原文时注明页码
4. 鼓励学生主动思考，不是直接给答案，而是引导理解

## 输出格式
- 使用 Markdown 格式
- 重要概念用 **加粗**
- 引用原文用 > 引用块
- 页码标注用（第 N 页）
`;
}
```

---

## Phase 2: 教材编译管线

### 2.1 编译器核心

**文件**：`src/lib/clew/compiler.ts`

**职责**：
- 编排教材编译流程（借鉴 DeepTutor 五阶段简化版 + 知纲证据绑定）
- 管理编译状态（uploaded → toc_ready → extracting → ready）
- 失败隔离（单章失败不阻塞其他章节）

**核心流程**：

```typescript
import type { ClewTextbook, ClewChapter, ClewKnowledgePoint } from "@/types/clew";

// 编译状态机（借鉴 OpenMAIC）
export type ClewCompileState =
  | "uploaded"        // 已上传，待目录识别
  | "toc_ready"       // 目录已识别，待章节修正
  | "chapters_ready"  // 章节已确认，待萃取
  | "extracting"      // 萃取中
  | "ready"           // 全部完成
  | "failed";         // 失败

// 编译进度（SSE 输出）
export type ClewCompileProgress = {
  state: ClewCompileState;
  currentChapter?: number;
  totalChapters?: number;
  currentStep?: string;  // 当前步骤描述（Mentrix 风格文字流）
  error?: string;
};

// 教材编译器
export class ClewCompiler {
  constructor(
    private textbookId: string,
    private agent: ReturnType<typeof createClewAgent>,
  ) {}

  // 阶段 1：目录识别（已有，M1 完成）
  async recognizeToc(): Promise<ClewChapter[]> {
    // 调用现有 toc-recognition 逻辑
  }

  // 阶段 2：章节修正（已有，M1 完成 SpineEditor）
  async confirmChapters(chapters: ClewChapter[]): Promise<void> {
    // 保存确认后的章节结构
    // 状态推进到 chapters_ready
  }

  // 阶段 3：知识点萃取（本次实现）
  async extractAllChapters(
    onProgress: (progress: ClewCompileProgress) => void,
  ): Promise<ClewKnowledgePoint[]> {
    const chapters = await this.getChapters();
    const results: ClewKnowledgePoint[] = [];
    
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      
      onProgress({
        state: "extracting",
        currentChapter: i + 1,
        totalChapters: chapters.length,
        currentStep: `精读第 ${i + 1}/${chapters.length} 章：${chapter.title}`,
      });

      try {
        // 单章萃取（失败隔离）
        const kps = await this.extractChapter(chapter);
        results.push(...kps);
        
        // 更新章节状态
        await this.updateChapterStatus(chapter.id, "extracted", kps.length);
      } catch (error) {
        // 单章失败，记录错误，继续下一章
        await this.updateChapterStatus(chapter.id, "failed", 0, error.message);
        console.error(`Chapter ${chapter.id} extraction failed:`, error);
      }
    }

    onProgress({ state: "ready" });
    return results;
  }

  // 单章萃取（带证据绑定）
  private async extractChapter(chapter: ClewChapter): Promise<ClewKnowledgePoint[]> {
    // 1. 提取本章文字层（缓存，避免重复解析）
    const chapterText = await this.getChapterText(chapter);
    
    // 2. 调用 Agent 萃取
    const result = await this.agent.run({
      prompt: `请从以下教材章节中萃取知识点。

章节标题：${chapter.title}
页码范围：第 ${chapter.pageStart} - ${chapter.pageEnd} 页

章节内容：
${chapterText}

要求：
1. 每个知识点包含：标题、描述、关键术语、前置知识、来源页码
2. 知识点应该是独立的学习单元，可以单独学习
3. 来源页码必须精确到具体页码，用于证据绑定
4. 输出为 JSON 格式`,
    });

    // 3. 解析结果，绑定证据
    const kps = parseKnowledgePoints(result.text, chapter);
    
    // 4. 为每个 KP 建议 LoopProfile
    for (const kp of kps) {
      kp.loopProfileId = await this.suggestLoopProfile(kp);
    }

    return kps;
  }

  // LoopProfile 建议（AI 建议，用户可改）
  private async suggestLoopProfile(kp: ClewKnowledgePoint): Promise<string> {
    // 调用 suggestLoopProfile 工具
    // 返回 profileId
  }
}
```

### 2.2 证据绑定（知纲模式）

**文件**：`src/lib/clew/evidence.ts`

**职责**：
- 每个知识点绑定原文证据（页码 + 引用文本）
- 证据不可修改，作为学习内容的「真源」

```typescript
// 证据原子（知纲模式）
export type ClewEvidenceAtom = {
  id: string;
  textbookId: string;
  chapterId: string;
  pageNumber: number;
  text: string;           // 原文文本
  contextBefore?: string; // 前文上下文（可选）
  contextAfter?: string;  // 后文上下文（可选）
};

// 知识点-证据绑定
export type ClewKnowledgePointEvidence = {
  kpId: string;
  evidenceIds: string[];  // 关联的证据原子 ID 列表
  primaryEvidenceId: string;  // 主要证据（最相关的一页）
};

// 证据提取（从章节文本中定位 KP 相关原文）
export function extractEvidenceAtoms(
  chapterText: string,
  chapter: ClewChapter,
): ClewEvidenceAtom[] {
  // 按页分割文本
  // 为每页创建证据原子
  // 返回证据列表
}

// 证据关联（将 KP 与最相关的证据原子关联）
export function linkKnowledgePointToEvidence(
  kp: ClewKnowledgePoint,
  evidenceAtoms: ClewEvidenceAtom[],
): ClewKnowledgePointEvidence {
  // 基于文本相似度找到最相关的证据
  // 返回绑定关系
}
```

### 2.3 两层知识结构（知纲模式）

**文件**：`src/lib/clew/structure.ts`

**职责**：
- Chapter → KP → KP 内部结构（定义/公式/推导/案例）
- 支持三视图派生（初学/复习/备考）

```typescript
// KP 内部内容条目（知纲 UnitContentItem）
export type ClewContentItem = {
  id: string;
  type: "definition" | "formula" | "derivation" | "example" | "comparison" | "summary";
  title: string;
  content: string;
  order: number;
  evidenceId?: string;  // 关联证据
};

// 知识点完整数据包（知纲 KnowledgePackage）
export type ClewKnowledgePackage = {
  kp: ClewKnowledgePoint;
  evidence: ClewKnowledgePointEvidence;
  contentItems: ClewContentItem[];  // 内部结构
  
  // 三视图（派生，不重新生成事实）
  views: {
    firstStudy: string;   // 完整笔记，包含所有推导
    review: string;       // 复习视图，折叠详细推导
    exam: string;         // 备考视图，最大压缩
  };
  
  // 版本追踪
  versions: {
    evidenceVersion: number;
    structureVersion: number;
    noteVersion: number;
  };
};

// 生成三视图（从同一事实基础派生）
export function deriveThreeViews(
  contentItems: ClewContentItem[],
): { firstStudy: string; review: string; exam: string } {
  // firstStudy: 完整内容，包含所有类型
  // review: 保留 definition/formula/summary，折叠 derivation/example
  // exam: 只保留 formula/summary/comparison
}
```

### 2.4 失败隔离

**文件**：`src/lib/clew/resilience.ts`

```typescript
// 失败状态追踪
export type ClewFailureRecord = {
  chapterId: string;
  kpId?: string;
  stage: "toc" | "extraction" | "lesson" | "note";
  error: string;
  retryCount: number;
  lastRetryAt: string;
};

// 失败隔离执行器
export async function executeWithIsolation<T>(
  items: T[],
  executor: (item: T) => Promise<void>,
  onFailure: (item: T, error: Error) => void,
): Promise<{ succeeded: T[]; failed: Array<{ item: T; error: Error }> }> {
  const succeeded: T[] = [];
  const failed: Array<{ item: T; error: Error }> = [];

  for (const item of items) {
    try {
      await executor(item);
      succeeded.push(item);
    } catch (error) {
      failed.push({ item, error: error as Error });
      onFailure(item, error as Error);
    }
  }

  return { succeeded, failed };
}

// 重试机制（指数退避）
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000,
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await sleep(baseDelayMs * Math.pow(2, i));
      }
    }
  }
  
  throw lastError!;
}
```

---

## Phase 3: Loop Profile 集成

### 3.1 类型契约

**文件**：`src/types/loop-profile.ts`

基于 `docs/loop-profile-contract-draft.md`，完整实现：

```typescript
// 学习环节
export type LoopStage =
  | "learn"      // 学
  | "practice"   // 练
  | "assess"     // 评
  | "diagnose"   // 诊
  | "review"     // 复
  | "transfer";  // 迁移

// Loop Profile
export type LoopProfile = {
  id: string;
  name: string;
  description: string;
  stages: readonly LoopStage[];
  entryStage: LoopStage;
  exitBehavior: LoopExitBehavior;
  fsrsEnabled: boolean;
  wrongQuestionEnabled: boolean;
};

export type LoopExitBehavior =
  | { kind: "loop-back"; targetStage: LoopStage }
  | { kind: "exit-to-shelf" }
  | { kind: "promote-to"; targetProfileId: string };

// 预定义 Profile
export const LOOP_PROFILES: Record<string, LoopProfile> = {
  "concept-mastery": { /* ... */ },
  "skill-application": { /* ... */ },
  "exam-cram": { /* ... */ },
  "long-term-retention": { /* ... */ },
  "exploration": { /* ... */ },
  "full-loop": { /* ... */ },
};

export type LoopProfileId = keyof typeof LOOP_PROFILES;

// Profile 分配
export type LoopProfileAssignment = {
  contentType: "official-kp" | "clew-kp" | "qb-chapter";
  contentId: string;
  profileId: LoopProfileId;
  assignedBy: "ai-suggested" | "user-selected" | "default";
  assignedAt: string;
};

// 学习会话
export type LearningSession = {
  id: string;
  userId: string;
  contentType: LoopProfileAssignment["contentType"];
  contentId: string;
  profileId: LoopProfileId;
  currentStageIndex: number;
  stageStates: Record<LoopStage, StageState>;
  startedAt: string;
  completedAt: string | null;
};

export type StageState =
  | { status: "pending" }
  | { status: "active"; enteredAt: string }
  | { status: "completed"; completedAt: string; result?: StageResult }
  | { status: "skipped"; reason: string };

export type StageResult =
  | { kind: "lesson-read"; durationMinutes: number }
  | { kind: "practice-attempt"; attemptId: string; score: number | null }
  | { kind: "assessment"; selfCheckResults: CriterionResult[] }
  | { kind: "diagnosis"; weakPoints: string[] }
  | { kind: "review"; fsrsRating: "again" | "hard" | "good"; nextDueAt: string }
  | { kind: "transfer"; caseId: string; completedStages: string[] };
```

### 3.2 Profile 建议逻辑

**文件**：`src/lib/loop-profile.ts`

```typescript
import type { LoopProfileId, LoopProfileAssignment } from "@/types/loop-profile";

// 建议规则（AI 建议，用户可改）
export function suggestLoopProfile(content: {
  type: LoopProfileAssignment["contentType"];
  title: string;
  description: string;
  hasLesson: boolean;
  hasPractice: boolean;
  hasCase: boolean;
  questionKinds: readonly string[];
  estimatedDurationMinutes: number;
}): LoopProfileId {
  // 规则引擎
  if (content.type === "qb-chapter") return "exam-cram";
  if (!content.hasLesson) return "exam-cram";
  if (content.hasCase) return "full-loop";
  if (content.hasPractice && content.questionKinds.includes("case")) return "skill-application";
  if (content.estimatedDurationMinutes <= 10) return "concept-mastery";
  if (content.questionKinds.every(k => k === "term" || k === "fill")) return "long-term-retention";
  return "skill-application";
}

// 获取 Profile 显示信息
export function getLoopProfileDisplay(profileId: LoopProfileId): {
  name: string;
  description: string;
  stageNames: string[];
} {
  // 返回 profile 的显示名称和阶段名称列表
}

// 验证 Profile 切换
export function canSwitchProfile(
  currentProfileId: LoopProfileId,
  newProfileId: LoopProfileId,
  sessionState?: LearningSession,
): { allowed: boolean; reason?: string } {
  // 检查是否允许切换（如：进行中会话不允许切换到不兼容的 profile）
}
```

### 3.3 学习页按 Profile 渲染

**文件**：`src/components/clew-study.tsx`（修改）

**核心改动**：
- KP 卡片显示 LoopProfile 标签（如「概念理解」）
- 点击标签可切换 Profile（下拉菜单）
- 按 Profile 渲染对应环节导航

```tsx
// 新增：Profile 标签和切换
function KnowledgePointCard({ kp, onProfileChange }: Props) {
  const profile = LOOP_PROFILES[kp.loopProfileId];
  
  return (
    <div className={styles.kpCard}>
      <div className={styles.kpHeader}>
        <h3>{kp.title}</h3>
        <ProfileBadge
          profileId={kp.loopProfileId}
          onChange={(newProfileId) => onProfileChange(kp.id, newProfileId)}
        />
      </div>
      <p>{kp.description}</p>
      
      {/* 按 Profile 渲染环节导航 */}
      <div className={styles.stageNav}>
        {profile.stages.map((stage, index) => (
          <StageLink
            key={stage}
            stage={stage}
            isActive={index === currentStageIndex}
            isCompleted={stageStates[stage]?.status === "completed"}
          />
        ))}
      </div>
    </div>
  );
}

// 环节显示映射
const STAGE_DISPLAY: Record<LoopStage, { name: string; icon: string }> = {
  learn: { name: "学", icon: "📖" },
  practice: { name: "练", icon: "✍️" },
  assess: { name: "评", icon: "✅" },
  diagnose: { name: "诊", icon: "🔍" },
  review: { name: "复", icon: "🔄" },
  transfer: { name: "迁移", icon: "🚀" },
};
```

---

## Phase 4: 会话管理

### 4.1 Prisma Schema 扩展

**文件**：`prisma/schema.prisma`（修改）

```prisma
// Clew 学习会话
model ClewStudySession {
  id              String   @id @default(cuid())
  userId          String
  textbookId      String
  chapterId       String?
  kpId            String?
  
  // LoopProfile
  profileId       String
  currentStageIndex Int    @default(0)
  stageStates     Json     // Record<LoopStage, StageState>
  
  // 状态
  status          String   // active | completed | abandoned
  startedAt       DateTime @default(now())
  lastActiveAt    DateTime @default(now())
  completedAt     DateTime?
  
  // 关联
  user            User     @relation(fields: [userId], references: [id])
  
  @@index([userId, status])
  @@index([userId, textbookId])
}

// Clew 教材编译缓存（预编译，book-to-skill 模式）
model ClewCompileCache {
  id              String   @id @default(cuid())
  textbookId      String   @unique
  
  // 编译状态
  state           String   // uploaded | toc_ready | chapters_ready | extracting | ready | failed
  progress        Json?    // ClewCompileProgress
  
  // 缓存内容
  tocData         Json?    // 目录识别结果
  chapters        Json?    // 章节结构
  kpPackages      Json?    // 知识点数据包（含证据绑定）
  
  // 版本
  contentFingerprint String  // 教材内容 SHA-256，变化时重新编译
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([state])
}

// Clew 证据原子（知纲模式）
model ClewEvidenceAtom {
  id              String   @id @default(cuid())
  textbookId      String
  chapterId       String
  pageNumber      Int
  text            String   // 原文文本
  contextBefore   String?
  contextAfter    String?
  
  createdAt       DateTime @default(now())
  
  @@index([textbookId, chapterId])
  @@index([chapterId, pageNumber])
}

// Clew 知识点证据绑定
model ClewKnowledgePointEvidence {
  id              String   @id @default(cuid())
  kpId            String
  evidenceId      String
  isPrimary       Boolean  @default(false)
  relevanceScore  Float?   // 相关度评分
  
  evidence        ClewEvidenceAtom @relation(fields: [evidenceId], references: [id])
  
  @@unique([kpId, evidenceId])
  @@index([kpId])
}
```

### 4.2 会话服务

**文件**：`src/lib/clew/session.ts`

```typescript
import { PrismaClient } from "@prisma/client";
import type { LearningSession, StageState } from "@/types/loop-profile";

const prisma = new PrismaClient();

// 创建或恢复会话
export async function getOrCreateSession(
  userId: string,
  textbookId: string,
  kpId: string,
  profileId: string,
): Promise<LearningSession> {
  // 查找活跃会话
  const existing = await prisma.clewStudySession.findFirst({
    where: {
      userId,
      kpId,
      status: "active",
    },
  });
  
  if (existing) {
    return toLearningSession(existing);
  }
  
  // 创建新会话
  const session = await prisma.clewStudySession.create({
    data: {
      userId,
      textbookId,
      kpId,
      profileId,
      stageStates: {},
    },
  });
  
  return toLearningSession(session);
}

// 更新会话状态
export async function updateSessionStage(
  sessionId: string,
  stage: string,
  state: StageState,
): Promise<void> {
  const session = await prisma.clewStudySession.findUnique({
    where: { id: sessionId },
  });
  
  if (!session) throw new Error("Session not found");
  
  const stageStates = {
    ...(session.stageStates as Record<string, StageState>),
    [stage]: state,
  };
  
  await prisma.clewStudySession.update({
    where: { id: sessionId },
    data: {
      stageStates,
      lastActiveAt: new Date(),
    },
  });
}

// 完成会话
export async function completeSession(sessionId: string): Promise<void> {
  await prisma.clewStudySession.update({
    where: { id: sessionId },
    data: {
      status: "completed",
      completedAt: new Date(),
    },
  });
}

// 获取用户的学习历史
export async function getUserSessions(
  userId: string,
  options?: {
    textbookId?: string;
    status?: string;
    limit?: number;
  },
): Promise<LearningSession[]> {
  const sessions = await prisma.clewStudySession.findMany({
    where: {
      userId,
      textbookId: options?.textbookId,
      status: options?.status,
    },
    orderBy: { lastActiveAt: "desc" },
    take: options?.limit ?? 20,
  });
  
  return sessions.map(toLearningSession);
}
```

---

## API 路由更新

### 5.1 萃取 API（走 Harness）

**文件**：`src/app/api/clew/textbooks/[id]/chapters/[order]/extract/route.ts`（修改）

```typescript
import { createClewAgent, ClewCompiler } from "@/lib/clew";
import { getUserQuota, checkQuota } from "@/lib/quotas";

export async function POST(
  request: Request,
  { params }: { params: { id: string; order: string } },
) {
  // 1. 认证
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "未登录" }, { status: 401 });
  
  // 2. 配额检查
  const quota = await getUserQuota(user.id);
  if (!checkQuota(quota, "clew-extraction")) {
    return Response.json({ error: "配额不足" }, { status: 503 });
  }
  
  // 3. 创建 Agent 和编译器
  const agent = createClewAgent({
    userId: user.id,
    textbookId: params.id,
    quotaRemaining: quota.remaining,
  });
  
  const compiler = new ClewCompiler(params.id, agent);
  
  // 4. SSE 流式响应
  const stream = new ReadableStream({
    async start(controller) {
      try {
        await compiler.extractAllChapters((progress) => {
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify(progress)}\n\n`),
          );
        });
        controller.close();
      } catch (error) {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ state: "failed", error: error.message })}\n\n`,
          ),
        );
        controller.close();
      }
    },
  });
  
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

### 5.2 讲义生成 API（走 Agent Loop）

**文件**：`src/app/api/clew/kp/[id]/lesson/route.ts`（修改）

```typescript
import { createClewAgent } from "@/lib/clew";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  // 1. 认证 + 配额
  // 2. 创建 Agent
  // 3. 调用 generateLesson 工具
  // 4. SSE 流式返回
}
```

---

## 测试要求

### 6.1 单元测试

**文件**：`tests/clew-compiler.test.ts`（新增）

```typescript
import { describe, it } from "node:test";
import assert from "node:assert";
import { ClewCompiler } from "@/lib/clew/compiler";

describe("ClewCompiler", () => {
  it("should extract chapters with failure isolation", async () => {
    // 测试单章失败不阻塞其他章节
  });
  
  it("should bind evidence to knowledge points", async () => {
    // 测试证据绑定
  });
  
  it("should suggest loop profile based on content", async () => {
    // 测试 LoopProfile 建议
  });
});
```

**文件**：`tests/loop-profile.test.ts`（新增）

```typescript
import { describe, it } from "node:test";
import assert from "node:assert";
import { suggestLoopProfile, canSwitchProfile } from "@/lib/loop-profile";

describe("LoopProfile", () => {
  it("should suggest exam-cram for qb-chapter", () => {
    const profile = suggestLoopProfile({
      type: "qb-chapter",
      // ...
    });
    assert.strictEqual(profile, "exam-cram");
  });
  
  it("should suggest concept-mastery for short content", () => {
    const profile = suggestLoopProfile({
      estimatedDurationMinutes: 5,
      // ...
    });
    assert.strictEqual(profile, "concept-mastery");
  });
});
```

### 6.2 集成测试

**文件**：`tests/clew-api.test.ts`（新增）

- 测试萃取 API 的 SSE 流式响应
- 测试讲义生成 API 的 Agent Loop
- 测试配额不足时的 503 响应

---

## 验收标准

### Phase 0 验收

- [ ] grep 无用户可见的「NUR AGENT」残留
- [ ] `npm run check` 通过

### Phase 1 验收

- [ ] `src/lib/clew/agent-loop.ts` 创建完成
- [ ] `src/lib/clew/providers/dashscope.ts` 创建完成
- [ ] `src/lib/clew/prompts.ts` 创建完成
- [ ] 单元测试通过

### Phase 2 验收

- [ ] `src/lib/clew/compiler.ts` 创建完成
- [ ] `src/lib/clew/evidence.ts` 创建完成
- [ ] `src/lib/clew/structure.ts` 创建完成
- [ ] `src/lib/clew/resilience.ts` 创建完成
- [ ] 教材编译全流程可走通（上传→目录→章节→萃取）
- [ ] 失败隔离验证（模拟单章失败，其他章节正常）
- [ ] 证据绑定验证（KP 关联正确页码）

### Phase 3 验收

- [ ] `src/types/loop-profile.ts` 创建完成
- [ ] `src/lib/loop-profile.ts` 创建完成
- [ ] 学习页显示 LoopProfile 标签
- [ ] 学习页按 Profile 渲染对应环节
- [ ] 单元测试通过

### Phase 4 验收

- [ ] Prisma schema 迁移成功
- [ ] `src/lib/clew/session.ts` 创建完成
- [ ] 会话创建/恢复/更新/完成全流程可走通
- [ ] `npm run check` + `npm run test` 全部通过

---

## 风险与回滚

| 风险 | 对策 |
|------|------|
| Vercel AI SDK 版本不兼容 | 锁定版本，测试后再升级 |
| Prisma 迁移失败 | 备份 dev.db，迁移失败可回滚 |
| Agent Loop 成本失控 | `stopWhen: isStepCount(10)` + 配额硬限制 |
| 教材编译状态不一致 | 状态机验证，异常状态自动修复 |

---

## 下一步预告

- **ZCODE-M3**：统一状态层（UnifiedLearningEvent）+ 视觉 Mentrix 化 + Page Chat 固化
- **ZCODE-M4**：三视图派生 + 知识图谱（纯 SVG）+ 多模型接入

---

## 参考文档

| 文档 | 用途 |
|------|------|
| `docs/CLEW_ARCHITECTURE_CONFIRMATION.md` | 架构定案 |
| `docs/CLEW_RESOURCES_RESEARCH.md` | 技术选型调研 |
| `docs/loop-profile-contract-draft.md` | Loop Profile 契约草案 |
| `docs/RESTRUCTURE_PLAN.md` | 重构总计划 |
| DeepTutor GitHub | Book Engine 五阶段参考 |
| 知纲 GitHub | 证据绑定、两层结构、失败隔离参考 |
| book-to-skill GitHub | 预编译、按需加载参考 |
| Vercel AI SDK 文档 | ToolLoopAgent API 参考 |
