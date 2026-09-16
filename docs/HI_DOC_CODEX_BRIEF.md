# Hi doc × Codex 执行任务书（目标模式启动提示词）

用途：把下面「任务提示词」整段粘给 Codex（CLI `codex exec` 或桌面端目标模式）。
Codex 会自动读仓库 `AGENTS.md`；本文件与 `docs/HI_DOC_PLAN.md` 是它的两个必读件。

---

## 任务提示词（粘贴以下全文）

你在 NUR LEARN（/Users/nukeab/projects/Nur-landing，Next.js 16 App Router + React 19 + TS strict + Prisma + Tailwind v4/CSS Modules）实施新主线 **Hi doc**。

**开工前必读（按序，全部读完再动手）：**
1. 仓库 `AGENTS.md` — 产品边界、Tier 1–4 代码边界、设计与验证规则
2. `docs/HI_DOC_PLAN.md` — Hi doc 唯一实施真相源：已定案的四条决定、会员档位、数据模型、API、页面结构、M0–M7 分期、开源借鉴
3. `prisma/schema.prisma` — 现有 User/Order/会员体系
4. `src/lib/course-builder/` 与 `src/lib/nur-agent/` 的适配器模式 — Hi doc 服务端代码要复用同样的 provider-neutral 模式

**优先级裁决（冲突时按此执行）：** `AGENTS.md` 的「Next Product Priority」一节写于 Hi doc 定案之前，其中「Do not ... server material store / 不要建服务器资料存储」等旧约束**已被用户 2026-09-16 的四条决定明确取代**（教材存服务器、名额当月制、Hi doc 替代我的资料、试点课免费——见 `docs/HI_DOC_PLAN.md` §0）。Hi doc 相关实现以 `docs/HI_DOC_PLAN.md` 为准，不受旧段落阻挡。AGENTS.md 其余全部边界（Tier 1–4、设计规则、验证要求）继续完全生效。

**本次目标：完成 M0 + M1（只做这两期，不越期）。**

M0 验收：
- 会员档位从 `free|lite|pro` 迁移为 `free(=trial)|basic|pro|max`（basic=原 lite 权益），schema、TS 类型、支付 planId 映射全部同步，旧 lite 数据兼容
- 新增 `CourseEntitlement`（userId+courseId+grantedAt）；试点课（tcm-diagnostics、physiology）白名单对所有人免费、不占名额
- `/learn` 首页改为三入口：官方课程学习闭环 / Hi doc / 传统刷题题库（沿用现有视觉体系，Hi doc 入口可以是「建设中」占位到 M1 完成为止）

M1 验收：
- Prisma 新增 `HiDocTextbook`（title/fileName/storageKey/sizeBytes/pageCount/hasTextLayer/status/toc/activeMonth/deletedAt，全部挂 userId）
- 上传 API：PDF 文字层检测（复用 material-intake 的提取能力），无文字层明确拒绝并提示「暂不支持扫描版」；≤1500 页
- 存储：`src/lib/hidoc/storage.ts` 抽象 storageKey，MVP 落本地磁盘卷（目录按 userId 隔离），接口留 OSS 适配空间
- 名额：仅当月有效（activeMonth=YYYY-MM）；每档月额度 trial/basic=1、pro=3、max=10；超额明确报错（503 + 中文原因），不静默放行；删除释放当月名额
- 书架页 `/learn/hi-doc`：上传区 + 教材列表 + 名额显示（X/N 已用）+ 冻结态展示
- 全部服务端逻辑在 `src/lib/hidoc/`，API 路由只做 thin adapters；key 只在服务端

**边界（违反即返工）：**
- 不碰 `src/content/courses/`、`src/content/materials/`、课程注册表、发布逻辑
- Hi doc 数据全部私有挂 userId，不进 `/courses`
- 不做扫描件 OCR、不做 M2 及以后的目录识别/萃取（本期只到上传+书架+名额）
- 「我的资料」现有功能不动，不加提示（M6 才替代）
- `src/content/courses/infectious-diseases/` 与 `scripts/infectious-*` 未跟踪文件绝不触碰
- 工作区可能有未提交改动：保留，不 reset、不 stash、不 push

**验证（每期结束必跑）：**
`npm run lint && npm run typecheck && npm run test`，全绿后才允许进入下一项；M1 结束跑 `npm run check`（build 离线时 Google Fonts 报错可忽略，其余必须干净）。

**提交：**
每个里程碑完成后 git commit（conventional: `feat(hidoc): ...`），**不 push**。commit 前附改动文件清单。

**报告格式：**
完成后输出：完成项清单 / 验证命令与结果 / 新增文件列表 / 遇到的阻塞与取舍 / 下一步（M2）建议。

---

## Codex 记忆配置说明（给用户看，不粘给 Codex）

- Codex 的「记忆」= 它自动加载的 AGENTS.md 链：全局 `~/.codex/AGENTS.md`（你的是空的，可不放东西）+ 仓库根 `AGENTS.md`（已含 NUR LEARN 全部产品/代码边界，自动生效）+ 子目录 AGENTS.md（进入该目录工作时加载）
- 本仓库的 AGENTS.md 我已尝试补 Hi doc 主线章节，但受保护文件写入需你批准——如果你同意，下轮让我再写入一次并批准即可；不写也不影响，因为任务书已指定 Codex 必读 `docs/HI_DOC_PLAN.md`
- 写过 AGENTS.md 后记得 `bash scripts/sync-agent-rules.sh`
- 长期记忆补充位置：`~/.codex/AGENTS.md` 可加一行「NUR LEARN 项目的实施真相源见仓库 docs/HI_DOC_PLAN.md 与 AGENTS.md」——这样你在其他项目里开 Codex 也不串

## 目标模式启动命令（CLI，推荐后台跑）

```bash
cd /Users/nukeab/projects/Nur-landing
codex exec --sandbox workspace-write "$(cat docs/HI_DOC_CODEX_BRIEF.md | sed -n '/^## 任务提示词/,/^---$/p' | head -n -1)"
```

或者最简单：打开 `docs/HI_DOC_CODEX_BRIEF.md`，复制「任务提示词」段落到 Codex 桌面端目标模式/聊天框。后台跑完用 `git log` 和 `npm run check` 验收。
