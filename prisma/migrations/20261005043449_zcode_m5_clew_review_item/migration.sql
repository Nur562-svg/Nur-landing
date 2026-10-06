-- CreateTable
CREATE TABLE "ClewReviewItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "kpId" TEXT NOT NULL,
    "textbookId" TEXT NOT NULL,
    "sourceKind" TEXT NOT NULL,
    "stability" REAL NOT NULL,
    "difficulty" REAL NOT NULL,
    "lastReviewedAt" DATETIME NOT NULL,
    "dueAt" DATETIME NOT NULL,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "suspended" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClewReviewItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClewReviewItem_kpId_fkey" FOREIGN KEY ("kpId") REFERENCES "HiDocKnowledgePoint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ClewReviewItem_userId_dueAt_idx" ON "ClewReviewItem"("userId", "dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "ClewReviewItem_userId_kpId_sourceKind_key" ON "ClewReviewItem"("userId", "kpId", "sourceKind");
