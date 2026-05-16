"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalIncidents: number;
  activeIncidents: number;
  resolvedIncidents: number;
  avgResolutionTime: string;
}

interface DashboardCardsProps {
  stats?: DashboardStats;
}

export function DashboardCards({ stats }: DashboardCardsProps) {
  const defaultStats: DashboardStats = {
    totalIncidents: 0,
    activeIncidents: 0,
    resolvedIncidents: 0,
    avgResolutionTime: "0h",
  };

  const data = stats || defaultStats;

  const cards = [
    {
      title: "Total Incidents",
      value: data.totalIncidents,
      icon: AlertTriangle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Incidents",
      value: data.activeIncidents,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Resolved",
      value: data.resolvedIncidents,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg Resolution Time",
      value: data.avgResolutionTime,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`${card.bgColor} p-2 rounded-lg`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Made with Bob
