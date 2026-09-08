# NUR LEARN · 题库提取工作交接文档（面向下一位 AI 开发者）

> 生成时间：2026-09-08。范围：`src/content/courses/**` 下以 `extracted-*.ts` 命名的**题库底稿**（以下称「题库提取」工作），
> 与 `docs/PROJECT_STATE.md` 描述的产品（从证据开始辨证的医学学习平台）是同一仓库、但属**独立的交付批次**。
>
> 本交接文档所有产物文件、计数、校验结果均为**本次实机核对**，非凭记忆；凡无法在本机二次确认处均标注「待确认」。

---

## 0. 交接前务必知道的三件事

1. **唯一真相源** = `docs/QUESTION_BANK_EXTRACTION.md`。其中「一、总规则（每本必守）」「二、既有提取顺序（状态总表）」「三、每本教材标准作业流程（SOP）」是跨会话约定，任何新会话续做前必须通读。
2. **续做提示词**已封装在 `docs/RESUME_QUESTION_BANK_EXTRACTION.md`（可直接粘贴进新会话），后台另有 `scripts/cand-scan.py` / `scripts/audit_qb.py` 等辅助校验工具。
3. **Schema 与模板**：类型契约在 `src/types/learning.ts` 的 `AssessmentItemDefinition` / `AssessmentItemGroupDefinition`（含 2026-08-06 用户确认的 B1/B2 语义注释）；**已验证范例** = `src/content/courses/physiology/extracted-physiology-ch5.ts`，所有后续章节文件均照抄其字段、常量、文件头注释风格。

---

## 一、完成清单（逐教材；文件与计数已实机核实）

### 核对口径说明
- 「独立记分题」= term + a1-single + fill + short-answer + case + **B1 组成员**（与状态总表一致）。
- 下表「实机对象数」= 用 `grep 'id: "ext-'` 统计的**对象数（含 B1 组定义）**，故 ≥ 题数。我用各教材**文档宣告的组数**相减后，**与文档宣告的题数完全一致**（见备注）。
- 「产物目录」下列出的均为**当前实际存在**的文件，逐一 `ls` 核实。

### A1–A15 完成总表

| # | 教材 | 章节归档文件数 | 文档宣告独立记分题 | 实机对象数(=题+组定义) | 结论 |
|---|---|---|---|---|---|
| A1 | 诊断学·第4版（全量底稿） | 24 | **1602**（全量，不裁剪） | 2512（含大量 b1 组对象） | 全量底稿，未裁剪 |
| A2 | 生理学·第3版 | 12 | **599**（600 同比取整） | 628 | 与文档一致 |
| A3 | 医学遗传学·第4版 | 21 | **599** | 641 | 与文档一致 |
| A4 | 系统解剖学·第2版 | 18 | **600** | 626 | 与文档一致 |
| A5 | 生物化学与分子生物学 | 27 | **600** | 642 | 与文档一致 |
| A6 | 组织学与胚胎学·第4版 | 28 | **600** | 653 | 与文档一致 |
| A7 | 医学细胞生物学·第4版 | 18 | **600** | 600（groups 空） | 与文档一致，无 B 组 |
| A8 | 医学免疫学·第3版 | 25 | **600** | 600（groups 空） | 与文档一致，无 B 组 |
| A9 | 医学微生物学·第2版 | 37 | **600** | 632（-32 组定义） | 与文档一致，32 组 96 成员 |
| A10 | 神经病学·第3版 | 23 | **600** | 634（-34 组定义） | 与文档一致，34 组 127 成员 |
| A11 | 药理学·第4版 | 49 | **600** | 635（-35 组定义） | 与文档一致，35 组 105 成员 |
| A12 | 局部解剖学 | 9 | **600** | 642（-42 组定义） | 与文档一致，42 组 137 成员 |
| A13 | 病理学 | 18 | **600** | 600（groups 空） | 与文档一致，无 B 组 |
| A14 | 中医诊断学（材料集） | 12 | **410**（源题不足，缺口 190 如实登记） | 410（groups 空） | 与文档一致 |
| A15 | 医学影像学·第3版 | 15 | **600** | 623（-23 组定义） | 与文档一致，23 组 66 成员 |

