import { tcmDiagnosticsCourse } from "@/content/courses/tcm-diagnostics";
import type {
  OfficialCourseMaterialPack,
  OfficialPackEvidenceReference,
  OfficialPackEvidenceTier,
  OfficialPackKnowledgePointEvidence,
  OfficialPackQuestionEvidence,
} from "@/types/course-builder";
import type {
  AssessmentAnswerDefinition,
  QuestionKind,
  SourceLocator,
} from "@/types/learning";

const sourceIds = {
  textbook: "source-tcm-diagnostics-textbook",
  teacherSlides: "source-tcm-diagnostics-teacher-slides",
  teacherReview: "source-tcm-diagnostics-review-scope",
  historicalExam: "source-tcm-diagnostics-past-exams",
  whitebook: "source-tcm-diagnostics-whitebook",
} as const;

const artifactIds = {
  textbook: "artifact-tcm-diagnostics-textbook-third",
  teacherReview: "artifact-tcm-diagnostics-teacher-review",
  heartSlide: "artifact-tcm-diagnostics-heart-slide",
  lungSlide: "artifact-tcm-diagnostics-lung-slide",
  spleenSlide: "artifact-tcm-diagnostics-spleen-slide",
  liverSlide: "artifact-tcm-diagnostics-liver-slide",
  kidneySlide: "artifact-tcm-diagnostics-kidney-slide",
  historicalExam: "artifact-tcm-diagnostics-exam-2021-2022",
  whitebook: "artifact-tcm-diagnostics-whitebook",
  westernExam2022: "artifact-western-diagnostics-2022-2023",
  westernExam2023: "artifact-western-diagnostics-2023-2024",
} as const;

const noAnswer: AssessmentAnswerDefinition = {
  status: "missing",
  authority: null,
  confidence: "missing",
  content: null,
  notice: "来源只提供题干或题目定位，没有可核答案；不得由模型、学生答案或题干来源自动补全。",
  sourceIds: [],
};

const coreLoopIds = new Set([
  "kp-introduction-principles",
  "kp-inspection-spirit",
  "kp-tongue-coating",
  "kp-inquiry-cold-heat",
  "kp-inquiry-diet-taste",
  "kp-pulse-common",
  "kp-eight-principles-exterior-interior",
  "kp-eight-principles-deficiency-excess",
  "kp-disease-nature-qi",
  "kp-organs-spleen-stomach",
]);

const standardLoopIds = new Set([
  "kp-introduction-rules",
  "kp-inspection-complexion",
  "kp-tongue-body",
  "kp-listening-sounds",
  "kp-listening-language",
  "kp-inquiry-sweat",
  "kp-inquiry-pain",
  "kp-inquiry-excretion",
  "kp-pulse-normal",
  "kp-eight-principles-cold-heat",
  "kp-disease-nature-blood",
  "kp-organs-heart-small-intestine",
  "kp-organs-lung-large-intestine",
  "kp-organs-liver-gallbladder",
  "kp-organs-kidney-bladder",
]);

type LocatorInput = {
  value: string;
  label: string;
};

