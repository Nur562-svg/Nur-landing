# Design QA — NUR LEARN 纵向学习闭环、学习记忆、本地 Agent 与 Course Builder

## Comparison target

- Source visual truth: `/Users/nukeab/.codex/generated_images/019f6131-a83d-7db2-aaef-284f08015ed5/exec-761480dc-4828-45a1-bb5b-4bff78c579cb.png`
- Existing approved implementation reference: `/Users/nukeab/projects/Nur-landing/docs/design-references/implemented-learning-home-closed.png`
- Browser-rendered default state: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-default.jpeg`
- Browser-rendered session drawer: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-session.jpeg`
- Browser-rendered ready state: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-ready.jpeg`
- Responsive text-scaling state: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-mobile.jpeg`
- Data-driven regression default state: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-data-driven-default.jpeg`
- Data-driven regression session drawer: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-data-driven-session.jpeg`
- Knowledge-point evidence state: `/Users/nukeab/projects/Nur-landing/docs/design-references/knowledge-point-diet-and-taste-evidence.jpeg`
- Knowledge-point dual-lens state: `/Users/nukeab/projects/Nur-landing/docs/design-references/knowledge-point-diet-and-taste-compare.jpeg`
- Knowledge-point answer-and-score state: `/Users/nukeab/projects/Nur-landing/docs/design-references/knowledge-point-diet-and-taste-output.jpeg`
- Sourced course-workspace default: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-sourced-default.png`
- Personal exam-structure editor: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-custom-exam.png`
- Saved personal exam structure: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-personal-exam.png`
- Personal exam editor at 390 × 844: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-custom-exam-mobile.png`
- Sourced `问饮食口味` page: `/Users/nukeab/projects/Nur-landing/docs/design-references/knowledge-point-diet-and-taste-sourced.png`
- Subjective-writing room default: `/Users/nukeab/projects/Nur-landing/docs/design-references/subjective-writing-room-default.jpeg`
- Subjective-writing room completed term state: `/Users/nukeab/projects/Nur-landing/docs/design-references/subjective-writing-room-completed.jpeg`
- Subjective-writing room responsive state: `/Users/nukeab/projects/Nur-landing/docs/design-references/subjective-writing-room-responsive.jpeg`
- Case-reasoning room default state: `/Users/nukeab/projects/Nur-landing/docs/design-references/case-reasoning-room-default.jpeg`
- Private-material intake passed state: `/Users/nukeab/projects/Nur-landing/docs/design-references/material-intake-passed-2026-07-19.png`
- Private-material intake mobile top: `/Users/nukeab/projects/Nur-landing/docs/design-references/material-intake-mobile-top-2026-07-19.png`
- Private-material intake mobile reviewed state: `/Users/nukeab/projects/Nur-landing/docs/design-references/material-intake-passed-mobile-2026-07-19.png`
- Reversible private-material list at desktop: `/Users/nukeab/projects/Nur-landing/docs/design-references/material-intake-reversible-2026-07-19.png`
- Reversible private-material progress at mobile: `/Users/nukeab/projects/Nur-landing/docs/design-references/material-intake-reversible-mobile-2026-07-19.png`
- Reversible private-material file actions at mobile: `/Users/nukeab/projects/Nur-landing/docs/design-references/material-intake-reversible-mobile-list-2026-07-19.png`
- Authorized private Course Builder draft at 1440 × 1000: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-builder-private-overlay-authorized-2026-07-19.png`
- Authorized private Course Builder draft at 390 × 844: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-builder-private-overlay-authorized-mobile-2026-07-19.png`
- Approved material-admission record at 1440 × 1000: `/Users/nukeab/projects/Nur-landing/docs/design-references/material-admission-approved-2026-07-19.png`
- Approved material-admission record at 390 × 844: `/Users/nukeab/projects/Nur-landing/docs/design-references/material-admission-approved-mobile-2026-07-19.png`
- Synthetic spleen case interaction at 1440 × 1000: `/Users/nukeab/projects/Nur-landing/docs/design-references/tcm-deep-loop-spleen-case-desktop-2026-07-19.png`
- Synthetic spleen case top at 390 × 844: `/Users/nukeab/projects/Nur-landing/docs/design-references/tcm-deep-loop-spleen-case-mobile-2026-07-19.png`
- Private-analysis answer state at desktop: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-builder-private-analysis-result-2026-07-19.png`
- Private-analysis partial-unit header at 390px: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-builder-private-analysis-result-mobile-2026-07-19.png`
- Private-analysis expanded answer at 390px: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-builder-private-analysis-answer-mobile-2026-07-19.png`
- Combined comparison board: `/Users/nukeab/projects/Nur-landing/docs/design-references/course-workspace-design-qa-comparison.jpeg`
- Browser viewport: 948 × 768 desktop application capture. Responsive behavior was additionally inspected at increased browser text/page scaling, which reduced the effective CSS viewport below the 700px breakpoint.
- Default state: `本阶段` filter, `问诊`, `理解`, `问饮食口味`.
- Interaction state: `全学期` filter, `八纲辨证`, `输出`, `虚实辨证`, session drawer open and ready confirmation.

The selected source is the approved visual system rather than a pixel-identical mock of this new route. The QA therefore compares design-language fidelity, header geometry, surface treatment, typography, hierarchy, density, responsive behavior, and interaction polish. The course-specific information architecture is an intentional extension.

## Full-view comparison evidence

The combined comparison board places the approved homepage source and browser-rendered course workspace in one image. The workbench carries forward the warm ivory canvas, black editorial grid, Songti-style Chinese display type, five-item centered navigation, pale oversized wordmark, square borders, black primary actions, muted cinnabar state color, and sparse outline icon language. The new three-column course structure remains visually related to the homepage without copying its content layout.

## Focused region comparison evidence

The header and course hero preserve the source's one-pixel rule, typographic brand lockup, centered navigation, circular monogram, restrained serif/sans contrast, and black action treatment. The session drawer was inspected separately: its fixed right edge, dimmed backdrop, square close control, three-step learning plan, and bottom-anchored action maintain the same geometry and color discipline. No custom SVG, CSS illustration, emoji, gradient, or placeholder imagery was introduced.

## Required fidelity surfaces

- Fonts and typography: passed. Chinese page and chapter headings use the existing Songti system fallbacks; labels, metadata, navigation, progress, and exam values use the established sans/Latin serif pairing. The browser capture shows stable hierarchy, no truncation, and no broken wrapping at desktop or scaled responsive states.
- Spacing and layout rhythm: passed. Header height, page margins, course hero split, chapter/detail/insight grid, one-pixel dividers, task-row cadence, and right drawer proportions are coherent with the source. The 1200px and 900px breakpoints move supporting insights below the core workspace; below 700px the chapter list becomes a horizontal rail and the detail area becomes a single column.
- Colors and visual tokens: passed. Paper, ink, muted gray, cinnabar progress/attention, and slate-blue focus outline reuse the homepage token logic. There are no rounded generic cards, gradients, glass effects, or decorative shadows beyond the existing small offset account panel.
- Image quality and asset fidelity: passed. This screen has no raster content requirement. Functional icons come from the project's existing Lucide outline family and match the approved source's icon treatment.
- Copy and content: passed. Learner progress remains visibly identified as demo data. The now-supplied textbook, instructor slides/review sheet, school white book, and historical TCM paper are presented with distinct provenance; the unattached original nine-page instructor review, student answer-key confidence, and absent instructor rubric remain explicit gaps. The current offering's 100-point default is represented accurately without being promoted to a universal course rule.
- Icons: passed. Arrow, book, document, target, clock, close, check, and layer icons use consistent size and stroke weight; they align with labels and retain accessible text equivalents.
- Accessibility: passed. Navigation uses links where routes exist, filters and learning states use semantic buttons, selected states are visible, the session drawer exposes dialog semantics and an accessible title, the account menu exposes expanded state, focus-visible outlines are present, and reduced-motion preferences remove nonessential transitions.

## Interaction and runtime checks

- Homepage `课程` navigation opened `/courses/tcm-diagnostics`, and `本周` returned to the homepage.
- `本阶段` and `全学期` changed the chapter set from 4 to 9 items.
- Selecting `八纲辨证` updated the chapter summary, units, and progress.
- Selecting `输出` changed the task guidance from concept understanding to complete answer expression.
- Selecting `虚实辨证` updated the active learning target.
- `安排本次学习` opened the 45-minute session drawer; `确认并开始` produced the ready state; `返回课程工作台` closed it.
- The learning account control opened and closed with a visible identity panel.
- Responsive behavior was visually inspected below the 900px and 700px CSS breakpoints using browser scaling; the header moved to two rows, supporting content reflowed, and the chapter list became horizontally scrollable without page-level horizontal overflow.
- Next.js Dev Tools reported a static route with Turbopack enabled and showed no runtime error overlay. `npm run check` passed lint, TypeScript, and the production build.

## Data-driven course-engine regression pass

On 2026-07-15, the course workspace was retested after moving course truth and demo learner state out of the React component into the typed course engine.

- The default state remained `本阶段 → 问诊 → 理解 → 问饮食口味`, with four stage chapters and the same visible course, progress, material, exam, and session information.
- `全学期` displayed all nine chapters; selecting `八纲辨证`, `输出`, and `虚实辨证` updated the chapter, task guidance, and selected target correctly.
- The 45-minute drawer opened for the selected unit, retained the 12/15/18-minute plan, entered the ready state, and returned to the workspace.
- The course account menu opened and closed, and navigation between the homepage and course workspace worked in both directions.
- Homepage regression coverage included the four-step reasoning progression, weekly-plan drawer, and editable-profile panel.
- Safari browser scaling reduced the effective CSS viewport below 700px; the two-row header and single-column responsive layout remained intact without a page-level horizontal overflow regression.
- The data-driven course progress and exam-distribution bars retained the approved visual proportions while exposing semantic progress values to accessibility APIs.
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build. Both approved routes remained statically generated.
- The current browser run showed no runtime error overlay. Historical development-log errors occurred only while Fast Refresh briefly observed an intermediate prop signature and while the new registry intentionally rejected a duplicate knowledge-point slug; both were corrected before this pass.

## `问诊 · 问饮食口味` knowledge-point pass (historical pre-source pass)

On 2026-07-15, the first data-driven knowledge-point page was tested at `/courses/tcm-diagnostics/knowledge-points/diet-and-taste`.

- The course workspace retained its approved default state and 0/4 course-material status. Its 45-minute drawer kept the existing open and confirm behavior, then exposed a new `进入知识点学习` link only when the selected unit has an authored lesson.
- The knowledge-point route opened in the same warm paper, black rule, Songti display, restrained metadata, square-container, cinnabar, and slate-blue visual system. No homepage or workspace redesign was introduced.
- The default `取证` state displayed four evidence groups and twelve selectable prompts. Selecting one prompt from each group changed the evidence count from 0/12 to 4/12 and advanced the first learning milestone.
- `对照` rendered separate TCM and modern-medicine reasoning blocks, plus all three required relationship labels: `可关联`, `帮助理解`, and `不可直接等同`.
- `输出` accepted a free-text answer, exposed a four-part answer skeleton, and calculated the NUR platform self-score from five selectable two-point criteria. Both modern-medicine criteria contributed 4/10 to the platform score; the full rubric reached 10/10.
- `迁移` opened a case and toggled a four-step evidence-to-conclusion chain. Revealing the chain completed the local four-milestone progress display at 100%.
- The page account menu opened and linked back to the course workspace. Source links were exposed with accessible labels, while textbook, teacher slides, review scope, and past exams remained visibly pending.
- Homepage regression retesting confirmed the existing evidence-reasoning flow and weekly-plan bottom drawer. Course-workspace regression retesting confirmed its drawer and exact 100-point display.
- Safari accessibility output exposed semantic links, buttons, pressed states, text input, progress values, headings, account expansion state, and source-link labels. The current browser run showed no runtime error overlay.
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build. The new knowledge-point path was statically generated from `generateStaticParams`; the homepage and course workspace remained static.

## Source-calibration and personal exam-structure pass

On 2026-07-16, the supplied course materials and the new personal exam configuration were tested without changing the approved surface design.

- The workspace preserved `本阶段 → 问诊 → 理解 → 问饮食口味`, the 4/9 chapter filter behavior, chapter and learning-route switching, 45-minute session drawer, ready state, account menu, and homepage navigation.
- The course hero now shows 南京中医药大学、中西医结合临床、大一、2026 学年下学期. The material card shows 4/4 core categories with short traceable labels for the third-edition textbook, five instructor slide sets, instructor review sheet, and 2021–2022 TCM final.
- Copy explicitly retains three unresolved items: the original nine-page instructor final review has not been attached, the student choice-bank answers need question-level verification, and no real instructor subjective-answer rubric exists.
- B1 and B2 are rendered only as `B1 型题` and `B2 型题`; the UI does not claim unconfirmed multiple-choice or matching semantics.
- The personal exam drawer retained the square right-edge geometry, paper/ink palette, one-pixel rules, Songti display heading, restrained metadata, and black primary action. It is an extension of the approved session-drawer language rather than a workspace redesign.
- Browser interaction covered editing type names/counts/per-question points, adding `判断题`, removing B2, a visible 101-point mismatch notice, returning to 100 points, saving, reload persistence after client hydration, editing the saved plan, and restoring the course default.
- The saved personal plan changed only the exam card's displayed rows and total. Its notice stated that the plan is browser-local and does not rewrite the course default or historical papers.
- A real 390 × 844 viewport override confirmed no horizontal overflow in the exam editor; all seven default rows, add control, total summary, save action, and explanatory note remained reachable in the scrollable drawer.
- The sourced knowledge page showed six page references: textbook pages 60–61, instructor review page 2, the NUR structure, and three public clinical references. TCM content displayed the verified textbook/instructor state; modern medicine remained platform-scored; `可关联`, `帮助理解`, and `不可直接等同` remained visible.
- Answer input, modern-medicine rubric selection, case transfer, and reasoning-chain reveal still worked. The page states that the NUR rubric is not the instructor's real scoring standard.
- Homepage regression covered the evidence-first landing view and opening/closing the weekly-plan drawer. Course navigation worked in both directions.
- Next.js browser output exposed one existing smooth-scroll opt-in warning; `data-scroll-behavior="smooth"` was added to the root layout following the local Next.js 16 upgrade guide. The final DOM contains the marker and no current runtime error overlay appeared.
- Final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build; all three product routes remained static or statically generated.

## Findings

No actionable P0, P1, or P2 differences remain.

## Subjective-writing room pass

On 2026-07-18, the `问诊 · 问饮食口味` output area and the new nested subjective-writing route were tested as one vertical slice.

- The knowledge-point `输出` section retains its existing free-text exercise and NUR 10-point rubric, then adds one restrained square entry block into the dedicated writing room; no earlier section layout or interaction was replaced.
- The writing room carries forward the warm ivory paper, black editorial rules, Songti display headings, restrained metadata, square panels, cinnabar progress, and slate-blue modern-medicine semantics. The three-column desktop composition remains recognizably part of the approved course system rather than a new visual direction.
- The default term task clearly separates its NUR-adapted prompt, school-white-book source candidates, NUR answer structure, answer-confidence state, NUR rubric, and the still-missing teacher scoring standard.
- Browser interaction covered a first draft, revealing the source-cross-checked NUR structure, selecting one and all rubric criteria, reaching 6/6 self-check, writing a focused revision, and reaching 100% local progress.
- Switching to the short-answer task preserved the term state and exposed separate 4/10 TCM, 4/10 modern-medicine, and 2/10 relationship-boundary criteria. The interface did not claim that this 10-point training structure is the current offering's per-question allocation or the teacher's rubric.
- The two exact school-white-book fill-in prompts remain visibly answer-missing; neither is rendered as a standard answer or included in the writing-room score.
- The account menu and course/home navigation opened correctly. The knowledge-point entry link navigated to the statically generated nested route.
- Safari scaling crossed both the 980px and 760px CSS breakpoints: navigation and secondary account text collapsed as designed, the hero and writing desk stacked, the right rail moved below the task, and no page-level horizontal overflow appeared.
- Regression coverage confirmed the promotional homepage headline and hidden `你好，成绩将飞速提升` message, its `/learn` entry, the `/learn` weekly-plan drawer, course stage/all/weak filters, the browser-local exam editor, course account menu, and the existing knowledge-point output section.
- The development server showed successful responses for all five routes and no runtime error overlay. Final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build; the new writing route was statically generated from `generateStaticParams`.

## Promotional-home restoration pass

On 2026-07-17, the prior interactive promotional homepage was recovered from its exact local Next.js development source map and restored at `/`.

- The recovered source contains the original pointer-following circular reveal, repeated `Nur learn` foreground texture, shuffled medical-course hidden texture, account/avatar panel, and exact `你好，成绩将飞速提升` hidden message.
- The upper-left `NUR LEARN` brand is now the direct entry to `/learn`; its appearance and header geometry are unchanged.
- The approved evidence-first weekly learning homepage was not redesigned or removed; it now renders unchanged at `/learn`.
- Course-workspace and knowledge-point links labeled `本周` or `本周学习` were redirected to `/learn` so their learning-flow behavior remains intact.
- No course definitions, learner state, exam configuration, knowledge-point content, CSS Modules, or existing product interactions were changed.
- Static response checks confirmed the promotional headline and hidden message at `/`, and `从证据开始辨证` at `/learn`.
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build. The build output includes static `/` and `/learn` routes while preserving the existing course and statically generated knowledge-point routes.

## Case-reasoning room pass

On 2026-07-18, the first `问诊 · 问饮食口味` case-reasoning room was added as the next narrow vertical-slice extension.

- The new route preserves the approved editorial system: warm ivory paper, black rules, Songti headings, muted cinnabar attention state, slate-blue evidence/modern-medicine semantics, square containers, and pale `REASON` ghost type. The Safari capture shows no generic dashboard/card redesign.
- The hero identifies the surface as NUR training rather than a school original, teacher rubric, or clinical diagnosis. The case prompt, answer structure, self-check, and source rail keep their authority labels visible at all times.
- The learner-facing chain is organized as `证据分组 → 病机与评估方向 → 暂定辨证结论 → 鉴别排除与边界`. The accessible route exposes semantic stage tabs, pressed evidence controls, a labelled draft field, a disabled-before-draft structure-reference action, a disabled-before-reference self-check, progress, and a bounded repair area.
- The default viewport was visually inspected in Safari. It retains a coherent hierarchy from hero through four-step rail, case stem, evidence selection, source-cross-checked framework, and diagnostic/source rail without clipping or page-level horizontal overflow.
- Local HTTP regression returned 200 for `/`, `/learn`, `/courses/tcm-diagnostics`, the knowledge-point route, subjective-writing route, and the new case-reasoning route. Static response content included `案例推理训练室`, `两组线索不能合成一个结论`, and the NUR training notice.
- The local computer-use bridge did not reliably dispatch browser text-input events, so the full manual draft → reveal → self-check → repair sequence is recorded as a pending follow-up rather than claimed as passed. Build-time validation, static generation, visual inspection, and semantic-control inspection all passed.
- `npm run check` passed ESLint, strict TypeScript, and Next.js 16.2.1 production build. The output statically generated the new case route.

## Browser-local learning-memory and bounded local Agent pass

On 2026-07-18, the same `问饮食口味` writing/case slice received its first validated confirmed-attempt memory, 48-hour return loop, provider-neutral Agent boundary, and a bounded deterministic Agent runtime. This pass used the Codex in-app browser with reliable Playwright-backed text input.

- The new A/B and return surfaces preserve the approved visual system: ivory paper, black hairline rules, square panels, Songti headings, restrained cinnabar for missing/action states, and slate blue for bounded context. They extend the writing/case composition without changing `/`, `/learn`, the course workspace, or the knowledge-point page.
- An under-length term answer could immediately start self-check and expose the full deterministic structural omissions. `改正` remained collapsed until clicked and then revealed only the authored NUR replacement sentence. A long short answer activated A automatically and updated while writing.
- Only explicit `完成自核并确认保存` created history. The first confirmation offered B; B then showed an approximately 80-character original-answer excerpt, expanded to the full learner prose, and persisted after reload. Draft and automatic feedback text did not appear as history records.
- A repeated omission stayed informal after the term and short-answer tasks, then became formal only after a third distinct case-stage confirmation. The proposal appeared immediately, `暂不加入` suppressed it, a later still-missing confirmation reopened it, and `加入计划` produced a due time exactly 48 hours after acceptance.
- A later improved case-stage answer, self-check, and explicit confirmation resolved and completed the accepted task without opening `改正`. The same test also closed the previous case-room QA gap: draft input, evidence-stage framework reveal, criterion self-check, focused mechanism repair, confirmation, stage advance, and 50% progress all worked in the browser.
- Responsive inspection at 390 × 844 covered the confirmation block, A/B preference panel, B confirmed history, and accepted 48-hour task. `documentElement.scrollWidth` equaled the 390px client width; no horizontal overflow or clipped control was found.
- The Agent card appears only as an on-demand second layer after self-check. Its visible boundary denies terminal, arbitrary file, web-search, course-mutation, clinical-diagnosis, and instructor-grading permissions. Without a server credential, writing and case still ran the local deterministic policy and displayed an inspectable four-step trace, waiting/completed state, exactly one next action, sources, authority, and a clear no-external-model data notice.
- Agent API smoke checks returned 200 with `agentRuntimeAvailable: true` and `configured: false`, 400 for invalid input, and 200 `agent-result` for valid incomplete, structurally complete, on-demand rewrite, previous-run, confirmed-history, writing, and case requests. No external model request was made and no fake model output was rendered.
- Six-route browser regression passed: promotional circular reveal, `/learn` weekly-plan drawer, course all-term/output/session-ready interactions, knowledge-point evidence/relationship/output/transfer interactions, writing confirmed history, and case repair. All six routes also returned HTTP 200, and the browser warning/error log was empty.
- Key desktop evidence: `subjective-writing-learning-assistance.png`, `subjective-writing-confirmed-history.png`, `case-reasoning-learning-memory-accepted.png`, and `nur-agent-local-runtime.png`.
- Key responsive evidence: `subjective-writing-learning-memory-mobile.png`, `subjective-writing-learning-memory-panel-mobile.png`, `subjective-writing-confirmed-history-mobile.png`, and `nur-agent-local-runtime-mobile.png`.
- Final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build. The six product routes remain static or statically generated, and `/api/nur-agent` is the single new dynamic Route Handler.

## Course selection and direct-training entry pass

On 2026-07-18, the course workspace received a focused usability repair without changing its approved visual direction or adding routes.

- Clicking any visible learning unit now produces a distinct cinnabar selection rail, `当前选择` label, and `aria-pressed` state. The black check remains exclusively `已完成学习`; the inline legend makes the distinction visible, and selecting a completed unit preserves both signals.
- Missing authored content is described as `内容尚未建设 / 任务尚未开放`, not the actionable-sounding `待接入`. Both planning and direct-start actions are disabled for such a unit, so the interface no longer invites an impossible connection attempt.
- The black `安排本次学习` control still opens the optional 45-minute plan. The cinnabar control is now a real route link that directly starts the selected available `理解 / 输出 / 应用` task; unavailable demo units show a disabled, honest notice.
- Selecting `输出` for `问饮食口味` produced a direct writing-room href. Confirming the optional plan produced the same route-aware writing-room handoff rather than resetting to understanding.
- The right rail exposes persistent `写作训练室` and `案例推理室` shortcuts. Both were followed to their existing real routes; no placeholder destination was created.
- Desktop and 390 × 844 captures preserve the ivory/ink editorial system and square controls. Mobile `documentElement.scrollWidth` equaled its 390px client width.
- A clean development-server restart removed the expected Fast Refresh intermediate mismatch; the final clean load and interaction run had no browser warning/error logs.
- Evidence: `course-workspace-direct-training.jpeg` and `course-workspace-direct-training-mobile.jpeg`.

## Course Builder known-pack pass

On 2026-07-18, `/learn/course-builder` added the first evidence-gated material-to-course workbench without replacing the approved `/learn` homepage or TCM course workspace.

- The new route preserves the approved warm-ivory paper, black editorial rules, Songti display hierarchy, square controls, muted cinnabar review states, and slate-blue completed/verified semantics. The desktop composition uses a restrained fixed input rail and a wide typed-draft review surface rather than a generic chat interface.
- With no `DASHSCOPE_API_KEY`, the initial state clearly reports `DashScope 尚未配置`. Provider-preferred mode still completed through the reproducible local baseline and rendered `本地基准 · 未发送云端`; no Qwen result was claimed.
- The result exposed the complete nine-chapter/39-knowledge-point course skeleton, one deep lesson, four assessment candidates, two pending answers, four review issues, and zero blocking issues. It also rendered the five-step build trace and all 14 source decisions.
- Opening the source ledger produced exactly 14 decision rows. Pending teacher sources remained review-only; the UI did not turn missing final-review pages or a missing teacher rubric into generated facts.
- All three approval checkboxes were required before `批准为本地预览` became enabled. Approval produced `已批准为本地预览`, disabled repeat approval, and remained explicitly limited to browser-local preview rather than server publication.
- The complete draft export is rendered as a standard link with the expected `tcm-diagnostics-course-draft.json` download name. The in-app browser did not surface a download event for the data-URL link; the link, filename, unchanged page URL, and empty error log were verified, but event-level download capture is not claimed.
- Desktop QA at 1440 × 1000 reported `scrollWidth === clientWidth === 1440`. Mobile QA at 390 × 844 reported `scrollWidth === clientWidth === 390`; the hero, material selector, metrics, stacked build trace, course map, review gates, and approval controls remained within the viewport.
- API smoke checks confirmed `configured: false`, default model `qwen3.7-plus`, one allow-listed material pack, and HTTP 200 valid drafts for both baseline-only and provider-preferred no-key requests. The known fixture returned nine chapters, 39 knowledge points, a valid course definition, and four explicit review issues.
- Browser warning/error logs were empty. Lint, strict TypeScript, and the production build passed during implementation; the final documentation-synced `npm run check` also passed.
- Evidence: `docs/design-references/course-builder-result-2026-07-18.png`, `docs/design-references/course-builder-mobile-top-2026-07-18.png`, and `docs/design-references/course-builder-mobile-result-2026-07-18.png`.

## Course Builder live DashScope pass

On 2026-07-19, the user supplied an Alibaba Cloud Model Studio default-workspace credential CSV and explicitly placed it in scope for the selected Course Builder provider.

- The credential was parsed without printing its value and written only to ignored `.env.local` with filesystem mode `600`. Git status, browser DOM, screenshots, API summaries, and project documentation contain no secret value.
- The CSV's workspace-specific OpenAI-compatible base was required; the adapter now supports `DASHSCOPE_BASE_URL` while rejecting non-HTTPS or non-`aliyuncs.com` hosts.
- A read-only `/models` request returned HTTP 200 with 229 model IDs and confirmed exact `qwen3.7-plus` availability.
- Two real provider-preferred builds returned HTTP 200 and `providerAssist.status: used` with `dashscope · qwen3.7-plus`. Both plans were recompiled and passed local course/material validation with zero blocking issues and the same four known review gates.
- The live browser state changed from `DashScope 尚未配置` to `DashScope 已就绪`; the selected mode showed `qwen3.7-plus 已配置`, and the result header showed `dashscope · qwen3.7-plus`.
- The live plan did not promote the pending final-review source or missing teacher rubric, did not create source answers, and did not expand the current one-of-39 deep-lesson coverage beyond the locally authored evidence boundary.
- At 1440 × 1000, `scrollWidth === clientWidth === 1440`. Browser warning/error logs were empty.
- Evidence: `docs/design-references/course-builder-qwen-live-2026-07-19.png`.

## Private-material intake gate pass

On 2026-07-19, `/learn/course-builder` received the first bounded browser-local private-material intake and review area. It sits before the existing known-pack builder and does not create a new route, CMS shell, or publication surface.

- The intake keeps the approved warm-ivory paper, black editorial rules, Songti headings, square inputs, muted cinnabar attention states, and slate-blue local/confirmed states. The desktop two-column intake becomes a single readable column below 1050px and then a one-column form below 560px.
- Initial inspection confirmed the intended conservative defaults: `learner-private`, privacy `待确认`, document-metadata risk, `local-only`, `browser-memory-only`, and model transfer `not-authorized`. The interface exposes `0 B 发送模型` and does not present a file as parsed.
- Browser file testing used synthetic fixtures created only for QA. One small PDF received a local SHA-256 and rendered `待解析 · ocr-pending · pending-review`. Two byte-identical PDFs produced `1 新候选 · 1 重复` plus `批次内重复`, and the intake gate remained disabled.
- A synthetic 26 MiB PDF was rejected against the 25 MiB per-file boundary; a synthetic ZIP was rejected as unsupported. The batch summary showed two rejected files and no eligible candidates. No original learning material was selected, copied, changed, or exposed.
- Course, source type, declared teacher authority, school, teacher, academic year, semester, same-family relation, family label, privacy declaration, and publication policy were completed. Declared teacher authority remained visibly `待复核`; the layer stayed `learner-private`.
- All four human confirmations were required before `确认并通过 intake gate` became enabled. The passed state explicitly said the structured record was not yet a `CourseBuildRequest`, model request, registry write, or publication.
- Reload restoration passed: the filename/SHA candidate, provenance values, privacy state, four checked confirmations, and `INTAKE GATE PASSED` returned from validated browser-local storage while no binary was persisted.
- At 1440 × 1000, `clientWidth === scrollWidth === 1440`; at 390 × 844, `clientWidth === scrollWidth === 390`. The desktop and mobile captures show no generic rounded-card redesign, clipped control, or page-level horizontal overflow.
- Browser warning/error logs were empty. A targeted contract pass covered empty, normal, catalog-duplicate, confirmed, and restored records. Final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build. A baseline-only Course Builder regression returned HTTP 200, provider assist `skipped`, 9 chapters, 39 knowledge points, 0 blocking, and 4 review issues.
- Evidence: `docs/design-references/material-intake-passed-2026-07-19.png`, `docs/design-references/material-intake-mobile-top-2026-07-19.png`, and `docs/design-references/material-intake-passed-mobile-2026-07-19.png`.

## Reversible private-material list follow-up

On 2026-07-19, the intake received a focused usability follow-up after review exposed two P0 flow gaps: the candidate list had no reversible removal, and the post-selection result did not make the identity-only milestone sufficiently visible.

- New file selections append to the current batch instead of replacing it. The synthetic QA flow retained an existing candidate while adding a second candidate, and two byte-identical appended PDFs still produced one batch duplicate.
- Every accepted candidate now has an accessible `删除 {filename}` button; rejected records have a separately labeled removal control. `清空批次` removes the whole local batch.
- Candidate deletion and whole-batch clear both reset the identity-review status and expose a one-step `撤销`. Undo restored the prior structured batch, four review confirmations, eligible status, and any current-session file handles.
- Deleting the first copy of a batch duplicate re-normalizes the remaining candidate instead of leaving it falsely marked as duplicate.
- A four-stage rail now reads `文件身份 → 来源边界 → 人工审核 → 内容解析`. The final stage remains `尚未接入 · 不会自动开始`; the passed state now says `身份审核完成 · 内容尚未解析` rather than implying a course build happened.
- Current-session files expose `原文件在当前会话可用`. A refreshed structured record exposes `原文件需重新选择后才能解析`; no binary is restored from browser storage.
- File-selection and undo notices use polite live regions. Delete/clear/undo controls keep visible keyboard focus outlines and meaningful accessible names.
- Desktop 1440 × 1000 and mobile 390 × 844 both reported `scrollWidth === clientWidth`. The mobile progress rail stacks cleanly, and the file action row remains inside the page without clipping.
- Browser testing used only the prior synthetic PDF fixtures. No original material content, private filename, API key, model call, or registry write entered the accepted captures.
- Evidence: `docs/design-references/material-intake-reversible-2026-07-19.png`, `docs/design-references/material-intake-reversible-mobile-2026-07-19.png`, and `docs/design-references/material-intake-reversible-mobile-list-2026-07-19.png`.

## Comparison history

- Pass 1: no P0/P1/P2 findings. The approved visual source, default workspace, session drawer, ready confirmation, responsive state, and combined comparison board were all opened and inspected together. No post-comparison visual fixes were required.
- Pass 2: no P0/P1/P2 findings after the data-driven course-engine refactor. The new default and session captures were compared with the approved browser evidence; no intentional redesign or corrective visual change was required.
- Pass 3: no P0/P1/P2 findings for the first knowledge-point page. Evidence, dual-lens, answer/score, case reveal, source honesty, workspace entry, account, homepage, and build regressions passed.
- Pass 4: no P0/P1/P2 findings after real-source calibration and the personal exam editor. Desktop, 390 × 844 responsive layout, local save/reload/restore behavior, source authority boundaries, and all three existing routes passed regression testing.
- Pass 5: no P0/P1/P2 findings for the subjective-writing room. Draft/reveal/self-check/rewrite, task switching, source and scoring-authority boundaries, desktop/responsive states, and all five product routes passed regression testing.
- Pass 6: no visual P0/P1/P2 findings for the case-reasoning room default state, source/authority boundaries, route rendering, or semantic controls. Its then-pending manual sequence was closed in Pass 7.
- Pass 7: no P0/P1/P2 findings for confirmed-attempt memory, A/B preferences, three-task repeated omission, decline/re-prompt, 48-hour accept/complete, mobile reflow, complete case input/repair, or the original Agent boundary. No model output was claimed.
- Pass 8: no P0/P1/P2 findings for the local Agent's four-step trace, incomplete/completed stop states, one-action handoff, on-demand rewrite, run lineage, confirmed-history comparison, case-stage use, or 390 × 844 reflow. Six-route regression passed and browser warning/error logs were empty.
- Pass 9: no P0/P1/P2 findings for separated completion/selection semantics, honest unavailable state, route-aware direct start, optional session planning, persistent writing/case shortcuts, clean hydration, or 390 × 844 reflow. Evidence also includes `course-workspace-state-semantics.jpeg`.
- Pass 10: no P0/P1/P2 findings for the material contract, `western-primary` physiology knowledge/writing routes, non-case transfer, answer/scoring separation, original six-route regression, empty browser error log, or 390 × 844 reflow.
- Pass 11: no P0/P1/P2 findings for the known-pack Course Builder, honest no-key fallback, complete typed draft, five-step trace, source-review ledger, human approval gate, desktop/mobile reflow, or browser error log. The in-app browser's missing download event remains a documented verification limitation, not a visual or runtime error.
- Pass 12: no P0/P1/P2 findings for workspace-specific DashScope configuration, exact `qwen3.7-plus` discovery, two real provider runs, local revalidation, visible live-provider status, 1440 × 1000 layout, or browser error log. Secret handling remained server-only and Git-ignored.
- Pass 13: no P0/P1/P2 findings for bounded file selection, local SHA identity, batch duplication, type/size rejection, privacy/authority defaults, four-part intake approval, refresh restoration, desktop/mobile reflow, or browser error logs. Passing intake did not call the model or mutate course/material truth.
- Pass 14: the two P0 usability findings from the first intake review are closed. Append, candidate/rejection removal, clear, undo, review invalidation, duplicate re-normalization, session-file messaging, four-stage progress, and desktop/mobile reflow passed with synthetic fixtures only; no P0/P1/P2 visual regression remains in this bounded follow-up.
- Pass 15: the DOCX-only parsing pilot is implemented and has passed static, production-build, HTTP-render, and synthetic parser verification. New browser interaction, console, screenshot, and responsive-overflow assertions remain pending; Pass 13/14 evidence must not be reused to claim the new parser UI was visually verified.
- Pass 16: section-first review, deterministic noise candidates, current-session overlay approval/withdrawal, and private-pack selector wiring are implemented. Zero-warning lint, strict TypeScript, HTTP rendering, and a clean final development request/compile log passed; direct browser interaction and responsive screenshots remain pending.
- Pass 17: the Pass 15/16 browser gaps are closed with a synthetic-only DOCX flow. Exact-SHA reauthorization, parse consent, global review, individual editing, overlay auto-selection, intake invalidation, refresh memory loss, one-time transfer review, real `qwen3.7-plus` private build, per-excerpt decisions, deterministic revalidation, and local-only human approval passed. Warning/error logs were empty; 1440 × 1000 and 390 × 844 had no horizontal overflow and no P0/P1/P2 visual finding.
- Pass 18: no P0/P1/P2 findings for the evidence-gated material-admission record. Synthetic-only candidate creation, full identity/provenance/excerpt/locator review, conflict disposition, eight-part approval, strict browser-local recovery, encoded JSON package validation, preserved Builder separation, empty warning/error logs, and 1440 × 1000 / 390 × 844 reflow all passed. The data-URL download event itself was not surfaced by the in-app browser and is not claimed.
- Pass 19: no P0/P1/P2 findings for the five added TCM knowledge/writing loops or the synthetic spleen case. All eleven new route instances rendered at 390 × 844 with `scrollWidth = clientWidth = 390`; desktop lesson, writing, and case interactions passed; missing school answers stayed visibly unscored; reusable inquiry-only copy was corrected; browser warning/error logs were empty.
- Pass 20: the official 《中医诊断学》 material pack v1 changed typed material data, validators, deterministic compilation, and CourseDraft JSON only. No React component, route, CSS, rendered copy, or visible interaction changed, so no new browser screenshot or visual pass was claimed. The baseline-only API regression returned 9 included / 2 excluded, 39/39 covered-or-pending, 10/15/14 tiers, six preserved authored loops, pack blocking 0, and overall blocking 0. Final `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build.
- Pass 21: no P0/P1/P2 finding for base-pack-independent private analysis. A synthetic 21-excerpt physiology DOCX completed the exact manifest, one-use authorization, visible running state, real `qwen3.7-plus` Function Call, partial-unit result, three answer views, JSON export, and same-tab result restoration. The final 390px run returned 20 questions plus one title `unmapped`; desktop and mobile captures show no visible horizontal clipping, browser warning/error logs were empty, and final `npm run check` passed all 23 generated pages.

