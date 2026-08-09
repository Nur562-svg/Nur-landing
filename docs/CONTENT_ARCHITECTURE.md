# NUR LEARN — Data-Driven Course Architecture

Status: course engine, reusable knowledge-point/writing/case slice, source provenance, personal exam configuration, browser-local learning memory, 48-hour weak-point return, bounded provider-neutral local Agent runtime, evidence-gated Course Builder, browser-local private-material intake, section-first DOCX review, a reversible current-session private overlay, its one-time bounded model-transfer paths, base-pack-independent private analysis, strict versioned material admission with JSON export, the first official 《中医诊断学》 material pack, a 33-item NUR-adapted TCM assessment bank (2026-08-06), a mock exam that honestly composes a 53/100-point half-paper, a wrong-question center (`/wrong-questions`) with weak-knowledge-point aggregation and weekly-plan reflow (2026-08-06), and a complete 100-point mock exam (2026-08-06): B1/B2 semantics confirmed by the user as shared-choice matching groups / shared-stem item groups, implemented as `AssessmentItemGroupDefinition` with dedicated validation, composition, and rendering; the TCM bank is now 60 items (A1 30 / B1 10 / B2 5 / fill 5 / term 5 / short-answer 10 / case 2) and the mock paper reproduces the full 30+10+5+5+15+15+20 blueprint with zero shortfalls. Real DashScope workspace `qwen3.7-plus` known-pack, synthetic private-overlay, and 20-question private-analysis passes completed on 2026-07-19; the admission and private-analysis browser passes used only synthetic DOCX files. The official pack retains its 9-included/2-excluded manifest, complete 39-point evidence matrix, 10/15/14 depth tiers, protected authored loops, and deterministic zero-blocking batch drafts without adding routes or a second content model.

## Goal

Keep the approved course workspace equally clear, detailed, and complete when NUR LEARN grows from one pilot course to many courses and versions.

The solution is a reusable course engine: React renders typed course definitions; it does not own or duplicate academic content.

## Canonical Hierarchy

```text
Course
├── identity and curriculum mode
├── editions / school-teacher variants
├── offering dimensions and active exam blueprint
├── chapters
│   └── knowledge points
│       ├── TCM lens
│       ├── modern-medicine lens
│       ├── relationship labels
│       ├── source references
│       ├── learning tasks
│       ├── assessment items and scoring points
│       └── related cases
├── learner state (kept separate from content truth)
└── personal exam configuration (kept separate from both)
```

## Curriculum Modes

Every course must declare one mode:

- `tcm-primary` — TCM theory is the assessed core; modern medicine supports understanding or differentiation where appropriate.
- `western-primary` — modern medicine is the assessed core; TCM connections appear only when academically useful and sourced.
- `integrated` — both perspectives are part of the main learning structure.

This prevents forced, low-quality TCM/Western symmetry across courses such as 《中医诊断学》 and 《生物化学》.

## Implemented Type Boundaries

The exact names may be refined during implementation, but these responsibilities must remain distinct.

```ts
type CurriculumMode = "tcm-primary" | "western-primary" | "integrated";
type MaterialStatus = "pending" | "available" | "verified";
type LensRelationship = "related" | "learning-aid" | "not-equivalent";
type CoreQuestionKind =
  | "a1-single"
  | "b1"
  | "b2"
  | "fill"
  | "term"
  | "short-answer"
  | "case";
type QuestionKind = CoreQuestionKind | `custom-${string}`;
type AssessmentPromptWording = "source-verbatim" | "nur-adapted";
type AssessmentAnswerAuthority =
  | "instructor"
  | "publisher"
  | "school"
  | "nur-platform"
  | "student-compiled";
type AssessmentAnswerConfidence =
  | "missing"
  | "unverified"
  | "source-cross-checked"
  | "verified";

type CourseDefinition = {
  id: string;
  slug: string;
  title: string;
  curriculumMode: CurriculumMode;
  version: CourseVersion;
  examBlueprint: ExamBlueprint;
  chapters: ChapterDefinition[];
};
```

Additional types should cover:

- `CourseVersion`: textbook edition, school, program, learner year, teacher, academic year, semester, and verification state;
- `ChapterDefinition`: stable ID, order, title, stage membership, goals, and knowledge-point references;
- `KnowledgePointDefinition`: stable ID, title, evidence framework, lenses, relationships, sources, learning tasks, assessment links, and case links;
- `LensContent`: perspective, content status, explanation, clinical observations, and relationship notes;
- `SourceReference`: course-material, course-evidence, or knowledge-reference role; publisher/school/teacher/student/NUR/clinical authority; current/historical/general scope; source type; status; citation label; optional traceable URL; edition/page/slide/year; and verification metadata;
- `ExamBlueprint`: an offering scope, source references, declared total, question rows, workspace summary groups, an optional priority-training notice, and optional declared integrity rules;
- `UserExamStructure`: a versioned browser-local learner configuration containing arbitrary labels, counts, and per-question points; it is never part of `CourseDefinition`;
- `KnowledgeLessonDefinition`: ordered lesson sections, evidence prompts, lens-specific reasoning, platform practice scoring, case transfer, and source references;
- `AssessmentItemDefinition`: ordered prompt text and question kind; `source-verbatim` or `nur-adapted` wording; prompt authority and source locator; an independently modeled answer authority/confidence/notice; optional answer content and source references; and optional scoring authority, framework, criteria, and total;
- `CaseDefinition`: a top-level related case with prompt provenance, ordered evidence cards, exactly one ordered step for each evidence/mechanism/syndrome/differential stage, a separately authoritative answer notice, NUR-or-teacher scoring authority, and source references;
- `LearnerCourseState`: progress and review state, separate from `CourseDefinition`.
- `OfficialCourseMaterialPack`: existing material asset/family/artifact IDs, one evidence row per stable knowledge-point ID, depth policy, protected authored-loop IDs, and explicit non-grants;
- `OfficialPackBatchCompileRequest` / `OfficialPackBatchCompileResult`: a deterministic pack-to-`CourseDefinition` draft boundary that does not grant model use or publication and does not require route-specific React;
- `AssessmentItemGroupDefinition`: a B1/B2 group contract on `CourseDefinition.assessmentGroups` — B1 carries shared choices reused by members (repeatable selection), B2 carries a shared stem/patient case with independent single-choice members; members reuse `AssessmentItemDefinition` and carry `groupId`/`groupPrompt`/`sharedChoices` onto `MockExamPaperItem` for rendering.

