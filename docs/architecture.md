# ReguAI Backend Architecture

ReguAI is an Incident Response & Compliance Workflow Platform. The backend turns production incidents into structured incident records, response tasks, audit trails, generated response reports, dashboard metrics, and Markdown post-mortem exports.

## Tech Stack

- Next.js App Router API Routes
- TypeScript
- Prisma ORM
- PostgreSQL via Docker Compose
- Zod validation
- Rule-based report generation

## Folder Structure

```text
src/
  app/api/                 API route handlers
  lib/                     shared backend utilities
  modules/
    audit/                 audit trail service
    dashboard/             dashboard summary service
    incidents/             incident validation, types, service
    reports/               report generation and Markdown export
    tasks/                 task validation and service
prisma/
  schema.prisma            database schema
  seed.ts                  demo seed data
docs/                      API, architecture, demo, security, and test docs
```

## Database Models

### User

Stores demo user identity and future authenticated users.

### Incident

Stores incident metadata, impact, status, affected system, sanitized logs, suspected cause, and timestamps.

### IncidentAiReport

Stores generated rule-based report sections as JSON and text.

### IncidentTask

Stores incident response work items with owner, status, priority, and due date.

### IncidentAuditTrail

Stores important incident, report, task, and export actions.

## Main Backend Flows

### Create Incident Flow

1. API route validates request with Zod.
2. Service sanitizes `rawLogs`.
3. Demo user is created or reused.
4. Incident is saved with Prisma.
5. Audit trail records `Incident created`.
6. API returns a consistent JSON response.

### Generate Report Flow

1. API validates incident id.
2. Service fetches incident.
3. Template is selected from incident type.
4. Generator modules create risk classification, timeline, checklist, technical action plan, stakeholder summary, and post-mortem.
5. Report is upserted into `IncidentAiReport`.
6. Audit trail records `Report generated`.

### Task Tracking Flow

1. API validates incident id or task id.
2. Service checks incident or task existence.
3. Task is created, updated, listed, or deleted.
4. Audit trail records task creation, update, or deletion.

### Audit Trail Flow

Important actions create audit records:

- Incident created
- Incident updated
- Report generated
- Task created
- Task updated
- Task deleted
- Markdown report exported

Incident delete is a hard delete. Related audit trails cascade with the incident because the current schema stores audit trails as children of incidents.

### Dashboard Summary Flow

Dashboard service queries aggregate incident counts, open action items, severity breakdown, category breakdown, average response time, and latest incidents.

### Markdown Export Flow

1. API validates incident id.
2. Incident is fetched with report, tasks, and audit trails.
3. Markdown exporter renders an audit-ready post-mortem.
4. Export succeeds even when a generated report does not exist.
5. Audit trail records `Report exported`.
6. API returns `text/markdown`.

## Why Rule-Based Generation

Rule-based generation was chosen for MVP stability. It avoids external LLM latency, token cost, API key setup, model variability, and internet dependency during demo. The generated report is deterministic, reviewable, and easy to explain to judges.

## Future Improvements

- Real authentication and user sessions
- RBAC and organization-based access control
- Soft delete for incidents
- Audit trail retention independent from incident deletion
- Background jobs for report generation
- PDF export
- Test suite with integration tests
- Production monitoring and structured logging
- Optional LLM-assisted report drafting after deterministic baseline is stable
