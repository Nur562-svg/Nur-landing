# ZCODE-M1: Ariadne 品牌迁移 + 代码清理 + 前端基础重写

日期：2026-09-30。执行者：Zcode。验收：Nur。
真相源：`docs/RESTRUCTURE_PLAN.md`、`docs/loop-profile-contract-draft.md`、`docs/research/competitive-interaction-analysis-2026-09-30.md`

---

## 任务总览

本任务书包含三个阶段，按顺序执行：
1. **代码清理**（删除确认的无用文件/分支）
2. **品牌迁移**（NUR LEARN → Ariadne，Hi doc → Clew）
3. **前端基础重写**（Page Chat 固化 + SpineEditor + 配额 chip）

---

## Phase 1: 代码清理（先执行）

### 1.1 删除已合并 Git 分支

```bash
git branch -d branch1 \
  feat/catalog-exam-links \
  feat/course-catalog \
  feat/launch-p0-hardening \
  feat/ops-quota-postgres-guard \
  feat/private-pdf-text-layer \
  feat/private-practice-import \
  feat/private-practice-memory \
  feat/qb-course-landing-mockexam \
  feat/qb-open-dynamic-practice \
  feat/question-bank-integration \
  feat/wrong-questions-qb-design-qa
```

保留：`main`、`feat/saturn-ring`（当前工作分支）

### 1.2 删除未使用文件

```bash
# 未使用组件（1305 行，0 引用）
rm src/components/course-builder-workbench.tsx

# 未使用 lib
rm src/lib/course-entitlements.ts
rm src/lib/qb-course-transform.ts

# 旧设计系统残留（根目录 button，v2 已建立）
rm src/components/ui/button.tsx
```

### 1.3 删除 Trae 提取脚本和元数据

```bash
# 提取脚本（28 个）
rm scripts/*-audit.py scripts/*-slice.py scripts/*-extract.py scripts/*-toc.py scripts/*-header.py scripts/*-render.py scripts/*-split.py scripts/*-probe.py scripts/*-consistency.py scripts/*-chapdetect.py scripts/*-front.py scripts/*-quota.py scripts/*-booklets.py scripts/*-generate.py

# 提取元数据（27 个）
rm scripts/*-CONTRACT.md scripts/*-budget.json scripts/*-meta.json scripts/*-chap-slices.json

# 其他提取相关
rm scripts/anatomy-*.json scripts/biochem-*.json scripts/cellbio-*.json scripts/histo-*.json scripts/immuno-*.json scripts/infectious-*.json scripts/microbio-*.json scripts/neuro-*.json scripts/patho-*.json scripts/pharmaco-*.json scripts/radiology-*.json scripts/tcmdx-*.json scripts/topo-*.json
rm scripts/audit_qb.py scripts/cand-scan.py scripts/extract_diag.py scripts/extract-anatomy.py scripts/extract-genetics.py scripts/probe_diag.py scripts/verify-qb-course.ts scripts/verify-practice-paper.ts scripts/analyze-qb-issues.ts scripts/generate-qb-course.ts
```

保留：`scripts/design-*.mjs`、`scripts/quick-check.mjs`、`scripts/pre-commit.mjs`、`scripts/install-hook.mjs`、`scripts/set-prisma-provider.mjs`、`scripts/sync-agent-rules.sh`、`scripts/ocr/`（OCR 相关，后续可能用）

### 1.4 清理后验证

```bash
npm run typecheck
npm run lint
npm run build
```

必须全部通过。如果有引用被误删，恢复并标记。

---

## Phase 2: 品牌迁移

### 2.1 全局替换规则

| 旧 | 新 | 范围 |
|---|---|---|
| NUR LEARN | Ariadne | 所有 UI 文案、文档、注释 |
| 知径 | 知径（保留中文名） | 中文 UI |
| Threads of knowing | Threads of knowing | 英文副标题 |
| Hi doc | Clew | 所有 UI 文案、路由、组件名、变量名 |
| hi-doc | clew | 路由路径、CSS 类名、文件名 |
| HiDoc | Clew | TypeScript 类型名、组件名 |
| HIDOC | CLEW | 常量名 |
| hiDoc | clew | 变量名、函数名 |
| /learn/hi-doc | /learn/clew | 路由路径 |

