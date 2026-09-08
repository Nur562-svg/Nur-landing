# NUR LEARN · CodeBuddy 代码改动汇报（交接文档）

> 生成日期：2026-09-08
> 生成方式：**逐文件核实仓库实际状态**（`git status` / `git diff` / `git log` / 文件 mtime / `docs/PROJECT_STATE.md` 与 `docs/QUESTION_BANK_EXTRACTION.md` 两份真相源），**不凭对话记忆**。
> 诚实声明：本会话是全新会话，**没有保留此前任何 CodeBuddy 会话的对话记忆**。因此本文无法回答「某段代码是否由过去的我/CodeBuddy 亲手写的」这一类只能靠记忆回答的问题；凡是仓库证据无法确证归属的，一律标注**【待确认】**，并说明现有证据指向。这是本文最重要的一条前提。

---

## 0. 一句话总览

- git HEAD 停在 `a3b6727`（2026-08-17 22:38）。此后所有「题库批量提取」产物（15 门课程的 `extracted-*.ts` 底稿、`scripts/` 提取流水线、两份 `docs/*QUESTION_BANK_EXTRACTION*.md`、scratch 文件）**全部尚未提交**。
- 当前**唯一「已跟踪但被修改」**的文件是 `docs/PROJECT_STATE.md`（净 +28 行）。
- 这批未提交内容的归属：按你的说明与 `docs/RESUME_QUESTION_BANK_EXTRACTION.md`（明确要求把续做 prompt 粘进 **Trae Work**），属于 **Trae 的题库提取体系**，与 CodeBuddy 的产品功能工作不在同一路径上。
- CodeBuddy（若此前有会话）的改动应落在 HEAD 之前的**已提交产品功能代码**中。但由于全部提交的 git 作者均为 `nukeab`、代码与提交信息中无工具署名，**无法从仓库区分每个提交由哪个 AI 产生**【待确认】。

---

## 1. 改动清单（逐文件/逐类核实）

### 1.1 已提交基线（HEAD `a3b6727` 及之前）——即所有「已落定」的业务代码

提交序列（全部 author=`nukeab`，无法按 AI 拆分归属）：

| commit | 日期 | 内容摘要 |
|---|---|---|
| `106ee82` | 2026-07-03 | Initial commit |
| `abf1bb3` | 2026-07-04 | Initialize Nur landing site |
| `b6b4f35` | 2026-07-04 | Update global typography system |
| `53635d5` | 2026-08-10 | sync to GitHub；M3 migration、Dockerfile、React 185、gitignore 修复 |
| `a2caab6` | 2026-08-17 | 大批量同步：部署（Caddy/Prisma）、auth（forgot/reset/verify/upgrade）、billing/payment、legal pages、learner state sync、错题中心、agent rewrite merge、tests、组件更新 |
| `d3ccfe1` | 2026-08-17 | feat(tcm)：问寒热升级为完整闭环 |
| `c69c7ae` | 2026-08-17 | chore：知径上线准备 |
| `98b1193` | 2026-08-17 | chore：sync 剩余 M4/M5 changes |
| `263e0f3` | 2026-08-17 | feat(tcm)：表里辨证完整闭环 + M4 polish 遗留 |
| `58f20e0` | 2026-08-17 | feat(tcm)：standard-layer 常见病脉 + 脾胃；错题对比度修复 |
| `a3b6727` | 2026-08-17 | fix(local)：homepage hydration grid + Prisma D1/sqlite fallback |

这部分对应产品主要功能面，代码分布（目录级，均有 git 历史，非本报告逐文件范围）：
- 路由 `src/app/`（`/learn`、`/courses/...`、Course Builder、material admission、auth、billing、legal、错题中心、NUR Agent 抽屉等）
- 业务 `src/lib/`（`learning-memory`、`fsrs`、`course-validation`、`course-builder/`、`nur-agent/`、`material-*`、`question-bank-store`、`payment/`、`learner-state-sync`、`prisma` 等）
- 内容真源 `src/content/courses/{tcm-diagnostics.ts, physiology.ts, ...}` 与 `src/content/materials/`
- UI `src/components/`、类型 `src/types/`、测试 `tests/`、`prisma/`、部署 `Dockerfile*` / `docker-compose.yml` / `Caddyfile`、CI `.github/workflows/ci.yml`
- 文档 `docs/PROJECT_STATE.md`、`docs/CONTENT_ARCHITECTURE.md`、`docs/DEPLOYMENT.md`、`docs/LAUNCH_CHECKLIST.md`、`docs/M2-*/M3-*`、`design-qa.md`、`project_summary_and_plan.md` 等

