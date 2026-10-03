# ZCODE-M4: 三视图派生（初学/复习/备考）+ 知识图谱（纯 SVG）+ 多模型接入

日期：2026-10-02。执行者：Zcode。验收：Nur（Hermes 预验收）。

**状态：已完成 2026-10-03；Hermes 预验收复核通过 2026-10-04，等待终审合并（执行者证据：`npm run test` 490/490、`npm run check` exit 0、无 migration 新增；桩集成验证与浏览器走查全通过——见 `design-qa.md`「ZCODE-M4」节；预验收独立复跑门槛 + 独立桩复验 + 独立浏览器复走证据见同节末「预验收复核（Hermes，2026-10-04）」）。**
真相源优先级（高→低）：`docs/RESTRUCTURE_PLAN.md` > `docs/CLEW_ARCHITECTURE_CONFIRMATION.md` > `docs/CLEW_RESOURCES_RESEARCH.md` > `docs/HI_DOC_PLAN.md` > `docs/DESIGN_V3.md` > `docs/PROJECT_STATE.md`。AGENTS.md 若有滞后表述，本主线以本任务书与上述真相源为准。

---

## 任务总览

三个阶段（无 Phase 0：体验补丁验收后无已知遗留，本期直接三阶段）：

| 阶段 | 内容 |
|------|------|
| Phase 1 | 三视图派生：同一讲义确定性派生「初学（完整）/ 复习（折叠自测答案）/ 备考（压缩要点）」——**零模型调用、不重新生成事实**（知纲模式） |
| Phase 2 | 章级知识图谱：纯 SVG 只读关系网（先修边 + 术语共享边），层级布局确定性，点击跳转 KP——**不引入任何图形库** |
| Phase 3 | 多模型接入：`ClewModelConfig` 预留接口落地——任务级 env 解析 + OpenAI 兼容通用传输层 + 明确报错不静默回落 |

依据：`RESTRUCTURE_PLAN.md` §四「ZCODE-M4（后续）：三视图派生 + 知识图谱（纯 SVG）+ 多模型接入」；`CLEW_RESOURCES_RESEARCH.md` §知纲（三视图 = 初学/复习/备考，P2 做）、§知识图谱工具（纯 SVG，P3 做）、§七（视图派生选三视图、知识图谱选纯 SVG）；`CLEW_ARCHITECTURE_CONFIRMATION.md` §六（多模型方案与任务级映射预留）。

### 执行方式（给 Zcode）

1. 完整阅读本任务书 + 下方必读清单（先读文档、再读代码，全部读完再动手）。
2. 按 Phase 1 → 3 顺序执行，不越期、不提前做 M5 内容（见「下一步预告」）。
3. 每个 Phase 完成后跑窄验证（`npx tsc --noEmit` + 本阶段新增测试）。
4. 全部完成后跑全量 `npm run test` + `npm run check`，按「报告格式」输出。

### 必读清单（按序）

1. 本任务书（全文）。
2. `docs/RESTRUCTURE_PLAN.md`（§已定案决策汇总、§四 实施路径的 M4 行、§五 边界与铁律）。
3. `docs/CLEW_ARCHITECTURE_CONFIRMATION.md`（§六 多模型接入方案——本期把「预留」变成「落地」；§七 任务书滚动惯例）。
4. `docs/CLEW_RESOURCES_RESEARCH.md`（§一.2 知纲三视图与「不重新生成事实」原则；§五.2 知识图谱工具选择；§六 综合推荐）。
5. `docs/ZCODE-M3-unified-state.md`（前置：统一事件层、学习页现状、任务书与验收惯例；本任务书不做数据库变更，M3 契约继续保持）。
6. `design-qa.md` 的「ZCODE-M3」节 + 「体验补丁（竖向脊柱 + 评自测 + 讲解风格）」节（当前学习页 UI 基线与最新交互）。
7. 代码：`src/lib/clew/lesson-heuristic.ts`（讲义小节解析与格式，三视图派生的解析基座）、`src/components/clew-study.tsx` + `src/components/clew.module.css`（学习页与样式）、`src/components/clew-highlights.tsx`（划重点层的重锚机制）、`src/lib/clew/providers/`（全部 7 个文件：多模型改造的现场）、`src/lib/clew/{extraction,lesson,chat,note}-provider.ts`（四个任务工厂）、`src/lib/clew/compiler-server.ts`（编译路径的模型获取）、`src/types/clew.ts`（KP/讲义类型）、`tests/payment-service.test.ts`（隔离 SQLite 测试模式，本期新测试不需要但保持风格一致）。