## Source Provenance Rules

Source types should include:

- `textbook`;
- `teacher-slide`;
- `review-scope`;
- `past-exam`;
- `question-bank` and `study-note`, with student-authored answer confidence kept distinct from school authority;
- `grading-rubric` for a real instructor or published scoring source, including an honest pending state when none exists;
- `editorial` for clearly identified NUR-authored learning explanations;
- `clinical-reference` for traceable public modern-medicine reference material used by a knowledge point.

Unknown sources are valid states, not errors. They must render as `待确认` or `待导入`. A source may only become `verified` when the corresponding material exists and the reference is traceable.

Never infer:

- teacher emphasis from generic textbooks;
- chapter frequency from the whole-exam blueprint;
- exact textbook pages without the edition;
- modern-medicine equivalence from superficial symptom similarity.

## Completeness and Validation Gates

Before a course definition is considered publishable, validate at least:

- course, chapter, and knowledge-point IDs are unique;
- chapter and knowledge-point order values are stable and non-duplicated;
- slugs are unique and URL-safe;
- progress values remain between 0 and 100;
- learned units never exceed total units;
- all referenced knowledge points, assessment items, cases, and sources exist;
- every dual-lens relationship uses an allowed relationship label;
- missing content has an explicit status rather than empty ambiguous text;
- exam blueprint rows calculate correctly and sum to that course's declared total;
- exam summary groups cover every declared row kind exactly once;
- optional priority-notice kinds and optional integrity rules reference declared rows;
- the user-provided 《中医诊断学》 definition declares and preserves 30 + 10 + 5 + 5 + 15 + 15 + 20 = 100, without making that distribution or total universal;
- authored lessons validate required sections, unique evidence prompts, source references, scoring-criterion totals, and a reference to a valid related case;
- assessment items validate stable order, owning knowledge-point references, prompt provenance, answer authority/confidence, answer and scoring source references, unique rubric criteria, and exact scoring arithmetic;
- cases validate unique IDs/order, knowledge-point links, source-backed prompt provenance, evidence roles and ordering, all four required reasoning stages, non-empty stage frameworks/source references, scoring arithmetic, and reciprocal knowledge-point references;
- source-verbatim school prompts cannot silently use NUR prompt authority, and answer-missing candidates cannot expose invented answer content or scoring;
- demo learner state is identifiable as demo data.
- personal exam rows have unique nonempty IDs, nonempty labels, positive integer counts, positive finite per-question points, and a bounded row count before being accepted from browser storage.
- B1/B2 group validation: group and member IDs unique and non-colliding with top-level items; B1 groups declare at least two distinct shared choices and members reference a valid shared-choice index; B2 groups declare a non-empty shared stem and members declare their own choices; members reference existing knowledge points and pass the standard assessment-item checks; at most four members per group.

Runtime validation can be a small local TypeScript utility; do not add a schema dependency unless it materially improves the implementation.

## Proposed File Structure

```text
src/
  content/
    courses/
      tcm-diagnostics.ts       Pilot course definition
      tcm-diagnostics-deep-loops.ts
                               Five evidence-anchored TCM loops
      index.ts                 Course registry
    materials/
      material-catalog.ts      Shared asset/family/artifact identity
      tcm-diagnostics-official-pack-v1.ts
                               Official manifest and 39-point evidence matrix
  types/
    learning.ts                Content and learner-state contracts
    nur-agent.ts               Strict provider-neutral Agent API contracts
    course-builder.ts          Builder, official-pack, batch-draft, coverage, and issue contracts
    material-intake.ts         Intake draft, batch, file candidate, provenance, and review contracts
    material-parsing.ts        DOCX parse draft, semantic block, issue, and delta-preview contracts
    material-admission.ts      Admission record, store, export, and explicit rights contracts
  lib/
    course-validation.ts       Completeness and integrity checks
    course-selectors.ts        Stage, chapter, progress, and route selectors
    user-exam-structure.ts     Personal exam parsing, validation, and totals
    learning-memory.ts         Confirmed attempts and review transitions
    nur-agent/                 Server-only request/context/runtime/provider boundary
      runtime.ts              Bounded deterministic loop and stop policy
    course-builder/            Pack resolution, provider, plan parser, compiler, and validation
      official-pack.ts         Official-pack validator and deterministic batch compiler
    material-intake.ts         Intake bounds, structural parsing, duplicate, review, and local-store gates
    docx-local-parser.ts       Memory-only DOCX semantic extraction and delta-preview compiler
    material-admission.ts      Strict admission validation, storage, recovery, and export gates
  components/
    course-workspace.tsx       Reusable view consuming a course definition
    knowledge-point-lesson.tsx Reusable authored lesson view
    subjective-writing-room.tsx Reusable subjective-writing interaction
    case-reasoning-room.tsx    Reusable case-reasoning interaction
    learning-memory-panel.tsx  Shared A/B history and 48-hour return UI
    nur-agent-pilot.tsx        Bounded on-demand Agent UI
    course-builder-workbench.tsx Known-pack build, review, export, and local approval UI
    material-intake-review.tsx Private-file identity and authority-review UI
    docx-parsing-review.tsx    DOCX reauthorization, block review, and zero-write delta UI
    material-admission-review.tsx Admission candidate, approval, recovery, and audit-export UI
  app/api/nur-agent/
    route.ts                    Stateless local Agent Route Handler
  app/api/course-builder/
    route.ts                    Stateless builder status and compile Route Handler
  app/learn/course-builder/
    page.tsx                    Evidence-gated Course Builder workbench
  app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/
    page.tsx                    Reusable knowledge-point route
    subjective-writing/page.tsx Reusable writing-room route
    case-reasoning/page.tsx    Reusable case-reasoning route
```

Do not create one workspace component per course. The route should select a course definition and pass it into the reusable view.

## Implementation Order

