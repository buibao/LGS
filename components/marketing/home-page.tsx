import NextLink from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  MessageSquareMore,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function HomePage() {
  const { userId } = await auth();
  const tCommon = await getTranslations("Common");
  const tLanding = await getTranslations("Landing");

  const heroStats = [
    { value: "142", label: tLanding("hero.mockup.kpi.totalLeads") },
    { value: "18", label: tLanding("hero.mockup.kpi.bookedAppointments") },
    { value: "12", label: tLanding("hero.mockup.kpi.followUpNeeded") },
    { value: "32%", label: tLanding("hero.mockup.kpi.conversionRate") },
  ];

  const mockupSources = [
    { label: tLanding("hero.mockup.sources.facebook"), value: "42" },
    { label: tLanding("hero.mockup.sources.website"), value: "31" },
    { label: tLanding("hero.mockup.sources.referral"), value: "19" },
  ];

  const mockupLeads = [
    { name: "Linh Tran", interest: tLanding("hero.mockup.interests.dental"), status: tLanding("hero.mockup.status.booked"), badge: "success" as const },
    { name: "Anna Nguyen", interest: tLanding("hero.mockup.interests.beauty"), status: tLanding("hero.mockup.status.followUp"), badge: "warning" as const },
    { name: "David Pham", interest: tLanding("hero.mockup.interests.education"), status: tLanding("hero.mockup.status.new"), badge: "teal" as const },
  ];

  const pains = [
    { title: tLanding("pain.title1"), text: tLanding("pain.text1"), icon: <MessageSquareMore className="h-5 w-5" /> },
    { title: tLanding("pain.title2"), text: tLanding("pain.text2"), icon: <CalendarClock className="h-5 w-5" /> },
    { title: tLanding("pain.title3"), text: tLanding("pain.text3"), icon: <BarChart3 className="h-5 w-5" /> },
    { title: tLanding("pain.title4"), text: tLanding("pain.text4"), icon: <Target className="h-5 w-5" /> },
  ];

  const features = [
    { title: tLanding("features.cards.tracking.title"), text: tLanding("features.cards.tracking.text"), icon: <Users className="h-5 w-5 text-[var(--primary)]" /> },
    { title: tLanding("features.cards.followUp.title"), text: tLanding("features.cards.followUp.text"), icon: <CalendarClock className="h-5 w-5 text-[var(--accent)]" /> },
    { title: tLanding("features.cards.insights.title"), text: tLanding("features.cards.insights.text"), icon: <BarChart3 className="h-5 w-5 text-emerald-600" /> },
    { title: tLanding("features.cards.reports.title"), text: tLanding("features.cards.reports.text"), icon: <Sparkles className="h-5 w-5 text-sky-600" /> },
    { title: tLanding("features.cards.conversion.title"), text: tLanding("features.cards.conversion.text"), icon: <Target className="h-5 w-5 text-indigo-600" /> },
    { title: tLanding("features.cards.workflow.title"), text: tLanding("features.cards.workflow.text"), icon: <ClipboardList className="h-5 w-5 text-rose-600" /> },
  ];

  const steps = [
    { step: "01", title: tLanding("how.steps.capture.title"), text: tLanding("how.steps.capture.text") },
    { step: "02", title: tLanding("how.steps.followUp.title"), text: tLanding("how.steps.followUp.text") },
    { step: "03", title: tLanding("how.steps.convert.title"), text: tLanding("how.steps.convert.text") },
    { step: "04", title: tLanding("how.steps.review.title"), text: tLanding("how.steps.review.text") },
  ];

  const useCases = [
    { title: tLanding("useCases.cards.spa.title"), text: tLanding("useCases.cards.spa.text") },
    { title: tLanding("useCases.cards.dental.title"), text: tLanding("useCases.cards.dental.text") },
    { title: tLanding("useCases.cards.clinic.title"), text: tLanding("useCases.cards.clinic.text") },
    { title: tLanding("useCases.cards.education.title"), text: tLanding("useCases.cards.education.text") },
  ];

  const pricing = [
    { title: tLanding("pricing.starter.title"), text: tLanding("pricing.starter.text") },
    { title: tLanding("pricing.growth.title"), text: tLanding("pricing.growth.text") },
    { title: tLanding("pricing.custom.title"), text: tLanding("pricing.custom.text") },
  ];

  const faqs = [
    { question: tLanding("faq.items.crm.question"), answer: tLanding("faq.items.crm.answer") },
    { question: tLanding("faq.items.integration.question"), answer: tLanding("faq.items.integration.answer") },
    { question: tLanding("faq.items.team.question"), answer: tLanding("faq.items.team.answer") },
    { question: tLanding("faq.items.language.question"), answer: tLanding("faq.items.language.answer") },
    { question: tLanding("faq.items.ai.question"), answer: tLanding("faq.items.ai.answer") },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f2f6fb_100%)]">
      <main className="mx-auto max-w-[1240px] px-4 py-4 md:px-6 md:py-6 xl:px-8">
        <header className="surface-panel rounded-[30px] border border-white/70 px-5 py-4 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.2)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--primary)] uppercase">{tCommon("appName")}</p>
                  <p className="text-[0.95rem] leading-7 text-slate-600">{tLanding("header.tagline")}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {userId ? (
                <div className="flex items-center gap-3">
                  <Link href="/dashboard">
                    <Button size="sm" className="px-4">{tLanding("header.openDashboard")}</Button>
                  </Link>
                  <LanguageSwitcher className="sm:min-w-[8.75rem]" />
                </div>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <NextLink href="/sign-in" className="text-sm font-medium text-slate-600">
                    {tLanding("header.signIn")}
                  </NextLink>
                  <NextLink href="/sign-up">
                    <Button size="lg" className="px-5 shadow-[0_18px_34px_-20px_rgba(15,95,115,0.58)]">{tLanding("header.getStarted")}</Button>
                  </NextLink>
                  <LanguageSwitcher className="sm:min-w-[8.75rem]" />
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="grid gap-10 py-14 md:grid-cols-[1.02fr_0.98fr] md:items-center md:py-20">
          <div className="space-y-8">
            <Badge variant="teal">
              {tLanding("hero.badge")}
            </Badge>

            <div className="space-y-5">
              <h1 className="text-balance max-w-4xl text-5xl font-extrabold text-slate-950 md:text-[4.2rem]">
                {tLanding("hero.title")}
              </h1>
              <p className="max-w-2xl text-[1.1rem] leading-8 text-slate-600 md:text-[1.16rem]">
                {tLanding("hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  {tLanding("hero.primaryCta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <NextLink href="#how-it-works">
                <Button size="lg" variant="outline">
                  {tLanding("hero.secondaryCta")}
                </Button>
              </NextLink>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="teal" size="sm">{tLanding("hero.tags.followUp")}</Badge>
              <Badge variant="neutral" size="sm">{tLanding("hero.tags.campaigns")}</Badge>
              <Badge variant="warning" size="sm">{tLanding("hero.tags.reports")}</Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: tLanding("hero.highlights.sources.title"), text: tLanding("hero.highlights.sources.text") },
                { title: tLanding("hero.highlights.followUp.title"), text: tLanding("hero.highlights.followUp.text") },
                { title: tLanding("hero.highlights.conversion.title"), text: tLanding("hero.highlights.conversion.text") },
              ].map((item) => (
                <Card key={item.title} className="surface-panel">
                  <CardContent className="p-5 pt-6 md:p-5 md:pt-7">
                    <p className="text-[1.05rem] font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-2 text-[0.94rem] leading-7 text-slate-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="surface-panel overflow-hidden border-white/60 shadow-[0_34px_70px_-42px_rgba(15,23,42,0.28)]">
            <CardContent className="p-0">
              <div className="soft-grid grid gap-5 p-5 md:p-7">
                <div className="rounded-[30px] border bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[0.95rem] font-semibold text-slate-900">{tLanding("hero.mockup.title")}</p>
                      <p className="mt-1 text-[0.92rem] leading-6 text-slate-500">{tLanding("hero.mockup.subtitle")}</p>
                    </div>
                    <Badge variant="info" size="sm">{tLanding("hero.mockup.demoBadge")}</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {heroStats.map((item) => (
                      <div key={item.label} className="rounded-2xl border bg-[var(--secondary)]/55 p-4">
                        <p className="type-kpi text-[2rem] font-extrabold text-slate-950">{item.value}</p>
                        <p className="mt-1 text-[0.92rem] text-slate-500">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[26px] border bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-[0.95rem] font-semibold text-slate-900">{tLanding("hero.mockup.attentionTitle")}</p>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </div>
                    <p className="type-kpi mt-4 text-[2rem] font-extrabold text-slate-950">12</p>
                    <p className="mt-2 text-[0.94rem] leading-7 text-slate-600">{tLanding("hero.mockup.attentionText")}</p>
                  </div>
                  <div className="rounded-[26px] border bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-[0.95rem] font-semibold text-slate-900">{tLanding("hero.mockup.sourcesTitle")}</p>
                      <BarChart3 className="h-4 w-4 text-[var(--primary)]" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {mockupSources.map((item) => (
                        <div key={item.label} className="flex items-center justify-between rounded-2xl bg-[var(--secondary)]/55 px-4 py-3">
                          <span className="text-[0.94rem] text-slate-700">{item.label}</span>
                          <span className="text-[0.94rem] font-semibold text-slate-950">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] border bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.95rem] font-semibold text-slate-900">{tLanding("hero.mockup.recentLeadsTitle")}</p>
                    <Badge variant="neutral" size="sm">{tLanding("hero.mockup.recentLeadsBadge")}</Badge>
                  </div>
                  <div className="mt-4 space-y-3">
                    {mockupLeads.map((lead) => (
                      <div key={lead.name} className="flex items-center justify-between gap-4 rounded-2xl border px-4 py-3">
                        <div>
                          <p className="text-[0.94rem] font-semibold text-slate-950">{lead.name}</p>
                          <p className="text-[0.82rem] text-slate-500">{lead.interest}</p>
                        </div>
                        <Badge variant={lead.badge} size="sm">{lead.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-2">
          <div className="rounded-[28px] border border-white/70 bg-white/80 px-5 py-5 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.18)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--primary)] uppercase">{tLanding("socialProof.eyebrow")}</p>
                <p className="mt-2 text-[1rem] font-semibold text-slate-900">{tLanding("socialProof.title")}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="neutral" size="sm">{tLanding("socialProof.spa")}</Badge>
                <Badge variant="neutral" size="sm">{tLanding("socialProof.dental")}</Badge>
                <Badge variant="neutral" size="sm">{tLanding("socialProof.clinic")}</Badge>
                <Badge variant="neutral" size="sm">{tLanding("socialProof.education")}</Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--primary)] uppercase">{tLanding("pain.eyebrow")}</p>
            <h2 className="mt-3 text-[2rem] font-bold text-slate-950 md:text-[2.3rem]">{tLanding("pain.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pains.map((item) => (
              <Card key={item.title} className="surface-panel h-full">
                <CardContent className="space-y-4 p-6 pt-7 md:p-6 md:pt-8">
                  <div className="w-fit rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">{item.icon}</div>
                  <div>
                    <h3 className="text-[1.06rem] font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-[0.94rem] leading-7 text-slate-600">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--primary)] uppercase">{tLanding("features.eyebrow")}</p>
            <h2 className="mt-3 text-[2rem] font-bold text-slate-950 md:text-[2.3rem]">{tLanding("features.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((item) => (
              <Card key={item.title} className="surface-panel bg-white/85">
                <CardContent className="space-y-4 p-6 pt-7 md:p-6 md:pt-8">
                  <div className="w-fit rounded-2xl bg-[var(--secondary)] p-3">{item.icon}</div>
                  <div>
                    <h3 className="text-[1.06rem] font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-[0.94rem] leading-7 text-slate-600">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="py-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--primary)] uppercase">{tLanding("how.eyebrow")}</p>
            <h2 className="mt-3 text-[2rem] font-bold text-slate-950 md:text-[2.3rem]">{tLanding("how.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((item) => (
              <Card key={item.step} className="surface-panel h-full">
                <CardContent className="p-6 pt-7 md:p-6 md:pt-8">
                  <p className="text-[0.82rem] font-bold tracking-[0.08em] text-[var(--primary)]">{item.step}</p>
                  <h3 className="mt-4 text-[1.18rem] font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-[0.94rem] leading-7 text-slate-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="py-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--primary)] uppercase">{tLanding("useCases.eyebrow")}</p>
            <h2 className="mt-3 text-[2rem] font-bold text-slate-950 md:text-[2.3rem]">{tLanding("useCases.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item) => (
              <Card key={item.title} className="surface-panel h-full">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-slate-600">
                  <p>{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--primary)] uppercase">{tLanding("pricing.eyebrow")}</p>
            <h2 className="mt-3 text-[2rem] font-bold text-slate-950 md:text-[2.3rem]">{tLanding("pricing.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pricing.map((item) => (
              <Card key={item.title} className="surface-panel h-full">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>{item.title}</CardTitle>
                    <Badge variant="warning" size="sm">{tLanding("pricing.comingSoon")}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[0.94rem] leading-7 text-slate-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--primary)] uppercase">{tLanding("faq.eyebrow")}</p>
            <h2 className="mt-3 text-[2rem] font-bold text-slate-950 md:text-[2.3rem]">{tLanding("faq.title")}</h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((item) => (
              <Card key={item.question} className="surface-panel">
                <CardContent className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-start md:justify-between md:px-6 md:py-6">
                  <div className="min-w-0 flex-1 max-w-3xl pt-0.5">
                    <h3 className="text-[1.06rem] font-semibold leading-snug text-slate-950">{item.question}</h3>
                    <p className="mt-3 text-[0.94rem] leading-7 text-slate-600">{item.answer}</p>
                  </div>
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="mt-6 border-t border-[var(--border)] py-8 text-sm text-slate-500">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-[0.95rem] font-semibold text-slate-900">{tCommon("appName")}</p>
              <p className="max-w-xl text-[0.94rem] leading-7">{tLanding("footer.description")}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
              <Link href="/dashboard" className="inline-flex items-center gap-1 hover:text-slate-950">
                {tLanding("footer.demoLink")}
                <ChevronRight className="h-4 w-4" />
              </Link>
              <NextLink href="#how-it-works" className="hover:text-slate-950">
                {tLanding("footer.howItWorksLink")}
              </NextLink>
              <NextLink href="#faq" className="hover:text-slate-950">
                {tLanding("footer.faqLink")}
              </NextLink>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