## 前置状态（2026-10-02 验收基线）

- ZCODE-M1 + M2 + M3 + 体验补丁全部改动在工作区、已验收、**未提交**；`npm run test` **466/466**、`npm run check` exit 0（lint 0 error）。
- 最后一次 migration：`20261001172813_zcode_m3_unified_events`（dev.db 已应用）。**本任务书无 schema 变更、无 migration**（三视图与图谱均为按需派生，不落库；多模型为服务端配置解析）。若实现中发现确需建表，先停下报告，不要自行加模型。
- 本地验证账户：`m2qa@ariadne.test`（pro 档；密码见 `design-qa.md` ZCODE-M2 节，仅 dev.db 本地）。走查教材：`f650452b-eadd-4504-8102-a98da36f728b`（ZCODE-M2 E2E 教材，3 章；第 1 章 3 个知识点 `cmuprmns7000l5epxg7dmdx95` / `cmuprmns8000m5epxbr12r1gq` / `cmuprmns8000n5epx1br2dnro`；第一个知识点已有模型生成的讲义，含 3 道带参考答案的自测题）。`m2-qa.pdf`（无文件的种子数据）不要用。
- 依赖：全部已装；**本期不新增任何依赖**（纯 SVG 手写，图表库/图形库/D3/Cytoscape 一律不引入）。

## 已定案（勿改动 / 请遵循）

- F1–F3、L1–L5、S1–S2、B1 决策继续有效；M1/M2/M3 已验收的行为契约（SSE 事件形状、会话 API、compile 契约、统一事件流）**只增不改**。
- 视觉基线 = 设计系统 v3（暖象牙纸底 / 宋体标题 / 朱砂 + 石板蓝 / 方角 / 单主列）。本期新 UI 一律复用既有 class 语言（panelHead / 分段控件 / ghostButton / panel 边框），不新造视觉语言。
- Clew 生成物按通用 AI 产品方式呈现，**不挂**官方课证据分级（可关联/帮助理解/不可直接等同只属于官方课）。
- localStorage 新键沿用 `nur-learn:` 前缀。
- API key 只在服务端 env 读取；`describeClewModel` 产物（`{provider}:{model}`）是事件与 notes 里如实标注生成来源的唯一渠道，不得省略。
- 知纲三条纪律（本期骨架）：① 三种消费形态（讲义全文/三视图/图谱）共享同一事实基础，**不分别生成事实**；② 关系/派生结果必须经程序校验（自环丢弃、去重、环检测），不信任未校验输出；③ 图谱只读（不支持拖节点、手动加删边）。

## 范围说明（防误解，重要）

- **三视图是「确定性派生」不是「三次生成」**：切换视图零模型调用、零网络请求、零 token 消耗；禁止把「派生」实现为模型改写。语义分级以本任务书 §1.1 的规则表为准（比知纲的「折叠推导」做了本土化收窄：我们的讲义没有长推导块，折叠语义落在自测答案上；后续若要更细的折叠粒度另立任务）。
- **知识图谱本期 = 章级**（当前章的知识点关系网）。全书级图谱、跨章关系、导入图谱、Cytoscape/D3 均不在本期。
- **多模型本期 = 服务端 env 层**：不做用户级模型偏好（`UserModelPreference` 继续预留）、不做模型选择 UI、不做会员档位×模型映射。落地范围 = `dashscope` + `openai-compatible` 两个 provider id 真实可用（后者覆盖 DeepSeek/Kimi/智谱/本地 Ollama 等一切 OpenAI 兼容端点）；`deepseek | kimi | zhipu` 保留在类型 union 里但运行时**明确报错**（提示改用 openai-compatible + 对应 baseURL），绝不静默回落。
- **「练/复」功能面（复查清单、FSRS 调度、错题中心 Clew 线聚合）不在本期**，进 M5。

