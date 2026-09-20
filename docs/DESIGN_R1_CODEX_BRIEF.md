# Hi doc 后续 × 执行任务书（目标模式启动提示词）

用途：把下面「任务提示词」整段粘给执行器（CLI 或桌面端目标模式）。
执行器会自动读仓库 `AGENTS.md`；本文件与 `docs/HI_DOC_PLAN.md`、`docs/design-references/claude-v2/NUR-DESIGN-V2.md` 是它的必读件。

---

## 任务提示词（粘贴以下全文）

你在 NUR LEARN（/Users/nukeab/projects/Nur-landing，Next.js 16 App Router + React 19 + TS strict + Prisma + Tailwind v4/CSS Modules）实施 **设计系统 v2（框架重构 R1：壳 + Token，不动业务页面）**。

**开工前必读（按序，全部读完再动手）：**
1. 仓库 `AGENTS.md` — 产品边界、Tier 1–4 代码边界、验证规则
2. `docs/design-references/claude-v2/NUR-DESIGN-V2.md` — v2 唯一定案文档（2026-09-18 用户拍板方案 A）
3. `docs/design-references/claude-v2/colors_and_type.css` — token 真相源（7 组原色阶 50–900 + 语义层 + 暗色模式 + 圆角/间距/阴影）
4. `docs/design-references/claude-v2/components.css` 与 `preview/*.html` — 六件套组件实现参考
5. `docs/design-references/claude-v2/ui_kits/website/index.html` — 248px 侧栏 + 主区工作台的组合基准
6. `src/app/globals.css` — 现有 token 映射层（`@theme inline` 已在，往里接，不要另起炉灶）

**本次目标（R1，只做壳与 Token，不越界）：**

**A. Token 层落地（globals.css）**
- 把 v2 原色阶（brand/text/bg/icon/border/success/error 各 50–900）作为 CSS custom properties 引入 `:root` 与 `.dark`
- 语义层按 NUR-DESIGN-V2.md §2 映射（terracotta `#C96442` 为主强调 `--primary`；`--sidebar` `#F5F4EE`；`--bg-100 #FAF9F5` 为页面底）
- 字体栈按定案映射：display→`"Songti SC","Noto Serif SC",serif`（Newsreader 追加其后做拉丁回退）；serif（阅读）→`"Noto Serif SC","Songti SC",serif`；sans（紧凑 UI）→`"MiSans","PingFang SC",system-ui,sans-serif`；mono 不变
- 圆角体系 8/12/16/20/24px 取代方直边（`--radius` 族）
- **不删除、不重命名任何现有语义 token**（`--paper`/`--ink`/`--line` 等各 CSS module 正在消费）；新增 token 与既有 token 并存，既有值暂不改动——R2 才逐面切换
- 暗色模式：`.dark` 类下的暖炭灰语义层完整落好（库文件里有现成值），本期不强制任何页面启用

**B. 基础组件六件套（新建 `src/components/ui/`）**
- button / card / input / badge / chat-bubble / navigation，从 `components.css` + `preview/*.html` 移植为 React + CSS Modules（或扩展现有 `src/components/ui/button.tsx`）
- 严格用 A 步的语义 token，不写死色值；4px 间距节奏；交互态（hover/focus-visible/disabled）齐全（focus-visible 用 `--ring`）
- 组件只做展示层，零业务逻辑；不引第三方 UI 依赖（库的 UIKit 里 unpkg/React CDN 仅作参考，禁止引入）

**C. NUR Workspace 壳（R1 核心交付）**
- 路由组 `src/app/(workspace)/layout.tsx`：248px 左侧栏（主入口：Hi doc / 官方课程 / 题库 / 会员；最近学习：书架最近教材、进行中课程）+ 主内容区 + 顶部细条（⌘K 搜索占位、用户/会员状态）
- 把现有 `src/app/learn`、`src/app/courses`、`src/app/question-bank`、`src/app/account` 迁入路由组（**只挪目录不改页面内容**，URL 路径必须保持不变）
- `NurAgentDock`（现在 9 处各自挂载）收敛为壳级单实例挂载，通过既有 createPortal+useSyncExternalStore 机制继续工作；逐页面验证 dock 行为不回归
- ⌘K 命令面板本期只做壳（UI + 打开/关闭 + 输入框），数据源接 `/learn` 现有三入口与书架教材列表的静态聚合即可，不做全局检索
- 390px：侧栏收起为抽屉/底部导航（选一种做完整），Agent 栏退化为浮球

**D. 视觉基准页（验收对照物）**
- 新建 `/(workspace)/design-system` 开发预览页（仅登录用户可见即可）：展示六件套全部变体 + token 色板 + 明暗切换开关，作为后续逐面迁移的对照基准
- 该页不在导航露出，路由保留

**边界（违反即返工）：**
- **不改动任何业务页面的视觉与逻辑**（R1 只是壳+token 并存）；现有页面的既有 class/样式一律不动
- 不碰 Tier 1/2/3：`src/content/`、课程校验/评分、`src/lib/hidoc/`、`src/lib/payment/` 一行不改
- 工作区可能有未提交改动（题库/bot 形状、infectious-*）：保留，不 reset、不 stash、不 push、不纳入本次 commit
- `docs/design-references/claude-v2/` 是只读参考资产，禁止 import 进业务代码（design-system 预览页除外，也不允许直接 import 其 css 文件——token 必须经过 globals.css）

**验证（结束必跑）：**
`npm run lint && npm run typecheck && npm run test` 全绿；R1 结束跑 `npm run check`（build 离线 Google Fonts 报错可忽略）。
浏览器实测（playwright-core + 系统 Chrome headless，Tabbit 不好用直接换 Chrome）：路由组迁移后 `/learn`、`/courses`、`/question-bank`、`/account/billing`、`/learn/hi-doc` 全部 200 且截图对比迁移前无视觉变化（R1 验收标准：业务页像素级不变）；壳在 1440 与 390 下布局正确、⌘K 开合正常、Agent dock 在每个旧挂载点的行为正常；`/design-system` 预览页明暗两态截图。更新 `design-qa.md`「Design System R1」小节 + 截图。
单测：period/路由不回归（既有 379 项全过）、六件套组件的纯渲染冒烟测试。

**提交：**
完成后 git commit（conventional: `feat(design): R1 workspace shell + design tokens v2`），**不 push**。只提交 R1 相关文件 + `docs/PROJECT_STATE.md` + `design-qa.md`。提交前附改动文件清单。

**报告格式：**
完成后输出：完成项清单 / 验证命令与结果 / 新增与迁移文件列表 / 遇到的阻塞与取舍 / R2 建议（Hi doc 面切换到 v2 组件与暗色）。

---

## 给用户看的说明（不粘给执行器）

- R1 完成后：R2=Hi doc 面切换（卡片/按钮/对话气泡换 v2 组件 + 启用暗色），R3=官方课+题库面切换，R4=⌘K 全局检索与移动端深化。
- 若执行器问「分段控件/圆角细节」：一切以 NUR-DESIGN-V2.md 为准，不要自由发挥。
