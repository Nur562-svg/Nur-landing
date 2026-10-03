<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Ariadne — Project Instructions

## Mandatory Context Before Work

This repository is no longer a generic landing-page or website-cloning exercise. It is an active product prototype for a high-quality medical learning platform.

Before planning, editing, or proposing the next screen, read these files completely:

1. `README.md`
2. `docs/PROJECT_STATE.md` — canonical record of product decisions, completed work, verification, limitations, and backlog
3. `docs/CONTENT_ARCHITECTURE.md` — agreed scalable course/content model and next implementation milestone
4. `design-qa.md` — latest visual and interaction QA evidence

Treat `docs/PROJECT_STATE.md` as the single source of truth when prior conversation context is unavailable. Update it whenever a product decision, milestone, route, verification result, or next priority materially changes.

## Product Mission

Ariadne first serves Chinese students majoring in Integrated Traditional Chinese and Western Medicine Clinical Medicine. The pilot course is 《中医诊断学》. The first release supports sustained whole-semester learning for domestic university courses and final exams; postgraduate entrance-exam support comes later.

The product must:

- teach through evidence and reasoning rather than isolated memorization;
- introduce TCM and modern-medicine perspectives from the beginning of each relevant knowledge point;
- label relationships carefully (`可关联`, `帮助理解`, `不可直接等同`) and never fabricate equivalence;
- retain serious drilling across objective, fill-in, term-explanation, short-answer, and case questions;
- specifically improve incomplete subjective answers and broken syndrome-differentiation reasoning chains;
- preserve source provenance for textbook editions, teacher slides, review scope, and anonymized past exams;
- show missing materials honestly as `待确认` or `待导入`, never as invented facts.

## Current Product State

- `/` — restored interactive promotional homepage. The upper-left `Ariadne` entry links to `/learn`; do not overwrite it with a product workspace.
- `/learn` — approved evidence-first weekly learning homepage.
- `/learn/course-builder` — completed evidence-gated Course Builder workbench for the allow-listed TCM material pack, with honest no-key fallback, a full typed course draft, source/coverage issues, JSON export, browser-local human approval, private-material intake, DOCX review, one-time model transfer, and strict browser-local material admission.
- `/courses/tcm-diagnostics` — approved 《中医诊断学》 course workspace and current total course entry.
- `/courses/tcm-diagnostics/knowledge-points/diet-and-taste` — approved first data-driven knowledge-point loop with evidence, dual-lens reasoning, answer scoring, and case transfer.
- `/courses/tcm-diagnostics/knowledge-points/diet-and-taste/subjective-writing` — completed first typed subjective-writing room with draft, NUR structure reference, rubric self-check, rewrite, and explicit prompt/answer/scoring authority boundaries.
- `/courses/tcm-diagnostics/knowledge-points/diet-and-taste/case-reasoning` — completed typed case-reasoning room with evidence selection, four-stage learner drafts, NUR structure references, self-check/repair, and explicit authority boundaries.
- Five more source-anchored TCM loops now reuse the same typed lesson/writing contracts: `tongue-coating`, `cold-and-heat`, `common-pulses`, `exterior-interior`, and `spleen-stomach`; the spleen loop also has a pure-synthetic four-stage case room.
- `/courses/physiology/knowledge-points/internal-environment-and-homeostasis` — completed first `western-primary` knowledge loop with verified textbook locators, source-family provenance, modern-physiology reasoning, NUR scoring, and non-case mechanism transfer.
- `/courses/physiology/knowledge-points/internal-environment-and-homeostasis/subjective-writing` — completed physiology writing loop with school source-verbatim prompts, separately modeled attached answers, NUR scoring, historical candidates, and current-teacher grading kept pending.
- The `/learn` homepage `课程` navigation links to the course workspace.
- The course workspace now consumes a typed, validated course definition from `src/content/courses/`; explicitly labeled demo learner state is separate in `src/content/demo/`.
- Modern medicine enters NUR platform answer and scoring training where relevant, but remains separately reasoned and explicitly non-equivalent to TCM syndromes.
- Exam totals and distributions are declared per course offering. The current 南京中医药大学、大一、2026 学年下学期 default is locked to 30/10/5/5/15/15/20 = 100, while a validated personal browser-local structure remains separate from course truth.
- The official third-edition textbook, instructor slides/review sheet, school white book, and a historical TCM final are now recorded with provenance. The original nine-page instructor final review and real instructor scoring rubric remain missing.
- A minimal global material catalog now preserves SHA identity, path aliases, source families/artifacts/derivation, multiple locators, transcription/integrity/privacy/publication state, and unresolved answer conflicts. Originals remain local and outside `public/`.
- The first official 《中医诊断学》 material pack reuses that catalog and the existing course/Course Builder contracts: nine included artifacts, two explicitly excluded Western Diagnostics papers, a 39-point evidence matrix, 10/15/14 depth tiers, six protected authored loops, and a deterministic zero-blocking batch draft. It grants no model, publication, catalog-mutation, or registry-mutation rights.
- A provider-neutral Course Builder boundary now includes strict request/plan contracts, an allow-listed known-pack fixture, a server-only DashScope adapter defaulting to `qwen3.7-plus`, deterministic fallback, local compilation/validation, and human review. A user-supplied Alibaba Cloud workspace credential completed real `qwen3.7-plus` builds on 2026-07-19; the key remains only in ignored `.env.local` and is never rendered or committed.
- A strict versioned `MaterialAdmissionRecord` now reuses the material asset/family/artifact boundaries, persists only explicitly approved accepted excerpts and audit metadata in browser-local storage, and supports explicit JSON export without granting Course Builder, model-transfer, catalog, registry, or publication rights.
- A live physiology private-overlay test exposed a product-boundary error: the UI could show an enabled, one-time-authorized build button while `runBuild` silently returned because only the TCM official base pack was allow-listed. DashScope and `qwen3.7-plus` were configured; no model request occurred. This is not merely a button bug: private-material analysis was incorrectly coupled to full official-pack compilation.
- Latest `npm run check` and the official-pack baseline-only API regression passed on 2026-07-19; earlier Course Builder/material-admission desktop/mobile interactions, five added TCM lesson/writing routes, the synthetic spleen case, empty browser error log, and 390 × 844 no-overflow checks remain current because the official pack changed no visible UI.
- The product is now deployment-ready: standalone Dockerfile, Postgres + Caddy docker-compose, CI pipeline, payment abstraction (mock/wechat/alipay), password reset, email verification, and legal pages are complete. Deployment waits only on ICP filing and merchant account setup.