---

## Phase 1: 三视图派生（讲义视图 · 知纲模式）

> 用户价值：初学看完整版；复习时讲义自动折叠参考答案，先回忆再核对（配合既有「自测」面板）；考前只看压缩要点。同一份事实，三种消费形态。

### 1.1 派生规则（确定性，逐条实现，不得发挥）

新增 `src/lib/clew/lesson-variants.ts`（**纯函数、client-safe**：可被客户端组件直接 import，不写 `import "server-only"`）：

```typescript
export type ClewLessonVariant = "full" | "review" | "exam";
export const CLEW_LESSON_VARIANTS: readonly ClewLessonVariant[] = ["full", "review", "exam"];
export const CLEW_LESSON_VARIANT_LABELS: Record<ClewLessonVariant, string> = {
  full: "初学 · 完整版",
  review: "复习 · 折叠自测答案",
  exam: "备考 · 要点压缩",
};
export function deriveClewLessonVariant(
  markdown: string,
  variant: ClewLessonVariant,
): { contentMd: string; note: string };
```

| 视图 | 规则（仅作用于讲义 markdown；页首引用块与「定义/要点/易错点」不受影响，除 exam 的定义截句）| note 文案 |
|------|------|------|
| `full` | 原样返回；`note = ""` | 无 |
| `review` | **仅在「自测题」小节内**：① 整行以「参考答案」开头（允许缩进与 `**` 包裹）→ 整行删除；② 行内含「参考答案」（题干行内联答案形态）→ 删除该行中「参考答案」起至行尾的片段（题干保留） | `复习视图：保留题干、折叠参考答案——在下方「自测」面板回忆作答后核对（同一份讲义派生，未重新生成）。` |
| `exam` | ① 删除整个「自测题」小节（含小节标题行）；② 「定义」小节内所有非空行按行截取首句（到第一个「。」含；无「。」整行保留）；③ 「要点」「易错点」原样保留 | `备考视图：由同一讲义压缩派生（定义保留首句、自测题移到下方「自测」面板），未重新生成事实。` |

实现要求：
- 复用**既有**小节解析：从 `lesson-heuristic.ts` 导出既有私有函数 `collectLessonSectionBodies`（仅加 `export`，不改行为），`lesson-variants.ts` 基于它定位小节与行号范围后做行走廊变换；**不允许复制粘贴一套新的解析逻辑**。
- 变换输出仍是 markdown 字符串，直接交给既有 `ClewMarkdown` 渲染；不得改动渲染器。
- 幂等：同一 (markdown, variant) 多次派生结果逐字节相同。
- 试卷类边界：`review` 对「没有参考答案行的自测题」（启发式无答案形态）是恒等变换，note 不变——如实即可，不补答案。

### 1.2 类型与状态

- `src/types/clew.ts` 不新增（`ClewLessonVariant` 定义在 `lesson-variants.ts`；如更符合仓库习惯可放 types 并 re-export，二选一，报告里说明）。
- 学习页 localStorage 键：`nur-learn:clew-lesson-view`（`"full" | "review" | "exam"`，默认 `"full"`；读写沿既有 try/catch 惯例，首渲染用默认值避免 hydration mismatch，挂载后读实际值）。
- **自测面板始终从完整讲义解析**（`parseClewLessonSelfTest(lesson.contentMd)` 不变）；视图只影响讲义正文的显示文本。
- 生成中（`generating`）与流式草稿预览不受视图影响；视图切换控件在生成中禁用。

### 1.3 UI（`src/components/clew-study.tsx` + `clew.module.css`）

