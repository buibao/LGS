import { ReactNode } from "react";
import { MetricCard } from "@/components/ui/metric-card";

export function OverviewCards({
  items,
}: {
  items: Array<{
    label: string;
    value: string;
    hint: string;
    icon: ReactNode;
    trend?: {
      label: string;
      direction?: "up" | "down" | "neutral";
    };
  }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-5 xl:grid-cols-3">
      {items.map((item) => <MetricCard key={item.label} {...item} />)}
    </div>
  );
}