## Private material analysis — synthetic desktop/mobile pass

On 2026-07-19, the Course Builder's private path was changed from “official base + overlay compilation” to “analyze first, compile later.” Browser QA used only `/tmp/nur-private-analysis-qa.GyWEqo/20-short-answers.docx`, a generated DOCX with one title and 20 synthetic physiology short-answer prompts. No original learning file, local path, filename, full SHA, credential, or unaccepted content appears in the accepted result screenshots.

- The workbench visibly states `生理学 · 私人材料分析` and `分析阶段不需要` an official pack. The exact manifest showed 21/80 excerpts and 405/40,000 characters, the fixed physiology course/knowledge-point target, accepted text/IDs/locators, and the raw-file/filename/path/handle/full-SHA/pending-content/image/OCR/API-key exclusions.
- The action changed immediately to `Qwen 正在分析私人材料`; provider/validation failures appeared in a visible alert, stated that the one-use authorization was consumed, and required a new explicit authorization. No click ended in a silent return.
- The successful result rendered `PRIVATE · PARTIAL` and `INSUFFICIENT FOR FULL COURSE`, four candidate topics, 20 normalized questions, one deterministic heading `unmapped`, exact source locators, `sourceAnswerStatus: missing`, `scoringAuthority: not-provided`, and all four non-grants.
- Every question used `NUR / Qwen 生成参考答案 · 尚无来源标准答案`. All 20 concise/exam/expanded controls were present; switching the first item to concise and expanded changed the pressed state, and expanded showed the locally constructed answer structure and uncertainty note.
- At desktop width, the result preserved the established split workbench, warm paper, black one-pixel grid, Songti question heading, slate-blue authority panel, and square controls. The first answer card remained legible beside the exact-transfer ledger.
- At a fresh 390 × 844 layout, the result header and actions reflowed into one column. The first question card, authority panel, three equal-width answer buttons, expanded answer, structure list, and red uncertainty note remained within the 390px capture without visible horizontal clipping. This pass makes a visual overflow assertion; a numeric CDP `scrollWidth` reading was unavailable in the in-app browser and is not fabricated.
- Reload in the same tab restored the validated `private-current-session` result from `sessionStorage` while raw file access, parser draft, and overlay disappeared. Browser warning/error logs were empty before and after reload.
- The encoded analysis JSON was parsed without triggering a download event: provider `dashscope / qwen3.7-plus`, 21 excerpts / 405 characters, 20 questions, one unmapped item, `partial / insufficient-for-full-course`, all source answers missing, all generated answers `nur-qwen-generated`, all three variants non-empty, and publication/catalog/registry/official-compilation rights all `not-authorized`.

