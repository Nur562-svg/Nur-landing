"use client";

import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  Check,
  ChevronDown,
  CircleAlert,
  Download,
  FileArchive,
  FileCheck2,
  Fingerprint,
  Link2,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import {
  approveMaterialAdmissionRecord,
  createMaterialAdmissionExport,
  createMaterialAdmissionRecord,
  getMaterialAdmissionStorageSnapshot,
  parseMaterialAdmissionStoreJson,
  saveMaterialAdmissionRecord,
  subscribeToMaterialAdmission,
  validateMaterialAdmissionRecord,
} from "@/lib/material-admission";
import type {
  MaterialAdmissionConflictReview,
  MaterialAdmissionHumanReview,
  MaterialAdmissionRecord,
} from "@/types/material-admission";
import type { MaterialIntakeDimension } from "@/types/material-intake";
import type { ReviewedMaterialOverlayDraft } from "@/types/material-parsing";
import styles from "./material-admission-review.module.css";
import type { UserQuotas } from "@/lib/quotas";

type MaterialAdmissionReviewProps = {
  overlays: readonly ReviewedMaterialOverlayDraft[];
};

type MaterialAdmissionCandidateProps = {
  existingRecord: MaterialAdmissionRecord | null;
  overlay: ReviewedMaterialOverlayDraft;
};

const sourceTypeLabels = {
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
} as const;

