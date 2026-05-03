import { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  hint,
  icon,
  trend,
  className,
}: {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
  trend?: {
    label: string;
    direction?: "up" | "down" | "neutral";
  };
  className?: string;
}) {
  const TrendIcon = trend?.direction === "down" ? TrendingDown : TrendingUp;

  return (
    <Card className={cn("surface-panel overflow-hidden", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-[var(--muted-foreground)]">{label}</p>
            <p className="text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
            <p className="max-w-[22ch] text-sm leading-6 text-[var(--muted-foreground)]">{hint}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-3 text-[var(--primary)] shadow-sm">
            {icon}
          </div>
        </div>
        {trend ? (
          <div className="mt-4">
            <Badge
              variant={trend.direction === "down" ? "warning" : trend.direction === "neutral" ? "neutral" : "teal"}
              className="gap-1.5"
            >
              <TrendIcon className="h-3.5 w-3.5" />
              {trend.label}
            </Badge>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
