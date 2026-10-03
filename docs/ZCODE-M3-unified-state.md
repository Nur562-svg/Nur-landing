# ZCODE-M3: 统一状态层（UnifiedLearningEvent）+ Mentrix 化学习页 + Page Chat 固化

日期：2026-10-02。执行者：Zcode。验收：Nur（Hermes 预验收）。

**状态：已完成 2026-10-02，待验收（`npm run test` 453/453、`npm run check` exit 0；详见 `design-qa.md`「ZCODE-M3」节）。**
真相源优先级（高→低）：`docs/RESTRUCTURE_PLAN.md` > `docs/CLEW_ARCHITECTURE_CONFIRMATION.md` > `docs/HI_DOC_PLAN.md` > `docs/DESIGN_V3.md` > `docs/PROJECT_STATE.md`。AGENTS.md 若有滞后表述，本主线以本任务书与上述真相源为准。

---

## 任务总览

四个阶段 + 一个前置小修：

| 阶段 | 内容 |
|------|------|
| Phase 0 | M2 预验收遗留小修：spine 解析与 strategy 白名单解耦 |
| Phase 1 | UnifiedLearningEvent 事件总线：Prisma 模型 + 类型 + 写路径接线（Clew 会话 / 官方课与题库作答同步） |
| Phase 2 | 统一读取层 + `/learn`「学习动态」：跨线最近事件 + 「继续上次学习」 |
| Phase 3 | 教材详情页 Mentrix 化编译进度：编译全书入口 + 文字流 + 跨刷新续存 + 指纹接线 |
| Phase 4 | Clew 学习页双模式（单任务默认 / 工作台切换）+ Page Chat 固化回归 |

### 执行方式（给 Zcode）

1. 完整阅读本任务书 + 下方必读清单（先读文档、再读代码，全部读完再动手）。
2. 按 Phase 0 → 4 顺序执行，不越期、不提前做 M4 内容。
3. 每个 Phase 完成后跑窄验证（`npx tsc --noEmit` + 本阶段新增测试）。
4. 全部完成后跑全量 `npm run test` + `npm run check`，按「报告格式」输出。

### 必读清单（按序）

1. 本任务书（全文）。
2. `docs/RESTRUCTURE_PLAN.md`（§已定案决策汇总、§三 统一学习者状态层、§四 实施路径）。
3. `docs/CLEW_ARCHITECTURE_CONFIRMATION.md`（§五 分层架构、§七 M3 任务清单）。
4. `docs/loop-profile-contract-draft.md`（§统一学习者状态层类型定义、§实施路径）。
5. `docs/ZCODE-M2-clew-harness.md`（前置：Harness / 编译管线 / 会话管理 / 任务书滚动惯例）。
6. `docs/DESIGN_V3.md` + `design-qa.md` 的「ZCODE-M2」节（视觉与验收基线）。
7. 代码：`src/lib/learner-state-sync-server.ts`（attempts/QB 写路径）、`src/lib/clew/session.ts`（会话服务）、`src/lib/clew/textbook-view.ts` + `src/lib/clew/chapters.ts`（spine 读取与写入）、`src/lib/clew/compiler-server.ts`（编译缓存与指纹，M2 建但未接线）、`src/components/clew-study.tsx` + `src/components/clew.module.css`（学习页三栏与断点）、`src/components/clew-textbook.tsx`（教材详情页进度）、`src/components/learning-dashboard.tsx`（/learn 主页区块）、`tests/payment-service.test.ts`（隔离 SQLite 测试的既有模式）。

---

## 前置状态（2026-10-02 验收基线）