const textbookLocators: Readonly<Record<string, LocatorInput>> = {
  "kp-inspection-spirit": { value: "教材印刷页8–9（PDF页21–22）", label: "得神、少神、失神、假神与神志错乱" },
  "kp-inspection-complexion": { value: "教材印刷页10–12（PDF页23–25）", label: "面部分候、常色客色与五色主病" },
  "kp-inspection-body": { value: "教材印刷页14–15（PDF页27–28）", label: "肥胖、消瘦与形体观察" },
  "kp-tongue-method": { value: "教材印刷页31（PDF页44）", label: "舌面分区与舌诊观察入口" },
  "kp-tongue-body": { value: "教材印刷页33–34（PDF页46–47）", label: "舌色、舌形与舌态" },
  "kp-tongue-coating": { value: "教材印刷页37、39（PDF页50、52）", label: "腐苔、腻苔与舌象综合分析" },
  "kp-tongue-analysis": { value: "教材印刷页39（PDF页52）", label: "舌象综合分析及临床意义" },
  "kp-listening-sounds": { value: "教材印刷页42–44（PDF页55–57）", label: "声音、喘、咳嗽、呕吐、呃逆与嗳气" },
  "kp-listening-language": { value: "教材印刷页43（PDF页56）", label: "谵语、郑声等语言异常" },
  "kp-listening-breath-cough": { value: "教材印刷页43–44（PDF页56–57）", label: "喘证与咳嗽的声音特征" },
  "kp-inquiry-cold-heat": { value: "教材印刷页52–53（PDF页65–66）", label: "恶寒发热、但寒不热、但热不寒与寒热往来" },
  "kp-inquiry-sweat": { value: "教材印刷页54（PDF页67）", label: "表证有汗无汗、自汗、盗汗、战汗与局部汗" },
  "kp-inquiry-pain": { value: "教材印刷页55–56（PDF页68–69）", label: "疼痛性质、部位与临床意义" },
  "kp-inquiry-diet-taste": { value: "教材印刷页60–61（PDF页73–74）", label: "口渴饮水、食欲食量与口味" },
  "kp-inquiry-excretion": { value: "教材印刷页62–63（PDF页75–76）", label: "大便、小便异常及伴随感受" },
  "kp-inquiry-sleep": { value: "教材印刷页59–60（PDF页72–73）", label: "失眠与嗜睡的虚实病机" },
  "kp-pulse-method": { value: "教材印刷页69–71（PDF页82–84）", label: "寸关尺、布指、平息与诊脉方法" },
  "kp-pulse-normal": { value: "教材印刷页71（PDF页84）", label: "平脉及有胃、有神、有根" },
  "kp-pulse-common": { value: "教材印刷页69、71、73、79（PDF页82、84、86、92）", label: "病脉特征及浮沉迟数等鉴别" },
  "kp-pulse-combined": { value: "教材印刷页79（PDF页92）", label: "细、微、弱、濡及结、代、促等相近脉鉴别" },
  "kp-eight-principles-exterior-interior": { value: "教材印刷页89–91（PDF页102–104）", label: "表证、里证及表里转化" },
  "kp-disease-nature-qi": { value: "教材印刷页105–108（PDF页118–121）", label: "气虚、气滞及气血同病" },
  "kp-disease-nature-blood": { value: "教材印刷页108附近（逐点页码待复核）", label: "气血同病入口；血病逐点定位待确认" },
  "kp-organs-heart-small-intestine": { value: "教材印刷页113起（PDF页126起）", label: "心气虚、心阳虚、心阴虚与心脉痹阻" },
  "kp-organs-lung-large-intestine": { value: "教材印刷页117、120（PDF页130、133）", label: "肺系证候与风水相搏" },
  "kp-organs-spleen-stomach": { value: "教材印刷页121–123（PDF页134–136）", label: "脾气虚、脾阳虚及相关证候鉴别" },
  "kp-organs-liver-gallbladder": { value: "教材印刷页127–130（PDF页140–143）", label: "肝郁气滞、肝阳上亢与肝风内动" },
  "kp-organs-kidney-bladder": { value: "教材印刷页130起（PDF页143起）", label: "肾阳虚、肾阴虚、肾精不足与肾气不固" },
};

const directlyVerifiedTextbookLocatorIds = new Set([
  "kp-tongue-coating",
  "kp-inquiry-cold-heat",
  "kp-inquiry-diet-taste",
  "kp-pulse-common",
  "kp-eight-principles-exterior-interior",
  "kp-organs-spleen-stomach",
]);

