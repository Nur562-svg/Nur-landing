# 设计系统 v3（桌面优先）

日期：2026-09-24。**〔2026-10-07 标注：本文件已被 `docs/DESIGN_V4.md`（Quiet）取代——「朱砂+石板蓝双强调」收敛为 v4 单强调（石板蓝降为信息色）、正文 14px/1.5 在文档面已改 15px/1.85；设计语言问题一律以 V4 为准（V4 > 本文件 > RESTRUCTURE_PLAN > PROJECT_STATE），本文件仅存档。〕** 曾为当前工作台视觉系统。教学真相、评分、考试结构、provenance、会员名额与试点课免费规则不在本次范围内。

## 视觉

- 纸底用既有暖象牙 `--v2-background`（`#FAF9F5` 一系）。工作台壳、`/learn`、Hi doc 把正文收到 14px、行高 1.5 的无衬线（`--v2-font-sans` / `--v3-body-size` / `--v3-body-leading`）。
- 标题用宋体粗体 `--v2-font-display`（Songti SC 在前），字号不小于 24px（`--v3-title-size`）。
- 卡片圆角 12px（`--v3-card-radius`），边框透明（`--v3-card-border`），只有一层轻阴影（`--v3-card-shadow: 0 1px 3px rgba(0,0,0,0.05)`）。
- 强调色仍是朱砂 `--v3-cinnabar`（`--brand-600`）和石板蓝 `--v3-slate-blue`（`#17659a`）。
- 这些面上的动效只保留加载旋转和状态提示（讲义 caret、上传 spinner）。侧栏、卡片、⌘K 不再做装饰性过渡。

## 首页

1440px 宽时，工作台是固定 280px 左栏加一块主画布。主画布是剩下的唯一主列，宽度至少是视口的 70%（280 + 余量，不另加右栏）。

`/learn` 去掉「三条学习主线」里的三张入口卡：「官方课程学习闭环」「Hi doc」「传统刷题题库」。这三处仍从左栏到达：`/courses`、`/learn/hi-doc`、`/question-bank`。底部快捷栏未做。

### 同伴卡片计数（改前，2026-09-24 源码）

`/learn`（未登录、本周计划抽屉关闭）：

| 块 | 张数 |
|---|---|
| 三条入口卡 | 3 |
| 当前案例 | 1 |
| 辨证推理卡 | 4 |
| 双视角卡 | 1 |
| 进度行（本周 / 错题 / 下一组） | 3 |
| 合计 | **12** |

Hi doc 书架，按 5 本在用教材这一对照样本（改前组件会把名额板、上传板和每一本都画成卡）：

| 块 | 张数 |
|---|---|
| 名额板 | 1 |
| 上传板 | 1 |
| 教材卡 | 5 |
| 合计 | **7** |

### 改后

`/learn` 桌面 5 张：案例、当前推理步、双视角、本周、错题。390px 再藏起双视角和本周，剩 3 张。5 ≤ 12×0.6，3 ≤ 5×0.8。

书架默认桌面：上传卡 + 最多 3 本教材卡 = 4（5 本样本）。名额收成一行字，不再是卡。390px 再藏起第 3 本，剩 3 张。4 ≤ 7×0.6，3 ≤ 4×0.8。「其余 N 本教材」展开后才画出全部，不靠裁切假装变少。

## ⌘K

所有宽度都是贴底的全宽面板（`position: fixed; bottom: 0; width: 100%`），不再用 560px 居中浮层。每组最多 6 条，多出来的仍用「还有 N 条」说明。390px 下壳和主按钮保持至少 44×44，工作台路由不出现横向溢出。

## Hi doc 路径

八步，顺序固定：上传 → 目录识别 → 章节修正 → 知识点萃取 → 讲义生成 + 追问 → 划重点/批注 → 学霸笔记 → 课题工作坊。

每一步由 `resolveHiDocGuide` / `guideForStep`（`src/lib/hidoc/step-guide.ts`）给出：当前步名称、进度（n / 8 与 `<progress>`）、状态句、下一步该做什么、以及「下一步」链接。书架、教材、学习页、课题列表和课题房间都渲染这一条。

Hi doc 的生成物不挂官方课证据分级（可关联 / 帮助理解 / 不可直接等同）。

### 教材解析

