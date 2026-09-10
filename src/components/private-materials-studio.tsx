"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
import type {
  CourseBuilderApiResponse,
  PrivateMaterialAnalysisAuthorization,
  PrivateMaterialAnalysisResult,
} from "@/types/course-builder";
import type { ReviewedMaterialOverlayDraft } from "@/types/material-parsing";
import { MaterialIntakeReview } from "./material-intake-review";
import { PrivatePracticeRoom } from "./private-practice-room";
import styles from "./private-materials-studio.module.css";

const analysisStorageKey = "nur-learn:private-practice-analysis:v1";

type ProviderStatus = {
  configured: boolean;
  model: string | null;
};

function isAnalysisResult(value: unknown): value is PrivateMaterialAnalysisResult {
  return typeof value === "object"
    && value !== null
    && "status" in value
    && value.status === "private-material-analysis"
    && "learningUnit" in value;
}

export function PrivateMaterialsStudio() {
  const intakeCourseOptions = useMemo(() => [privateWorkspaceIntakeCourseOption()], []);
  const parsingCourseOptions = useMemo(() => [privateWorkspaceParsingCourseOption()], []);
  const [overlay, setOverlay] = useState<ReviewedMaterialOverlayDraft | null>(null);
  const [provider, setProvider] = useState<ProviderStatus | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [authorization, setAuthorization] = useState<PrivateMaterialAnalysisAuthorization | null>(null);
  const [authorizing, setAuthorizing] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PrivateMaterialAnalysisResult | null>(null);

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

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(analysisStorageKey);
      if (!stored) {
        return;
      }
      const parsed: unknown = JSON.parse(stored);
      if (isAnalysisResult(parsed)) {
        setResult(parsed);
      }
    } catch {
      window.sessionStorage.removeItem(analysisStorageKey);
    }
  }, []);

  useEffect(() => {
    setConfirmed(false);
    setAuthorization(null);
    setError(null);
  }, [overlay?.id]);

  async function authorizeOnce() {
    if (!overlayInput || !provider?.configured || !provider.model || !withinLimits) {
      return;
    }
    setAuthorizing(true);
    setError(null);
    try {
      const next = await createPrivateMaterialAnalysisAuthorization(
        overlayInput,
        { id: "dashscope", model: provider.model },
      );
      setAuthorization(next);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "授权失败");
    } finally {
      setAuthorizing(false);
    }
  }

  async function runAnalysis() {
    if (!overlayInput || !authorization || running) {
      return;
    }
    setRunning(true);
    setError(null);
    const body = {
      version: 1,
      kind: "private-material-analysis",
      mode: "provider-required",
      privateOverlay: overlayInput,
      authorization,
    };
    setAuthorization(null);
    setConfirmed(false);
    try {
      const response = await fetch("/api/course-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json() as CourseBuilderApiResponse;
      if (!response.ok || payload.status === "error") {
        throw new Error(payload.status === "error" ? payload.message : "分析失败");
      }
      if (payload.status !== "private-material-analysis") {
        throw new Error("本次没有返回私人练习单元。");
      }
      setResult(payload);
      window.sessionStorage.setItem(analysisStorageKey, JSON.stringify(payload));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "分析失败");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/learn">
          <ArrowLeft size={16} /> 返回学习首页
        </Link>
        <p className={styles.kicker}>我的资料</p>
        <h1 className={styles.title}>导入 Word / PDF，生成练习</h1>
        <p className={styles.subtitle}>
          接受 .docx 与有文字层的 .pdf。文件留在此浏览器，分析只发送你接纳的摘录。不会注册成官方课，也不会进入课程目录。扫描件不做 OCR。
        </p>
      </header>

      {statusError ? <p className={styles.error}>{statusError}</p> : null}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. 上传并接纳摘录</h2>
        <p className={styles.hint}>课程目标已固定为「我的资料 / 导入练习」。隐私须声明为未发现个人信息，才能发送分析。</p>
        <MaterialIntakeReview
          approvedOverlayIds={overlay ? [overlay.id] : []}
          courseOptions={intakeCourseOptions}
          knownAssets={[]}
          onApproveOverlay={setOverlay}
          onInvalidatePrivateOverlays={() => setOverlay(null)}
          onRevokeOverlay={() => setOverlay(null)}
          parsingCourseOptions={parsingCourseOptions}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. 一次授权，生成练习</h2>
        {!overlayInput ? (
          <p className={styles.hint}>接纳摘录且隐私边界通过后，才会出现分析按钮。</p>
        ) : (
          <div className={styles.panel}>
            <p>
              已接纳 {overlayInput.excerpts.length} 条摘录 · {characterCount.toLocaleString("zh-CN")} 字符
              {withinLimits ? "" : " · 超出 80 条 / 4 万字符上限，请减少摘录"}
            </p>
            <p className={styles.hint}>
              {provider?.configured
                ? `将发送给 DashScope · ${provider.model ?? "qwen3.7-plus"}，仅一次。`
                : "当前没有配置 Qwen，无法分析。可在本机 .env.local 配置 DASHSCOPE_API_KEY。"}
            </p>
            <label className={styles.confirm}>
              <input
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
                type="checkbox"
              />
              <span>我已检查摘录，授权仅用于一次私人材料分析，不发布、不入库。</span>
            </label>
            <div className={styles.actions}>
              <button
                disabled={!confirmed || !provider?.configured || !withinLimits || authorizing}
                onClick={() => void authorizeOnce()}
                type="button"
              >
                {authorizing ? "生成授权…" : "生成一次性授权"}
              </button>
              <button
                disabled={!authorization || running}
                onClick={() => void runAnalysis()}
                type="button"
              >
                {running ? <><LoaderCircle className={styles.spin} size={16} /> 分析中</> : "开始分析"}
              </button>
            </div>
            {authorization ? <p className={styles.hint}>授权已就绪，点击开始分析后即消费。</p> : null}
          </div>
        )}
        {error ? <p className={styles.error}>{error}</p> : null}
      </section>

      {result ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. 练习</h2>
          <p className={styles.hint}>
            {result.coverage.summary} 覆盖 {result.coverage.status} · 完整课程 {result.coverage.compilationReadiness}。
          </p>
          {result.learningUnit.questions.length > 0 ? (
            <PrivatePracticeRoom analysisResult={result} />
          ) : (
            <p className={styles.hint}>这次没有映射出可练习题目，材料被标为 unmapped。可以改摘录后重新授权。</p>
          )}
        </section>
      ) : null}
    </div>
  );
}
