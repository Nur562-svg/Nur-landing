# Hi doc × Codex 执行任务书（目标模式启动提示词）

用途：把下面「任务提示词」整段粘给 Codex（CLI `codex exec` 或桌面端目标模式）。
Codex 会自动读仓库 `AGENTS.md`；本文件与 `docs/HI_DOC_PLAN.md` 是它的两个必读件。

---

## 任务提示词（粘贴以下全文）

你在 NUR LEARN（/Users/nukeab/projects/Nur-landing，Next.js 16 App Router + React 19 + TS strict + Prisma + Tailwind v4/CSS Modules）实施新主线 **Hi doc**。

**开工前必读（按序，全部读完再动手）：**
1. 仓库 `AGENTS.md` — 产品边界、Tier 1–4 代码边界、设计与验证规则
2. `docs/HI_DOC_PLAN.md` — Hi doc 唯一实施真相源：§5.6 课题工作坊、§6 页面结构、§7 M6 行与其注释、§8 边界、§10 后置项
3. `prisma/schema.prisma` — 现有 HiDocTextbook/Chapter/KnowledgePoint/Lesson/Highlight/Note/Conversation 与四档会员
4. `src/lib/hidoc/`（尤其 `note.ts` + `note-provider.ts` + `providers/dashscope-note.ts` 的 SSE/兜底/记账模式、`chat.ts` 的对话编排与提问先落库、`highlights.ts` 的归属 404、`textbooks.ts` + `storage.ts` + `storage-key.ts` 的上传与磁盘隔离、`pdf-document.ts`/`pdf-text-layer.ts` 的文字层读取、`limits.ts` 的限额模式、`client-api.ts` 的客户端 SSE）— M6 全部复用这些模式

**优先级裁决（冲突时按此执行）：** `AGENTS.md` 的「Next Product Priority」一节写于 Hi doc 定案之前，其中「Do not ... server material store / 不要建服务器资料存储」等旧约束**已被用户 2026-09-16 的四条决定明确取代**（教材存服务器、名额当月制、Hi doc 替代我的资料、试点课免费——见 `docs/HI_DOC_PLAN.md` §0）。Hi doc 相关实现以 `docs/HI_DOC_PLAN.md` 为准，不受旧段落阻挡。AGENTS.md 其余全部边界（Tier 1–4、设计规则、验证要求）继续完全生效。

**本次目标：完成 M6（只做这一期，不越期：不做 M7 支付，不做 OCR/联网搜索）。**

前置状态（已完成并验收）：M0 四档会员迁移+官方课名额+首页三入口（`36e8efc`）、M1 上传/书架/当月名额（`2f41e98`）、M2 目录识别+章节修正（`1debd1a`）、M3 知识点萃取 SSE 带页码溯源（`93dfa6d`）、M4 学习页讲义+讲解追问（`285c3d1`）、M5 划重点/批注与学霸笔记（上一版任务书，`HiDocHighlight`/`HiDocNote`）。验证基线：lint 0 error / test 337 / `npm run check` 通过。

M6 验收（对应 `HI_DOC_PLAN.md` 分期表 M6「课题工作坊（替代「我的资料」）」与 §5.6）：

**A. 数据模型（Prisma 迁移，全部挂 userId 私有）**
- `HiDocWorkshop`：userId（Cascade）、title、note（可空）、时间戳；`@@index([userId, updatedAt])`
- `HiDocWorkshopFile`：workshopId（Cascade）、fileName、storageKey（复用 `hidoc/{userId}/…` 存储抽象与私有卷）、sizeBytes、pageCount、hasTextLayer、status（`uploaded | ready | failed`）、ocrStatus（M6 不做 OCR：如实存 `not-attempted`）、时间戳；`@@index([workshopId])`
- `HiDocConversation` 扩展：新增可空 `workshopId` 与 `@@unique([userId, workshopId])`，kpId 路径与其唯一约束保持不变（M4 数据不受影响）

**B. 材料接入（≤100 页短材料）**
- 允许：有文字层的 PDF、Markdown/纯文本（`.md/.markdown/.txt`）；单文件 ≤ **100 页**（PDF 按页数、文本按行数折算），字节上限沿用现有单文件上限
- 图片与无文字层 PDF：**明确拒绝**并给中文原因（OCR 后置，见计划 §10），不得假装修复、不得以占位内容冒充；上传即检测、不落库
- 全部走服务器存储、按 userId 隔离；工作坊材料**不占教材当月名额**，但需按档位限制工作坊数量与材料数（按既有四档模式实现，取值在实现时确定并写入 `docs/PROJECT_STATE.md`）
- 复用现有上传/解析路径（`textbooks.ts` 的 multipart 与校验、`pdf-text-layer.ts` 的文字层判定），文字层按需读取（可缓存到文件或库，但不得改写原文件）

**C. 检索材料答疑（SSE）**
- `POST /api/hidoc/workshops/[id]/chat`（thin adapter → `src/lib/hidoc/workshops.ts`）：以工作坊全部材料的文字层做**确定性关键词检索**（MVP 不引向量库），把命中的原文片段（带材料名与页码/行号）作为上下文，经 provider-neutral 适配器流式回答
- 检索不到内容时如实说明「材料里没有相关内容」，不得编造材料内容或页码；回答只依据材料片段与给定上下文
- 可只读关联该用户自己的教材知识点（仅本人数据、不写课程真相）；关联不到就如实不关联
- 联网搜索 M6 不做（后置）；无 key 时**明确报错**，不提供启发式假回答（与讲义/笔记的兜底策略不同，此处的兜底是「拒绝并说清」）
- 消息落库 `HiDocConversation`（workshopId 维度），提问先落库、失败不保存半截回答（复用 M4 契约）
- SSE 事件模式与 M4/M5 对齐：progress → delta → result/error

