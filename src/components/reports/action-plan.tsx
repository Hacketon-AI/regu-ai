"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, AlertTriangle } from "lucide-react";

interface ActionItem {
  id: string;
  action: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  owner?: string;
  timeline?: string;
  status?: string;
}

interface ActionPlanProps {
  actions?: ActionItem[];
  title?: string;
}

const priorityConfig = {
  HIGH: {
    color: "destructive",
    icon: AlertTriangle,
    label: "High Priority",
  },
  MEDIUM: {
    color: "secondary",
    icon: Target,
    label: "Medium Priority",
  },
  LOW: {
    color: "outline",
    icon: Clock,
    label: "Low Priority",
  },
} as const;

export function ActionPlan({
  actions = [],
  title = "Action Plan",
}: ActionPlanProps) {
  if (actions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No action items available</p>
        </CardContent>
      </Card>
    );
  }

  const groupedActions = {
    HIGH: actions.filter((a) => a.priority === "HIGH"),
    MEDIUM: actions.filter((a) => a.priority === "MEDIUM"),
    LOW: actions.filter((a) => a.priority === "LOW"),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          {actions.length} action item{actions.length !== 1 ? "s" : ""}{" "}
          identified
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {(["HIGH", "MEDIUM", "LOW"] as const).map((priority) => {
            const items = groupedActions[priority];
            if (items.length === 0) return null;

            const PriorityIcon = priorityConfig[priority].icon;

            return (
              <div key={priority} className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <PriorityIcon className="w-4 h-4" />
                  <h3 className="font-semibold text-gray-900">
                    {priorityConfig[priority].label}
                  </h3>
                  <Badge variant={priorityConfig[priority].color}>
                    {items.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p className="font-medium text-gray-900 mb-2">
                        {item.action}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        {item.owner && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Owner:</span>
                            <span>{item.owner}</span>
                          </div>
                        )}
                        {item.timeline && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{item.timeline}</span>
                            </div>
                          </>
                        )}
                        {item.status && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {item.status}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Made with Bob
