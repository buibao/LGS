import { ReactNode } from "react";
import { MetricCard as DesignSystemMetricCard } from "@/components/design-system/metric-card";

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
  return <DesignSystemMetricCard title={label} value={value} description={hint} icon={icon} trend={trend} className={className} />;
}
