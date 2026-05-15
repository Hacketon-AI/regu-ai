import type {
  ReportIncident,
  RiskClassification,
} from "@/modules/reports/report.types";

export function generateStakeholderSummary(
  incident: ReportIncident,
  riskClassification: RiskClassification,
): string {
  return [
    `${incident.title} is classified as a ${riskClassification.category} incident with recommended severity ${riskClassification.recommendedSeverity}.`,
    `The affected system is ${incident.affectedSystem}, with ${incident.affectedUsers} affected user(s).`,
    `Current status is ${incident.status}. ${incident.impactSummary}`,
    `Recommended SLA: ${riskClassification.recommendedSla}`,
  ].join(" ");
}