const reviewLocators: Readonly<Record<string, { page: "1" | "2"; label: string }>> = {
  "kp-introduction-content": { page: "1", label: "发展简史已列入重点；主要内容的逐项范围仍需补定位" },
  "kp-introduction-principles": { page: "1", label: "三个基本原理" },
  "kp-introduction-rules": { page: "1", label: "基本原则" },
  "kp-inspection-spirit": { page: "1", label: "得神、少神、失神、假神及神志错乱" },
  "kp-inspection-complexion": { page: "1", label: "面部分候、常色客色与五色主病" },
  "kp-inspection-body": { page: "1", label: "肥胖、消瘦与形体观察" },
  "kp-tongue-method": { page: "1", label: "舌面脏腑分布" },
  "kp-tongue-body": { page: "1", label: "淡白舌、青紫舌与舌形舌态" },
  "kp-tongue-coating": { page: "1", label: "腐苔、腻苔、灰黑苔及临床意义" },
  "kp-tongue-analysis": { page: "1", label: "舌诊临床意义" },
  "kp-listening-sounds": { page: "1", label: "金实不鸣、金破不鸣、喘、咳嗽与胃气上逆声音" },
  "kp-listening-language": { page: "1", label: "谵语与郑声鉴别" },
  "kp-listening-breath-cough": { page: "1", label: "喘证、咳嗽、白喉与百日咳" },
  "kp-smelling-odour": { page: "1", label: "嗅气味逐句范围" },
  "kp-inquiry-cold-heat": { page: "1", label: "恶寒发热、壮热、潮热与寒热往来" },
  "kp-inquiry-sweat": { page: "1", label: "有汗无汗、自汗、盗汗、战汗与头汗" },
  "kp-inquiry-pain": { page: "1", label: "疼痛性质、头痛与胁痛" },
  "kp-inquiry-sleep": { page: "2", label: "失眠与嗜睡病机" },
  "kp-inquiry-diet-taste": { page: "2", label: "口渴饮水、消谷善饥、饥不欲食与问口味" },
  "kp-inquiry-excretion": { page: "2", label: "大便、小便与癃闭" },
  "kp-pulse-method": { page: "2", label: "寸关尺、平息与诊脉方法" },
  "kp-pulse-normal": { page: "2", label: "平脉" },
  "kp-pulse-common": { page: "2", label: "常见病脉及相近脉鉴别" },
  "kp-pulse-combined": { page: "2", label: "相近脉与结代促鉴别" },
  "kp-eight-principles-exterior-interior": { page: "2", label: "表证与半表半里概念及临床表现" },
  "kp-eight-principles-deficiency-excess": { page: "2", label: "虚证类表现与真假辨别相关重点" },
  "kp-eight-principles-yin-yang": { page: "2", label: "阳虚、阴虚与亡阳证表现" },
  "kp-disease-nature-qi": { page: "2", label: "气虚、气滞与气血同病" },
  "kp-disease-nature-blood": { page: "2", label: "气血同病类证；血病独立范围仍需补定位" },
  "kp-disease-nature-fluids": { page: "2", label: "水肿与气肿鉴别；津液辨证完整范围待补" },
  "kp-organs-heart-small-intestine": { page: "2", label: "心气虚、心阳虚、心阴虚与心脉痹阻" },
  "kp-organs-lung-large-intestine": { page: "2", label: "肺阴虚、燥邪犯肺与风水相搏" },
  "kp-organs-spleen-stomach": { page: "2", label: "脾虚气陷、脾不统血与脾阳虚病案" },
  "kp-organs-liver-gallbladder": { page: "2", label: "肝郁气滞、肝阳上亢与肝风内动" },
  "kp-organs-kidney-bladder": { page: "2", label: "肾阳虚、肾阴虚、肾精不足与肾气不固" },
};

const slideEvidence: Readonly<Record<string, { artifactId: string; pages: string; label: string }>> = {
  "kp-organs-heart-small-intestine": { artifactId: artifactIds.heartSlide, pages: "PDF页1–14", label: "心与小肠病证课件选页；完整转录待复核" },
  "kp-organs-lung-large-intestine": { artifactId: artifactIds.lungSlide, pages: "PDF页1–17", label: "肺与大肠病证课件选页；完整转录待复核" },
  "kp-organs-spleen-stomach": { artifactId: artifactIds.spleenSlide, pages: "PDF页1–17", label: "脾与胃病证课件选页；完整转录待复核" },
  "kp-organs-liver-gallbladder": { artifactId: artifactIds.liverSlide, pages: "PDF页1–16", label: "肝与胆病证课件选页；完整转录待复核" },
  "kp-organs-kidney-bladder": { artifactId: artifactIds.kidneySlide, pages: "PDF页1–7", label: "肾与膀胱病证课件选页；完整转录待复核" },
};

type LocatedQuestionInput = {
  sourceId: typeof sourceIds.historicalExam | typeof sourceIds.whitebook;
  artifactId: typeof artifactIds.historicalExam | typeof artifactIds.whitebook;
  value: string;
  label: string;
  questionKind: QuestionKind | null;
};

