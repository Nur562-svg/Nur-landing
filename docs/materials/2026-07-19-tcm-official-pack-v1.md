# 《中医诊断学》官方材料包 v1

状态：2026-07-19 完成 typed manifest、39知识点证据矩阵、三层深度规划与 Course Builder 确定性批量编译合同。原始资料保持只读且不进入 `public/`。

## 结论

- manifest 纳入9个 Artifact：第三版教材、教师两页重点、5份脏腑课件、2021–2022中诊历史试卷、学校白皮题库；排除2份内容属于西医诊断学的《诊断学》试卷。
- 39个知识点全部具有明确证据覆盖或 pending 状态：10个核心闭环、15个标准闭环、14个基础覆盖。
- 现有6个深闭环全部标记为 `preserve-authored-loop`，不由批量编译覆盖。
- baseline Course Builder 可确定性重建材料包批量草稿：9章、39知识点、6个既有lesson、0 blocking、4 review。
- 材料包本身不授予模型使用、发布、material catalog mutation 或 course registry mutation 权限。

## Manifest

| 处置 | Artifact | MaterialAsset / SourceFamily | Locator | 权威与状态 |
|---|---|---|---|---|
| 纳入 | 第三版教材 | `asset-tcm-diagnostics-textbook-third` / `family-tcm-diagnostics-textbook-third` | 教材印刷页 + PDF页；未核逐点位置保持 pending | publisher / available |
| 纳入 | 教师两页重点 | `asset-tcm-diagnostics-teacher-review` / `family-tcm-diagnostics-teacher-review` | PDF第1–2页 | teacher / current-offering / available |
| 纳入 | 心与小肠课件 | `asset-tcm-diagnostics-heart-slide` / `family-tcm-diagnostics-heart-slide` | PDF页1–14 | teacher / available / OCR待复核 |
| 纳入 | 肺与大肠课件 | `asset-tcm-diagnostics-lung-slide` / `family-tcm-diagnostics-lung-slide` | PDF页1–17 | teacher / available / OCR待复核 |
| 纳入 | 脾与胃课件 | `asset-tcm-diagnostics-spleen-slide` / `family-tcm-diagnostics-spleen-slide` | PDF页1–17 | teacher / available / OCR待复核 |
| 纳入 | 肝与胆课件 | `asset-tcm-diagnostics-liver-slide` / `family-tcm-diagnostics-liver-slide` | PDF页1–16 | teacher / available / OCR待复核 |
| 纳入 | 肾与膀胱课件 | `asset-tcm-diagnostics-kidney-slide` / `family-tcm-diagnostics-kidney-slide` | PDF页1–7 | teacher / available / OCR待复核 |
| 纳入 | 2021–2022中诊真题 | `asset-tcm-diagnostics-exam-2021-2022` / `family-tcm-diagnostics-exam-2021-2022` | PDF页1–5 + 题号 | school / historical-offering / available |
| 纳入 | 学校白皮题库 | `asset-tcm-diagnostics-whitebook` / `family-tcm-diagnostics-whitebook` | 练习06卷 + 题号 | school / available / 答案缺失 |
| 排除 | 2022–2023西医《诊断学》 | `asset-western-diagnostics-2022-2023` / `family-western-diagnostics-exam-2022-2023` | 整份PDF | misfiled / local-only |
| 排除 | 2023–2024西医《诊断学》 | `asset-western-diagnostics-2023-2024` / `family-western-diagnostics-exam-2023-2024` | 整份PDF | misfiled / local-only |

## 39知识点证据矩阵

表中“题源定位”只证明题干或题型存在。历史题不自动解释为当前高频；白皮题库与历史试卷都没有可核答案键。NUR改写答案继续保持 `nur-platform / source-cross-checked`，不升级为学校答案或教师 rubric。