- ZCODE-M1 + ZCODE-M2 全部改动在工作区、已验收、**未提交**；`npm run test` 431/431、`npm run check` exit 0（lint 0 error）。
- 最后一次 migration：`20261001155909_zcode_m2_clew_harness`（dev.db 已应用）。
- 本地验证账户：`m2qa@ariadne.test`（pro 档；密码见 `design-qa.md` ZCODE-M2 节，仅 dev.db 本地）。该账户有 2 本教材：`m2-qa.pdf`（无文件的种子数据，编译会报 storage-unavailable，**不要用它走查**）与 `book-toc.pdf`（E2E 教材，id `f650452b-eadd-4504-8102-a98da36f728b`，已确认 3 章、前 2 章已萃取——**走查用这本**）。
- 依赖：`ai@7.0.37`、`@ai-sdk/openai@4.0.20`、jose、zod 已装；**本期不新增任何依赖**。

## 已定案（勿改动 / 请遵循）

- F1–F3、L1–L5、S1–S2、B1 决策（RESTRUCTURE_PLAN §已定案决策汇总）继续有效。
- 视觉基线 = 设计系统 v3（暖象牙纸底 / 宋体标题 / 朱砂 + 石板蓝 / 方角 / 桌面 280px 壳 + 单主列）。本期「单任务/工作台」只调整**空间关系**，不新造视觉语言、不加装饰动效。
- Page Chat 后端保持 M1 决策：Clew 追问专属 `/api/clew/kp/[id]/chat`，**不接** `/api/nur-agent/chat`。
- localStorage 新键沿用 `nur-learn:` 前缀（与既有键一致）。
- 事件写入是**旁路**：任何事件写入失败不得影响主流程（try/catch + console.error）。

## 范围说明（防误解，重要）

- **「错题中心聚合（官方课 + Clew + 题库）」不在本期改造。** 错题中心三来源聚合（官方课记忆层 / 题库 / 导入练习）在既有版本已具备；Clew 线目前没有客观题作答面，无题可聚合。统一事件流是后续（M4+）把「诊」环节信号接入错题中心的数据基础，本期只建总线与读取层。
- **「视觉 Mentrix 化」在本期 = 两个具体项**：① Clew 学习页单任务/工作台双模式；② 教材编译进度文字流化（含跨刷新续存）。全站壳重构、⌘K 范围切换/命令模式、学习页右栏 PDF、对话双模均属「前端设计融合完整版（Phase 1）」，不在本期。
- **Page Chat 页面级固化（对当前 KP 提问 + 上下文 chip + 专属后端持久化）已在 M1 完成**；本期只做双模式下的形态一致性与回归验证，不换后端、不重做。

---

## Phase 0: M2 预验收遗留小修（先执行）

### 0.1 spine 解析与 strategy 白名单解耦

**问题（M2 预验收发现）**：`textbook-view.ts` 的 `parseClewRecognition` 严格校验 strategy 白名单（`outline | toc-page | model | none | docx-heading`）；当 `toc.strategy` 是白名单外的值（如种子数据里的 `"manual"`）时整个 recognition 返回 null，`spineConfirmedAt` 被连坐丢弃 → 萃取永久 409「请先确认章节结构」；且 `writeManualChapters`（chapters.ts）会把非法 strategy **原样保留**，确认流程无法自愈。产品代码所有写入路径只会写合法值，故线上不可达，但属真实健壮性耦合，本期修掉。

**修复**：
- `src/lib/clew/textbook-view.ts`：
  - `spineConfirmedAt` 的读取与 recognition 严格解析**解耦**：新增独立读取函数（如 `parseClewSpineConfirmedAt(toc: unknown): string | null`，`typeof === "string"` 即有效），`toClewTextbookView` 用它取值；recognition 为 null 时 spine 仍能读到。
  - recognition 本身的严格解析行为**不变**（解析不出仍是 null，不猜测）。
- `src/lib/clew/chapters.ts` `writeManualChapters`：写入 `strategy` 前做白名单校验，非法值回落 `"none"`（`previousToc?.strategy` 不可信时不再原样透传）。

