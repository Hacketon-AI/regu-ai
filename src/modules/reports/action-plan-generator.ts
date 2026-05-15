import type {
  ReportTemplate,
  TechnicalActionPlan,
} from "@/modules/reports/report.types";

export function generateTechnicalActionPlan(
  template: ReportTemplate,
): TechnicalActionPlan {
  return {
    backend: [...template.technicalActionPlan.backend],
    database: [...template.technicalActionPlan.database],
    qa: [...template.technicalActionPlan.qa],
    devops: [...template.technicalActionPlan.devops],
    security: [...template.technicalActionPlan.security],
    compliance: [...template.technicalActionPlan.compliance],
  };
}
