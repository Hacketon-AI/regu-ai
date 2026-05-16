"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Phone, Building } from "lucide-react";

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  department?: string;
  email?: string;
  phone?: string;
  notificationStatus?: "NOTIFIED" | "PENDING" | "FAILED";
}

interface StakeholderSummaryProps {
  stakeholders?: Stakeholder[];
  title?: string;
}

const notificationStatusConfig = {
  NOTIFIED: { color: "default", label: "Notified" },
  PENDING: { color: "secondary", label: "Pending" },
  FAILED: { color: "destructive", label: "Failed" },
} as const;

export function StakeholderSummary({
  stakeholders = [],
  title = "Stakeholder Summary",
}: StakeholderSummaryProps) {
  if (stakeholders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No stakeholders identified</p>
        </CardContent>
      </Card>
    );
  }

  const notifiedCount = stakeholders.filter(
    (s) => s.notificationStatus === "NOTIFIED",
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          {notifiedCount} of {stakeholders.length} stakeholder
          {stakeholders.length !== 1 ? "s" : ""} notified
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stakeholders.map((stakeholder) => (
            <div
              key={stakeholder.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {stakeholder.name}
                  </h3>
                  <p className="text-sm text-gray-600">{stakeholder.role}</p>
                </div>
                {stakeholder.notificationStatus && (
                  <Badge
                    variant={
                      notificationStatusConfig[stakeholder.notificationStatus]
                        .color
                    }
                  >
                    {
                      notificationStatusConfig[stakeholder.notificationStatus]
                        .label
                    }
                  </Badge>
                )}
              </div>

              <div className="space-y-2 text-sm">
                {stakeholder.department && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building className="w-4 h-4" />
                    <span>{stakeholder.department}</span>
                  </div>
                )}
                {stakeholder.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <a
                      href={`mailto:${stakeholder.email}`}
                      className="hover:text-primary hover:underline"
                    >
                      {stakeholder.email}
                    </a>
                  </div>
                )}
                {stakeholder.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a
                      href={`tel:${stakeholder.phone}`}
                      className="hover:text-primary hover:underline"
                    >
                      {stakeholder.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Made with Bob
