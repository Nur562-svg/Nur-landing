"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import {
  countPrivateOverlayCharacters,
  createPrivateOverlayBuildInput,
  createPrivateMaterialAnalysisAuthorization,
  maximumPrivateOverlayCharacterCount,
  maximumPrivateOverlayExcerptCount,
} from "@/lib/course-builder/private-overlay-contract";
import {
  privateWorkspaceIntakeCourseOption,
  privateWorkspaceParsingCourseOption,
} from "@/lib/private-workspace";
import {
  clearPrivateAnalysisHistory,
  loadCurrentPrivateAnalysis,
  loadPrivateAnalysisHistory,
  savePrivateAnalysisResult,
  type PrivateMaterialAnalysisResult,
} from "@/lib/private-practice-memory";
import type {
  CourseBuilderApiResponse,
} from "@/types/course-builder";
import type { ReviewedMaterialOverlayDraft } from "@/types/material-parsing";
import { MaterialIntakeReview } from "./material-intake-review";
import { PLATFORM_DOCK_PROPS, useNurAgentDockProps } from "@/lib/agent-dock-props";
import { PrivatePracticeRoom } from "./private-practice-room";
import styles from "./private-materials-studio.module.css";

type ProviderStatus = {
  configured: boolean;
  model: string | null;
};

