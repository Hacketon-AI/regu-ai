import {
  IncidentStatus,
  Prisma,
  PrismaClient,
  Priority,
  Severity,
  TaskStatus,
} from "@prisma/client";

import { sanitizeRawLogs } from "../src/lib/sanitize";

const prisma = new PrismaClient();

const demoUser = {
  name: "Demo User",
  email: "demo@reguai.local",
  role: "Backend Engineer",
};

type DemoTaskSeed = {
  title: string;
  description: string;
  owner: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date;
};

type DemoAuditSeed = {
  action: string;
  actor: string;
  note: string;
  oldValue: Prisma.InputJsonValue | null;
  newValue: Prisma.InputJsonValue | null;
  createdAt: Date;
};

type DemoIncidentSeed = {
  title: string;
  type: string;
  severity: Severity;
  status: IncidentStatus;
  affectedSystem: string;
  affectedUsers: number;
  impactSummary: string;
  rawLogs: string;
  suspectedCause: string;
  detectedAt: Date;
  tasks: DemoTaskSeed[];
  auditTrails: DemoAuditSeed[];
};

const demoIncidents: DemoIncidentSeed[] = [
  {
    title: "Payment API Failure",
    type: "Payment/API",
    severity: Severity.High,
    status: IncidentStatus.Investigating,
    affectedSystem: "Mobile Checkout Service",
    affectedUsers: 1_200,
    impactSummary: "1,200 users failed to complete payment during checkout.",
    rawLogs:
      "500 Internal Server Error on /api/v1/checkout/payment. Payment gateway timeout after deployment.",
    suspectedCause: "Payment gateway timeout and backend validation mismatch.",
    detectedAt: new Date("2026-05-15T09:20:00.000Z"),
    tasks: [
      {
        title: "Review payment gateway timeout logs",
        description:
          "Compare checkout payment errors with gateway timeout and deployment timeline.",
        owner: "Backend Team",
        status: TaskStatus.InProgress,
        priority: Priority.High,
        dueDate: new Date("2026-05-15T13:00:00.000Z"),
      },
      {
        title: "Validate failed payment reconciliation",
        description:
          "Verify failed payment records and confirm no duplicate charges were created.",
        owner: "Payment Operations",
        status: TaskStatus.ToDo,
        priority: Priority.High,
        dueDate: new Date("2026-05-15T15:00:00.000Z"),
      },
    ],
    auditTrails: [
      {
        action: "Incident created",
        actor: demoUser.name,
        note: "Seed demo incident created",
        oldValue: null,
        newValue: {
          title: "Payment API Failure",
          severity: Severity.High,
          status: IncidentStatus.Investigating,
        },
        createdAt: new Date("2026-05-15T09:25:00.000Z"),
      },
      {
        action: "Initial triage completed",
        actor: demoUser.name,
        note: "Payment gateway timeout suspected after deployment review",
        oldValue: null,
        newValue: {
          affectedSystem: "Mobile Checkout Service",
          suspectedCause: "Payment gateway timeout and backend validation mismatch.",
        },
        createdAt: new Date("2026-05-15T09:40:00.000Z"),
      },
    ],
  },
  {
    title: "Unauthorized Admin Login Attempt",
    type: "Security",
    severity: Severity.Critical,
    status: IncidentStatus.Mitigating,
    affectedSystem: "Admin Dashboard",
    affectedUsers: 0,
    impactSummary:
      "Multiple unauthorized login attempts were detected on the admin dashboard.",
    rawLogs:
      "Failed admin login attempts from unusual IP addresses. Rate limit triggered.",
    suspectedCause: "Possible credential stuffing attempt.",
    detectedAt: new Date("2026-05-15T10:05:00.000Z"),
    tasks: [
      {
        title: "Preserve admin access logs",
        description:
          "Export authentication logs and preserve suspicious IP evidence for security review.",
        owner: "Security Team",
        status: TaskStatus.InProgress,
        priority: Priority.Critical,
        dueDate: new Date("2026-05-15T11:00:00.000Z"),
      },
      {
        title: "Rotate admin dashboard credentials",
        description:
          "Rotate affected credentials and invalidate suspicious active sessions.",
        owner: "Platform Team",
        status: TaskStatus.ToDo,
        priority: Priority.Critical,
        dueDate: new Date("2026-05-15T12:00:00.000Z"),
      },
    ],
    auditTrails: [
      {
        action: "Incident created",
        actor: demoUser.name,
        note: "Seed demo incident created",
        oldValue: null,
        newValue: {
          title: "Unauthorized Admin Login Attempt",
          severity: Severity.Critical,
          status: IncidentStatus.Mitigating,
        },
        createdAt: new Date("2026-05-15T10:10:00.000Z"),
      },
      {
        action: "Security owner assigned",
        actor: demoUser.name,
        note: "Security team assigned to investigate unauthorized login attempts",
        oldValue: null,
        newValue: {
          owner: "Security Team",
          affectedSystem: "Admin Dashboard",
        },
        createdAt: new Date("2026-05-15T10:20:00.000Z"),
      },
    ],
  },
  {
    title: "Mobile App Breaking Change",
    type: "API Contract",
    severity: Severity.Medium,
    status: IncidentStatus.Monitoring,
    affectedSystem: "User Registration API",
    affectedUsers: 350,
    impactSummary:
      "Mobile users failed to register after backend response contract changed.",
    rawLogs:
      "Mobile client expected field user.kantorCabang but backend response no longer included it.",
    suspectedCause:
      "Backend response contract changed without mobile compatibility review.",
    detectedAt: new Date("2026-05-15T11:35:00.000Z"),
    tasks: [
      {
        title: "Restore mobile-compatible response field",
        description:
          "Add a backward-compatible response patch for mobile registration clients.",
        owner: "Backend Team",
        status: TaskStatus.InProgress,
        priority: Priority.Medium,
        dueDate: new Date("2026-05-15T16:00:00.000Z"),
      },
      {
        title: "Add API contract regression test",
        description:
          "Add regression coverage for user registration response contract compatibility.",
        owner: "QA Team",
        status: TaskStatus.ToDo,
        priority: Priority.Medium,
        dueDate: new Date("2026-05-16T04:00:00.000Z"),
      },
    ],
    auditTrails: [
      {
        action: "Incident created",
        actor: demoUser.name,
        note: "Seed demo incident created",
        oldValue: null,
        newValue: {
          title: "Mobile App Breaking Change",
          severity: Severity.Medium,
          status: IncidentStatus.Monitoring,
        },
        createdAt: new Date("2026-05-15T11:40:00.000Z"),
      },
      {
        action: "Compatibility review started",
        actor: demoUser.name,
        note: "Mobile and backend teams started reviewing registration API contract",
        oldValue: null,
        newValue: {
          affectedSystem: "User Registration API",
          expectedField: "user.kantorCabang",
        },
        createdAt: new Date("2026-05-15T11:55:00.000Z"),
      },
    ],
  },
];

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: demoUser.email,
    },
    update: {
      name: demoUser.name,
      role: demoUser.role,
    },
    create: demoUser,
  });

  for (const incidentSeed of demoIncidents) {
    const incident = await upsertIncident(user.id, incidentSeed);

    for (const taskSeed of incidentSeed.tasks) {
      await upsertTask(incident.id, taskSeed);
    }

    for (const auditSeed of incidentSeed.auditTrails) {
      await upsertAuditTrail(incident.id, auditSeed);
    }
  }
}

