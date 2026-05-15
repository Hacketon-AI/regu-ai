import type { ReportTemplate } from "@/modules/reports/report.types";

export const securityTemplate: ReportTemplate = {
  category: "Security",
  businessRisk:
    "Security incidents can expose sensitive access paths, disrupt trust, and trigger compliance review.",
  technicalRisk:
    "Unauthorized access indicators require containment, log preservation, and credential validation.",
  complianceRisk:
    "Security evidence must be retained for audit, compliance review, and potential notification decisions.",
  checklistItems: [
    { title: "Isolate affected system", category: "Containment" },
    { title: "Preserve access and application logs", category: "Evidence" },
    { title: "Rotate affected credentials", category: "Security" },
    { title: "Review privileged access", category: "Security" },
    { title: "Assign security owner", category: "Ownership" },
    { title: "Perform compliance review", category: "Compliance" },
    { title: "Define prevention controls", category: "Prevention" },
  ],
  technicalActionPlan: {
    backend: [
      "Review authentication, authorization, and session validation behavior.",
      "Check affected endpoints for missing permission checks.",
    ],
    database: [
      "Preserve access evidence and review sensitive table access patterns.",
    ],
    qa: [
      "Run regression tests for authentication and role-based access controls.",
    ],
    devops: [
      "Isolate affected workloads if active compromise indicators remain.",
      "Preserve infrastructure logs before retention windows expire.",
    ],
    security: [
      "Rotate credentials and invalidate suspicious sessions.",
      "Review access logs and assign a security owner for containment.",
    ],
    compliance: [
      "Assess whether the incident requires formal compliance notification.",
      "Record evidence handling and decision rationale.",
    ],
  },
  preventionPlan: [
    "Add stronger privileged-access monitoring.",
    "Enforce credential rotation and session invalidation playbooks.",
    "Review prevention controls with security and compliance owners.",
  ],
  actionItems: [
    "Preserve all relevant access logs.",
    "Rotate credentials for affected accounts or services.",
    "Complete compliance impact review.",
  ],
  owners: ["Security Owner", "Backend Lead", "Compliance Lead"],
};
