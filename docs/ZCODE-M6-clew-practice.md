# ZCODE-M6 任务书 — Clew「练」：自教材练习生成 + 练习面 + 体验修缮包

日期：2026-10-05 落稿；2026-10-06 并入 Nur 四点提醒（DeepSeek v4.1flash 第二 provider + 思考强度 / 跨 KP 跳转建议 / UI 热修 ×2）。状态：**UI 热修 ×2、M6-0 探针、M6-A、M6-B、M6-C、M6-D 已全部实施并验证（2026-10-06：test 557/557 + check exit 0 + migrate 干净〔M6-D 零 schema〕+ 真实链路走查 15 项全过 + 盲评对照；M6-D 证据见 design-qa M6-D 节——引用核验标定 0 失配、讲义六节 rubric、先修摘要/证据原子增强路径活体验证、笔记四新节、prompt 迭代 2 轮后引用可核查性盲评 +1.2、总体 <0.5 按规则如实停）。全段交 Hermes 预验收。**
执行者：Zcode（实施）／Hermes（预验收复核）。
真相源优先级：本文档（M6 范围内）> `docs/RESTRUCTURE_PLAN.md` > `docs/HI_DOC_PLAN.md` > `docs/PROJECT_STATE.md`。
前置：ZCODE-M5 已实施并预验收通过（待提交审阅合并）。

## 〇、背景与裁决（待 Nur 拍板项在内）

Nur 2026-10-05 反馈「Ariadne 还不够好」，选定两方向：**练太薄**（主）+ **体验/质量细节**。本任务书据此定稿。

产品判断：Clew 现状是「学·评·复」成环、「练」缺席——学生上传教材后可做的检索练习只有讲义内 3 道自测题，与「应试提分」承诺有实质落差。M6 把「练」接成真环：**按自己的教材生成客观题 → 作答判分 → 错题进错题中心与 FSRS 调度 → 重练回流**。

**开放决策（开工前 Nur 拍板）**：

| # | 决策点 | 建议 | 备选 |
|---|---|---|---|
| D1 | 首版题型 | A1 单选 ×4 + 填空 ×2（每 KP 一组） | 只做 A1；含问答式主观题（推迟） |
| D2 | 填空判分 | 展示参考答案 + 学员自评「对/错」两键（与自测「会了/还需看」同模式，不自诩能判主观） | 不做填空 |
| D3 | 配额新维度 `clewPracticeSets` 各档数字 | free 5 / basic 15 / pro 40 / max 80（每月，参考 clewLessons 5/20/… 的比例感） | Nur 定数 |
| D4 | 重新生成语义 | 每 KP 一组，重新生成整体替换（与萃取/讲义覆盖语义一致，防题库膨胀占配额） | 追加式 |
| D5 | M6-C 体验审计范围 | 键盘流补齐 + 390 学习流专项（见 §三.3） | Nur 增删 |
| D6 | 生成质量改造深度档位（§3.4） | 全套（上下文加宽 + 引用核验管线 + 证据原子接线）；接受单次生成 token 成本上升，`clewLessons`/`clewNotes` 配额数字相应下调 | 轻量（只做 prompt 迭代 + 抽检，成本近零、深度提升有限） |
| D7 | `ClewEvidenceAtom` 接线是否本批做 | 是——ZCODE-M2 遗产兑现，讲义与问答共用，工作量独立可停 | 推迟（维持现状：证据原子层继续闲置） |
| D8 | DeepSeek 接入与思考强度（§3.5，Nur 2026-10-06 指定；M6-0 探针后修订） | **第二 provider = DeepSeek 官方 API（模型 id `deepseek-flash`，即 V4.1 Flash；不走百炼托管）**；思考强度落地为**模型路由**（探针实测 `deepseek-flash` 默认即思考、`enable_thinking` 对其 no-op）：标准档 = qwen3.7-plus 非思考、深度档 = deepseek-flash；生成面默认档由 M6-0 数据定（建议练习题默认 deepseek-flash） | 仅 qwen 思考参数、不接第二 provider |
| D9 | 思考强度档位数字 | 深度档 = DeepSeek 调用：`clewChats` 深度轮次按 2× 计；生成面深度档消耗 2 个基础额度单位；深度问答挂 pro/max（free/basic 仅标准档）；精确倍率待双方价目表折算（探针 token 比 ≈3.5×，见 design-qa M6-0） | Nur 定数 |
| D10 | 跨 KP 跳转建议（§3.6，Nur 2026-10-06 提出） | 确定性实现：回答完成后按本书其他 KP 的标题/术语匹配回答文本，命中即渲染一键跳转 chip；**不做模型自报链接**（防幻觉导航） | 不做 |