1. Define the minimal reusable types needed by the existing course workspace.
2. Move the current 《中医诊断学》 chapter/demo content out of `course-workspace.tsx` into `src/content/courses/tcm-diagnostics.ts`.
3. Encode the exact user-provided exam blueprint in the course definition.
4. Add explicit source/material states and course version fields with honest pending values.
5. Add a small course registry and selectors for stage/all/weak chapter views.
6. Add integrity validation for IDs, ordering, progress, references, and exam totals.
7. Refactor `CourseWorkspace` to consume the course definition and separate demo learner state from course truth.
8. Preserve all current interactions and visual output.
9. Run `npm run check` and browser-test the existing route.
10. Update `docs/PROJECT_STATE.md`, `design-qa.md`, and relevant screenshots if visible output changes.

## Acceptance Criteria

The milestone is complete only when:

- `course-workspace.tsx` no longer contains the academic chapter array;
- the same `/courses/tcm-diagnostics` route renders from a typed course definition;
- the default view remains `本阶段 → 问诊 → 理解 → 问饮食口味`;
- filters, chapter switching, route switching, unit selection, session drawer, account menu, and homepage navigation still work;
- unit and route selections expose clear semantic/visual state; completion checks remain separate from the current-selection row, available tasks may navigate directly, and missing authored destinations remain explicitly `尚未建设 / 尚未开放`;
- the optional session-planning drawer and direct task start remain separate actions, and writing/case shortcuts reuse registered routes rather than introducing placeholder pages;
- the visible design has no intentional redesign or regression;
- pending materials remain explicit and no source facts are fabricated;
- the pilot's 100-point exam blueprint is validated through the same per-course total and optional integrity rules available to differently structured future courses;
- a personal exam structure can model another school/instructor distribution and total without modifying the pilot blueprint or historical sources;
- a second course can later be registered without duplicating the workspace component;
- lint, strict typecheck, production build, and browser verification pass.

## Original Course-Engine Non-Goals

- No backend or database.
- No CMS or teacher upload interface.
- No authentication, server persistence, or synchronization. The personal exam override is intentionally browser-local only.
- No new question-bank, case-lab, review, or mock-exam route.
- The initial engine refactor did not include a knowledge-point or subjective-writing route; those later vertical-slice milestones are now complete.
- No deployment.
- No redesign of the approved homepage or course workspace.

## First Product Step After This Milestone

The first dual-view knowledge-point page for `问诊 · 问饮食口味` has now been built using the same model. It connects the course overview to evidence collection, dual-lens reasoning, a 10-point NUR platform answer rubric, and case transfer.

The TCM slice is now calibrated against the official third-edition textbook pages 60–61 and an instructor-provided review sheet. Modern-medicine sources remain separately traceable. The instructor's original nine-page final review and real subjective-answer rubric remain pending and are represented as missing source records rather than inferred content.

## Subjective-Writing Extension

Completed on 2026-07-18, the first writing-room extension keeps four boundaries separate:

1. A source-verbatim school prompt proves question provenance only.
2. Its answer has its own authority and confidence; an absent key remains `missing`.
3. A NUR-adapted prompt is platform-authored even when it is based on a sourced knowledge point.
4. A NUR scoring framework is platform training, not the offering's per-question allocation or an instructor rubric.

The first four assessment candidates are intentionally narrow: two exact fill-in prompts from the school white book with missing answers, one NUR-adapted term explanation with a 6-point platform rubric, and one NUR-adapted short answer with a 10-point TCM/modern-medicine/boundary rubric. The writing route selects only the authored term and short-answer items that contain a valid scoring definition; the unscored school prompts remain visible source candidates rather than fake standard-answer exercises.

This is not a complete question bank. The same `问饮食口味` slice now also has a dedicated case-reasoning lab; broader normalization, attempt persistence, review, and mock-exam work remain out of scope.

## Case-Reasoning Extension

Completed on 2026-07-18, the first case room moves the transfer exercise out of a passive answer reveal without treating a platform exercise as an instructor assessment:

1. `CaseDefinition` lives at the top level of the course definition and a lesson stores only its `transferCaseId`.
2. A learner selects evidence and drafts each chain stage before seeing the NUR source-cross-checked structure reference.
3. NUR scoring separates shared evidence, TCM reasoning, modern-medicine evaluation, and relation/differential boundary; it is self-check only, not automatic marking or teacher grading.
4. The UI points to the earliest self-identified unchecked criterion for a focused repair, rather than generating a clinical diagnosis or a fake teacher answer.

The first case is visibly NUR-adapted from the `问饮食口味` source set. It does not claim to be a school question, real patient record, current offering score, or teacher rubric.

## Browser-Local Learning-Memory Extension — Implemented

The implementation adds learner-owned state without promoting it into course truth:

- a versioned `LearnerAttemptRecord` containing course, offering, knowledge-point, task, question/stage, confirmed learner text, confirmed time, scoring-standard version, and the learner-confirmed structural criterion result;
- global browser-local `LearningAssistancePreferences` for independent A/B enablement plus A's next-step-prompt preference;
- a knowledge-point-scoped repeated-omission aggregate derived only from confirmed attempts, with a three-attempt threshold;
- a combined `ReviewPlanTask` with proposed/accepted/completed state, criterion IDs, a 48-hour due time, and completion through a later confirmed rewrite/self-check;
- a one-time standard-update notice record so verified teacher-standard changes can trigger re-evaluation without repeatedly interrupting the learner.

Drafts remain component presentation state. Only explicit post-self-check confirmation creates an attempt record. Browser storage parsing must be versioned and validated before use, following the existing personal-exam-store pattern. Course definitions may declare suggested length, structural criteria, and NUR rewrite references, but may not contain a learner's answers or review state.

Real-time first-pass feedback remains structural and criterion-bound while no verified teacher rubric exists. It must not be described as automatic medical-fact grading. A future verified teacher rubric takes authority precedence, while NUR guidance remains separately labeled.

