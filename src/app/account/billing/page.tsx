import { getCurrentSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { BillingPanel } from "@/components/billing-panel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会员中心",
  description: "NUR LEARN 会员订阅与订单管理",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login?next=/account/billing");
  }
  return <BillingPanel />;
}
