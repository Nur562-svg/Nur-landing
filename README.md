# NUR LEARN

NUR LEARN is a local-first product prototype for sustained medical-course learning. It currently focuses on Chinese students majoring in Integrated Traditional Chinese and Western Medicine Clinical Medicine, with 《中医诊断学》 as the pilot course.

The product combines evidence-led learning, careful TCM/modern-medicine comparison, exam-oriented drilling, complete subjective-answer practice, and syndrome-differentiation reasoning.

## Current Status

Twenty working product route instances exist:

- [Interactive promotional homepage](http://localhost:3000/) — the restored pointer-following reveal experience with medical-course texture and the hidden message `你好，成绩将飞速提升`.
- [Weekly learning homepage](http://localhost:3000/learn) — evidence-first syndrome-differentiation flow, dual-view clue explanation, progress rail, editable learner profile, and weekly-plan drawer.
- [Course Builder](http://localhost:3000/learn/course-builder) — places selected private files in a reversible browser-local evidence gate, computes SHA-256 without uploading binaries, confirms provenance/privacy/publication boundaries, and offers an explicitly authorized DOCX-only local parsing pilot. Parsed blocks are grouped for section-first review with bulk actions and optional block editing. Approved excerpts can form a current-session private overlay; a second one-time authorization lists the exact excerpt text/IDs/locators and target before a bounded `qwen3.7-plus` request. Private-material analysis no longer requires a matching official base pack: Qwen returns strictly parsed candidate topics, normalized questions, generated-reference-answer drafts, conflicts, missing facts, and honest `partial / insufficient / unmapped` coverage. A separate material-admission review can turn the human-reviewed overlay into an `approved-as-local-candidate` record only after explicit conflict, authority, privacy, publication, identity, and excerpt checks. Its strict versioned browser-local record and JSON export grant no Course Builder, model-transfer, catalog, or publication rights.
- [《中医诊断学》 course workspace](http://localhost:3000/courses/tcm-diagnostics) — course progress, chapter scope, three-stage learning route, explicit learning-unit selection, direct start for available understanding/writing/case tasks, persistent writing/case-room shortcuts, sourced material state, the current 100-point course blueprint, a browser-local DIY exam structure, and an optional 45-minute session queue.
- [`问诊 · 问饮食口味` knowledge point](http://localhost:3000/courses/tcm-diagnostics/knowledge-points/diet-and-taste) — evidence collection, TCM/modern-medicine reasoning, explicit relationship labels, answer-and-score training, and case transfer.
- [`问诊 · 问饮食口味` subjective-writing room](http://localhost:3000/courses/tcm-diagnostics/knowledge-points/diet-and-taste/subjective-writing) — first-draft writing, source-cross-checked NUR answer structure, criterion-by-criterion self-check, and a focused rewrite for one term explanation and one short answer.
- [`问诊 · 问饮食口味` case-reasoning room](http://localhost:3000/courses/tcm-diagnostics/knowledge-points/diet-and-taste/case-reasoning) — a NUR-adapted case that makes the learner separate evidence, write mechanism/evaluation directions, state a provisional syndrome conclusion, and repair differential-exclusion gaps without treating NUR scoring as teacher grading or a clinical diagnosis.
- Five additional source-anchored TCM knowledge loops — [`望舌苔`](http://localhost:3000/courses/tcm-diagnostics/knowledge-points/tongue-coating), [`问寒热`](http://localhost:3000/courses/tcm-diagnostics/knowledge-points/cold-and-heat), [`常见病脉`](http://localhost:3000/courses/tcm-diagnostics/knowledge-points/common-pulses), [`表里辨证`](http://localhost:3000/courses/tcm-diagnostics/knowledge-points/exterior-interior), and [`脾胃病辨证`](http://localhost:3000/courses/tcm-diagnostics/knowledge-points/spleen-stomach) — now reuse the same evidence, dual-lens, scoring, transfer, writing, source-authority, and browser-local learning-memory contracts. The spleen loop also has a four-stage synthetic case room; source-verbatim school prompts with missing answers remain visibly unscored.
- [`内环境与稳态` knowledge point](http://localhost:3000/courses/physiology/knowledge-points/internal-environment-and-homeostasis) — a `western-primary` physiology lesson that moves from body-fluid compartments and relative stability to regulation, physiological significance, and a non-case mechanism-transfer exercise.
- [`内环境与稳态` subjective-writing room](http://localhost:3000/courses/physiology/knowledge-points/internal-environment-and-homeostasis/subjective-writing) — two source-verbatim school white-book prompts with separately modeled attached answers, NUR scoring, historical question evidence, and current-teacher scoring still marked pending.

The learner progress remains an explicit demonstration. The current course version is now scoped to 南京中医药大学、中西医结合临床、大一、2026 学年下学期. The official third-edition textbook, five instructor-provided slide sets, the two-page instructor review sheet, a school question-bank document, and a 2021–2022 TCM Diagnostics final have been inspected and recorded with provenance. The instructor's original nine-page final review document and real subjective-answer grading rubric remain pending.

The full course and knowledge-flow browser interactions, responsive inspection, and design QA passed on 2026-07-16. After the promotional-home restoration and `/learn` route migration, lint, strict TypeScript, and the production build passed again on 2026-07-17. The first subjective-writing and case-reasoning rooms were added on 2026-07-18. The same vertical slice now also has versioned browser-local confirmed attempts, independent A/B learning-assistance preferences, a three-distinct-task repeated-omission threshold, and an opt-in 48-hour return task. A small provider-neutral NUR Agent now runs locally without a model: it resolves trusted course context, performs a bounded four-step structural inspection, compares confirmed history, chooses exactly one next action, and stops for learner input. The provider-neutral Course Builder has a server-only DashScope adapter, strict plan validation, deterministic known-pack fallback, a full `CourseDefinition` compiler, JSON export, and browser-local human approval. On 2026-07-19, a user-supplied server-only Alibaba Cloud Model Studio workspace credential completed real `qwen3.7-plus` known-pack and synthetic private-overlay builds through the workspace-specific OpenAI-compatible endpoint. The private path now covers reversible intake, DOCX semantic parsing, section review, deterministic noise candidates, block-level exceptions, a current-session overlay, exact one-time transfer review, strict server consumption, a private analysis result, and a separately approved durable material-admission record. Analysis requests require no official base, send only explicitly accepted text, refuse privacy-risk/over-limit/unconfigured/failed cases without substitution, consume authorization on success or failure, and compile only a private current-session learning unit. Function Calling constrains the model's structured arguments; deterministic code reattaches locators, keeps headings/unresolved excerpts honestly unmapped, and reasserts authority and non-grants. The admission export contains only accepted structured evidence and explicit non-grants; raw binaries, file handles, absolute paths, original filenames, pending/excluded body text, and credentials are excluded. On 2026-07-19, five more TCM knowledge/writing loops and one synthetic spleen case were calibrated against the supplied third-edition textbook, teacher review scope, school question bank, historical paper, and spleen slide artifact. No original binary or credential entered code, Git, browser screenshots, or documentation. See [`design-qa.md`](design-qa.md).

The first cross-course material-intake pass was completed read-only on 2026-07-18. It catalogued 118 source candidates across 《中医诊断学》、生理学、生物化学、医古文、组织胚胎学 and cross-course notes, without moving the originals. Its smallest proven contract is now implemented: SHA-based assets with path aliases, source families and artifact versions, repeated locators, OCR/integrity/privacy/publication state, and unresolved answer variants. The physiology slice consumes structured excerpts from selected materials while originals remain local and outside `public/`. See the [intake report](docs/materials/2026-07-18-material-intake-report.md), [itemized inventory](docs/materials/2026-07-18-material-inventory.md), and [full SHA-256 fingerprints](docs/materials/2026-07-18-material-fingerprints.tsv).

The first official 《中医诊断学》 material pack is now implemented as a typed, deterministic compilation input rather than another set of hand-authored React pages. Its manifest reuses the existing material asset/family/artifact catalog for the third-edition textbook, two-page teacher review, five organ-differentiation slide artifacts, the 2021–2022 TCM final, and the school white book; two Western Diagnostics papers remain explicitly excluded. Its evidence matrix covers all 39 stable knowledge-point IDs as 10 core, 15 standard, and 14 foundation targets, preserves all six authored deep loops, and carries question, answer-confidence, conflict, OCR, missing-source, and teacher-rubric states. A baseline Course Builder run regenerates the 39-point batch draft with zero blocking issues and no model-use, publication, catalog-mutation, or registry-mutation grant. The final ESLint, strict TypeScript, and Next.js production build check passed on 2026-07-19. See the [official pack audit](docs/materials/2026-07-19-tcm-official-pack-v1.md).

The Course Builder correction is now implemented. A synthetic 21-excerpt DOCX containing a title plus 20 physiology short-answer prompts reached real `qwen3.7-plus` without a physiology official pack and returned a four-topic, 20-question private learning unit plus one deterministic title `unmapped` item. Coverage remained `partial / insufficient-for-full-course`; every source answer stayed `missing`, every generated answer used the exact non-authoritative NUR/Qwen label, and publication/catalog/registry/official-compilation rights stayed `not-authorized`. The workbench exposes idle/running/success/error states, three local answer views, JSON export, and same-tab `sessionStorage` recovery of the structured result. The final `npm run check` passed ESLint, strict TypeScript, the Next.js 16.2.1 production build, and all 23 generated pages. Official-pack mapping and full typed-course compilation remain a later optional stage.

## Product Direction

- Primary audience: domestic Integrated TCM and Western Medicine clinical students.
- Primary outcome: whole-semester learning and final-exam performance.
- Pilot: 《中医诊断学》.
- Typical rhythm: 3–4 focused sessions per week, 30–60 minutes each.
- Core differentiation: TCM and modern-medicine perspectives appear together where relevant, with explicit relationship labels that prevent false equivalence.
- Drilling remains essential, especially term explanations, short answers, and case reasoning.

The approved course workspace and first knowledge-point page now run on a typed, data-driven course engine that separates course truth, demo learner state, and browser-local learner configuration. Modern medicine enters the NUR platform answer-and-score practice where academically useful, while remaining separately reasoned and explicitly non-equivalent to TCM syndromes. Exam blueprints are declared per course and offering; the current 100-point distribution belongs only to this 《中医诊断学》 offering, while a learner may locally model a different school or instructor structure without mutating course truth.

## Essential Project Documents

- [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) — canonical handoff and full project state.
- [`docs/CONTENT_ARCHITECTURE.md`](docs/CONTENT_ARCHITECTURE.md) — agreed scalable course model and implementation acceptance criteria.
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — production deployment guide (Postgres + Caddy + Docker).
- [`docs/NEXT_SESSION_PROMPT.md`](docs/NEXT_SESSION_PROMPT.md) — copy-ready prompt for continuing in a fresh Codex session.
- [`docs/materials/2026-07-18-material-intake-report.md`](docs/materials/2026-07-18-material-intake-report.md) — latest read-only source audit, coverage report, conflict register, and engine pressure test.
- [`docs/materials/2026-07-19-tcm-official-pack-v1.md`](docs/materials/2026-07-19-tcm-official-pack-v1.md) — official-pack manifest, 39-point evidence matrix, depth tiers, non-grants, and batch-compile acceptance.
- [`design-qa.md`](design-qa.md) — latest visual, responsive, interaction, and build verification.

Read those documents before continuing product or implementation work.

## Requirements

- Node.js 24+
- npm

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To enable the first hosted Course Builder provider, set `DASHSCOPE_API_KEY` only in the server environment. `DASHSCOPE_BASE_URL` may point to either the public compatible-mode base or an Alibaba Cloud workspace-specific compatible base; the adapter rejects non-HTTPS and non-`aliyuncs.com` hosts. `NUR_COURSE_BUILDER_PROVIDER` defaults to `dashscope`, and `NUR_COURSE_BUILDER_MODEL` defaults to `qwen3.7-plus`. Without a key, the workbench remains fully usable through the reproducible approved-material baseline and clearly labels that no Qwen result was produced.

## Quality Checks

```bash
npm run check
```

The command runs ESLint, strict TypeScript checking, and a production build.

## Important Files

```text
src/app/page.tsx                              Interactive promotional homepage
src/app/learn/page.tsx                        Weekly learning homepage route
src/app/learn/course-builder/page.tsx         Course Builder review workbench route
src/app/courses/tcm-diagnostics/page.tsx     Course workspace route
src/app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/page.tsx
                                                Reusable knowledge-point route
src/app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/subjective-writing/page.tsx
                                                Reusable subjective-writing route
src/app/courses/[courseSlug]/knowledge-points/[knowledgePointSlug]/case-reasoning/page.tsx
                                                Reusable case-reasoning route
src/components/learning-dashboard.tsx        Homepage interactions and content
src/components/learning-dashboard.module.css Homepage visual system
src/components/course-workspace.tsx          Reusable interactive course workspace
src/components/course-workspace.module.css   Course workspace visual system
src/components/knowledge-point-lesson.tsx    Reusable knowledge-point interactions
src/components/knowledge-point-lesson.module.css Knowledge-point visual system
src/components/subjective-writing-room.tsx      Subjective-writing interactions
src/components/subjective-writing-room.module.css Subjective-writing visual system
src/components/case-reasoning-room.tsx         Case-reasoning interactions
src/components/case-reasoning-room.module.css  Case-reasoning visual system
src/components/learning-memory-panel.tsx       A/B assistance, confirmed history, 48-hour return UI
src/components/nur-agent-pilot.tsx             Bounded on-demand local Agent UI
src/components/course-builder-workbench.tsx    Material-to-course compile and approval UI
src/components/material-intake-review.tsx      Browser-local file identity and provenance-review UI
src/components/docx-parsing-review.tsx         Explicit DOCX authorization, block review, and delta-preview UI
src/components/material-admission-review.tsx   Evidence-gated local admission review, recovery, and export UI
src/types/learning.ts                         Course and learner-state contracts
src/types/nur-agent.ts                        Provider-neutral Agent request/response contracts
src/types/course-builder.ts                   Course Builder request, plan, draft, and issue contracts
src/types/material-intake.ts                  Versioned intake draft, batch, candidate, and review contracts
src/types/material-parsing.ts                 Versioned DOCX parse draft, semantic-block, issue, and delta contracts
src/types/material-admission.ts               Versioned admission record, store, export, and rights contracts
src/content/courses/tcm-diagnostics.ts        Pilot course definition
src/content/courses/tcm-diagnostics-deep-loops.ts
                                                Five evidence-anchored TCM loops
src/content/courses/physiology.ts             Western-primary physiology definition
src/content/courses/index.ts                  Validated course registry
src/content/materials/material-catalog.ts     Global material identity and pressure-test fixtures
src/content/materials/tcm-diagnostics-official-pack-v1.ts
                                                Official pack manifest and 39-point evidence matrix
src/content/demo/                             Explicit prototype learner state
src/lib/course-validation.ts                  Integrity and completeness gates
src/lib/material-validation.ts                Material/source provenance gates
src/lib/material-intake.ts                    Intake bounds, parsing, validation, duplicate, and local-store helpers
src/lib/docx-local-parser.ts                  Browser-local DOCX semantic extraction and preview compiler
src/lib/material-admission.ts                 Strict admission validation, local storage, recovery, and export
src/lib/course-selectors.ts                   Reusable workspace selectors
src/lib/user-exam-structure.ts                Validated browser-local exam configuration
src/lib/learning-memory.ts                    Validated confirmed-attempt and review store
src/lib/nur-agent/runtime.ts                  Bounded deterministic Agent loop and stop policy
src/lib/nur-agent/                            Server-only context, runtime, provider, and service boundary
src/app/api/nur-agent/route.ts                Local Route Handler for bounded Agent requests
src/lib/course-builder/                       Server-only pack, provider, compiler, and validation boundary
src/lib/course-builder/official-pack.ts       Official-pack validation and deterministic batch compiler
src/app/api/course-builder/route.ts           Stateless Course Builder status/build Route Handler
docs/design-references/                      Browser and QA screenshots
```

## Current Limitations

- M1 账户认证、M2 学习状态云同步、M3 配额体系已完成：bcryptjs + jose JWT（30 天 httpOnly cookie）、Prisma 双适配（D1/SQLite）、free/lite/pro 三档配额、登录限流、注册/登录/密码重置。题库 60 题、100 分模考、错题中心。支付抽象层（mock/wechat/alipay provider）已就绪，mock 模式可完整跑通会员流程，真实支付待商户号配置密钥后切换。部署配置（standalone Dockerfile + Postgres + Caddy）已就绪，待 ICP 备案通过后上线。
- The instructor's original nine-page final review PDF and real subjective-answer grading rubric have not been supplied. The current 10-point lesson rubric remains explicitly NUR-authored platform practice rather than a claim about instructor scoring.
- The first two school-white-book fill-in prompts have been normalized as source-verbatim assessment candidates, but their answers are still absent and must not be shown as standard answers. The wider white book and student choice-bank material still require question-level normalization and answer verification.
- The subjective-writing rooms now cover the six authored TCM loops plus the physiology slice, and the case-reasoning rooms the two authored cases, all through the same reusable routes. The TCM assessment bank holds 60 items, and the mock exam composes a 100-point paper; B1/B2 rows stay empty until their semantics are confirmed by a source. A centralized wrong-answer center (`/wrong-questions`) aggregates question-bank and mock-exam wrong answers by knowledge point and reflows weak-KP chips into the `/learn` weekly-plan drawer.
- The provider-neutral NUR Agent runs deterministically with no credential and has no tools/search/filesystem/mutation permissions. The first optional server-only xAI adapter uses strict structured output; a real model-assisted pass still awaits a server-side credential, no key is stored in code, and no model output has been fabricated.
- The private-material intake accepts only `.pdf/.doc/.docx/.ppt/.pptx/.jpg/.jpeg/.png/.webp`, at most eight files, 25 MiB per file, and 80 MiB per batch. It computes identity, keeps selected `File` handles only in the current browser session, and persists only the structured intake draft. The first parser supports native `.docx` only, caps its memory-only preview at 240 semantic blocks / 160,000 characters, ignores images, and keeps revision/comment state pending. Reviewed excerpts and the private overlay disappear on refresh and are revoked if the eligible intake changes. An explicitly approved admission record may durably retain only accepted excerpt text and locators plus identity/provenance/review metadata; it never retains raw binary, file handle, absolute path, original filename, or pending/excluded body text. The one-time model adapter is implemented only for at most 80 accepted excerpts / 40,000 characters with `none-observed` privacy; PDF, legacy `.doc`, PPT, images, and OCR remain unimplemented.
- The provider-neutral Course Builder still compiles the allow-listed official fixture as its official truth base, but its separate private-analysis request can target any registered course/knowledge point without an official pack. The private result is a current-session intermediate unit, not a `CourseDefinition`; it does not publish or mutate the course registry/material catalog. The official TCM pack retains its deterministic 39-point evidence-matrix batch draft and six protected lessons. Real `qwen3.7-plus` provider use is verified; imported private questions already connect to favorites, learner drafts, confirmed attempts, redo/review scheduling, and the bounded Agent. OCR/transcription jobs beyond native DOCX, persistent build jobs, registry publication, and multi-user approval are not implemented.
- The material contract, intake, and admission record cover identity, source-family/artifact declaration, authority review, transcription locators, integrity/privacy/publication state, and conflict disposition, but they are not a CMS or bulk importer. Admission does not mutate `materialCatalog`, make a file selectable in Course Builder, authorize model transfer, or publish course truth. Structured image regions, objective choices/matching groups, and broader question-bank normalization remain deferred until a concrete learning surface needs them.
- The physiology slice intentionally has no separate course-workspace page yet; its reusable knowledge and writing routes are directly testable, while `/learn` and the approved TCM workspace have not been redesigned to add a second-course selector.
- The product is intentionally not deployed yet; the priority remains an evidence-backed local learning loop.

Do not treat these limitations as permission to fill the product with placeholders. The evidence-gated material-admission milestone, official TCM material-pack v1, base-pack-independent private analysis, private learning actions, the Qwen-powered bounded Agent, the 60-item assessment bank with a 100-point mock exam, and the wrong-answer center with weak-KP weekly-plan reflow are complete. M1 authentication (bcryptjs + JWT), M2 learner-state cloud sync (Prisma), M3 quota system (free/lite/pro), M4 payment abstraction (mock/wechat/alipay), password reset, email verification, legal pages, SEO metadata, standalone Dockerfile, Postgres + Caddy deployment config, and CI pipeline are complete. The next priority is ICP filing and merchant account setup to enable real payment and deployment.