The current store is `nur-learn:learning-memory:v1`. It parses bounded records before use, retains only confirmed attempts, derives repeats from the latest confirmed version of distinct task/stage keys, proposes rather than auto-adds review work, and computes the accepted due time as exactly 48 hours. The completed browser pass covered early self-check, automatic A activation, explicit confirmation, B excerpt/expansion, three-task repeat detection, decline/re-prompt, accept, reload persistence, and completion by a later confirmed-present rewrite.

## Constrained NUR Agent Extension — Local Runtime Implemented

The first Agent pilot is a small provider-neutral web runtime, not a port of a terminal coding agent. Open-source harnesses such as Grok Build are architectural references for context assembly, inspectable steps, explicit permissions, bounded loops, and provider separation only.

The request contract includes stable course/offering/task IDs, current learner text, and up to eight confirmed learner-owned history records. Those history records carry only student-owned IDs and prose; the server resolves every task, stage, scoring definition, structural rule, source, and authority from the validated registry rather than trusting client-supplied academic content. The response uses a strict typed structure for missing criteria, one next prompt, prior-answer relationship, optional on-demand rewrite, provenance, authority, and data-handling notices.

The Agent has no terminal, filesystem, mutation, unrestricted browsing, clinical-diagnosis, or instructor-grading capability. Its four allow-listed capabilities are `course-context.read`, `answer-structure.inspect`, `confirmed-history.compare`, and `next-action.select`. Each run records the four bounded steps, then stops as either `learner-input-required` or `structure-covered`; it does not autonomously loop, save an attempt, or alter the 48-hour plan. Provider credentials are server/local-environment secrets. Deterministic self-check and review planning remain independently functional. Do not add a database, authentication, deployment, broad chat route, or autonomous tool system for this pilot.

The provider contract is independent from the UI, runtime, and course types. The first xAI adapter uses the official Responses API with JSON Schema structured output, `store: false`, no tools, a 30-second timeout, and a fixed official endpoint. A provider may return only allow-listed criterion IDs, at most one next criterion, eligible confirmed-attempt IDs, and an optional rewrite-criterion ID. The service unions provider choices with the deterministic structural floor and reattaches all learner-facing copy and provenance from typed local definitions. With no credential, a valid POST still completes through the deterministic runtime; if a configured provider fails, the same runtime returns a visible local fallback instead of fabricating model prose. The model is an optional policy assistant, not the prerequisite for Agent identity or execution.

## Evidence-Gated Course Builder — Known-Pack Milestone Implemented

The first Course Builder is a compilation boundary, not a free-form chatbot and not a CMS. Version-1 `CourseBuildRequest` selects one allow-listed material pack plus either `provider-preferred` or `baseline-only` mode. Version 2 references an allow-listed official base and adds only a strictly bounded, explicitly authorized current-session private overlay. The response is a versioned `CourseDraft` containing provider-assist truth, a bounded plan, the complete compiled `CourseDefinition`, five build steps, content/source coverage, typed review issues, deterministic validation counts, and authority/data-handling notices.

The initial provider is a server-only DashScope adapter with default model `qwen3.7-plus`. It accepts the public compatible-mode base or a workspace-specific `DASHSCOPE_BASE_URL`, but the resolver requires HTTPS and an `aliyuncs.com` host before appending `/chat/completions`. It receives normalized source/course metadata rather than original binaries and must return strict JSON. The plan parser rejects unknown, duplicate, missing, or reordered chapter/knowledge/source IDs, curriculum-mode changes, and any attempt to mark a pending source as usable. The model may revise only course/catalog descriptions, existing chapter focus text, existing knowledge-point notes/emphasis, source dispositions/rationales, priority IDs, and review notes. It cannot author IDs, source status, citations, exam totals, scoring authority, learner state, or React output.

The local compiler merges only those allow-listed fields into the known course, then runs `validateCourseDefinition(course, materialCatalog)`. A provider failure or absent key visibly falls back to the reproducible baseline; it never fabricates a Qwen result. The known TCM fixture compiles nine chapters and 39 stable knowledge points with six protected deep lessons, 13 assessment candidates, two cases, six missing source answers, and two pending teacher sources. These review issues are a feature of source honesty, not validation failures.

The workbench requires three human confirmations before recording `approved-for-local-preview` in browser storage. Approval never mutates course truth or publishes into the registry. JSON export is available for inspection. No intake binary is sent to the API. An approved DOCX overlay may now cross a second gate only after the learner inspects the exact accepted text/IDs/locators, fixed course/knowledge-point target, provider/model, counts, and exclusions, then creates a one-use authorization bound to a content digest. OCR workers, persistent build jobs, multi-user approval, admitted-record selection in Course Builder, and registry publication remain deferred; durable admission itself is implemented separately below.

The first live provider pressure test used a user-supplied Alibaba Cloud default-workspace credential stored only in ignored `.env.local`. The workspace model catalog confirmed exact `qwen3.7-plus`; two real provider-preferred builds returned `providerAssist.status: used`. Both plans compiled into the same protected nine-chapter/39-knowledge-point boundary, passed local validation with zero blocking issues, and preserved the four known review gaps. The live result validates transport and plan-boundary enforcement; it does not prove arbitrary-material generation quality or student learning efficacy.

## Base-Pack-Independent Private Material Analysis — Implemented

Private analysis is now a distinct provider-required stage, not version 3 of official course compilation. `PrivateMaterialAnalysisRequest` carries `kind: private-material-analysis`, the existing bounded `CourseBuildPrivateOverlayInput`, and a `one-private-analysis` authorization. The authorization is bound to overlay ID, registered course/knowledge-point target, exact accepted excerpt count and character count, a deterministic content digest, provider/model, and one-use scope. It deliberately has no `materialPackId` or `baseMaterialPackId`. The same privacy `none-observed`, 80-excerpt, 40,000-character, locator, unique-ID, learner-private, pending-review, and raw-file exclusion rules apply.

`POST /api/course-builder` parses the official and private request families under a 96 KiB body limit. The private service resolves the declared target from the existing validated course registry rather than trusting client titles or requiring an official pack. It consumes the authorization before checking provider availability or calling Qwen. Provider absence, timeout, malformed output, local validation failure, replay, target mismatch, digest mismatch, and bounds/privacy failure all return visible typed errors; there is no deterministic analysis fallback and no silent return.

