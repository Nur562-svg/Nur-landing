# NUR LEARN — Canonical Project State

Last updated: 2026-10-04 (Asia/Shanghai) — 设计系统 v4「Quiet」批 1 落地（token 层 + Clew 学习页换装 + 壳侧栏合并；Hermes 预验收复核通过 2026-10-04，未提交待终审）；ZCODE-M1–M4 与体验补丁为既有未提交基线，设计语言真相源 `docs/DESIGN_V4.md`。

This file is the durable source of truth for continuing NUR LEARN when conversation history is unavailable. Update it after material product decisions, completed milestones, verification changes, or priority changes.

## 1. Product Mission

NUR LEARN is intended to become a high-quality medical learning website with a clear initial advantage for students majoring in Integrated Traditional Chinese and Western Medicine Clinical Medicine in China.

Initial priorities:

- support domestic university coursework and final exams;
- serve sustained whole-semester learning before last-minute review;
- add postgraduate entrance-exam support later;
- support 3–4 focused sessions per week, 30–60 minutes each;
- retain serious drilling rather than becoming a reading-only product;
- solve two observed problems: incomplete term/short-answer responses and broken syndrome-differentiation reasoning chains.

The pilot course is 《中医诊断学》 and now has its first real textbook, instructor-material, school-question-bank, and historical-exam source set. Additional courses can later supply their own editions, teacher scopes, and exam structures without inheriting this course's distribution.

## 2. Agreed Learning Philosophy

Each relevant knowledge point should introduce TCM and modern-medicine perspectives from the beginning, while explicitly preventing false equivalence.

Required relationship language includes:

- `可关联` — observations or mechanisms can help connect the perspectives;
- `帮助理解` — a comparison is pedagogical rather than an exam equivalence;
- `不可直接等同` — concepts differ in system, scope, or diagnostic meaning.

The learning loop should become:

```text
课程工作台
  → 中西医对照知识点
  → 即时客观题与主动回忆
  → 名词解释／简答完整表达
  → 案例证据与辨证推理
  → 错题和薄弱点回流到周计划
```

The site must remain exam-effective. Reading, drilling, output, reasoning, review, and mock assessment are all required parts of the eventual product.

Resolved product decision on 2026-07-15: modern-medicine content is not limited to explanatory support. Where a knowledge point includes academically useful modern-medicine content, it also enters NUR platform answer and scoring practice through observable symptoms, differential/assessment direction, safety awareness, and explicit relationship boundaries. It must still be scored separately from TCM reasoning and must never turn a TCM syndrome into a claimed modern diagnosis.

## 3. Exam Blueprint Model and Pilot Fact

Exam structure belongs to each course definition. NUR LEARN does not assume that every course totals 100 points or uses the same question categories. A course declares its own total, rows, workspace summary groups, optional priority-training notice, and optional locked integrity distribution. The reusable validator checks those declarations generically without recognizing a course slug or hard-coding a universal total.

《中医诊断学》 final exam totals 100 points:

| Question type | Count × points | Total |
| --- | ---: | ---: |
| A1 single choice | 30 × 1 | 30 |
| B1 type questions | 10 × 1 | 10 |
| B2 type questions | 5 × 1 | 5 |
| Fill-in | 5 × 1 | 5 |
| Term explanation | 5 × 3 | 15 |
| Short answer | 3 × 5 | 15 |
| Case analysis | 2 × 10 | 20 |

Term explanations, short answers, and cases total 50 points. This is why complete expression and reasoning-chain training are first-class product capabilities rather than optional enhancements.

The 30 + 10 + 5 + 5 + 15 + 15 + 20 distribution is the user-provided default for the current 南京中医药大学、中西医结合临床、大一、2026 学年下学期 offering. B1/B2 semantics were confirmed by the user on 2026-08-06 and recorded as a source: B1 = 共用备选答案配伍题（一组选项供多个小题共用、可重复选择）；B2 = 共用题干题组（一个病例/题干下多个小题，小题为单选）。A future course or offering may use a different total, different question kinds, different grouping, or no locked distribution while still using the same course engine and workspace component.

Resolved on 2026-07-16: a learner may create a personal exam structure by editing names, counts, and per-question points, adding or removing types, and saving the result in the current browser. This user configuration is validated separately and never mutates `CourseDefinition.examBlueprint`, source-backed historical structures, or another course. It may use a total different from the current default, which is surfaced rather than silently rejected. Restoring the course default deletes only the personal browser-local override.

Historical structures are evidence for their own academic year, not proof of the current offering. The inspected 2021–2022 official TCM Diagnostics paper uses a different 100-point distribution, and the school white-book exercise paper uses another structure. Those differences are the root reason the engine scopes an exam blueprint to school/program/year/term and does not promote one distribution to a universal rule.

Do not infer chapter-level frequency or teacher emphasis from this blueprint. Those require the user's actual materials.

## 4. Approved Design Direction

The user selected the third homepage concept, “从证据开始辨证”, and also liked the second concept's bottom section. The approved implementation keeps the third concept and exposes the second concept's weekly plan through a button-controlled bottom drawer.

Visual system:

- warm ivory paper background;
- black ink and one-pixel editorial rules;
- Songti-style Chinese display headings with restrained sans-serif metadata;
- strict grid, square containers, little or no rounding;
- pale oversized ghost typography;
- muted cinnabar for active/attention states;
- slate blue for modern-medicine/focus semantics;
- thin Lucide outline icons;
- no generic gradients, glass cards, decorative blobs, or emoji substitutes.

Preserve this direction across subsequent routes. The course workspace may be denser than the homepage, but must remain part of the same visual system.

## 5. Implemented and Verified

### `/` — interactive promotional homepage

Main implementation:

- `src/app/page.tsx`
- promotional interaction styles retained in `src/app/globals.css`

Implemented behavior:

- restored from the exact prior Next.js development source map rather than reconstructed from memory;
- pointer-following circular reveal over the main hero;
- visible `Hello, are you ready to learn` headline;
- hidden medical-course texture and `你好，成绩将飞速提升` message;
- expandable local account/avatar panel;
- the upper-left `NUR LEARN` brand links directly to the weekly learning homepage at `/learn`;
- original feature, medical-student course, journal, and contact sections.

The promotional page had previously been overwritten when the approved learning homepage took over the same root route. It is now restored at `/`, while the learning homepage is preserved without visual or interaction changes at `/learn`.

### `/learn` — weekly learning homepage

Main implementation:

- `src/app/learn/page.tsx`
- `src/components/learning-dashboard.tsx`
- `src/components/learning-dashboard.module.css`

Implemented behavior:

- evidence-first four-step syndrome-differentiation flow;
- dual-view TCM/modern-medicine clue explanation;
- weekly progress rail;
- weekly-plan bottom drawer with weak-knowledge-point reflow (max 3 weak KP chips + "查看全部" link);
- editable learner name, major, and local avatar preview;
- internal navigation, with `课程` linking to the course workspace and `错题` linking to the wrong-question center with a red count badge.

Course-workspace and knowledge-point links labeled `本周` or `本周学习` now return to `/learn`, preserving their original destination after the promotional homepage was restored at `/`.

The `/learn` header and progress rail now expose a restrained `建课 / 材料建课` entry to the approved Course Builder. The `错题` nav link (with red count badge) and `待复习` progress item link to `/wrong-questions`. The weekly-plan drawer shows weak-knowledge-point chips that link to the relevant lesson or question bank. No second-course selector or broad placeholder navigation was added.

### `/wrong-questions` — wrong-question center

Implemented on 2026-08-06:

- `src/app/wrong-questions/page.tsx` — Server Component passing registered courses
- `src/components/wrong-question-center.tsx` — Client Component with stats, weak-KP grid, wrong-question list
- `src/components/wrong-question-center.module.css` — warm-ivory editorial CSS
- `src/lib/wrong-questions.ts` (Tier 2) — read-only aggregator: `selectWrongQuestionCenter(courses, attempts)` merges QB attempts + mock-exam sessions into `WrongQuestionCenterData`
- `src/hooks/use-wrong-questions.ts` — `useSyncExternalStore` hook with `mounted` pattern to avoid hydration mismatch
- `src/lib/question-bank-store.ts` — added `getAllQBAttempts()` for cross-course aggregation

The center reads from existing `nur-learn:qb-attempts:v1` (question-bank practice) and `nur-learn:mock-exam-sessions:v1` (mock exam) localStorage keys without creating new storage. It aggregates wrong answers by knowledge point, sorts by wrong count and wrong ratio, and provides deep links to lesson pages, question-bank practice, or subjective-writing rooms. The `/learn` dashboard integrates weak-KP chips into the weekly-plan drawer and activates the `错题` nav link with a count badge.

**2026-08-17 可读性修复（仅样式）：** 错题中心 `.container` 未本地定义 `--muted`，继承了 globals shadcn 的 `--muted: oklch(0.97 0 0)`（近白背景 token），导致 `subtitle` / `sectionHint` / meta / empty-state 次要文案在象牙底上几乎不可读；CSS 回退色 `#8a857c` 从未生效。已在 `.container` 覆盖与 `/learn`、题库、课程壳一致的 editorial tokens（`--muted: #6c6a66`、`--ink: #10100f`、`--paper: #f7f4ee`），并给 `sectionHeading` 加 `flex-wrap` 避免 390 长 hint 溢出。未改聚合逻辑与三层 tab。`/learn` 等同风格页本身已有本地 `--muted: #6c6a66`，无需改动。

### `/learn/course-builder` — evidence-gated Course Builder workbench

Main implementation:

- `src/app/learn/course-builder/page.tsx`
- `src/components/course-builder-workbench.tsx`
- `src/components/course-builder-workbench.module.css`
- `src/types/course-builder.ts`
- `src/lib/course-builder/`
- `src/app/api/course-builder/route.ts`
- `src/components/material-intake-review.tsx`
- `src/components/material-intake-review.module.css`
- `src/components/docx-parsing-review.tsx`
- `src/components/docx-parsing-review.module.css`
- `src/components/material-admission-review.tsx`
- `src/components/material-admission-review.module.css`
- `src/types/material-intake.ts`
- `src/types/material-parsing.ts`
- `src/types/material-admission.ts`
- `src/lib/material-intake.ts`
- `src/lib/docx-local-parser.ts`
- `src/lib/material-admission.ts`

Implemented behavior:

- preserves the original version-1 known-pack request for `pack-tcm-diagnostics-approved-2026-07-18`, while a separate strict version-2 request may reference that allow-listed base and attach only an approved current-session private overlay;
- accepts `.pdf/.doc/.docx/.ppt/.pptx/.jpg/.jpeg/.png/.webp` for intake, with at most eight files, 25 MiB per file, 80 MiB per batch, and no ZIP support;
- computes SHA-256 through browser File/Web Crypto APIs before review, detects batch duplicates, and compares identities with the current structured material-catalog assets without exposing original catalog paths to the client;
- appends new selections to the current batch instead of silently replacing it, exposes per-file/rejection removal plus whole-batch clear, and offers one-step browser-session undo;
- re-normalizes batch-duplicate disposition after removal and resets all four human confirmations whenever the batch changes, so a previously eligible record cannot remain approved after its evidence changes;
- preserves every supported file as `待解析`, `ocr-pending`, integrity/authority/conflict `pending-review`, and academic content `pending`; no file contents are presented as read or verified;
- lets the learner confirm course, source type, declared authority, school, teacher, academic year, semester, source-family relation, privacy declaration/risk, and publication policy while keeping the layer `learner-private` and authority pending review;
- defaults to `local-only`, `browser-memory-only`, and model transfer `not-authorized`; selected `File` handles exist only in current React session state, disappear on refresh, and are neither persisted nor sent to `/api/course-builder` or DashScope;
- distinguishes `原文件在当前会话可用` from a restored structured record that `需重新选择原文件后才能解析`, and presents a four-stage `文件身份 → 来源边界 → 人工审核 → 内容解析` rail; only the DOCX pilot can start the fourth stage, and only by explicit user action;
- requires four intake confirmations before recording `eligible-for-course-builder` in validated browser-local storage; this status is a later input candidate, not a build, publication, material-catalog mutation, or course-registry mutation;
- for a non-duplicate `.docx` in an eligible intake, requires the same current-session file or a reselected file whose byte size and SHA-256 match the approved identity, then requires a separate `browser-local-docx-structure-only` authorization;
- uses Mammoth 1.12.0 in the client to convert DOCX structure to HTML only as an intermediate representation; the product never renders that HTML and instead extracts normalized headings, paragraphs, list items, and table cells through `DOMParser`;
- caps a parse at 240 blocks or 160,000 characters, ignores image content/OCR, treats parser messages and unknown revision/comment state as review issues, and keeps every extracted block `pending-review` until the learner accepts, edits, or excludes it;
- keeps the entire `MaterialDocxParsingDraft` and extracted text in React memory only; it does not enter localStorage, `/api/course-builder`, logs, exports, screenshots, DashScope, or course/material truth;
- lets the learner choose an existing knowledge point and previews only the proposed `+1 learner-private artifact candidate` and accepted-excerpt count; verified facts, registry writes, and model requests remain exactly zero;
- groups blocks under DOCX headings, chunks unheaded content after 24 blocks, and collapses each section by default so long documents can be reviewed at section level before individual exceptions are opened;
- provides global and per-section accept/exclude/restore actions plus filters for pending, accepted, modified, and deterministic noise candidates; noise detection is limited to empty/very short blocks, page-number forms, symbol-only blocks, and exact normalized duplicates, and never silently excludes content;
- creates a versioned `ReviewedMaterialOverlayDraft` only after a separate current-session approval; the immutable snapshot contains accepted excerpts, section/locator mapping, target knowledge point, learner-private provenance, pending authority, and zero model-transfer permission;
- lifts approved overlays into the workbench, automatically selects the new `official base + private enhancement` option, shows base-source/section/excerpt counts, and locks compilation behind a separate one-time model-transfer authorization;
- supports explicit overlay withdrawal, automatically removes all overlays when the eligible intake is changed, and loses both excerpts and overlay state on refresh by design;
- creates a versioned `PrivateOverlayTransferAuthorization` only after the learner opens an exact send manifest and confirms the accepted excerpt text, excerpt IDs, DOCX locators, fixed course/knowledge-point target, DashScope provider/model, counts, and `one-course-build` scope;
- excludes the raw DOCX, filename, path, `File` handle, full SHA, pending/excluded blocks, images/OCR originals, API key, unrelated course content, and unrelated personal metadata from the private request and provider prompt; changes to content, target, overlay, provider, or model invalidate authorization;
- caps private transfer at 80 accepted excerpts and 40,000 characters without truncation, and blocks cloud transfer unless both the privacy declaration and risk are `none-observed`;
- consumes every authorization before the single provider attempt; replay, mismatch, stale authorization, provider-unavailable, and provider-failure cases are rejected, and private requests never fall back to the official baseline or retry automatically;
- restricts the private provider output to one `use / review / exclude` decision plus descriptive learning-use/review text for each known excerpt ID and the fixed knowledge point; strict local parsing rejects missing, duplicate, unknown, or target-changing output;
- returns a visibly non-official `private-course-draft` with real provider truth, per-excerpt decisions, `learner-private / pending-review` authority, five review gaps, deterministic material/course validation, and the existing three-item human approval gate;
- exposes a provider-preferred mode and an explicit baseline-only mode;
- uses a server-only, provider-neutral adapter boundary whose first adapter targets DashScope and defaults to `qwen3.7-plus`;
- accepts a validated `DASHSCOPE_BASE_URL` for Alibaba Cloud workspace-specific compatible endpoints while rejecting non-HTTPS or non-`aliyuncs.com` hosts;
- when `DASHSCOPE_API_KEY` is absent, completes through a reproducible approved-material baseline and visibly states that no Qwen result was produced;
- limits model planning to known chapter/knowledge-point/source IDs plus bounded descriptive fields, then recompiles against the local validated `CourseDefinition` rather than trusting model-authored course truth;
- outputs a full nine-chapter, 39-knowledge-point typed course draft, five-step trace, source ledger, official-pack batch compilation, content coverage, validation counts, and explicit review gaps;
- preserves both pending teacher sources, 33 knowledge points without deep lessons, six source questions with missing answers, and all six existing deep loops instead of inventing or overwriting content;
- requires three human-review confirmations before browser-local preview approval; approval does not mutate the server course registry;
- exposes a standards-based JSON download link for the complete draft.
- derives an in-memory material-admission candidate only from an explicitly approved DOCX overlay, then requires review of full SHA-256, MIME/byte size, structured provenance, source family/artifact, accepted transcription/locators, privacy/publication, conflict disposition, and authority before approval;
- requires eight explicit admission confirmations and persists only a strictly validated `approved-as-local-candidate`; pending candidates are neither stored nor exported;
- restores approved admission records from a versioned browser-local store after refresh while the raw `File`, parse draft, and current-session overlay correctly disappear;
- exports a strict versioned audit package containing only approved structured evidence and explicit non-grants; it excludes raw binary, `File` handles, absolute paths, original filenames, pending/excluded body text, API keys, and unrelated personal metadata;
- keeps Course Builder selection, one-time model transfer, material-catalog mutation, publication, and course-registry rights `not-authorized` even after admission or export.

The known baseline validates successfully with zero blocking issues and four review issues. It contains six authored deep lessons, 13 assessment candidates, two cases, and six missing source answers. The attached official-pack batch result covers all 39 IDs as evidence-ready, evidence-partial, or pending without claiming that every point already has a `问饮食口味`-quality learning loop.

The private-material intake, admission record, and compiler remain separated by explicit gates. Passing intake proves only file identity and declared provenance/privacy; DOCX review creates a memory-only overlay with model transfer still `not-authorized`; admission can preserve only the approved structured candidate and accepted excerpts; the transfer gate authorizes only the exact manifest shown for one provider attempt. A successful request produces a private draft and local preview approval, not course-registry mutation or publication. PDF/PPT/image parsing, OCR review, admitted-record selection in Course Builder, multi-user approval, and publication remain later gates.

### `/courses/tcm-diagnostics` — 《中医诊断学》 course workspace

Main implementation:

- `src/app/courses/tcm-diagnostics/page.tsx`
- `src/components/course-workspace.tsx`
- `src/components/course-workspace.module.css`
- `src/types/learning.ts`
- `src/content/courses/tcm-diagnostics.ts`
- `src/content/courses/index.ts`
- `src/content/demo/tcm-diagnostics-learner-state.ts`
- `src/lib/course-validation.ts`
- `src/lib/course-selectors.ts`

Implemented behavior:

- course progress and stage metadata;
- `本阶段`, `全学期`, and `薄弱优先` filters;
- chapter selection and progress;
- `理解`, `输出`, and `应用` learning-route states;
- learning-unit selection down to `问诊 · 问饮食口味`;
- source-backed material state: official textbook, instructor slides, instructor review range, and historical TCM final;
- the current offering's exact 100-point default exam blueprint plus a validated browser-local personal exam editor;
- 45-minute learning queue: 12 minutes understanding, 15 minutes subjective output, 18 minutes case transfer;
- session drawer and ready confirmation;
- working account identity menu;
- homepage-to-course and course-to-home navigation.

The route now selects `tcm-diagnostics` from the validated course registry and passes its serializable course definition plus a separately identified demo learner state into the reusable client workspace. The React component no longer owns an academic chapter array.

### `/courses/tcm-diagnostics/knowledge-points/diet-and-taste` — `问诊 · 问饮食口味`

Main implementation:

- `src/app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/page.tsx`
- `src/components/knowledge-point-lesson.tsx`
- `src/components/knowledge-point-lesson.module.css`
- lesson/source/scoring data in `src/content/courses/tcm-diagnostics.ts`
- reusable knowledge-point and source selectors in `src/lib/course-selectors.ts`

Implemented behavior:

- a reusable two-segment dynamic route statically generated from registered course definitions;
- a four-part learning path: `取证 → 对照 → 输出 → 迁移`;
- four evidence groups with twelve selectable inquiry prompts;
- separate TCM and modern-medicine reasoning blocks;
- explicit `可关联`, `帮助理解`, and `不可直接等同` relationships;
- a free-text answer exercise and answer skeleton;
- a clearly labeled 10-point NUR platform practice rubric: 4 points TCM, 4 points modern medicine, and 2 points relationship boundary;
- a case-transfer exercise with a toggleable evidence-to-conclusion reasoning chain;
- local interaction progress and an evidence ledger;
- verified textbook pages 60–61 and instructor review-page provenance, traceable public modern-medicine references, and a clearly labeled NUR editorial structure;
- honest 4/4 core material-category coverage while separately preserving the missing original nine-page instructor final-review document and teacher scoring rubric;
- course-workspace entry through the existing 45-minute session drawer, without replacing its prior behavior;
- account and course/home navigation consistent with the approved surfaces.

The TCM `问饮食口味` explanation and evidence prompts are calibrated against the official third-edition textbook pages 60–61 and the instructor-provided two-page review sheet. Public clinical references support the modern-medicine training content, but do not claim teacher scoring or past-exam frequency. The 10-point practice rubric remains NUR-authored until an actual teacher rubric exists.

### `/courses/tcm-diagnostics/knowledge-points/diet-and-taste/subjective-writing` — subjective-writing room

Main implementation:

- `src/app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/subjective-writing/page.tsx`
- `src/components/subjective-writing-room.tsx`
- `src/components/subjective-writing-room.module.css`
- assessment candidates and scoring definitions in `src/content/courses/tcm-diagnostics.ts`
- assessment validation and selectors in `src/lib/course-validation.ts` and `src/lib/course-selectors.ts`

Implemented behavior:

- a reusable nested route statically generated only for registered knowledge points with authored subjective-writing items;
- a minimal transition from the knowledge-point `输出` section into the writing room;
- two writing tasks: one NUR-adapted term explanation for `消谷善饥` and one NUR-adapted short answer covering inquiry structure, separate TCM/modern-medicine reasoning, and the relationship boundary;
- first draft, source-cross-checked NUR answer structure, criterion-by-criterion self-check, and focused rewrite stages, with local 0/25/50/75/100 progress;
- separate per-question state while switching between the term and short-answer tasks;
- visible separation of prompt authority, answer authority, answer-confidence state, NUR scoring authority, and the still-missing teacher rubric;
- a 6-point NUR term rubric and a 10-point NUR short-answer rubric; neither is presented as the current offering's per-question score or the instructor's real scoring standard;
- the short-answer rubric preserves separate 4-point TCM, 4-point modern-medicine, and 2-point relationship-boundary criteria;
- two school-white-book fill-in prompts shown as source-verbatim assessment candidates with missing answers, not as scored questions or standard answers;
- a source rail covering the white book, textbook pages 60–61, instructor review page 2, NUR editorial structures, and the public clinical references used by the modern-medicine training content;
- responsive reflow and the existing account/course/home navigation language, without redesigning any earlier route.

The school white book supplies question provenance, not answer authority. The two exact fill-in prompts remain `answer confidence: missing`; the term and short-answer tasks are explicitly NUR adaptations whose structures were cross-checked against the recorded sources. Teacher-specific scoring remains pending.

### `/courses/tcm-diagnostics/knowledge-points/diet-and-taste/case-reasoning` — case-reasoning room

Main implementation:

- `src/app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/case-reasoning/page.tsx`
- `src/components/case-reasoning-room.tsx`
- `src/components/case-reasoning-room.module.css`
- top-level `CaseDefinition` data, validation, and selectors in the typed course engine

Implemented behavior:

- a reusable static nested route available only for registered knowledge points with an authored related case;
- a minimal entry from the knowledge-point `迁移` area that preserves its existing case-transfer exercise;
- one clearly marked NUR-adapted case, `两组线索不能合成一个结论`, with textbook, instructor-review, NUR-editorial, and public clinical-reference provenance kept distinct;
- eight evidence cards and four authored reasoning stages: `证据分组 → 病机与评估方向 → 暂定辨证结论 → 鉴别排除与边界`;
- learner draft, source-cross-checked structure reveal, per-stage self-check, and a small repair field for the earliest self-identified missing criterion;
- a 10-point NUR self-check split into shared evidence 2, TCM reasoning 4, modern-medicine evaluation 2, and relationship boundary 2;
- explicit notices that the prompt is not a school original or real patient record, the structure is not an instructor answer key, the score is not teacher grading, and no clinical diagnosis or individual medical advice is provided;
- source and teacher-rubric rails plus the approved local-only interaction model, without a backend, question bank, or persistence expansion.

The case definition is top-level course truth rather than a React-embedded transfer object. Its prompt authority, answer authority/confidence, scoring authority, source references, knowledge-point linkage, and four-stage ordering are separately validated. The NUR self-check is intentionally not automatic marking.

### Browser-local confirmed attempts and 48-hour weak-point return

Main implementation:

- versioned learner-memory contracts in `src/types/learning.ts`;
- knowledge-point memory criteria and per-task structural-assistance rules in `src/content/courses/tcm-diagnostics.ts`;
- validation in `src/lib/course-validation.ts`;
- strict browser storage, aggregation, and review transitions in `src/lib/learning-memory.ts`;
- `useSyncExternalStore` hydration in `src/hooks/use-learning-memory.ts`;
- shared A/B, confirmed-history, and return UI in `src/components/learning-memory-panel.tsx`.

Implemented behavior:

- A and B are global, independent browser-local preferences; A defaults on, B defaults off, and A's next-step prompt is a separate preference;
- suggested length is guidance rather than a gate: an early self-check immediately exposes the complete deterministic structural feedback;
- A updates from typed signal groups and keeps direct NUR rewrite sentences collapsed behind an explicit `改正` control;
- only a learner's explicit `完成自核并确认保存` action creates a versioned `LearnerAttemptRecord`; draft text, component state, and automatic suggestions never enter history;
- B shows only the latest confirmed version for the current task, starts with an approximately 80-character excerpt, and can expand the original learner prose;
- repeated omissions are recomputed from the latest confirmed version of distinct task/stage keys under one knowledge point and become formal only at three different tasks;
- the current confirmation may propose one combined review task, but never auto-enrols it; declining remains quiet until a later still-missing confirmed attempt;
- accepting sets the due time exactly 48 hours later; a later confirmed-present rewrite resolves the matching criterion and completes the task without requiring the learner to open `改正`;
- all learner memory stays in validated browser storage, separate from course truth, demo learner progress, the personal exam structure, and any server state.

### Bounded provider-neutral local NUR Agent

### 2026-07-22 Radical Agent Shift (per user direction)
- Explicitly broke the previous overly-restrictive "只判断结构覆盖" bounded philosophy.
- New strict order we defined:
  - Agent is a **point-specific writing & reasoning coach**.
  - **Primary job**: deeply read the student's actual `currentText`, quote specific phrases the student wrote, and diagnose against the registered criteria + sources for **that** knowledge point.
  - Must be concise and directly actionable. Lead with analysis of what the student actually wrote.
  - Still strictly bounded on authority: never fabricates medical facts or clinical advice outside the provided registered material; all state changes (favorites, attempts, review tasks) remain deterministic + require explicit user confirmation.
  - Internal 4-step trace is auditing only — not the student-facing experience (UI now hides it by default).
- Prompt (buildPrompt + system) and runtime step labels were updated to enforce quoting student text and sharp feedback.
- UI now surfaces the student's current draft first + "针对你文字的具体问题".
- Goal: make the in-site Agent genuinely useful so learners prefer it over opening external AI.
 runtime

Main implementation:

- shared strict API types in `src/types/nur-agent.ts`;
- request parsing, typed course-context resolution, a deterministic runtime, provider contract, xAI adapter, and response assembly in `src/lib/nur-agent/`;
- a Node.js Route Handler at `src/app/api/nur-agent/route.ts`;
- the on-demand bounded UI in `src/components/nur-agent-pilot.tsx`.

The browser sends stable course/offering/task IDs, current learner text, an optional previous-run ID, and at most eight confirmed learner-owned history records. The server rejects unknown IDs and resolves the actual prompt, NUR criteria, source provenance, scoring authority, and stable cross-task memory criteria from the validated course registry instead of trusting client-supplied authority text. The local runtime executes exactly four inspectable steps — resolve context, inspect answer structure, compare confirmed history, and select one action — then stops for learner input or because the authored structure is covered. It cannot save attempts, alter course truth, or mutate the 48-hour plan.

The provider contract has no tools; the first xAI adapter makes one structured-output request with `store: false` and can return only declared criterion IDs, at most one next step, eligible history IDs, and an optional rewrite-criterion ID. Human-readable labels, prompts, NUR rewrite text, sources, and authority notices are always reattached from typed local content. No server-side model credential exists on this machine, so `GET /api/nur-agent` reports both `agentRuntimeAvailable: true` and `configured: false`. A valid POST now returns a deterministic `agent-result` instead of 503; invalid input returns 400. If a future configured provider fails, the request visibly falls back to the same local policy. A credential is required only for optional model-assisted selection, not for the small Agent itself.

### Typed, data-driven course foundation

Completed on 2026-07-15:

- reusable strict TypeScript contracts for `tcm-primary`, `western-primary`, and `integrated` curriculum modes;
- explicit course-version dimensions for textbook edition, school, program, learner year, teacher, academic year, and semester, including honest pending/demo/verified states;
- typed course, chapter, knowledge-point, lens, relationship, source authority/scope, learning-route, task, assessment, case, offering-scoped exam-blueprint, personal exam configuration, and learner-state boundaries;
- a course registry that validates definitions before exposing them to routes;
- selectors for stage/all/weak chapter views, knowledge-point completion and lookup, route ordering, course-material versus knowledge-reference sources, data-driven exam grouping, and data-driven priority totals;
- runtime validation for unique IDs/slugs, stable order, URL-safe slugs, references, source and lens missing states, allowed relationship labels, lesson sections, evidence prompts, rubric arithmetic, progress bounds, learned/total bounds, demo-state identity, session totals, and exam arithmetic;
- per-course exam summary groups, priority notices, totals, and optional integrity rules, with no universal 100-point assumption in the reusable types, selectors, workspace, or validator;
- a declarative integrity rule in the 《中医诊断学》 definition preserving its user-provided 30 + 10 + 5 + 5 + 15 + 15 + 20 = 100 distribution;
- data-driven semantic progress elements for course progress and exam proportions without inline styles or visual redesign.
- a `useSyncExternalStore`-backed personal exam override with runtime parsing and row validation in `src/lib/user-exam-structure.ts`; this keeps browser configuration separate from course truth and avoids synchronous effect-driven hydration updates under React 19.

### Minimal material/source contract and real pressure-test fixtures

Completed on 2026-07-18 without copying originals into `public/` or building an importer:

- `MaterialAsset` uses full SHA-256 identity and keeps all original intake paths as aliases; MAT-020/MAT-080 is one asset with two paths;
- `MaterialSourceFamily` and `MaterialArtifact` preserve source family, format/revision kind, tracked revisions, and derived-from relations; MAT-057/MAT-058 remain one physiology white-book family with two artifacts;
- sources may retain repeated page/slide/image/table/question/OCR locators and material artifact IDs;
- OCR/transcription, document-integrity, privacy risk, and publication policy are explicit; MAT-070 remains local-only because the classroom photo contains identifiable people, and only its projection transcription enters course provenance;
- unresolved answer variants preserve independent authority and artifact provenance; the two MAT-111/MAT-113 histology conflicts cannot be upgraded to verified answers;
- validation rejects duplicate SHA identities, broken aliases/family relations, unreviewed OCR as verified truth, verified tracked revisions, unsafe publication, derivation cycles, and resolved-looking conflict variants;
- source types now include answer keys, experiment manuals, image sets, and transcription, but no unsupported CMS/import workflow was added.

### `/courses/physiology/knowledge-points/internal-environment-and-homeostasis` — `内环境与稳态`

Completed and browser-verified on 2026-07-18:

- the second registered course is `western-primary` and does not force a TCM lens or fabricate cross-system relationships;
- the authored lesson uses the verified fourth-edition textbook at PDF pages 20–21 / printed pages 5–6, the 南京中医药大学生理学教研室 white-book family, a local-only classroom transcription, and NUR editorial structure;
- four stages are `取证 → 建模 → 输出 → 迁移`; the final stage is a typed mechanism-transfer exercise rather than a fabricated syndrome/case flow;
- `KnowledgeLessonDefinition` now requires exactly one `transferCaseId` or `transferExercise`, preserving the existing TCM case route while allowing non-case physiology transfer;
- the page displays all five referenced sources, including the pending current-teacher rubric, and keeps current teacher/offering facts out of textbook truth;
- the physiology exam blueprint is an honest pending state with zero declared rows or totals, so it cannot inherit the TCM 100-point scheme.

### `/courses/physiology/knowledge-points/internal-environment-and-homeostasis/subjective-writing` — physiology writing room

Completed and browser-verified on 2026-07-18:

- two source-verbatim school white-book prompts cover `内环境` and `什么是内环境的稳态？有何生理意义？`;
- the PDF is the explicit baseline; the same-family DOCX retains tracked-change state and is not silently chosen as the authority;
- the white-book attached reference answer is modeled as `published-answer`, cross-checked against the textbook, while the NUR criterion rubric remains independently labeled `nur-platform`;
- 2021–2022 `稳态`名词解释 and 2022–2023 `内环境的相对稳定状态称为____` fill-in remain historical source candidates with missing answer state; they do not prove current frequency or teacher emphasis;
- the deterministic learning-memory UI is reusable here, but the NUR Agent remains intentionally limited to the existing `问饮食口味` pilot and is not rendered for physiology.

### Verification

After the first private-material intake increment on 2026-07-19:

- targeted contract checks covered an empty draft, a valid pending-review draft, catalog-hash duplication, confirmed eligibility, and JSON restoration;
- browser testing used synthetic fixtures only and covered a normal local PDF, two byte-identical batch files, a 26 MiB over-limit PDF, and unsupported ZIP; no original learning material was selected or changed;
- the normal file received a local SHA-256 and `待解析 / ocr-pending / pending-review`; the duplicate and both rejected files kept the intake gate disabled;
- initial defaults were `learner-private`, privacy `unknown` with document-metadata risk, `local-only`, `browser-memory-only`, and model transfer `not-authorized`;
- course/source/authority/school/teacher/year/semester/source-family fields, privacy confirmation, all four human checks, final gate passage, and reload restoration passed;
- 1440 × 1000 and 390 × 844 both reported `scrollWidth === clientWidth`; the browser warning/error log was empty;
- captures are `material-intake-passed-2026-07-19.png`, `material-intake-mobile-top-2026-07-19.png`, and `material-intake-passed-mobile-2026-07-19.png`;
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build; a baseline-only API regression still returned HTTP 200, provider assist `skipped`, nine chapters, 39 knowledge points, zero blocking issues, and four review issues;
- no key was read or rendered, no model request was triggered by intake, no original material entered `public/`, and no course/material registry was modified.

After the reversible intake usability follow-up on 2026-07-19:

- the existing restored candidate exposed both per-file `删除` and whole-batch `清空批次`; each operation cleared the batch or candidate, reset the eligible state to an identity draft, and offered `撤销`;
- undo restored the exact prior structured draft, review confirmations, eligibility, and any still-current session `File` handles;
- a synthetic PDF appended without replacing the existing candidate, changed the batch from one to two new identities, kept its raw handle only for the current session, and reset the four review confirmations;
- two byte-identical synthetic PDFs appended as one new identity plus one batch duplicate; deleting the first re-normalized the remaining duplicate before both synthetic candidates were removed;
- refresh/restored records visibly require reselecting the original binary before future parsing; `身份审核完成 · 内容尚未解析` and `尚未接入 · 不会自动开始` replace the ambiguous gate-only result;
- 1440 × 1000 and 390 × 844 again reported `scrollWidth === clientWidth`; accepted captures are `material-intake-reversible-2026-07-19.png`, `material-intake-reversible-mobile-2026-07-19.png`, and `material-intake-reversible-mobile-list-2026-07-19.png`, all using synthetic material only;
- browser warning/error logs remained empty and final `npm run check` passed; no original file, secret, model request, registry mutation, or deployment was involved.

After the DOCX-only local parsing pilot implementation on 2026-07-19:

- a versioned parsing contract now separates explicit authorization, parser identity, semantic blocks, unresolved parser/integrity issues, block-level decisions, and a preview-only course delta from the persisted intake record;
- the eligible `.docx` path requires an exact byte-size and SHA-256 recheck before parsing; a failed reauthorization removes the stale current-session handle for that candidate;
- a synthetic DOCX created outside the repository proved that the parser library recovered the expected heading, paragraph, and table text without reading any original learning material;
- `npm run typecheck`, `npm run lint`, and the Next.js production build passed; the running local route returned HTTP 200 and the development log showed no server warning/error for that request;
- the available in-app browser control could not acquire the already-open localhost tab in this implementation session, so no new interaction screenshot, browser-console assertion, or 1440 × 1000 / 390 × 844 overflow result is claimed for the new parser section. The earlier intake screenshots validate only the preceding gate and reversible-list milestone;
- no credential was read, no original material was opened, no binary entered `public/`, and the parser did not call DashScope, `/api/course-builder`, or any registry mutation path.

After the section-first review and private-overlay follow-up on 2026-07-19:

- long-document review now defaults to collapsed heading sections, with a 24-block fallback chunk for unheaded text, section/global bulk decisions, individual exception editing, and reversible deterministic noise handling;
- a versioned current-session overlay snapshots only accepted non-empty excerpts with their DOCX locators, section titles, target knowledge point, learner-private provenance, pending authority, and model transfer `not-authorized`;
- approving the overlay changes and preselects the material-pack selector, which shows the matched official base plus private file, target, section count, and excerpt count; the compile button changes to `等待模型传输授权` and cannot call the existing API;
- overlay withdrawal returns the selector to the official pack; any subsequent intake mutation invalidates all current-session overlays, and refresh erases them because no extracted text is persisted;
- ESLint and strict TypeScript passed with zero warnings; the local route returned HTTP 200 and the final development request/compile log was clean. A transient hot-reload undefined-prop error was observed during prop wiring, fixed with the completed parent contract and defensive empty default, and did not recur after recompilation;
- direct browser click-through, console reset, and 1440 × 1000 / 390 × 844 screenshots remain pending because the browser-control binding had no claimable localhost tab. No alternative browser automation was used.

After the one-time private-overlay transfer and bounded Course Builder follow-up on 2026-07-19:

- strict request tests preserved version-1 baseline-only and provider-preferred known-pack builds at nine chapters, 39 knowledge points, zero blocking issues, and four review issues;
- missing authorization and invalid privacy were rejected with HTTP 400, an 81-excerpt payload was rejected without truncation, an authorization/digest mismatch was rejected with HTTP 409, and replay of an already consumed authorization was rejected with HTTP 409;
- isolated private-provider-unavailable and fake-key provider-failure tests returned honest HTTP 503/502 errors with no draft and no baseline substitution; the failed authorization was still consumed and replay was rejected;
- one real `qwen3.7-plus` request used six accepted, synthetic-only DOCX excerpts / 161 characters for `course-tcm-diagnostics` and `kp-inquiry-diet-taste`; provider status was `used`, every returned decision referenced a known excerpt ID, and all six remained `review` under `learner-private / pending-review`;
- the locally recompiled private draft preserved the official nine-chapter/39-knowledge-point course, returned zero blocking and five review issues, remained explicitly non-official, and required all three human approval confirmations before `approved-for-local-preview`;
- browser QA exercised intake approval, exact-SHA reauthorization, explicit local parse consent, global accept/noise exclusion, knowledge-point targeting, individual excerpt editing, overlay approval/auto-selection, intake-change invalidation, refresh erasure of extracted text/overlay, reauthorization, exact transfer-manifest review, one-time confirmation, real build, excerpt decisions, and local-only human approval;
- the final browser warning/error log was empty; 1440 × 1000 and 390 × 844 both reported `scrollWidth === clientWidth`; captures are `course-builder-private-overlay-authorized-2026-07-19.png` and `course-builder-private-overlay-authorized-mobile-2026-07-19.png`, and contain only synthetic content;
- the original DOCX binary, filename, path, `File` handle, full SHA, pending/excluded block, image/OCR original, API key, and unrelated content were not included in the provider prompt, result draft, screenshots, logs, or documentation.

After the evidence-gated material-admission milestone on 2026-07-19:

- browser QA used one fully synthetic DOCX generated outside the repository; local parsing recovered 14 semantic blocks in five sections, and all 14 were explicitly accepted before the current-session overlay was approved;
- the candidate review displayed and exported the complete 64-character SHA-256, official DOCX MIME, 37,562-byte size, structured provenance, source family/artifact relation, 14 accepted excerpts, and 14 corresponding DOCX locators;
- approval remained disabled until conflict disposition and all eight identity/provenance/transcription/privacy/publication/source-family/authority/non-grant confirmations were complete; only then did the record become `approved-as-local-candidate` and enter the versioned browser store;
- the exported data-URL payload was parsed and strictly validated: version/kind/status were correct, path aliases were empty, original filename and `lastModified` fields were absent, all rights remained `not-authorized`, and every export-boundary grant was false;
- after refresh, the approved record recovered after client hydration while the raw file, parsing draft, overlay, and admission candidate disappeared; the Course Builder selector returned to the official base only, proving admission did not inherit build or transfer permission;
- reselecting the exact synthetic DOCX reproduced its SHA and restored the approved admission view without granting Course Builder use;
- 1440 × 1000 reported `scrollWidth === clientWidth === 1440`; 390 × 844 reported `scrollWidth === clientWidth === 390`; browser warning/error logs were empty;
- captures are `material-admission-approved-2026-07-19.png` and `material-admission-approved-mobile-2026-07-19.png`, both containing synthetic content only;
- the standards-based JSON download link and filename remained present and its encoded package was verified, but the in-app browser did not surface a data-URL download event before timeout, so event-level download capture is not claimed;
- final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build while preserving all nine product route instances and the two existing API boundaries.

After the first live DashScope provider pass on 2026-07-19:

- the user-supplied Alibaba Cloud Model Studio CSV was read without printing the credential; the real key was written only to ignored `.env.local` with filesystem mode `600`;
- the workspace-specific OpenAI-compatible base returned HTTP 200 and 229 available model IDs, including exact `qwen3.7-plus`;
- the adapter now resolves either public or workspace-specific compatible-mode bases and rejects any non-HTTPS or non-`aliyuncs.com` target;
- two real provider-preferred builds completed with `providerAssist.status: used`, provider `dashscope`, model `qwen3.7-plus`, and HTTP 200;
- each provider plan was recompiled into nine chapters and 39 knowledge points, then passed local course/material validation with zero blocking issues and the same four honest review gaps;
- the browser rendered `DashScope 已就绪`, `qwen3.7-plus 已配置`, `dashscope · qwen3.7-plus`, the full draft, and an empty warning/error log;
- 1440 × 1000 remained free of horizontal overflow; capture: `course-builder-qwen-live-2026-07-19.png`;
- no credential value entered Git status, browser DOM, screenshots, API summaries, or documentation.

After the first Course Builder milestone on 2026-07-18:

- lint, strict typecheck, and the production build passed during implementation; the final documentation-synced `npm run check` is recorded in `design-qa.md`;
- the production build contains static `/learn/course-builder` plus dynamic `/api/course-builder`, while preserving all prior route instances and `/api/nur-agent`;
- API smoke checks returned one unconfigured provider, default `qwen3.7-plus`, one allow-listed pack, 200 for both baseline-only and provider-preferred no-key builds, a valid nine-chapter/39-knowledge-point draft, zero blocking issues, and four explicit review issues;
- browser interaction covered the fallback build, complete metrics/trace/course map, 14-source ledger, all three approval checks, local-preview approval, and the standard JSON export link;
- desktop 1440 × 1000 and mobile 390 × 844 both reported `scrollWidth === clientWidth`; browser warning/error logs were empty;
- captures are `course-builder-result-2026-07-18.png`, `course-builder-mobile-top-2026-07-18.png`, and `course-builder-mobile-result-2026-07-18.png`.

After the material contract and physiology slice on 2026-07-18:

- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build;
- the build retained the original six product route instances and generated two additional SSG routes for physiology knowledge and subjective writing; the Agent API remains the only dynamic route;
- browser testing covered physiology section switching, absence of forced relationship cards, mechanism-transfer reveal, absence of a fake case-room link, writing input, answer reveal, `6 / 6` self-check, and source/answer/scoring authority display;
- all original six routes were revisited in the browser with their expected titles and H1s; browser error logs were empty;
- both new routes were checked at 390 × 844 with `scrollWidth === clientWidth === 390` and all four knowledge-stage buttons / both writing tabs present;
- captures are `physiology-homeostasis-transfer.png`, `physiology-homeostasis-subjective-writing.png`, and `physiology-homeostasis-subjective-writing-mobile.png`.

On 2026-07-15:

- `npm run check` passed ESLint, strict TypeScript, and the Next.js production build;
- both `/` and `/courses/tcm-diagnostics` were statically generated;
- browser testing covered route navigation, scope switching, chapter switching, learning-route switching, unit selection, drawer open/confirm/close, account menu, and responsive reflow;
- `design-qa.md` reports `final result: passed`;
- browser evidence is stored in `docs/design-references/`.

After the course-engine refactor on the same date:

- `npm run check` passed again, including a Next.js 16.2.1 production build with both routes statically generated;
- the registry validator caught and blocked a duplicate knowledge-point slug during implementation, demonstrating that the build-time integrity gate is active;
- Safari regression testing reconfirmed the default `本阶段 → 问诊 → 理解 → 问饮食口味` state, 4/9 chapter scope switching, `八纲辨证 → 输出 → 虚实辨证`, session drawer and ready state, account menu, homepage navigation, homepage reasoning progression, weekly-plan drawer, profile panel, and scaled responsive reflow;
- the current browser run showed no runtime error overlay;
- new captures are `course-workspace-data-driven-default.jpeg` and `course-workspace-data-driven-session.jpeg`.

After the first knowledge-point page on the same date:

- `npm run check` passed again, including the Next.js 16.2.1 production build;
- the new `/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]` route generated `/courses/tcm-diagnostics/knowledge-points/diet-and-taste` as static HTML from `generateStaticParams`;
- browser testing covered the course-workspace drawer entry, all four knowledge-point sections, evidence selection, answer input, each TCM/modern/boundary scoring criterion, 10/10 score calculation, case reveal, 100% local milestone progress, source links, account menu, course return link, homepage regression, and weekly-plan drawer;
- the modern-medicine scoring criteria contributed 4/10 to the platform rubric, matching the resolved product decision;
- course material state remained 0/4 pending, and the page did not invent textbook pages, teacher emphasis, review scope, or past-exam frequency;
- the current browser run showed no runtime error overlay and `design-qa.md` remained passed;
- new captures are `knowledge-point-diet-and-taste-evidence.jpeg`, `knowledge-point-diet-and-taste-compare.jpeg`, and `knowledge-point-diet-and-taste-output.jpeg`.

After the source audit and personal exam-structure milestone on 2026-07-16:

- the current offering displays 南京中医药大学、中西医结合临床、大一、2026 学年下学期 and the verified official third-edition textbook;
- the workspace shows 4/4 core material categories with traceable textbook, instructor-slide, instructor-review, and historical-exam labels, while copy still calls out the unattached original nine-page instructor final review, unverified student answer bank, and absent instructor rubric;
- B1 and B2 render only as `B1 型题` and `B2 型题`; no unverified multiple-choice/matching semantics remain;
- the personal exam editor was tested for row-name, count, and point edits; adding and removing question types; a visible non-default-total notice; save; reload persistence after hydration; and restoration of the course default;
- the personal configuration remained separate from the scoped course blueprint and did not alter the 30 + 10 + 5 + 5 + 15 + 15 + 20 integrity rule;
- workspace regression covered stage/all/weak filters, chapter and route switching, session drawer/ready state, account menu, homepage navigation, weekly-plan drawer, and the default `本阶段 → 问诊 → 理解 → 问饮食口味` state;
- knowledge-point regression covered textbook and instructor-review sources, all three relationship labels, modern-medicine scoring, answer input, and case-chain reveal;
- a 390 × 844 viewport check showed the personal exam editor without horizontal overflow and with all controls reachable through its scrollable drawer;
- final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build; the Next.js 16 smooth-scroll marker was added after the browser exposed the framework warning;
- current screenshots are `course-workspace-sourced-default.png`, `course-workspace-custom-exam.png`, `course-workspace-custom-exam-mobile.png`, `course-workspace-personal-exam.png`, and `knowledge-point-diet-and-taste-sourced.png`.

After restoring the interactive promotional homepage on 2026-07-17:

- the exact previous customized page source was recovered from the local Next.js development source map, including its medical-course reveal texture, account panel, and `你好，成绩将飞速提升` copy;
- `/` now serves the promotional homepage and `/learn` serves the unchanged approved weekly learning homepage;
- existing course-workspace and knowledge-point `本周` links now target `/learn`; no course content, visual styling, learner data, exam configuration, or knowledge-point behavior changed;
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build;
- the build statically generated `/`, `/learn`, `/courses/tcm-diagnostics`, and the existing knowledge-point route.

After completing the first subjective-writing room on 2026-07-18:

- `AssessmentItemDefinition` now separates prompt wording/provenance, answer authority/confidence, answer source references, and optional scoring authority/criteria;
- the first two exact school-white-book fill-in prompts were normalized with missing answers, while one term explanation and one short answer were authored as visibly NUR-adapted writing tasks;
- the new nested route was generated from the validated course registry and linked only from the existing knowledge-point `输出` section;
- browser testing covered first draft, answer-structure reveal, partial and complete self-checks, rewrite completion, question switching with state retention, TCM/modern/boundary scoring categories, source and authority rails, account menu, desktop and responsive reflow, and the knowledge-point entry link;
- regression testing covered the promotional reveal copy and `/learn` entry, the `/learn` weekly-plan drawer, course stage/all/weak filters, the browser-local exam editor, the course account menu, and the existing knowledge-point output section;
- no runtime error overlay or development-server error appeared; screenshots are `subjective-writing-room-default.jpeg`, `subjective-writing-room-completed.jpeg`, and `subjective-writing-room-responsive.jpeg`;
- final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build, including static generation of all five product routes.

After completing the first case-reasoning room on 2026-07-18:

- `CaseDefinition` is now a validated top-level course collection; authored lessons reference its ID instead of embedding case content in a React consumer;
- the dynamic case route is statically generated only for the registered `问饮食口味` case and is entered from the existing knowledge-point migration area;
- Safari inspection confirmed the editorial layout, four-stage navigation semantics, evidence controls, draft field, disabled-before-draft structure reveal, self-check controls, source rail, and explicit authority boundaries;
- local HTTP regression returned successful responses for `/`, `/learn`, the course workspace, the knowledge-point page, subjective-writing room, and case-reasoning room; the new route rendered its NUR training and case copy;
- `npm run typecheck`, `npm run lint`, and the Next.js 16.2.1 production build passed. The build statically generated the new case-reasoning path alongside the five existing product routes;
- the new desktop capture is `case-reasoning-room-default.jpeg`. The local computer-use bridge could inspect the route and controls but did not dispatch browser text-input events reliably, so its full manual draft/reveal/self-check sequence remains an explicit follow-up browser check rather than fabricated evidence.

After the 2026-07-18 navigation-clarity repair:

- the course workspace removed nonfunctional placeholder navigation and now exposes one direct three-card path for `知识点取证与对照 → 主观题完整表达 → 案例推理与修复`;
- the hero continuation control is a direct internal link when the selected unit has an authored lesson, rather than an interaction whose destination is hidden behind selection or double-click behavior;
- the case room shows the same three-step path and marks the current location, making the relationship between the course workspace, knowledge point, writing room, and case room explicit;
- the case, writing, and knowledge-point headers no longer present fake `题库 / 错题 / 模考` destinations;
- `allowedDevOrigins` now accepts the local `127.0.0.1` preview origin so development HMR is not blocked when the in-app browser uses that hostname;
- `npm run check` and a six-route local HTTP/content regression passed after the repair. The user confirmed the clearer path direction in the browser; a fresh screenshot set remains part of the next user-visible milestone QA.

After the 2026-07-18 course-entry responsibility repair:

- chapter and knowledge-point selection now exposes semantic pressed state plus a stronger visible selected row; changing a unit no longer feels inert;
- completion and selection are deliberately separate: the black check means `已完成学习`, while the cinnabar row and `当前选择` label identify the present target; selecting a completed unit preserves both meanings instead of replacing the check with another circular symbol;
- the selected block states whether the current `理解 / 输出 / 应用` task has real authored content or is `尚未建设`, rather than using the ambiguous `接入` language or pretending every demonstration unit has a destination;
- units without real content disable both planning and direct-start controls with `该任务尚未开放`; there is no hidden button through which a learner could falsely “connect” an unbuilt unit;
- `安排本次学习` remains the optional 45-minute queue flow, while the cinnabar action now directly enters the selected available understanding, writing, or case task;
- the confirmed queue ready state also follows the selected route instead of always returning to understanding;
- the course information rail now keeps visible `写作训练室` and `案例推理室` shortcuts for the completed `问饮食口味` vertical slice; no new route or placeholder surface was added;
- browser regression covered unavailable-unit feedback, direct writing navigation, the route-aware queue handoff, case-room shortcut, a clean hydration load, and 390 × 844 reflow with no horizontal overflow;
- final evidence is `course-workspace-direct-training.jpeg` and `course-workspace-direct-training-mobile.jpeg`; the clean browser warning/error log was empty.

After the browser-local learning-memory and bounded Agent milestones on 2026-07-18:

- browser interaction confirmed early self-check below the suggested character count, automatic A feedback after the authored count, collapsed and expanded `改正`, explicit confirmed saves, first-save B suggestion, B persistence, the 80-character history excerpt, and full-answer expansion;
- term explanation, short answer, and a case stage supplied three distinct-task omissions of the same stable memory criterion; the formal repeat appeared only on the third task;
- declining suppressed the proposal until a later still-missing confirmed attempt, accepting produced a due time exactly 48 hours later, and a confirmed improved rewrite completed the return task without opening `改正`;
- the previously pending case-room manual chain now passed in a reliable in-app browser: learner text input, structure reveal, self-check, focused repair, confirmation, step advance, and progress update all worked;
- responsive captures at 390 × 844 showed the confirmation, A/B settings, history, and 48-hour task without horizontal overflow;
- all six product routes were exercised again: promotional circular reveal, `/learn` weekly drawer, course scope/route/session queue, knowledge-point evidence/compare/output/transfer, writing memory, and case repair;
- all six product URLs returned HTTP 200 and the browser reported no warning/error logs;
- Agent smoke testing covered unconfigured status, invalid input, incomplete and structurally complete answers, on-demand rewrite, previous-run lineage, cross-task confirmed-history comparison, and a case stage; valid requests completed locally without a credential and no external model request was made;
- writing and case UI showed the four-step trace, deterministic/model-assist status, waiting/completed stop state, one next action, sources and authority; 390 × 844 inspection found no Agent overflow;
- final screenshots include `subjective-writing-learning-assistance.png`, `subjective-writing-confirmed-history.png`, `subjective-writing-confirmed-history-mobile.png`, `case-reasoning-learning-memory-accepted.png`, `nur-agent-local-runtime.png`, and `nur-agent-local-runtime-mobile.png`;
- final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build. The six product routes remain static or statically generated; `/api/nur-agent` is the only new dynamic server route.

### `/courses/{slug}` 题库课程体系（2026-09-09）

- 15 门题库课程（`src/content/courses/*-qb.ts`，AUTO-GENERATED）接入课程注册表：合计 **10,586 道可答题**；诊断学 2378（全量底稿）、中医诊断学 410（源题不足 600、缺口 190 如实登记）、其余 13 科各 599–600
- 生成器 `scripts/generate-qb-course.ts` + 共享边界转换 `src/lib/qb-course-transform.ts`：**不修改 336 个 extracted 底稿**；来源补充（sourceIds）、知识点内 order 重排（多文件 KP）、B1 共用题干并入成员 prompt、>4 成员 B1 组均匀拆分
- 通用课程落地页 `/courses/[courseSlug]`：章节题库网格 / 模考入口 / 材料来源 / 考纲状态；修复题库首页对无学习者状态课程的 404（新增 `selectQuestionBankChapterViews` 轻量视图，题库浏览不再依赖学习者状态）；`tcm-diagnostics` 专属工作台不受影响
- mock-exam：**蓝图 pending（rows 为空）时回退题库随机练习卷**——按题型可用量等比例分配 100 题×1 分（最大余数法 + 广度优先取题），诚实标注「非官方卷面结构」；导入考纲后自动按蓝图组卷
- 验证：tsc ✅（Trae 传染病学进行中文件除外）、注册表校验 17 门 ✅、npm test **219** ✅、路由冒烟全绿（含 `/courses/nonexistent` 404）
- 新 Trae 账号（2026-09-09 起）已完成传染病学提取（A16，600 道，`infectious-diseases/` 目录），契约偏差已纠正，`npx tsc --noEmit` + audit + consistency 全部通过，未入库

### 错题中心题库课程适配 + 设计-qa 浏览器补强（2026-09-10）

- 客观错题 `canRedo` 与题库练习页一致：A1 有选项 **或** B1/B2 组成员（不再要求 `item.choices`，B1 成员只有 `sharedChoices`）
- 无写作室、无课时的错题/弱项入口落到 **本章题库**（`/question-bank/{chapterSlug}` 或练习页），禁止链到不存在的 `/knowledge-points/...`（题库课程 `lesson: null`，知识点页 `dynamicParams=false` 会 404）
- `/learn` 周计划弱项芯片复用同一 `selectWeakKnowledgePointHref`
- 错题列表展示课程名；390 隐藏题型/次数列以避免横向溢出
- Playwright 390×844 + 1440×1000：落地页/题库首页/模考/练习/错题（注入生理学 B1 错答）全部 HTTP 200、无 404 文案、`scrollWidth === clientWidth`；B1 重做 href 指向练习页。证据见 `design-qa.md` 2026-09-10 节
- `npm test` 222（+3 href 选择器测试）

### P0 上线加固（2026-09-10）

- 切断 `next/font/google`：根布局不再拉取 Inter/Geist/Instrument Serif；`globals.css` 使用系统中文栈（PingFang / 宋体 / YaHei）
- `GET /api/health` JSON 探活；Docker healthcheck 改打此路径，不再用首页 HTML
- 安全头：`next.config.ts` + `Caddyfile`（nosniff / DENY iframe / Referrer-Policy / Permissions-Policy）；完整 CSP 未上（避免打断 Next 内联脚本）
- 对公发布面默认 **全部已注册课程**（内测；老习题集无法取得授权时不拆做题通路）。可用 `NEXT_PUBLIC_PUBLISHED_COURSE_SLUGS` 收窄
- 练习页改为按请求渲染（`dynamicParams=true`），不再为每道选择题静态预生成（避免 1 万+ 页面撑爆构建）
- `npm run prisma:provider postgresql|sqlite`：部署时切换 datasource，仓库默认保持 sqlite
- 传染病学 A16 extracted **明确不进本次发布**（不注册、不提交）
- 题库版权：无授权前不得对公售卖 15 科习题集

### 课程目录 `/courses`（2026-09-10）

- `/learn` 主导航「课程」进入目录，「题库」锚到题库分区
- 目录分「学习闭环」与「题库课程」；卡片进工作台，并提供刷题/模考直达
- 落地页返回链改为课程目录

### 执行流待决（2026-09-10 用户加入）：闭环生成 vs 私人资料学习

用户原问：现在有大量教材题库与教材内容，闭环生成是否真能生成其他课程内容；用户自带资料想用 NUR LEARN 学习、自测，这些功能是否真实存在。

**核实结论（对照代码，不是愿望）：**

1. **学习闭环引擎是通用的，内容不是自动长出来的。** 知识点课时、主观写作室、案例推理室可以挂到任意已注册课。真正写了 `lesson` 的只有《中医诊断学》若干知识点（问饮食口味、寒热、舌苔、表里、常见病脉标准层、脾胃标准层）和生理学「内环境与稳态」一条。15 门题库课 `lesson` 全为 `null`，只能刷题/模考/错题，没有理解—写作—案例闭环。
2. **Course Builder 不能从题库生成一门新闭环课。** `compileCourse()` 只改已有材料包课程的标题/focus/note/emphasis，不写 lesson、不写写作室、不写案例。官方包编译只服务中诊 allow-list，并保护那 6 条已写闭环。私人分析的 `compilationReadiness` 固定为 `insufficient-for-full-course`，且明确不注册第二门 `CourseDefinition`。
3. **用户自带资料：半真。** `/learn/course-builder` 可导入 DOCX → 准入摘录 → 一次性授权 Qwen 拆成私人学习单元（分组、参考答案、草稿、收藏、确认进学习记忆、重做、48h 复习提案）。这是真实通路，但：必须挂到**已注册课的某个知识点**上；只在当前浏览器会话；不进 `/courses` 目录；没有独立写作室/案例室；没有从题库课一键生成闭环。合成 DOCX 压测过；真实学生讲义未作为日常入口验收。

**不得把题库课对外宣传成闭环课。** 用户 2026-09-10 已裁定：官方闭环课由团队后做，不在当前自动生成。当前要核实/跑通的是：**学习者自有 DOCX/PDF（选择/填空/简答等）→ NUR LEARN 形式的练习流程**，不编译成官方课。

现状（切片后）：Word 与有文字层的 PDF 可走 `/learn/my-materials` 私人练习；扫描件不做 OCR；官方闭环仍由团队后写。

### GitHub 调研（2026-09-10，确认执行前）

不搬整套开源产品。分层沿用：浏览器抽字 → 闭式 JSON → 本地校验 → 现有练习 UI。

- **已有、继续用：** `mammoth`（`mwilliamson/mammoth.js`）本地 DOCX→HTML，已在 `docx-local-parser.ts`。
- **PDF 二期再加：** `mozilla/pdf.js` / npm `pdfjs-dist`。只抽文字层；扫描件不 OCR。必须 `enableScripting: false`（CVE-2026-16633）。
- **产品形态可参考、不要 fork：** Rankify-PDF2CBT、pdf2cbt（PDF→本地 CBT；后者 AGPL）。我们要的是 NUR 练习页，不是另一套模考壳。
- **不要引进：** `file2quiz`（Python/Windows Word）、`office-parser`（Go）、`tiku_data_generator`（死规则吃中文试卷，格式一变就碎）、浏览器 WebLLM、Dexie（一期 sessionStorage 够用）。
- **模型层：** 仓库已有 Vercel AI SDK，但 Course Builder 已用 DashScope Function Calling + 本地闭式校验。一期不换栈。

高效路径：几乎不加依赖。打开学习首页入口、分析目标改为私人工作区、扩展题型到 A1/填空/简答、分析结果接到现有练习/主观草稿契约。

### 私人导入练习（2026-09-10 切片已执行）

- `/learn/my-materials`：Word（.docx）导入 → 接纳摘录 → 一次授权 Qwen → 私人练习页
- 分析目标可为 `course-private-workspace / kp-imported-materials`，不必挂已注册课知识点
- 题型扩展：`a1-single` / `fill` / 原主观题；单选与填空可参考判定（来源候选或 Qwen 参考，不是教师分）
- 不注册 `CourseDefinition`，不进 `/courses` 目录；官方闭环不做
- `/learn` 导航增加「导入」
- PDF 文字层（pdfjs，`enableScripting:false`）可解析进同一练习链；扫描件标 `scan-or-empty-text-layer`，不做 OCR
- 练习页支持收藏筛选、确认写入浏览器学习记忆、复习提案与会话恢复
- 复习提案（含私人）已纳入 `/wrong-questions` 「复习提案」tab，全局可见并可回流到私人练习页（会话恢复或重开单元）
- 分析结果 + 练习状态（收藏/确认/草稿状态）从 sessionStorage 升级到 localStorage 持久；studio 新增「我的历史私人练习单元」列表（最近 5 个），支持一键恢复加载；清除历史按钮；跨 reload/tab 恢复可用
- 私人单选/填空提交判定后写入独立 `private-objective-attempts`（不进题库 store）；错题中心客观列表聚合这些错答，重做链到 `/learn/my-materials`
- 私人错题重做链带 `?unit=`；`/learn/my-materials` 按历史恢复对应单元，找不到则诚实提示
- 学习者导入隐藏建课审核表，自动填私人本机边界；上传区居中；摘录上限 240
- `/learn/course-builder` 对学生显示「Nur learn 正努力实现此功能中」（官方闭环课后做）
- 题库填空/名词/简答可书面作答；填空对照参考（不去拆「次/分」）；名词/简答不写入题库错题
- 本地 `next dev` 固定 webpack，避免本仓库 Turbopack 空转导致整站卡在加载页
- 传染病学 Trae 底稿仍不注册、不进本次发布

### 运维窄修（2026-09-10）

- 登录用户的 Course Builder / NUR Agent / Agent chat 配额失败改为 503 中止，不再 `catch {}` 后继续打模型
- 生产 `NODE_ENV=production` 且无可用 D1 时，必须 `postgresql://` DATABASE_URL，禁止落到 sqlite
- Docker 构建切 prisma provider 为 postgresql；未上 Uptime/OpenAPI/MinIO

## 6. Verified Course Facts, Demonstration Data, and Remaining Gaps

Verified or directly user-confirmed through 2026-07-18:

- course scope: 南京中医药大学、中西医结合临床、大一、2026 学年下学期;
- official current textbook: 《中医诊断学（第3版）》, 吴承玉、王天芳主编, 上海科学技术出版社, 2018年5月第3版, ISBN 978-7-5478-3952-2;
- textbook pages 60–61 contain `问饮食口味`, including 口渴与饮水、食欲与食量 and the seven recorded口味 categories;
- `中诊保命重点.pdf` and the five `PPT重点` files were directly provided by the instructor;
- the review sheet explicitly points to textbook pages 60–61, including 消谷善饥、饥不欲食 and every sentence of the口味 section;
- `南京中医药大学中医诊断学试题.doc.doc.doc` is the school's white-book question material;
- its `练习06卷` includes the exact fill-in prompts about `消谷善饥，兼多饮多尿，形体消瘦者` and `病人口淡乏味`; the document does not provide an answer key, so both candidates remain answer-missing;
- the 2021–2022 paper is a TCM Diagnostics historical final; the two later files titled only `《诊断学》` are Western Diagnostics and must not be mixed into the TCM course;
- modern medicine enters NUR answer-and-score training, but remains separately reasoned and is not evidence of the instructor's rubric.

Still demonstration/editorial:

- workspace learner progress, chapter completion, demo weak-priority state, and the 45-minute session allocation in `src/content/demo/tcm-diagnostics-learner-state.ts`; confirmed attempt memory and review tasks are separately identifiable browser-local learner state, not course truth;
- most chapter/unit descriptions outside the sourced `问饮食口味` slice;
- the NUR 10-point practice rubric, practice prompt, and transfer case. They are platform training content, not teacher-authored scoring.

Still pending or unverified:

- instructor name;
- the original nine-page instructor final-review PDF, which the user confirms exists but has not supplied;
- instructor-authored subjective-answer scoring standards or marked answers; the user confirms none are currently available;
- the precise semantics of B1 and B2 for the current offering;
- question-level correctness of the student choice-bank answers;
- chapter-specific historical frequency and current-teacher emphasis beyond what the attached instructor materials explicitly say.

Never silently convert demo, student-compiled, historical, or NUR-authored content into current instructor truth.

## 7. Current Architectural State and Remaining Limitations

The hard-coded chapter limitation is resolved. The approved course workspace and both vertical slices are generated from typed, reusable, validated course definitions, with demo learner state kept separate from content truth. The registered physiology course proves that the same dynamic knowledge-point and subjective-writing route files support a `western-primary` lesson without copying React pages. Physiology does not yet have a dedicated course-workspace route or discovery entry; its fallback navigation returns to `/learn` so no broken `/courses/physiology` link is exposed.

There is still no:

- attached original nine-page instructor final-review file or instructor scoring rubric;
- database-backed backend or CMS;
- authentication or server-side persistence;
- real learner progress engine;
- full question bank, review engine, or mock-exam route.

The engine now includes a typed knowledge lesson with sections, evidence prompts, one or more curriculum-appropriate reasoning blocks, a practice rubric, exactly one transfer case or non-case transfer exercise, and page-level material-linked sources. Its top-level assessment items distinguish source-verbatim from NUR-adapted prompts, missing/unverified/cross-checked/verified/conflict answer state, answer authority, and optional scoring authority. Its top-level case definition separately models prompt provenance, evidence roles, four TCM reasoning stages, answer authority/confidence, scoring authority, and source references. Personal exam configuration and learning memory are separate validated browser stores; drafts remain component state, and no learner state is persisted on the server.

## 8. Completed Milestone and Next Priority

The dual-view knowledge-point page, dedicated subjective-writing room, four-stage case-reasoning room, browser-local confirmed-attempt/48-hour return loop, and provider-neutral local Agent runtime for `问诊 · 问饮食口味` are complete. The modern-medicine hierarchy question remains resolved: it enters NUR platform answer and scoring training, while remaining separately reasoned and explicitly non-equivalent.

### Five additional official-pack TCM loops completed

On 2026-07-19, the user selected deeper official 《中医诊断学》 coverage as the next narrow increment. Five existing demo knowledge-point IDs were upgraded in place, preserving the 9-chapter / 39-knowledge-point course structure and all reusable route contracts:

- 舌诊「望舌苔」：舌质舌苔合参，重点鉴别腐苔与腻苔；（**2026-08-17 已升级为第3个完整闭环**，见下）
- 问诊「问寒热」：恶寒发热、但寒不热、但热不寒、寒热往来；（**2026-08-17 已升级为完整闭环**，见下）
- 脉诊「常见病脉」：按位、数、形、势组织浮沉迟数与洪脉；（**2026-08-17 已升级为标准层**，见下；**不是**完整闭环）
- 八纲辨证「表里辨证」：表证、里证及表里转化；（**2026-08-17 已升级为第4个完整闭环**，见下）
- 脏腑辨证「脾胃病辨证」：脾气虚与脾阳虚鉴别；既有合成四阶段病案保留不扩写；（**2026-08-17 已升级为标准层**，见下；**不是**完整闭环）

