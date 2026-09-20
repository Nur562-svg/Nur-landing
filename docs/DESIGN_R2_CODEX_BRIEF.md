# 设计系统 v2 × 执行任务书（R2：Hi doc 面换装 + 暗色启用）

用途：把下面「任务提示词」整段粘给执行器（CLI 或桌面端目标模式）。
执行器会自动读仓库 `AGENTS.md`；本文件与 `docs/design-references/claude-v2/NUR-DESIGN-V2.md` 是它的必读件。
R1 已完成（commit `f71ac19`）：壳、token 层、六件套、⌘K、抽屉、单实例 dock 均已入库并验收。

---

## 任务提示词（粘贴以下全文）

你在 NUR LEARN（/Users/nukeab/projects/Nur-landing，Next.js 16 App Router + React 19 + TS strict + Prisma + Tailwind v4/CSS Modules）实施 **设计系统 v2 的 R2：Hi doc 面换装 + 暗色模式启用**。分 R2-1（修复小包，先做先验）与 R2-2（Hi doc 主体换装）两步，各一次独立验证。

**开工前必读（按序，全部读完再动手）：**
1. 仓库 `AGENTS.md` — 产品边界、Tier 1–4 代码边界、验证规则
2. `docs/design-references/claude-v2/NUR-DESIGN-V2.md` — v2 唯一定案文档
3. `src/app/globals.css` 中 R1 已落的 v2 token 段（`:root` 里 `--brand-*`…`--v2-*`、`.dark` 里的对应暗色段）——token 唯一真相源
4. `src/components/ui/v2/` — R1 六件套（button/card/input/badge/chat-bubble/navigation）
5. `src/components/hi-doc.module.css` 与 `src/components/hi-doc-*.tsx` — 本次换装对象
6. `scripts/design-r1-check.mjs` 与 `design-qa.md` 的「Design System R1」节 — 复用其浏览器验证脚手架与记录格式
7. `docs/design-references/claude-v2/colors_and_type.css` — 仅作值参考，**禁止任何业务代码 import 它**

**R2-1 修复小包（先做，独立提交）：**

1. **暗色 secondary 对比度修复**（R1 遗留的库自带缺陷，用户已拍板修正）：
   - `src/app/globals.css` `.dark` 段（约 406–407 行）：`--v2-secondary: var(--text-900)` 改为 `--v2-secondary: var(--bg-300)`；`--v2-secondary-foreground: var(--bg-300)` 改为 `var(--text-800)`。亮色值一律不动。
   - 根因：button/badge 的 `.secondary`/`.muted` 是「`--v2-secondary` 底 + `--v2-foreground`/`--v2-muted-foreground` 字」，暗色下底和字都是浅色。改暗色底的值即可全链路修复，组件 css 不动。
   - 顺带处理壳上 `Trial / 免费试用` 徽章（`workspace-shell.module.css` 的 `.tierBadge`）：暗色下 brand-100 底 + brand-700 字对比度 ~3:1 压线，用 `:global(.dark) .tierBadge` 覆盖为 `var(--brand-700)` 底 + `var(--brand-100)` 字。
2. **⌘K 面板底部文案**（`src/components/workspace/command-palette.tsx:147`）：「R1 为壳，暂不做全局内容检索」是内部备注泄漏，改为「仅页面导航 · 全文检索将在后续版本提供」。
3. 验证：lint/typecheck/test 全绿 + `/design-system` 暗色截图确认 secondary 按钮可读。提交 `fix(design): R2-1 dark secondary contrast + palette copy`。

**R2-2 Hi doc 面换装（主体）：**

范围：`/learn/hi-doc`（书架）、`/learn/hi-doc/t/[id]`（目录）、`/learn/hi-doc/t/[id]/c/[n]`（学习页）、`/learn/hi-doc/w`（工作坊列表）、`/learn/hi-doc/w/[id]`（工作坊房间）五条路由及其组件（hi-doc-bookshelf / hi-doc-textbook / hi-doc-study / hi-doc-workshops / hi-doc-workshop-room / hi-doc-markdown / hi-doc-note / hi-doc-highlights）。

**核心机制是 token 桥接，不是重写 CSS**：`hi-doc.module.css`（1545 行）在 `.page` 上定义了一套页面局部 token（`--ink`/`--paper`/`--paper-bright`/`--muted`/`--line`/`--line-soft`/`--red`/`--blue`，合计约 160 处引用）。把这组局部 token 的**定义值**改为引用 v2 token，全部引用点自动生效、且在 `.dark` 下自动翻转——这就是暗色「白送」的实现路径。映射表（唯一口径，不要自由发挥）：

| 局部 token | 现值（亮色） | 桥接为 |
|---|---|---|
| `--ink` | `#10100f` | `var(--text-900)` |
| `--paper` | `#f7f4ee` | `var(--bg-200)` |
| `--paper-bright` | `#fbf9f4` | `var(--bg-100)` |
| `--muted` | `#6c6a66` | `var(--text-500)` |
| `--line` | `rgb(16 16 15 / 38%)` | `color-mix(in srgb, var(--text-900) 38%, transparent)` |
| `--line-soft` | `rgb(16 16 15 / 16%)` | `color-mix(in srgb, var(--text-900) 16%, transparent)` |
| `--red` | `#bf2118` | `var(--error-600)` |
| `--blue` | `#17659a` | `var(--v2-ring)`（聚焦描边统一为 terracotta，这是设计决策不是等值替换） |

