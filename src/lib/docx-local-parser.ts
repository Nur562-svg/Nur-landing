import type { MaterialIntakeDraft, MaterialIntakeFileCandidate } from "@/types/material-intake";
import {
  materialParsingDraftVersion,
  reviewedMaterialOverlayDraftVersion,
  type DocxSemanticBlock,
  type DocxSemanticBlockKind,
  type MaterialCourseDeltaPreview,
  type MaterialDocxParseResult,
  type MaterialDocxParsingDraft,
  type MaterialParsingCourseOption,
  type MaterialParsingIssue,
  type MaterialParsingKnowledgePointOption,
  type ReviewedMaterialOverlayDraft,
} from "@/types/material-parsing";

const maximumBlockCount = 240;
const maximumCharacterCount = 160_000;

function normalizeText(value: string) {
  return value.replace(/\u00a0/g, " ").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function semanticNodeText(node: Element) {
  const clone = node.cloneNode(true) as Element;
  clone.querySelectorAll("ol, ul, table").forEach((nested) => nested.remove());
  return normalizeText(clone.textContent ?? "");
}

function classifyNode(node: Element): {
  kind: DocxSemanticBlockKind;
  headingLevel: number | null;
} {
  const tagName = node.tagName.toLowerCase();
  if (/^h[1-6]$/.test(tagName)) {
    return { kind: "heading", headingLevel: Number(tagName.slice(1)) };
  }
  if (tagName === "li") {
    return { kind: "list-item", headingLevel: null };
  }
  if (tagName === "td" || tagName === "th") {
    return { kind: "table-cell", headingLevel: null };
  }
  return { kind: "paragraph", headingLevel: null };
}

function extractSemanticBlocks(html: string) {
  const document = new DOMParser().parseFromString(html, "text/html");
  const nodes = Array.from(document.body.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, td, th"));
  const blocks: DocxSemanticBlock[] = [];
  let characterCount = 0;
  let truncated = false;

  for (const node of nodes) {
    const tagName = node.tagName.toLowerCase();
    if (tagName === "p" && node.closest("li, td, th")) {
      continue;
    }
    const text = semanticNodeText(node);
    if (!text) {
      continue;
    }
    if (blocks.length >= maximumBlockCount || characterCount + text.length > maximumCharacterCount) {
      truncated = true;
      break;
    }
    const order = blocks.length + 1;
    const classification = classifyNode(node);
    blocks.push({
      id: `docx-block-${String(order).padStart(3, "0")}`,
      order,
      ...classification,
      text,
      editedText: text,
      locator: {
        kind: "docx-semantic-block",
        label: `DOCX 语义块 ${String(order).padStart(3, "0")}`,
        blockIndex: order,
      },
      decision: "pending-review",
    });
    characterCount += text.length;
  }

  return {
    blocks,
    characterCount,
    ignoredImageCount: document.body.querySelectorAll("img").length,
    truncated,
  };
}

export async function parseDocxLocally(file: File): Promise<MaterialDocxParseResult> {
  if (!file.name.toLowerCase().endsWith(".docx")) {
    return {
      parser: { id: "browser-docx-semantic-v1", library: "mammoth", libraryVersion: "1.12.0" },
      blockCount: 0,
      characterCount: 0,
      ignoredImageCount: 0,
      blocks: [],
      issues: [{
        id: "unsupported-file",
        severity: "blocking",
        code: "unsupported-file",
        message: "当前本地解析试点只支持 .docx。",
      }],
    };
  }

  const mammoth = await import("mammoth");
  const conversion = await mammoth.convertToHtml(
    { arrayBuffer: await file.arrayBuffer() },
    {
      includeDefaultStyleMap: true,
      ignoreEmptyParagraphs: true,
      styleMap: [
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='标题 1'] => h1:fresh",
        "p[style-name='标题 2'] => h2:fresh",
        "p[style-name='标题 3'] => h3:fresh",
      ],
    },
  );
  const extraction = extractSemanticBlocks(conversion.value);
  const issues: MaterialParsingIssue[] = conversion.messages.map((message, index) => ({
    id: `parser-message-${index + 1}`,
    severity: "review",
    code: "parser-message",
    message: `DOCX 解析器提示：${message.message}`,
  }));

  issues.push({
    id: "revision-state-pending",
    severity: "review",
    code: "revision-state-pending",
    message: "修订、批注与隐藏内容状态尚未核验；摘录只能作为 learner-private 待审候选。",
  });
  if (extraction.ignoredImageCount > 0) {
    issues.push({
      id: "images-ignored",
      severity: "review",
      code: "images-ignored",
      message: `检测到 ${extraction.ignoredImageCount} 个图片节点；本试点不读取图片或执行 OCR。`,
    });
  }
  if (extraction.truncated) {
    issues.push({
      id: "block-limit",
      severity: "review",
      code: "block-limit",
      message: `预览已在 ${maximumBlockCount} 个语义块或 ${maximumCharacterCount.toLocaleString("zh-CN")} 字符边界停止，请拆分文档后复核。`,
    });
  }
  if (extraction.blocks.length === 0) {
    issues.push({
      id: "empty-document",
      severity: "blocking",
      code: "empty-document",
      message: "没有提取到可供人工审核的文本块；可能是扫描件、空文档或不受支持的结构。",
    });
  }

  return {
    parser: { id: "browser-docx-semantic-v1", library: "mammoth", libraryVersion: "1.12.0" },
    blockCount: extraction.blocks.length,
    characterCount: extraction.characterCount,
    ignoredImageCount: extraction.ignoredImageCount,
    blocks: extraction.blocks,
    issues,
  };
}

export function createMaterialCourseDeltaPreview(
  course: MaterialParsingCourseOption,
  knowledgePoint: MaterialParsingKnowledgePointOption,
  blocks: readonly DocxSemanticBlock[],
): MaterialCourseDeltaPreview {
  return {
    status: "preview-only",
    courseId: course.id,
    courseTitle: course.title,
    knowledgePointId: knowledgePoint.id,
    knowledgePointTitle: knowledgePoint.title,
    chapterTitle: knowledgePoint.chapterTitle,
    currentContentStatus: knowledgePoint.contentStatus,
    currentSourceCount: knowledgePoint.sourceCount,
    currentHasLesson: knowledgePoint.hasLesson,
    materialArtifactCandidateCount: 1,
    acceptedExcerptCount: blocks.filter((block) => block.decision === "accepted").length,
    excludedBlockCount: blocks.filter((block) => block.decision === "excluded").length,
    pendingBlockCount: blocks.filter((block) => block.decision === "pending-review").length,
    verifiedFactCount: 0,
    registryWriteCount: 0,
    modelRequestCount: 0,
  };
}

export function createMaterialDocxParsingDraft(
  intakeDraft: MaterialIntakeDraft,
  candidate: MaterialIntakeFileCandidate,
  parseResult: MaterialDocxParseResult,
): MaterialDocxParsingDraft {
  if (!intakeDraft.id || !intakeDraft.batch) {
    throw new Error("材料身份审核记录不完整，不能建立解析草稿。");
  }
  const now = new Date().toISOString();
  return {
    version: materialParsingDraftVersion,
    id: globalThis.crypto.randomUUID(),
    createdAt: now,
    intakeDraftId: intakeDraft.id,
    intakeBatchId: intakeDraft.batch.id,
    candidateId: candidate.id,
    fileName: candidate.name,
    sha256: candidate.sha256,
    authorization: {
      status: "explicit",
      scope: "browser-local-docx-structure-only",
      authorizedAt: now,
      modelTransfer: "not-authorized",
      persistence: "memory-only",
    },
    parseResult,
    deltaPreview: null,
  };
}

export function createReviewedMaterialOverlayDraft(
  intakeDraft: MaterialIntakeDraft,
  parsingDraft: MaterialDocxParsingDraft,
  course: MaterialParsingCourseOption,
  knowledgePoint: MaterialParsingKnowledgePointOption,
  sectionByBlockId: ReadonlyMap<string, { id: string; title: string }>,
): ReviewedMaterialOverlayDraft {
  if (!intakeDraft.id || !intakeDraft.batch) {
    throw new Error("材料身份审核记录不完整，不能创建私人增强包。");
  }
  const sourceCandidate = intakeDraft.batch.files.find(
    (file) => file.id === parsingDraft.candidateId,
  );
  if (!sourceCandidate) {
    throw new Error("材料身份候选已变化，不能创建私人增强包。");
  }
  const acceptedBlocks = parsingDraft.parseResult.blocks.filter((block) => (
    block.decision === "accepted" && block.editedText.trim().length > 0
  ));
  if (acceptedBlocks.length === 0) {
    throw new Error("至少接纳一个非空语义块，才能创建私人增强包。");
  }
  const acceptedSectionIds = new Set<string>();
  const excerpts = acceptedBlocks.map((block) => {
    const section = sectionByBlockId.get(block.id) ?? {
      id: "docx-section-unassigned",
      title: "未分组正文",
    };
    acceptedSectionIds.add(section.id);
    return {
      id: `overlay-excerpt-${block.id}`,
      blockId: block.id,
      sectionId: section.id,
      sectionTitle: section.title,
      kind: block.kind,
      text: block.editedText.trim(),
      locator: block.locator,
    };
  });

  return {
    version: reviewedMaterialOverlayDraftVersion,
    id: `private-overlay-${parsingDraft.candidateId}-${knowledgePoint.id}`,
    createdAt: new Date().toISOString(),
    status: "approved-for-current-session",
    label: `${course.title} · 私人增强 · ${parsingDraft.fileName}`,
    courseId: course.id,
    courseTitle: course.title,
    knowledgePointId: knowledgePoint.id,
    knowledgePointTitle: knowledgePoint.title,
    chapterTitle: knowledgePoint.chapterTitle,
    sourceCandidate: {
      intakeDraftId: intakeDraft.id,
      intakeBatchId: intakeDraft.batch.id,
      candidateId: parsingDraft.candidateId,
      fileName: parsingDraft.fileName,
      sha256: parsingDraft.sha256,
      byteSize: sourceCandidate.byteSize,
      mimeType: sourceCandidate.mimeType.trim()
        || "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      mediaType: sourceCandidate.mediaType,
      sourceType: intakeDraft.provenance.sourceType,
      declaredAuthority: intakeDraft.provenance.declaredAuthority,
      authorityReviewStatus: "pending-review",
      layer: "learner-private",
      school: intakeDraft.provenance.school,
      teacher: intakeDraft.provenance.teacher,
      academicYear: intakeDraft.provenance.academicYear,
      semester: intakeDraft.provenance.semester,
      sourceFamily: intakeDraft.provenance.sourceFamily,
    },
    privacy: {
      declaration: intakeDraft.privacy.declaration,
      risk: intakeDraft.privacy.risk,
      publicationPolicy: intakeDraft.privacy.publicationPolicy,
      persistence: "memory-only",
      modelTransfer: "not-authorized",
    },
    review: {
      acceptedExcerptCount: excerpts.length,
      acceptedSectionCount: acceptedSectionIds.size,
      pendingBlockCount: parsingDraft.parseResult.blocks.filter((block) => block.decision === "pending-review").length,
      excludedBlockCount: parsingDraft.parseResult.blocks.filter((block) => block.decision === "excluded").length,
    },
    excerpts,
  };
}