Each point has a four-section lesson, evidence groups, TCM and modern-observation blocks with `可关联 / 帮助理解 / 不可直接等同`, NUR practice scoring, a transfer exercise or case, and one scored NUR-adapted short answer. Exact school/white-book prompts for tongue, cold/heat, pulse, and exterior/interior are retained as source-verbatim candidates with `answer.status = missing` and no scoring; they are not promoted to school answers. Teacher-specific grading remains pending.

### 问诊「问寒热」closed loop upgrade (2026-08-17)

`kp-inquiry-cold-heat` / slug `cold-and-heat` was upgraded from the thinner deep-loop skeleton to a diet-and-taste-class vertical slice in `src/content/courses/tcm-diagnostics.ts` (with deep-loop assessment/candidate orders preserved in `tcm-diagnostics-deep-loops.ts`):

- **Lesson** `inquiryColdHeatLesson`: 取证 → 对照 → 输出 → 迁移；evidence groups for 并见/单见/往来、轻重节律、兼症与四诊、病程与现代评估；TCM + modern lenses with `可关联 / 帮助理解 / 不可直接等同`；NUR practice scoring；`transferCaseId: case-inquiry-cold-heat-reasoning`.
- **Writing**: NUR-adapted term (`寒热往来`) + structure short-answer with full criteria + 1:1 `assistanceRules` mapped to `learningMemoryCriteria` (plus deep-loop memory ids retained so deep short-answer assistance still resolves).
- **Case**: four-stage reasoning room (evidence → mechanism → syndrome → differential), 10-point NUR structure scoring, boundary note, not clinical diagnosis.
- **Assessments hung on KP** in stable ascending order: deep short + historical missing candidate + QB/complete bank items + NUR term/short (orders 1–2, 3–6, 12–14, 20–21).
- **Sources**: textbook P52–53 and teacher-review pages; course also registers missing `source-tcm-diagnostics-whitebook` so pulse/exterior white-book locators validate honestly.
- **Routes generated**: `/courses/tcm-diagnostics/knowledge-points/cold-and-heat`, `.../subjective-writing`, `.../case-reasoning`.
- **Verification**: `validateCourseDefinition` 0 issues; `npm run check` (lint + typecheck + production build) green. Teacher scoring rubric and original nine-page final review remain pending; white-book/historical answers remain missing and are not promoted.

### 舌诊「望舌苔」closed loop upgrade (2026-08-17)

`kp-tongue-coating` / slug `tongue-coating` was upgraded from the thinner deep-loop skeleton to a diet/cold-heat-class vertical slice. Content lives in `src/content/courses/tcm-diagnostics-tongue-coating-loop.ts` and is registered from `tcm-diagnostics.ts` (deep-loop short-answer + white-book missing candidate + QB items remain hung; scoring id for the new structure short is `scoring-tongue-coating-structure-short` to avoid collision with deep `scoring-tongue-coating-short`).

- **Lesson** `lesson-tongue-coating`: 取证 → 对照 → 输出 → 迁移；evidence for 苔质颗粒/黏着刮除、苔色厚薄润燥、舌质兼症合参、观察条件；TCM + modern lenses with three relationship labels；NUR practice scoring；`transferCaseId: case-tongue-coating-reasoning`.
- **Writing**: NUR-adapted term (`腐苔`) + structure short-answer (腐腻鉴别 + 意义 + 合参 + 现代条件 + 边界) with criteria + 1:1 `assistanceRules` → 5 primary `memory-tongue-coating-*` criteria (plus 3 deep-loop memory ids retained).
- **Case**: synthetic four-stage room — thick fine adhesive hard-to-scrape slightly yellow coating + 脘胀口黏纳呆 + missing tongue body/pulse + post-meal yellowish photo bias; 10-point NUR structure scoring; not clinical diagnosis.
- **Assessments hung on KP**: deep short + whitebook missing + QB/complete + NUR term/short (orders 20–21).
- **Sources**: textbook P37/P39 + teacher review (existing deep-loop verified sources); no fabricated exam frequency or teacher rubric points.
- **Routes**: `/courses/tcm-diagnostics/knowledge-points/tongue-coating`, `.../subjective-writing`, `.../case-reasoning`.
- **Verification**: `validateCourseDefinition` 0 issues. Full `npm run check` recorded with this milestone. Pilot then had three diet-class closed loops: 问饮食口味、问寒热、望舌苔. （表里辨证随后升为第4个，见下。）

### 八纲「表里辨证」closed loop upgrade (2026-08-17)

`kp-eight-principles-exterior-interior` / slug `exterior-interior` was upgraded from the thinner deep-loop skeleton to a diet/cold-heat/tongue-class vertical slice. Content lives in `src/content/courses/tcm-diagnostics-exterior-interior-loop.ts` and is registered from `tcm-diagnostics.ts` (deep-loop short-answer + white-book missing candidate + QB items remain hung; new structure short scoring id is `scoring-exterior-interior-structure-short`; term scoring `scoring-exterior-interior-term`; case scoring `scoring-case-exterior-interior-reasoning`).

- **Lesson** `lesson-exterior-interior`: 取证 → 对照 → 输出 → 迁移；evidence for 病程与起势、表位线索、里位与四诊复核、转化/兼夹与现代边界；TCM + modern lenses with three relationship labels（可关联 / 帮助理解 / 不可直接等同）；NUR practice scoring；`transferCaseId: case-exterior-interior-reasoning`.
- **Writing**: NUR-adapted term (`半表半里证`) + structure short-answer（表/里界定与鉴别 + 转化/兼夹边界 + 现代病程–系统观察 + 不可直接等同）with criteria + 1:1 `assistanceRules` → 5 primary `memory-exterior-interior-*` criteria (plus 3 deep-loop memory ids retained).
- **Case**: synthetic four-stage room — D0 表症组合 → D2 恶寒减/高热口渴心烦便结（入里倾向）+ 舌脉与检查缺口 + 家属标签压力；10-point NUR structure scoring; not clinical diagnosis; deliberately separates 转化 vs 表里同病 vs 半表半里.
- **Assessments hung on KP**: deep short + whitebook missing + QB/complete + NUR term/short (orders 20–21).
- **Sources**: textbook P89–91 + teacher review (existing deep-loop verified sources) + editorial; no fabricated exam frequency or teacher rubric points.
- **Routes**: `/courses/tcm-diagnostics/knowledge-points/exterior-interior`, `.../subjective-writing`, `.../case-reasoning` (SSG confirmed in production build).
- **Verification**: `validateCourseDefinition` 0 issues; `npm run check` (lint 0 errors / existing warnings + typecheck + production build after clean `.next`) green. Pilot diet-class closed loops now **four**: 问饮食口味、问寒热、望舌苔、**表里辨证**. Teacher scoring rubric remains pending; white-book/historical answers remain missing and are not promoted. No commit/push/deploy in this slice.

### 标准层升级：脉诊「常见病脉」+ 脏腑「脾胃病辨证」(2026-08-17)

两个 deep-loop 工厂 KP 升为 **标准层**（完整 lesson + 双镜三关系 + 可写作进记忆），**明确不是**第 5、第 6 个完整闭环：不新增/扩写四阶段 case 评分，不同步/Agent/会员改动。

| KP | slug | companion | 写作 | case |
|---|---|---|---|---|
| `kp-pulse-common` | `common-pulses` | `tcm-diagnostics-common-pulses-standard.ts` | 简答（保留 deep id）+ 名词「洪脉」order 20 | **无**（`caseIds: []`，lesson 用 `transferExercise`） |
| `kp-organs-spleen-stomach` | `spleen-stomach` | `tcm-diagnostics-spleen-stomach-standard.ts` | 简答（保留 deep id）+ 名词「脾阳虚证」order 20 | **保留**既有 `case-spleen-qi-yang-differential`（deep-loops 本体不改）；lesson 仅 `transferCaseId`，无并行 transferExercise |

- **共用约束**：memory id 保留 `common-pulses-memory-*` / `spleen-qi-yang-memory-*`（3 条）以便历史 attempt 与 case assistanceRules 不断链；assistanceRules 1:1；来源诚实（白皮洪脉 `answer.missing`；NUR 改编不冒充教师标准答案）；三关系标签 related / learning-aid / not-equivalent。
- **接线**：`tcm-diagnostics.ts` 用 `buildCommonPulsesKnowledgePoint` / `buildSpleenStomachKnowledgePoint` 替代 `withQuestionBankItems(deepKnowledgePoints.pulse|spleen)`；assessment 数组挂 `commonPulsesAssessmentItems` + `spleenStomachAssessmentItems`。
- **deep-loops**：`deepAssessmentItems` 去掉 pulse 简答/白皮与 spleen 简答，避免 id 重复；`spleenReasoningCase` 仍导出并注册于 course.cases。
- **Routes**：两 KP lesson + subjective-writing；脾胃既有 case-reasoning 仍可走；脉诊**无** case-reasoning。
- **Verification**：`validateCourseDefinition` 0 issues；`selectSubjectiveWritingItems` 各 2 题；`npm run check` 见本切片记录。No commit/push.

The material catalog now records the supplied third-edition textbook, two-page teacher review, all five heart/lung/spleen/liver/kidney slide artifacts, the 2021–2022 TCM final, and the legacy school white-book file with full SHA identity, source family/artifact relations, privacy/publication state, and read-only path aliases. Page locators were visually checked at textbook P37/P39, P52–53, P60–61, P69/P71/P73/P79, P89–91, and P121–123; other teacher-review page pointers remain source-declared or pending rather than silently upgraded. The two files titled only `《诊断学》` are separate misfiled Western Diagnostics artifacts and remain excluded from TCM truth.

Browser QA covered all five knowledge routes, all five writing routes, and the spleen case route. A real draft and evidence-selection interaction passed; reusable UI copy was corrected so non-inquiry loops show `关键证据`, the writing hero names the active knowledge point, and the case-path accessible label names the active knowledge point. Browser warning/error logs were empty. Desktop 1440 × 1000 and all eleven new route instances at 390 × 844 reported no horizontal overflow. `npm run check` passed ESLint, strict TypeScript, and the Next.js production build. Accepted captures contain only the synthetic spleen case: `tcm-deep-loop-spleen-case-desktop-2026-07-19.png` and `tcm-deep-loop-spleen-case-mobile-2026-07-19.png`.

### Official 《中医诊断学》 material pack v1 completed

On 2026-07-19, the user selected a course-wide official material pack rather than continuing to hand-author one knowledge point at a time. The implementation adds no route, React page, CMS, database, authentication, synchronization, server material store, or publication path.

The v1 pack reuses the existing `MaterialAsset`, `MaterialSourceFamily`, `MaterialArtifact`, `SourceReference`, `CourseDefinition`, assessment, case/transfer, and Course Builder boundaries. Its manifest includes nine artifacts: the third-edition textbook, the two-page teacher review, all five organ-differentiation slide PDFs, the 2021–2022 TCM historical final, and the school white-book question document. The two later papers titled only `《诊断学》` are catalogued as misfiled Western Diagnostics artifacts, forced `local-only`, and explicitly excluded.

The evidence matrix is generated against the registered course's 39 stable knowledge-point IDs and records chapter, depth tier, source/artifact, page/question locator, authority, scope, question normalization, answer authority/confidence, conflict state, OCR state, and missing facts. It classifies 10 points as `core-loop`, 15 as `standard-loop`, and 14 as `foundation`. Historical questions explicitly carry `currentFrequencyClaim: not-authorized`; the white book and historical final remain answer-missing; student answers are not admitted; slide OCR remains pending; the original nine-page teacher review and real teacher rubric remain pending on every affected target.

`OfficialPackBatchCompileRequest` is fixed to `deterministic-evidence-matrix`, targets the existing `CourseDefinition` contract, and carries `modelUse: not-authorized` plus `publication: not-authorized`. `OfficialPackBatchCompileResult` regenerates one draft contract per knowledge-point ID without changing React. The six existing lessons are protected and compile as `preserve-authored-loop / preserved`; other core/standard points target existing lesson/assessment contracts only when evidence permits, while foundation points remain `pending-evidence`.

The official-pack validator checks Asset–Family–Artifact identity, included/excluded disposition, exact 39-point coverage, tier counts, locators, question/answer boundaries, historical-frequency non-claims, protected lessons, and all non-grants. A baseline-only API regression returned a ready-for-review nine-chapter/39-point CourseDraft with six lessons, 13 assessments, two cases, zero blocking issues, four review issues, and an official batch result of 9 included / 2 excluded, 39/39 covered-or-pending, 10/15/14 tiers, six preserved lessons, and zero pack blocking issues. Final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build with 23 generated pages. No model request, original-file write, browser UI change, registry mutation, publication, staging, commit, push, or deployment occurred. The audit is `docs/materials/2026-07-19-tcm-official-pack-v1.md`.

### Course Builder product correction: analyze first, compile later

Later on 2026-07-19, a real browser-local physiology overlay exposed a mismatch between the intended product and the implemented private Course Builder. The overlay targeted `course-physiology / kp-physiology-internal-environment-homeostasis`; the provider status was `configured: true` for `dashscope / qwen3.7-plus`, the exact transfer authorization was ready, and the build button appeared enabled. The only allow-listed base pack was nevertheless `course-tcm-diagnostics`. `runBuild` therefore found `selectedOverlayBasePack === null` and silently returned before issuing any model request or consuming the authorization. The current physiology excerpts were not sent.

The user resolved the underlying product rule, not just the UI defect: Qwen material analysis must not require a pre-existing official base pack or enough evidence for a complete course. A learner may import a small, self-contained set such as approximately 20 short-answer questions and should be able to study it immediately. Qwen should normalize and group the questions, infer candidate topics, generate clearly labeled NUR/Qwen reference-answer drafts, record uncertainty and missing source answers, and return a usable partial private learning unit. If the material cannot support a complete course workspace, that is an output state rather than a reason to prevent learning.

The Course Builder must therefore become two stages:

1. **Private-material analysis and decomposition** — accepts bounded, privacy-eligible, explicitly accepted excerpts under an exact one-time transfer authorization; may target any declared course; returns structured candidate topics/questions/answers, source locators, confidence, conflicts, missing facts, and `partial / insufficient / unmapped` coverage without requiring an official pack.
2. **Optional course compilation** — maps an analysis result into the existing typed `CourseDefinition` / knowledge-point / assessment contracts when an official base or adequate private structure exists, re-runs deterministic validation, and still requires human approval. Official-pack matching is a compilation concern, not an analysis prerequisite.

This must not create a second course truth model. The analysis result is an intermediate private draft; a partial private workspace reuses existing course, assessment, writing, learning-memory, and authority boundaries. Model-only answers are `NUR / Qwen generated reference answers`, never school answers, verified textbook answers, or teacher rubrics. The existing privacy gate, exact manifest, raw-file exclusion, one-time transfer, source/answer/scoring separation, non-publication rights, and official-pack validators remain intact.

The correction was implemented later on 2026-07-19. A new versioned `private-material-analysis` request binds the exact overlay digest, course/knowledge-point target, accepted excerpt IDs/locators, provider/model, counts, privacy state, and `one-private-analysis` authorization without carrying a base-pack ID. The Route Handler accepts this request under a 96 KiB body boundary, validates the target against the existing registered courses, consumes the authorization before provider availability/call, and returns visible typed 400/409/502/503 errors with `baselineAvailable: false`. Success and failure both require a new authorization. The former `selectedOverlayBasePack === null` silent-return path is gone.

The server-only DashScope adapter uses forced Function Calling for `qwen3.7-plus`; its function parameters are a closed JSON Schema whose target fields and allowed excerpt IDs are fixed to the request. The local parser still rejects unknown fields, target changes, unknown IDs, invalid question/topic relationships, and authority drift. Deterministic normalization owns redundant state: headings become honest `unmapped` items, topic excerpt coverage is derived from question mappings, duplicate excerpt references retain only their first valid assignment, and any known excerpt the model does not stably map is downgraded to `unmapped / pending review` rather than fabricated or used to fail the whole analysis. Source locators, generated-answer authority, scoring absence, coverage downgrade, and all four non-grants are attached locally.

The result compiles only a versioned `private-material-learning-unit` with `private-current-session` visibility, candidate topics, normalized subjective questions, exact locator references, one Qwen answer draft plus deterministic concise/exam/expanded views, conflicts, missing facts, and `partial / insufficient-for-full-course / unmapped` coverage. Model-only answers display exactly `NUR / Qwen 生成参考答案 · 尚无来源标准答案`; source-answer status and `scoringAuthority: not-provided` remain separate. The UI exposes idle, running, success, and typed error states, JSON export, explicit optional-later official compilation copy, and same-tab `sessionStorage` recovery of the validated structured result. It does not create or register a second `CourseDefinition`.

API and browser pressure tests used a synthetic DOCX outside the repository containing one title plus 20 physiology short-answer prompts. The representative browser run targeted the registered `course-physiology / kp-physiology-internal-environment-homeostasis` with no physiology official pack, sent 21 accepted excerpts / 405 characters under a fresh exact authorization, and returned four candidate topics, 20 questions, one deterministic title `unmapped`, all source answers `missing`, all generated answers `nur-qwen-generated`, all scoring authority `not-provided`, complete three-view answers, and publication/catalog/registry/official-compilation rights `not-authorized`. A separate successful desktop run returned 19 questions plus two honest unmapped items, demonstrating that model insufficiency remains a usable result. Failure states were visible and consumed their authorization; a replay returned 409, an unregistered target returned 400, and the official TCM baseline regression still returned nine chapters, 39 knowledge points, 39-point coverage, 10/15/14 tiers, six preserved authored loops, and zero blocking issues.

The current deterministic NUR Agent is still useful but is not yet intelligent enough for this flow. The agreed direction is a bounded learning Agent whose reasoning engine is Qwen and whose typed tools cover material analysis, answer drafting, length/style rewrite, structural omission diagnosis, source comparison, favorite proposals, confirmed-attempt recording, and review scheduling. Qwen reasons and proposes; deterministic application code owns state mutations and permissions. Real-time help should combine immediate local checks with debounced or explicit Qwen calls rather than sending every keystroke.

GitHub research found that `codecrafters-io/build-your-own-x` is a tutorial index rather than an embeddable Agent framework. The strongest near-term fit is Vercel AI SDK for provider-neutral TypeScript structured output, tool loops, streaming UI, and OpenAI-compatible/Alibaba providers. LangGraph.js is a useful reference for state graphs, interruption, memory, and human-in-the-loop; Qwen-Agent is a useful official Qwen reference but is primarily Python; Mastra is broader than the current local-only need; AG-UI may later help standardize frontend Agent events. Do not add a large framework before the smaller typed boundary is proven.

### Read-only material intake completed

On 2026-07-18, 118 effective source candidates were inventoried without moving, overwriting, deleting, publishing, or ingesting the originals: 中医诊断学 23、生理学 37、生物化学 11、医古文 7、组织胚胎学 38、跨课程笔记 2. The durable artifacts are:

- `docs/materials/2026-07-18-material-inventory.md` — one row per candidate with course, original relative path, format/extent, authority group, status, privacy note, and hash prefix;
- `docs/materials/2026-07-18-material-fingerprints.tsv` — full SHA-256, byte size, and modification time;
- `docs/materials/2026-07-18-material-intake-report.md` — authority layering, coverage, mapping, conflicts, missing facts, privacy/copyright controls, and proven engine gaps.

The intake proved one byte-identical, cross-directory misfiled Western Diagnosis exam; a same-source physiology white-book PDF/DOCX family; tracked revisions in the physiology white book and biochemistry big-question bank; two direct histology answer conflicts; a likely mislabeled Medical Classical Chinese exam; OCR/privacy risks; and NUR/Codex-derived review documents that cannot serve as independent academic authority. No received material provides a verified current-teacher scoring rubric.

The smallest content-layer extensions proven by the report are now implemented for global material identity, source families/derivation, repeated locators, transcription/integrity/privacy/publication state, and conflicting answer variants. React pages remain data-driven, and no CMS/import backend was added. Structured assessment media/options remain deferred because the selected physiology slice did not require them.