The DashScope adapter forces one `submit_private_material_analysis` Function Call. Its closed JSON Schema fixes `overlayId`, `courseId`, `knowledgePointId`, allowed excerpt IDs, nested object keys, enums, counts, and string bounds. This improves structured-output reliability but does not replace local validation. The strict parser and validator reject unknown fields/IDs, protected-target changes, invalid topic/question relations, duplicate generated IDs, inconsistent coverage, and authority upgrades. Local normalization treats the provider result as an intermediate private draft: headings are always `unmapped`, topic excerpt lists are derived from accepted question mappings, repeated excerpt references keep only their first valid placement, and any known excerpt Qwen cannot stably map is honestly added to `unmapped / pending review`. Unknown IDs remain fatal.

`PrivateMaterialAnalysisResult` compiles to `PrivateMaterialLearningUnitDraft`, not `CourseDefinition`. It preserves the registered course/knowledge-point target, candidate topics, normalized subjective questions, exact source excerpt IDs and locally reattached DOCX locators, source-answer status, one generated answer draft, conflicts, missing facts, and deterministic rights. NUR derives concise/exam/expanded display variants from the single Qwen answer plus structure points without another model call. Every generated answer has authority `nur-qwen-generated`, confidence `generated-pending-review`, and label `NUR / Qwen 生成参考答案 · 尚无来源标准答案`; scoring authority is `not-provided`. Coverage is locally limited to `partial` or `unmapped`, compilation readiness is always `insufficient-for-full-course`, and publication, material-catalog mutation, course-registry mutation, and official-course compilation all remain `not-authorized`.

The workbench's private path is now `accepted overlay → exact manifest → one-time authorization → running → private learning unit or typed error`. It visibly states that an official pack is not needed for analysis and that official compilation is a later optional stage. The result renders coverage metrics, candidate topics, questions, locators, source/scoring authority, three answer views, unmapped/conflicts/missing facts, non-grants, and JSON export. A validated structured result is retained only in same-tab `sessionStorage` as `private-current-session`; reload restores that result while raw file handles, parsing drafts, and overlays still disappear.

The representative synthetic browser fixture contained one document heading and 20 physiology short-answer prompts. Without a physiology official pack, a real `qwen3.7-plus` call returned four topics, 20 questions, one deterministic heading `unmapped`, complete answer variants, all source answers missing, and all non-grants intact. A separate run returned 19 questions plus two honest unmapped items, proving that model omission becomes usable insufficiency rather than a blocking failure. The next architecture increment is not another analyzer: it is a deterministic adapter from imported private questions into the existing draft/favorite/confirmed-attempt/redo/review-scheduling contracts, followed only then by a Qwen-powered bounded Agent.

## Evidence-Gated Private-Material Intake — First Increment Implemented

The first intake is a browser-local evidence gate embedded in `/learn/course-builder`, not a general upload backend or CMS. Its versioned `MaterialIntakeDraft` keeps the empty draft, batch, file candidates, rejected candidates, provenance declaration, privacy/publication boundary, source-family declaration, four human confirmations, and final `eligible-for-course-builder` state distinct.

The accepted boundary is deliberately narrow:

- `.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.jpg`, `.jpeg`, `.png`, and `.webp` only; ZIP is rejected;
- at most eight files, 25 MiB per file, and 80 MiB per batch;
- browser `File`/Web Crypto APIs compute lowercase SHA-256 before any subsequent decision;
- duplicate hashes are detected inside the batch and compared with the current structured `MaterialCatalog` asset identities passed from the Server Component as SHA/asset-ID summaries;
- duplicate and rejected candidates block the intake gate instead of becoming new assets or aliases automatically;
- later selections append to the active batch; candidate/rejection deletion, whole-batch clear, and one-step undo remain browser-local and always invalidate the current review before any new eligibility decision;
- duplicate disposition is normalized after removal so the first remaining copy can become the identity candidate instead of staying falsely marked as a batch duplicate;
- supported files remain `待解析`, `ocr-pending`, `pending-review`, academic-content `pending`, authority-review `pending-review`, and conflict-review `pending-review` because this increment does not inspect their content;
- the default layer is permanently `learner-private`; authority is only a user declaration and cannot become verified teacher, school, publisher, or official-course truth through this UI;
- privacy begins `unknown` with a conservative document-metadata risk, publication begins `local-only`, identifiable-person material is forced to remain local-only, and inconsistent privacy declarations are rejected;
- raw-file handling is `browser-memory-only` and model transfer is `not-authorized`; current-session `File` handles are keyed by candidate ID in React state while only the validated structured draft is stored under `nur-learn:material-intake-draft:v1`.

The learner confirms course, source type, declared authority, school, teacher, academic year, semester, source-family relation, privacy, and publication policy. Unknown version dimensions remain explicit `pending` values. Four checkboxes separately confirm file identity, provenance, privacy/publication, and the no-model-transfer boundary. A four-stage UI separates file identity, source boundaries, human review, and content parsing. Passing the gate now reads `身份审核完成 · 内容尚未解析`; it records a browser-local structured candidate only, does not call `/api/course-builder`, does not mutate the material catalog or course registry, does not create publication state, and does not imply that OCR or source conflicts have been reviewed. After refresh, the structured record can return but the UI explicitly requires the learner to reselect the original file before any future parsing authorization.

## DOCX Local Semantic Parsing — First Pilot Implemented

The first fourth-gate slice accepts only a non-duplicate `.docx` candidate from an `eligible-for-course-builder` intake. It does not broaden the intake accept list or imply that PDF, legacy Word, PPT, images, or OCR are implemented.

The browser must hold the same `File` selected earlier or re-obtain it from the learner. Reselection is accepted only when the byte size and lowercase SHA-256 match the approved candidate. Parsing then requires a separate explicit authorization whose typed scope is `browser-local-docx-structure-only`, model transfer remains `not-authorized`, and persistence is `memory-only`.

`MaterialDocxParsingDraft` is versioned independently from `MaterialIntakeDraft`. It records parser identity, authorization time/scope, source candidate identity, semantic blocks, issues, and a preview-only delta. Mammoth converts DOCX into an intermediate HTML string in the browser; the application never renders that HTML. `DOMParser` extracts normalized headings, paragraphs, list items, and table cells into typed blocks with stable order and `DOCX 语义块 NNN` locators. The pilot stops at 240 blocks or 160,000 characters, ignores embedded image contents, and always keeps revision/comment/hidden-content status pending review.

