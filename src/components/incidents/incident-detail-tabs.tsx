"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CheckSquare,
  Users,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

interface IncidentDetail {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  affectedSystems?: string[];
}

interface IncidentDetailTabsProps {
  incident: IncidentDetail;
  checklist?: React.ReactNode;
  actionPlan?: React.ReactNode;
  stakeholderSummary?: React.ReactNode;
  postMortem?: React.ReactNode;
}

export function IncidentDetailTabs({
  incident,
  checklist,
  actionPlan,
  stakeholderSummary,
  postMortem,
}: IncidentDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Incident Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {incident.title}
                </h2>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">{incident.severity}</Badge>
                  <Badge variant="outline">{incident.status}</Badge>
                  <Badge variant="secondary">{incident.category}</Badge>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>Created: {new Date(incident.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(incident.updatedAt).toLocaleString()}</p>
              </div>
            </div>
            {incident.affectedSystems &&
              incident.affectedSystems.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Affected Systems:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {incident.affectedSystems.map((system) => (
                      <Badge key={system} variant="outline">
                        {system}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs>
        <TabsList className="w-full justify-start">
          <TabsTrigger
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === "checklist"}
            onClick={() => setActiveTab("checklist")}
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            Checklist
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === "action-plan"}
            onClick={() => setActiveTab("action-plan")}
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Action Plan
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === "stakeholders"}
            onClick={() => setActiveTab("stakeholders")}
          >
            <Users className="w-4 h-4 mr-2" />
            Stakeholders
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === "post-mortem"}
            onClick={() => setActiveTab("post-mortem")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Post-Mortem
          </TabsTrigger>
        </TabsList>

        {activeTab === "overview" && (
          <TabsContent>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {incident.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === "checklist" && (
          <TabsContent>
            {checklist || (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-500">No checklist available</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}

        {activeTab === "action-plan" && (
          <TabsContent>
            {actionPlan || (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-500">No action plan available</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}

        {activeTab === "stakeholders" && (
          <TabsContent>
            {stakeholderSummary || (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-500">
                    No stakeholder summary available
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}

        {activeTab === "post-mortem" && (
          <TabsContent>
            {postMortem || (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-500">
                    No post-mortem report available
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

// Made with Bob