### 2.2 路由变更

| 旧路由 | 新路由 |
|--------|--------|
| `/learn/hi-doc` | `/learn/clew` |
| `/learn/hi-doc/t/[id]` | `/learn/clew/t/[id]` |
| `/learn/hi-doc/t/[id]/c/[n]` | `/learn/clew/t/[id]/c/[n]` |
| `/learn/hi-doc/w` | `/learn/clew/w` |
| `/learn/hi-doc/w/[id]` | `/learn/clew/w/[id]` |

**同步修改**：
- `src/app/(workspace)/learn/hi-doc/` → `src/app/(workspace)/learn/clew/`
- 所有 `href` 引用
- 所有 `router.push` 引用
- `resolveHiDocGuide` / `guideForStep` 中的路径生成

### 2.3 文件重命名

```
src/components/hi-doc-*.tsx          → src/components/clew-*.tsx
src/components/hi-doc.module.css     → src/components/clew.module.css
src/lib/hidoc/                       → src/lib/clew/
src/types/hidoc.ts                   → src/types/clew.ts
src/app/(workspace)/learn/hi-doc/    → src/app/(workspace)/learn/clew/
```

### 2.4 类型名变更

```typescript
// 旧 → 新
HiDocTextbookStatus → ClewTextbookStatus
HiDocChapterSource → ClewChapterSource
HiDocChapterStatus → ClewChapterStatus
HiDocChapterView → ClewChapterView
HiDocKnowledgePointView → ClewKnowledgePointView
HiDocTocRecognitionView → ClewTocRecognitionView
HiDocTocStrategy → ClewTocStrategy
HiDocTextbookView → ClewTextbookView
HiDocTextbookDetail → ClewTextbookDetail
HiDocTocEvent → ClewTocEvent
HiDocChapterExtractionResult → ClewChapterExtractionResult
HiDocExtractEvent → ClewExtractEvent
HiDocQuotaView → ClewQuotaView
HiDocShelf → ClewShelf
HiDocErrorCode → ClewErrorCode
HiDocApiFailure → ClewApiFailure
HiDocLessonStyle → ClewLessonStyle
HiDocLessonGenerator → ClewLessonGenerator
HiDocLessonView → ClewLessonView
HiDocChatRole → ClewChatRole
HiDocChatMessage → ClewChatMessage
HiDocConversationView → ClewConversationView
HiDocLessonEvent → ClewLessonEvent
HiDocChatEvent → ClewChatEvent
HiDocKnowledgePointStudySummary → ClewKnowledgePointStudySummary
HiDocChapterStudyView → ClewChapterStudyView
HiDocGuideContext → ClewGuideContext
HiDocGuide → ClewGuide
HiDocSurfaceState → ClewSurfaceState
HiDocStepId → ClewStepId
HIDOC_STEPS → CLEW_STEPS
resolveHiDocGuide → resolveClewGuide
guideForStep → guideForStep (保留)
```

### 2.5 package.json

```json
{
  "name": "ariadne",
  "description": "Ariadne — an evidence-led learning platform for Integrated TCM and Western Medicine clinical students."
}
```

### 2.6 品牌文案

| 位置 | 新文案 |
|------|--------|
| 首页标题 | Ariadne |
| 首页副标题 | Threads of knowing |
| /learn 标题 | Ariadne |
| Clew 页面标题 | Clew |
| Clew 副标题 | Step by step, thread by thread |
| 中文 slogan | 一步一线索，一线一知径 |

### 2.7 品牌迁移后验证

```bash
npm run typecheck
npm run lint
npm run build
npm run test
```

必须全部通过。搜索残留：
```bash
grep -ri "nur learn" src/ --include="*.tsx" --include="*.ts" --include="*.css" | grep -v "node_modules" | head -20
grep -ri "hi doc\|hidoc\|hi-doc" src/ --include="*.tsx" --include="*.ts" --include="*.css" | grep -v "node_modules" | head -20
```

---

## Phase 3: 前端基础重写（MVP）

### 3.1 Page Chat 固化（P0）

**目标**：学习页追问固化为「对当前 KP 提问」，上下文 chip 显式标注。

**修改文件**：`src/components/nur-agent-chat.tsx`

