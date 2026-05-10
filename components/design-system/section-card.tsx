import { ReactNode } from "react";
import { CardHeaderRow } from "@/components/design-system/card-header-row";
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
      <Card className={cn("overflow-hidden rounded-[28px] border border-border/70 bg-white/96 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.18)]", className)}>
      {hasHeader ? (
        <CardHeader className="flex flex-col gap-4 border-b border-border/70 bg-[linear-gradient(180deg,rgba(249,251,255,0.95),rgba(255,255,255,0.92))] px-4 py-4 sm:px-5 sm:py-5 md:flex-row md:items-start md:justify-between md:px-6 md:py-6">
          <CardHeaderRow
            className="w-full"
            title={title ? <CardTitle className="min-w-0 text-[1.05rem] font-semibold leading-snug text-slate-950">{title}</CardTitle> : null}
            description={description ? <CardDescription className="min-w-0 max-w-[68ch] text-[0.92rem] leading-6 text-slate-600">{description}</CardDescription> : null}
            actions={action}
          />
        </CardHeader>
      ) : null}
      <CardContent className={cn("p-4 sm:p-5 md:p-6", !hasHeader && "pt-4 sm:pt-5 md:pt-6", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
