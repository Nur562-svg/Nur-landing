# NUR LEARN → Ariadne 重构计划（2026-09-30 定案）

日期：2026-09-30。状态：已定案，Zcode 执行中。
真相源优先级：本文件 > docs/HI_DOC_PLAN.md > docs/DESIGN_V3.md > docs/PROJECT_STATE.md。

## 品牌定案

| 项目 | 内容 |
|------|------|
| 平台名 | **Ariadne**（知径） |
| 副标题 | Threads of knowing |
| 核心功能 | **Clew** |
| Clew 副标题 | Step by step, thread by thread |
| 中文 slogan | 一步一线索，一线一知径 |

## 架构定案（2026-09-30 深夜）

| 决策 | 结果 |
|------|------|
| Clew Harness | **自研轻量 TypeScript Harness**，不 fork DeepTutor/Grok Build |
| 教材编译 | **借鉴 DeepTutor 五阶段简化版**（上传→目录→章节→萃取→讲义） |
| Agent 循环 | **借鉴 Grok Build，基于 Vercel AI SDK ToolLoopAgent** |
| 多模型 | **架构预留，本次只实现 DashScope** |
| 视觉方向 | **单任务/工作台混合**（默认单任务 Mentrix 风，可切工作台） |
| 实施方式 | **Zcode 执行，Nur 验收** |

架构详情见 `docs/CLEW_ARCHITECTURE_CONFIRMATION.md`。

## 已定案决策汇总

| 编号 | 决策 | 结果 |
|------|------|------|
| F1 | 前端设计总体取向 | **Mentrix 为骨 + DeepTutor 为血肉 + Notion AI 为皮肤 + Hermes 为神经** |
| F2 | 学习页可选右栏（教材原文 PDF） | **接受**，局部破坏 v3 单主列规则 |
| F3 | P0 落地项开工时机 | **等 LoopProfile 确认后一起**（已确认，现在可以开工） |
| L1 | Loop Profile 粒度 | **知识点级** |
| L2 | AI 建议 profile 时机 | **萃取时**自动建议，用户可改 |
| L3 | 现有官方课六 loop | **保持 `full-loop` 默认**，行为不变 |
| L4 | Session 持久化 | **服务器**（Prisma `LearningSession` 表），跨设备同步 |
| L5 | 与 `LearningRouteId` 关系 | **保留**作为粗粒度分类，LoopProfile 作为细粒度执行配置 |
| S1 | 实施顺序 | **并行**：前端设计融合 + 可配置闭环同时推进 |
| S2 | 最小可见版本 | **是**，先做 MVP 验证方向 |
| C1-C5 | 代码清理 | **全部确认删除**（12 分支 + 3 文件 + 55+ 提取脚本） |
| B1 | 品牌迁移 | **NUR LEARN → Ariadne，Hi doc → Clew，路由同步改** |

---

## 一、前端设计融合方案

### 1.1 总体取向

**Mentrix 为骨**：线性八步路径不变（上传 → 目录识别 → 章节修正 → 知识点萃取 → 讲义+追问 → 划重点 → 学霸笔记 → 课题工作坊）。

**DeepTutor 为血肉**：
- Page Chat：学习页追问固化为「对当前 KP 提问」，上下文 chip 显式标注
- SpineEditor：目录识别后给出可拖拽/合并章节的编辑面，确认才触发萃取
- 进度时间轴：萃取/讲义生成进度可跨刷新续存

**Notion AI 为皮肤**：
- 对话双模：嵌入（默认）/ 浮动窗切换
- 对话记录一等公民：左栏「最近对话」组，按 KP 自动命名
- ⌘K 命令模式：`>` 前缀触发命令（重新生成讲义 / 导出笔记 / 跳转步骤）

**Hermes 为神经**：
- 状态显性化：左栏底部常驻配额 chip（名额 + token 估算）
- 可选右栏：学习页内一键呼出教材原文 PDF 对照，关闭不占空间
- 键盘流：`J/K` 知识点移动、`E` 生成讲义、`N` 写批注

### 1.2 空间关系

```
默认布局（全站）:
┌──────────┬─────────────────────────────┐
│  280px   │         主画布              │
│  左栏    │      （内容/讲义）           │
│          │                             │
│  · 导航   │      AI 追问嵌入下方        │
│  · 最近   │                             │
│  · 配额   │                             │
└──────────┴─────────────────────────────┘

学习页特例（可选右栏）:
┌──────────┬────────────────────┬────────┐
│  280px   │      讲义主画布     │  教材  │
│  左栏    │      + 嵌入追问    │  原文  │
│          │                    │  PDF   │
│          │                    │ (可选) │
└──────────┴────────────────────┴────────┘
                              ↑ 一键呼出/关闭
```