**实现**：
1. 新增 `mode` prop：`"floating" | "embedded" | "page-chat"`
2. `page-chat` 模式下：
   - 输入框上方显示上下文 chip：`当前知识点：{kp.title} · 第 {kp.sourcePage} 页`
   - chip 可点击，展开显示 KP 描述
   - system prompt 自动注入 KP 上下文
3. 非 page-chat 模式保持现有行为

**学习页集成**：`src/components/clew-study.tsx`（原 hi-doc-study.tsx）
```tsx
<NurAgentChat
  mode="page-chat"
  contextChip={{
    label: "当前知识点",
    value: kp.title,
    sourcePage: kp.sourcePage,
    description: kp.description,
  }}
/>
```

### 3.2 SpineEditor 简化版（P0）

**目标**：目录识别后，用户可合并章节，确认才触发萃取。

**修改文件**：`src/components/clew-textbook.tsx`（原 hi-doc-textbook.tsx）

**实现**：
1. 章节列表进入「编辑模式」：
   - 每章显示拖拽手柄（≡）
   - 相邻章节间显示「合并」按钮
   - 章节标题可编辑
2. 底部操作栏：
   - 默认状态：「确认章节结构并开始萃取」（primary）
   - 有未保存修改时：「保存修改并萃取」（primary）+「放弃修改」（secondary）
3. 未确认前，萃取按钮 disabled，显示提示「请先确认章节结构」

**API 变更**：`src/lib/clew/toc-recognition.ts`
- 新增 `confirmTocStructure(textbookId, chapters: ClewChapterView[])` 函数
- 保存确认后的章节结构到数据库
- 确认后才允许调用 `/api/clew/textbooks/[id]/chapters/[order]/extract`

### 3.3 配额 chip 常驻（P1 提前）

**目标**：左栏底部常驻显示配额状态。

**修改文件**：`src/components/workspace/workspace-shell.tsx`

**实现**：
1. 左栏底部新增 chip 区域
2. 显示内容：
   - 本月教材名额：`{used}/{limit} 本`
   - 当前教材 token 消耗：`~{estimate} tokens`
3. 样式：小字、 muted 色、不抢视觉
4. 数据从 `/api/auth/quotas` 获取，token 从 `EventLog` 聚合（简化版：先写死估算，后续接真实数据）

---

## 验收标准

### Phase 1 验收

- [ ] 12 个已合并分支删除
- [ ] 3 个未使用文件删除
- [ ] 55+ Trae 提取脚本/元数据删除
- [ ] `npm run check` 通过

### Phase 2 验收

- [ ] 所有 UI 显示「Ariadne」，无「NUR LEARN」残留
- [ ] 所有路由从 `/learn/hi-doc` 改为 `/learn/clew`
- [ ] 所有类型名从 `HiDoc*` 改为 `Clew*`
- [ ] `npm run check` + `npm run test` 通过
- [ ] grep 无「nur learn」「hi doc」残留

### Phase 3 验收

- [ ] 学习页追问显示「当前知识点：xxx · 第 N 页」chip
- [ ] 目录识别后可合并章节，确认才萃取
- [ ] 左栏底部显示配额 chip
- [ ] `npm run check` 通过
- [ ] 浏览器走查：桌面 1440px + 移动 390px 无溢出

---

## 风险与回滚

- **品牌迁移风险**：全局替换可能漏掉某些边界情况（如 `HiDoc` 作为子字符串出现在更长标识符中）。对策：替换后 grep 验证。
- **路由变更风险**：旧路由可能有外部链接。对策：Next.js 重定向 `/learn/hi-doc/*` → `/learn/clew/*`，保留 301。
- **清理风险**：误删有隐式引用的文件。对策：清理后必须 `npm run check` 通过。

---

## 执行顺序

1. Phase 1 清理 → 验收
2. Phase 2 品牌迁移 → 验收
3. Phase 3 前端重写 → 验收
4. 全部完成后，合并到 main，标记 ZCODE-M1 完成

---

## 下一步任务书（预告）

- **ZCODE-M2**：可配置闭环（Loop Profile）类型契约 + Clew 集成
- **ZCODE-M3**：统一状态层（LearningSession + 跨页面状态连续）