逐文件的「改了什么/为什么/是否完整」在文档层面以 `docs/PROJECT_STATE.md` 里程碑为准（它被项目约定为产品决策与完成的唯一真相源）。**归属判定：【待确认】**——上述提交内容中哪些由过去的 CodeBuddy 会话、哪些由 Claude Code / Cursor / 其他 AI 会话产生，仓库本身无法分辨，我也没有会话记忆。

### 1.2 未提交的已跟踪修改：仅 `docs/PROJECT_STATE.md`

- `git diff` 结果：**1 file changed, 28 insertions(+)**, 无删除。
- 插入位置：文件第 786–813 行（在一段「生理学『内环境与稳态』垂直切片」背景段之后）。
- 插入内容：**14 段题库批量提取完成里程碑**（一行一段，极长）：
  A2 生理学(599/12章) → A3 医学遗传学(599/21区) → A5 生物化学(600/27章) → A6 组织学与胚胎学(600/28章) → A7 细胞生物学(600/18章) → A4 系统解剖学(600/18章, OCR) → A8 免疫学(600/25章, OCR) → A9 微生物学(600/37区, OCR) → A10 神经病学(600/23章, OCR) → A11 药理学(600/49章, OCR) → A12 局部解剖学(600/9区, OCR) → A13 病理学(600/18章, OCR) → A14 中医诊断学(410/12单元, 学生材料) → A15 医学影像学(600/15章, OCR)。
- 每段都写明：题量、预算方式、所在文件路径、聚合导出名、契约/审计脚本、`npm run check` 通过、且**明确声明 extracted 是题库底稿、未写入课程 truth、未注册、未发布**。
- 文件 mtime = 2026-09-05 16:30，与 `docs/QUESTION_BANK_EXTRACTION.md`（16:29）同批写入，对应 A15（医学影像学）收尾。
- **依据**：`docs/RESUME_QUESTION_BANK_EXTRACTION.md` 中 Trae 的续做 SOP 第 3 步「完成一本后 → 在 `docs/PROJECT_STATE.md` 追加一条简短里程碑（可比照现有生理学条目的写法）」。这段 diff 就是该 SOP 的执行结果。
- **是否完整**：与 QUESTION_BANK_EXTRACTION 总表一致；但注意 **A1 西医《诊断学》全量底稿（1602 题）在 PROJECT_STATE.md 中没有任何里程碑段落**（QUESTION_BANK_EXTRACTION 总表 A1 有登记）——存在「两处真相源不同步」的小缺口【待确认：是否漏登记】。
- **是否我改的**：本会话未改。归属上它属于题库提取工作流的文档登记，按分工属 Trae 体系【待确认，缺会话级证据】。

### 1.3 未跟踪新文件（全部创建于 2026-09-03 ~ 09-06，均未提交）

**(a) 题库底稿：`src/content/courses/` 下 15 个新目录（336 个 `extracted-*.ts` 分件 + 15 个目录级聚合 `index.ts`）**

