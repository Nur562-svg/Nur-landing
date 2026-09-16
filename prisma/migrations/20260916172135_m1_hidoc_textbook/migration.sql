-- CreateTable
CREATE TABLE "HiDocTextbook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "hasTextLayer" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'uploaded',
    "toc" JSONB,
    "activeMonth" TEXT NOT NULL,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HiDocTextbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "HiDocTextbook_storageKey_key" ON "HiDocTextbook"("storageKey");

-- CreateIndex
CREATE INDEX "HiDocTextbook_userId_activeMonth_deletedAt_idx" ON "HiDocTextbook"("userId", "activeMonth", "deletedAt");

-- CreateIndex
CREATE INDEX "HiDocTextbook_userId_createdAt_idx" ON "HiDocTextbook"("userId", "createdAt");