export function PrivateMaterialsStudio() {
  useNurAgentDockProps(PLATFORM_DOCK_PROPS);
  const intakeCourseOptions = useMemo(() => [privateWorkspaceIntakeCourseOption()], []);
  const parsingCourseOptions = useMemo(() => [privateWorkspaceParsingCourseOption()], []);
  const [overlay, setOverlay] = useState<ReviewedMaterialOverlayDraft | null>(null);
  const [provider, setProvider] = useState<ProviderStatus | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [authorizing, setAuthorizing] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PrivateMaterialAnalysisResult | null>(null);
  const [history, setHistory] = useState<PrivateMaterialAnalysisResult[]>([]);
  const [restoreNotice, setRestoreNotice] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const requestedUnitId = searchParams.get("unit");

  const overlayInput = overlay ? createPrivateOverlayBuildInput(overlay) : null;
  const characterCount = overlayInput ? countPrivateOverlayCharacters(overlayInput) : 0;
  const withinLimits = overlayInput !== null
    && overlayInput.excerpts.length <= maximumPrivateOverlayExcerptCount
    && characterCount <= maximumPrivateOverlayCharacterCount;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/course-builder", { cache: "no-store" })
      .then(async (response) => {
        const payload: unknown = await response.json();
        if (cancelled) {
          return;
        }
        if (!response.ok || typeof payload !== "object" || payload === null || !("configured" in payload)) {
          throw new Error("无法读取分析服务状态");
        }
        const record = payload as Record<string, unknown>;
        const configured = record.configured === true;
        const providerRecord = record.provider;
        const model = typeof providerRecord === "object"
          && providerRecord !== null
          && typeof (providerRecord as { model?: unknown }).model === "string"
          ? (providerRecord as { model: string }).model
          : null;
        setProvider({ configured, model });
      })
      .catch((cause: unknown) => {
        if (!cancelled) {
          setStatusError(cause instanceof Error ? cause.message : "无法读取分析服务状态");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // 加载持久化历史 + 当前；?unit= 优先恢复对应单元
  useEffect(() => {
    const loadedHistory = loadPrivateAnalysisHistory();
    setHistory(loadedHistory);

    if (requestedUnitId) {
      const current = loadCurrentPrivateAnalysis();
      const requested = loadedHistory.find((entry) => entry.learningUnit.id === requestedUnitId)
        ?? (current?.learningUnit.id === requestedUnitId ? current : null);
      if (requested) {
        setResult(requested);
        savePrivateAnalysisResult(requested);
        setRestoreNotice(null);
        return;
      }
      setRestoreNotice("未找到该私人练习单元（可能已清除）。可从下面历史列表恢复，或重新导入。");
    } else {
      setRestoreNotice(null);
    }

    const current = loadCurrentPrivateAnalysis();
    if (current) {
      setResult(current);
    }
  }, [requestedUnitId]);

  useEffect(() => {
    setConfirmed(false);
    setError(null);
  }, [overlay?.id]);

  async function generatePractice() {
    if (!overlayInput || !provider?.configured || !provider.model || !withinLimits || running || authorizing) {
      return;
    }
    setAuthorizing(true);
    setRunning(true);
    setError(null);
    try {
      const next = await createPrivateMaterialAnalysisAuthorization(
        overlayInput,
        { id: "dashscope", model: provider.model },
      );
      const response = await fetch("/api/course-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: 1,
          kind: "private-material-analysis",
          mode: "provider-required",
          privateOverlay: overlayInput,
          authorization: next,
        }),
      });
      const payload = await response.json() as CourseBuilderApiResponse;
      if (!response.ok || payload.status === "error") {
        throw new Error(payload.status === "error" ? payload.message : "生成练习失败");
      }
      if (payload.status !== "private-material-analysis") {
        throw new Error("这次没有生成可练习的题目。");
      }
      setResult(payload);
      savePrivateAnalysisResult(payload);
      setHistory(loadPrivateAnalysisHistory());
      setConfirmed(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "生成练习失败");
    } finally {
      setAuthorizing(false);
      setRunning(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/learn">
          <ArrowLeft size={16} /> 返回学习首页
        </Link>
        <p className={styles.kicker}>我的资料</p>
        <h1 className={styles.title}>导入资料，生成练习</h1>
        <p className={styles.subtitle}>
          上传 Word 或有文字的 PDF，核对摘录后生成练习。文件留在这台电脑，不会变成官方课。
        </p>
      </header>

      {statusError ? <p className={styles.error}>{statusError}</p> : null}
      {restoreNotice ? <p className={styles.error}>{restoreNotice}</p> : null}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. 上传文件</h2>
        <p className={styles.hint}>文件只留在本机。扫描件图片无法抽字，请用可复制文字的 PDF 或 Word。</p>
        <MaterialIntakeReview
          approvedOverlayIds={overlay ? [overlay.id] : []}
          courseOptions={intakeCourseOptions}
          knownAssets={[]}
          learnerMode
          onApproveOverlay={setOverlay}
          onInvalidatePrivateOverlays={() => setOverlay(null)}
          onRevokeOverlay={() => setOverlay(null)}
          parsingCourseOptions={parsingCourseOptions}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. 生成练习</h2>
        {!overlayInput ? (
          <p className={styles.hint}>确认摘录后，这里会出现生成按钮。</p>
        ) : (
          <div className={styles.panel}>
            <p>
              已选 {overlayInput.excerpts.length} 段文字
              {withinLimits ? "" : ` · 超出 ${maximumPrivateOverlayExcerptCount} 段上限，请减少摘录`}
            </p>
            {!provider?.configured ? (
              <p className={styles.hint}>当前无法生成练习，需要配置分析服务。</p>
            ) : null}
            <label className={styles.confirm}>
              <input
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
                type="checkbox"
              />
              <span>我已核对摘录，同意只用于生成本地练习。</span>
            </label>
            <div className={styles.actions}>
              <button
                disabled={!confirmed || !provider?.configured || !withinLimits || authorizing || running}
                onClick={() => void generatePractice()}
                type="button"
              >
                {authorizing || running ? <><LoaderCircle className={styles.spin} size={16} /> 正在生成练习</> : "生成练习"}
              </button>
            </div>
          </div>
        )}
        {error ? <p className={styles.error}>{error}</p> : null}
      </section>

      {history.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>我的历史私人练习单元</h2>
          <p className={styles.hint}>最近 {Math.min(history.length, 5)} 个已保存的私人练习（浏览器本地持久）。点击恢复即可继续收藏、确认与练习。</p>
          <div className={styles.historyList}>
            {history.map((entry) => {
              const isCurrent = result?.learningUnit.id === entry.learningUnit.id;
              const qCount = entry.learningUnit.questions.length;
              return (
                <button
                  key={entry.learningUnit.id}
                  type="button"
                  className={isCurrent ? styles.historyItemActive : styles.historyItem}
                  onClick={() => {
                    setResult(entry);
                    // 可选：滚动到练习区
                    setTimeout(() => {
                      const el = document.querySelector(`[data-private-practice]`);
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 50);
                  }}
                >
                  <div>
                    <strong>{entry.coverage?.summary ?? "私人单元"}</strong>
                    <small> · {qCount} 题 · {entry.coverage?.status ?? ""}</small>
                  </div>
                  <div className={styles.historyMeta}>
                    <span>{new Date(entry.learningUnit?.id?.split("-").pop() || Date.now()).toLocaleDateString("zh-CN")}</span>
                    {isCurrent ? <span className={styles.historyCurrent}>当前</span> : <span>加载练习</span>}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className={styles.clearHistory}
            onClick={() => {
              if (confirm("清除所有私人练习历史与状态？此操作不可恢复。")) {
                clearPrivateAnalysisHistory();
                setHistory([]);
                setResult(null);
              }
            }}
          >
            清除全部历史
          </button>
        </section>
      ) : null}

      {result ? (
        <section className={styles.section} data-private-practice>
          <h2 className={styles.sectionTitle}>3. 练习</h2>
          {result.learningUnit.questions.length > 0 ? (
            <PrivatePracticeRoom analysisResult={result} />
          ) : (
            <p className={styles.hint}>这次没有拆出题目。可以改摘录后重新生成。</p>
          )}
        </section>
      ) : null}
      </div>
    </div>
  );
}
