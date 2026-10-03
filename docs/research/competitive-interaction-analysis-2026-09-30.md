# 竞品交互分析报告 — Mentrix / DeepTutor / Notion AI / Hermes Desktop

日期：2026-09-30
目的：为 NUR LEARN 前端从「内容浏览壳」演化为「AI 桌面级学习平台」提供交互层依据。本报告只谈**交互模式**（空间关系、选中行为、进度可视化、导航壳），不复述视觉风格。
NUR LEARN 现状基线：Next.js 16 + React 19 + Tailwind v4 + CSS Modules；设计系统 v3（280px 左栏 + 暖象牙纸底 `#FAF9F5` + 宋体标题 + 全宽贴底 ⌘K + 朱砂 `#b7432f` / 石板蓝 `#17659a`）；Hi doc 八步路径（上传 → 目录识别 → 章节修正 → 知识点萃取 → 讲义+追问 → 划重点 → 学霸笔记 → 课题工作坊）。

---

## 1. 各产品核心交互模式

### 1.1 Mentrix（mentrix.cn，录路岛）

> 直接抓取受登录墙限制，以下结论来自 NUR LEARN 内部 `docs/HI_DOC_PLAN.md`（ Mentrix 镜像定案文档）+ 公开宣传材料的交叉验证。

- **流水线驱动的线性路径**：上传教材 → 目录识别 → 知识点萃取 → 讲义+AI 追问 → 划重点 → 学霸笔记 → 课题工作坊。每一步是上一步的产物，**不允许跳步**——这是「教材编译器」而非「文档阅读器」的思维方式。
- **流式进度即界面**：目录识别、知识点萃取、讲义生成全部走 SSE，进度文案（「识别目录 → 精读第 N/M 章 → 写入知识点」）本身就是交互主体，用户盯着流把书「编译」出来。等待被显性化为一种**可观察的工作过程**，而不是 spinner。
- **教材 ⇄ AI 的空间关系：上下串联，而非左右对照**：讲义是主画布，AI 追问嵌在讲义下方（Enter 发送、流式回答）；知识点列表在左、讲义在右的双栏只在「学习页」这一具体场景出现，全局上教材原文与 AI 并不强调同屏对照。
- **选中文本 → 三选**：划重点 / 批注 / AI 追问，是高亮菜单的固定三项，颜色、笔记、引用锚点入库（`HiDocHighlight.anchor`），学霸笔记反向聚合「本章讲义 + 追问 + 划重点」一键导出。
- **导航模式：步骤驱动 + 书架集合**：顶层是「书架」（教材集合 + 名额显示），进入一本教材后是线性的「八步路径」，不存在跨书的全局跳转面板。配额（每月 N 本）以显眼方式计入书架 UI，成为路径的一部分。

### 1.2 DeepTutor（HKUDS，39.7k★）

- **Book Engine = 多 Agent 活书编译器**：用户意图 + 知识库 → 五阶段管线（Ideation / Source exploration / Spine synthesis / Page planning / Block compilation）产出一本「活书」。**14 种类型化块**（text, callout, quiz, flash cards, code, figure, deep dive, animation, interactive, timeline, concept graph, section, user note, placeholder），每块有专属渲染器。交互的核心前提是「**块即介质**」——概念用 quiz、推导用 animation、过程用 interactive widget。
- **三栏阅读面**：`PageReader` 中左为章节大纲导航轨、中为类型化块流、**右为页内大纲 + Page Chat**。Page Chat 是关键——**对当前页**提问，回答以该页内容作为 grounding，不是全局 chatbot。
- **向导式创建 + 确认门槛**：`BookCreator` 是 intent → proposal → spine confirmation 三步向导，**确认 spine 才触发几十次 LLM 调用**，并在编辑器里实时显示每章成本估算——「在扣费前让你看见数字」。
- **实时编译可视化**：`BookProgressTimeline` 通过 per-book WebSocket 把编译事件流广播给所有客户端，编译可以跨刷新续存，进度本身就是页面内容。
- **统一 Chat Workspace 六模式**：Chat / Deep Solve / Quiz Generation / Deep Research / Math Animator / Visualize **共享同一线程**，从聊天升级到多 Agent 解题不丢上下文；@ 知识点 / @ 题库把过去的产物重新注入对话。

### 1.3 Notion AI