Every block begins `pending-review`. Blocks are grouped beneath extracted headings; unheaded content is deterministically chunked after 24 blocks. Sections are collapsed by default and expose section-level accept-non-noise, exclude, and restore actions. Global actions cover all non-noise pending blocks, all deterministic noise candidates, and full reset. Filters expose pending, accepted, modified, or noise subsets. Noise detection is deliberately narrow—empty/very short blocks, page-number forms, symbol-only blocks, and exact normalized duplicates—and only produces a reversible candidate decision.

A learner may still edit individual text, accept it as a learner-private excerpt candidate, exclude it, or restore the original extracted text and pending state. Empty edited blocks cannot be accepted. Extracted text and decisions are React-memory state only and disappear on refresh or intake invalidation; they never enter localStorage, an API body, logs, JSON export, or course truth.

Once at least one block is accepted, the learner may select one existing knowledge point and inspect a `MaterialCourseDeltaPreview`. That preview reports current source/lesson/content status, `+1 learner-private artifact candidate`, accepted/pending/excluded counts, and invariant zeros for verified facts, registry writes, and model requests.

A second current-session confirmation can now create a versioned `ReviewedMaterialOverlayDraft`. It snapshots only accepted non-empty excerpts plus section/locator mapping, target course/knowledge point, learner-private source declaration, pending authority, publication policy, and `modelTransfer: not-authorized`. The overlay is lifted to the workbench, added to the material selector, automatically selected, and summarized as the matching official base plus private sections/excerpts. It remains memory-only, can be withdrawn from either surface, disappears on refresh, and is invalidated whenever the underlying eligible intake changes.

Selecting a private overlay now leads first to provider-required private analysis and keeps both analysis and legacy compilation disabled until a separate transfer manifest is reviewed and authorized. `PrivateMaterialAnalysisAuthorization` binds overlay/provider/model/course/knowledge-point/counts/content digest to `one-private-analysis`; content or target changes invalidate it, and the server consumes it before one provider attempt. The request is limited to 80 accepted excerpts / 40,000 characters, requires `none-observed` privacy, and excludes raw DOCX, filename/path/handle/full SHA, pending/excluded blocks, image/OCR originals, API keys, and unrelated metadata. Provider absence/failure is an honest error with no retry and no substitution. The earlier `PrivateOverlayTransferAuthorization / one-course-build` and official-base private compilation contract remain supported as a separate legacy/optional compilation stage, not an analysis prerequisite.

In the optional official-base private compilation path, the provider may return only one `use / review / exclude` decision plus descriptive learning-use/review text for every known excerpt ID at the fixed target. Its strict parser rejects unknown, duplicate, missing, reordered, or target-changing output. The compiler then reuses the official base, re-runs material/course validation, adds an explicit private-authority review issue, and returns a non-official `private-course-draft` whose overlay remains `learner-private / pending-review`. The existing three human confirmations are still required, and neither analysis, compilation, nor approval writes course truth, the material catalog, or publication state.

Raw binaries, extracted text, unreviewed OCR, unknown revision state, unresolved conflicts, and publication remain outside automatic model or registry mutation.

## Evidence-Gated Material Admission — Browser-Local Milestone Implemented

`MaterialAdmissionRecord` reuses the existing `MaterialAsset`, `MaterialSourceFamily`, and `MaterialArtifact` shapes rather than creating a second material model. A candidate can be derived only from a human-approved `ReviewedMaterialOverlayDraft`. It remains `pending` in React memory until the learner reviews identity, provenance, accepted transcription/locators, privacy/publication, source family/artifact, conflict disposition, authority, and explicit non-grants.

The record preserves the full lowercase SHA-256, MIME and byte size, structured school/teacher/year/semester declarations, learner-private provenance, source-family and artifact relationships, accepted native-DOCX excerpts, and one locator per excerpt. It also states that original path aliases are empty, raw binary/file handle/absolute path/original filename are absent, and pending/excluded body text is not stored. The approved record is limited to 80 accepted excerpts and 40,000 characters, matching the existing bounded private-overlay ceiling.

Eight separate human confirmations cover file identity, provenance, transcription/locator scope, privacy/publication, source-family/artifact relation, conflict disposition, learner-private authority, and the non-grant boundary. Strict validation rejects a candidate unless all eight pass, conflict state is explicitly reviewed, privacy/publication remains local-only, authority remains learner-private/pending-review, and Course Builder selection, model transfer, catalog mutation, publication, and course-registry rights all remain `not-authorized`. Only then can status become `approved-as-local-candidate` and enter `nur-learn:material-admission-records:v1`.

The browser store and JSON parser are versioned, exact-key, bounded, and reject unknown or malformed fields, inconsistent reciprocal references, duplicate record/SHA identity, missing locators, unsafe authority, or implied rights. Refresh restores only validated approved records; the raw `File`, parse draft, pending candidate, and current-session overlay disappear. The JSON export is a separately versioned audit package with the same approved record and an explicit boundary object whose Builder/model/catalog/publication grants are all false. It contains no binary, handle, absolute path, original filename, pending/excluded body, API key, or unrelated personal metadata. Export is evidence, not consent.

Admission does not automatically add an option to the Course Builder selector and cannot bypass the existing exact-manifest, one-use transfer gate. A future admitted-record selection bridge requires a separate product decision. Server storage, database, authentication, synchronization, multi-user approval, automatic publication, PDF/PPT/image parsing, and OCR remain out of scope.

## Five Evidence-Anchored TCM Loops — Implemented

The original demo IDs for `kp-tongue-coating`, `kp-inquiry-cold-heat`, `kp-pulse-common`, `kp-eight-principles-exterior-interior`, and `kp-organs-spleen-stomach` now carry complete `KnowledgePointDefinition` data. They reuse the same generic lesson, writing, case, learning-memory, source-authority, and scoring consumers as the first `问饮食口味` slice. This preserves 9 chapters and 39 knowledge points while increasing detailed lesson coverage from one to six.

