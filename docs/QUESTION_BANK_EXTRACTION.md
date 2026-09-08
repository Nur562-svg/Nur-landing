# 题库批量提取 · 秩序与状态总表

> 本文件是「题库批量提取」跨会话的**唯一真相源**。任何新会话续做前必须读取本文件，
> 并在完成后更新它。避免把进度只记在某次对话里（那会导致记忆断裂）。
> 关联模板：`src/types/learning.ts`；已验证范例：`src/content/courses/physiology/extracted-physiology-ch5.ts`。

---

## 一、总规则（每本必守，不可违反）

1. **数量**：未商业化阶段，**每本教材提取 600 道独立记分题**。诊断学（全量底稿）除外。
2. **分布**：600 道**按各章节原题量等比缩放**分配（章预算=round(600×章习题区字符占比)；各章取整后合计可略低于/高于 600，以算得数为准，在文件头如实标注）。
3. **独立记分单元** = term + a1-single + short-answer + case + **B1 组成员**。
4. **题材与答案**：仅从该教材 PDF 的「复习思考题 / 习题」区与「参考答案与题解」区取材；**严禁捏造题目或答案**；答案必须严格对照源「参考答案」所标正确项；无法可靠提取的题应改选同源其他清晰题，缺失记 0。
5. **题型映射**：A1 型/A2 型 → `a1-single`；X 型多选 → `a1-single`（改为单选句，取其中一个正确项，`promptSource.note = xMapNote`）；B 型配伍（共用备选答案）→ `AssessmentItemGroupDefinition`；名词解释 → `term`；病例/思考题 → `case`（非选择型）或并入 `short-answer`。
6. **改写**：题干轻度改写（同义替换/语序/句式），保留全部数值、单位、病例细节。
7. **选择题选项顺序随机重排**，`correctChoiceIndex` 同步改为正确项新下标（0 起）。
8. **Schema 必填**（`AssessmentItemDefinition`）：id, order, knowledgePointId, questionKind, status:"available", prompt, promptSource, answer, scoring:null, sourceIds:[]；选择题还需 choices + correctChoiceIndex。B1 组级有 order + promptSource，但**组级不得写 knowledgePointId**；成员各含 order + knowledgePointId + promptSource + correctChoiceIndex（指向 sharedChoices）。
9. **答案元数据**：authority="nur-platform"、confidence="unverified"，content=[答案/要点, 解析]，解析放 `content[1]`。
10. **OCR 错字**按医学语义恢复（例：胁→肋、延髄→延髓、fi→量、鲤→量）；数值与单位保留原值。
11. **ID** 前缀 `ext-{科目}-{topic}-ch{N}-...` 全局唯一；每文件的 order 从 1 连续递增至该文件预算。
12. **不越界**：extracted 数据是**题库底稿**，不得写入 `src/content/courses/{科目}.ts` 课程 truth 定义、不得改动 course 注册表、不得发布、不得改其它章节文件；完成整本后再统一聚合到该目录 `index.ts`。
13. **校验**：单文件/单本后运行 `npx tsc --noEmit`；整本聚合后运行 `npm run check`（lint+typecheck+build）；并做 ID 唯一性与 order 连续性审计。

---

## 二、既定提取顺序（按此执行，防止混乱）

> 依据 2026-09-04 对 `src/source_pdfs*/` 全部 PDF 的原生文本扫描判定：
> 「TEXT」= 有内嵌文本、可直接提取；「扫描件」= 无文本层、需 OCR 决策后另行处理。

