import type { Metadata } from "next";
import { Suspense } from "react";
import { PrivateMaterialsStudio } from "@/components/private-materials-studio";

export const metadata: Metadata = {
  title: "导入我的资料｜NUR LEARN",
  description: "在浏览器内导入 Word 摘录，生成私人练习。不注册为官方课程。",
  robots: { index: false, follow: false },
};

export default function MyMaterialsPage() {
  return (
    <Suspense fallback={null}>
      <PrivateMaterialsStudio />
    </Suspense>
  );
}
