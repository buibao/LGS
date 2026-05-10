import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full border px-3.5 text-[0.78rem] font-semibold leading-none whitespace-nowrap align-middle transition-colors",
  {
    variants: {
      variant: {
        default: "border-[var(--border)] bg-[var(--secondary)] text-slate-700",
        neutral: "border-slate-200/90 bg-slate-50 text-slate-600",
        success: "border-emerald-200/90 bg-emerald-50 text-emerald-700",
        warning: "border-amber-200/90 bg-amber-50 text-amber-700",
        danger: "border-rose-200/90 bg-rose-50 text-rose-700",
        info: "border-cyan-200/90 bg-cyan-50 text-cyan-700",
        teal: "border-teal-200/90 bg-teal-50 text-teal-700",
        orange: "border-orange-200/90 bg-orange-50 text-orange-700",
        outline: "border-border/80 bg-white text-slate-600",
      },
      size: {
        sm: "h-7 px-3 text-[0.72rem]",
        default: "h-8 px-3.5 text-[0.78rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({
  className,
  variant,
  size,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}