- 讲义面板 `panelHead` 行内（h2 与生成信息之后）加三档分段控件：复用 `studyModeToggle` 的既有视觉语言（新增等价 class，如 `lessonVariantToggle`，`aria-pressed`，文案用 `CLEW_LESSON_VARIANT_LABELS` 的简称：初学 / 复习 / 备考）。
- 讲义正文渲染改为：`<ClewMarkdown key={`${lesson.generatedAt}:${variant}`} markdown={deriveClewLessonVariant(lesson.contentMd, variant).contentMd} />`；note 以小字行显示在正文上方（class `lessonVariantNote`，包在 `aria-live="polite"` 容器中以便切换时播报）。
- 划重点重锚（`ClewHighlightLayer`）：新增可选 prop `bodyVariant?: string`，并入既有 `bodyVersion` 计算（`regenerating ? "draft" : `${lessonGeneratedAt ?? "empty"}:${bodyVariant ?? "full"}``），使视图切换触发重画。**行为契约**：在 review/exam 视图中被隐藏文本上的划线定位不到时，如实进入既有「未定位」列表（M5 既有行为，不伪造位置）；切回初学视图后重新定位恢复显示；划线数据本身不因视图切换增删。
- 交互零请求：切换视图不得触发任何 fetch/SSE（验收会检查网络）。

### 1.4 测试 `tests/clew-lesson-variants.test.ts`（新增，纯函数）

fixture 用两种真实形态：① 模型讲义形态（`## 定义/## 要点/## 易错点/## 自测题` + `   参考答案：…`）；② 启发式讲义形态（`buildHeuristicLesson` 产出）。断言：
- `full` 恒等（逐字节）；
- `review` 仅删自测题内答案（整行/行内两种形态各一条）；其他小节即使含「参考答案」字样也不动；题干与答案在面板解析（`parseClewLessonSelfTest(原讲义)`）中不受影响；
- `exam`：自测题整节（含标题）消失；定义截首句（含：无「。」整行保留、多个句号只到第一个、列表行同样截）；要点/易错点逐行不变；
- 幂等；note 文案存在；页首引用块（`>` 行）保留。

**Phase 1 验收**：`npx tsc --noEmit` 通过 + 新测试全绿；学习页实测三档切换即时生效、零网络请求、刷新后保持选择；console 0 错误。

---

## Phase 2: 章级知识图谱（纯 SVG · 只读）

> 用户价值：一眼看清本章知识点的先修依赖与术语关联，点击即跳转对应 KP 学习页。知纲纪律：关系必须程序校验；只读浏览；零图形库依赖。

### 2.1 数据源（零 schema、零新增查询）

图谱输入 = 学习页 `ClewChapterStudyView.knowledgePoints`（`ClewKnowledgePointStudySummary = ClewKnowledgePointView & { hasLesson }`，**已含** `id/order/title/sourcePage/keyTerms/prerequisites/loopProfileId`）。**透传预核完毕**：`src/lib/clew/study.ts` 的 `getClewChapterStudy` 经 `src/lib/clew/chapters.ts` 的 `toKnowledgePointView` 产出 summary（`keyTerms`/`prerequisites` 已做 `string[]` 过滤）——**零新增查询、零读取层改动**。

### 2.2 构建器与布局 `src/lib/clew/knowledge-graph.ts`（新增，纯函数、client-safe）

```typescript
export type ClewGraphEdgeKind = "prerequisite" | "term";
export type ClewGraphEdge = {
  from: string; to: string; kind: ClewGraphEdgeKind;
  sharedTerms?: string[];        // 仅 term 边
};
export type ClewGraphStats = {
  prerequisiteEdges: number; termEdges: number;
  unmatchedPrerequisites: number;   // 先修标题在同章匹配不到 → 如实计数并忽略
  droppedSelfEdges: number; droppedDuplicateEdges: number; droppedCycleEdges: number;
};
export function buildClewKpGraph(kps: readonly ClewGraphNodeInput[]): {
  nodes: ClewGraphNode[]; edges: ClewGraphEdge[]; stats: ClewGraphStats;
};
export function layoutClewKpGraph(graph): {
  width: number; height: number; nodes: (ClewGraphNode & { x: number; y: number })[]; edges: ...;
};
```

