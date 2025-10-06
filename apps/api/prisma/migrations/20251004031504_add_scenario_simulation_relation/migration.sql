-- AlterTable
ALTER TABLE "Simulation" ADD COLUMN     "scenarioId" TEXT;

-- CreateIndex
CREATE INDEX "Simulation_scenarioId_idx" ON "Simulation"("scenarioId");

-- AddForeignKey
ALTER TABLE "Simulation" ADD CONSTRAINT "Simulation_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
