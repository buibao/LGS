import { cn } from "@/lib/utils";

export function FieldHint({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-[0.82rem] leading-6 text-[var(--muted-foreground)]", className)}>
      {children}
    </p>
  );
}
