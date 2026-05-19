import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

type IncidentDetail = {
  id: string;
  title: string;
  type: string;
  severity: string;
  status: string;
  affectedSystem: string;
  impactSummary: string;
  affectedUsers: number | null;
  rawLogs: string | null;
  suspectedCause: string | null;
  detectedAt: string;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type TimelineEntry = {
  time: string;
  event: string;
};

type ChecklistItem = {
  title: string;
  done: boolean;
  category: string;
};

type TechnicalActionPlan = {
  backend?: string[];
  database?: string[];
  qa?: string[];
  devops?: string[];
  security?: string[];
  compliance?: string[];
};

type PostmortemReport = {
  executiveSummary: string;
  incidentDetails: string;
  impact: string;
  timeline: TimelineEntry[];
  rootCause: string;
  resolution: string;
  preventionPlan: string[];
  actionItems: string[];
  owners: string[];
  auditNotes: string[];
};

type RiskClassification = {
  recommendedSeverity: string;
  category: string;
  businessRisk: string;
  technicalRisk: string;
  complianceRisk: string;
  recommendedSla: string;
};

type Report = {
  id: string;
  riskClassification: RiskClassification;
  timeline: TimelineEntry[];
  checklist: ChecklistItem[];
  technicalActionPlan: TechnicalActionPlan;
  stakeholderSummary: string;
  postmortemReport: PostmortemReport;
  createdAt: string;
  updatedAt: string;
};

type CreateIncidentPayload = {
  title: string;
  type: string;
  severity: string;
  status: string;
  affectedSystem: string;
  impactSummary: string;
  detectedAt: string;
};

// Fetch all incidents
async function fetchIncidents(): Promise<Incident[]> {
  const response = await fetch("/api/incidents");
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch incidents");
  }

  return result.data.items;
}

// Fetch single incident detail
async function fetchIncidentDetail(id: string): Promise<IncidentDetail> {
  const response = await fetch(`/api/incidents/${id}`);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch incident detail");
  }

  return result.data;
}

// Fetch incident report
// Note: The backend now auto-generates reports if they don't exist,
// so this function simply fetches the report (which may trigger generation)
async function fetchIncidentReport(id: string): Promise<Report | null> {
  try {
    const response = await fetch(`/api/incidents/${id}/report`);
    const result = await response.json();

    if (!result.success) {
      console.error("Failed to fetch incident report:", result.message);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching incident report:", error);
    return null;
  }
}

// Fetch incident tasks
type IncidentTask = {
  id: string;
  incidentId: string;
  title: string;
  description: string | null;
  owner: string;
  status: string;
  priority: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

async function fetchIncidentTasks(id: string): Promise<IncidentTask[]> {
  const response = await fetch(`/api/incidents/${id}/tasks`);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch incident tasks");
  }

  return result.data;
}

// Create incident
async function createIncident(
  payload: CreateIncidentPayload,
): Promise<Incident> {
  const response = await fetch("/api/incidents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to create incident");
  }

  return result.data;
}

// Hook: Get all incidents
export function useIncidents() {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents,
  });
}

// Hook: Get single incident detail
export function useIncidentDetail(id: string | null) {
  return useQuery({
    queryKey: ["incidents", id],
    queryFn: () => fetchIncidentDetail(id!),
    enabled: !!id,
  });
}

// Hook: Get incident report
export function useIncidentReport(id: string | null) {
  return useQuery({
    queryKey: ["incidents", id, "report"],
    queryFn: () => fetchIncidentReport(id!),
    enabled: !!id,
  });
}

// Hook: Get incident tasks
export function useIncidentTasks(id: string | null) {
  return useQuery({
    queryKey: ["incidents", id, "tasks"],
    queryFn: () => fetchIncidentTasks(id!),
    enabled: !!id,
  });
}

// Hook: Create incident mutation
export function useCreateIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
      // Invalidate and refetch incidents list
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
    },
  });
}

// Made with Bob