构建规则（程序校验纪律，逐条实现）：
- **先修边**：`kp.prerequisites` 里的标题在**同章**按 `trim` 后全等匹配到另一 KP → 边 `prereq → kp`（kind=prerequisite）；匹配不到 → `unmatchedPrerequisites += 1`（忽略，不猜）。
- **术语边**：两 KP 的 `keyTerms` 交集非空（trim、去空串后比较，大小写敏感）→ 无向邻接对出边（去重为一条），`sharedTerms` 记录交集内容；无交集不出边。
- **自环丢弃、同对同 kind 去重**（计数进 stats）；同对既有先修边又有术语边 → 两条都保留（语义不同）。
- **环检测**：对先修边做 DFS 三色（白/灰/黑）环检测（与知纲 `learning-order.ts` 同一纪律，2026-10-02 源码核实）；破环按确定性最弱规则：删除该环中 `to.order` 最大的先修边，并列时删 `from.order` 最大的，再并列取 `from.id` 字典序最小者——保证同输入必得同输出；每次删除计数进 `droppedCycleEdges`，保证层级布局恒可终止。
- 输出次序稳定：nodes 按 `order` 升序；edges 按 `(from.order, to.order, kind)` 排序；同输入必同输出。

布局规则（确定性，不引入力导向）：
- 先修边最长路径分层（layer 0 = 无先修者），同层按 `order` 升序；`x = 80 + layer * 220`，`y = 60 + indexInLayer * 96`；
- `width = max(560, (最大层号+1) * 220 + 160)`，`height = max(280, 最大层内节点数 * 96 + 120)`；
- 渲染用 `viewBox` + `width:100%` 自适应（390 视口无横向溢出）。

### 2.3 组件 `src/components/clew-graph.tsx`（新增，纯展示、无状态）

- `section`（`panelHead` 风格）标题「知识图谱」，挂在学习页 `studyContentCol` 中 `ClewNotePanel` 之后、`footNote` 之前。
- SVG：节点 = 圆点 + 序号 + 标题（截断省略）；当前 KP 加墨色描边与加粗；已有讲义实心、未生成讲义描边；先修边 = 实线 + 箭头（`marker`），术语边 = 虚线，边上可带共享术语数；hover 高亮节点（CSS，无 JS 状态）。
- 节点即 `next/link` → `?kp={id}`（复用学习页既有 URL 形态）；键盘可聚焦（SVG 内 `<a>`）；`aria-label` 含「知识点 {title}，先修 {n} 条，术语关联 {m} 条」。
- 可访问性备份：`figcaption` 一行关系摘要 +（可视隐藏的）关系 `<ul>`（「A 先修于 B」「C 与 D 共享术语：…」）。
- 诚实行（有则显示）：`{unmatchedPrerequisites > 0 && 「N 条先修引用未匹配到同章知识点，已忽略」}{droppedCycleEdges > 0 && 「已删除 N 条成环先修边」}`。
- 空态：本章知识点 < 2 → 一行说明（`本章只有 N 个知识点，暂无可视化关系。`），不渲染 SVG 空框。

### 2.4 测试 `tests/clew-kp-graph.test.ts`（新增，纯函数）

- 先修匹配（trim/全等/未匹配计数）；自环、重复边、环删除计数；术语交集（多词、空串过滤、无交集）；
- 布局：分层正确（无先修者 layer 0）、坐标均为有限数、确定性（同输入两次 deepEqual）、单节点/空数组不抛错；
- stats 与 edges 数量自洽。

**Phase 2 验收**：新测试全绿；学习页走查（第 1 章 3 个 KP）：图谱渲染、点击节点跳转、诚实行、390 无横向溢出、console 0 错误。

---

## Phase 3: 多模型接入（`ClewModelConfig` 预留接口落地）

