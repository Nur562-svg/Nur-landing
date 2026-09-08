你是 NUR LEARN 项目的题库批量提取助手。本会话目标：按既定规则提取下一本教材《病理学学习指导与习题集》，严格按用户指定的新顺序推进，保证跨会话记忆完整、稳定、不混乱。

【第一步 · 必读上下文（按顺序完整读取，不要跳过）】
1. /Users/nukeab/projects/Nur-landing/AGENTS.md
2. /Users/nukeab/projects/Nur-landing/README.md
3. /Users/nukeab/projects/Nur-landing/docs/PROJECT_STATE.md（产品决策与里程碑唯一真相源）
4. /Users/nukeab/projects/Nur-landing/docs/CONTENT_ARCHITECTURE.md
5. /Users/nukeab/projects/Nur-landing/docs/QUESTION_BANK_EXTRACTION.md（题库提取秩序与状态总表，本任务唯一真相源，必须完整读取）
6. 项目记忆：/Users/nukeab/.trae-cn/memory/projects/-Users-nukeab-projects-Nur-landing--p2-a98b8249a8073cff5294/project_memory.md
7. 参考模板与范例（按需读取）：
   - 类型定义：src/types/learning.ts（AssessmentItemDefinition / AssessmentItemGroupDefinition）
   - 契约模板（最近一本，可仿写 patho-CONTRACT.md）：scripts/topo-CONTRACT.md
   - 提取范例（含 B1 组与文件头统计报告）：src/content/courses/pharmacology/extracted-pharmacology-ch40.ts；或 src/content/courses/topographic-anatomy/extracted-topographic-anatomy-ch03.ts
   - 渲染脚本模板：scripts/topo-render.py；切片/预算模板：scripts/topo-slice.py
   - 审计模板：scripts/topo-audit.py；一致性模板：scripts/topo-consistency.py

【第二步 · 当前进度（已确认，勿重复）】
- 已完成 A1 诊断学(1602全量) → A2 生理学(599) → A3 医学遗传学(599) → A4 系统解剖学(600,扫描OCR) → A5 生物化学(600) → A6 组织学与胚胎学(600) → A7 医学细胞生物学(600) → A8 医学免疫学(600,扫描OCR) → A9 医学微生物学第2版(600,扫描OCR) → A10 神经病学第3版(600,扫描OCR) → A11 药理学第4版(600,扫描OCR) → A12 局部解剖学(600,扫描OCR)。
- 原生 TEXT 批次已全部提完；卫生统计学按用户决定跳过保留。
- 用户 2026-09-04 指定【新提取顺序】：药理学(16) → 局部解剖学(23) → 病理学(25)；跳过儿科学(9)/流行病学(10)/传染病学(11)/预防医学(12)/精神病学(13) 等。每本完成后按此顺序续下一本，改动须在 docs/QUESTION_BANK_EXTRACTION.md 登记。

【第三步 · 本会话任务】
提取《病理学学习指导与习题集》，源文件：src/source_pdfs: /25.病理学学习指导与习题集-全书签.pdf（注意：目录名实际为 src/source_pdfs: 带尾随冒号与一个空格，勿硬编码，用 glob 枚举匹配）。已完成探测：299 页、22 条书签（封面1/书名2/版权3/目录5 + 第1–18章，括号内为 PDF 页码）：第一章细胞和组织的适应与损伤(8)、第二章损伤的修复(23)、第三章局部血液循环障碍(37)、第四章炎症(55)、第五章免疫性疾病(71)、第六章肿瘤(83)、第七章环境和营养性疾病(105)、第八章遗传性疾病和儿童疾病(114)、第九章心血管系统疾病(122)、第十章呼吸系统疾病(141)、第十一章消化系统疾病(166)、第十二章淋巴造血系统疾病(191)、第十三章泌尿系统疾病(203)、第十四章生殖系统和乳腺疾病(222)、第十五章内分泌系统疾病(237)、第十六章神经系统疾病(253)、第十七章感染性疾病(269)、第十八章疾病的病理学诊断和研究方法(293)。全书 184 页无文本层、整本仅 267 字符杂散文本 → **扫描件，需走 macOS Vision OCR 流程**（渲染 PNG zoom 4.0 + scripts/ocr/ocrdir.swift，输出 scripts/patho-ocr.txt）。先核对书签与章边界、定位各章「复习思考题/习题」→「参考答案」区，再算预算。