### A. 已完成 ✅
| # | 教材（文件名前缀） | 状态 | 结果 |
|---|---|---|---|
| A1 | 3.诊断学学习指导与习题集-第4版 | 完成（全量底稿） | 1602 道，作为全量底稿，**不做 600 裁剪** |
| A2 | 14.生理学学习指导与习题集-第3版 | 完成（600 等比预算） | 12 章，合计 **599** 道（600 同比取整；独立记分题，含 B1 组成员）。文件在 `src/content/courses/physiology/extracted-physiology-ch{1..12}.ts`，`index.ts` 聚合导出 `physiologyExtractedItems/physiologyExtractedGroups` |
| A3 | 27.医学遗传学学习指导与习题集-第4版 | 完成（600 等比预算） | 21 区（绪论+20章），合计 **599** 道（预算 601，第11章源题量/清晰题所限实取 37→整本 ±2）。文件在 `src/content/courses/medical-genetics/extracted-medical-genetics-ch{0..20}.ts`，`index.ts` 聚合导出 `medicalGeneticsExtractedItems/medicalGeneticsExtractedGroups`。缺失答案 0、无法可靠提取 0 |
| A4 | 7.系统解剖学习题集-第2版 | 完成（600 等比预算） | 扫描件 OCR 提取，错字按解剖学医学语义恢复；18 个正文章节分件（第19章预算 0、不设分件），按各章 PDF 正文页数等比取整预算合计恰好 **600** 道独立记分题。文件在 `src/content/courses/human-anatomy/extracted-human-anatomy-ch{1..18}.ts`，`index.ts` 聚合导出 `humanAnatomyExtractedItems/humanAnatomyExtractedGroups`。契约见 `scripts/anatomy-CONTRACT.md`；A1/A2/A3→a1-single、B型→Group b1、填空→fill、名词→term、判断改错/问答→short-answer、填图不计分；选择题正确项严格对照源「参考答案」、选项重排并同步 correctChoiceIndex；分章预算精确达标、ID 全局唯一、order 逐章 1..N 连续（脚本审计 anatomy-audit.py）。缺失答案 0、无法可靠提取 0 |
| A5 | 15.生物化学与分子生物学学习指导与习题集 | 完成（600 等比预算） | 原生文本层、双栏排版错序按生物化学医学语义恢复；27 个正文章节分件，按各章习题区字符等比取整预算合计**恰好 600** 道独立记分题。文件在 `src/content/courses/biochemistry/extracted-biochemistry-ch{1..27}.ts`，`index.ts` 聚合导出 `biochemistryExtractedItems/biochemistryExtractedGroups`。契约/切片/审计见 `scripts/biochem-CONTRACT.md`、`scripts/biochem-slice.py`、`scripts/biochem-audit.py`；A1/A2→a1-single、X 型→a1-single 单选（promptSource.note 标注）、B 型→Group b1、名词→term、简答→short-answer；选择题正确项严格对照源「参考答案」、选项随机重排并同步 correctChoiceIndex；分章预算精确达标、ID 全局唯一、order 逐章 1..N 连续。缺失答案 0、无法可靠提取 0 |
| A6 | 20.组织学与胚胎学学习指导与习题集-第4版 | 完成（600 等比预算） | 原生文本层、双栏排版错序按组织学/胚胎学医学语义恢复；28 个正文章节分件（第1–19章组织学、第20–28章胚胎学），按各章习题区字符等比取整预算合计**恰好 600** 道独立记分题。文件在 `src/content/courses/histology-embryology/extracted-histology-embryology-ch{01..28}.ts`，`index.ts` 聚合导出 `histologyEmbryologyExtractedItems/histologyEmbryologyExtractedGroups`。契约/切片/审计见 `scripts/histo-CONTRACT.md`、`scripts/histo-slice.py`、`scripts/histo-audit.py`；A1/A2→a1-single、X 型→a1-single 单选（xMapNote）、B 型→Group b1、名词→term、简答/论述→short-answer；本书无填空；选择题正确项严格对照各章末「参考答案」键号，第28章无参考答案故仅按复习纲要可明确锚定者取材 3 道；选项随机重排并同步 correctChoiceIndex；ID 全局唯一、order 逐章 1..N 连续。缺失答案 0；无法可靠提取：ch18 1、ch22 1，均已换用同源更清晰题 |
| A7 | 21.医学细胞生物学实验指导与习题集-第4版 | 完成（600 等比预算） | 原生文本层、双栏排版错序按细胞生物学医学语义恢复；**只取「第二部分 习题集」18 章**（第一章绪论…第十八章细胞工程，PDF 第103–226页），按各章习题区字符占比同比取整预算合计**恰好 600** 道独立记分题。文件在 `src/content/courses/cell-biology/extracted-cell-bio-ch{01..18}.ts`，`index.ts` 聚合导出 `cellBioExtractedItems/cellBioExtractedGroups`。契约/切片/审计见 `scripts/cellbio-CONTRACT.md`、`scripts/cellbio-slice.py`、`scripts/cellbio-audit.py`；本书题型仅三种：名词→term、二、单项选择→a1-single、三、多项选择→a1-single 单选（xMapNote，取一正确项）；**无 B 型配伍/填空/简答**（extractedGroups 空数组）；正确项严格对照各章末「参考答案」键号（第5章答案标题被 OCR 扭曲仍识别）、选项随机重排并同步 correctChoiceIndex；ID 全局唯一、order 逐章 1..N 连续。缺失答案 0；无法可靠提取：ch01 2、ch02 1、ch10 1、ch11 若干、ch14 1、ch15 1、ch17 2，换用同源清晰题并如实注明 |
| A8 | 5.医学免疫学学习指导与习题集-第3版 | 完成（600 等比预算） | **扫描件 OCR 提取**（本批次第2方向，用户指定优先），错字按免疫学医学语义恢复（如 CD4⁻/CD4⁺、HLA-I/II 类、T 细胞亚群、细胞因子名、抗体类别等，数值/分子标记保留原值）；全书 25 个正文章节分件（第1章免疫学概论…第25章免疫学防治，PDF 第8–289页），按各章习题区字符等比取整预算合计**恰好 600** 道独立记分题。文件在 `src/content/courses/immunology/extracted-immunology-ch{01..25}.ts`，`index.ts` 聚合导出 `immunologyExtractedItems/immunologyExtractedGroups`。契约见 `scripts/immuno-CONTRACT.md`（切片/预算见 `scripts/immuno-slice.py`、OCR 见 `scripts/ocr/ocrdir.swift`）；本书题型仅四种：名词→term、填空→fill（多空答案 content[0] 按空序号列出）、A1/A2（病例）→a1-single、问答/简答→short-answer；**无 X 型多选/判断/B 型配伍**（extractedGroups 空数组）；选择题正确项严格对照各章末「参考答案」键号、选项随机重排并同步 correctChoiceIndex；ID 全局唯一（600/600）、order 逐章 1..N 连续（脚本审计）。缺失答案 0；无法可靠提取 0 |
| A9 | 6.医学微生物学学习指导与习题集-第2版 | 完成（600 等比预算） | **扫描件 OCR 提取**（本批次第3方向，紧随免疫学，病原与免疫常同期开课），错字按微生物学医学语义恢复（如 G⁺菌/G⁻菌、荚膜、疱疹、HBsAg、CD4⁺、N-乙酰胞壁酸、B-1,4糖苷键等，数值/分子标记保留原值）；全书 37 区（绪论 + 36 章，PDF 第12–273页）按各章习题区字符占比同比取整预算合计**恰好 600** 道独立记分题。文件在 `src/content/courses/microbiology/extracted-microbiology-ch{00..36}.ts`，`index.ts` 聚合导出 `microbiologyExtractedItems/microbiologyExtractedGroups`。契约见 `scripts/microbio-CONTRACT.md`（切片/预算 `scripts/microbio-slice.py`、OCR `scripts/ocr/ocrdir.swift`、审计 `scripts/microbio-audit.py`、一致性 `scripts/microbio-consistency.py`）；本书题型：名词→term、填空→fill（多空答案 content[0] 按空序号列出）、A1/A2（病例）→a1-single、**B1 配伍→Group b1（32 组、96 成员）**、简答/问答→short-answer；选择题正确项严格对照各章末「参考答案」键号、选项随机重排并同步 correctChoiceIndex；ID 全局唯一（600/600）、order 逐章 1..N 连续（脚本审计）。缺失答案 0；无法可靠提取 0 |
| A10 | 8.神经病学学习指导与习题集-第3版 | 完成（600 等比预算） | **扫描件 OCR 提取**（本批次第4方向，按既定顺序紧随微生物学），错字按神经病学医学语义恢复（如 祝觉→视觉、眼脸→眼睑、茶普生→萘普生、非留体→非甾体、Horer→Horner、介人→介入、特妹→特殊、玉力→压力、禁总证→禁忌证、主千→主干、胼酞嗪→肼酞嗪、胭动脉→腘动脉、力鲁唑→利鲁唑 等，数值/分子标记如 rt-PA、DSA、CTA、MRA、TCD、HRMRI、ASPECT、ASITN/SIR、WASID、NASCET、mmHg、mmol/L 保留原值）；全书 23 个正文章节分件（第1章绪论…第23章内科系统疾病的神经系统并发症，PDF 第 6–414 页）按各章习题区字符占比同比取整预算合计**恰好 600** 道独立记分题。文件在 `src/content/courses/neurology/extracted-neurology-ch{01..23}.ts`，`index.ts` 聚合导出 `neurologyExtractedItems/neurologyExtractedGroups`。契约见 `scripts/neuro-CONTRACT.md`（切片/预算 `scripts/neuro-budget.json`、OCR `scripts/ocr/ocrdir.swift`）；本书题型：A1/A2/A3-A4→a1-single（A3/A4 病例串题干并入 prompt）、**B1 配伍→Group b1（34 组、127 成员）**、简答/论述→short-answer、病例分析→case；选择题正确项严格对照各章末「参考答案」键号（A1/A2/A3-A4/B1 各小节独立编号，OCR 键号错位处按医学语义重建）、选项随机重排并同步 correctChoiceIndex；ID 全局唯一（600/600）、order 逐章 1..N 连续（脚本审计）。缺失答案 0；无法可靠提取 0 |
| A11 | 16.药理学学习指导与习题集-第4版 | 完成（600 等比预算） | **扫描件 OCR 提取**（第5方向新顺序第1本，紧随神经病学），错字按药理学医学语义恢复（如 B-内酰胺类→β-内酰胺类、青莓素→青霉素、脈拉西林→哌拉西林、氮曲南→氨曲南、头孢噻昐→头孢噻吩、紅霉素→红霉素、氯林可莓素→氯林可霉素、灰黄霉素→灰黄霉素、磺胺啼啶银→磺胺嘧啶银、丙皮酸→丙戊酸、拉英酸钠→拉莫三嗪、盼噻嗪类→吩噻嗪类、码啡/巴啡/玛啡→吗啡、Nn 受体/Nm 受体、α1/β1/β2/DA 受体亚型、I/II/III/IV 期临床试验 等，数值与单位保留原值）；全书 49 个正文章节分件（第1章药理学总论—绪言…第49章影响免疫功能的药物，PDF 第 6–319 页）按各章习题区字符占比同比取整预算合计**恰好 600** 道独立记分题。文件在 `src/content/courses/pharmacology/extracted-pharmacology-ch{01..49}.ts`，`index.ts` 聚合导出 `pharmacologyExtractedItems/pharmacologyExtractedGroups`。契约见 `scripts/pharmaco-CONTRACT.md`（预算 `scripts/pharmaco-budget.json`、审计 `scripts/pharmaco-audit.py`、一致性 `scripts/pharmaco-consistency.py`）；本书题型：名词→term、填空→fill（多空答案 content[0] 按空序号列出）、A1/A2（病例）→a1-single、**B1 配伍→Group b1（35 组、105 成员）**、简答/论述→short-answer；选择题正确项严格对照各章末「参考答案」键号（A1/A2/B1 各小节独立编号，OCR 键号散落错位处按题号与药理语义归位）、选项随机重排并同步 correctChoiceIndex；ID 全局唯一（600/600）、order 逐章 1..N 连续、correctChoiceIndex 与 answer.content[0] 一致性（脚本审计）。缺失答案 0；无法可靠提取：ch20 1（填空第3题参考答案残缺）、ch21 13（填空第1–13题题干未恢复），均未取并如实注明 |
| A12 | 23.局部解剖学学习指导与习题集 | 完成（600 等比预算） | **扫描件 OCR 提取**（第5方向新顺序第2本，紧随药理学），错字按局部解剖学医学语义恢复（如 骼/餎→髂、靜脉→静脉、韧帶→韧带、臀丛→臂丛、膕/胭窝→腘窝、胭动脉→腘动脉、排总神经→腓总神经 等，数值与单位保留原值）；全书 9 区（绪论 + 第1–8章：头部/颈部/胸部/腹部/盆部与会阴/脊柱区/上肢/下肢，PDF 第 11–187 页）按各章习题区字符占比同比取整预算合计**恰好 600** 道独立记分题（绪论 2、头部 41、颈部 88、胸部 69、腹部 137、盆部与会阴 62、脊柱区 70、上肢 60、下肢 71）。文件在 `src/content/courses/topographic-anatomy/extracted-topographic-anatomy-ch{00..08}.ts`，`index.ts` 聚合导出 `topographicAnatomyExtractedItems/topographicAnatomyExtractedGroups`。契约见 `scripts/topo-CONTRACT.md`（预算 `scripts/topo-budget.json`、切片 `scripts/topo-slice.py`、审计 `scripts/topo-audit.py`、一致性 `scripts/topo-consistency.py`）；本书题型：名词→term（155）、A1/A2（病例）→a1-single（199）、**B1 配伍→Group b1（42 组、137 成员）**、简答→short-answer（109）；无填空与论述；习题与参考答案分散在各章各节（每节独立编号），选择题正确项严格对照各节「参考答案」键号（A1/A2/B1 各小节与各节独立编号，OCR 键号散落错位如 `27.E28.A29.A` 挤行处按题号与解剖学语义归位）、选项随机重排并同步 correctChoiceIndex；ID 全局唯一（600/600）、order 逐章 1..N 连续、correctChoiceIndex 与 answer.content[0] 一致性（脚本审计）。缺失答案 0；无法可靠提取：ch02 1（颈动脉三角的内容不包括，参考答案键号与正文矛盾按契约跳过并注明）、ch07 肩部 B1 型 7–12 题参考答案为多项选择、与 B1 单项配伍契约不符未纳入（因预算未取，不计缺失），均如实注明 |
| A13 | 25.病理学学习指导与习题集 | 完成（600 等比预算） | **扫描件 OCR 提取**（第5方向新顺序第3本、该方向最后一本，紧随局部解剖学），错字按病理学医学语义恢复（如 雀奇金淋巴瘤→霍奇金淋巴瘤、Reed-Sterberg→Reed-Sternberg、调亡/猜亡→凋亡、苏丹皿→苏丹Ⅲ、沃-佛→沃-弗综合征、heriation→herniation、giter→gitter cell、senile plague→senile plaque、干酪样坏死、朗汉斯巨细胞、树胶样肿、凹空细胞、假膜性炎、噬神经细胞现象、卫星现象、筛状软化灶、胶质结节、脑疝、Rosenthal 纤维、Lewy/Negri 小体、FISH、CTCs、LSCM、FRAP、NGS 等，数值与单位保留原值）；全书 18 个正文章节分件（第1章细胞和组织的适应与损伤…第18章疾病的病理学诊断和研究方法，PDF 第 8–299 页）按各章习题区字符占比同比取整预算合计**恰好 600** 道独立记分题（ch01 23、ch02 26、ch03 38、ch04 38、ch05 24、ch06 48、ch07 15、ch08 15、ch09 46、ch10 62、ch11 51、ch12 29、ch13 36、ch14 31、ch15 33、ch16 31、ch17 46、ch18 8）。文件在 `src/content/courses/pathology/extracted-pathology-ch{01..18}.ts`，`index.ts` 聚合导出 `pathologyExtractedItems/pathologyExtractedGroups`。契约见 `scripts/patho-CONTRACT.md`（预算 `scripts/patho-budget.json`、切片 `scripts/patho-slice.py`、审计 `scripts/patho-audit.py`、一致性 `scripts/patho-consistency.py`）；本书题型：名词→term（190）、A1/A2（病例）→a1-single（149）、判断题 + 问答题→short-answer（261，判断题在前、问答题在后共用 short 序号）；**无填空、无 B1 配伍、无论述题、无病例分析**（extractedGroups 空数组）；选择题正确项严格对照各章末「参考答案」键号（A1/A2 各小节独立编号，OCR 键号散落错位处按题号与病理学语义归位）、选项随机重排并同步 correctChoiceIndex；判断题按 √/× 键号归位；ID 全局唯一（600/600）、order 逐章 1..N 连续、correctChoiceIndex 与 answer.content[0] 一致性（脚本审计）。缺失答案 0；无法可靠提取 0 |
| A14 | 中医诊断学（学生整理带答案材料，非编号学习指导） | 完成（源题不足预算则全取并注明；410/600，缺口 190） | 带答案、可提取源仅两个：① `中医诊断学选择.pdf`（18 页扫描件，260 道单选，同学整理参考版，macOS Vision OCR，键号常挤行/截断处按题号+中医诊断学医学语义归位）；② `output/pdf/中医诊断学_第1天~第6天背诵内容及答案.pdf`（6 本原生文本层，名词/简答/病案带「项目整理标准答案」）。无答案源（南京中医药大学中诊各期末试卷、重点清单、知识精华汇总、四诊导图等）按规则严禁提取；西医《诊断学》期末试卷不属中诊、不纳入。按 12 个知识单元（绪论/望诊/舌诊/闻诊/问诊/脉诊/按诊/八纲辨证/病性辨证/脏腑辨证/其他辨证/病历书写与诊断）全取，合计 **410** 道独立记分题（ch01 20、ch02 49、ch03 32、ch04 20、ch05 38、ch06 50、ch07 7、ch08 30、ch09 56、ch10 69、ch11 32、ch12 7；题型 term 108、a1-single 260、short-answer 38、case 4；**无填空、无是非题答案源、无 B1/B2 配伍**，extractedGroups 空数组）。缺口 190 与目标 600 的差额如实登记，未捏造题目或答案凑数。文件在 `src/content/courses/tcm-diagnostics-bank/extracted-tcm-diagnostics-bank-ch{01..12}.ts`，`index.ts` 聚合导出 `tcmDiagnosticsBankExtractedItems/tcmDiagnosticsBankExtractedGroups`。契约 `scripts/tcmdx-CONTRACT.md`（预算 `scripts/tcmdx-budget.json`、切片 `scripts/tcmdx-slice.py`、审计 `scripts/tcmdx-audit.py`、一致性 `scripts/tcmdx-consistency.py`）。单选题正确项对照选择.pdf 页尾参考答案键号、选项随机重排同步 correctChoiceIndex；ID 全局唯一（410/410）、order 逐章 1..N 连续、correctChoiceIndex 与 answer.content[0] 一致性（脚本审计）。缺失答案 0；无法可靠提取 0（部分题键号 OCR 截断/冲突处按中医诊断学医学语义归位并如实注明，未去向不明） |
| A15 | 26.医学影像学学习指导与习题集-第3版 | 完成（600 等比预算） | **扫描件 OCR 提取**（优先目标第 2 本，紧随中医诊断学 A14），错字按医学影像学医学语义恢复（如 介人→介入、钆（Cd）→钆（Gd）、高分辨力/分辨率、CT值、T1WI/T2WI、DWI、MRA、DSA、CTA、PACS、RIS、DICOM、CDFI、窗宽窗位、影像征象名、栓塞/支架/导管等介入术语；数值与单位如 mSv、kV、mA、ms、cm、mm 保留原值）；带答案源仅 `src/source_pdfs: /26.医学影像学学习指导与习题集-第3版-全书签.pdf`（200 页扫描件，全书 15 章每章均含 学习目标/重点难点/复习思考题〔名词解释/填空/选择 A1/A2/B1/简答〕+ 参考答案；另有一份 `(1)` 副本未用）；学习资料目录中未发现其它医学影像学材料（无答案源）。全书 15 章（第1章影像诊断学总论…第15章良恶性肿瘤的介入治疗，PDF 第 2–200 页）按各章习题区字符占比同比取整预算合计**恰好 600** 道独立记分题（ch01 71、ch02 55、ch03 34、ch04 49、ch05 48、ch06 22、ch07 85、ch08 73、ch09 55、ch10 15、ch11 5、ch12 14、ch13 35、ch14 13、ch15 26）。文件在 `src/content/courses/radiology-bank/extracted-radiology-bank-ch{01..15}.ts`，`index.ts` 聚合导出 `radiologyBankExtractedItems/radiologyBankExtractedGroups`。契约见 `scripts/radiology-CONTRACT.md`（预算 `scripts/radiology-budget.json`、切片 `scripts/radiology-slice.py`、配额 `scripts/radiology-quota.py`、审计 `scripts/radiology-audit.py`、一致性 `scripts/radiology-consistency.py`）；本书题型：名词→term（77）、填空→fill（96，多空答案 content[0] 按空序号列出）、A1/A2（病例）→a1-single（286）、**B1 配伍→Group b1（23 组、66 成员）**、简答→short-answer（75）；**无病例分析、无论述题**；选择题正确项严格对照各章末「参考答案」键号（A1/A2/B1 全书连续编号；多节章 ch03 共 7 节、ch07 共 4 节、ch08 共 5 节每节独立编号，OCR 键号散落错位如 `27.B28.G` 挤行处按题号与医学影像学医学语义归位）、选项随机重排并同步 correctChoiceIndex；ID 全局唯一（600/600）、order 逐章 1..N 连续、correctChoiceIndex 与 answer.content[0] 一致性（脚本审计）。缺失答案 0；无法可靠提取 0（ch04 填空原书第2题 OCR 残缺换第6题、A1 第31题题干缺问语按语义补全；ch05 A1 第19题选项残缺换第24题；ch09 A1 第25题选项「骨枢形成」按语义恢复为「骨膜增生」；均已如实注明） |

