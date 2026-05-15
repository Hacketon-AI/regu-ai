# ReguAI API Contract

ReguAI uses consistent JSON responses for API endpoints.

Success response:

```json
{
  "success": true,
  "message": "Readable success message",
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Readable error message",
  "errors": []
}
```

Markdown export is the one successful response exception: it returns `text/markdown`, not JSON. Error responses for Markdown export still use the JSON error format.

## Enums

Incident severity: `Low`, `Medium`, `High`, `Critical`

Incident status: `Open`, `Investigating`, `Mitigating`, `Monitoring`, `Resolved`, `Closed`

Task status: `ToDo`, `InProgress`, `Done`, `Blocked`

Priority: `Low`, `Medium`, `High`, `Critical`

## Auth

Auth endpoints are not implemented yet. Current backend actions use the demo actor `Demo User`.

Future endpoints:

- `POST /api/auth/login`
- `GET /api/auth/me`

## Dashboard

### GET /api/dashboard/summary

Purpose: Return dashboard metrics for incident operations.

Query params: none.

Request body: none.

Success response example:

```json
{
  "success": true,
  "message": "Dashboard summary retrieved successfully.",
  "data": {
    "totalIncidents": 3,
    "openIncidents": 3,
    "criticalIncidents": 1,
    "resolvedIncidents": 0,
    "averageResponseTime": "N/A",
    "openActionItems": 6,
    "incidentBySeverity": {
      "Low": 0,
      "Medium": 1,
      "High": 1,
      "Critical": 1
    },
    "incidentByCategory": {
      "Payment/API": 1,
      "Security": 1,
      "API Contract": 1,
      "Other": 0
    },
    "recentIncidents": []
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Unexpected server error.",
  "errors": []
}
```

Frontend notes: Use this endpoint for top-level metric cards, severity charts, category charts, and latest incident lists.

## Incidents

### GET /api/incidents

Purpose: List incidents with pagination and filters.

Query params:

- `search`: optional string
- `severity`: optional enum
- `status`: optional enum
- `type`: optional string
- `page`: optional number, default `1`
- `limit`: optional number, default `20`, max `100`

Request body: none.

Success response example:

```json
{
  "success": true,
  "message": "Incidents retrieved successfully.",
  "data": {
    "items": [
      {
        "id": "incident-id",
        "title": "Payment API Failure",
        "type": "Payment/API",
        "severity": "High",
        "status": "Investigating",
        "affectedSystem": "Mobile Checkout Service",
        "impactSummary": "1,200 users failed to complete payment during checkout.",
        "affectedUsers": 1200,
        "suspectedCause": "Payment gateway timeout and backend validation mismatch.",
        "detectedAt": "2026-05-15T09:20:00.000Z",
        "resolvedAt": null,
        "createdAt": "2026-05-15T09:25:00.000Z",
        "updatedAt": "2026-05-15T09:25:00.000Z",
        "hasReport": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 3,
      "totalPages": 1
    }
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Invalid incident query parameters.",
  "errors": [
    {
      "field": "limit",
      "message": "Too big: expected number to be <=100"
    }
  ]
}
```

Frontend notes: `rawLogs` is intentionally excluded from list responses. Use detail endpoint when raw logs are needed.

### POST /api/incidents

Purpose: Create an incident and audit trail.

Request body:

```json
{
  "title": "Payment API Failure",
  "type": "Payment/API",
  "severity": "High",
  "status": "Investigating",
  "affectedSystem": "Mobile Checkout Service",
  "impactSummary": "1,200 users failed to complete payment during checkout.",
  "affectedUsers": 1200,
  "rawLogs": "500 Internal Server Error on /api/v1/checkout/payment.",
  "suspectedCause": "Payment gateway timeout.",
  "detectedAt": "2026-05-15T09:20:00.000Z",
  "resolvedAt": null
}
```

Success response example:

```json
{
  "success": true,
  "message": "Incident created successfully.",
  "data": {
    "id": "incident-id",
    "title": "Payment API Failure",
    "severity": "High",
    "status": "Investigating"
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Invalid incident payload.",
  "errors": [
    {
      "field": "title",
      "message": "Too small: expected string to have >=3 characters"
    }
  ]
}
```

Frontend notes: `rawLogs` is sanitized and length-limited before saving.

### GET /api/incidents/[id]

Purpose: Return incident detail with saved report, tasks, and audit trails.

Request body: none.

Success response example:

```json
{
  "success": true,
  "message": "Incident retrieved successfully.",
  "data": {
    "id": "incident-id",
    "title": "Payment API Failure",
    "report": null,
    "tasks": [],
    "auditTrails": []
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Incident not found.",
  "errors": []
}
```

