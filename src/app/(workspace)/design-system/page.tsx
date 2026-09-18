import { getCurrentSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { DesignSystemPreview } from "@/components/design-system/design-system-preview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "设计系统 v2 预览",
  description: "NUR LEARN 设计系统 v2 组件与 token 对照基准（开发预览）",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/** 视觉基准页：仅登录用户可见，不进导航。 */
export default async function DesignSystemPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login?next=/design-system");
  }
  return <DesignSystemPreview />;
}
