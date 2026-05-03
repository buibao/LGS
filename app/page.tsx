import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  ChartNoAxesCombined,
  ClipboardList,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fafe_0%,#f5f7fb_100%)]">
      <main className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-8">
        <header className="surface-panel flex flex-col gap-4 rounded-[28px] border px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">LeadOps AI</p>
            <p className="text-sm text-slate-600">Lead management for local service businesses</p>
          </div>
          <div className="flex items-center gap-3">
            {userId ? (
              <Link href="/dashboard">
                <Button size="sm">Open Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-in" className="text-sm font-medium text-slate-600">
                  Sign in
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </header>

        <section className="grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-700">
              Built for spas, dental clinics, beauty centers, clinics, and education teams
            </div>
            <div className="space-y-5">
              <h1 className="text-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                Turn social media leads into booked appointments
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                LeadOps AI helps local service businesses track leads, follow-ups, campaigns, and weekly performance in one clean dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  View Dashboard Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">Follow-up needed visibility</Badge>
              <Badge variant="neutral">Campaign performance clarity</Badge>
              <Badge variant="warning">Demo-ready weekly reporting</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["All lead sources", "Facebook, TikTok, website forms, referrals, and manual entry in one place."],
                ["Actionable follow-up", "Staff can see which leads need attention today before they go cold."],
                ["Simple conversion view", "Owners can track booked appointments without digging through spreadsheets."],
              ].map(([value, label]) => (
                <Card key={label} className="surface-panel">
                  <CardContent className="p-5">
                    <p className="text-lg font-semibold text-slate-950">{value}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="surface-panel overflow-hidden">
            <CardContent className="p-0">
              <div className="soft-grid grid gap-5 p-6 md:p-8">
                <div className="rounded-3xl border bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-500">LeadOps dashboard preview</p>
                    <Badge variant="info">Demo workspace</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    {[
                      ["142", "Total leads"],
                      ["18", "Booked appointments"],
                      ["12", "Follow-up needed"],
                      ["32%", "Conversion rate"],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-2xl border bg-[var(--secondary)]/55 p-4">
                        <p className="text-2xl font-semibold text-slate-950">{value}</p>
                        <p className="mt-1 text-sm text-slate-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">What needs attention</p>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-slate-950">12</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">Leads need follow-up today. Oldest pending: 2 days ago from Facebook.</p>
                  </div>
                  <div className="rounded-2xl border bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Top sources</p>
                      <BarChart3 className="h-4 w-4 text-[var(--primary)]" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ["Facebook Lead Ads", "42 leads"],
                        ["Website Forms", "31 leads"],
                        ["Referrals", "19 leads"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between rounded-2xl bg-[var(--secondary)]/55 px-4 py-3">
                          <span className="text-sm text-slate-700">{label}</span>
                          <span className="text-sm font-semibold text-slate-950">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">Recent leads</p>
                    <Badge variant="neutral">Compact table</Badge>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Linh Tran", "Teeth whitening", "Booked"],
                      ["Anna Nguyen", "Skin treatment", "Follow-up today"],
                      ["David Pham", "English course", "New"],
                    ].map(([name, interest, status]) => (
                      <div key={name} className="flex items-center justify-between rounded-2xl border px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{name}</p>
                          <p className="text-xs text-slate-500">{interest}</p>
                        </div>
                        <span className="text-xs font-semibold text-[var(--primary)]">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 py-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Leads are scattered",
              text: "Leads are scattered across inboxes, forms, and spreadsheets, so nobody has one clear view of what came in.",
            },
            {
              title: "Follow-up gets missed",
              text: "Staff forget to follow up, especially when messages are split across channels or handed off between team members.",
            },
            {
              title: "Campaign visibility is weak",
              text: "Owners cannot see which campaign works, so ad budget gets spent without clear lead quality tracking.",
            },
            {
              title: "Booking quality is unclear",
              text: "Without a clean process, new lead volume looks healthy even when appointments are not actually increasing.",
            },
          ].map((section) => (
            <Card key={section.title} className="surface-panel h-full">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-slate-600">
                <p>{section.text}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="py-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Everything your team needs to move leads toward booked appointments</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                icon: <Users className="h-5 w-5 text-[var(--primary)]" />,
                title: "Lead Tracking",
                text: "Capture Facebook, TikTok, website, referral, and manual leads in one place.",
              },
              {
                icon: <CalendarCheck2 className="h-5 w-5 text-[var(--accent)]" />,
                title: "Follow-up Reminders",
                text: "Keep overdue and due-today follow-ups visible so promising leads do not go cold.",
              },
              {
                icon: <ChartNoAxesCombined className="h-5 w-5 text-emerald-600" />,
                title: "Campaign Source Insights",
                text: "Compare which channels produce the most leads and the best booking outcomes.",
              },
              {
                icon: <Sparkles className="h-5 w-5 text-sky-600" />,
                title: "Weekly AI-style Reports",
                text: "Summarize lead performance with business-friendly reporting that is ready for future AI upgrades.",
              },
              {
                icon: <BarChart3 className="h-5 w-5 text-indigo-600" />,
                title: "Appointment Conversion Overview",
                text: "Watch the path from inquiry to booked appointment with simple performance metrics.",
              },
              {
                icon: <ClipboardList className="h-5 w-5 text-rose-600" />,
                title: "Team-ready CRM Workflow",
                text: "Leave clear notes, status updates, and next steps so staff can pick up where others left off.",
              },
            ].map((item) => (
              <Card key={item.title} className="surface-panel bg-white/80">
                <CardContent className="space-y-4 p-6">
                  <div className="w-fit rounded-2xl bg-[var(--secondary)] p-3">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="py-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">How It Works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">A simple workflow for busy local service teams</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["01", "Capture leads", "Bring in inquiries from ads, website forms, referrals, or manual entry."],
              ["02", "Track follow-up", "Assign a clear status and next follow-up date so nobody forgets the lead."],
              ["03", "Convert to bookings", "Move qualified leads into booked appointments and keep notes organized."],
              ["04", "Review weekly performance", "See what sources, campaigns, and staff actions are driving better results."],
            ].map(([step, title, text]) => (
              <Card key={step} className="surface-panel">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-[var(--primary)]">{step}</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Simple plan structure for demo conversations</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Starter", "For owner-operated businesses getting visibility on new leads and follow-up basics."],
              ["Growth", "For teams that need stronger campaign tracking, more users, and reporting clarity."],
              ["Custom", "For multi-location or higher-volume teams that need tailored onboarding and workflows."],
            ].map(([title, text]) => (
              <Card key={title} className="surface-panel h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{title}</CardTitle>
                    <Badge variant="warning">Coming soon</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-slate-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="border-t border-[var(--border)] py-8 text-sm text-slate-500">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>LeadOps AI helps local service businesses turn scattered inquiries into a cleaner booking workflow.</p>
            <p>Built for lead tracking, follow-up control, and appointment conversion visibility.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
