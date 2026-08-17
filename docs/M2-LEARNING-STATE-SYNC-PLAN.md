# M2: 学习状态云同步 详细实施计划

**状态**: 2026-08-07 制定  
**优先级**: 最高（PROJECT_STATE.md 明确 next priority）  
**依赖**: M1 账户认证（已完成：Prisma + SQLite + JWT + useSession + /api/auth/*）

## 1. 目标与范围

### 核心目标
让已登录用户在多设备/刷新后能保留：
- 学习记忆（confirmed attempts + review tasks + FSRS 状态）
- 题库练习记录（attempts + favorites）
- 模考会话与报告
- 私人材料准入记录的同步同意（单独 consent gate）

**设计原则**（必须严格遵守）：
- **Local-first**：所有写操作（recordConfirmedAttempt 等）必须立即生效在浏览器本地，UX 不阻塞。
- **显式 consent**：私人材料 admission records 必须单独同意后才上云（当前 payload 硬编码 []）。
- **非阻塞同步**：sync 是后台 fire-and-forget 或 debounced，不影响本地 state 更新。
- **复用现有 contracts**：直接使用 LearnerAttemptRecord、FsrsLearningState、QBAttemptRecord、MockExamSession、LearnerSyncPayload 等。**不创建并行模型**。
- **双向**：登录时 upload local + download server 状态并合并；后续动作增量上传。
- **降级可用**：无登录或 sync 失败时，完全本地行为不变。
- **来源与权限分离**：server 只持久化，绝不改变 course truth、NUR 评分权威、私人 vs 官方边界。

### 必须同步的数据（按优先级）
1. `nur-learn:learning-memory:v1`（attempts + reviewTasks + fsrsState + preferences）
2. `nur-learn:qb-attempts:v1` + `nur-learn:qb-favorites:v1`
3. `nur-learn:mock-exam-sessions:v1`
4. Material admission consents（单独数组 + gate）

## 2. 当前实现状态评估（2026-08-07 验证）

**已有的强 scaffolding**：
- `src/lib/learner-state-sync.ts`（完整）：
  - `recordConfirmedAttemptServer`、`upsertFsrsStateServer`
  - `addQbAttemptServer`、`setQbFavoriteServer`
  - `saveMockExamSessionServer`
  - `setAdmissionSyncConsent`
  - `mergeLocalStateOnLogin`（支持 bulk local → server）
  - `syncLearnerState` + `LearnerSyncPayload`
- `src/app/api/learn/sync/route.ts`（thin adapter，要求 JWT，会话校验）
- Prisma schema 已定义所有模型 + 索引 + User 关联
- **客户端初始触发**：`src/components/learning-dashboard.tsx:145-179` —— 登录后（user.email 去重）读取 4 个 localStorage keys，POST /api/learn/sync（含 admissionConsents: []）

**主要缺失 / 浅层部分**：
- `recordConfirmedAttempt`（及 acceptReviewTask、proposeReviewTaskForAttempt 等）**只写本地**，不触发 sync。
- 无 server → client 下载/合并（API GET 仍是 placeholder）。
- QB / Mock 只在 dashboard 的一次性上传中出现。
- 同步是 fire-and-forget，无状态、无重试、无冲突策略。
- 写作室/案例室/题库练习/模考提交等关键路径未接 sync。
- useSession 只在 dashboard 使用，写作室等未直接感知登录用户用于 sync。

## 3. 实施阶段（窄步、可验证）

### Phase 1: 核心写路径自动同步（最高价值）
- 在 `recordConfirmedAttempt` 成功后（本地写完），如果有登录用户，**后台**发送当前完整 memory。
- 类似处理 `acceptReviewTask`、`proposeReviewTaskForAttempt`（因为它们更新 FSRS / reviewTasks）。
- 提取共享 `triggerLearnerStateSync()` 工具函数（复用 dashboard 读取 localStorage + fetch 逻辑）。
- 非阻塞：`void fetch(...)` + 捕获错误静默。
- 验证：登录后在写作室完成一次 confirm，检查 server 是否收到（可临时加 log 或用 Prisma 查询）。

**目标文件**：
- `src/lib/learning-memory.ts`（添加 sync 触发）
- `src/lib/learner-state-sync.ts`（可选增强客户端辅助函数）
- 写作室、案例室（最小改动或通过 lib 统一）

### Phase 2: 登录合并增强 + 下载回流
- 改进 dashboard 的 doMerge：
  - 上传后，尝试 GET /api/learn/sync 获取 server 最新状态（需要先增强 API 返回 merged state）。
  - 实现客户端 merge 逻辑（以 server 为权威或智能合并，保留最新 confirmedAt）。
  - 支持跨设备恢复。
- 增强 API：
  - GET 返回结构化当前 server 状态（或精简的 attempts/FSRS 等）。
  - 或者扩展 syncLearnerState 返回 merged 后的 memory 快照。

**目标文件**：
- `src/app/api/learn/sync/route.ts`
- `src/lib/learner-state-sync.ts`（新增 getLearnerStateForUser）
- `src/components/learning-dashboard.tsx`
- 新增或复用 merge 辅助函数

### Phase 3: 题库、模考、私人 consent 完整覆盖
- 在题库练习页面（question-bank 相关组件）成功 attempt / toggle favorite 后触发 sync。
- Mock exam 提交/保存后触发。
- 提供最小 UI 让用户为 admission records 显式设置 consent（当前先保持 []，但准备好 payload）。
- 确保 `use-wrong-questions.ts` 等聚合能从 server 受益（通过 memory 回流）。

**目标文件**：
- 题库练习组件
- mock-exam 相关
- 可能添加一个小的 sync consent UI（M2 后期或 M3）

### Phase 4: 健壮性、策略、UI 反馈
- Debounce / queue（避免连续 confirm 狂发请求）。
- 简单同步状态（可选：全局小指示器 “已同步” / “同步中”）。
- 错误重试（指数退避或下次登录时重试）。
- 冲突处理（按 confirmedAt 时间戳取最新）。
- 隐私：确保任何 private 内容只在 consent=true 时发送。
- 性能：payload 大小时可考虑只发增量（当前先发全量 memory string，512KB 限制已存在）。

### Phase 5: 验证、测试、文档
- `npm run check` + `npm test`
- 浏览器验证：
  - 未登录：所有本地行为完全不变。
  - 登录后 confirm → server 有记录。
  - 刷新/另一设备登录 → 状态恢复。
  - 模考 + 错题中心回流正常。
- 更新：
  - `docs/PROJECT_STATE.md`（标记 M2 完成并记录日期）
  - `docs/M2-LEARNING-STATE-SYNC-PLAN.md`（回填实际实现笔记）
  - `design-qa.md`（如有 UI 变化）
- 可选：添加简单集成测试或扩展现有 tests。

## 4. 关键集成点（必须触碰的位置）

**写路径（必须接 sync）**：
- `lib/learning-memory.ts`:
  - `recordConfirmedAttempt`
  - `acceptReviewTask`（FSRS 更新）
  - `proposeReviewTaskForAttempt`
  - （可选）`declineReviewTask` 等

**调用者**：
- `components/subjective-writing-room.tsx`
- `components/case-reasoning-room.tsx`
- `components/course-builder-workbench.tsx`（private units）
- 题库练习组件（QB attempts/favorites）
- Mock exam 提交逻辑

**登录 / 会话**：
- `hooks/use-session.ts`
- `components/learning-dashboard.tsx`（当前已有触发，需增强）
- 可能在 layout 或全局 provider 提供 user 给 sync 逻辑

**Server**：
- `lib/learner-state-sync.ts`
- `app/api/learn/sync/route.ts`

**存储**：
- 继续使用现有 localStorage keys 作为本地真相。
- Server 通过 Prisma 持久化（User 关联）。

## 5. 设计与技术细节

- **同步触发方式**：本地写成功后立即 `void triggerSyncIfLoggedIn()`（读取当前 localStorage 快照）。
- **Payload**：复用 `LearnerSyncPayload`（memory 作为 JSON string 是最简单可靠的方式）。
- **FSRS**：在 applyConfirmedAttempt 里已经更新，sync 时会一起带上。
- **去重**：server 端用 upsert（attempt id 或 criterionId + userId）。
- **首次登录合并**：保留并改进 dashboard 逻辑。
- **类型**：严格复用 `@/types/learning`、`@/types/question-bank`、`@/types/mock-exam`。
- **错误处理**：本地永远优先；sync 失败只记录 console 或未来加 toast（不阻塞）。

## 6. 风险与约束（必须遵守）

- **不得** 阻塞本地 recordConfirmedAttempt 或 UI 更新。
- **不得** 在未登录或无 consent 时发送私人 admission 内容。
- **不得** 修改 course truth、assessment 权威、NUR 评分逻辑。
- **不得** 引入新依赖（除非极小且必要）。
- 所有变更后立即 `npm run check`。
- 保持现有 20+ 路由和浏览器 390×844 / 1440×1000 无溢出。
- 私人材料边界保持（admissionConsents 单独控制）。

## 7. 成功标准

- 登录用户在主观写作室完成一次 confirm 后，server DB 中出现对应 LearnerAttempt。
- 刷新后 useLearningMemory 能从 server 回流（或至少不丢失）。
- 题库练习、模考、review 任务同样可同步。
- 未登录用户行为 100% 不变。
- `npm run check` + `npm test` 全绿。
- PROJECT_STATE.md 更新为 “M2 完成”。

## 8. 实施顺序建议（本次激活）

1. 写本计划（已）。
2. Phase 1：统一 sync 触发器 + 接 recordConfirmedAttempt（最快见效）。
3. Phase 2：增强 API 返回 + dashboard 合并（双向基础）。
4. Phase 3：QB + Mock。
5. 全面验证 + 文档更新。

---

**附：当前相关文件清单（2026-08-07）**
- Server: `src/lib/learner-state-sync.ts`, `src/app/api/learn/sync/route.ts`
- Local core: `src/lib/learning-memory.ts`, `src/lib/fsrs.ts`
- Hooks: `src/hooks/use-learning-memory.ts`, `src/hooks/use-session.ts`
- UI: `src/components/learning-dashboard.tsx`, `subjective-writing-room.tsx`, `case-reasoning-room.tsx`
- 其他: 题库组件、mock-exam、wrong-questions、Prisma schema

本计划基于 PROJECT_STATE.md、CONTENT_ARCHITECTURE.md、实际源码扫描制定。后续实现必须严格按此范围，避免 scope creep。

---
*计划制定后立即进入激活阶段。*

## Phase 4 完成记录 (2026-08-07)
- 添加了客户端 debounce (1200ms) 到 triggerLearnerStateSync，避免快速连续写操作频繁请求。
- 新增 LearnerSyncStatus + localStorage + 事件系统：isSyncing, lastSyncAt, lastError。
- trigger 内部设置状态（同步中/成功/失败）。
- mergeServerStateIntoLocal 成功后更新 lastSyncAt。
- learning-dashboard 登录流程使用 immediate=true + 显示极简同步时间标签（header account 区）。
- 所有核心写路径（学习记忆、QB、模考、consent）受益于 debounce。
- 错误静默 + 本地优先保持。
- `npm run check` 通过。



## Phase 5 完成记录 (2026-08-07)
- `npm run check` 全绿（lint 0 errors + typecheck + build 成功，89 pages）。
- `npm test` 140/140 通过。
- 代码验证：
  - 未登录：API 返回 401（getCurrentSession），trigger 早期 return（typeof window 及 dashboard user?.email guard），本地行为 100% 不变。
  - 登录流程：doMerge 调用 trigger(true) + GET + mergeServerStateIntoLocal。
  - 所有写路径（learning-memory、question-bank-store、mock-exam-store）均调用 trigger。
  - 合并策略：timestamp 优先 + union，已在 merge 函数中实现。
- PROJECT_STATE.md 更新：Last updated 置 2026-08-07，新增里程碑 20（M2 完成），M2 描述移出“待实施”。
- M2-LEARNING-STATE-SYNC-PLAN.md 回填 Phase 4/5 实际实现笔记。
- 设计一致性：dashboard 同步状态标签极简（text-[10px] slate-500），符合已批准的 restrained editorial 语言，无需新截图。
- 成功标准达成：
  - 登录用户 confirm 后可通过 /api/learn/sync 上传。
  - 刷新后状态可从 server 回流。
  - QB / 模考 / 私人 consent 全部参与双向 sync。
  - 私人边界：只有显式 setAdmissionSyncConsent(true) 的记录才进入 payload。

所有变更后立即 `npm run check` 通过。M2 正式完成。


## M2 全面优化 记录（2026-08-07）
- Payload 构建提取为 buildLearnerSyncPayload()。
- 新增 useSyncStatus React hook。
- merge 中 reviewTasks 智能清理。
- 网络恢复（online）和标签激活（visibility）自动触发同步。
- Dashboard 增强：立即同步按钮 + 私人材料 consent 可视化管理（toggle）。
- 状态系统更广泛可用。
- 全量 npm run check + typecheck 通过（0 errors）。

## 冲突可见性 + 用户裁决 记录（2026-08-16）

背景：原 merge 的「时间戳优先」在多端语义分歧时静默择一，用户无感知。
且 POST-先-GET 的登录合并中，服务端 FSRS upsert 无条件覆盖会把分歧在上传一步抹掉，
冲突在结构上不可见。

实现（三层）：
1. 服务端守卫：`upsertFsrsStateServer` 仅当传入 `lastReviewAt` 不早于已存值才覆盖
   （「最近复习者胜」取代「最近上传者胜」）。分歧因此在服务端存活到下次下载。
2. 客户端检测与存储：`mergeServerStateIntoLocal` 以独立 `lastMergeAt` 为基线
   （纯上传只推进 `lastSyncAt`，不推进基线；首次合并无基线 → 按现行时间戳优先、不记冲突），
   双方都在基线后更新且语义不同（state/difficulty/stability/reps/lapses 精确比较）→
   写入版本化 `nur-learn:sync-conflicts:v1`（上限 100 条，含 userEmail 归属）。
   临时合并值仍取「更新者胜」，不打断学习。attempt 型冲突为防御性实现
   （现有管线服务端另发 cuid、本地 attempt 不可变，正常不触发）。
3. 解决与 UI：`resolveSyncConflict` / `resolveAllSyncConflicts`——
   「以本机为准」把该准则 lastReviewAt 置为当前时刻（用户显式重申）借守卫放行上传覆盖服务端；
   「以云端为准」应用记录中的服务端快照到本地。处理后移除记录并触发可靠同步；
   登出时按邮箱清空该账户冲突。`/learn` 账户面板渲染冲突计数、逐条本机/云端快照对比、
   单条与批量两种操作（`useSyncConflicts` 沿用 use-sync-status 稳定引用模式）。
   `triggerLearnerStateSync` / `performReliableLoginMerge` 主流程结构未变（仅增可选 userEmail 参数）。

验证：`tests/sync-conflicts.test.ts` 12 例（双向门控、语义相等静默、首合并基线、
解决应用方向、存储解析）；浏览器对真实 D1 服务端端到端——注册 QA 账户、本地完成复习任务
（FSRS good）、脚本改服务端行为更新分歧值、刷新后冲突出现且快照对比正确、
「以本机为准」后服务端被本地值覆盖（查库证实）、「以云端为准」后本地变云端快照
（错题中心「即将遗忘」出现 relearning/遗忘 7 证实）、一致后无新冲突、
390/1440 无溢出、dev log 干净。`npm run check` + `npm test` 186/186。

已知遗留（后续独立小任务）：`mergeLocalStateOnLogin` 每次全量上传都用 create 重建 attempts
（服务端新 cuid、不按 id 去重）→ 双侧 attempt 重复积累（300 上限稀释历史）。