> 目标：目录解析/萃取/讲义/对话/笔记五类任务可分别指向任意 OpenAI 兼容端点（DashScope / DeepSeek / Kimi / 智谱 / 本地 Ollama…），全部通过服务端 env 配置；默认行为（DashScope qwen3.7-plus）分毫不变；配置错误明确报错，绝不静默回落。

### 3.1 配置解析 `src/lib/clew/providers/model-config.ts`（新增，server-only）

```typescript
export type ClewModelProviderId = "dashscope" | "openai-compatible"; // 类型 union 保留 deepseek|kimi|zhipu 成员但运行时见下
export type ClewProviderTask = "toc" | "extraction" | "lesson" | "chat" | "note";
export type ResolvedClewModelConfig = {
  provider: string; model: string; apiKey: string; baseURL: string; task: ClewProviderTask;
};
export function resolveClewTaskModel(task: ClewProviderTask): ResolvedClewModelConfig; // 未实现 provider → 抛 ClewProviderConfigError
export function isClewTaskConfigured(task: ClewProviderTask): boolean;               // key+model 齐备
```

环境变量与优先级（**精确**，逐条实现）：

| 维度 | 任务级 | 全局 | 缺省 |
|------|--------|------|------|
| provider | `CLEW_{TASK}_PROVIDER`（TASK ∈ `EXTRACT`/`LESSON`/`CHAT`/`NOTE`/`TOC`；其中 `CLEW_EXTRACT_PROVIDER`、`CLEW_TOC_PROVIDER` 为既有变量，继续生效） | `CLEW_MODEL_PROVIDER`（新增） | `dashscope` |
| model | `CLEW_{TASK}_MODEL`（`CLEW_EXTRACT_MODEL`/`CLEW_CHAT_MODEL`/`CLEW_LESSON_MODEL`/`CLEW_NOTE_MODEL`/`CLEW_TOC_MODEL` 均既有，继续生效） | `CLEW_MODEL`（既有） | `qwen3.7-plus` |
| baseURL | `CLEW_{TASK}_BASE_URL`（新增） | `CLEW_MODEL_BASE_URL`（新增） | provider 默认（dashscope = compatible-mode；openai-compatible = 必填） |
| apiKey | `CLEW_{TASK}_API_KEY`（新增） | — | dashscope → `DASHSCOPE_API_KEY`（既有）；openai-compatible → `CLEW_MODEL_API_KEY`（新增） |

- provider 取值：`dashscope`、`openai-compatible` 真实可用；`deepseek`/`kimi`/`zhipu`（及任何未实现值）→ **抛 `ClewProviderConfigError`**，消息含「尚未实现；可用 openai-compatible + 对应 baseURL」并附下方**已核实**示例——不静默回落、不猜测。
- baseURL 安全规则：`dashscope` → 必须 `https` 且 `*.aliyuncs.com`（沿用既有校验）；`openai-compatible` → 必须 `https`，**例外**允许 loopback（`localhost` / `127.0.0.1` / `[::1]` 可用 http，供本地 Ollama 与验证桩）；其余（http 外网）→ 报错。
- baseURL 形态容错（已核实各家真实写法）：可能不带路径（`https://api.deepseek.com`）、带 `/v1`（`https://api.moonshot.cn/v1`）、带多段前缀（`https://open.bigmodel.cn/api/paas/v4`）或带尾斜杠（Ollama 文档示例 `http://localhost:11434/v1/`）——`resolveChatCompletionsUrl` 必须对这些形态都正确拼出 `…/chat/completions`（既有实现已按「已含端点则不重复拼接 + 去尾斜杠」处理，保持该行为并加测试锁定）。
- loopback（Ollama）的 API key：本地服务**忽略**该值（官方文档明示「required but ignored」）——解析器只做非空校验、不做特殊分支；报错/文档中提示「本地 Ollama 可填任意占位值，如 `ollama`」。
- 已核实端点速查（2026-10-02，来源：各家官方文档）：DeepSeek `https://api.deepseek.com`（OpenAI 格式；带 `/v1` 亦可）｜Kimi/Moonshot `https://api.moonshot.cn/v1`｜智谱 GLM `https://open.bigmodel.cn/api/paas/v4`（必须带全路径，只写域名会 404）｜Ollama 本地 `http://localhost:11434/v1`（云端 `https://ollama.com/v1`）。
- `providers/dashscope.ts` 保留为「默认任务配置的门面」：`getClewModel`/`isClewModelConfigured`/`describeClewModel` 语义改为基于 `resolveClewTaskModel`（默认 task=lesson）；新增 `getClewModelForTask(task)`（真实实现，替换 `getModelForTask` 的 `void task` 空壳）；`agent-loop`/`compiler-server` 的模型获取改走任务解析（compiler 用 `lesson`）。

