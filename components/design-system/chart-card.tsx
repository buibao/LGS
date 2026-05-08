import { ReactNode } from "react";
import { SectionCard } from "@/components/design-system/section-card";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  description,
  icon,
  children,
  className,
  contentClassName,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <SectionCard
      title={title}
      description={description}
      className={cn("h-full", className)}
      action={
        icon ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/75 p-2.5 text-[var(--primary)] shadow-sm">
            {icon}
          </div>
        ) : undefined
      }
      contentClassName={cn("p-5 md:p-6", contentClassName)}
    >
      {children}
    </SectionCard>
  );
}
