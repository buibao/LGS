import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export default async function PublicCaptureSuccessPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const organization = await db.organization.findUnique({
    where: { slug: orgSlug },
    select: {
      name: true,
      slug: true,
    },
  });

  if (!organization) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f9fc_0%,#eef5fb_100%)] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-xl rounded-3xl border bg-white p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.24)] sm:p-8">
        <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">Inquiry sent</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Thanks for reaching out to {organization.name}</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Your details have been captured and sent to the team. They can now follow up from the LeadOps dashboard.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={`/capture/${organization.slug}`} className="inline-flex">
            <span className="inline-flex h-11 items-center justify-center rounded-xl border bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-[var(--secondary)]">
              Submit another inquiry
            </span>
          </Link>
          <Link href="/" className="inline-flex">
            <span className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--primary-foreground)] transition hover:bg-[#0b5162]">
              Visit LeadOps AI
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
