import { ReactNode } from "react";
import { LucideIcon, Sparkles } from "lucide-react";
import { EmptyState as DesignSystemEmptyState } from "@/components/design-system/empty-state";

export function EmptyState({
  title,
  description,
  action,
  eyebrow,
  icon: Icon = Sparkles,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  eyebrow?: string;
  icon?: LucideIcon;
}) {
  const heading = eyebrow ? `${eyebrow}: ${title}` : title;

  return <DesignSystemEmptyState icon={Icon} title={heading} description={description} action={action} />;
}
