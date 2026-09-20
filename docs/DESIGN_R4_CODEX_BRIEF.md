# 设计系统 v2 × 执行任务书（R4：⌘K 真检索 + 移动端深化，主线收官）

用途：把下面「任务提示词」整段粘给执行器（CLI 或桌面端目标模式）。
执行器会自动读仓库 `AGENTS.md`；本文件与 `docs/design-references/claude-v2/NUR-DESIGN-V2.md` 是它的必读件。
R1（`f71ac19` 壳+token）、R2（`81ddc8c` Hi doc+暗色）、R3（`e76a046`/`d2ac54a` 官方课+题库+计费+私人面、错题归壳）均已入库并验收。**R4 是设计系统 v2 主线收官期**，完成后回到部署上线准备。

---

## 任务提示词（粘贴以下全文）

你在 NUR LEARN（/Users/nukeab/projects/Nur-landing，Next.js 16 App Router + React 19 + TS strict + Prisma + Tailwind v4/CSS Modules）实施 **设计系统 v2 的 R4：⌘K 真检索 + 移动端深化**。两个子任务，各一次独立验证与提交。

**开工前必读（按序，全部读完再动手）：**
1. 仓库 `AGENTS.md` — 产品边界、Tier 1–4 代码边界、验证规则
2. `docs/design-references/claude-v2/NUR-DESIGN-V2.md` — v2 唯一定案文档
3. `src/components/workspace/command-palette.tsx` 与 `shell-data.ts` — R1 ⌘K 壳现状（静态入口 + 书架教材，`includes` 过滤；页脚写着「全文检索将在后续版本提供」——本期兑现）
4. `src/lib/course-selectors.ts` — 已有的课程/章节/知识点选择器（检索索引的数据源，**禁止绕过它直读 content**）
5. `src/content/courses/index.ts` — `publishedCourses` / `registeredCourses`；题库课（`*-qb`）与官方闭环课的区分
6. `src/components/workspace/workspace-shell.module.css` ≤900px/≤480px 段 — R1 已做的移动端壳（侧栏抽屉 + 汉堡 + 搜索触发器压缩）
7. `design-qa.md`「Design System R3」节 — 截图与记录格式；`scripts/design-r3-check.mjs` 浏览器脚手架（复制改造）
8. `tests/ui-v2-smoke.test.ts` + `tests/helpers/css-module-hooks.mjs` — R1 遗留的并发 flake（顺手项，见下）

**R4-1 ⌘K 真检索（先做的子任务，独立提交）：**

目标：⌘K 从「页面跳转器」升级为「站内内容检索」，但仍保持**轻量**——本地内存索引，不引入任何检索库/服务。

范围与做法（唯一口径，不要自由发挥）：
- 新建 `src/lib/search-index.ts`（纯函数、无 React、可单测）：从 `publishedCourses` 构建条目索引，条目类型四类：
  1. **章节**：每门课每章 → href 章节课件工作区或题库章节（用 `selectChapterWorkspaceView`/`selectQuestionBankChapterViews` 已有的路由口径；QB 课走 `/courses/{slug}/question-bank/{chapterSlug}`，闭环课走 `/courses/{slug}` 对应章）
  2. **知识点**：每门课每个 KP（title + note 参与匹配）→ `selectKnowledgePointHref` 的结果；`lesson: null` 的 QB 课 KP 不出知识点条目（没有可去的讲义页）
  3. **Hi doc 教材章节**：书架教材已在客户端拉取，为其章节追加条目（`/learn/hi-doc/t/{id}/c/{n}`）；教材数据是私有的，索引在用户登录后于客户端内存构建，**不上送服务端、不写盘**
  4. **页面入口**：保留 R1 全部静态条目
