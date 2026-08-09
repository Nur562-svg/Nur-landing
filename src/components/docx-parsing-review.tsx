"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  CircleAlert,
  FileCheck2,
  FileLock2,
  Filter,
  Layers3,
  ListChecks,
  LoaderCircle,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import {
  createMaterialCourseDeltaPreview,
  createMaterialDocxParsingDraft,
  createReviewedMaterialOverlayDraft,
  parseDocxLocally,
} from "@/lib/docx-local-parser";
import type {
  MaterialIntakeDraft,
  MaterialIntakeFileCandidate,
} from "@/types/material-intake";
import type {
  DocxSemanticBlock,
  DocxSemanticBlockDecision,
  MaterialDocxParsingDraft,
  MaterialParsingCourseOption,
  ReviewedMaterialOverlayDraft,
} from "@/types/material-parsing";
import styles from "./docx-parsing-review.module.css";

type ReauthorizationResult = {
  ok: boolean;
  message: string;
};

type DocxReviewFilter = "all" | "pending-review" | "accepted" | "modified" | "noise";

type DocxReviewSection = {
  id: string;
  title: string;
  headingLevel: number | null;
  blocks: readonly DocxSemanticBlock[];
};

type DocxParsingReviewProps = {
  approvedOverlayIds: readonly string[];
  candidates: readonly MaterialIntakeFileCandidate[];
  courseOptions: readonly MaterialParsingCourseOption[];
  intakeDraft: MaterialIntakeDraft;
  sessionFiles: ReadonlyMap<string, File>;
  onApproveOverlay: (overlay: ReviewedMaterialOverlayDraft) => void;
  onReauthorize: (
    candidate: MaterialIntakeFileCandidate,
    file: File,
  ) => Promise<ReauthorizationResult>;
  onRevokeOverlay: (overlayId: string) => void;
};

const blockKindLabels = {
  heading: "标题",
  paragraph: "段落",
  "list-item": "列表项",
  "table-cell": "表格单元",
} as const;

const decisionLabels: Readonly<Record<DocxSemanticBlockDecision, string>> = {
  "pending-review": "待审核",
  accepted: "已接纳",
  excluded: "已排除",
};

const filterLabels: Readonly<Record<DocxReviewFilter, string>> = {
  all: "全部",
  "pending-review": "只看待审",
  accepted: "只看已接纳",
  modified: "只看已修改",
  noise: "只看噪声候选",
};

function normalizeNoiseIdentity(value: string) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function getDuplicateTextIdentities(blocks: readonly DocxSemanticBlock[]) {
  const counts = new Map<string, number>();
  blocks.forEach((block) => {
    const identity = normalizeNoiseIdentity(block.editedText);
    if (identity.length >= 4) {
      counts.set(identity, (counts.get(identity) ?? 0) + 1);
    }
  });
  return new Set(Array.from(counts.entries()).filter(([, count]) => count > 1).map(([identity]) => identity));
}

function isLikelyNoise(block: DocxSemanticBlock, duplicateIdentities: ReadonlySet<string>) {
  const text = block.editedText.trim();
  const identity = normalizeNoiseIdentity(text);
  if (!text) {
    return true;
  }
  if (block.kind !== "heading" && text.length <= 2) {
    return true;
  }
  if (/^(第?\s*\d+\s*页|page\s*\d+|\d+)$/i.test(text)) {
    return true;
  }
  if (/^[\p{P}\p{S}\s]+$/u.test(text)) {
    return true;
  }
  return duplicateIdentities.has(identity);
}

function createReviewSections(blocks: readonly DocxSemanticBlock[]): readonly DocxReviewSection[] {
  const sections: DocxReviewSection[] = [];
  let current: DocxReviewSection | null = null;
  let unheadedPart = 1;

  blocks.forEach((block) => {
    if (block.kind === "heading") {
      current = {
        id: `docx-section-${block.id}`,
        title: block.editedText.trim() || `未命名章节 ${sections.length + 1}`,
        headingLevel: block.headingLevel,
        blocks: [block],
      };
      sections.push(current);
      return;
    }

    if (!current || (current.headingLevel === null && current.blocks.length >= 24)) {
      current = {
        id: `docx-section-body-${unheadedPart}`,
        title: unheadedPart === 1 ? "文档开篇 / 未分节正文" : `未分节正文 ${unheadedPart}`,
        headingLevel: null,
        blocks: [],
      };
      unheadedPart += 1;
      sections.push(current);
    }
    current.blocks = [...current.blocks, block];
  });

  return sections;
}