## Next Product Priority

**Clew（2026-09-16 定案）是当前唯一实施主线**：Ariadne 内的 Mentrix 镜像级产品（用户上传教材 → 目录识别 → 知识点萃取 → 讲义+AI 教学追问 → 划重点/批注 → 学霸笔记 → 课题工作坊）。完整方案、数据模型、API、八期实施（M0–M7）与开源借鉴见 `docs/HI_DOC_PLAN.md`（唯一实施真相源）。已定案的四条决定：

1. 教材存服务器（仅本人可见，跨设备可学），满血实现；
2. 教材名额仅当月有效，跨月冻结、重占名额或升级档位；
3. Clew 全面替代「我的资料」本地快练（替代前保留并挂提示）；
4. 试点课（中医诊断学、生理学）对所有人免费，不占名额。

会员档位迁移：`free|lite|pro` → `free(=trial)|basic|pro|max`（basic 权益=原 lite）。首页改为三入口：官方课程学习闭环（试点课免费）/ Clew / 传统刷题题库。Clew 的 AI 生成物按通用 AI 产品方式直接呈现，**不挂**官方课的证据分级（可关联/不可直接等同等标签只属于官方闭环）。实施时遵守下文全部 Core Code Boundaries：Clew 服务端代码放 `src/lib/clew/`（Tier 3 模式：provider-neutral、key 只在服务端、SSE 带 Bearer、配额不足明确报错不静默放行），页面放 `src/app/learn/clew/`（thin adapters），数据模型进 `prisma/schema.prisma`（全部挂 userId 私有），类型进 `src/types/`。