### 各教材产物文件完整路径（逐一存在，`ls` 核实）

**A1 诊断学** — `src/content/courses/diagnostics/`
```
extracted-diagnostics-ch1.ts … ch9.ts
extracted-diagnostics-inquiry.ts
extracted-diagnostics-lab-bodyfluids.ts / lab-bodyfluids-sup.ts / lab-general.ts
extracted-diagnostics-lab-hematology.ts / lab-hemostasis.ts / lab-hepatic.ts / lab-renal.ts
extracted-diagnostics-symptoms-g1.ts … g7.ts
index.ts
```
> 注意：A1 为最先提取、采用**异构/遗留结构**（文件名按 章1–9 + 症状组 symptoms-g* + 实验室 lab-* + 问诊 inquiry 分件），
> **不遵循 A2 之后统一「每章 extracted-*-ch{N}.ts」+ 每文件 order 1..N 连续」的契约**，因此标准审计脚本不覆盖它。文档宣告总数 1602；本次 grep 得 2512 个对象 id（含大量 b1 组），**精确分题型拆分待确认**，以文档 1602 为交接口径。

**A2 生理学** — `src/content/courses/physiology/` → `extracted-physiology-ch{1..12}.ts` + `index.ts`
**A3 医学遗传学** — `src/content/courses/medical-genetics/` → `extracted-medical-genetics-ch{0..20}.ts`（0 为绪论）+ `index.ts`
**A4 系统解剖学** — `src/content/courses/human-anatomy/` → `extracted-human-anatomy-ch{1..18}.ts` + `index.ts`
**A5 生物化学** — `src/content/courses/biochemistry/` → `extracted-biochemistry-ch{1..27}.ts` + `index.ts`
**A6 组织学与胚胎学** — `src/content/courses/histology-embryology/` → `extracted-histology-embryology-ch{01..28}.ts` + `index.ts`
**A7 医学细胞生物学** — `src/content/courses/cell-biology/` → `extracted-cell-bio-ch{01..18}.ts` + `index.ts`
**A8 医学免疫学** — `src/content/courses/immunology/` → `extracted-immunology-ch{01..25}.ts` + `index.ts`
**A9 医学微生物学** — `src/content/courses/microbiology/` → `extracted-microbiology-ch{00..36}.ts`（00 为绪论）+ `index.ts`
**A10 神经病学** — `src/content/courses/neurology/` → `extracted-neurology-ch{01..23}.ts` + `index.ts`
**A11 药理学** — `src/content/courses/pharmacology/` → `extracted-pharmacology-ch{01..49}.ts` + `index.ts`
**A12 局部解剖学** — `src/content/courses/topographic-anatomy/` → `extracted-topographic-anatomy-ch{00..08}.ts`（00 绪论）+ `index.ts`
**A13 病理学** — `src/content/courses/pathology/` → `extracted-pathology-ch{01..18}.ts` + `index.ts`
**A14 中医诊断学** — `src/content/courses/tcm-diagnostics-bank/` → `extracted-tcm-diagnostics-bank-ch{01..12}.ts` + `index.ts`
**A15 医学影像学** — `src/content/courses/radiology-bank/` → `extracted-radiology-bank-ch{01..15}.ts` + `index.ts`

每科目 `index.ts` 均导出 `{subject}ExtractedItems` / `{subject}ExtractedGroups`（B 组为空时 groups 为空数组）。