### 1.3 落地清单（按优先级）

| 优先级 | 改动 | 来源 | 涉及文件 |
|--------|------|------|---------|
| P0 | 学习页追问固化为「对当前 KP 提问」+ 上下文 chip | DeepTutor | `hi-doc-study.tsx` + `nur-agent-chat.tsx` |
| P0 | SpineEditor（可拖拽/合并章节，确认才萃取） | DeepTutor | `hi-doc-textbook.tsx` + `toc-recognition.ts` |
| P1 | AI 对话双模（嵌入/浮动窗切换） | Notion AI | `nur-agent-chat.tsx` |
| P1 | ⌘K 范围切换 + `>` 命令模式 | Hermes + Notion | `command-palette.tsx` + `search-index.ts` |
| P1 | 左栏底部常驻配额 chip | Hermes | `workspace-shell.tsx` |
| P2 | 学习页可选右栏（教材原文 PDF） | Hermes | `hi-doc-study.tsx` |
| P2 | 「最近对话」左栏组 | Notion | `workspace-shell.tsx` + API |
| P3 | 讲义内嵌 Quiz / Flashcard / Concept-graph | DeepTutor | `hi-doc-study.tsx` + 新渲染器 |
| P3 | 学霸笔记生成时间轴 | Hermes | `hi-doc-note.tsx` |

### 1.4 明确不做

- 多 Agent / Skills 体系（DeepTutor 路径）——违背配额可预期性
- 终端面板（Hermes 路径）——用户群体不符
- 块级 AI 可编辑文档（Notion 路径）——生成-覆盖模型已立
- 多 tab 并行（Hermes 路径）——学习是线性沉浸

---

## 二、可配置学习闭环（Loop Profile）方案

### 2.1 核心概念

**Loop Profile = 学习环节的子集 + 顺序 + 入口配置**

不是每个知识点都走完整六步（学练评诊复迁），而是根据内容类型、学习阶段、学生目标动态选择路径。

### 2.2 六种预定义 Profile

| Profile | 路径 | 适用场景 | 默认分配 |
|---------|------|---------|---------|
| `concept-mastery` | 学 → 评 → 复 | 术语、定义、基础概念 | Hi doc 萃取的 KP |
| `skill-application` | 学 → 练 → 评 → 诊 → 复 | 病例分析、辨证、计算 | 有实践的官方课 KP |
| `exam-cram` | 练 → 评 → 诊 → 复 | 考前刷题、模考 | 题库章节 |
| `long-term-retention` | 学 → 复 → 迁移 | 经典条文、方歌 | 纯记忆型内容 |
| `exploration` | 学 → 迁移 → 评 | 课题工作坊、文献研讨 | 研究型学习 |
| `full-loop` | 学 → 练 → 评 → 诊 → 复 → 迁移 | 核心知识点完整掌握 | 现有官方课六 loop |

### 2.3 类型契约（关键部分）

```typescript
// 学习环节（能力全集）
export type LoopStage =
  | "learn"      // 学：lesson 讲义 / Hi doc 讲义
  | "practice"   // 练：刷题 / 主观写作 / 病例模拟
  | "assess"     // 评：自核清单 / NUR 评分 / 模考判分
  | "diagnose"   // 诊：错题归因 / 弱 KP 识别
  | "review"     // 复：FSRS 间隔重复 / 错题重做
  | "transfer";  // 迁移：病例推理 / 课题工作坊

// Loop Profile 配置
export type LoopProfile = {
  id: string;
  name: string;
  stages: readonly LoopStage[];
  entryStage: LoopStage;
  exitBehavior: LoopExitBehavior;
  fsrsEnabled: boolean;
  wrongQuestionEnabled: boolean;
};

// 知识点级分配
export type LoopProfileAssignment = {
  contentType: "official-kp" | "hidoc-kp" | "qb-chapter";
  contentId: string;
  profileId: LoopProfileId;
  assignedBy: "ai-suggested" | "user-selected" | "default";
  assignedAt: string;
};

// 学习会话（服务器持久化）
export type LearningSession = {
  id: string;
  userId: string;
  contentType: string;
  contentId: string;
  profileId: string;
  currentStageIndex: number;
  stageStates: Record<LoopStage, StageState>;
  startedAt: string;
  completedAt: string | null;
};
```

