import type { Incident, Severity } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type IncidentCategory = "Payment/API" | "Security" | "API Contract" | "Other";

type IncidentBySeverity = Record<Severity, number>;
type IncidentByCategory = Record<IncidentCategory, number>;

type RecentIncident = Pick<
  Incident,
  | "id"
  | "title"
  | "type"
  | "severity"
  | "status"
  | "affectedSystem"
  | "affectedUsers"
  | "createdAt"
  | "updatedAt"
> & {
  hasReport: boolean;
};

export type DashboardSummary = {
  totalIncidents: number;
  openIncidents: number;
  criticalIncidents: number;
  resolvedIncidents: number;
  averageResponseTime: string;
  openActionItems: number;
  incidentBySeverity: IncidentBySeverity;
  incidentByCategory: IncidentByCategory;
  recentIncidents: RecentIncident[];
};

type RecentIncidentRecord = Pick<
  Incident,
  | "id"
  | "title"
  | "type"
  | "severity"
  | "status"
  | "affectedSystem"
  | "affectedUsers"
  | "createdAt"
  | "updatedAt"
> & {
  aiReport: {
    id: string;
  } | null;
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [
    totalIncidents,
    openIncidents,
    criticalIncidents,
    resolvedIncidents,
    openActionItems,
    severityGroups,
    incidentTimingRows,
    categoryRows,
    recentIncidentRows,
  ] = await prisma.$transaction([
    prisma.incident.count(),
    prisma.incident.count({
      where: {
        status: {
          notIn: ["Resolved", "Closed"],
        },
      },
    }),
    prisma.incident.count({
      where: {
        severity: "Critical",
      },
    }),
    prisma.incident.count({
      where: {
        status: {
          in: ["Resolved", "Closed"],
        },
      },
    }),
    prisma.incidentTask.count({
      where: {
        status: {
          not: "Done",
        },
      },
    }),
    prisma.incident.groupBy({
      by: ["severity"],
      _count: {
        severity: true,
      },
    }),
    prisma.incident.findMany({
      where: {
        resolvedAt: {
          not: null,
        },
      },
      select: {
        detectedAt: true,
        resolvedAt: true,
      },
    }),
    prisma.incident.findMany({
      select: {
        type: true,
      },
    }),
    prisma.incident.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        severity: true,
        status: true,
        affectedSystem: true,
        affectedUsers: true,
        createdAt: true,
        updatedAt: true,
        aiReport: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  return {
    totalIncidents,
    openIncidents,
    criticalIncidents,
    resolvedIncidents,
    averageResponseTime: calculateAverageResponseTime(incidentTimingRows),
    openActionItems,
    incidentBySeverity: buildSeverityCounts(severityGroups),
    incidentByCategory: buildCategoryCounts(categoryRows),
    recentIncidents: recentIncidentRows.map(toRecentIncident),
  };
}

function buildSeverityCounts(
  severityGroups: Array<{
    severity: Severity;
    _count: {
      severity: number;
    };
  }>,
): IncidentBySeverity {
  const counts: IncidentBySeverity = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  };

  for (const group of severityGroups) {
    counts[group.severity] = group._count.severity;
  }

  return counts;
}

function buildCategoryCounts(
  incidents: Array<{
    type: string;
  }>,
): IncidentByCategory {
  const counts: IncidentByCategory = {
    "Payment/API": 0,
    Security: 0,
    "API Contract": 0,
    Other: 0,
  };

  for (const incident of incidents) {
    counts[categorizeIncidentType(incident.type)] += 1;
  }

  return counts;
}

function categorizeIncidentType(type: string): IncidentCategory {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("payment")) {
    return "Payment/API";
  }

  if (/(security|unauthorized|breach|login)/i.test(normalizedType)) {
    return "Security";
  }

  if (/(api|contract|mobile|breaking)/i.test(normalizedType)) {
    return "API Contract";
  }

  return "Other";
}

function calculateAverageResponseTime(
  incidents: Array<{
    detectedAt: Date;
    resolvedAt: Date | null;
  }>,
): string {
  const durations = incidents
    .map((incident) => {
      if (!incident.resolvedAt) {
        return null;
      }

      return incident.resolvedAt.getTime() - incident.detectedAt.getTime();
    })
    .filter((duration): duration is number => duration !== null && duration >= 0);

  if (durations.length === 0) {
    return "N/A";
  }

  const averageMilliseconds =
    durations.reduce((total, duration) => total + duration, 0) / durations.length;

  return formatDuration(averageMilliseconds);
}

function formatDuration(milliseconds: number): string {
  const totalMinutes = Math.max(1, Math.round(milliseconds / 60_000));
  const days = Math.floor(totalMinutes / 1_440);
  const hours = Math.floor((totalMinutes % 1_440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  }

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return `${minutes}m`;
}

function toRecentIncident(incident: RecentIncidentRecord): RecentIncident {
  const { aiReport, ...recentIncident } = incident;

  return {
    ...recentIncident,
    hasReport: aiReport !== null,
  };
}