已定前提（不再议）：

1. **诚实边界**：练习题为模型生成物，页码溯源挂教材原文；无 key / 模型失败**明确报错不生成**——不存在「确定性出题兜底」，不编造题。Clew 生成物不挂官方课证据分级（可关联/不可直接等同只属官方闭环），AI 出题永不冒充真题/考纲/教师重点。
2. **错题回流复用 M5**：practice 错题进 `ClewReviewItem`（`sourceKind="practice-wrong"`，unique 约束天然支持第二源）与错题中心 Clew 线，不另起炉灶。
3. Tier 边界不动：`fsrs.ts` / 评分语义 / `src/content/` 零触碰。

## 一、目标（一句话）

把「练（practice）」从脊柱上的「后续版本接入」变成真环节：**每 KP 可按自己教材生成一组客观题，作答即判分（填空自评），错题自动进错题中心与 FSRS 调度并可一键重练**；同时接入 DeepSeek 第二 provider 与思考强度模式（质量与成本分层），补齐跨 KP 跳转导航与承诺过的键盘流/移动端体验，并修复两个实测 UI 缺陷（侧栏折叠自适应、流式双气泡）。

## 二、现状底账（2026-10-05 核对）

| 件 | 现状 | 缺口 |
|---|---|---|
| 脊柱「练」节点 | `clew-study.tsx` case "practice" → unavailable「练习环节后续版本接入（当前可在题库刷题）」 | 无 Clew 练习面 |
| 讲义自测 | `parseClewLessonSelfTest`（讲义内嵌 3 道问答 + 自评「会了/还需看」）→ M5 接 FSRS | 题型单一、量少、无判分 |
| 官方课题库 | 静态 60 题（Tier 1 `src/content/courses/`）+ 章节练习页 + 100 分模考；作答 browser-local（`question-bank-store.ts`） | 不覆盖 Clew 自有教材；题库不增长 |
| FSRS 调度 | M5：`ClewReviewItem`（sourceKind 唯一 `self-check-shaky`），per-KP 粒度 | 无练习错题源；「重学」动作只滚讲义 |
| 错题中心 | 五线含 Clew 线（M5） | Clew 线无练习错题 |
| 配额 | `quotas.ts` 六个 `clew*` 维度（parses/extracts/lessons/chats/notes/workshopChats）+ `quotas-server` 记账 | 无练习生成维度 |
| 键盘流 | 仅 ⌘K / ⌘B；RESTRUCTURE §1.1 承诺的 `J/K` KP 移动、`E` 生成讲义、`N` 写批注**从未落地** | 全缺 |
| 模型生成管线 | 讲义/萃取 SSE + 结构化校验 + 配额 + EventLog 遥测（`lesson.ts` 模式可复制） | 无出题 provider/prompt |

## 三、数据模型与 API（Tier 3/4 改动，向后兼容）

### 3.1 Prisma 新模型（两张表，一张迁移）

