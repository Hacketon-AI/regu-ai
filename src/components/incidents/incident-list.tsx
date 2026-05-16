"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, Eye } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: string;
  affectedSystems?: string[];
}

interface IncidentListProps {
  incidents?: Incident[];
  onViewIncident?: (id: string) => void;
}

const severityConfig = {
  CRITICAL: { color: "destructive", label: "Critical" },
  HIGH: { color: "destructive", label: "High" },
  MEDIUM: { color: "secondary", label: "Medium" },
  LOW: { color: "outline", label: "Low" },
} as const;

const statusConfig = {
  OPEN: { icon: AlertTriangle, color: "text-red-600", label: "Open" },
  IN_PROGRESS: { icon: Clock, color: "text-orange-600", label: "In Progress" },
  RESOLVED: { icon: CheckCircle, color: "text-green-600", label: "Resolved" },
  CLOSED: { icon: CheckCircle, color: "text-gray-600", label: "Closed" },
} as const;

export function IncidentList({ incidents = [], onViewIncident }: IncidentListProps) {
  if (incidents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No incidents found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.map((incident) => {
            const StatusIcon = statusConfig[incident.status].icon;
            return (
              <div
                key={incident.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <StatusIcon
                      className={`w-5 h-5 ${statusConfig[incident.status].color}`}
                    />
                    <h3 className="font-semibold text-gray-900">
                      {incident.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant={severityConfig[incident.severity].color}>
                      {severityConfig[incident.severity].label}
                    </Badge>
                    <span>•</span>
                    <span>{statusConfig[incident.status].label}</span>
                    <span>•</span>
                    <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
                  </div>
                  {incident.affectedSystems && incident.affectedSystems.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Affected:</span>
                      {incident.affectedSystems.slice(0, 3).map((system) => (
                        <Badge key={system} variant="outline" className="text-xs">
                          {system}
                        </Badge>
                      ))}
                      {incident.affectedSystems.length > 3 && (
                        <span className="text-xs">
                          +{incident.affectedSystems.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewIncident?.(incident.id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Made with Bob