| 章 | 知识点 | 深度 | 证据与 locator | 题目 / 答案 / 冲突 / 缺失 |
|---|---|---|---|---|
| 绪论 | 中医诊断学的主要内容 | 基础 | 教材章节页码待核；教师重点P1；历史卷P3填空46、53 | 题源已定位；答案missing；逐点页码、九页终审稿、rubric pending |
| 绪论 | 诊法与辨证的关系 | 基础 | 教材章节页码待核；历史卷P3填空46、53 | 题源已定位；答案missing；教师重点逐点范围、rubric pending |
| 绪论 | 中医诊断的基本原理 | 核心 | 教材章节页码待核；教师重点P1；历史卷P1 A型题1 | 题源已定位；答案missing；历史出现不代表当前高频 |
| 绪论 | 中医诊断的基本原则 | 标准 | 教材章节页码待核；教师重点P1 | 题目待规范化；答案missing；九页终审稿、rubric pending |
| 望诊 | 望神 | 核心 | 教材P8–9；教师重点P1；历史卷P1 A型题2 | 题源已定位；答案missing；无可比较答案冲突 |
| 望诊 | 望色 | 标准 | 教材P10–12；教师重点P1；白皮单选12、多选41–42 | 题源已定位；答案missing；无可比较答案冲突 |
| 望诊 | 望形体 | 基础 | 教材P14–15；教师重点P1；历史卷P3 X型题37 | 题源已定位；答案missing；闭环仍pending |
| 望诊 | 望姿态 | 基础 | 教材章节页码待核 | 题目待规范化；答案missing；教师范围与rubric pending |
| 舌诊 | 舌诊原理与方法 | 基础 | 教材P31；教师重点P1；历史卷P2 B型题24–25 | 题源已定位；答案missing；方法学精确页仍需复核 |
| 舌诊 | 望舌质 | 标准 | 教材P33–34；教师重点P1；白皮单选13–15、20 | 题源已定位；答案missing；闭环待生成 |
| 舌诊 | 望舌苔 | 核心 | 教材P37、P39；教师重点P1；白皮简答 | 已有lesson/写作；学校答案missing；NUR答案不冒充学校答案 |
| 舌诊 | 舌象综合分析 | 基础 | 教材P39；教师重点P1；历史卷P1 A型题6 | 题源已定位；答案missing；应用闭环待证据深化 |
| 闻诊 | 听声音 | 标准 | 教材P42–44；教师重点P1；历史卷P1 A型题7 | 题源已定位；答案missing；闭环待生成 |
| 闻诊 | 语言异常 | 标准 | 教材P43；教师重点P1；白皮单选22 | 题源已定位；答案missing；闭环待生成 |
| 闻诊 | 呼吸与咳嗽 | 基础 | 教材P43–44；教师重点P1；历史卷P2–3 B型题34–35 | 题源已定位；答案missing；深度证据仍不足 |
| 闻诊 | 嗅气味 | 基础 | 教材章节页码待核；教师重点P1 | 题目待规范化；答案missing；逐点页码pending |
| 问诊 | 问寒热 | 核心 | 教材P52–53；教师重点P1；历史卷简答60 | 已有lesson/写作；历史题答案missing；不推断当前频率 |
| 问诊 | 问汗 | 标准 | 教材P54；教师重点P1；白皮单选24 | 题源已定位；答案missing；闭环待生成 |
| 问诊 | 问疼痛 | 标准 | 教材P55–56；教师重点P1；白皮是非5 | 题源已定位；答案missing；闭环待生成 |
| 问诊 | 问饮食口味 | 核心 | 教材P60–61；教师重点P2；白皮填空4、5 | 已有lesson/写作/病案；来源答案missing；NUR评分非教师评分 |
| 问诊 | 问二便 | 标准 | 教材P62–63；教师重点P2；历史卷X型40、名词56 | 题源已定位；答案missing；闭环待生成 |
| 问诊 | 问睡眠 | 基础 | 教材P59–60；教师重点P2 | 题目待规范化；答案missing；九页终审稿、rubric pending |
| 脉诊 | 诊脉部位与方法 | 基础 | 教材P69–71；教师重点P2 | 题目待规范化；答案missing；方法训练待建设 |
| 脉诊 | 正常脉象 | 标准 | 教材P71；教师重点P2；历史卷P1 A型题10 | 题源已定位；答案missing；闭环待生成 |
| 脉诊 | 常见病脉 | 核心 | 教材P69、71、73、79；教师重点P2；白皮简答 | 已有lesson/写作；学校答案missing；NUR答案保持分层 |
| 脉诊 | 相兼脉与主病 | 基础 | 教材P79；教师重点P2；白皮单选18、多选45 | 题源已定位；答案missing；组合训练仍pending |
| 八纲辨证 | 表里辨证 | 核心 | 教材P89–91；教师重点P2；白皮简答、历史名词 | 已有lesson/写作；来源答案missing；不推断当前高频 |
| 八纲辨证 | 寒热辨证 | 标准 | 教材逐点页码待核；历史卷A型13、填空50 | 题源已定位；答案missing；教师重点独立定位待补 |
| 八纲辨证 | 虚实辨证 | 核心 | 教材逐点页码待核；教师重点P2；历史卷A型12 | 题源已定位；答案missing；核心闭环待人工编写 |
| 八纲辨证 | 阴阳辨证 | 基础 | 教材逐点页码待核；教师重点P2；历史卷名词58 | 题源已定位；答案missing；章节定位待补 |
| 病性辨证 | 六淫辨证 | 基础 | 教材章节页码待核；历史卷B型32–33 | 题源已定位；答案missing；教师范围待确认 |
| 病性辨证 | 气病辨证 | 核心 | 教材P105–108；教师重点P2；白皮简答4、问答1 | 题源已定位；答案missing；核心闭环待人工编写 |
| 病性辨证 | 血病辨证 | 标准 | 教材P108附近待复核；教师重点P2；白皮填充6 | 题源已定位；答案missing；精确教材范围pending |
| 病性辨证 | 津液辨证 | 基础 | 教材章节页码待核；教师重点P2；白皮水肿题 | 题源已定位；答案missing；水肿证据不等于完整津液范围 |
| 脏腑辨证 | 心与小肠病辨证 | 标准 | 教材P113起；教师重点P2；课件P1–14；历史简答62 | 题源已定位；答案missing；课件OCR、教师rubric pending |
| 脏腑辨证 | 肺与大肠病辨证 | 标准 | 教材P117、120；教师重点P2；课件P1–17；白皮B型31–40 | 题源已定位；答案missing；课件OCR、教师rubric pending |
| 脏腑辨证 | 脾胃病辨证 | 核心 | 教材P121–123；教师重点P2；课件P1–17；白皮单选/多选/病案 | 已有lesson/写作/合成病案；白皮答案missing；课件OCR pending |
| 脏腑辨证 | 肝胆病辨证 | 标准 | 教材P127–130；教师重点P2；课件P1–16；白皮多选/问答 | 题源已定位；答案missing；课件OCR、教师rubric pending |
| 脏腑辨证 | 肾与膀胱病辨证 | 标准 | 教材P130起；教师重点P2；课件P1–7；历史论述 | 题源已定位；答案missing；课件OCR、教师rubric pending |

## 批量编译合同

`OfficialPackBatchCompileRequest` 固定为：

- `mode: deterministic-evidence-matrix`；
- `target: course-definition`；
- `modelUse: not-authorized`；
- `publication: not-authorized`。

`OfficialPackBatchCompileResult` 为每个稳定 knowledge-point ID 生成一个 draft：

- 现有6个深闭环为 `preserve-authored-loop / preserved`；
- 核心与标准条目在证据允许时为 `knowledge-lesson-and-assessments / ready-for-human-authoring`；
- 基础覆盖或证据不足条目为 `knowledge-point-foundation / pending-evidence`；
- 输出只面向现有 `CourseDefinition`、`KnowledgeLessonDefinition`、`AssessmentItemDefinition` 与 case/transfer 合同，不需要修改 React 页面。

校验器硬性检查 manifest 的 Asset–Family–Artifact 关系、39点一一覆盖、三层数量、题目/答案边界、历史题频率非授权、两份错放试卷排除、6个既有lesson保护和全部非授权权利。pending、缺答案、OCR未复核与缺教师rubric是 review/pending 状态，不是可由模型补齐的事实。