完整契约见 `docs/loop-profile-contract-draft.md`。

### 2.4 与现有系统的关系

| 现有概念 | 新系统映射 | 变化 |
|---------|-----------|------|
| `LearningRouteId` (understand/express/apply) | 粗粒度分类，保留 | 不变 |
| 官方课六 loop | 默认 `full-loop` | 不变 |
| Hi doc 八步 | 教材处理流水线，不是学习闭环 | 处理完成后 KP 获得 LoopProfile |
| 题库 | 默认 `exam-cram` | 新增 profile 字段 |
| FSRS | 跨内容类型调度 | 扩展 criterion key |
| 错题中心 | 跨来源聚合 | 新增 contentType 字段 |

### 2.5 AI 建议规则

```typescript
function suggestLoopProfile(content: ContentFeatures): LoopProfileId {
  if (content.type === "qb-chapter") return "exam-cram";
  if (!content.hasLesson) return "exam-cram";
  if (content.hasCase) return "full-loop";
  if (content.hasPractice && content.questionKinds.includes("case")) return "skill-application";
  if (content.estimatedDurationMinutes <= 10) return "concept-mastery";
  if (content.questionKinds.every(k => k === "term" || k === "fill")) return "long-term-retention";
  return "skill-application";
}
```

---

## 三、统一学习者状态层

### 3.1 核心设计

三条供给线（官方课 / Hi doc / 题库）写入同一个学习者模型：

```
┌─────────────────────────────────────────────────────────┐
│  官方课          Hi doc           题库                   │
│    │               │               │                     │
│    └───────────────┴───────────────┘                     │
│                    │                                     │
│                    ▼                                     │
│         UnifiedLearningEvent 总线                         │
│                    │                                     │
│    ┌───────────────┼───────────────┐                     │
│    ▼               ▼               ▼                     │
│  FSRS 调度    错题中心      Agent 全局上下文              │
│  (跨内容)    (跨来源)       (跨页面)                      │
└─────────────────────────────────────────────────────────┘
```

### 3.2 数据模型（Prisma 新增）

```prisma
model LearningSession {
  id              String   @id @default(cuid())
  userId          String
  contentType     String   // official-kp | hidoc-kp | qb-chapter
  contentId       String
  profileId       String
  currentStageIndex Int
  stageStates     Json     // Record<LoopStage, StageState>
  startedAt       DateTime @default(now())
  completedAt     DateTime?
  @@index([userId, contentType, contentId])
}

model UnifiedLearningEvent {
  id          String   @id @default(cuid())
  userId      String
  timestamp   DateTime @default(now())
  contentType String
  contentId   String
  profileId   String
  stage       String
  eventType   String
  payload     Json
  @@index([userId, timestamp])
  @@index([userId, contentType, contentId])
}

model UnifiedFsrsState {
  id          String   @id @default(cuid())
  userId      String
  contentType String
  contentId   String
  criterionId String
  state       String   // new | learning | review | relearning
  difficulty  Float
  stability   Float
  reps        Int
  lapses      Int
  lastReviewAt DateTime?
  nextDueAt   DateTime?
  @@unique([userId, contentType, contentId, criterionId])
}

model UnifiedWrongQuestion {
  id          String   @id @default(cuid())
  userId      String
  contentType String
  contentId   String
  questionId  String
  sourceLabel String
  wrongAt     DateTime @default(now())
  resolvedAt  DateTime?
  lastAttemptId String
  @@index([userId, resolvedAt])
}
```

### 3.3 与现有表的关系

- 现有 `LearnerAttempt` 保留，同时写 `UnifiedLearningEvent`
- 现有 `learning-memory.ts` 的 localStorage 方案迁移到服务器表
- 现有 `qb-attempt` 保留，同时写 `UnifiedLearningEvent`

---

## 四、实施路径

### Phase 0：MVP（最小可见版本）— 2 周

目标：验证「前端设计融合 + 可配置闭环」方向可行。

