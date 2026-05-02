import { type ClassValue, clsx } from "clsx";
import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return format(new Date(date), "MMM d, yyyy");
}

export function formatDateTime(date: Date | string) {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}

export function formatRelativeDate(date: Date | string) {
  const value = new Date(date);

  if (isToday(value)) return `Today, ${format(value, "h:mm a")}`;
  if (isTomorrow(value)) return `Tomorrow, ${format(value, "h:mm a")}`;
  if (isYesterday(value)) return `Yesterday, ${format(value, "h:mm a")}`;

  return format(value, "MMM d, h:mm a");
}

export function timeAgo(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}
