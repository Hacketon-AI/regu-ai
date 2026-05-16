import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api-error";
import { DEMO_ACTOR } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { formatZodErrors, handleRouteError } from "@/lib/route-helpers";
import { createAuditTrail } from "@/modules/audit/audit.service";
import { incidentIdParamSchema } from "@/modules/incidents/incident.validation";
import { generateIncidentMarkdownReport } from "@/modules/reports/markdown-exporter";
import { getOrGenerateIncidentReport } from "@/modules/reports/report.service";

type MarkdownExportRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  context: MarkdownExportRouteContext,
) {
  try {
    const { id } = await parseParams(context);
    
    // Ensure report exists (auto-generate if needed)
    await getOrGenerateIncidentReport(id);
    
    // Fetch incident with all related data including the report
    const incident = await prisma.incident.findUnique({
      where: { id },
      include: {
        aiReport: true,
        tasks: {
          orderBy: {
            createdAt: "asc",
          },
        },
        auditTrails: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!incident) {
      throw new ApiError("Incident not found.", 404);
    }

    const markdown = generateIncidentMarkdownReport(incident);

    await createAuditTrail({
      incidentId: incident.id,
      action: "Report exported",
      actor: DEMO_ACTOR,
      oldValue: null,
      newValue: {
        format: "markdown",
        incidentId: incident.id,
        title: incident.title,
      },
      note: "Incident report exported as Markdown",
    });

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  } catch (error) {
    return handleRouteError(error, "GET /api/incidents/[id]/export/markdown");
  }
}

async function parseParams(
  context: MarkdownExportRouteContext,
): Promise<{ id: string }> {
  const params = await context.params;
  const validation = incidentIdParamSchema.safeParse(params);

  if (!validation.success) {
    throw new ApiError(
      "Invalid incident id.",
      400,
      formatZodErrors(validation.error),
    );
  }

  return validation.data;
}