```prisma
/// ZCODE-M6: Clew 练习题（每 KP 一组，重新生成整体替换；随 KP 级联删除）。
model ClewPracticeQuestion {
  id         String @id @default(cuid())
  kpId       String
  kp         ClewKnowledgePoint @relation(fields: [kpId], references: [id], onDelete: Cascade)
  order      Int
  // "a1" | "fill"（首版两型；TS 类型约束保证可移植性）
  kind       String
  stem       String
  // A1 选项（string[]；fill 为 null）
  choices    Json?
  // A1 正确项 index；fill 为参考答案文本
  answer     Json
  explanation String
  // 教材页序（1 起，与 KP sourcePage 同源；出题依据的溯源）
  sourcePage  Int
  // "model:dashscope:qwen3.7-plus"（无启发式兜底——见 §〇.1）
  generator   String
  createdAt   DateTime @default(now())
  @@index([kpId, order])
}

/// ZCODE-M6: Clew 练习作答（服务端，跨设备；A1 判分确定性，fill 自评）。
model ClewPracticeAttempt {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  questionId String
  question   ClewPracticeQuestion @relation(fields: [questionId], references: [id], onDelete: Cascade)
  // A1：所选 index；fill：学员自评 "correct" | "wrong"
  response   Json
  isCorrect  Boolean
  attemptedAt DateTime @default(now())
  @@index([userId, questionId])
}
```

### 3.2 API（thin adapter，服务在 `src/lib/clew/practice.ts`）

| 路由 | 方法 | 说明 |
|---|---|---|
| `/api/clew/kp/[id]/practice` | POST | 生成（SSE：progress → result；配额 `clewPracticeSets`；无 key 503 明确报错不兜底）；GET 当前组 + 本人作答状态 |
| `/api/clew/practice/[qid]/attempt` | POST | `{ selectedIndex }`（A1 确定性判分）或 `{ selfRating: "correct"\|"wrong" }`（fill）；错 → upsert `ClewReviewItem(sourceKind="practice-wrong")` + 统一事件 |

- 生成服务复制 `lesson.ts` 模式：provider-neutral、原文片段注入 prompt、结构化输出校验（题干/选项/答案/解析/页码六件套缺一即整组拒收重试）、`recordServerUsage` 记账、`EventLog` 遥测带 outcome。
- 统一事件：作答确认 `attempt-confirmed`（contentType `clew-kp`、stage `practice`）入学习动态。
- 错题中心：`ClewWrongItem` 增 `sourceKind` 字段（M5 行为 `self-check-shaky` 不变），Clew 线行显示来源（「自测标记」/「练习错题」）。
- 配额：`quotas.ts` 增 `clewPracticeSets` 维度（数字按 D3 拍板）+ billing 权益文案同步。

### 3.3 M6-C 体验修缮包（Free Change Zone，先审计后修）

1. **键盘流**（RESTRUCTURE §1.1 兑现）：学习页 `J/K` 上下切换本章 KP、`E` 生成/重新生成讲义（聚焦 composer 时除外）、`N` 对讲义选中文字直接写批注。
2. **390 学习流专项**：长讲义折叠、自测标记、打分三键、问 Clew composer 在手机上的触控目标与键盘弹出行为；发现问题即修（P0/P1 本批，P2 列账 PROJECT_STATE）。
3. 顺手项：5 个范围外残面文件的 `1px solid var(--ink)` 归一，或先清 material-admission-review 死代码候选（按现状核后定）。

### 3.4 M6-D 生成质量三面工作流（讲义 / 学霸笔记 / 问 Clew）

2026-10-05 底账核对（代码级）：
- **讲义**：prompt 上下文 = KP 元信息 + 先修 KP **标题列表** + 本 KP 页 `sourceExcerpt`——无先修讲义内容、无章级语境、无跨页证据；
- **问 Clew**：上下文 = KP 元信息 + 本章 KP 标题 + 截断原文（批 3 加了三档依据范围）——单轮检索接地，无引用自检；
- **学霸笔记**：输入面完整（讲义 + 划线 + 追问记录），输出是压缩汇总，无深度结构；
- **`ClewEvidenceAtom`/`ClewKnowledgePointEvidence`（ZCODE-M2 Phase 4 建表）在讲义/问答/笔记链路中零引用**——证据原子层闲置。

三面改造（全部按 D6 拍板的档位执行）：

