import { TERMS_SECTIONS } from "@/content/legal";
import { SITE_NAME } from "@/lib/site-config";

export const metadata = {
  title: "用户协议",
  description: `${SITE_NAME} 用户协议与服务条款`,
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">用户协议</h1>
      <div className="space-y-6 text-sm leading-relaxed text-neutral-700">
        {TERMS_SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="text-base font-medium mb-2 text-neutral-900">{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
