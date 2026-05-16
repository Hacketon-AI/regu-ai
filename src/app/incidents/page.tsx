"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { IncidentList } from "@/components/incidents/incident-list";
import { IncidentForm } from "@/components/incidents/incident-form";
import { IncidentDetailTabs } from "@/components/incidents/incident-detail-tabs";
import { Checklist } from "@/components/reports/checklist";
import { ActionPlan } from "@/components/reports/action-plan";
import { StakeholderSummary } from "@/components/reports/stakeholder-summary";
import { PostMortemPreview } from "@/components/reports/post-mortem-preview";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock data
const mockIncidents = [
  {
    id: "1",
    title: "API Gateway Timeout Issues",
    severity: "HIGH" as const,
    status: "IN_PROGRESS" as const,
    createdAt: new Date().toISOString(),
    affectedSystems: ["API Gateway", "Load Balancer"],
  },
  {
    id: "2",
    title: "Database Connection Pool Exhaustion",
    severity: "CRITICAL" as const,
    status: "OPEN" as const,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    affectedSystems: ["PostgreSQL", "Application Server"],
  },
  {
    id: "3",
    title: "Payment Processing Delays",
    severity: "MEDIUM" as const,
    status: "RESOLVED" as const,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    affectedSystems: ["Payment Gateway", "Queue Service"],
  },
];

const mockIncidentDetail = {
  id: "1",
  title: "API Gateway Timeout Issues",
  description:
    "Multiple users reporting timeout errors when accessing the API. Initial investigation shows increased latency in the gateway layer.",
  severity: "HIGH",
  status: "IN_PROGRESS",
  category: "PERFORMANCE",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  affectedSystems: ["API Gateway", "Load Balancer", "Cache Layer"],
};

const mockChecklist = [
  {
    id: "1",
    task: "Identify root cause of timeout issues",
    status: "COMPLETED" as const,
    assignee: "John Doe",
  },
  {
    id: "2",
    task: "Scale up API Gateway instances",
    status: "IN_PROGRESS" as const,
    assignee: "Jane Smith",
    dueDate: new Date().toISOString(),
  },
];

const mockActionPlan = [
  {
    id: "1",
    action: "Implement circuit breaker pattern in API Gateway",
    priority: "HIGH" as const,
    owner: "Engineering Team",
    timeline: "Within 24 hours",
    status: "In Progress",
  },
];

const mockStakeholders = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Engineering Manager",
    department: "Engineering",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    notificationStatus: "NOTIFIED" as const,
  },
];

const mockPostMortem = {
  incidentTitle: "API Gateway Timeout Issues",
  severity: "HIGH",
  duration: "4 hours 23 minutes",
  impactedUsers: 1250,
  generatedAt: new Date().toISOString(),
  sections: [
    {
      title: "Executive Summary",
      content:
        "API Gateway experienced timeout issues affecting 15% of requests.",
    },
  ],
};

export default function IncidentsPage() {
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    null,
  );

  const handleViewIncident = (id: string) => {
    setSelectedIncidentId(id);
    setView("detail");
  };

  const handleCreateIncident = (data: unknown) => {
    console.log("Creating incident:", data);
    setView("list");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {view === "list" && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>
                <p className="text-gray-600 mt-1">
                  Manage and track all incidents
                </p>
              </div>
              <Button onClick={() => setView("create")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Incident
              </Button>
            </div>
            <IncidentList
              incidents={mockIncidents}
              onViewIncident={handleViewIncident}
            />
          </>
        )}

        {view === "create" && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Create Incident
                </h1>
                <p className="text-gray-600 mt-1">Report a new incident</p>
              </div>
              <Button variant="outline" onClick={() => setView("list")}>
                Back to List
              </Button>
            </div>
            <IncidentForm
              onSubmit={handleCreateIncident}
              onCancel={() => setView("list")}
            />
          </>
        )}

        {view === "detail" && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Incident Details
                </h1>
                <p className="text-gray-600 mt-1">
                  View and manage incident information
                </p>
              </div>
              <Button variant="outline" onClick={() => setView("list")}>
                Back to List
              </Button>
            </div>
            <IncidentDetailTabs
              incident={mockIncidentDetail}
              checklist={<Checklist items={mockChecklist} />}
              actionPlan={<ActionPlan actions={mockActionPlan} />}
              stakeholderSummary={
                <StakeholderSummary stakeholders={mockStakeholders} />
              }
              postMortem={<PostMortemPreview data={mockPostMortem} />}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

// Made with Bob
