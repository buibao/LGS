import { ReactNode } from "react";
import { SectionCard as DesignSystemSectionCard } from "@/components/design-system/section-card";

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return <DesignSystemSectionCard title={title} description={description} action={action} className={className} contentClassName={contentClassName}>{children}</DesignSystemSectionCard>;
}
