# ReguAI Manual Test Plan

Use this plan to verify the backend manually during development and demo prep.

Base URL:

```text
http://localhost:3000
```

## 1. Start Docker PostgreSQL

```bash
npm run docker:up
```

Expected: `reguai-postgres` is running and healthy.

## 2. Run Migration

```bash
npm run db:migrate
```

Expected: Prisma reports the database is in sync or applies pending migrations.

## 3. Run Seed

```bash
npm run db:seed
```

Expected: `Demo seed data is ready.`

Run it twice to confirm idempotency.

## 4. Start Dev Server

```bash
npm run dev
```

## 5. Dummy Auth

Valid login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@reguai.local",
    "password": "demo-password"
  }'
```

Expected:

- `success: true`
- response contains `token: "demo-token"`

Invalid login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@reguai.local",
    "password": "wrong-password"
  }'
```

Expected: `401` with `success: false`.

Current user:

```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer demo-token"
```

Expected: demo user is returned.

Unauthorized current user:

```bash
curl http://localhost:3000/api/auth/me
```

Expected: `401` with `success: false`.

## 6. Dashboard Summary

```bash
curl http://localhost:3000/api/dashboard/summary
```

Expected:

- `success: true`
- total incidents is at least `3`
- severity and category counts are present
- recent incidents are returned

## 7. List Incidents

```bash
curl "http://localhost:3000/api/incidents?page=1&limit=20"
```

Expected:

- paginated response
- seeded incidents are listed
- `rawLogs` is not included in list items

## 8. Create Incident

```bash
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Checkout Latency Spike",
    "type": "Payment/API",
    "severity": "High",
    "status": "Investigating",
    "affectedSystem": "Checkout API",
    "impactSummary": "Users experienced slow checkout responses.",
    "affectedUsers": 120,
    "rawLogs": "timeout on checkout payment request",
    "suspectedCause": "Gateway latency",
    "detectedAt": "2026-05-15T09:20:00.000Z"
  }'
```

Expected:

- `201`
- incident is created
- audit trail contains `Incident created`

## 9. Get Incident Detail

```bash
curl http://localhost:3000/api/incidents/{incidentId}
```

Expected:

- incident detail
- `report`
- `tasks`
- `auditTrails`

## 10. Update Incident

```bash
curl -X PATCH http://localhost:3000/api/incidents/{incidentId} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Resolved"
  }'
```

Expected:

- incident status updates
- `resolvedAt` is auto-filled
- audit trail contains `Incident updated`

## 11. Generate Report

```bash
curl -X POST http://localhost:3000/api/incidents/{incidentId}/generate-report
```

Expected:

- report is generated
- response contains risk classification, timeline, checklist, action plan, stakeholder summary, and postmortem
- audit trail contains `Report generated`

## 12. Get Report

```bash
curl http://localhost:3000/api/incidents/{incidentId}/report
```

Expected:

- saved report is returned

## 13. Create Task

```bash
curl -X POST http://localhost:3000/api/incidents/{incidentId}/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Validate rollback plan",
    "description": "Confirm rollback steps are safe.",
    "owner": "Backend Team",
    "status": "ToDo",
    "priority": "High",
    "dueDate": "2026-05-15T13:00:00.000Z"
  }'
```

Expected:

- task is created
- audit trail contains `Task created`

## 14. Update Task

```bash
curl -X PATCH http://localhost:3000/api/tasks/{taskId} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Done"
  }'
```

Expected:

- task status updates
- audit note includes status transition

## 15. Delete Task

```bash
curl -X DELETE http://localhost:3000/api/tasks/{taskId}
```

Expected:

- task is deleted
- audit trail contains `Task deleted`

## 16. Export Markdown

```bash
curl -H "Accept: text/markdown" \
  http://localhost:3000/api/incidents/{incidentId}/export/markdown
```

Expected:

- response content type is `text/markdown`
- Markdown includes incident overview, risk classification fallback or generated report, tasks, and audit trail
- audit trail contains `Report exported`

## 17. Validate Audit Trail Behavior

```bash
curl http://localhost:3000/api/incidents/{incidentId}
```

Expected audit actions after full flow:

- `Incident created`
- `Incident updated`
- `Report generated`
- `Task created`
- `Task updated`
- `Task deleted`
- `Report exported`

## Negative Tests

Invalid incident id:

```bash
curl http://localhost:3000/api/incidents/
```

Invalid incident payload:

```bash
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{"title":"x"}'
```

Expected: `success: false` and no stack trace.
