-- CreateTable
CREATE TABLE "ClewPracticeQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kpId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "stem" TEXT NOT NULL,
    "choices" JSONB,
    "answer" JSONB NOT NULL,
    "explanation" TEXT NOT NULL,
    "sourcePage" INTEGER NOT NULL,
    "generator" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClewPracticeQuestion_kpId_fkey" FOREIGN KEY ("kpId") REFERENCES "HiDocKnowledgePoint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClewPracticeAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "response" JSONB NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "attemptedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClewPracticeAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClewPracticeAttempt_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ClewPracticeQuestion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ClewPracticeQuestion_kpId_order_idx" ON "ClewPracticeQuestion"("kpId", "order");

-- CreateIndex
CREATE INDEX "ClewPracticeAttempt_userId_questionId_idx" ON "ClewPracticeAttempt"("userId", "questionId");