The five loops are authored in `src/content/courses/tcm-diagnostics-deep-loops.ts`, then composed into the main course definition. The module exports only typed knowledge points, assessment items, one case, and source references; it does not create route-specific React or a parallel course model. Four source-verbatim school prompts with absent answers remain unscored candidates next to separate NUR-adapted, source-cross-checked answers and NUR scoring. The spleen case is explicitly synthetic and uses the existing four-stage `evidence → mechanism → syndrome → differential` contract.

The material catalog records the supporting textbook, teacher review, all five organ slide artifacts, historical final, school white-book artifact, and two explicitly misfiled Western Diagnostics exams. Knowledge sources reference page locators rather than embedding original binaries. OCR-pending or pending-review artifacts cannot become verified transcription merely because selected pages were visually checked; source-level page review and asset-wide transcription state remain separate.

## Official 《中医诊断学》 Material Pack v1 — Implemented

The course-wide official pack is a typed compilation input, not a second course model and not a set of route-specific pages. `tcm-diagnostics-official-pack-v1.ts` composes existing course truth with the shared material catalog and produces:

- a manifest of nine included artifacts: third-edition textbook, two-page teacher review, five organ-differentiation slide PDFs, 2021–2022 TCM historical final, and school white-book question document;
- two explicit exclusions for the misfiled 2022–2023 and 2023–2024 Western Diagnostics papers titled only `《诊断学》`;
- one evidence row for every registered TCM knowledge-point ID, including chapter, material/source locator, authority/scope, question state, answer authority/confidence, conflict review, OCR review, and missing facts;
- 10 `core-loop`, 15 `standard-loop`, and 14 `foundation` targets, based on evidence sufficiency rather than historical question frequency;
- a protected set derived from every current `point.lesson !== null`, so all six authored loops compile as `preserve-authored-loop`.

Source-located questions keep `prompt: null` until normalized and always keep missing answers as `status/confidence: missing`. Historical questions carry `currentFrequencyClaim: not-authorized`. NUR-adapted prompts and source-cross-checked NUR answers can be preserved through existing `AssessmentItemDefinition` references, but never become school answers or teacher scoring. Student answers are not admitted, slide OCR remains pending, and the missing nine-page teacher review plus teacher rubric remain explicit missing states.

`OfficialPackBatchCompileRequest` fixes `mode` to `deterministic-evidence-matrix`, targets the existing `CourseDefinition`, and sets model use/publication to not authorized. `OfficialPackBatchCompileResult` generates one target draft per stable knowledge-point ID: preserved existing loops, evidence-ready core/standard contracts for later human authoring, or foundation/pending evidence contracts. The validator hard-checks Asset–Family–Artifact relationships, manifest dispositions, exact 39-point coverage, tier ranges, source and locator identity, question/answer separation, historical-frequency non-claims, protected loops, and all non-grants.

The existing baseline-only Course Builder path now regenerates this batch result alongside the unchanged course draft. Acceptance is 9 included / 2 excluded, 39/39 covered-or-pending, 10/15/14 tiers, six preserved lessons, zero official-pack blocking issues, and zero overall blocking issues. The result is available in the CourseDraft JSON without changing React or granting publication/model/catalog/registry rights. Final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build.

## Private Learning Actions — Next Boundary

Base-pack-independent analysis and the representative 20-question partial unit are complete. The next boundary is no longer model decomposition; it is deterministic learner state around the existing `PrivateMaterialLearningUnitDraft`.

```text
validated private learning unit
  -> learner-owned favorite / draft state
  -> explicit confirmed attempt
  -> redo and review schedule
  -> optional bounded Qwen reasoning tools later
```

This adapter should reuse the existing assessment and learning-memory concepts without registering the private unit as official course truth. It needs stable private-unit/question IDs, learner-owned draft prose, explicit confirmation time, attempt lineage, favorite state, and review scheduling. Source excerpt IDs/locators, prompt authority, missing source-answer status, generated-answer authority, scoring absence, and private visibility remain immutable evidence attached to each question.

Draft and autosave state must never become a confirmed attempt. Favorites, confirmation, redo, and review scheduling occur only through explicit learner actions and deterministic TypeScript. Reload may recover validated browser-local learner state, but raw files, `File` handles, parser drafts, and overlays remain session-only. Withdrawing or replacing a unit must make orphaned state visible and safely non-actionable rather than silently attaching it to another unit.

The later learning Agent remains bounded. Qwen may propose answer rewriting, structural omission diagnosis, source comparison, favorite suggestions, and review proposals; typed tools assemble trusted context and deterministic application code performs mutations only after the learner action. Do not add a large orchestration framework or call Qwen for local tab switches, character counts, checkbox checks, or other deterministic interactions.

## Real-Material Pressure Test — Minimal Contract and Physiology Slice Implemented

The 2026-07-18 read-only intake catalogued 118 effective candidates across five courses plus cross-course notes. The [intake report](./materials/2026-07-18-material-intake-report.md), [itemized inventory](./materials/2026-07-18-material-inventory.md), and [fingerprints](./materials/2026-07-18-material-fingerprints.tsv) remain the provenance base. Originals stay in place and outside the application bundle.

The implemented material boundary now includes:

- global `MaterialAsset` identity keyed by SHA-256 with original path aliases;
- `MaterialSourceFamily` and `MaterialArtifact` version/derivation records;
- repeated page, slide, image, table, question, and OCR-region locators;
- transcription, integrity, privacy, and publication policy states;
- answer variants with independent authority/artifact references and an unresolved-conflict state;
- the few source types directly proven by intake: answer key, experiment manual, image set, and transcription;
- course-source validation against the global material catalog.

The real validation fixtures preserve MAT-020/MAT-080 as one asset with two aliases, MAT-057/MAT-058 as two artifacts in one source family, tracked revisions as non-verified, MAT-070 as local-only identifiable-person media with an OCR transcription layer, and both MAT-111/MAT-113 answer conflicts as unresolved. The derived MAT-045 review PDF retains inferred parents instead of becoming independent authority.