const locatedQuestions: Readonly<Record<string, readonly LocatedQuestionInput[]>> = {
  "kp-introduction-content": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第3页·填空46、53", label: "证名构成与证名诊断要求", questionKind: "fill" }],
  "kp-introduction-diagnosis-pattern": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第3页·填空46、53", label: "证名与证候变化的诊断表达", questionKind: "fill" }],
  "kp-introduction-principles": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第1页·A型题1", label: "中医诊断学基本原理", questionKind: "a1-single" }],
  "kp-inspection-spirit": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第1页·A型题2", label: "假神的病理机制", questionKind: "a1-single" }],
  "kp-inspection-complexion": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·单选12、多选41–42", label: "面色潮红、赤色与白色主病", questionKind: "custom-multiple" }],
  "kp-inspection-body": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第3页·X型题37", label: "阳脏人的形体表现", questionKind: "custom-multiple" }],
  "kp-tongue-method": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第2页·B型题24–25", label: "舌苔与舌质变化相关结构", questionKind: "b1" }],
  "kp-tongue-body": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·单选13–15、20", label: "舌体、舌色、裂纹与津伤", questionKind: "a1-single" }],
  "kp-tongue-analysis": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第1页·A型题6", label: "舌质舌苔综合判断", questionKind: "a1-single" }],
  "kp-listening-sounds": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第1页·A型题7", label: "胃气上逆声音辨别", questionKind: "a1-single" }],
  "kp-listening-language": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·单选22", label: "精神错乱语言异常辨别", questionKind: "a1-single" }],
  "kp-listening-breath-cough": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第2–3页·B型题34–35", label: "寒痰阻肺与风寒犯肺的咳喘表现", questionKind: "b1" }],
  "kp-inquiry-sweat": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·单选24", label: "阳虚病人的汗出表现", questionKind: "a1-single" }],
  "kp-inquiry-pain": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·是非题5", label: "灼痛的虚实属性", questionKind: "custom-true-false" }],
  "kp-inquiry-excretion": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第3–4页·X型题40、名词解释56", label: "问大便内容与里急后重", questionKind: "term" }],
  "kp-pulse-normal": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第1页·A型题10", label: "胃气衰败的脉象特征", questionKind: "a1-single" }],
  "kp-pulse-combined": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·单选18、多选45", label: "湿证与紧脉主病", questionKind: "custom-multiple" }],
  "kp-eight-principles-cold-heat": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第1、3页·A型题13、填空50", label: "热证转寒与真假寒热", questionKind: "fill" }],
  "kp-eight-principles-deficiency-excess": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第1页·A型题12", label: "虚实真假的鉴别", questionKind: "a1-single" }],
  "kp-eight-principles-yin-yang": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第4页·名词解释58", label: "阳虚证", questionKind: "term" }],
  "kp-disease-nature-six-excesses": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第2页·B型题32–33", label: "风湿与表湿证候辨别", questionKind: "b1" }],
  "kp-disease-nature-qi": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·简答4、问答1", label: "气血同病与气闭证", questionKind: "short-answer" }],
  "kp-disease-nature-blood": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·填充6", label: "血热证辨证依据", questionKind: "fill" }],
  "kp-disease-nature-fluids": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·是非题9、B型题35–37", label: "水肿与水湿证候", questionKind: "b1" }],
  "kp-organs-heart-small-intestine": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第4页·简答62", label: "心气虚证与心阳虚证异同", questionKind: "short-answer" }],
  "kp-organs-lung-large-intestine": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·B型题31–40", label: "肺与大肠相关证候辨别", questionKind: "b1" }],
  "kp-organs-spleen-stomach": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·单选28–30、多选46与病案", label: "脾胃证候鉴别与病案", questionKind: "case" }],
  "kp-organs-liver-gallbladder": [{ sourceId: sourceIds.whitebook, artifactId: artifactIds.whitebook, value: "练习06卷·多选47、49、问答3", label: "肝火、肝肾与肝脾肝胃证候", questionKind: "short-answer" }],
  "kp-organs-kidney-bladder": [{ sourceId: sourceIds.historicalExam, artifactId: artifactIds.historicalExam, value: "PDF第4页·论述题", label: "心肾、肺肾与肝肾阴虚异同", questionKind: "short-answer" }],
};

const artifactBySourceId: Readonly<Record<string, string>> = {
  [sourceIds.textbook]: artifactIds.textbook,
  [sourceIds.teacherReview]: artifactIds.teacherReview,
  [sourceIds.teacherSlides]: artifactIds.spleenSlide,
  [sourceIds.historicalExam]: artifactIds.historicalExam,
  [sourceIds.whitebook]: artifactIds.whitebook,
  "source-inquiry-diet-textbook": artifactIds.textbook,
  "source-inquiry-diet-teacher-review": artifactIds.teacherReview,
  "source-tcm-tongue-textbook-pages": artifactIds.textbook,
  "source-tcm-tongue-teacher-review": artifactIds.teacherReview,
  "source-tcm-cold-heat-textbook-pages": artifactIds.textbook,
  "source-tcm-cold-heat-teacher-review": artifactIds.teacherReview,
  "source-tcm-pulse-textbook-pages": artifactIds.textbook,
  "source-tcm-pulse-teacher-review": artifactIds.teacherReview,
  "source-tcm-exterior-interior-textbook-pages": artifactIds.textbook,
  "source-tcm-exterior-interior-teacher-review": artifactIds.teacherReview,
  "source-tcm-spleen-textbook-pages": artifactIds.textbook,
  "source-tcm-spleen-teacher-review": artifactIds.teacherReview,
  "source-tcm-spleen-teacher-slide": artifactIds.spleenSlide,
};

function makeLocator(
  id: string,
  artifactId: string,
  value: string,
  label: string,
  kind: SourceLocator["kind"] = "page",
): SourceLocator {
  return { id, artifactId, kind, value, label };
}

function getTier(knowledgePointId: string): OfficialPackEvidenceTier {
  if (coreLoopIds.has(knowledgePointId)) {
    return "core-loop";
  }
  if (standardLoopIds.has(knowledgePointId)) {
    return "standard-loop";
  }
  return "foundation";
}