剩余约 29 处散落硬编码色值：中性黑系 `rgb(16 16 15 / x%)` 一律改 `color-mix(in srgb, var(--text-900) x%, transparent)`；`#fbf9f4`/`#bf2118`/`#6c6a66` 改对应变量；`--hidoc-swatch-*` 四组划线/题型数据色（蓝 59 84 124、绿 63 127 106、金 214 168 74、深金 164 120 36）**保持字面值不动**——它们是内容语义色，不属 v2 色板，若暗色下明显刺眼可加 `.dark` 下的同色系降饱和覆盖，并在 design-qa 记录。

六件套替换点（**宁少勿滥，只做纯展示层替换**）：
- `hi-doc-bookshelf.tsx`：页头/上传等按钮 → `V2Button`；教材状态徽章 → `V2Badge`
- `hi-doc-workshops.tsx` + `hi-doc-workshop-room.tsx`：题型徽章 → `V2Badge`；对话气泡 → `V2ChatBubble`（先确认不破坏滚动/ref 逻辑，有风险就只做 token 重皮，不换 DOM）
- `hi-doc-study.tsx` 的讲义/追问/笔记 tab：**保留原 DOM**（键盘导航逻辑不动），仅吃 token 重皮
- 替换规则：组件替换仅限 props 全透传的展示层；任何带 ref/回调复杂度的原样保留。所有替换点逐一在 design-qa 列清单。

**暗色启用（全局）：**
- 壳顶栏右侧加明暗切换 icon button（lucide Sun/Moon，aria-label「切换暗色」/「切换亮色」），状态存 localStorage `nur-theme`，默认 light，挂载后读取
- 根 layout `<head>` 加一行内联防闪烁脚本：`try{if(localStorage["nur-theme"]==="dark")document.documentElement.classList.add("dark")}catch(e){}`
- 暗色是全局类，壳与页面同时生效；不允许出现半明半暗的中间态

**边界（违反即返工）：**
- `src/lib/hidoc/` 逻辑、`src/content/`、`src/lib/payment/` 一行不改；SSE 流式、划线定位、配额拦截、M0–M7 全部行为不回归（既有 385 项测试守护）
- 本期只换 Hi doc 面 + 全局暗色基建；课程工作台/题库/计费面的重皮是 R3，一行不碰
- 不新增任何依赖；`docs/design-references/claude-v2/` 保持只读
- 工作区可能有未提交改动（题库/bot 形状、infectious-*）：保留，不 reset、不 stash、不 push、不纳入本次 commit；若与你要改的文件撞车（如 hi-doc 无关的 question-bank-*），绕开并报告

**已知坑（前人踩过，别再踩）：**
- dev 冷编译偶发 500（manifest `JSON.parse` 竞态，路由会游走）：整轮重跑一次再判定，生产构建无此问题
- playwright-core 不在依赖里：`npm i --no-save playwright-core`，浏览器用系统 Chrome（`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`），不要用 Tabbit
- 改 Prisma 相关才需要重启 dev server（本期理论上不碰）；起服务前先 `lsof -ti :3000` 查占用
- 生产 `next start` 下注册接口 500 是环境护栏（强制 Postgres），登录态检查以 dev 服务为准，忽略该报错

**验证（结束必跑）：**
`npm run lint && npm run typecheck && npm run test` 全绿（385 项）；`npm run check` exit 0。
浏览器（复用/复制 `scripts/design-r1-check.mjs` 为 `design-r2-check.mjs`）：5 条 Hi doc 路由 + `/learn` + `/design-system` × 亮/暗 × 1440/390 全 200、控制台 0 错误、390 无横向溢出；暗色切换后**截图确认**：壳、书架、学习页、工作坊房间、`/design-system` 全部成套变暗，无浅底浅字区域；明暗切换刷新后保持。截图存 `docs/design-references/r2-*.png`。更新 `design-qa.md`「Design System R2」小节（含 R2-1）+ `docs/PROJECT_STATE.md`。

**提交：**
两次提交（R2-1 修复包、R2-2 换装+暗色），conventional：`fix(design): R2-1 …` / `feat(design): R2 hi-doc surface v2 tokens + dark mode`，**不 push**。只提交 R2 相关文件 + `docs/PROJECT_STATE.md` + `design-qa.md`。提交前附改动文件清单。

**报告格式：**
完成项清单 / 验证命令与结果 / token 桥接与组件替换点清单 / 明暗两态截图路径 / 遇到的阻塞与取舍 / R3 建议（官方课+题库面重皮）。

---

## 给用户看的说明（不粘给执行器）

- R2 的机制是「token 桥接」：Hi doc 页面自己那套 `--ink/--paper/--line` 局部 token 改为指向 v2 token，一千多处样式引用自动换血，暗色也自动成立——比逐行重写 1545 行 CSS 安全一个数量级。
- 蓝色聚焦描边统一改成 terracotta 是本次唯一「不等值」的设计决策（v2 定案里 ring 就是主强调色）；划线/题型四色是内容语义色，保留原样。
- R2 完成后：R3=官方课+题库+计费面重皮（同一套桥接手法），R4=⌘K 接章节/知识点真检索 + 移动端深化。
- 执行器若问「swatch 色要不要换」：不换，那是教材内容语义色。
