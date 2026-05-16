"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, Clock, User, Plus } from "lucide-react";

// Mock data for tasks
const mockTasks = [
  {
    id: "1",
    title: "Scale up API Gateway instances",
    description: "Increase capacity to handle current load",
    status: "IN_PROGRESS" as const,
    priority: "HIGH" as const,
    assignee: "Jane Smith",
    dueDate: new Date().toISOString(),
    incidentId: "1",
    incidentTitle: "API Gateway Timeout Issues",
  },
  {
    id: "2",
    title: "Monitor system performance metrics",
    description: "Set up continuous monitoring for gateway latency",
    status: "PENDING" as const,
    priority: "MEDIUM" as const,
    assignee: "Bob Johnson",
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    incidentId: "1",
    incidentTitle: "API Gateway Timeout Issues",
  },
  {
    id: "3",
    title: "Update incident status and notify stakeholders",
    description: "Send status update to all stakeholders",
    status: "PENDING" as const,
    priority: "HIGH" as const,
    dueDate: new Date(Date.now() + 43200000).toISOString(),
    incidentId: "1",
    incidentTitle: "API Gateway Timeout Issues",
  },
  {
    id: "4",
    title: "Review database query performance",
    description: "Optimize slow queries identified in the incident",
    status: "COMPLETED" as const,
    priority: "MEDIUM" as const,
    assignee: "John Doe",
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    incidentId: "2",
    incidentTitle: "Database Connection Pool Exhaustion",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-800";
    case "MEDIUM":
      return "bg-orange-100 text-orange-800";
    case "LOW":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function TasksPage() {
  const pendingTasks = mockTasks.filter((t) => t.status === "PENDING");
  const inProgressTasks = mockTasks.filter((t) => t.status === "IN_PROGRESS");
  const completedTasks = mockTasks.filter((t) => t.status === "COMPLETED");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-1">
              Manage and track incident-related tasks
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Tasks
              </CardTitle>
              <Clock className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                In Progress
              </CardTitle>
              <Clock className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressTasks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Completed
              </CardTitle>
              <CheckSquare className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">All Tasks</h2>
          <div className="space-y-3">
            {mockTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {task.title}
                        </h3>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace("_", " ")}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{task.assignee}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        <div className="text-blue-600">
                          Related: {task.incidentTitle}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Made with Bob
