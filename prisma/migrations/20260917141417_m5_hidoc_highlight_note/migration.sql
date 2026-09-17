-- CreateTable
CREATE TABLE "HiDocHighlight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "kpId" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "suffix" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "note" TEXT,
    "anchor" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HiDocHighlight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HiDocHighlight_kpId_fkey" FOREIGN KEY ("kpId") REFERENCES "HiDocKnowledgePoint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HiDocNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "contentMd" TEXT NOT NULL,
    "generator" TEXT NOT NULL,
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HiDocNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HiDocNote_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "HiDocChapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "HiDocHighlight_userId_kpId_idx" ON "HiDocHighlight"("userId", "kpId");

-- CreateIndex
CREATE INDEX "HiDocNote_userId_updatedAt_idx" ON "HiDocNote"("userId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "HiDocNote_userId_chapterId_key" ON "HiDocNote"("userId", "chapterId");