function createLocatedQuestion(
  knowledgePointId: string,
  input: LocatedQuestionInput,
  index: number,
): OfficialPackQuestionEvidence {
  const historical = input.sourceId === sourceIds.historicalExam;
  return {
    id: `pack-question-${knowledgePointId}-${index + 1}`,
    assessmentItemId: null,
    sourceId: input.sourceId,
    questionKind: input.questionKind,
    prompt: null,
    normalizationStatus: "source-located",
    locator: makeLocator(
      `locator-pack-question-${knowledgePointId}-${index + 1}`,
      input.artifactId,
      input.value,
      input.label,
      "question",
    ),
    promptAuthority: "school",
    answer: noAnswer,
    currentFrequencyClaim: "not-authorized",
    note: historical
      ? "仅证明该历史学期出现过该题型或题目，不解释为当前高频或教师重点。"
      : "学校白皮题库提供题目定位，但没有答案键，也不证明当前教师频率。",
  };
}

function createAssessmentQuestion(
  assessmentItemId: string,
): OfficialPackQuestionEvidence {
  const item = tcmDiagnosticsCourse.assessmentItems.find((candidate) => (
    candidate.id === assessmentItemId
  ));
  if (!item) {
    throw new Error(`Unknown assessment item: ${assessmentItemId}`);
  }
  const promptSourceId = item.promptSource.sourceIds.find((id) => (
    tcmDiagnosticsCourse.sources.find((source) => source.id === id)?.authority
      === item.promptSource.authority
  )) ?? item.promptSource.sourceIds[0]
    ?? `unknown-source-${item.id}`;
  const artifactId = artifactBySourceId[promptSourceId];
  return {
    id: `pack-question-${item.id}`,
    assessmentItemId: item.id,
    sourceId: promptSourceId,
    questionKind: item.questionKind,
    prompt: item.prompt,
    normalizationStatus: "normalized",
    locator: artifactId
      ? makeLocator(
          `locator-pack-question-${item.id}`,
          artifactId,
          item.promptSource.locator,
          item.promptSource.note,
          "question",
        )
      : null,
    promptAuthority: item.promptSource.authority,
    answer: item.answer,
    currentFrequencyClaim: "not-authorized",
    note: item.promptSource.authority === "school"
      ? "学校题干与答案权威保持分离；没有答案键时继续缺答案。"
      : "NUR 改写题及答案结构属于平台训练内容，不升级为学校原题或教师评分。",
  };
}

function createTextbookEvidence(
  knowledgePointId: string,
  chapterTitle: string,
): OfficialPackEvidenceReference {
  const locator = textbookLocators[knowledgePointId];
  return {
    sourceId: sourceIds.textbook,
    artifactId: artifactIds.textbook,
    authority: "publisher",
    scope: "current-offering",
    academicContentStatus: "available",
    locatorStatus: locator
      ? directlyVerifiedTextbookLocatorIds.has(knowledgePointId)
        ? "verified"
        : "source-declared"
      : "pending-review",
    evidenceUse: "content-foundation",
    locators: [makeLocator(
      `locator-pack-textbook-${knowledgePointId}`,
      artifactIds.textbook,
      locator?.value ?? `${chapterTitle}章的逐点教材页码待核对`,
      locator?.label ?? `已绑定《中医诊断学》第3版的${chapterTitle}章节；精确页码保持待确认`,
    )],
    note: locator
      ? "教材页用于课程知识基础；教师重点与题目频率必须由其他来源单独证明。"
      : "仅建立教材章节级覆盖，精确页码未核对前不得生成来源事实。",
  };
}

function createReviewEvidence(
  knowledgePointId: string,
): OfficialPackEvidenceReference | null {
  const locator = reviewLocators[knowledgePointId];
  if (!locator) {
    return null;
  }
  return {
    sourceId: sourceIds.teacherReview,
    artifactId: artifactIds.teacherReview,
    authority: "teacher",
    scope: "current-offering",
    academicContentStatus: "available",
    locatorStatus: "verified",
    evidenceUse: "current-review-scope",
    locators: [makeLocator(
      `locator-pack-review-${knowledgePointId}`,
      artifactIds.teacherReview,
      `PDF第${locator.page}页`,
      locator.label,
    )],
    note: "只证明当前两页教师重点列出的范围，不替代仍缺失的九页终审稿或评分 rubric。",
  };
}

