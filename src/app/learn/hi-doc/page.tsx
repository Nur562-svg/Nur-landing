import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hi doc | NUR LEARN",
  description: "上传教材并建立个人学习书架。",
  robots: { index: false, follow: false },
};

export default function HiDocPlaceholderPage() {
  return (
    <main className="min-h-dvh bg-[#f7f4ee] px-6 py-16 text-[#10100f]">
      <section className="mx-auto max-w-3xl border border-[#10100f] bg-[#fbf9f4] p-8">
        <p className="text-sm font-semibold tracking-[0.08em] text-[#6c6a66]">HI DOC</p>
        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight">教材学习书架</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#6c6a66]">
          Hi doc 将支持上传教材、目录识别、知识点萃取与个人化教学。M0 当前仅提供入口占位，上传与书架将在 M1 开放。
        </p>
        <Link
          href="/learn"
          className="mt-8 inline-flex min-h-11 items-center border border-[#10100f] bg-[#10100f] px-6 text-sm font-semibold text-[#fbf9f4]"
        >
          返回学习首页
        </Link>
      </section>
    </main>
  );
}
