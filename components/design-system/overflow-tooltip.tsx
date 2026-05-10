"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function OverflowTooltip({
  content,
  children,
  className,
  contentClassName,
}: {
  content: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = triggerRef.current;
    if (!element) return;

    const updateOverflow = () => {
      setIsOverflowing(
        element.scrollWidth > element.clientWidth ||
          element.scrollHeight > element.clientHeight,
      );
    };

    updateOverflow();

    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(element);
    window.addEventListener("resize", updateOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateOverflow);
    };
  }, [content]);

  return (
    <Popover open={isOpen && isOverflowing} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span
          ref={triggerRef}
          className={cn("block min-w-0 max-w-full", className)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className={cn(
          "w-auto max-w-[min(28rem,calc(100vw-2rem))] rounded-[20px] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,255,0.96))] px-4 py-3 shadow-[0_24px_54px_-38px_rgba(15,23,42,0.24)]",
          contentClassName,
        )}
      >
        <p className="text-sm leading-6 font-medium text-slate-700 break-words">
          {content}
        </p>
      </PopoverContent>
    </Popover>
  );
}
