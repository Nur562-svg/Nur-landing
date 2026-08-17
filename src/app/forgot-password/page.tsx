"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import styles from "@/components/auth-form.module.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!data.ok) {
        setError(data.error ?? "发送失败");
        return;
      }
      setDone(true);
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
          <h1 className={styles.title}>找回密码</h1>
          <p className={styles.subtitle}>
            输入注册邮箱，我们将发送密码重置链接到你的邮箱（15 分钟内有效）。
          </p>
        </header>

        {done ? (
          <div className={styles.form}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)" }}>
              如该邮箱已注册，重置链接已发送。请检查邮箱（包括垃圾邮件文件夹）。
            </p>
            <Link href="/login" className={styles.submitButton} style={{ textDecoration: "none", justifyContent: "center" }}>
              返回登录 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>邮箱</span>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="you@example.edu.cn"
                autoComplete="email"
                required
              />
            </label>
            {error ? (
              <p className={styles.error} role="alert">{error}</p>
            ) : null}
            <button className={styles.submitButton} type="submit" disabled={submitting}>
              {submitting ? <Loader2 className={styles.spinner} size={16} aria-hidden="true" /> : null}
              发送重置链接
              {!submitting ? <ArrowRight size={16} aria-hidden="true" /> : null}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
