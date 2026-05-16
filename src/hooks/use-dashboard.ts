import { useQuery } from "@tanstack/react-query";

type DashboardStats = {
  totalIncidents: number;
  openIncidents: number;
  criticalIncidents: number;
  resolvedIncidents: number;
  averageResponseTime: string;
};

type Incident = {
  id: string;
  title: string;
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: string;
  affectedSystem: string;
  affectedUsers: number | null;
  createdAt: string;
  updatedAt: string;
  hasReport: boolean;
};

type DashboardData = {
  stats: DashboardStats;
  recentIncidents: Incident[];
};

async function fetchDashboardSummary(): Promise<DashboardData> {
  const response = await fetch("/api/dashboard/summary");
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch dashboard data");
  }

  const data = result.data;
  return {
    stats: {
      totalIncidents: data.totalIncidents,
      openIncidents: data.openIncidents,
      criticalIncidents: data.criticalIncidents,
      resolvedIncidents: data.resolvedIncidents,
      averageResponseTime: data.averageResponseTime,
    },
    recentIncidents: data.recentIncidents,
  };
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: fetchDashboardSummary,
  });
}

// Made with Bob