| 目录 | 题量（按文档） | 分件模式 | 最后写入 |
|---|---|---|---|
| `diagnostics/`（西医诊断学·A1） | 1602（全量底稿） | `extracted-diagnostics-ch{N}.ts` + 症状/问诊/实验室若干特殊文件 | 09-04 |
| `physiology/`（A2） | 599 | `extracted-physiology-ch{1..12}.ts` | 09-04 |
| `medical-genetics/`（A3） | 599 | `extracted-medical-genetics-ch{0..20}.ts` | 09-04 |
| `human-anatomy/`（A4） | 600 | `extracted-human-anatomy-ch{1..18}.ts` | 09-04 |
| `biochemistry/`（A5） | 600 | `extracted-biochemistry-ch{1..27}.ts` | 09-04 |
| `histology-embryology/`（A6） | 600 | `extracted-histology-embryology-ch{01..28}.ts` | 09-04 |
| `cell-biology/`（A7） | 600 | `extracted-cell-bio-ch{01..18}.ts` | 09-04 |
| `immunology/`（A8） | 600 | `extracted-immunology-ch{01..25}.ts` | 09-04 |
| `microbiology/`（A9） | 600 | `extracted-microbiology-ch{00..36}.ts` | 09-04 |
| `neurology/`（A10） | 600 | `extracted-neurology-ch{01..23}.ts` | 09-04 |
| `pharmacology/`（A11） | 600 | `extracted-pharmacology-ch{01..49}.ts` | 09-04/05 |
| `topographic-anatomy/`（A12） | 600 | `extracted-topographic-anatomy-ch{00..08}.ts` | 09-04/05 |
| `pathology/`（A13） | 600 | `extracted-pathology-ch{01..18}.ts` | 09-05 |
| `tcm-diagnostics-bank/`（A14） | 410 | `extracted-tcm-diagnostics-bank-ch{01..12}.ts` | 09-05 |
| `radiology-bank/`（A15） | 600 | `extracted-radiology-bank-ch{01..15}.ts` | 09-05 |

每目录 `index.ts` 聚合导出 `{科目}ExtractedItems` / `{科目}ExtractedGroups`。**现有业务代码（`src/app`、`src/lib`、`src/components`）没有任何 `import` 引用它们**（已 grep 核实）；顶层课程注册表 `src/content/courses/index.ts` 仍只注册 `tcmDiagnosticsCourse` + `physiologyCourse`，未包含任何 extracted 数据。因此它们当前是**完全惰性的题库底稿**。

**(b) `scripts/` 提取流水线工具（约 90 个未跟踪文件，每本一套「契约+切片+审计+一致性+预算」）**

- 每书契约与实现：`*-CONTRACT.md`、`*-budget.json`、`*-chap-slices.json`、`*-slice.py`、`*-audit.py`、`*-consistency.py`（anatomy/biochem/cellbio/histo/immuno/microbio/neuro/patho/pharmaco/radiology/tcmdx/topo 各一套）。
- OCR：`scripts/ocr/ocrdir.swift`、`main.swift`、`ocr`/`ocrbot`（可执行）、`anatomy-ocr.txt` 等 → macOS Vision 框架 OCR。
- 通用/辅助：`audit_qb.py`（审计 diagnostics extracted 合法性）、`cand-scan.py`（扫描 `src/source_pdfs: ` 候选 PDF 判定 TEXT/扫描件）、`extract_diag.py` / `probe_diag.py`（诊断学文本抽取/版式探测）、`extract-anatomy.py` / `extract-genetics.py`（早期逐本文本抽取）、`biochem-split.py`/`biochem-probe.py`/`biochem-toc.py`/`histo-toc.py`/`histo-header.py` 等章节探测辅助、`pathology-handoff-prompt.md`（病理学的续做 prompt）。
- 注意：`scripts/` 中另有一批**已提交**的既有文件（如 `sync-agent-rules.sh`）；未跟踪的上述文件全部属于 9 月批量提取工作流。

**(c) 两份题库提取文档（未跟踪）**
- `docs/QUESTION_BANK_EXTRACTION.md` —— 提取「唯一真相源」：总规则、A 已完成表（A1–A15）、B 待办（卫生统计学跳过待回归）、C 区扫描件清单与历次「方向登记」、每本 SOP、常用命令。mtime 2026-09-05 16:29。
- `docs/RESUME_QUESTION_BANK_EXTRACTION.md` —— 给 Trae Work 的「新会话续做粘贴模板」。mtime 2026-09-04 14:07。

