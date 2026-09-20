# 设计系统 v2 × 执行任务书（R3：官方课 + 题库 + 计费面重皮，错题中心归壳）

用途：把下面「任务提示词」整段粘给执行器（CLI 或桌面端目标模式）。
执行器会自动读仓库 `AGENTS.md`；本文件与 `docs/design-references/claude-v2/NUR-DESIGN-V2.md` 是它的必读件。
R1（commit `f71ac19`：壳、token 层、六件套、⌘K、单实例 dock）与 R2（commit `81ddc8c`：Hi doc 面 token 桥接 + 全局暗色）均已入库并验收。

---

## 任务提示词（粘贴以下全文）

你在 NUR LEARN（/Users/nukeab/projects/Nur-landing，Next.js 16 App Router + React 19 + TS strict + Prisma + Tailwind v4/CSS Modules）实施 **设计系统 v2 的 R3：官方课 + 题库 + 计费 + 错题/私人过渡面重皮**。机制与 R2 完全相同：**token 桥接**——每个 CSS module 根类上那套局部 token（`--ink`/`--paper`/`--muted`/`--line` 等）的定义值改为引用 v2 token，全部引用点自动换血、暗色自动成立。逐行重写 CSS 属于返工行为。

**开工前必读（按序，全部读完再动手）：**
1. 仓库 `AGENTS.md` — 产品边界、Tier 1–4 代码边界、验证规则
2. `docs/design-references/claude-v2/NUR-DESIGN-V2.md` — v2 唯一定案文档
3. `src/app/globals.css` 的 v2 token 段（`:root` 的 `--brand-*`/`--text-*`/`--bg-*`/`--v2-*` 与 `.dark` 对应段）— token 唯一真相源
4. `docs/DESIGN_R2_CODEX_BRIEF.md` 的 token 桥接映射表与执行口径 — R2 已验证的手法，本期原样沿用
5. `src/components/hi-doc.module.css` — 已完成的桥接样板（先看它怎么做的，再动手）
6. `src/components/ui/v2/` — R1 六件套
7. `scripts/design-r2-check.mjs` 与 `design-qa.md` 的「Design System R2」节 — 复用浏览器验证脚手架与记录格式
8. `docs/design-references/claude-v2/colors_and_type.css` — 仅作值参考，**禁止任何业务代码 import 它**

**Token 桥接映射表（唯一口径，不要自由发挥）：**

| 局部 token | 桥接为 |
|---|---|
| `--ink` | `var(--text-900)` |
| `--paper` | `var(--bg-200)` |
| `--paper-bright` | `var(--bg-100)` |
| `--muted` | `var(--text-500)` |
| `--line` | `color-mix(in srgb, var(--text-900) 38%, transparent)` |
| `--soft-line` / `--line-soft` / `--rule` | `color-mix(in srgb, var(--text-900) 16%, transparent)` |
| `--red` | `var(--error-600)` |
| `--blue` | `var(--v2-ring)`（聚焦描边统一 terracotta，是设计决策不是等值替换） |
| `--cinnabar`（仅 wrong-question-center） | `var(--brand-600)` |
| `--jade`（仅 billing-panel） | `var(--success-600)` |

各 module 里散落的硬编码中性黑 `rgb(16 16 15 / x%)` 一律改 `color-mix(in srgb, var(--text-900) x%, transparent)`；`#fbf9f4`/`#10100f`/`#6c6a66`/`#bf2118`/`#17659a` 改对应变量。**内容语义色保持字面值不动**：证据分级三色、题型 swatch 色、`--hidoc-swatch-*` 同款的数据色——它们不属 v2 色板；若暗色下明显刺眼，只允许在 `.dark` 下加同色系降饱和覆盖，并在 design-qa 记录每一处。

**范围（17 个 CSS module + 对应组件，按面分组）：**