function createSlideEvidence(
  knowledgePointId: string,
): OfficialPackEvidenceReference | null {
  const slide = slideEvidence[knowledgePointId];
  if (!slide) {
    return null;
  }
  return {
    sourceId: sourceIds.teacherSlides,
    artifactId: slide.artifactId,
    authority: "teacher",
    scope: "current-offering",
    academicContentStatus: "available",
    locatorStatus: "pending-review",
    evidenceUse: "teacher-slide-candidate",
    locators: [makeLocator(
      `locator-pack-slide-${knowledgePointId}`,
      slide.artifactId,
      slide.pages,
      slide.label,
    )],
    note: "课件文件身份与脏腑覆盖已确认；OCR/逐页转录未复核，不得作为 verified 逐句真相。",
  };
}

function createQuestionSourceEvidence(
  knowledgePointId: string,
  questions: readonly LocatedQuestionInput[],
): OfficialPackEvidenceReference[] {
  const grouped = new Map<string, LocatedQuestionInput[]>();
  questions.forEach((question) => {
    const current = grouped.get(question.sourceId) ?? [];
    current.push(question);
    grouped.set(question.sourceId, current);
  });
  return Array.from(grouped.entries()).map(([sourceId, items]) => {
    const first = items[0];
    return {
      sourceId,
      artifactId: first.artifactId,
      authority: "school" as const,
      scope: sourceId === sourceIds.historicalExam
        ? "historical-offering" as const
        : "general-reference" as const,
      academicContentStatus: "available" as const,
      locatorStatus: "verified" as const,
      evidenceUse: sourceId === sourceIds.historicalExam
        ? "historical-question" as const
        : "school-question-bank" as const,
      locators: items.map((item, index) => makeLocator(
        `locator-pack-evidence-${knowledgePointId}-${sourceId}-${index + 1}`,
        item.artifactId,
        item.value,
        item.label,
        "question",
      )),
      note: sourceId === sourceIds.historicalExam
        ? "历史题只证明历史题干与题型，不自动解释为当前高频。"
        : "白皮题库只证明学校题目候选；来源未附答案键。",
    };
  });
}

function tierRationale(tier: OfficialPackEvidenceTier): string {
  if (tier === "core-loop") {
    return "教材、当前教师重点与学校/历史题源形成至少两层证据；历史题只作题干证据，不作为当前高频。";
  }
  if (tier === "standard-loop") {
    return "已有教材章节与教师重点、题源或脏腑课件之一的定位，可建设标准闭环，但答案或逐页转录仍需审核。";
  }
  return "保留课程骨架与教材章节入口；逐点页码、题目或答案证据不足时只做基础覆盖并显式 pending。";
}

function createEvidenceMatrix(): OfficialPackKnowledgePointEvidence[] {
  const chapterByPointId = new Map(
    tcmDiagnosticsCourse.chapters.flatMap((chapter) => (
      chapter.knowledgePointIds.map((knowledgePointId) => [knowledgePointId, chapter] as const)
    )),
  );

  return tcmDiagnosticsCourse.knowledgePoints.map((point) => {
    const chapter = chapterByPointId.get(point.id);
    if (!chapter) {
      throw new Error(`Knowledge point has no chapter: ${point.id}`);
    }
    const tier = getTier(point.id);
    const sourceLocatedQuestions = locatedQuestions[point.id] ?? [];
    const assessmentQuestions = point.assessmentItemIds.map(createAssessmentQuestion);
    const questions = [
      ...assessmentQuestions,
      ...sourceLocatedQuestions.map((question, index) => (
        createLocatedQuestion(point.id, question, index)
      )),
    ];
    const textbookEvidence = createTextbookEvidence(point.id, chapter.title);
    const reviewEvidence = createReviewEvidence(point.id);
    const teacherSlideEvidence = createSlideEvidence(point.id);
    const evidence = [
      textbookEvidence,
      ...(reviewEvidence ? [reviewEvidence] : []),
      ...(teacherSlideEvidence ? [teacherSlideEvidence] : []),
      ...createQuestionSourceEvidence(point.id, sourceLocatedQuestions),
    ];
    const missingStates: OfficialPackKnowledgePointEvidence["missingStates"][number][] = [
      { id: `${point.id}-missing-final-review`, kind: "teacher-final-review", status: "pending", label: "任课教师原九页终审重点待导入" },
      { id: `${point.id}-missing-teacher-rubric`, kind: "teacher-rubric", status: "pending", label: "教师主观题评分 rubric 未提供" },
    ];
    if (textbookEvidence.locatorStatus === "pending-review") {
      missingStates.push({ id: `${point.id}-missing-textbook-locator`, kind: "textbook-locator", status: "pending", label: "教材逐点页码待核对" });
    }
    if (questions.length === 0) {
      missingStates.push({ id: `${point.id}-missing-question-normalization`, kind: "question-normalization", status: "pending", label: "本包未观察到已规范化题目，待逐题整理" });
    }
    if (questions.some((question) => question.answer.status === "missing")) {
      missingStates.push({ id: `${point.id}-missing-source-answer`, kind: "source-answer", status: "pending", label: "来源题目缺可核答案；学生答案不自动进入本包" });
    }
    if (teacherSlideEvidence) {
      missingStates.push({ id: `${point.id}-missing-slide-ocr-review`, kind: "ocr-review", status: "pending", label: "教师课件逐页转录/OCR待人工复核" });
    }
    const hasConflict = questions.some((question) => question.answer.status === "conflict");
    const hasUnverifiedStudentAnswer = questions.some((question) => (
      question.answer.status === "available"
      && question.answer.authority === "student-compiled"
      && question.answer.confidence === "unverified"
    ));
    return {
      knowledgePointId: point.id,
      chapterId: chapter.id,
      tier,
      tierRationale: tierRationale(tier),
      coverageStatus: tier === "core-loop"
        ? "evidence-ready"
        : tier === "standard-loop" ? "evidence-partial" : "pending",
      evidence,
      questions,
      conflictReview: hasConflict
        ? { status: "unresolved", note: "存在来源答案冲突，未裁决前不得显示 verified 答案。" }
        : hasUnverifiedStudentAnswer
          ? { status: "pending-review", note: "学生整理答案仍需教材或教师来源逐题复核。" }
          : { status: "none-observed", note: "本包未观察到可比较的冲突答案；缺答案不等于冲突已解决。" },
      missingStates,
    };
  });
}