After implementation and documentation sync, `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build. The generated product surface is the original six routes, two physiology route instances, the Course Builder route, and two dynamic API boundaries (`/api/nur-agent` and `/api/course-builder`).

The best-supported second vertical slice, 生理学「内环境与稳态」, is now written into course truth and verified through the existing dynamic knowledge and writing routes. It uses the fourth-edition textbook, 南京中医药大学生理学教研室 white book, classroom transcription, a short-answer collection, and two historical exam locators without promoting any of them to current-teacher scoring.

On 2026-09-04, the batch physiology question-bank extraction was completed to the agreed volume: 未商业化阶段每本教材限定 600 题、按章节等比缩放，官方《生理学学习指导与习题集》第3版（人民卫生出版社，主编：罗自强、祁金顺）12 章同比取整后合计 599 道独立记分题，落在 `src/content/courses/physiology/extracted-physiology-ch{1..12}.ts` 并由 `index.ts` 聚合导出 `physiologyExtractedItems` / `physiologyExtractedGroups`。这些 extracted 数据是题库底稿，未写入 `physiology.ts` 课程 truth 定义，也未改动 course 注册表或发布门控。

On 2026-09-04, the batch medical-genetics question-bank extraction was completed to the agreed volume: 官方《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲，ISBN 9787117273381）21 区（绪论 + 20 章）按习题区字符占比同比取整预算 601 道独立记分题；第11章《多基因病》因源题量与可清晰提取题所限如实实取 37（预算 39），整本合计 599 道独立记分题（含 B1 组成员）落在 `src/content/courses/medical-genetics/extracted-medical-genetics-ch{0..20}.ts`，由 `index.ts` 聚合导出 `medicalGeneticsExtractedItems` / `medicalGeneticsExtractedGroups`。取值严格对照源「参考答案」正确项，A1/A2→a1-single、X 型多选→a1-single（用 xMapNote）、B 型→Group、名词解释→term、简答→short-answer、病案/计算→case；选项随机重排并同步 correctChoiceIndex(0 起)；ID 全局唯一、order 逐章 1..N 连续（脚本审计通过）；缺失答案 0、无法可靠提取 0；`npm run check` 通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控，符合 docs/QUESTION_BANK_EXTRACTION.md 既定顺序（医学遗传学之后本为卫生统计学，后经用户调整优先为生物化学，见下）。

On 2026-09-04，按用户「跳过卫生统计学，按顺序开始提取」的指示，把原 B2 提前并完成《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）题库提取：本书为原生文本层但双栏排版错序，已按生物化学与分子生物学医学语义逐章恢复；27 个正文章节分件按各章习题区字符占比同比取整预算合计恰好 600 道独立记分题（含 B1 组成员），落在 `src/content/courses/biochemistry/extracted-biochemistry-ch{1..27}.ts`，由 `index.ts` 聚合导出 `biochemistryExtractedItems` / `biochemistryExtractedGroups`。映射遵循本书契约（scripts/biochem-CONTRACT.md，切片 scripts/biochem-slice.py、审计 scripts/biochem-audit.py）：A1/A2→a1-single、X 型多选→a1-single（promptSource.note 标注）、B 型配伍→Group b1（sharedChoices + 成员）、名词解释→term、简答→short-answer；选择题正确项严格对照源「参考答案」关键字、选项随机重排并同步 correctChoiceIndex(0 起)；分章预算均精确达标（审计：各章 order 逐章 1..N 连续、ID 全局唯一、合计 600/600）；缺失答案 0、无法可靠提取 0；`npm run check` 通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控，符合 docs/QUESTION_BANK_EXTRACTION.md（下一本转至 B1 组织学与胚胎学第4版学习指导；卫生统计学已按用户决定跳过、保留在 B3 供后续按需回归）。

On 2026-09-04，完成《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）题库提取：本书为原生文本层但双栏排版错序，已按组织学与胚胎学医学语义逐章恢复；28 个正文章节分件（第1–19章组织学、第20–28章胚胎学）按各章习题区字符占比同比取整预算合计恰好 600 道独立记分题（含 B1 组成员），落在 `src/content/courses/histology-embryology/extracted-histology-embryology-ch{01..28}.ts`，由 `index.ts` 聚合导出 `histologyEmbryologyExtractedItems` / `histologyEmbryologyExtractedGroups`。映射遵循本书契约（scripts/histo-CONTRACT.md，切片 scripts/histo-slice.py、审计 scripts/histo-audit.py）：A1/A2→a1-single、X 型多选→a1-single（xMapNote）、B 型配伍→Group b1（sharedChoices + 成员）、名词解释→term、简答/论述→short-answer；本书无填空题（fill 各项为空数组）；选择题正确项严格对照各章末「参考答案」键号并重排、同步 correctChoiceIndex(0 起)；第28章无「参考答案」，仅按「复习纲要」可明确锚定者取材 3 道；ID 全局唯一、order 逐章 1..N 连续（审计合计 600/600）。缺失答案 0；无法可靠提取 ch18 1、ch22 1，均已换用同源更清晰题；`npm run check` 通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控（下一本转至 B1 医学细胞生物学实验指导与习题集第4版）。

On 2026-09-04，完成《医学细胞生物学实验指导与习题集》第4版（人民卫生出版社）题库提取：本书为原生文本层但双栏排版错序，按细胞生物学医学语义恢复；**只取「第二部分 习题集」18 章**（第一章绪论…第十八章细胞工程，PDF 第 103–226 页），按各章习题区字符占比同比取整预算合计恰好 600 道独立记分题，落在 `src/content/courses/cell-biology/extracted-cell-bio-ch{01..18}.ts`，由 `index.ts` 聚合导出 `cellBioExtractedItems` / `cellBioExtractedGroups`。本书题型仅三种：名词解释→term、二、单项选择题→a1-single、三、多项选择题→a1-single 单选（promptSource.note=xMapNote，只取一正确项）；无 B 型配伍/填空/简答（extractedGroups 空数组）。正确项严格对照各章末「参考答案」键号（第5章答案标题被 OCR 扭曲为「A考答案」仍识别）、选项随机重排并同步 correctChoiceIndex(0 起)；ID 全局唯一、order 逐章 1..N 连续（审计 cellbio-audit.py，600/600）。缺失答案 0；无法可靠提取 ch01 2、ch02 1、ch10 1、ch11 若干、ch14 1、ch15 1、ch17 2，换用同源清晰题并如实注明；`npm run check` 通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控。至此原生 TEXT 批次全部提完；卫生统计学按用户决定跳过且原生 TEXT 中仅剩此本，下一步需决定回归卫生统计学或从 C 区扫描件中选一本继续 OCR。

On 2026-09-04，按用户「普遍大学生优先使用 NUR LEARN」的优先级，提前完成《系统解剖学习题集》第2版（人民卫生出版社，柏树令主编《系统解剖学》第8版为蓝本）题库提取：本书为扫描版经 OCR，错字按解剖学医学语义恢复，共 18 个正文章节分件（第19章预算 0、不设分件），按各章 PDF 正文页数等比取整预算合计恰好 600 道独立记分题，落在 `src/content/courses/human-anatomy/extracted-human-anatomy-ch{1..18}.ts`，由 `index.ts` 聚合导出 `humanAnatomyExtractedItems` / `humanAnatomyExtractedGroups`。映射遵循本书契约（scripts/anatomy-CONTRACT.md）：A1/A2/A3→a1-single、B 型配伍→Group b1（sharedChoices + 成员）、名词解释→term、填空→fill、判断改错与问答→short-answer、填图不计分跳过；选择题正确项严格对照源「参考答案」关键字、选项随机重排并同步 correctChoiceIndex(0 起)；分章预算均精确达标（脚本审计 anatomy-audit.py：各章 order 逐章 1..N 连续、ID 全局唯一、合计 600/600）；缺失答案 0、无法可靠提取 0。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控。

On 2026-09-04，按用户「执行第 2 方向」，从 C 区扫描件中选取并优先完成《医学免疫学学习指导与习题集》第3版（人民卫生出版社）题库提取：本书为扫描件经 macOS Vision OCR，错字按免疫学医学语义恢复（如 CD4⁻/CD4⁺、HLA-I/II 类、T 细胞亚群、细胞因子名、抗体类别等，数值/分子标记保留原值）；全书 25 个正文章节分件（第1章免疫学概论…第25章免疫学防治，PDF 第 8–289 页）按各章习题区字符占比同比取整预算合计恰好 600 道独立记分题，落在 `src/content/courses/immunology/extracted-immunology-ch{01..25}.ts`，由 `index.ts` 聚合导出 `immunologyExtractedItems` / `immunologyExtractedGroups`。映射遵循本书契约（scripts/immuno-CONTRACT.md，切片/预算 scripts/immuno-slice.py、OCR scripts/ocr/ocrdir.swift）：名词解释→term、填空→fill（多空答案 content[0] 按空序号列出）、A1/A2（病例）→a1-single、问答/简答→short-answer；本书无 X 型多选/判断/B 型配伍（extractedGroups 空数组）。选择题正确项严格对照各章末「参考答案」键号、选项随机重排并同步 correctChoiceIndex(0 起)；ID 全局唯一（600/600）、order 逐章 1..N 连续（脚本审计）；缺失答案 0、无法可靠提取 0；`npm run check` 通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控。

On 2026-09-04，按既定顺序从 C 区扫描件中完成《医学微生物学学习指导与习题集》第2版（人民卫生出版社）题库提取（病原与免疫常同期开课，故紧随免疫学）：本书为扫描件经 macOS Vision OCR，错字按微生物学医学语义恢复（如 G⁺菌/G⁻菌、荚膜、疱疹、HBsAg、CD4⁺、N-乙酰胞壁酸、B-1,4糖苷键等，数值/分子标记保留原值）；全书 37 区（绪论 + 36 章，PDF 第 12–273 页）按各章习题区字符占比同比取整预算合计恰好 600 道独立记分题，落在 `src/content/courses/microbiology/extracted-microbiology-ch{00..36}.ts`，由 `index.ts` 聚合导出 `microbiologyExtractedItems` / `microbiologyExtractedGroups`。映射遵循本书契约（scripts/microbio-CONTRACT.md，切片/预算 scripts/microbio-slice.py、OCR scripts/ocr/ocrdir.swift、审计 scripts/microbio-audit.py、一致性 scripts/microbio-consistency.py）：名词解释→term、填空→fill（多空答案 content[0] 按空序号列出）、A1/A2（病例）→a1-single、B1 配伍→Group b1（32 组、96 成员，组级 order 与首成员相同、组级不写 knowledgePointId）、简答/问答→short-answer。选择题正确项严格对照各章末「参考答案」键号、选项随机重排并同步 correctChoiceIndex(0 起)；ID 全局唯一（600/600）、order 逐章 1..N 连续（脚本审计）；124 道 a1 与 96 个 B1 成员全部通过 answer.content[0] 与 correctChoiceIndex 指向选项的一致性校验；缺失答案 0、无法可靠提取 0；`npm run check` 通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控（下一本按既定顺序为《神经病学学习指导与习题集》第3版）。

On 2026-09-04，按既定顺序从 C 区扫描件中完成《神经病学学习指导与习题集》第3版（人民卫生出版社）题库提取：本书为扫描件经 macOS Vision OCR，错字按神经病学医学语义恢复（如 祝觉→视觉、眼脸→眼睑、茶普生→萘普生、非留体→非甾体、Horer→Horner、介人→介入、特妹→特殊、玉力→压力、禁总证→禁忌证、主千→主干、胼酞嗪→肼酞嗪、胭动脉→腘动脉、力鲁唑→利鲁唑 等，数值/分子标记如 rt-PA、DSA、CTA、MRA、TCD、HRMRI、ASPECT、ASITN/SIR、WASID、NASCET、mmHg、mmol/L 保留原值）；全书 23 个正文章节分件（第1章绪论…第23章内科系统疾病的神经系统并发症，PDF 第 6–414 页）按各章习题区字符占比同比取整预算合计恰好 600 道独立记分题，落在 `src/content/courses/neurology/extracted-neurology-ch{01..23}.ts`，由 `index.ts` 聚合导出 `neurologyExtractedItems` / `neurologyExtractedGroups`。映射遵循本书契约（scripts/neuro-CONTRACT.md，切片/预算 scripts/neuro-budget.json、OCR scripts/ocr/ocrdir.swift）：A1/A2/A3-A4→a1-single（A3/A4 病例串题干并入 prompt）、B1 配伍→Group b1（34 组、127 成员，组级 order 与首成员相同、组级不写 knowledgePointId）、简答/论述→short-answer、病例分析→case。选择题正确项严格对照各章末「参考答案」键号（A1/A2/A3-A4/B1 各小节独立编号；OCR 中键号错位处按医学语义重建）、选项随机重排并同步 correctChoiceIndex(0 起)；ID 全局唯一（600/600）、order 逐章 1..N 连续（脚本审计）；缺失答案 0、无法可靠提取 0；`npx tsc --noEmit` 与 lint 通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控（下一本按既定顺序为《儿科学学习指导与习题集》或用户指定）。

On 2026-09-04/05，按用户第5方向新顺序（跳过儿科/流病/传染/预防/精神等，依次为 药理学→局部解剖学→病理学）完成《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬，2019，配套《药理学》第9版）题库提取：本书为扫描件经 macOS Vision OCR，错字按药理学医学语义恢复（如 B-内酰胺类→β-内酰胺类、青莓素→青霉素、脈拉西林→哌拉西林、氮曲南→氨曲南、头孢噻昐→头孢噻吩、紅霉素→红霉素、氯林可莓素→氯林可霉素、灰黄霉素→灰黄霉素、磺胺啼啶银→磺胺嘧啶银、丙皮酸→丙戊酸、拉英酸钠→拉莫三嗪、盼噻嗪类→吩噻嗪类、码啡/巴啡/玛啡→吗啡、Nn 受体/Nm 受体、α1/β1/β2/DA 受体亚型、I/II/III/IV 期临床试验 等，数值与单位保留原值）；全书 49 个正文章节分件（第1章药理学总论—绪言…第49章影响免疫功能的药物，PDF 第 6–319 页）按各章习题区字符占比同比取整预算合计恰好 600 道独立记分题，落在 `src/content/courses/pharmacology/extracted-pharmacology-ch{01..49}.ts`，由 `index.ts` 聚合导出 `pharmacologyExtractedItems` / `pharmacologyExtractedGroups`。映射遵循本书契约（scripts/pharmaco-CONTRACT.md，预算 scripts/pharmaco-budget.json，审计 scripts/pharmaco-audit.py、一致性 scripts/pharmaco-consistency.py）：名词解释→term、填空→fill（多空答案 content[0] 按空序号列出）、A1/A2（病例）→a1-single、B1 配伍→Group b1（35 组、105 成员，组级 order 与首成员相同、组级不写 knowledgePointId）、简答/论述→short-answer。选择题正确项严格对照各章末「参考答案」键号（A1/A2/B1 各小节独立编号；OCR 中答案键号散落错位处按题号与药理语义归位）、选项随机重排并同步 correctChoiceIndex(0 起)；ID 全局唯一（600/600）、order 逐章 1..N 连续、159 道 a1 与 105 个 B1 成员的 correctChoiceIndex 与 answer.content[0] 一致（脚本审计 pharmaco-audit）；缺失答案 0；无法可靠提取：ch20 1（填空第3题参考答案残缺）、ch21 13（填空第1–13题题干未恢复），均未取并如实注明；`npm run check`（lint + typecheck + build）通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控（下一本按既定顺序为《局部解剖学学习指导与习题集》(23)）。

On 2026-09-04/05，按用户第5方向新顺序第2本完成《局部解剖学学习指导与习题集》（人民卫生出版社，与《局部解剖学》教材配套）题库提取：本书为扫描件经 macOS Vision OCR，错字按局部解剖学医学语义恢复（如 骼/餎→髂、靜脉→静脉、韧帶→韧带、臂丛（臀丛→臂丛）、膕/胭窝→腘窝、胭动脉→腘动脉、腓总神经（排总神经→腓总神经）、梨状肌、提携角（女性提携角大于男性）等，数值与单位如 0.8cm、3.8cm、165°~170°、127° 保留原值）；全书 9 区（绪论 + 第1–8章：头部/颈部/胸部/腹部/盆部与会阴/脊柱区/上肢/下肢，PDF 第 11–187 页）按各章习题区字符占比同比取整预算合计**恰好 600** 道独立记分题（绪论 2、头部 41、颈部 88、胸部 69、腹部 137、盆部与会阴 62、脊柱区 70、上肢 60、下肢 71），落在 `src/content/courses/topographic-anatomy/extracted-topographic-anatomy-ch{00..08}.ts`，由 `index.ts` 聚合导出 `topographicAnatomyExtractedItems` / `topographicAnatomyExtractedGroups`。映射遵循本书契约（scripts/topo-CONTRACT.md，预算 scripts/topo-budget.json，切片 scripts/topo-slice.py，审计 scripts/topo-audit.py、一致性 scripts/topo-consistency.py）：名词解释→term（155）、A1/A2（病例）→a1-single（199）、B1 配伍→Group b1（42 组、137 成员，组级 order 与首成员相同、组级不写 knowledgePointId）、简答→short-answer（109）；本书无填空与论述。习题与参考答案分散在各章各节（每节独立编号），选择题正确项严格对照各节「参考答案」键号（A1/A2/B1 各小节与各节独立编号；OCR 中答案键号散落错位如 `27.E28.A29.A` 挤行处按题号与解剖学语义归位）、选项随机重排并同步 correctChoiceIndex(0 起)；ID 全局唯一（600/600）、order 逐章 1..N 连续、199 道 a1 与 137 个 B1 成员的 correctChoiceIndex 与 answer.content[0] 一致（脚本审计 topo-audit）；缺失答案 0；无法可靠提取：ch02 1（颈动脉三角的内容不包括，参考答案键号与正文矛盾按契约跳过并注明）、ch07 肩部 B1 型 7–12 题参考答案为多项选择、与 B1 单项配伍契约不符未纳入（因预算未取，不计缺失），均如实注明；`npm run check`（lint + typecheck + build）通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控（下一本按既定顺序为《病理学学习指导与习题集》(25)）。

On 2026-09-05，按用户第5方向新顺序第3本（该方向最后一本）完成《病理学学习指导与习题集》（人民卫生出版社，与《病理学》教材配套）题库提取：本书为扫描件经 macOS Vision OCR，错字按病理学医学语义恢复（如 雀奇金淋巴瘤→霍奇金淋巴瘤、Reed-Sterberg→Reed-Sternberg、调亡/猜亡→凋亡、苏丹皿→苏丹Ⅲ、沃-佛→沃-弗综合征、heriation→herniation、giter→gitter cell、senile plague→senile plaque、干酪样坏死、朗汉斯巨细胞、树胶样肿、凹空细胞、假膜性炎、噬神经细胞现象、卫星现象、筛状软化灶、胶质结节、脑疝、Rosenthal 纤维、Lewy/Negri 小体、FISH、CTCs、LSCM、FRAP、NGS 等，数值与单位保留原值）；全书 18 个正文章节分件（第1章细胞和组织的适应与损伤…第18章疾病的病理学诊断和研究方法，PDF 第 8–299 页）按各章习题区字符占比同比取整预算合计**恰好 600** 道独立记分题（ch01 23、ch02 26、ch03 38、ch04 38、ch05 24、ch06 48、ch07 15、ch08 15、ch09 46、ch10 62、ch11 51、ch12 29、ch13 36、ch14 31、ch15 33、ch16 31、ch17 46、ch18 8），落在 `src/content/courses/pathology/extracted-pathology-ch{01..18}.ts`，由 `index.ts` 聚合导出 `pathologyExtractedItems` / `pathologyExtractedGroups`。映射遵循本书契约（scripts/patho-CONTRACT.md，预算 scripts/patho-budget.json，切片 scripts/patho-slice.py，审计 scripts/patho-audit.py、一致性 scripts/patho-consistency.py）：名词解释→term（190）、A1/A2（病例）→a1-single（149）、判断题 + 问答题→short-answer（261，判断题在前、问答题在后共用 short 序号）；本书无填空、无 B1 配伍、无论述题、无病例分析（extractedGroups 空数组）。选择题正确项严格对照各章末「参考答案」键号（A1/A2 各小节独立编号；OCR 中答案键号散落错位处按题号与病理学语义归位）、选项随机重排并同步 correctChoiceIndex(0 起)；判断题按 √/× 键号归位（√=对、×=错）；ID 全局唯一（600/600）、order 逐章 1..N 连续、149 道 a1 的 correctChoiceIndex 与 answer.content[0] 一致（脚本审计 patho-audit）；缺失答案 0、无法可靠提取 0；`npm run check`（lint + typecheck + build）通过。这些 extracted 数据是题库底稿，未写入任何课程 truth 定义、未改动 course 注册表或发布门控。第5方向新顺序（药理学→局部解剖学→病理学）已全部完成，后续顺序待用户指定（剩余扫描件：儿科学(9)/流行病学(10)/传染病学(11)/预防医学(12)/精神病学(13)/核医学(17)/妇产科学(18)/眼科学(19)/耳鼻咽喉头颈外科学(22)/口腔科学(24)/医学影像学(26) 等；卫生统计学_赵耐青练习册为原生 TEXT 可立即提取，按用户此前决定保留待回归）。

On 2026-09-05, the agreed first-priority《中医诊断学》question-bank draft extraction was completed. Unlike the numbered publishing learning guides, its source is the **student-organized, answer-bearing material set** in the user's local materials folder; only two sources carry answers and both were fully extracted: ① `中医诊断学选择.pdf` (18-page scanned file, 260 MCQs, 「同学整理的参考版」answers; macOS Vision OCR, key-letter runs frequently jammed/truncated so correct items were recovered by question number + TCM Diagnostics medical semantics) → a1-single; ② `output/pdf/中医诊断学_第1天~第6天背诵内容及答案.pdf` (6 native-text-line booklets with 「项目整理标准答案」) → term / short-answer / case. The whole book was grouped into 12 knowledge units (绪论/望诊/舌诊/闻诊/问诊/脉诊/按诊/八纲辨证/病性辨证/脏腑辨证/其他辨证/病历书写与诊断) and **all extractable items were kept: 410** independent scored questions (term 108, a1-single 260, short-answer 38, case 4; no fill-in, no true/false source, no B1/B2 — extractedGroups empty), with the 190 gap to the 600 target honestly recorded and nothing invented to pad the count. Unanswered sources (南中医中诊各期末试卷、重点清单、知识精华汇总、四诊导图) were excluded by rule, and the Western-medicine 诊断学 past-papers were excluded as out of scope. Files live at `src/content/courses/tcm-diagnostics-bank/extracted-tcm-diagnostics-bank-ch{01..12}.ts`, aggregated by `index.ts` into `tcmDiagnosticsBankExtractedItems` / `tcmDiagnosticsBankExtractedGroups`. Contract `scripts/tcmdx-CONTRACT.md` (budget `scripts/tcmdx-budget.json`, slice `scripts/tcmdx-slice.py`, audit `scripts/tcmdx-audit.py`, consistency `scripts/tcmdx-consistency.py`). MCQ correct items follow the selector's page-tail reference keys; choices were randomly re-shuffled with correctChoiceIndex synced (0-based); IDs globally unique (410/410), order contiguous 1..N per chapter, correctChoiceIndex aligned with answer.content[0] (script audit). Missing answers 0; un-recoverable 0 (jam/conflict key-letter cases were restored by medical semantics and documented). `scripts/tcmdx-audit.py` + `scripts/tcmdx-consistency.py` + `npm run check` (lint+typecheck+build) all passed. As with every extraction, this extracted data is a question-bank draft and was NOT written into the `tcm-diagnostics.ts` course truth definition, not registered, not published, and no other course file was touched.

On 2026-09-05, the second-priority《医学影像学学习指导与习题集》第3版 question-bank draft extraction was completed (A15, the first numbered learning-guide resumed after the A14 student-material set). Source: the single answer-bearing scan `src/source_pdfs: /26.医学影像学学习指导与习题集-第3版-全书签.pdf` (200 pages; every one of the 15 chapters carries 学习目标/重点难点/复习思考题〔名词解释/填空/选择 A1/A2/B1/简答〕+ 参考答案; a duplicate `(1)` copy was unused; no other radiology materials exist in the learning-materials folder, so there is no excluded unanswered source). OCR: macOS Vision + medical-imaging semantics restoration (介人→介入, 钆（Cd）→钆（Gd）, T1WI/T2WI, DWI, MRA, DSA, CTA, PACS/RIS/DICOM, CDFI, window/level, imaging-sign names, interventional terms; units like mSv/kV/mA/ms/cm/mm preserved). All 15 chapters (第1章影像诊断学总论…第15章良恶性肿瘤的介入治疗, PDF pp. 2–200) got chapter-exercise-area character-share budgets by Hamilton largest remainder summing to **exactly 600** independent scored questions (ch01 71, ch02 55, ch03 34, ch04 49, ch05 48, ch06 22, ch07 85, ch08 73, ch09 55, ch10 15, ch11 5, ch12 14, ch13 35, ch14 13, ch15 26). Files: `src/content/courses/radiology-bank/extracted-radiology-bank-ch{01..15}.ts`, aggregated by `index.ts` into `radiologyBankExtractedItems` / `radiologyBankExtractedGroups`. Contract `scripts/radiology-CONTRACT.md` (budget `scripts/radiology-budget.json`, slice `scripts/radiology-slice.py`, quota `scripts/radiology-quota.py`, audit `scripts/radiology-audit.py`, consistency `scripts/radiology-consistency.py`). Type mapping: 名词→term (77), 填空→fill (96, multi-blank answers listed per blank in content[0]), A1/A2 (case) → a1-single (286), B1 配伍 → Group b1 (23 groups / 66 members, group-level order = first member, group-level has no knowledgePointId), 简答→short-answer (75); no case analysis and no essay questions. MCQ correct items follow chapter-end reference keys (A1/A2/B1 continuous across the book; multi-section chapters ch03/7 sections, ch07/4 sections, ch08/5 sections number keys per section; jammed key-letter runs such as `27.B28.G` restored by question number + imaging semantics); choices were randomly re-shuffled with correctChoiceIndex synced (0-based). IDs globally unique (600/600), order contiguous 1..N per chapter, correctChoiceIndex aligned with answer.content[0] (script audits); header stats aligned with budget.json per chapter. Missing answers 0; un-recoverable 0 (ch04 fill-in #2 OCR-garbled swapped for #6 and A1 #31 stem re-completed by semantics; ch05 A1 #19 incomplete options swapped for #24; ch09 A1 #25 option 「骨枢形成」 restored to 「骨膜增生」 — all documented). `scripts/radiology-audit.py` + `scripts/radiology-consistency.py` + `npx tsc --noEmit` + `npm run check` (lint+typecheck+build) all passed. As with every extraction, this extracted data is a question-bank draft and was NOT written into any course truth definition, not registered, not published, and no other course file was touched.

On 2026-09-09, the third-priority《传染病学学习指导与习题集》第3版 question-bank draft extraction was completed (A16) by a new Trae session taking over from the previous account. Source: `src/source_pdfs: /11.传染病学学习指导与习题集-第3版-全书签.pdf` (430-page scan; every one of the 10 chapters carries 学习目标/内容要点/练习题〔A1/A2/A3/A4/B1/名词解释/问答题/病案分析〕+ 参考答案). OCR: macOS Vision + infectious-diseases medical-semantics restoration (病原体→病原体, 品性感染→显性感染, 潛伏→潜伏, 菜姆病→莱姆病, 雀乱→霍乱, 黃疸→黄疸, HBEAg→HBeAg, HBcAg, 抗-HBs/抗-HBe/抗-HBc, PTA, ALT/AST, TBil/ALB/GLB/CHE/GGT/ALP/AFP, HBV DNA, HCV RNA, HDV/HEV, Dane 颗粒, 准种 quasi-species; values and molecular markers preserved). All 10 chapters (第1章总论…第10章其他, PDF pp. 8–430) got chapter-exercise-area character-share budgets by Hamilton largest remainder summing to **exactly 600** independent scored questions (ch01 31, ch02 195, ch03 28, ch04 113, ch05 33, ch06 34, ch07 34, ch08 74, ch09 4, ch10 54). Files: `src/content/courses/infectious-diseases/extracted-infectious-diseases-ch{01..10}.ts`, aggregated by `index.ts` into `infectiousDiseasesExtractedItems` / `infectiousDiseasesExtractedGroups`. Contract `scripts/infectious-CONTRACT.md` (budget `scripts/infectious-budget.json`, slice `scripts/infectious-slice.py`, audit `scripts/infectious-audit.py`, consistency `scripts/infectious-consistency.py`). Type mapping: 名词→term (15), A1/A2/A3/A4→a1-single (388), 简答/问答→short-answer (46), 病案分析→case (62), B1 配伍→Group b1 (8 groups / 89 members); no fill-in, no true/false. MCQ correct items follow chapter-end reference keys (A1/A2/A3/A4/B1/名词/问答/病案 each independently numbered per section; OCR key-letter jamming restored by question number + infectious-diseases semantics); choices randomly re-shuffled with correctChoiceIndex synced (0-based). IDs globally unique (600/600), order contiguous 1..N per chapter, correctChoiceIndex aligned with answer.content[0] (script audits); header stats aligned with budget.json per chapter. Missing answers 0; un-recoverable 0. `scripts/infectious-audit.py` + `scripts/infectious-consistency.py` + `npx tsc --noEmit` all passed. As with every extraction, this extracted data is a question-bank draft and was NOT written into any course truth definition, not registered, not published, and no other course file was touched.

The earlier question of whether to expose the verified physiology slice as a normal official course entry remains separate. Base-pack-independent private analysis is complete; the next narrow priority is to connect its imported questions to the existing deterministic learner-state contracts for practice drafts, favorites, confirmed attempts, redo, and review scheduling. Do not redesign `/learn` or add general placeholder navigation as a side effect. Do not add a general CMS, membership, payment, authentication, database, deployment, or silent publication path.

Completed on 2026-07-19: the first material-admission milestone persists only a strict, versioned structured admission record in the learner's browser and provides an explicit JSON export. It introduces no server-local storage, database, authentication, synchronization, multi-user access, or automatic publication. Raw binaries and `File` handles remain session-only. Transcription/excerpt text in the record or export is limited to material the learner explicitly accepted and approved during admission; pending/excluded content, API keys, local paths, original filenames, and unrelated personal metadata remain outside both. Export does not grant Course Builder use or publication authority.

### Resolved browser-local learning-memory behavior

The user resolved the following rules on 2026-07-18:

- A and B are independent global `学习辅助` preferences and may be enabled together. A is on by default; B is off by default and may be suggested after the first confirmed saved attempt.
- A is current-answer assistance. It automatically appears after the authored suggested character count, updates structural missing points while the learner continues writing, and defaults to identifying omissions so the learner can repair them independently. A restrained `改正` disclosure may reveal a directly replaceable NUR-authored rewrite sentence. Whether to display next-step prompting is a global sub-preference.
- Suggested character count is guidance, not a gate. A learner may start self-check and save below it; starting self-check before the threshold immediately exposes the complete structural missing-point feedback.
- B is confirmed-history assistance. It uses only the version the learner actively confirms after completing self-check; drafts and autosaved text never enter comparison or weak-point statistics.
- With no eligible history, B displays `完成一次自核后，这里会帮你回看关联`. With history, it shows approximately 80 characters from the learner's previous confirmed answer and provides an `展开完整作答` control.
- B aggregates the same missing criterion across different questions under one knowledge point. A criterion becomes a formal repeated omission only after at least three confirmed attempts omit it.
- Repeated omissions appear immediately after the current self-check. The system first asks the learner to confirm `加入计划`; it never adds the task automatically.
- If the learner declines, the system asks again only after a later confirmed answer still omits the same criterion, not on every visit.
- Multiple repeated omissions detected for one knowledge point are combined into one review task scheduled 48 hours later.
- The review task is complete after the learner rewrites and confirms self-check; opening the direct rewrite suggestion is not required.
- If a verified teacher scoring standard later exists, teacher criteria are the primary feedback authority and NUR suggestions become secondary. When that verified standard changes, historical confirmed answers are automatically re-evaluated without changing learner prose, and a clear one-time dismissible update notice is shown.
- Paid packaging remains a future commercial decision. Do not hard-code A or B behind a paywall during the local product-validation milestone.

### Resolved constrained NUR Agent direction

The original AI Agent idea remains part of the product direction. The user approved a real but narrow local pilot after the deterministic attempt/return foundation exists:

- do not embed or port the entire Grok Build terminal coding agent into the website;
- use open-source agent-harness ideas for bounded context assembly, explicit permissions, inspectable task steps, and provider adapters;
- implement a small TypeScript, provider-neutral NUR Agent boundary suitable for the existing Next.js application; Grok may be the first model provider, but NUR must not be locked to one vendor;
- the pilot serves only `问饮食口味` writing and case tasks and may read only the current prompt, verified/declared course sources, the applicable NUR or future verified teacher criteria, and the learner's confirmed local history;
- permitted outputs are structural omissions, one next-step prompt, a confirmed-history relationship, an on-demand rewrite suggestion, provenance, and an authority notice;
- the Agent may not use a terminal, arbitrary local files, unrestricted web search, or mutate course truth, and it must never present itself as a clinical diagnosis or an instructor grade;
- model credentials must remain server-side/local-environment only and never enter the browser. The prototype remains local-only, with no database, authentication, deployment, or server-side learner persistence;
- deterministic self-check, confirmed local history, and the 48-hour review loop must continue to work when the model is unavailable;
- the purpose of the pilot is to test whether the Agent improves answer completeness without creating dependence or annoyance. Technical completion is not evidence of learning efficacy.

Implementation status: the provider-neutral request/response contract, server-side course-context assembly, deterministic four-step runtime, run lineage, strict xAI structured-output adapter, stateless Route Handler, and local-runtime UI are complete. The Agent works without a credential. No credential was found, so no live model request or result has been claimed; a usable server-side credential remains the sole blocker only for optional real-provider validation.

### Resolved hosted-model and Course Builder direction

On 2026-07-18, the user chose a hosted model API rather than a local model as the first path for the full material-to-course feature. The first provider is Alibaba Cloud Model Studio (DashScope), and the initial default model is `qwen3.7-plus`. On 2026-07-19, the user supplied a real default-workspace credential CSV. The credential is installed only in ignored, mode-`600` `.env.local`; two real provider-preferred Course Builder runs completed successfully through the workspace-specific compatible endpoint.

NUR must remain provider-neutral. The existing xAI adapter is retained as an earlier constrained-Agent implementation, but xAI is no longer the selected first live provider for the Course Builder. Provider credentials remain server-side secrets and must never enter browser code, course truth, screenshots, logs, or committed files. Future local inference, other hosted providers, and optional bring-your-own-key support may use the same boundary without changing course definitions or learning pages.

Future membership sells capability and quota, not API keys. A NUR-managed provider key may route low-cost structural work, standard course generation, and advanced reasoning to different models. Exact provider model names must not be hard-coded into membership contracts. Authentication, billing, entitlements, quotas, and user-supplied credentials remain future commercial work and are not part of the first Course Builder milestone.

The intended Course Builder loop is:

```text
declared material pack
  -> local parsing/OCR and material identity
  -> source-family, authority, locator, privacy, and conflict resolution
  -> bounded provider-neutral Course Builder
  -> typed CourseDraft plus explicit issues and pending fields
  -> deterministic schema, provenance, and authority validation
  -> human review/approval
  -> existing CourseDefinition registry and reusable learning surfaces
```

The model may propose structure and content but may not silently publish, mutate verified source truth, invent missing pages or teacher emphasis, resolve source conflicts without evidence, or convert NUR-authored practice into instructor authority. Missing or uncertain content remains `待确认` or `待导入`. The deterministic material catalog and course validators remain the authority floor even when the hosted model is available.

The first implementation increment has pressure-tested this loop against the already understood TCM material set before accepting arbitrary user uploads. The smallest `CourseBuildRequest` / `CourseDraft` / validation-issue contract, server-only DashScope adapter, strict plan parser, reproducible baseline fixture, full typed-course compiler, deterministic course/material validation, and human review/approval workbench are implemented. The official pack v1 now extends that baseline with a nine-artifact manifest, two explicit exclusions, a 39-point evidence matrix, protected authored loops, and deterministic batch drafts. It keeps pending sources and missing answers pending rather than filling them with generated claims.

`GET /api/course-builder` reports provider configuration and the allow-listed material packs. `POST /api/course-builder` accepts strict versioned requests under a 96 KiB body boundary: version 1 preserves known-pack baseline/provider behavior; version 2 preserves the earlier allow-listed-base private overlay build; and `private-material-analysis` accepts an exact learner-private overlay plus matching `one-private-analysis` authorization without a base pack. With no key, version-1 provider-preferred mode returns a visibly labeled local baseline and baseline-only sends nothing; both private request kinds fail honestly and never substitute that baseline. With the configured key, official known-pack planning remains inside allow-listed fields, while private analysis returns only an intermediate learning unit before local validators reassert target, locator, coverage, answer authority, and non-grants. The workbench's official-draft approval checks persist only a browser-local preview record; no request mutates `src/content/courses/`, the registry, material catalog, or publication state.

Browser QA passed the default workbench, provider-not-configured known-pack fallback, five-step trace, 14-source ledger, three-gate approval, one-time private manifest/consent/build/decision/approval flow, desktop 1440 × 1000 layout, and 390 × 844 responsive layout with `scrollWidth === clientWidth`. Browser warning/error logs were empty. The full draft download is rendered as a standards-based `download` link; the in-app browser did not surface a download event for data-URL downloads, so event-level download capture is not claimed even though the link, filename, page stability, and zero-error state were verified.

The new private-analysis result received a separate synthetic-only browser pass. At desktop width, the partial-unit header, answer authority panel, and concise/exam/expanded controls rendered inside the existing editorial grid; all 19 returned question cards exposed all three variants and switching to expanded revealed the locally constructed answer structure. At a fresh 390 × 844 layout, the same 21-excerpt fixture produced 20 question cards plus one title `unmapped`; the result header, action buttons, first question, answer authority, three equal-width variant buttons, expanded answer, structure list, and uncertainty note remained within the viewport with no visible horizontal clipping. Reload in the same tab restored the validated structured result from `sessionStorage` while the raw file, parser draft, and overlay correctly disappeared. Browser warning/error logs were empty. Final `npm run check` passed ESLint, strict TypeScript, the Next.js 16.2.1 production build, and all 23 generated pages. Evidence: `course-builder-private-analysis-result-2026-07-19.png`, `course-builder-private-analysis-result-mobile-2026-07-19.png`, and `course-builder-private-analysis-answer-mobile-2026-07-19.png`.

### Resolved three-layer course supply model

The user confirmed on 2026-07-19 that NUR should prepare official course material packs, but the product must not respond by manually creating many shallow courses before the import engine works. The agreed scalable structure is:

1. **NUR official base pack** — textbook/version dimensions, stable chapters and knowledge points, source-backed NUR teaching loops, assessment authority, and a reliable quality floor.
2. **School/teacher overlay** — instructor slides, review scope, historical exams, answer keys, and future verified rubrics, always scoped to the correct school/teacher/academic year/semester.
3. **Learner-private material layer** — personal notes, temporary teacher files, learner-owned banks, and other imports; private by default and never promoted into official truth without explicit review.

The intended differentiator is therefore `official course foundation + private/school material enhancement + AI compilation + provenance validation + human approval`, not free-form generation from unclassified uploads and not an official catalog alone. A learner should eventually select an official course such as 《中医诊断学》, import their teacher's slides/review files/past exams, and receive a private offering-specific course variant without contaminating the official base pack.

Execution order is now resolved:

1. build the evidence-gated material intake for real local files — completed for bounded browser-local selection and identity review;
2. require the learner to confirm course, source type, authority, school/teacher/year/semester, privacy, and publication boundaries before model use — completed;
3. locally parse/transcribe only gate-eligible records — implemented for explicitly authorized native DOCX semantic blocks, section-first review, and a current-session private overlay visible in the build selector;
4. require a separate one-time manifest authorization before accepted excerpts enter a bounded private Course Builder request, then revalidate and require human approval — implemented and verified with synthetic content plus real `qwen3.7-plus`;
5. create explicit material-admission candidate records for identity, provenance, accepted transcription/locators, privacy/publication, source-family/artifact, conflicts, and authority review before any durable material reaches Course Builder — completed with strict browser-local storage/recovery and JSON export; admission still grants no Builder/model/publication rights;
6. deepen the first official TCM pack and add the course-wide v1 evidence matrix/batch compiler — completed;
7. decouple privacy-eligible private-material analysis from official-pack compilation, return useful partial private workspaces, and pressure-test with the current physiology overlay plus a representative short-answer-only set — completed with real `qwen3.7-plus`;
8. connect imported private questions to the existing deterministic practice, favorites, confirmed-attempt, redo, and review-scheduling contracts — completed (drafts, favorites, recordConfirmedAttempt with private taskId, redo; reuses subjective-writing surface and learning-memory contracts; no catalog/registry mutation); 2026-07-21: persistence for drafts/favorites hardened with unit-scoped session + current-question filter on restore; favorites made actionable via per-unit filter UI; review proposal surfaced explicitly once per unit (deduped); kp-level review/attempt linkage to global memory panel confirmed.
9. upgrade the bounded learning Agent to use Qwen (dashscope/qwen3.7-plus) as reasoning engine with typed, permissioned learning tools (rewrite, favorite, review, source comparison proposals) — completed. Extended contracts, DashScope schema/parser, service builders, pilot rendering. 4-step runtime preserved. Private unit fully wired. npm run check passed (2026-07-22).
10. defer mass course production, membership, billing, deployment, server persistence, and general CMS work until this analysis/learning loop is proven.

Step 8 is complete. The private learning unit is now actionable (drafts per question, favorites with filter, explicit confirm → record+propose, redo). Persistence hardened + deduped review proposal + kp memory linkage confirmed (2026-07-21). All actions explicit, authority labels preserved, local-only. Step 9 (Agent upgrade) complete. Typed proposals (favorites, review, source comparisons) now flow for private units (nur-qwen-private-ref) and official. Deterministic actions own all writes.

Agent role clarification (2026-07-22, responding to feedback):
The NUR Agent attached to a knowledge point is meant to act as the *dedicated bounded assistant for that point's specific learning tasks* (writing the NUR-structured answer, completing the 4-stage case reasoning chain).
It is primed with the point's evidence/sources, the exact NUR criteria or case stages, the learner's current draft(s), and memory.
Value comes from: spotting omissions against *this point's* structure, targeted rewrite proposals that address missing criteria/chains (with rationale and confidence), proper source relationship labels, and actionable memory proposals (favorite weak criteria, schedule review).
Design is intentionally bounded: Qwen only returns structured proposals; all state change (saving answer, adding favorite, scheduling review) must be explicit user action via deterministic code. It must feel useful *while working on the point*, not only after full self-check.
Current observed gap: proposals exist and are shown in the pilot (embedded in writing/case rooms and passed currentText), but direct one-click application into the active draft/revision is not yet smooth, and trigger is gated behind "开始自核". This contributes to the feeling of limited impact.

A future admitted-record selection bridge must still preserve a separate use decision. Neither learning actions nor that bridge may silently publish, broaden into a CMS, persist raw binaries, or resolve revision/OCR/authority/conflict states without evidence. Verified: schema+service+pilot+privateRef end-to-end. All proposals model-only; state changes deterministic. (2026-07-22)
Current next priority (per PROJECT_STATE): 17. Full question center — basic implementation complete (2026-07-22). answerConfidence + CourseScope+"questions" + 题库 button scaffolding done. course-workspace now renders real question list in "题库" scope (per-chapter via rail, questionKind + prompt + source confidence + direct "练习" links to subjective-writing for scored items). All checks (lint/typecheck/build/check) green.
- answerConfidence added to LearnerAttemptRecord + parse migration + all callers (2026-07-22).
- CourseScope extended with "questions"; "题库" button added to scopeBar in course-workspace (scaffolding start, 2026-07-22).
- npm run check passes (minor lint warning on pilot only).

Question-bank normalization remains incremental. Keep the two source-verbatim white-book prompts unscored while their answers are missing, keep student-compiled answers unverified until checked question by question, and keep teacher-specific scoring pending until an actual instructor rubric or marked answers exist.

### 题库扩充与模考半卷（2026-08-06）

中诊题库从 16 题扩充到 33 题，全部为 NUR 改编题（`nur-editorial` 题干 + `nur-platform` 答案 + `source-cross-checked` 置信度），只引用已核验教材 P37/P39/P52–53/P60–61/P69–91/P121–123 与教师重点来源，不冒充学校原题，也不新增编造答案：

- A1 单选 3→15（覆盖 7 个知识点，占蓝图行 50%）；填空 2→4；名词解释 1→3；案例 0→1；简答维持 10 题足够；
- 模考组卷从约 10 分提升到 53/100 分：15 道自动评分 A1 + 4 填空 + 3 名词解释 + 3 简答 + 1 案例，缺口（A1/B1/B2/fill/term/case）如实报告；
- 新文件 `src/content/courses/tcm-diagnostics-question-bank.ts`，通过 `withQuestionBankItems` 合并到知识点引用，不改动任何既有题目与来源；
- B1/B2 语义未被来源确认，继续为 0，模考如实报告 shortfall；
- 浏览器验证：题库主页 33 题、新 A1 单题页、26 题模考运行房（自动评分 `判定正确`、填空/案例待核对提示、26 按钮导航）、455px 无横向溢出、warning/error 为空；`npm run check` 通过，构建新增 15 个题库单题 SSG 路由。
- 证据：`docs/design-references/question-bank-expanded-2026-08-06.png`。

### B1/B2 语义确认与 100 分完整模考（2026-08-06）

用户口头确认 B1/B2 题型语义并记录为来源：**B1 = 共用备选答案配伍题**（一组选项供多个小题共用、可重复选择）；**B2 = 共用题干题组**（一个病例/题干下多个小题，小题为单选）。据此完成最后一轮题库补齐，模考从 53/100 分推进到 100 分完整组卷：

- `AssessmentItemGroupDefinition` 新增到 `src/types/learning.ts`，`CourseDefinition.assessmentGroups` 承载 B1/B2 组（B1 有 sharedChoices、B2 有 groupPrompt），成员复用现有 `AssessmentItemDefinition`；`MockExamPaperItem` 携带组上下文（groupId/groupPrompt/sharedChoices）；
- 课程校验新增组契约检查：组/成员 id 唯一且不与顶层题冲突、B1 至少两个互异共享选项且成员 correctChoiceIndex 指向共享选项、B2 必须有共享题干且成员自带选项、成员上限 4、来源引用完整；
- 组卷引擎 `src/lib/mock-exam.ts` 把组展开为携带组上下文的成员题，广度优先按知识点取题逻辑不变；模考运行房与题库练习页渲染共享题干/共用备选答案区，选项可重复选择、每小问独立自动判定；
- 新增 15 道 A1（舌苔 2、舌质 2、寒热 3、口味 2、脉象 2、表里 2、脾胃 2，全部 nur-editorial + nur-platform + source-cross-checked，只引用已核验页码 P37/P39/P52–53/P60–61/P69–91/P121–123）、5 组 B1 × 2 小题、3 组 B2（2+2+1 小题）、1 填空、2 名词解释（带 NUR 完整度训练量表，含 assistanceRules 引用各知识点记忆准则）、1 脾胃方向案例；
- 题库现为 60 题（A1 30 / B1 10 / B2 5 / fill 5 / term 5 / short-answer 10 备选 / case 2），模考按蓝图取 60 题 100 分：30 A1 + 10 B1 + 5 B2 + 5 fill + 5 term + 3 简答 + 2 案例，全部 7 行 `complete`，`shortfalls` 为空；客观题自动评分共 45 分（A1+B1+B2），主观题进入待核对清单；
- 新文件：`src/content/courses/tcm-diagnostics-question-bank-complete.ts`（A1+fill）、`tcm-diagnostics-question-bank-groups.ts`（B1/B2 组+term+case），经 `withQuestionBankItems` 挂载到知识点（含 kp-tongue-body、kp-inquiry-diet-taste 的此前遗漏挂载点）；题型标签 `src/lib/question-kind-labels.ts` 更新为 B1「共用备选答案配伍」/ B2「共用题干题组」；错题中心与跨课程题库统计改用 `flattenCourseAssessmentItems` 展平组成员；
- 验证：`npm run check` 通过（lint 0 error / 严格类型检查 / Next.js 16.2.1 生产构建），`npm test` 140/140 通过（含 100 分完整组卷、B1/B2 组上下文、共享选项自动判定断言）。

### NUR Agent intelligence upgrade — Phase 1: FSRS-aware reasoning

On 2026-07-24, the NUR Agent gained FSRS-aware reasoning as the first phase of the Agent intelligence upgrade plan (`docs/CONTENT_ARCHITECTURE.md` → `/Users/nukeab/.qoder-cn/plans/distant-wilderness-pigeon.md`). The Agent now reads the learner's FSRS memory state and uses it to prioritize weak dimensions:

- `FsrsCriterionSummary` type and `fsrsSummary` field added to `NurAgentRequest`; the client builds this from `state.fsrsState` in localStorage and passes it through the POST body.
- `parseNurAgentRequest` validates each summary entry (memoryCriterionId, state enum, finite numbers, null-or-string lastReviewAt) with a 200-item cap.
- `ResolvedNurAgentContext` passes `fsrsSummary` to provider and runtime.
- DashScope `buildPrompt` includes `fsrsSummary` in the `learnerContext` JSON and adds FSRS-aware instructions: prioritize stability-lowest and lapses-highest dimensions; lower priority for stability > 10 + reps >= 3.
- `runNurAgentRuntime` deterministic next-step now sorts by `(relatedAttemptCounts + fsrsWeaknessScore)` where `fsrsWeaknessScore = (10 - stability) + lapses * 2`; criteria with no FSRS state default to 5.
- `buildReviewProposals` proactively generates review proposals for criteria in `relearning` state or with `lapses >= 2`; `suggestedDueHours` computed from actual FSRS summary state via `fsrsNextInterval`.

The plan has three phases: (1) FSRS-aware reasoning — completed; (2) floating Agent UI (FAB + right-side drawer) — completed; (3) general Q&A chat via Vercel AI SDK — completed. The `ai`, `@ai-sdk/react`, and `@ai-sdk/openai` packages are installed.

Browser verification at `/courses/tcm-diagnostics/knowledge-points/diet-and-taste/subjective-writing` confirmed a Qwen model-assisted Agent run with omissions quoting student text, next-step, and rewrite proposals. Desktop 1440 × 1000 and mobile 390 × 844 both reported `scrollWidth === clientWidth`; browser warning/error logs were empty. `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build (23/23 pages). Evidence: `fsrs-agent-phase1-desktop-2026-07-24.png` and `fsrs-agent-phase1-mobile-2026-07-24.png`.

