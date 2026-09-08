# 题库提取 · 新 Trae 账号首次开工 Prompt（直接粘贴使用）

> 用途：旧的 Trae 账号额度用尽，换新账号后**对话记忆完全丢失**。
> 把下面 `┌────` … `└────` 之间的整段内容，作为**新会话的第一条消息**粘贴进 Trae Work，
> 在 **nur-landing 项目目录** 上操作。本页是让新账号「像旧账号一样工作」的启动器——
> 全部知识都落在仓库文件里，新账号只需按步骤重建，效果与旧账号续做一致。

---

┌──── 开始粘贴（下面整段）────

我是 NUR LEARN 医学生在线学习平台项目的开发者。你是一个**全新的 Trae 账号**，之前没有任何关于本项目的对话记忆；这个仓库里的题库提取工作由上一个 Trae 账号完成。你的任务是**无缝接替**它，按完全相同的流程继续工作。请严格按以下步骤执行。

## 第一步：状态重建（强制，先做再动手）

你没有记忆，但项目把全部规则与进度都写进了仓库。请按顺序完成下面 6 件事，并逐条读进上下文：

1. 阅读 `docs/QUESTION_BANK_EXTRACTION.md` —— **题库提取唯一真相源**：总规则（每本必守）、A 区已完成总表、B 区待办、C 区扫描件清单与历次方向登记、每本教材标准作业流程（SOP）、常用命令。
2. 阅读 `docs/RESUME_QUESTION_BANK_EXTRACTION.md` —— 上一账号的续做模板，确认你要继承的交接机制。
3. 阅读类型定义 `src/types/learning.ts`，重点 `AssessmentItemDefinition` 与 `AssessmentItemGroupDefinition`（含 B1/B2 语义注释）。
4. 阅读已验证范例 `src/content/courses/physiology/extracted-physiology-ch5.ts`，照抄其字段结构、常量与文件头注释风格。
5. **核验既有成果（重要）**：用脚本枚举 `src/content/courses/*/extracted-*.ts` 确认 15 套教材（A1 诊断学 / A2 生理学 / A3 医学遗传学 / A4 系统解剖学 / A5 生物化学 / A6 组胚 / A7 细胞生物 / A8 免疫 / A9 微生物 / A10 神经病学 / A11 药理 / A12 局部解剖 / A13 病理 / A14 中诊 / A15 影像）的产物文件都在；抽查运行 `npx tsc --noEmit` 与各 `scripts/{简写}-audit.py`（如 `python3 scripts/radiology-audit.py`），确认既有成果健康。
6. 用脚本枚举 `src/source_pdfs*/` 下所有 PDF（**目录名含冒号与空格，用 glob/find 匹配，勿硬编码路径**），对照 C 区清单确认剩余扫描件。

完毕后，用一两句话汇报你认定的「当前进度 + 已完成核验结果 + 下一本候选」，**然后停下来等开发者确认下一本教材**。在开发者明确指定之前，**不要擅自开工任何一本新教材**。

## 第二步：执行新一本（等开发者指定后）

按 `docs/QUESTION_BANK_EXTRACTION.md` 中「每本教材标准作业流程（SOP）」执行：定位源→建科目目录→抽文本→扫章节→算 600 等比预算→逐章取材→生成 `src/content/courses/{科目}/extracted-{科目}-ch{N}.ts`→整本聚合到 `index.ts`→校验→登记。

## 总规则（每本必守，与旧账号完全一致）

