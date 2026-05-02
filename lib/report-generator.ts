import { LeadStatus } from "@prisma/client";
import { endOfWeek, startOfWeek } from "date-fns";
import { db } from "@/lib/db";
import { getLeadsBySource, getLeadsByStatus } from "@/lib/analytics";

export async function generateWeeklyLeadReport(organizationId: string) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

  const [weeklyLeads, sourceBreakdown, statusBreakdown, followUpNeeded, bookedLeads] =
    await Promise.all([
      db.lead.findMany({
        where: {
          organizationId,
          createdAt: {
            gte: weekStart,
            lte: weekEnd,
          },
        },
        select: {
          id: true,
          status: true,
          sourceType: true,
        },
      }),
      getLeadsBySource(organizationId),
      getLeadsByStatus(organizationId),
      db.lead.count({
        where: {
          organizationId,
          status: { in: [LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.INTERESTED] },
          followUpAt: { lte: new Date() },
        },
      }),
      db.lead.count({
        where: {
          organizationId,
          status: LeadStatus.BOOKED,
          createdAt: {
            gte: weekStart,
            lte: weekEnd,
          },
        },
      }),
    ]);

  const bestSource = [...sourceBreakdown].sort((a, b) => b.leads - a.leads)[0];
  const statusesSummary = statusBreakdown
    .filter((item) => item.leads > 0)
    .map((item) => `${item.status.toLowerCase().replace("_", " ")}: ${item.leads}`)
    .join(", ");

  const topActions = [
    followUpNeeded > 0
      ? `Prioritize ${followUpNeeded} overdue follow-ups across NEW, CONTACTED, and INTERESTED leads.`
      : "Follow-up queue is under control this week.",
    bookedLeads > 0
      ? `Double down on ${bestSource?.source?.toLowerCase() ?? "top-performing"} campaigns that are already converting.`
      : "Tighten first-response speed and booking scripts to lift appointment conversion.",
  ];

  const report = [
    "Weekly Lead Report",
    "",
    `Total leads this week: ${weeklyLeads.length}`,
    `Best-performing source: ${bestSource?.source ?? "N/A"}${bestSource ? ` with ${bestSource.leads} leads` : ""}.`,
    `Booked leads this week: ${bookedLeads}`,
    `Lead status summary: ${statusesSummary || "No lead activity yet."}`,
    `Follow-up warnings: ${followUpNeeded} lead${followUpNeeded === 1 ? "" : "s"} currently need follow-up.`,
    `Suggested actions: ${topActions.join(" ")}`,
    "",
    "Facebook is currently the strongest source when it leads volume, but the team should keep response times under 24 hours for NEW and INTERESTED leads.",
    "",
    "TODO: Replace this deterministic summary with OpenAI or Vercel AI SDK generated insights when AI reporting is enabled.",
  ].join("\n");

  return {
    report,
    weeklyLeads: weeklyLeads.length,
    bestSource: bestSource?.source ?? null,
    bookedLeads,
    followUpNeeded,
    statusBreakdown,
  };
}