**A. 讲义深度**
1. 上下文加宽：先修 KP 的讲义要点摘要（不只标题）、章级语境、`keyTerms` 的定义性原文段落；
2. 结构 rubric 进 prompt：定义 / 机制机理 / 易混概念对比辨析 / 易错点 / 应用钩子 / 自测——各节最低内容要求，缺节即整篇拒收重试（复用练习题的结构化校验模式）；
3. **页码引用确定性核验**：生成后对照该页抽取文本核验引用，失配项重试，仍失配如实标注「引用待核」——绝不静默放过；
4. 自测题可答性自检：3 题答案必须能从讲义正文答出（prompt 内约束 + 抽检核验）。

**B. 学霸笔记深度**
1. 输出结构升级：跨 KP 对比表（易混概念）、易错清单（从划线与「还需看」记录聚合）、记忆钩；
2. 复习导向变体：为 FSRS 调度中「还需看」的 KP 生成强化块（M5 数据的新消费面）。

**C. 问 Clew 深度**
1. **证据原子接线**（D7）：按 KP 绑定与相关度分取 `ClewEvidenceAtom` 注入上下文，替代单一截断原文；
2. 回答引用自检：回答中声明的页码/原文引用，服务端对照页文本核验，失配在 notes 如实标注（「本段引用与原文不完全一致，请对照第 X 页」），不静默；
3. 苏格拉底深化：追问链上下文沿用既有 messages；针对学员自测「还需看」点的定向追问（消费 M5 数据），列为可选项。

**反玄学验证**：固定样本 KP 集（5 个，v4qa + 官方课语料各半），改造前后各生成一轮，三指标——结构完整性（rubric 各节是否齐）、页码引用抽检（对照 PDF 原文逐条核）、盲评深度打分表（Nur 或双盲）。prompt 迭代上限两轮：提升不显著就如实记录并停，不无限调参、不做无法验证的「更深度」承诺。

**成本提示（如实）**：上下文加宽 = 单次生成输入 token 显著上升（讲义预估 +50–150%）。若选 D6 全套档，`clewLessons`/`clewNotes` 的各档配额数字需下调（建议讲义 5/20/… 降约 1/3，具体随 D3 一并拍板）；轻量档则成本近零。

### 3.5 思考强度模式 + DeepSeek 第二 provider（D8/D9，Nur 2026-10-06 指定）

**接入（Tier 3）**：
- `src/lib/clew/providers/` 新增 DeepSeek 官方 API adapter（OpenAI 兼容，base `https://api.deepseek.com/v1`；**不走百炼托管**）；模型 id 用 `deepseek-flash`（V4.1 Flash 的 API 名；传 `deepseek-v4.1-flash` 被 API 400 拒绝——M6-0 探针实测）。`DEEPSEEK_API_KEY` 只在服务端（`.env.local`，与 DASHSCOPE 同纪律：永不渲染/提交）；无 key 时该 provider 明确报错不可选，不静默回落。
- 模型注册（M4 已建 `clew-model-config` 层）：`deepseek-flash` 入册，遥测 EventLog 记 provider/model/outcome/tokens/延迟。

**思考强度（M6-0 探针后定案：模型路由，非参数开关）**：
- 探针实测（design-qa M6-0 节）：qwen3.7-plus 支持混合思考（`enable_thinking`/`thinking_budget`）；`deepseek-flash` **默认即思考**（标准态亦产出 ~2600–2900 reasoning tokens，`enable_thinking` no-op）。因此统一抽象 `intensity: "standard" | "deep"` 映射为模型路由：**standard = qwen3.7-plus（enable_thinking=false）、deep = deepseek-flash**；未来接入非思考型新模型时再回参数方案。
- 生成面（讲义 / 练习题 / 学霸笔记）：质量关键、异步 SSE 可等——**练习题生成默认 deep（deepseek-flash，M6-0 建议档）**，讲义/笔记默认 standard、可切 deep；
- 问 Clew：延迟敏感——「深度思考」显式开关进既有讲解设置面板（与风格、依据并列第三维）；standard 零思考、deep 路由 deepseek-flash 并诚实提示（「正在深入思考…」状态里程碑，不展示思考原文——医疗场景亮思考链放大误导风险）；
- 萃取/目录识别：结构化任务，不加（省成本）。

