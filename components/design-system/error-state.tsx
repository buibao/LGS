import { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ErrorState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[24px] border border-rose-200 bg-rose-50 px-6 py-8 text-center shadow-sm", className)}>
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-200 bg-white text-rose-600">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h2>
          <p className="text-sm leading-7 text-slate-600">{description}</p>
        </div>
        {action}
      </div>
    </div>
  );
}