1. 数量：每教材 **600 道独立记分题**（诊断学全量底稿除外），按章节**等比缩放**分配；各章取整合计以算得数为准，文件头如实标注。
2. 独立记分单元 = term + a1-single + short-answer + case + B1 组成员。
3. 题材与答案：**只取源 PDF「复习思考题/习题」区 +「参考答案与题解」区，严禁捏造**；无法可靠提取的改选同源清晰题，缺失记 0。
4. 题型映射：A1/A2→`a1-single`；X 型多选→`a1-single`（改单选句并取一正确项，`promptSource.note` 用 xMapNote）；B 型配伍→`AssessmentItemGroupDefinition`；名词解释→`term`；填空→`fill`；判断改错/问答题→`short-answer`；病例/思考题→`case`。
5. 题干轻度改写，保留全部数值/单位/病例细节；选择题选项随机重排并同步 `correctChoiceIndex`（0 起）。
6. Schema 必填：id, order, knowledgePointId, questionKind, status:"available", prompt, promptSource, answer, scoring:null, sourceIds:[]（选择题另加 choices+correctChoiceIndex）。B1 组级有 order+promptSource 但**无 knowledgePointId**；成员各有 order+knowledgePointId+promptSource+correctChoiceIndex（指向 sharedChoices）。
7. 答案元数据：authority="nur-platform"、confidence="unverified"、content=[答案/要点, 解析]，解析放 content[1]。
8. OCR 错字按医学语义恢复（各科常见错字映射见总表/既有文件头注释）；数值单位与分子标记（CD4+/HLA/β 受体亚型等）保留原值；不确定不臆改。
9. ID 前缀 `ext-{科目}-{topic}...` 全局唯一；每文件 order 从 1 连续递增。
10. **不越界**：extracted 是题库底稿，不写入 `src/content/courses/{科目}.ts` 课程 truth、不改 course 注册表、不发布、不删改其它章节文件；完成整本后再聚合 `index.ts`。
11. 校验：单章 `npx tsc --noEmit`（注意 `@/` 别名误报，以项目级为准）→ 整本聚合后 `npm run check`；并跑对应 `{简写}-audit.py`（ID 唯一性 + order 连续性）与 `{简写}-consistency.py`（correctChoiceIndex 与答案一致性）。
12. 扫描版教材：用 `scripts/ocr/` 的 macOS Vision OCR 链（`ocrdir.swift`/`ocrbot`）整目录 OCR，再切片；**键号散落/挤行/截断**（如 `5.B6.6.D`、`20756`）必须按题号+医学语义归位，并在文件头/content[1] 如实注明。

## 完成一本后

1. 更新 `docs/QUESTION_BANK_EXTRACTION.md` 的 A/B 区状态与计数（登记会话身份：新账号）。
2. 在 `docs/PROJECT_STATE.md` 追加一条简短里程碑（比照现有生理学条目写法）。
3. 汇报：题型分布、独立记分题总数（是否恰＝该教材预算）、缺失答案/无法提取数（期望 0）、产物文件清单。

## 铁律

- 规则有歧义时，以 `docs/QUESTION_BANK_EXTRACTION.md`、`src/types/learning.ts`、范例 `extracted-physiology-ch5.ts` 为权威，**先确认再执行**，不要擅改既定结构与顺序。
- 不捏造题、不凑数、不越界、不删改他人产物。
- 与开发者（及另一名 AI 助手，负责产品功能代码）协作时：**不要与它并发写同一个提取目录 / `scripts/*` / `QUESTION_BANK_EXTRACTION.md`**；先看 git 状态再动手。

└──── 结束粘贴（上面整段）────

---

## 本页备注（不需要粘贴）

- **为什么新账号能无缝接替**：旧账号的全部知识 = 仓库文件（真相源 + 类型 + 范例 + 契约 + 审计脚本）。新账号被强制「先读文件再动手 + 先核验再开工」，不依赖任何对话记忆。
- **与 RESUME 文档的关系**：`RESUME_QUESTION_BANK_EXTRACTION.md` 面向「同账号换会话」；本页面向「换账号（零记忆）」，增加了第 5、6 步的**成果核验**与「停下等指定下一本」的硬性要求。后续若有第三次换号，直接复用本页。
- **可选增强**：若想一次性核验 15 套，可让新账号逐本跑 `scripts/{简写}-audit.py`（只读 extracted 与 budget.json，不依赖已删中间产物，可离线复跑）。