**配额（D9 建议值，待拍板）**：深度问答轮次按 2× `clewChats` 计；生成面深度档消耗 2 个基础额度单位；深度问答挂 pro/max（free/basic 仅标准档）。峰谷价差不进产品逻辑（成本记账留痕即可）。

### 3.6 跨 KP 跳转建议（资料文本追踪，D10，Nur 2026-10-06 提出）

场景：在「胸骨角」章节问「人体解剖姿势」，回答结束后出现「相关知识点：人体解剖姿势 → 跳转」chip，一键 `?kp=` 深链。

- **确定性实现（反幻觉）**：回答完成后，取本书全部其他 KP 的 `title` 与 `keyTerms`，对回答文本做包含匹配（标题全匹配优先、术语次之，每条回答至多 2 个建议、排除当前 KP）；命中即渲染跳转 chip。**不做模型自报链接**——导航必须可验证。
- 纯前端可算（KP 列表已在学习页视图内），零额外请求；匹配函数纯函数化进 `src/lib/clew/`（Tier 3 纯函数，测试锁定：命中/排除自身/去重/上限）。
- 归属 M6-B（问 Clew 消费面）；与 D10 备选「不做」互斥。

### 3.7 UI 热修 ×2（Nur 2026-10-06 实测报告；根因已核，独立于 M6 可先行）

1. **侧栏折叠后学习页主列不变宽**：壳网格本身自适应（`.appRail` 264→56px 正确），但学习页 `.studyContent` 有 `max-width: 1240px; margin: 0 auto`（clew.module.css:750）——折叠腾出的 208px 变成两侧居中留白。修法：壳根节点加 `data-shell-rail="collapsed|expanded"`，`clew.module.css` 增 `@media(min-width:901px){ [data-shell-rail="collapsed"] .studyContent { max-width: none; } }`（是否同步放宽其他面按走查定）。
2. **问 Clew 流式期间双气泡**：`clew-study.tsx` 流式时，正在输出的助手消息在 `messages.map` 与底部 streaming 块各渲染一次，流结束才恢复单条。修法：streaming 且末条为 assistant 时，map 只渲染 `messages.slice(0, -1)`，streaming 块作为该条唯一渲染处（带光标）。

### 3.4 消费面（学习页）

- 「练习」面板置于自测面板之后：无题组 → 「生成练习题」按钮（配额 chip + 无 key 报错态）；有题组 → 题目列表 + 逐题作答（A1 即选即判；fill 揭参考答案自评）+ 正确率/错题数 + 「只练错题」过滤（复用自测 shakyOnly 模式）。
- 脊柱「练」节点点亮：有题组滚动到练习面板；无题组提示先生成。
- 复习回流升级：`ClewReviewItem` 含 `practice-wrong` 源时，「我的学习」与错题中心的重学入口直达练习面板「只练错题」（比 M5 的滚讲义更有检索强度——M5 遗留改进点）。

## 四、明确不做（本批）

- 自教材组卷模考（依赖题量积累，M7+）。
- 主观题（名词解释/简答）AI 评分——评分权威边界需单独设计（AI 评分永不冒充 NUR/教师权威），留任务书。
- 官方课静态题库扩充（Tier 1 内容工作，单独批次）。
- 复习粒度从 KP 级细化到题目级（等练习数据沉淀后自然获得，届时再议）。

## 五、分期（一个任务书内五段，段间可停；UI 热修独立可先行）

