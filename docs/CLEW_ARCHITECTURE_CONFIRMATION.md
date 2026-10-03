# Ariadne Clew 架构方向确认书（2026-09-30 深夜）

日期：2026-09-30。状态：深度调研后定案，避免走弯路。
调研来源：DeepTutor GitHub（HKUDS，40k★，Apache-2.0）、Grok Build GitHub（xAI，Apache-2.0）、Vercel AI SDK v7 文档、Flue（Astro 团队）、Open Harness。

---

## 一、核心结论：不 fork，自研轻量 Harness

### 为什么不直接 fork DeepTutor 或 Grok Build

| 项目 | 语言/框架 | 与 Ariadne 的兼容性问题 |
|------|----------|------------------------|
| **DeepTutor** | Python 后端 + Next.js 16 前端 | Python 后端与 Ariadne 全 TypeScript 栈不兼容；Book Engine 是「无中生有」（从意图生成书），不是「教材编译」（从用户教材提取）；多 Agent 体系（SourceExplorer/SpineSynthesizer/PagePlanner/BookCompiler）过重，违背配额可预期性 |
| **Grok Build** | Rust（75 个 crate） | 完全不同的语言生态；TUI 终端界面与 Web 产品形态不符；工具系统面向代码编辑（terminal/file edit/search），不是学习场景 |
| **Flue** | TypeScript（Astro 团队） | 最接近，但 2026 年 2 月才发布，API 可能不稳定；核心优势是沙箱/部署适配，Ariadne 不需要 |

**结论**：借鉴架构思想，自研 TypeScript 轻量 Harness，复用 Ariadne 现有基础设施（Next.js API Routes、SSE、Prisma、配额系统）。

---

## 二、借鉴什么：DeepTutor 的教材编译管线

### DeepTutor Book Engine 五阶段（适配为 Clew 教材编译）

```
DeepTutor 五阶段                Ariadne Clew 适配
─────────────────────────────────────────────────────
1. Ideation（意图→大纲）        → 简化：用户上传教材，无需意图生成
2. Source exploration（RAG）    → 保留：PDF 文字层提取 + 启发式分块
3. Spine synthesis（章节树）    → 保留：目录识别 + 章节修正（SpineEditor）
4. Page planning（页面块规划）  → 简化：每章直接萃取知识点，不规划页面块
5. Block compilation（块编译）  → 保留：讲义生成 + 划重点 + 笔记
```

**关键借鉴点**：
- **确认门槛**：SpineEditor 确认后才触发萃取（已列入 ZCODE-M1）
- **进度时间轴**：`BookProgressTimeline` 思路 → Clew 萃取进度可跨刷新续存
- **类型化块**：14 种块只取 3 种医学高价值：quiz / flashcard / concept-graph（P3 再做）

### DeepTutor 数据模型适配

```typescript
// 借鉴 DeepTutor 的 Book/Spine/Chapter/Page/Block 层级
// 但简化为 Clew 的三层：Textbook → Chapter → KnowledgePoint

type ClewTextbook = {
  id: string;
  title: string;
  status: "uploaded" | "toc_ready" | "extracting" | "ready" | "failed";
  // 借鉴 DeepTutor：kb_fingerprints 检测教材变化
  contentFingerprint: string;  // SHA-256，教材内容变化时标记需重新萃取
};

type ClewChapter = {
  id: string;
  textbookId: string;
  order: number;
  title: string;
  pageStart: number;
  pageEnd: number;
  status: "pending" | "extracting" | "extracted" | "failed";
  // 借鉴 DeepTutor：SourceChunk 持久化，避免重复 RAG
  extractedText: string | null;  // 本章文字层内容（萃取时缓存）
  knowledgePointCount: number;
};

type ClewKnowledgePoint = {
  id: string;
  chapterId: string;
  order: number;
  title: string;
  description: string;
  keyTerms: string[];
  prerequisites: string[];
  sourcePage: number;
  // 新增：LoopProfile（Ariadne 独有）
  loopProfileId: string;
  // 新增：编译状态（借鉴 DeepTutor Block status）
  lessonStatus: "pending" | "generating" | "ready" | "failed";
  noteStatus: "pending" | "generating" | "ready" | "failed";
};
```