**测试**：`tests/clew-toc-view.test.ts`（新增，纯函数）：
- 非法 strategy + 合法 `spineConfirmedAt` → 视图读到 spine、recognition 为 null；
- 合法 recognition → 行为与现状完全一致（回归）；
- 写入回落：非法 strategy 输入 → 写出 `"none"`（若纯函数不可达则测到最小可测边界，并在报告中说明）。

**Phase 0 验收**：`npx tsc --noEmit` 通过 + 新测试全绿；M2 已验证行为（合法数据路径）零变化。

---

## Phase 1: UnifiedLearningEvent 事件总线

### 1.1 Prisma 模型（`prisma/schema.prisma` 追加）

```prisma
/// ZCODE-M3: 统一学习事件总线（跨官方课 / Clew / 题库；旁路记录，不阻塞主流程）。
model UnifiedLearningEvent {
  id          String   @id @default(cuid())
  userId      String
  /// 事件发生时间（业务时间）
  timestamp   DateTime @default(now())
  /// official-kp | clew-kp | qb-chapter
  contentType String
  /// official-kp → knowledgePointId；clew-kp → kpId；qb-chapter → "{courseSlug}/{chapterSlug}"
  contentId   String
  profileId   String
  stage       String
  eventType   String
  payload     Json
  /// 幂等键（每用户唯一）：clew-session:{id}:stage:{stage}:{status} / attempt:{id} / qb-attempt:{contentKey} 等
  sourceKey   String
  createdAt   DateTime @default(now())

  @@unique([userId, sourceKey])
  @@index([userId, timestamp])
  @@index([userId, contentType, contentId])
}
```

- 迁移：`npx prisma migrate dev --name zcode_m3_unified_events`（应用到 dev.db；确认 `npx prisma migrate status` 干净）。
- **SQLite 兼容警告**：不要用 `createMany({ skipDuplicates: true })`（SQLite 不支持）。幂等手写：先 `findMany({ where: { userId, sourceKey: { in: keys } } })`，再只补写缺失项；批内也要按 sourceKey 去重。参照 `upsertAttemptsBatchServer` 的既有模式。

### 1.2 类型契约：`src/types/unified-learning.ts`（新增）

只声明本期真正写入的子集（其余按契约草案在 M4+ 扩展时再加，**不要声明不写的成员**）：

```typescript
export type UnifiedContentType = "official-kp" | "clew-kp" | "qb-chapter";

/** 本期写入的事件类型（子集；契约草案的 fsrs-rated / wrong-question-added 等留给后续）。 */
export type LearningEventType =
  | "session-started"
  | "stage-entered"
  | "stage-completed"
  | "session-completed"
  | "attempt-confirmed";

export type UnifiedEventPayload =
  | { kind: "session" }
  | { kind: "stage"; enteredAt?: string; completedAt?: string }
  | { kind: "session-summary"; totalStages: number; completedStages: number; skippedStages: number }
  | {
      kind: "attempt";
      attemptId: string;
      taskId: string;
      courseId: string;
      surface: string;
      confirmedAt: string;
    }
  | { kind: "qb-attempt"; questionId: string; isCorrect: boolean; attemptedAt: string };

export type UnifiedLearningEventInput = {
  contentType: UnifiedContentType;
  contentId: string;
  profileId: string;
  stage: LoopStage;          // 复用 @/types/loop-profile
  eventType: LearningEventType;
  payload: UnifiedEventPayload;
  sourceKey: string;
  timestamp?: string;        // 缺省 = now
};

export type UnifiedLearningEventView = UnifiedLearningEventInput & {
  id: string;
  userId: string;
  timestamp: string;
};
```

### 1.3 写入库：`src/lib/unified-events.ts`（新增）

- 纯构造函数（可测，无 Prisma）：`buildClewSessionEvent(session, kind, extra)` 等；sourceKey / stage / payload 映射规则见下表。
- `appendUnifiedLearningEvents(userId: string, events: readonly UnifiedLearningEventInput[]): Promise<void>`：手写幂等（1.1 的警告）；**不抛错**——整个函数体 try/catch，失败 `console.error("[unified-events] 写入失败", error)` 后返回。