- **M6-0（质量探针，1–2 天，门禁）——已完成（2026-10-06）**：模型 × 思考强度矩阵——qwen3.7-plus 标准态/思考态 × `deepseek-flash` 标准态/思考态，2 KP 各 6 题（8 组 48 题）。**结果：48 题事实错误率 0%，反转条件（>10%）未触发，练习功能可行**；关键发现与默认配置建议见 `design-qa.md` M6-0 节（`deepseek-flash` 默认即思考 → 强度=模型路由；其延迟为 API 报告值 0.1–0.2s 待生产复核）。遗留：定义型页面验证顺延 M6-A 走查。
- **M6-A（生成与判分服务端）**：两张表迁移 + `practice.ts` 生成服务（SSE + 配额 + 遥测）+ 作答 API + `practice-wrong` FSRS 源 + 统一事件 + 错题中心 sourceKind 扩展；DeepSeek adapter 与 `intensity` 抽象随本段落地（生成面接入）。
- **M6-B（练习面与回流）**：学习页练习面板 + 脊柱「练」点亮 + 只练错题 + 重学入口升级 + 跨 KP 跳转 chip（§3.6）+ 问 Clew 深度思考开关。
- **M6-C（体验修缮包）**：键盘流 + 390 专项 + 残面顺手项。
- **M6-D（生成质量三面）**：讲义/笔记/问答深度改造（按 D6 档位；引用核验管线复用 M6-A 的结构化校验；证据原子接线按 D7）。
- **UI 热修 ×2（§3.7）**：不依赖 M6 任何段落，确认后可立即执行并单独走查提交。

## 七、M6-D 详细执行方案（D6 = 全套，2026-10-06 Nur 拍板；本节为 M6-D 的执行真相源，§3.4 为其摘要）

### D-0 基线与样本冻结（0.5 天）

1. **样本 KP 集冻结（5 个，覆盖两种页面形态）**：v4qa-kp-01 / v4qa-kp-02（习题+答案富页）+ M2 QA 教材（m2qa）3 个有讲义的知识点（定义型页面；若不足 3 个则以 v4qa-kp-03 生成讲义补位，如实记录）。每 KP 冻结：讲义 contentMd、笔记（章级）、一轮标准问答（固定问题集 3 问/题）。
2. **基线快照落盘** `docs/design-references/m6-probe/quality-baseline/`：每样本的 prompt 全文、输出全文、tokens/延迟、`EventLog` 计数。评分表三维：结构完整性（rubric 各节齐备率）/ 页码引用逐条抽检（对照原文，失配率）/ 盲评深度 1–5 分（样本打乱前后标签，Nur 盲评或 Zcode+Hermes 双盲）。
3. **数据现状（已核，2026-10-06）**：`ClewEvidenceAtom` 全库仅 4 条（M2 合成教材），v4qa 教材 **0 原子 0 绑定** → 全部接线一律「**有则增强、无则逐字不变**」——这同时保证 chat-prompt 缺省路径锁定测试不破。

### D-1 引用核验管线（共享地基，1 天）

- **新文件 `src/lib/clew/citation-verify.ts`**（纯函数，可测试，无 server-only）：
  - `splitExcerptPages(excerpt)`：按【PDF 第 N 页】切分为 `Map<page, text>`；
  - `verifyCitations(contentMd, pageMap)`：提取含「第 X 页」/【PDF 第 X 页】的句子 → 规范化（全半角/空白折叠）→ 提取关键词（≥2 字，去「的/是/在/与」等虚词表）→ 与该页文本做包含匹配，命中 ≥1 词即过；0 命中 → issue `{page, sentence}`；
  - 如实边界：OCR 异体字（⼀vs一）不做映射，首版记局限。
- **新文件 `src/lib/clew/evidence-context.ts`**（server 层）：`loadClewKpEvidenceContext(kpId, {maxAtoms=5, maxChars=2000})` —— `ClewKnowledgePointEvidence`（isPrimary 优先、relevanceScore 降序）→ `ClewEvidenceAtom`，返回 `{page, text}[]`；无绑定返回 null（调用方回落现状，不造数据）。
- **测试** `tests/clew-citation-verify.test.ts`：页切分 / 命中 / 失配 / 全半角规范化 / 空输入 / 虚词排除。
- **验收**：纯函数测试全绿；对 M6-A 已生成的练习题组跑一次核验（其页码引用已人工验过，应为 0 失配——校验器自身标定）。

### D-2 讲义深度（1.5–2 天）