### NUR Agent intelligence upgrade — Phase 2: floating Agent UI

On 2026-07-24, the NUR Agent was upgraded from an inline embedded panel to a floating FAB + right-side drawer. The Agent no longer occupies main content space and is now available on knowledge-point, writing, and case-reasoning surfaces.

- New `src/components/nur-agent-dock.tsx` and `nur-agent-dock.module.css` provide a fixed-position FAB (48px circle, `#24211d`, Bot icon) and right-side drawer (420px desktop / full-width mobile, warm-ivory background, slide-in animation, ESC/overlay/close-button dismissal).
- `subjective-writing-room.tsx` and `case-reasoning-room.tsx` replaced `<NurAgentPilot>` with `<NurAgentDock>`; all props pass through unchanged. The dock wraps the existing pilot component and strips its border via CSS.
- `knowledge-point-lesson.tsx` added `<NurAgentDock surface="knowledge-point" />` with a placeholder directing to writing/case rooms (Phase 3 adds general Q&A).
- Browser verification: FAB visible on KP and SW pages, drawer opens with placeholder (KP) or full Agent panel (SW), ESC closes drawer, desktop and mobile both report no horizontal overflow, browser console clean.
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build (23/23 pages). Evidence: `agent-dock-kp-desktop-2026-07-24.png`, `agent-dock-sw-desktop-2026-07-24.png`, `agent-dock-sw-mobile-2026-07-24.png`, `agent-dock-kp-mobile-2026-07-24.png`.

The plan now has: (1) FSRS-aware reasoning — completed; (2) floating Agent UI — completed; (3) general Q&A chat via Vercel AI SDK — completed.

### NUR Agent intelligence upgrade — Phase 3: general Q&A chat via Vercel AI SDK

On 2026-07-25, the NUR Agent gained general Q&A chat capability as the final phase of the Agent intelligence upgrade. The Agent dock now offers a "对话" (chat) tab alongside the existing "结构分析" (analysis) tab on writing/case surfaces, and a chat-only interface on knowledge-point surfaces.

- New `src/components/nur-agent-chat.tsx` uses `useChat` from `@ai-sdk/react` with `DefaultChatTransport` from `ai` to stream responses from the new `/api/nur-agent/chat` Route Handler.
- New `src/app/api/nur-agent/chat/route.ts` uses `streamText` from the `ai` package with `createOpenAI` from `@ai-sdk/openai` to connect to DashScope `qwen3.7-plus`. The route resolves course/knowledge-point context from the validated registry, builds a system prompt with authority rules and FSRS guidance via `buildChatSystemPrompt`, and optionally exposes a `structural_analysis` tool (using `tool()` from `ai` with `zod` schema) that calls back into the existing `runNurAgent` service when the learner has an active draft and task context.
- New `src/lib/nur-agent/chat-context.ts` extracts evidence framework, lenses, relationships, sources, and lesson blocks from the registered `CourseDefinition` and `KnowledgePointDefinition` into a typed `ChatContext`.
- New `src/lib/nur-agent/chat-prompt.ts` builds the system prompt with authority rules (no teacher scoring, no clinical diagnosis, TCM/modern-medicine separation with 可关联 / 帮助理解 / 不可直接等同 labels, source citation, honest "not in current materials" when applicable) and FSRS-aware guidance.
- New `src/components/nur-agent-chat.module.css` provides chat bubble, tool-result card, error, input form, and mobile responsive styles matching the warm-ivory editorial system.
- The dock's tab bar switches between "对话" (general Q&A with `NurAgentChat`) and "结构分析" (structural analysis with `NurAgentPilot`). On knowledge-point surfaces, only the chat tab is shown.
- `enable_thinking: false` is injected via a custom fetch wrapper to keep responses focused.
- Browser verification at `/courses/tcm-diagnostics/knowledge-points/diet-and-taste`: FAB opened dock, chat input accepted "什么是食欲？中医怎么看？", Qwen `qwen3.7-plus` streamed a structured response with textbook page citations (第3版 P60-61), relationship labels (可关联, 不可直接等同), NUR scoring guidance, and source references. No model output was fabricated outside the provided course context.
- Browser verification at `/courses/tcm-diagnostics/knowledge-points/diet-and-taste/subjective-writing`: dock opened with both "对话" and "结构分析" tabs visible. Draft text entered; "结构分析" tab showed badge "有草稿可分析" and switched to the `NurAgentPilot` panel. Tab switching preserved draft state.
- Browser warning/error logs were empty on both routes. `scrollWidth === clientWidth` with no horizontal overflow.
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build (23/23 pages). Evidence: `agent-chat-kp-desktop-2026-07-25.png`, `agent-chat-sw-tabs-desktop-2026-07-25.png`.

## 8.5 NUR Agent Platform-Wide General Medical Assistant — Implemented

**Status: implemented (2026-07-25)**

On 2026-07-25, the NUR Agent chat was converted from a course-specific tutor to a NUR LEARN platform-wide general medical learning assistant. The Agent can now answer any medical question (e.g. "什么是细胞膜") even when the content is outside the current course's registered materials. Core authority boundaries are preserved: no clinical diagnosis, no teacher scoring replacement, TCM/modern-medicine separation with 可关联/帮助理解/不可直接等同 labels.

**Changes implemented:**

1. `src/lib/nur-agent/chat-prompt.ts` — rewrote system prompt: identity changed from "服务于《课程》的学习助手" to "NUR LEARN 平台通用医学学习助手"; removed the rule "如果信息不在提供的课程内容中，诚实说'这不在当前课程材料中'，不编造"; added rule allowing general medical knowledge with label "以下为通用医学知识，非当前课程注册材料"; added source-priority guidance (prefer course materials when available, label general-knowledge answers). `buildChatSystemPrompt` signature changed: `context` parameter is now `ChatContext | null`. When null, a platform-level minimal prompt is returned without course context JSON.
2. `src/app/api/nur-agent/chat/route.ts` — `courseSlug` and `knowledgePointId` are now optional. The required-parameter check only enforces `messages`. When course/kp are absent, `chatContext` is null and `buildChatSystemPrompt(null, ...)` is called. When present, the existing course/kp resolution and `buildChatContext` path runs unchanged. The `structural_analysis` tool still requires full `taskContext` + `currentText`.
3. `src/components/nur-agent-chat.tsx` — `NurAgentChatProps.courseSlug` and `knowledgePointId` changed from required `string` to optional `string | null`. `DefaultChatTransport` body passes `undefined` when null. Empty-state placeholder updated from "问任何关于当前知识点的问题" to "问任何医学或学习相关问题" with example "什么是细胞膜？".
4. `src/components/nur-agent-dock.tsx` — added `"platform"` to the `surface` union type. When `surface === "platform"`, the dock shows chat-only (no tab bar, no analysis tab), passes `courseSlug={null}`, `knowledgePointId={null}`, and `fsrsSummary={null}` to `NurAgentChat`. Surface label shows "平台".
5. `src/components/learning-dashboard.tsx` — mounted `<NurAgentDock surface="platform" />` at the end of the `/learn` homepage.
6. `src/components/course-workspace.tsx` — mounted `<NurAgentDock surface="platform" />` at the end of the course workspace.

**Not changed:** structural analysis tool still requires full taskContext + currentText; DashScope qwen3.7-plus provider unchanged; enable_thinking: false unchanged; FSRS guidance retained.

**Verification:** `npm run check` passed ESLint (zero warnings), strict TypeScript, and Next.js 16.2.1 production build (23/23 pages). Browser verification pending.

**Browser verification (2026-08-06):** `/learn` shows the FAB (`打开 NUR Agent`) with no horizontal overflow; opening the drawer shows the `平台` surface label with chat-only UI and the platform empty-state (`问任何医学或学习相关问题`). A real DashScope `qwen3.7-plus` call answered `什么是细胞膜？` with a structured response (phospholipid bilayer / fluid mosaic model / barrier-transport-signaling functions). The knowledge-point surface (`问饮食口味`) is chat-only with `知识点` label; a real call on `消谷善饥的中医病机是什么？` returned textbook citations (《中医诊断学》第3版 P60–61、教师重点第2页), correct 可关联 / 不可直接等同 relationship labels against 甲亢/糖尿病, and NUR scoring guidance without fabricated authority. The subjective-writing surface shows the `对话` + `结构分析` double tab with `写作室` label; switching to analysis renders the Qwen-powered local runtime panel (no draft → prompts the learner to write first). Browser warning/error logs were empty on all three routes. Evidence: `agent-platform-learn-chat-2026-08-06.png`.

## 8.6 产品化决策与 M1 账户基础（2026-08-06）

用户确认产品化方向并明确：**暂不部署**（服务器与域名待购买），先把代码层产品化完成；登录方式为**邮箱+密码**；数据库方案由实现方选择（选 Prisma + SQLite 起步，生产切 Postgres 只需改 provider/连接串）。四个子方向：账户与云同步、部署上线（暂缓）、发布前打磨、会员与配额边界。

### M1 账户与认证基础 — 完成

- 认证框架决策：不使用 next-auth（v5 与 Next.js 16 存在 peer 依赖兼容问题且官方进入维护模式），采用**自建轻量认证**：bcryptjs 密码哈希 + jose HS256 JWT 会话（30 天 httpOnly cookie）+ 内存登录限流（同邮箱+IP 连续失败 5 次锁 15 分钟，单实例有效）；
- 数据层：`prisma/schema.prisma` 定义 `User`（唯一邮箱、passwordHash、displayName、membershipTier、时间戳），SQLite 文件库（`prisma/dev.db`，gitignore），迁移 `20260806142253_init`；Prisma 6.10（规避 Prisma 7 的 breaking change 与原生驱动依赖）；不使用数据库 enum 保证 SQLite/Postgres 可移植；
- 服务层：`src/lib/auth/password.ts`（哈希/校验/邮箱与密码规则）、`src/lib/auth/session.ts`（JWT 签发校验与 cookie）、`src/lib/auth/service.ts`（注册/登录/限流）、`src/lib/prisma.ts`（单例）；密码错误与用户不存在返回同一提示，不泄露账户是否存在；
- API：`/api/auth/register`、`/api/auth/login`、`/api/auth/logout`、`/api/auth/session`，16 KiB 请求体上限，错误信封 `AuthApiResponse`；
- UI：`/login`、`/register` 编辑风格页面（`src/components/auth-form.tsx` + module.css），`next` 参数支持登录后回跳；`/learn` 账户菜单集成真实会话：已登录显示昵称首字母/邮箱/会员层级/退出登录，游客显示本地浏览提示与登录入口，原浏览器本地资料编辑保留为“本机资料（演示配置）”；`src/hooks/use-session.ts` 客户端会话读取；
- 环境变量：`.env` 新增 `DATABASE_URL`（Prisma CLI 与 Next.js 均读取），`.env.local` 新增随机生成的 `AUTH_SECRET`（生产必须更换）；
- 验证：API 冒烟（未登录 null、注册、会话保持、重复注册拒绝、错密码统一提示、正确登录、登出失效、弱密码/非法邮箱拒绝）全部通过；浏览器 QA 覆盖登录页/注册页渲染、UI 注册→自动登录→`/learn` 跳转、账户面板登录态与游客态、console 空；`npm run check` 通过（88/88 页面，新增 /login、/register 静态页）、`npm test` 140/140；证据：`auth-register-page-2026-08-06.png`、`account-panel-logged-in-2026-08-06.png`。

### M3 进行中（M2 已完成）

M2 学习状态云同步 已于 2026-08-07 完成全部 Phase 1-5 + 全面优化（见里程碑 20）。

### M3–M5 规划

- M2 学习状态云同步（Phase 1-4 active）：核心学习记忆/FSRS + QB attempts/favorites + mock sessions + explicit admission consent 均已接 triggerLearnerStateSync（带 1.2s debounce + 简单重试）；登录时 upload + GET 下载 + merge（timestamp 优先）；客户端状态系统（isSyncing / lastSyncAt / lastError + subscribe）；dashboard 头部极简状态提示；错误静默、本地优先；server Prisma + API 就绪。私人 consent 显式（set/getAdmissionSyncConsents）。
- M3 会员与配额边界（已完成 2026-08-08）

## M3 完成记录（2026-08-08）
- Agent 调用已真正接上：nur-agent-chat.tsx 提交时 recordAgentCallUsage()，/api/nur-agent/chat 每个请求 server record + gate（free 超限 429）。
- Server 持久化构建历史：User.usage JSON {courseBuilds, agentCalls}，recordServerUsage 在 private/normal build 和 agent 调用时写 DB。
- 更多门控：Course Builder private 超限返回 quota-exceeded 429；Agent chat 超限 429；UI banner + confirm 软门控；material admission 配额展示。
- 配额 UI 改进：进度条、percent、near/over、periodNote、client bump + server 合并、升级时清 client + reset server。
- 其他完善：demo-upgrade 重置 usage；quotas compute 合并；check 0 errors。
- M3 计划文件已标记完成部分。
- 准备 M4：见下方 M4 启动。
：`MembershipTier`（free/pro）已入类型；实现配额计算（私人材料、构建次数、模考、Agent 调用等）、展示、免费/专业差异、升级提示（纯 UI demo，无真实支付）。
- M4 发布前打磨：SEO 元数据、robots/sitemap、错误边界与加载态、数据导出、移动端细节；
- M5 部署：Vercel（无需买服务器）或国内云（需服务器+域名+备案），待用户采购域名后决策；生产环境需更换 AUTH_SECRET、切 Postgres、登录限流换共享存储。

## 9. Planned Page Order After the Course Engine

1. `问诊 · 问饮食口味` dual-view knowledge-point page — completed.
2. Subjective-writing room for term explanations and short answers — completed.
3. Case reasoning lab with evidence → mechanism → syndrome → differential-exclusion chain — completed.
4. Minimal browser-local attempt record and weak-point review — completed.
5. Constrained provider-neutral local NUR Agent runtime on the same `问饮食口味` slice — completed; optional real-provider comparison awaits a server-side credential and explicit authorization.
6. Minimal material/source contract and 生理学「内环境与稳态」knowledge/writing pressure test — completed.
7. Evidence-gated Course Builder contract, server-only DashScope adapter, reproducible known-TCM-pack fixture, and live workspace `qwen3.7-plus` validation — completed.
8. Human review/approval surface for the generated draft — completed for browser-local preview; no server publication is implied.
9. Narrow material-import intake for identity, source-family, OCR, privacy, conflict, and authority review before persistent jobs or publication — completed for browser-local structured drafts.
10. Gate-eligible local parsing/transcription — implemented for native DOCX, section-first review, a reversible current-session private overlay, and full synthetic desktop/mobile browser QA.
11. Separately authorized approved-excerpt adapter into the existing Course Builder request — implemented with strict server validation, one-time consumption, real provider use, deterministic revalidation, and local human approval.
12. Evidence-gated material-admission candidate records for identity/provenance/accepted transcription/privacy/source-family/conflict/authority review, stored as validated browser-local records with explicit JSON export — completed.
13. Course-wide official 《中医诊断学》 material pack v1 with a 39-point evidence matrix and deterministic batch-compile contract — completed.
14. Private-material analysis independent of official base packs, with structured Qwen decomposition and honest partial/insufficient/unmapped results — completed with real 20-question browser QA.
15. Partial private learning workspace using existing course/assessment contracts: imported question list, generated-reference-answer labels, practice, favorites, confirmed attempts, redo, and review scheduling — completed with UI in Course Builder workbench and memory integration.
16. Qwen-powered bounded NUR learning Agent with typed tools for answer drafting/rewrite, omission diagnosis, source comparison, favorite proposals, review proposals — completed (typed schema + wiring + pilot + private unit end-to-end via privateRef + memoryCriteria).
17. Full question center — basic version live (questions list + confidence + practice links); on 2026-08-06 the TCM assessment bank was expanded from 16 to 33 items and then, after the user confirmed B1/B2 semantics, to 60 items (A1 30, B1 10, B2 5, fill 5, term 5, short-answer 10, case 2). All new items are NUR-adapted (`nur-editorial` prompt, `nur-platform` answer, `source-cross-checked` confidence) referencing only verified textbook P37/P39/P52–53/P60–61/P69–91/P121–123 and teacher-review sources; B1/B2 are now real group contracts (shared choices / shared stems) with dedicated validation, composition, and rendering. Mock composition now yields 30 auto-graded A1 + 10 B1 + 5 B2 + 5 fill + 5 term + 3 short-answer + 2 case = 60 items / 100 points with zero shortfalls; question-bank home shows 60 items.
18. Mock exam and capability report after the verified offering blueprint — completed 2026-08-03, upgraded to a complete 100-point paper on 2026-08-06: deterministic exam composition from the assessment bank (`src/lib/mock-exam.ts`) now reproduces the full 30/10/5/5/15/15/20 blueprint with every row `complete` and `shortfalls` empty; objective auto-grading covers A1/B1/B2 (45 points), subjective items defer to a pending-review checklist without fake scoring; session persistence in browser localStorage (`src/lib/mock-exam-store.ts`), a running room at `/courses/[courseSlug]/mock-exam` with timer/navigation/submit modal, a capability report view (objective score, per-kind breakdown table, pending-review list), explicit resume/discard entry for an unfinished session, and navigation/workbench entries (nav `模考` link + course-workspace `按考试蓝图模考` link). `tests/mock-exam.test.ts` covers complete 100-point composition, breadth-first ordering, B1/B2 group context, auto-grading, and honest deferral.
19. Wrong-question center and weak-knowledge-point reflow to weekly plan — completed 2026-08-06: a read-only `/wrong-questions` route aggregates QB practice attempts and mock-exam sessions from existing localStorage keys (no new storage), computes per-question and per-knowledge-point wrong statistics via `src/lib/wrong-questions.ts` (Tier 2), exposes a `WrongQuestionCenterData` contract with sorted wrong-question list and weak-KP cards, and provides deep links to lesson pages, question-bank practice, or subjective-writing rooms. The `/learn` dashboard activates the `错题` nav link with a red count badge, adds a `待复习` progress link to `/wrong-questions`, and integrates up to 3 weak-KP chips into the weekly-plan drawer with a `查看全部` link. A `mounted` pattern in the hook prevents hydration mismatch from `useSyncExternalStore` in React 19; the dashboard's profile loading was also fixed to avoid the same mismatch. Browser QA at 455px: `/wrong-questions` and `/learn` (with drawer open) both reported `scrollWidth === clientWidth` with empty console; `npm run check` green (52/52 pages) and `npm test` 140/140.

After the 100-point mock milestone (2026-08-06): wrong-question aggregation was re-verified with the new B1 group members — deliberately answering the B1 shared-choice item `assessment-qb2-b1-pulse-deep` incorrectly surfaced 1 wrong question / 1 attempt / 1 weak knowledge point (`常见病脉` 1 错, 100% error rate) in `/wrong-questions`, the `/learn` nav badge showed `错题 1`, and the weekly-plan drawer reflowed the `常见病脉` weak-KP chip — proving `flattenCourseAssessmentItems` includes group members in the wrong-question pipeline. Browser warning/error logs were empty. Evidence: `wrong-question-center-b1-2026-08-06.png`.

20. M2 学习状态云同步完整实现（2026-08-07） — Phase 1-5:
- Phase 1: 核心写路径（recordConfirmedAttempt、acceptReviewTask、proposeReviewTaskForAttempt）自动触发 upload。
- Phase 2: 登录时 upload + GET 下载 + mergeServerStateIntoLocal（attempts/fsrs 时间戳优先 union，QB/mock 追加去重）。
- Phase 3: QB practice/favorite、mock session、explicit private admission consent（set/getAdmissionSyncConsents）全部接 sync；payload 只传 consented 记录。
- Phase 4: 1.2s debounce + immediate 登录模式、简单 2 次重试 + backoff、完整状态系统（isSyncing/lastSyncAt/lastError + subscribeToSyncStatus + 事件）、dashboard 头部极简状态标签、console.warn 错误。
- Phase 5: 全量 `npm run check` + `npm test` (140/140) 通过；代码路径验证（未登录 401 + 客户端 guard、登录后双向流动）；更新 PROJECT_STATE.md 与计划文档。
- 关键保证：local-first、非阻塞、错误静默、私人 consent 显式门控、复用现有 contracts、Prisma 模型。
- 验证点：未登录所有本地行为不变；登录后 confirm → server 持久化；刷新/跨设备恢复；模考+题库+FSRS 回流。
Evidence: M2-LEARNING-STATE-SYNC-PLAN.md（完整回填）、dashboard sync badge、learner-state-sync.ts。
M2 全面优化（2026-08-07 后续）:
- 提取 buildLearnerSyncPayload 消除重复构建逻辑。
- 新增 useSyncStatus hook（复用 useSyncExternalStore 模式）。
- 改进 merge reviewTasks 清理（server 最新 attempt 覆盖时自动移除过时 proposed）。
- 增加 online + visibilitychange 自动重同步（网络恢复/切回标签时）。
- Dashboard 账户面板：手动“立即同步”按钮 + 基本私人 consent 管理（列出并可 toggle）。
- 状态系统在更多交互场景触发。
- 类型与结构清理，检查全绿。

