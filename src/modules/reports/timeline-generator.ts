import type {
  ReportIncident,
  TimelineEntry,
} from "@/modules/reports/report.types";

export function generateTimeline(incident: ReportIncident): TimelineEntry[] {
  const detectedAt = incident.detectedAt;
  const timeline: TimelineEntry[] = [
    {
      time: formatTime(detectedAt),
      event: "Error detected from monitoring alert",
    },
    {
      time: formatTime(addMinutes(detectedAt, 10)),
      event: "Incident triage started and affected system identified",
    },
    {
      time: formatTime(addMinutes(detectedAt, 30)),
      event: `Investigation focused on ${incident.affectedSystem}`,
    },
  ];

  if (incident.resolvedAt) {
    timeline.push({
      time: formatTime(incident.resolvedAt),
      event: "Incident marked resolved after mitigation validation",
    });
  } else {
    timeline.push({
      time: formatTime(addMinutes(detectedAt, 60)),
      event: `Current incident status is ${incident.status}`,
    });
  }

  return timeline;
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