## Official TCM material pack v1 — non-visual contract pass

On 2026-07-19, the course-wide pack was implemented behind the existing Course Builder boundary without adding a route or changing the workbench's rendered trace, source-count summary, controls, or styles.

- The manifest reuses the shared asset/family/artifact catalog for nine included sources and keeps both Western Diagnostics papers explicitly excluded and local-only.
- The evidence matrix covers every one of the 39 registered knowledge-point IDs, including explicit pending states for missing answers, unreviewed OCR, the absent nine-page teacher review, and the teacher rubric.
- Deterministic compilation preserves all six existing authored loops and emits one draft target for every knowledge point; no route-specific React was generated.
- The baseline-only API run completed with zero pack and overall blocking issues. It skipped provider/model use and retained all publication, catalog, and registry non-grants.
- Because no visible UI state changed, the existing Pass 19 desktop/mobile/browser-log evidence remains the latest visual evidence; it is not relabeled as a pack screenshot.

## Five evidence-anchored TCM loops pass

On 2026-07-19, five existing demo knowledge points were upgraded in place using the supplied textbook, teacher review scope, school question source, historical TCM final, and spleen slide provenance. Original binaries remained outside the application and accepted screenshots contain only a synthetic spleen case.

- `望舌苔`, `问寒热`, `常见病脉`, `表里辨证`, and `脾胃病辨证` each rendered four learning stages, six evidence prompts, two explicitly separated reasoning lenses, three relationship labels, a NUR practice rubric, and a transfer destination.
- Each point rendered a dedicated writing room with a source-cross-checked NUR answer and NUR-only scoring. Four exact school prompts with no supplied answer appeared in a separate `答案未提供` ledger and did not receive scoring.
- The spleen loop rendered a synthetic case with five evidence cards, all four reasoning stages, NUR scoring, pending teacher grading, and an explicit non-clinical boundary. Evidence selection, draft entry, and current-answer assistance updated correctly.
- The first visual pass found three reusable-copy remnants from the original inquiry slice: `问诊证据`, a fixed `问饮食口味` writing description, and a fixed case-path accessible label. They were corrected to `关键证据` or the active knowledge-point title and reverified.
- All five lesson pages, all five writing rooms, and the spleen case reported no horizontal overflow at 390 × 844. Desktop 1440 × 1000 also reported no overflow. Browser warning/error logs were empty.
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build. Static generation includes the five added knowledge and writing paths plus the spleen case path.
- Evidence: `docs/design-references/tcm-deep-loop-spleen-case-desktop-2026-07-19.png` and `docs/design-references/tcm-deep-loop-spleen-case-mobile-2026-07-19.png`.

