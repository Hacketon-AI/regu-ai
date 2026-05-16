"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  Eye,
  LucideIcon,
} from "lucide-react";

interface Incident {
  id: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: string;
  affectedSystems?: string[];
}

// Type for incident view callback
type OnViewIncident = (id: string) => void;

interface IncidentListProps {
  incidents?: Incident[];
  onViewIncident?: OnViewIncident;
}

const severityConfig = {
  CRITICAL: { color: "destructive" as const, label: "Critical" },
  HIGH: { color: "destructive" as const, label: "High" },
  MEDIUM: { color: "secondary" as const, label: "Medium" },
  LOW: { color: "outline" as const, label: "Low" },
} as const;

const statusConfig = {
  OPEN: { icon: AlertTriangle, color: "text-red-600", label: "Open" },
  IN_PROGRESS: { icon: Clock, color: "text-orange-600", label: "In Progress" },
  RESOLVED: { icon: CheckCircle, color: "text-green-600", label: "Resolved" },
  CLOSED: { icon: CheckCircle, color: "text-gray-600", label: "Closed" },
} as const;

// Helper function to format incident dates
const formatIncidentDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

// Component to display affected systems badges
const AffectedSystemsBadges = React.memo(
  ({ systems }: { systems: string[] }) => {
    const displaySystems = systems.slice(0, 3);
    const remainingCount = systems.length - 3;

    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Affected:</span>
        {displaySystems.map((system) => (
          <Badge key={system} variant="outline" className="text-xs">
            {system}
          </Badge>
        ))}
        {remainingCount > 0 && (
          <span className="text-xs">+{remainingCount} more</span>
        )}
      </div>
    );
  },
);

AffectedSystemsBadges.displayName = "AffectedSystemsBadges";

// Component to display incident header with status icon
const IncidentHeader = React.memo(
  ({
    icon: Icon,
    color,
    title,
  }: {
    icon: LucideIcon;
    color: string;
    title: string;
  }) => (
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${color}`} />
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
  ),
);

IncidentHeader.displayName = "IncidentHeader";

// Component to display incident metadata (severity, status, date)
const IncidentMetadata = React.memo(
  ({
    severityColor,
    severityLabel,
    statusLabel,
    formattedDate,
  }: {
    severityColor: "destructive" | "secondary" | "outline";
    severityLabel: string;
    statusLabel: string;
    formattedDate: string;
  }) => (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Badge variant={severityColor}>{severityLabel}</Badge>
      <span>•</span>
      <span>{statusLabel}</span>
      <span>•</span>
      <span>{formattedDate}</span>
    </div>
  ),
);

IncidentMetadata.displayName = "IncidentMetadata";

// Style constants for IncidentCard
const CARD_CONTAINER_CLASS =
  "flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors";
const CONTENT_CONTAINER_CLASS = "flex-1 space-y-2";

// Type for derived incident data
interface IncidentDerivedData {
  statusIcon: LucideIcon;
  statusColor: string;
  statusLabel: string;
  severityColor: "destructive" | "secondary" | "outline";
  severityLabel: string;
  formattedDate: string;
}

// Custom hook to compute derived incident data
const useIncidentDerivedData = (incident: Incident): IncidentDerivedData => {
  return React.useMemo(() => {
    const statusInfo = statusConfig[incident.status];
    const severityInfo = severityConfig[incident.severity];
    return {
      statusIcon: statusInfo?.icon || AlertTriangle,
      statusColor: statusInfo?.color || "text-gray-600",
      statusLabel: statusInfo?.label || "Unknown",
      severityColor: severityInfo?.color || "outline",
      severityLabel: severityInfo?.label || "Unknown",
      formattedDate: formatIncidentDate(incident.createdAt),
    };
  }, [incident.status, incident.severity, incident.createdAt]);
};

// Props interface for IncidentCard
interface IncidentCardProps {
  incident: Incident;
  onView?: OnViewIncident;
}

// Component to display individual incident card
const IncidentCard = React.memo<IncidentCardProps>(
  ({ incident, onView }) => {
    // Destructure incident properties for cleaner code
    const { id, title, affectedSystems } = incident;

    // Get derived data using custom hook
    const derivedData = useIncidentDerivedData(incident);

    // Memoize callback to prevent unnecessary re-renders
    const handleView = React.useCallback(() => {
      onView?.(id);
    }, [onView, id]);

    return (
      <div className={CARD_CONTAINER_CLASS}>
        <div className={CONTENT_CONTAINER_CLASS}>
          <IncidentHeader
            icon={derivedData.statusIcon}
            color={derivedData.statusColor}
            title={title}
          />
          <IncidentMetadata
            severityColor={derivedData.severityColor}
            severityLabel={derivedData.severityLabel}
            statusLabel={derivedData.statusLabel}
            formattedDate={derivedData.formattedDate}
          />
          {affectedSystems && affectedSystems.length > 0 && (
            <AffectedSystemsBadges systems={affectedSystems} />
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleView}
          aria-label={`View details for ${title}`}
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
      </div>
    );
  },
  // Optimized comparison function to prevent unnecessary re-renders
  (prevProps, nextProps) => {
    const prev = prevProps.incident;
    const next = nextProps.incident;

    // Quick reference check first
    if (prev === next) return true;

    // Compare primitive fields
    if (
      prev.id !== next.id ||
      prev.title !== next.title ||
      prev.status !== next.status ||
      prev.severity !== next.severity ||
      prev.createdAt !== next.createdAt
    ) {
      return false;
    }

    // Compare affectedSystems array efficiently
    const prevSystems = prev.affectedSystems;
    const nextSystems = next.affectedSystems;

    if (prevSystems === nextSystems) return true;
    if (!prevSystems || !nextSystems) return false;
    if (prevSystems.length !== nextSystems.length) return false;

    return prevSystems.every((sys, idx) => sys === nextSystems[idx]);
  },
);

IncidentCard.displayName = "IncidentCard";

export function IncidentList({
  incidents = [],
  onViewIncident,
}: IncidentListProps) {
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
          {incidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onView={onViewIncident}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Made with Bob
