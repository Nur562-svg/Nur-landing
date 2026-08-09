"use client";

import { useCallback, useEffect, useState } from "react";
import type { AuthUserView } from "@/types/auth";

/**
 * 客户端会话状态：从 /api/auth/session 读取当前登录用户。
 * 未登录返回 user: null；loading 期间避免闪烁。
 */
export function useSession() {
  const [user, setUser] = useState<AuthUserView | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/session", { cache: "no-store" });
      if (response.ok) {
        const data = (await response.json()) as { user: AuthUserView | null };
        setUser(data.user);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  return { user, loading, refresh, logout };
}