## DOCX local parsing pilot — static and synthetic pass

On 2026-07-19, the fourth intake gate received a deliberately narrow `.docx` path. It rechecks the eligible candidate's byte size and SHA-256, requires a separate browser-local parsing authorization, extracts a bounded semantic-block draft in memory, exposes edit/accept/exclude/reset controls, and shows a preview-only mapping to an existing course knowledge point.

- The UI follows the existing editorial system: warm ivory, black rules, square fields, Songti display headings, cinnabar attention/mismatch states, and slate-blue local/accepted states. CSS includes two-column desktop, one-column gate/mobile, 4→2→1 metric, 4→2→1 delta, and 2→1 target-field breakpoints.
- No raw parser HTML is rendered. The parser extracts text through `DOMParser`; embedded image contents are ignored, revision/comment state remains review-pending, and empty edited blocks cannot be accepted.
- The course delta is visibly labeled `PREVIEW ONLY` and reports zero verified facts, zero registry writes, and zero model requests. It cannot change `CourseDefinition`, the material catalog, local publication state, or the known-pack Course Builder request.
- A synthetic DOCX generated under `/tmp` contained headings, paragraphs, and a two-cell table. Mammoth recovered all four required test values. No original learning material or private filename entered the test.
- `npm run typecheck`, `npm run lint`, and `npm run build` passed. `/learn/course-builder` returned HTTP 200 from the restarted local development server, whose request log showed no warning/error.
- The available in-app browser control could not acquire the already-open localhost tab in this implementation session. Therefore no new screenshot, browser-console assertion, normal/mismatched reauthorization click-through, refresh-memory-loss check, or 1440 × 1000 / 390 × 844 overflow result is claimed yet. This is the remaining acceptance work for this visible increment.

