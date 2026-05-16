import { useQuery } from "@tanstack/react-query";

type Task = {
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

type Incident = {
  id: string;
  title: string;
};

type TaskWithIncident = Task & {
  incident?: Incident;
};

// Fetch all tasks across all incidents
async function fetchAllTasks(): Promise<TaskWithIncident[]> {
  // First, fetch all incidents
  const incidentsResponse = await fetch("/api/incidents");
  const incidentsResult = await incidentsResponse.json();

  if (!incidentsResult.success) {
    throw new Error("Failed to fetch incidents");
  }

  const incidents = incidentsResult.data.items;

  // Then fetch tasks for each incident
  const tasksPromises = incidents.map(async (incident: Incident) => {
    try {
      const tasksResponse = await fetch(`/api/incidents/${incident.id}/tasks`);
      const tasksResult = await tasksResponse.json();

      if (tasksResult.success) {
        return tasksResult.data.map((task: Task) => ({
          ...task,
          incident: {
            id: incident.id,
            title: incident.title,
          },
        }));
      }
      return [];
    } catch (err) {
      console.error(`Failed to fetch tasks for incident ${incident.id}:`, err);
      return [];
    }
  });

  const allTasksArrays = await Promise.all(tasksPromises);
  return allTasksArrays.flat();
}

// Hook: Get all tasks
export function useAllTasks() {
  return useQuery({
    queryKey: ["tasks", "all"],
    queryFn: fetchAllTasks,
  });
}

// Made with Bob