### 3.2 通用传输层 `src/lib/clew/providers/chat-transport.ts`（由 `dashscope-stream.ts` 泛化改名）

- `streamChatCompletion(options: { config: ResolvedClewModelConfig; messages; onDelta; temperature; maxOutputTokens; timeoutMs })`：即既有实现的泛化（SSE 解析逻辑逐字保留）；请求体构建中 **`enable_thinking: false` 仅在 provider === "dashscope" 时注入**（已核实：该参数非 OpenAI 标准参数，属 DashScope/百炼扩展；Node 侧作为随请求体的顶层参数传入，现有实现即如此，不得改放别处）。
- 已知边界（2026-10-02 核实于阿里云百炼文档）：个别 DashScope 直供模型强制思考、传 `enable_thinking: false` 会直接 400——此类配置不匹配按既有明确报错路径原样透出，**不自动改装、不重试猜测**；默认 `qwen3.7-plus` 支持关闭思考，行为与现状一致。
- 新增 `completeChatJson(options)`：非流式 `chat/completions`（供萃取/目录这类 JSON 任务复用；现有 adapter 若已有等价私有实现则搬迁，不重复造）。
- URL 组装：`resolveChatCompletionsUrl(config)`（由 `resolveDashScopeChatCompletionsUrl` 泛化；dashscope 主机校验仅对 dashscope 生效）。原 `dashscope-stream.ts` 文件与导出一并更新/移除，**全仓 grep 更新引用**（含既有测试）。
- 五个 adapter（`dashscope-{toc,extract,lesson,chat,note}.ts`）改为接收 `ResolvedClewModelConfig`（签名里已有 apiKey/model/baseUrl 形态，改造量小）；`createClew*ProviderFromEnv` 全部改为「resolve 配置 → 校验 → 动态 import adapter」。`provider.id` 字段如实填写实际 provider（用于 notes 与事件里的 `{provider}:{model}`）。
- 配额记账（`recordServerUsage`）与事件日志（`clew_*` eventLog）逻辑不变。

### 3.3 测试与验证

- `tests/clew-model-config.test.ts`（新增，纯函数，传 env 对象进纯解析函数或 process.env 临时覆盖后立即恢复）：
  - 优先级矩阵：任务级 provider 覆盖全局；全局覆盖缺省；model/baseURL/apiKey 同理；legacy 变量（`CLEW_EXTRACT_PROVIDER` 等）继续生效；
  - `deepseek`（未实现）→ 抛错且消息含指引；http 外网 baseURL → 抛错；loopback http → 通过；dashscope 非 aliyuncs 主机 → 抛错；
  - 请求体构建纯函数：`enable_thinking` 仅 dashscope。
- **桩服务器集成验证**（不进仓库，脚本放 `/tmp`）：纯 `node:http` 起一个 OpenAI 兼容桩（`/v1/chat/completions`，支持 stream SSE 与 JSON 两种应答，返回一份合法讲义 markdown）；用进程内 env 覆盖直调 `createClewLessonProviderFromEnv()` 走通生成（`CLEW_LESSON_PROVIDER=openai-compatible CLEW_LESSON_BASE_URL=http://127.0.0.1:<port>/v1 CLEW_MODEL_API_KEY=stub`），断言 `provider.id === "openai-compatible"`、SSE 增量与最终文本正确；再验证 `CLEW_LESSON_PROVIDER=deepseek` 明确报错。**不得修改 `.env.local`**（全程进程内 env 覆盖；`.env.local` 里现有真实 key 一行都不动）。
- 回归：无任何新 env 时，浏览器真实 DashScope 生成讲义照常（走查）；`describeClewModel` 输出格式仍为 `{provider}:{model}`。