## Section-first review and private-overlay selector bridge

On 2026-07-19, the DOCX review was changed from a long flat block list into progressive disclosure and connected to the Course Builder's visible input state without crossing the model boundary.

- Parsed headings create collapsed section cards; unheaded content is split every 24 blocks. Each card exposes counts before expansion plus section-level accept-non-noise, exclude, and restore actions. Individual textareas appear only after the learner expands a section.
- Global controls accept all non-noise pending blocks, exclude deterministic noise candidates, restore everything, or filter to pending, accepted, modified, or noise views. Noise detection is intentionally limited to empty/short, page-number, symbol-only, and exact-duplicate forms and never silently changes a decision.
- A separate checkbox and primary action create a typed, current-session `ReviewedMaterialOverlayDraft` from accepted non-empty excerpts. It retains DOCX locators, section mapping, target knowledge point, learner-private provenance, pending authority, and `modelTransfer: not-authorized`.
- Approval automatically adds and selects an `official base + private enhancement` option in the material selector. The input summary shows official-source, section, excerpt, target, and authority facts; mode controls and compilation remain disabled under `等待模型传输授权`.
- The overlay can be withdrawn from either surface, is invalidated if the eligible intake changes, and disappears on refresh. No extracted text is persisted.
- During hot-reload wiring, the already-open page briefly received an undefined new prop and reported a runtime error. The completed parent contract plus a defensive empty default fixed it; subsequent compilation and HTTP requests were clean. This transient development error is not concealed, but a reset browser-console pass is still required before claiming final browser-error acceptance.
- No new screenshot is claimed. Desktop/mobile CSS was authored for toolbar stacking, summary reflow, section-action indentation removal, overlay-card reflow, and pack-summary wrapping, but 1440 × 1000 and 390 × 844 must still be measured in the browser.

