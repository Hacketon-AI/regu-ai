import type { Severity } from "@prisma/client";

import type {
  ReportIncident,
  ReportTemplate,
  RiskClassification,
} from "@/modules/reports/report.types";

const severityRank: Record<Severity, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
};

const slaBySeverity: Record<Severity, string> = {
  Low: "Respond within 1 business day and monitor during normal operations.",
  Medium: "Respond within 4 hours and provide same-day status updates.",
  High: "Respond within 1 hour and maintain active mitigation updates.",
  Critical: "Start immediate response and provide updates every 30 minutes.",
};

export function classifyIncidentRisk(
  incident: ReportIncident,
  template: ReportTemplate,
): RiskClassification {
  const recommendedSeverity = recommendSeverity(incident);

  return {
    recommendedSeverity,
    category: template.category,
    businessRisk: template.businessRisk,
    technicalRisk: `${template.technicalRisk} Affected system: ${incident.affectedSystem}.`,
    complianceRisk: template.complianceRisk,
    recommendedSla: slaBySeverity[recommendedSeverity],
  };
}

function recommendSeverity(incident: ReportIncident): Severity {
  if (incident.affectedUsers >= 10_000 || incident.severity === "Critical") {
    return "Critical";
  }

  if (incident.affectedUsers >= 1_000 || incident.severity === "High") {
    return "High";
  }

  if (incident.affectedUsers >= 100 || incident.severity === "Medium") {
    return "Medium";
  }

  return rankHigherSeverity(incident.severity, "Low");
}

function rankHigherSeverity(first: Severity, second: Severity): Severity {
  return severityRank[first] >= severityRank[second] ? first : second;
}