---

## 三、借鉴什么：Grok Build 的 Agent 循环

### Grok Build 核心架构（适配为 Clew Agent）

```
Grok Build 架构                Ariadne Clew 适配
─────────────────────────────────────────────────────
Actor 会话引擎                  → ClewStudySession（学习会话管理）
Agentic 循环（采样→工具→渲染）   → ClewAgentLoop（简化版：无代码执行，只有内容生成）
上下文压缩                     → 复用现有 token 截断策略
持久化（会话状态）              → Prisma LearningSession 表
Leader-Follower（多 Agent）     → 不做：单 Agent 足够，避免复杂度
工具抽象（两层）                → 简化为单层：ClewTool（萃取/生成/检索）
MCP/Hooks/插件                 → P3 再做：先硬编码，后抽象
```

**关键借鉴点**：
- **会话持久化**：Grok Build 的会话跨重启续存 → Clew 学习会话跨页面/设备同步
- **工具即一等公民**：每个 Agent 能力都是工具，可独立测试、可组合
- **流式渲染**：TUI 的增量渲染 → Web 的 SSE 流式更新（已有）

### Clew Agent 循环（简化版）

```typescript
// 借鉴 Grok Build agentic loop，但简化为学习场景
type ClewAgentLoop = {
  // 1. 感知：读取当前学习上下文
  perceive(context: ClewStudyContext): ClewPerception;

  // 2. 决策：选择下一步动作（生成讲义/回答问题/生成练习/...）
  decide(perception: ClewPerception): ClewAction;

  // 3. 执行：调用工具完成动作
  act(action: ClewAction): Promise<ClewActionResult>;

  // 4. 观察：记录结果，更新状态
  observe(result: ClewActionResult): ClewObservation;

  // 5. 循环或终止
  shouldContinue(observation: ClewObservation): boolean;
};

// Clew 工具集（单层，非 Grok 的两层）
type ClewTool =
  | { kind: "extract-kp"; chapterId: string }           // 萃取知识点
  | { kind: "generate-lesson"; kpId: string }           // 生成讲义
  | { kind: "answer-question"; kpId: string; question: string }  // 答疑
  | { kind: "generate-note"; chapterId: string }        // 生成笔记
  | { kind: "suggest-profile"; kpId: string }           // 建议 LoopProfile
  | { kind: "retrieve-source"; kpId: string; query: string };    // 检索教材原文
```

---

## 四、借鉴什么：Vercel AI SDK 的 ToolLoopAgent

### 为什么参考 Vercel AI SDK

Ariadne 已安装 `ai` + `@ai-sdk/openai`，Vercel AI SDK v7 的 `ToolLoopAgent` 是**最贴近需求的现成抽象**：

```typescript
import { ToolLoopAgent, tool } from 'ai';
import { z } from 'zod';

// Clew Harness 基于 ToolLoopAgent 构建
const clewAgent = new ToolLoopAgent({
  model: getModelForTask("lesson"),  // 按任务类型选模型
  instructions: `你是 Ariadne Clew 的医学学习助手...`,
  tools: {
    extractKnowledgePoints: tool({
      description: "从教材章节萃取知识点",
      inputSchema: z.object({ chapterId: z.string() }),
      execute: async ({ chapterId }) => { /* ... */ },
    }),
    generateLesson: tool({
      description: "为知识点生成讲义",
      inputSchema: z.object({ kpId: z.string() }),
      execute: async ({ kpId }) => { /* ... */ },
    }),
    // ...
  },
  stopWhen: isStepCount(10),  // 限制步数，控制成本
});
```