async function upsertIncident(createdBy: string, seed: DemoIncidentSeed) {
  const existingIncident = await prisma.incident.findFirst({
    where: {
      title: seed.title,
      createdBy,
    },
  });

  const data = {
    title: seed.title,
    type: seed.type,
    severity: seed.severity,
    status: seed.status,
    affectedSystem: seed.affectedSystem,
    affectedUsers: seed.affectedUsers,
    impactSummary: seed.impactSummary,
    rawLogs: sanitizeRawLogs(seed.rawLogs),
    suspectedCause: seed.suspectedCause,
    detectedAt: seed.detectedAt,
    resolvedAt: null,
  };

  if (existingIncident) {
    return prisma.incident.update({
      where: {
        id: existingIncident.id,
      },
      data,
    });
  }

  return prisma.incident.create({
    data: {
      ...data,
      createdBy,
    },
  });
}

async function upsertTask(incidentId: string, seed: DemoTaskSeed) {
  const existingTask = await prisma.incidentTask.findFirst({
    where: {
      incidentId,
      title: seed.title,
    },
  });

  const data = {
    title: seed.title,
    description: seed.description,
    owner: seed.owner,
    status: seed.status,
    priority: seed.priority,
    dueDate: seed.dueDate,
  };

  if (existingTask) {
    return prisma.incidentTask.update({
      where: {
        id: existingTask.id,
      },
      data,
    });
  }

  return prisma.incidentTask.create({
    data: {
      incidentId,
      ...data,
    },
  });
}

async function upsertAuditTrail(incidentId: string, seed: DemoAuditSeed) {
  const existingAuditTrail = await prisma.incidentAuditTrail.findFirst({
    where: {
      incidentId,
      action: seed.action,
      note: seed.note,
    },
  });

  const data = {
    actor: seed.actor,
    oldValue: seed.oldValue ?? Prisma.JsonNull,
    newValue: seed.newValue ?? Prisma.JsonNull,
    createdAt: seed.createdAt,
  };

  if (existingAuditTrail) {
    return prisma.incidentAuditTrail.update({
      where: {
        id: existingAuditTrail.id,
      },
      data,
    });
  }

  return prisma.incidentAuditTrail.create({
    data: {
      incidentId,
      action: seed.action,
      note: seed.note,
      ...data,
    },
  });
}

main()
  .then(() => {
    console.log("Demo seed data is ready.");
  })
  .catch((error: unknown) => {
    console.error("Failed to seed demo data.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