function overlayId(candidateId: string, knowledgePointId: string) {
  return `private-overlay-${candidateId}-${knowledgePointId}`;
}

export function DocxParsingReview({
  approvedOverlayIds = [],
  candidates,
  courseOptions,
  intakeDraft,
  sessionFiles,
  onApproveOverlay,
  onReauthorize,
  onRevokeOverlay,
}: DocxParsingReviewProps) {
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidates[0]?.id ?? "");
  const [authorizationConfirmed, setAuthorizationConfirmed] = useState(false);
  const [reauthorizing, setReauthorizing] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [parsingDraft, setParsingDraft] = useState<MaterialDocxParsingDraft | null>(null);
  const [reviewFilter, setReviewFilter] = useState<DocxReviewFilter>("all");
  const [overlayApprovalConfirmed, setOverlayApprovalConfirmed] = useState(false);
  const selectedCandidate = candidates.find((candidate) => candidate.id === selectedCandidateId)
    ?? candidates[0]
    ?? null;
  const selectedCourse = courseOptions.find((course) => course.id === intakeDraft.provenance.courseId)
    ?? courseOptions[0]
    ?? null;
  const [selectedKnowledgePointId, setSelectedKnowledgePointId] = useState(
    selectedCourse?.knowledgePoints[0]?.id ?? "",
  );
  const selectedKnowledgePoint = selectedCourse?.knowledgePoints.find(
    (point) => point.id === selectedKnowledgePointId,
  ) ?? selectedCourse?.knowledgePoints[0] ?? null;
  const activeDraft = parsingDraft?.candidateId === selectedCandidate?.id ? parsingDraft : null;
  const blocks = useMemo(() => activeDraft?.parseResult.blocks ?? [], [activeDraft]);
  const duplicateTextIdentities = useMemo(() => getDuplicateTextIdentities(blocks), [blocks]);
  const sections = useMemo(() => createReviewSections(blocks), [blocks]);
  const noiseBlockIds = useMemo(() => new Set(
    blocks.filter((block) => isLikelyNoise(block, duplicateTextIdentities)).map((block) => block.id),
  ), [blocks, duplicateTextIdentities]);
  const acceptedCount = blocks.filter((block) => block.decision === "accepted").length;
  const currentOverlayId = selectedCandidate && selectedKnowledgePoint
    ? overlayId(selectedCandidate.id, selectedKnowledgePoint.id)
    : null;
  const currentOverlayApproved = currentOverlayId
    ? approvedOverlayIds.includes(currentOverlayId)
    : false;
  const deltaPreview = useMemo(() => {
    if (!activeDraft || !selectedCourse || !selectedKnowledgePoint || acceptedCount === 0) {
      return null;
    }
    return createMaterialCourseDeltaPreview(
      selectedCourse,
      selectedKnowledgePoint,
      activeDraft.parseResult.blocks,
    );
  }, [acceptedCount, activeDraft, selectedCourse, selectedKnowledgePoint]);

  function changeCandidate(candidateId: string) {
    setSelectedCandidateId(candidateId);
    setAuthorizationConfirmed(false);
    setOverlayApprovalConfirmed(false);
    setNotice(null);
  }

  async function reauthorize(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file || !selectedCandidate || reauthorizing) {
      return;
    }
    setReauthorizing(true);
    setAuthorizationConfirmed(false);
    setParsingDraft(null);
    setOverlayApprovalConfirmed(false);
    const result = await onReauthorize(selectedCandidate, file);
    setNotice(result.message);
    setReauthorizing(false);
  }

  async function parseSelectedDocx() {
    if (!selectedCandidate || !authorizationConfirmed || parsing) {
      return;
    }
    const file = sessionFiles.get(selectedCandidate.id);
    if (!file) {
      setNotice("请先重新选择与 SHA 身份一致的 DOCX 原件。");
      return;
    }
    setParsing(true);
    setNotice(null);
    setOverlayApprovalConfirmed(false);
    try {
      const parseResult = await parseDocxLocally(file);
      setParsingDraft(createMaterialDocxParsingDraft(intakeDraft, selectedCandidate, parseResult));
      setNotice(
        parseResult.blockCount > 0
          ? `已在浏览器内存提取 ${parseResult.blockCount} 个语义块；现在先按章节审核，不必逐段展开。`
          : "本地解析结束，但没有得到可审核文本块。",
      );
    } catch {
      setParsingDraft(null);
      setNotice("DOCX 本地解析失败；原件未上传，课程数据没有变化。");
    } finally {
      setParsing(false);
    }
  }

  function updateBlocks(
    blockIds: ReadonlySet<string>,
    update: (block: DocxSemanticBlock) => DocxSemanticBlock,
  ) {
    setOverlayApprovalConfirmed(false);
    const candidateOverlayPrefix = selectedCandidate
      ? `private-overlay-${selectedCandidate.id}-`
      : null;
    approvedOverlayIds
      .filter((approvedOverlayId) => (
        candidateOverlayPrefix !== null
        && approvedOverlayId.startsWith(candidateOverlayPrefix)
      ))
      .forEach(onRevokeOverlay);
    setParsingDraft((current) => {
      if (!current) {
        return current;
      }
      return {
        ...current,
        parseResult: {
          ...current.parseResult,
          blocks: current.parseResult.blocks.map((block) => (
            blockIds.has(block.id) ? update(block) : block
          )),
        },
        deltaPreview: null,
      };
    });
  }

  function updateBlock(
    blockId: string,
    changes: { decision?: DocxSemanticBlockDecision; editedText?: string },
  ) {
    updateBlocks(new Set([blockId]), (block) => ({ ...block, ...changes }));
  }

  function setSectionDecision(section: DocxReviewSection, decision: DocxSemanticBlockDecision) {
    const ids = new Set(section.blocks.map((block) => block.id));
    updateBlocks(ids, (block) => {
      if (decision === "accepted" && noiseBlockIds.has(block.id)) {
        return block;
      }
      return decision === "pending-review"
        ? { ...block, editedText: block.text, decision }
        : { ...block, decision };
    });
    setNotice(
      decision === "accepted"
        ? `已接纳「${section.title}」中的非噪声候选；可展开复核例外。`
        : decision === "excluded"
          ? `已排除「${section.title}」全部语义块。`
          : `已把「${section.title}」恢复为待审。`,
    );
  }

  function setAllNonNoisePendingToAccepted() {
    const ids = new Set(blocks.filter((block) => (
      block.decision === "pending-review" && !noiseBlockIds.has(block.id)
    )).map((block) => block.id));
    updateBlocks(ids, (block) => ({ ...block, decision: "accepted" }));
    setNotice(`已批量接纳 ${ids.size} 个非噪声待审块；噪声候选仍保持待审。`);
  }

  function excludeNoiseCandidates() {
    updateBlocks(noiseBlockIds, (block) => ({ ...block, decision: "excluded" }));
    setNotice(`已排除 ${noiseBlockIds.size} 个确定性噪声候选；可以随时逐块恢复。`);
  }

  function restoreAllBlocks() {
    const ids = new Set(blocks.map((block) => block.id));
    updateBlocks(ids, (block) => ({ ...block, editedText: block.text, decision: "pending-review" }));
    setNotice("全部语义块已恢复为最初的待审状态。");
  }

  function approveOverlay() {
    if (!activeDraft || !selectedCourse || !selectedKnowledgePoint || !deltaPreview || !overlayApprovalConfirmed) {
      return;
    }
    const sectionByBlockId = new Map<string, { id: string; title: string }>();
    sections.forEach((section) => {
      section.blocks.forEach((block) => sectionByBlockId.set(block.id, {
        id: section.id,
        title: section.title,
      }));
    });
    const overlay = createReviewedMaterialOverlayDraft(
      intakeDraft,
      activeDraft,
      selectedCourse,
      selectedKnowledgePoint,
      sectionByBlockId,
    );
    onApproveOverlay(overlay);
    setNotice(`已创建「${overlay.label}」并自动切换下方材料包选择器；仍未发送模型。`);
  }

  function filteredBlocks(section: DocxReviewSection) {
    if (reviewFilter === "all") {
      return section.blocks;
    }
    if (reviewFilter === "modified") {
      return section.blocks.filter((block) => block.editedText !== block.text);
    }
    if (reviewFilter === "noise") {
      return section.blocks.filter((block) => noiseBlockIds.has(block.id));
    }
    return section.blocks.filter((block) => block.decision === reviewFilter);
  }

  if (!selectedCandidate) {
    return (
      <section className={styles.emptyState} aria-labelledby="docx-parser-title">
        <FileLock2 aria-hidden="true" size={24} />
        <div>
          <p>DOCX LOCAL PARSING · V1</p>
          <h3 id="docx-parser-title">本批没有可进入试点的 DOCX</h3>
          <span>PDF、旧版 .doc、PPT 和图片继续保持待解析；不会假装已经读取。</span>
        </div>
      </section>
    );
  }

  const fileAvailable = sessionFiles.has(selectedCandidate.id);

  return (
    <section className={styles.parser} aria-labelledby="docx-parser-title">
      <div className={styles.heading}>
        <div className={styles.index}>02</div>
        <div>
          <p>DOCX LOCAL PARSING · VERSION 1</p>
          <h3 id="docx-parser-title">先按章节审核，再处理少数例外</h3>
          <span>标题自动组成章节；章节可批量接纳、排除或恢复，逐段编辑只在展开后出现。</span>
        </div>
        <div className={styles.zeroTransfer}><ShieldCheck aria-hidden="true" size={18} /><span>0 B 模型传输<br />0 次课程写入</span></div>
      </div>

      <div className={styles.gateGrid}>
        <div className={styles.fileGate}>
          <label>
            <span>选择已通过身份审核的 DOCX</span>
            <span className={styles.selectWrap}>
              <select value={selectedCandidate.id} onChange={(event) => changeCandidate(event.target.value)}>
                {candidates.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}
              </select>
              <ChevronDown aria-hidden="true" size={16} />
            </span>
          </label>
          <div className={fileAvailable ? styles.identityReady : styles.identityMissing}>
            <FileCheck2 aria-hidden="true" size={20} />
            <div>
              <strong>{fileAvailable ? "同一原件已在当前会话" : "需要重新取得同一原件"}</strong>
              <span>目标 SHA · {selectedCandidate.sha256.slice(0, 16)}…</span>
            </div>
          </div>
          <div className={styles.reauthorize}>
            <input
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              id="docx-reauthorization-file"
              onChange={(event) => {
                void reauthorize(event.currentTarget.files);
                event.currentTarget.value = "";
              }}
              type="file"
            />
            <label htmlFor="docx-reauthorization-file">
              {reauthorizing ? <LoaderCircle className={styles.spinner} aria-hidden="true" size={15} /> : <Upload aria-hidden="true" size={15} />}
              {reauthorizing ? "正在重新核对 SHA" : fileAvailable ? "重新核对原件" : "选择原件并核对 SHA"}
            </label>
          </div>
        </div>

        <div className={styles.authorizationGate}>
          <span>EXPLICIT AUTHORIZATION</span>
          <label>
            <input
              checked={authorizationConfirmed}
              disabled={!fileAvailable}
              onChange={(event) => setAuthorizationConfirmed(event.target.checked)}
              type="checkbox"
            />
            <span>我授权仅在当前浏览器会话解析这个 DOCX 的结构与文字；不发送模型、不持久化正文、不自动进入课程。</span>
          </label>
          <button disabled={!fileAvailable || !authorizationConfirmed || parsing} onClick={() => void parseSelectedDocx()} type="button">
            {parsing ? <LoaderCircle className={styles.spinner} aria-hidden="true" size={16} /> : <FileLock2 aria-hidden="true" size={16} />}
            {parsing ? "浏览器本地解析中" : "开始本地解析"}
          </button>
          <small>授权范围：browser-local-docx-structure-only · persistence: memory-only</small>
        </div>
      </div>

      {notice ? <p aria-live="polite" className={styles.notice}>{notice}</p> : null}

      {activeDraft ? (
        <div className={styles.result}>
          <div className={styles.metrics}>
            <article><span>自动分节</span><strong>{sections.length}</strong><small>默认折叠审核</small></article>
            <article><span>语义块</span><strong>{activeDraft.parseResult.blockCount}</strong><small>{activeDraft.parseResult.characterCount.toLocaleString("zh-CN")} 字符</small></article>
            <article><span>已接纳</span><strong>{acceptedCount}</strong><small>仍未写入课程</small></article>
            <article><span>噪声候选</span><strong>{noiseBlockIds.size}</strong><small>不会自动排除</small></article>
          </div>

          {activeDraft.parseResult.issues.length > 0 ? (
            <div className={styles.issues}>
              {activeDraft.parseResult.issues.map((issue) => (
                <article key={issue.id}>
                  <CircleAlert aria-hidden="true" size={15} />
                  <span>{issue.message}</span>
                </article>
              ))}
            </div>
          ) : null}

          <div className={styles.reviewHeader}>
            <div><span>SECTION-FIRST REVIEW</span><h4>按章节批量审核</h4></div>
            <p>默认只看章节摘要；展开章节后才进入逐段编辑。噪声判断只基于页码、空块、符号和完全重复文本。</p>
          </div>

          <div className={styles.reviewToolbar}>
            <div className={styles.filterField}>
              <Filter aria-hidden="true" size={15} />
              <select aria-label="筛选语义块" value={reviewFilter} onChange={(event) => setReviewFilter(event.target.value as DocxReviewFilter)}>
                {(Object.keys(filterLabels) as DocxReviewFilter[]).map((filter) => <option key={filter} value={filter}>{filterLabels[filter]}</option>)}
              </select>
              <ChevronDown aria-hidden="true" size={14} />
            </div>
            <button onClick={setAllNonNoisePendingToAccepted} type="button"><ListChecks aria-hidden="true" size={14} />接纳全部非噪声待审</button>
            <button disabled={noiseBlockIds.size === 0} onClick={excludeNoiseCandidates} type="button"><Trash2 aria-hidden="true" size={14} />排除 {noiseBlockIds.size} 个噪声候选</button>
            <button onClick={restoreAllBlocks} type="button"><RotateCcw aria-hidden="true" size={14} />全部恢复待审</button>
          </div>

          <div className={styles.sectionList}>
            {sections.map((section) => {
              const visibleBlocks = filteredBlocks(section);
              const sectionAccepted = section.blocks.filter((block) => block.decision === "accepted").length;
              const sectionPending = section.blocks.filter((block) => block.decision === "pending-review").length;
              const sectionNoise = section.blocks.filter((block) => noiseBlockIds.has(block.id)).length;
              if (reviewFilter !== "all" && visibleBlocks.length === 0) {
                return null;
              }
              return (
                <details className={styles.sectionCard} key={section.id}>
                  <summary>
                    <ChevronDown aria-hidden="true" size={17} />
                    <div>
                      <span>{section.headingLevel ? `HEADING ${section.headingLevel}` : "BODY SECTION"}</span>
                      <strong>{section.title}</strong>
                      <small>{section.blocks.length} 块 · {sectionAccepted} 接纳 · {sectionPending} 待审 · {sectionNoise} 噪声候选</small>
                    </div>
                    <em>展开逐段精修</em>
                  </summary>
                  <div className={styles.sectionActions}>
                    <button onClick={() => setSectionDecision(section, "accepted")} type="button"><Check aria-hidden="true" size={13} />接纳本节非噪声块</button>
                    <button onClick={() => setSectionDecision(section, "excluded")} type="button"><Trash2 aria-hidden="true" size={13} />排除本节</button>
                    <button onClick={() => setSectionDecision(section, "pending-review")} type="button"><RotateCcw aria-hidden="true" size={13} />恢复本节待审</button>
                  </div>
                  <div className={styles.blockList}>
                    {visibleBlocks.map((block) => (
                      <article className={styles[`block_${block.decision.replace("-", "_")}`]} key={block.id}>
                        <div className={styles.blockMeta}>
                          <span>{block.locator.label}</span>
                          <em>{blockKindLabels[block.kind]} · {decisionLabels[block.decision]}{noiseBlockIds.has(block.id) ? " · 噪声候选" : ""}</em>
                        </div>
                        <textarea
                          aria-label={`编辑 ${block.locator.label}`}
                          onChange={(event) => updateBlock(block.id, { editedText: event.target.value })}
                          rows={block.kind === "heading" ? 2 : 3}
                          value={block.editedText}
                        />
                        <div className={styles.blockActions}>
                          <button disabled={!block.editedText.trim()} onClick={() => updateBlock(block.id, { decision: "accepted" })} type="button"><Check aria-hidden="true" size={13} />接纳</button>
                          <button onClick={() => updateBlock(block.id, { decision: "excluded" })} type="button"><Trash2 aria-hidden="true" size={13} />排除</button>
                          <button onClick={() => updateBlock(block.id, { decision: "pending-review", editedText: block.text })} type="button"><RotateCcw aria-hidden="true" size={13} />恢复待审</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>

          <div className={styles.deltaSection}>
            <div className={styles.reviewHeader}>
              <div><span>COURSE DELTA · PREVIEW ONLY</span><h4>批准为当前会话私人增强包</h4></div>
              <p>批准后只把人工接纳的摘录加入下方材料包选择器；不会持久化正文，也不会调用模型。</p>
            </div>
            <div className={styles.targetFields}>
              <label>
                <span>目标课程</span>
                <input disabled value={selectedCourse?.title ?? "课程待确认"} />
              </label>
              <label>
                <span>目标知识点</span>
                <span className={styles.selectWrap}>
                  <select
                    value={selectedKnowledgePoint?.id ?? ""}
                    onChange={(event) => {
                      setSelectedKnowledgePointId(event.target.value);
                      setOverlayApprovalConfirmed(false);
                    }}
                  >
                    {selectedCourse?.knowledgePoints.map((point) => (
                      <option key={point.id} value={point.id}>{point.chapterTitle} · {point.title}</option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" size={16} />
                </span>
              </label>
            </div>

            {deltaPreview ? (
              <>
                <div className={styles.deltaCard}>
                  <div><span>目标</span><strong>{deltaPreview.knowledgePointTitle}</strong><small>{deltaPreview.chapterTitle}</small></div>
                  <div><span>来源候选</span><strong>{deltaPreview.currentSourceCount} → {deltaPreview.currentSourceCount + 1}</strong><small>+1 learner-private artifact candidate</small></div>
                  <div><span>私人摘录</span><strong>+{deltaPreview.acceptedExcerptCount}</strong><small>{deltaPreview.pendingBlockCount} 待审 · {deltaPreview.excludedBlockCount} 排除</small></div>
                  <div><span>保持不变</span><strong>{deltaPreview.currentContentStatus} · {deltaPreview.currentHasLesson ? "lesson 保留" : "无 lesson"}</strong><small>0 核验事实 · 0 注册表写入 · 0 模型请求</small></div>
                </div>
                <div className={styles.overlayApproval}>
                  <label>
                    <input checked={overlayApprovalConfirmed} onChange={(event) => setOverlayApprovalConfirmed(event.target.checked)} type="checkbox" />
                    <span>我确认只把当前接纳摘录作为本次浏览器会话的 learner-private 材料候选；刷新后正文与增强包都会消失。</span>
                  </label>
                  {currentOverlayApproved && currentOverlayId ? (
                    <div className={styles.overlayApproved}>
                      <PackageCheck aria-hidden="true" size={19} />
                      <div><strong>已加入下方材料包选择器</strong><span>当前仍为 model not-authorized</span></div>
                      <button onClick={() => onRevokeOverlay(currentOverlayId)} type="button">撤回增强包</button>
                    </div>
                  ) : (
                    <button className={styles.approveOverlayButton} disabled={!overlayApprovalConfirmed} onClick={approveOverlay} type="button">
                      <Layers3 aria-hidden="true" size={17} />批准摘录并加入私人材料包
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.noDelta}><CircleAlert aria-hidden="true" size={17} /><span>至少接纳 1 个非空语义块，才会出现私人课程增量预览。</span></div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