### 各教材配套产物（脚本/契约/预算/切片）
均为 `scripts/` 下整洁命名：`{科目简写}-CONTRACT.md`、`-budget.json`、`-slice.py`、`-audit.py`、`-consistency.py`、`-render.py`、`-header.py`、`-chap-slices.json`。清单见第四节「规则与契约演进」及第六节「未登记」。

---

## 二、进行中 / 未完成

**结论：A1–A15 共 16 套（含诊断全量底稿）已全部归档到各自 `index.ts` 并通过校验，当前没有「做一半」的教材或章节。** 逐本核对无缺文件、无未聚合章节。

尚未开始的部分：
- **原生 TEXT**：仅剩 `卫生统计学_赵耐青练习册.pdf`（79 页小册，无编号普通习题集）——按用户此前决定**保留暂跳**，供后续按需回归。
- **扫描件（无文本层，需 OCR）**：源 PDF 仍在本机 `src/source_pdfs\ :`（注意目录名含**空格+冒号**，枚举时勿硬编码路径）。剩余清单（文件名前缀）：`2.病理生理学`、`4.外科学`、`9.儿科学`、`10.流行病学`、`11.传染病学`、`12.预防医学`、`13.精神病学`、`17.核医学`、`18.妇产科`、`19.眼科学`、`22.耳鼻咽喉头颈外科学`、`24.口腔科学`、`皮肤性病学`，另有教材/宝典类混合集（`内科学`、`儿科学`、`药理学`、`病理学`、`诊断学`、`诊断学_复旦`、`病理生理学11821606`、`医学寄生虫学应试指南`、`解剖新版宝典`、`传染病_新版宝典`、`中医药学及中西医结合临床` 等）。

**剩余工作量估算（待确认）**：每本扫描件 OCR + 语义恢复 + 提取，按既往经验约为一本人天量级（A15 影像学 15 章/200 页、600 题）。扫描版处理前需先决定 OCR 工具与授权（见「踩坑与经验」）。`中医药学及中西医结合临床` 覆盖中医基础理论/中药学/方剂学/针灸学/推拿学 5 门，需先评估题量是否足够（沿用 A14 中诊「源题不足则全取」口径）。

**下一步该做什么**：下一位开发者应**先向用户确认下一本教材**（状态总表 B/C 区显示的既定顺序为传染 11，但第五方向新顺序以来几次都由用户重选）。在用户确认前，**不要擅自开工**。开工流程 = 状态总表「SOP」九步：定位源→建科目目录→抽文本→扫章节→算 600 等比预算→逐章取材→聚合 index→校验→登记两处文档。

---

## 三、规则与契约演进（从最初到现状的完整规则 + 历次修正原因）

### 3.1 现状稳定规则（每本必守，取自状态总表）