**进度（2026-09-19）**：M0 四档会员迁移+官方课名额+首页三入口、M1 上传/书架/当月名额、M2 目录识别+章节修正、M3 知识点萃取 SSE 带页码溯源、M4 学习页（每知识点讲义生成 + 讲解追问 SSE，含未接入模型启发式兜底）、M5 划重点/批注与学霸笔记、M6 课题工作坊替代「我的资料」（≤100 页短材料 + 确定性关键词检索答疑 SSE，扫描件/图片明确拒绝，无 key 明确报错不兜底）、**M7 支付打通（mock→支付宝沙箱，四档订阅真实生效：下单→收银台→notify 验签开通→额度即时变化；缺密钥 503 明确报错不回落 mock；计费页三列档位卡+月/季/年分段控件；正式定价 2026-09-18 拍板落 `plans.ts`；真实支付宝 notify 回调待公网部署后补验）** 均已完成并验收（commits `36e8efc`/`2f41e98`/`1debd1a`/`93dfa6d`/`285c3d1` + M5/M6/M7 提交；lint 0 error / test 379 / check 通过）。**Clew M0–M7 全部完成**；后续主线：设计系统 v2 框架重构（桌面优先）与部署上线准备（ICP 备案 + 真实商户号 + 生产密钥/网关 + 公网 notify 补验）。本节中「Do not ... server material store」等旧约束已被上述四条决定取代，Clew 实现以 `docs/HI_DOC_PLAN.md` 为准。

**进度（2026-09-30）**：ZCODE-M1 三阶段完成（未提交，待用户审阅合并）：① 代码清理（12 个已合并分支、3 个未使用文件、118 项 Trae 提取脚本删除；`src/lib/qb-course-transform.ts` 因被 15 个 Tier 1 题库课程文件引用而保留）；② 品牌迁移（NUR LEARN→Ariadne、Hi doc→Clew，路由 `/learn/clew/*` 带 308 重定向，Prisma 9 模型 `@@map` 保表名零漂移，`nur-learn` localStorage 键前缀保留）；③ 前端基础重写（NurAgentChat mode/contextChip 契约、Clew 学习页「当前知识点」上下文 chip、SpineEditor 章节确认后萃取含服务端 409 门禁与 `POST /api/clew/textbooks/[id]/toc/confirm`、左栏常驻配额 chip）。验证：check exit 0 / test 402/402 / 残留 grep 清零 / 1440+390 浏览器走查通过（`design-qa.md` ZCODE-M1 节）。下一主线：ZCODE-M2 可配置闭环（Loop Profile）。

历史主线（已完成）：private-material analysis 与 official-course compilation 分离、browser-local attempt memory、constrained local Agent 等见 `docs/PROJECT_STATE.md` 与 `docs/CONTENT_ARCHITECTURE.md`。原 Course Builder 对学生显示为建设中，Clew **不是**旧 course-builder 的换壳。

## Tech Stack

- **Framework:** Next.js 16.2.1 App Router, React 19.2, TypeScript strict
- **Styling:** Tailwind CSS v4 plus CSS Modules for the approved product surfaces
- **UI primitives:** shadcn/ui / Radix where useful
- **Icons:** Lucide React, matching the current thin outline icon language
- **Deployment target:** 国内云（阿里云/腾讯云）+ Postgres 16 + Caddy 自动 HTTPS；standalone Docker 已就绪，待 ICP 备案后上线

## Commands

