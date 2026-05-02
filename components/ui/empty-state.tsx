import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
        <div className="text-lg font-semibold">{title}</div>
        <p className="max-w-md text-sm text-[var(--muted-foreground)]">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}