1. **数量与分布**：未商业化阶段每本 600 道独立记分题（诊断学全量底稿除外）；600 按各章习题区（字符占比，少数按页数）**等比缩放**分配；各章取整合计以算得数为准并在文件头如实标注（故 A2/A3 是 599，非强行 600）。
2. **独立记分单元** = term + a1-single + short-answer + case + B1 组成员。
3. **题材与答案**：只取源 PDF「复习思考题/习题」区 +「参考答案与题解」区；**严禁捏造**；无法可靠提取的改选同源清晰题，缺失记 0。
4. **题型映射**：A1/A2（A3/A4 并入）→`a1-single`；X 型多选→`a1-single` 单选句（取一正确项，`promptSource.note=xMapNote`）；B 型配伍→`AssessmentItemGroupDefinition(b1)`（组级 `sharedChoices`、成员 `correctChoiceIndex` 指向 sharedChoices）；名词→`term`；填空→`fill`（多空 answer.content[0] 按空序列出）；判断改错/问答题→`short-answer`；病例/思考题→`case`（判断改错+问答题共用 short 序号见各契约）。
5. **改写**：题干轻度改写，**保留全部数值、单位、病例细节**；选择题**选项随机重排**，`correctChoiceIndex`=正确项新下标（0 起）。
6. **Schema 必填**（`AssessmentItemDefinition`）：id、order、knowledgePointId、questionKind、status:"available"、prompt、promptSource、answer、scoring:null、sourceIds:[]（选择题另加 choices + correctChoiceIndex）。**B1 组级有 order+promptSource 但不得写 knowledgePointId**；成员各有 order+knowledgePointId+promptSource+correctChoiceIndex。
7. **答案元数据**：`authority="nur-platform"`、`confidence="unverified"`、`content=[答案/要点, 解析]`，解析放 `content[1]`（注意：题目本身 `promptSource.authority` 用 `nur-editorial`、`wording:"nur-adapted"`）。
8. **OCR 错字**按医学语义恢复；数值与单位保留原值。
9. **ID** 前缀 `ext-{科目}-{topic}-ch{N}-{类型}{序号}`（如 `ext-physiology-ch5-respiration-term001`、B1 成员 `...-b001m1`）**全局唯一**；组级/成员 order 与全文件 order 严格从 1 连续。
10. **不越界**：extracted 是**题库底稿**，不写入 `src/content/courses/{科目}.ts` 课程 truth、不改 course 注册表、不发布、不删改其它章节文件；整本完成后才聚合到该目录 `index.ts`。
11. **校验**：单章/单本 `npx tsc --noEmit` → 整本聚合后 `npm run check`；并做 ID 唯一性 + order 连续性审计（`{简写}-audit.py`）+ correctChoiceIndex 与答案 content[0] 一致性（`{简写}-consistency.py`）。

### 3.2 契约演进时间线（关键修正 + 原因）

| 节点 | 做了什么 / 为什么改 |
|---|---|
| 最初（A1 诊断学） | 先做全量底稿 1602 道、不裁剪；分件命名异构（ch* + symptoms-g* + lab-* + inquiry）。作为**一次性全量交付**，未后续复用其文件结构。 |
| A2 起立统一契约 | 确立 600 等比预算、每章 `extracted-{科目}-ch{N}.ts`、每文件 order 1..N 连续、`index.ts` 聚合导出、文件头内嵌「统计报告」注释。原因：A1 底稿结构无法扩展与校验，需可复用的确定性模板。（模板=physiology ch5） |
| X 型多选映射修正 | X 型规定**改单选句、取一正确项、note 用 xMapNote**，并入 a1-single。原因：Schema 无 X 型单选保留题型，需保证独立计分且不误判答案。 |
| B 型契约明细 | 明确 B 型→Group b1，组级无 knowledgePointId、成员各有，成员指向 sharedChoices。依据 2026-08-06 用户口头确认（已写进 `learning.ts` 注释）。 |
| 引入扫描版 OCR | A4 起扫描件用 **macOS Vision 框架 OCR**（`scripts/ocr/*.swift` + ocrdir）+ 医学语义恢复。原因：大量教材为无文本层扫描件，需 OCR 决策。后续 A8/A9/A10/A11/A12/A13/A14/A15 同法。 |
| 键号归位规则 | 扫描版**参考答案键号常挤行/散落/截断**（如 `5.B6.6.D`、`27.B28.G`、`20756`），规定按题号 + 各科医学语义归位，并在文件头/content[1] 如实注明。 |
| 分章预算细化 | 字符占比为主；解剖按页数；影像学多节章（ch03 7 节/ch07 4 节/ch08 5 节）**每节独立编号**，加 `radiology-quota.py`；切片脚本演进出 slice2/slice3（anatomy）与 slice/quota 分化。 |
| 源题不足口径 | A14 中诊为「学生整理带答案材料集」非编号指导，**带答案源仅 2 个**、源题不足 600 → 改为「源题不足预算则全取并如实注明」（取 410，缺口 190 登记、严禁捏造）。此规则为 A14 私有特判，需在其他教材沿用前先确认。 |
| 磁盘清理后产物凝固 | 事后删除中间产物（`*-snippets/`、`*-render/`、部分 OCR 文本、`.next` 缓存），**保留交付 .ts、预算/契约/审计脚本**；结论：审计脚本只读 extracted .ts 与 budget.json，**不依赖已删的 snippets**，可离线复跑（本次已实证）。 |

