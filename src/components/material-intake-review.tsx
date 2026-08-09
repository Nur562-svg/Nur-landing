"use client";

import {
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  Check,
  ChevronDown,
  CircleAlert,
  FileClock,
  FileWarning,
  Fingerprint,
  FolderLock,
  LoaderCircle,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import {
  confirmMaterialIntakeDraft,
  createEmptyMaterialIntakeDraft,
  createMaterialIntakeBatch,
  getMaterialIntakeStorageSnapshot,
  materialIntakeAuthorities,
  materialIntakeDimensionFromInput,
  materialIntakeDimensionInputValue,
  materialIntakeLimits,
  materialIntakePrivacyRisks,
  materialIntakeSourceTypes,
  parseMaterialIntakeDraftJson,
  reviseMaterialIntakeBatch,
  saveMaterialIntakeDraft,
  setMaterialIntakeBatch,
  sha256MaterialIntakeFile,
  subscribeToMaterialIntake,
  touchMaterialIntakeDraft,
  validateMaterialIntakeDraft,
} from "@/lib/material-intake";
import type {
  MaterialIntakeBatch,
  MaterialIntakeCourseOption,
  MaterialIntakeDraft,
  MaterialIntakeFileCandidate,
  MaterialIntakeKnownAssetIdentity,
  MaterialIntakeRejectedFile,
} from "@/types/material-intake";
import type {
  MaterialMediaType,
  MaterialPrivacyRisk,
  SourceAuthority,
  SourceType,
} from "@/types/learning";
import type {
  MaterialParsingCourseOption,
  ReviewedMaterialOverlayDraft,
} from "@/types/material-parsing";
import { DocxParsingReview } from "./docx-parsing-review";
import styles from "./material-intake-review.module.css";

type MaterialIntakeReviewProps = {
  courseOptions: readonly MaterialIntakeCourseOption[];
  knownAssets: readonly MaterialIntakeKnownAssetIdentity[];
  parsingCourseOptions: readonly MaterialParsingCourseOption[];
  approvedOverlayIds: readonly string[];
  onApproveOverlay: (overlay: ReviewedMaterialOverlayDraft) => void;
  onInvalidatePrivateOverlays: () => void;
  onRevokeOverlay: (overlayId: string) => void;
};

type MaterialIntakeUndoSnapshot = {
  draft: MaterialIntakeDraft;
  sessionFiles: ReadonlyMap<string, File>;
  notice: string;
};

const sourceTypeLabels: Readonly<Record<SourceType, string>> = {
  textbook: "教材",
  "teacher-slide": "教师课件",
  "review-scope": "复习范围",
  "past-exam": "历史试卷",
  "question-bank": "题库",
  "answer-key": "答案材料",
  "study-note": "个人笔记 / 整理",
  "experiment-manual": "实验讲义",
  "image-set": "图片 / 识图集",
  transcription: "转录",
  "grading-rubric": "评分量表",
  editorial: "NUR 编辑材料",
  "clinical-reference": "临床参考",
};

const authorityLabels: Readonly<Record<SourceAuthority, string>> = {
  student: "学生 / 个人申报",
  teacher: "教师来源（待复核）",
  school: "学校来源（待复核）",
  publisher: "出版社来源（待复核）",
  "nur-editorial": "NUR 编辑",
  "clinical-authority": "临床权威",
};

const privacyRiskLabels: Readonly<Record<MaterialPrivacyRisk, string>> = {
  "document-metadata": "可能含文档元数据",
  "blank-personal-fields": "含姓名 / 学号等空白栏",
  "identifiable-person": "含可识别人物或个人信息",
  "none-observed": "未观察到隐私信息",
};

const mediaTypeByExtension: Readonly<Record<string, Exclude<MaterialMediaType, "archive" | "markdown">>> = {
  ".pdf": "pdf",
  ".doc": "word",
  ".docx": "word",
  ".ppt": "presentation",
  ".pptx": "presentation",
  ".jpg": "image",
  ".jpeg": "image",
  ".png": "image",
  ".webp": "image",
};

const rejectionLabels: Readonly<Record<MaterialIntakeRejectedFile["reason"], string>> = {
  "unsupported-type": "文件类型不在首批边界内",
  "file-count-limit": "超过每批 8 份的数量边界",
  "file-size-limit": "超过单份 25 MiB 的大小边界",
  "batch-size-limit": "加入后将超过每批 80 MiB",
  "hash-failed": "浏览器本地 SHA-256 计算失败",
};

function formatBytes(value: number) {
  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(value < 1024 * 10 ? 1 : 0)} KiB`;
  }
  return `${(value / (1024 * 1024)).toFixed(1)} MiB`;
}

function fileExtension(name: string) {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index).toLowerCase() : "";
}

function duplicateLabel(file: MaterialIntakeFileCandidate) {
  if (file.duplicate.kind === "batch") {
    return "批次内重复";
  }
  if (file.duplicate.kind === "catalog") {
    return `目录已有 · ${file.duplicate.matchedAssetId}`;
  }
  return "新身份候选";
}

function normalizeCandidateDuplicates(
  files: readonly MaterialIntakeFileCandidate[],
  knownAssets: readonly MaterialIntakeKnownAssetIdentity[],
) {
  const knownByHash = new Map(knownAssets.map((asset) => [asset.sha256, asset]));
  const firstCandidateByHash = new Map<string, string>();

  return files.map((file) => {
    const catalogMatch = knownByHash.get(file.sha256);
    const batchMatch = firstCandidateByHash.get(file.sha256);
    const duplicate = catalogMatch
      ? { kind: "catalog" as const, matchedCandidateId: null, matchedAssetId: catalogMatch.assetId }
      : batchMatch
        ? { kind: "batch" as const, matchedCandidateId: batchMatch, matchedAssetId: null }
        : { kind: "none" as const, matchedCandidateId: null, matchedAssetId: null };

    if (!catalogMatch && !firstCandidateByHash.has(file.sha256)) {
      firstCandidateByHash.set(file.sha256, file.id);
    }

    return {
      ...file,
      disposition: duplicate.kind === "catalog"
        ? "duplicate-in-catalog" as const
        : duplicate.kind === "batch"
          ? "duplicate-in-batch" as const
          : "pending-review" as const,
      duplicate,
    };
  });
}

function updateCandidatePrivacy(
  draft: MaterialIntakeDraft,
  risk: MaterialPrivacyRisk,
  publicationPolicy: MaterialIntakeDraft["privacy"]["publicationPolicy"],
): MaterialIntakeDraft {
  if (!draft.batch) {
    return draft;
  }
  return {
    ...draft,
    batch: {
      ...draft.batch,
      updatedAt: new Date().toISOString(),
      files: draft.batch.files.map((file) => ({
        ...file,
        privacyRisk: risk,
        publicationPolicy,
      })),
    },
  };
}

export function MaterialIntakeReview({
  approvedOverlayIds,
  courseOptions,
  knownAssets,
  onApproveOverlay,
  onInvalidatePrivateOverlays,
  onRevokeOverlay,
  parsingCourseOptions,
}: MaterialIntakeReviewProps) {
  const fallback = useMemo(
    () => createEmptyMaterialIntakeDraft(courseOptions[0]?.id ?? ""),
    [courseOptions],
  );
  const storageSnapshot = useSyncExternalStore(
    subscribeToMaterialIntake,
    getMaterialIntakeStorageSnapshot,
    () => null,
  );
  const draft = useMemo(
    () => parseMaterialIntakeDraftJson(storageSnapshot, fallback, courseOptions, knownAssets),
    [courseOptions, fallback, knownAssets, storageSnapshot],
  );
  const validation = useMemo(
    () => validateMaterialIntakeDraft(draft, courseOptions, knownAssets),
    [courseOptions, draft, knownAssets],
  );
  const [hashingFileName, setHashingFileName] = useState<string | null>(null);
  const [selectionNotice, setSelectionNotice] = useState<string | null>(null);
  const [sessionFiles, setSessionFiles] = useState<ReadonlyMap<string, File>>(() => new Map());
  const [undoSnapshot, setUndoSnapshot] = useState<MaterialIntakeUndoSnapshot | null>(null);

  function persistDraft(nextDraft: MaterialIntakeDraft) {
    const nextValidation = validateMaterialIntakeDraft(nextDraft, courseOptions, knownAssets);
    const status = nextDraft.status === "eligible-for-course-builder"
      ? nextDraft.status
      : nextValidation.readyForHumanConfirmation
        ? "pending-review" as const
        : "draft" as const;
    if (draft.status === "eligible-for-course-builder" && status !== "eligible-for-course-builder") {
      onInvalidatePrivateOverlays();
    }
    saveMaterialIntakeDraft({ ...nextDraft, status });
  }

  function updateProvenance(
    changes: Partial<MaterialIntakeDraft["provenance"]>,
  ) {
    setUndoSnapshot(null);
    persistDraft(touchMaterialIntakeDraft(draft, {
      provenance: { ...draft.provenance, ...changes },
    }));
  }

  function updatePrivacy(changes: Partial<MaterialIntakeDraft["privacy"]>) {
    setUndoSnapshot(null);
    const privacy = { ...draft.privacy, ...changes };
    const touched = touchMaterialIntakeDraft(draft, { privacy });
    persistDraft(updateCandidatePrivacy(touched, privacy.risk, privacy.publicationPolicy));
  }

  function updateReview(
    field: keyof Pick<
      MaterialIntakeDraft["review"],
      "fileIdentityConfirmed" | "provenanceConfirmed" | "privacyPublicationConfirmed" | "noModelTransferConfirmed"
    >,
    checked: boolean,
  ) {
    setUndoSnapshot(null);
    persistDraft(touchMaterialIntakeDraft(draft, {
      review: {
        ...draft.review,
        [field]: checked,
        status: "pending-review",
        confirmedAt: null,
      },
    }));
  }

  function saveUndoSnapshot(notice: string) {
    setUndoSnapshot({
      draft,
      sessionFiles: new Map(sessionFiles),
      notice,
    });
  }

  function persistBatchChange(batch: MaterialIntakeBatch | null) {
    persistDraft(setMaterialIntakeBatch(draft, batch));
  }

  function removeCandidate(candidateId: string) {
    if (!draft.batch) {
      return;
    }
    const candidate = draft.batch.files.find((file) => file.id === candidateId);
    if (!candidate) {
      return;
    }

    saveUndoSnapshot(`已删除 ${candidate.name}`);
    const files = normalizeCandidateDuplicates(
      draft.batch.files.filter((file) => file.id !== candidateId),
      knownAssets,
    );
    const batch = files.length === 0 && draft.batch.rejectedFiles.length === 0
      ? null
      : reviseMaterialIntakeBatch(draft.batch, files, draft.batch.rejectedFiles);
    setSessionFiles((current) => {
      const next = new Map(current);
      next.delete(candidateId);
      return next;
    });
    persistBatchChange(batch);
    setSelectionNotice(`已从本地候选中删除 ${candidate.name}；审核状态已重置。`);
  }

  function removeRejectedFile(rejectedId: string) {
    if (!draft.batch) {
      return;
    }
    const rejectedFile = draft.batch.rejectedFiles.find((file) => file.id === rejectedId);
    if (!rejectedFile) {
      return;
    }

    saveUndoSnapshot(`已移除拒绝记录 ${rejectedFile.name}`);
    const rejectedFiles = draft.batch.rejectedFiles.filter((file) => file.id !== rejectedId);
    const batch = draft.batch.files.length === 0 && rejectedFiles.length === 0
      ? null
      : reviseMaterialIntakeBatch(draft.batch, draft.batch.files, rejectedFiles);
    persistBatchChange(batch);
    setSelectionNotice(`已移除 ${rejectedFile.name} 的拒绝记录；审核状态已重置。`);
  }

  function clearBatch() {
    if (!draft.batch) {
      return;
    }
    saveUndoSnapshot("已清空本批材料");
    setSessionFiles(new Map());
    persistBatchChange(null);
    setSelectionNotice("已清空本批材料；来源草稿仍保留，可撤销本次操作。");
  }

  function undoLastRemoval() {
    if (!undoSnapshot) {
      return;
    }
    saveMaterialIntakeDraft(undoSnapshot.draft);
    setSessionFiles(new Map(undoSnapshot.sessionFiles));
    setSelectionNotice(`${undoSnapshot.notice} · 已撤销。`);
    setUndoSnapshot(null);
  }

  async function handleFileSelection(fileList: FileList | null) {
    if (!fileList || fileList.length === 0 || hashingFileName) {
      return;
    }

    const selected = Array.from(fileList);
    const rejected: MaterialIntakeRejectedFile[] = [];
    const accepted: File[] = [];
    const existingEntryCount = (draft.batch?.files.length ?? 0) + (draft.batch?.rejectedFiles.length ?? 0);
    let acceptedBytes = draft.batch?.totalByteSize ?? 0;

    selected.forEach((file, index) => {
      const extension = fileExtension(file.name);
      let reason: MaterialIntakeRejectedFile["reason"] | null = null;
      if (existingEntryCount + index >= materialIntakeLimits.maxFileCount) {
        reason = "file-count-limit";
      } else if (!materialIntakeLimits.acceptedExtensions.includes(extension as never)) {
        reason = "unsupported-type";
      } else if (file.size > materialIntakeLimits.maxFileByteSize) {
        reason = "file-size-limit";
      } else if (acceptedBytes + file.size > materialIntakeLimits.maxBatchByteSize) {
        reason = "batch-size-limit";
      }

      if (reason) {
        rejected.push({
          id: window.crypto.randomUUID(),
          name: file.name,
          byteSize: file.size,
          reason,
          notice: rejectionLabels[reason],
        });
        return;
      }
      accepted.push(file);
      acceptedBytes += file.size;
    });

    const knownByHash = new Map(knownAssets.map((asset) => [asset.sha256, asset]));
    const firstCandidateByHash = new Map<string, string>();
    const existingCandidates = normalizeCandidateDuplicates(draft.batch?.files ?? [], knownAssets);
    existingCandidates.forEach((file) => {
      if (file.duplicate.kind === "none" && !firstCandidateByHash.has(file.sha256)) {
        firstCandidateByHash.set(file.sha256, file.id);
      }
    });
    const candidates: MaterialIntakeFileCandidate[] = [];
    const selectedSessionFiles: Array<readonly [string, File]> = [];

    for (const file of accepted) {
      setHashingFileName(file.name);
      try {
        const sha256 = await sha256MaterialIntakeFile(file);
        const catalogMatch = knownByHash.get(sha256);
        const batchMatch = firstCandidateByHash.get(sha256);
        const duplicate = catalogMatch
          ? { kind: "catalog" as const, matchedCandidateId: null, matchedAssetId: catalogMatch.assetId }
          : batchMatch
            ? { kind: "batch" as const, matchedCandidateId: batchMatch, matchedAssetId: null }
            : { kind: "none" as const, matchedCandidateId: null, matchedAssetId: null };
        const id = window.crypto.randomUUID();
        const candidate: MaterialIntakeFileCandidate = {
          id,
          name: file.name,
          extension: fileExtension(file.name),
          mimeType: file.type,
          mediaType: mediaTypeByExtension[fileExtension(file.name)],
          byteSize: file.size,
          lastModified: file.lastModified,
          sha256,
          disposition: duplicate.kind === "catalog"
            ? "duplicate-in-catalog"
            : duplicate.kind === "batch"
              ? "duplicate-in-batch"
              : "pending-review",
          duplicate,
          parsingStatus: "pending",
          parsingLabel: "待解析",
          transcriptionStatus: "ocr-pending",
          integrityStatus: "pending-review",
          privacyRisk: draft.privacy.risk,
          publicationPolicy: draft.privacy.publicationPolicy,
          academicContentStatus: "pending",
          authorityReviewStatus: "pending-review",
          conflictReviewStatus: "pending-review",
        };
        candidates.push(candidate);
        selectedSessionFiles.push([id, file]);
        if (!firstCandidateByHash.has(sha256)) {
          firstCandidateByHash.set(sha256, id);
        }
      } catch {
        rejected.push({
          id: window.crypto.randomUUID(),
          name: file.name,
          byteSize: file.size,
          reason: "hash-failed",
          notice: rejectionLabels["hash-failed"],
        });
      }
    }

    const files = normalizeCandidateDuplicates([...existingCandidates, ...candidates], knownAssets);
    const rejectedFiles = [...(draft.batch?.rejectedFiles ?? []), ...rejected];
    const batch = draft.batch
      ? reviseMaterialIntakeBatch(draft.batch, files, rejectedFiles)
      : createMaterialIntakeBatch(files, rejectedFiles);
    setUndoSnapshot(null);
    setSessionFiles((current) => {
      const next = new Map(current);
      selectedSessionFiles.forEach(([id, file]) => next.set(id, file));
      return next;
    });
    persistBatchChange(batch);
    setSelectionNotice(
      candidates.length > 0
        ? `已追加 ${candidates.length} 份文件并在本地完成 SHA-256；原始文件只在当前会话可用，未上传。`
        : rejected.length > 0
          ? "本次没有文件进入候选；拒绝记录可单独移除后重新选择。"
          : "本次没有文件进入候选，请按边界重新选择。",
    );
    setHashingFileName(null);
  }

  function confirmDraft() {
    setUndoSnapshot(null);
    const candidate = confirmMaterialIntakeDraft(draft);
    const nextValidation = validateMaterialIntakeDraft(candidate, courseOptions, knownAssets);
    if (!nextValidation.eligibleForCourseBuilder) {
      return;
    }
    saveMaterialIntakeDraft(candidate);
  }

  async function reauthorizeCandidate(
    candidate: MaterialIntakeFileCandidate,
    file: File,
  ) {
    setSessionFiles((current) => {
      const next = new Map(current);
      next.delete(candidate.id);
      return next;
    });
    if (fileExtension(file.name) !== ".docx") {
      return { ok: false, message: "重新授权失败：当前解析试点只接受 .docx 原件。" };
    }
    if (file.size !== candidate.byteSize) {
      return { ok: false, message: "重新授权失败：文件大小与已审核身份不一致，未读取正文。" };
    }
    try {
      const sha256 = await sha256MaterialIntakeFile(file);
      if (sha256 !== candidate.sha256) {
        return { ok: false, message: "重新授权失败：SHA-256 与已审核身份不一致，未读取正文。" };
      }
      setSessionFiles((current) => {
        const next = new Map(current);
        next.set(candidate.id, file);
        return next;
      });
      return { ok: true, message: "SHA-256 身份一致；原件只在当前会话内存可用，尚未开始解析。" };
    } catch {
      return { ok: false, message: "浏览器无法完成 SHA-256 复核；未读取正文。" };
    }
  }

  const duplicateCount = draft.batch?.files.filter((file) => file.duplicate.kind !== "none").length ?? 0;
  const acceptedCount = draft.batch?.files.filter((file) => file.duplicate.kind === "none").length ?? 0;
  const docxCandidates = draft.batch?.files.filter((file) => (
    file.duplicate.kind === "none" && file.extension === ".docx"
  )) ?? [];
  const missingSessionFileCount = draft.batch?.files.filter((file) => !sessionFiles.has(file.id)).length ?? 0;
  const identityComplete = acceptedCount > 0
    && duplicateCount === 0
    && (draft.batch?.rejectedFiles.length ?? 0) === 0;
  const reviewChecksComplete = draft.review.fileIdentityConfirmed
    && draft.review.provenanceConfirmed
    && draft.review.privacyPublicationConfirmed
    && draft.review.noModelTransferConfirmed;
  const workflowSteps = [
    {
      detail: identityComplete ? `已识别 ${acceptedCount} 份` : draft.batch ? "仍有身份问题" : "待选择文件",
      done: identityComplete,
      title: "文件身份",
    },
    {
      detail: validation.readyForHumanConfirmation ? "边界已填写" : "待补充或修正",
      done: validation.readyForHumanConfirmation,
      title: "来源边界",
    },
    {
      detail: draft.status === "eligible-for-course-builder" ? "身份审核完成" : "待人工确认",
      done: draft.status === "eligible-for-course-builder",
      title: "人工审核",
    },
    {
      detail: draft.status === "eligible-for-course-builder"
        ? docxCandidates.length > 0 ? "DOCX 可授权试点" : "仅支持 DOCX 试点"
        : "通过审核后才可授权",
      done: false,
      title: "内容解析",
    },
  ] as const;

  return (
    <section className={styles.intake} aria-labelledby="material-intake-title">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIndex}>01</div>
        <div>
          <p>PRIVATE MATERIAL INTAKE</p>
          <h2 id="material-intake-title">私人材料导入审核箱</h2>
          <span>先建立身份与边界，再决定是否进入现有 Course Builder。</span>
        </div>
        <div className={styles.localBadge}>
          <FolderLock aria-hidden="true" size={19} />
          <div><strong>本地预审</strong><span>0 B 发送模型</span></div>
        </div>
      </div>

      <ol aria-label="材料导入进度" className={styles.workflowSteps}>
        {workflowSteps.map((step, index) => {
          const active = !step.done && (
            index === 0
            || workflowSteps.slice(0, index).every((previous) => previous.done)
          );
          return (
            <li className={step.done ? styles.workflowDone : active ? styles.workflowActive : styles.workflowLocked} key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{step.title}</strong><small>{step.detail}</small></div>
            </li>
          );
        })}
      </ol>

      <div className={styles.intakeGrid}>
        <div className={styles.fileColumn}>
          <div className={styles.dropArea}>
            <input
              accept={materialIntakeLimits.acceptedExtensions.join(",")}
              aria-label="选择需要本地预审的材料文件"
              disabled={hashingFileName !== null}
              id="material-intake-files"
              multiple
              onChange={(event) => {
                void handleFileSelection(event.currentTarget.files);
                event.currentTarget.value = "";
              }}
              type="file"
            />
            <label htmlFor="material-intake-files">
              {hashingFileName ? <LoaderCircle className={styles.spinner} aria-hidden="true" size={24} /> : <Upload aria-hidden="true" size={24} />}
              <strong>{hashingFileName ? "正在计算 SHA-256" : draft.batch ? "添加更多本地材料" : "选择一批本地材料"}</strong>
              <span>{hashingFileName ?? "新选择会追加到当前批次；不会读取或上传正文。"}</span>
            </label>
          </div>

          <dl className={styles.limits}>
            <div><dt>类型</dt><dd>PDF · Word · PPT · 图片</dd></div>
            <div><dt>数量</dt><dd>最多 {materialIntakeLimits.maxFileCount} 份</dd></div>
            <div><dt>单份</dt><dd>≤ {formatBytes(materialIntakeLimits.maxFileByteSize)}</dd></div>
            <div><dt>整批</dt><dd>≤ {formatBytes(materialIntakeLimits.maxBatchByteSize)}</dd></div>
          </dl>
          <p className={styles.boundaryNote}>首批不接收 ZIP；所有支持格式仍标记为 `待解析 / ocr-pending`，不假装已经读取内容。</p>

          {selectionNotice ? <p aria-live="polite" className={styles.selectionNotice}>{selectionNotice}</p> : null}

          {draft.batch && missingSessionFileCount > 0 ? (
            <p className={styles.sessionNotice}>
              {missingSessionFileCount} 份结构化记录已恢复，但原文件不在当前会话；进入未来解析前需要重新选择对应原件。
            </p>
          ) : null}

          {draft.batch ? (
            <div className={styles.batchSummary}>
              <div>
                <span>BATCH IDENTITY</span>
                <strong>{acceptedCount} 新候选 · {duplicateCount} 重复 · {draft.batch.rejectedFiles.length} 拒绝</strong>
              </div>
              <div className={styles.batchActions}>
                <span>{formatBytes(draft.batch.totalByteSize)}</span>
                <button onClick={clearBatch} type="button"><Trash2 aria-hidden="true" size={13} />清空批次</button>
              </div>
            </div>
          ) : null}

          {undoSnapshot ? (
            <div aria-live="polite" className={styles.undoBar}>
              <span>{undoSnapshot.notice}</span>
              <button onClick={undoLastRemoval} type="button"><RotateCcw aria-hidden="true" size={13} />撤销</button>
            </div>
          ) : null}

          <div className={styles.fileList}>
            {draft.batch?.files.map((file) => (
              <article className={file.duplicate.kind === "none" ? styles.fileCandidate : styles.fileDuplicate} key={file.id}>
                <Fingerprint aria-hidden="true" size={20} />
                <div>
                  <strong>{file.name}</strong>
                  <span>{file.sha256.slice(0, 12)}… · {formatBytes(file.byteSize)}</span>
                  <small>{file.parsingLabel} · {file.transcriptionStatus} · {file.conflictReviewStatus}</small>
                  <small className={sessionFiles.has(file.id) ? styles.sessionAvailable : styles.sessionMissing}>
                    {sessionFiles.has(file.id) ? "原文件在当前会话可用" : "原文件需重新选择后才能解析"}
                  </small>
                </div>
                <div className={styles.fileActions}>
                  <em>{duplicateLabel(file)}</em>
                  <button aria-label={`删除 ${file.name}`} onClick={() => removeCandidate(file.id)} type="button"><Trash2 aria-hidden="true" size={13} />删除</button>
                </div>
              </article>
            ))}
            {draft.batch?.rejectedFiles.map((file) => (
              <article className={styles.fileRejected} key={file.id}>
                <FileWarning aria-hidden="true" size={20} />
                <div><strong>{file.name}</strong><span>{file.notice} · {formatBytes(file.byteSize)}</span></div>
                <div className={styles.fileActions}>
                  <em>未接收</em>
                  <button aria-label={`移除 ${file.name} 的拒绝记录`} onClick={() => removeRejectedFile(file.id)} type="button"><Trash2 aria-hidden="true" size={13} />移除</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.reviewColumn}>
          <div className={styles.reviewHeading}>
            <div><span>PROVENANCE DRAFT</span><h3>确认来源与权威</h3></div>
            <span className={draft.status === "eligible-for-course-builder" ? styles.statusReady : styles.statusPending}>
              {draft.status === "eligible-for-course-builder" ? "身份审核完成 · 内容尚未解析" : draft.status === "pending-review" ? "待人工确认" : "身份草稿"}
            </span>
          </div>

          <div className={styles.formGrid}>
            <label>
              <span>所属课程</span>
              <span className={styles.selectWrap}>
                <select value={draft.provenance.courseId} onChange={(event) => updateProvenance({ courseId: event.target.value })}>
                  {courseOptions.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
                </select>
                <ChevronDown aria-hidden="true" size={16} />
              </span>
            </label>
            <label>
              <span>来源类型</span>
              <span className={styles.selectWrap}>
                <select value={draft.provenance.sourceType} onChange={(event) => updateProvenance({ sourceType: event.target.value as SourceType })}>
                  {materialIntakeSourceTypes.map((type) => <option key={type} value={type}>{sourceTypeLabels[type]}</option>)}
                </select>
                <ChevronDown aria-hidden="true" size={16} />
              </span>
            </label>
            <label>
              <span>申报 authority · 始终待复核</span>
              <span className={styles.selectWrap}>
                <select value={draft.provenance.declaredAuthority} onChange={(event) => updateProvenance({ declaredAuthority: event.target.value as SourceAuthority })}>
                  {materialIntakeAuthorities.map((authority) => <option key={authority} value={authority}>{authorityLabels[authority]}</option>)}
                </select>
                <ChevronDown aria-hidden="true" size={16} />
              </span>
            </label>
            <label>
              <span>材料层</span>
              <input disabled value="learner-private · 默认私有" />
            </label>
            <label>
              <span>学校</span>
              <input value={materialIntakeDimensionInputValue(draft.provenance.school)} onChange={(event) => updateProvenance({ school: materialIntakeDimensionFromInput(event.target.value) })} />
            </label>
            <label>
              <span>教师</span>
              <input value={materialIntakeDimensionInputValue(draft.provenance.teacher)} onChange={(event) => updateProvenance({ teacher: materialIntakeDimensionFromInput(event.target.value) })} />
            </label>
            <label>
              <span>学年</span>
              <input value={materialIntakeDimensionInputValue(draft.provenance.academicYear)} onChange={(event) => updateProvenance({ academicYear: materialIntakeDimensionFromInput(event.target.value) })} />
            </label>
            <label>
              <span>学期</span>
              <input value={materialIntakeDimensionInputValue(draft.provenance.semester)} onChange={(event) => updateProvenance({ semester: materialIntakeDimensionFromInput(event.target.value) })} />
            </label>
            <label>
              <span>来源家庭关系</span>
              <span className={styles.selectWrap}>
                <select
                  value={draft.provenance.sourceFamily.mode}
                  onChange={(event) => updateProvenance({
                    sourceFamily: {
                      ...draft.provenance.sourceFamily,
                      mode: event.target.value as MaterialIntakeDraft["provenance"]["sourceFamily"]["mode"],
                    },
                  })}
                >
                  <option value="separate-source-families">每份文件先视为独立来源家庭</option>
                  <option value="single-source-family">同一来源家庭的多个 artifact</option>
                </select>
                <ChevronDown aria-hidden="true" size={16} />
              </span>
            </label>
            <label>
              <span>来源家庭标签</span>
              <input
                value={draft.provenance.sourceFamily.label}
                onChange={(event) => updateProvenance({
                  sourceFamily: { ...draft.provenance.sourceFamily, label: event.target.value },
                })}
              />
            </label>
          </div>

          <fieldset className={styles.privacyFieldset}>
            <legend>是否包含隐私信息</legend>
            <label><input type="radio" name="intake-privacy" checked={draft.privacy.declaration === "none-observed"} onChange={() => updatePrivacy({ declaration: "none-observed", risk: "none-observed" })} /><span>未观察到</span></label>
            <label><input type="radio" name="intake-privacy" checked={draft.privacy.declaration === "contains-private-information"} onChange={() => updatePrivacy({ declaration: "contains-private-information", risk: draft.privacy.risk === "none-observed" ? "document-metadata" : draft.privacy.risk })} /><span>包含或可能包含</span></label>
            <label><input type="radio" name="intake-privacy" checked={draft.privacy.declaration === "unknown"} onChange={() => updatePrivacy({ declaration: "unknown", risk: "document-metadata" })} /><span>待确认</span></label>
          </fieldset>

          <div className={styles.formGrid}>
            <label>
              <span>隐私风险</span>
              <span className={styles.selectWrap}>
                <select value={draft.privacy.risk} onChange={(event) => updatePrivacy({ risk: event.target.value as MaterialPrivacyRisk })}>
                  {materialIntakePrivacyRisks.map((risk) => <option key={risk} value={risk}>{privacyRiskLabels[risk]}</option>)}
                </select>
                <ChevronDown aria-hidden="true" size={16} />
              </span>
            </label>
            <label>
              <span>publication policy</span>
              <span className={styles.selectWrap}>
                <select value={draft.privacy.publicationPolicy} onChange={(event) => updatePrivacy({ publicationPolicy: event.target.value as MaterialIntakeDraft["privacy"]["publicationPolicy"] })}>
                  <option value="local-only">local-only · 默认</option>
                  <option value="structured-excerpts-only">仅未来结构化摘录</option>
                </select>
                <ChevronDown aria-hidden="true" size={16} />
              </span>
            </label>
          </div>

          <div className={styles.reviewChecks}>
            <label><input type="checkbox" checked={draft.review.fileIdentityConfirmed} disabled={!draft.batch} onChange={(event) => updateReview("fileIdentityConfirmed", event.target.checked)} /><span>我已核对 SHA 身份、批次重复和当前 {knownAssets.length} 个结构化目录 asset 的比对结果。</span></label>
            <label><input type="checkbox" checked={draft.review.provenanceConfirmed} disabled={!draft.batch} onChange={(event) => updateReview("provenanceConfirmed", event.target.checked)} /><span>我已确认课程、来源类型、申报 authority、学校 / 教师 / 学年 / 学期及来源家庭；`待确认` 不会被补造。</span></label>
            <label><input type="checkbox" checked={draft.review.privacyPublicationConfirmed} disabled={!validation.readyForHumanConfirmation} onChange={(event) => updateReview("privacyPublicationConfirmed", event.target.checked)} /><span>我已确认隐私与 publication policy；原始二进制仍不进入 public 或浏览器持久存储。</span></label>
            <label><input type="checkbox" checked={draft.review.noModelTransferConfirmed} disabled={!draft.batch} onChange={(event) => updateReview("noModelTransferConfirmed", event.target.checked)} /><span>我理解本批未授权发送模型；通过 intake gate 也不会自动调用 DashScope。</span></label>
          </div>

          {draft.status === "eligible-for-course-builder" ? (
            <>
              <div className={styles.passedState}>
                <ShieldCheck aria-hidden="true" size={25} />
                <div><strong>身份与来源审核已完成</strong><p>本批只形成结构化身份记录；正文尚未解析，也没有进入现有 Course Builder、模型或课程注册表。</p></div>
              </div>
              <div className={styles.nextGate}>
                <LockKeyhole aria-hidden="true" size={21} />
                <div><span>NEXT GATE · DOCX PILOT</span><strong>明确授权后，在浏览器本地解析 DOCX</strong><p>刷新后仍需重新选择同一 SHA 原件；PDF、旧版 Word、PPT 和图片继续保持待解析。</p></div>
                <em>人工启动</em>
              </div>
            </>
          ) : (
            <button
              className={styles.confirmButton}
              disabled={!validation.readyForHumanConfirmation || !reviewChecksComplete}
              onClick={confirmDraft}
              type="button"
            >
              <Check aria-hidden="true" size={18} /> 完成身份与来源审核
            </button>
          )}

          {!validation.readyForHumanConfirmation ? (
            <div className={styles.blockers}>
              <CircleAlert aria-hidden="true" size={18} />
              <div><strong>仍需处理</strong><ul>{validation.issues.filter((issue) => issue.code !== "review-required").map((issue) => <li key={`${issue.path}-${issue.code}`}>{issue.message}</li>)}</ul></div>
            </div>
          ) : null}

          <div className={styles.boundaryLedger}>
            <article><FileClock aria-hidden="true" size={18} /><div><strong>解析状态</strong><span>待解析 · ocr-pending · 内容冲突 pending-review</span></div></article>
            <article><LockKeyhole aria-hidden="true" size={18} /><div><strong>传输状态</strong><span>browser-memory-only · model not-authorized</span></div></article>
          </div>
        </div>
      </div>

      {draft.status === "eligible-for-course-builder" ? (
        <DocxParsingReview
          approvedOverlayIds={approvedOverlayIds}
          candidates={docxCandidates}
          courseOptions={parsingCourseOptions}
          intakeDraft={draft}
          onApproveOverlay={onApproveOverlay}
          onReauthorize={reauthorizeCandidate}
          onRevokeOverlay={onRevokeOverlay}
          sessionFiles={sessionFiles}
        />
      ) : null}
    </section>
  );
}
