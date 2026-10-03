-- CreateTable
CREATE TABLE "UnifiedLearningEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentType" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "UnifiedLearningEvent_userId_timestamp_idx" ON "UnifiedLearningEvent"("userId", "timestamp");

-- CreateIndex
CREATE INDEX "UnifiedLearningEvent_userId_contentType_contentId_idx" ON "UnifiedLearningEvent"("userId", "contentType", "contentId");

-- CreateIndex
CREATE UNIQUE INDEX "UnifiedLearningEvent_userId_sourceKey_key" ON "UnifiedLearningEvent"("userId", "sourceKey");