1. **上下文加宽**（`lesson-provider.ts` 接口 + `dashscope-lesson.ts` prompt + `lesson.ts` 装配）：
   - `ClewLessonModelInput` 增可选：`prerequisiteSummaries?: { title, definition, keyPoints }[]`（先修 KP 讲义的「定义+要点」节，`extractLessonEssence()` 截取，≤3 个先修 × 800 字）、`evidenceAtoms?: { page, text }[]`（D-1，与 sourceExcerpt 去重合并）；prompt 中先修摘要置于知识点信息前、原子置于原文片段后，均带「仅作背景，不得直接引用为出处」约束。
   - 先修反查：`prerequisites` 是标题数组 → 本章 KP 按标题反查 id → `loadClewLesson`；反查不到即跳过（不编造）。
2. **结构 rubric 升级**（`dashscope-lesson.ts` requiredShape + `lesson-heuristic.ts` `CLEW_LESSON_SECTIONS`/`validateGeneratedLesson`）：
   - 骨架扩为：定义 / **机制机理**（2–4 句，为什么会这样）/ **易混辨析**（≥1 组对比；本页无易混概念则整节写「本页未涉及」——节必须存在，内容可诚实略）/ 要点 / 易错点 / 自测题；
   - `validateGeneratedLesson` 增两节检查：缺节 → 422 拒收（lesson.ts 复用 M6-A 的整组重试模式，retry 一次并把缺节清单回灌 prompt）。
3. **引用核验接入**（`lesson.ts`）：结构校验过后 → `verifyCitations` → 有 issues → 重试一次（回灌失配清单）→ 仍失配 → **保留结果 + notes 标注**「N 处页码引用与原文不匹配，已列出请核对」+ 失配句清单（不改写正文、不静默）。
4. **自测题可答性**：prompt 约束（答案必须能从讲义正文推出）+ D-5 样本人工抽检；**不做确定性校验**（如实说明）。
5. **风格指令兼容**：`STYLE_INSTRUCTIONS` 四风格不动（骨架变化对四风格同构生效）。

### D-3 学霸笔记深度（1–1.5 天）

1. **输入扩展**（`note-heuristic.ts` `ClewNoteModelInput` + `note.ts` 聚合）：
   - `reviewPressure?: { kpTitle, state: "due"|"upcoming"|"scheduled", lapses }[]`——本章 KP 的 `ClewReviewItem`（M5/M6 数据消费面；exploration 不产生，自然缺省）；
   - `comparablePairs?: { aTitle, bTitle, sharedTerms }[]`——同章 KP 两两 keyTerms 交集非空的对（纯函数 `selectComparablePairs()`，上限 3 对）。
2. **输出结构升级**（`dashscope-note.ts` requiredShape + `validateGeneratedNote`）：
   - 新增节：`## 易混概念对比`（comparablePairs 驱动，对比表；无候选整节略去）/ `## 易错清单`（全章易错点聚合 + reviewPressure 高的排前，标注来源 KP）/ `## 记忆钩`（3–5 条，**只允许改组给定信息**，prompt 明令不得编造口诀）/ `## 复习提醒`（reviewPressure 非空时列到期/即将到期 KP + 「去我的学习 · 今日复习」动作；无则略去）；
   - `validateGeneratedNote` 保持原三节必备（章首导读/知识点笔记/自测题汇总），新增节按可选（诚实略去语义）。
3. `maxOutputTokens` 4000 → 6000；timeout 240s 不变。
4. **配额（D6 全套成本对价，数字待 Nur 确认）**：`clewLessons` 5→3 / 20→13 / pro·max 不变；`clewNotes` 3→2 / 10→7 / pro·max 不变。billing 权益文案如有列举处同步。

### D-4 问 Clew 深度（1 天）

1. **证据原子接线**（`chat.ts` + `chat-prompt.ts`）：scope ≠ lesson-only 时 `loadClewKpEvidenceContext` → 有原子则 `chatContext.evidenceAtoms` → chat-prompt 在原文片段之后增「本章证据原子（页码溯源）」段；**无原子时 prompt 与改前逐字节一致**（缺省锁定测试不破，跑测试证明）。
2. **回答引用自检**（`chat.ts`）：回答完成 → `verifyCitations(answer, pageMap)` → 失配 → notes push「本段 N 处页码引用与原文不完全一致，请对照原文核对」（不阻断、不改写回答——对话流式已完成）。
3. **定向提示（可选 P2，纳入本批）**：本 KP 有 `self-check-shaky` 到期复习条目 → notes 加一行「你在自测中标记过本知识点还需看」（一行成本，消费 M5 数据）；不做自动出题。
4. 深度档（D8 模型路由）与本法正交，不改。