## One-time private transfer and constrained Course Builder pass

On 2026-07-19, a second independent gate was added between the approved current-session overlay and DashScope. Browser and API verification used only a synthetic DOCX created under `/tmp`; no original learning material or private source file was selected, opened, or captured.

- The workbench shows `Qwen3.7 Plus 已就绪`, then requires `检查并授权发送 6 条已接纳摘录`. The manifest visibly lists all accepted text, excerpt IDs, DOCX locators, `course-tcm-diagnostics`, `kp-inquiry-diet-taste`, `study-note`, `learner-private`, and `pending-review`.
- The same panel explicitly excludes the raw DOCX, filename, path, `File` handle, full SHA, pending/excluded blocks, image/OCR originals, API key, unrelated course content, and unrelated personal metadata.
- Consent binds the exact six excerpts / 161 characters to DashScope `qwen3.7-plus` for one `one-course-build`. The UI consumes the authorization before the call; both success and failure require a new manifest confirmation.
- Strict request checks rejected missing authorization, invalid privacy, 81 excerpts, authorization/digest mismatch, and replay. Isolated provider-unavailable and fake-key failure runs returned honest 503/502 responses with no draft, no retry, and no known-pack baseline substitution.
- The real provider result reported `provider status: used · dashscope · qwen3.7-plus`, returned one decision for each of the six known excerpt IDs, and left all six at `review`. The compiled output is visibly `PRIVATE COURSE DRAFT · 非官方发布`, retains `learner-private · authority pending-review`, preserves nine chapters / 39 knowledge points, passes hard validation with zero blocking issues, and exposes five review issues including private-authority review.
- All three existing human-review confirmations were required before `已批准为本地预览`; the page states that neither model output nor approval writes course truth, the material catalog, or publication state.
- The browser flow also closed the earlier DOCX QA gaps: matching SHA reauthorization, explicit local parsing authorization, global non-noise acceptance, deterministic page-number exclusion, knowledge-point selection, scoped block editing, overlay auto-selection, provenance-change invalidation, refresh erasure of extracted text/overlay, and reauthorization after refresh all passed.
- Browser warning/error logs were empty. At 1440 × 1000, `scrollWidth = clientWidth = 1440`; at 390 × 844, `scrollWidth = clientWidth = 390`. The square editorial layout reflowed without clipped controls or horizontal scrolling.
- Evidence: `docs/design-references/course-builder-private-overlay-authorized-2026-07-19.png` and `docs/design-references/course-builder-private-overlay-authorized-mobile-2026-07-19.png`.

## Evidence-gated material admission pass

On 2026-07-19, the approved DOCX overlay gained a separate admission review whose only durable result is a strict, versioned browser-local candidate record plus an auditable JSON package. The full browser flow used one synthetic DOCX generated outside the repository; no original learning material was opened or captured.

- The candidate appeared only after the DOCX's 14 semantic blocks were explicitly accepted and its current-session overlay approved. It displayed the full 64-character SHA-256, official DOCX MIME, 37,562-byte size, structured school/year/semester declaration, source family/artifact relation, accepted transcription, and one `DOCX 语义块` locator per excerpt.
- Conflict disposition and eight explicit reviews were required before the action enabled. The pending candidate was labeled `PENDING · NOT STORED`; approval changed it to `approved-as-local-candidate` and added one item to the recovered-record ledger.
- The identity, provenance, transcript, privacy/publication, source-family/artifact, conflict, authority, and non-grant ledgers remained visually distinct within the existing warm-ivory, black-rule, square editorial system.
- The encoded export package was parsed directly and passed strict validation: version/kind/status, full SHA, MIME/size, 14 excerpts/locators, empty path aliases, absent original filename and `lastModified`, all five use rights `not-authorized`, and all export grants false.
- Reload restored the approved record after hydration but erased the raw file, parser draft, overlay, and pending candidate. The material selector returned to the official base only; reselecting the exact synthetic file reproduced its SHA and showed the previously approved admission without granting Builder or model-transfer use.
- Browser warning/error logs were empty. At 1440 × 1000, `scrollWidth = clientWidth = 1440`; at 390 × 844, `scrollWidth = clientWidth = 390`. Long MIME and SHA values wrapped without clipping, and the four-column identity grid reflowed to a single mobile column.
- The standards-based JSON link and filename were present and the package itself was verified. The in-app browser timed out waiting for a data-URL download event, so no event-level download capture is claimed.
- Evidence: `docs/design-references/material-admission-approved-2026-07-19.png` and `docs/design-references/material-admission-approved-mobile-2026-07-19.png`.

## Read-only material-intake documentation pass