const manifest: OfficialCourseMaterialPack["manifest"] = [
  {
    id: "manifest-tcm-textbook-third",
    assetId: "asset-tcm-diagnostics-textbook-third",
    familyId: "family-tcm-diagnostics-textbook-third",
    artifactId: artifactIds.textbook,
    sourceId: sourceIds.textbook,
    sourceType: "textbook",
    authority: "publisher",
    scope: "current-offering",
    disposition: "include",
    academicContentStatus: "available",
    locatorSummary: "教材印刷页与PDF页双定位；未核逐点位置保持 pending",
    note: "出版社教材只承担教材知识与章节依据，不证明当前教师重点。",
  },
  {
    id: "manifest-tcm-teacher-review",
    assetId: "asset-tcm-diagnostics-teacher-review",
    familyId: "family-tcm-diagnostics-teacher-review",
    artifactId: artifactIds.teacherReview,
    sourceId: sourceIds.teacherReview,
    sourceType: "review-scope",
    authority: "teacher",
    scope: "current-offering",
    disposition: "include",
    academicContentStatus: "available",
    locatorSummary: "PDF第1–2页",
    note: "只使用已收到的两页重点；原九页终审稿继续待导入。",
  },
  {
    id: "manifest-tcm-heart-slide",
    assetId: "asset-tcm-diagnostics-heart-slide",
    familyId: "family-tcm-diagnostics-heart-slide",
    artifactId: artifactIds.heartSlide,
    sourceId: sourceIds.teacherSlides,
    sourceType: "teacher-slide",
    authority: "teacher",
    scope: "current-offering",
    disposition: "include",
    academicContentStatus: "available",
    locatorSummary: "PDF页1–14",
    note: "心与小肠病证课件；逐页转录/OCR待复核。",
  },
  {
    id: "manifest-tcm-lung-slide",
    assetId: "asset-tcm-diagnostics-lung-slide",
    familyId: "family-tcm-diagnostics-lung-slide",
    artifactId: artifactIds.lungSlide,
    sourceId: sourceIds.teacherSlides,
    sourceType: "teacher-slide",
    authority: "teacher",
    scope: "current-offering",
    disposition: "include",
    academicContentStatus: "available",
    locatorSummary: "PDF页1–17",
    note: "肺与大肠病证课件；逐页转录/OCR待复核。",
  },
  {
    id: "manifest-tcm-spleen-slide",
    assetId: "asset-tcm-diagnostics-spleen-slide",
    familyId: "family-tcm-diagnostics-spleen-slide",
    artifactId: artifactIds.spleenSlide,
    sourceId: sourceIds.teacherSlides,
    sourceType: "teacher-slide",
    authority: "teacher",
    scope: "current-offering",
    disposition: "include",
    academicContentStatus: "available",
    locatorSummary: "PDF页1–17",
    note: "脾与胃病证课件；已用于现有脾胃闭环，完整OCR仍待复核。",
  },
  {
    id: "manifest-tcm-liver-slide",
    assetId: "asset-tcm-diagnostics-liver-slide",
    familyId: "family-tcm-diagnostics-liver-slide",
    artifactId: artifactIds.liverSlide,
    sourceId: sourceIds.teacherSlides,
    sourceType: "teacher-slide",
    authority: "teacher",
    scope: "current-offering",
    disposition: "include",
    academicContentStatus: "available",
    locatorSummary: "PDF页1–16",
    note: "肝与胆病证课件；逐页转录/OCR待复核。",
  },
  {
    id: "manifest-tcm-kidney-slide",
    assetId: "asset-tcm-diagnostics-kidney-slide",
    familyId: "family-tcm-diagnostics-kidney-slide",
    artifactId: artifactIds.kidneySlide,
    sourceId: sourceIds.teacherSlides,
    sourceType: "teacher-slide",
    authority: "teacher",
    scope: "current-offering",
    disposition: "include",
    academicContentStatus: "available",
    locatorSummary: "PDF页1–7",
    note: "肾与膀胱病证课件；逐页转录/OCR待复核。",
  },
  {
    id: "manifest-tcm-exam-2021-2022",
    assetId: "asset-tcm-diagnostics-exam-2021-2022",
    familyId: "family-tcm-diagnostics-exam-2021-2022",
    artifactId: artifactIds.historicalExam,
    sourceId: sourceIds.historicalExam,
    sourceType: "past-exam",
    authority: "school",
    scope: "historical-offering",
    disposition: "include",
    academicContentStatus: "available",
    locatorSummary: "PDF页1–5，题号保留",
    note: "只证明2021–2022学年题干、题型和分值，不自动解释为当前高频。",
  },
  {
    id: "manifest-tcm-whitebook",
    assetId: "asset-tcm-diagnostics-whitebook",
    familyId: "family-tcm-diagnostics-whitebook",
    artifactId: artifactIds.whitebook,
    sourceId: sourceIds.whitebook,
    sourceType: "question-bank",
    authority: "school",
    scope: "general-reference",
    disposition: "include",
    academicContentStatus: "available",
    locatorSummary: "练习06卷·题号与题型",
    note: "学校题目候选；原件未附答案键，全部答案置信度保持 missing。",
  },
  {
    id: "manifest-exclude-western-exam-2022",
    assetId: "asset-western-diagnostics-2022-2023",
    familyId: "family-western-diagnostics-exam-2022-2023",
    artifactId: artifactIds.westernExam2022,
    sourceId: null,
    sourceType: "past-exam",
    authority: "school",
    scope: "historical-offering",
    disposition: "exclude",
    academicContentStatus: "pending",
    locatorSummary: "整份PDF",
    note: "文件只名为《诊断学》且内容属于西医诊断学，禁止进入中医诊断学证据。",
  },
  {
    id: "manifest-exclude-western-exam-2023",
    assetId: "asset-western-diagnostics-2023-2024",
    familyId: "family-western-diagnostics-exam-2023-2024",
    artifactId: artifactIds.westernExam2023,
    sourceId: null,
    sourceType: "past-exam",
    authority: "school",
    scope: "historical-offering",
    disposition: "exclude",
    academicContentStatus: "pending",
    locatorSummary: "整份PDF",
    note: "文件只名为《诊断学》且内容属于西医诊断学，禁止进入中医诊断学证据。",
  },
];