| 事件 | contentType | contentId | stage | eventType | sourceKey |
|------|-------------|-----------|-------|-----------|-----------|
| 会话创建 | clew-kp | kpId | profile.entryStage | session-started | `clew-session:{sessionId}:started` |
| 环节进入 | clew-kp | kpId | 该环节 | stage-entered | `clew-session:{sessionId}:stage:{stage}:active` |
| 环节完成/跳过 | clew-kp | kpId | 该环节 | stage-completed | `clew-session:{sessionId}:stage:{stage}:{status}` |
| 会话完成 | clew-kp | kpId | 最后环节 | session-completed | `clew-session:{sessionId}:completed` |
| 官方课作答 | official-kp | knowledgePointId | writing→`assess`、case→`transfer`（对照 `LearningAttemptSurface` 实际取值映射，其余 → `assess`） | attempt-confirmed | `attempt:{attemptId}` |
| 题库作答 | qb-chapter | `{courseSlug}/{chapterSlug}` | practice | attempt-confirmed | `qb-attempt:{qbContentIdentityKey}` |

- profileId 取值：clew-kp 用会话的 `profileId`；official-kp 用 `"full-loop"`（L3 定案默认）；qb-chapter 用 `"exam-cram"`。

### 1.4 写路径 A：Clew 会话（`src/lib/clew/session.ts`）

- `getOrCreateSession`：**新建**会话成功后追加 session-started（恢复路径不追加——sourceKey 幂等兜底，但恢复会话的 started 事件已存在，无需重复调用）。
- `updateSessionStage`：按 `state.status` 追加 `stage-entered`（active）/ `stage-completed`（completed）/ `stage-skipped`→暂不写（本期 eventType 子集不含 stage-skipped；skipped 状态 UI 未产出，跳过并在报告中说明）。
- `completeSession`：成功后追加 session-completed，payload 为 session-summary（由 stageStates 统计 total/completed/skipped；需先读行，可将 updateMany 改为 findFirst+update 或先 findFirst）。
- 全部在数据库操作成功之后调用 `appendUnifiedLearningEvents`；失败不影响会话主流程。

### 1.5 写路径 B：学习状态同步（`src/lib/learner-state-sync-server.ts`）

- `recordConfirmedAttemptServer`：**create 成功路径**（含 dedupe 命中早期 return 的分支除外——命中即已存在，不重复发事件）追加 `attempt:{id}` 事件。
- `upsertAttemptsBatchServer`：对本次 **created** 的 attempts 逐一追加（幂等兜底，重跑安全）。
- `addQbAttemptServer`：新建成功后追加。`contentId` 的 `{courseSlug}/{chapterSlug}` 通过既有注册表解析（`src/lib/wrong-questions.ts` 的 itemLookup 同源查找或等价小工具 + 进程内缓存）；**解析不到就跳过该事件并 console.warn**（不伪造归属）。
- 三个函数内的事件追加都用独立 try/catch，不与主操作的错误域合并。

### 1.6 测试 `tests/unified-events.test.ts`（新增）

- 纯 builder 断言：字段映射、stage/profileId 规则、sourceKey 格式。
- 隔离 SQLite（照 `tests/payment-service.test.ts` 模式：mkdtemp + `DATABASE_URL=file:<tmp>` + `prisma db push`）：
  - `appendUnifiedLearningEvents` 同 sourceKey 调两次 → 表中一行（幂等）；
  - 两个不同事件 → 两行；批内重复 → 去重后一行。

**Phase 1 验收**：migration 已应用；测试全绿；`npx tsc --noEmit` 通过。

---

## Phase 2: 统一读取层 + `/learn`「学习动态」

### 2.1 读取库：`src/lib/unified-state.ts`（新增）

