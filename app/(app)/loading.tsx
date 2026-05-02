export default function AppLoading() {
  return (
    <div className="dashboard-shell min-h-screen p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[288px_minmax(0,1fr)]">
        <div className="h-[420px] animate-pulse rounded-[28px] bg-[var(--sidebar)]/85" />
        <div className="space-y-4">
          <div className="h-24 animate-pulse rounded-[28px] bg-white" />
          <div className="h-[520px] animate-pulse rounded-[32px] bg-white" />
        </div>
      </div>
    </div>
  );
}