---

## 四、踩坑与经验（复用率最高）

### 4.1 PDF 文本抽取
- 用 **PyMuPDF**（`import fitz`，也可 `import pymupdf`）。源目录名含 `src/source_pdfs\ :`（**空格+冒号**），必须用 glob/find 枚举匹配、勿硬编码路径。
- 非扫描原生文本层存在**双栏排版错序**（生化/组胚/细胞生物等），需按医学语义恢复语序；扫描件无文本层则走 OCR。

### 4.2 OCR 错字医学语义恢复（真实案例）
- 问诊通用型：`沩/力→为`、`搁→胸`、`胁→肋`、`延髄→延髓`、`fi→量`、`鲤→量`、`fl→世`（生理 ch5 范例头部注释有记载）。
- 神经病学：`祝觉→视觉`、`眼脸→眼睑`、`茶普生→萘普生`、`非留体→非甾体`、`Horer→Horner`、`介人→介入`、`特妹→特殊`、`玉力→压力`、`禁总证→禁忌证`、`主千→主干`、`胼酞嗪→肼酞嗪`、`胭动脉→腘动脉`、`力鲁唑→利鲁唑`；分子标记（rt-PA/DSA/CTA/MRA/TCD/HRMRI/ASPECT… 和 mmol/L/mmHg）**保留原值**。
- 免疫学：`CD4⁻/CD4⁺`、`HLA-I/II`、细胞因子名、抗体类别——数值/分子标记保留。
- 微生物学：`G*菌→G⁺菌/G⁻菌`、`英膜→荚膜`、`疱瘆→疱疹`、`HBSAg→HBsAg`。
- 药理学：`B-内酰胺→β-内酰胺`、`青莓素→青霉素`、`盼噻嗪→吩噻嗪`、`码啡→吗啡`、受体亚型 α1/β1/β2/DA、临床试验 I/II/III/IV。
- 局部解剖学：`骼/餎→髂`、`靜脉→静脉`、`臀丛→臂丛`、`膕/胭窝→腘窝`、`排总神经→腓总神经`。
- 病理学：`雀奇金→霍奇金`、`Reed-Sterberg→Reed-Sternberg`、`调亡/猜亡→凋亡`、`苏丹皿→苏丹Ⅲ`、`heriation→herniation`、`giter→gitter cell`、`senile plague→senile plaque`。
- 影像学：`介人→介入`、`钆(Cd)→钆(Gd)`、`骨枢→骨膜`、CT/MRI 序列/介入术语；mSv/kV/mA/cm/mm 保留。

**铁律**：数值、单位、分子标记（CD4+/HLA/β 受体亚型/rt-PA 等）**一律保留原值**，只改可确证的错字；不确定处不臆改。

### 4.3 扫描版（OCR）处理链
`scripts/ocr/`：`ocrdir.swift`/`ocrbot`/`ocr` 用于整目录 OCR 输出`.txt`；`{简写}-slice.py` 从 OCR 文本切章（anatomy 切片演进到 slice2/slice3 以解决页号跟踪）；`{简写}-render.py` 渲染/重排；`{简写}-consistency.py` 做答案一致性。
> 注意：磁盘清理后 **OCR 中间文本大部分已删**（`*-snippets/`）。`scripts/ocr/anatomy-ocr.txt` 仍保留（anatomy slice 脚本依赖它）；**若需重新对该本抽取，需重跑 OCR**。

