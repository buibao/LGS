import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_12px_24px_-18px_rgba(15,95,115,0.7)] hover:bg-[#0b5162]",
        secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[#e9f0f8]",
        outline: "border bg-white text-slate-700 hover:bg-[var(--secondary)]",
        ghost: "text-slate-600 hover:bg-white/80",
        accent: "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_12px_24px_-18px_rgba(217,119,6,0.7)] hover:bg-[#c46808]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
