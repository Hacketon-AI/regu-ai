-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('Low', 'Medium', 'High', 'Critical');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('Open', 'Investigating', 'Mitigating', 'Monitoring', 'Resolved', 'Closed');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('To Do', 'In Progress', 'Done', 'Blocked');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Low', 'Medium', 'High', 'Critical');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "status" "IncidentStatus" NOT NULL DEFAULT 'Open',
    "affectedSystem" TEXT NOT NULL,
    "impactSummary" TEXT NOT NULL,
    "affectedUsers" INTEGER NOT NULL,
    "rawLogs" TEXT,
    "suspectedCause" TEXT,
    "detectedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident_ai_reports" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "riskClassification" JSONB NOT NULL,
    "timeline" JSONB NOT NULL,
    "checklist" JSONB NOT NULL,
    "technicalActionPlan" JSONB NOT NULL,
    "stakeholderSummary" TEXT NOT NULL,
    "postmortemReport" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incident_ai_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident_tasks" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "owner" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'To Do',
    "priority" "Priority" NOT NULL,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incident_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident_audit_trails" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "oldValue" JSONB,
    "newValue" JSONB,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "incident_audit_trails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "incidents_createdBy_idx" ON "incidents"("createdBy");

-- CreateIndex
CREATE INDEX "incidents_severity_idx" ON "incidents"("severity");

-- CreateIndex
CREATE INDEX "incidents_status_idx" ON "incidents"("status");

-- CreateIndex
CREATE INDEX "incidents_detectedAt_idx" ON "incidents"("detectedAt");

-- CreateIndex
CREATE UNIQUE INDEX "incident_ai_reports_incidentId_key" ON "incident_ai_reports"("incidentId");

-- CreateIndex
CREATE INDEX "incident_tasks_incidentId_idx" ON "incident_tasks"("incidentId");

-- CreateIndex
CREATE INDEX "incident_tasks_status_idx" ON "incident_tasks"("status");

-- CreateIndex
CREATE INDEX "incident_tasks_priority_idx" ON "incident_tasks"("priority");

-- CreateIndex
CREATE INDEX "incident_audit_trails_incidentId_idx" ON "incident_audit_trails"("incidentId");

-- CreateIndex
CREATE INDEX "incident_audit_trails_action_idx" ON "incident_audit_trails"("action");

-- CreateIndex
CREATE INDEX "incident_audit_trails_createdAt_idx" ON "incident_audit_trails"("createdAt");

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incident_ai_reports" ADD CONSTRAINT "incident_ai_reports_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incident_tasks" ADD CONSTRAINT "incident_tasks_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incident_audit_trails" ADD CONSTRAINT "incident_audit_trails_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
