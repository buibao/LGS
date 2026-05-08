import { cn } from "@/lib/utils";

export function LoadingState({
  title,
  description,
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-sm", className)}>
      <div className="space-y-4 animate-pulse">
        {title ? <div className="h-5 w-40 rounded-full bg-[var(--secondary)]" /> : null}
        {description ? <div className="h-4 w-72 max-w-full rounded-full bg-[var(--secondary)]" /> : null}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="h-24 rounded-2xl bg-[var(--secondary)]" />
          <div className="h-24 rounded-2xl bg-[var(--secondary)]" />
          <div className="h-24 rounded-2xl bg-[var(--secondary)]" />
        </div>
      </div>
    </div>
  );
}
