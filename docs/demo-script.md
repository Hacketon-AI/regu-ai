# ReguAI Hackathon Demo Script

## 1. Opening

ReguAI is an Incident Response & Compliance Workflow Platform for teams handling production incidents.

Production incidents are chaotic: logs are scattered, response ownership is unclear, stakeholders need updates, and post-mortems often happen too late. ReguAI turns that chaos into a structured workflow.

## 2. Show Dashboard

Open the dashboard summary endpoint or connected UI.

Highlight:

- total incidents
- open incidents
- critical incidents
- open action items
- severity breakdown
- category breakdown
- recent incidents

## 3. Open a Seeded Incident

Use `Payment API Failure`.

Explain:

- 1,200 users failed to complete checkout payment
- affected system is Mobile Checkout Service
- status is Investigating
- suspected cause is payment gateway timeout and validation mismatch

## 4. Generate Response Plan

Call:

```bash
POST /api/incidents/{id}/generate-report
```

Show generated sections:

- risk classification
- timeline
- response checklist
- technical action plan
- stakeholder summary
- post-mortem report

Explain that the report is rule-based for MVP stability and does not rely on external LLM APIs during the demo.

## 5. Show Task Tracking

Create or update a task, for example:

- Review payment gateway timeout logs
- Validate failed payment reconciliation

Show task fields:

- title
- owner
- status
- priority
- due date

Update status from `ToDo` to `InProgress` or `Done`.

## 6. Show Audit Trail

Open incident detail and show audit trail records.

Highlight:

- incident creation
- report generation
- task creation/update/deletion
- Markdown export

Explain that ReguAI keeps incident response actions traceable for compliance review.

## 7. Export Markdown

Call:

```bash
GET /api/incidents/{id}/export/markdown
```

Show the generated Markdown post-mortem.

Mention that export works even if the generated report does not exist, as long as incident data exists.

## 8. Built With IBM Bob

Explain that IBM Bob assisted with:

- architecture planning
- schema design
- backend module structure
- validation planning
- report generator structure
- dashboard and export planning
- security and test documentation

Be clear: Bob assisted with planning, scaffolding, review, and iteration. The implementation still followed deliberate engineering decisions and step-by-step verification.

## 9. Closing

ReguAI turns production incidents into structured response workflows and audit-ready reports, built faster with IBM Bob.