- `npm run dev` — start local development server
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run build` — production build
- `npm run check` — lint + typecheck + build

## Code Style

- TypeScript strict mode; no `any`.
- Named exports, PascalCase components, camelCase utilities.
- 2-space indentation.
- Prefer Server Components; introduce Client Components only for state, event handlers, or browser APIs.
- Use `next/link` for internal routes.
- Use CSS Modules or existing Tailwind conventions; no inline styles.
- Preserve the current responsive, square-edged editorial visual system.
- Do not add dependencies when TypeScript and small local utilities are sufficient.

## Data and Content Integrity

- Course UI must be generated from typed course definitions, not duplicated per course.
- Separate content truth from learner state, presentation state, and browser-local personal configuration.
- Preserve textbook/school/program/learner-year/teacher/academic-year/semester version dimensions even when values are unknown.
- Validate unique IDs, ordering, progress bounds, required source states, lesson/scoring references, and each course's declared exam total and optional integrity distribution.
- Never claim teacher emphasis, textbook pages, or past-exam frequency without supplied source material.
- Not every course should force equal TCM/Western content. Support `tcm-primary`, `western-primary`, and `integrated` curriculum modes.
- Keep mock learner progress explicitly identifiable as demo data until persistence exists.

## Core Code Boundaries

Changes to teaching logic, validation, scoring, and data contracts require careful review. UI components and styles are free to change.

### Tier 1 — Content Truth (核心内容真相)

These files define what the platform teaches. Any change alters the actual learning content or material provenance.

- `src/content/courses/` — course definitions, knowledge points, assessments, source evidence
- `src/content/materials/` — material catalog, official pack, SHA identity, provenance

**Rule:** Changes must preserve source provenance, never fabricate evidence, and pass `npm run check`. Adding or modifying a knowledge point, assessment, or source locator requires explicit justification.

### Tier 2 — Validation & Scoring Engine (验证与评分引擎)

These files enforce correctness of course data, learner state, and exam structure.

- `src/lib/course-validation.ts` — course definition schema validation
- `src/lib/course-selectors.ts` — course data selectors
- `src/lib/fsrs.ts` — FSRS spaced repetition algorithm
- `src/lib/learning-memory.ts` — attempt records, review scheduling
- `src/lib/user-exam-structure.ts` — exam total and distribution validation
- `src/lib/material-validation.ts` — material integrity checks
- `src/lib/material-admission.ts` — admission record enforcement
- `src/lib/material-intake.ts` — material intake pipeline
- `src/lib/question-bank-store.ts` — question bank data store

**Rule:** Changes must not break existing validated course definitions or learner records. Algorithm changes (FSRS, scoring) require before/after evidence. Always run `npm run check`.

### Tier 3 — Course Builder & Agent Engine (构建与Agent引擎)

These files handle model interaction, request/response contracts, and build compilation.

- `src/lib/course-builder/` — build service, plan validation, provider adapters, pack fixtures, private analysis
- `src/lib/nur-agent/` — agent service, chat prompts, context assembly, provider adapters, runtime

**Rule:** Changes must preserve the request/plan contract boundary, provider neutrality, deterministic fallback, and human-approval gates. Never expose API keys. Server-only code must not leak into client bundles.

### Tier 4 — Data Contracts (数据契约)

TypeScript type definitions that all tiers depend on.

- `src/types/` — course-builder, learning, material-admission, material-intake, material-parsing, nur-agent, question-bank

**Rule:** Changes are backward-compatible additions or carefully versioned breaking changes. Removing or renaming an exported type that other tiers import requires updating all consumers in the same PR.

### Free Change Zone (自由变更区)

These files are UI, routing, and presentation. Changes here do not affect teaching logic.

- `src/components/` — all UI components and CSS Modules (`.module.css`)
- `src/app/` — page routes, layouts, API route handlers (thin adapters only)
- `src/hooks/` — React hooks
- `src/content/demo/` — explicitly labeled demo learner state
- `public/` — static assets
- `tailwind`, `postcss`, `eslint` config files

**Rule:** Free to iterate. Must not import or duplicate Tier 1–4 logic. API routes must remain thin adapters calling `src/lib/` services.

### Cross-Boundary Rules

1. **Direction of dependency:** UI → lib/services → types. Never reverse.
2. **Content truth flows one way:** `src/content/courses/` and `src/content/materials/` are the source. Components consume via selectors; they never define content.
3. **Demo data stays labeled:** `src/content/demo/` is explicitly mock. Never promote demo data into Tier 1.
4. **No teaching logic in components:** Scoring, validation, FSRS scheduling, and material admission belong in `src/lib/`, not in React components or API routes.
5. **Type changes propagate:** A breaking change in `src/types/` must update all Tier 1–3 consumers before merge.

## Design Rules

- Approved direction: warm ivory paper, black ink, thin rules, Songti-style Chinese display headings, restrained sans-serif metadata, square containers, muted cinnabar and slate-blue semantic accents.
- Preserve the selected homepage concept: “从证据开始辨证”.
- Preserve the borrowed weekly-plan bottom drawer behavior.
- The course workspace remains an overview and navigation surface; deep teaching belongs on knowledge-point, subjective-writing, case-reasoning, and review pages.
- Build one complete vertical learning loop before filling every navigation route.

## Verification and Worktree Safety

- Run `npm run check` after implementation changes.
- For user-visible UI changes, verify the local route and primary interactions in a browser and update `design-qa.md` plus relevant screenshots.
- The worktree may contain uncommitted user and prior-session changes. Preserve them, do not reset, and do not stage, commit, push, or deploy unless explicitly requested.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh`.

## Legacy Template Reference

The repository began as a reverse-engineering template. Legacy research guidance remains available at `docs/research/INSPECTION_GUIDE.md`, but current Ariadne product decisions take precedence.
