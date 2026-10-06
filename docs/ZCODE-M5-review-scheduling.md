# ZCODE-M5 任务书 —「练/复」功能面：FSRS 复习调度 + Clew 线聚合 + 复习提醒

日期：2026-10-05。状态：**M5-A + M5-B 已全部实施并验证（2026-10-05，Zcode；test 501/501 + check exit 0 + 真实链路走查 + 明暗×1440/390 热态 console 0；证据见 `design-qa.md` ZCODE-M5 节）。未提交；Hermes 预验收复核（2026-10-05）通过——含 FSRS 纯函数独立复算逐位一致与「我的学习」定位收紧随手复核，见 `design-qa.md`「预验收复核（Hermes，2026-10-05）· ZCODE-M5」节。**
执行者：Zcode（实施）／Hermes（预验收复核）。
真相源优先级：本文档（M5 范围内）> `docs/RESTRUCTURE_PLAN.md` > `docs/PROJECT_STATE.md`。

## 〇、裁决与前提（已定，不再议）

1. **复习提醒落点 = `/learn`「我的学习」**（Nur 2026-10-05 裁决：该页定位 = 个人学习状态 + 官方更新）。Clew 学习页脊柱 `review` 环节保持「未接入」标注，直到本任务书将其接通。
2. 「我的学习」页面纪律（同日裁决）：只展示真实状态，无假数据演示；官方更新节当前为静态最小实现（动态数据源不在 M5 范围）。
3. Tier 边界不动：`src/lib/fsrs.ts`（Tier 2）改动需 before/after 证据；教学内容、评分语义、provenance 零触碰。

## 一、目标（一句话）

把「复（review）」从类型声明变成真实调度：**FSRS 到期项在「我的学习」聚合呈现并一键回流学习，Clew 自测「还需看」进入统一调度，错题中心补齐 Clew 线**。

## 二、现状底账（2026-10-05 核对）

| 件 | 现状 | 缺口 |
|---|---|---|
| FSRS 引擎 | `src/lib/fsrs.ts`：三参数（D/S/R）状态 + 默认参数 + 0.9 保持率 + 1–365 天夹取；纯函数，测试覆盖 | 无服务端调度入口；无按用户查询「今日到期」的面 |
| 学习记忆 | `src/lib/learning-memory.ts`：浏览器本地 attempts + reviewTasks + fsrsState（v2 schema，浏览器本地） | reviewTasks 有写入路径但「我的学习」不消费；数据在浏览器本地 |
| 统一事件流 | `src/lib/unified-events.ts`：`wrong-question-added` / `stage-completed` 等，Clew 自测已接入（`self-check.ts` → `wrong-question-added`） | 无「复习到期」事件；查询面未建 |
| 错题中心 | `src/lib/wrong-questions.ts`：官方课 + 题库 + 模考 + 私人练习四线聚合，有 `FsrsHighRiskItem` 选择器 | **Clew 线缺失**（clew-kp 自测「还需看」不进错题中心） |
| Loop Profile | `fsrsEnabled` 字段六 profile 已声明（exploration=false 其余=true） | 无任何运行时消费 |
| 「我的学习」 | 学习动态流（unified feed）+ 本周进度 + 错题待复习计数 + 弱项回流 | 无「今日复习」区；错题计数不含 Clew 线 |

## 三、数据模型与 API（Tier 3/4 改动，向后兼容）

### 3.1 Prisma 新模型 `ClewReviewItem`（挂 userId，一张表）

```prisma
model ClewReviewItem {
  id            String   @id @default(cuid())
  userId        String
  kpId          String   // → ClewKnowledgePoint.id（删除级联）
  textbookId    String   // 冗余存储便查询（回流入口拼 URL 用）
  sourceKind    String   // "self-check-shaky"（M5 只接自测；后续可扩 "chat-flag"）
  stability     Float    // FSRS S
  difficulty    Float    // FSRS D
  lastReviewedAt DateTime
  dueAt         DateTime // 下次到期
  reviewCount   Int      @default(0)
  lapses        Int      @default(0)
  suspended     Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  @@unique([userId, kpId, sourceKind])
  @@index([userId, dueAt])
}
```