**(d) AI Agent 规则/配置文件（未跟踪，非题库产物）**
- `.clinerules`、`.cursor/rules/project.mdc`、`.continue/rules/project.md`、`.amazonq/rules/project.md`：**由已提交的 `scripts/sync-agent-rules.sh` 从 `AGENTS.md` 自动生成**（文件头带 `AUTO-GENERATED from AGENTS.md` 声明），用途是让不原生读 `AGENTS.md` 的 agent（Cline/Roo、Cursor、Continue、Amazon Q）自动加载同一份项目规则。
- `.windsurfrules`、`.aider.conf.yml`：手工指针文件，让 Windsurf / Aider 指向 `AGENTS.md`。
- `.github/copilot-instructions.md` 同为该脚本产物，但**已提交**（与上面的未提交生成物不一致，见 7.3）。
- 这些文件的作用是把「AGENTS.md 是唯一准则」铺到所有工具；**本会话未创建它们**【待确认：由哪个会话/人执行生成，仓库不可证】。

**(e) scratch / 中间产物**
- `ch5_raw.txt`、`ch5_lung_questions.txt`、`ch5_heart_questions.txt`、`ch5_a1_questions.txt`（mtime 2026-09-04 08:03–08:05）、根目录 `scripts_tmp_ch5_extract.py`（08:05）：西医《诊断学·第5章 胸部检查》的一次**试探性/中间提取**（比 `extracted-diagnostics-ch5.ts` 成品 08:28 更早），对应当前 `extracted-diagnostics` 的探索过程。
- `.qbwork/diagnostics_full.txt`（858 KB，09-04 07:53）：`scripts/extract_diag.py` 输出的《诊断学》全书带页码标注文本工作文件（`extract_diag.py` 内写死输出到该路径）。`.qbwork/` 是提取工作目录。
- `src/source_pdfs: `（目录名含「冒号+空格」，见 1.4）：存放教材 PDF 原始资料的本地目录，是全部提取脚本的输入源。

### 1.4 需要留意但不在 git 里的路径

- `src/source_pdfs: `：真实目录名形如 `source_pdfs: `（含冒号与不可见尾随字符），`git status` 显示为 `?? "src/source_pdfs: /"`。内含教材 PDF（含受版权扫描件），属于**原始学习资料只读区**，不进入 `public/`，也**不应提交**（当前 .gitignore 未排除它，只是靠「不 git add」保持不提交）。提取 SOP 明确要求脚本用 glob/find 枚举、勿硬编码该路径。
- `.qoder/`、`.workbuddy/`、`.codebuddy/`、`.wrangler/`、`.open-next/` 等在 `.gitignore` 中已忽略（AI 工具本地运行态），非仓库内容。
- `.env.local` / `.dev.vars`（含 DashScope 等密钥，权限 600，已 ignore）：只读不打印不提交。

---

## 2. 未提交内容归属与用途（逐类回应）

| 未提交/未跟踪项 | 用途 | 是否 CodeBuddy 创建 |
|---|---|---|
| `docs/PROJECT_STATE.md`（+28 行） | 追加 A2–A15 题库提取完成里程碑（Trae SOP 的登记步骤） | 本会话否；归属 Trae 体系【待确认】 |
| `src/content/courses/{15 目录}`（336 分件） | 题库底稿，惰性数据，不被业务引用 | 否（按分工属 Trae）【会话级待确认】 |
| `scripts/*-CONTRACT/slice/audit/...` | 提取流水线（每本契约/切片/审计） | 否【待确认】 |
| `docs/QUESTION_BANK_EXTRACTION.md` / `RESUME_...md` | 提取跨会话真相源 + Trae 续做模板 | 否【待确认】 |
| `ch5_*.txt`、`scripts_tmp_ch5_extract.py`、`.qbwork/` | 《诊断学》第5章试提取中间产物与全书工作文本 | 否【待确认】 |
| `.cursor/` `.clinerules` `.continue/` `.amazonq/` | `scripts/sync-agent-rules.sh` 从 AGENTS.md 生成的规则副本 | 未生成者明确【待确认】 |
| `.windsurfrules` `.aider.conf.yml` | 指向 AGENTS.md 的手工指针 | 【待确认】 |

结论：**当前未提交内容的主体是题库提取体系（你界定为 Trae 的分工）**；仓库中没有任何证据表明 CodeBuddy 会话在 9 月 3–6 日参与了该体系。

---

## 3. 验证状态（2026-09-08 本次实跑）