**关键借鉴点**：
- **provider-neutral**：Vercel AI SDK 已抽象 OpenAI/Anthropic/Google 等，Ariadne 只需实现 DashScope/DeepSeek/Kimi 等国产模型 adapter
- **工具审批**：`needsApproval` → Clew 的配额检查（每次模型调用前确认配额）
- **流式事件**：`stream()` → Clew 的 SSE 已有，可复用

---

## 五、Ariadne Clew Harness 架构（最终定案）

### 分层架构

```
┌─────────────────────────────────────────────────────────┐
│  表现层（Presentation）                                  │
│  - clew-*.tsx 组件（React）                              │
│  - 单任务/工作台混合模式（H1 已定）                        │
│  - 流式进度、可选右栏、Page Chat                         │
├─────────────────────────────────────────────────────────┤
│  API 层（Thin Adapters）                                 │
│  - /api/clew/textbooks/[id]/chapters/[order]/extract    │
│  - /api/clew/kp/[id]/lesson                             │
│  - /api/clew/kp/[id]/chat                               │
│  - 只做请求解析、调用 Harness、返回 SSE                    │
├─────────────────────────────────────────────────────────┤
│  Harness 层（ClewHarness）                               │
│  - 教材编译管线（借鉴 DeepTutor 五阶段简化版）              │
│  - Agent 循环（借鉴 Grok Build，基于 Vercel ToolLoopAgent）│
│  - 工具系统（单层 ClewTool）                              │
│  - 会话管理（ClewStudySession，Prisma 持久化）             │
├─────────────────────────────────────────────────────────┤
│  领域层（Domain Logic）                                  │
│  - LoopProfile 分配与渲染                                 │
│  - FSRS 复习调度                                         │
│  - 错题中心聚合                                          │
├─────────────────────────────────────────────────────────┤
│  基础设施层（Infrastructure）                             │
│  - Prisma（PostgreSQL/SQLite）                           │
│  - 模型 Provider（DashScope/DeepSeek/Kimi/...）          │
│  - 配额系统（现有）                                       │
│  - SSE 流式传输（现有）                                   │
└─────────────────────────────────────────────────────────┘
```

### 核心模块

| 模块 | 文件 | 职责 | 借鉴来源 |
|------|------|------|---------|
| `ClewHarness` | `src/lib/clew/harness.ts` | 教材编译管线编排 | DeepTutor Book Engine |
| `ClewAgentLoop` | `src/lib/clew/agent-loop.ts` | Agent 决策循环 | Grok Build + Vercel AI SDK |
| `ClewToolRegistry` | `src/lib/clew/tools.ts` | 工具注册与执行 | Grok Build 工具抽象 |
| `ClewStudySession` | `src/lib/clew/session.ts` | 学习会话管理 | Grok Build 持久化 |
| `ClewCompiler` | `src/lib/clew/compiler.ts` | 教材→知识点编译 | DeepTutor 五阶段 |
| `ClewProvider` | `src/lib/clew/providers/` | 模型适配器 | 现有 course-builder 模式 |

---

## 六、多模型接入方案（H3 已定：以后再做，但架构预留）

### 模型配置架构

```typescript
// 预留接口，本次不实现，但架构支持
type ClewModelConfig = {
  provider: "dashscope" | "deepseek" | "kimi" | "zhipu" | "openai-compatible";
  model: string;
  apiKey: string;  // 只存服务端，不落库
  maxTokens: number;
  temperature: number;
};

// 任务级模型映射（预留）
type TaskModelMapping = {
  extraction: ClewModelConfig;   // 知识点萃取
  lesson: ClewModelConfig;       // 讲义生成
  chat: ClewModelConfig;         // 答疑对话
  note: ClewModelConfig;         // 笔记生成
  profile: ClewModelConfig;      // LoopProfile 建议
};

// 用户级偏好（预留，会员档位控制）
type UserModelPreference = {
  defaultMapping: TaskModelMapping;
  perTaskOverrides: Partial<TaskModelMapping>;
};
```

