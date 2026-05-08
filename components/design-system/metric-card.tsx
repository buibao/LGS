import { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  trend?: {
    label: string;
    direction?: "up" | "down" | "neutral";
  };
  className?: string;
}) {
  const TrendIcon = trend?.direction === "down" ? TrendingDown : TrendingUp;

  return (
    <Card className={cn("rounded-[24px] border border-[var(--border)] bg-white shadow-sm", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2.5">
            <p className="text-sm font-medium text-[var(--muted-foreground)]">{title}</p>
            <p className="text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
            {description ? <p className="max-w-[26ch] text-sm leading-6 text-[var(--muted-foreground)]">{description}</p> : null}
          </div>
          {icon ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-3 text-[var(--primary)] shadow-sm">
              {icon}
            </div>
          ) : null}
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