export const tcmDiagnosticsOfficialMaterialPackV1 = {
  version: 1,
  kind: "official-course-material-pack",
  id: "official-tcm-diagnostics-v1-2026-07-19",
  label: "《中医诊断学》官方材料包 v1",
  courseId: tcmDiagnosticsCourse.id,
  courseVersionId: tcmDiagnosticsCourse.version.id,
  manifest,
  evidenceMatrix: createEvidenceMatrix(),
  tierPolicy: {
    coreLoopRange: [8, 12],
    standardLoopRange: [13, 17],
    foundationMinimum: 1,
    historicalQuestionsDoNotImplyCurrentFrequency: true,
  },
  protectedAuthoredKnowledgePointIds: tcmDiagnosticsCourse.knowledgePoints
    .filter((point) => point.lesson !== null)
    .map((point) => point.id),
  rights: {
    modelUse: "not-authorized-by-pack",
    publication: "not-authorized",
    materialCatalogMutation: "not-authorized",
    courseRegistryMutation: "not-authorized",
  },
} satisfies OfficialCourseMaterialPack;

export const tcmDiagnosticsOfficialPackTierCounts = {
  core: tcmDiagnosticsOfficialMaterialPackV1.evidenceMatrix.filter((item) => item.tier === "core-loop").length,
  standard: tcmDiagnosticsOfficialMaterialPackV1.evidenceMatrix.filter((item) => item.tier === "standard-loop").length,
  foundation: tcmDiagnosticsOfficialMaterialPackV1.evidenceMatrix.filter((item) => item.tier === "foundation").length,
} as const;