On 2026-07-18, the project received a documentation-only source-audit milestone covering 118 local learning-material candidates. The original files remained outside the application and were not moved, copied into `public/`, rendered in product routes, or written into course definitions. The audit added only `docs/materials/` records and canonical-document updates; it made no runtime, route, component, CSS, or product-visual change. `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build, which retained the same six product routes and existing Agent API. Therefore the last six-route browser, warning/error, interaction, and 390 × 844 findings above remain the current UI evidence; no new browser pass or design screenshot is claimed for this documentation-only change.

## Material contract and physiology vertical-slice pass

On 2026-07-18, the read-only inventory was pressure-tested through a minimal global material contract and a second registered `western-primary` course. Original files remained outside `public/`; only structured excerpts, locators, hashes, artifact relations, risk states, and answer authority entered typed content.

Browser coverage:

- `/courses/physiology/knowledge-points/internal-environment-and-homeostasis` rendered the expected physiology title, four learning stages, single modern-physiology reasoning block, five-source ledger, and pending current-teacher rubric;
- `建模` showed no empty relationship-label container, confirming that `western-primary` does not force a TCM comparison;
- `迁移` opened a non-case mechanism exercise, revealed the four-step disturbance-to-recovery chain, and exposed no case-reasoning link;
- the physiology writing room rendered two source-verbatim school white-book writing tasks plus two unscored historical candidates;
- first-draft input enabled answer reveal; all three criterion controls produced `6 / 6`; the right rail showed `来源所附参考答案`, `来源交叉核对`, and `教师采分 · 待提供` as separate facts;
- the physiology room did not render the still-TCM-only NUR Agent, while browser-local deterministic learning assistance remained available;
- the original `/`, `/learn`, TCM workspace, TCM knowledge, TCM writing, and TCM case routes all returned their expected H1/title in the same browser run;
- browser error logs were empty;
- at 390 × 844, both new routes reported `scrollWidth = clientWidth = 390`; all four knowledge-stage buttons and both writing tabs remained present.

Visual findings:

- no P0/P1/P2 regression against the approved warm-ivory editorial system;
- long physiology source labels and answer-authority copy remained inside square rule-bound containers at desktop and mobile widths;
- the mechanism-transfer exercise reads as the same product system without borrowing syndrome/case terminology;
- no original classroom image containing identifiable people appears in the rendered route.

Evidence:

- `docs/design-references/physiology-homeostasis-transfer.png`
- `docs/design-references/physiology-homeostasis-subjective-writing.png`
- `docs/design-references/physiology-homeostasis-subjective-writing-mobile.png`

## Follow-up polish

- P1: connect the imported private questions to existing deterministic browser-local learning state: answer drafts, favorites, confirmed attempts, redo, and review scheduling. Keep source/generated/scoring authority separate and let only explicit learner actions mutate state. Upgrade the bounded Qwen Agent only after this state path works.
- P3: decide later whether the verified physiology slice should gain a minimal discoverable course entry/workspace before changing the approved `/learn` or TCM workspace navigation.
- P3: obtain the instructor's original nine-page final-review PDF and any future marked answers/rubric before claiming instructor-specific subjective-answer scoring.
- P3: continue normalizing the remaining school white book and student choice bank question by question; keep absent or student-compiled answers out of scored content until their answer-confidence state is genuinely upgraded.
- P3: replace demonstration course progress only when a real persistence model is intentionally introduced; confirmed practice memory remains deliberately browser-local.
- P3: evaluate whether the already-working local Agent improves answer repair beyond A/B assistance without creating duplicate or annoying guidance. A separate real-provider pass requires a server-side credential and explicit authorization; it may compare selection quality, but cannot by itself establish learning efficacy.

final result: passed


## 2026-07-21 Update
- Private learning actions integrated in Course Builder: per-question drafts, favorites, confirm (recordConfirmedAttempt), redo.
- npm run check passed (lint + strict TS + full build, 23/23 pages).
- Reuses existing subjective-writing surface and learning-memory contracts.
- No regression to official pack or catalog.

## FSRS-aware Agent reasoning pass

On 2026-07-24, the NUR Agent received FSRS-aware reasoning as Phase 1 of the Agent intelligence upgrade. The Agent now reads the learner's FSRS memory state (difficulty, stability, lapses per criterion) and uses it to prioritize weak dimensions in next-step selection, review proposals, and DashScope prompt reasoning.

- `FsrsCriterionSummary` type added to `src/types/nur-agent.ts`; `NurAgentRequest` now carries a `fsrsSummary` field built from the client's `state.fsrsState`.
- `parseNurAgentRequest` in `src/lib/nur-agent/request.ts` validates each summary entry (memoryCriterionId, state enum, finite difficulty/stability/reps/lapses, null-or-string lastReviewAt) with a 200-item cap.
- `ResolvedNurAgentContext` in `src/lib/nur-agent/context.ts` passes `fsrsSummary` through to provider and runtime.
- DashScope `buildPrompt` in `src/lib/nur-agent/providers/dashscope.ts` includes `fsrsSummary` in the `learnerContext` JSON and adds FSRS-aware instructions: prioritize stability-lowest and lapses-highest dimensions; lower priority for stability > 10 + reps >= 3.
- `runNurAgentRuntime` in `src/lib/nur-agent/runtime.ts` deterministic next-step now sorts by `(relatedAttemptCounts + fsrsWeaknessScore)` where `fsrsWeaknessScore = (10 - stability) + lapses * 2`; criteria with no FSRS state get a moderate default of 5.
- `buildReviewProposals` in `src/lib/nur-agent/service.ts` now proactively generates review proposals for criteria in `relearning` state or with `lapses >= 2`, even without model suggestions; `suggestedDueHours` computed from actual FSRS summary state instead of null fallback.
- Browser verification at `/courses/tcm-diagnostics/knowledge-points/diet-and-taste/subjective-writing`: text entered, Agent clicked, Qwen model-assisted run completed with omissions quoting student text, next-step, and rewrite proposals.
- Desktop 1440 × 1000: `scrollWidth === clientWidth === 1440`. Mobile 390 × 844: `scrollWidth === clientWidth === 390`. Browser warning/error logs empty.
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build (23/23 pages).
- Evidence: `docs/design-references/fsrs-agent-phase1-desktop-2026-07-24.png` and `docs/design-references/fsrs-agent-phase1-mobile-2026-07-24.png`.

## Floating Agent UI pass

On 2026-07-24, the NUR Agent was upgraded from an inline embedded panel to a floating FAB + right-side drawer as Phase 2 of the Agent intelligence upgrade. The Agent no longer occupies main content space and is available on knowledge-point, writing, and case-reasoning surfaces.

- New `src/components/nur-agent-dock.tsx` renders a fixed-position FAB (48px circle, `#24211d` bottom + white Bot icon, right-bottom 24px) that opens a right-side drawer (420px desktop / full-width mobile, `#f4efe4` background, slide-in animation).
- New `src/components/nur-agent-dock.module.css` provides FAB, overlay, drawer, header, close button, content scroll, and mobile responsive styles matching the approved warm-ivory editorial system.
- The dock wraps the existing `NurAgentPilot` component; the pilot's `agentCard` border is stripped inside the dock via `.content > section` CSS.
- Drawer closes on ESC key, overlay click, or close button. FAB hides when drawer is open.
- `subjective-writing-room.tsx` and `case-reasoning-room.tsx` replaced `<NurAgentPilot>` with `<NurAgentDock>`; all props (state, course, task, currentText, onApplyRewrite) pass through unchanged.
- `knowledge-point-lesson.tsx` added `<NurAgentDock surface="knowledge-point" />`; on the knowledge-point overview, the drawer shows a placeholder directing to writing/case rooms for structural analysis (Phase 3 adds general Q&A).
- Browser verification: knowledge-point FAB visible and opens placeholder drawer; subjective-writing FAB visible and opens Agent panel with "NUR AGENT" and "精准写作导师" boundary text; ESC closes drawer; desktop 1440 × 1000 `scrollWidth === clientWidth === 1440`; mobile 390 × 844 `scrollWidth === clientWidth === 390` with full-width 390px drawer; browser warning/error logs empty.
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build (23/23 pages).
- Evidence: `docs/design-references/agent-dock-kp-desktop-2026-07-24.png`, `docs/design-references/agent-dock-sw-desktop-2026-07-24.png`, `docs/design-references/agent-dock-sw-mobile-2026-07-24.png`, and `docs/design-references/agent-dock-kp-mobile-2026-07-24.png`.

## General Q&A chat via Vercel AI SDK pass — Phase 3

On 2026-07-25, the NUR Agent gained general Q&A chat capability as Phase 3 of the Agent intelligence upgrade. The Agent dock now offers a "对话" (chat) tab alongside the existing "结构分析" (analysis) tab on writing/case surfaces, and a chat-only interface on knowledge-point surfaces.

