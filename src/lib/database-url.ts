export function isPostgresConnectionString(url: string): boolean {
  return /^postgres(ql)?:\/\//i.test(url.trim());
}

export function assertNodeRuntimeDatabaseUrl(options: {
  nodeEnv: string | undefined;
  databaseUrl: string | undefined;
  d1Available: boolean;
}): void {
  if (options.d1Available) {
    return;
  }
  if (options.nodeEnv !== "production") {
    return;
  }
  const url = options.databaseUrl?.trim() ?? "";
  if (!isPostgresConnectionString(url)) {
    throw new Error(
      "NUR LEARN 生产环境必须使用 Postgres DATABASE_URL（postgresql://...），禁止 sqlite。",
    );
  }
}
