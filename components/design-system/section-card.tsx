import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const hasHeader = Boolean(title || description || action);

  return (
    <Card className={cn("overflow-hidden rounded-[24px] border border-[var(--border)] bg-white shadow-sm", className)}>
      {hasHeader ? (
        <CardHeader className="flex flex-col gap-4 border-b border-[var(--border)] bg-white/80 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            {title ? <CardTitle className="text-base font-semibold text-slate-950">{title}</CardTitle> : null}
            {description ? <CardDescription className="max-w-2xl leading-6">{description}</CardDescription> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </CardHeader>
      ) : null}
      <CardContent className={cn("p-6", !hasHeader && "pt-6", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
