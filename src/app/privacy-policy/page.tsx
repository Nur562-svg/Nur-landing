import { PRIVACY_POLICY_SECTIONS } from "@/content/legal";
import { SITE_NAME } from "@/lib/site-config";

export const metadata = {
  title: "隐私政策",
  description: `${SITE_NAME} 隐私政策与数据处理说明`,
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">隐私政策</h1>
      <div className="space-y-6 text-sm leading-relaxed text-neutral-700">
        {PRIVACY_POLICY_SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="text-base font-medium mb-2 text-neutral-900">{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