### D-5 质量对照与收尾（1 天）

1. 同 5 样本 KP 全部重生成（讲义+笔记+问答）→ 三指标前后对照表落 `design-qa.md`（结构齐备率 / 引用失配率 / 盲评分）；盲评样本打乱前后标签。
2. prompt 迭代上限 2 轮：盲评均分提升 <0.5 → 如实记录并停，不做无法验证的「更深度」。
3. 配额下调落地 + `design-qa` + `PROJECT_STATE` + 任务书状态更新。
4. 全量门槛：`npm run check` exit 0 + test 全绿（新增 citation-verify/evidence-context/笔记结构测试）+ migrate 无变更（本段零 schema）+ 真实链路走查（明暗×1440/390 + console 0）。

### 风险与对策（如实）

| 风险 | 对策 |
|---|---|
| prompt 变化反而降质 | D-0 基线 + D-5 前后对照 + 迭代两轮上限，不显著即停并如实记录 |
| 引用核验误报（OCR 空格/全角/异体字） | 规范化 + 宽松阈值（≥1 关键词）+ 失配只标注不改写不阻断 |
| 上下文膨胀推高成本 | 硬 cap（先修 3×800 字 / 原子 5×400 字 / 笔记输出 6000）+ 配额下调对冲 |
| chat-prompt 缺省逐字锁 | 「无原子则逐字不变」设计 + 既有锁定测试照跑作为回归证明 |
| 证据原子数据稀缺（v4qa 0 条） | 有则增强无则不变；D-5 用 M2 教材或临时造 2 条绑定验证增强路径，验后清理 |
| 先修反查不到 | 跳过该先修（不编造），notes 如实 |

### 时间线与段间验收点

D-0（0.5d）→ D-1（1d，**验收点 ①**：核验管线标定）→ D-2（1.5–2d，**验收点 ②**：讲义前后对照）→ D-3（1–1.5d）→ D-4（1d）→ D-5（1d，**验收点 ③**：三指标对照表 + Hermes 预验收）。合计约 5–6 个工作日。

## 六、验证（每项都过才交 Hermes）

1. `npm run check` exit 0 + `npm run test` 全绿（新增：生成校验拒收缺件结构、A1 判分确定性、错题 → `practice-wrong` FSRS upsert 幂等、配额 503 不静默、`fsrsEnabled=false` 不建条目沿用；DeepSeek adapter：无 key 明确报错、`intensity` 参数映射、遥测字段；跳转匹配纯函数：命中/排除自身/去重/上限；M6-D 加：页码引用核验纯函数、引用失配标注路径；UI 热修按走查断言）。
2. prisma migration 新增两张表；`migrate status` 干净。
3. M6-0 探针证据：四配置矩阵的 fact-error/延迟/成本表落 design-qa，默认配置据此定。
4. 真实链路走查（v4qa 教材 + 真实模型）：生成练习题（页码溯源可点对原文）→ 作答（对/错各半）→ 错题中心 Clew 线出现「练习错题」源 → 只练错题 → 重学入口直达 → 跨 KP 跳转 chip 命中与不命中两态 → 明暗 × 1440/390 + console 0。
5. 既有行为回归：M5 复习链路（自测 → 今日复习 → 打分）语义不变；配额既有六维度不受影响；M6-D 改造后 `chat-scope` 缺省路径输出与批 3 锁定测试的兼容性按「上下文加宽只增不删」原则处理（缺省依据范围语义不变，加宽的是可用证据面）。
6. M6-D 质量证据：样本 KP 前后对比三指标（结构完整性 / 页码引用抽检 / 盲评打分）落 design-qa 证据节。
7. 文档：design-qa 证据节 + PROJECT_STATE + AGENTS（若边界表述变化）。