### 4.4 选项重排与 correctChoiceIndex 同步（易错点）
- 每条 A-type 与 B1 成员都是「取源参考答案标定的正确项文本」→ 随机重排选项 → 记录正确项新下标（0 起）→ `answer.content[0]` 必须 = `choices[correctChoiceIndex]`。
- **`consistency.py`/`audit.py` 会把「correctChoiceIndex ≥ 选项数」或「choices[cci] ≠ 答案 content[0]」判为错误**。这是提取中最常见的漏配问题。

### 4.5 会导致提取/校验失败的高频坑
1. 忘写 Schema 必填字段（尤其 `status:"available"`、`scoring:null`、`sourceIds:[]`）→ tsc 报类型错。
2. B1 **组级误写 knowledgePointId**，或成员漏写 → audit 报错。
3. order 不连续（某章漏序号）→ audit 报「order 不连续」。
4. ID 重复/拼接错误 → audit 报「重复 ID」。
5. X 型映射后选项/答案没同步 → 一致性失败。
6. 把 extracted 写进 `src/content/courses/{科目}.ts` 课程 truth → **越界**（绝对禁止）。
7. 单文件 tsc 会因 `@/` 别名误报 → 一律以**项目级 `npx tsc --noEmit`** 为准（契约里专门注明）。

---

## 五、验证状态

### 5.1 本次实机复核（2026-09-08）
- `npx tsc --noEmit` → **exit 0，无类型错误**（覆盖所有 extracted 文件，因它们都经 index.ts 聚合进编译）。
- 复跑审计脚本（→ 全部 **ALL CHECKS PASSED / expected sum 达标**，exit 0）：
  - `radiology-audit.py`：**600/600**，23 组 66 成员，KIND {term 77, fill 96, a1 286, short 75, b1-group 23, b1-member 66}，GLOBAL 重复 ID **0**。
  - `pharmaco-audit.py`、`topo-audit.py`、`patho-audit.py`、`tcmdx-audit.py`、`neuro-audit.py`、`microbio-audit.py`、`cellbio-audit.py`、`histo-audit.py`、`biochem-audit.py`、`anatomy-audit.py`、`genetics-audit.py` → 全部 exit 0。
- 各科目题数已实测核对并与预算对齐（见第一节总表）。

### 5.2 状态口径说明（诚实标注）
- **`npm run check`（lint+typecheck+build）**：我本次仅重跑 `tsc` 与审计脚本，**未重跑完整 `npm run build`**（耗时较长）。文档记录 A15 完成时 `npm run check` 通过（2026-09-05/06）；`tsc` 现已确认通过。完整 build 的铁定通过状态**待确认**（若你接手先跑一次 `npm run check` 求心安）。
- **A1 诊断学**不走统一审计脚本（遗留异构结构），其「精确按题型拆分」**待确认**，以文档 1602 为交接口径。
- **A8 免疫学**无 `-audit.py`（只有 header/render/slice/toc），其审计当时由 tsc + 人工完成，**无独立脚本可复跑**（脚本缺失）。
- 产物 .ts 文件**均已存在且可编译**；无「未通过校验」的交付章（除 A1 无脚本可审）。

---

## 六、仓库中未登记的东西（逐个核实）

> 以下 git 状态均实机核实（`git status --short`）；标「✓未跟踪」= untracked。

