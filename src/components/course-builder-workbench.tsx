"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Cloud,
  Download,
  FileCheck2,
  LoaderCircle,
  Play,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import {
  countPrivateOverlayCharacters,
  createPrivateOverlayBuildInput,
  createPrivateMaterialAnalysisAuthorization,
  maximumPrivateOverlayCharacterCount,
  maximumPrivateOverlayExcerptCount,
} from "@/lib/course-builder/private-overlay-contract";
import { recordConfirmedAttempt, proposeReviewTaskForAttempt, acceptReviewTask, declineReviewTask, selectCurrentReviewTask } from "@/lib/learning-memory";
import type { ConfirmedAttemptInput } from "@/lib/learning-memory";
import { useLearningMemory } from "@/hooks/use-learning-memory";
import type {
  CourseBuilderApiResponse,
  CourseBuildMaterialPackSummary,
  CourseBuildMode,
  CourseDraft,
  PrivateMaterialAnalysisAuthorization,
  PrivateMaterialAnalysisResult,
  PrivateMaterialLearningQuestion,
  PrivateMaterialLearningUnitDraft,
} from "@/types/course-builder";
import type {
  MaterialIntakeCourseOption,
  MaterialIntakeKnownAssetIdentity,
} from "@/types/material-intake";
import type {
  MaterialParsingCourseOption,
  ReviewedMaterialOverlayDraft,
} from "@/types/material-parsing";
import { MaterialAdmissionReview } from "./material-admission-review";
import { recordCourseBuildUsage } from "@/lib/quotas";
import type { UserQuotas } from "@/lib/quotas";
import { MaterialIntakeReview } from "./material-intake-review";
import styles from "./course-builder-workbench.module.css";

type CourseBuilderStatusResponse = {
  version: 1;
  runtimeAvailable: boolean;
  configured: boolean;
  provider: { id: string; model: string } | null;
  defaultModel: string;
  materialPacks: readonly CourseBuildMaterialPackSummary[];
  baselineAvailable: boolean;
};

type LocalApprovalRecord = {
  version: 1;
  draftId: string;
  materialPackId: string;
  approvedAt: string;
  status: "approved-for-local-preview";
};

const approvalStorageKey = "nur-learn:course-builder-approval:v1";
const privateAnalysisSessionStorageKey = "nur-learn:private-material-analysis:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPrivateAnalysisSessionResult(
  value: unknown,
): value is PrivateMaterialAnalysisResult {
  if (!isRecord(value)
    || value.version !== 1
    || value.status !== "private-material-analysis"
    || typeof value.createdAt !== "string"
    || !isRecord(value.providerAssist)
    || value.providerAssist.status !== "used"
    || !isRecord(value.providerAssist.provider)
    || value.providerAssist.provider.id !== "dashscope"
    || typeof value.providerAssist.provider.model !== "string"
    || !isRecord(value.coverage)
    || !["partial", "unmapped"].includes(String(value.coverage.status))
    || value.coverage.compilationReadiness !== "insufficient-for-full-course"
    || !isRecord(value.learningUnit)
    || value.learningUnit.kind !== "private-material-learning-unit"
    || value.learningUnit.visibility !== "private-current-session"
    || !Array.isArray(value.learningUnit.topics)
    || !Array.isArray(value.learningUnit.questions)
    || !Array.isArray(value.learningUnit.unmapped)
    || !Array.isArray(value.learningUnit.conflicts)
    || !Array.isArray(value.learningUnit.missingFacts)
    || !isRecord(value.learningUnit.rights)
    || value.learningUnit.rights.publication !== "not-authorized"
    || value.learningUnit.rights.materialCatalogMutation !== "not-authorized"
    || value.learningUnit.rights.courseRegistryMutation !== "not-authorized"
    || value.learningUnit.rights.officialCourseCompilation !== "not-authorized"
  ) {
    return false;
  }
  return value.learningUnit.questions.every((question) => (
    isRecord(question)
    && typeof question.id === "string"
    && typeof question.normalizedPrompt === "string"
    && Array.isArray(question.sourceExcerptIds)
    && isRecord(question.promptAuthority)
    && question.promptAuthority.layer === "learner-private"
    && question.promptAuthority.status === "pending-review"
    && isRecord(question.generatedReferenceAnswer)
    && question.generatedReferenceAnswer.authority === "nur-qwen-generated"
    && isRecord(question.generatedReferenceAnswer.variants)
    && typeof question.generatedReferenceAnswer.variants.concise === "string"
    && typeof question.generatedReferenceAnswer.variants.exam === "string"
    && typeof question.generatedReferenceAnswer.variants.expanded === "string"
    && question.scoringAuthority === "not-provided"
  ));
}

function isStatusResponse(value: unknown): value is CourseBuilderStatusResponse {
  return typeof value === "object"
    && value !== null
    && "version" in value
    && value.version === 1
    && "runtimeAvailable" in value
    && value.runtimeAvailable === true
    && "configured" in value
    && typeof value.configured === "boolean"
    && "materialPacks" in value
    && Array.isArray(value.materialPacks);
}

function formatBuildTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function providerLabel(draft: CourseDraft) {
  const provider = draft.providerAssist.provider;
  if (draft.providerAssist.status === "used" && provider) {
    return `${provider.id} · ${provider.model}`;
  }
  if (draft.providerAssist.status === "failed" && provider) {
    return `${provider.model} 失败后回退`;
  }
  if (draft.providerAssist.status === "skipped") {
    return "本地基准 · 主动跳过模型";
  }
  return "本地基准 · 未发送云端";
}

type CourseBuilderWorkbenchProps = {
  intakeCourseOptions: readonly MaterialIntakeCourseOption[];
  intakeParsingCourseOptions: readonly MaterialParsingCourseOption[];
  knownMaterialAssets: readonly MaterialIntakeKnownAssetIdentity[];
};