- 匹配规则：对 title 做 `includes`（大小写/全半角不敏感的轻量 normalize，可再加拼音首字母**仅当**本地已有工具函数——没有就不做，不引依赖）；每条命中可带 `hint`（所属课程/章节名）；分组显示（官方课程 / 题库 / 书架教材 / 页面）；无结果显示「没有匹配的内容」+ 保留现有页脚快捷键说明（页脚文案改为「↑↓ 选择 · Enter 跳转 · Esc 关闭」）
- 结果上限：每组最多 8 条，超出截断并显示「还有 N 条，输入更精确的关键词」；`Enter` 走当前高亮，行为同 R1
- 性能：索引构建 memo 在客户端组件里（`useMemo`），课件定义是构建期静态 import，不得在每次按键重建；390 视口下面板不遮挡输入框可视区（沿用现有 overlay 布局即可，必要时面板 `max-height` 与滚动已在 R1 做好）
- **边界**：不搜题目正文（9k+ 题库题目的全文检索是后端事，本期明确不做）；不搜学习者私人数据（错题/记忆）；不新增网络请求（教材列表复用 R1 已有的 `fetchRecentTextbooks`）；`src/content/` 一行不改；检索逻辑必须落在 `src/lib/search-index.ts` 纯函数里，组件只做渲染与键盘交互

**R4-2 移动端深化（后做的子任务，独立提交）：**

R1 已做：≤900px 侧栏抽屉 + 汉堡、≤480px 搜索触发器压缩。本期做「触控与密度深化」，**只动 CSS module 与壳组件，不改任何业务逻辑**：
- 触控目标：壳与六件套的所有可点元素（抽屉条目、顶栏按钮、⌘K 面板条目、V2Button/V2Badge 交互变体、主题切换、汉堡）在 390 视口下命中区 ≥44×44px——逐组件核对，不够的用 `min-height`/`min-width`/`padding` 补齐（沿用 M4 的 min-* 手法，不用固定 height）；纯文本链接（面包屑、页内 Link）同样补足
- 抽屉交互补完：scrim 点击关闭已有；补 **Esc 关闭抽屉** 与 **抽屉打开时 body 滚锁**（`overflow:hidden` on documentElement，关闭时还原）；焦点在打开时进入抽屉第一个条目、关闭时还给汉堡按钮
- 密度审计（390×844 全路由走一遍）：R3 已验证无横向溢出，本期只看「过稀/过挤」——主内容页（/learn、课程工作台、题库练习、Hi doc 学习页）在 390 下的上下留白与卡片间距如有明显失衡，按 v2 间距阶（4px 步进）微调对应 module 的 ≤768 段；**没有失衡就不动**，不要为了凑工作量改数值
- ⌘K 面板在 390 下改为**全宽底部弹出**（贴底、圆角仅上沿、max-height 70dvh），条目高度 ≥44px；桌面保持居中浮层不变
- Agent dock 浮球在 390 下的位置复核：不得遮挡内容页主 CTA 与抽屉边缘手势区；如现有位置已可用则不动

**顺手项（随 R4-2 一并提交，独立 commit message 段落注明）：**
- `tests/ui-v2-smoke.test.ts` 的并发 flake：`Promise.all(import(...))` 6 个动态 import 与 `register()` 的 ESM 钩子存在时序竞态，偶发 CSS 被当 JS 解析（379 pass + 6 cancelled vs 385 pass 两种结果都出现过）。修复：把 `before()` 里的 `Promise.all` 改为**串行 `for...of await import()`**，或在 `register()` 后加一个空转 `await import("./helpers/css-module-stub.mjs")` 确保钩子 attach 再进组件 import；选一种实现并连跑 3 次 `npx tsx --test tests/ui-v2-smoke.test.ts` 均 6/6 pass 才算修好

**边界（违反即返工）：**
- `src/lib/` 中除新增 `search-index.ts` 外一行不改（hidoc/payment/quotas/learning-memory/question-bank-store/fsrs 全部冻结）；`src/content/`、`prisma/` 一行不改
- 不引入任何新依赖（检索库、拼音库、手势库一律不装）；不新增路由；⌘K 检索不搜题库题目正文、不发网络请求（教材章节索引复用已拉取的内存数据）
- 工作区未提交改动（question-bank-chapter/practice 逻辑、bot-blob-shapes、infectious-* 全套、两个新 tests）：保留，不 reset、不 stash、不 push、不纳入 R4 commit
- R3 已完成的面不重做；壳桌面端布局一行不动
- v2-smoke 修复只动 `tests/` 两个文件，不碰组件