| 路径 | 是什么 | 能否删除 | 建议 |
|---|---|---|---|
| `ch5_raw.txt`（100KB） | A1 诊断学第五章【胸部检查】习题区**抽取原始文本**（`PDF INDEX 137` 起，名词解释…），提取中间产物 | 可删 | 提取已完成，纯中间产物 |
| `ch5_lung_questions.txt` / `ch5_heart_questions.txt` / `ch5_a1_questions.txt` | 诊断学 ch5 按题型切出的**候选问题文本**（肺/心/A1 单选的 OCR 切割） | 可删 | 同上，中间产物 |
| `scripts_tmp_ch5_extract.py`（516B） | 临时抽取脚本（指向 `src/source_pdfs\ :/3.诊断学...第4版-全书签.pdf`） | 可删 | 临时脚本，正式流程用 `scripts/extract_*.py` |
| `.qbwork/`（内含 `diagnostics_full.txt` 858KB） | 诊断学**全书抽取的全文分页文本**（`PDF_PAGE_nnn` 分隔），历史工作目录 | 可删 | 若后续要重抽诊断学需重跑，非必需产物 |
| `scripts/anatomy-slice2.py` / `slice3.py` | 系统解剖学切片脚本的演进版（slice→slice2 解决页号跟踪→slice3 再细化），与 `anatomy-slice.py` 并存 | 保守保留 | 保留 `anatomy-slice.py` 即可；2/3 为开发中间版本，可删但低价值 |
| `scripts/anatomy-audit.py` / `anatomy-meta.json` | 解剖审计脚本 + 元数据 | **保留** | 标准审计产物 |
| `scripts/anatomy-CONTRACT.md` | 解剖提取契约（含沩→为、搁→胸 等 OCR 描述） | **保留** | 契约核心文档 |
| 全部 `docs/QUESTION_BANK_EXTRACTION.md`、`docs/RESUME_QUESTION_BANK_EXTRACTION.md`、各 `{简写}-CONTRACT.md/-budget.json/-audit.py/-consistency.py` | 跨会话真相源与校验脚本 | **保留** | 交接与续做的唯一依据 |
| `.aider.conf.yml`/`.amazonq/`/`.cursor/`/`.continue/`/`.windsurfrules`/`.clinerules` | 各类 AI 工具配置残留（与本项目题库无关） | 可删（非题库工作引入） | **待确认**归属后再清理 |

> 注：`scripts/quick-check.mjs`、`scripts/audit_qb.py`、`scripts/cand-scan.py` 为杂项校验/候选扫描脚本，保留。

---

## 七、给下一位 AI 的关键提示

1. **开工顺序（最高优先）**：先问用户「下一本选哪本」，**不要自动开始**。真开工则严格走状态总表 SOP 九步，且**先通读** `docs/QUESTION_BANK_EXTRACTION.md` + `src/types/learning.ts` + 范例 `extracted-physiology-ch5.ts`。
2. **最容易踩的坑**：
   - 把 extracted 写进课程 truth `{科目}.ts` / 改 course 注册表 → **越界禁令，一票否决**。
   - 漏 Schema 必填字段、B1 组级误写 knowledgePointId、order 不连续、ID 重复、correctChoiceIndex 与答案 content[0] 不一致 → 一律被 tsc/audit 卡住。**先跑 `npx tsc --noEmit` + 对应 `-audit.py` + `-consistency.py`，再聚合 `index.ts`，最后 `npm run check`。**
   - 扫描件键号散落错位（`5.B6.6.D`、`20756`）务必按题号+医学科语义归位并在文件头如实注明。
   - 源 PDF 目录名带**空格+冒号**，勿硬编码路径。
3. **必须遵守的顺序**：抽文本 → 扫章节 → 算预算 → 每章生成 → 聚合 index → 校验 → 更新两处文档（状态总表 + PROJECT_STATE。）改动登记务必写入状态总表，避免两处记忆不一致。
4. **推荐从哪里继续**：先 `git status` 看工作树（存在大量未跟踪交付与 **`docs/PROJECT_STATE.md` 一条未提交修改**）；保留所有 `extracted-*`/契约/预算/审计脚本；再向用户确认下一本（候选：`11.传染病学`、`18.妇产科`、`10.流行病学` 等；或回归 `卫生统计学`；或评估 `中医药学及中西医结合临床` 5 门题量）。
5. **诚实标注纪律**：题量/题型/缺失数/换题**必须与源并如实登记**；源题不足预算则全取并注明缺口（A14 先例 410/600）；无答案源严禁提取。不要为了「凑满 600」捏造。