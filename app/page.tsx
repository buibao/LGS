import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, BarChart3, CalendarCheck2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_22%),radial-gradient(circle_at_top_right,rgba(15,118,110,0.2),transparent_24%),linear-gradient(180deg,#fffdf8_0%,#f6f2ea_100%)]">
      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <header className="flex items-center justify-between rounded-full border bg-white/70 px-5 py-3 backdrop-blur">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">LeadOps AI</p>
            <p className="text-sm text-slate-600">Lead management for local service teams</p>
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

        <section className="grid gap-10 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur">
              Lead capture, follow-up, campaign visibility, and weekly reporting
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 md:text-6xl">
                Turn social media leads into booked appointments
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                LeadOps AI helps local businesses track leads, follow-ups, campaigns, and weekly performance in one dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  View Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="lg" variant="outline">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["58%", "of leads go cold without structured follow-up"],
                ["7 days", "to spot weak campaigns without reporting visibility"],
                ["1 view", "for leads, sources, and next actions"],
              ].map(([value, label]) => (
                <Card key={label} className="bg-white/72">
                  <CardContent className="p-5">
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="mt-2 text-sm text-slate-600">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-0 bg-slate-900 text-white">
            <CardContent className="p-0">
              <div className="grid gap-5 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,#172554_0%,#0f172a_100%)] p-8">
                <div className="rounded-3xl bg-white/8 p-5 backdrop-blur">
                  <p className="text-sm text-white/70">Overview</p>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    {[
                      ["142", "Total leads"],
                      ["18", "Booked"],
                      ["12", "Need follow-up"],
                      ["32%", "Conversion rate"],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-2xl bg-white/8 p-4">
                        <p className="text-2xl font-semibold">{value}</p>
                        <p className="mt-1 text-sm text-white/70">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-white/8 p-5">
                    <Users className="h-5 w-5 text-cyan-300" />
                    <p className="mt-4 font-semibold">Lead tracking</p>
                    <p className="mt-2 text-sm text-white/70">Capture Facebook, TikTok, referral, website, and manual leads in one flow.</p>
                  </div>
                  <div className="rounded-2xl bg-white/8 p-5">
                    <BarChart3 className="h-5 w-5 text-amber-300" />
                    <p className="mt-4 font-semibold">Campaign clarity</p>
                    <p className="mt-2 text-sm text-white/70">See which sources create booked appointments instead of just clicks.</p>
                  </div>
                  <div className="rounded-2xl bg-white/8 p-5">
                    <CalendarCheck2 className="h-5 w-5 text-emerald-300" />
                    <p className="mt-4 font-semibold">Follow-up control</p>
                    <p className="mt-2 text-sm text-white/70">Identify overdue contacts before promising leads slip away.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 py-6 md:grid-cols-3">
          {[
            {
              title: "Pain points",
              items: [
                "Leads are scattered across inboxes, spreadsheets, and staff phones.",
                "Ad spend is hard to tie back to booked appointments.",
                "Owners cannot see which leads still need contact today.",
              ],
            },
            {
              title: "Features",
              items: [
                "Lead database with statuses, notes, and follow-up reminders.",
                "Campaign tracking across Facebook, TikTok, referral, and organic.",
                "Weekly AI-style reporting placeholder for faster decisions.",
              ],
            },
            {
              title: "How it works",
              items: [
                "Create a workspace and add leads manually in under a minute.",
                "Tag each lead to a source or campaign.",
                "Track the pipeline from NEW to BOOKED and review outcomes weekly.",
              ],
            },
          ].map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                {section.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="py-12">
          <Card className="bg-white/80">
            <CardHeader>
              <CardTitle>Pricing placeholder</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
              <p>Start with one workspace, core analytics, campaign tracking, and weekly reports. Add billing and plan enforcement later.</p>
              <Button variant="accent">Contact Sales</Button>
            </CardContent>
          </Card>
        </section>

        <footer className="border-t py-8 text-sm text-slate-500">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>LeadOps AI is built for local service businesses that need operational visibility without a heavy CRM rollout.</p>
            <p>Deploy-ready for Vercel, Clerk, and PostgreSQL.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