21. Three-layer wrong-question center — completed 2026-08-16: `/wrong-questions` now exposes `客观错题 / 结构薄弱 / 即将遗忘` tabs. `src/lib/wrong-questions.ts` (Tier 2) gained `StructuralWeakness` / `FsrsHighRiskItem` contracts and two read-only selectors: `selectStructuralWeaknesses` reuses the canonical `selectRepeatedOmissions` rule (latest confirmed version per `surface:taskId:segmentId`, formal only at 3 distinct tasks) and resolves criterion labels from registered `learningMemoryCriteria`; `selectFsrsHighRiskItems` includes criteria with `state === "relearning"` or `lapses >= 2`, attributes each criterion to knowledge points via course-definition back-mapping (fsrsState keys carry no course/kp dimension), computes `suggestedIntervalDays` through the existing `computeFsrsInterval`, and omits criteria no registered knowledge point declares. `selectWrongQuestionCenter` keeps its two-argument compatibility (optional third `memoryState`); the objective aggregation path is unchanged. `useWrongQuestionCenter` adds a second `useSyncExternalStore` snapshot over `nur-learn:learning-memory:v1` under the existing change-event subscription — no new storage key. The UI deep link prefers the training room matching the latest omission's surface, validated against `selectSubjectiveWritingItems` / `selectPrimaryCaseForKnowledgePoint`. Verified through the real product path: three confirmed omissions across 名词解释/简答/案例 tasks produced the structural entry with the correct case-room link, and the 48-hour `加入计划` proposal surfaced exactly on the third omission. 10 new unit tests (`tests/wrong-questions.test.ts`) cover threshold gating, latest-per-task semantics, orphan filtering, sorting, and objective-layer compatibility; `npm run check` and `npm test` 174/174 passed. Known product limitation recorded at ship time: under then-current content every review task was single-criterion and FSRS was only rated on full review-task completion (always `good`), so `relearning` could not be reached through the real UI; the FSRS layer's browser pass therefore verified its empty state, with selector logic covered by unit tests. **Resolved in milestone 25** by rating FSRS on every confirmed attempt (`present→good`, `missing→again`). Two worktree repairs were needed to restore the check gate: `eslint.config.mjs` now ignores the gitignored build/scratch outputs (`.open-next/.wrangler/tmp/.qoder`, previously 2306 errors and an OOM), and `learning-dashboard.tsx`'s M2/M3-era effects were fixed (`fetchQuotas` ordering, ref-based guards, two justified `react-hooks/set-state-in-effect` disables following the existing `use-wrong-questions.ts` convention).
22. M2 sync conflict visibility and user resolution — completed 2026-08-16: multi-device merges no longer silently overwrite divergent learner state. The server's `upsertFsrsStateServer` gained a timestamp guard (only overwrite when the incoming `lastReviewAt` is not older), changing server semantics from "last uploader wins" to "most recently reviewed wins" — the prerequisite for divergence to survive until the next download. `mergeServerStateIntoLocal` now detects conflicts before merging against a dedicated `lastMergeAt` baseline (uploads no longer advance the baseline; a missing baseline means first-merge timestamp priority with no conflicts) and records `SyncConflict` items (`type: fsrs | attempt`, refId, local/server snapshots, reason, detectedAt, owning userEmail) into the new versioned `nur-learn:sync-conflicts:v1` store with strict parsing and a 100-item cap; the interim merged value still keeps the newer record so learning is never interrupted. The detected conflict requires both sides to have changed after `lastMergeAt` with different semantics (state/difficulty/stability/reps/lapses compared exactly); attempt-type conflicts are same-id different-content only; legacy "server re-issued cuid" duplicates are folded by content identity (milestone 24) and no longer inflate history. `resolveSyncConflict` / `resolveAllSyncConflicts` apply the chosen snapshot to local memory — "以本机为准" reasserts the local criterion's `lastReviewAt` to the current moment so the guarded upload overwrites the server, "以云端为准" applies the recorded server snapshot — then remove the conflict and trigger an immediate reliable sync; `clearResolvedConflicts` dismisses records without applying (also called on logout, scoped by email). The `/learn` account panel renders the conflict count, per-item local/server comparisons, and both per-item and bulk resolution actions using existing panel styles plus a small set of module classes; `useSyncConflicts` subscribes through the `use-sync-status` stable-reference pattern. The `triggerLearnerStateSync` / `performReliableLoginMerge` main flow structure is unchanged (the merge and login-merge functions only gained an optional `userEmail` parameter). Verification: 12 new unit tests in `tests/sync-conflicts.test.ts` (detection gating both ways, semantic-equality silence, first-merge baseline, resolution appliers, store parsing); browser end-to-end against the real D1-backed server — a registered QA account produced a genuine conflict by completing a review task locally (FSRS good update) while the server row was mutated to a newer divergent value, the guard kept the divergence through the next upload, the panel showed the conflict with both snapshots, "以本机为准" left the server overwritten with local values (verified in the database) and "以云端为准" applied the server snapshot locally (cross-verified through the wrong-question center's `即将遗忘` layer showing `relearning · 遗忘 7 次`); a follow-up merge with both sides consistent recorded no new conflicts; 390 × 844 and 1440 × 1000 reported `scrollWidth === clientWidth` and the dev log stayed clean. `npm run check` passed and `npm test` reached 186/186. The attempt re-cuid / history-dilution issue recorded here was fixed in milestone 24 (2026-08-17).
23. Agent rewrite-proposal one-click apply — completed 2026-08-16: rewrite proposals from the NUR Agent can now be applied into the active draft with one explicit click in both training rooms, with a single-slot undo and a never-auto-confirm guarantee. A new shared pure module `src/lib/agent-rewrite-merge.ts` (`mergeRewriteIntoDraft`, extracted from the writing room's inline heuristic and hardened) owns the deterministic merge: drafts under 25 characters are fully replaced; proposals of 20 characters or fewer are always inserted as labeled supplements (they cannot carry a full rewrite, and lexical overlap heuristics must not discard a student's long draft for them); longer proposals use character-bigram relevance — replacing the old whole-token containment test, which failed on natural Chinese and silently replaced related drafts — with full replacement only below the relevance threshold; related drafts keep every student sentence and insert the proposal after the most relevant one as `【Agent 补充】`. The writing room now applies into the actual source of `activeAnswerText` (the revision box when it has content, otherwise the first draft — fixing the previous always-writes-first-draft bug), records a single-slot undo snapshot (cleared on task switch, confirm, and the next apply; manual edits do not clear it and the button states the restore goes back to the full pre-apply text), and its ~70 lines of unreachable `pendingMerge` preview dead code were removed. The case room switched from whole-draft overwrite to the same smart merge and now clears the step's confirmed state on apply (matching manual-edit behavior), so applied drafts always remain unconfirmed until the learner runs the self-check and confirms. `NurAgentPilot` unifies the action as `应用此改写`, gates it behind a non-empty current draft, and adds an apply entry for the deterministic NUR `rewriteSuggestion` sentence in addition to Qwen `rewriteProposals`; the Agent still only proposes — all writes go through the room's deterministic handlers, and no apply path touches `recordConfirmedAttempt` or FSRS. Verified in the browser against real `qwen3.7-plus` runs: short draft → proposal applied as full replacement; long related draft → original sentences preserved with the supplement inserted after the most relevant sentence and the confirm button returning to the unconfirmed label; undo restored the exact pre-apply text in both rooms; the case room's stage badge returned from `已自核` to `进行中` after apply; no apply buttons render with an empty draft; 390 × 844 and 1440 × 1000 reported `scrollWidth === clientWidth` on both routes with a clean dev log. 6 unit tests in `tests/agent-rewrite-merge.test.ts` cover both merge modes, the short-proposal rule, and the punctuation-less-draft cases; `npm run check` passed and `npm test` reached 192/192. Evidence: `docs/design-references/agent-rewrite-apply-2026-08-16.png`.


24. M2 confirmed-attempt stable identity (login full-upload no longer re-cuids) — completed 2026-08-17:

**Problem (milestone 22 known issue):** client `recordConfirmedAttempt` uses `crypto.randomUUID()` as domain id, but server `recordConfirmedAttemptServer` / `mergeLocalStateOnLogin` always `create`d rows with Prisma `@default(cuid())`, ignoring client id. Download returned server cuids; client merge was id-only union → same confirmation appeared twice; repeated login full-upload stacked more rows until the 300 cap diluted real history.

**Decision (scheme A + content-key fold):** client `attempt.id` is authoritative. No second permanent `clientAttemptId` column (scheme B rejected as larger surface). Content identity is only a legacy/dedupe key, not a second truth model.

**Content identity key:** `courseId | knowledgePointId | surface | taskId | segmentId | trim(confirmedText) | confirmedAt` (seconds precision). Distinct second+ `confirmedAt` keeps legitimate re-confirms as separate rows.

**Server (`src/lib/learner-state-sync-server.ts`):**
- `upsertAttemptsBatchServer`: load existing once; skip by id or content key; `create` with explicit client `id` + `createdAt = confirmedAt` (no schema migration); then `dedupeLearnerAttemptsForUser` physically deletes same-key duplicates keeping earliest `createdAt`.
- `recordConfirmedAttemptServer` same idempotent rules for single writes.
- Download still maps `id` + `createdAt→confirmedAt`; now stable after correct upload.

**Client (`src/lib/learner-state-sync.ts` + new pure `src/lib/learner-attempt-identity.ts`):**
- `mergeServerStateIntoLocal` uses `mergeAttemptLists(local, server)` = id union + content fold (local first so UUID wins over legacy cuid) + cap 300.
- `detectAttemptConflicts` remains same-id different-content only; different-id same-content is folded silently (not a SyncConflict).
- Debounce / immediate / admission consent / FSRS timestamp guard / conflict UI unchanged.

**Compatibility:** old users are not wiped; duplicates fold on next merge/upload; unique confirmations retained. No course-truth / FSRS algorithm / membership / Agent apply changes. QB attempt now has stable identity (see milestone 26).

**Verification:** `tests/learner-attempt-sync-identity.test.ts` + existing `tests/sync-conflicts.test.ts`; full suite 202/202; `tsc` clean. Run `npm run check` after this note.

**Files:** `src/lib/learner-attempt-identity.ts` (new), `src/lib/learner-state-sync-server.ts`, `src/lib/learner-state-sync.ts`, `tests/learner-attempt-sync-identity.test.ts`.

25. FSRS high-risk layer reachable on real confirm path — completed 2026-08-17:

**Problem (milestone 21 known limitation):** FSRS was only rated when an *accepted* review task fully completed. Completion requires every task criterion to be `present`, so the rating was always `good`. The `again` branch was unreachable for single-criterion (and multi-criterion) real UI; `relearning` / `lapses >= 2` almost never appeared, so「即将遗忘」stayed empty outside unit tests with synthetic fsrsState.

**Fix (no FSRS algorithm rewrite):** In `applyConfirmedAttempt`, every confirmed attempt rates each self-check criterion via existing `fsrsNextState`: `present → good`, `missing → again`. Review-task completion still updates task status only and no longer double-rates FSRS. High-risk selector thresholds unchanged (`relearning || lapses >= 2`).

**Real path:** miss the same memory criterion on two confirms → `learning/lapses=1` then `relearning/lapses=2` → appears in wrong-question center. Recovery `present` moves state to `review` but keeps lapses (still high-risk until lapses no longer meet threshold — current gate keeps lapses>=2 items).

**UI:** empty state distinguishes `hasFsrsMemory` false（尚未产生足够记忆数据）vs true（暂无高危准则）.

**Still limited:** never confirming → empty; high-risk still needs two misses (or relearning) — not first-miss spam. `acceptReviewTask` still only stamps `lastReviewAt` for scheduling, not a rating. QB/objective path unrelated.

**Files:** `src/lib/learning-memory.ts`, `src/lib/wrong-questions.ts`, `src/components/wrong-question-center.tsx`, `tests/learning-memory-fsrs-path.test.ts`, `tests/wrong-questions.test.ts`.



26. QB attempt 稳定身份与去重（与 confirmed attempt 同级）—— completed 2026-08-17

**Problem:** QB attempt 仍是 append-only。在多设备或重复上传/登录全量时，同一题同一作答被重复追加，统计与同步污染。

**Decision:** 内容键折叠（不加 id 字段到 QBAttemptRecord，保持与错题中心等聚合最小变更）。

**Content identity key:** `questionId | selectedIndex | isCorrect | normalizeToSec(attemptedAt)` （秒精度，容忍时钟漂移；不同秒的不同练习实例保留）。

**Changes:**
- New pure `src/lib/qb-attempt-identity.ts`（normalize、qbAttemptContentIdentityKey、foldQbAttemptsByStableIdentity、mergeQbAttemptStores）。
- Client: `question-bank-store.ts` addQBAttempt 遇相同 key 跳过（本地幂等）；getQBAttempts/getAllQBAttempts 读时 fold（折叠历史脏数据）；`learner-state-sync.ts` merge 用 mergeQbAttemptStores（local-first）。
- Server: `addQbAttemptServer` 按 key 查重 skip；`mergeLocalStateOnLogin` QB 部分后调用 `dedupeQbAttemptsForUser`（物理折叠，保留最早）；`fetchUserQbAttempts` 返回前 fold。
- `tests/qb-attempt-identity.test.ts` 平行覆盖 normalize/漂移/折叠/ merge / 老数据。
- PROJECT_STATE 更新。

**Verification:** 同一逻辑 key 上传/下载/合并后只 1 条；不同时间保留；老重复安全折叠；`npm run check` + 测试通过。不改课程真相、错题中心逻辑、FSRS、practice UI、QBAttemptRecord 形状。

**Files:** `src/lib/qb-attempt-identity.ts` (new), question-bank-store.ts, learner-state-sync.ts, learner-state-sync-server.ts, tests/qb-attempt-identity.test.ts, docs/PROJECT_STATE.md。

The first vertical slice should connect one real knowledge point through learning, drilling, subjective output, case transfer, and review before every navigation route is filled.

## 10. Resolved Product Question

Resolved by the user on 2026-07-15:

> Should the modern-medicine section primarily help students understand the TCM knowledge, or should it also enter exam-answer and scoring practice?

Answer: modern medicine also enters exam-answer and scoring training. The implemented 10-point NUR practice rubric assigns 4 points to TCM reasoning, 4 points to modern-medicine symptom/assessment reasoning, and 2 points to relationship boundaries. This is a platform training model, not a claim about the teacher's real exam rubric.

## 11. Worktree and Operational Notes

- The current worktree contains uncommitted implementation and screenshot files from the approved homepage and course workspace.
- These changes belong to the ongoing project. Do not reset, discard, overwrite, stage, commit, push, or deploy unless the user explicitly asks.
- Local preview convention: `npm run dev`, then open `http://localhost:3000` for the promotional homepage or `http://localhost:3000/learn` for the weekly learning homepage.
- The product is intentionally not deployed yet. Finish a credible learning loop first.
- Next.js is version 16.2.1 with breaking changes. Read the relevant local documentation in `node_modules/next/dist/docs/` before writing framework code.


## M4 准备（M3 完成后启动）

### M4 切片 A — 错误边界 / 加载态 / 基础 SEO（completed 2026-08-17）

**Error / not-found**
- Rewrote `src/app/error.tsx`：固定中文可恢复 UI，不展示 `error.message`/stack；dev-only console。
- Added `src/app/global-error.tsx`（根 layout 崩溃兜底，自带 html/body）。
- Added `src/app/not-found.tsx`。
- Segment errors: `learn/error.tsx`、`wrong-questions/error.tsx`、`courses/error.tsx`（覆盖工作台/知识点/写作/案例/题库）。
- Shared: `src/components/route-error-fallback.tsx`、`route-not-found-fallback.tsx`、`system-fallback.module.css`（暖象牙、细线、方按钮）。

**Loading**
- Rewrote `src/app/loading.tsx`；segment `learn` / `wrong-questions` / `courses` loading。
- Shared `route-loading-fallback.tsx`（细线 + 一行文案，无花哨 skeleton）。
- login/register Suspense fallback 接同一 loading。

**SEO**
- Root `layout.tsx`：`metadataBase` + `SITE_*` from `site-config`；去掉不存在的 `/og.png` 坏链；OG/twitter 文字卡。
- `robots.ts`：disallow api/auth/account/wrong-questions/course-builder/forgot/reset。
- `sitemap.ts`：`/`、`/learn`、法律页、已有课程工作台 `tcm-diagnostics`、有 lesson 的知识点页；不含私密训练室/题库深链/builder/错题。
- noindex：login、register、forgot/reset layouts、wrong-questions、course-builder、billing。

**Not in this slice:** 新监控、课程内容、同步/Agent/会员逻辑、自动 commit。

**Verify:** `npm run check`；robots/sitemap 构建产物可访问。


### M4 切片 B — 本机学习数据导出（completed 2026-08-17）

**Problem fixed:** 早期 `export-learner-data.ts` starter 使用错误 localStorage key（`attempts:v1` / `fsrs:v1`），无法读到真实 `learning-memory:v1`，导出会空。

**Implementation**
- Rewrote `src/lib/export-learner-data.ts`：纯函数 `buildLearnerDataExport` + 浏览器 `collectLearnerDataExportFromBrowser`。
- 通过既有 store/parse：learning-memory（attempts / reviewTasks / fsrsState）、`getAllQBAttempts` / favorites、mock sessions、material admission store、按 courseId 的 user exam structure。
- 可选 `wrongQuestionSummary`（`selectWrongQuestionCenter` 紧凑统计，不含课程全文）。
- 包字段：`kind=nur-learner-data-snapshot`、disclaimer、account 元数据（仅登录邮箱）、counts、exportBoundary（全非授予，importSupported=false，非成绩单）。
- 文件名 `nur-learn-data-YYYY-MM-DD.json`；不含 API key / 课程真相 / 原始私人二进制 / 服务端独有态。
- UI：`/learn` 账户面板登录与访客均可「导出学习数据」+ 克制说明。
- Tests：`tests/export-learner-data.test.ts`。

**Not in slice:** 云端导出、PDF、一键导入、会员/同步主流程改动。


### M4 切片 C — 移动端触控 44px / 基础 a11y / console 卫生（completed 2026-08-17）

**Scope（唯一）：** 主学习路径 UI 触控可达、基础可访问名/焦点、主路径 console 噪声；不新功能、不改课程内容/同步协议/Agent/会员/导出主逻辑/SEO。

**Touch (~390)**
- `src/app/globals.css`：主交互控件 `min-height: 44px`；`.account-close-button` / `.closeButton` 类 `min-width: 44px`；`touch-action: manipulation` 保留；`:focus-visible` 既有蓝描边保留。
- `nur-agent-dock.module.css`：drawer 关闭钮 30px → min 44px + padding。
- `learning-dashboard.module.css`：账户面板关闭、账户钮、主 CTA、计划折叠/收起、导出钮、主导航链 min 44；清理重复 padding。
- `course-workspace.module.css`：drawerClose / 考试编辑关闭、导航、exam 输入与添加题型、主操作高度地板。
- `knowledge-point-lesson` / `subjective-writing-room` / `case-reasoning-room` module.css：主导航 padding + min-height 44；主操作/头像容器/来源链触控地板。
- `wrong-question-center.module.css`：tab / tabActive、错题与薄弱项、empty CTA min-height 44。
- 装饰性 underline `::after`、brand-mark、状态点尺寸未当触控目标放大，避免横向溢出。

**a11y（无大型框架）**
- `/learn` 账户开关补 `aria-label`；计划抽屉收起补 `aria-label="收起本周计划"`。
- 写作/案例室 rubric 与证据多选已有 `aria-pressed`；账户关闭/Agent FAB/关闭/多数 icon 钮已有可访问名；auth 隐式 label 保留。
- 不引入 a11y 库；不重做导航信息架构。

**Console**
- `performReliableLoginMerge` 失败路径 warn 仅 `development`（避免 prod 噪声 + 修复 TS2367 窄化）；错误仍写入 `lastError`，不吞失败。
- 既有 error boundary / mail mock 仍为 dev-only 或错误路径；未在主路径新增 log。

**Verify**
- `npm run check` 全绿（lint 既有 14 warnings / 0 errors；tsc；next build）。
- 未自动 commit / push / 部署。
- 未在本轮完成真实设备 390 点击串与 design-qa 新截图（见残余）。

**Not in slice:** 内容扩写、完整新闭环、SEO/导出主逻辑重做、重型 UI 库、导航 IA 重构。

### M4 仍待
- ✅ 本机学习数据导出（切片 B，2026-08-17）
- ✅ 移动端 44px / 基础 a11y / console 卫生（切片 C，2026-08-17）
- 浏览器 QA 与 design-qa 截图补强（390 路径：登录→课程→闭环→错题→导出；error/loading 文案级已记）
- 性能细抠（非阻塞）
- M5 部署仍待 ICP/域名

- 复用现有 contracts，不新加大模型或支付。
- 参考 design-qa.md 更新。

## 2026-08-08 更新：M2 可靠登录合并 + 双向同步骨架 + 文件审计 + 转接准备（本次完成）

**M2 可靠登录合并骨架（高效自完成）：**
- 新增集中 performReliableLoginMerge()（src/lib/learner-state-sync.ts）：登录时全量上传（delta=false）→ 顺序下载 server 状态 → mergeServerStateIntoLocal（timestamp 优先 union）+ 状态更新。
- src/components/learning-dashboard.tsx 登录 useEffect 已切换为调用该可靠入口。
- 写路径确认全接 triggerLearnerStateSync（learning-memory / question-bank-store / mock-exam-store）。
- 验证：npm run check 通过（0 errors），build 成功。

**文件审计结果：**
- 无真正 0 字节文件。
- 建议删除的 stub/遗留：
  - GEMINI.md（11 bytes，只 "@AGENTS.md"）
  - CLAUDE.md（相同）
  - .gemini/（空目录，早期模板遗留）
- 推荐命令：rm -f GEMINI.md CLAUDE.md && rm -rf .gemini
- 其他小 stub（如 .qoder/MEMORY.md）可按需清理。tmp/ 保留 artifacts。

**剩余待办（已补全）：**
1. M2 可靠登录剩余增量（跨设备测试、consent 边界强化、增量 payload）。
2. M4 发布前打磨：
   - ✅ SEO 元数据、robots/sitemap、ErrorBoundary + loading（切片 A，2026-08-17）
   - ✅ export-learner-data 本机快照导出（切片 B）
   - ✅ 移动端 44px touch + 基础 a11y + console 卫生（切片 C）
   - 性能细抠残余
   - design-qa / 390 真机点击串截图补强
3. M5 部署（待用户采购域名后决策）。
4. 内容 pending（教师 9 页 rubric、部分 unverified 答案、错题中心 FSRS/主观增强）。
5. 转接工作：三个计划文件保持最新（本更新已完成）。

**优先级**：M2 可靠登录合并核心已落地。M4 切片 A/B/C（错误/SEO、本机导出、触控44/a11y/console）已完成；表里辨证第4闭环已完成（2026-08-17）；残余为 design-qa 浏览器补强与性能细抠 → 下一知识点闭环或 M5。


## M5 上线准备（知径上线检查清单）— 2026-08-17 完成

**目标**：产出可执行的 docs/LAUNCH_CHECKLIST.md + 最小生产缺口修复（仅上线必须项）。

### 已完成的最小修复（仅上线必须）
- prisma/schema.prisma：添加 url = env("DATABASE_URL")
- docker-compose.yml：移除损坏的内联 DATABASE_URL 插值（改为依赖 .env.local + 清晰注释）
- Dockerfile（runner）：添加 wget 安装，解决 node:slim 健康检查失败
- .env.example：补全所有 NEXT_PUBLIC_*、加强 AUTH_SECRET 生成与“显式失败”说明、增加生产 Postgres 示例
- package.json：添加 "postinstall": "prisma generate"
- src/lib/prisma.ts：支持 Postgres（纯 Node 环境使用 plain PrismaClient），sqlite 路径尊重 DATABASE_URL
- docs/DEPLOYMENT.md：同步当前实际（prisma runtime、env 来源、健康检查、generate 保证等）
- 新建 docs/LAUNCH_CHECKLIST.md（完整 4 部分：必做、建议、暂缓、回滚风险；可执行命令与验证）

### 验证结果
- npm run check 通过（lint + typecheck + build）
- AUTH_SECRET 已有显式 throw（无需额外修复）
- 健康检查、数据库策略、隐私导出边界已在 checklist 中明确记录
- 所有文档与真实代码/配置一致

### 仍阻塞项（M5 依赖外部）
- 域名 + ICP 备案 + 服务器采购
- 真实支付商户号
- 生成式 AI 服务登记（若使用 DashScope 生产流量）
- 公安联网备案
- 生产环境实际部署演练（当前仅代码层就绪）

**结论**：上线准备（代码 + 可执行文档）已完成。等待域名/备案后即可执行 docker 部署与最终验证。不自动 commit / push / 部署。

---

**优先级**：上线准备完成。下一步由外部条件（域名/服务器/备案）驱动。


### M4 切片 C · 390 验证（2026-08-17 续）

- **工具**: Playwright Chromium，`viewport 390×844`，`isMobile+hasTouch`
- **路径**: `/learn`（账户面板+导出）→ `/courses/tcm-diagnostics` → KP 课页 → 写作室/案例室 → `/wrong-questions` tabs → `/login`
- **结果**:
  - 全页 `scrollWidth === clientWidth`（390）
  - 主按钮/`role=tab` 高度 ≥40/44；无无名 button
  - 主路径 console warning/error / pageerror：**0**
  - 导出钮实测约 274×50；Agent FAB/关闭 44×44
- **缺陷修复**: 写作室 390 下 Agent 关闭被 sticky header 头像拦截 → `nur-agent-dock` 改为 `createPortal(..., document.body)` + 提高 overlay/drawer z-index；客户端挂载用 `useSyncExternalStore`（避免 `setState-in-effect` lint）
- **截图**: `docs/design-references/m4-touch-*-390-2026-08-17.png`
- **check**: `npm run check` EXIT 0
- **仍残留**: 真机 Safari/手势；设计 QA 人工走查；既有 lint warning 14 条；性能细抠非本轮

---

## Hi doc 主线 M0 + M1（2026-09-17 完成）

**真相源**：`docs/HI_DOC_PLAN.md`（用户 2026-09-16 四条定案：教材存服务器、名额当月制、Hi doc 替代我的资料、试点课免费）。该主线明确覆盖 `AGENTS.md`「Next Product Priority」中写于定案前的「不做 server material store」旧约束；其余 Tier 1–4、设计规则、验证要求继续生效。

### M0 — 会员四档迁移 + 官方课名额 + 首页三入口
- 会员档位 `free|lite|pro` → `free(=trial)|basic|pro|max`；`basic` 继承原 `lite` 权益，旧 `lite` 在 schema 注释、读取层（`src/lib/membership.ts`）、JWT 会话、配额、账单 UI 全链归一化，迁移含 `lite→basic` 数据回填。
- 支付 SKU：Basic / Pro / Max × 月/季/年 = 9 个；旧 `lite-*` planId 只作兼容映射（存量 pending 订单可与 basic 订单同语义复用）。
- `CourseEntitlement`（userId+courseId+grantedAt）+ 试点课白名单（`course-tcm-diagnostics`、`course-physiology`）免费且不占名额；官方课名额按档位 2/2/5/无限。
- `/learn` 首页新增三入口：官方课程学习闭环 / Hi doc / 传统刷题题库。
- 提交 `36e8efc`。

### M1 — 上传 + 书架 + 当月名额（不越期：无 OCR、无目录识别）
- Prisma `HiDocTextbook`（title/fileName/storageKey/sizeBytes/pageCount/hasTextLayer/status/toc/activeMonth/deletedAt，全部挂 userId），迁移 `20260916172135_m1_hidoc_textbook`。
- 服务端全部在 `src/lib/hidoc/`：`storage.ts`（storageKey 抽象 + 本地磁盘卷驱动，接口留 OSS 适配空间）、`storage-key.ts`（键生成/目录穿越防护）、`pdf-text-layer.ts`（pdfjs 文字层探测，无文字层拒绝）、`limits.ts`（档位月额度、Asia/Shanghai 自然月、冻结判定）、`textbooks.ts`（上传/书架/删除/重新激活 + 名额事务校验）、`session-user.ts`；API `/api/hidoc/textbooks` 只做 thin adapter。
- 名额仅当月有效：trial/basic 1、pro 3、max 10；超额 503 + 中文原因，不静默放行；删除软删除墓碑并立即删除服务器文件、释放当月名额；跨月教材显示冻结态，重新激活占用当月名额。
- 上限与拒绝：单本 ≤1500 页、≤200 MB、必须 PDF（无文字层的扫描件明确拒绝并提示，暂不做 OCR）。
- 关键实现约束（回归时勿改）：pdfjs v6 的 fake worker 必须把 `GlobalWorkerOptions.workerSrc` 指到 `node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs`，该文件由 `next.config.ts` 的 `outputFileTracingIncludes` 纳入 standalone 产物；pdfjs 会 detach 传入的 `ArrayBuffer`，`sizeBytes` 必须在探测前固定；`pdfjs-dist` 不可加入 `serverExternalPackages`（会破坏浏览器端 PDF 解析的构建）。
- 验证：`npm run lint`（0 error）/ `npm run typecheck` / `npm run test`（274/274，含新增 `tests/hidoc-quota.test.ts`、`tests/hidoc-storage-key.test.ts`）/ `npm run build` 通过；浏览器与 API 端到端见 `design-qa.md`「Hi doc M0 + M1」节。
- 已知限制：孤儿文件（写入成功但落库前进程崩溃，无从清理）；`/data/hidoc` 持久卷与 docker-compose volume 待部署配置；被拒绝文件留空目录已通过 rmdir 清理。
- 未提交的 `src/content/courses/infectious-diseases/` 与 `scripts/infectious-*` 全程未触碰。

**下一优先级**：M2 目录识别 + 手动修正（`/learn/hi-doc/t/[id]` 章节树），复用同一 storage/catalog 边界，不引入平行课程真相模型。

---

## Hi doc 主线 M2（2026-09-17 完成）

**目标**：一本真实教材能切出正确章节；识别结果可人工修正。

### 数据与配额
- Prisma `HiDocChapter`（textbookId/order/title/pageStart/pageEnd/source/status），迁移 `20260916180343_m2_hidoc_chapter`；`source` 诚实标注 `outline | toc-page | model | manual`，`status` 为 M3 萃取状态（M2 只写 pending）。
- `HiDocTextbook.toc` 存识别元信息（strategy / chapterCount / notes / recognizedAt），章节本体不重复存 JSON。
- 新增配额资源 `hidocParses`（Hi doc 目录解析，模型）：free 3 / basic 10 / pro·max 无限；模型调用无论成败都计入 `usage.hidocParses` 并写 `EventLog`（`hidoc_toc_parse` + outcome），额度不足 503 中文报错不静默放行。

### 服务端（src/lib/hidoc/）
- `pdf-document.ts`：统一 pdfjs 加载（worker 解析）、书签读取（含命名目标 → 页序解析）、前 N 页按行取文本。
- `toc-heuristic.ts`（纯函数）：pdfjs 文本项按 Y 基线聚类分行（真实 PDF 常无 hasEOL）→ 印刷目录页解析（第X章/篇 + 点线 + 页码，兼容康熙部首数字与全角页码）→ 章节归一化（排序/去重/补 pageEnd/上限 200）→ 书签章节择优（章标题 > 篇标题 > 最浅层级兜底）→ 页码偏移投票（≥2 票一致才采信）→ 手动修正校验。
- `toc-provider.ts` + `providers/dashscope-toc.ts`：provider-neutral 目录解析边界（复用 DASHSCOPE_API_KEY/BASE_URL，模型默认 `qwen3.7-plus`，HIDOC_TOC_PROVIDER/MODEL 可覆盖），严格 JSON + 逐条校验，未配置密钥时如实降级为纯启发式。
- `toc-recognition.ts`：确定性优先的编排（书签 → 印刷目录页 → 模型兜底），SSE 进度回调；探针会排除目录页自身（目录页也含章节标题，否则污染偏移投票）。
- `chapters.ts`：识别结果事务落库 + 教材状态 `toc_ready`；手动修正整体替换，未改动行保留原来源、改动/新增行标 `manual`。
- `textbook-view.ts`：教材视图映射（含章节数、识别元信息的不可信解析）。

### API 与页面
- `GET /api/hidoc/textbooks/[id]`（详情）、`POST /api/hidoc/textbooks/[id]/toc`（SSE 识别）、`PUT /api/hidoc/textbooks/[id]/chapters`（手动修正）；集合路由复用统一失败响应助手。
- `/learn/hi-doc/t/[id]`：教材信息 + 目录识别（进度日志 + 说明）+ 章节树 + 手动修正（改标题/页码、删除、新增、按起始页重排）；书架标题与「进入教材」链接到详情页。

### 真实验证（2026-09-17）
- 真实教材《卫生统计学_赵耐青练习册》（79 页 / 77 书签 / 有文字层）：书签层级为「根 → 习题参考答案 → 第一章…」（章在 L3），择优规则命中 **19 章**，页码 1–2 … 77–79 与书末一致。
- 合成教材（印刷目录页 + 前 2 页前置页）：偏移投票 `+2`，3 章页码与真实 PDF 页一致。
- 无目录样本：模型兜底无果 → 422 `no-toc` + 中文指引；`hidocParses` 与 EventLog 均已记录。
- 手动修正：越界/空标题/倒序均返回中文原因；来源保留规则经 API 实测。
- `npm run lint`（0 error）/ `typecheck` / `test` 291 通过；浏览器与 390 无溢出见 `design-qa.md`「Hi doc M2」节。
- 已知限制：书签标题可能只有「第一章」而无章名（PDF 书签本身如此），需人工补名；页码偏移在探针不足 2 票一致时不校正（如实提示人工核对）。

**下一优先级**：M3 知识点萃取（SSE 流式，按章读文字层 → 逐知识点结构化 + 页码溯源），复用本期的 pdf 运行时、章节契约与配额/EventLog 边界。

---

## Hi doc 主线 M3（2026-09-17 完成）

**验收达成**：真实一章萃取出带页码溯源的知识点（计划 §7 M3 验收标准）。

### 数据与配额
- Prisma `HiDocKnowledgePoint`（chapterId/order/title/description/keyTerms/prerequisites/sourcePage），迁移 `20260916180343_m3_hidoc_knowledge_point`（编号见 migrations 目录）；章节行新增萃取状态推进（pending→extracted）。
- 新配额资源 `hidocExtracts`（Hi doc 知识点萃取，按章一次模型调用）：free 5 / basic 20 / pro·max 无限；模型调用无论成败都计入 `usage.hidocExtracts` 并写 `EventLog(hidoc_chapter_extract, outcome)`（与 hidocParses 同一「token 已消耗即记账」原则）。

### 服务端（src/lib/hidoc/）
- `extraction-heuristic.ts`（纯函数）：模型 payload 严格校验（页码必须在章节范围内、字段长度/类型/数量上限、同章去重）、先修引用只保留同批次可对上标题（自引用与不存在引用丢弃并计数）、章节文字带【PDF 第 X 页】标记构建与截断。
- `extraction-provider.ts` + `providers/dashscope-extract.ts`：provider-neutral 萃取边界（复用 DASHSCOPE 密钥，默认 `qwen3.7-plus`，HIDOC_EXTRACT_PROVIDER/MODEL 可覆盖），输入为带页标记的单章文字（≤20k 字符）。
- `extraction.ts`：单章编排（读文件 → 按页读文字 → 模型 → 事务落库整体替换该章知识点 → 章节 extracted），SSE 进度（read/extracting/save）+ 落库后逐知识点回放事件；章节文字层过少、无密钥、额度不足、模型 0 结果都如实报错不静默。
- `chapters.ts`：`replaceChapterKnowledgePoints`（事务内 deleteMany+createMany+状态更新，落库前页码二次校验）与 `getChapterKnowledgePoints`；`loadChapters` 带 `_count.knowledgePoints`。

### API 与页面
- `POST /api/hidoc/textbooks/[id]/chapters/[order]/extract`（SSE：progress/kp/result/error）、`GET .../chapters/[order]`（按需读取知识点）；均为 thin adapter。
- 详情页章节行：萃取状态与知识点计数、行内「萃取知识点/重新萃取」按钮、展开箭头查看知识点列表（标题/页码徽标/描述/术语/先修）；萃取进度日志逐条显示，完成后自动展开；重跑整体替换（覆盖语义在页脚明示）。

### 真实验证（2026-09-17，《卫生统计学_赵耐青练习册》）
- 第一章（1–2 页）直连服务层萃取：11–13 个知识点（两次调用验证覆盖语义），页码全部落在章内（p1/p2），术语与先修完整、内容与卫生统计学「总体/样本/变异/抽样」主题吻合。
- 第二章（3–5 页）经 HTTP SSE 路由萃取：10 个知识点（p3–p5）。
- 第三章（6–8 页）浏览器内点击萃取：约 19 秒，11 个知识点（p6 起），刷新后持久化。
- `usage.hidocExtracts=6` 与真实模型调用次数（含 3 次被环境崩溃中断但已消耗 token 的尝试）严格一致。
- 测试 301/301（新增 `tests/hidoc-extract.test.ts`）；lint 0 error；typecheck 干净；build 463 页通过；390×844 无溢出（见 design-qa.md「Hi doc M3」）。

### 本地 dev 崩溃根因与修复（2026-09-17 已修）
- 根因：`@prisma/adapter-better-sqlite3@7.9.1` 依赖 `better-sqlite3 ^12.6.0`，npm 因而在适配器下嵌套安装 12.11.1。该版本在 Node 24.19 下存在 Statement GC 终结器断言崩溃：查询产生垃圾 Statement → 大内存分配（模型响应解析）触发 GC → `RemoveEnvironmentCleanupHook(env=nullptr)` 断言 → 进程崩溃。M3 萃取流程（20k 字符输入 + 模型响应）必现，曾 4 次中断 SSE 落库。
- 修复：`package.json` 增加 `"overrides": { "better-sqlite3": "^13.0.3" }`，使适配器与 prisma CLI 统一复用顶层 13.0.3（`npm ls` 显示三者 deduped，lock 中嵌套 12.x 树及其 prebuild-install 依赖被移除，-372 行）。13.x 自带 `prebuilds/`（darwin/linux/win32），运行时直接加载，不依赖 install 脚本，因此 Docker/Linux 部署同样免编译。
- 验证：12 轮 GC 压力回归（Prisma 查询 + 大分配 + 强制 GC）零崩溃；原本 100% 崩溃的真实萃取流程（第四章 9–14 页，17 个知识点）经 HTTP SSE 全程通过且服务存活；`lint` 0 error / `typecheck` / `test` 301/301 / `build` 463 页通过。
- 备选（若未来 13.x 与适配器出现不兼容）：等 `@prisma/adapter-better-sqlite3` 上游升级依赖（截至今日最新稳定 7.10.0 仍为 ^12.6.0）；生产 Postgres 适配器不受此问题影响。

**下一优先级**：M4 学习页（`/learn/hi-doc/t/[id]/c/[n]`：知识点讲义生成 + NUR Agent 讲解对话），复用章节/知识点契约与同一 provider-neutral 边界。

## Hi doc 主线 M4（2026-09-17 完成）

**验收达成**：学习页生成讲义并就讲义/原文追问（计划 §7 M4 验收标准）。

### 数据与配额
- Prisma `HiDocLesson`（kpId 唯一、contentMd、style、generator、sourceExcerpt、generatedAt）与 `HiDocConversation`（userId、kpId 可空、messages Json、`@@unique([userId, kpId])`），迁移 `20260917121655_m4_hidoc_lesson_conversation`；User 新增账户级 `hiDocLessonStyle`（默认 `zh-primary`，迁移 `20260917122459_m4_hidoc_lesson_style`）。
- 新配额资源 `hidocLessons`（free 5 / basic 20 / pro·max 无限）与 `hidocChats`（free 50 / basic 200 / pro·max 无限）；模型调用无论成败都计入 `usage` 并写 `EventLog(hidoc_kp_lesson / hidoc_kp_chat)`（带 provider、model、outcome、字符数）。启发式兜底未消耗 token，不占模型额度，只记事件。

### 服务端（src/lib/hidoc/）
- `lesson-heuristic.ts`（纯函数）：风格解析（未知值回落 `zh-primary`）、生成方式 `model:{provider}:{model}` / `heuristic` 的格式化与解析、讲义结构校验（定义与要点必存、自测题 ≥3 道）、原文摘录选择（只取含标题/术语的真实句子）、启发式讲义构建（定义/要点/易错点/自测题 3 道，页首固定声明「未接入模型」）。
- `lesson-markdown.ts`（纯函数，客户端安全）：讲义 markdown 受限子集解析（标题/段落/列表/引用/行内粗体与代码），渲染端构造 React 元素，不用 `dangerouslySetInnerHTML`。
- `conversation.ts`（纯函数）：对话 Json 列的严格解析（非法条目丢弃）、追加与上限裁剪（保留最近 40 条）、送入模型的历史窗口（最近 12 条）。
- `chat-prompt.ts`（纯函数）：Hi doc 讲解 system 提示词（讲义 + 原文片段 + 本章知识点清单 + 边界声明：非教师评分、不做临床诊断、超出教材即标注「通用医学知识」、不用表格/代码块）；模型消息 = system + 服务端读取的历史 + 本轮提问。
- `source-excerpt.ts`：按 `sourcePage` ±1 页聚合 PDF 文字层（带【PDF 第 X 页】标记，≤8000 字，过少即失败），讲义与对话共用。
- `lesson.ts`：讲义编排（归属校验 → 原文片段 → 有密钥则流式模型生成 + 结构校验，无密钥则启发式兜底 → upsert 覆盖并回放 notes），`loadHiDocLesson` 与 `toHiDocLessonView`。
- `chat.ts`：对话编排（提问校验 → 归属校验 → 密钥/额度门控 → 读历史与讲义 → 提问先落库 → 流式回答 → 回答落库裁剪），失败时不保存半截回答；回答上下文优先复用讲义已存的原文片段，避免每轮重解析 PDF。
- `knowledge-points.ts` / `study.ts`：知识点归属上下文、同章知识点标题、对话读写，与学习页只读视图（章节 + 知识点清单含讲义状态、单点讲义 + 对话历史）。
- provider-neutral 边界：`lesson-provider.ts` / `chat-provider.ts` + `providers/dashscope-stream.ts`（共用流式补全：HTTPS aliyuncs 校验、SSE 解析、Bearer 密钥仅服务端）+ `providers/dashscope-lesson.ts` / `providers/dashscope-chat.ts`；默认 `qwen3.7-plus`，`HIDOC_LESSON_MODEL` / `HIDOC_CHAT_MODEL` 可覆盖。

### API 与页面
- `POST /api/hidoc/kp/[id]/lesson`（SSE：progress → delta → result/error）与 `POST /api/hidoc/kp/[id]/chat`（SSE：delta → result/error，仅接受本轮提问）；均为 thin adapter。
- `/learn/hi-doc/t/[id]/c/[n]` 学习页：左栏知识点列表（序号、标题、页码、「已有讲义/未生成讲义」、当前项高亮），右栏讲义（生成/重新生成 + 覆盖确认、生成方式徽标、markdown 渲染）与讲解追问（Enter 发送、流式渲染、回答按 markdown 渲染）；教材详情页知识点标题改为可点进入学习页。

### 真实验证（2026-09-17，免费档验证账号 + 《卫生统计学_赵耐青练习册》）
- 讲义生成（真实 `qwen3.7-plus`）：174 个 delta、约 9 秒，结构校验通过，落库 `generator=model:dashscope:qwen3.7-plus`，要点/易错点均带页码；重新生成给出「本次生成覆盖了此前讲义」并保持单行覆盖。
- 未接入模型兜底：空密钥进程内生成「个体变异」讲义，`generator=heuristic`，页首与面板均标注「未接入模型」，内容仅来自萃取结果与原文摘录，未消耗模型额度。
- 讲解对话（真实模型）：117 个 delta、约 7 秒，回答引用教材页码与原文依据；对话落库 2 条并刷新后保留。
- 安全与配额：未登录 401；跨账号 kpId 404；`hidocChats` 50/50 时 20ms 拒绝且未落库提问、未发起模型调用；`usage` 与真实调用次数一致。
- 测试 320/320（新增 `tests/hidoc-lesson.test.ts` 19 项）；lint 0 error；typecheck 干净；`npm run build` 通过（hidoc 10 条路由）；390×844 无溢出；浏览器与 API 明细见 `design-qa.md`「Hi doc M4」节。

**下一优先级**：M5 划重点/批注（`HiDocHighlight`：选中文本 → quote/color/note/anchor）与学霸笔记（`HiDocNote`：本章讲义 + 追问 + 划重点汇总导出），复用本期的讲义/对话契约与同一 provider-neutral 边界。

## Hi doc 主线 M5（2026-09-17 完成）

**验收达成**：选中文本 → 四色划线/批注 → 章级学霸笔记生成与导出（计划 §7 M5 验收标准）。

### 数据与配额
- Prisma `HiDocHighlight`（userId + kpId 级联、quote/prefix/suffix、color 四色枚举、note 可空、anchor Json 存 `{ lessonUpdatedAt }`、`@@index([userId, kpId])`）与 `HiDocNote`（userId + chapterId 级联、contentMd、generator、`@@unique([userId, chapterId])` 一章一份、重新生成即覆盖），迁移 `20260917141417_m5_hidoc_highlight_note`；全部私有挂 userId，不进官方课程目录。
- 新配额资源 `hidocNotes`（free 3 / basic 10 / pro·max 无限）；模型笔记调用无论成败都计入 `usage.hidocNotes` 并写 `EventLog(hidoc_chapter_note)`（带 provider、model、outcome、知识点/讲义/划重点/追问计数）；启发式兜底不占模型额度，只写事件；额度不足 503 中文报错不静默放行。

### 服务端（src/lib/hidoc/）
- `highlight-rules.ts`（纯函数，客户端安全）：四色枚举与语义标签、创建/修改校验（quote 去空白 ≤500、note ≤1000、前后文各 ≤80 且保留靠近选区一侧）、每 kp 上限 100 的中文原因、anchor 解析与「讲义版本不一致即未定位」判定、讲义纯文本内的确定性定位匹配（精确匹配优先，失败后用去空白文本兜底，多候选由 prefix/suffix 消歧）。
- `highlight-dom.ts`（浏览器端）：在渲染后的讲义 DOM 内用 TreeWalker + `splitText` + `insertBefore` 包裹 `<mark>`（禁止 innerHTML 拼接），只画 anchor 匹配的条目，定位失败的返回 `missingIds` 由 UI 如实放入「未定位」。
- `highlights.ts`（server-only）：归属链从 userId 出发（教材 → 章节 → 知识点）；创建时 anchor 由服务端读取当前讲义 `generatedAt`（客户端无法伪造）；改色/改批注/删除均按 `{ id, userId }` 校验，跨账号 404。
- `note.ts` + `note-heuristic.ts` + `note-provider.ts` + `providers/dashscope-note.ts`：章级笔记编排（聚合该章全部讲义 + 讲解追问 + 划重点/批注 → 模型流式汇总 + 结构校验，或启发式确定性拼装并标注「未接入模型」）；讲义以「定义/要点/易错点/自测题」压缩片段进上下文（每份 ≤2000 字，超出截断并如实说明）；笔记结构校验要求「章首导读」「自测题汇总」与至少一个知识点小节；缺失小节如实略去，不编造「你曾问到…」。
- `study.ts` 学习页读取新增所选知识点的划重点与章级笔记；`client-api.ts` 抽出客户端 SSE 解析与失败读取（讲义/对话/笔记共用）。

### API 与页面
- `POST /api/hidoc/highlights`（201 返回视图）、`PATCH/DELETE /api/hidoc/highlights/[id]`、`POST /api/hidoc/textbooks/[id]/chapters/[order]/note`（SSE：progress → delta → result/error）；均为 thin adapter，业务在 `src/lib/hidoc/`。
- 学习页 `/learn/hi-doc/t/[id]/c/[n]`：讲义区选中文字浮出四色划线气泡（含批注输入 ≤1000 字），「划重点」面板区分已定位/未定位（未定位以朱色标注「讲义已更新，暂无法定位」，可删除，绝不伪造位置）；同页新增「学霸笔记」区块（生成/重新生成 + 覆盖确认 + SSE 流式预览 + markdown 渲染 + 前端 Blob 下载 `{教材名}-{章节名}-学霸笔记.md`，不落服务器文件存储）。视觉沿用 hi-doc.module.css 体系，四色划线为低饱和度纸面用色。

### 真实验证（2026-09-17，free 档验证账号 + 《卫生统计学练习册（M4 验证）》）
- 划线：选中文本 → 朱砂 + 批注保存成功；刷新与独立无扩展 Chrome 中均按 anchor 重新定位；改青玉即时生效；讲义真实重生成（qwen3.7-plus）后旧划重点进入「未定位」且讲义中零 mark；新讲义上再划琥珀/黛蓝两条，四色齐备；未定位删除即时生效。
- 学霸笔记：真实模型 533 个 SSE 事件、结构校验通过（章首导读 / 13 个知识点小节 / 自测题汇总），如实写明 11/13 个知识点未生成讲义；无 key 进程内启发式兜底标注「未接入模型」且不占额度；下载文件名与 Blob 内容（3621 字节、含自测题汇总）经点击探针核对。
- 安全与配额：未登录 401；跨账号创建 404、他人划线 PATCH/DELETE 404；quote 501/note 1001/非法颜色 400；每 kp 第 101 条 503（临时夹具验后无残留）；笔记 3/3 时 0.24s 503 且未发起模型调用。
- 测试 337/337（新增 `tests/hidoc-highlight.test.ts` 17 项）；lint 0 error；typecheck 干净；`npm run check`（build）通过（hidoc 新增 3 条路由：highlights、highlights/[id]、chapters/[order]/note）；390×844 无溢出；浏览器与 API 明细见 `design-qa.md`「Hi doc M5」节。

**下一优先级**：M6 课题工作坊（`HiDocWorkshop` / `HiDocWorkshopFile`：≤100 页短材料 + AI 检索材料答疑，并替代「我的资料」本地快练），任务范围以 `docs/HI_DOC_PLAN.md` §5.6 与 §7 M6 行为准，任务书见 `docs/HI_DOC_CODEX_BRIEF.md`。

## Hi doc 主线 M6（2026-09-17 完成）

**验收达成**：课题列表 + 新建 + ≤100 页短材料上传（文字层/页数校验，中文拒绝原因）+ 确定性检索材料答疑（SSE，命中片段带材料名与页码/行号）+ 「我的资料」替换接入（本地数据保留）（计划 §5.6 与 §7 M6 行）。

### 数据与配额
- Prisma `HiDocWorkshop`（userId Cascade、title ≤60、note 可空 ≤500、`@@index([userId, updatedAt])`）与 `HiDocWorkshopFile`（workshopId Cascade、fileName、storageKey @unique 复用 `hidoc/{userId}/workshops/…` 私有卷、sizeBytes、pageCount、hasTextLayer、status `uploaded|ready|failed`、ocrStatus 如实存 `not-attempted`、failureReason、`@@index([workshopId])`）；`HiDocConversation` 扩展可空 `workshopId` + `@@unique([userId, workshopId])`（kpId 路径与其唯一约束不变，M4 数据不受影响）；迁移 `20260917152647_m6_hidoc_workshop`。全部私有挂 userId，不进官方课程目录。
- **限额取值决策（本期定案）**：工作坊数量 / 每课题材料数 = free 1/3、basic 3/10、pro 10/20、max 30/30（`src/lib/hidoc/workshop-rules.ts` `HIDOC_WORKSHOP_LIMITS`）；单份材料 ≤100 页（PDF 按页数、文本按 40 行/页折算，即 ≤4000 行）；字节上限沿用教材单文件上限。工作坊材料不占教材当月名额。
- 新配额资源 `hidocWorkshopChats`（按轮模型调用计）：free 30 / basic 200 / pro·max 无限（`quotas.ts` 四档表，标签「Hi doc 课题工作坊答疑（模型）」）；模型调用无论成败计入 `usage.hidocWorkshopChats` 并写 `EventLog(hidoc_workshop_chat)`（带 provider、model、outcome、questionChars、answerChars、hitCount、relatedKnowledgePointCount）；**检索零命中不调模型、不占额度**（EventLog outcome `no-match` 如实记录）；材料上传不调模型、不占模型额度；无 key 明确报错（503，不记账不写事件）；额度不足 503 中文报错不静默放行。

### 服务端（src/lib/hidoc/）
- `workshop-rules.ts`（纯函数）：四档限额、文件名/格式识别（`.pdf`→pdf、`.md/.markdown/.txt`→text；图片与未知扩展 422 中文原因）、文本严格 UTF-8 解码（fatal、BOM、`\r\n` 归一、空文件/超 4000 行拒绝）、标题/说明校验、限额文案。
- `workshop-search.ts`（纯函数）：确定性关键词检索（CJK 整段 2–10 字 + 二字滑窗 + 拉丁词、停用词过滤；评分=命中词种数×100+次数封顶 5，同分按 segmentIndex 稳定排序）；命中门槛：提问含 ≥3 字连续中文段时需命中长词（≥3 字）或 ≥2 个不同词且覆盖 ≥4 字（相邻滑窗叠合只算一个窗口，防止「的基+基本」式噪声命中），短提问命中 1 词即可；PDF 每页一条 segment、文本每 40 行一条；locator 如实标「第 N 页」/「第 A–B 行」；另提供本人教材知识点标题的只读关联（同门槛，关联不到不编造）。
- `workshop-chat-prompt.ts`（纯函数）：系统提示约束回答只依据命中片段、引用写材料名+页码/行号、片段不足说「材料里没有相关内容」、不做临床诊断、中医/现代医学不等同。
- `workshops.ts`（server-only 主编排）：列表/详情/新建（限额 503）/删除（级联+尽力清理存储）；上传走归属 404 → 格式 422 → 大小 413 / 页数 422 → 材料数 503 → 落盘 → PDF probe（>100 页 `page-limit`、无文字层 `unsupported-scan`，上传即拒绝不落库）或文本 decode → 事务二次校验落库；答疑编排（`sendHiDocWorkshopMessage`）：校验 → 归属 404 → 无就绪材料 422 → 无 provider 503 明确报错（工作坊答疑**无启发式兜底**，与讲义/笔记策略不同）→ 配额检查 → 检索 → 零命中固定文案落库（提问先落库）→ 命中走 provider-neutral 流式、finally 记账 + EventLog、成功后回答落库（失败不存半截回答）。

### API 与页面
- `/api/hidoc/workshops`（GET/POST/DELETE）、`/api/hidoc/workshops/[id]`（GET）、`/api/hidoc/workshops/[id]/files`（POST multipart / DELETE）、`/api/hidoc/workshops/[id]/chat`（POST SSE：progress search|answer|save → delta → result{conversation,citations,notes}/error）；均 thin adapter。
- `/learn/hi-doc/w`（限额面板 + 新建 + 课题列表）与 `/learn/hi-doc/w/[id]`（上传面板 + 材料清单含失败原因 + SSE 追问 + 命中片段面板 + 发送中禁用）；视觉沿用 hi-doc.module.css（citation 面板纸面方框 + 蓝色来源标注，390px 无溢出）。
- 「我的资料」替换接入（§7 注释）：`/learn/my-materials` 顶部迁移横幅（已并入 Hi doc 课题工作坊 + 前往链接 + 本地快练保留、本地数据不丢失），原 `PrivateMaterialsStudio` 不动；学习首页导航「导入 → /learn/my-materials」改为「工作坊 → /learn/hi-doc/w」；Hi doc 书架 headerMeta 加「课题工作坊」入口。

### 真实验证（2026-09-17，free 档验证账号 + 真实短材料 + 真实 qwen3.7-plus）
- 上传矩阵：md/带文字层 PDF ready；扫描版 PDF 422、PNG 422、101 页 PDF 422（均中文原因、不落库）；第 4 份材料 503（3/3）；free 第 2 个课题 503（1/1）。
- 答疑：命中提问 38 个 SSE 事件，回答引用「材料《心衰讲义.pdf》第 1 页」，citationPanel 展示命中片段；零命中如实回答且不记账；额度 30/30 时 SSE error 0 delta；无 key（临时注释 `.env.local`/`.dev.vars` 密钥实测）SSE 首事件即 error，0 delta、不记账不写事件，测后恢复。
- 归属：未登录 401；不存在/越权课题 GET/chat/files/DELETE 均 404。
- 测试 357/357（新增 `tests/hidoc-workshop.test.ts` 20 项，含相邻滑窗叠合命中回归）；lint 0 error；typecheck 干净；`npm run check` 通过（新增 `/learn/hi-doc/w` 与 `/learn/hi-doc/w/[id]` 两条 ƒ 路由）；390×844 无溢出；浏览器与 API 明细见 `design-qa.md`「Hi doc M6」节。

**下一优先级**：M7 支付打通（mock→支付宝，四档订阅真实生效），任务范围以 `docs/HI_DOC_PLAN.md` §2/§7 M7 与现有 `src/lib/payment/` 抽象为准，任务书见 `docs/HI_DOC_CODEX_BRIEF.md`。

## Hi doc 主线 M7 — 支付打通（2026-09-19 完成）

**验收达成**：`PAYMENT_PROVIDER=alipay` 正式生效（支付宝开放平台沙箱），四档订阅真实生效（下单 → 收银台 → notify 验签开通 → 档位/额度即时变化 → 续费叠加/高档覆盖/到期回退闭环）；计费页按用户 2026-09-18 定案改版为三列档位卡 + 月/季/年分段控件。正式定价（同日用户拍板）：Basic ¥19/月·¥49/季·¥149/年；Pro ¥49/月·¥129/季·¥399/年；Max ¥149/月·¥399/季·¥1299/年，`src/lib/payment/plans.ts` 为唯一价格真相源。

### 通道与配置
- 通道解析（`service.ts` `getCurrentPaymentChannel`）：显式 `mock|wechat|alipay`；未配置默认 mock（开发/演示语义保留）；未知值明确报错。**通道为 alipay 但 `ALIPAY_APP_ID/ALIPAY_PRIVATE_KEY/ALIPAY_PUBLIC_KEY` 任一缺失时，下单返回 503 + 中文原因「支付通道未配置完整（含缺失变量名）」，绝不静默回落 mock**（`createOrder` 配置校验先行，不落任何订单；`/api/pay/create-order` 与 `/api/auth/upgrade` 均映射 503）。密钥只在服务端 env，不渲染、不进 bundle、不进日志。
- 网关：`ALIPAY_GATEWAY_URL` 读取，**默认沙箱** `https://openapi-sandbox.dl.alipaydev.com/gateway.do`；生产部署仅需改为 `https://openapi.alipay.com/gateway.do` 并换正式密钥，代码零改动。当前本地 `.env.local`/`.dev.vars`（已同步）指向**沙箱**。
- notify 地址：`ALIPAY_NOTIFY_URL` 支持显式覆盖，缺省由 `NEXT_PUBLIC_SITE_URL` 拼装 `{base}/api/pay/notify/alipay`；return_url 由站点地址拼装 `{base}/account/billing?orderId=…`（回跳仅作结果展示，开通只认验签后的 notify 或主动查单）。本地 `.env.local` 已加 `NEXT_PUBLIC_SITE_URL=http://localhost:3000`（dev-only，不入库）。
- **签名规则实证修正（重要）**：实测沙箱网关（2026-09-19，`alipay.trade.query` 返回 `isv.invalid-signature` 并附网关验签字符串）证明**当前网关的请求验签字符串包含 `sign_type`**、仅排除 `sign` 与空值；`buildSignString` 已按此修正（修正前 page.pay/queryOrder 签名实际无效）。notify 验签侧因本地收不到支付宝真实回调，实现为**双规范兼容**（排除 sign/sign_type 的经典 SDK 规范与仅排除 sign 的新规范都接受；两种私钥都只在支付宝手中，不降低防伪造强度），公网部署后按真实回调确认并固定。
- 顺带证实 `.env.local`/`.dev.vars` 的 `ALIPAY_PUBLIC_KEY` 为**支付宝公钥**（用其验证网关 `alipay.trade.query` 响应签名通过），即验签密钥配置正确；沙箱收银台（`excashier-sandbox.dl.alipaydev.com/standard/auth.htm?payOrderId=…`，标题「支付宝 - 网上支付 安全快速！」）真实受理了我们的 page.pay 下单。

### 下单与开通链路（`service.ts`）
- `createOrder`：配置校验 → 幂等复用 pending 订单（同用户同 plan 同 channel；旧 lite-* 与 basic-* 同语义）→ provider 构造跳转 URL（含 return_url）。
- `handleNotify`（alipay）：RSA2 验签（双规范）→ **app_id 必须存在且一致、out_trade_no/trade_no/total_amount 必须齐全** → 仅 `TRADE_SUCCESS/TRADE_FINISHED` 受理。
- `applyPaymentSuccess`：**金额核对先于幂等判断**（无论订单状态，金额不一致一律拒绝 `amount_mismatch`，防篡改纵深）→ 事务内条件更新抢占（`updateMany where status=pending`，并发/重复 notify 只有一次成功，其余幂等返回，不重复延期）→ 会员更新。
- **续费叠加与档位策略（本期定案并实现，纯函数 `computeMembershipRenewal` 可单测）**：
  1. 新档 ≥ 当前生效档：立即生效为新档，到期时间在剩余有效期上叠加（不吞掉未到期时间）；
  2. 新档 < 当前生效档（如 Pro 有效期内购买 Basic）：**档位保持高档不变直至其到期，购买时长追加在剩余有效期之后**（追加期间按高档享受；降档只通过到期自然回落生效）；
  3. 当前会员已过期：视为 free，从现在起算新档；旧 `lite` 存量归一化为 basic 叠加。
- 会员生效后四档额度即时变化（`computeUserQuotas` 读新档位：free hidocChats 50/hidocNotes 3/hidocWorkshopChats 30 → pro/max unlimited；教材当月名额 1/3/10、工作坊与官方课名额同步）；到期回退 free 后配额同步回落（`resolveEffectiveMembershipTier` 既有闭环，E2E 复验）。

### 对账与关单
- `reconcileOrder`（alipay 通道）：provider `queryOrder` 真实查单（`alipay.trade.query`），已支付则补偿开通；网关业务码 ≠10000（如 `ACQ.TRADE_NOT_EXIST`）如实透出 `queryError`，不吞错。**网关响应体未做签名校验**（需按支付宝原始 JSON 序列化逐字节还原，收益有限；调用走服务端 HTTPS 直连），已在代码注释声明。
- `closeExpiredOrders`：**本地关单，未调用支付宝 `alipay.trade.close`**（网关侧订单由其自身超时机制处理）；cron 路由改为**先 reconcile 后 close 串行执行**（修正原 `Promise.all` 并行竞态：防「已支付但 notify 丢失」的订单被误关）。
- `src/lib/prisma.ts`：`createLocalSqliteClient` 尊重显式 `file:` `DATABASE_URL`（与 CI `file:./prisma/test.db` 意图对齐，为测试隔离铺路；未配置时仍默认 `prisma/dev.db`，开发行为不变）。

### 计费页改版（`src/components/billing-panel.tsx` + 新增 `billing-panel.module.css`，替代全内联样式）
- 三列档位卡（Basic/Pro/Max，880px 以下退化为单列），卡片区头部右侧**月/季/年分段控件**（共享状态，价格/CTA/折合单价联动）；卡片层级：档位名 → 大号价格数字（40px 衬线）+ 灰色计费单位 → 通栏 CTA → 权益对勾清单；当前档位卡描边高亮 + 右上角「当前套餐」角标，CTA 变「续订当前档位」。
- 权益数字全部引用配额真源头（`hidoc/limits.ts`、`hidoc/workshop-rules.ts`、`course-entitlement-policy.ts`、`quotas.ts`），页面零硬编码。
- 支付面板：redirect 类型展示「前往支付宝支付」（新窗口）+ 轮询状态（pending 动点/paid 绿色/closed）；**每 3 次轮询触发一次 `/api/pay/reconcile` 主动查单补偿**（notify 丢失兜底），`/api/pay/status` 展示订单状态；return_url 回跳后按 `?orderId=` 自动进入同一轮询；mock 通道保留原自动模拟支付（开发语义）。订单记录表展示渠道（支付宝/微信/模拟）、金额、状态、时间，520px 以下隐藏渠道列防溢出。

### 真实验证（2026-09-19）
- 单测 378/378（新增 `tests/payment-service.test.ts` 22 项：notify 验签正/负/篡改/app_id 不一致/错误密钥/TRADE_FINISHED/双规范、幂等不重复延期、续费叠加、高档覆盖、到期回退、lite 兼容、无密钥 503 路径不落订单、reconcile 幂等、关单后 notify 拒绝、`computeMembershipRenewal` 纯函数 6 例），全部离线（临时 SQLite 库 `prisma db push` + 测试内生成 RSA 密钥对），不触网不碰 dev.db。
- E2E 三阶段（方法与边界如实记入 `design-qa.md`「Hi doc M7」节）：① 真实沙箱密钥下单 → 收银台真实受理（payOrderId）→ reconcile 真实查单返回 `ACQ.TRADE_NOT_EXIST` 并透出；② 无密钥实例下单 503 中文报错；③ 换测试公钥（支付宝私钥仅其持有，本地无法伪造平台签名，加密强度等价）模拟合法签名 notify 全链路：开通 → 配额即时变化（free 50/3/30 → pro unlimited）→ 幂等 → 金额篡改（新订单与已支付订单均拒）→ 错误密钥拒 → app_id 不一致拒 → 续费叠加 +30.00d → 高档覆盖（max 有效期内买 basic 保持 max、时长追加）→ 到期回退 free 配额回落。测试账号与订单已全部清理。
- 浏览器（系统 Chrome headless，1440×900 与 390×844）：三列卡/分段切换/支付面板 pending→paid 翻转/当前套餐角标/回跳轮询/订单表 7 张截图；程序化断言 1440 三列、390 单列、`scrollWidth===clientWidth===390` 无溢出、桌面与移动控制台 0 error。
- `npm run lint`（0 error）/ `typecheck` / `test` 378 / `npm run check`（build）全绿。

### 边界与后置（如实声明）
- **真实支付宝服务器 notify 回调未验证**（本地无公网地址；沙箱验签公钥已证实正确，等待部署公网后用真实回调补验并固定 notify 验签规范）；微信支付未打通（provider 原样保留）；发票/退款未做。
- 真实商户号、ICP 备案、生产密钥与生产网关配置是部署前置；生产切换仅改 env 不改代码。

**下一优先级**：Hi doc M0–M7 全部完成。后续主线：设计系统 v2 框架重构（见下节，桌面优先）与部署上线准备（ICP 备案 + 真实商户号 + 生产密钥 + 公网 notify 补验）。

## 设计系统 v2（2026-09-18 定案，M7 后生效）

用户拍板（方案 A）：整体框架重构（NUR Workspace 壳）采用 Claude 风格设计库的三层体系——token 层（7 组原色阶 + 语义层 + 暖炭灰暗色模式）、组件层（button/card/input/badge/chat-bubble/navigation 六件套）、组合层（website UIKit 为三栏壳排版基准）。**圆角采用库的 8/12/16/20/24px 完整体系，取代旧「方直边」规则**；字体本地化映射（Newsreader→宋体显示衬线、Lora→思源宋阅读面、Poppins→MiSans/苹方紧凑 UI，拉丁原字体作回退）；terracotta `#C96442` 为唯一主强调，现行黛蓝语义族保留。适配详情与铁律见 `docs/design-references/claude-v2/NUR-DESIGN-V2.md`（唯一真相源）；库资产已入 `docs/design-references/claude-v2/`（仅设计参考，不被业务代码 import，不进 public）。**M6–M7 期间现行 Design Rules 完全不变，不预改任何在跑页面**；框架重构排期仍后置于 Hi doc M0–M7 完成之后（桌面优先、移动后置、Agent 分体共享记忆的决定不变）。

## 设计系统 v2 R1 — 壳 + Token（2026-09-19 完成）

R1 只做「壳 + token 并存」，不动任何业务页面的视觉与逻辑；`docs/PROJECT_STATE.md` 本节为摘要，验收证据见 `design-qa.md`「Design System R1」节。

### A. Token 层（`src/app/globals.css`）
- 7 组原色阶 brand/text/bg/icon/border/success/error 各 50–900 按库原值落地 `:root` 与 `.dark`（含暖炭灰暗色整套）。
- 语义层/字体/圆角/阴影/间距以 **`--v2-*` 前缀**并存：库语义名（--primary/--card/--sidebar 等）与现有 shadcn token 同名冲突，且 R1 不得改动既有值（--paper/--ink/--background/--primary 等正被各 CSS module 消费），故 terracotta 主强调落在 `--v2-primary`，`--sidebar #F5F4EE` 落在 `--v2-sidebar`，页面底 `--bg-100 #FAF9F5` 落在 `--v2-background`；R2 逐面切换消费方时再绑定。字体栈按定案：`--v2-font-display`（宋体显示 + Newsreader 拉丁回退）/`--v2-font-serif`（思源宋阅读 + Lora 回退）/`--v2-font-sans`（MiSans/苹方 + Poppins 回退）/mono 不变；`--v2-radius-sm/md/xl/2xl` = 8/12/20/24px、`--v2-radius` = 16px；`--v2-spacing` 4px 节奏；`--v2-shadow-2xs…2xl`。**既有 token 零删除、零重命名、零改值。**

### B. 六件套（新建 `src/components/ui/v2/`）
- button/card/input/badge/chat-bubble/navigation 共 6 个 tsx + 6 个 module.css，从 `components.css` + `preview/*.html` 移植为 React + CSS Modules；只消费 `--v2-*` token、4px 间距节奏、hover/focus-visible（`--v2-ring`）/disabled 齐全；纯展示层、零业务逻辑、无 "use client"（可同时用于服务端/客户端树）、未引第三方 UI 依赖。既有 `src/components/ui/button.tsx`（shadcn）原样保留。
- `V2Button` 未保留参考预览里「≤560px 强制全宽」的示例容器样式（组合层职责，非组件契约）。

### C. NUR Workspace 壳
- 路由组 `src/app/(workspace)/`：`learn/`、`courses/`、`question-bank/`、`account/` 四目录整体 `git mv` 迁入，**URL 全部不变**；新增 `src/app/(workspace)/layout.tsx`。
- 壳组件 `src/components/workspace/`（workspace-shell + command-palette + shell-data，CSS Modules）：248px 左侧栏（品牌 + 主入口 Hi doc/官方课程/题库/会员 + 最近学习：书架最近教材（登录后拉取 `/api/hidoc/textbooks`，未登录不请求）+ 进行中课程（中医诊断学、生理学））、顶部细条（搜索占位 + ⌘K、用户/会员状态 chip 复用 `useSession`）、⌘K 命令面板（壳 + 输入 + ↑↓/Enter 跳转；数据 = 三入口/学习主页/试点课静态聚合 + 书架教材前 6 本，不做全局检索）、≤900px 侧栏收起为抽屉（汉堡 + scrim + Esc/路由点击收起）；内容区**不加内边距/背景/字体**，业务页面自身渲染不受壳影响。Agent 浮球（dock FAB）天然退化为浮球。
- **NurAgentDock 收敛为壳级单实例**：新增 `src/lib/agent-dock-props.ts`（props 外部 store + `useNurAgentDockProps` 上报 hook + `PLATFORM_DOCK_PROPS`）与 `src/components/nur-agent-dock-host.tsx`（根布局唯一挂载，`useSyncExternalStore` 读 store）；原 8 个挂载组件（learning-dashboard、course-workspace、knowledge-point-lesson、subjective-writing-room、case-reasoning-room、question-bank-practice、private-materials-studio、wrong-question-center）改为上报 props，dock 自身 createPortal 到 body 的机制与全部交互（对话/结构分析/改写应用/撤销）不变。挂在根布局而非 (workspace) 布局：`/wrong-questions` 在路由组外、历史上也有 dock，根布局单实例可同时覆盖。
- `/design-system`（`src/app/(workspace)/design-system/`）：仅登录可见（未登录 redirect 到 /login），不在导航露出；展示 7 组色板 + 语义 token + 六件套全变体 + 字体样张 + 明暗切换开关。

### R1 验证（2026-09-19）
- 单测 385/385（379 既有 + 新增 `tests/ui-v2-smoke.test.ts` 6 项六件套纯渲染冒烟，经 `tests/helpers/css-module-hooks.mjs` 加载钩子免打包器渲染）；`npm run lint` 0 error（新文件 0 警告；顺手修复 pre-existing 的 `use-draggable-fab` set-state-in-effect error——rAF 包裹，dock 定位行为不变）；typecheck 干净；`npm run check` exit 0。
- 浏览器（playwright-core + 系统 Chrome headless，1440×900 与 390×844，dev 与 `next start` 生产构建双环境）：/learn、/courses、/question-bank、/account/billing、/learn/hi-doc、/learn/hi-doc/w、/wrong-questions 全 200、0 控制台错误、390 无横向溢出；⌘K 开合正常、390 抽屉正常、/design-system 明暗两态正常、登录态壳用户/会员 chip 正常；Agent dock 逐旧挂载点探针：/learn、/courses/tcm-diagnostics、知识点、写作室、推理室、单题练习、错题本、我的资料均单实例 FAB + 正确 surface 标签（平台/知识点/写作室/推理室）+ 开合正常。
- 像素对比口径（如实声明）：壳是 R1 交付物本身，业务页被 248px 侧栏 + 顶栏包围后视口宽度收窄必然回流，「整页像素级不变」在物理上不成立；已按「业务页面自身 DOM/样式零改动、内容区无壳注入样式」执行并留档迁移前基线截图（r1-baseline-\*）与迁移后截图（r1-after-\*）对照。
- 已知事项（R2 处理）：① 库自带暗色缺陷——secondary 按钮/标签暗色下浅底浅字（token 原值照搬，需 R2 评审修正）；② dev 冷编译多路由并行首次访问偶发 manifest `JSON.parse` 500（仅 dev、重试即好，生产构建复验无此问题）；③ 生产 `next start` 因「生产强制 Postgres」护栏无法本地注册账号，登录态检查以 dev 服务为准。

**R1 后续**：R2 = Hi doc 面切换（卡片/按钮/对话气泡换 v2 组件 + 启用暗色，评审并修正 secondary 暗色对比）已完成（见下节）；R3 = 官方课 + 题库面切换；R4 = ⌘K 全局检索与移动端深化。

## 设计系统 v2 R2 — Hi doc 面换装 + 暗色模式启用（2026-09-19 完成）

R2 = R2-1 修复小包（commit `64925f5`）+ R2-2 Hi doc 主体换装与全局暗色基建；本节为摘要，验收证据见 `design-qa.md`「Design System R2」节。

### A. R2-1 修复小包
- `.dark` 段 `--v2-secondary` → `var(--bg-300)`、`--v2-secondary-foreground` → `var(--text-800)`：修复库自带暗色缺陷（R1 已知事项①）——secondary 按钮/标签暗色下浅底浅字；亮色值与组件 css 零改动，实测对比 ≈11.7:1。
- 壳 `.tierBadge` 暗色反转（brand-700 底 + brand-100 字）；⌘K 面板底部文案去内部备注泄漏。

### B. Hi doc 五路由 token 换装（核心机制：token 桥接，非重写 CSS）
- `hi-doc.module.css` `.page` 8 个局部 token 改引全局 v2 token（`--ink`→text-900、`--paper`→bg-200、`--paper-bright`→bg-100、`--muted`→text-500、`--line(-soft)`→color-mix(text-900 x%)、`--red`→error-600、`--blue`→**v2-ring**——聚焦/状态强调统一 terracotta，设计决策非等值替换），约 160 处引用点自动生效且 `.dark` 自动翻转；29 处散落硬编码按同口径收敛，`--hidoc-swatch-*` 四色划线族字面值保留（内容语义色）。
- 对话气泡升级 v2 两级模式（user=主色实底/assistant=纸卡+边框，NUR-DESIGN-V2 §3），保留原 DOM 不换 `V2ChatBubble`（markdown 嵌套 + 流式 caret + 滚动 ref 风险，宁少勿滥）。
- 六件套替换（仅纯展示层）：`V2Button(primary)` ×9（各面主操作按钮）、`V2Badge(muted)` ×4（教材/材料状态）；ghost/danger/icon 按钮、学习页 tab、划重点气泡按钮保留原 DOM 吃 token 重皮；`.page .v2Button` 字体断言防页面 button 重置盖掉组件字体。
- 范围边界：`src/lib/hidoc/`、`src/content/`、`src/lib/payment/` 零改动；385 项测试守护行为无回归。

### C. 全局暗色基建
- 根 layout `<head>` 内联防闪烁脚本（`localStorage["nur-theme"]==="dark"` 则预挂 `.dark`）+ `<html suppressHydrationWarning>`；壳顶栏 Sun/Moon 切换按钮（aria-label/aria-pressed，写 localStorage，默认 light）；`/design-system` 预览页局部切换移除、统一走壳全局切换。
- 现状口径：壳 + Hi doc 五面成套变暗；`/learn` 周计划仪表盘与 `/learn/my-materials` 内容面仍为 v1 浅色皮（R3 范围，暗色下为「暗壳 + 浅色内容」过渡态）。

### R2 验证（2026-09-19）
- `npm run lint` 0 error / typecheck 干净 / `npm run test` 385/385 / `npm run check` exit 0。
- 浏览器（`scripts/design-r2-check.mjs`，dev SQLite 造数 + 级联清理；暗色走真实防闪烁链路）：5 条 Hi doc 路由 + /learn + /design-system × 亮/暗 × 1440/390 共 28 组全 200、0 控制台错误、390 无横向溢出；明暗切换 + reload 保持实测通过。
- 暗色对比度审计（`scripts/design-r2-dark-audit.mjs`）：五确认面逐文本元素 WCAG 有效对比度 <2.5 为 0；过程修复 design-system emphasis 卡内说明字浅底浅字一处。
- 已知事项：dev 冷编译 manifest JSON.parse 500 游走（R1 已知②，脚本按签名自动重试，生产无此问题）。

**下一优先级**：R4 = ⌘K 全局检索与移动端深化；并行推进部署上线准备（ICP 备案 + 真实商户号 + 生产密钥/网关 + 公网 notify 补验）。

## 设计系统 v2 R3 — 官方课 + 题库 + 计费 + 私人过渡面换装，错题中心归壳（2026-09-20 完成）

R3 沿用 R2 已验证的 **token 桥接**机制（改局部 token 定义值、引用点不动），覆盖 17 个 CSS module；本节为摘要，验收证据见 `design-qa.md`「Design System R3」节。

### A. 范围与机制
- **A 组官方课面**：`course-catalog`、`course-landing`、`course-workspace`、`knowledge-point-lesson`、`subjective-writing-room`、`case-reasoning-room`。
- **B 组题库/考试面**：`question-bank-global`、`question-bank-home`、`question-bank-chapter`、`question-bank-practice`、`mock-exam-room`、`wrong-question-center`。
- **C 组计费/账户面**：`billing-panel`、`learning-memory-panel`。
- **D 组 /learn 与私人过渡态**：`learning-dashboard`、`private-materials-studio`、`private-practice-room`。
- 桥接口径与 R2 一致（`--ink`→text-900、`--paper`→bg-200、`--paper-bright`→bg-100、`--muted`→text-500、`--line`→color-mix(text-900 38%)、`--soft-line`/`--line-soft`/`--rule`→16%、`--red`→error-600、`--blue`→**v2-ring**）；R3 新增两处：`--cinnabar`（仅错题中心）→ `--brand-600`、`--jade`（仅计费）→ `--success-600`。散落中性黑 `rgb(16 16 15 / x%)` 一律改 `color-mix(text-900 x%)`；反色面上的 `rgb(255 255 255 / x%)` 改 `color-mix(paper-bright x%)`（`.dark` 下 `--ink` 翻浅、`--paper-bright` 翻深，仍可读）。
- 内容语义色保持字面值不动：证据分级关系标签仍由 `--red`/`--blue` 承接（语义未变，仅换皮）。
- `learning-memory-panel` 无局部 token 块，直接桥接其 20 处字面值（暖黑/纸底/朱砂系 → text-900/bg-100/brand-600，黛蓝系 → v2-ring，橄榄绿 → success-600）。
- 附带修复：`/learn/my-materials` 内嵌的 `material-intake-review` 用了全局旧 token `--paper-light`（`:root` 仅浅色值、`.dark` 未覆盖），暗色下上传 dropzone 浅底浅字 → 在该子树改引 `--bg-100`，两态等价。

### B. 六件套替换（仅纯展示层，宁少勿滥）
- `billing-panel`：档位卡 CTA → `V2Button`（当前档位 `secondary`、其余 `primary`）；「当前套餐」角标由 CSS `::before` 改为 `V2Badge(muted)`（新增 `.currentBadge` 只补绝对定位）。
- `mock-exam-room`：交卷/开始模考/继续模考/再来一次/确认交卷 → `V2Button(primary)`；CSS 中对应按钮的视觉声明删除，仅保留尺寸/间距/图标对齐（`.container .xxx` 提高权重）。
- `wrong-question-center`：题型徽章 → `V2Badge(outline)`；CSS 保留行内尺寸覆盖，窄屏 `display:none` 规则同步提到 `.container .wrongItemKind` 以保持同权。
- **刻意不换**：`course-catalog`/`course-landing` 课程卡片（Link 主导 + 分区页脚布局，与 `V2Card` 固定内边距/`overflow:hidden`/`min-height` 冲突，换后行为存疑 → 退回 token-only）；`question-bank-practice` 提交按钮（该 `.tsx` 有未提交的用户逻辑改动，无法干净提交 → 退回 token-only，仅在 CSS 保留原按钮样式）；写作间/推理间/讲义页全部保留原 DOM（自核勾选、证据选择、阶段草稿的键盘与焦点逻辑不动）；错题中心 tab/统计数字保留原 DOM（其 tab 是 `button` 角色切换 + 计数，非静态徽章）。

### C. 过渡期收尾
- **错题中心归壳**：`src/app/wrong-questions/`（page/error/loading）整体 `git mv` 入 `src/app/(workspace)/wrong-questions/`，URL 不变（本期唯一路由目录变更）。归壳后获得侧栏/顶栏/暗色；`robots.ts` 与各处 `/wrong-questions` 链接均为绝对路径，无需改动。
- ⌘K 面板数据源复查：`PRIMARY_ENTRIES`/`ACTIVE_COURSE_ENTRIES`/书架教材均为现行路由，无指向旧过渡面的死链；未新增检索功能（R4 范围）。

### R3 验证（2026-09-20）
- `npm run lint` 0 error（188 条既有 warning 未增）/ typecheck 干净 / `npm run test` 385/385 / `npm run check` exit 0。
- 浏览器（`scripts/design-r3-check.mjs`）：15 条路由 × 亮/暗 × 1440/390 共 60 组全 200、控制台 0 错误、390 无横向溢出；明暗切换 + reload 保持实测通过；`/wrong-questions` 归壳断言（页面内容 + 侧栏「主入口」导航 + 主题切换按钮）通过。
- 暗色对比度审计（`scripts/design-r3-dark-audit.mjs`）：15 面逐文本元素 WCAG 有效对比度 <2.5 为 0（修复 my-materials 内嵌 dropzone 一处后达成）。
- 已知事项：dev 冷编译 manifest JSON.parse 500 游走（R1 已知②，生产无此问题）；截图在整轮高负载下偶发字体加载超时，脚本已改为截图超时不计入判定（属脚手架留档，非页面缺陷）。
- **未纳入提交**：`question-bank-chapter.tsx/.css`、`question-bank-practice.tsx/.module.css` 中含工作区既有未提交逻辑改动（题型筛选/进度索引），R3 在其上做了叠加式 token 桥接但不单独提交，留待用户与其逻辑改动一并处理。

**下一优先级**：~~R4 = ⌘K 接章节/知识点真检索 + 移动端深化~~ → **R4 已完成（见下节），设计系统 v2 主线收官**；回到部署上线准备（ICP 备案 + 真实商户号 + 生产密钥/网关 + 公网 notify 补验）。

## 设计系统 v2 R4 — ⌘K 真检索 + 移动端深化，主线收官（2026-09-20 完成）

R4 = R4-1（`feat(design): R4 command palette content search`）+ R4-2（`feat(design): R4 mobile touch deepening + v2-smoke flake fix`）两个独立提交；本节为摘要，验收证据见 `design-qa.md`「Design System R4」节。

- **⌘K 从页面跳转器升级为站内内容检索**：新增 `src/lib/search-index.ts`（纯函数、无 React、无网络），四类条目——章节（闭环课走 `/courses/{slug}` 页内章节目录、题库课走 `/courses/{slug}/question-bank/{chapterSlug}`）、知识点（仅闭环课 `lesson !== null`，title+note 匹配）、Hi doc 书架教材章节（`/learn/hi-doc/t/{id}/c/{n}`，客户端内存、不上送不写盘）、页面入口（R1 静态条目全保留）。NFKC 归一化 includes 匹配，分组（官方课程/题库/书架教材/页面）每组 8 条截断 + 「还有 N 条」提示，空态「没有匹配的内容」。不搜题库题目正文（9k+ 题目全文检索属后端事），不搜学习者私人数据。
- **bundle 约束（关键教训）**：客户端顶层 `import publishedCourses` 会把整棵课程树打进 bundle（实测 layout chunk ≈9.5MB）。最终方案：服务端 `(workspace)/layout.tsx` 经 `selectCourseSearchSource` 字段裁剪（只带 slug/title/note 级字段，KP 预计算 chapterTitle，不带长 id）再传客户端，客户端 useMemo 构建索引。实测 /learn 客户端 JS **+1.0KB gzip**（预算 30KB）；HTML RSC 载荷 +17KB gzip（KP note 投影，如实记录）。
- **移动端深化（零业务逻辑，只动 CSS module 与壳组件）**：≤900px 触控目标 ≥44×44（抽屉条目/汉堡/搜索触发/主题切换/用户卡/登录链路 + ⌘K 条目 + V2 六件套导航件）；抽屉补 body 滚锁（打开 `overflow:hidden` 关闭还原）与焦点管理（开→首条目、关→汉堡）；⌘K 面板 ≤480px 全宽底部弹出（贴底、上沿圆角、70dvh 限高）；密度审计 390 主内容页无失衡故未改数值；Agent 浮球 390 落位复核不遮主 CTA，维持现状。
- 顺手项：`tests/ui-v2-smoke.test.ts` 并发 flake 修复（6 个动态 import 改串行 + `register()` 后空转 stub import 确保钩子 attach），连跑 3 次 6/6 pass。
- 验证：lint 0 error（188 warning 基线未增）/ typecheck 干净 / `npm run test` **395/395**（+10 检索单测）/ `npm run check` exit 0；浏览器 `scripts/design-r4-check.mjs`（支持 `--only` 分段）：⌘K「寒热」→ 知识点「问寒热」Enter 跳转正确、「八纲辨证」→ 章节工作台、空态、书架章节深链全过；390 触控/滚锁/焦点/底部弹出断言全过；15 路由 × 亮/暗 × 1440/390 矩阵 60 组全部 200、0 控制台错误、无横向溢出。截图 65 张存 `docs/design-references/r4-*.png`。

**下一主线：部署上线准备**——standalone Docker + Postgres 16 + Caddy compose、CI、支付抽象（mock→支付宝沙箱，notify 验签）均已在 M7 就绪，上线仅差：① ICP 备案；② 真实商户号（支付宝/微信）；③ 生产密钥与网关配置（DashScope/SMTP 等，key 只进服务端环境）；④ 公网部署后补验支付宝真实 notify 回调（M7 遗留项）。

## 设计系统 v3 — 桌面优先工作台（2026-09-24）

当前视觉系统。规则、改前/改后同伴卡片计数和 DOCX 页码约定见 `docs/DESIGN_V3.md`。验收记录见 `design-qa.md`「Design System v3」节。

- 壳：左栏 280px，主画布为剩余唯一主列。`/learn` 去掉三条入口卡；官方课程、Hi doc、题库只从左栏进入。
- 卡片：12px、透明边、一层轻阴影；标题宋体 ≥24px；正文 14px / 1.5。朱砂与石板蓝保留。动效只留加载与状态。
- ⌘K：所有宽度贴底全宽；`SEARCH_GROUP_LIMIT` 从 8 改为 6，溢出仍报告剩余条数。
- Hi doc：八步引导（下一步、进度、状态、「下一步」）。PDF 继续 pdf.js 文字层；DOCX 用 mammoth 进入同一路径；扫描件、图片、旧版 `.doc` 明确拒绝。DOCX 界面写「页码待确认」。Hi doc 生成物不挂官方课证据分级。
- `src/content/courses/` 与 `src/content/materials/` 未改。未提交、也未推送。

## ZCODE-M1 — Ariadne 品牌迁移 + 代码清理 + 前端基础重写（2026-09-30 完成，未提交）

按任务书 `docs/ZCODE-M1-ariadne-migration.md` 三阶段顺序执行；验收记录见 `design-qa.md`「ZCODE-M1」节，截图 `docs/design-references/zcode-m1-*.png`。`npm run check` exit 0、`npm run test` 402/402。

- **品牌定案落地**：产品名 **Ariadne**（中文知径保留），Hi doc 产品更名 **Clew**（中文 slogan：一步一线索，一线一知径）。`src/` 内 NUR LEARN / Hi doc 全部大小写变体 grep 清零；`nur-learn` localStorage 键前缀保留（数据连续性）；docs/ 历史文档与 `docs/HI_DOC_PLAN.md` 作为史迹不改名。
- **代码清理**：12 个已合并分支、3 个未使用文件（+1 个孤儿 CSS module）、118 项 Trae 提取脚本/元数据删除。偏差：`src/lib/qb-course-transform.ts` 实际被 15 个 Tier 1 题库课程文件引用，保留（任务书误记 0 引用）。
- **路由与存储**：`/learn/hi-doc/*→/learn/clew/*`（git mv + permanent 重定向）、`/api/clew/*`、`src/lib/clew/`、`src/types/clew.ts`；`.clew-storage/`（原 .hidoc-storage 数据已迁移）；package.json name=ariadne。
- **Prisma 零漂移迁移**：9 个模型 `HiDoc*→Clew*` 全部 `@@map` 保表名；`User.clewLessonStyle @map("hiDocLessonStyle")` 保列名；既有 migrations 未动；validate/generate 通过。走查实测抓到并修复了一次列名漂移（登录 500）。
- **Page Chat 固化**：`NurAgentChat` 增 `mode`/`contextChip` 契约（默认行为不变）；Clew 学习页追问面板显式「当前知识点：{title} · 第 {sourcePage} 页」chip（点击展开 KP 说明）。Clew 追问保留专属 per-KP SSE 后端（服务端已注入 KP 上下文），不接官方课 agent 路由。
- **SpineEditor（章节确认后萃取）**：编辑模式支持拖拽排序、相邻合并（PDF 扩页码/DOCX 拼标题）、底部确认栏（干净=确认并萃取/脏=保存修改并萃取+放弃）；服务端 `confirmClewTocStructure` + `POST /api/clew/textbooks/[id]/toc/confirm`；萃取未确认返回 409 `spine-not-confirmed`（服务端强制，模型调用前触发）；重新识别/手动修正作废确认。类型增量：`ClewTocRecognitionView.spineConfirmedAt?`、`ClewTextbookView.spineConfirmedAt?`、`ClewErrorCode+"spine-not-confirmed"`（均向后兼容）。
- **配额 chip 常驻**：工作台左栏底部「本月教材名额 {used}/{limit} 本」+「本月模型调用 {n} 次」（均为真实数据；任务书的 token 估算按「不造假数据」原则替换为真实模型调用合计）。
- **走查**：dev 环境 1440×900 / 390×844 实测全过（门禁状态流转、合并脏标签、chip 展开收起、390 无横向溢出）。走查用两个既有一次性验证账号（hidoc-m2-*/hidoc-m4-verify-*@example.com）设置了本地已知密码。
- **状态**：全部改动在工作树未提交（含Phase1-3 与本文档），等待用户审阅后提交/合并到 main 并标记 ZCODE-M1 完成。

**下一主线**：ZCODE-M2 可配置闭环（Loop Profile 类型契约 + Clew 集成，见任务书预告）；部署上线准备（ICP + 商户号 + 生产密钥）并行推进。

## ZCODE-M2 — Clew Harness + Loop Profile + 教材编译管线（2026-10-01 完成，未提交）

按任务书 `docs/ZCODE-M2-clew-harness.md` Phase 0–4 顺序执行；验收记录与浏览器走查见 `design-qa.md`「ZCODE-M2」节。`npm run check` exit 0（0 error）、`npm run test` **431/431**（新增 29）。

- **Phase 0 品牌统一**：用户可见「NUR Agent/NUR AGENT」清零（dock/pilot/clew-study 讲解标签/私人材料间按钮/配额标签/learn metadata/法务 AI 免责/设计预览 meta → Ariadne Agent 或 Clew 讲解）；`nur-agent` 内部代码标识、`NUR 结构`（域概念）、`NUR/Qwen 参考`（authority 标记）按任务书保留。
- **Phase 1 Harness 骨架**：`src/lib/clew/agent-loop.ts` 基于 Vercel AI SDK v7 `ToolLoopAgent`（`stopWhen: isStepCount(10)`），五个工具（萃取/讲义/答疑/笔记/suggestLoopProfile），每个模型消耗型工具 execute 内先过配额门槛（不足抛 `ClewQuotaExhaustedError` → 路由 503）；工具 handler 全部依赖注入（测试可 stub）。`providers/dashscope.ts`（server-only，OpenAI 兼容模式 qwen3.7-plus，baseURL 白名单 aliyuncs.com，多模型接口预留）；`prompts.ts`（Ariadne Clew 角色 + 只依据教材铁律）。
- **Phase 2 编译管线**：`compiler.ts` 纯编排（ports 注入）+ `compiler-server.ts` 真实绑定；`evidence.ts` 页级证据原子（【PDF 第 X 页】切页 + bigram 相似度 + sourcePage 强信号关联主证据）；`structure.ts` 两层知识结构 + 三视图派生（firstStudy/review/exam 从同一事实派生不重新生成）；`resilience.ts` 失败隔离 + 指数退避。既有单章萃取路由改走 Harness（SSE 契约不变）；新增全书编译 `POST /api/clew/textbooks/[id]/compile`（SSE progress→chapter→done，单章失败隔离标记 failed 继续）。萃取落库时规则引擎建议 LoopProfile（`loopProfileId + loopProfileAssignedBy=ai-suggested`）。
- **任务书偏差（5.2 讲义走 Agent Loop）**：讲义路由保留既有直连服务——M4 契约要求无 key 启发式兜底 + SSE/配额/持久化不变，强套 ToolLoopAgent 会多一次模型决策调用并破坏确定性兜底；`generateLesson` 工具已绑定同一服务供 Harness 编排调用。
- **Phase 3 Loop Profile**：`src/types/loop-profile.ts`（六环节/六 profile 契约，L1–L5 定案落地）+ `src/lib/loop-profile.ts`（suggestLoopProfile 规则引擎、canSwitchProfile 孤立进度保护、getLoopProfileDisplay）。学习页（`clew-loop-profile.tsx`）：KP 头部 profile 徽章（六选一下拉切换 → `PATCH /api/clew/kp/[id]/loop-profile` → 落库 user-selected）；按 profile 渲染环节导航（Lucide 细线图标，非 emoji）；左栏列表显示 profile 名。走查实测「概念理解」只显示 学/评/复，切换「技能应用」后即时变 学/练/评/诊/复。
- **Phase 4 会话管理**：Prisma 新增 `ClewStudySession`/`ClewCompileCache`（contentFingerprint）/`ClewEvidenceAtom`/`ClewKnowledgePointEvidence`（migration `20261001155909_zcode_m2_clew_harness`，SQLite dev 库已应用）。`session.ts`（创建或恢复/环节更新/完成/放弃/历史）+ `/api/clew/sessions`（POST 创建恢复、GET 历史）+ `/api/clew/sessions/[id]`（PATCH 环节、POST complete/abandon）。学习页挂载即建会话、点环节写 stageStates（走查实测点「诊」→ DB `diagnose:active`）、讲义完成 → learn completed（旁路记录失败不阻塞）。
- **测试**：`tests/loop-profile.test.ts`（14）+ `tests/clew-compiler.test.ts`（15：失败隔离/进度/证据/三视图/重试/配额门槛/步数上限）。规则引擎空题型不落 long-term-retention（every 空真修复）。
- **状态**：全部改动在工作树未提交，等待用户审阅（含 ZCODE-M1 未提交改动）。

**下一主线**：ZCODE-M3 统一状态层（UnifiedLearningEvent）+ 视觉 Mentrix 化 + Page Chat 固化；任务书 `docs/ZCODE-M3-unified-state.md` 已定稿（2026-10-02），部署上线准备并行推进。

## ZCODE-M3 — 统一状态层 + Mentrix 化学习页 + Page Chat 固化（2026-10-02 完成，未提交）

按任务书 `docs/ZCODE-M3-unified-state.md` Phase 0–4 顺序执行；验收记录与走查见 `design-qa.md`「ZCODE-M3」节。`npm run test` **453/453**（新增 22）、`npm run check` exit 0（0 error / 189 warning 未增）。

- **Phase 0 spine 解耦**：`parseClewSpineConfirmedAt` 独立读取（非法 strategy 不再连坐丢弃确认章）；`writeManualChapters` strategy 白名单回落 `"none"`（自愈）。合法数据路径零变化（回归测试）。
- **Phase 1 事件总线**：Prisma `UnifiedLearningEvent`（migration `20261001172813_zcode_m3_unified_events`）+ `types/unified-learning.ts`（只写本期子集：session-started/stage-entered/stage-completed/session-completed/attempt-confirmed）+ `lib/unified-events.ts`（builder 纯函数 + 手写幂等 append，整体 try/catch 旁路）。接线：session.ts（会话/环节/完成）与 learner-state-sync-server.ts（官方课 create 成功路径、批量 created、题库新建 + 注册表归属解析，解析不到 warn 跳过）。skipped 环节事件本期不写（eventType 子集不含、UI 未产出 skipped）。
- **Phase 2 学习动态**：`lib/unified-state.ts` feed + continueTarget（注册表/用户数据解析标签，已删除内容如实回落）→ `GET /api/learn/unified-feed` → `/learn` 服务端取数（force-dynamic）→ dashboard「学习动态」区块（三线来源标签/相对时间/整行可点/继续上次学习；未登录不渲染、登录空数据一行空态）。不新增 peerCard（v3 密度不变）。
- **Phase 3 编译接线**：`compile-scope.ts` 纯函数（pending|failed 过滤、指纹不同强制 all）+ compile 路由 GET/POST scope + `compileTextbookThroughHarness` 指纹接线（开始计算写回、变化先提示再全量、结束写 state）+ 教材页「编译全书」区（上次编译续存、文字流、汇总、失败章单独重试锚链接、防重入）。走查：E2E 教材 pending=1 章 25 字过少诚实失败（任务书预期正确行为），刷新后状态保留。
- **Phase 4 双模式**：`nur-learn:clew-study-mode`（focus 默认/workspace）+ `data-study-mode` 单 DOM 双布局（focus 追问下置两栏 / workspace 三栏；≤1200px 折叠一致、切换控件隐藏）。Page Chat 回归：chip/草稿/消息在双向切换与刷新后保留，console 0 错误，390×844 无溢出。
- **最终门槛**：sqlite3 三线各有 1 行且同内容重跑计数不变；截图 `docs/design-references/zcode-m3-*.png` 4 张。
- **验收补充（2026-10-02，Hermes 预验收）**：预验收通过（全量 **456/456**，含新增回归 `tests/clew-compile-cache.test.ts` 3 条）。发现并修复 `upsertCompileCache` update 分支忽略 `contentFingerprint` 的缺陷（修复前「内容变化 → 强制全量」为死功能；修复后活体复验指纹 = 教材文件 sha256）。`tests/helpers/css-cjs-stub.cjs` 补 `server-only` CJS 车道映射。M2 遗留的「环节按钮点击无实际动作」已取证（点击仅记录事件 + 微高亮），列入体验补丁讨论。
- **状态**：全部改动在工作树未提交（与 M1/M2 改动一起等待审阅）。

## Clew 体验补丁 — 竖向闭环脊柱 +「评」自测 + 讲解风格（2026-10-02 完成，未提交）

用户拍板 A 包（1+2+3 合并）后由 Hermes 直接实施并验收（不经 Zcode 任务书链）；完整记录见 `design-qa.md`「体验补丁」节。

- 横向环节条 → 竖向闭环脊柱（贴讲义侧时间轴，done/current/todo/未接入 四态）；节点 = 真实动作（学→滚讲义、评→自测、诊→「还需看」清单、迁移→课题工作坊）；练/复如实标「未接入」；「进入间隔复习」空头句删除；≤980px 折叠横向条。
- 「评」环节落地：讲义自测题解析（题干+参考答案）+ 会了/还需看 + 全部标记自动提交 → `wrong-question-added` 统一事件（幂等）+ `stage-completed(assess)`；新库 `src/lib/clew/self-check.ts` + 新 API `POST /api/clew/kp/[id]/self-check`。
- 「讲解追问」→「问 Clew」；讲解风格 4 档（zh-primary/exam-cram/socratic/en-primary）生成时选择并写账户默认；左栏 KP 徽标即时刷新；会话 stageStates 回读（刷新后完成态连续）。
- 验证：`npm run test` **466/466**（+10）、`npm run check` exit 0、活体走查（m2qa，1440/390）全通过：真实生成 exam-cram 讲义 → 2 条 `clew-selftest:*` 事件落库 → /learn 动态可见 → 重载恢复 → 迁移真跳转 → 390 无溢出、console 0。

## ZCODE-M4 — 三视图派生 + 章级知识图谱 + 多模型接入（2026-10-03 完成，未提交）

任务书 `docs/ZCODE-M4-views-graph-multimodel.md` 三阶段全部完成；走查与截图证据见 `design-qa.md`「ZCODE-M4」节。无 schema 变更、无 migration。

- **Phase 1 三视图派生**：`src/lib/clew/lesson-variants.ts`（纯函数、client-safe）对同一讲义确定性派生「初学（完整）/ 复习（仅自测题折叠参考答案，题干保留）/ 备考（删自测题整节 + 定义截首句）」——零模型调用、零网络请求、幂等；小节定位复用 `lesson-heuristic` 既有解析（`collectLessonSectionBodies`/`isSectionHeading` 仅加 export）。学习页 panelHead 三档分段控件（`nur-learn:clew-lesson-view` 持久、生成中禁用、note 行 aria-live）；`ClewHighlightLayer` 增 `bodyVariant` 并入 bodyVersion——被视图折叠的划线如实进「未定位」，切回初学恢复，划线数据不因视图增删。自测面板始终解析完整讲义。
- **Phase 2 章级知识图谱**：`src/lib/clew/knowledge-graph.ts`（纯函数、client-safe、零图形库）程序校验构建（先修同章 trim 全等匹配、未匹配如实计数、自环丢弃、去重、DFS 三色环检测 + 确定性破环）+ 确定性分层布局（最长路径、`x=80+layer*220/y=60+idx*96`）；`src/components/clew-graph.tsx` 纯 SVG 只读展示（实线箭头先修边/虚线术语边、当前 KP 描边加粗、有讲义实心、节点即 next/link → `?kp={id}`、aria-label 与可视隐藏关系清单、未匹配/成环诚实行、<2 KP 空态）。
- **Phase 3 多模型接入**：`providers/model-config.ts`（server-only）任务级 env 解析（toc/extraction/lesson/chat/note 五任务 × provider/model/baseURL/apiKey 四维度：任务级 > 全局 > 缺省；legacy `CLEW_EXTRACT_*`/`DASHSCOPE_*` 链全部保留；`deepseek|kimi|zhipu` 等未实现 provider 抛 `ClewProviderConfigError` 含已核实端点指引，绝不静默回落；baseURL 安全规则 dashscope=https+*.aliyuncs.com、openai-compatible=https（loopback 允许 http））。`providers/chat-transport.ts` 取代 `dashscope-stream.ts`（SSE 解析保留、`enable_thinking:false` 仅 dashscope 注入、新增非流式 `completeChatJson`）；五个 adapter 改收 `ResolvedClewModelConfig`（`id` 如实填实际 provider）；五个任务工厂改「resolve → 校验 → 动态 import」；六个服务调用点把配置错误映射为 503 明确失败；`compiler-server` Agent 模型走 `getClewModelForTask("lesson")`；facade 语义改基于任务解析，`describeClewModel` 格式仍为 `{provider}:{model}`。`.env.example` 补全说明。
- **验证**：`npm run test` **490/490**（+24：lesson-variants 8 / kp-graph 7 / model-config 9）；`npm run check` exit 0；`prisma migrate status` 与基线一致。openai-compatible 桩集成验证（`/tmp/clew-m4-stub-verify.ts`，进程内 env，未动 `.env.local`）：SSE 讲义生成逐字节正确、请求体无 `enable_thinking`、`deepseek` 明确报错、无 key 回 null（启发式兜底保持）——原始输出留档于 `design-qa.md`。默认路径活体回归：KP02 真实生成讲义（dashscope · qwen3.7-plus）+ 问 Clew 流式回答照常。浏览器走查（m2qa，f650452b）：三档切换逐档核对规则产物且 **0 网络请求**、刷新保持、划重点交错（已定位→未定位→恢复）、图谱渲染/点击跳转/stats 自洽、390×844 无横向溢出、console 0 错误；截图 `docs/design-references/zcode-m4-*.png` 5 张。
- **验证边界**：`completeChatJson`（toc/extract）未在本期做真实 DashScope 端到端重放（重萃取会覆盖既有 QA 数据），由单元测试 + openai-compatible 桩覆盖同一传输层。
- **状态**：全部改动在工作树未提交（与 M1/M2/M3 及体验补丁一起等待审阅）。**Hermes 预验收复核通过（2026-10-04）**：独立复跑门槛（test 490/490 / check exit 0 / migrate 与基线一致）+ 独立桩复验 + 独立浏览器复走（三视图零请求定论、图谱、390、console 0）全部通过，见 `design-qa.md`「预验收复核（Hermes，2026-10-04）」。

## 设计系统 v4「Quiet」批 1 — token 层 + Clew 学习页换装（2026-10-04 完成，未提交）

任务书 `docs/DESIGN_V4.md`（方向已由 Nur 拍板 + Hermes 评审通过 + P0 四项裁决闭环）第一批实施完成；走查与截图证据见 `design-qa.md`「DESIGN_V4 批 1」节。设计语言真相源为 `docs/DESIGN_V4.md` §三/§四。

- **Token 层（globals.css，全局生效即全站观感变化，无过渡态）**：亮色侧栏收为一档灰 `--v2-sidebar #f2f0e8`；暗色页面底调为更暖更暗暖炭 `--bg-100 #201e19`、侧栏 `#191813`；`--v3-cinnabar` 收敛为 `--v2-primary` 的别名（brand-500/暗 #d97757 为唯一交互强调，全仓 8 处 cinnabar 引用自动统一）；石板蓝降为信息色（链接/溯源定位，暗色换 #86b7dc 保对比）；新增选中态统一 token `--v3-selected-bg/fg`（亮 8% / 暗 12% 朱砂底 + brand-700 字）、楷体栈 `--v3-font-kai`（Kaiti SC，只给品牌「知径」）、文档正文单值 `--v4-doc-size/leading`（15px/1.85，只给学习文档面）；非颜色 token（spacing/阴影/动效/浮层/状态色）沿用 v2 不动（P1-8）。
- **壳侧栏合并（P1-6）**：`workspace-shell` 280px → 264px，品牌换朱砂印章 logo（知/径 两行楷体）+「知径 · 工作台」；新增 `data-sidebar-context-slot` 上下文槽，Clew 学习页把「本章知识点列表」经 `createPortal` 注入壳侧栏（主导航与配额 chip 之间），页面内 240px studyAside 撤销。回归清单（/learn、/courses、/question-bank、/account/billing、书架、教材详情、工作坊列表、wrong-questions、design-system × 1440/1200/980）走查通过。
- **Clew 学习页换装（§四）**：登录态页面撤销自带第二套 header；文档主列（max 700 居中）= 面包屑 → 文档标题（宋体 30px h1）→ 元信息（石板蓝溯源）→ 描述（15/1.85）→ 安静进度线 → 视图 tabs → 讲义正文（无卡片包裹）→ 自测/划重点/笔记/图谱（细分隔线文档节）；`clew.module.css` v2 桥细边框降为 text 12%/6% 两档、全部方角硬边与墨底按钮换为圆角 token + 朱砂主按钮、宋体收缩（h3 及以下/卡片标题/KP 标题改 sans）、卡片无阴影（仅浮层保留）、user 气泡改中性暖灰、AI 回答改无气泡纯文本（对齐 ChatGPT/Claude 公共语言）。
- **安静进度线（P0-1 裁决落地）**：`ClewPathGuide` 重写为 2px 细线（role=progressbar）+ 一行小字（「教材路径 6 / 8 · 当前：X」）+ 线尾轻量「下一步」文字链（min-height 44 保触控标准）——只替代八步教材管线呈现，竖向环节脊柱与 LoopProfileBadge 保留（功能不动、视觉降噪），文案用「教材路径」与 Loop Profile（3–6 环节）区分。
- **视图 tabs**：讲义三视图分段控件改为下划线文字 tab（初学/复习/备考，朱砂选中下划线）；派生契约零变化（同一份讲义确定性派生、零请求，测试锁定）。
- **复制/重新生成小图标行（§五唯一借鉴项）**：AI 回答下方 Copy/RefreshCw 26px 图标钮——「复制」= 纯前端写剪贴板该回答 markdown（1.6s Check 反馈）；「重新生成」= 对同一条提问重新请求一次（复用既有 chat 路径：计入一次 ClewChats 配额、提问与回答追加为新消息，不静默覆盖历史；流式期间禁用）。零服务端改动。
- **双模式（P0-4 裁决 B）**：默认模式改为工作台（三栏：文档主列 + 右栏 320px 常驻「问 Clew」），`nur-learn:clew-study-mode=focus` 老键沿用不删、已存 focus 偏好用户尊重其选择；focus 模式（追问下置单列）与 workspace 模式都过全套验收矩阵。
- **配套更新**：`/design-system` 预览页增「v4 Quiet token」节（新 token 色板/选中态药丸/楷体/15px 文档样张）并把眉题改为 V4 QUIET；`scripts/design-v3-check.mjs` 断言从 v3 契约更新为 v4（264px、progressbar+「教材路径」）；`tests/design-v3-flow.test.ts`、`tests/design-v3-density.test.ts` 同步更新断言（安静进度线 DOM、264px）；AGENTS.md Design Rules 段按 v4 修订并已跑 `bash scripts/sync-agent-rules.sh`。
- **验证**：`npm run test` **490/490**、`npm run check` exit 0（0 error，仅既有 warning）；暗色 WCAG 审计重跑通过——`design-r2-dark-audit.mjs`（书架/教材详情/学习页/工作坊/设计系统）与 `design-r3-dark-audit.mjs`（15 条路由）暗色低对比文本元素均 **0 个**；`design-v3-check.mjs`（生产构建 `next start` 上两次连跑）PASSED。浏览器走查（v4qa 用户 + 克隆 M4 QA 教材数据）：1440/1200/980/390 × 明/暗 × workspace/focus 全通过，console error 0、pageerror 0，390 无横向溢出；真实「重新生成」一次成功（模型调用、追加不覆盖）；截图 17 张入 `docs/design-references/v4-*.png`。走查数据（v4qa-textbook-1 及关联行）留 dev.db 供复查。
- **边界与不变量**：教学真相/评分/考试结构/provenance/会员名额/试点课免费规则不在范围；Tier 1–4 零改动、零服务端改动、零 migration；`nur-learn:` localStorage 键全部保留。
- **批 1 遗留到后续批次**：批 2 = 工作台壳其余面（/learn、官方课、题库、计费、营销首页 `/`）按 v4 token 归一 + ⌘K/抽屉回归；批 3 = 「依据范围」开关（`chat-prompt.ts` 向后兼容新增 + composer chip 排，讲解风格 chip 迁 composer 与讲义生成共用偏好）。dev 环境注：`next build` 与运行中的 dev server 共写 `.next` 会使 dev 崩溃/吐陈旧 chunk（走查前须重启 dev 并清 `.next`；偶发 "Invalid or unexpected token" pageerror 为 dev HMR 噪音，生产构建两次连跑无此错误）。

- **Hermes 预验收复核通过（2026-10-04）**：独立复跑 `npm run test` 490/490、`npm run check` exit 0、`prisma migrate status` 与基线一致；独立重跑暗色 WCAG 审计（r2 五面 + r3 十五路由）均 0 低对比；独立浏览器复走（m2qa，复核脚本不进仓库）——默认工作台 + 旧 focus 偏好尊重、壳侧栏 264 + KP rail portal（含 390 抽屉）、安静进度线（6/8 · 75% · 下一步链接）、视图 tabs 零请求、复制剪贴板、重新生成端到端（4 → 6 行追加不覆盖、reload 持久、EventLog 计次）、10 格明暗×双模式×断点矩阵与 9 路由 × 三档回归全过、console error 0；首轮 dev 热更竞态在干净重启后不可复现（环境现象）。详见 `design-qa.md`「预验收复核（Hermes，2026-10-04）」。

## 设计系统 v4「Quiet」批 2 — 其余面按 v4 语言归一（2026-10-04 完成，Hermes 预验收复核通过，未提交）

任务书 `docs/DESIGN_V4.md` §八第二批完成（工作台壳、/learn、官方课、题库、计费、营销首页 `/` 归一 + ⌘K/抽屉回归）；走查与截图证据见 `design-qa.md`「DESIGN_V4 批 2」节。信息结构不动、教学语义不动、证据分级标签原样保留，只动皮肤。

- **Token 层收口**：`--v3-card-shadow` 归零（阴影仅浮层），浮层（⌘K 面板/抽屉/弹层）单独用 `--v2-shadow-lg`；`::selection` 朱砂淡染。v2 基元六件套扁平化（去非浮层阴影/hover 位移）。
- **基础层宋体收缩（token 级）**：globals `@layer base` h1/h2/.font-heading 保留宋体、**h3–h6 改 sans**——修复「局部删 font-family 后 h3 被基础层打回宋体」的系统性问题；官方课 7 文件宋体越权约 90 处收缩。
- **红/蓝纪律**：hover 红 → 中性或朱砂；进度红 → 朱砂；「正确」状态 error 红 → success 橄榄绿；选中/激活态全量统一 `--v3-selected-*` token；主行动 CTA（官方课/题库/错题/计费/首页）墨底或红底 → 朱砂圆角；双镜成对色修正撞色（现代医学 → 石板蓝，中医 → 朱砂）；评分视角 tcm/modern/boundary 与诚实提示条保留警示语义。
- **硬边 → 圆角细线**：官方课/题库/错题/计费/模考面板、输入、tag、选项、列表全量 `1px solid var(--ink)` → 细边框 + 8/12px 圆角；错题中心弱项卡修复明暗写反（深底深字 → 浅卡）。
- **营销首页 `/`**：概念不动；裸色全 token 化并首次接入全局 .dark 双主题；朱砂印章「知径」logo；装饰动效删除（hero 3D 倾斜/crosshair/反色 hover/浮钮位移/420ms 面板形变/stagger/focus 位移），账户面板简化为透明度+缩放状态过渡；`contact-cta` 补缺失样式；reveal 反转层（clip-path 跟随指针）作为概念交互保留。
- **装饰动效清理**：noticeFade 自动播完动画、entryCard/builderEntry 箭头位移、badge hover 位移、浮钮 hover 位移等删除；动效白名单（流式光标/spinner/状态过渡）之外清零。
- **验证**：`npm run test` **490/490**、`npm run check` exit 0（lint 0 error）；暗色 WCAG 审计 r2（5 面）+ r3（15 路由）均 0 标红；`design-v3-check.mjs` 布局断言全过；14 路由 × 明暗 × 1440/1200/980/390 矩阵横向溢出 0、console 0 错误、关键断言实测通过；截图 14 张 `docs/design-references/v4b2-*.png`。dev 竞态注记：矩阵突发访问偶发随机路由的 `Invalid or unexpected token` pageerror（联合路由顺序复检 6 轮全净；生产认证矩阵本地不可行——`database-url.ts` 守卫构建期内联 NODE_ENV，系设计行为），判定为 dev chunk 服务竞态非产品缺陷。
- **边界**：零 Prisma/migration/服务端逻辑改动；改动面 = 19 个 css module + globals.css + learning-dashboard.tsx 内联样式 token 化 + page.tsx 印章 markup。**证据分级标签（data-relationship）零触碰。**
- **Hermes 预验收复核（2026-10-04）**：独立复跑 test 490/490、check exit 0；13 路由 × 明（1440/1200/980/390）+ 暗（1440 全路由、390 抽 3）共 68 载，横向溢出 0 / console 0 / pageerror 0；r2+r3 暗色审计重跑 0 标红（r3 首跑 design-system 段一次脚本竞态，重跑全过）；首页印章与明暗底、⌘K 底部面板、390 抽屉、知识点页「对照」stage 证据标签（data-relationship=3）实测通过——**批 2 预验收通过**。遗留 4 处小项（/learn 主按钮墨底、/question-bank addBtn 墨边、swr/cr `em` 墨边、avatar 同色冗余边）与范围外残面（/login、/register、my-materials、course-builder）清单见 `design-qa.md`「预验收复核（Hermes，2026-10-04）· DESIGN_V4 批 2」节。
