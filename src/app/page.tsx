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
import { useDashboardSummary } from "@/hooks/use-dashboard";
import {
  useIncidentDetail,
  useIncidentReport,
  useCreateIncident,
} from "@/hooks/use-incidents";

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

type IncidentDetail = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  severity: string;
  status: string;
  affectedSystem: string;
  impactSummary: string | null;
  affectedUsers: number | null;
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

type IncidentFormData = {
  title: string;
  description: string;
  severity: string;
  category: string;
  affectedSystems: string;
};

export default function HomePage() {
  const [view, setView] = useState<"dashboard" | "create" | "detail">(
    "dashboard",
  );
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    null,
  );

  // React Query hooks
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    error: dashboardError,
  } = useDashboardSummary();

  const { data: incidentDetail } = useIncidentDetail(
    view === "detail" ? selectedIncidentId : null,
  );

  const { data: report } = useIncidentReport(
    view === "detail" ? selectedIncidentId : null,
  );

  const createIncidentMutation = useCreateIncident();

  const handleViewIncident = (id: string) => {
    setSelectedIncidentId(id);
    setView("detail");
  };

  const handleCreateIncident = async (formData: IncidentFormData) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      type: formData.category,
      severity: formData.severity,
      status: "Open",
      affectedSystem: formData.affectedSystems || "Unknown",
      impactSummary: formData.description,
      detectedAt: new Date().toISOString(),
    };

    try {
      await createIncidentMutation.mutateAsync(payload);
      setView("dashboard");
    } catch (err) {
      console.error("Error creating incident:", err);
    }
  };

  if (isDashboardLoading && view === "dashboard") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (dashboardError && view === "dashboard") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">
            {dashboardError instanceof Error
              ? dashboardError.message
              : "Failed to load dashboard"}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const stats = dashboardData?.stats;
  const incidents = dashboardData?.recentIncidents || [];

  return (
    <DashboardLayout>
      {view === "dashboard" && (
        <div className="space-y-8">
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

          <DashboardCards
            stats={
              stats
                ? {
                    totalIncidents: stats.totalIncidents,
                    activeIncidents: stats.openIncidents,
                    resolvedIncidents: stats.resolvedIncidents,
                    avgResolutionTime: stats.averageResponseTime,
                  }
                : undefined
            }
          />

          <IncidentList
            incidents={incidents.map((inc: Incident) => ({
              id: inc.id,
              title: inc.title,
              severity: inc.severity.toUpperCase() as
                | "CRITICAL"
                | "HIGH"
                | "MEDIUM"
                | "LOW",
              status: inc.status.toUpperCase().replace(" ", "_") as
                | "OPEN"
                | "IN_PROGRESS"
                | "RESOLVED"
                | "CLOSED",
              createdAt: inc.createdAt,
              affectedSystems: [inc.affectedSystem],
            }))}
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

      {view === "detail" && incidentDetail && (
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
            incident={{
              id: incidentDetail.id,
              title: incidentDetail.title,
              description: incidentDetail.description || "",
              severity: incidentDetail.severity,
              status: incidentDetail.status,
              category: incidentDetail.type,
              createdAt: incidentDetail.createdAt,
              updatedAt: incidentDetail.updatedAt,
              affectedSystems: [incidentDetail.affectedSystem],
            }}
            checklist={
              <Checklist
                items={
                  report?.checklist.map((item) => ({
                    id: item.title,
                    task: item.title,
                    status: item.done
                      ? ("COMPLETED" as const)
                      : ("PENDING" as const),
                    assignee: undefined,
                  })) || []
                }
              />
            }
            actionPlan={
              <ActionPlan
                actions={
                  report?.technicalActionPlan
                    ? Object.entries(report.technicalActionPlan).flatMap(
                        ([team, actions]) =>
                          (actions || []).map((action, idx) => ({
                            id: `${team}-${idx}`,
                            action,
                            priority: "MEDIUM" as const,
                            owner: team.charAt(0).toUpperCase() + team.slice(1),
                            timeline: "TBD",
                          })),
                      )
                    : []
                }
              />
            }
            stakeholderSummary={<StakeholderSummary stakeholders={[]} />}
            postMortem={
              report?.postmortemReport ? (
                <PostMortemPreview
                  data={{
                    incidentTitle: incidentDetail.title,
                    severity: incidentDetail.severity,
                    duration: "N/A",
                    impactedUsers: incidentDetail.affectedUsers || 0,
                    generatedAt: report.createdAt,
                    sections: [
                      {
                        title: "Executive Summary",
                        content: report.postmortemReport.executiveSummary,
                      },
                      {
                        title: "Timeline",
                        content: report.postmortemReport.timeline
                          .map((t) => `${t.time} - ${t.event}`)
                          .join("\n"),
                      },
                      {
                        title: "Root Cause Analysis",
                        content: report.postmortemReport.rootCause,
                      },
                      {
                        title: "Impact Assessment",
                        content: report.postmortemReport.impact,
                      },
                      {
                        title: "Resolution",
                        content: report.postmortemReport.resolution,
                      },
                    ],
                  }}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No post-mortem report available yet
                </div>
              )
            }
          />
        </div>
      )}
    </DashboardLayout>
  );
}

// Made with Bob
