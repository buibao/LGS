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
    <Card
      className={cn(
        "rounded-[28px] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,251,255,0.94))]",
        className,
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="grid min-w-0 gap-3">
            <p className="text-sm font-semibold text-[var(--muted-foreground)]">{title}</p>
            <p className="type-kpi text-[2.1rem] font-extrabold text-slate-950 md:text-[2.3rem]">{value}</p>
            {description ? (
              <p className="max-w-[28ch] text-[0.92rem] leading-6 text-[var(--muted-foreground)]">
                {description}
              </p>
            ) : null}
          </div>
          {icon ? (
            <div className="rounded-2xl border border-border/70 bg-[var(--secondary)] p-3 text-[var(--primary)] shadow-sm">
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