- `selectUnifiedLearningFeed(userId, limit = 8): Promise<UnifiedFeedItem[]>`：
  - 取最近事件（timestamp desc），解析为展示项：`{ id, contentType, sourceLabel: "官方课" | "题库" | "Clew", title, detail, summary, at(ISO), href }`。
  - 标签解析：official-kp → 通过既有注册表 courseId → 课程标题、knowledgePointId → KP 标题；clew-kp → ClewKnowledgePoint → 章节 → 教材标题（KP/教材已删除时 detail 回落 `"已删除的内容"`，不编造）；qb-chapter → `{courseSlug}/{chapterSlug}` → 课程/章标题。
  - 事件文案：attempt-confirmed → `完成了一次练习`；stage-completed/stage-entered → `环节「{学/评/复…}」（LOOP_STAGE_DISPLAY 名称）`；session-started → `开始学习`；session-completed → `完成学习`。
  - href：official → 该 KP 学习页（复用既有 course workspace 的 KP 路径规则/selector）；clew → `/learn/clew/t/{textbookId}/c/{chapterOrder}?kp={kpId}`；qb → 章节练习页（复用错题中心既有回跳 selector 的规则，不要另造路径）。
- `selectContinueLearningTarget(userId): Promise<{ href, kpTitle, textbookTitle, stageLabel } | null>`：最近一个 `status="active"` 的 ClewStudySession（lastActiveAt desc）→ 书/章/KP 标题 + 当前应处环节（stageStates 中最后 active/completed 的下一步，或用 profile.entryStage 兜底）→ 深链。
- 全部 server-only（`import "server-only"`）。

### 2.2 API（thin adapter）：`src/app/api/learn/unified-feed/route.ts`（新增）

- `GET`：登录校验（`getCurrentSession`；未登录 401 与既有约定一致）→ `{ ok: true, feed, continueTarget }`。
- `export const runtime = "nodejs"; export const dynamic = "force-dynamic";`

### 2.3 UI：`learning-dashboard.tsx` 新增「学习动态」区块

- 位置：mainColumn 内、「双视角理解线索」区块之后。
- 结构：
  - 头行：`学习动态`（沿用既有 sectionLabel/标题风格）+ `继续上次学习` 按钮（continueTarget 存在时；链接样式用既有 V2Button 或等价轻量样式）。
  - 列表：最多 8 条；每条 = 来源小标签（官方课/题库/Clew）+ 文案 + 相对时间（刚刚 / N 分钟前 / N 小时前 / N 天前，小工具函数）+ 整行可点击（Link）。
  - 空态：`还没有学习记录——从官方课、Clew 或题库开始。`（不渲染破版空卡）。
- 数据流：`src/app/(workspace)/learn/page.tsx` 服务端取数（登录时调 `selectUnifiedLearningFeed` + `selectContinueLearningTarget`），作为 props 传入 `LearningDashboard`；未登录不渲染该区块。**不要**在客户端挂载后再 fetch（避免瀑布与闪烁）。

### 2.4 测试 `tests/unified-state.test.ts`（新增）

- 隔离 SQLite：seed 少量事件行（三种 contentType）+ 用户自有 Clew 数据（教材/章/KP）→ feed 标签/href/顺序正确；
- 已删除内容回落文案；空数据返回空数组；continueTarget 取最近 active 会话。

**Phase 2 验收**：测试全绿；登录 m2qa 后 `/learn` 可见学习动态与继续学习（浏览器走查放到 Phase 4 一起做）。

---

## Phase 3: 教材详情页 Mentrix 化编译进度

> 背景：M2 已实现 `/api/clew/textbooks/[id]/compile`（SSE：progress → chapter → done，失败隔离）与编译缓存写入，但**无 UI 入口**、缓存只写不读、`contentFingerprint` 从未计算（M2 预验收发现）。本期补上接线，并把进度做成「文字流即内容」+ 跨刷新续存。

### 3.1 `/api/clew/textbooks/[id]/compile/route.ts` 扩展

