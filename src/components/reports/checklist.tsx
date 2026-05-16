"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock } from "lucide-react";

interface ChecklistItem {
  id: string;
  task: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  assignee?: string;
  dueDate?: string;
}

interface ChecklistProps {
  items?: ChecklistItem[];
  title?: string;
}

const statusConfig = {
  PENDING: {
    icon: Circle,
    color: "text-gray-400",
    bgColor: "bg-gray-50",
    label: "Pending",
  },
  IN_PROGRESS: {
    icon: Clock,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    label: "In Progress",
  },
  COMPLETED: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-50",
    label: "Completed",
  },
};

export function Checklist({
  items = [],
  title = "Response Checklist",
}: ChecklistProps) {
  const completedCount = items.filter(
    (item) => item.status === "COMPLETED",
  ).length;
  const totalCount = items.length;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No checklist items available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {completedCount} of {totalCount} completed
            </span>
            <Badge variant={progress === 100 ? "default" : "secondary"}>
              {progress}%
            </Badge>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => {
            const StatusIcon = statusConfig[item.status].icon;
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  statusConfig[item.status].bgColor
                }`}
              >
                <StatusIcon
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    statusConfig[item.status].color
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p
                    className={`font-medium ${
                      item.status === "COMPLETED"
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {item.task}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Badge variant="outline" className="text-xs">
                      {statusConfig[item.status].label}
                    </Badge>
                    {item.assignee && (
                      <>
                        <span>•</span>
                        <span>Assigned to: {item.assignee}</span>
                      </>
                    )}
                    {item.dueDate && (
                      <>
                        <span>•</span>
                        <span>
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
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
