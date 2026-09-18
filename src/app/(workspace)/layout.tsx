import { WorkspaceShell } from "@/components/workspace/workspace-shell";

/**
 * NUR Workspace 壳（设计系统 v2 R1）。
 * 路由组不影响 URL：/learn、/courses、/question-bank、/account 路径保持不变。
 */
export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}
