<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NUR LEARN — Project Instructions

## Mandatory Context Before Work

This repository is no longer a generic landing-page or website-cloning exercise. It is an active product prototype for a high-quality medical learning platform.

Before planning, editing, or proposing the next screen, read these files completely:

1. `README.md`
2. `docs/PROJECT_STATE.md` — canonical record of product decisions, completed work, verification, limitations, and backlog
3. `docs/CONTENT_ARCHITECTURE.md` — agreed scalable course/content model and next implementation milestone
4. `design-qa.md` — latest visual and interaction QA evidence

Treat `docs/PROJECT_STATE.md` as the single source of truth when prior conversation context is unavailable. Update it whenever a product decision, milestone, route, verification result, or next priority materially changes.

## Product Mission

NUR LEARN first serves Chinese students majoring in Integrated Traditional Chinese and Western Medicine Clinical Medicine. The pilot course is 《中医诊断学》. The first release supports sustained whole-semester learning for domestic university courses and final exams; postgraduate entrance-exam support comes later.

The product must:

- teach through evidence and reasoning rather than isolated memorization;
- introduce TCM and modern-medicine perspectives from the beginning of each relevant knowledge point;
- label relationships carefully (`可关联`, `帮助理解`, `不可直接等同`) and never fabricate equivalence;
- retain serious drilling across objective, fill-in, term-explanation, short-answer, and case questions;
- specifically improve incomplete subjective answers and broken syndrome-differentiation reasoning chains;
- preserve source provenance for textbook editions, teacher slides, review scope, and anonymized past exams;
- show missing materials honestly as `待确认` or `待导入`, never as invented facts.

## Current Product State

- `/` — restored interactive promotional homepage. The upper-left `NUR LEARN` entry links to `/learn`; do not overwrite it with a product workspace.
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

The `问诊 · 问饮食口味` loop, browser-local attempt/return memory, constrained local Agent, minimal material contract, second physiology knowledge/writing pressure test, known-pack Course Builder, private-material intake/DOCX review/one-time transfer, evidence-gated browser-local material admission, the first five-point deeper official TCM increment, and the course-wide official TCM material pack v1 are complete. Follow `docs/PROJECT_STATE.md` and `docs/CONTENT_ARCHITECTURE.md`.

The next implementation priority is resolved: separate **private-material analysis** from **official-course compilation**. Any privacy-eligible, explicitly accepted excerpt set must be able to use an exact one-time authorization to ask Qwen for a bounded structured decomposition even when no official base pack exists or the material is insufficient for a complete course. Insufficiency becomes an honest result (`partial`, `insufficient`, or `unmapped`), not a pre-model blocker. A representative case is a learner importing roughly 20 short-answer questions and immediately receiving a usable private learning unit with normalized/grouped questions, clearly labeled Qwen/NUR reference-answer drafts, practice, favorites, rewrite, and redo paths.

Do not create a parallel course truth model. Reuse the existing material, course, knowledge-point, assessment, answer-authority, learning-memory, Course Builder, and Agent contracts. Treat model decomposition as an intermediate private draft that may compile into a partial private workspace; official-pack matching and deterministic publication-grade validation belong to the later optional compilation stage. Preserve exact transfer consent, privacy gates, raw-file exclusion, source/answer/scoring authority separation, human approval, and all publication/catalog/registry non-grants. Remove silent no-op paths and surface every blocker. Upgrade the bounded NUR Agent only after the partial-private-workspace path works: Qwen may be its reasoning engine, while typed tools and deterministic code own state changes such as favorites, confirmed attempts, and review scheduling. Do not build a broad CMS, database, authentication, synchronization, automatic publication, or server material store.

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

The repository began as a reverse-engineering template. Legacy research guidance remains available at `docs/research/INSPECTION_GUIDE.md`, but current NUR LEARN product decisions take precedence.