- **AI 三态触发**：① 高亮文本 → 「Ask AI」气泡菜单（选中即问）；② 斜杠 `/AI` 唤出 AI 块；③ 新行空格直接提示。三者分别对应**改旧 / 插入 / 从零写**三种意图，**触发点决定上下文范围**。
- **Agent 对话的双模切换**：右下 Agent 头像点开，对话可在**侧边栏**和**浮动窗**两种模式间切换。侧边栏适合长任务（看文档 + 看回答对照），浮动适合快问快答。**用户自选，不是系统替你决定**。
- **块级编辑 + 块级 AI 产物**：AI 输出作为**块**插入文档（摘要块、待办块、表格块），与人工编辑的块等价；「Interactive table in chat」把 Agent 找到的数据直接在对话内渲染成可交互表格，**无需跳转数据库页**。
- **权限即边界**：Agent「拥有和你一样的权限」，看不到的页面它也看不到——这条不是 UI 细节，是建立用户信任的交互契约。
- **对话记录一等公民**：侧边栏 `🕘` 列出所有过往对话、按内容命名、可固定（pin）到顶，把 AI 对话从「一次性问答」升格为「可回访的工作资产」。

### 1.4 Hermes Desktop（自家产品）

- **持久 shell + 多会话并存**：右栏真实终端 `Ctrl+`` 唤出、可叠加多个、**关闭面板不杀进程**，scrollback 与运行中任务保持。这本质是把「上下文」从「窗口可见性」解耦——看不见的也在跑。
- **右预览轨（preview rail）**：聊天主区不动，**网页/文件/工具输出**在右栏并排渲染，让用户在「与 Agent 对话」和「查看 Agent 产物」之间不分心切换。
- **会话时间轴（timeline rail）**：长对话边缘一列标记，每个 prompt 一个点，hover 弹列表、点击直达——把**长对话本身**当成可导航的文档。
- **状态栏 = 系统控制面**：底部状态栏可自定义显示**context 用量仪表**（点击展开 token 分类构成）、YOLO 开关、模型、工作区等——把「AI 内部状态」显性化为常驻 UI 元素。
- **⌘K + 多面板 + 多窗口**：`⌘T` 新会话 tab、`⌘B` 左栏、`⌘J` 右栏、`⌘\` 换边、`⌘⇧N` 新窗口、会话可 pop-out 成独立窗口——**全键盘 + 面板可重组**，对标 IDE 而非聊天应用。
- **Composer 队列编辑**：上/下箭头召回历史，ESC 暂停队列、可逐条编辑/删除后再发——把「输入框」升级为「待执行队列」。

---

## 2. 可借鉴的交互模式清单

按对 NUR LEARN 的适配价值排序。

| # | 模式 | 来源 | 落地建议 |
|---|---|---|---|
| A1 | **Page Chat（对当前页/当前知识点提问，grounding 显式）** | DeepTutor | Hi doc 学习页的「讲解追问」升级为「**对当前 KP 提问**」——固定上下文、不偏移；Mentrix 已有雏形但绑定较松。 |
| A2 | **确认 spine 前的成本/目录预览** | DeepTutor | 目录识别后给出**可拖拽重排 + 章节合并**的 SpineEditor 雏形，确认才触发萃取。契合现有「章节修正」步骤，把确认门槛从「形式」变成「工作面」。 |
| A3 | **流式进度即内容**（不只是 spinner） | Mentrix + DeepTutor + Hermes | 知识点萃取、讲义生成、学霸笔记都沿用 SSE，但进度文案要落到**章节名/KP 名**（"精读第 3/12 章：藏象学说"），不是"加载中"。 |
| A4 | **AI 对话双模切换（侧边栏 / 浮动）** | Notion AI | 学习页内 NUR Agent 当前是嵌入式，建议增加「弹出为浮动窗」以便对照讲义同时滚动；课题工作坊默认侧边栏。 |
| A5 | **对话记录一等公民**（命名 + 固定 + 回访） | Notion AI | `HiDocConversation` 已在 schema，但 UI 上未给「我的所有对话」入口。在左栏或 ⌘K 里加「最近对话」组，按 KP/章节自动命名。 |
| A6 | **⌘K 真检索** | Hermes Desktop + Notion | 已在 R4 落地本地内存索引。下一步：⌘K 增加「**在教材内检索**」范围（按当前打开的教材过滤），并支持 `> ` 前缀进入命令模式（跳转八步、重新生成讲义、导出笔记）。 |
| A7 | **高亮 → 三选菜单（划重点 / 批注 / 追问）** | Mentrix + Notion | 现有 Hi doc 已规划，关键在**锚点**（`HiDocHighlight.anchor`）要存原文 pageStart/paragraph，便于学霸笔记回链原文。 |
| A8 | **右预览轨**（不抢主画布的并排预览） | Hermes Desktop | 学习页内增加可隐藏的右栏：**教材原文页**（PDF 渲染）与讲义并排。这是当前 v3「主画布 = 唯一主列」规则需要破的特例，理由：教材原文 = 用户必须核对的真源。 |
| A9 | **Session/Context 用量显性化** | Hermes Desktop | 配额已是 NUR LEARN 一等公民（每月 N 本），建议把「当前月已用名额 / 当前教材已生成讲义数 / 萃取消耗 token 估算」做成左栏底部的常驻 chip，对齐 Hermes 状态栏思路。 |
| A10 | **类型化块（quiz / flashcard / concept graph）** | DeepTutor | 中期引入：讲义内嵌 quiz 块（针对医学考点极合适——"以下哪项是肝郁气滞的主症"）、概念图块（脏腑关系）。**首版不引入全部 14 种**，只挑 3 种医学高价值：quiz / flashcard / concept-graph。 |
| A11 | **会话可 pop-out / 多面板键盘化** | Hermes Desktop | 暂缓，但对齐键盘流：`J/K` 在知识点列表移动、`E` 生成讲义、`N` 写批注、`⌘⇧F` 全文检索。 |
| A12 | **长会话时间轴** | Hermes Desktop | 暂缓，但对**学霸笔记的汇总过程**有意义：把「本章讲义 + 追问 + 划重点」的聚合渲染成一条时间轴，让用户看清笔记如何从原料生成。 |

---

## 3. 不适合 NUR LEARN 的模式及原因

| 模式 | 来源 | 不采用原因 |
|---|---|---|
| **完整 14 种活书块 + BookCreator 向导** | DeepTutor | NUR LEARN 的输入是**用户自带教材**（结构已定），不是「让 AI 写一本书」。DeepTutor 的五阶段编译管线对应的是「无中生有」场景，套用到教材学习会产生大量冗余确认。可借鉴 SpineEditor 但不需要 Ideation 阶段。 |
| **多 Agent 协作 / TutorBot / Skills 体系** | DeepTutor | 与 NUR LEARN 的「官方课证据分级 + 会员配额」体系冲突。多 Agent 引入不可控的 token 消耗路径，破坏配额的可预期性。 |
| **AI 块插入文档（块级 AI 产物可编辑）** | Notion AI | 学霸笔记、讲义在 NUR LEARN 里是**生成物**（再生成会覆盖），不是用户长期维护的文档。允许块级编辑会产生「AI 改的部分 / 用户改的部分」的合并复杂度。坚持「生成-覆盖」模型。 |
| **浮动对话窗为默认** | Notion AI | 学习场景需要长期对照讲义，浮动窗遮挡内容。浮动应作为可选，侧边栏/嵌入是默认。 |
| **持久 shell / 终端面板** | Hermes Desktop | NUR LEARN 不是开发者工具，引入终端会让医学用户困惑。可借「面板不杀进程」的思路（生成的讲义在用户切走时不丢失），但不借终端形态。 |
| **多窗口 / tab 多会话并行** | Hermes Desktop | 学习是**线性沉浸**活动，多会话并行违背认知节奏。医学学习强调专注，不做 tab 化。 |
| **YOLO 模式 / 跳过审批** | Hermes Desktop | NUR LEARN 的 AI 调用直接消耗会员配额，**每一次都必须可见、可确认**。YOLO 哲学在此不成立。 |
| **Agent 权限继承用户权限（跨页检索）** | Notion AI | NUR LEARN 的 Hi doc 数据全部私有挂 userId，**没有跨用户检索场景**，这条无从落地；且医学内容不应跨教材随意 RAG（混淆不同体系）。 |
| **composer 队列编辑** | Hermes Desktop | 追问通常是即兴的，队列化反而增加操作负担。NUR Agent 走「单发-流答」即可。 |

---

## 4. 建议的融合方向

### 4.1 总体取向

**以 Mentrix 的线性八步路径为骨（保产品结构不变），以 DeepTutor 的 Page Chat 和确认门槛为血肉（让每一步更扎实），以 Notion AI 的双模对话和对话记录为皮肤（让 AI 更贴身），以 Hermes Desktop 的状态显性化为神经（让配额/进度/上下文常驻可见）。**

视觉层继续走设计系统 v3（暖象牙 + 宋体标题 + 朱砂/石板蓝），不因借鉴任何一家改变。

### 4.2 空间关系：取 Mentrix 的「上下串联」+ Hermes 的「可选右栏」

- **默认布局**：保持 v3 的 280px 左栏 + 主画布，学习页内主画布 = 讲义 + 嵌入追问（Mentrix 模式）。
- **可选右栏**（Hermes preview rail 思路）：用户可一键呼出**教材原文 PDF 页**作为右栏对照，**关闭时不占空间**。这是对 v3「主画布唯一主列」规则的有限破坏——只在学习页内部，不影响壳。
- **不做三栏**（DeepTutor 模式）：NUR LEARN 的章节大纲已由左栏 280px 承担，再加右栏会挤压讲义到 600px 以下，医学讲义的长公式/表格排不开。

### 4.3 选中交互：取 Mentrix 三选 + Notion 的触发点设计

- 高亮 → 浮动气泡菜单三选：**划重点 / 批注 / 追问**。追问默认带当前 KP 上下文（DeepTutor Page Chat 模式），不让用户重述「我说的是这一段」。
- 批注锚点必须存原文 paragraph-level，学霸笔记导出时**回链原文页码**——这是医学学习「可追溯」的硬要求，DeepTutor 与 Mentrix 都做了，Notion 没做（它没有原文概念）。

### 4.4 进度可视化：三层各取一家

- **路径级**（教材 → 八步）：沿用 Mentrix 线性步骤条，已有。
- **教材级**（章节 → 知识点状态）：取 DeepTutor 的 `BookProgressTimeline` 思路，把萃取/讲义生成进度做成**可跨刷新续存**的时间轴，关页面再开不丢。
- **会话级**（AI 用量）：取 Hermes 状态栏，左栏底部常驻 chip 显示「本月名额 2/3 · 当前教材已消耗 ~12k tokens」。

### 4.5 导航壳：⌘K 升级为「教材内检索 + 命令」

- 现状 R4 ⌘K 已是全宽贴底 + 站内检索。下一迭代：
  - **范围切换**：全站 / 当前教材 / 当前章节（Tab 键循环）。
  - **命令模式**：`> ` 前缀触发命令（重新生成讲义 / 导出学霸笔记 / 跳转到下一步 / 切换讲义风格）。取 Hermes 命令面板 + Notion `/` 斜杠命令的混合。
- 左栏「最近学习」组下加「**最近对话**」子组（Notion 对话记录思路），按 KP 自动命名（"藏象学说·肺的追问"）。

### 4.6 类型化块的克制引入

不照搬 DeepTutor 14 种块。医学场景首版只引 3 种，且**只在讲义渲染层**做：

1. **Quiz 块**（考点自测）：讲义末尾嵌入 3–5 题，答错可一键追问。
2. **Flashcard 块**（术语记忆）：keyTerms 自动生成翻转卡。
3. **Concept graph 块**（脏腑/经络/方剂关系）：复用现有 SVG/Canvas 能力，**不引 D3 力导向图库**（v3 禁装饰动效原则下选静态布局）。

### 4.7 明确不做

- 不做多 Agent / Skills 体系（DeepTutor 路径）——违背配额可预期性。
- 不做终端面板（Hermes 路径）——用户群体不符。
- 不做块级 AI 可编辑文档（Notion 路径）——生成-覆盖模型已立。
- 不做多 tab 并行（Hermes 路径）——学习是线性沉浸。

---

## 5. 给前端的落地清单（按优先级）

| 优先级 | 改动 | 借鉴来源 | 涉及面 |
|---|---|---|---|
| P0 | 学习页追问固化为「对当前 KP 提问」+ 上下文 chip | DeepTutor Page Chat | `hi-doc-study.tsx` + `nur-agent-chat.tsx` |
| P0 | 目录识别后的 SpineEditor（可拖拽/合并章节，确认才萃取） | DeepTutor | `hi-doc-textbook.tsx` + `toc-recognition.ts` |
| P1 | AI 对话双模（嵌入 / 浮动窗切换） | Notion AI | `nur-agent-chat.tsx` |
| P1 | ⌘K 范围切换 + `>` 命令模式 | Hermes + Notion | `command-palette.tsx` + `search-index.ts` |
| P1 | 左栏底部常驻配额 chip（名额 + token 估算） | Hermes 状态栏 | `workspace-shell.tsx` |
| P2 | 学习页可选右栏（教材原文 PDF） | Hermes preview rail | `hi-doc-study.tsx` 局部破坏 v3 主列规则 |
| P2 | 「最近对话」左栏组（按 KP 命名） | Notion 对话记录 | `workspace-shell.tsx` + `/api/hidoc/conversations` |
| P3 | 讲义内嵌 Quiz / Flashcard / Concept-graph 三种块 | DeepTutor | `hi-doc-study.tsx` + 新渲染器组件 |
| P3 | 学霸笔记生成时间轴（原料 → 笔记可见化） | Hermes timeline rail | `hi-doc-note.tsx` |

---

## 附：信息来源

- Mentrix：`docs/HI_DOC_PLAN.md`（NUR LEARN 内部 Mentrix 镜像定案文档，2026-09-16）；mentrix.cn 公开首页（登录墙限制）。
- DeepTutor：GitHub `HKUDS/DeepTutor` v1.2.0 release notes（Book Engine 详细描述）、`assets/README/README_CN.md`、`docs.deeptutor.info/explore/book`（公开文档）、arXiv 2604.26962。
- Notion AI：Notion 官方帮助中心 `notion-agent`、`guides/notion-ai-for-docs`（中文版）。
- Hermes Desktop：Hermes 官方文档 `hermes-agent.nousresearch.com/docs/zh-Hans/user-guide/desktop`。
- NUR LEARN 现状：`docs/DESIGN_V3.md`、`docs/PROJECT_STATE.md`。
