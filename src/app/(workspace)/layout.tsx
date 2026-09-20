import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { publishedCourses } from "@/content/courses";
import { selectCourseSearchSource } from "@/lib/search-index";

/**
 * NUR Workspace 壳（设计系统 v2 R1）。
 * 路由组不影响 URL：/learn、/courses、/question-bank、/account 路径保持不变。
 *
 * R4 ⌘K 检索：课程索引的「字段裁剪」在服务端完成（selectCourseSearchSource），
 * 客户端只接收 title/slug/note/href 级投影，避免把整个课程树打进客户端 bundle。
 */
export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSearchSources = publishedCourses.map(selectCourseSearchSource);
  return <WorkspaceShell courseSearchSources={courseSearchSources}>{children}</WorkspaceShell>;
}
