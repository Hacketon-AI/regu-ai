"use client";

import { useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, Clock, User, Plus } from "lucide-react";
import { useAllTasks } from "@/hooks/use-tasks";

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "To Do":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-orange-100 text-orange-800";
    case "Low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Sub-component: Task Badges
type TaskBadgesProps = {
  status: string;
  priority: string;
};

const TaskBadges = ({ status, priority }: TaskBadgesProps) => (
  <>
    <Badge className={getStatusColor(status)}>{status}</Badge>
    <Badge className={getPriorityColor(priority)}>{priority}</Badge>
  </>
);

// Sub-component: Task Metadata
type TaskMetadataProps = {
  owner?: string;
  dueDate?: string | null;
  incident?: Incident;
};

const TaskMetadata = ({ owner, dueDate, incident }: TaskMetadataProps) => {
  const formattedDueDate = useMemo(
    () => (dueDate ? new Date(dueDate).toLocaleDateString() : null),
    [dueDate],
  );

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      {owner && (
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>{owner}</span>
        </div>
      )}
      {formattedDueDate && (
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Due: {formattedDueDate}</span>
        </div>
      )}
      {incident && (
        <div className="text-blue-600">Related: {incident.title}</div>
      )}
    </div>
  );
};

// Main component: Task Card
type TaskCardProps = {
  task: TaskWithIncident;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { id, title, status, priority, description, owner, dueDate, incident } =
    task;

  return (
    <Card key={id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <TaskBadges status={status} priority={priority} />
            </div>
            {description && <p className="text-gray-600 mb-3">{description}</p>}
            <TaskMetadata owner={owner} dueDate={dueDate} incident={incident} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function TasksPage() {
  // React Query hook
  const { data: tasks = [], isLoading } = useAllTasks();

  const pendingTasks = useMemo(
    () => tasks.filter((t: TaskWithIncident) => t.status === "To Do"),
    [tasks],
  );
  const inProgressTasks = useMemo(
    () => tasks.filter((t: TaskWithIncident) => t.status === "In Progress"),
    [tasks],
  );
  const completedTasks = useMemo(
    () => tasks.filter((t: TaskWithIncident) => t.status === "Done"),
    [tasks],
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </DashboardLayout>
    );
  }

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
          {tasks.length === 0 ? (
            <Card>
              <CardContent className="p-12">
                <div className="text-center text-gray-500">
                  <CheckSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No tasks found</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {tasks.map((task: TaskWithIncident) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// Made with Bob