**已知坑（前人踩过，别再踩）：**
- dev 冷编译偶发 manifest 500：整轮重跑一次再判定
- dev 模式 `notFound()` 返回 200：验证页面内容标记不看状态码
- playwright-core 不在依赖：`npm i --no-save playwright-core`，系统 Chrome `channel: 'chrome'`，不用 Tabbit
- `next dev` 必须 `--webpack`；起服务前 `lsof -ti :3000`
- 检索索引若在组件顶层 `import publishedCourses` 会拉进整个课程树（含 9k+ 题库 item）——客户端 bundle 体积敏感：**只 import 课程元数据所需的 type 与 selector，索引构建放客户端 useMemo 且只取 title/note/slug/href 字段**，必要时在 search-index.ts 里做字段裁剪；构建后用 bundle-analyzer 或 `.next` 产物大小对比确认 /learn 的 client JS 增量 <30KB gzip（目测 `next build` 输出的 first-load 对比即可，超了报告并裁剪）
- QB 课（`*-qb`）的 KP 没有 lesson 页，`selectKnowledgePointHref` 可能给出 404 路由——索引时对 `lesson: null` 的课跳过知识点条目（用 course 对象的 lesson 字段判断，不许 try/catch 路由）

**验证（结束必跑）：**
`npm run lint && npm run typecheck && npm run test` 全绿（385+，v2-smoke 修复后 391）；`npm run check` exit 0（离线 Google Fonts 报错可忽略）。
新增单测：`tests/search-index.test.ts`——覆盖四类条目构建、`includes` 匹配、分组与截断、`lesson: null` 跳过、空查询；复用 R1/R3 的测试风格（node:test + tsx）。
浏览器（复制 `scripts/design-r3-check.mjs` 为 `design-r4-check.mjs`）：⌘K 检索交互（打开 → 输入「寒热」→ 命中官方课知识点 → Enter 跳转正确路由；输入「不存在的东西」→ 空态）；390 触控（抽屉开合/Esc/scrim、面板底部弹出、主路径按钮命中区抽查 getBoundingClientRect ≥44）；R3 的 15 路由 × 亮/暗回归（确认本期 CSS 未破坏既有面）。截图存 `docs/design-references/r4-*.png`。更新 `design-qa.md`「Design System R4」小节 + `docs/PROJECT_STATE.md`（R4 完成 + 设计系统 v2 主线收官 + 下一主线=部署上线准备）。

**提交：**
两次提交（R4-1 检索、R4-2 移动端+顺手项），conventional：`feat(design): R4 command palette content search` / `feat(design): R4 mobile touch deepening + v2-smoke flake fix`，**不 push**。只提交 R4 相关文件 + `docs/PROJECT_STATE.md` + `design-qa.md`。提交前附改动文件清单。

**报告格式：**
完成项清单 / 验证命令与结果 / 检索索引条目统计（四类各多少条）/ 触控命中区抽查清单 / 390 截图路径 / v2-smoke 修复方式与 3 次连跑结果 / bundle 增量对比 / 遇到的阻塞与取舍 / 主线收官后建议（部署上线准备清单确认）。

---

## 给用户看的说明（不粘给执行器）

- R4 是设计系统 v2 收官期。⌘K 检索刻意做「轻」：本地内存索引 + includes，不搜题库正文（那是后端全文检索的事，部署后才值得做），不引依赖。
- 检索索引刻意走 `selectKnowledgePointHref` 等既有选择器，不许直读 content——保持「UI → lib/selectors → types」的依赖方向。
- 移动端深化大部分是「审计确认已经够好」的活：R1 抽屉、R3 无溢出已验证，本期补 44px 命中区、抽屉 Esc/滚锁/焦点、⌘K 底部弹出，密度只在确失衡时微调。
- v2-smoke flake 是我在 R3 验收时抓到的遗留（R1 起就有的钩子竞态），列进顺手项。
- R4 完成后主线全部收官：M0–M7 + R1–R4。之后回到部署上线准备（ICP 备案 + 真实商户号 + 生产密钥/网关 + 公网 notify 补验），那是运维主线不是设计主线。
