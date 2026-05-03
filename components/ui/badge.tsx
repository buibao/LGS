import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-[0.01em]", {
  variants: {
    variant: {
      default: "border-transparent bg-[var(--secondary)] text-slate-700",
      success: "border-emerald-200 bg-emerald-50 text-emerald-700",
      warning: "border-amber-200 bg-amber-50 text-amber-700",
      danger: "border-rose-200 bg-rose-50 text-rose-700",
      info: "border-cyan-200 bg-cyan-50 text-cyan-700",
      neutral: "border-slate-200 bg-slate-50 text-slate-600",
      teal: "border-teal-200 bg-teal-50 text-teal-700",
      orange: "border-orange-200 bg-orange-50 text-orange-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