The second registered course, 生理学, validates `western-primary`, a pending exam blueprint, multi-authority sources, shared evidence across assessments, and term/short-answer practice without forcing a TCM lens. Its first authored knowledge point, 「内环境与稳态」, reuses the existing dynamic knowledge and subjective-writing routes. `KnowledgeLessonDefinition` supports exactly one top-level case reference or a typed non-case transfer exercise; the existing TCM four-stage case remains unchanged, while physiology uses a mechanism-transfer chain.

Still deferred because the current slices did not require them: structured image regions, objective choices/matching groups, a configurable case-stage union beyond the current TCM case, and a general CMS. The browser-local intake, native DOCX parsing, section review, session overlay selector bridge, separately authorized approved-excerpt conversion into the existing compiler, and strict durable local artifact/family candidate admission are complete. PDF, legacy Word, PPT, image parsing, OCR review, and direct admitted-record use in Course Builder remain bounded later steps.

## Implementation Result

The milestone was completed without redesigning the approved homepage or course workspace.

- Contracts: `src/types/learning.ts`
- Pilot definition: `src/content/courses/tcm-diagnostics.ts`
- Five deep TCM loops: `src/content/courses/tcm-diagnostics-deep-loops.ts`
- Physiology definition: `src/content/courses/physiology.ts`
- Course registry: `src/content/courses/index.ts`
- Material catalog: `src/content/materials/material-catalog.ts`
- Official TCM pack manifest and evidence matrix: `src/content/materials/tcm-diagnostics-official-pack-v1.ts`
- Material validation: `src/lib/material-validation.ts`
- Demo learner state: `src/content/demo/tcm-diagnostics-learner-state.ts`
- Physiology demo learner state: `src/content/demo/physiology-learner-state.ts`
- Demo learner-state registry: `src/content/demo/index.ts`
- Validation gates: `src/lib/course-validation.ts`
- Workspace selectors: `src/lib/course-selectors.ts`
- Personal exam validation: `src/lib/user-exam-structure.ts`
- Learning-memory validation and transitions: `src/lib/learning-memory.ts`
- Learning-memory hook: `src/hooks/use-learning-memory.ts`
- Shared learning-memory UI: `src/components/learning-memory-panel.tsx`
- Agent contracts: `src/types/nur-agent.ts`
- Agent request/context/runtime/provider service: `src/lib/nur-agent/`
- Agent Route Handler: `src/app/api/nur-agent/route.ts`
- Agent UI: `src/components/nur-agent-pilot.tsx`
- Course Builder contracts: `src/types/course-builder.ts`
- Material-intake contracts: `src/types/material-intake.ts`
- Material-parsing contracts: `src/types/material-parsing.ts`
- Material-admission contracts: `src/types/material-admission.ts`
- Course Builder pack/provider/compiler boundary, including the private-overlay request/authorization adapter: `src/lib/course-builder/`
- Official-pack validator and deterministic batch compiler: `src/lib/course-builder/official-pack.ts`
- Material-intake validation and browser-store boundary: `src/lib/material-intake.ts`
- DOCX local parser and delta compiler: `src/lib/docx-local-parser.ts`
- Material-admission validation, browser-store, recovery, and export boundary: `src/lib/material-admission.ts`
- Course Builder Route Handler: `src/app/api/course-builder/route.ts`
- Course Builder workbench: `src/components/course-builder-workbench.tsx`
- Private-material intake review: `src/components/material-intake-review.tsx`
- DOCX parsing and block-review UI: `src/components/docx-parsing-review.tsx`
- Material-admission review and audit-export UI: `src/components/material-admission-review.tsx`
- Course Builder route: `src/app/learn/course-builder/page.tsx`
- Reusable consumer: `src/components/course-workspace.tsx`
- Reusable knowledge lesson: `src/components/knowledge-point-lesson.tsx`
- Reusable knowledge route: `src/app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/page.tsx`
- Reusable subjective-writing view: `src/components/subjective-writing-room.tsx`
- Reusable subjective-writing route: `src/app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/subjective-writing/page.tsx`
- Reusable case-reasoning view: `src/components/case-reasoning-room.tsx`
- Reusable case-reasoning route: `src/app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/case-reasoning/page.tsx`

The default TCM workspace and original six route instances still pass regression. The five added TCM knowledge routes, their five writing routes, and the spleen case route passed desktop/mobile rendering, real lesson/writing/case interactions, source-ledger inspection, missing-answer separation, empty warning/error logs, and 390 × 844 no-overflow checks. The physiology knowledge page passed all four section switches, mechanism-transfer reveal, source-ledger inspection, and the absence of fake relationship/case UI. Its writing room passed source prompt switching, draft input, answer reveal, `6 / 6` self-check, and visible separation of school attached-answer authority from NUR scoring and pending teacher grading. Both physiology routes pass 390 × 844 no-overflow checks. The Course Builder additionally passed no-key known-pack fallback, source-ledger, baseline-only/provider-preferred regression, strict private rejection/replay/failure cases, a real synthetic `qwen3.7-plus` private request, deterministic revalidation, and human approval. The newer analysis pass proved a real no-base-pack 21-excerpt physiology request, four topic groups, 20 questions, one heading unmapped, three answer views, all non-grants, same-tab result restoration, and visible provider/validation failures without a silent return. Browser QA covered exact-SHA DOCX reauthorization, parse consent, section/global review, individual editing, overlay selection/invalidation/refresh loss, exact transfer manifest, one-time authorization, private result rendering, local-only approval, admission gating, refresh recovery, strict export parsing, and preserved Builder separation. Browser warning/error logs were empty; the fresh 390px private-analysis captures show no visible horizontal clipping. The exact 100-point TCM pilot blueprint remains protected by row arithmetic plus a declarative integrity rule; the pending physiology blueprint declares no rows or total rather than inheriting it.


## 私人学习单元可行动更新 (2026-07-21)
私人分析结果中的题目现在支持本地草稿输入、收藏切换、'完成自核并确认保存'（调用 recordConfirmedAttempt 复用现有 subjective-writing / learning-memory 合同，taskId private-xxx，scoring nur-qwen-private-ref）、重做。所有动作显式，无静默。官方材料包和 registry 不变。检查通过。
