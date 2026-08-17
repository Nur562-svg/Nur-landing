# NUR LEARN — Canonical Project State

Last updated: 2026-08-17 (Asia/Shanghai) — 问诊「问寒热」闭环升级完成（rich lesson + 名词解释/简答 + 四阶段案例 + 题库/深环 assessment 挂接；course-validation 0 issues；`npm run check` 绿） — FSRS 真实路径可触发高危（确认 attempt 按 present/missing 评分；见里程碑 25） — M2 attempt 稳定身份修复完成 — Agent 改写提案一键应用完成 — M2 同步冲突可见性 + 用户裁决完成 — 错题中心三层能力中心完成 — M2 学习状态云同步 Phase 1-5 完成；next priority: M4 发布前打磨 / 残余 M2 边界（QB attempt 仍非幂等）

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

- 舌诊「望舌苔」：舌质舌苔合参，重点鉴别腐苔与腻苔；
- 问诊「问寒热」：恶寒发热、但寒不热、但热不寒、寒热往来；（**2026-08-17 已升级为完整闭环**，见下）
- 脉诊「常见病脉」：按位、数、形、势组织浮沉迟数与洪脉；
- 八纲辨证「表里辨证」：表证、里证及表里转化；
- 脏腑辨证「脾胃病辨证」：脾气虚与脾阳虚鉴别，并加入纯合成四阶段病案。

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

**Compatibility:** old users are not wiped; duplicates fold on next merge/upload; unique confirmations retained. No course-truth / FSRS algorithm / membership / Agent apply changes. QB attempt upload remains append-only (out of scope).

**Verification:** `tests/learner-attempt-sync-identity.test.ts` + existing `tests/sync-conflicts.test.ts`; full suite 202/202; `tsc` clean. Run `npm run check` after this note.

**Files:** `src/lib/learner-attempt-identity.ts` (new), `src/lib/learner-state-sync-server.ts`, `src/lib/learner-state-sync.ts`, `tests/learner-attempt-sync-identity.test.ts`.

25. FSRS high-risk layer reachable on real confirm path — completed 2026-08-17:

**Problem (milestone 21 known limitation):** FSRS was only rated when an *accepted* review task fully completed. Completion requires every task criterion to be `present`, so the rating was always `good`. The `again` branch was unreachable for single-criterion (and multi-criterion) real UI; `relearning` / `lapses >= 2` almost never appeared, so「即将遗忘」stayed empty outside unit tests with synthetic fsrsState.

**Fix (no FSRS algorithm rewrite):** In `applyConfirmedAttempt`, every confirmed attempt rates each self-check criterion via existing `fsrsNextState`: `present → good`, `missing → again`. Review-task completion still updates task status only and no longer double-rates FSRS. High-risk selector thresholds unchanged (`relearning || lapses >= 2`).

**Real path:** miss the same memory criterion on two confirms → `learning/lapses=1` then `relearning/lapses=2` → appears in wrong-question center. Recovery `present` moves state to `review` but keeps lapses (still high-risk until lapses no longer meet threshold — current gate keeps lapses>=2 items).

**UI:** empty state distinguishes `hasFsrsMemory` false（尚未产生足够记忆数据）vs true（暂无高危准则）.

**Still limited:** never confirming → empty; high-risk still needs two misses (or relearning) — not first-miss spam. `acceptReviewTask` still only stamps `lastReviewAt` for scheduling, not a rating. QB/objective path unrelated.

**Files:** `src/lib/learning-memory.ts`, `src/lib/wrong-questions.ts`, `src/components/wrong-question-center.tsx`, `tests/learning-memory-fsrs-path.test.ts`, `tests/wrong-questions.test.ts`.

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
- 重点：发布前打磨
  - SEO：title, meta, opengraph for learn pages and course
  - robots.txt + sitemap
  - 全局错误边界 (ErrorBoundary) + loading.tsx 完善
  - 数据导出增强（当前已有 material admission export，扩展 learner state / attempts）
  - 移动端细节：更多响应、触摸优化、无 overflow
  - 其他：性能、a11y、console 清理
- 复用现有 contracts，不新加大模型或支付。
- 启动后先做一轮 npm run check + 浏览器 QA。
- 参考设计-qa.md 更新。

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
   - SEO 元数据、robots/sitemap 完善
   - ErrorBoundary + loading.tsx
   - export-learner-data 增强（attempts/FSRS/QB/mocks/admission）
   - 移动端 44px touch + a11y
   - 性能、console guard
   - 浏览器 QA + 更新 design-qa.md
3. M5 部署（待用户采购域名后决策）。
4. 内容 pending（教师 9 页 rubric、部分 unverified 答案、错题中心 FSRS/主观增强）。
5. 转接工作：三个计划文件保持最新（本更新已完成）。

**优先级**：M2 可靠登录合并核心已落地。M4 打磨启动。M5 待定。
