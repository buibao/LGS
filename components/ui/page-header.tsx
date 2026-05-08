import { ReactNode } from "react";
import { PageHeader as DesignSystemPageHeader } from "@/components/design-system/page-header";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  const breadcrumbs = eyebrow ? [{ label: eyebrow }] : undefined;

  return <DesignSystemPageHeader title={title} description={description} actions={action} breadcrumbs={breadcrumbs} />;
}