- `GET`：返回该教材的编译缓存视图 `{ ok: true, cache: { state, updatedAt, contentFingerprint } | null }`（读 `loadClewCompileCache`；不存在返回 null）。
- `POST`：支持 body `{ scope?: "pending" | "all" }`，**默认 `"pending"`**。pending = 章节 `status` 为 `pending | failed` 的章节；过滤在**路由层**完成（`compiler.ts` 纯编排不动）。无待编译章节时返回明确 4xx/提示事件，不空跑。SSE 事件契约不变。
- 指纹接线（`compiler-server.ts`）：
  - 编译开始时 `computeClewContentFingerprint(userId, textbookId)`；
  - 读缓存已有指纹：若已有非空指纹且与当前不同 → 本次强制 `scope = "all"`，SSE 流内先发一条 note/progress（如 `检测到教材内容已变化，本次改为全量编译。`）；
  - 编译开始/结束时把最新指纹与 state 写回缓存（`upsertCompileCache` 支持 contentFingerprint 字段）。

### 3.2 教材详情页 UI（`src/components/clew-textbook.tsx`）

- 新增「编译全书」区（仅 `spineConfirmed` 后可见，放章节列表上方或路径条下方）：
  - 状态行：`待编译 N 章 · 预计消耗 N 次模型调用`（N 为 pending|failed 计数；全部已萃取时改为 `全部章节已萃取`，按钮变「重新编译全部」）。
  - 按钮：「编译全书」（pending）/「重新编译全部」（all）。
  - 运行中：SSE 文字流（复用既有 `progressLog` 样式），事件逐行追加；章节级 currentStep 直接展示（M2 已生成「精读第 N/M 章：{标题}」）。
  - 完成：汇总行 `编译完成：X/Y 章成功，共 N 个知识点`；失败章给「单独重试」链接（滚动到对应章节行的萃取按钮，不新造重试接口）。
  - 页面加载：GET 编译缓存 → 有记录时显示 `上次编译：{state 文案} · {相对时间}`；state 为 `extracting` 或存在 pending 章时，按钮文案 `继续编译`。
- 单章萃取按钮与既有交互**不变**；编译过程中的单章按钮防重入（编译运行时禁用）。
- 刷新续存的效果 = 重新加载后仍能看到「上次编译」状态与剩余章节（无需内存态）。

### 3.3 测试

- `tests/clew-compile-scope.test.ts`（新增，纯函数）：pending 过滤（含 failed 计入、无待编译返回空）；指纹比较逻辑（相同不强制 all、不同强制 all）。
- 浏览器走查（Phase 4 一起）：对 `f650452b`（3 章：2 extracted + 1 failed）点「编译全书」→ 流式进度 → 完成汇总 = `1/1 章成功`（pending 仅 failed 的第 3 章；若其 25 字过少仍会诚实失败——预期结果：`0/1 章成功` + 失败提示，也是正确行为）；刷新后仍显示上次编译状态。

**Phase 3 验收**：测试全绿；浏览器走查见 Phase 4 合并清单。

---

## Phase 4: Clew 学习页双模式 + Page Chat 固化回归

### 4.1 显示模式状态

- `nur-learn:clew-study-mode`（`"focus"` | `"workspace"`，**默认 `"focus"`**）；读写沿仓库既有 localStorage try/catch 惯例。
- 切换控件：学习页 KP 头部行右侧（LoopProfile 徽章同一行、徽章之后），两态分段控件或图标按钮对（用既有 V2 风格，自拟文案「单任务视图 / 工作台视图」+ aria-pressed）。`max-width: 1200px` 以下隐藏该控件（两种模式布局本就一致）。

### 4.2 布局（单 DOM 双布局，不做双挂载）

