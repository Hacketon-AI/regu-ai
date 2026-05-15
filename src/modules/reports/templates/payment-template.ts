import type { ReportTemplate } from "@/modules/reports/report.types";

export const paymentTemplate: ReportTemplate = {
  category: "Payment",
  businessRisk:
    "Payment failures can block revenue, create duplicate charge exposure, and increase support volume.",
  technicalRisk:
    "Payment incidents often involve gateway instability, backend validation gaps, or transaction state mismatch.",
  complianceRisk:
    "Payment records must remain traceable for dispute handling, reconciliation, and financial audit needs.",
  checklistItems: [
    { title: "Review payment gateway logs", category: "Investigation" },
    { title: "Verify transaction status with payment provider", category: "Response" },
    { title: "Assess duplicate charge risk", category: "Risk" },
    { title: "Prepare customer support communication", category: "Communication" },
    { title: "Review backend payment validation", category: "Engineering" },
    { title: "Run payment regression testing", category: "QA" },
    { title: "Monitor payment error rate", category: "Monitoring" },
  ],
  technicalActionPlan: {
    backend: [
      "Review payment request validation and idempotency handling.",
      "Confirm transaction state transitions cannot create duplicate charges.",
    ],
    database: [
      "Reconcile affected payment records with provider transaction status.",
      "Preserve transaction audit records for support and finance review.",
    ],
    qa: [
      "Run regression tests for successful, failed, retried, and timeout payment flows.",
    ],
    devops: [
      "Monitor payment gateway latency, timeout rate, and error rate.",
      "Check recent deploys and configuration changes affecting payment services.",
    ],
    security: ["Confirm no payment credentials or secrets were exposed in logs."],
    compliance: [
      "Document financial impact and reconciliation evidence for audit traceability.",
    ],
  },
  preventionPlan: [
    "Strengthen payment idempotency controls.",
    "Add alerts for payment gateway error-rate spikes.",
    "Maintain payment reconciliation checks after incident recovery.",
  ],
  actionItems: [
    "Validate affected transactions against gateway records.",
    "Prepare support guidance for potentially affected customers.",
    "Add regression coverage for retry and timeout scenarios.",
  ],
  owners: ["Backend Lead", "Payment Owner", "Customer Support Lead"],
};
