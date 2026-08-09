-- CreateTable
CREATE TABLE "LearnerAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "courseVersionId" TEXT,
    "offeringId" TEXT,
    "knowledgePointId" TEXT NOT NULL,
    "surface" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "segmentId" TEXT,
    "confirmedText" TEXT NOT NULL,
    "criterionResults" JSONB NOT NULL,
    "answerConfidence" TEXT NOT NULL,
    "scoringStandard" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LearnerAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LearnerFsrsState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "criterionId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "difficulty" REAL NOT NULL,
    "stability" REAL NOT NULL,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "lastReviewAt" DATETIME,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LearnerFsrsState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QbAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedIndex" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "attemptedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QbAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QbFavorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QbFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MockExamSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "answers" JSONB NOT NULL,
    "score" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MockExamSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MaterialAdmissionSyncConsent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "admissionRecordId" TEXT NOT NULL,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "consentedAt" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MaterialAdmissionSyncConsent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "LearnerAttempt_userId_courseId_knowledgePointId_idx" ON "LearnerAttempt"("userId", "courseId", "knowledgePointId");

-- CreateIndex
CREATE INDEX "LearnerAttempt_userId_createdAt_idx" ON "LearnerAttempt"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "LearnerFsrsState_userId_idx" ON "LearnerFsrsState"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LearnerFsrsState_userId_criterionId_key" ON "LearnerFsrsState"("userId", "criterionId");

-- CreateIndex
CREATE INDEX "QbAttempt_userId_questionId_idx" ON "QbAttempt"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "QbFavorite_userId_questionId_key" ON "QbFavorite"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "MockExamSession_sessionId_key" ON "MockExamSession"("sessionId");

-- CreateIndex
CREATE INDEX "MockExamSession_userId_courseId_idx" ON "MockExamSession"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialAdmissionSyncConsent_userId_admissionRecordId_key" ON "MaterialAdmissionSyncConsent"("userId", "admissionRecordId");