function formatBytes(value: number) {
  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(value < 10 * 1024 ? 1 : 0)} KiB`;
  }
  return `${(value / (1024 * 1024)).toFixed(1)} MiB`;
}

function dimensionLabel(value: MaterialIntakeDimension) {
  return value.status === "declared" ? value.value : "待确认";
}

function admissionDownloadHref(record: MaterialAdmissionRecord) {
  const exportRecord = createMaterialAdmissionExport(record);
  return `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportRecord, null, 2))}`;
}

function MaterialAdmissionCandidate({
  existingRecord,
  overlay,
}: MaterialAdmissionCandidateProps) {
  const [record, setRecord] = useState<MaterialAdmissionRecord>(() => (
    existingRecord ?? createMaterialAdmissionRecord(overlay)
  ));
  const [notice, setNotice] = useState<string | null>(null);
  const validation = useMemo(() => validateMaterialAdmissionRecord(record), [record]);

  function updateConflict(status: MaterialAdmissionConflictReview["status"]) {
    if (status === "pending-review") {
      setRecord((current) => ({
        ...current,
        conflictReview: { status, note: "" },
        review: {
          ...current.review,
          conflictDispositionConfirmed: false,
        },
      }));
      return;
    }
    setRecord((current) => ({
      ...current,
      conflictReview: status === "none-observed"
        ? { status, note: "人工审核未观察到内容冲突。" }
        : { status, note: "" },
      review: {
        ...current.review,
        conflictDispositionConfirmed: false,
      },
    }));
  }

  function updateConflictNote(note: string) {
    setRecord((current) => ({
      ...current,
      conflictReview: {
        status: "unresolved-conflict-recorded",
        note,
      },
      review: {
        ...current.review,
        conflictDispositionConfirmed: false,
      },
    }));
  }

  function updateReview(
    field: keyof Pick<
      MaterialAdmissionHumanReview,
      | "fileIdentityConfirmed"
      | "provenanceConfirmed"
      | "acceptedTranscriptionConfirmed"
      | "privacyPublicationConfirmed"
      | "sourceFamilyArtifactConfirmed"
      | "conflictDispositionConfirmed"
      | "learnerPrivateAuthorityConfirmed"
      | "independentRightsGateConfirmed"
    >,
    checked: boolean,
  ) {
    setRecord((current) => ({
      ...current,
      authorityReview: field === "learnerPrivateAuthorityConfirmed"
        ? {
            ...current.authorityReview,
            status: checked ? "confirmed-learner-private-only" : "pending-review",
          }
        : current.authorityReview,
      review: {
        ...current.review,
        [field]: checked,
        status: "pending-review",
        approvedAt: null,
      },
      status: "pending-review",
      updatedAt: new Date().toISOString(),
    }));
  }

  function approveCandidate() {
    try {
      const approved = approveMaterialAdmissionRecord(record);
      saveMaterialAdmissionRecord(approved);
      setRecord(approved);
      setNotice("已保存为 approved-as-local-candidate；仍未授予 Course Builder、模型传输、课程写入或发布权。");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "准入批准失败。");
    }
  }

  const conflictReady = record.conflictReview.status === "none-observed"
    || (record.conflictReview.status === "unresolved-conflict-recorded"
      && record.conflictReview.note.trim().length > 0);
  const alreadyApproved = record.status === "approved-as-local-candidate";

  return (
    <div className={styles.candidateReview}>
      <div className={styles.candidateHeading}>
        <div>
          <span>ADMISSION CANDIDATE · MEMORY UNTIL APPROVED</span>
          <h3>{record.sourceTrace.courseTitle} · {record.sourceTrace.knowledgePointTitle}</h3>
          <p>候选来自已人工接纳的 DOCX overlay；原文件名不进入准入记录。</p>
        </div>
        <span className={alreadyApproved ? styles.approvedBadge : styles.pendingBadge}>
          {alreadyApproved ? "APPROVED · LOCAL CANDIDATE" : "PENDING · NOT STORED"}
        </span>
      </div>

      <div className={styles.identityGrid}>
        <article>
          <Fingerprint aria-hidden="true" size={18} />
          <div><span>完整 SHA-256</span><code>{record.identity.asset.sha256}</code></div>
        </article>
        <article>
          <FileArchive aria-hidden="true" size={18} />
          <div><span>MIME / 大小</span><strong>{record.identity.asset.mimeType}</strong><small>{formatBytes(record.identity.asset.byteSize)} · word</small></div>
        </article>
        <article>
          <Link2 aria-hidden="true" size={18} />
          <div><span>来源链</span><strong>{sourceTypeLabels[record.provenance.sourceType]} · {record.provenance.declaredAuthority}</strong><small>{dimensionLabel(record.provenance.school)} · {dimensionLabel(record.provenance.academicYear)} · {dimensionLabel(record.provenance.semester)}</small></div>
        </article>
        <article>
          <PackageCheck aria-hidden="true" size={18} />
          <div><span>family / artifact</span><strong>{record.catalogCandidate.sourceFamily.label}</strong><small>original · not-applicable derivation</small></div>
        </article>
      </div>

      <details className={styles.excerptLedger}>
        <summary>
          <ChevronDown aria-hidden="true" size={16} />
          <div><strong>审核已接纳 transcription 与 locators</strong><span>{record.acceptedTranscription.excerpts.length} 条 · 只含 accepted 正文</span></div>
        </summary>
        <div className={styles.excerptList}>
          {record.acceptedTranscription.excerpts.map((excerpt) => {
            const locator = record.acceptedTranscription.locators.find((item) => item.id === excerpt.locatorId);
            return (
              <article key={excerpt.id}>
                <div><span>{locator?.label ?? excerpt.locatorId}</span><em>{excerpt.sectionTitle} · {excerpt.kind}</em></div>
                <p>{excerpt.text}</p>
              </article>
            );
          })}
        </div>
      </details>

      <div className={styles.reviewGrid}>
        <fieldset className={styles.conflictFieldset}>
          <legend>内容冲突审核</legend>
          <label><input checked={record.conflictReview.status === "none-observed"} disabled={alreadyApproved} name={`conflict-${record.id}`} onChange={() => updateConflict("none-observed")} type="radio" /><span>本次接纳摘录未观察到冲突</span></label>
          <label><input checked={record.conflictReview.status === "unresolved-conflict-recorded"} disabled={alreadyApproved} name={`conflict-${record.id}`} onChange={() => updateConflict("unresolved-conflict-recorded")} type="radio" /><span>存在未解决冲突，保留为本地候选</span></label>
          {record.conflictReview.status === "unresolved-conflict-recorded" ? (
            <textarea aria-label="记录未解决内容冲突" disabled={alreadyApproved} onChange={(event) => updateConflictNote(event.target.value)} placeholder="说明冲突来自哪些已接纳摘录；不得替材料裁决答案。" rows={3} value={record.conflictReview.note} />
          ) : null}
        </fieldset>

        <div className={styles.boundaryLedger}>
          <article><ShieldCheck aria-hidden="true" size={18} /><div><strong>{record.privacyPublication.risk}</strong><span>{record.privacyPublication.publicationPolicy} · raw binary session-only</span></div></article>
          <article><LockKeyhole aria-hidden="true" size={18} /><div><strong>learner-private only</strong><span>申报 {record.authorityReview.declaredAuthority} 不获得权威升级</span></div></article>
          <article><CircleAlert aria-hidden="true" size={18} /><div><strong>独立权利门</strong><span>Builder / model / publication / registry 均 not-authorized</span></div></article>
        </div>
      </div>

      {!alreadyApproved ? (
        <div className={styles.reviewChecks}>
          <label><input checked={record.review.fileIdentityConfirmed} onChange={(event) => updateReview("fileIdentityConfirmed", event.target.checked)} type="checkbox" /><span>我已核对完整 SHA-256、MIME 与字节大小；记录不保存原文件名、路径或 File handle。</span></label>
          <label><input checked={record.review.provenanceConfirmed} onChange={(event) => updateReview("provenanceConfirmed", event.target.checked)} type="checkbox" /><span>我已核对课程、知识点、来源类型及学校 / 教师 / 学年 / 学期维度；待确认仍保持待确认。</span></label>
          <label><input checked={record.review.acceptedTranscriptionConfirmed} onChange={(event) => updateReview("acceptedTranscriptionConfirmed", event.target.checked)} type="checkbox" /><span>我已展开核对所有 accepted transcription 与 locator；pending / excluded 正文不会写入记录或导出。</span></label>
          <label><input checked={record.review.privacyPublicationConfirmed} onChange={(event) => updateReview("privacyPublicationConfirmed", event.target.checked)} type="checkbox" /><span>我已核对隐私与 publication policy；原始二进制继续只在当前会话。</span></label>
          <label><input checked={record.review.sourceFamilyArtifactConfirmed} onChange={(event) => updateReview("sourceFamilyArtifactConfirmed", event.target.checked)} type="checkbox" /><span>我已核对 MaterialAsset、MaterialSourceFamily 与 MaterialArtifact 候选的互相引用。</span></label>
          <label><input checked={record.review.conflictDispositionConfirmed} disabled={!conflictReady} onChange={(event) => updateReview("conflictDispositionConfirmed", event.target.checked)} type="checkbox" /><span>我确认上述冲突审核结果；未解决冲突不会被准入流程自动裁决。</span></label>
          <label><input checked={record.review.learnerPrivateAuthorityConfirmed} onChange={(event) => updateReview("learnerPrivateAuthorityConfirmed", event.target.checked)} type="checkbox" /><span>我确认有效 authority 只到 learner-private，不升级为教师、学校、出版社或 NUR 官方真相。</span></label>
          <label><input checked={record.review.independentRightsGateConfirmed} onChange={(event) => updateReview("independentRightsGateConfirmed", event.target.checked)} type="checkbox" /><span>我理解批准与 JSON 导出都不会授予 Course Builder 使用、模型传输、课程写入或发布权。</span></label>
        </div>
      ) : null}

      {notice ? <p aria-live="polite" className={styles.notice}>{notice}</p> : null}

      {alreadyApproved ? (
        <div className={styles.approvedState}>
          <FileCheck2 aria-hidden="true" size={22} />
          <div><strong>approved-as-local-candidate</strong><span>{record.review.approvedAt ? new Date(record.review.approvedAt).toLocaleString("zh-CN") : "批准时间待恢复"} · 严格浏览器本地记录</span></div>
          <a download={`${record.id}.json`} href={admissionDownloadHref(record)}><Download aria-hidden="true" size={14} />导出可审计 JSON</a>
        </div>
      ) : (
        <div className={styles.approvalFooter}>
          <div><strong>{validation.readyForApproval ? "八项审核完成" : `还需处理 ${validation.issues.length} 项`}</strong><span>批准前候选只在当前 React 内存，不写入 localStorage。</span></div>
          <button disabled={!validation.readyForApproval} onClick={approveCandidate} type="button"><Check aria-hidden="true" size={16} />批准为本地准入候选</button>
        </div>
      )}
    </div>
  );
}

export function MaterialAdmissionReview({ overlays }: MaterialAdmissionReviewProps) {
  const storageSnapshot = useSyncExternalStore(
    subscribeToMaterialAdmission,
    getMaterialAdmissionStorageSnapshot,
    () => null,
  );
  const store = useMemo(
    () => parseMaterialAdmissionStoreJson(storageSnapshot),
    [storageSnapshot],
  );
  const [selectedOverlayId, setSelectedOverlayId] = useState("");
  const [admissionQuotas, setAdmissionQuotas] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const selectedOverlay = overlays.find((overlay) => overlay.id === selectedOverlayId)
    ?? overlays.at(-1)
    ?? null;
  const existingRecord = selectedOverlay
    ? store.records.find((record) => record.sourceTrace.overlayId === selectedOverlay.id) ?? null
    : null;

  return (
    <section className={styles.admission} aria-labelledby="material-admission-title">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIndex}>03</div>
        <div>
          <p>MATERIAL ADMISSION · VERSION 1</p>
          <h2 id="material-admission-title">证据门控材料准入记录</h2>
          <span>从已人工审核的 DOCX overlay 建立候选；批准后才持久化为本地结构化记录。</span>
        </div>
        <div className={styles.localBadge}>
          <ShieldCheck aria-hidden="true" size={18} />
          <div><strong>{store.records.length} 条已批准</strong><span>browser-local · exportable</span></div>
        </div>
        {admissionQuotas && (
          <div style={{fontSize: "10px", color: "#666", marginLeft: 8}}>
            私人材料配额: {admissionQuotas?.quotas?.privateMaterials?.used ?? 0} / {admissionQuotas?.quotas?.privateMaterials?.limit === "unlimited" ? "∞" : admissionQuotas?.quotas?.privateMaterials?.limit}
          </div>
        )}
      </div>

      {overlays.length > 0 ? (
        <>
          {overlays.length > 1 ? (
            <label className={styles.overlaySelect}>
              <span>选择已审核 overlay</span>
              <span><select value={selectedOverlay?.id ?? ""} onChange={(event) => setSelectedOverlayId(event.target.value)}>{overlays.map((overlay) => <option key={overlay.id} value={overlay.id}>{overlay.courseTitle} · {overlay.knowledgePointTitle} · {overlay.excerpts.length} 条摘录</option>)}</select><ChevronDown aria-hidden="true" size={15} /></span>
            </label>
          ) : null}
          {selectedOverlay ? (
            <MaterialAdmissionCandidate
              existingRecord={existingRecord}
              key={`${selectedOverlay.id}-${existingRecord?.updatedAt ?? "draft"}`}
              overlay={selectedOverlay}
            />
          ) : null}
        </>
      ) : (
        <div className={styles.emptyState}>
          <LockKeyhole aria-hidden="true" size={23} />
          <div><strong>等待已人工审核的 DOCX overlay</strong><span>先在上方完成本地解析、accepted 摘录与当前会话 overlay 批准；原始文件仍不会持久化。</span></div>
        </div>
      )}

      {store.records.length > 0 ? (
        <div className={styles.restoredRecords}>
          <div className={styles.recordsHeading}><span>RESTORED APPROVED RECORDS</span><strong>刷新后可恢复的本地准入记录</strong></div>
          {store.records.map((record) => (
            <article key={record.id}>
              <FileCheck2 aria-hidden="true" size={18} />
              <div><strong>{record.sourceTrace.courseTitle} · {record.sourceTrace.knowledgePointTitle}</strong><span>{record.acceptedTranscription.excerpts.length} 条 accepted transcription · {record.identity.asset.sha256.slice(0, 16)}…</span></div>
              <em>approved-as-local-candidate</em>
              <a aria-label={`导出 ${record.sourceTrace.knowledgePointTitle} 的材料准入 JSON`} download={`${record.id}.json`} href={admissionDownloadHref(record)}><Download aria-hidden="true" size={13} />JSON</a>
            </article>
          ))}
          <p>导出包显式记录：不授予 Course Builder 使用权、不授权模型传输、不授予课程写入或发布权。</p>
        </div>
      ) : null}
    </section>
  );
}