- New `src/components/nur-agent-chat.tsx` uses `useChat` from `@ai-sdk/react` with `DefaultChatTransport` to stream responses from the new `/api/nur-agent/chat` Route Handler.
- New `src/app/api/nur-agent/chat/route.ts` uses `streamText` from the `ai` package with `createOpenAI` from `@ai-sdk/openai` to connect to DashScope `qwen3.7-plus`. The route resolves course/knowledge-point context from the validated registry, builds a system prompt with authority rules and FSRS guidance via `buildChatSystemPrompt`, and optionally exposes a `structural_analysis` tool that calls back into the existing `runNurAgent` service when the learner has an active draft and task context.
- New `src/lib/nur-agent/chat-context.ts` extracts evidence framework, lenses, relationships, sources, and lesson blocks from the registered `CourseDefinition` and `KnowledgePointDefinition` into a typed `ChatContext`.
- New `src/lib/nur-agent/chat-prompt.ts` builds the system prompt with authority rules (no teacher scoring, no clinical diagnosis, TCM/modern-medicine separation with 可关联 / 帮助理解 / 不可直接等同 labels, source citation, honest "not in current materials" when applicable) and FSRS-aware guidance.
- New `src/components/nur-agent-chat.module.css` provides chat bubble, tool-result card, error, input form, and mobile responsive styles matching the warm-ivory editorial system.
- The dock's tab bar switches between "对话" (general Q&A with `NurAgentChat`) and "结构分析" (structural analysis with `NurAgentPilot`). On knowledge-point surfaces, only the chat tab is shown. The structural analysis tool is available in chat when the learner has an active draft and task context, allowing the model to invoke `structural_analysis` during a conversation.
- `enable_thinking: false` is injected via a custom fetch to keep responses focused and fast.
- Browser verification at `/courses/tcm-diagnostics/knowledge-points/diet-and-taste`: FAB opened dock, chat input accepted "什么是食欲？中医怎么看？", Qwen `qwen3.7-plus` streamed a structured response with textbook page citations (第3版 P60-61), relationship labels (可关联, 不可直接等同), NUR scoring guidance, and source references. No model output was fabricated outside the provided course context.
- Browser verification at `/courses/tcm-diagnostics/knowledge-points/diet-and-taste/subjective-writing`: dock opened with both "对话" and "结构分析" tabs visible. Draft text entered into the writing area; "结构分析" tab showed the badge "有草稿可分析" and switched to the `NurAgentPilot` panel. Tab switching preserved the draft state.
- Browser warning/error logs were empty on both routes. `scrollWidth === clientWidth` with no horizontal overflow on both routes.
- `npm run check` passed ESLint, strict TypeScript, and the Next.js 16.2.1 production build (23/23 pages). The `/api/nur-agent/chat` route is listed as a dynamic route.
- Evidence: `docs/design-references/agent-chat-kp-desktop-2026-07-25.png` and `docs/design-references/agent-chat-sw-tabs-desktop-2026-07-25.png`.

## Question-bank home desktop-first responsive pass

On 2026-08-02, `/courses/tcm-diagnostics/question-bank` was widened from a narrow mobile-style column into a desktop-first responsive layout while keeping the existing warm-ivory editorial system.

- The page frame was increased from `960px` to `1280px` max-width with more generous horizontal padding (`48px 64px 96px` on desktop). The title scale was raised to `36px` for a stronger desktop hierarchy.
- The filter bar now keeps the fixed `320px` search input and the question-kind tags on one horizontal line on desktop. The stats bar uses a wider `40px` gap and slightly larger vertical padding.
- The chapter list switches to a two-column grid on desktop (`grid-template-columns: repeat(2, 1fr)`). Cards keep the same square-bordered editorial treatment with `24px` padding, and the two-column grid collapses to a single column below `1100px`.
- At `1440 × 900`, the desktop capture shows the title, search/tags, stats, and two-column chapter cards all within the viewport without horizontal overflow. At `390 × 844`, the same page reflows to the original single-column mobile layout with the search and tags wrapping naturally.
- Browser warning/error logs were empty. `npm run check` passed ESLint (existing warnings only), strict TypeScript, and the Next.js 16.2.1 production build. The route remained statically generated.
- Evidence: `docs/design-references/question-bank-home-desktop-2026-08-02.png` and `docs/design-references/question-bank-home-mobile-2026-08-02.png`.

## Question-bank and mock-exam expansion pass — 15 new NUR-adapted items

On 2026-08-06, the TCM assessment bank was expanded from 16 to 33 items to make the mock exam a meaningful half-paper. All new items are NUR-adapted (`nur-editorial` prompt + `nur-platform` answer + `source-cross-checked` confidence) and reference only verified textbook/teacher page sources; no school originals or fabricated answers were added. B1/B2 remain at zero because their semantics are not confirmed by any source.

- A1 single-choice grew from 3 to 15 (50% of the 30-item blueprint row), now covering 7 knowledge points; fill from 2 to 4 (80%), term from 1 to 3 (60%), case from 0 to 1, short-answer already complete at 10 available.
- Mock exam composition moved from roughly 10 points to 53/100 points: 15 auto-graded A1 (15 pts) + 4 fill + 3 term (9 pts) + 3 short-answer (15 pts) + 1 case (10 pts), with honest per-row shortfall reporting for A1/B1/B2/fill/term/case.
- The question-bank home now lists 33 items across chapters (绪论 1, 望诊 2, 舌诊 5, 问诊 13, 脉诊 4, 八纲 5, 脏腑 3) with an 82% source-answer coverage stat.
- Browser QA covered the question-bank home, a new A1 item practice page (`assessment-qb-a1-spirit-false`, correct rendering of options and knowledge-point tag), the mock-exam intro page, a 26-item mock-exam running room with the honest shortfall notice, one auto-graded correct A1 answer (`判定正确`), a fill subjective item with the no-auto-grading notice, the new 10-point case item, and the 26-button question navigator.
- The 455px viewport reported `scrollWidth === clientWidth` with no horizontal overflow; browser warning/error logs were empty throughout. `npm run check` passed ESLint (existing warnings only), strict TypeScript, and the Next.js 16.2.1 production build; the build statically generated 15 new question-bank item routes.
- Evidence: `docs/design-references/question-bank-expanded-2026-08-06.png`.

## Wrong-question center and weak-KP weekly-plan reflow pass

On 2026-08-06, the `/wrong-questions` route and the `/learn` dashboard integration were tested as the "question-to-learning" closed loop. The center reads from existing question-bank and mock-exam localStorage keys without creating new storage; a `mounted` pattern in the `useWrongQuestionCenter` hook prevents hydration mismatch from `useSyncExternalStore` in React 19.

- `/wrong-questions` renders the approved warm-ivory paper, black rules, Songti heading, square containers, muted cinnabar stat accents, and restrained metadata. The stats bar shows wrong-question count, total attempts, and weak-KP count. The weak-KP card grid links to lesson pages or question-bank practice. The wrong-question list sorts by most recent wrong-answer time and links to question-bank redo, subjective-writing, or knowledge-point pages.
- The `/learn` dashboard activates the `错题` nav link with a red count badge, replaces the disabled `待复习` progress item with a link to `/wrong-questions`, and integrates up to 3 weak-KP chips into the weekly-plan drawer with a `查看全部` link. The drawer metrics now show `本周已完成 / 错题 / 待复习`.
- A hydration mismatch was discovered: `useSyncExternalStore` in React 19 uses the client snapshot during the initial hydration render (not the server snapshot), so any browser-local data caused a mismatch. The fix uses a `mounted` state in `useWrongQuestionCenter` to return stable empty data during SSR and hydration. The dashboard's `loadProfile` was also fixed to use `DEFAULT_PROFILE` during initial render and read from `localStorage` in a `useEffect`.
- Browser QA at 455px: `/wrong-questions` reported `scrollWidth === clientWidth === 455`; `/learn` (with weekly-plan drawer open, showing weak-KP chips) also reported `scrollWidth === clientWidth === 455`. Console error/warning logs were empty on both routes after the hydration fix.
- `npm run check` passed ESLint (0 errors, 34 existing warnings), strict TypeScript, and the Next.js 16.2.1 production build (52/52 pages, including new `/wrong-questions` static route). `npm test` 139/139 passed.
- Evidence: `docs/design-references/wrong-question-center-mobile-2026-08-06.png`, `docs/design-references/learning-dashboard-wrong-questions-mobile-2026-08-06.png`, and `docs/design-references/learning-dashboard-weekly-plan-weak-kp-mobile-2026-08-06.png`.

## Phase 5 / M2 补充（2026-08-07）
- /learn dashboard 头部 account 区新增极简学习状态同步标签（text-[10px] text-slate-500，显示 lastSyncAt 或 “同步中”）。
- 符合现有 restrained sans-serif metadata + square editorial 系统；无新布局或颜色引入。
- 未单独截图（功能性小元素，复用已验证 header 结构）。


## M4 发布前打磨（2026-08-08）完成
- SEO, data export, mobile/touch, a11y, console guard, type/build clean.
- All M4 pre-release polish items implemented and verified.
