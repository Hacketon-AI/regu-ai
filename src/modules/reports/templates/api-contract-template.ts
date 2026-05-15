import type { ReportTemplate } from "@/modules/reports/report.types";

export const apiContractTemplate: ReportTemplate = {
  category: "API Contract",
  businessRisk:
    "Breaking API changes can disrupt mobile or frontend clients and degrade user workflows.",
  technicalRisk:
    "Contract mismatch may cause parsing failures, hidden client errors, and version compatibility issues.",
  complianceRisk:
    "Customer-impacting API behavior changes must be documented for release and support traceability.",
  checklistItems: [
    { title: "Identify changed response contract", category: "Investigation" },
    { title: "Compare old and new API behavior", category: "Investigation" },
    { title: "Coordinate with mobile/frontend team", category: "Communication" },
    { title: "Prepare rollback or backward-compatible patch", category: "Mitigation" },
    { title: "Run regression test", category: "QA" },
    { title: "Update API documentation", category: "Documentation" },
    {
      title: "Prevent uncoordinated contract changes",
      category: "Prevention",
    },
  ],
  technicalActionPlan: {
    backend: [
      "Compare current response payload with the last compatible API contract.",
      "Ship a rollback or backward-compatible patch for affected clients.",
    ],
    database: [
      "Check whether data shape or migration changes contributed to response mismatch.",
    ],
    qa: [
      "Run regression tests across API contract, mobile, and frontend integration flows.",
    ],
    devops: [
      "Review deployment timeline and prepare rollback if compatibility cannot be restored quickly.",
    ],
    security: ["Confirm contract change did not expose unintended response fields."],
    compliance: [
      "Document customer impact, release notes, and support guidance for traceability.",
    ],
  },
  preventionPlan: [
    "Add API contract tests to the release pipeline.",
    "Require client-team sign-off for breaking response changes.",
    "Keep API documentation updated with versioned behavior.",
  ],
  actionItems: [
    "Publish a backward-compatible response patch.",
    "Update API documentation and release notes.",
    "Add regression coverage for the affected contract.",
  ],
  owners: ["Backend Lead", "Mobile/Frontend Lead", "QA Lead"],
};
