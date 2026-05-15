import type { Incident, IncidentAiReport, Severity } from "@prisma/client";

export type ReportCategory = "Payment" | "Security" | "API Contract" | "General";

export type RiskClassification = {
  recommendedSeverity: Severity;
  category: ReportCategory;
  businessRisk: string;
  technicalRisk: string;
  complianceRisk: string;
  recommendedSla: string;
};

export type TimelineEntry = {
  time: string;
  event: string;
};

export type ChecklistItem = {
  title: string;
  done: boolean;
  category: string;
};

export type TechnicalActionPlan = {
  backend: string[];
  database: string[];
  qa: string[];
  devops: string[];
  security: string[];
  compliance: string[];
};

export type PostmortemReport = {
  executiveSummary: string;
  incidentDetails: string;
  impact: string;
  timeline: TimelineEntry[];
  rootCause: string;
  resolution: string;
  preventionPlan: string[];
  actionItems: string[];
  owners: string[];
  auditNotes: string[];
};

export type GeneratedIncidentReport = {
  riskClassification: RiskClassification;
  timeline: TimelineEntry[];
  checklist: ChecklistItem[];
  technicalActionPlan: TechnicalActionPlan;
  stakeholderSummary: string;
  postmortemReport: PostmortemReport;
};

export type ReportTemplateChecklistItem = {
  title: string;
  category: string;
};

export type ReportTemplate = {
  category: ReportCategory;
  checklistItems: ReportTemplateChecklistItem[];
  technicalActionPlan: TechnicalActionPlan;
  businessRisk: string;
  technicalRisk: string;
  complianceRisk: string;
  preventionPlan: string[];
  actionItems: string[];
  owners: string[];
};

export type ReportIncident = Pick<
  Incident,
  | "id"
  | "title"
  | "type"
  | "severity"
  | "status"
  | "affectedSystem"
  | "impactSummary"
  | "affectedUsers"
  | "suspectedCause"
  | "detectedAt"
  | "resolvedAt"
>;

export type SavedIncidentReport = IncidentAiReport;
