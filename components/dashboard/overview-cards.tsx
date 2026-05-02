import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function OverviewCards({
  items,
}: {
  items: Array<{
    label: string;
    value: string;
    hint: string;
    icon: ReactNode;
  }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{item.hint}</p>
              </div>
              <div className="rounded-2xl bg-[var(--secondary)] p-3">{item.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
