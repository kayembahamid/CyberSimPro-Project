-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'EMPLOYEE';
ALTER TYPE "UserRole" ADD VALUE 'COMPANY_ADMIN';

-- CreateTable
CREATE TABLE "training_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_training_reports" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "totalEmployees" INTEGER NOT NULL,
    "completedCount" INTEGER NOT NULL,
    "inProgressCount" INTEGER NOT NULL,
    "notStartedCount" INTEGER NOT NULL,
    "averageScore" DOUBLE PRECISION NOT NULL,
    "goldBadges" INTEGER NOT NULL DEFAULT 0,
    "silverBadges" INTEGER NOT NULL DEFAULT 0,
    "bronzeBadges" INTEGER NOT NULL DEFAULT 0,
    "moduleStats" JSONB,
    "departmentStats" JSONB,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_training_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "training_progress_userId_idx" ON "training_progress"("userId");

-- CreateIndex
CREATE INDEX "training_progress_moduleId_idx" ON "training_progress"("moduleId");

-- CreateIndex
CREATE INDEX "training_progress_completed_idx" ON "training_progress"("completed");

-- CreateIndex
CREATE UNIQUE INDEX "training_progress_userId_moduleId_stepId_key" ON "training_progress"("userId", "moduleId", "stepId");

-- CreateIndex
CREATE INDEX "company_training_reports_organizationId_idx" ON "company_training_reports"("organizationId");

-- CreateIndex
CREATE INDEX "company_training_reports_generatedAt_idx" ON "company_training_reports"("generatedAt" DESC);

-- AddForeignKey
ALTER TABLE "training_progress" ADD CONSTRAINT "training_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