### B. 下一步顺序（原生 TEXT，可立即提取）⬇️
| # | 教材 | 说明 | 章节规模参考 |
|---|---|---|---|
| B1 | 卫生统计学_赵耐青练习册 | **按用户决定跳过**（无编号普通手册，仅供后续按需回归；原生 TEXT 中仅剩此本） | 小册 79 页 |
| —— | （原生 TEXT 已提完） | 下一步需决定：回归跳过本（卫生统计学），或从 C 区扫描件中选一本继续 OCR | —— |

> 顺序可调整：若产品优先西医/某科，可改到 B 区前列，但**改动须在此表登记**，避免两处记忆不一致。
> **调整登记：** 2026-09-04 本会话按用户「跳过卫生统计学，按顺序开始提取」，把 B2 生物化学提前并完成（A5）；原 B1 卫生统计学保留在 B3 供后续按需回归。

### C. 扫描件（无文本层，暂缓）
儿科/流病/传染/预防/精神/药理/核医/妇产/眼科/口腔/耳鼻喉/皮肤等编号学习指导，以及无编号手册（内科学、儿科学、药理学、病理学、诊断学、诊断学_复旦、病理生理学11821606、医学寄生虫学、解剖新版宝典、传染病_新版宝典、中医药学及中西医结合临床 等）。
**处理前置**：需先决定 OCR 方案（如 PaddleOCR/RapidOCR/本地服务）并评估授权与质量，**当前不自动开始**。已在 `docs/PROJECT_STATE.md` / `docs/CONTENT_ARCHITECTURE.md` 记录的产品约束仍适用（不得绕过来源溯源、不得发布超范围内容）。
> **优先级调整登记：** 本会话按用户「普遍大学生优先使用 NUR LEARN」，把扫描件《系统解剖学习题集-第2版》提前至 A4 完成（用 macOS Vision 框架 OCR + 医学语义恢复），而非按其原 C 区顺序。类似「更契合普遍大学生的临床前基础课」扫描件，可在未来按同法提前，改动均须在此登记。（下一本仍为 B1 卫生统计学_赵耐青练习册；后续是否继续优先基础课由用户定夺。）
> **第2方向登记：** 2026-09-04 本会话按用户「执行第 2 方向」，从 C 区扫描件中选取《医学免疫学学习指导与习题集-第3版》优先 OCR 并完成（A8，600 等比预算），同一 macOS Vision OCR + 免疫学医学语义恢复方法继续适用。原 C 区清单已移除「免疫」。
> **第3方向登记：** 2026-09-04 本会话按既定顺序从 C 区扫描件中选取《医学微生物学学习指导与习题集-第2版》优先 OCR 并完成（A9，600 等比预算），同一 macOS Vision OCR + 微生物学医学语义恢复方法继续适用（病原与免疫常同期开课，故紧随免疫学）。原 C 区清单已移除「微生」。下一本按既定顺序为《神经病学学习指导与习题集-第3版》（8.神经病学）。
> **第4方向登记：** 2026-09-04 本会话按既定顺序从 C 区扫描件中完成《神经病学学习指导与习题集-第3版》优先 OCR 并完成（A10，600 等比预算），同一 macOS Vision OCR + 神经病学医学语义恢复方法继续适用。原 C 区清单已移除「神经」。下一本按既定顺序为《儿科学学习指导与习题集》或用户指定。
> **第5方向（新顺序）登记：** 2026-09-04 用户指定新提取顺序，**跳过儿科学(9)/流行病学(10)/传染病学(11)/预防医学(12)/精神病学(13) 等**，依次为 **药理学(16) → 局部解剖学(23) → 病理学(25)**；每本仍按既定 SOP 提取 600 道（C 区扫描件同法 macOS Vision OCR + 医学语义恢复），完成后按此顺序续下一本，改动须在此表登记。
> **第6方向登记：** 2026-09-04/05 按第5方向新顺序完成《药理学学习指导与习题集-第4版》优先 OCR 并完成（A11，600 等比预算），同一 macOS Vision OCR + 药理学医学语义恢复方法继续适用（契约 scripts/pharmaco-CONTRACT.md、预算 scripts/pharmaco-budget.json）。原 C 区清单已移除「药理」。下一本按既定顺序为《局部解剖学学习指导与习题集》(23)。
> **第7方向登记：** 2026-09-05 按第5方向新顺序第2本完成《局部解剖学学习指导与习题集》(23) 优先 OCR 并完成（A12，600 等比预算），同一 macOS Vision OCR + 局部解剖学医学语义恢复方法继续适用（契约 scripts/topo-CONTRACT.md、预算 scripts/topo-budget.json、切片 scripts/topo-slice.py、审计 scripts/topo-audit.py、一致性 scripts/topo-consistency.py）。原 C 区清单已移除「局解」。下一本按既定顺序为《病理学学习指导与习题集》(25)。
> **第8方向登记：** 2026-09-05 按第5方向新顺序第3本（该方向最后一本）完成《病理学学习指导与习题集》(25) 优先 OCR 并完成（A13，600 等比预算），同一 macOS Vision OCR + 病理学医学语义恢复方法继续适用（契约 scripts/patho-CONTRACT.md、预算 scripts/patho-budget.json、切片 scripts/patho-slice.py、审计 scripts/patho-audit.py、一致性 scripts/patho-consistency.py）。原 C 区清单已移除「病理」。第5方向新顺序（药理学→局部解剖学→病理学）已全部完成；后续顺序待用户指定（剩余扫描件：儿科学(9)/流行病学(10)/传染病学(11)/预防医学(12)/精神病学(13)/核医学(17)/妇产科学(18)/眼科学(19)/耳鼻咽喉头颈外科学(22)/口腔科学(24)/医学影像学(26) 等；卫生统计学_赵耐青练习册为原生 TEXT 可立即提取，按用户此前决定保留待回归）。
> **第9方向登记：** 2026-09-05 新增《中医诊断学》（A14）——并非编号学习指导，而是用户资料文件夹中**学生整理的带答案材料集**。带答案、可提取源仅两个：① `中医诊断学选择.pdf`（18 页扫描件，260 道单选，同学整理参考版，macOS Vision OCR + 中医诊断学医学语义恢复）；② `output/pdf/中医诊断学_第1天~第6天背诵内容及答案.pdf`（6 本原生文本层，名词/简答/病案带「项目整理标准答案」）。全书按 12 个知识单元归类**全取，合计 410 道**（term 108、a1-single 260、short-answer 38、case 4，无填空/无是非题/无 B1），缺口 190 与目标 600 的差额如实登记、未编造凑数。无答案源（南中医中诊各期末试卷、重点清单、知识精华汇总、四诊导图）按规则严禁提取；西医《诊断学》期末试卷不属中诊、不纳入。契约 `scripts/tcmdx-CONTRACT.md`（预算 `scripts/tcmdx-budget.json`、切片 `scripts/tcmdx-slice.py`、审计 `scripts/tcmdx-audit.py`、一致性 `scripts/tcmdx-consistency.py`）。已通过 `scripts/tcmdx-audit.py` + `scripts/tcmdx-consistency.py` + `npm run check`（lint+typecheck+build）全量校验。中医诊断学系本轮提取的优先目标，已完成；下一本待用户指定。
> **第10方向登记：** 2026-09-05 按优先目标第 2 本完成《医学影像学学习指导与习题集-第3版》(26) 优先 OCR 并完成（A15，600 等比预算，15 章：ch01 71、ch02 55、ch03 34、ch04 49、ch05 48、ch06 22、ch07 85、ch08 73、ch09 55、ch10 15、ch11 5、ch12 14、ch13 35、ch14 13、ch15 26；题型 term 77、fill 96、a1-single 286、short-answer 75、B1 23 组 66 成员），同一 macOS Vision OCR + 医学影像学医学语义恢复方法继续适用（契约 `scripts/radiology-CONTRACT.md`、预算 `scripts/radiology-budget.json`、切片 `scripts/radiology-slice.py`、配额 `scripts/radiology-quota.py`、审计 `scripts/radiology-audit.py`、一致性 `scripts/radiology-consistency.py`）。原 C 区清单已移除「影像」。已通过 `scripts/radiology-audit.py` + `scripts/radiology-consistency.py` + `npx tsc --noEmit` + `npm run check`（lint+typecheck+build）全量校验。医学影像学系本轮提取的优先目标第 2 本，已完成；下一本按优先目标为《传染病学学习指导与习题集》(11)（需先确认）或用户指定（剩余扫描件：儿科学(9)/流行病学(10)/预防医学(12)/精神病学(13)/核医学(17)/妇产科学(18)/眼科学(19)/耳鼻咽喉头颈外科学(22)/口腔科学(24) 等；卫生统计学_赵耐青练习册为原生 TEXT 可立即提取，按用户此前决定保留待回归；《中医药学及中西医结合临床》覆盖中医基础理论/中药学/方剂学/针灸学/推拿学 5 门，需先评估题量）。