A. 官方课面：
- `course-catalog`（/courses 列表）
- `course-landing`（QB 课 landing）
- `course-workspace`（/courses/tcm-diagnostics 工作台，2005 行，本期最大文件）
- `knowledge-point-lesson`（知识点讲义页）
- `subjective-writing-room`（主观写作间）
- `case-reasoning-room`（案例推理间）

B. 题库/考试面：
- `question-bank-global`（/question-bank 总入口）
- `question-bank-home`（课程题库首页）
- `question-bank-chapter`（章节列表，**工作区有未提交改动，最后做并先 diff 确认**）
- `question-bank-practice`（刷题间，同上未提交，先 diff）
- `mock-exam-room`（模考间）
- `wrong-question-center`（错题中心）

C. 计费/账户面：
- `billing-panel`（三列档位卡 + 分段控件）
- `learning-memory-panel`（记忆面板，局部 token 少，顺手桥接）

D. /learn 主页与私人过渡态：
- `learning-dashboard`（/learn 主页，1421 行）
- `private-materials-studio`（/learn/my-materials 本地快练）
- `private-practice-room`（私人练习间）

**过渡期收尾（随本期一并做，工作量小但属于定案）：**
1. `/learn/my-materials` 的迁移横幅（`hi-doc.module.css` 的 `.migrateBanner`，已在 R2 桥接过）保留不动；页面其余部分随 D 组桥接后确认暗色成套。
2. 错题中心归壳：`src/app/wrong-questions/page.tsx` 目前在 `(workspace)` 路由组**之外**（裸页面无壳）。把该目录整体移入 `src/app/(workspace)/wrong-questions/`（URL 不变），让错题中心获得侧栏/顶栏/暗色。移动后验证 `/wrong-questions` 200 且壳出现；这是本期唯一的路由目录变更，除此外 URL 一律不动。
3. ⌘K 面板数据源（`src/components/workspace/command-palette.tsx` 与 `shell-data.ts`）：确认「最近学习」等静态聚合里没有指向旧过渡面的死链；不要新增检索功能（那是 R4）。

**六件套替换点（宁少勿滥，只做纯展示层替换；带 ref/复杂回调/键盘导航的原样保留 DOM 只吃 token 重皮）：**
- `course-catalog` / `course-landing`：课程卡片 → `V2Card`（若现有卡片只是静态展示+Link，可换；有状态角标的先确认 props 透传）
- `billing-panel`：档位卡 CTA 按钮 → `V2Button`；「当前档位」等状态徽章 → `V2Badge`
- `mock-exam-room` / `question-bank-practice`：交卷/提交等主按钮 → `V2Button`（提交逻辑回调复杂的一律不换，只重皮）
- `wrong-question-center`：题型/来源徽章 → `V2Badge`
- 写作间/推理间/讲义页：**保留原 DOM**（自核勾选、证据选择、阶段草稿的键盘与焦点逻辑不动），仅 token 重皮
- 所有替换点逐一在 design-qa 列清单；任何「换了之后行为存疑」的，退回 token-only 并注明原因

**边界（违反即返工）：**
- `src/lib/`（含 hidoc/payment/quotas/learning-memory/question-bank-store）、`src/content/`、`prisma/` 一行不改；支付下单→notify→开通链路、刷题进度写入、FSRS、错题聚合、配额拦截全部行为不回归（既有测试守护）
- 官方课的证据分级体系（可关联/帮助理解/不可直接等同）文案与语义一行不动——本期只换皮不换内容
- 不新增任何依赖；`docs/design-references/claude-v2/` 保持只读
- 工作区未提交改动（`question-bank-chapter.tsx/.css`、`question-bank-practice.tsx`、`question-kind-labels.ts`、`bot-blob-shapes.ts`、infectious-* 全套、`tests/` 两个新测试）：**保留，不 reset、不 stash、不 push**。对未提交的 question-bank 文件只做**叠加式** token 桥接（在现有未提交内容上改定义值），不得回滚其中的逻辑改动；若发现冲突无法叠加，绕开该文件并在报告里说明
- R4（⌘K 真检索、移动端深化）一行不碰；壳本身（侧栏/顶栏/切换）已定，不改壳布局
- 除错题中心目录迁移外，不得新增/删除/改名任何路由

