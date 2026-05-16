import { Prisma, type IncidentAiReport } from "@prisma/client";

import { ApiError } from "@/lib/api-error";
import { DEMO_ACTOR } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { createAuditTrail } from "@/modules/audit/audit.service";
import { generateTechnicalActionPlan } from "@/modules/reports/action-plan-generator";
import { generateChecklist } from "@/modules/reports/checklist-generator";
import { generatePostmortemReport } from "@/modules/reports/postmortem-generator";
import { classifyIncidentRisk } from "@/modules/reports/risk-classifier";
import type {
  GeneratedIncidentReport,
  ReportIncident,
  ReportTemplate,
} from "@/modules/reports/report.types";
import { generateStakeholderSummary } from "@/modules/reports/stakeholder-summary-generator";
import { apiContractTemplate } from "@/modules/reports/templates/api-contract-template";
import { defaultTemplate } from "@/modules/reports/templates/default-template";
import { paymentTemplate } from "@/modules/reports/templates/payment-template";
import { securityTemplate } from "@/modules/reports/templates/security-template";
import { generateTimeline } from "@/modules/reports/timeline-generator";

type ReportAuditSummary = Record<string, Prisma.InputJsonValue | null>;

export async function generateIncidentReport(
  incidentId: string,
): Promise<IncidentAiReport> {
  const incident = await prisma.incident.findUnique({
    where: { id: incidentId },
    include: {
      aiReport: true,
    },
  });

  if (!incident) {
    throw new ApiError("Incident not found.", 404);
  }

  const previousReport = incident.aiReport;
  const generatedReport = buildGeneratedReport(incident);

  const savedReport = await prisma.incidentAiReport.upsert({
    where: {
      incidentId: incident.id,
    },
    create: {
      incidentId: incident.id,
      ...toReportPersistenceData(generatedReport),
    },
    update: toReportPersistenceData(generatedReport),
  });

  await createAuditTrail({
    incidentId: incident.id,
    action: "Report generated",
    actor: DEMO_ACTOR,
    oldValue: previousReport ? buildSavedReportSummary(previousReport) : null,
    newValue: buildGeneratedReportSummary(generatedReport),
    note: "Incident response report generated",
  });

  return savedReport;
}

export async function getSavedIncidentReport(
  incidentId: string,
): Promise<IncidentAiReport> {
  const incident = await prisma.incident.findUnique({
    where: { id: incidentId },
    select: {
      id: true,
      aiReport: true,
    },
  });

  if (!incident) {
    throw new ApiError("Incident not found.", 404);
  }

  if (!incident.aiReport) {
    throw new ApiError("Incident report has not been generated yet", 404);
  }

  return incident.aiReport;
}

function buildGeneratedReport(
  incident: ReportIncident,
): GeneratedIncidentReport {
  const template = selectReportTemplate(incident.type);
  const riskClassification = classifyIncidentRisk(incident, template);
  const timeline = generateTimeline(incident);
  const checklist = generateChecklist(template);
  const technicalActionPlan = generateTechnicalActionPlan(template);
  const stakeholderSummary = generateStakeholderSummary(
    incident,
    riskClassification,
  );
  const postmortemReport = generatePostmortemReport(
    incident,
    template,
    riskClassification,
    timeline,
    checklist,
  );

  return {
    riskClassification,
    timeline,
    checklist,
    technicalActionPlan,
    stakeholderSummary,
    postmortemReport,
  };
}

function selectReportTemplate(incidentType: string): ReportTemplate {
  const normalizedType = incidentType.toLowerCase();

  if (normalizedType.includes("payment")) {
    return paymentTemplate;
  }

  if (/(security|unauthorized|breach|login)/i.test(normalizedType)) {
    return securityTemplate;
  }

  if (/(api|contract|mobile|breaking)/i.test(normalizedType)) {
    return apiContractTemplate;
  }

  return defaultTemplate;
}

function toReportPersistenceData(
  report: GeneratedIncidentReport,
): Pick<
  Prisma.IncidentAiReportUncheckedCreateInput,
  | "riskClassification"
  | "timeline"
  | "checklist"
  | "technicalActionPlan"
  | "stakeholderSummary"
  | "postmortemReport"
> {
  return {
    riskClassification: toJsonInput(report.riskClassification),
    timeline: toJsonInput(report.timeline),
    checklist: toJsonInput(report.checklist),
    technicalActionPlan: toJsonInput(report.technicalActionPlan),
    stakeholderSummary: report.stakeholderSummary,
    postmortemReport: toJsonInput(report.postmortemReport),
  };
}

function buildGeneratedReportSummary(
  report: GeneratedIncidentReport,
): ReportAuditSummary {
  return {
    category: report.riskClassification.category,
    recommendedSeverity: report.riskClassification.recommendedSeverity,
    checklistCount: report.checklist.length,
    timelineCount: report.timeline.length,
  };
}

function buildSavedReportSummary(report: IncidentAiReport): ReportAuditSummary {
  return {
    reportId: report.id,
    incidentId: report.incidentId,
    updatedAt: report.updatedAt.toISOString(),
  };
}

function toJsonInput(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}
