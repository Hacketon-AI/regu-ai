"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { IncidentList } from "@/components/incidents/incident-list";
import { IncidentForm } from "@/components/incidents/incident-form";
import { IncidentDetailTabs } from "@/components/incidents/incident-detail-tabs";
import { Checklist } from "@/components/reports/checklist";
import { ActionPlan } from "@/components/reports/action-plan";
import { StakeholderSummary } from "@/components/reports/stakeholder-summary";
import { PostMortemPreview } from "@/components/reports/post-mortem-preview";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

// Mock data for demonstration
const mockStats = {
  totalIncidents: 24,
  activeIncidents: 3,
  resolvedIncidents: 21,
  avgResolutionTime: "4.2h",
};

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
    "Multiple users reporting timeout errors when accessing the API. Initial investigation shows increased latency in the gateway layer. The issue started approximately 2 hours ago and is affecting approximately 15% of API requests.",
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
  {
    id: "3",
    task: "Monitor system performance metrics",
    status: "PENDING" as const,
    assignee: "Bob Johnson",
  },
  {
    id: "4",
    task: "Update incident status and notify stakeholders",
    status: "PENDING" as const,
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
  {
    id: "2",
    action: "Add additional monitoring and alerting for gateway latency",
    priority: "HIGH" as const,
    owner: "DevOps Team",
    timeline: "Within 48 hours",
  },
  {
    id: "3",
    action: "Review and optimize database query performance",
    priority: "MEDIUM" as const,
    owner: "Backend Team",
    timeline: "Within 1 week",
  },
  {
    id: "4",
    action: "Conduct load testing to identify capacity limits",
    priority: "MEDIUM" as const,
    owner: "QA Team",
    timeline: "Within 2 weeks",
  },
  {
    id: "5",
    action: "Document incident response procedures",
    priority: "LOW" as const,
    owner: "Technical Writing",
    timeline: "Within 1 month",
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
  {
    id: "2",
    name: "Michael Chen",
    role: "VP of Operations",
    department: "Operations",
    email: "michael.chen@example.com",
    notificationStatus: "NOTIFIED" as const,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Customer Success Lead",
    department: "Customer Success",
    email: "emily.rodriguez@example.com",
    phone: "+1 (555) 987-6543",
    notificationStatus: "PENDING" as const,
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
        "On [date], our API Gateway experienced significant timeout issues affecting approximately 15% of API requests over a 4-hour period. The incident was caused by a combination of increased traffic and inefficient connection pooling. The issue was resolved by scaling infrastructure and implementing circuit breaker patterns.",
    },
    {
      title: "Timeline",
      content:
        "14:00 UTC - First alerts received for increased API latency\n14:15 UTC - Incident declared and response team assembled\n14:30 UTC - Root cause identified as connection pool exhaustion\n15:00 UTC - Emergency scaling initiated\n16:30 UTC - Circuit breaker implementation deployed\n18:23 UTC - Incident resolved, monitoring continues",
    },
    {
      title: "Root Cause Analysis",
      content:
        "The incident was triggered by a sudden 300% increase in API traffic combined with inefficient connection pool management in the API Gateway. The connection pool was configured with a maximum of 100 connections, which was insufficient for the increased load. Additionally, the lack of circuit breaker patterns meant that failing requests continued to consume resources.",
    },
    {
      title: "Impact Assessment",
      content:
        "Approximately 1,250 users experienced degraded service during the incident window. 15% of API requests resulted in timeout errors. No data loss occurred, and all transactions were eventually processed successfully after the resolution.",
    },
    {
      title: "Lessons Learned",
      content:
        "1. Connection pool sizing needs to be more dynamic and responsive to traffic patterns\n2. Circuit breaker patterns should be implemented across all critical services\n3. Load testing should include scenarios with sudden traffic spikes\n4. Monitoring and alerting thresholds need to be adjusted for earlier detection",
    },
  ],
};

export default function HomePage() {
  const [view, setView] = useState<"dashboard" | "create" | "detail">(
    "dashboard",
  );
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    null,
  );

  const handleViewIncident = (id: string) => {
    setSelectedIncidentId(id);
    setView("detail");
  };

  const handleCreateIncident = (data: unknown) => {
    console.log("Creating incident:", data);
    setView("dashboard");
  };

  return (
    <DashboardLayout>
      {view === "dashboard" && (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Monitor and manage incidents in real-time
              </p>
            </div>
            <Button onClick={() => setView("create")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Incident
            </Button>
          </div>

          {/* Stats Cards */}
          <DashboardCards stats={mockStats} />

          {/* Incidents List */}
          <IncidentList
            incidents={mockIncidents}
            onViewIncident={handleViewIncident}
          />
        </div>
      )}

      {view === "create" && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create Incident
              </h1>
              <p className="text-gray-600 mt-1">Report a new incident</p>
            </div>
            <Button variant="outline" onClick={() => setView("dashboard")}>
              Back to Dashboard
            </Button>
          </div>
          <IncidentForm
            onSubmit={handleCreateIncident}
            onCancel={() => setView("dashboard")}
          />
        </div>
      )}

      {view === "detail" && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Incident Details
              </h1>
              <p className="text-gray-600 mt-1">
                View and manage incident information
              </p>
            </div>
            <Button variant="outline" onClick={() => setView("dashboard")}>
              Back to Dashboard
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
        </div>
      )}
    </DashboardLayout>
  );
}

// Made with Bob
