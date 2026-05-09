"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "inline-flex min-w-[11rem] items-center gap-3 rounded-2xl border border-border/70 bg-white px-3 py-2.5 shadow-sm",
        className,
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--primary)]">
        <Languages className="h-4 w-4" />
      </div>
      <div className="grid min-w-0 flex-1 gap-1">
        <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
          {t("language")}
        </span>
        <Select
          value={locale}
          disabled={isPending}
          onValueChange={(nextLocale) => {
            const query = searchParams.toString();
            const href = query ? `${pathname}?${query}` : pathname;

            startTransition(() => {
              router.replace(href, {
                locale: nextLocale as (typeof routing.locales)[number],
              });
            });
          }}
        >
          <SelectTrigger className="h-9 rounded-xl border-0 bg-transparent px-0 py-0 text-sm font-medium shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vi">{t("vietnamese")}</SelectItem>
            <SelectItem value="en">{t("english")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
