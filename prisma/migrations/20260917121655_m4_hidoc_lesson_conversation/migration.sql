-- CreateTable
CREATE TABLE "HiDocLesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kpId" TEXT NOT NULL,
    "contentMd" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "generator" TEXT NOT NULL,
    "sourceExcerpt" TEXT NOT NULL,
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HiDocLesson_kpId_fkey" FOREIGN KEY ("kpId") REFERENCES "HiDocKnowledgePoint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HiDocConversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "kpId" TEXT,
    "messages" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HiDocConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "HiDocLesson_kpId_key" ON "HiDocLesson"("kpId");

-- CreateIndex
CREATE INDEX "HiDocConversation_userId_updatedAt_idx" ON "HiDocConversation"("userId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "HiDocConversation_userId_kpId_key" ON "HiDocConversation"("userId", "kpId");
