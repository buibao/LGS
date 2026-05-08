"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Check, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-3 py-2 text-sm shadow-sm", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--primary)]">
        <Languages className="h-4 w-4" />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">{t("language")}</span>
        <div className="relative">
          <select
            className="pr-8 text-sm font-medium text-slate-700 outline-none"
            value={locale}
            disabled={isPending}
            onChange={(event) => {
              const nextLocale = event.target.value;
              const query = searchParams.toString();
              const href = query ? `${pathname}?${query}` : pathname;

              startTransition(() => {
                router.replace(href, { locale: nextLocale as (typeof routing.locales)[number] });
              });
            }}
          >
            <option value="vi">{t("vietnamese")}</option>
            <option value="en">{t("english")}</option>
          </select>
          <Check className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