| 命令 | 结果 | 说明 |
|---|---|---|
| `npm run lint` | ✅ 0 errors，**159 warnings** | warnings 一部分来自 extracted 底稿（如 `extracted-biochemistry-ch22.ts:224` 未使用的 eslint-disable、多个 extracted 文件未用到的 `chapterLabel`/`topic`/`promptNote` 局部变量），属噪音；另有少量既有业务文件 warning（如 `billing-panel.tsx` 的 `<img>`、`alipay.ts` `_headers` 等） |
| `npm run typecheck` | ✅ 通过 | 全部 extracted 底稿可过严格 tsc |
| `npm test` | ✅ **217 passed / 63 suites / 0 fail**（`tsx --test tests/**/*.test.ts`） | |
| `npm run build` | ❌ 失败 | **唯一原因**：`next/font` 构建期联网拉取 `fonts.googleapis.com`（Geist Mono / Instrument Serif / Inter）被 DNS 阻断（`getaddrinfo ENOTFOUND`）。这是**当前沙箱/离线环境的网络限制**，非代码错误；此前里程碑文档记录在有网络环境 `npm run check` 全绿（最近一次 radiology A15 2026-09-05） |

**已知未修复/半途而废？**
- 已跟踪业务代码未见「改一半」的状态：HEAD 干净，测试全绿。
- scratch 文件（ch5_*.txt 等）看似残留，但对应成品 `extracted-diagnostics-ch5.ts` 已完整落盘，并非半途而废。
- 真正的**未完结**是产品决策性的，不是代码坏状态：题库提取仍有 C 区剩余扫描件与「下一本」待用户指定；卫生统计学按用户决定跳过、保留待回归（见 QUESTION_BANK_EXTRACTION B/C 区登记）。
- 环境性风险点：任何**离线/无外网**环境跑 `npm run check` 都会在 build 阶段因 Google Fonts 假失败；CI/沙箱需预置字体缓存或放行 `fonts.googleapis.com`【建议由项目决策是否自托管字体】。

---

## 4. 与 Trae 的分工与冲突核查

- **我有没有碰 `extracted-*.ts` 或题库相关代码？** 本会话没有任何写入；全仓库证据（mtime 均在 09-03~09-06、内容/命名与 QUESTION_BANK_EXTRACTION 契约一一对应、RESUME 模板指明 Trae）都指向该批文件由题库提取工作流产生。是否某个更早的 CodeBuddy 会话参与过【待确认】。
- **代码级交叉冲突：未发现。** 核查事实：
  - `src/content/courses/index.ts`（已提交注册表）未被改动，仍只注册两门课程；
  - `src/app`、`src/lib`、`src/components`、`src/types` 中不存在对 `extracted-*` 的任何引用（grep 为空）；
  - extracted 底稿刻意「不写课程 truth、不改注册表、不发布」，因此与 CodeBuddy 负责的课程/学习/评分代码在数据流上完全隔离。
- **需要警惕的隐性交叉**：
  1. extracted 底稿体积巨大（336 个 TS），已被 `eslint`/`tsc`/`next build` 扫描，`tsconfig`/lint 配置变更会直接影响它们；改动 Tier 1/2 校验逻辑时可能间接命中（当前 typecheck 通过，说明契约匹配现有 `src/types/learning.ts`）。
  2. 双真相源（QUESTION_BANK_EXTRACTION + PROJECT_STATE）靠「每本登记两次」的纪律维持；CodeBuddy 若改动 PROJECT_STATE，注意别与提取登记段冲突。
  3. **协作写互斥**：不要与 Trae 会话同时写同一个提取目录 / `scripts/*` / `QUESTION_BANK_EXTRACTION.md`；文档状态更新要登记会话身份。
- **Trae 续做入口**：`docs/RESUME_QUESTION_BANK_EXTRACTION.md`（把框内全文作为第一条消息粘进 Trae Work）；当前「下一本/下一方向」待用户指定。

---

## 5. 给下一位 AI 的关键提示（看起来小但关键 / 隐含约定）