**Phase 3 验收**：新测试全绿；桩集成验证通过（原始输出留档）；默认路径浏览器回归通过。

---

## 学习页走查（三阶段合并，最终执行）

1. 打开 `f650452b` 第 1 章第一个知识点（已有讲义）：三档视图切换（初学/复习/备考）逐档核对 §1.1 规则产物（尤其：复习视图自测题只剩题干、备考视图无自测题小节且定义只剩首句）；**打开 DevTools network，确认切换零请求**；刷新后保持上次选择。
2. 划重点交错验证：初学视图划线一段答案文字 → 切复习视图 → 该划线进入「未定位」如实列表 → 切回初学 → 恢复显示；划线数据无增删。
3. 知识图谱：确认渲染（3 个节点、先修/术语边与 stats 自洽）→ 点击节点跳转到对应 KP → 390×844 无横向溢出（`scrollWidth === clientWidth`）。
4. 自测面板不受视图影响（切换后 3 道题标记状态保持）。
5. console 0 错误；截图 `docs/design-references/zcode-m4-*.png`（≥4 张：三档视图各一 + 图谱 + 390）。

## 边界（违反即返工）

- **不提交、不 push**：全部改动留在工作区等待审阅；`.zcode/` 与 `.zcodeignore` 不提交。
- 不改 `src/content/`（课程真相）；三视图/图谱/多模型都是 Clew 侧派生与配置，不得写任何 learn 课程 truth。
- 不新增依赖（图形库尤其禁止）；不改数据库 schema（如确需，先停下报告）。
- 三视图=纯派生：禁止任何形式的模型调用；图谱=只读：禁止拖拽/编辑交互。
- 多模型：禁止静默回落（未实现 provider、http 外网 baseURL 必须报错）；key 绝不出现在日志、notes、事件 payload、客户端 bundle；`enable_thinking` 仅 dashscope。
- 不动 M1–M3 已验收契约：SSE 事件形状、会话 API、compile 契约、统一事件流、体验补丁的脊柱/自测/风格选择行为。
- UI 保持 v3 tokens；新增控件复用既有视觉语言，不做装饰动效。

## 验证（最终门槛）

- [ ] `npm run lint` 0 error + `npx tsc --noEmit` 通过
- [ ] `npm run test` 全绿（466 + 本任务书新增；报告实际计数）
- [ ] `npm run check` exit 0（lint + typecheck + build）
- [ ] 无 migration 新增（`npx prisma migrate status` 与基线一致）
- [ ] 桩集成验证原始输出留档（§3.3）
- [ ] 浏览器走查清单（上文 1–5）全部通过，console 0 错误
- [ ] 文档更新：`design-qa.md` 新增「ZCODE-M4」节（含截图索引与走查结论）；`docs/PROJECT_STATE.md` 更新进度与下一主线

## 报告格式（跑完后输出）

1. 完成清单（按 Phase，精确到文件与函数）。
2. 每阶段窄验证 + 最终全量验证的原始输出摘要（计数必须真实）。
3. 偏差说明（如有：范围、实现取舍、未完成项）。
4. 遗留/建议（如有）。
5. 本任务书状态改为「已完成 2026-10-XX，待验收」。

## 下一步预告

**ZCODE-M5（候选）**：「练/复」功能面 —— 自测「还需看」→ 复查清单与错题中心 Clew 线聚合、FSRS 调度接入（`fsrsEnabled` profile 兑现）、可配置闭环完整版剩余项（RESTRUCTURE §四 Phase 2：官方课 KP `loopProfileId`、学习页按 profile 动态渲染剩余环节）。部署上线准备（ICP + 商户号 + 生产密钥）并行推进。