**ZCODE-M1（当前任务书）**：品牌迁移 + 代码清理 + 前端基础重写
- [ ] 代码清理（12 分支 + 3 文件 + 55+ 提取脚本）
- [ ] 品牌迁移（NUR LEARN → Ariadne，Hi doc → Clew，路由同步改）
- [ ] Page Chat 固化（学习页追问 = 对当前 KP 提问 + 上下文 chip）
- [ ] SpineEditor 简化版（章节合并，确认才萃取）
- [ ] 配额 chip 常驻（左栏底部）

**ZCODE-M2（当前任务书）**：Clew Harness + Loop Profile + 教材编译管线
- [ ] Harness 基础：基于 Vercel AI SDK ToolLoopAgent 的 Clew Agent 循环
- [ ] 教材编译管线：预编译 + 证据绑定 + 两层知识结构 + 失败隔离
- [ ] Loop Profile 集成：类型契约 + AI 建议 + 学习页按 profile 渲染
- [ ] 会话管理：Prisma 持久化 + 跨页面状态连续

**ZCODE-M3（后续）**：统一状态层（UnifiedLearningEvent）+ 视觉 Mentrix 化 + Page Chat 固化

**ZCODE-M4（后续）**：三视图派生 + 知识图谱（纯 SVG）+ 多模型接入

### Phase 1：前端设计融合完整版 — 2 周

- [ ] AI 对话双模（嵌入/浮动窗）
- [ ] ⌘K 范围切换 + `>` 命令模式
- [ ] 学习页可选右栏（教材原文 PDF）
- [ ] 「最近对话」左栏组

### Phase 2：可配置闭环完整版 — 2 周

- [ ] 全部 6 种 profile 支持
- [ ] 官方课 KP 增加 `loopProfileId` 字段
- [ ] 题库章节默认 `exam-cram`
- [ ] 学习页按 profile 动态渲染

### Phase 3：统一状态层完整版 — 2 周

- [ ] `UnifiedLearningEvent` 表 + 写入
- [ ] `UnifiedFsrsState` 迁移
- [ ] `UnifiedWrongQuestion` 聚合
- [ ] Agent 全局上下文

### Phase 4： polish + 上线准备 — 2 周

- [ ] 讲义内嵌 Quiz / Flashcard / Concept-graph
- [ ] 学霸笔记生成时间轴
- [ ] 性能优化（大数据量）
- [ ] ICP 备案 + 商户号（非技术）

---

## 五、边界与铁律

### 不变

- 官方课证据分级（可关联/帮助理解/不可直接等同）只属于官方闭环
- Hi doc 生成物永不自动进官方课注册表
- 官方课内容永不自动进 Hi doc 的 AI 生成逻辑
- 内容真相（`src/content/courses/`）不动
- 配额不足 503，不静默放行
- API key 只在服务端

### 新增

- LoopProfile 分配可用户改，AI 建议只是默认
- `fsrsEnabled: false` 的 profile 不进复习调度
- `wrongQuestionEnabled: false` 的 profile 不进错题中心
- 学习页可选右栏是 v3 单主列规则的唯一例外

---

## 六、验收标准

### MVP 验收

- [ ] Hi doc 学习页追问显示「对当前 KP 提问」+ 上下文 chip
- [ ] 目录识别后可合并章节，确认才触发萃取
- [ ] 左栏底部显示「本月名额 2/3 · 已消耗 ~12k tokens」
- [ ] Hi doc KP 萃取时 AI 建议 profile，用户可改
- [ ] 学习页按 profile 渲染对应环节（concept-mastery 只显示学/评/复）
- [ ] `npm run check` 通过

### 完整版验收

- [ ] 全部 6 种 profile 可用
- [ ] 官方课、Hi doc、题库错题聚合到统一错题中心
- [ ] FSRS 跨内容类型调度
- [ ] Agent 知道用户在三条线的学习状态
- [ ] 对话记录可回访、按 KP 命名
- [ ] `npm run check` 通过 + 浏览器 QA 通过

---

## 七、相关文档

| 文档 | 角色 |
|------|------|
| `docs/RESTRUCTURE_PLAN.md` | 本文件，重构定案真相源 |
| `docs/loop-profile-contract-draft.md` | Loop Profile 类型契约草案 |
| `docs/research/competitive-interaction-analysis-2026-09-30.md` | 竞品交互分析报告 |
| `docs/HI_DOC_PLAN.md` | Hi doc 八步路径定案（不变） |
| `docs/DESIGN_V3.md` | 设计系统 v3（视觉规则不变） |
| `docs/PROJECT_STATE.md` | 项目状态记录（实施过程中更新） |
