import type { ReportTemplate } from "@/modules/reports/report.types";

export const defaultTemplate: ReportTemplate = {
  category: "General",
  businessRisk:
    "The incident may affect service reliability, user trust, and operational continuity.",
  technicalRisk:
    "The technical cause requires structured investigation across logs, recent changes, and affected services.",
  complianceRisk:
    "Incident handling should be documented to preserve auditability and post-incident accountability.",
  checklistItems: [
    { title: "Assign incident owner", category: "Ownership" },
    { title: "Collect logs", category: "Investigation" },
    { title: "Identify impact", category: "Risk" },
    { title: "Investigate root cause", category: "Investigation" },
    { title: "Prepare mitigation", category: "Mitigation" },
    { title: "Validate fix", category: "QA" },
    { title: "Monitor recovery", category: "Monitoring" },
    { title: "Prepare post-mortem", category: "Postmortem" },
  ],
  technicalActionPlan: {
    backend: [
      "Review application logs and recent code changes for the affected system.",
    ],
    database: [
      "Check database health, slow queries, and data integrity for affected flows.",
    ],
    qa: ["Validate fix in the impacted workflow before closing the incident."],
    devops: [
      "Review service health metrics, deploy timeline, and infrastructure alerts.",
    ],
    security: ["Check whether logs show suspicious or unauthorized activity."],
    compliance: [
      "Keep incident decisions, impact assessment, and remediation notes audit-ready.",
    ],
  },
  preventionPlan: [
    "Improve monitoring coverage for the affected workflow.",
    "Add regression checks for the confirmed root cause.",
    "Review incident response ownership and escalation flow.",
  ],
  actionItems: [
    "Assign an incident owner.",
    "Collect relevant logs and metrics.",
    "Prepare mitigation and validate recovery.",
  ],
  owners: ["Incident Owner", "Backend Lead", "DevOps Lead"],
};