Frontend notes: Use this endpoint for detail pages and audit trail panels.

### PATCH /api/incidents/[id]

Purpose: Update incident fields and create an audit trail for changed fields.

Request body: any valid subset of incident fields.

```json
{
  "status": "Resolved",
  "resolvedAt": "2026-05-15T11:00:00.000Z"
}
```

Success response example:

```json
{
  "success": true,
  "message": "Incident updated successfully.",
  "data": {
    "id": "incident-id",
    "status": "Resolved",
    "resolvedAt": "2026-05-15T11:00:00.000Z"
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Invalid incident payload.",
  "errors": []
}
```

Frontend notes: If status changes to `Resolved` and `resolvedAt` is omitted, the backend sets `resolvedAt` automatically.

### DELETE /api/incidents/[id]

Purpose: Hard-delete an incident.

Request body: none.

Success response example:

```json
{
  "success": true,
  "message": "Incident deleted successfully.",
  "data": {
    "id": "incident-id"
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Incident not found.",
  "errors": []
}
```

Frontend notes: Related report, tasks, and audit trails cascade with the incident.

## Report

### POST /api/incidents/[id]/generate-report

Purpose: Generate and save a rule-based incident response report.

Request body: none.

Success response example:

```json
{
  "success": true,
  "message": "Incident report generated successfully.",
  "data": {
    "id": "report-id",
    "incidentId": "incident-id",
    "riskClassification": {},
    "timeline": [],
    "checklist": [],
    "technicalActionPlan": {},
    "stakeholderSummary": "Summary text",
    "postmortemReport": {}
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Incident not found.",
  "errors": []
}
```

Frontend notes: Calling this endpoint again updates the existing report instead of creating duplicates.

### GET /api/incidents/[id]/report

Purpose: Return the saved report for an incident.

Request body: none.

Success response example:

```json
{
  "success": true,
  "message": "Incident report retrieved successfully.",
  "data": {
    "id": "report-id",
    "incidentId": "incident-id"
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Incident report has not been generated yet",
  "errors": []
}
```

Frontend notes: Show a generate-report CTA when this endpoint returns the not-generated message.

## Tasks

### GET /api/incidents/[id]/tasks

Purpose: List tasks for an incident.

Request body: none.

Success response example:

```json
{
  "success": true,
  "message": "Incident tasks retrieved successfully.",
  "data": [
    {
      "id": "task-id",
      "title": "Review payment gateway timeout logs",
      "status": "InProgress",
      "priority": "High",
      "owner": "Backend Team"
    }
  ]
}
```

Error response example:

```json
{
  "success": false,
  "message": "Incident not found.",
  "errors": []
}
```

Frontend notes: Use Prisma-safe task status names: `ToDo`, `InProgress`, `Done`, `Blocked`.

### POST /api/incidents/[id]/tasks

Purpose: Create an incident task and audit trail.

Request body:

```json
{
  "title": "Review payment gateway timeout logs",
  "description": "Compare gateway logs with deploy timeline.",
  "owner": "Backend Team",
  "status": "ToDo",
  "priority": "High",
  "dueDate": "2026-05-15T13:00:00.000Z"
}
```

Success response example:

```json
{
  "success": true,
  "message": "Incident task created successfully.",
  "data": {
    "id": "task-id",
    "status": "ToDo"
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Invalid task payload.",
  "errors": []
}
```

Frontend notes: If `owner` is omitted, backend stores `Unassigned`.

### PATCH /api/tasks/[taskId]

Purpose: Update a task and audit changed fields.

Request body: any valid subset of task fields.

```json
{
  "status": "Done"
}
```

Success response example:

```json
{
  "success": true,
  "message": "Incident task updated successfully.",
  "data": {
    "id": "task-id",
    "status": "Done"
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Task not found.",
  "errors": []
}
```

Frontend notes: Status transition is included in audit notes when status changes.

### DELETE /api/tasks/[taskId]

Purpose: Delete a task after creating an audit trail.

Request body: none.

Success response example:

```json
{
  "success": true,
  "message": "Incident task deleted successfully.",
  "data": {
    "id": "task-id"
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Task not found.",
  "errors": []
}
```

Frontend notes: Refresh the incident task list after delete.

## Export

### GET /api/incidents/[id]/export/markdown

Purpose: Export an incident as an audit-ready Markdown post-mortem.

Request body: none.

Success response: `text/markdown; charset=utf-8`

Example content:

```markdown
# Incident Post-Mortem Report

## Incident Overview
- Incident ID: incident-id
- Title: Payment API Failure
```

Error response example:

```json
{
  "success": false,
  "message": "Incident not found.",
  "errors": []
}
```

Frontend notes: Treat success as file/text content, not JSON. The export works even if no generated report exists.
