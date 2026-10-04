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

## 错题中心三层能力（2026-08-16）

On 2026-08-16, `/wrong-questions` was upgraded from an objective-only wrong-question book to a three-layer capability center: `客观错题 / 结构薄弱 / 即将遗忘`. The objective layer is byte-for-byte unchanged; the two new layers read only the existing `nur-learn:learning-memory:v1` store through a second `useSyncExternalStore` snapshot in `useWrongQuestionCenter` (no new localStorage key).

- The tab bar renders inside the approved editorial system (square bordered tabs, ink-filled active state, cinnabar criterion labels inside list rows, `role="tablist"/"tab"/"tabpanel"` with `aria-selected`). Tab counts update live: after the QA flow the tabs read `客观错题0 / 结构薄弱1 / 即将遗忘0`.
- The structural-weakness layer was validated through the real product path, not injected storage: three confirmed attempts on three distinct tasks (名词解释 → 简答题 → 案例推理室 证据分组), each below the signal groups, produced one entry `问饮食口味 — 证据与定义要素不完整 · 漏 3 个不同任务 · 最近 2026-08-17 · 中医诊断学`, with the deep link correctly preferring the case-reasoning room because the latest omission happened on that surface. The criterion label resolves from `learningMemoryCriteria` in course truth; the section hint derives the threshold from the exported `repeatedOmissionThreshold` constant instead of hardcoding "3".
- The 48-hour review proposal (`加入计划`) appeared exactly on the third distinct-task omission inside the writing/case panel, confirming the reused `selectRepeatedOmissions` rule and the shared store event (`nur-learn:learning-memory-change`) driving the wrong-question recompute.
- The FSRS high-risk layer selector (`relearning` or `lapses >= 2`, kp attribution via `learningMemoryCriteria` back-mapping, `suggestedIntervalDays` via the existing FSRS interval) is covered by 10 new unit tests in `tests/wrong-questions.test.ts`, including threshold gating, per-task latest-version semantics, orphan-criterion filtering, sorting, and objective-layer compatibility. A product finding is recorded in PROJECT_STATE: under current content every review task is single-criterion, so its completion rating is always "good" and `relearning` cannot be reached through the real UI without a multi-criterion task completed with staggered criteria; the layer's empty state was browser-verified instead.
- Responsive: `/wrong-questions` reported `scrollWidth === clientWidth` at 390 × 844 and 1440 × 1000 with the structural tab active. The IAB dev log recorded no browser error/warning during the QA flow (two pre-existing `PrismaClient` client-side errors appear only at dev-server startup, before this milestone's session, from the open-next `src/lib/prisma.ts` migration).
- `npm run check` passed ESLint (0 errors; the 20 remaining warnings are pre-existing in payment/tmp-adjacent files), strict TypeScript, and the Next.js 16.2.1 production build; `npm test` 174/174 passed (164 prior + 10 new).
- Worktree repairs required to restore the check gate: `eslint.config.mjs` now also ignores the gitignored build/scratch outputs `.open-next/**`, `.wrangler/**`, `tmp/**`, `.qoder/**` (same category as the already-ignored `.next/**`; linting them previously produced 2306 errors and an OOM), and `learning-dashboard.tsx` had its M2/M3-era effects fixed (`fetchQuotas` declared before use; the per-email sync guard and quota-load guard moved to refs; two targeted `react-hooks/set-state-in-effect` disables with justification comments, matching the existing convention in `use-wrong-questions.ts`).
- Evidence: `docs/design-references/wrong-question-center-three-layer-desktop-2026-08-16.png`, `docs/design-references/wrong-question-center-structural-tab-2026-08-16.png`, `docs/design-references/wrong-question-center-fsrs-empty-mobile-2026-08-16.png`.

## M2 同步冲突可见性 pass（2026-08-16）

On 2026-08-16 the `/learn` account panel gained a sync-conflict confirmation section, verified end-to-end against the real D1-backed dev server with a registered QA account (`qa-conflict@nur.test`).

- The section renders inside the logged-in account panel above the manual-sync/consent block: a cinnabar count line `有 1 处同步冲突，需要确认`, a one-line explanation, bulk `全部以本机为准 / 全部以云端为准` buttons, and a per-item list showing the ref id plus `本机/云端` snapshot comparisons (`复习中 · 稳定度 2.3 · 遗忘 0 次` vs `重学中 · 稳定度 51.0 · 遗忘 7 次`) with per-item resolution buttons. Styling reuses the panel's existing tokens (`--line/--ink/--muted/--red`, thin borders, no new visual language); guest state renders nothing.
- A genuine conflict was produced through the real product path: the QA account completed the pending review task locally (full-coverage 简答题 self-check → FSRS good update, uploaded and confirmed in the D1 database), then the server's `LearnerFsrsState` row was mutated to a newer divergent value; on the next `/learn` load the guarded upload preserved the divergence, the download detected "both sides changed since `lastMergeAt` with different semantics", and the panel showed the conflict with both snapshots.
- Resolution verified both ways: `以本机为准` left the server row overwritten with the local values (reasserted `lastReviewAt`, confirmed by querying the database); `以云端为准` applied the recorded server snapshot to local memory — cross-verified because the wrong-question center's `即将遗忘` layer immediately showed `重学中 · 遗忘 7 次 · 建议间隔 36 天`, which also provided the first real-data browser evidence for that layer. A follow-up merge with both sides consistent recorded no new conflicts.
- `/learn` reported `scrollWidth === clientWidth` at 1440 × 1000 and 390 × 844 (account panel open); the dev log recorded no browser error/warning during the flow.
- `npm run check` passed ESLint (0 errors), strict TypeScript, and the production build; `npm test` 186/186 (12 new in `tests/sync-conflicts.test.ts`).
- Evidence: `docs/design-references/sync-conflict-panel-2026-08-16.png`, `docs/design-references/sync-conflict-panel-mobile-2026-08-16.png`.

## Agent 改写提案一键应用 pass（2026-08-16）

On 2026-08-16, the NUR Agent's rewrite proposals became one-click applicable in both training rooms, verified against real `qwen3.7-plus` runs (DashScope configured in the dev environment).

- `NurAgentPilot` (inside the dock's 结构分析 tab) renders `应用此改写` for both the deterministic NUR `rewriteSuggestion` sentence and each Qwen `NurAgentRewriteProposal`; the button is gated behind a non-empty current draft. The new shared pure module `src/lib/agent-rewrite-merge.ts` owns the merge: <25-char drafts are replaced; ≤20-char proposals always insert as labeled supplements (protecting a student's long draft from being discarded for a short supplement sentence); longer proposals use character-bigram relevance (the old whole-token test failed on natural Chinese and silently replaced related drafts), with full replacement only below the relevance threshold; otherwise every student sentence is preserved and the proposal inserts after the most relevant sentence as `【Agent 补充】`.
- Writing room: an incomplete 10-char draft was fully replaced by the Qwen proposal (correct short-draft rule); a long related draft kept both original sentences with `又称多食易饥。` inserted after the most relevant one; the confirm button returned to the unconfirmed label after apply; the undo bar (`撤销，回到应用前全文`) restored the exact pre-apply text. The previous always-writes-first-draft bug is fixed — apply now targets the revision box when it holds the active answer. The unreachable `pendingMerge` preview block was removed.
- Case room: after confirming the evidence stage (`已自核`), applying a proposal smart-merged the draft (original sentences preserved, evidence-grouping supplement inserted) and the stage badge returned to `进行中` with the confirm button back to `完成自核并确认保存` — applied drafts are always unconfirmed until the learner self-checks. Undo restored the pre-apply text. The previous whole-draft overwrite behavior is gone.
- With an empty draft, no apply buttons render anywhere. Both rooms reported `scrollWidth === clientWidth` at 1440 × 1000 and 390 × 844; the dev log stayed clean through the flow. One recurring QA-environment caveat (not a product defect): the sticky page header can cover page-level controls at certain scroll offsets and the in-app browser's command broker intermittently drops a click — retrying after closing the Agent drawer and scrolling resolved both during QA.
- `npm run check` passed ESLint (0 errors), strict TypeScript, and the production build; `npm test` 192/192 (6 new in `tests/agent-rewrite-merge.test.ts`).
- Evidence: `docs/design-references/agent-rewrite-apply-2026-08-16.png`.

## M4 切片 A — 错误边界 / 加载态 / SEO（2026-08-17）

- 全局与 segment（learn / courses / wrong-questions）error：暖象牙方框中文提示 + 重试 + 回学习首页；**不**渲染 error.message/stack。
- global-error / not-found 同语言。
- loading：细线 + 一行「正在准备/打开…」，min-height 60vh，避免花哨 skeleton。
- SEO：metadataBase + site-config；robots 排除 api/auth/account/错题/建课；sitemap 仅公开入口 + 有 lesson 的知识点 + 法律页。
- 验收建议：本地触发 error（临时 throw）应见中文页；访问 `/robots.txt` `/sitemap.xml`；390 宽度卡片无横向溢出。
- 未新增大图 og.png（去掉坏链）。

## M4 切片 B — 本机学习数据导出（2026-08-17）

- /learn 账户面板（登录/访客）「导出学习数据」：克制说明 + 全宽次要按钮（min-height 44px）。
- JSON 文件名 `nur-learn-data-YYYY-MM-DD.json`；文案标明非官方成绩单。

## 题库课程落地页 / 模考 / 错题中心（2026-09-10）

Playwright Chromium，视口 **1440×1000** 与 **390×844（isMobile）**，对象：`/courses/physiology-qb`、题库首页、模考、A1 练习页、`/wrong-questions`（注入生理学 B1 错答）。

- 落地页/题库/模考/练习：两视口 HTTP 200，页面文案不含「页面未找到」，`scrollWidth === clientWidth`。
- 错题中心：注入 `ext-physiology-ch5-respiration-b001m1` 错答后，客观层显示 1 题；390 初测溢出 406→390，隐藏 `.wrongItemStats` 后复测 `390 === 390`。
- B1 重做链接（无 `item.choices`）：`/courses/physiology-qb/question-bank/physiology-ch5-respiration/ext-physiology-ch5-respiration-b001m1`，不再指向 knowledge-points。
- 控制台：落地页 390 无 pageerror / console.error。
- 证据：
  - `docs/design-references/qb-course-landing-desktop-2026-09-10.png`
  - `docs/design-references/qb-course-landing-mobile-2026-09-10.png`
  - `docs/design-references/qb-course-home-desktop-2026-09-10.png`
  - `docs/design-references/qb-course-home-mobile-2026-09-10.png`
  - `docs/design-references/qb-mock-exam-desktop-2026-09-10.png`
  - `docs/design-references/qb-mock-exam-mobile-2026-09-10.png`
  - `docs/design-references/wrong-question-center-qb-desktop-2026-09-10.png`
  - `docs/design-references/wrong-question-center-qb-mobile-2026-09-10.png`

## Hi doc M0 + M1 — 首页三入口 / 教材书架（2026-09-17）

真实 Chromium（Tabbit + Playwright），视口 **1440×900** 与 **390×844**；dev server `PORT=3100`，登录态用专门注册的 free 档验证账号（本月名额 1/1 已用，书架 1 本《冻结测试教材》）。

- `/learn` 三入口：并列方框卡片「官方课程学习闭环 / Hi doc / 传统刷题题库」，分别指向 `/courses`、`/learn/hi-doc`、`/question-bank`；沿用暖象牙 + 细线的编辑式视觉，无新增色彩。
- `/learn/hi-doc` 未登录：显示「登录后使用 Hi doc」引导卡（去登录 / 返回学习首页），不泄漏任何教材信息。
- 登录后书架：名额区「本月名额 · 2026-09 / 1 /1 已用」+ 名额格（1 满 1 空）+ 档位与刷新说明；教材卡显示标题、`文件名 · 页数 · 大小 · 上传日期`、状态「已上传 · 目录识别将在 M2 开放」；无冻结分区时（本月激活）不渲染冻结区。
- 名额超额：浏览器内选择 `sample-text.pdf` 并上传，红框（cinnabar）中文提示「本月教材名额已用完（1/1）。删除不再学习的教材可释放当月名额，或升级会员档位；名额每月 1 日刷新。」——503 不静默放行，UI 如实呈现。
- 390×844：`document.documentElement.scrollWidth === 390`，无横向溢出；上传区变为单列堆叠。
- 控制台：无 4xx/5xx 请求错误；唯一 error 为浏览器扩展 Dark Reader 注入 `data-darkreader-inline-stroke` 造成的 hydration 差异（扩展副作用，非产品缺陷，三个页面均复现）。QA 截图前临时关闭 Dark Reader 深色覆盖以还原原生浅色设计。
- API 侧端到端（curl，同一账号）：未登录 401；扫描件 PDF 422 `unsupported-scan`；1501 页 PDF 422 `page-limit`；非 PDF 422 `invalid-file`；损坏 PDF 422 `pdf-unreadable`；本月第二本 503 `quota-exceeded`；删除后名额回到 0/1 且服务器文件被移除；把 `activeMonth` 改为上月后书架显示冻结态且不占本月名额，`PATCH activate` 后重新占用 1/1。
- 磁盘隔离：`HIDOC_STORAGE_ROOT` 下按 `hidoc/{userId}/{textbookId}/{fileName}` 分层，验证文件写入大小与原始 PDF 一致（28,766 B）；被拒绝的上传不留文件与空目录。
- 证据：
  - `docs/design-references/hidoc-learn-three-entries-2026-09-17.png`
  - `docs/design-references/hidoc-shelf-desktop-2026-09-17.png`
  - `docs/design-references/hidoc-shelf-login-gate-2026-09-17.png`
  - `docs/design-references/hidoc-quota-exceeded-2026-09-17.png`
  - `docs/design-references/hidoc-shelf-mobile-2026-09-17.png`

## Hi doc M2 — 教材详情 / 目录识别 / 手动修正（2026-09-17）

真实 Chromium（Tabbit + Playwright），视口 **1440×900** 与 **390×844**；真实教材《卫生统计学_赵耐青练习册》（79 页，PDF 书签 77 条，前 12 页有文字层）+ 合成教材（7 页，含印刷目录页）。

- 详情页 `/learn/hi-doc/t/[id]`：kicker「HI DOC · 教材详情」+ 教材信息区（文件名 / 页数 / 章节数）+「目录识别」面板（上次识别策略与说明、识别进度日志）+ 章节树（序号、标题、`第 X–Y 页`、来源标注）+ 底注。
- 真实教材识别（SSE 四步进度：读取 → 检查书签 → 写入章节）：**strategy=outline，19 章**（第一章 1–2 … 第十九章 77–79），notes 如实写明「来源：PDF 书签（19 条，章标题匹配）」「忽略了 58 条次级/未定位书签条目」。
- 合成教材走印刷目录页路径：**strategy=toc-page，3 章**，页码偏移探针投票得 `+2`（3 个探针校验），章节落在真实 PDF 页 3–4 / 5–6 / 7–7；目录页识别只认真正产出条目的页（正文页不再被误标为目录页）。
- 无目录 PDF（1 页纯文字样本）：启发式未命中 → 自动调用 `qwen3.7-plus` → 模型未产出可用章节 → 如实回退并返回 422 `no-toc` + 中文指引；该次模型调用已计入 `usage.hidocParses` 并写入 `EventLog`（`outcome=failed`），成本不静默放过。
- 手动修正：编辑态仅显示「保存章节 / 取消」；最后一章已到书末时「新增章节」置灰并给出原因；越界保存返回中文原因（《附录 复习要点》的页码超出 1–79）；保存成功的行按起始页重排，被改动/新增的行标为「人工修正」，未改动的行保留识别来源（验证：改名行 manual、未动行 toc-page）。
- 响应式：390×844 `scrollWidth === 390`、无横向溢出、教材标题只出现一次；操作按钮按内容宽度排列（未拉满整行）。
- 控制台：无 4xx/5xx 与应用 error；唯一 hydration 差异仍来自浏览器扩展 Dark Reader（截图时临时屏蔽）。
- 证据：
  - `docs/design-references/hidoc-detail-outline-recognized-2026-09-17.png`
  - `docs/design-references/hidoc-detail-chapter-editing-2026-09-17.png`
  - `docs/design-references/hidoc-detail-edit-error-2026-09-17.png`
  - `docs/design-references/hidoc-detail-mobile-2026-09-17.png`

## Hi doc M3 — 知识点萃取（SSE 流式）（2026-09-17）

真实 Chromium（Tabbit + Playwright），视口 **1440×900** 与 **390×844**；真实教材《卫生统计学_赵耐青练习册》第一/二/三章（文字层完整）。dev server `localhost:3000`。

- 详情页章节行：元信息含「已萃取（N 个知识点）/ 未萃取」；已萃取章按钮「重新萃取」、未萃取章「萃取知识点」；行左侧展开箭头（未萃取章置灰）。
- 展开第一章：13 条知识点，每条含标题、页码徽标（如「第 1 页」）、描述、术语行；6 条含先修行；列表底部固定说明「知识点为模型萃取草稿，页码可溯源；讲义与教学对话将在 M4 开放。」
- 浏览器内对第三章点「萃取知识点」：SSE 进度依次为「开始萃取…」「读取《第三章》（第 6–8 页）…」「精读《第三章》并萃取知识点（qwen3.7-plus）…」「写入 11 个知识点…」，约 19 秒完成；章节行实时变为「已萃取（11 个知识点）」并自动展开 11 条（前两条「二项分布近似正态分布的条件」「二项分布近似 Poisson 分布的条件」，页码徽标第 6 页，均在章范围 6–8 内）；刷新后持久化。
- API/服务端端到端（curl + tsx 服务层直连）：未登录 401；第一章服务层直连萃取 11–13 个知识点（两次调用展示覆盖语义：重跑整体替换该章知识点）；HTTP SSE 第二章萃取 10 个（页码 p3–p5 全在章内）；`usage.hidocExtracts` 与真实模型调用次数严格一致（含失败尝试也记账，`EventLog(hidoc_chapter_extract)` 带 outcome）；GET `/chapters/[n]` 返回知识点列表。
- 390×844：`scrollWidth === 390` 无横向溢出；知识点列表窄屏可读。
- 控制台：无应用级 error；仅 Dark Reader 扩展注入属性造成的 hydration 差异（已知扩展副作用）。
- 验证环境注记（已修复）：`@prisma/adapter-better-sqlite3` 嵌套的 better-sqlite3 12.11.1 在 Node 24 下有 Statement GC 终结器断言崩溃，曾中断 SSE 落库；已通过 `package.json` 的 `overrides: better-sqlite3 ^13.0.3` 统一到 13.0.3（自带 prebuilds，免编译），12 轮 GC 压力 + 真实萃取流程复测零崩溃，详见 PROJECT_STATE。
- 证据：
  - `docs/design-references/hidoc-kp-detail-2026-09-17.png`
  - `docs/design-references/hidoc-kp-list-2026-09-17.png`
  - `docs/design-references/hidoc-kp-extracted-2026-09-17.png`
  - `docs/design-references/hidoc-kp-mobile-2026-09-17.png`

## Hi doc M4 — 学习页：讲义生成 + 讲解追问（2026-09-17）

真实 Chromium（1440×900 桌面截图 + 390×844 设备模拟）与 API 端到端；验证账号为专门注册的 free 档账号（`hidoc-m4-verify-*`），教材为真实《卫生统计学_赵耐青练习册》（79 页，PDF 书签 19 章），第一章 13 个知识点为真实模型萃取结果。

- `/learn/hi-doc/t/[id]/c/[n]` 未登录：显示「登录后开始学习」引导卡（去登录 `next` 回到本页 / 返回书架），不泄漏教材内容。
- 左栏知识点列表：标题「知识点 / 13 个 · 讲义 2 份」，元信息「第 N/M 章《第一章》· 第 1–2 页 · 已萃取」，每条含序号（01–13）、标题、「第 N 页 · 已有讲义/未生成讲义」；当前选中项深色底高亮且带 `aria-current`。
- 右侧讲义面板：真实 `qwen3.7-plus` 流式生成（progress「聚合原文片段 → 调用模型撰写讲义 → 保存讲义」，174 个 delta 分片，约 9 秒），落库后渲染 markdown：h1 标题 + 生成方式/风格/教材/依据页码四行元信息 + 定义/要点/易错点/自测题四小节（`<h2>`，`<ul>` 圆点、`<ol>` 1./2./3. 编号由浏览器生成），面板头显示「模型生成（dashscope · qwen3.7-plus）· 2026/9/17 20:33:30」。
- 重新生成确认：点「重新生成讲义」出现红色提示「重新生成将覆盖当前讲义，确认继续？」+「确认重新生成 / 取消」；点取消后提示消失、讲义正文与生成时间戳逐字节不变。
- 未接入模型兜底：第二个知识点（「个体变异」）在不配置密钥的进程内生成讲义，面板头显示「启发式整理 · 未接入模型」，讲义页首写明「生成方式：启发式整理 · 未接入模型」「本页未调用模型：内容由萃取结果与教材原文片段确定性地重排」，要点只引用含标题/术语的真实原文行，易错点如实写「未接入模型，无法生成易错点分析；以下为需人工核对的检查项」，自测题 3 道且答案可溯源（无先修时不编造先修关系）。
- 讲解追问（真实模型，SSE）：输入问题按 Enter 发送 → 「正在思考…」占位 → 流式增量渲染 → 落库为「我 / NUR 讲解」两条气泡；回答引用教材页码并区分原文依据；刷新后讲义与 4 条气泡（2 组问答）完整保留；回答按 markdown 渲染（`<h3>` 小标题、`<strong>` 粗体、`<ul>/<li>` 列表），无 `#`/`**` 残留。
- 安全与配额（API 端到端，curl）：未登录 401；跨账号 kpId 返回 404「知识点不存在或不属于当前账户。」；`hidocChats` 打到 50/50 时立即返回「Hi doc 讲解对话（模型）已用完（50/50），本轮提问已停止」（20ms，未发起模型调用，未落库提问）；额度不足不静默放行。`usage` 计数与真实调用一致（hidocExtracts 1 / hidocLessons 2 / hidocChats 1），`EventLog(hidoc_kp_lesson / hidoc_kp_chat)` 带 provider、model、outcome 与字符数；启发式兜底不消耗模型额度。
- 390×844：`documentElement.scrollWidth === clientWidth === 390`，无横向滚动条、无溢出元素，布局单列堆叠（知识点列表在讲义之前）；已知小瑕疵：顶部导航三项在 390px 下换行（旧页面同样行为，未溢出）。
- 控制台：干净配置文件下无 error（仅 React DevTools 与 HMR info）；内置浏览器里出现的 hydration 差异与 `ERR_ABORTED` 来自 Dark Reader 扩展注入属性与重载时被中断的 RSC 预取，非产品缺陷（与前几期一致）。
- 证据：
  - `docs/design-references/hidoc-study-desktop-2026-09-17.png`
  - `docs/design-references/hidoc-study-lesson-markdown-2026-09-17.png`
  - `docs/design-references/hidoc-study-chat-2026-09-17.png`
  - `docs/design-references/hidoc-study-regenerate-confirm-2026-09-17.png`
  - `docs/design-references/hidoc-study-heuristic-fallback-2026-09-17.png`
  - `docs/design-references/hidoc-study-mobile-2026-09-17.png`

## Hi doc M5 — 划重点/批注 + 学霸笔记（2026-09-17）

真实 Chromium（Tabbit + Playwright；另用独立无扩展 Chrome 采集原生浅色截图并复验跨浏览器持久化），视口 **1440×900 / 1440×1000** 与 **390×844**；验证账号为 M4 免费档账号（free 档，笔记额度 3），教材为真实《卫生统计学练习册（M4 验证）》（79 页，第一章 13 个知识点、2 份讲义：1 份真实 `qwen3.7-plus`、1 份启发式）。

- 划线创建：在讲义正文中选中「离散的数值，通常由计数产生」→ 浮出气泡「划重点」（引用原文 + 四色色板 琥珀/朱砂/黛蓝/青玉 + 批注输入 ≤1000 字 + 保存/取消）；选朱砂、写批注保存 → 该句被 `<mark data-hidoc-highlight-id data-hidoc-swatch="cinnabar">` 包裹，实测背景 `rgba(160, 28, 20, 0.14)`、下划线 `rgba(169, 29, 21, 0.6)`（低饱和度，不抢正文）；面板「划重点 1 条 · 已定位 1 · 未定位 0」，条目含色块、引用原文、批注、颜色标签与时间。
- 定位契约：划线包裹全程走 TreeWalker + `splitText` + `insertBefore`（Range/textNode），不使用 `innerHTML`；只按 quote + prefix/suffix 匹配，匹配失败即入「未定位」，不做猜测式定位。
- 持久化与跨设备：刷新后划线按 anchor 与讲义版本一致重新定位；另用独立无扩展 Chrome（干净配置文件、不同浏览器会话、同一账号）复测，2 条划线同样重新出现。
- 编辑：面板「编辑颜色或批注」→ 气泡带入原值 → 改青玉并改批注 → `PATCH /api/hidoc/highlights/[id]` 生效：mark 类名 `swatchCinnabar` → `swatchJade`、背景 `rgba(55, 110, 92, 0.18)`，面板同步为「青玉 · …」。
- 讲义重新生成后的失配：点「重新生成讲义 → 确认重新生成」，真实 `qwen3.7-plus` 重写讲义（生成时间 20:33:30 → 22:35:54）；重生成后讲义中 mark 数 0，面板「划重点 1 条 · 已定位 0 · 未定位 1」，未定位区以朱色标注「未定位 1 条 · 讲义已更新，暂无法定位」，条目显示「青玉 · 旧版讲义（2026/9/17 20:33:30）」，并写明「不会伪造位置，可删除后在新讲义上重新划线」。
- 新讲义重新划线（四色）：在新讲义上以琥珀（带批注）与黛蓝各划一条 → 面板「3 条 · 已定位 2 · 未定位 1」；琥珀/朱砂/青玉/黛蓝四色均已实测。
- 删除：未定位条目删除后立即消失（未定位区不再渲染）；气泡内亦可删除，服务端 `DELETE /api/hidoc/highlights/[id]`。
- 学霸笔记（模型，SSE）：`POST /api/hidoc/textbooks/[id]/chapters/[order]/note` 共 533 个事件（progress → 490 delta → result），生成方式「模型生成（dashscope · qwen3.7-plus）· 2026/9/17 22:36」，结构校验通过；渲染为：章首导读 → 知识点笔记（13 个三级小节，含核心定义/要点/易错点）→ 自测题汇总；说明区如实写「聚合范围：13 个知识点（2 份讲义）、2 条追问、3 条划重点/批注」「本章有 11/13 个知识点尚未生成讲义，笔记中如实略去对应要点」；正文含真实划重点引用、「我的批注」「追问中暴露的问题」，无「你曾问到」等编造。
- 笔记下载：点「下载 .md」创建 Blob（`text/markdown;charset=utf-8`）并触发 `<a download="卫生统计学练习册（M4 验证）-第一章-学霸笔记.md">`；点击探针读到 3621 字节、13 个三级小节、含「## 自测题汇总」与模型生成页首。注：本机 Tabbit 环境不派发 Playwright download 事件（同环境 data URL 对照实验同样不派发，属环境拦截），因此以锚点文件名 + Blob 内容探针为证据；独立无扩展 Chrome 中页面行为一致。
- 重新生成覆盖：已有笔记时按钮为「重新生成学霸笔记」，点击出现朱色「重新生成将覆盖当前学霸笔记，确认继续？」+ 确认/取消；点取消后正文与生成时间逐字节不变。
- 无 key 启发式兜底：在不配置 `DASHSCOPE_API_KEY` 的进程内重新生成 → `generator=heuristic`，页首「生成方式：启发式整理 · 未接入模型」+「本笔记未调用模型：内容由讲义要点、划重点、批注与追问记录确定性地汇总」；含章首导读 / 知识点笔记（13 小节）/ 我的划重点 / 我的批注 / 追问中暴露的问题 / 自测题汇总 / 下载提示；说明区含「未接入模型（…未配置）」与「本次生成覆盖了此前的学霸笔记」；`usage.hidocNotes` 保持不变（未占模型额度），仅写 heuristic EventLog。
- 安全与配额（API 端到端，curl）：未登录 POST/PATCH/DELETE 与笔记生成均 401；跨账号 kpId 创建划线 404「知识点不存在或不属于当前账户。」；他人划线 PATCH/DELETE 404「划重点不存在或不属于当前账户。」；quote 501 字 400「选中的文字过长（501 字），请控制在 500 字以内。」；非法颜色 400「划线颜色不在允许的四色之内（琥珀 / 朱砂 / 黛蓝 / 青玉）。」；批注 1001 字 400「批注过长（1001 字），请控制在 1000 字以内。」；每 kp 第 101 条 503「本知识点的划重点已达上限（100 条）。请先删除…」（临时夹具 100 条，验后级联清理无残留）；笔记额度 3/3 时 0.24s 即 SSE error 503「Hi doc 学霸笔记（模型） 已用完（3/3），本次笔记生成已停止…」，未发起模型调用、未写 EventLog；跨账号教材 id 笔记生成 SSE 404。验证账号 `usage` 与真实调用一致（hidocLessons 3 / hidocNotes 2，含 1 次真实笔记生成 + 1 次重生成；启发式与配额拦截均不计数）。
- 响应式：390×844 `documentElement.scrollWidth === clientWidth === 390`，无溢出元素；移动端划线仍正确定位（mark 2 条），气泡宽度自适应 `min(360px, calc(100vw - 24px))`，面板单列堆叠。
- 控制台：独立无扩展 Chrome 无 error；Tabbit 中仅有 Dark Reader 扩展注入 `data-darkreader-*`（html 与图标 inline stroke）造成的 hydration 差异，与前几期一致，非产品缺陷。
- 证据：
  - `docs/design-references/hidoc-m5-highlight-panel-2026-09-17.png`
  - `docs/design-references/hidoc-m5-unlocated-2026-09-17.png`
  - `docs/design-references/hidoc-m5-note-desktop-2026-09-17.png`
  - `docs/design-references/hidoc-m5-note-heuristic-2026-09-17.png`
  - `docs/design-references/hidoc-m5-mobile-2026-09-17.png`

## Hi doc M6 — 课题工作坊（替代「我的资料」）（2026-09-17）

playwright-core + 系统 Chrome（headless、无扩展、浅色），视口 **1440×900** 与 **390×844**；验证账号 `hidoc-m6-verify-1789661087@example.com`（free 档：课题 1 个 / 每课题 3 份材料 / 单份 ≤100 页 / 工作坊答疑 30 轮）；课题「心衰专题」（id `cmu5q2aof0000e1px62jzjauq`），材料为真实短材料：`心衰专题笔记.md`（1 页）+ `心衰讲义.pdf`（cupsfilter 生成的带文字层 PDF，1 页）；命中提问走真实 `dashscope / qwen3.7-plus`。

- 课题列表（`/learn/hi-doc/w`）：限额面板「课题限额 · 当前档位 Trial / 免费试用 1/1 个课题」「每个课题最多 3 份材料 · 单份不超过 100 页 · 工作坊材料不占教材当月名额」；新建课题表单（名称 ≤60 字、说明可选 ≤500 字）；课题卡片含材料数与更新时间；页脚如实写「课题工作坊由原『我的资料』升级而来」。
- 材料上传（`/learn/hi-doc/w/[id]`）：`.md` 与带文字层 PDF 上传即检测落库，状态「可检索」（status ready、ocrStatus `not-attempted` 如实记录）；上传面板固定提示「上传即检测：图片与扫描版（无文字层）PDF 会明确拒绝并说明原因，OCR 能力后续开放；材料存服务器且仅本人可见」。
- 拒绝矩阵（API + 浏览器 alert/红色错误框一致）：扫描版 PDF（无内容流）→ 422 `unsupported-scan`「未检测到文字层：暂不支持扫描版 PDF。请上传带文字层的电子版 PDF（扫描件 OCR 后续开放）。」；PNG 图片 → 422 `invalid-file`「暂不支持图片材料（…）。扫描件 OCR 与图片识别后续开放，请改用带文字层的 PDF 或文本材料。」；101 页 PDF → 422 `page-limit`「…共 101 页，超过单份 100 页上限…」；以上均上传即拒绝、不落库（材料清单保持 2 份不变）。第 4 份材料 → 503「本课题的材料已达上限（3/3）…」；free 档新建第 2 个课题 → 503 `quota-exceeded`「课题数量已达当前档位上限（1/1）…」。
- 命中提问（SSE，`POST /api/hidoc/workshops/[id]/chat`）：「心力衰竭的基本病因有哪些？」→ 38 个事件（progress 检索/生成 → delta 流式 → result），回答「根据材料，心力衰竭的基本病因包括：1. 原发性心肌损害…2. 心脏负荷过重…来源：（材料《心衰讲义.pdf》第 1 页）」；citationPanel「本轮命中 2 个材料片段」，条目含材料名 + 定位（「心衰讲义.pdf · 第 1 页」/「心衰专题笔记.md · 第 1–14 行」）+ 原文摘录；发送中输入与按钮禁用。
- 零命中（确定性，不调模型）：「量子力学的基本原理是什么？」→ 回答「这份课题（心衰专题）的材料里没有检索到与你问题相关的内容。我没有调用模型作答，以免编造材料里不存在的内容。可以尝试：换一种问法（用材料中的原词）、补充上传相关材料，或到对应教材的知识点里追问。」；citations 为空；`usage.hidocWorkshopChats` 不变，EventLog outcome `no-match` 如实记录。
- 无 key 明确报错（临时注释 `.env.local` 与 `.dev.vars` 的 `DASHSCOPE_API_KEY` 重启实测）：SSE 首个事件即 `error` / `chat-failed`「未配置答疑模型（DASHSCOPE_API_KEY / HIDOC_EXTRACT_PROVIDER），课题工作坊答疑暂不可用。」；0 条 delta、无启发式假回答；请求前后 EventLog 行数与 `usage.hidocWorkshopChats` 均不变（未调用模型不记账）。测后密钥与服务已恢复并复验正常。
- 额度拦截：用量写满 30/30 后提问 → SSE 0.2s 内 `error` / `quota-exceeded`「Hi doc 课题工作坊答疑（模型） 已用完（30/30），本月额度已耗尽…」，0 条 delta、未发起模型调用。
- 归属与越权（curl）：未登录 401「请先登录后再使用课题答疑。」；不存在的课题 GET/chat/DELETE 均 404「课题不存在或不属于当前账户。」；越权访问他人课题 GET/chat/files/DELETE 均 404（不泄露存在性）；删除材料后存储文件同步清理。
- 记账语义：EventLog `hidoc_workshop_chat` 共 8 行（5 次 success 计额度、3 次 no-match 不计），props 带 provider/model/outcome/questionChars/answerChars/hitCount/relatedKnowledgePointCount；`usage.hidocWorkshopChats=5` 与 success 次数一致。
- 「我的资料」替换接入：顶部横幅「『我的资料』已并入 Hi doc 课题工作坊：材料改存服务器、仅本人可见、可跨设备继续，并支持就材料追问答疑。前往课题工作坊。下方浏览器本地快练仍可继续使用，已保存的本地数据不会丢失。」；原 `PrivateMaterialsStudio` 本地快练完整保留未删数据；学习首页导航「导入 → /learn/my-materials」改为「工作坊 → /learn/hi-doc/w」，Hi doc 书架 headerMeta 增加「课题工作坊」入口。
- 响应式：390×844 两页（列表/房间）`scrollWidth === clientWidth === 390`，无横向溢出；移动端上传面板、材料卡、聊天气泡、citation 面板均单列堆叠。
- 控制台：仅两条预期内的 422 资源日志（故意触发的扫描件/图片拒绝），无 JS 错误。
- 证据：
  - `docs/design-references/hidoc-m6-workshop-list-2026-09-17.png`
  - `docs/design-references/hidoc-m6-room-files-2026-09-17.png`
  - `docs/design-references/hidoc-m6-reject-scan-2026-09-17.png`
  - `docs/design-references/hidoc-m6-chat-hit-2026-09-17.png`
  - `docs/design-references/hidoc-m6-chat-miss-2026-09-17.png`
  - `docs/design-references/hidoc-m6-room-mobile-2026-09-17.png`
  - `docs/design-references/hidoc-m6-chat-mobile-2026-09-17.png`
  - `docs/design-references/hidoc-m6-list-mobile-2026-09-17.png`
  - `docs/design-references/hidoc-m6-my-materials-banner-2026-09-17.png`

## Hi doc M7 — 支付打通（支付宝沙箱，四档订阅真实生效）（2026-09-19）

系统 Chrome（headless、无扩展、浅色）视口 **1440×900** 与 **390×844** + API 端到端（curl/Node fetch）；支付通道 `PAYMENT_PROVIDER=alipay`，网关 `ALIPAY_GATEWAY_URL=https://openapi-sandbox.dl.alipaydev.com/gateway.do`（沙箱，`.env.local` 与 `.dev.vars` 已同步）；正式定价（2026-09-18 用户拍板，`plans.ts` 唯一真相源）：Basic ¥19/月·¥49/季·¥149/年、Pro ¥49/月·¥129/季·¥399/年、Max ¥149/月·¥399/季·¥1299/年。

**验证方式与边界（如实声明）**：支付宝异步 notify 用「支付宝公钥」验签（已实证 `.env.local`/`.dev.vars` 中的 `ALIPAY_PUBLIC_KEY` 确为支付宝公钥：用它验证沙箱网关 `alipay.trade.query` 响应签名通过），其配对私钥仅支付宝持有，**本地无法伪造平台签名**。因此本地 notify 链路验证采用「服务端 `ALIPAY_PUBLIC_KEY` 临时替换为本地测试密钥对公钥（进程 env 覆盖，加密强度等价）→ 用配对私钥构造合法签名的 notify 表单 → POST `/api/pay/notify/alipay`」的方式，**这是模拟 notify，非支付宝服务器真实回调**；真实回调待部署公网后补验（同时确认 notify 验签规范后固定，当前实现为双规范兼容）。下单签名与跳转则为真实沙箱验证（非模拟）。

- **签名规则实证修正**：实测沙箱网关（`alipay.trade.query` 返回 `isv.invalid-signature` 并附网关验签字符串）证明当前网关请求验签字符串**包含 `sign_type`**、仅排除 `sign` 与空值；`buildSignString` 已修正（修正前签名实际无效）。
- 真实沙箱下单：`POST /api/pay/create-order {planId:"pro-month"}` → 200，`payment.type=redirect`，跳转 URL 指向沙箱网关且 `app_id`/`method=alipay.trade.page.pay`/`sign_type=RSA2`/`sign` 齐全，`return_url=http://localhost:3000/account/billing?orderId=…`、`notify_url=http://localhost:3000/api/pay/notify/alipay`（由 `NEXT_PUBLIC_SITE_URL` 拼装），`biz_content` 的 `out_trade_no`/`total_amount=49.00` 与订单及 plans.ts 一致。
- 沙箱收银台真实受理：GET 跳转 URL → 302 至 `excashier-sandbox.dl.alipaydev.com/standard/auth.htm?payOrderId=11571b11…`，页面标题「支付宝 - 网上支付 安全快速！」（含收银台/扫码/付款字样，无验签错误字样）。
- reconcile 真实查单：`GET /api/pay/reconcile?orderId=…` → `{ok:true, paid:false, queryError:"alipay query code=40004 msg=Business Failed"}`（未支付订单 `ACQ.TRADE_NOT_EXIST` 如实透出，不吞错）。
- 无密钥明确报错：以 `PAYMENT_PROVIDER=alipay` + 空 `ALIPAY_*` 密钥启动实例 → `create-order` **503** `{code:"channel_not_configured", error:"支付通道未配置完整（alipay 缺少 ALIPAY_APP_ID、ALIPAY_PRIVATE_KEY、ALIPAY_PUBLIC_KEY）…"}`，不静默回落 mock、不落订单。
- 模拟 notify 全链路（测试公钥实例）：验签通过返回 `success` → 订单 paid（channel=alipay、providerTradeNo 落库）→ 会员 tier=pro 即时生效、到期 now+30d → `/api/auth/quotas` 读出 pro（hidocChats/hidocNotes/hidocWorkshopChats 由 free 50/3/30 → unlimited，前后对比成立）；**幂等**：同报文重复 notify 仍 200 success、到期时间不变；**金额篡改**：合法密钥重签 `total_amount=0.01` → 400 `amount_mismatch`，新订单保持 pending、用户保持未开通，已支付订单上的篡改同样被拒（金额核对先于幂等）；**错误密钥签名** → 400；**app_id 不一致**（签名合法）→ 400；`WAIT_BUYER_PAY` → 400、`TRADE_FINISHED` → 受理。
- 续费叠加：第二单 notify 后到期时间 = 首单到期 +30.00d（不吞未到期时间）；**高档覆盖低档**：夹具设 max +10d 后购买 basic-month 并 notify → 档位保持 max、到期 = 原到期 +30.00d（追加在剩余期后，降档仅经到期自然回落）；**到期回退**：夹具置过期 → `/api/pay/subscription` 读出 free、配额回落（hidocChats=50）。
- 订单列表：`/api/pay/orders` 如实展示渠道 alipay、金额 ¥49.00、状态 paid/pending、时间。
- 计费页（`/account/billing`，`billing-panel.tsx` + `billing-panel.module.css`，全 CSS Modules 无内联样式）：三列档位卡（Basic/Pro/Max），头部右侧月/季/年分段控件（共享状态，切换后价格/CTA/折合 ¥/月 联动，季/年显示「折合约 ¥X.X/月」灰字）；卡片层级 档位名 → 40px 衬线大价格 + 灰色计费单位 → 通栏 CTA → 权益对勾清单（数字全部引用 `limits.ts`/`workshop-rules.ts`/`course-entitlement-policy.ts`/`quotas.ts` 真源头）；当前档位卡 2px 描边 + 右上「当前套餐」角标 + CTA「续订当前档位」；底部注记写明试点课免费、名额当月制、高档覆盖低档规则；订单记录表保留在页面下方（渠道列 520px 以下隐藏）。
- 支付面板与回跳：点「订阅 Pro」→ 面板出现「前往支付宝支付」（新窗口）+ pending 动点轮询（每 3 次轮询触发一次 reconcile 主动查单）→ notify 后面板自动翻为「已支付 · 会员已生效」；`return_url` 回跳（`?orderId=`）后进入同一轮询并展示已支付；面板脚注如实写明「开通以服务端验签后的异步通知或主动查单为准，页面回跳仅作结果展示」。
- 程序化布局断言：1440px `.cards` 三列（约 299px/列）、分段控件可见、价格 40px；390px 单列（358px）、分段控件可用（实测切「季」成功）；`documentElement.scrollWidth === clientWidth === 390` 无横向溢出；桌面与移动控制台 0 error。
- 单测：`tests/payment-service.test.ts` 22 项全离线（临时 SQLite 库 + 测试内生成 RSA 密钥对，不触网不碰 dev.db）；`npm test` 378/378；`npm run lint` 0 error；`typecheck` 干净；`npm run check`（build）通过。
- 证据：
  - `docs/design-references/hidoc-m7-billing-cards-month-2026-09-19.png`
  - `docs/design-references/hidoc-m7-billing-cards-year-2026-09-19.png`
  - `docs/design-references/hidoc-m7-billing-pay-pending-2026-09-19.png`
  - `docs/design-references/hidoc-m7-billing-pay-paid-2026-09-19.png`
  - `docs/design-references/hidoc-m7-billing-current-pro-2026-09-19.png`
  - `docs/design-references/hidoc-m7-billing-return-banner-2026-09-19.png`
  - `docs/design-references/hidoc-m7-billing-mobile-2026-09-19.png`

## Design System R1 — Workspace 壳 + Token 并存（2026-09-19）

playwright-core + 系统 Chrome（headless、无扩展、浅色），视口 **1440×900** 与 **390×844**；dev 服务与 `next start` 生产构建双环境各跑一轮全量脚本（`scripts/design-r1-check.mjs`，需 `npm i --no-save playwright-core`）。R1 范围：v2 token 落 globals.css（`--v2-*` 与既有 token 并存，既有值零改动）+ 六件套组件（`src/components/ui/v2/`）+ `(workspace)` 路由组壳（learn/courses/question-bank/account 迁入，URL 不变）+ `/design-system` 预览页 + NurAgentDock 收敛壳级单实例。**未改动任何业务页面的 DOM/样式；未碰 Tier 1/2/3。**

- Token 层：7 组原色阶（brand/text/bg/icon/border/success/error 50–900）+ `--v2-*` 语义层/字体（宋体显示/思源宋阅读/MiSans 紧凑 UI，拉丁回退）/圆角 8–24px/阴影/4px 间距，明暗两套完整落地；语义名与既有 shadcn token 冲突故加 `--v2-` 前缀（terracotta 主强调= `--v2-primary #C96442`、侧栏 `--v2-sidebar #F5F4EE`、页面底 `--v2-background #FAF9F5`），R2 逐面切换时再绑定。
- 路由迁移后全部 200 且 0 控制台错误、390 视口 `scrollWidth===clientWidth===390` 无横向溢出（dev 与生产各 14 项断言）；**像素对比口径如实声明**：壳（248px 侧栏 + 顶栏）是 R1 交付物，业务页内容宽度收窄必然回流，整页像素级不变物理上不成立；验收执行为「业务页面自身零改样式、内容区无壳注入样式」，留档迁移前 `r1-baseline-*` 与迁移后 `r1-after-*` 截图对照（页面自身配色/字体/组件样式一致，仅画框变化）。
- 壳：248px 侧栏（NUR LEARN 品牌 + 主入口 Hi doc/官方课程/题库/会员 + 最近学习：书架最近教材（登录后拉取，未登录不请求书架 API——修复过未登录 401 资源错误）+ 进行中课程两门试点课）；顶部细条（搜索占位 + ⌘K 徽标 + 用户/会员 chip「R1 验证 · Trial / 免费试用」或登录按钮）；⌘K 命令面板开/合正常（含 Esc、↑↓/Enter、静态入口聚合 + 书架教材），390 下侧栏收起为抽屉（汉堡开、scrim/Esc/点导航收）正常；1440 与 390 布局正确。
- `/design-system`（仅登录可见，未登录实见登录页；不在导航露出）：7 组色板逐格渲染正常、语义 token 卡、六件套全变体（Button 三变体×禁用/Badge 三变体×禁用/Card 四变体/Input field+bar×禁用/Chat Bubble user+assistant+禁用+Thread/Navigation tabs+rail+bottom-nav）、字体四样张、明暗切换开关实测 `documentElement.dark` 生效且暖炭灰整套生效（明暗两态截图）。
- Agent dock 收敛验证（逐旧挂载点探针，脚本断言「单实例 FAB + 点击开 + 正确 surface 标签 + 关闭」）：/learn 平台、/courses/tcm-diagnostics 平台、知识点页知识点、subjective-writing 写作室、case-reasoning 推理室、单题练习（/courses/tcm-diagnostics/question-bank/introduction/assessment-a1-introduction-principles）平台、/wrong-questions 平台、/learn/my-materials 平台——全部通过、pageerror=0；全局 /question-bank 页历史上就无 dock（dock 原挂在单题练习组件），行为未变。
- 顺带修复 pre-existing lint error：`use-draggable-fab.ts` set-state-in-effect（rAF 包裹，FAB 定位时序不变）。
- 已知事项（如实声明，R2 处理）：① 库自带暗色缺陷——secondary 按钮/标签暗色下浅底浅字（token 原值照搬，R2 需评审修正）；② dev 冷编译并行首访偶发 manifest `JSON.parse` 500（仅 dev、重试即好；生产构建验证无此问题）；③ 生产 `next start` 本地因「生产强制 Postgres」护栏注册 500，登录态相关检查以 dev 服务为准（脚本自动降级并如实报告）。
- 单测 385/385（379 既有 + `tests/ui-v2-smoke.test.ts` 六件套纯渲染冒烟 6 项）；`npm run lint` 0 error；typecheck 干净；`npm run check` exit 0。
- 证据：
  - 迁移前基线：`docs/design-references/r1-baseline-learn-1440.png`、`r1-baseline-courses-1440.png`、`r1-baseline-question-bank-1440.png`、`r1-baseline-account-billing-1440.png`、`r1-baseline-learn-hi-doc-1440.png`、`r1-baseline-learn-390.png`
  - 迁移后（壳 + 页面）：`docs/design-references/r1-after-learn-1440.png`、`r1-after-courses-1440.png`、`r1-after-question-bank-1440.png`、`r1-after-account-billing-1440.png`、`r1-after-learn-hi-doc-1440.png`、`r1-after-learn-390.png`
  - 壳交互：`docs/design-references/r1-after-palette-open-1440.png`、`r1-after-drawer-open-390.png`、`r1-after-shell-authed-learn-1440.png`
  - 设计系统预览：`docs/design-references/r1-after-design-system-1440.png`、`r1-after-design-system-dark-1440.png`、`r1-after-design-system-full-1440.png`
  - 生产构建复验：`docs/design-references/r1-prod-learn-1440.png`、`r1-prod-question-bank-390.png`

## Design System R2 — Hi doc 面换装 + 暗色模式启用（2026-09-19）

playwright-core + 系统 Chrome（headless、无扩展），视口 **1440×900 / 390×844**，dev 服务；脚本 `scripts/design-r2-check.mjs`（复用 R1 登录脚手架；动态路由 t/[id]、c/[n]、w/[id] 由脚本向 dev SQLite 插入临时教材/章节/知识点/讲义/课题造数，跑完级联删除）+ `scripts/design-r2-dark-audit.mjs`（暗色逐文本元素 WCAG 有效前景/背景对比度审计）。**暗色走真实链路**：`context.addInitScript` 写 `localStorage["nur-theme"]="dark"` → 根 layout 防闪烁脚本挂 `.dark`，不是脚本手动加类。

### R2-1 修复小包（先做先验，commit `64925f5`）

- 暗色 secondary 对比度（R1 已知事项①收口）：`.dark` 段 `--v2-secondary` `var(--text-900)`→`var(--bg-300)`、`--v2-secondary-foreground` `var(--bg-300)`→`var(--text-800)`；亮色值零改动、组件 css 零改动，button/badge 的 `.secondary`/`.muted` 全链路生效。`/design-system` 暗色实测 secondary 按钮 `rgb(48,48,46)` 底 + `rgb(241,241,239)` 字 ≈ 11.7:1（截图 `r2-1-design-system-dark-1440.png`，脚本 `scripts/design-r21-check.mjs`）。
- 壳 Trial 徽章 `.tierBadge`：暗色下 brand-100 底 + brand-700 字 ≈3:1 压线，` :global(.dark) .tierBadge` 反转为 `var(--brand-700)` 底 + `var(--brand-100)` 字（暗色下 brand 阶整体翻转，即深棕底浅字）。
- ⌘K 面板底部文案去内部备注泄漏：「R1 为壳，暂不做全局内容检索」→「仅页面导航，全文检索将在后续版本提供」。
- 验证：lint 0 error / typecheck 干净 / test 385 全绿。

### R2-2 Hi doc 面换装

范围：`/learn/hi-doc`（书架）、`/learn/hi-doc/t/[id]`（目录）、`/learn/hi-doc/t/[id]/c/[n]`（学习页）、`/learn/hi-doc/w`（工作坊列表）、`/learn/hi-doc/w/[id]`（工作坊房间）。`src/lib/hidoc/`、`src/content/`、`src/lib/payment/` 零改动；SSE/划线定位/配额/M0–M7 行为由 385 项测试守护未回归。

- **token 桥接（核心机制，非重写 CSS）**：`hi-doc.module.css` `.page` 上 8 个页面局部 token 改引 globals.css 全局 v2 token，约 160 处引用点自动生效、`.dark` 自动翻转：`--ink`→`var(--text-900)`、`--paper`→`var(--bg-200)`、`--paper-bright`→`var(--bg-100)`、`--muted`→`var(--text-500)`、`--line`→`color-mix(in srgb, var(--text-900) 38%, transparent)`、`--line-soft`→同式 16%、`--red`→`var(--error-600)`、`--blue`→`var(--v2-ring)`（聚焦描边统一 terracotta 为设计决策非等值替换：状态字/页码徽标/引用来源/流式 caret 由黛蓝转 terracotta 强调）。
- **散落硬编码 29 处**：`header` 半透明纸底→`color-mix(bg-200 96%)`；`errorBox` 红底→`color-mix(error-600 6%)`；`kpNavItem` hover 4%、`markdown code` 6%、`selectionBubble` 阴影 12% 均改 `color-mix(text-900 x%)`；`kpNavItemActive` 元字 72%→`color-mix(bg-100 72%)`（暗色下 active 项为浅底深字反色强调，语义成立）；`highlightItemFocus` 蓝底→`color-mix(v2-ring 6%)`；`migrateBanner`（/learn/my-materials，.page 作用域外）全部字面值改引全局 v2 token 随暗色翻转。`--hidoc-swatch-*` 四色划线族**字面值原样保留**（内容语义色，不属 v2 色板；暗色实测为低饱和暗彩，不刺眼，未加降饱和覆盖）。
- **对话气泡 v2 两级模式**（NUR-DESIGN-V2 §3，token 重皮不换 DOM）：user 气泡 ink 实底→`--v2-primary` 实底 + `--v2-primary-foreground` 字，assistant 纸卡→`--v2-card` 底 + `--v2-border` 边。不换 `V2ChatBubble` DOM 的原因：气泡内嵌 markdown 渲染 div 会落入组件 `<p>` 造成非法嵌套，且 280px max-width/流式 caret/滚动 ref 集成有回归风险（宁少勿滥）。
- **组件替换清单**（仅 props 全透传纯展示层）：`V2Button(primary)` ×9——书架「上传教材」、课题「新建课题」、房间「上传材料/发送(type=submit)」、目录「识别目录/重新识别目录/保存章节」、学习页「生成讲义/确认重新生成/发送(type=submit)」、笔记「生成学霸笔记/确认重新生成/下载 .md」；`V2Badge(muted)` ×4——书架在用/冻结教材状态、房间材料状态（原 `.textbookState` `<p>`）。刻意不换：ghost/danger/icon 按钮与划重点气泡内按钮（38px 紧凑规格 + Link 元素，token 重皮足够）；学习页讲义/追问/笔记 tab 保留原 DOM；`workshops.note` 仍为正文非徽章。`.page .v2Button` 字体断言（0,2,0）防 `.page button font:inherit` 重置（0,1,1）盖掉六件套字体。
- **暗色基建（全局）**：根 layout `<head>` 内联防闪烁脚本 `try{if(localStorage["nur-theme"]==="dark")...add("dark")}`，`<html suppressHydrationWarning>`（预期属性不一致）；壳顶栏右侧 Sun/Moon icon button（aria-label 切换暗色/亮色 + aria-pressed），点击写 `localStorage["nur-theme"]`，默认 light，挂载后 rAF 读当前态；`/design-system` 预览页移除自带局部切换（防与壳全局切换状态失同步），统一走壳按钮。

### R2 验证（2026-09-19）

- 命令套件：`npm run lint` 0 error / typecheck 干净 / `npm run test` 385/385 / `npm run check` exit 0。
- 浏览器矩阵（`design-r2-check.mjs` 终轮全绿）：5 条 Hi doc 路由 + `/learn` + `/design-system` × 亮/暗 × 1440/390 共 28 组全部 200、控制台 0 错误、390 无横向溢出；暗色组全部经真实防闪烁链路生效（`dark=true`）。
- 明暗切换交互：壳按钮 aria-label 初值「切换暗色」→ 点击后 `.dark` 挂载 + `nur-theme=dark` → **reload 后保持暗色**（防闪烁脚本 + localStorage）→ 再点恢复亮色 `nur-theme=light`（截图 `r2-toggled-dark-bookshelf-1440.png` / `r2-toggled-dark-bookshelf-reload-1440.png`）。
- 暗色对比度审计（`design-r2-dark-audit.mjs`）：书架/目录/学习页/工作坊房间/design-system 五面逐可见文本元素算有效前景×背景 WCAG 对比度，<2.5 标记；终轮 0 个。过程中抓到并修复 1 处：design-system 预览页 emphasis 卡（反色强调面）内的自定义 `.sectionNote` 说明字浅底浅字 → 加 `.emphasisNote { color: inherit }` 随卡面继承。
- 水合修复：防闪烁脚本预挂 `.dark` 与 SSR 输出 className 不一致触发 hydration 警告（首轮矩阵 19 处失败均此因）→ `<html suppressHydrationWarning>` 后 0。
- 已知事项（如实声明）：① dev 冷编译偶发 manifest `JSON.parse` 500（R1 已知②，本轮两整轮重跑确认失败路由游走、签名一致，脚本已按签名自动整页重试一次，终轮全绿；生产构建无此问题）；② `/learn` 周计划仪表盘内容面与 `/learn/my-materials` 本地快练内容面仍为 v1 浅色皮（R3 范围，暗色下呈现「暗壳 + 浅色内容」过渡态，壳与 Hi doc 五面已成套变暗无此问题）；③ 生产 `next start` 注册接口 500 为环境护栏，登录态检查以 dev 为准（同 R1）。
- 证据（`docs/design-references/`）：亮色 `r2-learn-hi-doc-1440.png`、`r2-learn-hi-doc-t-1440.png`、`r2-learn-hi-doc-t-c-1-1440.png`、`r2-learn-hi-doc-w-1440.png`、`r2-learn-hi-doc-w-room-1440.png`、`r2-learn-1440.png`、`r2-design-system-1440.png` 及对应 `-390.png`；暗色同名 `-dark` 全套（14 张）；切换交互 `r2-toggled-dark-bookshelf-1440.png`、`r2-toggled-dark-bookshelf-reload-1440.png`；R2-1 `r2-1-design-system-dark-1440.png`。

## Design System R3 — 官方课 + 题库 + 计费 + 私人过渡面换装，错题中心归壳（2026-09-20）

playwright-core + 系统 Chrome（headless、无扩展），视口 **1440×900 / 390×844**，dev 服务（`next dev --webpack`）；脚本 `scripts/design-r3-check.mjs`（复用 R2 登录脚手架；动态路由所需 Hi doc 教材由脚本向 dev SQLite 插入后级联删除）+ `scripts/design-r3-dark-audit.mjs`（15 面暗色逐文本元素 WCAG 有效对比度审计）。**暗色走真实链路**：`context.addInitScript` 写 `localStorage["nur-theme"]="dark"` → 根 layout 防闪烁脚本挂 `.dark`。范围：17 个 CSS module（A 官方课 6 / B 题库考试 6 / C 计费账户 2 / D /learn 与私人过渡态 3）+ 错题中心路由归壳。`src/lib/`、`src/content/`、`prisma/` 零改动；官方课证据分级文案与语义零改动；385 项测试守护行为无回归。

### 逐 module 桥接 token 数与散落字面值

| module | 局部 token | 散落字面值桥接处 |
|---|---:|---:|
| `course-catalog` | 7 | 0 |
| `course-landing` | 7 | 0 |
| `course-workspace` | 8 | 15（中性黑 5/8/9/22/7/6/10% 等 14 处 + 反色白 3 处 + `#080808` 头像 3 处 + `#e16861` 3 处 + 朱砂浅底 2 处） |
| `knowledge-point-lesson` | 8 | 4（中性黑 12/10% + 反色白 2 处 + `#080808` 3 处 + 纸底/朱砂底） |
| `subjective-writing-room` | 8 | 8（同上模式 + 纸卡半透明 + placeholder 次级墨） |
| `case-reasoning-room` | 8 | 7（同上模式 + 石板蓝确认条 7%） |
| `question-bank-global` | 8 | 4（中性黑 8/4/4/7%） |
| `question-bank-home` | 7 | 0 |
| `question-bank-chapter` | 7 | 1（中性黑 4%） |
| `question-bank-practice` | 7 | 2（朱砂浅底 6%/4%） |
| `mock-exam-room` | 7 | 5（中性黑 6/7/40% + 黛蓝 8% + 朱砂 8%） |
| `wrong-question-center` | 5（含 `--rule`/`--cinnabar`） | 4（白色提亮覆盖 35/60/40/40%） |
| `billing-panel` | 9（含 `--jade`） | 5（`#8a6d3b` 2 处 + `#2a2a27` 墨底 hover 2 处 + 中性黑 6%） |
| `learning-memory-panel` | 0（无局部 token 块） | 20（暖黑/纸底/朱砂系 → text-900/bg-100/brand-600；黛蓝 → v2-ring；橄榄绿 → success-600） |
| `learning-dashboard` | 7 | 10（中性黑 10/26/2.8% + 反色白 2 处 + `#080808` 3 处 + 纸底 96/72/55% + 纯黑 62/2/4%） |
| `private-materials-studio` | 6 | 3（`#fffaf0` → bg-100、`#666` → text-500 2 处、`var(--border)`→v2-border、`var(--accent)`→v2-ring） |
| `private-practice-room` | 7 | 1（中性黑 4%） |
| `material-intake-review`（附带修复） | 1（`--paper-light`→bg-100） | 0 |

桥接口径：`--ink`→`var(--text-900)`、`--paper`→`var(--bg-200)`、`--paper-bright`→`var(--bg-100)`、`--muted`→`var(--text-500)`、`--line`→`color-mix(in srgb, var(--text-900) 38%, transparent)`、`--soft-line`/`--line-soft`/`--rule`→同式 16%、`--red`→`var(--error-600)`、`--blue`→`var(--v2-ring)`（聚焦/状态强调统一 terracotta，设计决策非等值替换）、`--cinnabar`→`var(--brand-600)`、`--jade`→`var(--success-600)`。反色面（`background: var(--ink)`）上的 `rgb(255 255 255 / x%)` 改 `color-mix(in srgb, var(--paper-bright) x%, transparent)`——`.dark` 下 `--ink` 翻浅、`--paper-bright` 翻深，反色强调语义仍成立（与 R2 `kpNavItemActive` 同手法）。**证据分级关系标签**（`relationshipList strong[data-relationship]` 的 `related`/`learning-aid`）仍由 `--red`/`--blue` 承接，语义未变（只换皮不换内容）。

### 六件套替换点清单

| 位置 | 替换 | 说明 |
|---|---|---|
| `billing-panel` 档位卡 CTA ×3 | → `V2Button` | 当前档位 `secondary`、其余 `primary`；CSS 只留 `margin-top/width`（`.page .cta` 0,2,0）与 `.page .v2Button` 字体断言 |
| `billing-panel` 「当前套餐」角标 | → `V2Badge(muted)` | 原为 `.cardCurrent::before` 生成内容；新增 `.card .currentBadge` 仅补绝对定位 |
| `mock-exam-room` 交卷 | → `V2Button(primary)` | `.container .abandonButton` 只留 gap/padding |
| `mock-exam-room` 确认交卷 | → `V2Button(primary)` | `.container .modalPrimary` 只留与次按钮一致的尺寸 |
| `mock-exam-room` 继续模考 | → `V2Button(primary)` | `.container .resumeButton` 只留尺寸 |
| `mock-exam-room` 开始模考 / 再来一次 | → `V2Button(primary)` | `.container .startButton` 只留尺寸（原 hover 反色规则删除，交给六件套） |
| `wrong-question-center` 题型徽章 | → `V2Badge(outline)` | `.container .wrongItemKind` 覆盖行内尺寸；窄屏 `display:none` 同步提权保隐藏 |

**刻意不换（退回 token-only，注明原因）**：
- `course-catalog` / `course-landing` 课程卡片：现有卡片是 `Link` 主导 + 通栏分隔页脚两区布局，`V2Card` 的固定 18px 内边距 / `overflow:hidden` / `min-height:150px` 与「页脚需通栏贴边」冲突，换后布局行为存疑 → 退回 token-only。
- `question-bank-practice` 提交按钮：`question-bank-practice.tsx` 含工作区未提交的用户逻辑改动（题型筛选 query 透传 / 进度索引），换 `V2Button` 需改该文件 → 退回 token-only（CSS 保留原按钮样式），避免把用户逻辑混入 R3 提交。
- 写作间 / 推理间 / 讲义页：全部保留原 DOM（自核勾选、证据选择、阶段草稿的键盘与焦点逻辑不动），仅吃 token 重皮。
- 错题中心 tab 与统计数字：tab 是 `button[role=tab]` 切换 + 计数徽标，非静态展示，保留原 DOM。

### 过渡期收尾
- **错题中心归壳（本期唯一路由目录变更）**：`git mv src/app/wrong-questions src/app/(workspace)/wrong-questions`（page/error/loading 三文件），URL `/wrong-questions` 不变。归壳前：裸页面，无侧栏/顶栏，暗色下整页仍为浅色皮；归壳后：侧栏「主入口」导航 + 顶栏（含主题切换）+ 暗色成套生效。`robots.ts` 与 dashboard/课程页的 `/wrong-questions` 链接均为绝对路径，零改动。
- ⌘K 面板数据源复查：`shell-data.ts` 的 `PRIMARY_ENTRIES`（Hi doc/官方课程/题库/会员）、`ACTIVE_COURSE_ENTRIES`（两门试点课）、`fetchRecentTextbooks` 书架教材全部指向现行路由，无旧过渡面死链；本期不新增检索（R4）。

### R3 验证（2026-09-20）

- 命令套件：`npm run lint` 0 error（188 条既有 warning 未增）/ typecheck 干净 / `npm run test` 385/385 / `npm run check` exit 0（build 通过）。
- 浏览器矩阵（`design-r3-check.mjs` 终轮 `ALL CHECKS PASSED`）：15 条路由 × 亮/暗 × 1440/390 **共 60 组全部 200**、控制台 0 错误、390 视口 `scrollWidth===clientWidth===390` 无横向溢出；暗色组全部经真实防闪烁链路生效（`dark=true`）。
- 错题归壳断言：`[wrong-questions-shell] content=true sidebarNav=true themeToggle=true errors=0`（页面 H1 含「错题」+ 侧栏 `nav[aria-label='主入口']` 存在 + 顶栏主题切换按钮存在）。
- 明暗切换交互：壳按钮 aria-label 初值「切换暗色」→ 点击后 `.dark` 挂载 + `nur-theme=dark` → **reload 后保持暗色** → 再点恢复亮色 `nur-theme=light`（截图 `r3-toggled-dark-learn-1440.png` / `r3-toggled-dark-learn-reload-1440.png`）。
- 暗色对比度审计（`design-r3-dark-audit.mjs`）：15 面逐可见文本元素算有效前景×背景 WCAG 对比度，<2.5 标记；首轮抓到 2 处真实缺陷——`/learn/my-materials` 内嵌 `material-intake-review` 上传 dropzone（`<strong>选择 Word 或 PDF</strong>` fg=rgb(250,249,245) bg=rgb(247,244,238) ratio=1.04、提示行 ratio=1.88），根因是该 module 消费全局旧 token `--paper-light`（`:root` 仅浅色值、`.dark` 未覆盖）→ 在该子树 `.intake` 改引 `var(--bg-100)`；修复后终轮 15 面全部 0 个。
- 已知事项（如实声明）：① dev 冷编译偶发 manifest `JSON.parse` 500（R1 已知②，脚本按签名自动整页重试一次；生产构建无此问题）；② 整轮 60 次页面加载后浏览器高负载下 `page.screenshot` 偶发字体加载超时（首轮 mock-exam @390 dark 命中），脚本已改为截图超时仅告警不计入判定——属证据留档脚手架时序，非页面缺陷（同轮该路由 200、0 错误、无溢出）；③ 生产 `next start` 注册接口 500 为环境护栏，登录态检查以 dev 为准（同 R1/R2）。
- 未纳入提交：`question-bank-chapter.tsx/.module.css`、`question-bank-practice.tsx/.module.css` 含工作区既有未提交逻辑改动（题型筛选/进度索引），R3 已在其上做叠加式 token 桥接（改定义值、不回滚逻辑），但按边界要求不纳入任何 R3 commit，留待用户与其逻辑改动一并处理；infectious-* 全套同样未纳入。
- 证据（`docs/design-references/`，共 63 张）：亮色 `r3-learn-1440.png`、`r3-learn-my-materials-1440.png`、`r3-courses-1440.png`、`r3-course-workspace-1440.png`、`r3-knowledge-point-1440.png`、`r3-subjective-writing-1440.png`、`r3-case-reasoning-1440.png`、`r3-question-bank-global-1440.png`、`r3-question-bank-home-1440.png`、`r3-question-bank-chapter-1440.png`、`r3-question-bank-practice-1440.png`、`r3-mock-exam-1440.png`、`r3-wrong-questions-1440.png`、`r3-account-billing-1440.png`、`r3-design-system-1440.png` 及对应 `-390.png`；暗色同名 `-dark` 全套（30 张）；归壳 `r3-wrong-questions-in-shell-1440.png`；切换交互 `r3-toggled-dark-learn-1440.png`、`r3-toggled-dark-learn-reload-1440.png`。
## Design System R4 — ⌘K 真检索 + 移动端深化，设计系统 v2 主线收官（2026-09-20）

两个独立提交：**R4-1** `feat(design): R4 command palette content search`（`src/lib/search-index.ts` + 命令面板 + 单测 + 浏览器脚本）与 **R4-2** `feat(design): R4 mobile touch deepening + v2-smoke flake fix`（触控/抽屉/⌘K 底部弹出 + 顺手项）。`src/content/`、`prisma/`、`src/lib/` 其余文件零改动；不新增路由、不新增依赖、不搜题库题目正文、不新增网络请求。工作区既有未提交改动（question-bank-chapter/practice、bot-blob-shapes、infectious-* 等）保留原样、未纳入任何 R4 commit。

### R4-1 ⌘K 真检索（页面跳转器 → 站内内容检索）

- 新增 `src/lib/search-index.ts`（纯函数、无 React、无网络、无磁盘）：四类条目——①章节（每门已发布课每章；闭环课走课程工作台 `/courses/{slug}`（章节目录为页内状态）、题库课走 `/courses/{slug}/question-bank/{chapterSlug}`）②知识点（仅闭环课、`lesson !== null`；title + note 参与匹配；href 即知识点讲义路由；题库课 `lesson` 全为 null 故不出知识点条目）③Hi doc 教材章节（书架内存数据派生，`/learn/hi-doc/t/{id}/c/{n}`，不上送不写盘）④页面入口（R1 全部静态条目）。分组顺序 官方课程→题库→书架教材→页面，每组 8 条截断 + 「还有 N 条，输入更精确的关键词」，空态「没有匹配的内容」，页脚「↑↓ 选择 · Enter 跳转 · Esc 关闭」。归一化：NFKC 全半角折叠 + 小写 + 去空白，未引入拼音依赖。
- **bundle 教训（实测，勿回退）**：在客户端组件顶层 `import publishedCourses` 会把整个课程树（含 9k+ 题库 item）打进客户端 bundle——实测 (workspace)/layout chunk 膨胀至 ≈9.5MB。最终方案：服务端薄适配层（`(workspace)/layout.tsx`）经 `selectCourseSearchSource` 把课程投影为最小字段（slug/title/catalogLabel + 章节 slug/indexLabel/title + KP slug/title/note/hasLesson/预计算 chapterTitle；不带任何长 id、不带 focus、不带 knowledgePointIds），客户端 `CommandPalette` 仅在 useMemo 里以该投影构建条目。实测：/learn 客户端 JS 增量 **+1.0KB gzip**（远低于 30KB 预算）；HTML RSC 载荷增量 +17.0KB gzip（385 → 400 章/KP 文本投影，多为 KP note，属检索功能必要数据，如实记录）。
- 页脚快捷键说明兑现 R1 承诺：删除「全文检索将在后续版本提供」，改为「↑↓ 选择 · Enter 跳转 · Esc 关闭」。
- 新增单测 `tests/search-index.test.ts`（10 例）：四类条目构建、NFKC 归一化、includes 匹配、分组与每组 8 条截断/overflow、`lesson: null` 跳过、空查询/空结果、`selectCourseSearchSource` 最小字段裁剪（不带重型字段与长 id、chapterTitle 与 `selectChapterForKnowledgePoint` 口径一致、JSON 可序列化）。

### R4-2 移动端深化（只动 CSS module 与壳组件，零业务逻辑）

- 触控目标 ≥44×44（≤900px 段，min-* 手法不动桌面）：壳内 `.brand/.navLink/.hamburger/.searchTrigger/.themeToggle/.userChip/.loginLink`、⌘K 面板 `.item`（≤900）、V2 六件套 `.tab/.item/.navItem`（≤640 段，含 display:inline-flex/flex 修正）。V2Button 本就有 `min-height:44px`；V2Badge 为非交互展示件（错题题型徽章、计费角标）无交互变体使用点，不改并在此注明。
- 抽屉交互补完：Esc 关闭（R1 已有，本轮浏览器验证）；新增 **body 滚锁**（documentElement `overflow:hidden`，关闭还原原值）与**焦点管理**（打开→焦点入抽屉第一个条目，关闭→还给汉堡按钮；`react-hooks/exhaustive-deps` 要求下在 effect 内捕获 hamburger 引用）。
- ⌘K 面板 ≤480px（390）：全宽底部弹出（贴底 gap=0、圆角仅上沿 20px、`max-height:70dvh`、list flex 滚动），条目高度 44px；≥481px 居中浮层不变。
- 密度审计（390×844）：主内容页（/learn、课程工作台、题库练习）截图逐张核对——上下留白与卡片间距均衡，**未发现失衡，未改动任何间距数值**（按约定不为凑工作量动数值）。
- Agent 浮球 390 复核：默认落位 (306,760) 56×56，与课程工作台主 CTA（`sessionStartLink`）包围盒无交集（`intersects=false`），不遮抽屉边缘手势区，维持现状不动。
- 顺手项（v2-smoke flake 修复，仅动 `tests/`）：`before()` 中 `Promise.all` 6 个动态 import 与 `register()` 的 ESM 钩子存在时序竞态（偶发 CSS 被当 JS 解析 → 6 cancelled）。修复：`register()` 后先空转 `await import("./helpers/css-module-stub.mjs")` 让出事件循环确保钩子 attach，再把 6 个 import 改为**串行 await**；`npx tsx --test tests/ui-v2-smoke.test.ts` 连跑 3 次 6/6 pass。

### R4 验证（2026-09-20）

- 命令套件：`npm run lint` 0 error（188 条既有 warning 未增）/ typecheck 干净 / `npm run test` **395/395**（385 基线 + 10 新检索测试）/ `npm run check` exit 0。
- Bundle 对比（git worktree @R3 基线 HEAD vs 本期，同机两次 `next build`）：/learn 客户端 JS **+1.0KB gzip**（150.3→151.3KB，远低于 30KB 预算）；/learn HTML RSC 载荷 +17.0KB gzip（63.3 → 80.3KB，课程 title/slug/note 投影，详见上）。
- 浏览器（`scripts/design-r4-check.mjs`，playwright-core + 系统 Chrome，`--only search,touch,fab` / `--only matrix` 分段防 dev 长跑内存重启）：⌘K 检索「寒热」命中知识点「问寒热」→ Enter 跳 `/courses/tcm-diagnostics/knowledge-points/cold-and-heat`；检索「八纲辨证」→ 章节条目 → 课程工作台；「不存在的东西」空态；书架教材按名命中 → `/learn/hi-doc/t/{id}/c/1`；页脚快捷键文案断言通过。390 触控：hamburger/搜索触发/主题切换/用户卡全部 44×44；抽屉打开（滚锁 + 焦点入抽屉 + 条目 44px）/ Esc（滚锁还原 + 焦点还汉堡）/ scrim 关闭全过；⌘K 面板 x=0 w=390 bottomGap=0 h=591≤70dvh 上沿圆角 20px、条目 44px；浮球 (306,760) 56×56 与主 CTA 无交集。矩阵 **15 路由 × 亮/暗 × 1440/390 共 60 组全部 200**、0 控制台错误、390 `scrollWidth===clientWidth===390`、暗色全走真实防闪烁链路。
- 390 密度审计：/learn、课程工作台、题库练习、Hi doc 学习页截图逐张核对，上下留白与卡片间距无过稀/过挤，按约定未改任何间距数值。
- 已知事项（如实声明）：① dev 长跑（连续 60+ 页面加载）会触发 Next dev 内存阈值自动重启 → `ERR_CONNECTION_RESET`，脚本支持 `--only` 分段（search,touch,fab / matrix）规避，非页面缺陷；② dev 冷编译 manifest 竞态有两种报错文案（`Unexpected end of JSON input` / `Manifest file is empty`），脚本两者均自动整页重试一次；③ 题库章节页/刷题间（`question-bank-chapter/practice`）含工作区未提交逻辑改动，其内纯文本回链未做 44px 命中区补足，留待用户逻辑改动一并处理。
- 未纳入提交：`question-bank-*` 既有未提交改动、`infectious-*` 全套、`docs/QUESTION_BANK_EXTRACTION.md`、R1/R2 截图刷新（工作区既有状态，全部保留）。
- 证据（`docs/design-references/`，共 65 张）：⌘K 交互 `r4-palette-search-hanre-1440.png`、`r4-palette-empty-1440.png`、`r4-palette-shelf-1440.png`；390 触控 `r4-drawer-open-390.png`、`r4-palette-390.png`；R3 回归矩阵 15 路由 × 亮/暗 × 1440/390 共 60 张（`r4-{route}-{viewport}[-dark].png`）。

## Design System v3 — 桌面优先工作台（2026-09-24）

当前视觉系统。规则与改前计数见 `docs/DESIGN_V3.md`。

- 改前同伴卡：`/learn` 12 张（3 入口 + 案例 + 4 推理 + 双视角 + 3 进度）。Hi doc 书架在 5 本在用教材的对照样本上是 7 张（名额板 + 上传板 + 5 本教材卡）。
- 改后：`/learn` 桌面 5 张、390px 3 张。书架同一 5 本样本桌面 4 张（上传 + 3 本）、390px 3 张。名额改成一行字。「其余 N 本」才展开。
- 三张入口卡文案不再出现在 `/learn`。左栏仍链到 `/courses`、`/learn/hi-doc`、`/question-bank`。侧栏 280px。⌘K 在桌面和 390 都是贴底全宽，每组最多 6 条。
- Hi doc 八步都有下一步说明、进度、状态和「下一步」。文字层 PDF 走 pdf.js，DOCX 走 mammoth；扫描件 / 图片 / `.doc` 明确拒绝。DOCX 页码显示为待确认。生成物不出现可关联 / 帮助理解 / 不可直接等同。
- 单测：`tests/design-v3-density.test.ts`、`tests/design-v3-flow.test.ts`，以及 `tests/search-index.test.ts` 的 6 条上限。`src/content/courses/` 与 `src/content/materials/` 无 diff。
- 浏览器核对：生产构建 `next start` 上 `scripts/design-v3-check.mjs` 两轮 1440 与 390 路由矩阵均为 `V3 CHECK PASSED`（侧栏 280、主画布 ≥70%、无三入口卡、⌘K 贴底全宽且每组 ≤6、Hi doc 有进度/状态/下一步、390 `scrollWidth === clientWidth === 390`）。截图在当次 scratch 的 `v3-launch/`。本次不提交。


## ZCODE-M1 — Ariadne 品牌迁移 + 代码清理 + 前端基础重写（2026-09-30）

任务书 `docs/ZCODE-M1-ariadne-migration.md`，三阶段全部完成；`npm run check` exit 0 / `npm run test` 402/402。

### Phase 1 代码清理

- 删除 12 个已合并分支（保留 `main`、`feat/saturn-ring`）；删除未使用文件 `course-builder-workbench.tsx`（含 module.css）/`course-entitlements.ts`/`ui/button.tsx`；删除 118 项 Trae 提取脚本与元数据。
- 任务书偏差：`src/lib/qb-course-transform.ts` 实际被 15 个 Tier 1 题库课程文件引用（任务书写 0 引用），按「误删即恢复」原则保留。
- 基线修复：commit 20415fe 引入的 `tests/helpers/css-cjs-stub.cjs` 带一条既有 lint error（.cjs 里 require 导入），加行内 eslint-disable（.cjs 设计如此）使 check 恢复可过。
- 既有问题（未动）：package.json `preview`/`deploy` 引用的 `scripts/clean-opennext.mjs` 本就不存在。

### Phase 2 品牌迁移（NUR LEARN→Ariadne、Hi doc→Clew）

- 文件/目录全部 git mv：`learn/hi-doc→learn/clew`、`api/hidoc→api/clew`、`lib/hidoc→lib/clew`、`types/hidoc.ts→clew.ts`、10 个 `hi-doc-*` 组件、7 个 `tests/hidoc-*`。
- 全部大小写变体替换（HiDoc/HIDOC/hiDoc/hidoc/hi-doc/Hi doc/HI DOC/Hidoc/NUR LEARN/Nur Learn）；`nur-learn` localStorage 键前缀**保留**（浏览器本地数据连续性，也不匹配验收 grep 模式）。
- Prisma：9 个模型 `HiDoc*→Clew*` 全部 `@@map` 保表名；字段 `clewLessonStyle @map("hiDocLessonStyle")`；validate/generate 通过；既有 migrations 未动。走查中实测抓到列名漂移（登录 500：`User.clewLessonStyle` 不存在）即此因，@map 后恢复。
- 路由 `/learn/clew/*` + `next.config.ts` redirects `/learn/hi-doc/:path*`→`/learn/clew/:path*`（permanent=308）。
- `.hidoc-storage→.clew-storage`（本地 1.9M 已传教材 mv 保留）+ .gitignore；package.json name=ariadne；AGENTS.md 已替换并跑 sync-agent-rules.sh。
- 残留 grep 清零（src/ 含大小写/分隔符变体）；docs/ 历史文档与 prisma/migrations 作为史迹保留不改。
- 测试守卫：design-v3-density「does not edit course or material truth」改为 diff 品牌令牌归一化后 1:1 相等断言——语义改动依然失败，纯品牌替换放行（9 个课程文件来源标注文案按任务书替换）。

### Phase 3 前端基础重写

- Page Chat：`NurAgentChat` 新增 `mode`（floating/embedded/page-chat，默认 floating 行为不变）+ `contextChip` props；Clew 学习页追问面板加显式 chip「当前知识点：{title} · 第 {sourcePage} 页」，点击展开 KP 说明。实现说明：Clew 追问保留专属 `/api/clew/kp/[id]/chat` 后端（服务端 chat-prompt 本就注入当前 KP 标题/页码/说明/术语），不接 `/api/nur-agent/chat`（官方课契约，接入会丢对话持久化与讲义上下文，Tier 3 边界）。
- SpineEditor：编辑模式新增拖拽手柄（HTML5 DnD 排序）、相邻「并入上一章」（PDF 扩页码 / DOCX 拼标题）、底部确认栏（干净=「确认章节结构并开始萃取」，脏=「保存修改并萃取」+「放弃修改」）；服务端 `confirmClewTocStructure`（chapters.ts，复用手动修正事务+盖 `spineConfirmedAt`）+ `POST /api/clew/textbooks/[id]/toc/confirm`；萃取服务门禁未确认返回 409 `spine-not-confirmed`（走查实测在模型调用前触发）；重新识别/手动修正会作废既有确认。
- 配额 chip：左栏底部常驻「本月教材名额 {used}/{limit} 本」+「本月模型调用 {n} 次」（真实数据：书架 quota + /api/auth/quotas 的 clew* 合计）。偏差：任务书「token 估算」按项目不造假数据原则替换为真实模型调用计数。
- 走查（dev，1440×900 与 390×844）：名额 chip 两行显示；未确认→3 个萃取键全禁用+提示、确认→全解锁+「章节结构已确认」；编辑模式 3 手柄/2 合并按钮、合并后脏标签翻转、放弃修改恢复；chip 展开 aria-expanded 正常；390 两页 `scrollWidth===clientWidth===390`。截图 `docs/design-references/zcode-m1-*.png` 共 4 张。
- 走查环境注：为两个既有一次性验证账号（hidoc-m2-*/hidoc-m4-verify-*@example.com）设置了已知本地密码（仅 dev.db，本地）。
- 全部改动留在工作树未提交，等待用户决定提交/合并（AGENTS 约定不主动 commit）。


## ZCODE-M2 — Clew Harness + Loop Profile + 教材编译管线（2026-10-01）

任务书 `docs/ZCODE-M2-clew-harness.md`，Phase 0–4 全部完成；`npm run check` exit 0（0 error）/ `npm run test` 431/431（新增 29）。

### Phase 0 NUR AGENT 品牌统一

- 用户可见文案清零：`nur-agent-dock.tsx`（FAB aria-label、抽屉 aria-label、标题）、`nur-agent-pilot.tsx`（`ARIADNE AGENT · LOCAL RUNTIME`、重新运行按钮）、`clew-study.tsx`（`NUR 讲解`→`Clew 讲解`）、`private-practice-room.tsx`（问 Ariadne Agent）、`quotas.ts` 配额标签、`/learn` metadata、法务 AI 免责、design-system 预览 meta。
- 按任务书保留：`nur-agent` 内部代码标识（文件路径/组件名/localStorage 前缀）、`NUR 结构`（答题结构域概念）、`NUR/Qwen 参考`（authority 标记）、代码注释与模型 prompt。

### Phase 1–2 Harness + 编译管线（服务端）

- 新文件：`src/lib/clew/agent-loop.ts`（ToolLoopAgent + 5 工具 + 配额门槛）、`providers/dashscope.ts`（server-only，qwen3.7-plus，baseURL 白名单 aliyuncs.com）、`prompts.ts`、`compiler.ts`（纯编排，ports 注入可测试）、`compiler-server.ts`（真实服务绑定 + 证据落库 + 编译缓存）、`evidence.ts`（页级证据原子 + bigram 相似度关联）、`structure.ts`（两层结构 + 三视图派生）、`resilience.ts`（失败隔离 + 指数退避）。
- 既有萃取路由 `POST /api/clew/textbooks/[id]/chapters/[order]/extract` 改走 Harness（`extractChapterThroughHarness`），SSE 事件契约不变（progress 阶段/kp 逐条/result 不变）；新增全书编译 `POST /api/clew/textbooks/[id]/compile`（SSE：progress → chapter → done，单章失败隔离）。
- 偏差说明（任务书 5.2）：讲义路由保留既有直连服务（`generateClewKnowledgePointLesson`），不改走 ToolLoopAgent 决策循环——M4 契约要求无 key 时启发式兜底 + SSE 事件/配额/持久化行为不变，强套 Agent 循环会多一次模型调用且破坏兜底。Agent 的 `generateLesson` 工具已绑定同一服务供 Harness 编排调用。
- 萃取时 LoopProfile：`suggestClewKpLoopProfile` 规则引擎（描述长度折算时长，Clew KP hasLesson=true），落库 `loopProfileId + loopProfileAssignedBy`。

### Phase 3 学习页按 Profile 渲染（浏览器验证）

- 新组件 `clew-loop-profile.tsx`：`ClewLoopProfileBadge`（点击展开六选一下拉，走 `PATCH /api/clew/kp/[id]/loop-profile`，落库 user-selected）+ `ClewStageNav`（按 profile 渲染环节，Lucide 细线图标 BookOpen/PenLine/ClipboardCheck/Stethoscope/RotateCw/Route——按设计规则用图标不用 emoji）。
- 学习页 KP 头部行（kicker + 徽章）、描述下环节导航 + 退出行为说明；左栏知识点列表加 profile 名小字。
- 浏览器走查（dev，1280×720，登录 m2qa@ariadne.test / M2qa-test-2026，本地 dev.db 测试账户+种子教材）：
  - 「概念理解」KP 环节导航只显示 01 学 / 02 评 / 03 复 ✓（验收标准）。
  - 切换「技能应用」：PATCH 200 → DB `loopProfileId=skill-application, assignedBy=user-selected` → 徽章与环节导航即时变为 01 学…05 复 ✓。
  - 整页截图核对：徽章/环节导航/左栏列表无重叠溢出，象牙纸黑字方角编辑风格一致 ✓。
  - 注：走查初期一台旧 dev server（陈旧 webpack 编译）显示旧值，重启后正确；左栏列表 profile 名为 SSR 初始值，切换后下次加载刷新（徽章区即时更新）。

### Phase 4 会话管理（服务器持久化）

- Prisma 新增 4 模型（migration `20261001155909_zcode_m2_clew_harness`）：`ClewStudySession`、`ClewCompileCache`（含 contentFingerprint）、`ClewEvidenceAtom`（@@unique [chapterId,pageNumber]）、`ClewKnowledgePointEvidence`（@@unique [kpId,evidenceId]，isPrimary）；`ClewKnowledgePoint` 加 `loopProfileId/loopProfileAssignedBy`。
- `src/lib/clew/session.ts`（getOrCreateSession/updateSessionStage/completeSession/abandonSession/getUserSessions）+ `POST|GET /api/clew/sessions`、`PATCH|POST /api/clew/sessions/[id]`。
- 学习页挂载即创建/恢复会话；点环节写 `stageStates`（走查实测：点「04 诊」→ DB `diagnose: active`）；讲义生成完成 → learn 环节 completed（旁路记录，失败不阻塞学习页）。

### 测试

- `tests/loop-profile.test.ts`（14 条：规则引擎六分支/六 profile 契约/切换校验/coerce）+ `tests/clew-compiler.test.ts`（15 条：失败隔离/进度事件/证据原子与关联/三视图/重试/配额门槛/步数上限 10）。
- 全套 431/431 通过；`npm run check` 0 error。


## ZCODE-M3 — 统一状态层 + Mentrix 化学习页 + Page Chat 固化（2026-10-02）

任务书 `docs/ZCODE-M3-unified-state.md`，Phase 0–4 全部完成。`npm run test` **453/453**（新增 22：toc-view 5 + unified-events 7 + unified-state 4 + compile-scope 6）、`npm run check` exit 0（0 error / 189 warning，未增）。migration `20261001172813_zcode_m3_unified_events` 已应用（`prisma migrate status` 干净）。

### Phase 0 spine 解耦（M2 预验收遗留）

- `textbook-view.ts`：新增 `parseClewSpineConfirmedAt`（typeof string 即有效），`toClewTextbookView` 用它取值——非法 strategy（如种子数据 "manual"）不再连坐丢弃确认章；recognition 严格解析行为不变。
- `chapters.ts` `writeManualChapters`：回填 strategy 前过 `tocStrategyWhitelist`（textbook-view 导出），非法值回落 `"none"`（确认流程可自愈）。
- `tests/clew-toc-view.test.ts` 5 条：解耦读取 / 合法路径回归 / 无确认章 null / 非法输入不猜测 / 白名单契约与自愈闭环。

### Phase 1 统一事件总线

- Prisma `UnifiedLearningEvent`（`@@unique([userId, sourceKey])` + timestamp/contentType 索引）；手写幂等（先 findMany 再补缺失，批内去重；SQLite 不用 skipDuplicates）。
- `src/types/unified-learning.ts`（只声明本期写入子集）+ `src/lib/unified-events.ts`（6 个 builder 纯函数 + `appendUnifiedLearningEvents` 整体 try/catch 不抛错；与 payment/service 同一「注释标注 server-only」约定使 node:test 可导入）。
- 写路径 A（session.ts）：新建会话 → session-started；active → stage-entered；completed → stage-completed（skipped 本期 eventType 子集不含、UI 未产出，不写）；completeSession 改 findFirst+update 以取 stageStates 摘要 → session-completed。
- 写路径 B（learner-state-sync-server.ts）：`recordConfirmedAttemptServer` create 成功（dedupe 命中不发）→ attempt 事件；`upsertAttemptsBatchServer` 仅本批 created；`addQbAttemptServer` 新建后经注册表（flattenCourseAssessmentItems + 章节，进程内缓存）解析归属，解析不到 console.warn 跳过。全部独立 try/catch。

### Phase 2 /learn 学习动态

- `src/lib/unified-state.ts`（server-only 约定同上）：`selectUnifiedLearningFeed`（官方课/题库走 publishedCourses 注册表 + 进程缓存，Clew 走 kp→章→教材批量查询；已删除内容如实回落「已删除的内容」+ href null）+ `selectContinueLearningTarget`（最近 active 会话 → 深链 + 下一环节，entryStage 兜底）。
- `GET /api/learn/unified-feed`（thin adapter）；`/learn` 页改 async + force-dynamic 服务端取数传入（未登录 undefined 不渲染区块、登录空数据渲染空态一行）；`learning-dashboard.tsx` 双视角区块后新增「学习动态」（来源标签三色描边、相对时间、整行可点、继续上次学习按钮）。不新增 peerCard（v3 密度计数不变：桌面 5 / 390 3）。
- 走查：初始空态一行 + 继续按钮；点「评」环节后 feed 出现 `Clew · 测试知识点 1 · M2 QA 教材 · 进入环节「评」 · 8 分钟前`；continueTarget 随 stageStates 推进到（复）。

### Phase 3 编译全书接线

- `compile-scope.ts`（纯函数：`filterCompileChapters` pending|failed 计入、`resolveCompileScope` 指纹不同强制 all + 提示文案）；`compiler.ts` `extractAllChapters` 增可选 `options.chapters`（路由层过滤，纯编排不动）；`compiler-server.ts` 新增 `getClewCompileCacheView` + `compileTextbookThroughHarness`（指纹接线：开始时计算并写回缓存、缓存指纹不同先发提示事件再强制全量、结束写 state）。
- compile 路由：`GET` 缓存视图；`POST body { scope }` 默认 pending，无待编译章节 SSE error 事件明确提示不空跑。
- 教材页（`clew-textbook.tsx`）：spine 确认后显示「编译全书」区（上次编译状态 + 相对时间、待编译 N 章 + 预计模型调用数、SSE 文字流、完成汇总、失败章「单独重试」锚链接）；编译运行时单章萃取按钮禁用（防重入）；编译后刷新 detail + 缓存。
- 走查（f650452b）：pending=1（failed 第 3 章）→ 点编译 → 流式「精读第 1/1 章：第三章 闻诊 → 读取第 7–7 页」→ 诚实失败「文字层内容过少（约 25 字）」+ 隔离提示 + 单独重试链接（任务书 3.3 预期的正确行为）；刷新后「上次编译：编译失败 · 刚刚」保留。

### Phase 4 学习页双模式 + Page Chat 回归

- `nur-learn:clew-study-mode`（focus 默认 / workspace；首渲染默认值避免 hydration mismatch，挂载后读实际值）；切换控件在 KP 头部行（profile 徽章后，≤1200px 隐藏，aria-pressed 分段按钮）。
- 单 DOM 双布局：`data-study-mode` 属性 + CSS（focus = 240px + 主列 + 追问 `grid-column:2` 下置；workspace = 三栏 240/1fr/320），不改组件树。
- 走查：focus 布局实测 `240px 684px` + 追问 static 下置；切 workspace `240px 344px 320px` + chip 保留；刷新后保持 workspace（localStorage）；390×844 两模式 `scrollWidth===clientWidth===390` 且切换控件隐藏；追问草稿双向切换不丢；console 0 错误（dev 浮层 clean）。

### 最终门槛

- sqlite3 抽查：`clew-kp|1、official-kp|1、qb-chapter|1` 三线均有行；同内容重跑 round1→round2 计数不变（幂等）。
- 截图 `docs/design-references/zcode-m3-*.png` 4 张：learn-feed / study-focus / study-workspace / compile-progress。
- 走查环境注：期间 dev server 出现陈旧 .next 缓存导致的路由重试循环（SSR curl 完整、无服务端错误），清 `.next` 重启后恢复，非产品代码问题；验证数据（3 条事件 + m3-verify-attempt-1）留在 dev.db 供复查。

### 验收补充（2026-10-02，Hermes 预验收）

- 复现 453/453 后**发现并修复一处缺陷**：`upsertCompileCache` 的 update 分支忽略 `contentFingerprint` —— 首编译建行（空串）后指纹永远写不进去，「内容变化 → 强制全量编译」实际是死功能。修复（`compiler-server.ts` update 分支补写指纹）+ 新增回归 `tests/clew-compile-cache.test.ts`（3 条，隔离 SQLite）→ 全量 **456/456**；活体复验：f650452b 编译后指纹 = `f514196b…`（64 hex，= 教材文件 sha256）。
- 测试基建补丁：`tests/helpers/css-cjs-stub.cjs` 增加 `server-only` 的 CJS 车道映射（tsx require 车道不咨询 ESM 钩子，否则测试导入带 `import "server-only"` 的 lib 直接 MODULE_NOT_FOUND）。
- 浏览器复走（m2qa，1440/390，console 0 错误）：/learn 三线动态行（题库/官方课/Clew）+ 继续上次学习正确深链（含执行人自己点击产生的真实事件）；学习页 focus 默认 `240px+主列`、切 workspace `240/1fr/320` 且刷新保持、chip 保留；教材页「编译全书」pending=1 文字流 → 诚实失败 + 隔离提示 + 刷新续存。
- 环节按钮取证（M2 语义遗留）：点击仅移动 aria-current/边框高亮 + 写 stage 事件（DB 可见，用户 18:04 连点均有记录），无内容/无跳转——已列入下一步体验补丁讨论。

### 体验补丁：竖向脊柱 +「评」自测 + 讲解风格（2026-10-02，Hermes 实施 + 验收）

用户拍板 A 包「1+2+3 合并」后由 Hermes 直接实施；上一节遗留的「环节按钮无内容/无跳转」在此关闭。

- 竖向闭环脊柱（替换横向环节条）：84px 贴讲义侧时间轴、sticky 跟随；done 实心 / current 描边环 / todo / unavailable 虚线+「未接入」标签四态；节点 = 真实动作（学→滚讲义；评→自测；诊→「还需看」清单并自动筛选；迁移→`/learn/clew/w` 真跳转）；练/复无功能面如实标「未接入」，删除「进入间隔复习」空头句；≤980px 折叠为横向条（连接线隐藏）。
- 「评」自测：`parseClewLessonSelfTest` 解析讲义自测题（题干+参考答案；模型 `1. … /   参考答案：…` 与启发式同格式，兼容加粗与题干行内联）；面板含 显示/收起参考答案、会了/还需看、全部标记自动提交 → 新 API `POST /api/clew/kp/[id]/self-check`（`src/lib/clew/self-check.ts`）写 `wrong-question-added` 统一事件（sourceKey `clew-selftest:{kpId}:{generatedAt}:{index}` 幂等）+ `stage-completed(assess)`；标记存 localStorage（按 KP + 讲义版本，换版本自动重置）。
- 「讲解追问」→「问 Clew」；讲解风格选择器 4 档（zh-primary / exam-cram / socratic / en-primary，各配提示词块），生成时显式发送并写账户默认（DB 已核 `exam-cram`）；左栏 KP 徽标切换后即时刷新（本地 override）；会话 `stageStates` 回读——刷新后「评」完成态连续（此前刷新即丢）。
- 验证：`npm run test` **466/466**（+10：解析 5 / 自测事件 5，隔离 SQLite）；`npm run check` exit 0；活体走查（m2qa，1440×900 + 390×844）：选「考点速记」真实生成（qwen3.7-plus，notes 含风格落账）→ 3 道自测解析 → 标记 2 条「还需看」→ DB `clew-selftest:*` 事件 2 条 + assess 完成 → `/learn` 学习动态如实展示 → 重载标记与完成态恢复 → 诊节点自动筛选 → 迁移跳转（课题工作坊 200）→ 390 溢出 0、脊柱横向折叠；console/pageerror 0（首跑 1 次 hydration 告警未复现，判定 dev 首编译伪影）。
- 已知边界：首编译新 API 时提交窗口 >1.8s（dev 现象）；「练/复」仍无功能面（如实标注，列入后续闭环）。

## ZCODE-M4 — 三视图派生 + 章级知识图谱 + 多模型接入（2026-10-03）

任务书 `docs/ZCODE-M4-views-graph-multimodel.md`，三阶段全部完成。`npm run test` **490/490**（基线 466 + 新增 24：lesson-variants 8 / kp-graph 7 / model-config 9）、`npm run check` exit 0（lint 0 error）、`npx prisma migrate status` 与基线一致（无 schema 变更、无 migration）。改动全部留在工作区未提交。

### Phase 1 三视图派生（初学 / 复习 / 备考）

- `src/lib/clew/lesson-variants.ts`（纯函数、client-safe）：`deriveClewLessonVariant` 按任务书 §1.1 规则表逐条实现——full 恒等；review 仅在「自测题」小节删参考答案行（整行形态与题干行内联形态，判定正则与 `parseClewLessonSelfTest` 同形）；exam 删自测题整节（含标题）+「定义」截首句（到第一个「。」含，无「。」整行保留）；页首引用块与要点/易错点不动；幂等。实现取舍：review/exam 的行内折叠要求「参考答案」后带冒号（与面板解析器完全一致，避免「视图截了面板没截」的分裂）。
- 小节定位复用既有解析：`lesson-heuristic.ts` 的 `collectLessonSectionBodies` 与 `isSectionHeading` 仅加 `export`（行为零变化）；未复制任何解析逻辑。
- 学习页（`clew-study.tsx` + `clew.module.css`）：panelHead 行内三档分段控件 `lessonVariantToggle`（复用 studyModeToggle 视觉语言，aria-pressed，生成中禁用）；note 小字行包 `aria-live="polite"`；正文 `ClewMarkdown key={generatedAt:variant}`；localStorage `nur-learn:clew-lesson-view`（首渲染默认值防 hydration mismatch）。
- 划重点重锚：`ClewHighlightLayer` 新增 `bodyVariant` 并入 `bodyVersion`——视图切换触发重定位；被视图折叠的划线如实进「未定位」，切回初学恢复。
- 走查（m2qa，f650452b 第 1 章 KP01）：初学正文 3 处参考答案 → 复习 0 处（题干与「自测题」标题保留，note 正确）→ 备考无自测题节 + 定义仅首句；**DevTools 全程 0 网络请求**；刷新后保持「备考」（localStorage `exam`）；自测面板 3 道题不受视图影响；划重点交错验证：初学划答案句（已定位 1）→ 复习（未定位 1，如实列表）→ 切回初学（恢复已定位 1），划线数据无增删。console 0 错误。

### Phase 2 章级知识图谱（纯 SVG · 只读）

- `src/lib/clew/knowledge-graph.ts`（纯函数、client-safe，零依赖）：`buildClewKpGraph` 程序校验（先修标题同章 trim 全等匹配、未匹配如实计数忽略、自环丢弃、同对同 kind 去重、术语交集边含 sharedTerms、DFS 三色环检测 + 确定性破环：删环内 `to.order` 最大先修边→并列 `from.order` 最大→再并列 `from.id` 字典序）；`layoutClewKpGraph` 先修最长路径分层（layer 0 = 无先修者），`x=80+layer*220 / y=60+idx*96`，同输入必同输出。构建器为泛型：nodes 保留输入摘要的全部字段（如 `hasLesson`）。
- `src/components/clew-graph.tsx`（纯展示、无状态）：panelHead「知识图谱」+ stats 行；实线箭头先修边（marker）/ 虚线术语边（共享数标中点）；节点 = 圆点+序号+截断标题，当前 KP 墨色描边加粗、有讲义实心/未生成描边、hover 纯 CSS；节点即 next/link → 既有 `?kp={id}` 形态，aria-label「知识点 {title}，先修 n 条，术语关联 m 条」；`figcaption` + 可视隐藏关系 `<ul>`；未匹配/成环诚实行有则显示；<2 个知识点空态一行。挂在学习页 `ClewNotePanel` 之后、`footNote` 之前。
- 走查：3 节点渲染（01 实心有讲义、02/03 描边），「3 个知识点 · 先修 1 条 · 术语关联 0 条」与关系清单「四诊合参原则先修于望闻问切互相印证」自洽；点节点 03 → URL `?kp=cmuprmns8000n5epx1br2dnro`、KP 标题/左栏高亮/图谱 aria-current 全部同步；390×844 `scrollWidth===clientWidth===390`（viewBox 自适应）；console 0 错误。

### Phase 3 多模型接入（ClewModelConfig 预留接口落地）

- `src/lib/clew/providers/model-config.ts`（server-only）：任务级 env 解析（任务 ∈ toc/extraction/lesson/chat/note；任务级 `CLEW_{TASK}_PROVIDER/MODEL/BASE_URL/API_KEY` > 全局 `CLEW_MODEL_PROVIDER/MODEL/BASE_URL(/API_KEY)` > 缺省；lesson/chat/note 保留既有 `CLEW_EXTRACT_MODEL` 回落链，dashscope 保留 `DASHSCOPE_BASE_URL`）；`dashscope`→https+*.aliyuncs.com、`openai-compatible`→https（loopback localhost/127.0.0.1/[::1] 允许 http）；`deepseek|kimi|zhipu` 等未实现值抛 `ClewProviderConfigError`（消息含已核实端点示例），绝不静默回落。纯函数核心 `*From(task, env)` 供测试直接传 env 对象。
- `src/lib/clew/providers/chat-transport.ts`（由 `dashscope-stream.ts` 泛化改名，旧文件删除、全仓引用更新）：SSE 解析逐字保留；`enable_thinking: false` 仅 provider==="dashscope" 注入；新增非流式 `completeChatJson`（供 toc/extract 复用，两个 adapter 各自的私有 fetch/响应解包删除）；`resolveChatCompletionsUrl` 容错无路径 / `/v1` / 多段前缀 / 尾斜杠 / 已含端点（测试锁定）。
- 五个 adapter（dashscope-{toc,extract,lesson,chat,note}.ts）改收 `ResolvedClewModelConfig`，`id` 如实取 `config.provider`；五个任务工厂改「resolve → 校验 → 动态 import」，无 key 返回 null（既有启发式兜底/如实报错路径不变）；六个服务调用点（lesson/chat/note/extraction/toc-recognition/workshops）把 `ClewProviderConfigError` 映射为各自 `ok:false, 503` 明确失败（toc 不再静默回落启发式）；`compiler-server.ts` Agent 模型获取改走 `getClewModelForTask("lesson")`（`ClewProviderConfigError` → 503 ClewHarnessError）；facade `dashscope.ts` 的 `getClewModel/isClewModelConfigured/describeClewModel` 语义改基于任务解析（默认 task=lesson），`getModelForTask` 空壳替换为真实 `getClewModelForTask`。
- `.env.example` 补全多模型变量说明与已核实端点示例。
- 桩集成验证（脚本 `/tmp/clew-m4-stub-verify.ts`，进程内 env 覆盖，未动 `.env.local`）原始输出留档：
  ```
  === 用例 1：openai-compatible 桩走通讲义生成 ===
  provider.id = openai-compatible
  provider.model = qwen3.7-plus
  SSE 增量块数 = 4
  最终文本字符数 = 225（与桩应答逐字节一致：true）
  请求路径 = /v1/chat/completions
  请求体 model = qwen3.7-plus · stream = true · enable_thinking 存在 = false
  === 用例 2：CLEW_LESSON_PROVIDER=deepseek 明确报错 ===
  抛错类型 = ClewProviderConfigError
  报错消息 = Clew 模型 provider "deepseek" 尚未实现；可用 openai-compatible + 对应 baseURL。已核实端点示例：DeepSeek https://api.deepseek.com ｜ Kimi https://api.moonshot.cn/v1 ｜ 智谱 GLM https://open.bigmodel.cn/api/paas/v4 ｜ 本地 Ollama http://localhost:11434/v1（API key 可填任意占位值，如 ollama）。
  === 用例 3：未配置 key → 返回 null（既有启发式兜底路径保持）===
  无 key 时 createClewLessonProviderFromEnv() = null（调用方走「未接入模型」启发式兜底）
  === 桩集成验证全部通过 ===
  ```
- 默认路径活体回归（无任何新 env，m2qa）：KP02「四诊合参原则」真实生成讲义成功（notes「来源：模型生成（dashscope · qwen3.7-plus），结构校验通过」，3 道自测题解析）；问 Clew 真实流式回答（chip 保留）。describeClewModel 产物格式仍为 `{provider}:{model}`。
- 验证边界：`completeChatJson`（toc/extract）的真实 DashScope 端到端未在本期活体重放（重萃取会覆盖既有 QA 数据），其 URL/请求体/响应解包与流式路径同源并被单元测试 + openai-compatible 桩覆盖。

### 截图索引（docs/design-references/）

- `zcode-m4-lesson-full.png` 初学视图（完整讲义，三档控件渲染）
- `zcode-m4-lesson-review.png` 复习视图（note 行 + 参考答案折叠）
- `zcode-m4-lesson-exam.png` 备考视图（定义首句 + 无自测题节 + 备考高亮）
- `zcode-m4-kp-graph.png` 章级知识图谱（3 节点、02→03 先修箭头、01 实心）
- `zcode-m4-390-graph.png` 390×844 图谱与划重点（无横向溢出）

### 走查环境注

走查前重启了 dev server 并清 `.next`（避免 M3 曾出现的陈旧缓存）；走查期间产生的验证数据（KP02 讲义、KP01 一条琥珀划线、一轮 KP03 追问）留在 dev.db 供复查。验证结束时 dev server 保持运行（localhost:3000）。

### 最终门槛

- [x] `npm run lint` 0 error + `npx tsc --noEmit` 通过
- [x] `npm run test` 全绿 **490/490**（466 + 24 新增）
- [x] `npm run check` exit 0
- [x] 无 migration 新增（`npx prisma migrate status`：14 migrations，up to date，与基线一致）
- [x] 桩集成验证原始输出留档（上文）
- [x] 浏览器走查清单 1–5 全部通过，console 0 错误
- [x] 文档更新：本节 + `docs/PROJECT_STATE.md` + 任务书状态行

### 预验收复核（Hermes，2026-10-04）

独立复验，不依赖执行者脚本（复核脚本在 `/tmp/clew-m4-qa/`，未进仓库）：

- **门槛独立复跑**：`npm run test` **490/490**（pass 490 / fail 0 / cancelled 0）、`npm run check` exit 0（lint 0 error）、`npx prisma migrate status` 14 migrations up to date（与基线一致）；`package.json` 仅品牌改名、无新依赖。日志中一条 `unified-events` PrismaClientValidationError 为既有「写入失败不抛错（旁路契约）」测试的故意注入，非缺陷。
- **Phase 3 桩独立复验**（`/tmp/clew-m4-stub-verify-hermes.ts`，进程内 env 覆盖，未动 `.env.local`）：openai-compatible 桩端到端——`provider.id=openai-compatible`、SSE 增量、最终文本与桩应答逐字节一致、请求路径 `/v1/chat/completions`、`Authorization: Bearer`、请求体无 `enable_thinking`；`completeChatJson` 非流式走通（stream=false、response_format 透传、无 enable_thinking）；`enable_thinking` 仅 dashscope；`deepseek` 抛 `ClewProviderConfigError`（消息含已核实端点指引，不静默回落）；无 key → null（启发式兜底路径保持）。
- **浏览器独立复走**（playwright-core + 系统 Chrome，m2qa）：三档产物逐条核验（初学 3 处参考答案 → 复习 0 处且标题保留 + note → 备考无自测题节、定义 63→27 字截首句、要点/易错点保留）；**「零请求」定论**：等 dev HMR 静默后连切 5 次，窗口内 **0 请求**（首轮观测到的 22 个请求全部为 dev hot-update 与重挂载副产物，非视图切换行为）；localStorage 持久 + 刷新保持；划重点交错 1→未定位 1→恢复 1（DB 行数前后一致，无增删）；图谱 3 节点 / 统计行与关系清单自洽 / 点击节点 03 → `?kp=…` + aria-current 同步 / SVG 节点可聚焦 / hover 与 focus-visible 纯 CSS；自测面板跨视图恒 3 题；390×844 `scrollWidth===clientWidth===390`；console error 0、pageerror 0。
- **边界抽查**：多模型相关模块全部 server-only（model-config / chat-transport / 五个 adapter），客户端组件零引用；`instanceof ClewProviderConfigError` 映射点 7 处（含 compiler 503）；`dashscope-stream` 全仓引用清零；`src/content/` 变更全部为 ZCODE-M1 品牌串替换（24/24 行对称），无内容真相改动。
- 备注：首轮自动化登录因 dev 首编译/HMR 时序未跳转（重试即通过）——dev 环境现象，未见产品缺陷。

## DESIGN_V4 批 1 —「Quiet」token 层 + Clew 学习页换装（2026-10-04，Zcode 执行）

任务书：`docs/DESIGN_V4.md`（Nur 拍板 + Hermes 评审通过 + P0 四项裁决闭环后的第一批）。范围：token 层修订（globals.css + clew.module.css v2 桥）+ Clew 学习页三栏换装 + 壳侧栏 264px 合并（P1-6）+ 复制/重新生成小图标行 + `/design-system` 同步 + 明暗双主题验收（Hermes 增补全部并入）。

### 落地内容

- **Token 层**：亮侧栏 `#f2f0e8`；暗底暖炭 `#201e19` / 暗侧栏 `#191813`；`--v3-cinnabar` → `--v2-primary` 别名（唯一交互强调，暗 #d97757）；石板蓝降信息色（暗 #86b7dc）；新增 `--v3-selected-bg/fg`（选中态统一 token，导航药丸与 KP 药丸共用）、`--v3-font-kai`、`--v4-doc-size/leading`（15/1.85）；非颜色 token 沿用 v2（P1-7/P1-8）。
- **壳（workspace-shell）**：侧栏 280→264px；品牌 = 朱砂印章（知/径 楷体两行）+「Ariadne · 知径 · 工作台」；`data-sidebar-context-slot` 上下文槽。
- **学习页**：撤销登录态自带 header（壳顶栏唯一）；面包屑 → 宋体 30px 文档标题 → 元信息（溯源=石板蓝）→ 描述 15/1.85 → 安静进度线 → 视图 tabs（下划线）→ 无卡片讲义正文 → 自测/划重点/笔记/图谱细分隔文档节；右栏 320px 常驻「问 Clew」（状态点 + 诚实提示 + 上下文 chip + 无气泡 AI 回答 + 中性暖灰 user 气泡 + composer 图标发送键）；KP 列表经 portal 注入壳侧栏（13 行纯文本行 + 药丸选中态）；竖向脊柱保留（视觉降噪）；默认工作台、focus 老键沿用（P0-4B）。
- **安静进度线（P0-1）**：2px 细线 + role=progressbar + 「教材路径 6 / 8 · 当前：X」+ 线尾「下一步：…」文字链（44px 触控）；八步 chips 呈现退役，脊柱/LoopProfileBadge 功能不动。
- **复制/重新生成行**：AI 回答下 26px 图标钮 ×2；复制 = 前端剪贴板（Check 反馈 1.6s）；重新生成 = 同问重发（计一次 ClewChats 配额、追加不覆盖、流式中禁用）。零服务端改动。

### 验证记录

- [x] `npm run test` **490/490**（更新 `design-v3-flow` 路径线断言 / `design-v3-density` 264px 断言后全绿）
- [x] `npm run check` exit 0（0 error；warning 均为既有）
- [x] 暗色 WCAG 审计重跑（Hermes 增补）：`design-r2-dark-audit.mjs` 5 面（bookshelf/textbook-detail/study/workshop-room/design-system）低对比文本 **0 个**；`design-r3-dark-audit.mjs` 15 路由低对比文本 **0 个**（dev 与生产构建各跑一遍 r2/r3 均通过）
- [x] `scripts/design-v3-check.mjs` 断言更新至 v4 契约（264 / progressbar / 「教材路径」）后，在 `next start` 生产构建上**两次连跑 PASSED**（用于排除 dev HMR 噪音；dev 下偶发 "Invalid or unexpected token" pageerror 判定为热更竞态，生产两次均无）
- [x] 浏览器走查（playwright-core + 系统 Chrome；v4qa 用户，教材数据由 M4 QA 数据行克隆为 `v4qa-textbook-1`）：
  - 侧栏 264px 实测、KP rail 注入壳侧栏（13 行、选中态 aria-current）、教材路径线（6/8 · 75% 填充）、右栏 320px、user 气泡 `#e9e6dc`、AI 回答无底色、小图标行 2×N、composer 发送键
  - 视图 tabs ×3、切「复习」派生 note 出现（零请求）、复制写入剪贴板 700 字符、真实「重新生成」成功追加新问答（模型调用，历史未覆盖）
  - 1440/1200/980/390 × 明/暗 × workspace/focus 全通过；focus 模式追问面板确证下置（agentTop == mainBottom）；390×844 `scrollWidth===clientWidth===390`
  - 回归面 9 条路由（/learn、/courses、/question-bank、/account/billing、书架、教材详情、工作坊列表、wrong-questions、/design-system）× 1440/1200/980 无横向溢出；最终一轮 **console error 0、pageerror 0**
- [x] 文档同批：AGENTS.md Design Rules → v4（含「默认工作台」「朱砂唯一强调」「宋体收缩」）+ `bash scripts/sync-agent-rules.sh`；`docs/PROJECT_STATE.md` 增本节；`docs/DESIGN_V4.md` 状态行更新

### 截图索引（docs/design-references/，v4- 前缀共 17 张）

- `v4-study-workspace-light-1440.png` / `v4-study-workspace-dark-1440.png` 学习页工作台明暗（核心对照样张）
- `v4-study-focus-light-1440.png` 单任务模式（追问下置）
- `v4-study-workspace-light-1200/980/390.png` 断点档
- `v4-reg-*.png` 回归面 9 张（含 design-system 明暗两张）

### 走查环境注

- 走查前重启 dev server 并清 `.next`（`next build` 与运行中的 dev server 共写 `.next` 会使 dev 崩溃或吐陈旧 chunk——本轮两次 500/中断均源于此，非产品缺陷）。
- 走查产生/使用的数据：新增 v4qa 用户 + `v4qa-textbook-1`（19 章 / 13 KP / 2 讲义 / 1 对话 / 1 划线，内容克隆自既有 M4 QA 数据）留 dev.db 供复查；真实重新生成消耗一次 ClewChats 配额。r2/r3 审计脚本自建自删的临时账号照旧。
- 生产构建 `next start` 本地无法走认证流程（PROJECT_STATE：生产强制 Postgres DATABASE_URL，禁 sqlite）——未认证检查（v3-check 布局读回）在生产上验证，认证流程走查在 dev 上完成。
- 结束时 dev server 保持运行（localhost:3000，已清缓存重启）。

### 最终门槛

- [x] `npm run lint` 0 error + `npx tsc --noEmit` 通过
- [x] `npm run test` 全绿 **490/490**
- [x] `npm run check` exit 0
- [x] 无 migration 新增（零 Prisma 变更）
- [x] 明暗双主题 + 双模式验收矩阵通过，console 0 错误
- [x] 暗色 WCAG 审计（r2 + r3）重跑通过
- [x] 文档更新：本节 + `docs/PROJECT_STATE.md` + AGENTS.md（已 sync）+ `docs/DESIGN_V4.md` 状态行

### 预验收复核（Hermes，2026-10-04）

独立复验，不复用执行者脚本（复核脚本自写、存 `/tmp/hermes-v4-qa/`，未进仓库；账户 m2qa，口令运行时从本文件提取，不打印）。

- **门槛独立复跑**：`npm run test` **490/490**（pass 490 / fail 0 / cancelled 0）、`npm run check` **exit 0**（lint 0 error + typecheck + build 全过，日志 `/tmp/hermes-v4-qa/check.log`）；`npx prisma migrate status` 14 migrations up to date（与基线一致）；`git diff` 无 `prisma/`、无依赖变更。
- **暗色 WCAG 审计独立重跑**：`scripts/design-r2-dark-audit.mjs` 5 面 0 低对比；`scripts/design-r3-dark-audit.mjs` 15 路由 0 低对比（均 `DARK CONTRAST AUDIT PASSED`）。
- **浏览器独立复走**（干净重启 dev + 预热后；自写脚本，playwright-core + 系统 Chrome）：
  - 默认模式：无键新用户 → workspace；`nur-learn:clew-study-mode=focus` 老键被尊重（focus 布局下置、aria-pressed 正确）；切换控件写/读一致。
  - 壳侧栏 264px 实测；KP rail portal 确在壳侧栏内（3 行、aria-current=true）；390 抽屉内 rail 可达（width=243）。
  - 文档主列实测 698px（≤700）；右栏 320 常驻；脊柱保留（6 环节）+ LoopProfileBadge 保留。
  - 安静进度线：role=progressbar +「教材路径 6 / 8 · 当前：划重点与批注」+ 75% 填充 + 线尾「下一步」链接（`…/c/1#note`）。
  - 宋体 h1 实测（Songti SC）；元信息石板蓝 `rgb(23,101,154)`。
  - 视图 tabs：初学 3 处参考答案 → 复习 0 处且 note 出现；切换窗口非 dev 请求 **0**。
  - 复制：剪贴板写入核验（82 字符 = 该回答 markdown）+「已复制」反馈。
  - 重新生成端到端：请求体 = 原提问、HTTP 200（≈2.1s）、问答追加（4 → 6 行、原 4 行不动）、reload 后持久、无错误横幅；`EventLog` 两条 `clew_kp_chat` success（qwen3.7-plus）→ 事件/配额路径实际走过。
  - 暗色 token 实测：`--v2-background #201e19`、壳侧栏 `#191813`、`--v2-primary #d97757`、`--v3-cinnabar` 别名生效、石板蓝 `#86b7dc`。
  - 矩阵 10 格（1440/1200/980/390 × 明暗 × workspace/focus）全部 `scrollWidth===clientWidth`、0 console error、0 pageerror。
  - 回归面 9 路由 × 1440/1200/980 = 27 次加载全 200、无溢出、0 错误；`/design-system` V4 节可见。
- **环境注（不影响结论）**：首轮走查时 dev server 一次热更竞态（worker 重启）造成首个加载未水合（`SyntaxError: Invalid or unexpected token`）、一次导航 ERR_ABORTED、一次路由超时；按既有协议「重启 dev + 清 `.next` + 预热」后全部不可复现，生产构建与全部门槛无此现象。复核脚手架自身一处问题（对 SSE 端点的 route 拦截会挂起客户端）修正后复跑，非产品缺陷。
- **结论**：**批 1 验收成立，未发现需返工项**；等待终审。
