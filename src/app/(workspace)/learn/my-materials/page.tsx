import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PrivateMaterialsStudio } from "@/components/private-materials-studio";
import styles from "@/components/clew.module.css";

export const metadata: Metadata = {
  title: "导入我的资料｜Ariadne",
  description: "在浏览器内导入 Word 摘录，生成私人练习。不注册为官方课程。",
  robots: { index: false, follow: false },
};

export default function MyMaterialsPage() {
  return (
    <div>
      <div className={styles.migrateBanner} role="note" aria-label="功能迁移说明">
        <p>
          「我的资料」已并入 Clew 课题工作坊：材料改存服务器、仅本人可见、可跨设备继续，并支持就材料追问答疑。
          <Link href="/learn/clew/w"> 前往课题工作坊 </Link>
          。下方浏览器本地快练仍可继续使用，已保存的本地数据不会丢失。
        </p>
      </div>
      <Suspense fallback={null}>
        <PrivateMaterialsStudio />
      </Suspense>
    </div>
  );
}