export function CourseBuilderWorkbench({
  intakeCourseOptions,
  intakeParsingCourseOptions,
  knownMaterialAssets,
}: CourseBuilderWorkbenchProps) {
  const [status, setStatus] = useState<CourseBuilderStatusResponse | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [selectedPackId, setSelectedPackId] = useState("");
  const [mode, setMode] = useState<CourseBuildMode>("provider-preferred");
  const [draft, setDraft] = useState<CourseDraft | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PrivateMaterialAnalysisResult | null>(null);
  const [analysisSessionLoaded, setAnalysisSessionLoaded] = useState(false);
  const [buildError, setBuildError] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);
  const [sourceReviewConfirmed, setSourceReviewConfirmed] = useState(false);
  const [authorityConfirmed, setAuthorityConfirmed] = useState(false);
  const [previewBoundaryConfirmed, setPreviewBoundaryConfirmed] = useState(false);
  const [approval, setApproval] = useState<LocalApprovalRecord | null>(null);
  const [privateOverlays, setPrivateOverlays] = useState<readonly ReviewedMaterialOverlayDraft[]>([]);
  const [transferPanelOpen, setTransferPanelOpen] = useState(false);
  const [transferConfirmed, setTransferConfirmed] = useState(false);
  const [transferAuthorization, setTransferAuthorization] = useState<PrivateMaterialAnalysisAuthorization | null>(null);
  const [authorizingTransfer, setAuthorizingTransfer] = useState(false);
  const [answerVariants, setAnswerVariants] = useState<Record<string, "concise" | "exam" | "expanded">>({});

  // Private learning actions state (browser-local, reuses existing memory contracts)
  const [privateDrafts, setPrivateDrafts] = useState<Record<string, string>>({});
  const [privateFavorites, setPrivateFavorites] = useState<Record<string, boolean>>({});
  const [privateConfirmed, setPrivateConfirmed] = useState<Record<string, { id: string; at: string }>>({});
  const [privateShowFavoritesOnly, setPrivateShowFavoritesOnly] = useState(false);

  // M3 quota for builder
  const [builderQuotas, setBuilderQuotas] = useState<UserQuotas | null>(null);

  const memoryState = useLearningMemory();

  useEffect(() => {
    if (!analysisSessionLoaded) {
      return;
    }
    if (!analysisResult) {
      setPrivateDrafts({});
      setPrivateFavorites({});
      setPrivateConfirmed({});
      setPrivateShowFavoritesOnly(false);
      return;
    }
    const currentQids = new Set(analysisResult.learningUnit.questions.map((q) => q.id));
    const unitKey = `${analysisResult.learningUnit.courseId}::${analysisResult.learningUnit.knowledgePointId}`;
    try {
      const practiceKey = `${privateAnalysisSessionStorageKey}:practice`;
      const stored = window.sessionStorage.getItem(practiceKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object" && parsed.unitKey === unitKey) {
          const restoredDrafts: Record<string, string> = {};
          const restoredFavs: Record<string, boolean> = {};
          if (parsed.drafts && typeof parsed.drafts === "object") {
            Object.entries(parsed.drafts).forEach(([k, v]) => {
              if (currentQids.has(k) && typeof v === "string") restoredDrafts[k] = v;
            });
          }
          if (parsed.favorites && typeof parsed.favorites === "object") {
            Object.entries(parsed.favorites).forEach(([k, v]) => {
              if (currentQids.has(k)) restoredFavs[k] = !!v;
            });
          }
          setPrivateDrafts(restoredDrafts);
          setPrivateFavorites(restoredFavs);
        } else {
          // stale or cross-unit practice data: start fresh for this unit
          setPrivateDrafts({});
          setPrivateFavorites({});
        }
      }
    } catch {}
    const fromMemory: Record<string, { id: string; at: string }> = {};
    memoryState.attempts.forEach((att) => {
      if (att.taskId && att.taskId.startsWith("private-")) {
        const qid = att.taskId.slice(8);
        if (currentQids.has(qid)) {
          fromMemory[qid] = { id: att.id, at: att.confirmedAt };
        }
      }
    });
    setPrivateConfirmed(fromMemory);
  }, [analysisSessionLoaded, analysisResult, memoryState.attempts]);

  useEffect(() => {
    if (!analysisSessionLoaded || !analysisResult) return;
    const unitKey = `${analysisResult.learningUnit.courseId}::${analysisResult.learningUnit.knowledgePointId}`;
    try {
      const practiceKey = `${privateAnalysisSessionStorageKey}:practice`;
      window.sessionStorage.setItem(practiceKey, JSON.stringify({ unitKey, drafts: privateDrafts, favorites: privateFavorites }));
    } catch {}
  }, [privateDrafts, privateFavorites, analysisSessionLoaded, analysisResult]);

  useEffect(() => {
    let active = true;
    async function loadStatus() {
      try {
        const response = await fetch("/api/course-builder", { cache: "no-store" });
        const payload: unknown = await response.json();
        if (!response.ok || !isStatusResponse(payload)) {
          throw new Error("Course Builder status unavailable");
        }
        if (active) {
          setStatus(payload);
          setSelectedPackId(payload.materialPacks[0]?.id ?? "");
        }
      } catch {
        if (active) {
          setStatusError("构建器状态暂时不可用，请确认本地开发服务仍在运行。");
        }
      }
    }
    void loadStatus();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    // M3: fetch quotas for soft gate
    fetch("/api/auth/quotas", { credentials: "include" })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { const data = d as { ok?: boolean; quotas?: UserQuotas } | null; if (data?.ok && data.quotas) setBuilderQuotas(data.quotas); })
      .catch(() => {});
    try {
      const storedResult = window.sessionStorage.getItem(privateAnalysisSessionStorageKey);
      if (storedResult) {
        const parsedResult: unknown = JSON.parse(storedResult);
        if (isPrivateAnalysisSessionResult(parsedResult)) {
          setAnalysisResult(parsedResult);
        } else {
          window.sessionStorage.removeItem(privateAnalysisSessionStorageKey);
        }
      }
    } catch {
      window.sessionStorage.removeItem(privateAnalysisSessionStorageKey);
    } finally {
      setAnalysisSessionLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!analysisSessionLoaded) {
      return;
    }
    if (analysisResult) {
      window.sessionStorage.setItem(
        privateAnalysisSessionStorageKey,
        JSON.stringify(analysisResult),
      );
    } else {
      window.sessionStorage.removeItem(privateAnalysisSessionStorageKey);
    }
  }, [analysisResult, analysisSessionLoaded]);

  const selectedPack = status?.materialPacks.find((pack) => pack.id === selectedPackId) ?? null;
  const selectedOverlay = privateOverlays.find((overlay) => overlay.id === selectedPackId) ?? null;
  const selectedOverlayBasePack = selectedOverlay
    ? status?.materialPacks.find((pack) => pack.courseId === selectedOverlay.courseId) ?? null
    : null;
  const privateOverlayInput = selectedOverlay
    ? createPrivateOverlayBuildInput(selectedOverlay)
    : null;
  const privateOverlayCharacterCount = privateOverlayInput
    ? countPrivateOverlayCharacters(privateOverlayInput)
    : selectedOverlay?.excerpts.reduce((total, excerpt) => total + excerpt.text.length, 0) ?? 0;
  const privateOverlayWithinLimits = Boolean(
    selectedOverlay
    && selectedOverlay.excerpts.length <= maximumPrivateOverlayExcerptCount
    && privateOverlayCharacterCount <= maximumPrivateOverlayCharacterCount,
  );
  const privateProviderReady = Boolean(
    status?.configured
    && status.provider?.id === "dashscope"
    && status.provider.model,
  );
  const transferAuthorizationReady = Boolean(
    transferAuthorization
    && privateOverlayInput
    && status?.provider
    && transferAuthorization.overlayId === privateOverlayInput.overlayId
    && transferAuthorization.courseId === privateOverlayInput.courseId
    && transferAuthorization.knowledgePointId === privateOverlayInput.knowledgePointId
    && transferAuthorization.excerptCount === privateOverlayInput.excerpts.length
    && transferAuthorization.characterCount === privateOverlayCharacterCount
    && transferAuthorization.provider === status.provider.id
    && transferAuthorization.model === status.provider.model,
  );
  const approvalReady = Boolean(
    draft
    && draft.validation.valid
    && sourceReviewConfirmed
    && authorityConfirmed
    && previewBoundaryConfirmed,
  );
  const detailedLessonPercent = useMemo(() => {
    if (!draft || draft.coverage.knowledgePointCount === 0) {
      return 0;
    }
    return Math.round(
      (draft.coverage.detailedLessonCount / draft.coverage.knowledgePointCount) * 100,
    );
  }, [draft]);
  const draftDownloadHref = useMemo(() => {
    if (!draft) {
      return null;
    }
    return `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(draft, null, 2))}`;
  }, [draft]);
  const analysisDownloadHref = useMemo(() => {
    if (!analysisResult) {
      return null;
    }
    return `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(analysisResult, null, 2))}`;
  }, [analysisResult]);

  function resetTransferAuthorization() {
    setTransferPanelOpen(false);
    setTransferConfirmed(false);
    setTransferAuthorization(null);
    setAuthorizingTransfer(false);
  }

  async function authorizePrivateTransfer() {
    if (!privateOverlayInput
      || !status?.provider
      || status.provider.id !== "dashscope"
      || !privateProviderReady
      || !privateOverlayWithinLimits
      || !transferConfirmed
      || authorizingTransfer
    ) {
      return;
    }
    setAuthorizingTransfer(true);
    try {
      const authorization = await createPrivateMaterialAnalysisAuthorization(
        privateOverlayInput,
        { id: "dashscope", model: status.provider.model },
      );
      setTransferAuthorization(authorization);
    } finally {
      setAuthorizingTransfer(false);
    }
  }

  async function runBuild() {
    if (building) {
      return;
    }
    // M3 更多门控: 客户端预检
    if (builderQuotas && builderQuotas.quotas.courseBuilds.isOverLimit && builderQuotas.tier !== "pro") {
      setBuildError("构建配额已达上限（免费版）。请升级 Pro 或等待周期重置（演示）。");
      return;
    }
    if (!selectedPackId) {
      setBuildError("尚未选择可执行的材料输入。");
      return;
    }
    let requestBody: Record<string, unknown>;
    if (selectedOverlay) {
      if (!privateOverlayInput
        || !transferAuthorization
        || !transferAuthorizationReady
      ) {
        setBuildError(!privateOverlayInput
          ? "私人摘录的隐私边界未通过，不能发起分析。"
          : "一次性私人分析授权尚未就绪或已失效，请重新检查发送清单。"
        );
        return;
      }
      requestBody = {
        version: 1,
        kind: "private-material-analysis",
        mode: "provider-required",
        privateOverlay: privateOverlayInput,
        authorization: transferAuthorization,
      };
      setTransferAuthorization(null);
      setTransferConfirmed(false);
    } else {
      requestBody = {
        version: 1,
        materialPackId: selectedPackId,
        mode,
      };
    }
    setBuilding(true);
    setBuildError(null);
    setDraft(null);
    setAnalysisResult(null);
    setAnswerVariants({});
    setApproval(null);
    setSourceReviewConfirmed(false);
    setAuthorityConfirmed(false);
    setPreviewBoundaryConfirmed(false);
    try {
      const response = await fetch("/api/course-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const payload = await response.json() as CourseBuilderApiResponse;
      if (!response.ok || payload.status === "error") {
        throw new Error(payload.status === "error" ? payload.message : "请求失败");
      }
      if (payload.status === "private-material-analysis") {
        recordCourseBuildUsage();
        setAnalysisResult(payload);
      } else {
        setDraft(payload.draft);
      }
    } catch (error) {
      setBuildError(error instanceof Error ? error.message : "本次请求失败");
    } finally {
      setBuilding(false);
    }
  }

  function approveDraft() {
    if (!draft || !approvalReady) {
      return;
    }
    const record: LocalApprovalRecord = {
      version: 1,
      draftId: draft.id,
      materialPackId: draft.materialPack.id,
      approvedAt: new Date().toISOString(),
      status: "approved-for-local-preview",
    };
    window.localStorage.setItem(approvalStorageKey, JSON.stringify(record));
    setApproval(record);
  }

  function resetBuild() {
    setDraft(null);
    setAnalysisResult(null);
    setBuildError(null);
    setAnswerVariants({});
    setApproval(null);
    setSourceReviewConfirmed(false);
    setAuthorityConfirmed(false);
    setPreviewBoundaryConfirmed(false);
    setPrivateDrafts({});
    setPrivateFavorites({});
    setPrivateConfirmed({});
    setPrivateShowFavoritesOnly(false);
  }

  function approvePrivateOverlay(overlay: ReviewedMaterialOverlayDraft) {
    resetTransferAuthorization();
    setPrivateOverlays((current) => [
      ...current.filter((item) => item.id !== overlay.id),
      overlay,
    ]);
    setSelectedPackId(overlay.id);
    setMode("provider-preferred");
    resetBuild();
  }

  function revokePrivateOverlay(overlayId: string) {
    resetTransferAuthorization();
    setPrivateOverlays((current) => current.filter((overlay) => overlay.id !== overlayId));
    if (selectedPackId === overlayId) {
      setSelectedPackId(status?.materialPacks[0]?.id ?? "");
    }
  }

  function invalidatePrivateOverlays() {
    resetTransferAuthorization();
    setPrivateOverlays([]);
    if (privateOverlays.some((overlay) => overlay.id === selectedPackId)) {
      setSelectedPackId(status?.materialPacks[0]?.id ?? "");
    }
    resetBuild();
  }

  function changeMaterialInput(materialInputId: string) {
    resetTransferAuthorization();
    setSelectedPackId(materialInputId);
    if (privateOverlays.some((overlay) => overlay.id === materialInputId)) {
      setMode("provider-preferred");
    }
    resetBuild();
  }

  // Private learning actions: reuse existing learning-memory contracts for drafts, favorites, confirmed attempts, redo
  function togglePrivateFavorite(questionId: string) {
    setPrivateFavorites((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  }

  function updatePrivateDraft(questionId: string, text: string) {
    setPrivateDrafts((prev) => ({ ...prev, [questionId]: text }));
  }

  function confirmPrivateAttempt(
    question: PrivateMaterialLearningQuestion,
    unit: PrivateMaterialLearningUnitDraft,
    analysis: PrivateMaterialAnalysisResult
  ) {
    const draftText = (privateDrafts[question.id] || "").trim();
    if (!draftText) {
      alert("请先输入作答草稿");
      return;
    }
    const structurePoints: readonly string[] = (question.generatedReferenceAnswer as unknown as { structurePoints?: readonly string[] } | undefined)?.structurePoints || [];
    const criterionResults = structurePoints.length > 0
      ? structurePoints.map((point: string, i: number) => ({
          criterionId: `${question.id}-point-${i}`,
          memoryCriterionId: `${question.id}-point-${i}`,
          status: "present" as const,
        }))
      : [{
          criterionId: `${question.id}-default`,
          memoryCriterionId: `${question.id}-default`,
          status: "present" as const,
        }];

    const input: ConfirmedAttemptInput = {
      courseId: unit.courseId,
      courseVersionId: "private-current-session",
      offeringId: "private",
      knowledgePointId: unit.knowledgePointId,
      surface: "subjective-writing" as const,
      taskId: `private-${question.id}`,
      segmentId: null,
      confirmedText: draftText,
      scoringStandard: {
        id: "nur-qwen-private-ref",
        version: analysis.analysisId || "1",
        authority: "nur-platform" as const,
      },
      criterionResults: [...criterionResults],
      answerConfidence: "unverified" as const,
    };
    try {
      const attempt = recordConfirmedAttempt(input);
      setPrivateConfirmed((prev) => ({
        ...prev,
        [question.id]: { id: attempt.id, at: attempt.confirmedAt },
      }));
      // Explicit review plan proposal for private unit (reuses contract; no repeat threshold required for private practice)
      proposeReviewTaskForAttempt(attempt, criterionResults.map((c) => c.memoryCriterionId));
    } catch (e: unknown) {
      if (process.env.NODE_ENV === "development") console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      alert("确认保存失败: " + msg);
    }
  }

  function redoPrivate(questionId: string) {
    setPrivateDrafts((prev) => ({ ...prev, [questionId]: "" }));
    setPrivateConfirmed((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  }

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn">NUR LEARN</Link>
        <nav aria-label="课程构建导航">
          <Link href="/learn"><ArrowLeft aria-hidden="true" size={16} /> 返回本周</Link>
          <Link href="/question-bank">题库</Link>
        </nav>
        <span className={styles.headerStatus}>COURSE BUILDER · PILOT</span>
      </header>

      <section className={styles.hero} aria-labelledby="builder-title">
        <p className={styles.eyebrow}>MATERIALS → VERIFIED COURSE DRAFT</p>
        <div className={styles.heroGrid}>
          <div>
            <h1 id="builder-title">把材料编译成课程，<br />不是把答案交给模型。</h1>
          </div>
          <div className={styles.heroStatement}>
            <span>首发模型</span>
            <strong>Qwen3.7 Plus</strong>
            <p>模型负责规划允许字段；来源权威、数据完整性与发布资格由 NUR 引擎和人工审核决定。</p>
          </div>
        </div>
      </section>

      <MaterialIntakeReview
        approvedOverlayIds={privateOverlays.map((overlay) => overlay.id)}
        courseOptions={intakeCourseOptions}
        knownAssets={knownMaterialAssets}
        onApproveOverlay={approvePrivateOverlay}
        onInvalidatePrivateOverlays={invalidatePrivateOverlays}
        onRevokeOverlay={revokePrivateOverlay}
        parsingCourseOptions={intakeParsingCourseOptions}
      />

      <MaterialAdmissionReview overlays={privateOverlays} />

      <section className={styles.builderGrid}>
        <aside className={styles.controlPanel} aria-labelledby="build-input-title">
          <div className={styles.panelHeading}>
            <span>01</span>
            <div>
              <p>构建输入</p>
              <h2 id="build-input-title">选择材料包</h2>
            </div>
          </div>

          {statusError ? <p className={styles.errorNotice}>{statusError}</p> : null}
          {!status && !statusError ? (
            <div className={styles.loadingLine}>
              <LoaderCircle aria-hidden="true" size={18} /> 读取材料边界
            </div>
          ) : null}

          {status ? (
            <>
              <label className={styles.selectField}>
                <span>已获准材料包</span>
                <span className={styles.selectWrap}>
                  <select
                    value={selectedPackId}
                    onChange={(event) => changeMaterialInput(event.target.value)}
                    disabled={building}
                  >
                    {status.materialPacks.map((pack) => (
                      <option value={pack.id} key={pack.id}>{pack.label}</option>
                    ))}
                    {privateOverlays.length > 0 ? (
                      <optgroup label="当前会话私人增强包">
                        {privateOverlays.map((overlay) => (
                          <option value={overlay.id} key={overlay.id}>{overlay.label}</option>
                        ))}
                      </optgroup>
                    ) : null}
                  </select>
                  <ChevronDown aria-hidden="true" size={18} />
                </span>
              </label>

              {selectedPack ? (
                <div className={styles.packSummary}>
                  <p>{selectedPack.description}</p>
                  <dl>
                    <div><dt>来源</dt><dd>{selectedPack.sourceCount}</dd></div>
                    <div><dt>已核验</dt><dd>{selectedPack.verifiedSourceCount}</dd></div>
                    <div><dt>待确认</dt><dd>{selectedPack.pendingSourceCount}</dd></div>
                  </dl>
                </div>
              ) : null}

              {selectedOverlay ? (
                <div className={styles.privatePackSummary}>
                  <span>PRIVATE OVERLAY · CURRENT SESSION</span>
                  <strong>{selectedOverlay.courseTitle} · 私人材料分析</strong>
                  <p>{selectedOverlay.sourceCandidate.fileName}</p>
                  <dl>
                    <div><dt>官方基础包</dt><dd>{selectedOverlayBasePack ? "后续可选编译" : "分析阶段不需要"}</dd></div>
                    <div><dt>目标</dt><dd>{selectedOverlay.knowledgePointTitle}</dd></div>
                    <div><dt>章节</dt><dd>{selectedOverlay.review.acceptedSectionCount}</dd></div>
                    <div><dt>摘录</dt><dd>{selectedOverlay.review.acceptedExcerptCount}</dd></div>
                    <div><dt>权威</dt><dd>learner-private · 待复核</dd></div>
                  </dl>
                  <div className={styles.privateProviderReady}>
                    <Cloud aria-hidden="true" size={15} />
                    <span>{privateProviderReady ? "Qwen3.7 Plus 已就绪" : "Qwen3.7 Plus 当前不可用"}</span>
                  </div>
                  <button onClick={() => revokePrivateOverlay(selectedOverlay.id)} type="button">撤回这个增强包</button>
                </div>
              ) : null}

              <fieldset className={styles.modeChooser}>
                <legend>执行方式</legend>
                <label>
                  <input
                    disabled={selectedOverlay !== null}
                    type="radio"
                    name="build-mode"
                    value="provider-preferred"
                    checked={mode === "provider-preferred"}
                    onChange={() => setMode("provider-preferred")}
                  />
                  <span>
                    <strong>优先使用 Qwen</strong>
                    <small>{selectedOverlay
                      ? "私人分析固定为 provider-required；失败不会回退"
                      : status.configured ? `${status.provider?.model} 已配置` : "未配置时自动使用本地基准"}</small>
                  </span>
                </label>
                <label>
                  <input
                    disabled={selectedOverlay !== null}
                    type="radio"
                    name="build-mode"
                    value="baseline-only"
                    checked={mode === "baseline-only"}
                    onChange={() => setMode("baseline-only")}
                  />
                  <span>
                    <strong>只运行可复现基准</strong>
                    <small>不发送任何结构化内容到云端</small>
                  </span>
                </label>
              </fieldset>

              <div className={styles.providerState}>
                <Cloud aria-hidden="true" size={19} />
                <div>
                  <strong>{selectedOverlay
                    ? privateProviderReady ? "Qwen3.7 Plus 已就绪" : "Qwen3.7 Plus 当前不可用"
                    : status.configured ? "DashScope 已就绪" : "DashScope 尚未配置"}</strong>
                  <span>{selectedOverlay
                    ? "私人摘录只会在一次性分析授权后发送；无需匹配官方基础包，也不会以本地基准冒充 Qwen"
                    : status.configured ? status.provider?.model : "当前仍可完整运行本地基准构建与审核"}</span>
                </div>
              </div>

              {selectedOverlay ? (
                <>
                  <div className={styles.overlayBuildBoundary}>
                    <CircleAlert aria-hidden="true" size={18} />
                    <div>
                      <strong>{transferAuthorizationReady ? "一次性传输授权已就绪" : "私人增强包等待独立传输授权"}</strong>
                      <p>{transferAuthorizationReady
                        ? `已绑定 ${selectedOverlay.review.acceptedExcerptCount} 条摘录、${privateOverlayCharacterCount.toLocaleString("zh-CN")} 字符；点击分析即消费，成功或失败后都要重新授权。`
                        : "这不是 API Key 或官方材料包问题。先检查发送清单，再明确授权本次 one-private-analysis。"}</p>
                    </div>
                  </div>
                  <button
                    className={styles.transferReviewButton}
                    onClick={() => {
                      setTransferPanelOpen(true);
                      setTransferAuthorization(null);
                      setTransferConfirmed(false);
                    }}
                    type="button"
                  >
                    <ShieldCheck aria-hidden="true" size={17} />
                    检查并授权发送 {selectedOverlay.review.acceptedExcerptCount} 条已接纳摘录
                  </button>
                  {transferPanelOpen ? (
                    <section className={styles.transferPanel} aria-labelledby="private-transfer-title">
                      <div className={styles.transferPanelHeading}>
                        <div><span>ONE-TIME ANALYSIS · VERSION 1</span><h3 id="private-transfer-title">只授权这一次私人材料分析</h3></div>
                        <button onClick={() => setTransferPanelOpen(false)} type="button">收起</button>
                      </div>

                      <div className={styles.transferLimits}>
                        <div><span>摘录</span><strong>{selectedOverlay.excerpts.length} / {maximumPrivateOverlayExcerptCount}</strong></div>
                        <div><span>字符</span><strong>{privateOverlayCharacterCount.toLocaleString("zh-CN")} / {maximumPrivateOverlayCharacterCount.toLocaleString("zh-CN")}</strong></div>
                        <div><span>目标</span><strong>{selectedOverlay.courseId}<br />{selectedOverlay.knowledgePointId}</strong></div>
                      </div>

                      <div className={styles.transferColumns}>
                        <div>
                          <strong>本次将发送</strong>
                          <ul>
                            <li>人工接纳的摘录文字、excerpt ID 与 DOCX locator</li>
                            <li>声明的 course ID 与固定 knowledge point ID</li>
                            <li>{selectedOverlay.sourceCandidate.sourceType} · learner-private · authority pending-review</li>
                          </ul>
                        </div>
                        <div>
                          <strong>明确不会发送</strong>
                          <ul>
                            <li>原始 DOCX、文件路径、File handle、文件名或完整 SHA</li>
                            <li>待审/已排除块、图片、OCR 原件或 API Key</li>
                            <li>无关课程内容、无关个人元数据或发布状态</li>
                          </ul>
                        </div>
                      </div>

                      <div className={styles.transferExcerptList}>
                        <span>逐条发送清单</span>
                        {selectedOverlay.excerpts.map((excerpt) => (
                          <article key={excerpt.id}>
                            <div><strong>{excerpt.id}</strong><small>{excerpt.locator.label} · {excerpt.sectionTitle}</small></div>
                            <p>{excerpt.text}</p>
                          </article>
                        ))}
                      </div>

                      {!privateOverlayInput ? (
                        <div className={styles.transferBlocker} role="alert">
                          <CircleAlert aria-hidden="true" size={17} />
                          <span>隐私声明或风险不是 none-observed。请先脱敏、重新完成 intake 审核，再创建新的私人增强包。</span>
                        </div>
                      ) : !privateOverlayWithinLimits ? (
                        <div className={styles.transferBlocker} role="alert">
                          <CircleAlert aria-hidden="true" size={17} />
                          <span>摘录超过 80 条或 40,000 字符；请回到章节审核继续筛选，系统不会静默截断。</span>
                        </div>
                      ) : !privateProviderReady ? (
                        <div className={styles.transferBlocker} role="alert">
                          <CircleAlert aria-hidden="true" size={17} />
                          <span>Qwen3.7 Plus 当前不可用于私人请求；不会回退到官方基准。</span>
                        </div>
                      ) : (
                        <div className={styles.transferConfirm}>
                          <label>
                            <input checked={transferConfirmed} onChange={(event) => {
                              setTransferConfirmed(event.target.checked);
                              setTransferAuthorization(null);
                            }} type="checkbox" />
                            <span>我已逐条检查以上内容，并明确授权发送给 DashScope · {status.provider?.model}，仅用于一次 one-private-analysis。</span>
                          </label>
                          <button disabled={!transferConfirmed || authorizingTransfer} onClick={() => void authorizePrivateTransfer()} type="button">
                            {authorizingTransfer ? <LoaderCircle className={styles.spinner} aria-hidden="true" size={16} /> : <ShieldCheck aria-hidden="true" size={16} />}
                            {authorizingTransfer ? "正在绑定内容摘要" : transferAuthorizationReady ? "单次授权已就绪" : "确认本次单次授权"}
                          </button>
                        </div>
                      )}
                    </section>
                  ) : null}
                </>
              ) : null}

              {selectedOverlay && builderQuotas && (
                <div style={{fontSize: "10px", padding: "4px 6px", background: "#fffaf0", border: "1px solid #e6d5b8", marginBottom: 6, color: "#5c4630"}}>
                  M3 配额 · 构建/私人分析: {builderQuotas.quotas?.courseBuilds?.used ?? 0} / {builderQuotas.quotas?.courseBuilds?.limit === "unlimited" ? "∞" : builderQuotas.quotas?.courseBuilds?.limit}
                  {builderQuotas.quotas?.courseBuilds?.isOverLimit ? "（已达上限，建议 Pro）" : builderQuotas.quotas?.courseBuilds?.isNearLimit ? "（接近上限）" : ""}
                </div>
              )}
              <button className={styles.buildButton} type="button" onClick={runBuild} disabled={building || !selectedPackId || (selectedOverlay !== null && !transferAuthorizationReady) || (builderQuotas?.quotas?.courseBuilds?.isOverLimit && builderQuotas.tier !== "pro") }>
                {building ? (
                  <><LoaderCircle className={styles.spinner} aria-hidden="true" size={20} /> {selectedOverlay ? "Qwen 正在分析私人材料" : "正在编译课程"}</>
                ) : selectedOverlay && transferAuthorizationReady ? (
                  <><Play aria-hidden="true" size={19} /> 使用一次授权分析私人材料</>
                ) : selectedOverlay ? (
                  <><ShieldCheck aria-hidden="true" size={19} /> 先检查并授权发送摘录</>
                ) : (
                  <><Play aria-hidden="true" size={19} /> 开始编译课程</>
                )}
              </button>
            </>
          ) : null}
        </aside>

        <section className={styles.resultPanel} aria-labelledby="build-output-title">
          <div className={styles.panelHeading}>
            <span>02</span>
            <div>
              <p>分析 / 构建输出</p>
              <h2 id="build-output-title">私人学习单元与课程草稿</h2>
            </div>
          </div>

          {buildError ? (
            <div className={styles.resultError} role="alert">
              <CircleAlert aria-hidden="true" size={22} />
              <div><strong>本次操作未完成</strong><p>{buildError}</p></div>
            </div>
          ) : null}

          {!draft && !analysisResult && !buildError ? (
            <div className={styles.emptyResult}>
              <span aria-hidden="true">NUR</span>
              <div>
                <strong>{building
                  ? selectedOverlay ? "Qwen 正在整理、去重与生成参考答案" : "正在执行五道边界"
                  : selectedOverlay ? "等待一次受约束的私人材料分析" : "等待一次受约束构建"}</strong>
                <p>{selectedOverlay
                  ? "材料不足会形成 partial / insufficient / unmapped 结果，而不是在模型调用前被阻断。"
                  : "材料身份、来源权威、课程规划、typed draft 和确定性校验会逐步留下可审核记录。"}</p>
              </div>
            </div>
          ) : null}

          {analysisResult ? (
            <div className={`${styles.draft} ${styles.analysisDraft}`}>
              <div className={styles.draftHeader}>
                <div>
                  <span className={styles.privateDraftBadge}>PRIVATE · {analysisResult.coverage.status.toUpperCase()}</span>
                  <span className={styles.analysisCoverageBadge}>INSUFFICIENT FOR FULL COURSE</span>
                  <h3>{analysisResult.learningUnit.title}</h3>
                  <p>{analysisResult.providerAssist.provider.id} · {analysisResult.providerAssist.provider.model} · {formatBuildTime(analysisResult.createdAt)}</p>
                </div>
                <div className={styles.draftActions}>
                  {analysisDownloadHref ? (
                    <a href={analysisDownloadHref} download={`${analysisResult.learningUnit.courseId}-private-analysis.json`}>
                      <Download aria-hidden="true" size={16} /> 导出分析 JSON
                    </a>
                  ) : null}
                  <button type="button" onClick={resetBuild}><RotateCcw aria-hidden="true" size={16} /> 重新分析</button>
                </div>
              </div>

              <div className={styles.metrics}>
                <article><span>授权摘录</span><strong>{analysisResult.excerptCount}</strong><small>{analysisResult.characterCount.toLocaleString("zh-CN")} 字符</small></article>
                <article><span>已映射</span><strong>{analysisResult.coverage.mappedExcerptCount}</strong><small>原始 ID 保留</small></article>
                <article><span>候选主题</span><strong>{analysisResult.learningUnit.topics.length}</strong><small>非官方章节</small></article>
                <article><span>可练题目</span><strong>{analysisResult.learningUnit.questions.length}</strong><small>参考答案待复核</small></article>
                <article><span>未映射</span><strong>{analysisResult.coverage.unmappedExcerptCount}</strong><small>诚实保留</small></article>
              </div>

              <section className={styles.analysisBoundary} aria-labelledby="private-analysis-boundary-title">
                <div>
                  <span>PRIVATE LEARNING UNIT · CURRENT SESSION</span>
                  <h4 id="private-analysis-boundary-title">先学习，再决定是否编译完整课程</h4>
                </div>
                <p>{analysisResult.coverage.summary}</p>
                <dl>
                  <div><dt>课程目标</dt><dd>{analysisResult.learningUnit.courseTitle}</dd></div>
                  <div><dt>知识点目标</dt><dd>{analysisResult.learningUnit.knowledgePointTitle}</dd></div>
                  <div><dt>覆盖</dt><dd>{analysisResult.coverage.status}</dd></div>
                  <div><dt>完整课程</dt><dd>{analysisResult.coverage.compilationReadiness}</dd></div>
                </dl>
              </section>

              <section className={styles.analysisTopics} aria-labelledby="analysis-topics-title">
                <div className={styles.sectionHeading}>
                  <div><span>NORMALIZED TOPICS</span><h4 id="analysis-topics-title">Qwen 候选分组</h4></div>
                  <p>候选主题只整理私人材料，不写入官方章节或课程注册表。</p>
                </div>
                <div>
                  {analysisResult.learningUnit.topics.map((topic) => (
                    <article key={topic.id}>
                      <span>{topic.excerptIds.length} 条摘录</span>
                      <div><strong>{topic.label}</strong><p>{topic.rationale}</p><small>{topic.id}</small></div>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.analysisQuestions} aria-labelledby="analysis-questions-title">
                <div className={styles.sectionHeading}>
                  <div><span>PRIVATE PRACTICE</span><h4 id="analysis-questions-title">可立即学习的私人题目</h4></div>
                  <p>Qwen 生成考试版与结构要点；精简/展开视图由本地确定性转换，切换不会重复调用模型。</p>
                  <div className={styles.privateFilter}>
                    <button
                      type="button"
                      aria-pressed={!privateShowFavoritesOnly}
                      onClick={() => setPrivateShowFavoritesOnly(false)}
                    >全部</button>
                    <button
                      type="button"
                      aria-pressed={privateShowFavoritesOnly}
                      onClick={() => setPrivateShowFavoritesOnly(true)}
                    >★ 已收藏</button>
                    <small>{Object.values(privateFavorites).filter(Boolean).length} / {analysisResult.learningUnit.questions.length}</small>
                  </div>
                </div>
                <div className={styles.analysisQuestionList}>
                  {(() => {
                    const allQs = analysisResult.learningUnit.questions;
                    const qs = privateShowFavoritesOnly ? allQs.filter((q) => !!privateFavorites[q.id]) : allQs;
                    return qs.map((question, idx) => {
                      const selectedVariant = answerVariants[question.id] ?? "exam";
                      const displayNum = String(idx + 1).padStart(2, "0");
                      return (
                        <article key={question.id}>
                          <header>
                            <span>{displayNum} · {question.questionKind}</span>
                            <small>{question.sourceLocators.map((locator) => locator.label).join(" · ")}</small>
                          </header>
                          <h5>{question.normalizedPrompt}</h5>
                          <div className={styles.answerAuthority}>
                            <strong>{question.generatedReferenceAnswer.label}</strong>
                            <span>{question.sourceAnswerStatus === "missing" ? "来源答案：缺失" : "疑似附答案：待人工复核"} · scoring authority: not-provided</span>
                          </div>
                          <div className={styles.answerVariantTabs} aria-label={`${question.id} 参考答案版本`}>
                            {([
                              ["concise", "精简版"],
                              ["exam", "考试版"],
                              ["expanded", "展开版"],
                            ] as const).map(([variant, label]) => (
                              <button
                                aria-pressed={selectedVariant === variant}
                                key={variant}
                                onClick={() => setAnswerVariants((current) => ({
                                  ...current,
                                  [question.id]: variant,
                                }))}
                                type="button"
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                          <p className={styles.generatedAnswer}>{question.generatedReferenceAnswer.variants[selectedVariant]}</p>
                          <div className={styles.answerStructure}>
                            <strong>结构要点</strong>
                            <ul>{question.generatedReferenceAnswer.structurePoints.map((point) => <li key={point}>{point}</li>)}</ul>
                            <small>{question.generatedReferenceAnswer.uncertaintyNote}</small>
                          </div>

                          <div className={styles.privateActions}>
                            <textarea
                              className={styles.privateDraft}
                              value={privateDrafts[question.id] || ""}
                              onChange={(e) => updatePrivateDraft(question.id, e.target.value)}
                              placeholder="我的作答草稿（私人练习；参考答案为 NUR/Qwen 生成，不作为来源标准）"
                              rows={3}
                            />
                            <div className={styles.privateButtons}>
                              <button type="button" onClick={() => togglePrivateFavorite(question.id)} title="收藏此题目">
                                {privateFavorites[question.id] ? "★ 已收藏" : "☆ 收藏"}
                              </button>
                              <button
                                type="button"
                                onClick={() => confirmPrivateAttempt(question, analysisResult.learningUnit, analysisResult)}
                                disabled={!(privateDrafts[question.id] || "").trim()}
                              >
                                确认保存到学习记忆
                              </button>
                              <button type="button" onClick={() => redoPrivate(question.id)}>重做</button>
                              {privateConfirmed[question.id] && (
                                <span className={styles.confirmed}>已确认</span>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    });
                  })()}
                </div>
                {(() => {
                  const review = selectCurrentReviewTask(memoryState, analysisResult.learningUnit.courseId, analysisResult.learningUnit.knowledgePointId);
                  if (review && (review.status === "proposed" || review.status === "accepted")) {
                    return (
                      <div className={styles.privateReviewStatus}>
                        复习提案（{review.status}）
                        {review.status === "proposed" && (
                          <>
                            <button type="button" onClick={() => acceptReviewTask(review.id)}>加入 48h 计划</button>
                            <button type="button" onClick={() => declineReviewTask(review.id)}>暂不</button>
                          </>
                        )}
                        {review.status === "accepted" && review.dueAt && <small>到期 {new Date(review.dueAt).toLocaleDateString("zh-CN")}</small>}
                      </div>
                    );
                  }
                  return null;
                })()}
              </section>

              <section className={styles.analysisReview} aria-labelledby="analysis-review-title">
                <div className={styles.sectionHeading}>
                  <div><span>PENDING / UNMAPPED</span><h4 id="analysis-review-title">不能被模型补成事实的缺口</h4></div>
                  <p>这些是可继续学习的 review 状态，不是 blocking。</p>
                </div>
                <div className={styles.analysisReviewGrid}>
                  <article>
                    <strong>待确认事实</strong>
                    <ul>{analysisResult.learningUnit.missingFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
                  </article>
                  <article>
                    <strong>未映射摘录</strong>
                    {analysisResult.learningUnit.unmapped.length > 0 ? (
                      <ul>{analysisResult.learningUnit.unmapped.map((item) => <li key={item.excerptId}>{item.excerptId} · {item.reason}</li>)}</ul>
                    ) : <p>本次没有未映射摘录。</p>}
                  </article>
                  <article>
                    <strong>冲突候选</strong>
                    {analysisResult.learningUnit.conflicts.length > 0 ? (
                      <ul>{analysisResult.learningUnit.conflicts.map((item, index) => <li key={`${index}-${item.excerptIds.join("-")}`}>{item.description} · pending-review</li>)}</ul>
                    ) : <p>本次没有检测到明确冲突；不等于来源已核验。</p>}
                  </article>
                </div>
                <p className={styles.authorityNotice}>{analysisResult.authorityNotice}<br />{analysisResult.dataHandlingNotice}<br />分析不授予 publication、material catalog mutation、course registry mutation 或 official course compilation 权限。</p>
              </section>
            </div>
          ) : null}

          {draft ? (
            <div className={styles.draft}>
              <div className={styles.draftHeader}>
                <div>
                  <span className={draft.validation.valid ? styles.validBadge : styles.invalidBadge}>
                    {draft.validation.valid ? <Check aria-hidden="true" size={14} /> : <CircleAlert aria-hidden="true" size={14} />}
                    {draft.validation.valid ? "硬校验通过" : "存在阻断问题"}
                  </span>
                  {draft.draftKind === "private-course-draft" ? (
                    <span className={styles.privateDraftBadge}>PRIVATE COURSE DRAFT · 非官方发布</span>
                  ) : null}
                  <h3>{draft.course.title}</h3>
                  <p>{providerLabel(draft)} · {formatBuildTime(draft.createdAt)}</p>
                </div>
                <div className={styles.draftActions}>
                  {draftDownloadHref ? (
                    <a href={draftDownloadHref} download={`${draft.course.slug}-course-draft.json`}>
                      <Download aria-hidden="true" size={16} /> 导出完整 JSON
                    </a>
                  ) : null}
                  <button type="button" onClick={resetBuild}><RotateCcw aria-hidden="true" size={16} /> 重新构建</button>
                </div>
              </div>

              <div className={styles.metrics}>
                <article><span>章节骨架</span><strong>{draft.coverage.chapterCount}</strong><small>章完整输出</small></article>
                <article><span>知识点</span><strong>{draft.coverage.knowledgePointCount}</strong><small>全部保持稳定 ID</small></article>
                <article><span>深层闭环</span><strong>{draft.coverage.detailedLessonCount}</strong><small>{detailedLessonPercent}% 有完整 lesson</small></article>
                <article><span>训练题</span><strong>{draft.coverage.assessmentCount}</strong><small>{draft.coverage.pendingAnswerCount} 题答案待核</small></article>
                <article><span>审核问题</span><strong>{draft.validation.reviewIssueCount}</strong><small>{draft.validation.blockingIssueCount} 项阻断</small></article>
              </div>

              {draft.privateOverlay ? (
                <section className={styles.privateResult} aria-labelledby="private-result-title">
                  <div className={styles.sectionHeading}>
                    <div><span>PRIVATE OVERLAY DECISIONS</span><h4 id="private-result-title">{draft.privateOverlay.excerptCount} 条私人摘录的模型决定</h4></div>
                    <p>provider status: {draft.providerAssist.status} · {draft.providerAssist.provider?.id} · {draft.providerAssist.provider?.model}</p>
                  </div>
                  <div className={styles.privateResultBoundary}>
                    <strong>learner-private · authority pending-review</strong>
                    <span>目标 {draft.privateOverlay.courseId} / {draft.privateOverlay.knowledgePointId}</span>
                    <p>这是私人课程草稿，不是官方课程发布；仍需下方人工批准，且不会写入课程注册表、material catalog 或 publication state。</p>
                  </div>
                  <div className={styles.privateDecisionList}>
                    {draft.privateOverlay.decisions.map((decision) => (
                      <article key={decision.excerptId}>
                        <span>{decision.disposition === "use" ? "建议使用" : decision.disposition === "review" ? "继续待审" : "建议排除"}</span>
                        <div>
                          <strong>{decision.excerptId}</strong>
                          <p>{decision.learningUse}</p>
                          <small>{decision.reviewNote}</small>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className={styles.trace} aria-labelledby="trace-title">
                <div className={styles.sectionHeading}>
                  <div><span>ENGINE TRACE</span><h4 id="trace-title">五步构建记录</h4></div>
                  <p>{draft.providerAssist.notice}</p>
                </div>
                <ol>
                  {draft.steps.map((step) => (
                    <li className={styles[step.status]} key={step.id}>
                      <span>{String(step.order).padStart(2, "0")}</span>
                      <div><strong>{step.label}</strong><p>{step.summary}</p></div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className={styles.courseMap} aria-labelledby="course-map-title">
                <div className={styles.sectionHeading}>
                  <div><span>COURSE MAP</span><h4 id="course-map-title">完整课程骨架</h4></div>
                  <p>页面由 typed data 生成；模型不直接写 React 或 HTML。</p>
                </div>
                <div className={styles.chapterGrid}>
                  {draft.course.chapters.map((chapter) => {
                    const chapterPoints = draft.course.knowledgePoints.filter((point) => (
                      chapter.knowledgePointIds.includes(point.id)
                    ));
                    const deepCount = chapterPoints.filter((point) => point.lesson !== null).length;
                    return (
                      <article key={chapter.id}>
                        <span>{chapter.indexLabel}</span>
                        <div><h5>{chapter.title}</h5><p>{chapter.focus}</p></div>
                        <small>{chapterPoints.length} 知识点 · {deepCount} 深层闭环</small>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className={styles.issueSection} aria-labelledby="issues-title">
                <div className={styles.sectionHeading}>
                  <div><span>REVIEW GATES</span><h4 id="issues-title">不能被模型越过的缺口</h4></div>
                  <p>这些项目保留在草稿里，不会被空白或猜测悄悄替换。</p>
                </div>
                <div className={styles.issueList}>
                  {draft.issues.map((issue) => (
                    <article className={styles[`issue_${issue.severity}`]} key={issue.id}>
                      <span>{issue.severity === "blocking" ? "阻断" : issue.severity === "review" ? "审核" : "说明"}</span>
                      <div><strong>{issue.title}</strong><p>{issue.detail}</p></div>
                    </article>
                  ))}
                </div>
                <details className={styles.sourceLedger}>
                  <summary>查看 {draft.plan.sourceDecisions.length} 条来源处理决定 <ChevronDown aria-hidden="true" size={17} /></summary>
                  <div>
                    {draft.plan.sourceDecisions.map((decision) => {
                      const source = draft.course.sources.find((item) => item.id === decision.sourceId);
                      return (
                        <article key={decision.sourceId}>
                          <span>{decision.disposition === "use" ? "使用" : decision.disposition === "review" ? "待审" : "排除"}</span>
                          <div><strong>{source?.displayLabel ?? decision.sourceId}</strong><p>{decision.rationale}</p></div>
                        </article>
                      );
                    })}
                  </div>
                </details>
              </section>

              <section className={styles.approvalSection} aria-labelledby="approval-title">
                <div className={styles.approvalHeading}>
                  <ShieldCheck aria-hidden="true" size={27} />
                  <div><span>HUMAN APPROVAL</span><h4 id="approval-title">人工批准仍是发布前最后一道门</h4></div>
                </div>
                <div className={styles.approvalChecks}>
                  <label>
                    <input type="checkbox" checked={sourceReviewConfirmed} onChange={(event) => setSourceReviewConfirmed(event.target.checked)} />
                    <span>{draft.privateOverlay
                      ? "我已逐条查看私人摘录的 use / review / exclude 决定与现有课程缺口。"
                      : "我已查看待导入来源和深层 lesson 覆盖缺口。"}</span>
                  </label>
                  <label>
                    <input type="checkbox" checked={authorityConfirmed} onChange={(event) => setAuthorityConfirmed(event.target.checked)} />
                    <span>{draft.privateOverlay
                      ? "我确认私人摘录仍为 learner-private / pending-review，没有被升级为教师或官方权威。"
                      : "我确认 NUR 量表没有被标成任课教师评分标准。"}</span>
                  </label>
                  <label>
                    <input type="checkbox" checked={previewBoundaryConfirmed} onChange={(event) => setPreviewBoundaryConfirmed(event.target.checked)} />
                    <span>我理解本次只批准浏览器本地预览，不写入服务器课程真相。</span>
                  </label>
                </div>

                {approval ? (
                  <div className={styles.approvedState}>
                    <FileCheck2 aria-hidden="true" size={22} />
                    <div>
                      <strong>已批准为本地预览</strong>
                      <p>批准记录保存在当前浏览器；原课程真相和材料没有被修改。</p>
                    </div>
                    <Link href="/learn">返回学习首页 <ArrowRight aria-hidden="true" size={17} /></Link>
                  </div>
                ) : (
                  <button className={styles.approveButton} type="button" disabled={!approvalReady} onClick={approveDraft}>
                    <Check aria-hidden="true" size={18} /> 批准为本地预览
                  </button>
                )}
                <p className={styles.authorityNotice}>{draft.authorityNotice}<br />{draft.dataHandlingNotice}</p>
              </section>
            </div>
          ) : null}
        </section>
      </section>
    </main>
  );
}