- PDF 仍走 pdf.js 文字层（`pdfjs-dist/legacy` + 现有 `pdfPageItemsToParagraphs`）。无文字层明确拒绝，不假装成功。
- DOCX 走已安装的 mammoth（Node 读 `buffer`，浏览器构建读 `arrayBuffer`）。抽不出文字（空文档、纯图片）明确拒绝。
- 旧版 `.doc` 明确说不支持，不另加转换器。图片同样拒绝。
- DOCX 没有印刷页码。数据库 `pageCount` 仍是必填整数，因此只存占位 `1`；界面、讲义页首、讲解提示和学霸笔记都写「页码待确认」，不把这个整数说成印刷页。章节来源记为 `docx-heading`。讲义与追问读取原文时，DOCX 走 mammoth 抽出的章节文字，不再当成 PDF 打开。
- 书架上的「下一步」：还没有教材时滚到上传区（`#upload`）；已有教材时打开该书的目录识别（`/learn/hi-doc/t/{id}#recognize`）。未登录时去登录。

## 文件

`git diff --name-only` 只含已跟踪文件。下面这份与 2026-09-24 落地时的命令输出一致。其中课程目录、落地页、题库、`shell-data.ts`、`nur-agent-chat.tsx` 和三条 chat-prompt 在本次开始前就已经是脏文件，v3 没有改它们的意图，也没有还原。

```
design-qa.md
docs/PROJECT_STATE.md
src/app/(workspace)/learn/course-builder/page.tsx
src/app/(workspace)/learn/hi-doc/page.tsx
src/app/api/hidoc/textbooks/[id]/toc/route.ts
src/app/api/hidoc/textbooks/route.ts
src/app/globals.css
src/components/course-catalog.module.css
src/components/course-catalog.tsx
src/components/course-landing.module.css
src/components/course-landing.tsx
src/components/hi-doc-bookshelf.tsx
src/components/hi-doc-note.tsx
src/components/hi-doc-study.tsx
src/components/hi-doc-textbook.tsx
src/components/hi-doc-workshop-room.tsx
src/components/hi-doc-workshops.tsx
src/components/hi-doc.module.css
src/components/learning-dashboard.module.css
src/components/learning-dashboard.tsx
src/components/nur-agent-chat.tsx
src/components/question-bank-global.module.css
src/components/question-bank-global.tsx
src/components/question-bank-home.module.css
src/components/question-bank-home.tsx
src/components/ui/v2/badge.module.css
src/components/ui/v2/button.module.css
src/components/ui/v2/card.module.css
src/components/ui/v2/navigation.module.css
src/components/workspace/command-palette.module.css
src/components/workspace/shell-data.ts
src/components/workspace/workspace-shell.module.css
src/components/workspace/workspace-shell.tsx
src/lib/hidoc/chat-prompt.ts
src/lib/hidoc/chat.ts
src/lib/hidoc/extraction.ts
src/lib/hidoc/knowledge-points.ts
src/lib/hidoc/lesson-heuristic.ts
src/lib/hidoc/lesson-provider.ts
src/lib/hidoc/lesson.ts
src/lib/hidoc/note-heuristic.ts
src/lib/hidoc/note.ts
src/lib/hidoc/providers/dashscope-lesson.ts
src/lib/hidoc/source-excerpt.ts
src/lib/hidoc/study.ts
src/lib/hidoc/textbook-view.ts
src/lib/hidoc/textbooks.ts
src/lib/hidoc/toc-recognition.ts
src/lib/hidoc/workshop-chat-prompt.ts
src/lib/nur-agent/chat-prompt.ts
src/lib/search-index.ts
src/types/hidoc.ts
tests/helpers/css-module-hooks.mjs
tests/search-index.test.ts
```

未跟踪的 v3 新文件（不在 `git diff --name-only` 里，因为没有提交）：

- `docs/DESIGN_V3.md`
- `scripts/design-v3-check.mjs`
- `src/components/hi-doc-path-guide.tsx`
- `src/lib/design-v3-density.ts`
- `src/lib/hidoc/source-intake.ts`
- `src/lib/hidoc/source-label.ts`
- `src/lib/hidoc/step-guide.ts`
- `tests/design-v3-density.test.ts`
- `tests/design-v3-flow.test.ts`
- `tests/helpers/server-only-empty.cjs`
- `tests/helpers/server-only-empty.mjs`

`.zcode/` 与 `.zcodeignore` 不是这次的文件。`src/content/courses/` 与 `src/content/materials/` 无差异。
