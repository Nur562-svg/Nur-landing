"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import type { AuthApiResponse } from "@/types/auth";
import styles from "./auth-form.module.css";

type AuthFormProps = {
  mode: "login" | "register";
};

/** 登录 / 注册共享表单（编辑风格，与全局视觉系统一致）。 */
export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/learn";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const body =
        mode === "register"
          ? JSON.stringify({ email, password, displayName })
          : JSON.stringify({ email, password });
      const response = await fetch(
        mode === "register" ? "/api/auth/register" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        },
      );
      const data = (await response.json()) as AuthApiResponse;
      if (!data.ok) {
        setError(data.error);
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("网络异常，请稍后再试。");
    } finally {
      setSubmitting(false);
    }
  }

  const isRegister = mode === "register";

  return (
    <main className={styles.container}>
      <Link className={styles.backLink} href="/">
        <ArrowLeft size={16} /> 返回首页
      </Link>
      <section className={styles.card}>
        <header className={styles.cardHeader}>
          <h1 className={styles.title}>{isRegister ? "创建账户" : "登录 NUR LEARN"}</h1>
          <p className={styles.subtitle}>
            {isRegister
              ? "注册后学习进度、作答记忆与收藏将绑定账户（登录后支持云端同步）。"
              : "登录后继续你的辨证学习。登录状态下进度可与账户同步（演示优先本地）。"}
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {isRegister ? (
            <label className={styles.field}>
              <span className={styles.fieldLabel}>昵称</span>
              <input
                className={styles.input}
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.currentTarget.value)}
                placeholder="1–24 个字符"
                autoComplete="nickname"
                maxLength={24}
                required
              />
            </label>
          ) : null}
          <label className={styles.field}>
            <span className={styles.fieldLabel}>邮箱</span>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              placeholder="you@example.edu.cn"
              autoComplete="email"
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>密码</span>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              placeholder={isRegister ? "至少 8 位" : "输入密码"}
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={isRegister ? 8 : 1}
              required
            />
          </label>

          {error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}

          <button className={styles.submitButton} type="submit" disabled={submitting}>
            {submitting ? <Loader2 className={styles.spinner} size={16} aria-hidden="true" /> : null}
            {isRegister ? "注册并登录" : "登录"}
            {!submitting ? <ArrowRight size={16} aria-hidden="true" /> : null}
          </button>
        </form>

        <footer className={styles.cardFooter}>
          {isRegister ? (
            <>
              已有账户？<Link href={`/login${next !== "/learn" ? `?next=${encodeURIComponent(next)}` : ""}`}>直接登录</Link>
            </>
          ) : (
            <>
              还没有账户？<Link href={`/register${next !== "/learn" ? `?next=${encodeURIComponent(next)}` : ""}`}>免费注册</Link>
            </>
          )}
        </footer>
      </section>
    </main>
  );
}