- 写入点：`recordClewSelfCheck`（既有，`self-check.ts`）内，`shaky` 项 upsert——首见 `createNewFsrsState()`，再见按 `fsrsNextState` 前移。**profile 过滤：`LOOP_PROFILES[kp.loopProfileId].fsrsEnabled === false` 时不建条目**（exploration 不进调度——`fsrsEnabled` 的首次真实消费）。
- 完成点：用户在复习回流里作答后打分（again/hard/good）→ `fsrsNextState` 更新 + `dueAt` 重排。
- 事件：`review-scheduled` / `review-completed` 入统一事件流（学习动态可见「安排了一次复习」）。

### 3.2 API（thin adapter，服务在 `src/lib/clew/`）

| 路由 | 方法 | 说明 |
|---|---|---|
| `/api/clew/reviews` | GET | `?due=1`：今日到期（`dueAt <= now`，未 suspended）；`?kp=ID`：单点状态 |
| `/api/clew/reviews/[id]` | PATCH | `{ rating: "again"\|"hard"\|"good" }` → FSRS 前移 |

SSE/配额不涉及（无模型调用）；鉴权沿用 `getClewSessionUser`。

### 3.3 「我的学习」复习区（Free Change Zone）

- 位置：主列「学习动态」之上，标题「今日复习」；数据 = 上述 GET（未登录/空 → 不渲染或诚实空态「今天没有到期复习」）。
- 行形态：KP 标题 + 教材名 + 到期信息（「已到期待复习」/「即将到期」）+ `重学` 链接（直达该 KP 学习页；`review` 环节动作 = 滚动讲义 + 重开自测——复用脊柱既有动作）。
- 打分面：回流学习后在 Clew 学习页自测面板底部出现轻量三键（再来一次/有点难/记住了 → again/hard/good）PATCH；成功后行内确认 + 从「今日到期」消失。
- 右栏「错题待复习」计数并入 Clew 到期数（`wrongQuestionData.totalWrong + pendingReviewCount + clewDueCount`，小字拆分来源）。

### 3.4 错题中心 Clew 线（`src/lib/wrong-questions.ts`，Tier 2）

- `WrongQuestionCenterData` 增 `clewItems: ClewWrongItem[]`（= 该用户 ClewReviewItem 里 `reviewCount>0 或 lapses>0` 或最近 shaky 记录；标题/教材/href 同 3.3）；服务端聚合函数加参数（可选注入，默认空数组——既有调用零破坏）。
- UI：错题中心新增「Clew 教材」tab 或并入现有列表（tab 与现有四线并列，实施时按现有 tab 结构落）。

### 3.5 明确不做（本批）

- 官方课 KP 的 FSRS（官方课 review 已有自己的待办模型，混入会污染 Tier 1 内容真相关联；留 M6+）。
- 跨设备同步官方课浏览器本地记忆（架构议题单列）。
- 官方更新节的动态数据源。
- Clew 学习页脊柱 `review` 节点亮为可点（依赖 3.3 的打分面落成后顺手做：动作 = 跳「我的学习」今日复习区——**这条纳入本批**，改 spine 的 unavailable 分支即可）。

## 四、验证（每项都过才交 Hermes）

1. `npm run check` exit 0 + `npm run test` 全绿（新增：FSRS 调度纯函数若动 `fsrs.ts` 需 before/after 对照输出；`self-check → review item` upsert 幂等测试；`fsrsEnabled=false` 不建条目）。
2. prisma migration 新增一张表；`migrate status` 干净。
3. 真实链路走查（v4qa 教材）：自测标记「还需看」→ 「我的学习」今日复习出现 → 重学 → 三键打分 → 到期消失/顺延；错题中心出现 Clew 线；明暗 × 1440/390 + console 0。
4. 既有行为回归：自测提交语义（wrong-question-added 幂等）不变；未接入 profile 的 KP 不产生条目。
5. 文档：design-qa 证据节 + PROJECT_STATE + AGENTS（若边界表述变化）。

## 五、分期建议（一个任务书内两段，段间可停）

- **M5-A（服务端与聚合）**：Prisma 模型 + self-check 写入 + 两个 API + 错题中心 Clew 线 + 事件。
- **M5-B（消费面）**：「我的学习」今日复习区 + 打分三键 + 脊柱 review 节点亮。