**已知坑（前人踩过，别再踩）：**
- dev 冷编译偶发 500（manifest `JSON.parse` 竞态，路由游走）：整轮重跑一次再判定，生产构建无此问题
- dev 模式下 `notFound()` 返回 HTTP 200：验证页面内容标记（grep 页面特征字符串），不要只看状态码
- playwright-core 不在依赖里：`npm i --no-save playwright-core`，用系统 Chrome（`channel: 'chrome'`），不要用 Tabbit
- `next dev` 必须是 webpack 模式（`next dev --webpack`）；起服务前 `lsof -ti :3000` 查占用
- 生产 `next start` 下注册接口 500 是环境护栏（强制 Postgres），登录态检查以 dev 为准
- 本地 `.env*` / `.dev.vars` 是密钥源：只读不写，绝不提交
- `learning-memory-panel` 在多处被嵌入（dashboard/课程页），桥接后在两个宿主页面都截图确认

**验证（结束必跑）：**
`npm run lint && npm run typecheck && npm run test` 全绿；`npm run check` exit 0（build 离线 Google Fonts 报错可忽略，其余不行）。
浏览器（复制 `scripts/design-r2-check.mjs` 为 `design-r3-check.mjs`）：覆盖路由——`/learn`、`/courses`、`/courses/tcm-diagnostics`、一个知识点页、一个写作间、一个推理间、`/question-bank`、一个课程题库首页、章节页、刷题间、模考间、`/wrong-questions`（确认在壳内）、`/account/billing`、`/learn/my-materials`、`/design-system` × 亮/暗 × 1440/390 全 200、控制台 0 错误、390 无横向溢出。暗色下逐页截图确认成套变暗、无浅底浅字区域；明暗切换刷新后保持。截图存 `docs/design-references/r3-*.png`。更新 `design-qa.md`「Design System R3」小节 + `docs/PROJECT_STATE.md`。

**提交：**
建议分两次提交：① `feat(design): R3 official course + question-bank surfaces v2 tokens`（A+B 组）；② `feat(design): R3 billing + dashboard + private surfaces v2 tokens, wrong-questions into shell`（C+D 组 + 错题归壳）。conventional，**不 push**。只提交 R3 相关文件 + `docs/PROJECT_STATE.md` + `design-qa.md`；未提交的 question-bank 逻辑改动与 infectious-* 全套**不纳入**任何 commit。提交前附改动文件清单并逐一确认未混入上述文件。

**报告格式：**
完成项清单 / 验证命令与结果 / 每个 module 的桥接 token 数与六件套替换点清单 / 明暗两态截图路径 / 错题归壳前后对比 / 遇到的阻塞与取舍 / R4 建议（⌘K 真检索 + 移动端深化）。

---

## 给用户看的说明（不粘给执行器）

- R3 与 R2 同机制：18 个 module 的局部 token 全部指向 v2，一次改动同时拿亮色 v2 皮 + 暗色。两处新增映射：`--cinnabar → --brand-600`（错题中心）、`--jade → --success-600`（计费成功/已开通态），都已在定案色板内。
- 错题中心归壳是本期唯一结构变更：它现在裸在 `(workspace)` 外，暗色和侧栏都吃不到。移动目录不改 URL。
- 未提交的 question-bank 两个文件（chapter/practice）是题库做题体验的逻辑改动，R3 只在它们之上叠加 token 定义值，不回滚；提交时这两个文件的逻辑部分继续留在工作区。
- my-materials 过渡态已经在 M6 挂了迁移横幅，R3 只负责让它在 v2/暗色下不破相，不动取舍逻辑。
- R3 完成后：R4 = ⌘K 接章节/知识点真检索 + 移动端深化（390 抽屉/底部导航已在 R1 做过一轮，R4 做触控与密度深化），之后设计系统 v2 主线收官，回到部署上线准备。
