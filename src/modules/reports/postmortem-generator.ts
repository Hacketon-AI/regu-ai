import type {
  ChecklistItem,
  PostmortemReport,
  ReportIncident,
  ReportTemplate,
  RiskClassification,
  TimelineEntry,
} from "@/modules/reports/report.types";

export function generatePostmortemReport(
  incident: ReportIncident,
  template: ReportTemplate,
  riskClassification: RiskClassification,
  timeline: TimelineEntry[],
  checklist: ChecklistItem[],
): PostmortemReport {
  return {
    executiveSummary: `${incident.title} affected ${incident.affectedSystem} and was classified as ${riskClassification.recommendedSeverity}.`,
    incidentDetails: `${incident.type} incident detected at ${incident.detectedAt.toISOString()} with status ${incident.status}.`,
    impact: incident.impactSummary,
    timeline,
    rootCause: incident.suspectedCause ?? "Root cause requires further investigation.",
    resolution: buildResolutionSummary(incident),
    preventionPlan: [...template.preventionPlan],
    actionItems: checklist.map((item) => item.title),
    owners: [...template.owners],
    auditNotes: [
      "Report generated using deterministic rule-based templates.",
      `Template category selected: ${template.category}.`,
      "Generated report should be reviewed by the incident owner before closure.",
    ],
  };
}

function buildResolutionSummary(incident: ReportIncident): string {
  if (incident.resolvedAt) {
    return `Incident resolved at ${incident.resolvedAt.toISOString()} and should remain under monitoring.`;
  }

  return "Incident is not resolved yet. Mitigation and validation remain active.";
}