---

## 三、每本教材标准作业流程（SOP）

对 B 区每一本：
1. **定位源**：`src/source_pdfs*/`（可能含空格/冒号，用脚本枚举匹配，勿硬编码路径）。
2. **建科目目录**：`src/content/courses/{科目}/`（例：`medical-genetics/`、`health-statistics/`）。
3. **抽文本**：用 PyMuPDF 抽取全书到临时文件（参考 `src/source_pdfs` 的历史脚本），并用 `===== PDF_PAGE_nnn =====` 分页。
4. **扫章节**：从目录/书签与「复习思考题」「学习目标」定位各章起止 PDF 页。
5. **算等比预算**：统计各章习题区字符（定位到「复习思考题」起始页→章尾），占比分配 600。
6. **逐章取材**：按预算等比取题，生成 `extracted-{科目}-ch{N}.ts`（仿 ch5 模板与文件头注释）。
7. **聚合**：全部章完成后在 `src/content/courses/{科目}/index.ts` 聚合导出。
8. **校验**：`npx tsc --noEmit`；ID 唯一性 + order 连续性审计；`npm run check`。
9. **登记**：更新本表 B 区状态、`docs/PROJECT_STATE.md`，并汇报（题型分布、缺失数、总数＝预算？）。

---

## 四、常用命令
- `npm run dev`/local server；`npm run typecheck`；`npm run lint`；`npm run build`；`npm run check`（三者合一）。
- 文本抽取：PyMuPDF（`import fitz`，已被废弃提示影响不大；可用 `import pymupdf` 替代）。