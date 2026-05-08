import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/marketing/home-page";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePage />;
}