1. **先读再动手**：`AGENTS.md`（含 Tier 1–4 代码边界）、`docs/PROJECT_STATE.md`（唯一真相源）、`docs/QUESTION_BANK_EXTRACTION.md`、`docs/RESUME_QUESTION_BANK_EXTRACTION.md`、`docs/NEXT_SESSION_PROMPT.md`。开始前先 `git status --short`。
2. **AGENTS.md 是唯一行为准则**：`.clinerules`、`.cursor/rules/project.mdc`、`.continue/rules/project.md`、`.amazonq/rules/project.md`、`.github/copilot-instructions.md` 都由 `scripts/sync-agent-rules.sh` 生成（含 AUTO-GENERATED 头）——**不要手改生成物**，改 AGENTS.md 后重跑脚本；`.windsurfrules`/`.aider.conf.yml` 是手工指针。
3. **`src/source_pdfs: ` 目录名含「冒号/空格」**，脚本必须用 glob/find 枚举（QUESTION_BANK_EXTRACTION SOP 明示），勿硬编码路径；内含受版权 PDF，保持只读、不进 `public/`、**不 git add**（.gitignore 当前未覆盖它，靠自觉）。
4. **extracted 底稿铁律**（契约在 QUESTION_BANK_EXTRACTION 总规则）：
   - 不写入 `src/content/courses/{科目}.ts` 课程 truth；不改 `src/content/courses/index.ts` 注册表；不发布；
   - ID 前缀 `ext-...` 全局唯一；每文件 `order` 从 1 逐章连续；`correctChoiceIndex` 0 起且与选项重排同步；正确项严格对照源「参考答案」；答案元数据 `authority="nur-platform"`、`confidence="unverified"`、`content[0]=答案 / content[1]=解析`；B1 组级不写 `knowledgePointId`；缺失记 0、禁止捏造。
5. **双真相源纪律**：每完成一本 → 更新 `docs/QUESTION_BANK_EXTRACTION.md`（A/B 表 + 方向登记）**并**在 `docs/PROJECT_STATE.md` 追加里程碑；两处可能不同步（例如 A1 诊断学 1602 在 PROJECT_STATE 无段落），需要时可补齐但别编内容。
6. **验证顺序**：单章 `npx tsc --noEmit` → 整本聚合后 `npm run check`；测试 `npm test`（当前 217/217）。
7. **离线 build 会「假失败」**：`next/font` 需外网 `fonts.googleapis.com`；离线/CI 下 build 报 ENOTFOUND 不是代码回归。
8. **密钥边界**：DashScope `qwen3.7-plus` 凭证只在 ignored、mode-600 的 `.env.local` / `.dev.vars`；不读取、不打印、不提交、不进文档/日志/截图。
9. **git 纪律**：所有提交 author=nukeab；除非用户明确要求，不要 reset/discard/stage/commit/push/deploy（`docs/NEXT_SESSION_PROMPT.md` 明示）。收尾动作（是否提交 extracted、是否 gitignore `src/source_pdfs: `/scratch/规则文件）必须由用户拍板——目前 `.clinerules` 等生成物处于「未跟踪但未 ignore」的中间态，`.github/copilot-instructions.md` 却已提交，状态不一致。
10. **跨 AI 协作**：题库提取归 Trae（续做走 RESUME 模板）；CodeBuddy 侧避免与 Trae 并发写同一提取目录/scripts/提取文档；在产品功能代码中引用题库前，先回读 QUESTION_BANK_EXTRACTION 的最新 A/B/C 状态，别假设某门课已存在。

---

## 6. 附：本次核实使用的命令

```bash
git status --porcelain=v1        # 未提交/未跟踪清单
git --no-pager diff --stat       # 已跟踪修改统计（仅 docs/PROJECT_STATE.md，+28）
git --no-pager diff docs/PROJECT_STATE.md
git log --oneline -30            # 提交序列
git log -25 --format='%h|%an|%ad|%s'
npm run lint && npm run typecheck   # 0 errors/159 warnings；tsc 通过
npm test                         # 217 passed / 0 fail
npm run build                    # 仅 Google Fonts 联网失败（环境性）
grep -rn "Extracted\|extracted" src/app src/lib src/components src/types  # 无业务引用
find src/content/courses -name 'extracted-*.ts' | wc -l   # 336
git ls-files scripts/sync-agent-rules.sh                    # 已跟踪
git check-ignore -v .clinerules .cursor/rules/project.mdc ... # 未忽略
```
