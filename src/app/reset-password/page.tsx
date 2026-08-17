"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import styles from "@/components/auth-form.module.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("缺少重置令牌，请从邮件中的链接进入。");
    }
  }, [token]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting || !token) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!data.ok) {
        setError(data.error ?? "重置失败");
        return;
      }
      router.push("/learn");
      router.refresh();
    } catch {
      setError("网络异常，请稍后再试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.container}>
      <Link className={styles.backLink} href="/login">
        <ArrowLeft size={16} /> 返回登录
      </Link>
      <section className={styles.card}>
        <header className={styles.cardHeader}>
          <h1 className={styles.title}>重置密码</h1>
          <p className={styles.subtitle}>请输入新密码（至少 8 位）。重置后将自动登录。</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>新密码</span>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="至少 8 位"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          {error ? (
            <p className={styles.error} role="alert">{error}</p>
          ) : null}
          <button className={styles.submitButton} type="submit" disabled={submitting || !token}>
            {submitting ? <Loader2 className={styles.spinner} size={16} aria-hidden="true" /> : null}
            重置密码并登录
            {!submitting ? <ArrowRight size={16} aria-hidden="true" /> : null}
          </button>
        </form>
      </section>
    </main>
  );
}