- **不改组件树**：`clew-study.tsx` 的 DOM 保持（KP 列表 aside → 主列 section → 追问 aside 三兄弟），模式差异全部通过 CSS grid 摆放实现（避免双挂载导致消息/草稿状态丢失）：
  - `focus`：`grid-template-columns: 240px minmax(0, 1fr)`；追问面板 `grid-column: 2` 排到主列**下方**（讲义 → 划重点 → 笔记 → 追问，上下串联，Mentrix 风）。
  - `workspace`：维持现有 `240px minmax(0,1fr) 320px` 三栏。
  - 模式类名挂在 `studyLayout` 根元素上（如 `data-study-mode="focus"` + CSS Modules 属性选择器）。
- ≤1200px 既有折叠行为保持不变（追随便已下置）；两模式在此宽度视觉一致。
- 390px：无横向溢出（沿用既有验证标准 `scrollWidth === clientWidth`）。

### 4.3 Page Chat 固化回归（不重做，只验证一致性）

- 追问面板在两种模式下为**同一实例**：chip「当前知识点：{title} · 第 {sourcePage} 页」两模式均保留；SSE 流式、服务端持久化、`chat-prompt` 注入均不变。
- 切模式不丢消息与已输入草稿；`aria-label` 与键盘流（Enter 发送）不回归。
- 全页 console 0 错误。

### 4.4 浏览器走查（与 Phase 2/3 合并执行）

1. 登录 m2qa → `/learn`：学习动态区块（三线来源标签、「继续上次学习」按钮）；点击继续 → 进入对应 Clew KP 学习页。
2. 教材详情（`f650452b`）：编译全书 pending 流式进度 + 完成汇总 + 刷新后「上次编译」保留。
3. 学习页：默认 `focus`（240px + 主列 + 追问在下方）→ 切 `workspace`（三栏）→ 刷新后保持 `workspace`；chip/消息在切换中不丢；390×844 无横向溢出。
4. 截图 `docs/design-references/zcode-m3-*.png`（≥4 张：学习动态 / focus / workspace / 编译进度）。

---

## 边界（违反即返工）

- **不提交、不 push**：全部改动留在工作区等待审阅；`.zcode/` 与 `.zcodeignore` 不提交。
- 不改 `src/content/`（课程真相）；事件与读取层不得写课程 truth。
- 不新增依赖；不接 nur-agent 到 Clew；不改 Page Chat 后端契约（`/api/clew/kp/[id]/chat`）。
- 事件写入绝不阻塞主流程；失败只记日志。
- SQLite 兼容：不用 `skipDuplicates`；migration 走 `prisma migrate dev` 并确认 status 干净。
- 不动 M2 已验收的行为契约：单章萃取 SSE 事件不变、会话 API 不变、compile SSE 事件只增不改。
- UI 保持 v3 tokens；`focus` 模式不做额外装饰。

## 验证（最终门槛）

- [ ] `npm run lint` 0 error + `npx tsc --noEmit` 通过
- [ ] `npm run test` 全绿（431 + 本任务书新增；报告实际计数）
- [ ] `npm run check` exit 0（lint + typecheck + build）
- [ ] sqlite3 抽查：`sqlite3 prisma/dev.db "SELECT contentType, COUNT(*) FROM UnifiedLearningEvent GROUP BY contentType;"` 三线均有行；重跑一次同步后计数不增（幂等）
- [ ] 浏览器走查清单（4.4）全部通过，console 0 错误
- [ ] 文档更新：`design-qa.md` 新增「ZCODE-M3」节（含截图索引与走查结论）；`docs/PROJECT_STATE.md` 更新进度与下一主线

## 报告格式（跑完后输出）

1. 完成清单（按 Phase，精确到文件与函数）。
2. 每阶段窄验证 + 最终全量验证的原始输出摘要（计数必须真实）。
3. 偏差说明（如有：范围、实现取舍、未完成项）。
4. 遗留/建议（如有）。
5. 本任务书状态改为「已完成 2026-10-XX，待验收」。

## 下一步预告

**ZCODE-M4**：三视图派生（初学/复习/备考）+ 知识图谱（纯 SVG）+ 多模型接入（见 RESTRUCTURE_PLAN §四）。
