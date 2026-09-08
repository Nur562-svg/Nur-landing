# 题库批量提取 · 新会话续做 Prompt（直接粘贴使用）

> 把下面 `┌────` … `└────` 之间的整段内容，作为**新会话的第一条消息**粘贴进 Trae Work，
> 在 **nur-landing 项目目录** 上操作即可无缝续做，不会丢失记忆。
> 备份建议：若担心粘贴文件丢失，副本在 `docs/QUESTION_BANK_EXTRACTION.md`（状态总表）与
> `docs/RESUME_QUESTION_BANK_EXTRACTION.md`（本页）。

---

┌──── 开始粘贴（下面整段）────

我是 NUR LEARN 医学生在线学习平台项目的开发者。请你在 **nur-landing 项目目录（/Users/nukeab/projects/Nur-landing）** 上，继续「医学教材题库批量提取」任务。

## 第一步：状态重建（强制，先做再动手）
你**没有**之前对话的记忆。为防进度错乱，请先按顺序做下面 4 件事，并逐条读进上下文：
1. 阅读 `docs/PROJECT_STATE.md`（产品状态）与 `docs/QUESTION_BANK_EXTRACTION.md`（题库提取总规则 + 既定顺序 + 状态总表，这是**跨会话唯一真相源**）。
2. 阅读类型定义 `src/types/learning.ts`，重点 `AssessmentItemDefinition` 与 `AssessmentItemGroupDefinition`。
3. 阅读已验证范例 `src/content/courses/physiology/extracted-physiology-ch5.ts`，照抄其字段结构、常量与文件头注释风格。
4. 用脚本枚举 `src/source_pdfs*/` 下所有 PDF（路径可能含空格/冒号，用 glob/find 匹配，勿硬编码），并确认已完成的【诊断学·全量1602 / 生理学·599(12章)】与「下一本 = 27.医学遗传学学习指导与习题集-第4版」。
完毕后，先用一两句话汇报你认定的「当前进度 + 下一本」，等我确认或直接进入第二步（除非状态互斥，否则直接继续）。

## 第二步：执行下一本（医学遗传学）
按总规则与总表中的「每本教材标准作业流程（SOP）」执行：抽文本→扫章节→算600等比预算→逐章取材→生成 `src/content/courses/medical-genetics/extracted-medical-genetics-ch{N}.ts`→整本聚合到 `index.ts`→校验→登记。

## 总规则（每本必守）
1. 数量：每教材 **600 道独立记分题**（诊断学全量底稿除外），**按章节等比缩放**在章间分配；各章取整合计以算得数为准，并在文件头如实标注。
2. 独立记分单元 = term + a1-single + short-answer + case + B1 组成员。
3. 题材与答案：**只取该教材「复习思考题/习题」区 + 「参考答案与题解」区，严禁捏造**；答案严格对照源参考答案的正确项；无法可靠提取的改选同源清晰题，缺失记 0。
4. 题型映射：A1/A2→`a1-single`；X型多选→`a1-single`（改单选句并取一正确项，`promptSource.note` 用 xMapNote）；B型配伍→`AssessmentItemGroupDefinition`；名词解释→`term`；病例/思考题→`case` 或 `short-answer`。
5. 题干轻度改写，保留全部数值/单位/病例细节；选择题选项随机重排并同步 `correctChoiceIndex`（0起）。
6. Schema 必填：id, order, knowledgePointId, questionKind, status:"available", prompt, promptSource, answer, scoring:null, sourceIds:[]（选择题另加 choices+correctChoiceIndex）。B1 组级有 order+promptSource 但**无 knowledgePointId**；成员各有 order+knowledgePointId+promptSource+correctChoiceIndex（指向 sharedChoices）。
7. 答案元数据：authority="nur-platform"、confidence="unverified"、content=[答案/要点, 解析]，解析放 content[1]。
8. OCR 错字按医学语义恢复；数值单位保留；不得捏造。
9. ID 前缀 `ext-{科目}-{topic}...` 全局唯一；每文件 order 从 1 连续递增。
10. **不越界**：extracted 是题库底稿，不写入 `src/content/courses/{科目}.ts` 课程 truth、不改 course 注册表、不发布、不删改其它章节文件；完成整本后再聚合 `index.ts`。
11. 校验：`npx tsc --noEmit`（逐章）→ 整本聚合后 `npm run check`；并审计 ID 唯一性 + order 连续性。

## 完成一本后
1. 更新 `docs/QUESTION_BANK_EXTRACTION.md` 的 B 区状态与计数。
2. 在 `docs/PROJECT_STATE.md` 追加一条简短里程碑（可比照现有生理学条目的写法）。
3. 汇报：题型分布、独立记分题总数（是否恰＝该教材预算）、缺失答案/无法提取数（期望 0）、产物文件清单。

规则若有歧义，以 `docs/PROJECT_STATE.md`、`docs/QUESTION_BANK_EXTRACTION.md`、`src/types/learning.ts` 与 ch5 范例为权威，先确认再执行，不要擅改既定结构与顺序。

└──── 结束粘贴（上面整段）────

---

## 本页备注（不需要粘贴）
- **为什么不丢记忆**：prompt 开头强制「状态重建」，让新会话只依赖**落盘文件**（PROJECT_STATE、状态总表、types、已完文件）自行重建上下文，而非依赖旧对话摘要。只要仓库在，进度就在。
- **稳定性**：所有规则、顺序、Schema 都写成持久文件；新会话被要求「先读文件再动手」，并登记改动，从而避免两次会话各说各话。
- 若你想跳过「等我确认」直接跑，去掉第一步里「等我确认或」这一段即可。