【第四步 · 每本必守的总规则（不可违反）】
1. 数量：每本教材提取 600 道独立记分题（诊断学全量除外）。
2. 分布：600 道按各章节原题量等比缩放分配（章预算=round(600×章习题区字符占比)；各章取整后合计以算得数为准，在文件头如实标注）。
3. 独立记分单元 = term + a1-single + short-answer + case + B1 组成员。
4. 题材与答案：仅从该教材 PDF 的「复习思考题/习题」区与「参考答案与题解」区取材；严禁捏造题目或答案；答案必须严格对照源「参考答案」所标正确项；无法可靠提取的题改选同源其他清晰题，缺失记 0。
5. 题型映射：A1/A2 型 → a1-single；X 型多选 → a1-single（改为单选句，取其中一个正确项，promptSource.note=xMapNote）；B 型配伍（共用备选答案）→ AssessmentItemGroupDefinition；名词解释 → term；病例/思考题 → case（非选择型）或并入 short-answer。病理学实际题型以 OCR 后确认为准（既往常见：名词→term、填空→fill、A1/A2→a1-single、B1→Group b1、简答/论述→short-answer、病例分析→case）。
6. 改写：题干轻度改写（同义替换/语序/句式），保留全部数值、单位、病例细节。
7. 选择题选项顺序随机重排，correctChoiceIndex 同步改为正确项新下标（0 起）。
8. Schema 必填（AssessmentItemDefinition）：id, order, knowledgePointId, questionKind, status:"available", prompt, promptSource, answer, scoring:null, sourceIds:[]；选择题还需 choices + correctChoiceIndex。B1 组级有 order + promptSource，但组级不得写 knowledgePointId；成员各含 order + knowledgePointId + promptSource + correctChoiceIndex（指向 sharedChoices）。
9. 答案元数据：authority="nur-platform"、confidence="unverified"，content=[答案/要点, 解析]，解析放 content[1]。
10. OCR 错字按医学语义恢复（病理学注意：病变/病理过程术语、细胞类型、染色方法、免疫标记物、肿瘤命名等；数值与单位保留原值）；无法可靠恢复的按医学语义重建并如实注明。
11. ID 前缀 ext-{科目}-{topic}-ch{N}-... 全局唯一；每文件 order 从 1 连续递增至该文件预算。科目目录 src/content/courses/pathology/，聚合导出 pathologyExtractedItems/pathologyExtractedGroups；契约 scripts/patho-CONTRACT.md、预算 scripts/patho-budget.json、切片 scripts/patho-slice.py、审计 scripts/patho-audit.py、一致性 scripts/patho-consistency.py（命名 subject=patho，与既往 histo/microbio/neuro/pharmaco/topo 一致）。
12. 不越界：extracted 数据是题库底稿，不得写入 src/content/courses/{科目}.ts 课程 truth 定义、不得改动 course 注册表、不得发布、不得改其它章节文件；完成整本后再统一聚合到该目录 index.ts。
13. 校验：单文件/单本后运行 npx tsc --noEmit；整本聚合后运行 npm run check（lint+typecheck+build）；并做 ID 唯一性与 order 连续性审计（仿 scripts/topo-audit.py）+ correctChoiceIndex 与答案一致性审计（仿 scripts/topo-consistency.py）。

【第五步 · 标准作业流程（SOP）】
1. 定位源：src/source_pdfs:（含尾随冒号与空格，用 glob 枚举匹配，勿硬编码路径）。
2. 建科目目录：src/content/courses/pathology/。
3. 抽文本：扫描件 → 渲染 PNG（仿 scripts/topo-render.py，zoom 4.0，输出 scripts/patho-png/）+ macOS Vision OCR（scripts/ocr/ocrdir.swift 已编译，用法：scripts/ocr/ocrdir <输入PNG目录> <输出txt>）到 scripts/patho-ocr.txt。
4. 扫章节：从书签/目录与「复习思考题」「习题」定位各章起止 PDF 页（书签页码即 PDF 页码）。
5. 算等比预算：统计各章习题区字符（习题区起始页→章尾），占比分配 600（Hamilton 最大余数法，仿 scripts/topo-slice.py），生成 scripts/patho-budget.json 与 scripts/patho-snippets/。
6. 逐章取材：按预算等比取题，生成 extracted-pathology-ch{NN}.ts（仿契约与范例文件头注释，文件头含分章统计报告）；可用 general_purpose_task 子代理并行生成，同时不超过 3 个；每章 prompt 必须含契约路径、素材路径、预算、topic、locatorBase、章内节结构、tsc 校验与汇报要求。
7. 聚合：全部章完成后在 src/content/courses/pathology/index.ts 聚合导出 pathologyExtractedItems/pathologyExtractedGroups。
8. 校验：npx tsc --noEmit；ID 唯一性 + order 连续性审计（仿 scripts/topo-audit.py）；correctChoiceIndex 与答案一致性审计（仿 scripts/topo-consistency.py）；npm run check。
9. 登记：更新 docs/QUESTION_BANK_EXTRACTION.md（A 区新增 A13 条目 + 第8方向登记 + C 区清单移除「病理」）、docs/PROJECT_STATE.md（里程碑段落）、项目记忆 project_memory.md（进度与下一本）；汇报题型分布、缺失数、总数=预算？

【第六步 · 契约与脚本命名约定（与既往一致）】
- 契约：scripts/patho-CONTRACT.md（先写契约，再按契约逐章生成）
- 切片/预算：scripts/patho-slice.py + scripts/patho-budget.json + scripts/patho-chap-slices.json
- OCR 文本：scripts/patho-ocr.txt；切片片段：scripts/patho-snippets/
- 审计：scripts/patho-audit.py；一致性：scripts/patho-consistency.py

【第七步 · 完成后】
- 汇报：题型分布（term/fill/a1-single/b1/short-answer/case 各计数）、缺失答案数、无法可靠提取数、总数是否=600 预算。
- 明确下一本：本本为第5方向新顺序最后一本；完成后登记并向用户询问后续顺序（剩余扫描件：儿科学(9)/流行病学(10)/传染病学(11)/预防医学(12)/精神病学(13)/核医学(17)/妇产科学(18)/眼科学(19)/耳鼻咽喉头颈外科学(22)/口腔科学(24)/医学影像学(26) 等；卫生统计学_赵耐青练习册为原生 TEXT 可立即提取，按用户此前决定保留待回归）。
- 全程使用中文输出。
