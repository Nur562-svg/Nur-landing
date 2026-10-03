import "server-only";

import { mkdir, readFile, rmdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { isSafeHiDocStorageKey } from "./storage-key";

/**
 * Hi doc 教材存储抽象（server-only）。
 *
 * MVP 落本地磁盘卷：HIDOC_STORAGE_ROOT（生产默认 /data/hidoc，须挂持久卷）。
 * 接口保持对象存储语义（不透明 storageKey + put/remove），后续接 OSS/COS 时只新增 driver，
 * 业务代码（textbooks.ts）不动。
 */
export type HiDocStorageDriver = {
  readonly id: "local-disk";
  putObject(key: string, data: Uint8Array): Promise<void>;
  readObject(key: string): Promise<Uint8Array>;
  removeObject(key: string): Promise<void>;
};

function resolveStorageRoot(): string {
  const configured = process.env.HIDOC_STORAGE_ROOT?.trim();
  if (configured) {
    return configured;
  }
  // 生产默认落数据卷；本地开发落仓库内忽略目录，避免 /data 权限问题。
  return process.env.NODE_ENV === "production"
    ? "/data/hidoc"
    : path.join(process.cwd(), ".hidoc-storage");
}

function resolveLocalPath(root: string, key: string): string {
  if (!isSafeHiDocStorageKey(key)) {
    throw new Error(`非法的教材存储键：${key}`);
  }
  const resolvedRoot = path.resolve(root);
  const absolutePath = path.resolve(resolvedRoot, key);
  if (!absolutePath.startsWith(resolvedRoot + path.sep)) {
    throw new Error(`教材存储键越界：${key}`);
  }
  return absolutePath;
}

function createLocalDiskDriver(root: string): HiDocStorageDriver {
  return {
    id: "local-disk",
    async putObject(key, data) {
      const filePath = resolveLocalPath(root, key);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, data);
    },
    async readObject(key) {
      const filePath = resolveLocalPath(root, key);
      return new Uint8Array(await readFile(filePath));
    },
    async removeObject(key) {
      const filePath = resolveLocalPath(root, key);
      await rm(filePath, { force: true });
      // 键布局为 hidoc/{userId}/{textbookId}/{fileName}：文件删掉后顺手清掉空的教材目录。
      // 目录非空或不存在时忽略失败（不影响业务结论）。
      try {
        await rmdir(path.dirname(filePath));
      } catch {
        // 目录非空/不存在：保持原样
      }
    },
  };
}

let cachedDriver: HiDocStorageDriver | null = null;

/**
 * 当前存储驱动。未实现的驱动明确报错（不静默降级到本地磁盘）。
 */
export function getHiDocStorage(): HiDocStorageDriver {
  if (cachedDriver) {
    return cachedDriver;
  }
  const driver = process.env.HIDOC_STORAGE_DRIVER?.trim() || "local";
  if (driver !== "local") {
    throw new Error(`Hi doc 存储驱动「${driver}」尚未接入：当前仅支持 local（本地磁盘卷）。`);
  }
  cachedDriver = createLocalDiskDriver(resolveStorageRoot());
  return cachedDriver;
}