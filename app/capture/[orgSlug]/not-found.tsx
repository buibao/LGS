import Link from "next/link";

export default function CaptureNotFound() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f9fc_0%,#eef5fb_100%)] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-xl rounded-3xl border bg-white p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.24)] sm:p-8">
        <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">Capture link unavailable</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">This public capture link could not be found</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          The business workspace may have been removed, renamed, or the link may be incomplete. Double-check the URL and try again.
        </p>
        <Link href="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-[var(--secondary)]">
          Return to LeadOps AI
        </Link>
      </div>
    </div>
  );
}