**D. 页面（`src/app/learn/hi-doc/`，thin adapter）**
- 学习页书架或首页加「课题工作坊」入口；`/learn/hi-doc/w`：课题列表 + 新建 + 材料上传（页数/文字层校验与中文原因）+ 状态
- `/learn/hi-doc/w/[id]`：材料清单（名称、页数、状态、删除；失败原因如实展示）+ 就材料追问（SSE 流式、命中片段与来源如实展示、发送中禁用）
- 视觉沿用 hi-doc.module.css 体系（方直边、纸色、朱/黛语义色），390px 不横向溢出
- 「我的资料」：按 `docs/HI_DOC_PLAN.md` §7 注释处理——本期把它接到 Hi doc 课题工作坊（入口跳转/明确提示），原本地快练能力**并入 Hi doc 工作坊**（计划 M6 验收「短材料答疑 + 快练并入」）；实施前先读 `src/app/learn/my-materials`、`src/lib/private-practice-memory.ts` 与 `/learn` 导航现状，不得删除用户在本地积累的数据

**E. 配额与记账**
- 新增额度键 `hidocWorkshopChats`（按轮对话计）：默认与既有 `hidocChats` 档位对齐（free 30 / basic 200 / pro·max unlimited；若成本要求不同以计划为准，并在 `docs/PROJECT_STATE.md` 记录）；四档表进 `quotas.ts`，服务端记账进 `quotas-server.ts`
- 模型调用无论成败记账并写 `EventLog(hidoc_workshop_chat)`（带 provider、model、outcome、字符数、命中片段数）；材料上传不调模型、不占模型额度；额度不足 503 + 中文原因，不静默放行

**边界（违反即返工）：**
- 不碰 `src/content/courses/`、`src/content/materials/`、课程注册表、发布逻辑；Hi doc 数据全部私有挂 userId，不进 `/courses`
- 不做扫描件 OCR、不做联网搜索、不引向量库/LightRAG；不做 M7 支付
- 「我的资料」只做 §7 规定的替换接入，不删除本地数据、不提前砍功能
- `src/content/courses/infectious-diseases/` 与 `scripts/infectious-*` 未跟踪文件绝不触碰
- 工作区可能有未提交改动（题库/bot 形状等另一条工作线）：保留，不 reset、不 stash、不 push、不纳入本次 commit

**验证（每期结束必跑）：**
`npm run lint && npm run typecheck && npm run test`，全绿后才允许进入下一项；M6 结束跑 `npm run check`（build 离线时 Google Fonts 报错可忽略，其余必须干净）。
浏览器实测（更新 `design-qa.md`「Hi doc M6」小节 + 截图）：真实短材料（有文字层 PDF/Markdown）上传→工作坊内提问命中原文片段（引用材料名+页码）→提问材料未覆盖的问题时如实说没有；无文字层 PDF/图片被明确拒绝（中文原因）；无 key 时对话明确报错；390px 宽不横向溢出。
单测：材料限额/页数校验、检索命中与未命中、配额四档与标签、API 契约（归属 404、越权 404、超限 503、拒绝扫描件 422）。

**提交：**
M6 完成后 git commit（conventional: `feat(hidoc): ...`），**不 push**。只提交 M6 相关文件 + `docs/PROJECT_STATE.md` + `design-qa.md` + 本任务书的 M7 版更新。提交前附改动文件清单。

**报告格式：**
完成后输出：完成项清单 / 验证命令与结果 / 新增文件列表 / 遇到的阻塞与取舍 / 下一步（M7 支付打通：mock→支付宝）建议。
若一切顺利，请在同一提交里把 `docs/HI_DOC_CODEX_BRIEF.md` 的「任务提示词」更新为 M7 版（支付打通：mock→支付宝，四档订阅真实生效，任务范围以 `docs/HI_DOC_PLAN.md` §2/§7 M7 与现有 `src/lib/payment/` 抽象为准），保持本文档结构不变。

---

## Codex 记忆配置说明（给用户看，不粘给 Codex）

- Codex 的「记忆」= 它自动加载的 AGENTS.md 链：全局 `~/.codex/AGENTS.md`（你的是空的，可不放东西）+ 仓库根 `AGENTS.md`（已含 NUR LEARN 全部产品/代码边界，自动生效）+ 子目录 AGENTS.md（进入该目录工作时加载）
- 仓库根 `AGENTS.md` 的「Next Product Priority」记录了 M 系列进度；当前未提交版本仍停在「M5 为当前任务」，跑 M6 前建议把该进度行改为 M5 已完成、当前任务 M6，并执行 `bash scripts/sync-agent-rules.sh`（同步 `.amazonq/.clinerules` 等副本）
- 写过 AGENTS.md 后记得 `bash scripts/sync-agent-rules.sh`

## 目标模式启动命令（CLI，推荐后台跑）

```bash
cd /Users/nukeab/projects/Nur-landing
codex exec --sandbox workspace-write "$(cat docs/HI_DOC_CODEX_BRIEF.md | sed -n '/^## 任务提示词/,/^---$/p' | head -n -1)"
```

或者最简单：打开 `docs/HI_DOC_CODEX_BRIEF.md`，复制「任务提示词」段落到 Codex 桌面端目标模式/聊天框。后台跑完用 `git log` 和 `npm run check` 验收。