### 本次实现：单模型（DashScope qwen3.7-plus）

架构预留多模型接口，但本次只实现 DashScope：
- 复用现有 `src/lib/course-builder/providers/dashscope.ts` 模式
- 新增 `src/lib/clew/providers/` 目录
- 每个任务类型一个函数，内部硬编码模型，但接口预留配置参数

---

## 七、实施路径更新（基于架构定案）

### ZCODE-M2（更新版）：Clew Harness + Loop Profile

**目标**：建立 Clew Harness 骨架，集成 Loop Profile

**任务清单**：

1. **Harness 骨架**
   - [ ] `src/lib/clew/harness.ts`：ClewHarness 类，编排教材编译管线
   - [ ] `src/lib/clew/compiler.ts`：教材→章节→知识点的编译逻辑
   - [ ] `src/lib/clew/session.ts`：学习会话管理（Prisma `ClewStudySession` 表）

2. **Loop Profile 集成**
   - [ ] `src/types/loop-profile.ts`：类型契约（已有草案）
   - [ ] `src/lib/loop-profile.ts`：suggestLoopProfile + 默认分配
   - [ ] Clew 萃取时 AI 建议 profile，用户可改
   - [ ] 学习页按 profile 渲染环节

3. **Agent 循环**
   - [ ] `src/lib/clew/agent-loop.ts`：基于 Vercel ToolLoopAgent 的简化循环
   - [ ] `src/lib/clew/tools.ts`：ClewTool 注册表（萃取/生成/答疑/笔记）

4. **API 重构**
   - [ ] `/api/clew/textbooks/[id]/chapters/[order]/extract` 走 Harness
   - [ ] `/api/clew/kp/[id]/lesson` 走 Agent Loop
   - [ ] `/api/clew/kp/[id]/chat` 走 Agent Loop

**验收标准**：
- [ ] 教材上传 → 目录识别 → 章节修正 → 萃取 → 讲义生成，全流程走 Harness
- [ ] 每个 KP 显示 LoopProfile 标签，可切换
- [ ] 学习页按 profile 渲染（concept-mastery 只显示学/评/复）
- [ ] `npm run check` + `npm run test` 通过

### ZCODE-M3（后续）：统一状态层 + 视觉 Mentrix 化

**目标**：跨页面学习状态连续 + 单任务/工作台混合视觉

**任务清单**：

1. **统一状态层**
   - [ ] Prisma `UnifiedLearningEvent` 表
   - [ ] Clew 学习行为写事件总线
   - [ ] 错题中心聚合（官方课 + Clew + 题库）

2. **视觉 Mentrix 化**
   - [ ] 默认单任务模式（Mentrix 干净风）
   - [ ] 可切工作台模式（现有三栏）
   - [ ] 进度展示文字流化（Mentrix 风格）

3. **Page Chat 固化**
   - [ ] 学习页追问 = 对当前 KP 提问 + 上下文 chip

---

## 八、风险与边界

### 不做（避免混乱）

| 不做 | 原因 |
|------|------|
| Fork DeepTutor | Python 后端不兼容，Book Engine 过重 |
| Fork Grok Build | Rust 语言不兼容，TUI 形态不符 |
| 引入 LangChain/LangGraph | 过重，Ariadne 已有足够抽象 |
| 多 Agent 协作（DeepTutor 模式） | 违背配额可预期性 |
| 沙箱/代码执行（Grok Build 模式） | 学习场景不需要 |
| MCP 插件市场 | P3 以后，先硬编码验证价值 |

### 铁律

- 每次模型调用前检查配额，不足 503
- API key 只在服务端，不落库
- 学习数据全部私有挂 userId
- 官方课证据分级不进 Clew

---

## 九、下一步

1. **你确认本架构方向**（或提出调整）
2. **我更新 ZCODE-M2 任务书**（基于 Harness 架构）
3. **Zcode 执行 ZCODE-M2**
4. **我验收，写 ZCODE-M3**

**确认？**