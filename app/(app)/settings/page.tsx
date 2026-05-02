import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getCurrentWorkspace } from "@/lib/auth";

export default async function SettingsPage() {
  const { organization, membership } = await getCurrentWorkspace();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings"
        description="Organization configuration, team management, and billing controls are staged here for the next milestone."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Organization settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>Name: {organization.name}</p>
            <p>Slug: {organization.slug}</p>
            <p>More workspace editing controls can be added here next.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>Your current role: {membership.role}</p>
            <p>Invite flows, seat management, and permission editing are placeholders in this MVP.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>Plan status: Demo workspace</p>
            <p>Billing, invoices, and usage-based limits can plug in here later.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
